import { BiDirections } from "react-icons/bi/";
import { linkTargets } from "../../utils/internalLinkTargets";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Internal Link",
  name: "internalLink",
  type: "object",
  icon: BiDirections,
  fields: [
    {
      title: "Link Target",
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
    defineField({
      title: "Subpath",
      description:
        "A subpath under the referenced document to link to. For example, if your link target is an Artist, you can optionally link to the Artists' intervew with subpath `/interview`. In this special case, the link's default title will be the interview title.",
      name: "subpath",
      type: "string",
    }),
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
