import { BiFile } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import modules from "../content/modules";

export default defineType({
  title: "Page Contents",
  name: "pageContents",
  type: "object",
  icon: BiFile,
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "SEO",
      name: "seo",
    },
  ],
  fields: [
    defineField({
      title: "Body Text",
      name: "content",
      description: "The main text body of the page.",
      type: "internationalizedArrayEditorTextMedia",
      group: "content",
    }),
    defineField({
      title: "Modules",
      name: "modules",
      description:
        "Configurable modules to build pages, after (or in place of) the main text.",
      type: "array" as const,
      of: modules.map(({ name }) => ({ type: name })),
      group: "content",
    }),
    defineField({
      title: "Recirculation",
      description: "Outgoing links at the bottom of the page.",
      name: "recirc",
      type: "array" as const,
      group: "content",
      of: [{ type: "internalLink" }, { type: "link" }],
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "seo",
      group: "seo",
    }),
  ],
});
