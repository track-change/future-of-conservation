import { defineField, defineType } from "sanity";
import { slugify, validateSlug } from "../../../utils/helperFunctions";
import { FiArchive } from "react-icons/fi";

export default defineType({
  title: "Resource",
  name: "resource",
  type: "document",
  icon: FiArchive,
  groups: [
    {
      title: "Resource",
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
      description: "Localized name of the resource",
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
        'Unique identifier for this resource. Paths will be "/resources/{slug}" or "/kr/resources/{slug}".',
      options: {
        source: "title",
        slugify: slugify,
      },
      validation: validateSlug,
      codegen: { required: true },
      group: "content",
    },
    defineField({
      title: "Content",
      name: "content",
      description: "The text / media content of the resource, with footnotes.",
      type: "internationalizedArrayEditorTextMedia",
      group: "content",
    }),
    defineField({
      title: "Recirculation",
      description: "Outgoing links at the end of the resource page.",
      name: "recirc",
      type: "array",
      group: "content",
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
          "Unnamed Resource",
        subtitle: `/resources/${slug.current}`,
      };
    },
  },
});
