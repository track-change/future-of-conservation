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
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Content — `editorTextMedia`
   *
   *
   */
  content?: EditorTextMedia;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Home
 *
 *
 */
export interface PageHome extends SanityDocument {
  _type: "pageHome";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;
}

/**
 * Navigation
 *
 *
 */
export interface SiteNav extends SanityDocument {
  _type: "siteNav";

  /**
   * Header Navigation (Top) — `array`
   *
   * Items to display in the top header bar.
   */
  navHeaderTop?: Array<SanityKeyed<InternalLink> | SanityKeyed<Link>>;

  /**
   * Header Navigation (Bottom) — `array`
   *
   * Items to display in the top header bar.
   */
  navHeaderBot?: Array<SanityKeyed<InternalLink> | SanityKeyed<Link>>;

  /**
   * Footer Navigation — `array`
   *
   *
   */
  navFooter?: Array<SanityKeyed<InternalLink> | SanityKeyed<Link>>;
}

/**
 * Options
 *
 *
 */
export interface SiteOptions extends SanityDocument {
  _type: "siteOptions";

  /**
   * Page Title — `string`
   *
   *
   */
  name: string;

  /**
   * Copyright — `string`
   *
   *
   */
  copyrightText?: string;

  /**
   * Language Code — `string`
   *
   * ISO 639-1 Language Codes (i.e. “de” or “en”), can be country specific (i.e. “en-us”)
   */
  language?: string;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
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
   * Internal Link — `reference`
   *
   *
   */
  linkTarget: SanityReference<Page | PageHome>;

  /**
   * Title — `string`
   *
   * Keep empty to use Internal link title
   */
  title?: string;
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
   * Caption — `text`
   *
   *
   */
  caption?: string;

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
   * Meta Description — `text`
   *
   *
   */
  metaDescription?: string;

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

export type Documents = Page | PageHome | SiteNav | SiteOptions;
