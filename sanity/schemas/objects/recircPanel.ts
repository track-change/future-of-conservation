import { BiLinkAlt } from "react-icons/bi";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Recirculation Panel",
  name: "recircPanel",
  type: "object",
  fields: [
    defineField({
      title: "Link",
      // description: "The content to link to in this panel (Max: 1).",
      name: "targetInternal",
      type: "internalLink",
    }),
    // defineField({
    //   title: "Overtext",
    //   name: "overtext",
    //   type: "internationalizedArrayString",
    //   description: "Text placed above the link title",
    // }),
    defineField({
      title: "Undertext",
      name: "undertext",
      type: "internationalizedArrayString",
      description: "Text placed below the link title",
    }),
  ],
  preview: {
    select: {
      internalTitle: "targetInternal.title",
      internalTargetType: "targetInternal.linkTarget._type",
      internalTargetTitle: "targetInternal.linkTarget.title",
      interviewTitle: "targetInternal.linkTarget.interviewTitle",
      internalLink: "targetInternal.linkTarget.slug.current",
      subPath: "targetInternal.subpath",
    },
    prepare({
      internalTitle,
      internalTargetType,
      internalTargetTitle,
      interviewTitle,
      internalLink,
      subPath,
    }) {
      let title = "";
      title =
        internalTargetTitle?.find(({ _key }: any) => _key === "en").value ||
        title;
      switch (internalTargetType) {
        case "pageHome":
          internalLink = "/";
          break;
        case "pageArtists":
          internalLink = "artists";
          break;
        case "artist":
          internalLink = `artists/${internalLink}`;
          if (subPath === "/interview")
            title =
              (title ? `${title}: ` : "") +
                interviewTitle?.find(({ _key }: any) => _key === "en").value ||
              title;
          break;
      }
      title =
        internalTitle?.find(({ _key }: any) => _key === "en").value || title;
      return {
        title,
        subtitle:
          internalTargetType === "article"
            ? "<Opens Article File>"
            : `/${internalLink || ""}${subPath || ""}`,
      };
    },
  },
});
