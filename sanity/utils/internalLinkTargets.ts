export const singletons = [
  "pageHome",
  "pageArtists",
  "pageArticles",
  "pageResources",
];

export const documents = ["page", "artist", "article", "resource"];

export const linkTargets = [
  ...documents.map((type) => ({ type })),
  ...singletons.map((type) => ({ type })),
];
