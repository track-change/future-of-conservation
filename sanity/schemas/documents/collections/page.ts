import { BiFile } from "react-icons/bi/";
import {
  isUniqueSlug,
  slugify,
  validateSlug,
} from "../../../utils/helperFunctions";
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
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: "content",
    }),
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: slugify,
      },
      validation: validateSlug,
      group: "content",
    },
    {
      title: "Content",
      name: "content",
      type: "editorTextMedia",
      group: "content",
    },
    {
      title: "Recirculation",
      description: "Outgoing links at the end of the page.",
      name: "recirculation",
      type: "array",
      of: [{ type: "recircPanel" }],
      group: "content",
    },
    {
      title: "SEO",
      name: "seo",
      type: "seo",
      group: "seo",
    },
    {
      // should match 'languageField' plugin configuration setting, if customized
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
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
