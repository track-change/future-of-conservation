import { BiHome } from "react-icons/bi/";
import { defineField, defineType } from "sanity";
import { slugify, validateSlug } from "../../../utils/helperFunctions";

export default defineType({
  title: "Page - Home",
  name: "pageHome",
  type: "document",
  icon: BiHome,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      description: "A title for the home page, used in links to it.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "pageContents",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Page - Home",
        subtitle: "/",
        media: BiHome,
      };
    },
  },
});
