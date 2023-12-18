import { type ResolveProductionUrlContext, type SanityDocument } from "sanity";
import Iframe from "sanity-plugin-iframe-pane";
import {
  type DefaultDocumentNodeResolver,
  type StructureContext,
} from "sanity/desk";

/*
list of schema types supporting preview
*/
const previewSchemaTypes = ["pageHome", "project", "page"];

/*
default document node:
add preview view if part of list
*/
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  const frontendUrl = import.meta.env.VITE_SANITY_FRONTEND_URL;

  if (previewSchemaTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title("Preview")
        .options({
          url: (doc: SanityDocument) =>
            resolveProductionUrl({ doc, context: S.context, frontendUrl }),
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
  frontendUrl = "http://localhost:4321",
}: {
  doc?: SanityDocument;
  context: ResolveProductionUrlContext | StructureContext;
  frontendUrl: string;
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
    const url = new URL(frontendUrl);

    // Switch for resolving doc type urls
    switch (doc._type) {
      case "pageHome":
        url.pathname = `/`;
        break;
      case "page":
        url.pathname = `/${slug}/`;
        break;
      case "project":
        url.pathname = `/projects/${slug}`;
        break;
      default:
        break;
    }

    // Add preview url params
    url.searchParams.set("preview", "true");

    return url.toString();
  }

  return "";
};
