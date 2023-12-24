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
      description: "Keep empty to use the linked page's title",
      name: "title",
      type: "internationalizedArrayString",
    },
  ],
  preview: {
    select: {
      title: "title",
      targetType: "linkTarget._type",
      targetTitle: "linkTarget.title",
      subtitle: "linkTarget.slug.current",
    },
    prepare({ title, targetType, targetTitle, subtitle }) {
      const title1 = title?.find(({ _key }: any) => _key === "en").value;
      const title2 = targetTitle.find(({ _key }: any) => _key === "en").value;
      if (targetType === "pageHome") subtitle = "/";
      if (targetType === "pageArtists") subtitle = "artists";
      return {
        title: title1 ?? title2 ?? "",
        subtitle: `/${subtitle || ""}`,
        media: BiDirections,
      };
    },
  },
});
