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

export const artistQuery = groq`
*[_type == "artist" && slug.current == $slug][0] {
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == $primaryLocale][0].value),
  "introductionContent": coalesce(
    introductionContent[_key == $locale][0].value,
    introductionContent[_key == $primaryLocale][0].value),
  introductionRecirc[] {
    "undertext": coalesce(
      undertext[_key == $locale][0].value,
      undertext[_key == $primaryLocale][0].value),
    "overtext": coalesce(
      overtext[_key == $locale][0].value,
      overtext[_key == $primaryLocale][0].value),
    targetInternal {
      _type,
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == $primaryLocale][0].value),
      linkTarget -> {
        _type,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == $primaryLocale][0].value),
        slug,
        _type == "article" => {
          file {
            asset -> {
              url
            }
          }
        }
      }
    }
  }
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
    "undertext": coalesce(
      undertext[_key == $locale][0].value,
      undertext[_key == $primaryLocale][0].value),
    "overtext": coalesce(
      overtext[_key == $locale][0].value,
      overtext[_key == $primaryLocale][0].value),
    targetInternal {
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == $primaryLocale][0].value),
      linkTarget -> {
        _type,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == $primaryLocale][0].value),
        _type == "article" {
          asset -> {
            url
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
