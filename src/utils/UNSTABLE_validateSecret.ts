// All this code from:
// https://github.com/sanity-io/visual-editing/blob/main/packages/preview-url-secret/src/types.ts
// (Or around)
// Will be removed once PR gets merged:
// https://github.com/sanity-io/visual-editing/pull/581


/** @internal */
const schemaType =
  'sanity.previewUrlSecret'

/** @internal */
const schemaIdPrefix =
  'sanity-preview-url-secret'

/** @internal */
const apiVersion = '2023-11-09'

/** @internal */
const urlSearchParamPreviewSecret = 'sanity-preview-secret'

/** @internal */
const urlSearchParamPreviewPathname = 'sanity-preview-pathname'

/** @internal */
const isDev = process.env.NODE_ENV === 'development'

/**
 * updated within the hour, if it's older it'll create a new secret or return null
 * @internal
 */
const SECRET_TTL = 60 * 60

/** @internal */
const fetchSecretQuery =
  /* groq */ `*[_type == "${schemaType}" && secret == $secret && dateTime(_updatedAt) > dateTime(now()) - ${SECRET_TTL}][0]{
  _id,
  _updatedAt,
  secret,
}` as const

/** @internal */
const deleteExpiredSecretsQuery =
  /* groq */ `*[_type == "${schemaType}" && dateTime(_updatedAt) <= dateTime(now()) - ${SECRET_TTL}]` as const

/**
 * Used for tagging `client.fetch` queries
 * @internal
 */
const tag = 'sanity.preview-url-secret' as const

interface ParsedPreviewUrl {
  secret: string
  redirectTo?: string
}

interface PreviewUrlValidateUrlResult {
  isValid: boolean
  /**
   * If the URL is valid, and there's a parameter for what preview path to redirect to, it will be here
   */
  redirectTo?: string
}

/**
 * A subset type that's compatible with most SanityClient typings,
 * this makes it easier to use this package in libraries that may use `import type { SanityClient } from 'sanity'`
 * as well as those that use `import type { SanityClient } from '@sanity/client'`
 * @internal
 */
type SanityClientLike = {
  config(): { token?: string }
  withConfig(config: {
    apiVersion?: string
    useCdn?: boolean
    perspective?: 'published'
    resultSourceMap?: boolean
  }): SanityClientLike
  fetch<
    R,
    Q = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any
    },
  >(
    query: string,
    params: Q,
    options: { tag?: string },
  ): Promise<R>
}

function parsePreviewUrl(unsafeUrl: string): ParsedPreviewUrl {
  const url = new URL(unsafeUrl, 'http://localhost')
  const secret = url.searchParams.get(urlSearchParamPreviewSecret)
  if (!secret) {
    throw new Error('Missing secret')
  }
  let redirectTo = undefined
  const unsafeRedirectTo = url.searchParams.get(urlSearchParamPreviewPathname)
  if (unsafeRedirectTo) {
    const { pathname, search } = new URL(unsafeRedirectTo, 'http://localhost')
    redirectTo = `${pathname}${search}`
  }
  return { secret, redirectTo }
}

function createClientWithConfig(
  client: SanityClientLike,
): SanityClientLike {
  if (!client) {
    throw new TypeError('`client` is required')
  }

  if (!client.config().token) {
    throw new TypeError('`client` must have a `token` specified')
  }

  return client.withConfig({
    // Userland might be using an API version that's too old to use perspectives
    apiVersion,
    // We can't use the CDN, the secret is typically validated rigth after it's created
    useCdn: false,
    // The documents that hold secrets are never drafts
    perspective: 'published',
    // Don't waste time returning a source map, we don't need it
    resultSourceMap: false,
    // @ts-expect-error - If stega is enabled, make sure it's disabled
    stega: false,
  })
}

interface FetchSecretQueryParams {
  secret: string
}

/** @internal */
type FetchSecretQueryResponse = {
  _id: string
  _updatedAt: string | null
  secret: string | null
} | null


async function validateSecret(
  client: SanityClientLike,
  secret: string,
): Promise<boolean> {
  // If we're in the Edge Runtime it's usually too quick and we need to delay fetching the secret a little bit
  // @ts-expect-error -- this global exists if we're in the Edge Runtime
  if (typeof EdgeRuntime !== 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 300))
  }
  if (!secret || !secret.trim()) {
    return false
  }
  const result = await client.fetch<FetchSecretQueryResponse>(
    fetchSecretQuery,
    { secret } satisfies FetchSecretQueryParams,
    { tag },
  )
  if (!result?._id || !result?._updatedAt || !result?.secret) {
    return false
  }
  return secret === result.secret
}

export async function validatePreviewUrl(
  _client: SanityClientLike,
  previewUrl: string,
): Promise<PreviewUrlValidateUrlResult> {
  const client = createClientWithConfig(_client)
  let parsedPreviewUrl: ParsedPreviewUrl
  try {
    parsedPreviewUrl = parsePreviewUrl(previewUrl)
  } catch (error) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse preview URL', error, {
        previewUrl,
        client,
      })
    }
    return { isValid: false }
  }

  const isValid = await validateSecret(client, parsedPreviewUrl.secret)
  const redirectTo = isValid ? parsedPreviewUrl.redirectTo : undefined

  return { isValid, redirectTo }
}