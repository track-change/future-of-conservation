import groq from "groq";

export const localizedFieldLang = (field: string, projectInto: string) => `
"${projectInto}": ${field}[_key == $locale][0]._key
`;

export const localizedField = (field: string) => `
"${field}": coalesce(
  ${field}[_key == $locale][0].value,
  ${field}[_key == $primaryLocale][0].value)
`;
export const localizedFieldWithLang = (field: string) => `
${localizedFieldLang(field, field + "Lang")},
${localizedField(field)}
`;

export const linkQuery = groq`
_type,
subpath,
${localizedFieldWithLang("title")},
_type == "internalLink" => {
  linkTarget -> {
    _type,
    slug,
    ${localizedFieldWithLang("title")},
    _type == "article" => {
      file {
        asset -> {
          url
        }
      }
    },
    _type == "artist" => {
      ${localizedFieldWithLang("interviewTitle")}
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
