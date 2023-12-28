import { BiImage } from "react-icons/bi/";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Image",
  name: "pictureTitled",
  type: "image",
  icon: BiImage,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      title: "Caption",
      name: "caption",
      type: "internationalizedArrayString",
    }),
    {
      title: "Alternative Text",
      name: "alt",
      type: "string",
      description:
        "Describes the appearance or function of the image. Alt text is used by visually impaired users and is indexed by search engine bots.",
    },
  ],
  preview: {
    select: {
      filename: "asset.originalFilename",
      caption: "caption",
      dimensions: "asset.metadata.dimensions",
      image: "asset",
    },
    prepare(selection) {
      const { filename, caption, dimensions, image } = selection;
      const captionText = caption?.find(({ _key }: any) => _key === "en").value;
      return {
        title: filename ?? "",
        subtitle: captionText
          ? captionText
          : dimensions
            ? `(${dimensions.width}px × ${dimensions.height}px)`
            : "…",
        media: image,
      };
    },
  },
});
