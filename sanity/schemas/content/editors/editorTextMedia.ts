import { styles } from "../text/styles";
import { decorators } from "../text/decorators";
import { annotationsWithFootnotes } from "../text/annotations";

export default {
  title: "Editor",
  name: "editorTextMedia",
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
        annotations: annotationsWithFootnotes,
      },
    },
    { type: "pictureTitled" },
  ],
};
