import { BiHome } from "react-icons/bi/";
import { defineType } from "sanity";

export default defineType({
  title: "Home",
  name: "pageHome",
  type: "document",
  icon: BiHome,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Home",
        media: BiHome,
      };
    },
  },
});
