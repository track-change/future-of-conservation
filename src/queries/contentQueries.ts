import groq from "groq";
import {
  linkQuery,
  localizedField,
  recircPanelQuery,
} from "@/queries/helperFragments";
import type { QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
import { astroI18n } from "astro-i18n";

export async function localizedQuery<T>(
  query: string,
  params?: QueryParams,
): Promise<T> {
  const { locale, primaryLocale } = astroI18n;
  return sanityClient.fetch<T>(query, {
    locale,
    primaryLocale,
    ...params,
  });
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

/* -------------------------------------------------------------------------- */
/*                                 Collections                                */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Artists -------------------------------- */

export const artistsQuery = groq`
*[_type == "artist"] {
  _type,
  slug,
  picture,
  ${localizedField("title")},
  artistTags
}
`;

export const artistIntroQuery = groq`
*[_type == "artist" && slug.current == $slug][0] {
  ${localizedField("title")},
  ${localizedField("introductionContent")},
  introductionRecirc[] {
    ${recircPanelQuery}
  }
}
`;

export const artistInterviewQuery = groq`
*[_type == "artist" && slug.current == $slug][0] {
  ${localizedField("title")},
  ${localizedField("interviewContent")},
  interviewRecirc[] {
    ${recircPanelQuery}
  }
}
`;

/* -------------------------------- Articles -------------------------------- */

export const articlesQuery = groq`
*[_type == "article"] {
  _type,
  articleTags,
  ${localizedField("title")},
  file {
    asset -> {
      url
    }
  },
  isExternalAuthor,
  isExternalAuthor == true => {
    author -> {
      _type,
      slug,
      ${localizedField("title")}
    }
  },
  isExternalAuthor == false => {
    authorExternal
  }
}
`;
