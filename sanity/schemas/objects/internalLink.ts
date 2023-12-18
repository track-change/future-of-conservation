import { BiDirections } from "react-icons/bi/";
import { linkTargets } from "../../utils/internalLinkTargets";
import { defineType } from "sanity";

export default defineType({
  title: "Internal Link",
  name: "internalLink",
  type: "object",
  icon: BiDirections,
  fields: [
    {
      title: "Internal Link",
      name: "linkTarget",
      type: "reference",
      to: linkTargets,
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      title: "Title",
      description: "Keep empty to use Internal link title",
      name: "title",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      targetTitle: "linkTarget.title",
    },
    prepare({ title, targetTitle }) {
      return {
        title: title ?? targetTitle ?? "",
        media: BiDirections,
      };
    },
  },
});
