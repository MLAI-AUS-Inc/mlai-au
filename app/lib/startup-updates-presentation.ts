import type { VibeRaisingMonthlyUpdate, VibeRaisingFinancialPerformancePoint, VibeRaisingInputSourceSummary } from "~/types/vibe-raising";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** A calendar date in the reporting timezone, never the viewer's timezone. */
export function updateCalendarDate(value?: string | null, timezone = "UTC"): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value)) return null;
  const prefix = value.slice(0, 10);
  const dateOnly = new Date(`${prefix}T00:00:00Z`);
  if (!Number.isFinite(dateOnly.getTime()) || dateOnly.toISOString().slice(0, 10) !== prefix) return null;
  if (value.length === 10) return prefix;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return null;
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(parsed);
    const part = (type: string) => parts.find(item => item.type === type)?.value;
    return `${part("year")}-${part("month")}-${part("day")}`;
  } catch {
    return updateCalendarDate(value, "UTC");
  }
}

export function getUpdatePeriod(update: VibeRaisingMonthlyUpdate) {
  const timezone = update.reportingPeriod?.timezone || "UTC";
  const candidates = [update.weekEnd, update.reportingPeriod?.cutoff, update.date, update.publishedAt, update.reportingPeriod?.start]
    .map(value => updateCalendarDate(value, timezone)).filter((value): value is string => Boolean(value));
  const explicitMonth = updateCalendarDate(update.weekEnd, timezone)?.slice(0, 7) || update.isoMonth?.slice(0, 7);
  const namedMonth = MONTHS.findIndex(month => (update.monthName || update.month).toLowerCase().startsWith(month.toLowerCase()));
  const namedYear = update.year || Number(update.month.match(/\b(\d{4})\b/)?.[1]);
  const month = explicitMonth && /^\d{4}-(0[1-9]|1[0-2])$/.test(explicitMonth)
    ? explicitMonth
    : namedMonth >= 0 && namedYear
      ? `${namedYear}-${String(namedMonth + 1).padStart(2, "0")}`
      : candidates[0]?.slice(0, 7) || null;
  // Backfilled updates can all be published today. Keep their reporting month.
  const date = candidates.find(value => value.slice(0, 7) === month) || null;
  return { month, date, monthName: month ? MONTHS[Number(month.slice(5, 7)) - 1] : null, year: month?.slice(0, 4) || null };
}

export function ordinalDay(day: number) {
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] || "th";
  return `${day}${suffix}`;
}

export function sortStartupUpdates(updates: VibeRaisingMonthlyUpdate[]) {
  return [...updates].sort((a, b) => {
    const left = getUpdatePeriod(a);
    const right = getUpdatePeriod(b);
    return (right.date || right.month || "").localeCompare(left.date || left.month || "")
      || (b.publishedAt || b.date || "").localeCompare(a.publishedAt || a.date || "")
      || a.id.localeCompare(b.id);
  });
}

export function getUpdateTitles(updates: VibeRaisingMonthlyUpdate[]) {
  const counts = new Map<string, number>();
  const distinct = [...new Map(updates.map(update => [update.id, update])).values()];
  for (const update of distinct) {
    const month = getUpdatePeriod(update).month;
    if (month) counts.set(month, (counts.get(month) || 0) + 1);
  }
  return new Map(distinct.map(update => {
    const period = getUpdatePeriod(update);
    const day = period.date && period.month && (counts.get(period.month) || 0) > 1
      ? `${ordinalDay(Number(period.date.slice(8, 10)))} ` : "";
    return [update.id, period.monthName ? `${day}${period.monthName} Update` : "Update"];
  }));
}

export function getUpdateExcerpt(update: VibeRaisingMonthlyUpdate) {
  const text = update.highlights?.trim() || update.summary?.trim() || "";
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^[\s#*>-]+/gm, "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}

export interface UpdatesFinancialSeries {
  provider: "xero" | "stripe" | "bank_feed";
  sourceLabel: string;
  currency: string;
  basis: string | null;
  points: VibeRaisingFinancialPerformancePoint[];
  sourceUpdateId: string;
  partialCoverage: boolean;
}

/** Use one frozen source/currency, never sum Stripe receipts with Xero income. */
export function getUpdatesFinancialSeries(
  updates: VibeRaisingMonthlyUpdate[],
  sources: Pick<VibeRaisingInputSourceSummary, "key" | "status">[],
): UpdatesFinancialSeries | null {
  const connected = new Set(sources.filter(source => ["connected", "syncing"].includes(source.status)).map(source => source.key));
  for (const update of sortStartupUpdates(updates)) {
    const snapshot = update.financialSnapshot;
    if (!snapshot || update.evidenceStatus === "legacy_unverified" || !/^[A-Z]{3}$/.test(snapshot.currency)) continue;
    const incomeEvidence = update.metricEvidence?.revenue || update.metricEvidence?.income;
    const provider = incomeEvidence?.source_provider?.toLowerCase();
    if (provider !== "xero" && provider !== "stripe" && provider !== "bank_feed") continue;
    if (!connected.has(provider) || ["unavailable", "founder_asserted", "unknown"].includes(incomeEvidence?.quality || "")) continue;
    const period = getUpdatePeriod(update);
    const targetMonth = snapshot.targetMonth?.slice(0, 7);
    const observed = new Map(snapshot.performance.filter(point => {
      const month = point.month.slice(0, 7);
      return /^\d{4}-(0[1-9]|1[0-2])$/.test(month) && !point.isPartial
        && (!targetMonth || month <= targetMonth)
        && !(update.reportingPeriod?.is_partial && month === period.month);
    }).map(point => [point.month.slice(0, 7), {
      ...point, month: point.month.slice(0, 7),
      // A payments connector does not establish the startup's total costs.
      expenses: provider === "stripe" ? null : point.expenses,
    }]));
    const sorted = [...observed.values()].sort((a, b) => a.month.localeCompare(b.month));
    if (!sorted.some(point => point.income != null && point.income > 0)) continue;
    // Explicit gaps prevent a line from bridging missing months.
    const points: VibeRaisingFinancialPerformancePoint[] = [];
    const end = sorted.at(-1)!.month;
    let cursor = sorted[0].month;
    while (cursor <= end && points.length < 600) {
      points.push(observed.get(cursor) || { month: cursor, income: null, expenses: null, net: null });
      const next = new Date(`${cursor}-01T00:00:00Z`);
      next.setUTCMonth(next.getUTCMonth() + 1);
      cursor = next.toISOString().slice(0, 7);
    }
    return {
      provider, sourceLabel: provider === "xero" ? "Xero" : provider === "stripe" ? "Stripe" : "Bank feed",
      currency: snapshot.currency, basis: incomeEvidence?.basis || null, points, sourceUpdateId: update.id,
      partialCoverage: incomeEvidence?.quality === "partial",
    };
  }
  return null;
}
