import { defineField, defineType } from "sanity";
import { slugify, validateSlug } from "../../../utils/helperFunctions";
import { FiArchive } from "react-icons/fi";

export default defineType({
  title: "Resource",
  name: "resource",
  type: "document",
  icon: FiArchive,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      description: "Localized name of the resource",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required().min(1),
      codegen: { required: true },
    }),
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        'Unique identifier for this resource. Paths will be "/resources/{slug}" or "/kr/resources/{slug}".',
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
          title?.find(({ _key }: any) => _key == "en").value ||
          "Unnamed Resource",
        subtitle: `/resources/${slug.current}`,
      };
    },
  },
});
