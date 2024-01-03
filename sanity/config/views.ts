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
  "page",
  "artist",
  "pageHome",
  "pageArtists",
  "siteHeader",
  "siteFooter",
] as const;

function isPreviewableDocument(doc: SanityDocument): doc is SanityDocument & {
  _type: (typeof previewSchemaTypes)[number];
} {
  return previewSchemaTypes.includes(doc._type as any);
}

/*
default document node:
add preview view if part of list
*/
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (schemaType === "artist") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title("Intro: EN")
        .options({
          key: "intro-en",
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
        .title("Intro: KR")
        .options({
          key: "intro-kr",
          url: {
            origin: "same-origin",
            preview: (doc: SanityDocument) =>
              resolveProductionUrl({ doc, context: S.context, prefix: "kr" }),
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
        .title("Interview: EN")
        .options({
          key: "interview-en",
          url: {
            origin: "same-origin",
            preview: (doc: SanityDocument) =>
              resolveProductionUrl({
                doc,
                context: S.context,
                suffix: "interview",
              }),
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
        .title("Interview: KR")
        .options({
          key: "interview-kr",
          url: {
            origin: "same-origin",
            preview: (doc: SanityDocument) =>
              resolveProductionUrl({
                doc,
                context: S.context,
                prefix: "kr",
                suffix: "interview",
              }),
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
  } else if (previewSchemaTypes.includes(schemaType as any)) {
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
              resolveProductionUrl({ doc, context: S.context, prefix: "kr" }),
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
  suffix = "",
  // preview = false,
}: {
  doc?: SanityDocument;
  context: ResolveProductionUrlContext | StructureContext;
  prefix?: string;
  suffix?: string;
  // preview?: boolean;
}) => {
  const { getClient } = context;

  if (!doc) {
    doc = context.document as unknown as SanityDocument;
  }

  const finalUrl = new URL(window.location.origin);
  if (isPreviewableDocument(doc)) {
    const client = getClient({ apiVersion: "2022-05-04" });
    const slug = await client.fetch(`*[_id == $id][0].slug.current`, {
      id: doc._id,
    });

    // Switch for resolving doc type urls
    switch (doc._type) {
      case "page":
        finalUrl.pathname = `${prefix}/${slug}/`;
        break;
      case "artist":
        finalUrl.pathname = `${prefix}/artists/${slug}/`;
        break;
      case "pageArtists":
        finalUrl.pathname = `${prefix}/artists/`;
        break;
      case "pageHome":
      case "siteHeader":
      case "siteFooter":
      default:
        finalUrl.pathname = `${prefix}/`;
        break;
    }
  }
  return finalUrl.pathname + suffix;
};
