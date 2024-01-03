import { styles } from "../text/styles";
import { decorators } from "../text/decorators";
import { annotations } from "../text/annotations";
import { defineField } from "sanity";

export default defineField({
  title: "Editor",
  name: "editorTextMin",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Regular", value: "normal" }],
      lists: [],
      marks: {
        decorators,
        annotations,
      },
    },
  ],
});
