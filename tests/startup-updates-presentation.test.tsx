import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import type { VibeRaisingMonthlyUpdate } from "../app/types/vibe-raising";
import { getUpdateTitles, getUpdatePeriod, sortStartupUpdates, updateCalendarDate, ordinalDay, getUpdatesFinancialSeries } from "../app/lib/startup-updates-presentation";
import { normalizeMonthlyUpdate } from "../app/lib/vibe-raising";
import StartupUpdatesPage from "../app/components/vibe-raising/StartupUpdatesPage";

export function fixtureUpdate(id: string, month = "2026-06", extras: Partial<VibeRaisingMonthlyUpdate> = {}): VibeRaisingMonthlyUpdate {
  return { id, isoMonth: month, month, date: `${month}-14`, metrics: {}, highlights: "A product milestone.",
    challenges: "", asks: "", learnings: "", next30Days: "", ...extras };
}

describe("update date titles", () => {
  it("uses the month alone for a single update, regardless of cadence", () => {
    const update = fixtureUpdate("one", "2026-06", { weekEnd: "2026-06-14" });
    expect(getUpdateTitles([update]).get("one")).toBe("June Update");
  });
  it("dates every update when more than one shares a month", () => {
    const updates = [fixtureUpdate("one"), fixtureUpdate("two", "2026-06", { date: "2026-06-21" })];
    expect([...getUpdateTitles(updates).values()]).toEqual(["14th June Update", "21st June Update"]);
  });
  it("counts by both year and month, not by month name", () => {
    expect([...getUpdateTitles([fixtureUpdate("one", "2025-06"), fixtureUpdate("two")]).values()]).toEqual(["June Update", "June Update"]);
  });
  it("uses the reporting month for retrospectively published updates", () => {
    const updates = ["2026-06", "2026-08", "2026-07"].map(month => fixtureUpdate(month, month, { date: "2026-09-11T01:02:00Z", publishedAt: "2026-09-11T01:02:00Z" }));
    expect(sortStartupUpdates(updates).map(update => update.id)).toEqual(["2026-08", "2026-07", "2026-06"]);
    expect(getUpdateTitles(updates).get("2026-06")).toBe("June Update");
  });
  it("uses reporting cutoffs, not later edit dates, to distinguish editions", () => {
    const update = fixtureUpdate("one", "2026-06", { date: "2026-09-11", reportingPeriod: { cutoff: "2026-06-13T14:30:00Z", timezone: "Australia/Melbourne" } });
    expect(getUpdateTitles([update, fixtureUpdate("two", "2026-06", { date: "2026-06-21" })]).get("one")).toBe("14th June Update");
  });
  it("groups a week crossing a month boundary by its end date", () => {
    const update = fixtureUpdate("weekly", "2026-06", { weekStart: "2026-06-29", weekEnd: "2026-07-05" });
    expect(getUpdateTitles([update, fixtureUpdate("other", "2026-07", { date: "2026-07-12" })]).get("weekly")).toBe("5th July Update");
  });
  it("handles ordinal exceptions", () => {
    expect([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 31].map(ordinalDay)).toEqual(["1st", "2nd", "3rd", "4th", "11th", "12th", "13th", "21st", "22nd", "23rd", "31st"]);
  });
  it("never invents today's date for an undated record", () => {
    const update = normalizeMonthlyUpdate({ id: 1, month: "June 2026" })!;
    expect(update.date).toBe("");
    expect(getUpdatePeriod(update)).toMatchObject({ month: "2026-06", date: null });
  });
  it("rejects invalid dates and keeps date-only values timezone independent", () => {
    expect(updateCalendarDate("2026-02-30")).toBeNull();
    expect(updateCalendarDate("garbage")).toBeNull();
    expect(updateCalendarDate("2026-06-14", "America/Los_Angeles")).toBe("2026-06-14");
    expect(updateCalendarDate("2026-06-14T01:00:00Z", "Invalid/Zone")).toBe("2026-06-14");
  });
  it("does not count the same record twice", () => {
    const update = fixtureUpdate("one");
    expect(getUpdateTitles([update, update]).get("one")).toBe("June Update");
  });
});

const xero = [{ key: "xero" as const, status: "connected" as const }];
export function financialUpdate(extras: Partial<VibeRaisingMonthlyUpdate> = {}) {
  return fixtureUpdate("finance", "2026-08", {
    evidenceStatus: "snapshot", metricEvidence: { revenue: { source_provider: "xero", basis: "Accrual", quality: "verified" } },
    financialSnapshot: { schemaVersion: "1", currency: "AUD", targetMonth: "2026-08-01",
      performance: [
        { month: "2026-06-01", income: 25384.57, expenses: 42233.81, net: -16849.24 },
        { month: "2026-07-01", income: 34808.68, expenses: 35583.07, net: -774.39 },
        { month: "2026-08-01", income: 51793, expenses: 19686.55, net: 32106.45 },
      ], revenueMix: [], overhead: [], eventContribution: [] },
    ...extras,
  });
}

describe("optional financial context", () => {
  it("requires a connected source and positive recorded income", () => {
    const update = financialUpdate();
    expect(getUpdatesFinancialSeries([update], [])).toBeNull();
    expect(getUpdatesFinancialSeries([update], [{ key: "xero", status: "not_connected" }])).toBeNull();
    update.financialSnapshot!.performance.forEach(point => { point.income = 0; });
    expect(getUpdatesFinancialSeries([update], xero)).toBeNull();
  });
  it("keeps current charts out of unverified or founder-entered data", () => {
    expect(getUpdatesFinancialSeries([financialUpdate({ evidenceStatus: "legacy_unverified" })], xero)).toBeNull();
    expect(getUpdatesFinancialSeries([financialUpdate({ metricEvidence: { revenue: { source_provider: "xero", quality: "founder_asserted" } } })], xero)).toBeNull();
  });
  it("excludes partial months, including a partial report without a per-point flag", () => {
    const update = financialUpdate({ reportingPeriod: { is_partial: true, start: "2026-08-01", cutoff: "2026-08-14" } });
    expect(getUpdatesFinancialSeries([update], xero)?.points.map(point => point.month)).toEqual(["2026-06", "2026-07"]);
  });
  it("preserves missing months and actual zero without connecting the gap", () => {
    const update = financialUpdate();
    update.financialSnapshot!.performance.splice(1, 1);
    update.financialSnapshot!.performance[0].expenses = 0;
    const series = getUpdatesFinancialSeries([update], xero)!;
    expect(series.points[1]).toMatchObject({ month: "2026-07", income: null, expenses: null });
    expect(series.points[0].expenses).toBe(0);
  });
  it("uses one snapshot and currency rather than summing repeated history", () => {
    const older = financialUpdate({ id: "older", isoMonth: "2026-07" });
    const latest = financialUpdate();
    latest.financialSnapshot!.currency = "EUR";
    const series = getUpdatesFinancialSeries([older, latest], xero)!;
    expect(series.currency).toBe("EUR");
    expect(series.points.at(-1)?.income).toBe(51793);
    expect(series.points.length).toBe(3);
  });
  it("never infers costs from Stripe payment history", () => {
    const update = financialUpdate({ metricEvidence: { revenue: { source_provider: "stripe", quality: "partial" } } });
    const series = getUpdatesFinancialSeries([update], [{ key: "stripe", status: "connected" }])!;
    expect(series.provider).toBe("stripe");
    expect(series.partialCoverage).toBe(true);
    expect(series.points.every(point => point.expenses === null)).toBe(true);
  });
});

function renderPage(updates: VibeRaisingMonthlyUpdate[], path = "/founder-tools/updates", finance = false) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}>
    <StartupUpdatesPage user={{ companyName: "MLAI", role: "founder" }} updates={updates}
      financialSeries={finance ? getUpdatesFinancialSeries(updates, xero) : null} />
  </MemoryRouter>);
}

describe("editorial update browsing", () => {
  const updates = [
    fixtureUpdate("latest", "2026-09"), financialUpdate(),
    fixtureUpdate("july", "2026-07"), fixtureUpdate("june", "2026-06"),
    fixtureUpdate("june-earlier", "2026-06", { date: "2026-06-07" }),
  ];
  it("features one update, shows three alongside, and offers a real archive link", () => {
    const html = renderPage(updates);
    expect(html).toContain("MLAI Updates");
    expect(html.match(/<article /g)?.length).toBe(4);
    expect(html).toContain("14th June Update");
    expect(html).not.toContain("7th June Update");
    expect(html).toContain('href="/founder-tools/updates?view=all#all-updates"');
    for (const excluded of ["Previous editions", ">Monthly<", ">Weekly<", "Business health", "Needs confirmation", "Subscribe"]) expect(html).not.toContain(excluded);
  });
  it("shows every update in the archive and preserves date titles", () => {
    const html = renderPage(updates, "/founder-tools/updates?view=all");
    expect(html.match(/<article /g)?.length).toBe(5);
    expect(html).toContain("7th June Update");
    expect(html).toContain("14th June Update");
  });
  it("omits the whole financial module when it is unavailable", () => {
    const html = renderPage(updates);
    expect(html).not.toContain("Income &amp; costs");
    expect(html).not.toContain("View chart data");
    expect(html).toContain("September Update");
  });
  it("provides source-labelled figures and accessible chart data when available", () => {
    const html = renderPage(updates, "/founder-tools/updates", true);
    expect(html).toContain("Income &amp; costs");
    expect(html).toContain("Xero");
    expect(html).toContain("View chart data");
    expect(html).toContain("51,793");
    expect(html).not.toContain("Accounting surplus");
  });
  it("offers a first-update action for an empty collection", () => {
    expect(renderPage([])).toContain("Create your first update");
  });
});
