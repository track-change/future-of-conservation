export const singletons = [
  "pageHome",
  "pageArtists",
  "pageArticles",
  "pageResources",
];

export const linkTargets = [
  { type: "page" },
  { type: "artist" },
  { type: "article" },
  ...singletons.map((type) => ({ type })),
];
