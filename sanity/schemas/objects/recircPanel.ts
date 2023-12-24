import { defineField, defineType } from "sanity";

export default defineType({
  title: "Recirculation Panel",
  name: "recircPanel",
  type: "object",
  fieldsets: [{ name: "internality", title: "Link" }],
  fields: [
    defineField({
      title: "External Link?",
      type: "boolean",
      description: "Is the linked item from off-platform?",
      name: "isExternalLink",
      fieldset: "internality",
      initialValue: false,
    }),
    defineField({
      title: "Link",
      // description: "The content to link to in this panel (Max: 1).",
      name: "targetInternal",
      fieldset: "internality",
      type: "internalLink",
      hidden: ({ parent }) => parent && parent.isExternalLink,
    }),
    defineField({
      title: "Link",
      // description: "The content to link to in this panel (Max: 1).",
      name: "targetExternal",
      fieldset: "internality",
      type: "link",
      hidden: ({ parent }) => parent && !parent.isExternalLink,
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
