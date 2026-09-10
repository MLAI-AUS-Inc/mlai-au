import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { formatMetricDisplayValue, hasDisplayableMetricValue, metricOptionsForValues } from "../app/lib/vibe-raising-metrics";
import VRPreviewUpdateCard from "../app/components/vibe-raising/VRPreviewUpdateCard";

describe("monthly update evidence display", () => {
  it("preserves currency, units, and accounting notation", () => {
    expect(formatMetricDisplayValue("AUD 1,250.00")).toBe("AUD 1,250.00");
    expect(formatMetricDisplayValue("18 months")).toBe("18 months");
    expect(formatMetricDisplayValue("(EUR 50)")).toBe("(EUR 50)");
  });
  it("does not turn missing evidence into zero", () => {
    expect(hasDisplayableMetricValue(null)).toBe(false);
    expect(hasDisplayableMetricValue(undefined)).toBe(false);
    expect(hasDisplayableMetricValue("0")).toBe(true);
  });
  it("keeps custom startup metrics available", () => {
    expect(metricOptionsForValues({ custom_active_teams: "12" }).find(item => item.key === "custom_active_teams")?.label).toBe("active teams");
  });
  it("renders all reviewed highlights and custom metrics", () => {
    const update = { id: "1", date: "2026-01-31", month: "January 2026", metrics: { custom_active_teams: "12" },
      highlights: "First verified milestone\nSecond verified milestone\nThird verified milestone", challenges: "", asks: "", learnings: "", next30Days: "",
      displayConfig: { snippetMetricKeys: ["custom_active_teams"], fullMetricKeys: ["custom_active_teams"] } };
    const html = renderToStaticMarkup(<MemoryRouter><VRPreviewUpdateCard update={update} user={{ companyName: "Example", founderName: "Founder", domain: "", location: "" } as any} /></MemoryRouter>);
    expect(html).toContain("Third verified milestone");
    expect(html).toContain("active teams");
    expect(html).toContain("12");
  });
});

describe("financial update review", () => {
  const snapshot = {
    schemaVersion: "1", targetMonth: "2026-09-01", asOfDate: "2026-09-10", currency: "EUR",
    performance: [{ month: "2026-09-01", income: null, expenses: 0, net: null, isPartial: true }],
    revenueMix: [], eventContribution: [], overhead: [],
    dataQuality: { warnings: ["Revenue source unavailable"] },
  };
  it("shows unknown values, genuine zero, the cutoff and source limitations", () => {
    const html = renderToStaticMarkup(<FinancialChartsSection snapshot={snapshot} />);
    expect(html).toContain("revenue Unavailable");
    expect(html).toContain("expenses €0");
    expect(html).toContain("net Unavailable");
    expect(html).toContain("Partial month through");
    expect(html).toContain("Revenue source unavailable");
  });
  it("keeps all narrative sections and custom metrics alongside charts", () => {
    const update = { id: "1", date: "2026-09-10", month: "September 2026", metrics: { custom_active_teams: "12" },
      summary: "Evidence from an uploaded document", highlights: "Milestone beyond the old source cap",
      challenges: "A verified setback", asks: "A specific request", learnings: "A lesson", next30Days: "A next step",
      financialSnapshot: snapshot };
    const html = renderToStaticMarkup(<MemoryRouter><VRPreviewUpdateCard update={update} user={{ companyName: "Example", founderName: "Founder", domain: "", location: "Germany" } as any} /></MemoryRouter>);
    for (const text of [update.summary, update.highlights, update.challenges, update.asks, update.learnings, update.next30Days, "active teams", "12", "Germany"]) expect(html).toContain(text);
  });
  it("does not graft live metric history onto an old card", () => {
    const update = { id: "1", date: "2026-08-31", month: "August 2026", isoMonth: "2026-08", metrics: { revenue: "EUR 10" }, highlights: "Verified", metricHistory: {} };
    const render = (value: number) => renderToStaticMarkup(<MemoryRouter><VRUpdateSnippetCard update={update} user={{ location: "" }} metricHistory={{ revenue: { metricKey: "revenue", label: "Revenue", points: [{ month: "2026-08-01", value, valueText: String(value) }] } }} /></MemoryRouter>);
    expect(render(10)).toBe(render(999999));
  });
});

import FinancialChartsSection from "../app/components/vibe-raising/FinancialChartsSection";
import VRUpdateSnippetCard from "../app/components/vibe-raising/VRUpdateSnippetCard";

import { normalizeFinancialSnapshot } from "../app/lib/vibe-raising";
import ReportingEvidenceNotice from "../app/components/vibe-raising/ReportingEvidenceNotice";

it("normalizes unknown financial values without converting null or blanks to zero", () => {
  const normalized = normalizeFinancialSnapshot({ currency: "EUR", performance: [
    { month: "2026-09-01", income: null, expenses: "", net: "not available" },
    { month: "2026-08-01", income: "0", expenses: 0, net: null },
  ] });
  expect(normalized?.performance[0]).toMatchObject({ income: null, expenses: null, net: null });
  expect(normalized?.performance[1]).toMatchObject({ income: 0, expenses: 0, net: null });
});

it("identifies month-to-date and retrospective source limitations without financial charts", () => {
  const html = renderToStaticMarkup(<ReportingEvidenceNotice period={{ start: "2026-09-01", cutoff: "2026-09-10T10:00:00+02:00", timezone: "Europe/Berlin", is_partial: true }} warnings={["Document edited after the reporting period; historical contents are unavailable."]} />);
  expect(html).toContain("Month to date · incomplete period through 2026-09-10");
  expect(html).toContain("Europe/Berlin");
  expect(html).toContain("historical contents are unavailable");
});

it("displays the cutoff in the startup timezone at a UTC date boundary", () => {
  const html = renderToStaticMarkup(<ReportingEvidenceNotice period={{ cutoff: "2026-09-09T14:30:00Z", timezone: "Australia/Melbourne", is_partial: true }} />);
  expect(html).toContain("through 2026-09-10");
});
