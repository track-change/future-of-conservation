import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `internationalizedArrayString`
   *
   * Localized title to use for links and SEO
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique identifier for this page. Resulting path will be "/{slug}" or "/kr/{slug}".
   */
  slug: { _type: "slug"; current: string };

  /**
   * Content — `array`
   *
   *
   */
  content?: Array<SanityKeyed<PageBlock>>;

  /**
   * Recirculation — `array`
   *
   * Outgoing links at the end of the page.
   */
  recirculation?: Array<SanityKeyed<RecircPanel>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Artist
 *
 *
 */
export interface Artist extends SanityDocument {
  _type: "artist";

  /**
   * Title — `internationalizedArrayString`
   *
   * Localized name of the artist
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique identifier for this artist. Paths will be "/artists/{slug}" or "/kr/artists/{slug}".
   */
  slug: { _type: "slug"; current: string };

  /**
   * Tags — `tags`
   *
   * Tags used to filter the artists in the /artists page.
   */
  artistTags?: Tags;

  /**
   * Introduction — `internationalizedArrayEditorTextMedia`
   *
   * The text / media content of the introduction, with footnotes.
   */
  introductionContent?: InternationalizedArrayEditorTextMedia;

  /**
   * Introduction Recirculation — `array`
   *
   * Outgoing links at the end of the introduction page.
   */
  introductionRecirc?: Array<SanityKeyed<RecircPanel>>;

  /**
   * Interview Title — `internationalizedArrayString`
   *
   * A title for the interview.
   */
  interviewTitle?: InternationalizedArrayString;

  /**
   * Interview — `internationalizedArrayEditorTextMedia`
   *
   * The text / media content of the interview, with footnotes.
   */
  interviewContent?: InternationalizedArrayEditorTextMedia;

  /**
   * Interview Recirculation — `array`
   *
   * Outgoing links at the end of the introduction page.
   */
  interviewRecirc?: Array<SanityKeyed<RecircPanel>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Article
 *
 *
 */
export interface Article extends SanityDocument {
  _type: "article";

  /**
   * Title — `internationalizedArrayString`
   *
   * Localized name of the article
   */
  title: InternationalizedArrayString;

  /**
   * File — `file`
   *
   * The article's file, typically a PDF.
   */
  file: { _type: "file"; asset: SanityReference<any> };

  /**
   * Tags — `tags`
   *
   * Tags used to filter the articles in the /articles page.
   */
  articleTags?: Tags;

  /**
   * External Author — `boolean`
   *
   * Is the author not an artist on the platform?
   */
  isExternalAuthor?: boolean;

  /**
   * External Author — `internationalizedArrayString`
   *
   * The name of the article's author.
   */
  authorExternal?: InternationalizedArrayString;

  /**
   * Author — `reference`
   *
   * The article's author.
   */
  author?: SanityReference<Artist>;
}

/**
 * Page - Home
 *
 *
 */
export interface PageHome extends SanityDocument {
  _type: "pageHome";

  /**
   * Title — `internationalizedArrayString`
   *
   * A title for the home page, used in links to it.
   */
  title: InternationalizedArrayString;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * pageArtists
 *
 *
 */
export interface PageArtists extends SanityDocument {
  _type: "pageArtists";

  /**
   * Title — `internationalizedArrayString`
   *
   * A title for the page, used in links to it.
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique identifier for this page. Resulting path will be "/{slug}" or "/kr/{slug}".
   */
  slug: { _type: "slug"; current: string };

  /**
   * Artists — `array`
   *
   * The ordered list of artists to display on the /artists page.
   */
  artists?: Array<SanityKeyedReference<Artist>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * pageArticles
 *
 *
 */
export interface PageArticles extends SanityDocument {
  _type: "pageArticles";

  /**
   * Title — `internationalizedArrayString`
   *
   * A title for the page, used in links to it.
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique identifier for this page. Resulting path will be "/{slug}" or "/kr/{slug}".
   */
  slug: { _type: "slug"; current: string };

  /**
   * Articles — `array`
   *
   * The ordered list of articles to display on the /articles page.
   */
  articles?: Array<SanityKeyedReference<Artist>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * pageResources
 *
 *
 */
export interface PageResources extends SanityDocument {
  _type: "pageResources";

  /**
   * Title — `internationalizedArrayString`
   *
   * A title for the page, used in links to it.
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique identifier for this page. Resulting path will be "/{slug}" or "/kr/{slug}".
   */
  slug: { _type: "slug"; current: string };

  /**
   * Artists — `array`
   *
   * The ordered list of artists to display on the /artists page.
   */
  artists?: Array<SanityKeyedReference<Artist>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Site Header
 *
 *
 */
export interface SiteHeader extends SanityDocument {
  _type: "siteHeader";

  /**
   * Navigation Bar — `array`
   *
   * Items to display in the top navigation bar.
   */
  navItems?: Array<SanityKeyed<InternalLink> | SanityKeyed<Link>>;
}

/**
 * Site Footer
 *
 *
 */
export interface SiteFooter extends SanityDocument {
  _type: "siteFooter";

  /**
   * Page Title — `string`
   *
   *
   */
  name: string;
}

export type EditorText = Array<SanityKeyed<SanityBlock>>;

export type EditorTextMedia = Array<
  SanityKeyed<SanityBlock> | SanityKeyed<PictureTitled>
>;

export type Link = {
  _type: "link";
  /**
   * URL — `url`
   *
   *
   */
  href: string;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Open in new tab? — `boolean`
   *
   *
   */
  blank?: boolean;
};

export type InternalLink = {
  _type: "internalLink";
  /**
   * Link Target — `reference`
   *
   *
   */
  linkTarget: SanityReference<
    | Page
    | Artist
    | Article
    | PageHome
    | PageArtists
    | PageArticles
    | PageResources
  >;

  /**
   * Title — `internationalizedArrayString`
   *
   * Keep empty to use the linked page's title
   */
  title?: InternationalizedArrayString;

  /**
   * Subpath — `string`
   *
   * A subpath under the referenced document to link to. For example, if your link target is an Artist, you can optionally link to the Artists' intervew with subpath `/interview`. In this special case, the link's default title will be the interview title.
   */
  subpath?: string;
};

export type Picture = {
  _type: "picture";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Alternative Text — `string`
   *
   * Describes the appearance or function of the image. Alt text is used by visually impaired users and is indexed by search engine bots.
   */
  alt?: string;
};

export type PictureTitled = {
  _type: "pictureTitled";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `internationalizedArrayText`
   *
   *
   */
  caption?: InternationalizedArrayText;

  /**
   * Alternative Text — `string`
   *
   * Describes the appearance or function of the image. Alt text is used by visually impaired users and is indexed by search engine bots.
   */
  alt?: string;
};

export type Seo = {
  _type: "seo";
  /**
   * Meta Description — `internationalizedArrayText`
   *
   *
   */
  metaDescription?: InternationalizedArrayText;

  /**
   * Meta Keywords — `array`
   *
   *
   */
  metaKeywords?: Array<SanityKeyed<string>>;

  /**
   * Open Graph Image — `image`
   *
   *
   */
  ogImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type RecircPanel = {
  _type: "recircPanel";
  /**
   * Link — `internalLink`
   *
   *
   */
  targetInternal?: InternalLink;

  /**
   * Undertext — `internationalizedArrayString`
   *
   * Text placed below the link title
   */
  undertext?: InternationalizedArrayString;
};

export type PageBlock = {
  _type: "page_block";
  /**
   * Internal Title — `string`
   *
   * An internal title for the text block.
   */
  title?: string;

  /**
   * Content — `internationalizedArrayEditorText`
   *
   * Translatable text content.
   */
  content?: InternationalizedArrayEditorText;
};

export type Documents =
  | Page
  | Artist
  | Article
  | PageHome
  | PageArtists
  | PageArticles
  | PageResources
  | SiteHeader
  | SiteFooter;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type InternationalizedArrayString = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Tags = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type InternationalizedArrayEditorTextMedia = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type InternationalizedArrayText = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type InternationalizedArrayEditorText = any;
