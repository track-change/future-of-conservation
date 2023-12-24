import { BiNews } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { slugify, validateSlug } from "../../../utils/helperFunctions";

export default defineType({
  name: "pageArticles",
  type: "document",
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
      description: "A title for the page, used in links to it.",
      type: "internationalizedArrayString",
      group: "content",
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
      validation: (Rule) => validateSlug(Rule.required()),
      codegen: { required: true },
      readOnly: true,
      group: "content",
      initialValue: { current: "resources" },
    },
    defineField({
      title: "Articles",
      name: "articles",
      description:
        "The ordered list of articles to display on the /articles page.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      const localTitle = title.find(({ _key }: any) => _key == "en")?.value;
      return {
        title: `Page - ${localTitle || "Articles"}`,
        media: BiNews,
        subtitle: "/articles",
      };
    },
  },
});
