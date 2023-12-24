import { FiUser } from "react-icons/fi";
import { slugify, validateSlug } from "../../../utils/helperFunctions";
import { defineField, defineType, type ImageRule } from "sanity";

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
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      group: "content",
    }),
    // defineField({
    //   title: "Picture",
    //   name: "picture",
    //   description: "An image to display next to the artist in the index.",
    //   type: "image",
    //   group: "content",
    // }),
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
      name: "artistTags",
      description: "Tags used to filter the artists in the /artists page.",
      type: "tags",
      options: {
        includeFromRelated: "artistTags",
      },
      group: "content",
    }),
    defineField({
      title: "Introduction",
      name: "introductionContent",
      description: "The text / media content of the introduction.",
      type: "internationalizedArrayEditorTextMedia",
      group: "introduction",
    }),
    defineField({
      title: "Carousel Contents",
      name: "introductionCarousel",
      description: "Pictures for the post-introduction carousel.",
      type: "array" as const,
      group: "introduction",
      of: [{ type: "pictureTitled" }],
    }),
    defineField({
      title: "Interview",
      name: "interviewContent",
      description: "The text / media content of the interview, with footnotes.",
      type: "internationalizedArrayEditorTextMedia",
      group: "interview",
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
        title: title.find(({ _key }: any) => _key == "en").value,
        subtitle: `/artists/${slug.current}`,
      };
    },
  },
});
