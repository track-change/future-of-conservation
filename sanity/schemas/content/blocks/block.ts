import { BiAlignLeft } from "react-icons/bi";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Text Block",
  name: "page_block",
  type: "object",
  icon: BiAlignLeft,
  fields: [
    defineField({
      title: "Internal Title",
      description: "An internal title for the text block.",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Content",
      description: "Translatable text content.",
      name: "content",
      type: "internationalizedArrayEditorText",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "content[0].value",
    },
  },
});
