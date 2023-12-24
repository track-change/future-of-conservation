import { astroI18n } from "astro-i18n";
import type { QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
const { locale, primaryLocale } = astroI18n;

export default async function localizedQuery<T>(
  query: string,
  params?: QueryParams,
): Promise<T> {
  return sanityClient.fetch<T>(query, {
    locale,
    primaryLocale,
    ...params,
  });
}
