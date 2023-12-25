import groq from "groq";

export const localizedField = (field: string) => `
"${field}": coalesce(
  ${field}[_key == $locale][0].value,
  ${field}[_key == $primaryLocale][0].value)
`;

export const linkQuery = groq`
_type,
subpath,
${localizedField("title")},
_type == "internalLink" => {
  linkTarget -> {
    _type,
    slug,
    ${localizedField("title")},
    _type == "article" => {
      file {
        asset -> {
          url
        }
      }
    },
    _type == "artist" => {
      ${localizedField("interviewTitle")}
    }
  }
}
`;

export const recircPanelQuery = groq`
${localizedField("undertext")},
${localizedField("overtext")},
targetInternal {
  ${linkQuery}
}
`;