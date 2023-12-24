import groq from "groq";

export const pageHomeQuery = groq`
*[_type == "pageHome"][0] {
  ...,
}
`;
export const pageArtistsQuery = groq`
*[_type == "pageArtists"][0] {
  artists[] -> {
    _type,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == $primaryLocale][0].value),
    slug
  }
}
`;

export const artistsQuery = groq`
*[_type == "artist"] {
  _type,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == $primaryLocale][0].value),
  slug,
  picture
}
`;

export const articlesQuery = groq`
*[_type == "article"] {
  _type,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == $primaryLocale][0].value),
  isExternalAuthor,
  author -> {
    _type,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == $primaryLocale][0].value),
    slug
  },
  authorExternal,
  file {
    ...,
    asset ->
  }
}
`;

export const siteHeaderQuery = groq`
*[_type == "siteHeader"][0] {
  ...,
  navItems[] {
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
