import type {
  SanityKeyedReference,
  SanityReference,
  InternalLink,
  Tag,
} from "@/sanity";

export type ResolvedReference<T> =
  // match `SanityKeyedReference` and unwrap via `infer U`
  T extends SanityKeyedReference<infer U>
    ? U
    : // match `SanityReference` and unwrap via `infer U`
      T extends SanityReference<infer U>
      ? U
      : never;

export function resolveReference<
  T extends { _type: any },
  Ref extends SanityKeyedReference<T> | SanityReference<T>,
>(obj: Ref): ResolvedReference<Ref> {
  if (obj._type === "reference")
    throw new Error("Asset reference has not been expanded!");
  return obj as unknown as ResolvedReference<Ref>;
}

export function resolveLinkURL(
  link: ResolvedReference<InternalLink["linkTarget"]>,
) {
  switch (link._type) {
    case "pageHome":
      return "/";
    case "pageArtists":
    case "pageArticles":
    case "pageResources":
    case "page":
      return `/${link.slug?.current || ""}`;
    case "resource":
    case "artist":
      return `/${link._type}s/${link.slug?.current || ""}`;
    case "article":
      const url = new URL(resolveReference(link.file.asset).url);
      return url.pathname;
  }
}
