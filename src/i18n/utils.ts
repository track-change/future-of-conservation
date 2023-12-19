import { defaultLang, languages, showDefaultLang } from "@/i18n/ui";

export function getLangAndUrl(url: URL) {
  const [, lang, ...rest] = url.pathname.split("/");
  if (lang in languages) {
    return {
      lang: lang as keyof typeof languages,
      url: rest.join("/"),
    };
  }
  return {
    lang: defaultLang as keyof typeof languages,
    url: [lang, ...rest].join("/"),
  };
}

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}
