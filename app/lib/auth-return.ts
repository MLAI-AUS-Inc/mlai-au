import { isWattTheHackAuthRequest, isWattTheHackRoutePath } from "~/lib/watt-the-hack-access";

export type AuthReturnAppName =
  | "esafety"
  | "hospital"
  | "founder-tools"
  | "vibe-raising"
  | "watt-the-hack"
  | "admin";

export const ADMIN_AUTH_COMPLETION_ORIGIN = "https://ops.mlai.au";

const AUTH_RETURN_VALIDATION_ORIGIN = "https://mlai.local";
const SAFE_AUTH_FALLBACK = "/hackathons";
const ADMIN_AUTH_MAX_DECODE_PASSES = 5;
const ENCODED_ADMIN_PATH_SEPARATOR_RE = /%(?:25)*(?:2f|5c)/i;
const ENCODED_ADMIN_FRAGMENT_RE = /%(?:25)*23/i;

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

export function normalizeRelativeAuthPath(value: string | null | undefined): string | null {
  const candidate = value?.trim();
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) return null;
  if (candidate.includes("\\") || /[\u0000-\u001f\u007f]/.test(candidate)) return null;

  const rawPath = candidate.split(/[?#]/, 1)[0];
  if (/%(?:2f|5c)/i.test(rawPath)) return null;

  try {
    const target = new URL(candidate, AUTH_RETURN_VALIDATION_ORIGIN);
    if (target.origin !== AUTH_RETURN_VALIDATION_ORIGIN) return null;
    return pathWithSearchAndHash(target);
  } catch {
    return null;
  }
}

/**
 * Match the backend and operations-app callback contract for admin handoffs.
 * Admin targets may contain a path and query string, but never a fragment or a
 * path separator that appears after one or more decoding passes.
 */
export function normalizeAdminAuthPath(value: string | null | undefined): string | null {
  if (!value || value !== value.trim()) return null;
  if (
    ENCODED_ADMIN_PATH_SEPARATOR_RE.test(value) ||
    ENCODED_ADMIN_FRAGMENT_RE.test(value)
  ) {
    return null;
  }

  let decoded = value;
  try {
    for (let pass = 0; pass < ADMIN_AUTH_MAX_DECODE_PASSES; pass += 1) {
      if (
        decoded !== decoded.trim() ||
        !decoded.startsWith("/") ||
        decoded.startsWith("//") ||
        decoded.includes("\\") ||
        decoded.includes("#") ||
        /[\u0000-\u001f\u007f]/.test(decoded)
      ) {
        return null;
      }

      const parsed = new URL(decoded, AUTH_RETURN_VALIDATION_ORIGIN);
      if (parsed.origin !== AUTH_RETURN_VALIDATION_ORIGIN || parsed.hash) return null;

      const nextDecoded = decodeURIComponent(decoded);
      if (nextDecoded === decoded) {
        const original = new URL(value, AUTH_RETURN_VALIDATION_ORIGIN);
        return `${original.pathname}${original.search}`;
      }
      decoded = nextDecoded;
    }
  } catch {
    return null;
  }

  return null;
}

export function getDefaultAuthNext(app: AuthReturnAppName | string | null | undefined, fallback = "/hackathons"): string {
  if (app === "hospital") return "/hospital/app";
  if (app === "esafety") return "/esafety/dashboard";
  if (app === "watt-the-hack") return fallback;
  if (isFounderToolsApp(app)) return "/founder-tools";
  if (app === "admin") return "/";
  return fallback;
}

export function normalizeAuthNextForApp(
  app: AuthReturnAppName | string | null | undefined,
  nextValue: string | null | undefined,
  options: { fallback?: string } = {},
): string {
  const normalizeNext = app === "admin" ? normalizeAdminAuthPath : normalizeRelativeAuthPath;
  const fallback =
    normalizeNext(options.fallback ?? getDefaultAuthNext(app)) ??
    normalizeNext(getDefaultAuthNext(app, SAFE_AUTH_FALLBACK)) ??
    SAFE_AUTH_FALLBACK;
  const next = normalizeNext(nextValue) ?? fallback;

  if (isWattTheHackAuthRequest(app, next) || isWattTheHackRoutePath(next)) return fallback;

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

export function getAuthCompletionLocation(
  app: AuthReturnAppName | string | null | undefined,
  nextValue: string | null | undefined,
  options: { fallback?: string } = {},
): string {
  const next = normalizeAuthNextForApp(app, nextValue, options);
  if (app === "admin") {
    return new URL(next, `${ADMIN_AUTH_COMPLETION_ORIGIN}/`).toString();
  }
  return next;
}
