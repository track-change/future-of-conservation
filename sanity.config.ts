import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { dashboardTool } from "@sanity/dashboard";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { deskTool } from "sanity/desk";
import { sanityClient } from "sanity:client";
import { media } from "sanity-plugin-media";
import schemaTypes from "./sanity/schemas";
import { githubEnvironmentsWidget } from 'sanity-plugin-dashboard-widget-github-environments';
import { structure } from "./sanity/config/structure";
import {
  defaultDocumentNode,
  resolveProductionUrl,
} from "./sanity/config/views";
import { initialValueTemplates } from "./sanity/config/initialValueTemplates";
import "@/styles/sanityStudio.scss";
import Icon from "./sanity/components/Icon";

const { projectId, dataset } = sanityClient.config();
const { bundledVars: { GITHUB_ACCESS_TOKEN } } = sanityClient.config() as any;

const {theme} = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  'https://themer.sanity.build/api/hues?preset=retro-colonial&default=cce8b5;400&primary=ccff00;400'
)) as {theme: import('sanity').StudioTheme}

export default defineConfig({
  theme,
  name: "future-of-conservation",
  title: "Future of Conservation",
  icon: Icon,
  projectId: projectId!,
  dataset: dataset!,
  plugins: [
    dashboardTool({
      widgets: [
        githubEnvironmentsWidget({
          title: "Production Environment",
          // description: "Manage deployments through GitHub Actions",
          environmentName: "Future of Conservation",
          environmentUrl: "https://future-of-conservation.com",
          // disableIframe: "yes",
          layout: { height: "medium", width: "medium" },
          github: {
            owner: "evankirkiles",
            repo: "future-of-conservation",
            environment: "future-of-conservation (Production)",
            octokitConfig: {
              auth: GITHUB_ACCESS_TOKEN
            },
            workflowDispatch: {
              workflowId: "build.production.yml",
              ref: "main"
            },
          }
        }),
        documentListWidget({
          title: "Last Edited Artists",
          order: "_updatedAt desc",
          types: ["artist"],
          layout: { width: "small", height: "medium" },
        }),
        documentListWidget({
          title: "Last Edited Articles",
          order: "_updatedAt desc",
          types: ["article"],
          layout: { width: "small", height: "medium" },
        }),
        documentListWidget({
          title: "Last Edited Resources",
          order: "_updatedAt desc",
          types: ["resource"],
          layout: { height: "small" },
        }),
        documentListWidget({
          title: "Last Edited Pages",
          order: "_updatedAt desc",
          types: ["page", "pageHome", "pageArtists", "pageArticles", "pageResources"],
          layout: { height: "small" },
        }),
      ],
    }),
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    internationalizedArray({
      // Required configuration
      languages: [
        { id: "en", title: "English" },
        { id: "kr", title: "Korean" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: ["string", "text", "editorText", "editorTextMedia"],
    }),
    media(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => initialValueTemplates(prev),
  },
  document: {
    productionUrl: async (prev, context) => resolveProductionUrl({ context }),
  },
});
