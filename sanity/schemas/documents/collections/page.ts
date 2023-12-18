import { BiFile } from "react-icons/bi/";
import {
  isUniqueSlug,
  slugify,
  validateSlug,
} from "../../../utils/helperFunctions";
import { defineType } from "sanity";

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
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: "content",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: slugify,
        isUnique: isUniqueSlug,
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
    },
    prepare({ title }) {
      return {
        title: title ? title : "",
        media: BiFile,
      };
    },
  },
});
