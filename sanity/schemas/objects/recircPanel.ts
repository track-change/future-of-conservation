import { defineField, defineType } from "sanity";

export default defineType({
  title: "Recirculation Panel",
  name: "recircPanel",
  type: "object",
  fields: [
    defineField({
      title: "Link",
      description: "The content to link to in this panel (Max: 1).",
      name: "target",
      type: "array",
      validation: (Rule) => Rule.min(1).required(),
      codegen: { required: true },
      of: [
        {
          type: "internalLink",
        },
        {
          type: "link",
        },
      ],
    }),
    defineField({
      title: "Undertext",
      name: "undertext",
      type: "string",
    }),
    defineField({
      title: "Overtext",
      name: "overtext",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "target",
      subtitle: "undertext",
    },
    prepare({ title: titleObj, subtitle }) {
      let title = "";
      if (titleObj.length > 0) {
        if (titleObj[0].title) {
          title = titleObj[0].title.find(
            ({ _key }: any) => _key === "en",
          ).value;
        } else if (titleObj[0].linkTarget) {
          title = titleObj[0].linkTarget._ref;
        }
      }
      return {
        title: (title ?? "").toUpperCase(),
        subtitle: subtitle,
      };
    },
  },
});
