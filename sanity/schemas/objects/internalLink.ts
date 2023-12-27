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
      linkTitle: "title",
      targetType: "linkTarget._type",
      targetTitle: "linkTarget.title",
      linkTarget: "linkTarget.slug.current",
      interviewTitle: "linkTarget.interviewTitle",
      subpath: "subpath",
    },
    prepare({
      linkTitle,
      targetType,
      targetTitle,
      linkTarget,
      interviewTitle,
      subpath,
    }) {
      let title =
        targetTitle.find(({ _key }: any) => _key === "en").value || "";
      switch (targetType) {
        case "pageHome":
          linkTarget = "";
          break;
        case "pageArtists":
          linkTarget = "artists";
          break;
        case "artist":
          linkTarget = `artists/${linkTarget}`;
          if (subpath === "/interview")
            title =
              (title ? `${title}: ` : "") +
                interviewTitle?.find(({ _key }: any) => _key === "en").value ||
              title;
          break;
      }
      title = linkTitle?.find(({ _key }: any) => _key === "en").value || title;
      return {
        title,
        subtitle:
          targetType === "article"
            ? "<Opens Article File>"
            : `/${linkTarget || ""}${subpath || ""}`,
      };
    },
  },
});
