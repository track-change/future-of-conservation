import type { Page } from "@/sanity";
import { resolveLinkURL } from "@/utils/resolveLinks";
import { map, Observable } from "rxjs";
import type {
  DocumentLocationResolver,
  DocumentLocationsState,
} from "sanity/presentation";

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === "siteNav") {
    return {
      message: "This document is used on all pages",
      tone: "caution",
    } satisfies DocumentLocationsState;
  }

  if (params.type === "page") {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title}`,
      params,
      { perspective: "previewDrafts" },
    ) as Observable<
      | {
          _type: string;
          slug: { current: string };
          title: string | null;
        }[]
      | null
    >;
    return doc$.pipe(
      map((docs) => {
        const isReferencedBySettings = docs?.some(
          (doc) => doc._type === "siteNav",
        );
        switch (params.type) {
          // case "site_home":
          // return isReferencedBySettings || true
          //   ? ({
          //       locations: [
          //         {
          //           title:
          //             docs?.find((doc) => doc._type === "site_home")?.title ||
          //             "Home",
          //           href: resolveHref(params.type)!,
          //         },
          //       ],
          //       tone: "positive",
          //       message: "This document is used to render the landing page.",
          //     } satisfies DocumentLocationsState)
          //   : ({
          //       tone: "critical",
          //       message: `The nav menu isn't linking to the home page. This might make it difficult for visitors to navigate your site.`,
          //     } satisfies DocumentLocationsState);
          case "page":
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveLinkURL(doc as Page);
                  return {
                    title: doc?.title || "Untitled",
                    href: href!,
                  };
                })
                .filter((doc) => doc.href !== undefined),
              tone: isReferencedBySettings ? "positive" : "critical",
              message: isReferencedBySettings
                ? "The nav menu is linking to this page"
                : "The nav menu isn't linking to this page. It can still be accessed if the visitor knows the URL.",
            } satisfies DocumentLocationsState;
          default:
            return {
              message: "Unable to map document type to locations",
              tone: "critical",
            } satisfies DocumentLocationsState;
        }
      }),
    );
  }

  return null;
};
