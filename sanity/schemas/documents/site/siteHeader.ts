import { BiMapAlt } from "react-icons/bi/";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Site Header",
  name: "siteHeader",
  type: "document",
  icon: BiMapAlt,
  fields: [
    defineField({
      title: "Navigation Bar",
      description: "Items to display in the top navigation bar.",
      name: "navItems",
      type: "array" as const,
      of: [
        {
          type: "internalLink",
        },
        {
          type: "link",
        },
      ],
    }),
  ],
  preview: {
    prepare({}) {
      return {
        title: "Site Header",
      };
    },
  },
});
