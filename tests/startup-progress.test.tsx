import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import {
  canCompare,
  chartSeries,
  latestProgress,
  metricChart,
  parseChartSelections,
  progressMonths,
  progressRows,
  recommendedCharts,
  type ProgressSeries,
} from "../app/lib/startup-progress";
import { parseMetricCsv } from "../app/components/vibe-raising/ProgressCustomMetricForm";
import UpdateArticle from "../app/components/vibe-raising/UpdateArticle";
import ProgressDashboard from "../app/components/vibe-raising/ProgressDashboard";
import { normalizeMonthlyUpdate } from "../app/lib/vibe-raising";

const series = (override: Partial<ProgressSeries> = {}): ProgressSeries => ({
  id: "pilots",
  metricKey: "custom.pilots",
  label: "Active pilots",
  category: "customers",
  unit: "pilots",
  aggregation: "stock",
  definition: "Companies in an agreed pilot at month end.",
  definitionVersion: 1,
  provider: "founder_progress",
  source: "Founder provided",
  scope: { account: "a", version: 1 },
  timezone: "Australia/Melbourne",
  readOnly: false,
  readiness: "ready",
  lastSyncedAt: null,
  limitations: [],
  points: [
    {
      date: "2026-07-01",
      periodStart: "2026-07-01",
      periodEnd: "2026-07-31",
      value: 0,
      partial: false,
      status: "complete",
      observedAt: null,
    },
    {
      date: "2026-08-01",
      periodStart: "2026-08-01",
      periodEnd: "2026-08-31",
      value: 3,
      partial: false,
      status: "complete",
      observedAt: null,
    },
  ],
  ...override,
});
const base = {
  id: "42",
  month: "September",
  year: 2026,
  date: "2026-09-18",
  summary: "We shipped.",
  highlights: "First pilot.\nSecond pilot.",
  challenges: "",
  learnings: "",
  next30Days: "",
  asks: "",
  metrics: { revenue: "AUD 50000" },
};
const article = (update: any) =>
  renderToStaticMarkup(
    <MemoryRouter>
      <UpdateArticle update={update} companyName="Example" />
    </MemoryRouter>,
  );

describe("Progress semantics", () => {
  test("zero is a value; missing months remain gaps across a year boundary", () => {
    expect(progressMonths("2026-02-18", 3)).toEqual([
      "2025-12-01",
      "2026-01-01",
      "2026-02-01",
    ]);
    const rows = progressRows([series()], 3, "2026-09-18");
    expect(rows.map((row) => row.pilots)).toEqual([0, 3, null]);
  });
  test("does not invent comparisons for partial periods, gaps or zero baselines", () => {
    expect(latestProgress(series(), "2026-09-18").change).toBe(3);
    const partial = series();
    partial.points[1] = { ...partial.points[1], partial: true };
    expect(latestProgress(partial, "2026-09-18").change).toBeNull();
    const gap = series();
    gap.points[0] = { ...gap.points[0], date: "2026-06-01" };
    expect(latestProgress(gap, "2026-09-18").change).toBeNull();
  });
  test("combined charts require a supported meaning, same currency and account", () => {
    const income = series({
      id: "income",
      metricKey: "revenue",
      provider: "xero",
      unit: "AUD",
    });
    const costs = series({
      id: "costs",
      metricKey: "monthlyCosts",
      provider: "xero",
      unit: "AUD",
    });
    expect(canCompare(income, costs)).toBe(true);
    expect(canCompare(income, { ...costs, unit: "USD" })).toBe(false);
    expect(
      canCompare(income, { ...costs, scope: { account: "other", version: 1 } }),
    ).toBe(false);
    expect(canCompare(income, series())).toBe(false);
  });
  test("chart choices distinguish legacy omission from deliberately showing none", () => {
    expect(parseChartSelections(null)).toBeUndefined();
    expect(parseChartSelections("[]")).toEqual([]);
    expect(() =>
      parseChartSelections([metricChart(series()), metricChart(series())]),
    ).toThrow();
    expect(chartSeries(metricChart(series()), [series()])[0].id).toBe("pilots");
  });
  test("revenue defaults do not double-count Xero and Stripe or depend on direction", () => {
    const xero = series({
      id: "income",
      metricKey: "revenue",
      provider: "xero",
    });
    const stripe = series({
      id: "sales",
      metricKey: "revenue",
      provider: "financial",
    });
    expect(
      recommendedCharts([xero, stripe, series()]).map((chart) => chart.id),
    ).toEqual(["income", "pilots"]);
  });
  test("CSV accepts finite monthly measurements and rejects duplicate and malformed periods", () => {
    expect(parseMetricCsv("month,value\n2026-07,0\n2026-08,3")[0]).toEqual({
      date: "2026-07-01",
      value: "0",
    });
    for (const text of [
      "2026-13,2",
      "2026-01,NaN",
      "2026-01,1\n2026-01,2",
      "2026-01,1,000",
      "2026-01,",
    ])
      expect(() => parseMetricCsv(text)).toThrow();
  });
});

describe("Progress publication and view", () => {
  test("normalization preserves explicit empty charts and frozen snapshots", () => {
    expect(
      normalizeMonthlyUpdate({ ...base, progressCharts: [] })?.progressCharts,
    ).toEqual([]);
    expect(normalizeMonthlyUpdate(base)?.progressCharts).toBeNull();
    const frozen = [
      {
        schemaVersion: 1,
        spec: metricChart(series()),
        series: [series()],
        cutoff: "2026-09-18",
      },
    ];
    expect(
      normalizeMonthlyUpdate({ ...base, progressCharts: frozen })
        ?.progressCharts,
    ).toEqual(frozen);
  });
  test("zero selected charts suppress legacy numbers while preserving individual points", () => {
    const html = article({ ...base, progressCharts: [] });
    expect(html).not.toContain("50,000");
    expect(html).not.toContain("This period in numbers");
    expect(html).toContain("First pilot.");
    expect(html).toContain("Second pilot.");
  });
  test("published charts use only the exact selected frozen series", () => {
    const html = article({
      ...base,
      progressCharts: [
        {
          schemaVersion: 1,
          spec: metricChart(series()),
          series: [series()],
          cutoff: "2026-09-18",
        },
      ],
    });
    expect(html).toContain("Active pilots");
    expect(html).toContain("Founder provided");
    expect(html).toContain("View chart data");
    expect(html).not.toContain("AUD 50000");
  });
  test("pre-revenue dashboard has useful empty state and no invented financial chart", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <ProgressDashboard
          companyName="Early startup"
          progress={{
            schemaVersion: 1,
            companyId: "one",
            timezone: "UTC",
            version: 0,
            range: 6,
            asOf: "2026-09-18",
            charts: null,
            series: [],
            definitions: [],
            googleAnalytics: { properties: [], events: {}, mappings: {} },
          }}
          drafts={[]}
          busy={false}
          error={null}
          onSave={() => {}}
        />
      </MemoryRouter>,
    );
    expect(html).toContain("Add your first metric");
    expect(html).toContain("Private to your startup");
    expect(html).not.toContain("Income &amp; costs");
  });
});
