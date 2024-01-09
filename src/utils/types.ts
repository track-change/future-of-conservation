import type { SanityImageAsset } from "@/sanity";

export interface SanityImageAsset2 extends SanityImageAsset {
  title?: string;
  altText?: string;
  description?: string;
}
