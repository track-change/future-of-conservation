export default function isPreview() {
  return import.meta.env.VITE_IS_PREVIEW === "yes";
}
