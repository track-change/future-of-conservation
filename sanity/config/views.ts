import { type ResolveProductionUrlContext, type SanityDocument } from "sanity";
import { Iframe } from "sanity-plugin-iframe-pane";
import {
  type DefaultDocumentNodeResolver,
  type StructureContext,
} from "sanity/desk";
// import { sanityClient } from "sanity:client";

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
          url: {
            origin: "same-origin",
            preview: (doc: SanityDocument) =>
              resolveProductionUrl({ doc, context: S.context }),
            draftMode: "/draftMode/enable",
          },
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
          url: {
            origin: "same-origin",
            preview: (doc: SanityDocument) =>
              resolveProductionUrl({ doc, context: S.context }),
            draftMode: "/draftMode/enable",
          },
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
  // preview = false,
}: {
  doc?: SanityDocument;
  context: ResolveProductionUrlContext | StructureContext;
  prefix?: string;
  // preview?: boolean;
}) => {
  const { getClient } = context;

  if (!doc) {
    doc = context.document as unknown as SanityDocument;
  }

  const finalUrl = new URL(window.location.origin);
  if (previewSchemaTypes.includes(doc._type)) {
    const client = getClient({ apiVersion: "2022-05-04" });
    const slug = await client.fetch(`*[_id == $id][0].slug.current`, {
      id: doc._id,
    });
    console.log(doc, slug);

    // Switch for resolving doc type urls
    switch (doc._type) {
      case "page":
        finalUrl.pathname = `${prefix}/${slug}/`;
        break;
      case "artist":
        finalUrl.pathname = `${prefix}/artists/${slug}`;
        break;
      case "pageArtists":
        finalUrl.pathname = `${prefix}/artists`;
        break;
      case "pageHome":
      case "siteHeader":
      case "siteFooter":
      default:
        finalUrl.pathname = `${prefix}/`;
        break;
    }
  }

  // // If preview mode, add in Sanity api token
  // if (preview) {
  //   try {
  //     const token = localStorage.getItem(
  //       `__studio_auth_token_${sanityClient.config().projectId}`,
  //     );
  //     if (token) {
  //       const prevPath = finalUrl.pathname;
  //       finalUrl.pathname = "/preview/enter";
  //       const tokenParsed = JSON.parse(token)["token"];
  //       finalUrl.searchParams.set("redirect", prevPath);
  //       finalUrl.searchParams.set("token", tokenParsed);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // console.log(finalUrl.toString());

  return finalUrl.pathname;
};
