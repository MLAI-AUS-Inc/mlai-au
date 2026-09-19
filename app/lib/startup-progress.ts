export type ProgressCategory =
  | "audience"
  | "product"
  | "customers"
  | "community"
  | "delivery";
export type ProgressRange = 3 | 6 | 12 | 24;
export interface ProgressPoint {
  date: string;
  periodStart: string;
  periodEnd: string;
  value: number | null;
  partial: boolean;
  status: "complete" | "partial" | "missing";
  observedAt: string | null;
}
export interface ProgressSeries {
  id: string;
  metricKey: string;
  label: string;
  category: ProgressCategory;
  unit: string;
  aggregation: "sum" | "stock" | "unique" | "ratio" | "average";
  definition: string;
  definitionVersion: number;
  provider: string;
  source: string;
  scopeLabel?: string;
  scope?: Record<string, string | number>;
  timezone: string;
  readOnly: boolean;
  points: ProgressPoint[];
  readiness: "ready" | "needs_data";
  lastSyncedAt: string | null;
  limitations: string[];
}
export interface ProgressChartSpec {
  id: string;
  seriesIds: string[];
  months: ProgressRange;
  type: "line" | "bar";
  caption: string;
}
export interface ProgressChartSnapshot {
  spec: ProgressChartSpec;
  series: ProgressSeries[];
  cutoff: string;
  schemaVersion: 1;
}
export interface ProgressDefinition {
  key: string;
  label: string;
  definition: string;
  category: ProgressCategory;
  unit: string;
  aggregation: ProgressSeries["aggregation"];
  version: number;
}
export interface StartupProgress {
  schemaVersion: 1;
  companyId: string;
  timezone: string;
  version: number;
  series: ProgressSeries[];
  charts: ProgressChartSpec[] | null;
  range: ProgressRange;
  definitions: ProgressDefinition[];
  asOf: string;
  googleAnalytics: {
    properties: { property_id: string; property_display_name: string }[];
    events: Record<string, string[]>;
    mappings: Record<string, { eventName: string; label: string }>;
    lastError?: string;
  };
}
export const PROGRESS_CATEGORIES = [
  { key: "overview", label: "Overview" },
  { key: "audience", label: "Audience" },
  { key: "product", label: "Product" },
  { key: "customers", label: "Customers" },
  { key: "community", label: "Community" },
  { key: "delivery", label: "Delivery" },
] as const;

export function progressEnabled(env: unknown): boolean {
  return ["1", "true"].includes(
    String(
      (env as Record<string, unknown>)?.STARTUP_PROGRESS_ENABLED || "",
    ).toLowerCase(),
  );
}

export function metricChart(
  series: ProgressSeries,
  months: ProgressRange = 6,
): ProgressChartSpec {
  return {
    id: series.id,
    seriesIds: [series.id],
    months,
    type: "line",
    caption: "",
  };
}

export function recommendedCharts(
  series: ProgressSeries[],
): ProgressChartSpec[] {
  const ready = series.filter((item) => item.readiness === "ready");
  const hasAccounting = ready.some(
    (item) => item.provider === "xero" && item.metricKey === "revenue",
  );
  return ready
    .filter(
      (item) =>
        !(hasAccounting && item.provider === "financial") &&
        !["netProfitLoss", "monthlyCosts", "ga.engagementRate"].includes(
          item.metricKey,
        ),
    )
    .slice(0, 4)
    .map((item) => metricChart(item));
}

export function chartSeries(
  spec: ProgressChartSpec,
  series: ProgressSeries[],
): ProgressSeries[] {
  return spec.seriesIds
    .map((id) => series.find((item) => item.id === id))
    .filter((item): item is ProgressSeries => !!item);
}

export function progressMonths(end: string, count: number): string[] {
  const [year, month] = end.slice(0, 7).split("-").map(Number);
  if (!year || !month || month > 12) return [];
  return Array.from({ length: count }, (_, index) => {
    const d = new Date(Date.UTC(year, month - count + index, 1));
    return d.toISOString().slice(0, 10);
  });
}

export function progressRows(
  series: ProgressSeries[],
  months: ProgressRange,
  end: string,
) {
  const periods = progressMonths(end, months);
  return periods.map((date) => {
    const row: Record<string, string | number | null | boolean> = { date };
    for (const item of series) {
      const point = item.points.find(
        (point) =>
          point.date.slice(0, 7) === date.slice(0, 7) && point.periodEnd <= end,
      );
      row[item.id] = point?.value ?? null;
      row[`${item.id}:partial`] = point?.partial ?? false;
      row[`${item.id}:through`] = point?.periodEnd ?? null;
    }
    return row;
  });
}

export function formatProgress(
  value: number | null,
  unit: string,
  compact = false,
): string {
  if (value === null) return "—";
  const options: Intl.NumberFormatOptions = {
    maximumFractionDigits: compact ? 1 : 2,
    ...(compact ? { notation: "compact" } : {}),
  };
  if (/^[A-Z]{3}$/.test(unit))
    Object.assign(options, {
      style: "currency",
      currency: unit,
      currencyDisplay: "narrowSymbol",
    });
  return (
    new Intl.NumberFormat("en-AU", options).format(value) +
    (unit === "%" ? "%" : "")
  );
}

export function progressMonth(date: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  }).format(new Date(`${date.slice(0, 7)}-01T12:00:00Z`));
}

export function latestProgress(series: ProgressSeries, end: string) {
  const points = series.points
    .filter((p) => p.periodEnd <= end)
    .sort((a, b) => a.date.localeCompare(b.date));
  const latest = points.at(-1);
  if (!latest) return { latest: null, change: null };
  const previous = points.at(-2);
  const adjacent =
    previous && progressMonths(latest.date, 2)[0] === previous.date;
  const change =
    adjacent &&
    !latest.partial &&
    !previous.partial &&
    latest.value !== null &&
    previous.value !== null
      ? latest.value - previous.value
      : null;
  return { latest, change };
}

export function canCompare(a: ProgressSeries, b: ProgressSeries): boolean {
  const keys = [a.metricKey, b.metricKey];
  const financial = keys.every((key) =>
    ["revenue", "monthlyCosts"].includes(key),
  );
  const events = keys.every((key) =>
    ["eventRegistrations", "eventAttendees"].includes(key),
  );
  if (
    a.id === b.id ||
    !(financial || events) ||
    a.provider !== b.provider ||
    a.timezone !== b.timezone
  )
    return false;
  if (financial && a.unit !== b.unit) return false;
  if (!a.scope || !b.scope) return false;
  if (
    ["account", "property", "event", "basis", "version"].some(
      (key) => a.scope![key] !== b.scope![key],
    )
  )
    return false;
  return (
    JSON.stringify(a.points.map((p) => [p.periodStart, p.periodEnd])) ===
    JSON.stringify(b.points.map((p) => [p.periodStart, p.periodEnd]))
  );
}

export function parseChartSelections(
  raw: unknown,
): ProgressChartSpec[] | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  const value = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(value) || value.length > 12)
    throw new Error("Choose up to 12 charts.");
  const ids = new Set<string>();
  return value.map((item) => {
    if (
      !item ||
      typeof item.id !== "string" ||
      item.id.length > 100 ||
      ids.has(item.id) ||
      !Array.isArray(item.seriesIds) ||
      item.seriesIds.length < 1 ||
      item.seriesIds.length > 3 ||
      item.seriesIds.some(
        (id: unknown) => typeof id !== "string" || id.length > 80,
      ) ||
      new Set(item.seriesIds).size !== item.seriesIds.length ||
      ![3, 6, 12, 24].includes(item.months) ||
      !["line", "bar"].includes(item.type)
    )
      throw new Error("Invalid chart selection. Choose your charts again.");
    ids.add(item.id);
    return {
      id: item.id,
      seriesIds: item.seriesIds,
      months: item.months,
      type: item.type,
      caption: String(item.caption || "").slice(0, 280),
    };
  });
}
