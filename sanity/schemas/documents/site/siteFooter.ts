import { BiSliderAlt } from "react-icons/bi/";
import { defineType } from "sanity";

export default defineType({
  name: "siteFooter",
  type: "document",
  title: "Site Footer",
  icon: BiSliderAlt,
  fields: [
    {
      title: "Page Title",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: "page",
    },
  ],
  preview: {
    prepare({}) {
      return {
        title: "Site Footer",
      };
    },
  },
});
