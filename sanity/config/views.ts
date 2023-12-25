import { type ResolveProductionUrlContext, type SanityDocument } from "sanity";
import { Iframe } from "sanity-plugin-iframe-pane";
import {
  type DefaultDocumentNodeResolver,
  type StructureContext,
} from "sanity/desk";

/*
list of schema types supporting preview
*/
const previewSchemaTypes = [
  "pageHome",
  "pageArtists",
  "page",
  "artist",
  "siteHeader",
  "siteFooter",
];

/*
default document node:
add preview view if part of list
*/
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (previewSchemaTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title("Preview: EN")
        .options({
          key: "en",
          url: (doc: SanityDocument) =>
            resolveProductionUrl({ doc, context: S.context }),
          defaultSize: "desktop",
          reload: {
            button: true,
          },
          attributes: {
            allow: "fullscreen",
          },
        }),
      S.view
        .component(Iframe)
        .title("Preview: KR")
        .options({
          key: "kr",
          url: (doc: SanityDocument) =>
            resolveProductionUrl({
              doc,
              context: S.context,
              prefix: "/kr",
            }),
          defaultSize: "desktop",
          reload: {
            button: true,
          },
          attributes: {
            allow: "fullscreen",
          },
        }),
    ]);
  }
};

/*
resolve production url
*/
export const resolveProductionUrl = async ({
  doc,
  context,
  prefix = "",
}: {
  doc?: SanityDocument;
  context: ResolveProductionUrlContext | StructureContext;
  prefix?: string;
}) => {
  const { getClient } = context;

  if (!doc) {
    doc = context.document as unknown as SanityDocument;
  }

  if (previewSchemaTypes.includes(doc._type)) {
    const client = getClient({ apiVersion: "2022-05-04" });
    const slug = await client.fetch(`*[_id == $id][0].slug.current`, {
      id: doc._id,
    });

    // Build preview url
    const url = new URL(window.location.origin);

    // Switch for resolving doc type urls
    switch (doc._type) {
      case "page":
        url.pathname = `${prefix}/${slug}/`;
        break;
      case "artist":
        url.pathname = `${prefix}/artists/${slug}`;
        break;
      case "pageArtists":
        url.pathname = `${prefix}/artists`;
        break;
      case "pageHome":
      case "siteHeader":
      case "siteFooter":
      default:
        url.pathname = `${prefix}/`;
        break;
    }

    // Add preview url params
    // url.searchParams.set("preview", "true");

    return url.toString();
  }

  return "";
};
