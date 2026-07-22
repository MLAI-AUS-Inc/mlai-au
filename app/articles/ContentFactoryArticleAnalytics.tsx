"use client";

import { useEffect } from "react";

type AnalyticsEvent = ["cf_engaged_30s", "cf_scroll_50", "cf_scroll_90", "cf_cta_impression", "cf_cta_click"][number];
type AnalyticsPayload = {
  schema_version: number;
  analytics_article_id: string;
  path: string;
  cta_id?: string;
};
type UmamiTracker = {
  track: (
    event: string | ((properties: Record<string, unknown>) => Record<string, unknown>),
    data?: Record<string, string | number>
  ) => void;
  getSession?: () => { website?: string } | undefined;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
    contentFactoryAnalyticsBeforeSend?: (
      type: string,
      payload: Record<string, unknown>
    ) => Record<string, unknown>;
    contentFactoryArticleAnalyticsWebsiteId?: string;
  }
}

const WEBSITE_ID = "f37dbcd0-2d79-4f17-b405-8b21d60fca99";
const COLLECTOR_URL = "https://analytics.mlai.au";
const TRACKER_SCRIPT_URL = "https://analytics.mlai.au/content-signal.js";
const DATA_DOMAINS = "mlai.au,www.mlai.au";
const SCHEMA_VERSION = 1;
const EVENTS = new Set<string>(["cf_engaged_30s", "cf_scroll_50", "cf_scroll_90", "cf_cta_impression", "cf_cta_click"]);
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const pendingEvents: Array<[AnalyticsEvent, AnalyticsPayload]> = [];
const ARTICLE_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CTA_SELECTOR = [
  '[data-cf-component-id="cta"]',
  '[data-cf-component-id="highlight-cta"]',
  '[data-cf-component-id="events-cta"]',
  '[data-cf-component-id="resource-cta"]',
  '[data-cf-component-id="template-resource-cta"]',
  '[data-cf-component-type="company-cta"]',
  '[data-cf-component-type="company-highlight-cta"]',
  '[data-cf-component-type="events-cta"]',
  '[data-cf-component-type="resource-cta"]',
  '[data-cf-component-type="template-resource-cta"]',
].join(',');

function safePath(value: string): string {
  try {
    const parsed = new URL(value || window.location.pathname, window.location.origin);
    const path = parsed.pathname.slice(0, 512).replace(/\/+$/, "");
    return path || "/";
  } catch {
    const path = window.location.pathname.slice(0, 512).replace(/\/+$/, "");
    return path || "/";
  }
}

function safeCampaignValue(value: string | null): string {
  return String(value || "")
    .replace(/[^A-Za-z0-9._~:/+-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 120);
}

function safePageviewUrl(value: string): string {
  const path = safePath(value);
  let current: URL;
  try {
    current = new URL(window.location.href);
  } catch {
    return path;
  }
  const campaign = new URLSearchParams();
  for (const key of CAMPAIGN_KEYS) {
    const bounded = safeCampaignValue(current.searchParams.get(key));
    if (bounded) campaign.set(key, bounded);
  }
  const query = campaign.toString();
  return query ? `${path}?${query}` : path;
}

function safeComponentId(value: string | null): string {
  return String(value || "").replace(/[^A-Za-z0-9:_-]/g, "").slice(0, 80);
}

function referrerOrigin(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  try {
    return new URL(value).origin.slice(0, 256);
  } catch {
    return "";
  }
}

function previewOrLocalhost(): boolean {
  const host = window.location.hostname.toLowerCase();
  const allowedDomains = DATA_DOMAINS.split(",").filter(Boolean);
  const query = new URLSearchParams(window.location.search);
  return !allowedDomains.includes(host)
    || host === "localhost"
    || host === "127.0.0.1"
    || host === "::1"
    || host.endsWith(".localhost")
    || query.has("cfInspector")
    || query.has("cfPreviewMode");
}

function ensureTrackerScript(statusTarget?: HTMLElement): void {
  if (document.querySelector(`script[data-cf-article-analytics="${WEBSITE_ID}"]`)) return;
  const foreignScript = document.querySelector('script[data-website-id]:not([data-cf-article-analytics])');
  if (window.umami || foreignScript) {
    statusTarget?.setAttribute("data-cf-analytics-status", "tracker-global-conflict");
    return;
  }
  window.contentFactoryArticleAnalyticsWebsiteId = WEBSITE_ID;
  window.contentFactoryAnalyticsBeforeSend = (_type, payload) => {
    const clean = { ...(payload || {}) };
    // With Umami auto-tracking disabled, its internal currentUrl does not
    // follow client-side router transitions. Stamp a custom event's captured
    // article path (or the current browser location for a pageview) so queued
    // events remain attached to the right article across Next/Vite navigation.
    const eventData = clean["data"];
    const capturedPath = eventData && typeof eventData === "object"
      && typeof (eventData as Record<string, unknown>)["path"] === "string"
      ? String((eventData as Record<string, unknown>)["path"])
      : window.location.href;
    if (typeof clean["url"] === "string") clean["url"] = safePageviewUrl(capturedPath);
    const origin = referrerOrigin(clean["referrer"]);
    if (origin) clean["referrer"] = origin;
    else delete clean["referrer"];
    return clean;
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = TRACKER_SCRIPT_URL;
  script.setAttribute("data-cf-article-analytics", WEBSITE_ID);
  script.setAttribute("data-website-id", WEBSITE_ID);
  script.setAttribute("data-host-url", COLLECTOR_URL);
  script.setAttribute("data-domains", DATA_DOMAINS);
  script.setAttribute("data-auto-track", "false");
  script.setAttribute("data-exclude-hash", "true");
  script.setAttribute("data-do-not-track", "true");
  script.setAttribute("data-before-send", "contentFactoryAnalyticsBeforeSend");
  document.head.appendChild(script);
}

function verifiedTracker(statusTarget?: HTMLElement): UmamiTracker | null {
  if (window.contentFactoryArticleAnalyticsWebsiteId !== WEBSITE_ID) {
    statusTarget?.setAttribute("data-cf-analytics-status", "tracker-owner-unverified");
    return null;
  }
  const tracker = window.umami;
  if (!tracker || typeof tracker.track !== "function") {
    statusTarget?.setAttribute("data-cf-analytics-status", "tracker-loading");
    return null;
  }
  if (typeof tracker.getSession !== "function") {
    statusTarget?.setAttribute("data-cf-analytics-status", "tracker-session-unverified");
    return null;
  }
  try {
    if (tracker.getSession()?.website !== WEBSITE_ID) {
      statusTarget?.setAttribute("data-cf-analytics-status", "tracker-website-mismatch");
      return null;
    }
  } catch {
    statusTarget?.setAttribute("data-cf-analytics-status", "tracker-session-error");
    return null;
  }
  statusTarget?.setAttribute("data-cf-analytics-status", "ready");
  return tracker;
}

function emitNow(event: AnalyticsEvent, payload: AnalyticsPayload): boolean {
  if (!EVENTS.has(event) || !ARTICLE_ID_RE.test(payload.analytics_article_id)) return false;
  const tracker = verifiedTracker();
  if (!tracker) return false;
  const clean: Record<string, string | number> = {
    schema_version: Number(payload.schema_version) || SCHEMA_VERSION,
    analytics_article_id: payload.analytics_article_id,
    path: safePath(payload.path),
  };
  const ctaId = safeComponentId(payload.cta_id || "");
  if (ctaId) clean.cta_id = ctaId;
  tracker.track(event, clean);
  return true;
}

function trackPageview(path: string, statusTarget: HTMLElement): boolean {
  const tracker = verifiedTracker(statusTarget);
  if (!tracker) return false;
  tracker.track((properties) => ({
    ...properties,
    url: safePageviewUrl(path),
    title: document.title.slice(0, 200),
  }));
  return true;
}

function emit(event: AnalyticsEvent, payload: AnalyticsPayload): void {
  if (emitNow(event, payload)) return;
  if (pendingEvents.length < 24) pendingEvents.push([event, payload]);
}

function flushPendingEvents(): void {
  if (!window.umami) return;
  for (const [event, payload] of pendingEvents.splice(0)) emitNow(event, payload);
}

export type ContentFactoryArticleAnalyticsProps = {
  analyticsArticleId: string;
  articlePath: string;
  draft?: boolean;
};

export default function ContentFactoryArticleAnalytics({
  analyticsArticleId,
  articlePath,
  draft = false,
}: ContentFactoryArticleAnalyticsProps) {
  useEffect(() => {
    if (draft || previewOrLocalhost() || !ARTICLE_ID_RE.test(analyticsArticleId)) return;
    const articleRoot = document.querySelector<HTMLElement>('[data-cf-article-detail="true"]');
    if (!articleRoot) return;
    const path = safePath(articlePath);
    const payload = (): AnalyticsPayload => ({
      schema_version: SCHEMA_VERSION,
      analytics_article_id: analyticsArticleId,
      path,
    });
    ensureTrackerScript(articleRoot);

    let disposed = false;
    let viewSent = false;
    let viewAttempts = 0;
    let activeSeconds = 0;
    let focused = document.hasFocus();
    const sentDepths = new Set<number>();
    const impressedCtas = new Set<string>();
    const retryView = window.setInterval(() => {
      if (disposed || viewSent) return;
      viewAttempts += 1;
      if (trackPageview(path, articleRoot)) {
        flushPendingEvents();
        viewSent = true;
        window.clearInterval(retryView);
      } else if (viewAttempts >= 50) {
        window.clearInterval(retryView);
        articleRoot.setAttribute("data-cf-analytics-status", "tracker-timeout");
      }
    }, 200);

    const onFocus = () => { focused = true; };
    const onBlur = () => { focused = false; };
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    const engagementTimer = window.setInterval(() => {
      if (document.visibilityState !== "visible" || !focused) return;
      activeSeconds += 1;
      if (activeSeconds === 30) {
        emit("cf_engaged_30s", payload());
        window.clearInterval(engagementTimer);
      }
    }, 1000);

    const measureDepth = () => {
      const bodyRoot = articleRoot.querySelector<HTMLElement>('[data-cf-article-body="true"]');
      if (!bodyRoot) return;
      const rect = articleRoot.getBoundingClientRect();
      const height = Math.max(1, articleRoot.scrollHeight);
      const viewed = Math.min(height, Math.max(0, window.innerHeight - rect.top));
      const depth = viewed / height;
      for (const threshold of [50, 90]) {
        if (depth >= threshold / 100 && !sentDepths.has(threshold)) {
          sentDepths.add(threshold);
          emit(threshold === 50 ? "cf_scroll_50" : "cf_scroll_90", payload());
        }
      }
    };
    window.addEventListener("scroll", measureDepth, { passive: true });
    window.addEventListener("resize", measureDepth);

    const observedCtas = new WeakSet<Element>();
    const ctaObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
        const element = entry.target as HTMLElement;
        const ctaId = safeComponentId(
          element.getAttribute("data-cf-component-id")
            || element.getAttribute("data-cf-component-type")
        );
        if (!ctaId || impressedCtas.has(ctaId)) continue;
        impressedCtas.add(ctaId);
        emit("cf_cta_impression", { ...payload(), cta_id: ctaId });
        ctaObserver.unobserve(element);
      }
    }, { threshold: [0.5] });
    const observeCta = (cta: Element) => {
      if (observedCtas.has(cta)) return;
      observedCtas.add(cta);
      ctaObserver.observe(cta);
    };
    articleRoot.querySelectorAll<HTMLElement>(CTA_SELECTOR).forEach(observeCta);

    const lateContentObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(CTA_SELECTOR)) observeCta(node);
          node.querySelectorAll(CTA_SELECTOR).forEach(observeCta);
        }
      }
      measureDepth();
    });
    lateContentObserver.observe(articleRoot, { childList: true, subtree: true });
    measureDepth();

    const onClick = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      const control = target?.closest('a,button,[role="button"]');
      const cta = control?.closest(CTA_SELECTOR) as HTMLElement | null | undefined;
      if (!cta || !articleRoot.contains(cta)) return;
      const ctaId = safeComponentId(
        cta.getAttribute("data-cf-component-id") || cta.getAttribute("data-cf-component-type")
      );
      if (ctaId) emit("cf_cta_click", { ...payload(), cta_id: ctaId });
    };
    articleRoot.addEventListener("click", onClick);

    return () => {
      disposed = true;
      window.clearInterval(retryView);
      window.clearInterval(engagementTimer);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("scroll", measureDepth);
      window.removeEventListener("resize", measureDepth);
      articleRoot.removeEventListener("click", onClick);
      ctaObserver.disconnect();
      lateContentObserver.disconnect();
    };
  }, [analyticsArticleId, articlePath, draft]);

  return null;
}
