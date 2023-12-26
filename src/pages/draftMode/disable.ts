import type { APIContext } from "astro";

// export async
export async function GET({ redirect, cookies, url }: APIContext) {
  const redirectTo = url.searchParams.get("redirect") || "/";
  cookies.delete("astro_draft_mode");
  return redirect(redirectTo);
}
