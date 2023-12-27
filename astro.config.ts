import { sanityIntegration } from "@sanity/astro";
import {
  defineConfig,
  type AstroUserConfig,
  passthroughImageService,
} from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { loadEnv } from "vite";
import sitemap from "@astrojs/sitemap";

const env = loadEnv("", (process as any).cwd(), "") as ImportMetaEnv;

// i18n set up stuff
const defaultLocale = "en";
const locales = {
  en: "en-US",
  kr: "ko",
};

// We use this config for doing SSR—it reads a user's Sanity token and renders
// a preview version of the page based on the drafted content.
const PREVIEW_CONFIG = (): AstroUserConfig => ({
  site: env.SITE_URL,
  integrations: [
    icon(),
    sanityIntegration({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: false,
      perspective: "published",
      studioBasePath: "/admin",
    }),
    react(),
  ],
  output: "server",
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
});

// This config is for the main site. It does not include the Sanity studio,
// generates sitemaps, and outputs plain, static html.
const STATIC_CONFIG = (): AstroUserConfig => ({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  site: env.SITE_URL,
  integrations: [
    icon(),
    sanityIntegration({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: false,
      perspective: "published",
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
    }),
  ],
  output: "static",
  image: {
    service: passthroughImageService(),
  },
});

// https://astro.build/config
export default defineConfig(
  import.meta.env.DEV ? PREVIEW_CONFIG() : STATIC_CONFIG(),
);
