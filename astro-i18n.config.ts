import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  primaryLocale: "en", // default app locale
  secondaryLocales: ["kr"], // other supported locales
  fallbackLocale: "en", // fallback locale (on missing translation)
  trailingSlash: "never", // "never" or "always"
  run: "client+server", // "client+server" or "server"
  showPrimaryLocale: false, // "/en/about" vs "/about"
  translationLoadingRules: [], // per page group loading
  translationDirectory: {}, // translation directory names
  translations: {
    common: {
      en: {
        title: {
          line1: "Future of",
          line2: "Conservation",
        },
        recirc: "See Also",
      },
      kr: {
        title: {
          line1: "보존의",
          line2: "미래",
        },
        recirc: "See Also",
      },
    },
  }, // { [translation_group1]: { [locale1]: {}, ... } }
  routes: {}, // { [secondary_locale1]: { about: "about-translated", ... } }
});
