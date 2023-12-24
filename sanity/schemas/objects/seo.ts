import { defineType } from "sanity";

export default defineType({
  title: "SEO",
  name: "seo",
  type: "object",
  fields: [
    {
      title: "Meta Description",
      name: "metaDescription",
      type: "internationalizedArrayText",
    },
    {
      title: "Meta Keywords",
      name: "metaKeywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Open Graph Image",
      name: "ogImage",
      type: "image",
    },
  ],
});
