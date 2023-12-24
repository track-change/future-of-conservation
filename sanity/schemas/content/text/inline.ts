import { BsSuperscript } from "react-icons/bs";
import { defineArrayMember } from "sanity";

export const inline = [
  defineArrayMember({
    title: "Footnote",
    name: "footnote",
    type: "object",
    icon: BsSuperscript,
    fields: [
      {
        title: "Margin Content",
        description: "Footnote content to show in the margins",
        name: "marginContent",
        type: "internationalizedArrayEditorText",
      },
      {
        title: "Endnotes Content",
        description: "Footnote content to show at the end of the body text.",
        name: "postContent",
        type: "internationalizedArrayEditorText",
      },
    ],
    preview: {
      prepare() {
        return {
          title: "Footnote",
          media: BsSuperscript,
        };
      },
    },
  }),
];
