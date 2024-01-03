// documents
import page from "./documents/collections/page";
import pageHome from "./documents/singletons/pageHome";
import siteHeader from "./documents/site/siteHeader";
import siteFooter from "./documents/site/siteFooter";
// content
import editorText from "./content/editors/editorText";
import editorTextMedia from "./content/editors/editorTextMedia";
import editorTextMin from "./content/editors/editorTextMin";
// objects
import link from "./objects/link";
import internalLink from "./objects/internalLink";
import pictureTitled from "./objects/pictureTitled";
import seo from "./objects/seo";
import artist from "./documents/collections/artist";
import article from "./documents/collections/article";
import pageArtists from "./documents/singletons/pageArtists";
import pageResources from "./documents/singletons/pageResources";
import pageArticles from "./documents/singletons/pageArticles";
import tag from "./documents/collections/tag";
import resource from "./documents/collections/resource";
import footnote from "./objects/footnote";
import pageContents from "./objects/pageContents";
// modules
import block from "./content/modules/Block";
import carousel from "./content/modules/Carousel";
import footnotes from "./content/modules/Footnotes";
import GoogleSheet from "./content/modules/GoogleSheet";

const schemaTypes = [
  page,
  artist,
  article,
  resource,
  tag,
  pageHome,
  pageArtists,
  pageArticles,
  pageResources,
  siteHeader,
  siteFooter,
  editorText,
  editorTextMin,
  editorTextMedia,
  link,
  internalLink,
  footnote,
  pictureTitled,
  pageContents,
  seo,
  block,
  carousel,
  footnotes,
  GoogleSheet,
];

export default schemaTypes;
