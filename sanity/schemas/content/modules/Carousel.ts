import { BiImages } from "react-icons/bi/";
import { defineType, defineField } from "sanity";

export default defineType({
  title: "Image Carousel",
  name: "module_carousel",
  type: "object",
  icon: BiImages,
  fields: [
    defineField({
      title: "Images",
      name: "images",
      description:
        "Captioned pictures to put in the carousel. If there is only one, the carousel becomes a static captioned picture.",
      type: "array" as const,
      of: [{ type: "pictureTitled" }],
    }),
  ],
  preview: {
    select: {
      filename: "images[0].asset.originalFilename",
      caption: "images[0].caption",
      images: "images",
      image: "images[0].asset",
    },
    prepare(selection) {
      const { image, images } = selection;
      return {
        title: "Image Carousel",
        subtitle: `${images.length} images`,
        media: image,
      };
    },
  },
});
