import { SiGooglesheets } from "react-icons/si";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Google Sheet",
  name: "module_googlesheet",
  type: "object",
  icon: SiGooglesheets,
  fields: [
    defineField({
      title: "Title",
      description:
        "A label shown above the Google Sheet, linking to open it in a new tab.",
      name: "title",
      type: "internationalizedArrayString",
    }),
    defineField({
      title: "URL",
      description:
        "The embed URL of the google sheet. It can be found as the `src` attribute of the `iframe` provided when you publish your sheet as an embed from Google Sheets.",
      name: "url",
      type: "string",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
    prepare({ title, subtitle }) {
      return {
        title: title.find(({ _key }: any) => _key === "en").value,
        subtitle,
      };
    },
  },
});
