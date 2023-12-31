import { BiAlignLeft } from "react-icons/bi";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Text Block",
  name: "module_block",
  type: "object",
  icon: BiAlignLeft,
  fields: [
    defineField({
      title: "Content",
      description: "Translatable text content.",
      name: "content",
      type: "internationalizedArrayEditorTextMedia",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "content[0].value",
    },
  },
});
