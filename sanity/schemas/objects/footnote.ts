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
      type: "internationalizedArrayEditorText",
    },
    {
      title: "Post Content",
      description: "Footnote content to show at the end of the body text.",
      name: "marginContent",
      type: "internationalizedArrayEditorText",
    },
  ],
});
