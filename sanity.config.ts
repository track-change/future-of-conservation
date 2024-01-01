import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { dashboardTool } from "@sanity/dashboard";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { deskTool } from "sanity/desk";
import { sanityClient } from "sanity:client";
import { media } from "sanity-plugin-media";
import schemaTypes from "./sanity/schemas";
import { structure } from "./sanity/config/structure";
import {
  defaultDocumentNode,
  resolveProductionUrl,
} from "./sanity/config/views";
import { initialValueTemplates } from "./sanity/config/initialValueTemplates";

const { projectId, dataset } = sanityClient.config();

export default defineConfig({
  name: "future-of-conservation",
  title: "Future of Conservation",
  projectId: projectId!,
  dataset: dataset!,
  plugins: [
    dashboardTool({ widgets: [] }),
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
