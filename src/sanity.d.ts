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
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

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
   * Subtitle — `string`
   *
   *
   */
  subtitle: string;

  /**
   * Photographer — `object`
   *
   *
   */
  photographer?: {
    _type: "photographer";
    /**
     * Name — `string`
     *
     *
     */
    name?: string;

    /**
     * Website — `url`
     *
     *
     */
    website?: string;
  };

  /**
   * Content — `editorTextMedia`
   *
   *
   */
  content?: EditorTextMedia;

  /**
   * Title Image — `picture`
   *
   *
   */
  titleImage?: Picture;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

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

  /**
   * Featured Projects — `array`
   *
   *
   */
  projects?: Array<SanityKeyedReference<Project>>;
}

/**
 * Projects Page
 *
 *
 */
export interface PageProjects extends SanityDocument {
  _type: "pageProjects";

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Navigation
 *
 *
 */
export interface SiteNav extends SanityDocument {
  _type: "siteNav";

  /**
   * Header Navigation — `array`
   *
   * Items to display in the header.
   */
  navMain?: Array<SanityKeyed<NavGroup>>;

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
  linkTarget: SanityReference<Page | Project | PageHome | PageProjects>;

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

export type NavGroup = {
  _type: "navGroup";
  /**
   * Top Level Route — `reference`
   *
   * The route beneath which the subroutes exist.
   */
  routeGroup: SanityReference<Page | Project | PageHome | PageProjects>;

  /**
   * Subroutes — `array`
   *
   * Any routes beneath the top-level route to render in the menu.
   */
  subRoutes?: Array<
    SanityKeyedReference<Page | Project | PageHome | PageProjects>
  >;
};

export type Documents =
  | Project
  | Page
  | PageHome
  | PageProjects
  | SiteNav
  | SiteOptions;
