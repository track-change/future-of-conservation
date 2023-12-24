import { styles } from "../text/styles";
import { decorators } from "../text/decorators";
import { annotations } from "../text/annotations";
import { inline } from "../text/inline";

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
      of: inline,
      marks: {
        decorators,
        annotations,
      },
    },
    { type: "pictureTitled" },
  ],
};
