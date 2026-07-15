import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import VibeMarketingAnalyticsSection from "../app/components/VibeMarketingAnalyticsSection";
import {
  AI_REFERRAL_CAVEAT,
  getVibeMarketingAnalyticsStatus,
  getVibeMarketingAnalyticsSummary,
  getVibeMarketingArticleAnalytics,
  isVibeMarketingAnalyticsEndpointUnavailable,
  normalizeVibeMarketingAnalyticsStatus,
  normalizeVibeMarketingAnalyticsSummary,
  setVibeMarketingAnalyticsEnabled,
  verifyVibeMarketingAnalyticsGsc,
} from "../app/lib/vibe-marketing-analytics";
import type { VibeMarketingAnalyticsHttpClient } from "../app/lib/vibe-marketing-analytics";

describe("vibe marketing analytics normalization", () => {
  test("normalizes snake-case provider data and derives honest aggregate rates", () => {
    const summary = normalizeVibeMarketingAnalyticsSummary({
      range: "28d",
      start_date: "2026-06-01",
      end_date: "2026-06-28",
      totals: {
        search: {
          impressions: 2000,
          clicks: 100,
          average_position: 7.4,
        },
        engagement: {
          visits: 80,
          engaged_30: 40,
          scroll_50: 36,
          scroll_90: 18,
        },
        cta: {
          cta_impressions: 50,
          cta_clicks: 8,
        },
      },
      traffic_sources: [
        { source: "google", label: "Google organic", visits: 50 },
        { source: "chatgpt.com", label: "ChatGPT", visits: 10, cta_clicks: 2 },
      ],
      freshness: {
        analytics_data_through: "2026-06-28",
        gsc_data_through: "2026-06-26",
        stale: false,
      },
      articles: [
        {
          article_id: "article-1",
          article_title: "Anonymous analytics for SEO pages",
          live_url: "https://example.com/articles/analytics",
          totals: { visits: 20, cta_clicks: 3 },
          queries: [{ query: "anonymous seo analytics", clicks: 4, impressions: 80 }],
        },
      ],
    });

    expect(summary.totals.searchImpressions).toBe(2000);
    expect(summary.totals.searchClicks).toBe(100);
    expect(summary.totals.searchCtr).toBe(0.05);
    expect(summary.totals.averagePosition).toBe(7.4);
    expect(summary.totals.engaged30).toBe(40);
    expect(summary.totals.ctaConversionRate).toBe(0.1);
    expect(summary.sources[1]?.isAi).toBe(true);
    expect(summary.sources[1]?.share).toBe(0.125);
    expect(summary.articles[0]?.id).toBe("article-1");
    expect(summary.articles[0]?.queries[0]).toEqual({
      query: "anonymous seo analytics",
      clicks: 4,
      impressions: 80,
      ctr: 0.05,
    });
    expect(summary.freshness.searchDataThrough).toBe("2026-06-26");
  });

  test("normalizes enabled and Search Console status without requiring one response casing", () => {
    const status = normalizeVibeMarketingAnalyticsStatus({
      status: "enabled",
      is_collecting: true,
      provider: "umami",
      last_event_at: "2026-07-11T03:00:00Z",
      search_console: {
        connection_status: "verified",
        property_url: "sc-domain:example.com",
      },
    });

    expect(status.available).toBe(true);
    expect(status.enabled).toBe(true);
    expect(status.collecting).toBe(true);
    expect(status.gsc.connected).toBe(true);
    expect(status.gsc.property).toBe("sc-domain:example.com");
  });
});

describe("vibe marketing analytics client contract", () => {
  test("uses the scoped status, summary, article, toggle, and GSC endpoints", async () => {
    const calls: Array<{ method: "GET" | "POST"; url: string; body?: unknown }> = [];
    const client: VibeMarketingAnalyticsHttpClient = {
      async get(url) {
        calls.push({ method: "GET", url });
        if (url.includes("/summary")) return { data: { range: "28d", totals: {}, articles: [] } };
        if (url.includes("/articles/")) return { data: { article_id: "article/with spaces", title: "Article" } };
        return { data: { status: "enabled" } };
      },
      async post(url, body) {
        calls.push({ method: "POST", url, body });
        if (url.endsWith("/gsc/verify")) return { data: { status: "verified", property: "sc-domain:example.com" } };
        return { data: { status: url.endsWith("/enable") ? "enabled" : "disabled" } };
      },
    };
    const options = { companyId: "company-1", client };

    await getVibeMarketingAnalyticsStatus(options);
    await getVibeMarketingAnalyticsSummary("28d", options);
    await getVibeMarketingArticleAnalytics("article/with spaces", "90d", options);
    await setVibeMarketingAnalyticsEnabled(true, options);
    await setVibeMarketingAnalyticsEnabled(false, options);
    const gsc = await verifyVibeMarketingAnalyticsGsc(options);

    expect(calls).toEqual([
      {
        method: "GET",
        url: "/api/v1/vibe-marketing/analytics/status?company_id=company-1",
      },
      {
        method: "GET",
        url: "/api/v1/vibe-marketing/analytics/summary?range=28d&company_id=company-1",
      },
      {
        method: "GET",
        url: "/api/v1/vibe-marketing/analytics/articles/article%2Fwith%20spaces?range=90d&company_id=company-1",
      },
      {
        method: "POST",
        url: "/api/v1/vibe-marketing/analytics/enable",
        body: { companyId: "company-1", company_id: "company-1" },
      },
      {
        method: "POST",
        url: "/api/v1/vibe-marketing/analytics/disable",
        body: { companyId: "company-1", company_id: "company-1" },
      },
      {
        method: "POST",
        url: "/api/v1/vibe-marketing/analytics/gsc/verify",
        body: { companyId: "company-1", company_id: "company-1" },
      },
    ]);
    expect(gsc.connected).toBe(true);
  });

  test("recognizes endpoints that have not shipped without treating every outage as unsupported", () => {
    expect(isVibeMarketingAnalyticsEndpointUnavailable({ response: { status: 404 } })).toBe(true);
    expect(isVibeMarketingAnalyticsEndpointUnavailable({ status: 501 })).toBe(true);
    expect(isVibeMarketingAnalyticsEndpointUnavailable({ response: { status: 503 } })).toBe(false);
  });
});

describe("vibe marketing analytics dashboard boundary", () => {
  test("renders a collapsed launcher without loading performance content into the dashboard bootstrap", () => {
    const markup = renderToStaticMarkup(
      createElement(VibeMarketingAnalyticsSection, { companyId: "company-1" }),
    );

    expect(markup).toContain("Article performance");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).not.toContain("Search impressions");
    expect(markup).not.toContain(AI_REFERRAL_CAVEAT);
  });

  test("keeps the AI attribution warning explicit", () => {
    expect(AI_REFERRAL_CAVEAT).toContain("detectable lower bound");
    expect(AI_REFERRAL_CAVEAT).toContain("unattributed visits");
  });
});
