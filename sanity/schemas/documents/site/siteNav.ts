import { BiMapAlt } from "react-icons/bi/";

export default {
  title: "Navigation",
  name: "siteNav",
  type: "document",
  icon: BiMapAlt,
  fields: [
    {
      title: "Header Navigation",
      description: "Items to display in the header.",
      name: "navMain",
      type: "array",
      layout: "grid",
      editModal: "popover",
      of: [
        {
          type: "navGroup",
        },
      ],
    },
    {
      title: "Footer Navigation",
      name: "navFooter",
      type: "array",
      layout: "grid",
      editModal: "popover",
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
        title: "Navigation",
      };
    },
  },
};
