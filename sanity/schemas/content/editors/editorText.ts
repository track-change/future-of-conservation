import { styles } from "../text/styles";
import { decorators } from "../text/decorators";
import { annotations } from "../text/annotations";
import { inline } from "../text/inline";
import { defineField } from "sanity";

export default defineField({
  title: "Editor",
  name: "editorText",
  type: "array",
  of: [
    {
      type: "block",
      styles,
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators,
        annotations,
      },
    },
  ],
});
