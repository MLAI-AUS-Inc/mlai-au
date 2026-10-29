import type { ArticleConversionType } from "~/articles/seo-config";
import { isEventCalendarHref } from "./event-preference";

const ATTRIBUTION_KEY = "mlai_article_conversion_attribution";
// MLAI measurement convention, not a claim about causation or a platform default.
export const ARTICLE_ATTRIBUTION_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const CONVERSION_OFFERS = {
  studio_builder_application_submitted: "studio-builder",
  studio_project_brief_submitted: "studio-project",
} as const;
export type ArticleCompletion = keyof typeof CONVERSION_OFFERS;

export type ArticleConversionAttribution = {
  articleSlug: string;
  ctaType: ArticleConversionType;
  placement: "article-bottom" | "article-secondary" | "article-inline";
  primaryIcp?: "SMB" | "BUILDER" | "FOUNDER_BUILDER" | "COMMUNITY" | "OUTSIDE";
  destination: string;
  version: string;
  clickedAt: string;
};

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function emitAnalyticsEvent(name: string, parameters: Record<string, string>) {
  if (typeof window === "undefined") return;
  try { (window as GtagWindow).gtag?.("event", name, parameters); } catch { /* Never fail an enquiry because analytics failed. */ }
  try { window.dispatchEvent(
    new CustomEvent(`mlai:${name}`, {
      detail: parameters,
    }),
  ); } catch { /* Custom analytics listeners are also best effort. */ }
}

export type ArticleEngagementAction = "resource_open" | "reading_link_open" | "quiz_complete";

/** Learning/resource actions are engagement, never a submitted lead or RSVP.
 * Only public identifiers are recorded: no answers, worksheet text or URL queries.
 */
export function trackArticleEngagement(articleSlug: string, action: ArticleEngagementAction, target: string) {
  if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(articleSlug) || articleSlug.length > 240) return;
  if (!["resource_open", "reading_link_open", "quiz_complete"].includes(action)) return;
  if (!/^[a-zA-Z0-9/_.,-]{1,300}$/.test(target)) return;
  emitAnalyticsEvent("article_engagement", { article_slug: articleSlug, action, target });
}

/** Classify a public link without sending query strings, fragments or asset tokens. */
export function articleLinkEngagement(href: string, origin: string): { action: ArticleEngagementAction; target: string } | undefined {
  try {
    const url = new URL(href, origin);
    if (url.protocol !== "https:" && url.protocol !== "http:") return;
    if (url.username || url.password) return;
    if (url.origin !== origin && url.origin !== "https://mlai.au") return;
    if (/^\/downloads\/[a-zA-Z0-9/_.-]+$/.test(url.pathname)) {
      return { action: "resource_open", target: url.pathname };
    }
    if (/^\/articles\/[a-z0-9-]+\/[a-z0-9-]+$/.test(url.pathname)) {
      return { action: "reading_link_open", target: url.pathname };
    }
  } catch { /* Malformed or unsupported links do not affect navigation. */ }
}

export function parseArticleAttribution(value: unknown, now = Date.now()): ArticleConversionAttribution | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const row = value as Record<string, unknown>;
  if (typeof row.articleSlug !== "string" || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(row.articleSlug) || row.articleSlug.length > 240) return;
  if (typeof row.version !== "string" || !/^[a-zA-Z0-9._-]{1,100}$/.test(row.version)) return;
  if (!["events", "studio-builder", "studio-project", "founder-tools", "vibe-raising"].includes(String(row.ctaType))) return;
  if (!["article-bottom", "article-secondary", "article-inline"].includes(String(row.placement))) return;
  if (row.primaryIcp !== undefined && !["SMB", "BUILDER", "FOUNDER_BUILDER", "COMMUNITY"].includes(String(row.primaryIcp))) return;
  if (typeof row.clickedAt !== "string") return;
  const clicked = Date.parse(row.clickedAt);
  if (!Number.isFinite(clicked) || !Number.isFinite(now) || clicked > now || now - clicked > ARTICLE_ATTRIBUTION_MAX_AGE_MS) return;
  const destinations: Record<string, string> = {
    "studio-builder": "/mlai-studio#apply", "studio-project": "/mlai-studio/start-project",
    "founder-tools": "/founder-tools/start", "vibe-raising": "/vibe-raising",
  };
  if (typeof row.destination !== "string" || row.destination.length > 2048) return;
  if (row.ctaType !== "events" && row.destination !== destinations[String(row.ctaType)]) return;
  let destination = row.destination;
  if (row.ctaType === "events" && !isEventCalendarHref(destination)) {
    try {
      const url = new URL(destination);
      if (url.protocol !== "https:" || url.username || url.password) return;
      // Provider URLs can contain registration tokens or contact details. Keep
      // only the public event location, including when reading an older record.
      url.search = "";
      url.hash = "";
      destination = url.href;
    } catch { return; }
  }
  // Copy only the public attribution fields, never arbitrary session-storage data.
  return {
    articleSlug: row.articleSlug, ctaType: row.ctaType as ArticleConversionType,
    placement: row.placement as ArticleConversionAttribution["placement"],
    primaryIcp: row.primaryIcp as ArticleConversionAttribution["primaryIcp"],
    destination, version: row.version, clickedAt: row.clickedAt,
  };
}

export function matchArticleCompletion(value: unknown, conversion: ArticleCompletion, now = Date.now()) {
  const attribution = parseArticleAttribution(value, now);
  return attribution?.ctaType === CONVERSION_OFFERS[conversion] ? attribution : undefined;
}

export function trackArticleCtaClick(
  attribution: Omit<ArticleConversionAttribution, "clickedAt">,
) {
  if (typeof window === "undefined") return;

  // Validate and reduce the click before either persistence or analytics. The
  // actual link remains untouched; only its attribution representation changes.
  const payload = parseArticleAttribution({
    ...attribution,
    clickedAt: new Date().toISOString(),
  });
  if (!payload) return;

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(payload));
  } catch {
    // Analytics attribution is best-effort and must never block navigation.
  }

  emitAnalyticsEvent("article_cta_click", {
    article_slug: payload.articleSlug,
    cta_type: payload.ctaType,
    placement: payload.placement,
    destination: payload.destination,
    content_version: payload.version,
    primary_icp: payload.primaryIcp ?? "unassigned",
  });
}

export function getStoredArticleAttribution(conversion?: ArticleCompletion): ArticleConversionAttribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return undefined;
    const value = parseArticleAttribution(JSON.parse(raw));
    if (!value) return undefined;
    // Replace legacy records so stripped provider parameters do not remain in
    // this tab's attribution storage. Storage failures still allow attribution.
    const sanitised = JSON.stringify(value);
    if (sanitised !== raw) {
      try { window.sessionStorage.setItem(ATTRIBUTION_KEY, sanitised); } catch { /* Best effort. */ }
    }
    return conversion ? matchArticleCompletion(value, conversion) : value;
  } catch {
    return undefined;
  }
}

export function trackAttributedConversion(conversion: ArticleCompletion, captured: ArticleConversionAttribution | undefined) {
  if (typeof window === "undefined") return;

  const attribution = matchArticleCompletion(captured, conversion);

  emitAnalyticsEvent("article_conversion", {
    conversion,
    article_slug: attribution?.articleSlug ?? "unattributed",
    cta_type: attribution?.ctaType ?? "unattributed",
    placement: attribution?.placement ?? "unattributed",
    attribution_status: attribution ? "matched-click" : "unattributed",
    destination: attribution?.destination ?? window.location.pathname,
    content_version: attribution?.version ?? "unknown",
    primary_icp: attribution?.primaryIcp ?? "unassigned",
  });
}
