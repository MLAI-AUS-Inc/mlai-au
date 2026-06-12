import type { VibeRaisingMetricHistoryPoint } from "~/types/vibe-raising";

// History points use "YYYY-MM-DD" (first of month) while updates carry
// isoMonth as either "YYYY-MM" or "YYYY-MM-DD"; compare on the year-month
// prefix so both formats line up.
export function monthKey(month?: string | null): string {
    return String(month || "").slice(0, 7);
}

// Points up to (and including) the update's own month, most recent
// `monthsBack` of them. Without a current month, just the trailing window.
export function windowPointsToMonth(
    points: VibeRaisingMetricHistoryPoint[],
    currentIsoMonth?: string | null,
    monthsBack = 12,
): VibeRaisingMetricHistoryPoint[] {
    const currentKey = monthKey(currentIsoMonth);
    const windowed = currentKey
        ? points.filter((point) => monthKey(point.month) <= currentKey)
        : points;
    return monthsBack > 0 ? windowed.slice(-monthsBack) : windowed;
}

export function formatMonthLabel(month: string): string {
    const [year, monthNumber] = month.split("-");
    const monthIndex = Number(monthNumber) - 1;
    const yearNumber = Number(year);
    if (!Number.isFinite(yearNumber) || monthIndex < 0 || monthIndex > 11) {
        return month;
    }
    const date = new Date(yearNumber, monthIndex, 1);
    return date.toLocaleDateString("en-AU", { month: "short", year: "2-digit" });
}

export function formatCompactNumber(value: number): string {
    const formatScaled = (scaled: number, suffix: string) => {
        const rounded = Math.round(scaled * 10) / 10;
        const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
        return `${text}${suffix}`;
    };
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) return formatScaled(value / 1_000_000_000, "b");
    if (abs >= 1_000_000) return formatScaled(value / 1_000_000, "m");
    if (abs >= 1_000) return formatScaled(value / 1_000, "k");
    return formatScaled(value, "");
}
