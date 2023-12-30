import { FiUser } from "react-icons/fi";
import { slugify, validateSlug } from "../../../utils/helperFunctions";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Artist",
  name: "artist",
  type: "document",
  icon: FiUser,
  groups: [
    {
      title: "Artist",
      name: "content",
      default: true,
    },
    {
      title: "Introduction",
      name: "introduction",
    },
    {
      title: "Interview",
      name: "interview",
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
      description: "Localized name of the artist",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required().min(1),
      codegen: { required: true },
      group: "content",
    }),
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        'Unique identifier for this artist. Paths will be "/artists/{slug}" or "/kr/artists/{slug}".',
      options: {
        source: "title",
        slugify: slugify,
      },
      validation: validateSlug,
      codegen: { required: true },
      group: "content",
    },
    defineField({
      title: "Tags",
      name: "tags",
      description: "Tags used to filter the artists in the /artists page.",
      type: "array" as const,
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: "content",
    }),
    defineField({
      title: "Introduction",
      name: "introductionContent",
      description: "Text content introduction the artist.",
      type: "internationalizedArrayEditorTextMedia",
      group: "introduction",
    }),
    defineField({
      title: "Introduction Carousel",
      name: "introductionImages",
      description:
        "Captioned pictures to put in a carousel at the end of the intro.",
      type: "array" as const,
      of: [{ type: "pictureTitled" }],
      group: "introduction",
    }),
    defineField({
      title: "Introduction Footnotes",
      name: "introductionFootnotes",
      description: "Footnotes for the end of the introduction.",
      type: "array" as const,
      of: [{ type: "footnote" }],
      group: "introduction",
    }),
    defineField({
      title: "Introduction Recirculation",
      description: "Outgoing links at the end of the introduction page.",
      name: "introductionRecirc",
      type: "array",
      group: "introduction",
      of: [{ type: "internalLink" }, { type: "link" }],
    }),
    defineField({
      title: "Interview Title",
      name: "interviewTitle",
      description: "A title for the interview.",
      type: "internationalizedArrayString",
      group: "interview",
    }),
    defineField({
      title: "Interview",
      name: "interviewContent",
      description: "The text / media content of the interview, with footnotes.",
      type: "internationalizedArrayEditorTextMedia",
      group: "interview",
    }),
    defineField({
      title: "Interview Footnotes",
      name: "interviewFootnotes",
      description: "Footnotes for the end of the interview.",
      type: "array" as const,
      of: [{ type: "footnote" }],
      group: "interview",
    }),
    defineField({
      title: "Interview Recirculation",
      description: "Outgoing links at the end of the introduction page.",
      name: "interviewRecirc",
      type: "array",
      group: "interview",
      of: [{ type: "internalLink" }, { type: "link" }],
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
      slug: "slug",
    },
    prepare({ title, slug }) {
      return {
        title:
          title?.find(({ _key }: any) => _key == "en").value ||
          "Unnamed Artist",
        subtitle: `/artists/${slug.current}`,
      };
    },
  },
});
