import type { VibeMarketingTopicCandidate } from "~/types/vibe-marketing";

export type TopicDifficultyStatus = "available" | "unavailable" | "error" | "pending";
export type TopicTrendStatus = "breakout" | "growing" | "stable" | "declining" | "unavailable";
export type TopicHistoryUnit = "monthly_searches" | "relative_interest" | "daily_searches";

export interface TopicDifficultyMetric {
  status: TopicDifficultyStatus;
  score: number | null;
  label: string;
  summary: string;
  sourceLabel: string | null;
}

export interface TopicHistoryPoint {
  /** An actual provider date, or a calendar slot with a null (missing) value. */
  date: string;
  label: string;
  value: number | null;
}

export interface TopicSearchHistory {
  status: "available" | "unavailable";
  points: TopicHistoryPoint[];
  unit: TopicHistoryUnit | null;
  unitLabel: string;
  sourceLabel: string | null;
  contextLabel: string | null;
  coverageLabel: string;
  summary: string;
  reportedCount: number;
}

export interface TopicTrendMetric {
  status: TopicTrendStatus;
  label: string;
  changePercent: number | null;
  summary: string;
}

export interface TopicResearchMetrics {
  difficulty: TopicDifficultyMetric;
  history: TopicSearchHistory;
  trend: TopicTrendMetric;
}

type UnknownRecord = Record<string, unknown>;

const VERIFIED_DIFFICULTY_SOURCES = new Set(["dataforseo_labs", "dataforseo_bulk"]);
const MONTHLY_SOURCES = new Set(["dataforseo_labs", "dataforseo", "dataforseo_keywords", "dataforseo_google"]);
const RELATIVE_SOURCES = new Set(["google_trends", "pytrends", "dataforseo_trends"]);
const MONTH_FORMAT = new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric", timeZone: "UTC" });
const DAY_FORMAT = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", timeZone: "UTC" });
const FULL_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Read a metric without turning missing values, booleans or blank strings into zero. */
export function numericMetricValue(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/,/g, "");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(cleaned)) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : {};
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function providerLabel(source: string | null): string | null {
  if (!source) return null;
  if (source === "dataforseo_labs") return "DataForSEO Labs";
  if (source === "dataforseo_bulk") return "DataForSEO";
  if (MONTHLY_SOURCES.has(source)) return "DataForSEO";
  if (RELATIVE_SOURCES.has(source)) return "Google Trends";
  if (source === "glimpse") return "Glimpse";
  return null;
}

function difficultyMetric(candidate: UnknownRecord): TopicDifficultyMetric {
  const source = text(candidate.difficultySource)?.toLowerCase() ?? null;
  const value = numericMetricValue(candidate.difficulty);
  const suppliedStatus = text(candidate.difficultyStatus)?.toLowerCase();
  const reason = text(candidate.difficultyReason);
  if (source && VERIFIED_DIFFICULTY_SOURCES.has(source) && value !== null && Number.isInteger(value) && value >= 0 && value <= 100) {
    const label = value <= 20 ? "Very approachable" : value <= 40 ? "Achievable" : value <= 60 ? "Moderate" : value <= 80 ? "Hard" : "Very hard";
    const guidance = value <= 20
      ? "Lower ranking competition. A useful article that answers the search intent is a good starting point."
      : value <= 40
        ? "Relatively approachable competition. Clear expertise and relevant internal links can help."
        : value <= 60
          ? "Moderate ranking competition. Strong content and an established site are likely to matter."
          : value <= 80
            ? "High ranking competition. Plan for supporting content, authority and relevant backlinks."
            : "Very high ranking competition. This is a longer-term authority opportunity.";
    return { status: "available", score: value, label, summary: guidance, sourceLabel: providerLabel(source) };
  }
  const status = suppliedStatus === "error" ? "error" : suppliedStatus === "pending" ? "pending" : "unavailable";
  return {
    status,
    score: null,
    label: status === "error" ? "Could not load" : status === "pending" ? "Researching" : "Unavailable",
    summary: reason ?? (status === "error"
      ? "The difficulty lookup failed. Research this topic again to retry."
      : status === "pending"
        ? "The keyword difficulty lookup is still running."
        : "The search provider has not supplied a verified keyword difficulty score for this topic."),
    sourceLabel: source && VERIFIED_DIFFICULTY_SOURCES.has(source) ? providerLabel(source) : null,
  };
}

function dateValue(value: unknown): string | null {
  const input = text(value);
  if (!input) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(input);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? `${match[1]}-${match[2]}-${match[3]}`
    : null;
}

function monthDate(point: UnknownRecord): string | null {
  const year = numericMetricValue(point.year);
  const month = numericMetricValue(point.month);
  if (year !== null && month !== null && Number.isInteger(year) && Number.isInteger(month)) {
    return dateValue(`${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-01`);
  }
  const rawDate = text(point.date);
  const date = dateValue(rawDate?.length === 7 ? `${rawDate}-01` : rawDate);
  return date ? `${date.slice(0, 7)}-01` : null;
}

function pointValue(point: UnknownRecord): number | null {
  const value = numericMetricValue(point.search_volume ?? point.searchVolume ?? point.volume ?? point.value);
  return value !== null && value >= 0 ? value : null;
}

function dateLabel(date: string, monthly: boolean): string {
  return (monthly ? MONTH_FORMAT : DAY_FORMAT).format(new Date(`${date}T00:00:00Z`));
}

function dateSpan(points: TopicHistoryPoint[], monthly: boolean): string {
  if (!points.length) return "No dated observations";
  const first = points[0].date;
  const last = points[points.length - 1].date;
  if (monthly) return first === last ? dateLabel(first, true) : `${dateLabel(first, true)} – ${dateLabel(last, true)}`;
  const format = (date: string) => FULL_DATE_FORMAT.format(new Date(`${date}T00:00:00Z`));
  return first === last ? format(first) : `${format(first)} – ${format(last)}`;
}

function monthIndex(date: string): number {
  return Number(date.slice(0, 4)) * 12 + Number(date.slice(5, 7)) - 1;
}

function monthlyPoints(value: unknown): TopicHistoryPoint[] {
  if (!Array.isArray(value)) return [];
  const observations = new Map<string, number>();
  for (const item of value) {
    const point = record(item);
    const date = monthDate(point);
    const measured = pointValue(point);
    if (date && measured !== null) observations.set(date, measured);
  }
  const dates = [...observations.keys()].sort();
  if (!dates.length) return [];
  const latest = monthIndex(dates[dates.length - 1]);
  return Array.from({ length: 6 }, (_, index) => {
    const slot = latest - 5 + index;
    const date = `${Math.floor(slot / 12)}-${String(slot % 12 + 1).padStart(2, "0")}-01`;
    return { date, label: dateLabel(date, true), value: observations.get(date) ?? null };
  });
}

function datedDailyPoints(velocity: UnknownRecord): TopicHistoryPoint[] {
  const values = velocity.dailyVolumes ?? velocity.daily_volumes ?? velocity.points;
  const dates = velocity.dates ?? velocity.trendDates ?? velocity.trend_dates ?? velocity.dailyDates ?? velocity.daily_dates;
  if (!Array.isArray(values)) return [];
  const observations = new Map<string, number | null>();
  for (const [index, item] of values.entries()) {
    const point = record(item);
    const date = dateValue(point.date ?? (Array.isArray(dates) ? dates[index] : null));
    const value = typeof item === "number" || typeof item === "string" ? numericMetricValue(item) : pointValue(point);
    if (date) observations.set(date, value !== null && value >= 0 ? value : null);
  }
  return [...observations.entries()].sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, label: dateLabel(date, false), value }));
}

function contextLabel(candidate: UnknownRecord, velocity: UnknownRecord): string | null {
  const country = text(candidate.trendCountry) ?? text(candidate.country) ?? text(candidate.locationName)
    ?? text(velocity.country) ?? text(velocity.locationName) ?? text(velocity.location_name);
  const language = text(candidate.trendLanguage) ?? text(candidate.language) ?? text(velocity.language);
  return [country, language].filter(Boolean).join(" · ") || null;
}

function historyMetric(candidate: UnknownRecord): TopicSearchHistory {
  const velocity = record(candidate.velocity);
  const monthlySource = text(candidate.monthlySearchesSource)?.toLowerCase()
    ?? text(candidate.trendSource)?.toLowerCase();
  const monthlyBasis = text(candidate.monthlySearchesBasis)?.toLowerCase()
    ?? text(candidate.trendBasis)?.toLowerCase();
  const monthly = monthlyPoints(candidate.monthlySearches);
  const monthlyTrusted = !!monthlySource && MONTHLY_SOURCES.has(monthlySource)
    && (!monthlyBasis || ["search_volume", "google_search_volume", "monthly_searches"].includes(monthlyBasis));
  if (monthly.length && monthlyTrusted) {
    const reportedCount = monthly.filter((point) => point.value !== null).length;
    return {
      status: reportedCount >= 2 ? "available" : "unavailable",
      points: monthly,
      unit: "monthly_searches",
      unitLabel: "Estimated monthly searches",
      sourceLabel: providerLabel(monthlySource),
      contextLabel: contextLabel(candidate, velocity),
      coverageLabel: `${dateSpan(monthly, true)} · ${reportedCount} of 6 months reported`,
      summary: reportedCount === 6
        ? "Provider estimates for the latest six reported calendar months."
        : "Missing months are left as gaps. At least two consecutive observations are needed to describe a trend.",
      reportedCount,
    };
  }
  // The API also carries a dated daily series in its legacy monthlySearches
  // field. Its accompanying source and basis determine the actual units.
  const flatDaily = datedDailyPoints({ dailyVolumes: candidate.monthlySearches });
  const useFlatDaily = flatDaily.length > 0 && !!monthlySource
    && (RELATIVE_SOURCES.has(monthlySource) || monthlySource === "glimpse");
  const source = useFlatDaily ? monthlySource : text(velocity.source)?.toLowerCase() ?? text(candidate.trendSource)?.toLowerCase() ?? null;
  const basis = useFlatDaily ? monthlyBasis : text(velocity.basis)?.toLowerCase() ?? text(candidate.trendBasis)?.toLowerCase();
  const relative = !!source && RELATIVE_SOURCES.has(source)
    && (!basis || ["relative_interest", "search_interest", "google_trends"].includes(basis));
  const dailyVolume = source === "glimpse" && ["absolute_volume", "search_volume", "daily_searches"].includes(basis ?? "");
  const daily = (useFlatDaily ? flatDaily : datedDailyPoints(velocity)).map((point) => relative && point.value !== null && point.value > 100
    ? { ...point, value: null } : point);
  if ((relative || dailyVolume) && daily.length) {
    const reportedCount = daily.filter((point) => point.value !== null).length;
    return {
      status: reportedCount >= 2 ? "available" : "unavailable",
      points: daily,
      unit: relative ? "relative_interest" : "daily_searches",
      unitLabel: relative ? "Relative search interest (0–100)" : "Estimated daily searches",
      sourceLabel: providerLabel(source),
      contextLabel: contextLabel(candidate, velocity),
      coverageLabel: `${dateSpan(daily, false)} · ${reportedCount} observations`,
      summary: relative
        ? "Interest is normalised within this period: 100 is its peak popularity. These values are not search counts."
        : "Daily search estimates for the dates reported by the provider.",
      reportedCount,
    };
  }
  return {
    status: "unavailable", points: [], unit: null, unitLabel: "Search history", sourceLabel: null,
    contextLabel: contextLabel(candidate, velocity), coverageLabel: "No verified dated history", reportedCount: 0,
    summary: text(candidate.trendReason)
      ?? "The provider has not returned dated search history for this topic. Research it again to refresh the data.",
  };
}

function trendMetric(history: TopicSearchHistory): TopicTrendMetric {
  const unknown = (summary: string): TopicTrendMetric => ({ status: "unavailable", label: "Unavailable", changePercent: null, summary });
  const measured = history.points.filter((point): point is TopicHistoryPoint & { value: number } => point.value !== null);
  if (measured.length < 2) return unknown("At least two dated observations are needed to measure a trend.");
  if (history.unit === "monthly_searches" && measured.some((point, index) => index > 0 && monthIndex(point.date) !== monthIndex(measured[index - 1].date) + 1)) {
    return unknown("The reported months have gaps, so a reliable growth comparison is unavailable.");
  }
  if (history.unit !== "monthly_searches") {
    const first = history.points.findIndex((point) => point.value !== null);
    const last = history.points.length - 1 - [...history.points].reverse().findIndex((point) => point.value !== null);
    const knownGap = history.points.slice(first, last + 1).some((point) => point.value === null);
    const intervals = measured.slice(1).map((point, index) => Date.parse(point.date) - Date.parse(measured[index].date));
    const monthlyCadence = measured.every((point, index) => index === 0
      || (monthIndex(point.date) === monthIndex(measured[index - 1].date) + 1 && point.date.slice(8) === measured[index - 1].date.slice(8)));
    if (knownGap || (!monthlyCadence && intervals.some((interval) => interval !== intervals[0]))) {
      return unknown("The observation dates have gaps or an irregular interval, so a reliable growth comparison is unavailable.");
    }
  }
  const count = Math.floor(measured.length / 2);
  const average = (points: Array<{ value: number }>) => points.reduce((sum, point) => sum + point.value, 0) / points.length;
  const earlier = average(measured.slice(0, count));
  const later = average(measured.slice(-count));
  if (earlier === 0 && later === 0) return unknown("The measured periods report zero interest, so a direction cannot be established.");
  const changePercent = earlier === 0 ? null : (later - earlier) / earlier * 100;
  const status: TopicTrendStatus = changePercent === null || changePercent >= 100 ? "breakout"
    : changePercent > 15 ? "growing" : changePercent < -15 ? "declining" : "stable";
  const label = status === "breakout" ? "Breakout" : status === "growing" ? "Growing" : status === "declining" ? "Declining" : "Stable";
  const unit = history.unit === "monthly_searches" ? "monthly search demand" : history.unit === "relative_interest" ? "relative search interest" : "daily search demand";
  const span = dateSpan(measured, history.unit === "monthly_searches");
  const comparison = `Compares the first ${count} and last ${count} reported ${history.unit === "monthly_searches" ? (count === 1 ? "month" : "months") : (count === 1 ? "observation" : "observations")} (${span}).`;
  const description = changePercent === null
    ? `Measured ${unit} rose from a zero baseline. A percentage change is not defined.`
    : `${Math.abs(changePercent).toFixed(0)}% ${changePercent > 0 ? "higher" : changePercent < 0 ? "lower" : "change in"} average ${unit}.`;
  return { status, label, changePercent, summary: `${description} ${comparison}` };
}

/** Derive display metrics only from verified scores and dated, matching-source observations. */
export function topicResearchMetrics(candidate: VibeMarketingTopicCandidate): TopicResearchMetrics {
  const raw = candidate as unknown as UnknownRecord;
  const history = historyMetric(raw);
  return { difficulty: difficultyMetric(raw), history, trend: trendMetric(history) };
}
