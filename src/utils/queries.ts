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
