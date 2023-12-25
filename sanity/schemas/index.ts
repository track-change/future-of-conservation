// documents
import page from "./documents/collections/page";
import pageHome from "./documents/singletons/pageHome";
import siteHeader from "./documents/site/siteHeader";
import siteFooter from "./documents/site/siteFooter";
// content
import editorText from "./content/editors/editorText";
import editorTextMedia from "./content/editors/editorTextMedia";
// objects
import link from "./objects/link";
import internalLink from "./objects/internalLink";
import picture from "./objects/picture";
import pictureTitled from "./objects/pictureTitled";
import seo from "./objects/seo";
import recircPanel from "./objects/recircPanel";
import block from "./content/blocks/block";
import artist from "./documents/collections/artist";
import article from "./documents/collections/article";
import pageArtists from "./documents/singletons/pageArtists";
import pageResources from "./documents/singletons/pageResources";
import pageArticles from "./documents/singletons/pageArticles";

const schemaTypes = [
  page,
  artist,
  article,
  pageHome,
  pageArtists,
  pageArticles,
  pageResources,
  siteHeader,
  siteFooter,
  editorText,
  editorTextMedia,
  link,
  internalLink,
  picture,
  pictureTitled,
  seo,
  recircPanel,
  block,
];

export default schemaTypes;
