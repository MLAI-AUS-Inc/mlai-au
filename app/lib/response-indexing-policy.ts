function normalizedPath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** Shared by document metadata and Worker headers; public intake stays public. */
export function isPrivateSearchPath(pathname: string): boolean {
  const path = normalizedPath(pathname);
  if (path === "/founder-tools/start") return false;
  if (path === "/vibe-raising") return false;
  return ["/platform", "/hospital/app", "/founder-tools", "/esafety", "/valley", "/roo/topup", "/watt-the-hack"]
    .some(prefix => path === prefix || path.startsWith(`${prefix}/`))
    || path.startsWith("/vibe-raising/")
    || path === "/verify-email"
    || path === "/agent-test";
}

function withNoindex(existing: string | null, nofollow: boolean): string {
  const directives = (existing || "").split(",").map(value => value.trim()).filter(Boolean)
    .filter(value => value.toLowerCase() !== "index" && (!nofollow || value.toLowerCase() !== "follow"));
  if (!directives.some(value => value.toLowerCase() === "noindex")) directives.unshift("noindex");
  if (nofollow && !directives.some(value => value.toLowerCase() === "nofollow")) directives.push("nofollow");
  return directives.join(", ");
}

export function applyResponseIndexingPolicy(request: Request, response: Response): Response {
  const pathname = new URL(request.url).pathname;
  const utility = pathname === "/__manifest" || pathname === "/downloads/accelerator-fit-worksheet.md";
  const error = response.status >= 400;
  const privateHtml = isPrivateSearchPath(pathname)
    && Boolean(response.headers.get("Content-Type")?.toLowerCase().includes("text/html"));
  if (!utility && !error && !privateHtml) return response;
  // Rewrap rather than mutating immutable Response.redirect/fetch headers.
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", withNoindex(headers.get("X-Robots-Tag"), privateHtml || error || pathname === "/__manifest"));
  if (privateHtml) headers.set("Cache-Control", "private, no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
