import type { ArticleConversionType } from "~/articles/seo-config";

const ATTRIBUTION_KEY = "mlai_article_conversion_attribution";

export type ArticleConversionAttribution = {
  articleSlug: string;
  ctaType: ArticleConversionType;
  placement: "article-bottom" | "article-secondary";
  destination: string;
  version: string;
  clickedAt: string;
};

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function emitAnalyticsEvent(name: string, parameters: Record<string, string>) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", name, parameters);
  window.dispatchEvent(
    new CustomEvent(`mlai:${name}`, {
      detail: parameters,
    }),
  );
}

export function trackArticleCtaClick(
  attribution: Omit<ArticleConversionAttribution, "clickedAt">,
) {
  if (typeof window === "undefined") return;

  const payload: ArticleConversionAttribution = {
    ...attribution,
    clickedAt: new Date().toISOString(),
  };

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
  });
}

export function getStoredArticleAttribution(): ArticleConversionAttribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? JSON.parse(raw) as ArticleConversionAttribution : undefined;
  } catch {
    return undefined;
  }
}

export function trackAttributedConversion(conversion: string) {
  if (typeof window === "undefined") return;

  const attribution = getStoredArticleAttribution();

  emitAnalyticsEvent("article_conversion", {
    conversion,
    article_slug: attribution?.articleSlug ?? "direct",
    cta_type: attribution?.ctaType ?? "direct",
    placement: attribution?.placement ?? "direct",
    destination: attribution?.destination ?? window.location.pathname,
    content_version: attribution?.version ?? "unknown",
  });
}
