import {
  TextLg,
  TextBold,
  TextSm,
  TextSpeaker,
} from "../../../components/TextPreviews";

// Define Hierarchie of text
export const styles = [
  { title: "Regular", value: "normal" },
  {
    title: "Headline 1",
    value: "h1",
    component: TextLg,
  },
  {
    title: "Headline 2",
    value: "h2",
    component: TextLg,
  },
  {
    title: "Headline 3",
    value: "h3",
    component: TextBold,
  },
  {
    title: "Small",
    value: "small",
    component: TextSm,
  },
  {
    title: "Speaker",
    value: "speaker",
    component: TextSpeaker,
  },
];
