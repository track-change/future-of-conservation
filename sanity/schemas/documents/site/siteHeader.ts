import { BiMapAlt } from "react-icons/bi/";

export default {
  title: "Site Header",
  name: "siteHeader",
  type: "document",
  icon: BiMapAlt,
  fields: [
    {
      title: "Navigation Bar",
      description: "Items to display in the top navigation bar.",
      name: "navItems",
      type: "array",
      layout: "grid",
      of: [
        {
          type: "internalLink",
        },
        {
          type: "link",
        },
      ],
    },
  ],
  preview: {
    prepare({}) {
      return {
        title: "Site Header",
      };
    },
  },
};
