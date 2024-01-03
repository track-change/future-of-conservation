import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { sanityClient } from "sanity:client";
import type { APIContext } from "astro";

export async function GET({ request, redirect, cookies }: APIContext) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    sanityClient.withConfig({
      // This has to be set in CloudFlare's project settings
      token: import.meta.env.SANITY_API_READ_TOKEN,
    }),
    request.url,
    true,
  );
  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }
  cookies.set("astro_draft_mode", "true", { path: "/" });
  return redirect(redirectTo);
}
