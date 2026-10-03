import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { aiPilotText, calculateAiPilot, EXAMPLE_AI_PILOT } from "../app/lib/ai-pilot-economics";
import AiPilotWorksheet from "../app/components/articles/AiPilotWorksheet";
import ArticleContent, { articleMeta, DATE_PUBLISHED, DESCRIPTION } from "../app/articles/content/featured/how-small-business-owners-can-get-started-with-ai-2026";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";

describe("SMB pilot economics", () => {
  test("distinguishes released time, maintenance, economic value and actual cash", () => {
    const r = calculateAiPilot(EXAMPLE_AI_PILOT);
    expect(r.releasedHours).toBe(12);
    expect(r.netHours).toBe(10);
    expect(r.capacityValue).toBe(450);
    expect(r.netCapacityValue).toBe(350);
    expect(r.monthlyCashChange).toBe(-100);
    expect(r.setupEconomicCost).toBe(870);
    expect(r.cashPaybackMonths).toBeNull();
  });
  test("calculates contingent cash payback only on genuinely avoidable spending", () => {
    const r = calculateAiPilot({ ...EXAMPLE_AI_PILOT, cashablePercent: 50 });
    expect(r.avoidableLabourSpend).toBe(225);
    expect(r.monthlyCashChange).toBe(125);
    expect(r.cashPaybackMonths).toBeCloseTo(4.8);
  });
  test("does not hide slower work, zero benefit or zero workload", () => {
    const slower = calculateAiPilot({ ...EXAMPLE_AI_PILOT, pilotMinutes: 25, cashablePercent: 100 });
    expect(slower.netHours).toBe(-7);
    expect(slower.netCapacityValue).toBe(-415);
    expect(slower.cashPaybackMonths).toBeNull();
    expect(calculateAiPilot({ ...EXAMPLE_AI_PILOT, monthlyTasks: 0 }).cashPaybackMonths).toBeNull();
    expect(calculateAiPilot({ ...EXAMPLE_AI_PILOT, hourlyCost: 0, monthlyCashCost: 0 }).cashPaybackMonths).toBeNull();
  });
  test("rejects invalid inputs instead of manufacturing useful-looking estimates", () => {
    for (const value of [-1, Number.NaN, Number.POSITIVE_INFINITY, 1e10]) expect(() => calculateAiPilot({ ...EXAMPLE_AI_PILOT, hourlyCost: value })).toThrow();
    expect(() => calculateAiPilot({ ...EXAMPLE_AI_PILOT, cashablePercent: 101 })).toThrow();
    expect(() => calculateAiPilot({ ...EXAMPLE_AI_PILOT, monthlyTasks: 1.5 })).toThrow();
    expect(() => calculateAiPilot({ ...EXAMPLE_AI_PILOT, pilotMinutes: undefined as unknown as number })).toThrow();
  });
  test("exports the actual assumptions, results, brief and limitations", () => {
    const text = aiPilotText(EXAMPLE_AI_PILOT, "Draft only; staff approve; stop on invented specifications.");
    expect(text).toContain("Draft only; staff approve");
    expect(text).toContain("monthlyCashChange: -100.00");
    expect(text).toContain("No positive cash payback");
    expect(text).toContain("not a measured result");
    expect(text).toContain("cashablePercent: 0");
    expect(text).toContain("EVALUATION SHEET");
    expect(text).toContain("Held-out evaluation case IDs");
    expect(text).toContain("Error severity and consequence");
    expect(text).toContain("Actual result: NOT RUN");
    expect(text).toContain("Accountable owner / reviewer");
    expect(text).toContain("including failures and manual fallbacks");
  });
});

describe("SMB article and worksheet rendering", () => {
  test("provides the same export as a copyable fallback without relying on download events", () => {
    const html = renderToStaticMarkup(<MemoryRouter><AiPilotWorksheet /></MemoryRouter>);
    expect(html).toContain("View or copy the worksheet text");
    expect(html).toContain("Worksheet export (read only)");
    expect(html).toContain("monthlyCashChange: -100.00");
    expect(html.toLowerCase()).toContain('readonly=""');
  });
  test("renders useful initial results and a real download action", () => {
    const html = renderToStaticMarkup(<MemoryRouter><AiPilotWorksheet /></MemoryRouter>);
    expect(html).toContain("10.00 hours");
    expect(html).toContain("No positive cash payback");
    expect(html).toContain("Download my worksheet (.txt)");
    expect(html).toContain("Tasks per month");
    expect(html).toContain("not customer results");
    expect(html).toContain("Use my worksheet in a Studio brief");
    expect(html).toContain('data-clarity-mask="true"');
    expect(html).not.toContain('href="#"');
  });
  test("aligns title, dates, description and the selected owner ICP/offer", () => {
    const slug = "featured/how-small-business-owners-can-get-started-with-ai-2026";
    const registry = ARTICLE_REGISTRY[slug];
    expect(registry.title).toBe(articleMeta.title);
    expect(registry.date).toBe(DATE_PUBLISHED);
    expect(registry.dateModified).toBe(articleMeta.dateModified);
    expect(registry.description).toBe(DESCRIPTION);
    const config = BASE_ARTICLE_SEO_CONFIG[`/articles/${slug}`].conversion!;
    expect(config.primary).toBe("studio-project");
    expect(config.primaryIcp).toBe("SMB");
    const html = renderToStaticMarkup(<MemoryRouter><ArticleContent /></MemoryRouter>);
    expect((html.match(/<h1\b/g) || []).length).toBe(1);
    expect(html).toContain('data-article-icp="SMB"');
    expect(html).toContain('href="/mlai-studio/start-project"');
    expect(html).toContain("Scope one AI workflow");
    expect(html).toContain("including failures");
    expect(html).not.toContain("Brief, factual overview");
    expect(html).not.toContain("Students &amp; Switchers");
    expect(html).not.toContain("ChatGPT Teams");
  });
});
