import groq from "groq";
import { useMemo } from "react";
import {
  type Rule,
  type Slug,
  useClient,
  type SlugIsUniqueValidator,
} from "sanity";

export function useSanityClient() {
  const client = useClient({ apiVersion: "2022-05-04" });
  return useMemo(
    () => client.withConfig({ apiVersion: "2022-05-04" }),
    [client],
  );
}

export const slugify = (input: { _key: string; value: string }[]) => {
  return input[0].value
    .toString()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[\s+\+]/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .slice(0, 200);
};

export const validateSlug = (Rule: Rule) =>
  Rule.custom((slug: Slug, ctx) => {
    if (!slug) {
      return "A slug is required. Click “Generate” to generate a valid slug";
    }
    const rule = new RegExp("^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$");
    if (!rule.test(slug.current))
      return "A slug should only contain lowercase letters and “-”. Click “Generate” to generate a valid slug.";
    if (ctx.document?._type === "page") {
      if (slug.current.startsWith("artists/") || slug.current === "artists")
        return "Reserved slug prefix: 'artists/'";
    }
    return true;
  });

export const isUniqueSlug: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  if (!document?.language) {
    return true;
  }
  const client = getClient({ apiVersion: "2023-04-24" });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    slug,
  };
  const query = groq`
  !defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
};

export const getDurationString = (duration: number) => {
  const minutes = duration
    ? Math.floor(duration / 60)
        .toString()
        .padStart(2, "0")
    : "00";
  const seconds = duration
    ? Math.floor(duration % 60)
        .toString()
        .padStart(2, "0")
    : "00";
  return duration ? `${minutes}:${seconds}` : "";
};

export function capitalized(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
