import { BsSuperscript } from "react-icons/bs/";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Footnotes",
  name: "module_footnote",
  type: "object",
  icon: BsSuperscript,
  fields: [
    defineField({
      title: "Footnotes",
      name: "content",
      type: "array" as const,
      of: [{ type: "footnote" }],
    }),
  ],
  preview: {
    select: {
      footnotes: "content",
    },
    prepare({ footnotes }) {
      return {
        title: "Footnotes",
        subtitle: `${footnotes.length} footnotes`,
        media: BsSuperscript,
      };
    },
  },
});
