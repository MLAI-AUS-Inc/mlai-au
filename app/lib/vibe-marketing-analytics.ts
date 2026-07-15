import { apiErrorDetail, axiosInstance } from "~/lib/api";

const ANALYTICS_BASE_PATH = "/api/v1/vibe-marketing/analytics";

export const AI_REFERRAL_CAVEAT =
  "AI referrals are a detectable lower bound. Some assistants strip referrers or open links as direct traffic, so unattributed visits may include additional AI traffic.";

export type VibeMarketingAnalyticsRange = "7d" | "28d" | "90d" | "16m";

export interface VibeMarketingAnalyticsTotals {
  searchImpressions: number | null;
  searchClicks: number | null;
  searchCtr: number | null;
  averagePosition: number | null;
  visits: number | null;
  engaged30: number | null;
  scroll50: number | null;
  scroll90: number | null;
  ctaImpressions: number | null;
  ctaClicks: number | null;
  ctaConversionRate: number | null;
}

export interface VibeMarketingAnalyticsFreshness {
  status: string | null;
  updatedAt: string | null;
  analyticsDataThrough: string | null;
  searchDataThrough: string | null;
  stale: boolean;
  delayDays: number | null;
  message: string | null;
}

export interface VibeMarketingAnalyticsSource {
  key: string;
  label: string;
  visits: number;
  ctaClicks: number;
  share: number | null;
  isAi: boolean;
}

export interface VibeMarketingAnalyticsQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number | null;
}

export interface VibeMarketingArticleAnalytics {
  id: string;
  title: string;
  slug: string | null;
  url: string | null;
  totals: VibeMarketingAnalyticsTotals;
  sources: VibeMarketingAnalyticsSource[];
  queries: VibeMarketingAnalyticsQuery[];
  freshness: VibeMarketingAnalyticsFreshness;
}

export interface VibeMarketingAnalyticsSummary {
  range: VibeMarketingAnalyticsRange;
  startDate: string | null;
  endDate: string | null;
  totals: VibeMarketingAnalyticsTotals;
  sources: VibeMarketingAnalyticsSource[];
  articles: VibeMarketingArticleAnalytics[];
  freshness: VibeMarketingAnalyticsFreshness;
}

export interface VibeMarketingGscConnection {
  status: string;
  connected: boolean;
  property: string | null;
  message: string | null;
  lastVerifiedAt: string | null;
}

export interface VibeMarketingAnalyticsStatus {
  status: string;
  available: boolean;
  enabled: boolean;
  collecting: boolean;
  provider: string | null;
  lastEventAt: string | null;
  lastSyncedAt: string | null;
  message: string | null;
  gsc: VibeMarketingGscConnection;
}

export interface VibeMarketingAnalyticsHttpClient {
  get(url: string): Promise<{ data: unknown }>;
  post(url: string, body?: unknown): Promise<{ data: unknown }>;
}

export interface VibeMarketingAnalyticsRequestOptions {
  companyId?: string | null;
  client?: VibeMarketingAnalyticsHttpClient;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "on", "enabled", "active", "collecting", "connected"].includes(normalized)) return true;
    if (["0", "false", "no", "off", "disabled", "inactive", "disconnected"].includes(normalized)) return false;
  }
  return fallback;
}

function firstString(records: Record<string, unknown>[], keys: string[]): string | null {
  for (const record of records) {
    for (const key of keys) {
      const value = asString(record[key]);
      if (value !== null) return value;
    }
  }
  return null;
}

function firstNumber(records: Record<string, unknown>[], keys: string[]): number | null {
  for (const record of records) {
    for (const key of keys) {
      const value = asNumber(record[key]);
      if (value !== null) return value;
    }
  }
  return null;
}

function metricRecords(raw: unknown): Record<string, unknown>[] {
  const payload = asRecord(raw);
  const totals = asRecord(payload.totals ?? payload.metrics);
  return [
    totals,
    asRecord(totals.search ?? totals.searchConsole ?? totals.search_console ?? totals.gsc),
    asRecord(totals.engagement ?? totals.behaviour ?? totals.behavior ?? totals.umami),
    asRecord(totals.cta ?? totals.conversions),
    payload,
    asRecord(payload.search ?? payload.searchConsole ?? payload.search_console ?? payload.gsc),
    asRecord(payload.engagement ?? payload.behaviour ?? payload.behavior ?? payload.umami),
    asRecord(payload.cta ?? payload.conversions),
  ];
}

export function normalizeVibeMarketingAnalyticsTotals(raw: unknown): VibeMarketingAnalyticsTotals {
  const records = metricRecords(raw);
  const searchImpressions = firstNumber(records, ["searchImpressions", "search_impressions", "gscImpressions", "gsc_impressions", "impressions"]);
  const searchClicks = firstNumber(records, ["searchClicks", "search_clicks", "gscClicks", "gsc_clicks", "clicks"]);
  const visits = firstNumber(records, ["visits", "articleVisits", "article_visits", "pageViews", "page_views", "pageviews"]);
  const ctaClicks = firstNumber(records, ["ctaClicks", "cta_clicks", "ctaClickCount", "cta_click_count"]);
  const suppliedSearchCtr = firstNumber(records, ["searchCtr", "search_ctr", "gscCtr", "gsc_ctr", "ctr"]);
  const suppliedCtaConversion = firstNumber(records, [
    "ctaConversionRate",
    "cta_conversion_rate",
    "ctaConversion",
    "cta_conversion",
    "conversionRate",
    "conversion_rate",
  ]);

  return {
    searchImpressions,
    searchClicks,
    searchCtr:
      suppliedSearchCtr ??
      (searchImpressions !== null && searchImpressions > 0 && searchClicks !== null
        ? searchClicks / searchImpressions
        : null),
    averagePosition: firstNumber(records, [
      "averagePosition",
      "average_position",
      "searchPosition",
      "search_position",
      "position",
    ]),
    visits,
    engaged30: firstNumber(records, ["engaged30", "engaged_30", "engaged30Count", "engaged_30_count"]),
    scroll50: firstNumber(records, ["scroll50", "scroll_50", "scroll50Count", "scroll_50_count"]),
    scroll90: firstNumber(records, ["scroll90", "scroll_90", "scroll90Count", "scroll_90_count"]),
    ctaImpressions: firstNumber(records, ["ctaImpressions", "cta_impressions", "ctaImpressionCount", "cta_impression_count"]),
    ctaClicks,
    ctaConversionRate:
      suppliedCtaConversion ??
      (visits !== null && visits > 0 && ctaClicks !== null ? ctaClicks / visits : null),
  };
}

export function normalizeVibeMarketingAnalyticsFreshness(raw: unknown): VibeMarketingAnalyticsFreshness {
  const payload = asRecord(raw);
  const nested = asRecord(payload.freshness);
  const records = [nested, payload];
  return {
    status: firstString(records, ["status", "freshnessStatus", "freshness_status"]),
    updatedAt: firstString(records, ["updatedAt", "updated_at", "lastUpdatedAt", "last_updated_at", "lastSyncedAt", "last_synced_at"]),
    analyticsDataThrough: firstString(records, [
      "analyticsDataThrough",
      "analytics_data_through",
      "eventsDataThrough",
      "events_data_through",
    ]),
    searchDataThrough: firstString(records, [
      "searchDataThrough",
      "search_data_through",
      "gscDataThrough",
      "gsc_data_through",
    ]),
    stale: asBoolean(nested.stale ?? payload.stale),
    delayDays: firstNumber(records, ["delayDays", "delay_days"]),
    message: firstString(records, ["message", "detail"]),
  };
}

function sourceItems(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  const payload = asRecord(raw);
  return Object.entries(payload).map(([key, value]) => ({ key, ...asRecord(value) }));
}

function looksLikeAiSource(key: string, label: string): boolean {
  const value = `${key} ${label}`.toLowerCase();
  return ["ai assistant", "chatgpt", "perplexity", "claude", "copilot", "gemini", "grok", "openai"].some((token) =>
    value.includes(token),
  );
}

export function normalizeVibeMarketingAnalyticsSources(raw: unknown, totalVisits: number | null = null): VibeMarketingAnalyticsSource[] {
  return sourceItems(raw)
    .map((item, index) => {
      const payload = asRecord(item);
      const key =
        asString(payload.key ?? payload.id ?? payload.source ?? payload.channel) ??
        `source-${index + 1}`;
      const label = asString(payload.label ?? payload.name ?? payload.sourceLabel ?? payload.source_label) ?? key;
      const visits = asNumber(payload.visits ?? payload.views ?? payload.pageViews ?? payload.page_views) ?? 0;
      const suppliedShare = asNumber(payload.share ?? payload.visitShare ?? payload.visit_share);
      return {
        key,
        label,
        visits,
        ctaClicks: asNumber(payload.ctaClicks ?? payload.cta_clicks ?? payload.conversions) ?? 0,
        share: suppliedShare ?? (totalVisits !== null && totalVisits > 0 ? visits / totalVisits : null),
        isAi: asBoolean(payload.isAi ?? payload.is_ai, looksLikeAiSource(key, label)),
      };
    })
    .filter((source) => source.visits > 0 || source.ctaClicks > 0)
    .sort((left, right) => right.visits - left.visits);
}

function normalizeVibeMarketingAnalyticsQueries(raw: unknown): VibeMarketingAnalyticsQuery[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const payload = asRecord(item);
      const query = asString(payload.query ?? payload.keyword) ?? "";
      const clicks = asNumber(payload.clicks) ?? 0;
      const impressions = asNumber(payload.impressions) ?? 0;
      return {
        query,
        clicks,
        impressions,
        ctr: asNumber(payload.ctr) ?? (impressions > 0 ? clicks / impressions : null),
      };
    })
    .filter((item) => Boolean(item.query));
}

function articlePayload(raw: unknown): Record<string, unknown> {
  const payload = asRecord(raw);
  const nested = asRecord(payload.article);
  return Object.keys(nested).length ? { ...payload, ...nested } : payload;
}

export function normalizeVibeMarketingArticleAnalytics(raw: unknown): VibeMarketingArticleAnalytics {
  const payload = articlePayload(raw);
  const totals = normalizeVibeMarketingAnalyticsTotals(payload);
  return {
    id: asString(payload.id ?? payload.articleId ?? payload.article_id ?? payload.key) ?? "",
    title: asString(payload.title ?? payload.articleTitle ?? payload.article_title) ?? "Untitled article",
    slug: asString(payload.slug),
    url: asString(payload.url ?? payload.liveUrl ?? payload.live_url ?? payload.canonicalUrl ?? payload.canonical_url),
    totals,
    sources: normalizeVibeMarketingAnalyticsSources(
      payload.sources ?? payload.trafficSources ?? payload.traffic_sources ?? payload.channels,
      totals.visits,
    ),
    queries: normalizeVibeMarketingAnalyticsQueries(payload.queries ?? payload.searchQueries ?? payload.search_queries),
    freshness: normalizeVibeMarketingAnalyticsFreshness(payload),
  };
}

export function normalizeVibeMarketingAnalyticsSummary(
  raw: unknown,
  fallbackRange: VibeMarketingAnalyticsRange = "28d",
): VibeMarketingAnalyticsSummary {
  const payload = asRecord(raw);
  const totals = normalizeVibeMarketingAnalyticsTotals(payload);
  const rawArticles = Array.isArray(payload.articles)
    ? payload.articles
    : Array.isArray(payload.items)
      ? payload.items
      : [];
  const range = asString(payload.range);
  const normalizedRange: VibeMarketingAnalyticsRange =
    range === "7d" || range === "28d" || range === "90d" || range === "16m" ? range : fallbackRange;
  return {
    range: normalizedRange,
    startDate: asString(payload.startDate ?? payload.start_date),
    endDate: asString(payload.endDate ?? payload.end_date),
    totals,
    sources: normalizeVibeMarketingAnalyticsSources(
      payload.sources ?? payload.trafficSources ?? payload.traffic_sources ?? payload.channels,
      totals.visits,
    ),
    articles: rawArticles
      .map(normalizeVibeMarketingArticleAnalytics)
      .filter((article) => Boolean(article.id)),
    freshness: normalizeVibeMarketingAnalyticsFreshness(payload),
  };
}

function normalizeGscConnection(raw: unknown): VibeMarketingGscConnection {
  const payload = asRecord(raw);
  const status = asString(payload.status ?? payload.connectionStatus ?? payload.connection_status) ?? "not_connected";
  return {
    status,
    connected: asBoolean(payload.connected, ["connected", "verified", "active"].includes(status.toLowerCase())),
    property: asString(payload.property ?? payload.propertyUrl ?? payload.property_url ?? payload.siteUrl ?? payload.site_url),
    message: asString(payload.message ?? payload.detail),
    lastVerifiedAt: asString(payload.lastVerifiedAt ?? payload.last_verified_at ?? payload.verifiedAt ?? payload.verified_at),
  };
}

export function normalizeVibeMarketingAnalyticsStatus(raw: unknown): VibeMarketingAnalyticsStatus {
  const payload = asRecord(raw);
  const status = asString(payload.status) ?? "disabled";
  const normalizedStatus = status.toLowerCase();
  const enabled = asBoolean(payload.enabled ?? payload.isEnabled ?? payload.is_enabled, ["enabled", "active", "collecting"].includes(normalizedStatus));
  return {
    status,
    available: asBoolean(
      payload.available,
      !["unavailable", "not_available", "not_implemented", "unsupported"].includes(normalizedStatus),
    ),
    enabled,
    collecting: asBoolean(payload.collecting ?? payload.isCollecting ?? payload.is_collecting, enabled && normalizedStatus !== "provisioning"),
    provider: asString(payload.provider),
    lastEventAt: asString(payload.lastEventAt ?? payload.last_event_at),
    lastSyncedAt: asString(payload.lastSyncedAt ?? payload.last_synced_at),
    message: asString(payload.message ?? payload.detail),
    gsc: normalizeGscConnection(payload.gsc ?? payload.searchConsole ?? payload.search_console),
  };
}

function clientFor(options: VibeMarketingAnalyticsRequestOptions): VibeMarketingAnalyticsHttpClient {
  return options.client ?? (axiosInstance as VibeMarketingAnalyticsHttpClient);
}

function queryPath(path: string, values: Record<string, string | null | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export async function getVibeMarketingAnalyticsStatus(
  options: VibeMarketingAnalyticsRequestOptions = {},
): Promise<VibeMarketingAnalyticsStatus> {
  const response = await clientFor(options).get(
    queryPath(`${ANALYTICS_BASE_PATH}/status`, { company_id: options.companyId }),
  );
  return normalizeVibeMarketingAnalyticsStatus(response.data);
}

export async function setVibeMarketingAnalyticsEnabled(
  enabled: boolean,
  options: VibeMarketingAnalyticsRequestOptions = {},
): Promise<VibeMarketingAnalyticsStatus> {
  const response = await clientFor(options).post(
    `${ANALYTICS_BASE_PATH}/${enabled ? "enable" : "disable"}`,
    options.companyId ? { companyId: options.companyId, company_id: options.companyId } : {},
  );
  return normalizeVibeMarketingAnalyticsStatus(response.data);
}

export async function getVibeMarketingAnalyticsSummary(
  range: VibeMarketingAnalyticsRange = "28d",
  options: VibeMarketingAnalyticsRequestOptions = {},
): Promise<VibeMarketingAnalyticsSummary> {
  const response = await clientFor(options).get(
    queryPath(`${ANALYTICS_BASE_PATH}/summary`, { range, company_id: options.companyId }),
  );
  return normalizeVibeMarketingAnalyticsSummary(response.data, range);
}

export async function getVibeMarketingArticleAnalytics(
  articleId: string,
  range: VibeMarketingAnalyticsRange = "90d",
  options: VibeMarketingAnalyticsRequestOptions = {},
): Promise<VibeMarketingArticleAnalytics> {
  const response = await clientFor(options).get(
    queryPath(`${ANALYTICS_BASE_PATH}/articles/${encodeURIComponent(articleId)}`, {
      range,
      company_id: options.companyId,
    }),
  );
  return normalizeVibeMarketingArticleAnalytics(response.data);
}

export async function verifyVibeMarketingAnalyticsGsc(
  options: VibeMarketingAnalyticsRequestOptions = {},
): Promise<VibeMarketingGscConnection> {
  const response = await clientFor(options).post(
    `${ANALYTICS_BASE_PATH}/gsc/verify`,
    options.companyId ? { companyId: options.companyId, company_id: options.companyId } : {},
  );
  const payload = asRecord(response.data);
  return normalizeGscConnection(payload.gsc ?? payload.searchConsole ?? payload.search_console ?? payload);
}

export function isVibeMarketingAnalyticsEndpointUnavailable(error: unknown): boolean {
  const status =
    (error as { response?: { status?: number } } | null)?.response?.status ??
    (error as { status?: number } | null)?.status;
  return status === 404 || status === 405 || status === 501;
}

export function vibeMarketingAnalyticsErrorMessage(
  error: unknown,
  fallback = "Article performance could not be loaded. Try again in a moment.",
): string {
  return apiErrorDetail(error, fallback);
}
