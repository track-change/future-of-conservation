import { BsSuperscript } from "react-icons/bs/";
import { defineType } from "sanity";
import { validateSlug } from "../../utils/helperFunctions";
import { uuid } from "@sanity/uuid";

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
      validation: (Rule) => validateSlug(Rule.required()),
      codegen: { required: true },
      readOnly: true,
      hidden: true,
      initialValue: () => ({ current: `fn-${uuid().slice(0, 8)}` }),
    },
    {
      title: "Content",
      description: "Text content to show in the footnote.",
      name: "content",
      type: "internationalizedArrayText" as const,
    },
  ],
  preview: {
    select: {
      title: "content",
    },
    prepare({ title }) {
      return {
        title: title?.find(({ _key }: any) => _key == "en").value || "Footnote",
        media: BsSuperscript,
      };
    },
  },
});
