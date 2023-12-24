export const singletons = [
  "pageHome",
  "pageArtists",
  "pageArticles",
  "pageResources",
];

export const linkTargets = [
  { type: "page" },
  { type: "artist" },
  ...singletons.map((type) => ({ type })),
];
