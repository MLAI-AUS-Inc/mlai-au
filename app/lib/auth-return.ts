export type AuthReturnAppName =
  | "esafety"
  | "hospital"
  | "founder-tools"
  | "vibe-raising";

const LEGACY_FOUNDER_NEXT_PATHS: Record<string, string> = {
  "/vibe-raising": "/founder-tools",
  "/vibe-raising/": "/founder-tools",
  "/vibe-raising/create-update": "/founder-tools/updates/create",
  "/vibe-raising/connect-data": "/founder-tools/data-sources",
  "/vibe-raising/companies": "/founder-tools/companies",
  "/vibe-raising/company-setup": "/founder-tools/company-setup",
  "/vibe-raising/discover": "/founder-tools/updates",
};

function isFounderToolsApp(app: AuthReturnAppName | string | null | undefined) {
  return app === "founder-tools" || app === "vibe-raising";
}

function pathWithSearchAndHash(url: URL) {
  return `${url.pathname}${url.search}${url.hash}`;
}

export function getDefaultAuthNext(app: AuthReturnAppName | string | null | undefined, fallback = "/hackathons"): string {
  if (app === "hospital") return "/hospital/app";
  if (app === "esafety") return "/esafety/dashboard";
  if (isFounderToolsApp(app)) return "/founder-tools";
  return fallback;
}

export function normalizeAuthNextForApp(
  app: AuthReturnAppName | string | null | undefined,
  nextValue: string | null | undefined,
  options: { fallback?: string } = {},
): string {
  const fallback = options.fallback ?? getDefaultAuthNext(app);
  const next = nextValue?.trim() || fallback;

  if (!next.startsWith("/") || next.startsWith("//")) return fallback;

  if (!isFounderToolsApp(app)) return next;

  let target: URL;
  try {
    target = new URL(next, "https://mlai.local");
  } catch {
    return fallback;
  }
  const articleRunStatusMatch = target.pathname.match(/^\/founder-tools\/marketing\/runs\/([^/]+)\/status\/?$/);
  if (articleRunStatusMatch) {
    target.pathname = `/founder-tools/marketing/runs/${articleRunStatusMatch[1]}`;
    return pathWithSearchAndHash(target);
  }

  const mappedPath = LEGACY_FOUNDER_NEXT_PATHS[target.pathname];
  if (mappedPath) {
    target.pathname = mappedPath;
    return pathWithSearchAndHash(target);
  }

  if (target.pathname.startsWith("/vibe-raising/")) {
    target.pathname = "/founder-tools/updates";
    return pathWithSearchAndHash(target);
  }

  return next;
}
