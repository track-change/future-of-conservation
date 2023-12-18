import { BiGitRepoForked } from "react-icons/bi";
import { defineType } from "sanity";
import { linkTargets } from "../../utils/internalLinkTargets";

export default defineType({
  title: "Nav Group",
  name: "navGroup",
  type: "object",
  icon: BiGitRepoForked,
  fields: [
    {
      title: "Top Level Route",
      description: "The route beneath which the subroutes exist.",
      name: "routeGroup",
      type: "reference",
      to: linkTargets,
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      title: "Subroutes",
      description:
        "Any routes beneath the top-level route to render in the menu.",
      name: "subRoutes",
      type: "array",
      of: [
        {
          type: "reference",
          to: linkTargets,
          options: {
            disableNew: true,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "routeGroup.title",
      subtitle: "subRoutes",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `${subtitle?.length || 0} subroutes`,
      };
    },
  },
});
