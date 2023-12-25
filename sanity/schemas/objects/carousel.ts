import { BiImages } from "react-icons/bi/";
import { defineType } from "sanity";

export default defineType({
  title: "Image Carousel",
  name: "carousel",
  type: "object",
  icon: BiImages,
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "text",
      rows: 3,
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
      return {
        title: filename ?? "",
        subtitle: caption
          ? caption
          : dimensions
            ? `(${dimensions.width}px × ${dimensions.height}px)`
            : "…",
        media: image,
      };
    },
  },
});
