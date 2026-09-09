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
