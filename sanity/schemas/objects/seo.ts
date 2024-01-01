import { defineType } from "sanity";
import CustomSEOGenerate from "../../components/SeoGenerate";

export default defineType({
  title: "SEO",
  name: "seo",
  type: "object",
  fields: [
    {
      title: "Meta Description",
      description: "A meta description of the page used in SEO.",
      name: "metaDescription",
      type: "internationalizedArrayText",
    },
    {
      title: "Meta Keywords",
      description: "Comma-separated list of keywords related to this page.",
      name: "metaKeywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Open Graph Image",
      description:
        "An optional image shown as the page's image when the link is shared to social media",
      name: "ogImage",
      type: "image",
    },
  ],
  // components: {
  //   input: CustomSEOGenerate,
  // },
});
