import { progressMonths } from "./startup-progress";

const DISCLOSED_CURRENCIES = new Set(["AUD", "USD", "NZD", "CAD", "GBP", "EUR", "JPY", "CNY", "HKD", "SGD", "CHF", "INR", "KRW", "SEK", "NOK", "DKK", "ZAR", "BRL", "MXN"]);

export interface FinancialHistorySelection {
  enabled: boolean;
  shareAmounts: boolean;
  /** A deliberate request to capture fresh source figures for a new revision. */
  refresh?: boolean;
}

export interface FinancialHistoryPoint {
  month: string;
  revenue: number | null;
  costs: number | null;
  partial: boolean;
  periodEnd: string | null;
}

/** The server-built, reviewed disclosure, never the live dashboard dataset. */
export interface FinancialHistory {
  schemaVersion: 1;
  reportingMonth: string;
  rangeStart: string;
  rangeEnd: string;
  cutoff: string;
  capturedAt: string;
  shareAmounts: boolean;
  currency: string | null;
  points: FinancialHistoryPoint[];
}

function calendarDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(new Date(`${value}T12:00:00Z`).getTime())
    && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
}

export function normalizeFinancialHistorySelection(raw: unknown): FinancialHistorySelection | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const value = raw as Record<string, unknown>;
  if (typeof value.enabled !== "boolean" || typeof value.shareAmounts !== "boolean") return null;
  if (!value.enabled && value.shareAmounts) return null;
  return { enabled: value.enabled, shareAmounts: value.shareAmounts };
}

export function parseFinancialHistorySelection(raw: unknown): FinancialHistorySelection {
  let value: unknown = raw;
  if (typeof raw === "string") {
    try { value = JSON.parse(raw); }
    catch { throw new Error("Check your financial chart sharing choice."); }
  }
  const selection = normalizeFinancialHistorySelection(value);
  if (!selection) throw new Error("Check your financial chart sharing choice.");
  if (Object.keys(value as object).some(key => !["enabled", "shareAmounts", "refresh"].includes(key))) throw new Error("Check your financial chart sharing choice.");
  const refresh = (value as Record<string, unknown>).refresh;
  if (refresh !== undefined && typeof refresh !== "boolean") throw new Error("Check your financial chart refresh choice.");
  if (!selection.enabled && refresh === true) throw new Error("Include the financial snapshot before refreshing it.");
  return { ...selection, ...(refresh === true ? { refresh: true } : {}) };
}

/** Fail closed on malformed history; an old progress chart cannot become a disclosure. */
export function normalizeFinancialHistory(raw: unknown): FinancialHistory | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const value = raw as Record<string, unknown>;
  if (value.schemaVersion !== 1 || typeof value.shareAmounts !== "boolean"
    || !calendarDate(value.reportingMonth) || !value.reportingMonth.endsWith("-01")
    || !calendarDate(value.rangeStart) || !calendarDate(value.rangeEnd) || !calendarDate(value.cutoff)
    || typeof value.capturedAt !== "string" || !calendarDate(value.capturedAt.slice(0, 10)) || !/(?:Z|[+-]\d{2}:\d{2})$/.test(value.capturedAt) || !Number.isFinite(Date.parse(value.capturedAt))
    || !Array.isArray(value.points) || value.points.length !== 6) return null;
  const months = progressMonths(value.reportingMonth, 6);
  const monthEnd = new Date(Date.UTC(Number(value.reportingMonth.slice(0, 4)), Number(value.reportingMonth.slice(5, 7)), 0)).toISOString().slice(0, 10);
  if (value.rangeStart !== months[0] || value.rangeEnd !== monthEnd || value.cutoff < value.reportingMonth || value.cutoff > value.rangeEnd) return null;
  if (value.shareAmounts ? typeof value.currency !== "string" || !DISCLOSED_CURRENCIES.has(value.currency) : value.currency !== null) return null;
  const points: FinancialHistoryPoint[] = [];
  for (const [index, rawPoint] of value.points.entries()) {
    if (!rawPoint || typeof rawPoint !== "object" || Array.isArray(rawPoint)) return null;
    const point = rawPoint as Record<string, unknown>;
    if (point.month !== months[index] || typeof point.partial !== "boolean"
      || !(point.periodEnd === null || calendarDate(point.periodEnd))
      || (typeof point.periodEnd === "string" && (point.periodEnd < months[index] || point.periodEnd.slice(0, 7) !== months[index].slice(0, 7) || point.periodEnd > value.cutoff))) return null;
    for (const key of ["revenue", "costs"] as const) {
      if (point[key] !== null && (typeof point[key] !== "number" || !Number.isFinite(point[key]) || (!value.shareAmounts && Math.abs(point[key] as number) > 100))) return null;
    }
    const available = point.revenue !== null || point.costs !== null;
    if (available ? point.periodEnd === null : point.periodEnd !== null) return null;
    const pointMonthEnd = new Date(Date.UTC(Number(months[index].slice(0, 4)), Number(months[index].slice(5, 7)), 0)).toISOString().slice(0, 10);
    if (point.partial !== Boolean(point.periodEnd && point.periodEnd < pointMonthEnd)) return null;
    points.push({ month: point.month as string, revenue: point.revenue as number | null, costs: point.costs as number | null, partial: point.partial, periodEnd: point.periodEnd as string | null });
  }
  return { schemaVersion: 1, reportingMonth: value.reportingMonth, rangeStart: value.rangeStart, rangeEnd: value.rangeEnd, cutoff: value.cutoff, capturedAt: value.capturedAt, shareAmounts: value.shareAmounts, currency: value.currency as string | null, points };
}

export function financialHistoryDate(date: string): string {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export function financialHistoryMonth(date: string): string {
  return new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date.slice(0, 7)}-01T12:00:00Z`));
}
