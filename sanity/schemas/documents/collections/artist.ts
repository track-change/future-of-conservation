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
      title: "Introduction Page",
      name: "introduction",
      type: "pageContents",
      group: "introduction",
    }),
    defineField({
      title: "Interview Title",
      name: "interviewTitle",
      description: "A title for the interview.",
      type: "internationalizedArrayString",
      group: "interview",
    }),
    defineField({
      title: "Interview Artist Description",
      name: "interviewArtistDesc",
      description: "A subtitle for the artist in the interview page.",
      type: "internationalizedArrayString",
      group: "interview",
    }),
    defineField({
      title: "Interview Page",
      name: "interview",
      type: "pageContents",
      group: "interview",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
      media0: "introduction.modules.0.images.0.asset",
      media1: "introduction.modules.1.images.0.asset",
      media2: "introduction.modules.2.images.0.asset",
    },
    prepare({ title, slug, media0, media1, media2 }) {
      const carouselMedia = [media0, media1, media2].filter(Boolean);
      return {
        title:
          title?.find(({ _key }: any) => _key == "en").value ||
          "Unnamed Artist",
        subtitle: `/artists/${slug.current}`,
        media: carouselMedia[0]
      };
    },
  },
});
