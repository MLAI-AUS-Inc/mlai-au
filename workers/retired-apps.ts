import { CHAT_URL, PULSE_EDITOR_URL } from "../app/lib/chat-destinations";

// Handle old bookmarks before URL normalization, caching, or any app rendering.
// No cookies, return URLs or request bodies are relayed to another origin.
export function retiredAppResponse(request: Request): Response | null {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "").toLowerCase();
  const at = (root: string) => path === root || path.startsWith(root + "/");
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow",
  });
  const reject = (status: number) => new Response(null, { status, headers });
  let destination: string;
  if (path === "/founder-tools/start" || path === "/vibe-raising") return null;
  if (path === "/founder-tools/link-roo") {
    // Chat captures this one-time capability before displaying account confirmation.
    const tokens = url.searchParams.getAll("token");
    if (url.origin !== "https://mlai.au" || tokens.length !== 1 || !/^[A-Za-z0-9_-]{43}$/.test(tokens[0])) {
      return new Response("Ask @Roo link in Slack for a fresh private link.", { status: 400, headers });
    }
    destination = CHAT_URL + "my-startup/link-roo?token=" + tokens[0];
  } else if (path === "/roo/topup") {
    return request.method === "GET" || request.method === "HEAD" ? null : reject(410);
  } else if (at("/roo/topup")) {
    const purchase = /^\/roo\/topup\/([0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})$/.exec(path);
    if (!purchase || url.origin !== "https://mlai.au") return reject(400);
    destination = "/roo/topup#" + purchase[1];
  } else if (at("/platform") || path === "/verify-email" || path === "/dashboard" || path === "/login") {
    const app = url.searchParams.get("app");
    destination = app === "founder-tools" || app === "vibe-raising" ||
      /^\/(founder-tools|vibe-raising)(\/|$)/.test(url.searchParams.get("next") || "")
      ? PULSE_EDITOR_URL : CHAT_URL;
    // Operations now owns its login and verification. Never forward a legacy email token.
    if (app === "admin") destination = "https://ops.mlai.au/login";
  } else if (at("/founder-tools/marketing")) {
    destination = CHAT_URL + "my-startup/marketing";
  } else if (at("/founder-tools") || at("/vibe-raising") || at("/valley")) {
    destination = PULSE_EDITOR_URL;
  } else if (at("/hospital/app")) {
    destination = "/healthhack";
  } else if (at("/esafety") || at("/watt-the-hack")) {
    destination = "/hackathons";
  } else {
    return null;
  }
  if (request.method !== "GET" && request.method !== "HEAD") return reject(410);
  headers.set("Location", destination);
  return new Response(null, { status: 302, headers });
}
