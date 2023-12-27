import { BiSliderAlt } from "react-icons/bi/";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteFooter",
  type: "document",
  title: "Site Footer",
  icon: BiSliderAlt,
  fields: [
    defineField({
      title: "Description",
      name: "description",
      description: "Text for the site description, top of column 1",
      type: "internationalizedArrayEditorText",
    }),
    defineField({
      title: "Credits",
      name: "credits",
      description: "Text for the credits, top of column 2",
      type: "internationalizedArrayEditorText",
    }),
    defineField({
      title: "Copyright",
      name: "copyright",
      description: "Text for the copyright, bottom of columns 1 + 2",
      type: "internationalizedArrayEditorText",
    }),
    defineField({
      title: "Support",
      name: "support",
      description: "Text for the support, bottom of column 3 (below the logos)",
      type: "internationalizedArrayEditorText",
    }),
  ],
  preview: {
    prepare({}) {
      return {
        title: "Site Footer",
      };
    },
  },
});
