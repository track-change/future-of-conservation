import { type StructureResolver } from "sanity/desk";
import { documents, singletons } from "../utils/internalLinkTargets";
import { capitalized } from "../utils/helperFunctions";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentListItem().id("siteHeader").schemaType("siteHeader"),
      S.documentListItem().id("siteFooter").schemaType("siteFooter"),
      S.divider(),
      ...documents
        .filter((type) => type !== "page")
        .map((type) =>
          S.listItem({
            title: capitalized(type + "s"),
            id: type,
            schemaType: type,
            child: () =>
              S.documentTypeList(type)
                .title(capitalized(type + "s"))
                .defaultOrdering([
                  {
                    field: "title",
                    direction: "asc",
                  },
                ]),
          }),
        ),
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
    ]);
