import { sanityIntegration } from "@sanity/astro";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { loadEnv } from "vite";
import isPreview from "./src/utils/isPreview";
const env = loadEnv("", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanityIntegration({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: false,
      perspective: isPreview() ? "previewDrafts" : "published",
      studioBasePath: isPreview() ? "/admin" : undefined,
    }),
    ...(isPreview() ? [react()] : []),
  ],
  output: isPreview() ? "server" : "hybrid",
  adapter: cloudflare(),
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
