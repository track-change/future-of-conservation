import { BiMapAlt } from "react-icons/bi/";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Site Header",
  name: "siteHeader",
  type: "document",
  icon: BiMapAlt,
  fields: [
    defineField({
      title: "Page Title",
      name: "title",
      description: "The title of the site, used for SEO (not the logo text!).",
      type: "string",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      title: "Base SEO",
      name: "seo",
      description:
        "Base SEO to use as defaults when pages don't provide their own.",
      type: "seo",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
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
