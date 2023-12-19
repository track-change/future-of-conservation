import groq from "groq";

export const siteNavQuery = groq`
*[_type == "siteNav"][0] {
  ...,
  navHeaderTop[] {
    _type,
    title,
    linkTarget -> {
      _type,
      title,
      slug
    }
  },
  navHeaderBot[] -> {
    _type,
    title,
    linkTarget -> {
      _type,
      title,
      slug
    }
  }
}
`;

export const pageBySlugAndLangQuery = groq`
*[_type == "page" && slug.current == $slug && language == $lang][0] {
  ...,
  recirculation[] {
    ...,
    target[] {
      ...,
      _type == "internalLink" => {
        linkTarget -> {
          _type,
          title
        }
      }
    }
  }
}
`;
