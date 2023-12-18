/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference types="vite/client" />

declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient;
}

declare module "sanity:studio" {
  export const studioConfig: import("sanity").Config;
}

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;

  // Public env variables
  readonly VITE_SANITY_FRONTEND_URL: string;
  readonly VITE_IS_PREVIEW: "yes" | string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
