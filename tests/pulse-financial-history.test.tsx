import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import PulseFinancialHistory from "../app/components/vibe-raising/PulseFinancialHistory";
import PulseFinancialHistoryPicker from "../app/components/vibe-raising/PulseFinancialHistoryPicker";
import UpdateArticle from "../app/components/vibe-raising/UpdateArticle";
import { normalizeFinancialHistory, normalizeFinancialHistorySelection, parseFinancialHistorySelection, type FinancialHistory } from "../app/lib/pulse-financial-history";
import { normalizeMonthlyUpdate } from "../app/lib/vibe-raising";

const snapshot = (overrides: Partial<FinancialHistory> = {}): FinancialHistory => ({
  schemaVersion: 1,
  reportingMonth: "2026-08-01",
  rangeStart: "2026-03-01",
  rangeEnd: "2026-08-31",
  cutoff: "2026-08-31",
  capturedAt: "2026-10-21T12:00:00Z",
  shareAmounts: false,
  currency: null,
  points: [3, 4, 5, 6, 7, 8].map((month, index) => ({
    month: `2026-0${month}-01`, revenue: index === 2 ? null : index * 20, costs: index === 2 ? null : 30,
    partial: false,
    periodEnd: index === 2 ? null : new Date(Date.UTC(2026, month, 0)).toISOString().slice(0, 10),
  })),
  ...overrides,
});
const render = (history = snapshot()) => renderToStaticMarkup(<PulseFinancialHistory history={history} />);
const base = { id: "1", month: "August", isoMonth: "2026-08", year: 2026, date: "2026-08-31", summary: "Our August summary.", highlights: "First pilot.", challenges: "", learnings: "", next30Days: "", asks: "", metrics: { revenue: "AUD 43210.00" } };

describe("Pulse financial disclosure contract", () => {
  test("accepts six frozen calendar months independent of the later capture date", () => {
    const history = snapshot();
    expect(normalizeFinancialHistory(history)).toEqual(history);
    expect(normalizeMonthlyUpdate({ ...base, financialHistory: history })?.financialHistory).toEqual(history);
    expect(normalizeMonthlyUpdate(base)?.financialHistory).toBeNull();
    expect(normalizeMonthlyUpdate(base)?.financialHistorySelection).toBeNull();
  });
  test("fails closed for shifted, extra, nonfinite, mismatched and monetary relative payloads", () => {
    const history = snapshot();
    for (const raw of [
      { ...history, reportingMonth: "2026-10-01" },
      { ...history, rangeStart: "2026-04-01" },
      { ...history, rangeEnd: "2026-08-30" },
      { ...history, cutoff: "2026-09-01" },
      { ...history, capturedAt: "invalid" },
      { ...history, capturedAt: "2026-10-21T12:00:00" },
      { ...history, points: history.points.slice(1) },
      { ...history, points: [...history.points].reverse() },
      { ...history, currency: "AUD" },
      { ...history, points: history.points.map(point => ({ ...point, revenue: 43210 })) },
      { ...history, points: history.points.map(point => ({ ...point, revenue: Infinity })) },
      { ...history, points: history.points.map(point => ({ ...point, periodEnd: "2026-08-31" })) },
      { ...history, points: history.points.map(point => ({ ...point, periodEnd: null })) },
      { ...history, points: history.points.map(point => ({ ...point, partial: true })) },
      { ...history, shareAmounts: true, currency: null },
      { ...history, shareAmounts: true, currency: "XYZ" },
    ]) expect(normalizeFinancialHistory(raw)).toBeNull();
  });
  test("sharing requires explicit booleans and rejects hidden monetary browser inputs", () => {
    expect(parseFinancialHistorySelection('{"enabled":true,"shareAmounts":false}')).toEqual({ enabled: true, shareAmounts: false });
    expect(parseFinancialHistorySelection({ enabled: true, shareAmounts: true, refresh: true })).toEqual({ enabled: true, shareAmounts: true, refresh: true });
    expect(normalizeFinancialHistorySelection({ enabled: true, shareAmounts: true, refresh: true })).toEqual({ enabled: true, shareAmounts: true });
    for (const raw of [null, "no", { enabled: true }, { enabled: true, shareAmounts: "yes" }, { enabled: false, shareAmounts: true }, { enabled: true, shareAmounts: false, refresh: "yes" }, { enabled: false, shareAmounts: false, refresh: true }, { enabled: true, shareAmounts: false, revenue: 999 }]) expect(() => parseFinancialHistorySelection(raw)).toThrow();
  });
});

describe("historical Pulse financial view", () => {
  test("labels the reporting month, six-month cutoff and gaps without showing private amounts", () => {
    const html = render();
    expect(html).toContain("August 2026 · six-month snapshot");
    expect(html).toContain("This update: Aug 26");
    expect(html).toContain("Aug 26 · This update");
    expect(html).toContain("Mar 26");
    expect(html).not.toContain("Sep 26");
    expect(html).toContain("May 26");
    expect(html).toContain("No data");
    expect(html).toContain("Relative values share one scale across all six months; dollar amounts are hidden.");
    expect(html).toContain("Saved with this update · figures through 31 Aug 2026");
    expect(html).toContain("Snapshot captured 21 Oct 2026");
  });
  test("actual dollars require the disclosed amount mode", () => {
    const html = render(snapshot({ shareAmounts: true, currency: "AUD", points: snapshot().points.map(point => ({ ...point, revenue: point.revenue === null ? null : 43210 })) }));
    expect(html).toContain("$43,210.00");
    expect(html).toContain("Amounts in AUD.");
    expect(html).not.toContain("highest value = 100");
  });
  test("partial update month is explicit and has no growth badge", () => {
    const history = snapshot();
    history.cutoff = "2026-08-18";
    history.points[5] = { ...history.points[5], partial: true, periodEnd: history.cutoff };
    const html = render(history);
    expect(html).toContain("Partial August 2026 through 18 Aug 2026");
    expect(html).toContain("Figures are not comparable with a complete month.");
    expect(html).not.toContain("% growth");
    history.points[5] = { ...history.points[5], revenue: null, costs: null, periodEnd: null, partial: false };
    expect(render(history)).toContain("Partial August 2026 through 18 Aug 2026");
  });
  test("one observation gets a summary rather than a misleading line", () => {
    const history = snapshot();
    history.points = history.points.map((point, index) => index === 5 ? point : { ...point, revenue: null, costs: null, periodEnd: null });
    const html = render(history);
    expect(html).toContain("pulse-financial-history-single");
    expect(html).not.toContain('role="img"');
    expect(html).toContain("View financial chart data");
  });
  test("new chart follows summary and replaces private legacy financial context; older posts retain it", () => {
    const article = (history?: FinancialHistory) => renderToStaticMarkup(<MemoryRouter><UpdateArticle update={{ ...base, financialHistory: history }} companyName="Example" /></MemoryRouter>);
    const html = article(snapshot());
    expect(html.indexOf("Our August summary.")).toBeLessThan(html.indexOf("Revenue &amp; costs"));
    expect(html.indexOf("Revenue &amp; costs")).toBeLessThan(html.indexOf("First pilot."));
    expect(html).not.toContain("43210");
    expect(article()).toContain("AUD 43210.00");
    expect(article()).not.toContain("six-month snapshot");
  });
  test("sharing starts off, monetary mode is a separate opt-in and stale preview is withheld", () => {
    const picker = (selection?: any, history?: FinancialHistory, reportingMonth = "2026-08") => renderToStaticMarkup(<PulseFinancialHistoryPicker selection={selection} history={history} reportingMonth={reportingMonth} onChange={() => {}} />);
    expect(picker()).not.toContain("checked=");
    const relative = picker({ enabled: true, shareAmounts: false }, snapshot());
    expect(relative).toContain("Share actual revenue and cost amounts with this update’s audience");
    expect(relative.match(/checked=""/g)).toHaveLength(1);
    expect(relative).toContain("Dollar amounts stay hidden.");
    expect(picker({ enabled: true, shareAmounts: true }, snapshot())).toContain("prepare the exact chart for approval");
    expect(picker({ enabled: true, shareAmounts: false }, snapshot(), "2026-10")).not.toContain("six-month snapshot");
  });
  for (const shareAmounts of [false, true]) {
    test(`${shareAmounts ? "amount" : "relative"} history preview cannot include a monetary progress chart outside its approved window`, () => {
      const update: any = { ...base, financialHistory: snapshot({ shareAmounts, currency: shareAmounts ? "AUD" : null }), progressCharts: [{ schemaVersion: 1, cutoff: "2026-10-31", spec: { id: "old-cash", seriesIds: ["old-cash"], type: "line", months: 12, caption: "Private figures through October" }, series: [{ id: "old-cash", metricKey: "cashBalance", provider: "financial", unit: "AUD", label: "Private bank balance", points: [] }] }] };
      const html = renderToStaticMarkup(<MemoryRouter><UpdateArticle update={update} companyName="Example" /></MemoryRouter>);
      expect(html).toContain("six-month snapshot");
      expect(html).not.toContain("Private bank balance");
      expect(html).not.toContain("Private figures through October");
      expect(html).not.toContain("This period in numbers");
    });
  }
});
