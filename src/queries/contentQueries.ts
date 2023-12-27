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
import type { Article, Artist, SiteFooter } from "@/sanity";

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

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)] {
  "slug": slug.current
}
`;

export const artistSlugsQuery = groq`
*[_type == "artist" && defined(slug.current)] {
  "artistSlug": slug.current
}
`;

export const articlesSlugQuery = groq`
*[_type == "article" && defined(slug.current)] {
  "slug": slug.current
}
`;

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
