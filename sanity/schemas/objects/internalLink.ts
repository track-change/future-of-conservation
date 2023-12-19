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
      type: "internationalizedArrayString",
    },
  ],
  preview: {
    select: {
      title: "title",
      targetTitle: "linkTarget.title",
      subtitle: "linkTarget.slug.current",
    },
    prepare({ title, targetTitle, subtitle }) {
      let title2 = targetTitle;
      if (typeof title2 !== "string") {
        title2 = title2.find(({ _key }: any) => _key === "en").value;
      }
      return {
        title: title ?? title2 ?? "",
        subtitle: `/${subtitle || ""}`,
        media: BiDirections,
      };
    },
  },
});
