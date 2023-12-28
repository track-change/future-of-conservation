import groq from "groq";
import {
  linkQuery,
  localizedField,
  localizedFieldLang,
  localizedFieldWithLang,
  recircPanelQuery,
} from "@/queries/helperFragments";
import type { QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
import { astroI18n } from "astro-i18n";
import type { AstroGlobal } from "astro";
import type { Article, Artist, Resource, SiteFooter } from "@/sanity";

export function localizedQuery<T>(Astro: Pick<AstroGlobal, "cookies">) {
  const config =
    import.meta.env.DEV && Astro.cookies?.get("astro_draft_mode")?.boolean()
      ? ({
          perspective: "previewDrafts",
          token: import.meta.env.SANITY_API_READ_TOKEN,
        } as const)
      : {};
  return async function (query: string, params?: QueryParams) {
    const { locale, primaryLocale } = astroI18n;
    return sanityClient.withConfig(config).fetch<T>(query, {
      locale,
      primaryLocale,
      ...params,
    });
  };
}

/* -------------------------------------------------------------------------- */
/*                                Static Paths                                */
/* -------------------------------------------------------------------------- */

const slugsQuery = (type: string) => groq`
*[_type == "${type}" && defined(slug.current)] {
  "slug": slug.current
}
`;

export const slugsFor = (type: string) => async () => {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(slugsQuery(type));
  return slugs.map(({ slug }: { slug: string }) => ({ params: { slug } }));
};

/* -------------------------------------------------------------------------- */
/*                                    Pages                                   */
/* -------------------------------------------------------------------------- */

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  ...,
  ${localizedField("title")},
  recirculation[] {
    ${recircPanelQuery}
  }
}
`;

export const siteHeaderQuery = groq`
*[_type == "siteHeader"][0] {
  navItems[] {
    ${linkQuery}
  }
}
`;

export type SiteFooterQueryType = SiteFooter & {
  descriptionLang?: string;
  creditsLang?: string;
  copyrightLang?: string;
  supportLang?: string;
};

export const siteFooterQuery = groq`
*[_type == "siteFooter"][0] {
  ${localizedFieldWithLang("description")},
  ${localizedFieldWithLang("credits")},
  ${localizedFieldWithLang("copyright")},
  ${localizedFieldWithLang("support")}
}
`;

/* -------------------------------------------------------------------------- */
/*                                 Collections                                */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Artists -------------------------------- */

export type ArtistsQueryType = (Artist & { titleLang?: string })[];

export const artistsQuery = groq`
*[_type == "artist"] {
  _type,
  slug,
  picture,
  ${localizedFieldWithLang("title")},
  tags[] -> {
    ${localizedFieldWithLang("title")},
    slug
  }
}
`;

export type ArtistIntroQueryType = Artist & {
  titleLang?: string;
  introductionContentLang?: string;
};
export const artistIntroQuery = groq`
*[_type == "artist" && slug.current == $slug][0] {
  ${localizedFieldWithLang("title")},
  ${localizedFieldWithLang("introductionContent")},
  introductionRecirc[] {
    ${linkQuery}
  }
}
`;

export type ArtistInterQueryType = Artist & {
  titleLang?: string;
  interviewContentLang?: string;
};
export const artistInterviewQuery = groq`
*[_type == "artist" && slug.current == $slug][0] {
  ${localizedFieldWithLang("title")},
  ${localizedFieldWithLang("interviewContent")},
  interviewRecirc[] {
    ${linkQuery}
  }
}
`;

/* -------------------------------- Articles -------------------------------- */

export type ArticlesQueryType = (Article & {
  titleLang?: string;
  authorExternalLang?: string;
})[];

export const articlesQuery = groq`
*[_type == "article"] {
  _type,
  articleTags,
  ${localizedFieldWithLang("title")},
  file {
    asset -> {
      url
    }
  },
  isExternalAuthor,
  isExternalAuthor == false => {
    author -> {
      _type,
      slug,
      ${localizedFieldWithLang("title")}
    }
  },
  isExternalAuthor == true => {
    ${localizedFieldWithLang("authorExternal")}
  }
}
`;

/* -------------------------------- Resources ------------------------------- */

export type ResourcesQueryType = (Resource & {
  titleLang?: string;
})[];

export const resourcesQuery = groq`
*[_type == "resource"] {
  _type,
  slug,
  ${localizedFieldWithLang("title")},
}
`;

export type ResourceQueryType =
  | (Resource & {
      titleLang?: string;
      contentLang?: string;
    })
  | null;

export const resourceQuery = groq`
*[_type == "resource" && slug.current == $slug][0] {
  _type,
  ${localizedFieldWithLang("title")},
  ${localizedFieldWithLang("content")},
  recirc[] {
    ${linkQuery}
  }
}
`;
