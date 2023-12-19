import groq from "groq";

export const siteNavQuery = groq`
*[_type == "siteNav"][0] {
  ...,
  navHeaderTop[] {
    _type,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == $primaryLocale][0].value),
    linkTarget -> {
      _type,
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == $primaryLocale][0].value),
      slug
    }
  },
}
`;

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  ...,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == $primaryLocale][0].value),
  recirculation[] {
    ...,
    target[] {
      ...,
      _type == "internalLink" => {
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == $primaryLocale][0].value),
        linkTarget -> {
          _type,
          "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == $primaryLocale][0].value),
        }
      }
    }
  }
}
`;

export const allPages = groq`
*[_type == "page" && defined(slug.current)] {
  "slug": slug.current
}`;
