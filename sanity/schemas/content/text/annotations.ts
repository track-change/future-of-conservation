import { BiLinkAlt, BiDirections, BiPaperclip } from "react-icons/bi/";
import { linkTargets } from "../../../utils/internalLinkTargets";
import { defineArrayMember } from "sanity";
import { BsSuperscript } from "react-icons/bs";
import { validateSlug } from "../../../utils/helperFunctions";
import { uuid } from "@sanity/uuid";

export const annotations = [
  defineArrayMember({
    title: "External Link",
    name: "link",
    type: "object",
    icon: BiLinkAlt,
    initialValue: {
      blank: true,
    },
    fields: [
      {
        title: "URL",
        name: "href",
        type: "url",
        validation: (Rule) =>
          Rule.uri({
            allowRelative: true,
            scheme: ["https", "http", "mailto", "tel"],
          }),
      },
      {
        title: "Open in new tab?",
        name: "blank",
        type: "boolean",
      },
    ],
  }),
  defineArrayMember({
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
      },
    ],
  }),
  defineArrayMember({
    title: "Download",
    name: "download",
    type: "file",
    icon: BiPaperclip,
  }),
];

export const annotationsWithFootnotes = [
  ...annotations,
  defineArrayMember({
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
        validation: (Rule) => validateSlug(Rule.required()),
        codegen: { required: true },
        readOnly: true,
        hidden: true,
        initialValue: () => ({ current: `fn-${uuid().slice(0, 8)}` }),
      },
      {
        title: "Margin Content",
        description: "Footnote content to show in the margins",
        name: "marginContent",
        type: "editorText",
      },
      {
        title: "Endnotes Content",
        description: "Footnote content to show at the end of the body text.",
        name: "postContent",
        type: "editorText",
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
