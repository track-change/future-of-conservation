import { FiTag } from "react-icons/fi";
import { defineField, defineType } from "sanity";
import { slugify, validateSlug } from "../../../utils/helperFunctions";

export default defineType({
  title: "Tag",
  name: "tag",
  type: "document",
  icon: FiTag,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      description: "Localized title of the tag",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required().min(1),
      codegen: { required: true },
    }),
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description: "Unique ID for this tag to use in filtering.",
      options: {
        source: "title",
        slugify: slugify,
      },
      validation: validateSlug,
      codegen: { required: true },
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title.find(({ _key }: any) => _key == "en")?.value,
        subtitle: title.find(({ _key }: any) => _key == "kr")?.value,
      };
    },
  },
});
