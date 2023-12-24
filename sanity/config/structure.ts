import { type StructureResolver } from "sanity/desk";
import { singletons } from "../utils/internalLinkTargets";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentListItem().id("siteHeader").schemaType("siteHeader"),
      S.documentListItem().id("siteFooter").schemaType("siteFooter"),
      S.divider(),
      ...singletons.map((id) => S.documentListItem().id(id).schemaType(id)),
      S.listItem({
        title: "Custom Pages",
        id: "pages",
        schemaType: "page",
        child: () =>
          S.documentTypeList("page")
            .title("Custom Pages")
            .defaultOrdering([
              {
                field: "title",
                direction: "asc",
              },
            ]),
      }),
      S.divider(),
      S.listItem({
        title: "Artists",
        id: "artists",
        schemaType: "artist",
        child: () =>
          S.documentTypeList("artist")
            .title("Artists")
            .defaultOrdering([
              {
                field: "title",
                direction: "asc",
              },
            ]),
      }),
      S.listItem({
        title: "Articles",
        id: "articles",
        schemaType: "article",
        child: () =>
          S.documentTypeList("article")
            .title("Articles")
            .defaultOrdering([
              {
                field: "title",
                direction: "asc",
              },
            ]),
      }),
    ]);
