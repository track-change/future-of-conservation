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
   * Content — `pageContents`
   *
   *
   */
  content: PageContents;
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
   * Tags — `array`
   *
   * Tags used to filter the artists in the /artists page.
   */
  tags?: Array<SanityKeyedReference<Tag>>;

  /**
   * Introduction Page — `pageContents`
   *
   *
   */
  introduction?: PageContents;

  /**
   * Interview Title — `internationalizedArrayString`
   *
   * A title for the interview.
   */
  interviewTitle?: InternationalizedArrayString;

  /**
   * Interview Page — `pageContents`
   *
   *
   */
  interview?: PageContents;
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
 * Resource
 *
 *
 */
export interface Resource extends SanityDocument {
  _type: "resource";

  /**
   * Title — `internationalizedArrayString`
   *
   * Localized name of the resource
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique identifier for this resource. Paths will be "/resources/{slug}" or "/kr/resources/{slug}".
   */
  slug: { _type: "slug"; current: string };

  /**
   * Content — `pageContents`
   *
   *
   */
  content: PageContents;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title — `internationalizedArrayString`
   *
   * Localized title of the tag
   */
  title: InternationalizedArrayString;

  /**
   * Slug — `slug`
   *
   * Unique ID for this tag to use in filtering.
   */
  slug: { _type: "slug"; current: string };
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
   * Content — `pageContents`
   *
   *
   */
  content?: PageContents;
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
   * Description — `internationalizedArrayEditorText`
   *
   * Text for the site description, top of column 1
   */
  description?: InternationalizedArrayEditorText;

  /**
   * Credits — `internationalizedArrayEditorText`
   *
   * Text for the credits, top of column 2
   */
  credits?: InternationalizedArrayEditorText;

  /**
   * Copyright — `internationalizedArrayEditorText`
   *
   * Text for the copyright, bottom of columns 1 + 2
   */
  copyright?: InternationalizedArrayEditorText;

  /**
   * Support — `internationalizedArrayEditorText`
   *
   * Text for the support, bottom of column 3 (below the logos)
   */
  support?: InternationalizedArrayEditorText;
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
    | Resource
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

export type Footnote = {
  _type: "footnote";
  /**
   * Footnote ID — `slug`
   *
   * A unique slug for the footnote to allow jumping to/from it.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Content — `internationalizedArrayText`
   *
   * Text content to show in the footnote.
   */
  content?: InternationalizedArrayText;
};

export type PictureTitled = {
  _type: "pictureTitled";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `internationalizedArrayString`
   *
   *
   */
  caption?: InternationalizedArrayString;

  /**
   * Alternative Text — `string`
   *
   * Describes the appearance or function of the image. Alt text is used by visually impaired users and is indexed by search engine bots.
   */
  alt?: string;
};

export type PageContents = {
  _type: "pageContents";
  /**
   * Body Text — `internationalizedArrayEditorTextMedia`
   *
   * The main text body of the page.
   */
  content?: InternationalizedArrayEditorTextMedia;

  /**
   * Modules — `array`
   *
   * Configurable modules to build pages, after (or in place of) the main text.
   */
  modules?: Array<
    | SanityKeyed<ModuleBlock>
    | SanityKeyed<ModuleCarousel>
    | SanityKeyed<ModuleFootnote>
    | SanityKeyed<ModuleGooglesheet>
  >;

  /**
   * Recirculation — `array`
   *
   * Outgoing links at the bottom of the page.
   */
  recirc?: Array<SanityKeyed<InternalLink> | SanityKeyed<Link>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
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

export type ModuleBlock = {
  _type: "module_block";
  /**
   * Content — `internationalizedArrayEditorTextMedia`
   *
   * Translatable text content.
   */
  content?: InternationalizedArrayEditorTextMedia;
};

export type ModuleCarousel = {
  _type: "module_carousel";
  /**
   * Images — `array`
   *
   * Captioned pictures to put in the carousel. If there is only one, the carousel becomes a static captioned picture.
   */
  images?: Array<SanityKeyed<PictureTitled>>;
};

export type ModuleFootnote = {
  _type: "module_footnote";
  /**
   * Footnotes — `array`
   *
   *
   */
  content?: Array<SanityKeyed<Footnote>>;
};

export type ModuleGooglesheet = {
  _type: "module_googlesheet";
  /**
   * Title — `internationalizedArrayString`
   *
   * A label shown above the Google Sheet, linking to open it in a new tab.
   */
  title?: InternationalizedArrayString;

  /**
   * URL — `string`
   *
   * The embed URL of the google sheet. It can be found as the `src` attribute of the `iframe` provided when you publish your sheet as an embed from Google Sheets.
   */
  url: string;
};

export type Documents =
  | Page
  | Artist
  | Article
  | Resource
  | Tag
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
type InternationalizedArrayEditorText = any;

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
type InternationalizedArrayEditorTextMedia = any;
