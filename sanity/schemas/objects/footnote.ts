import { BsSuperscript } from "react-icons/bs/";
import { linkTargets } from "../../utils/internalLinkTargets";
import { defineType } from "sanity";

export default defineType({
  title: "Footnote",
  name: "footnote",
  type: "object",
  icon: BsSuperscript,
  fields: [
    {
      title: "Footnote ID",
      description:
        "A unique slug for the footnote to allow jumping to/from it.",
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      initialValue: () => ({
        current: "aaa",
      }),
    },
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
      title: "Margin Content",
      description: "Footnote content to show in the margins",
      name: "marginContent",
      type: "text",
    },
    {
      title: "Post Content",
      description: "Footnote content to show at the end of the body text.",
      name: "marginContent",
      type: "text",
    },
  ],
});
