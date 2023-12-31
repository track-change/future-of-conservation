import { BiFile } from "react-icons/bi/";
import { slugify, validateSlug } from "../../../utils/helperFunctions";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Page",
  name: "page",
  type: "document",
  icon: BiFile,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      description: "Localized title to use for links and SEO",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        'Unique identifier for this page. Resulting path will be "/{slug}" or "/kr/{slug}".',
      options: {
        source: "title",
        slugify: slugify,
      },
      validation: validateSlug,
      codegen: { required: true },
    },
    {
      title: "Content",
      name: "content",
      type: "pageContents",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
    },
    prepare({ title, slug }) {
      return {
        title:
          typeof title === "string"
            ? title
            : title.find(({ _key }: any) => _key == "en").value,
        subtitle: `/${slug.current}`,
      };
    },
  },
});
