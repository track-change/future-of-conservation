import { BiMapAlt } from "react-icons/bi/";

export default {
  title: "Navigation",
  name: "siteNav",
  type: "document",
  icon: BiMapAlt,
  fields: [
    {
      title: "Header Navigation (Top)",
      description: "Items to display in the top header bar.",
      name: "navHeaderTop",
      type: "array",
      layout: "grid",
      // editModal: "popover",
      of: [
        {
          type: "internalLink",
        },
        {
          type: "link",
        },
      ],
    },
    {
      title: "Header Navigation (Bottom)",
      description: "Items to display in the top header bar.",
      name: "navHeaderBot",
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
