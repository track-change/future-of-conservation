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
blank,
${localizedFieldWithLang("title")},
_type == "internalLink" => {
  subpath,
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

/* --------------------------------- Modules -------------------------------- */

export const ifModuleIsBlockQuery = groq`
_type == "module_block" => {
  ${localizedFieldWithLang("content")}[] {
    _type == "pictureTitled" => {
      ${localizedFieldWithLang("caption")},
      asset ->
    }
  }
}
`;

export const ifModuleIsCarouselQuery = groq`
_type == "module_carousel" => {
  images[] {
    ${localizedFieldWithLang("caption")},
    asset ->
  }
}
`;

export const ifModuleIsFootnoteQuery = groq`
_type == "module_footnote" => {
  content[] {
    slug,
    ${localizedField("content")}
  }
}
`;

export const ifModuleIsGoogleSheetQuery = groq`
_type == "module_googlesheet" => {
  ${localizedField("title")}
}
`;

export const pageContentsQuery = groq`
_type,
${localizedFieldWithLang("content")}[] {
  ...,
  _type == "pictureTitled" => {
    ${localizedFieldWithLang("caption")},
    asset ->
  }
},
modules[] {
  ...,
  ${ifModuleIsBlockQuery},
  ${ifModuleIsCarouselQuery},
  ${ifModuleIsFootnoteQuery},
  ${ifModuleIsGoogleSheetQuery}
},
recirc[] {
  ${linkQuery}
}
`;
