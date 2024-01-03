import { BiNews } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { slugify, validateSlug } from "../../../utils/helperFunctions";

export default defineType({
  title: "Article",
  name: "article",
  type: "document",
  icon: BiNews,
  fieldsets: [{ name: "author", title: "Author" }],
  fields: [
    defineField({
      title: "Title",
      name: "title",
      description: "Localized name of the article",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      title: "File",
      description: "The article's file, typically a PDF.",
      name: "file",
      type: "file",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      title: "Search Keywords",
      name: "searchKeywords",
      description:
        "Additional search keywords for the article to improve the fuzzy search results. Search is based on Title, Author, and Search Keywords.",
      type: "internationalizedArrayString",
    }),
    defineField({
      type: "boolean",
      title: "External Author",
      description: "Is the author not an artist on the platform?",
      name: "isExternalAuthor",
      fieldset: "author",
      initialValue: false,
    }),
    defineField({
      title: "External Author",
      name: "authorExternal",
      description: "The name of the article's author.",
      type: "internationalizedArrayString",
      fieldset: "author",
      hidden: ({ parent }) => parent && !parent.isExternalAuthor,
    }),
    defineField({
      title: "Author",
      name: "author",
      description: "The article's author.",
      type: "reference",
      to: [{ type: "artist" }],
      hidden: ({ parent }) => parent?.isExternalAuthor,
      fieldset: "author",
    }),
  ],
  preview: {
    select: {
      title: "title",
      isExternal: "isExternalAuthor",
      authorText: "author.title",
      extAuthorText: "authorExternal",
      slug: "slug",
    },
    prepare({ title, isExternal, authorText, extAuthorText }) {
      const authTitle = isExternal ? extAuthorText : authorText;
      return {
        title: title.find(({ _key }: any) => _key == "en")?.value,
        subtitle: authTitle?.find(({ _key }: any) => _key == "en")?.value,
      };
    },
  },
});
