import { BiFile } from "react-icons/bi/";
import { slugify, validateSlug } from "../../../utils/helperFunctions";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Page",
  name: "page",
  type: "document",
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
      title: "Title",
      name: "title",
      description: "Localized title to use for links and SEO",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: "content",
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
      group: "content",
    },
    {
      title: "Content",
      name: "content",
      type: "array",
      group: "content",
      of: [{ type: "page_block" }],
    },
    {
      title: "Recirculation",
      description: "Outgoing links at the end of the page.",
      name: "recirculation",
      type: "array",
      of: [{ type: "internalLink" }, { type: "link" }],
      group: "content",
    },
    {
      title: "SEO",
      name: "seo",
      type: "seo",
      group: "seo",
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
