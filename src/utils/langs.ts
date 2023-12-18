let languages = ["en", "kr"] as const;
function getTransLink(language: (typeof languages)[number], slug: string) {
  return language === "en" ? slug : `/${language}${slug}`;
}
export { getTransLink, languages };
