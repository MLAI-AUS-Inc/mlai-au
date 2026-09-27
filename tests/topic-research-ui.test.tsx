import { describe, expect, test } from "bun:test";
import backendFixtures from "./fixtures/topic-research-api.json";
import { renderToStaticMarkup } from "react-dom/server";

import TopicResearchDetails from "../app/components/TopicResearchDetails";
import TopicResearchRow from "../app/components/TopicResearchRow";
import { TopicDecisionCard } from "../app/components/TopicDecisionCard";
import { normalizeTopicCandidate } from "../app/lib/vibe-marketing";
import { topicResearchMetrics } from "../app/lib/topic-research-metrics";

const measured = normalizeTopicCandidate({
  id: "research-1", keyword: "ai search", title: "AI search for Australian teams",
  difficulty: 0, difficulty_source: "dataforseo_bulk", difficulty_status: "available",
  volume: 1200, trend_source: "dataforseo_labs", trend_basis: "search_volume", trend_is_estimated: false,
  monthly_searches: [600, 650, 700, 1300, 1600, 1900].map((search_volume, index) => ({ year: 2026, month: index + 3, search_volume })),
  trend_status: "breakout", trend_percent: 146.15, trend_summary: "Demand has increased.", trend_period_label: "Mar–Aug 2026",
});

describe("topic research payload and disclosure", () => {
  test("normalizes dated provider history and valid zero difficulty without losing provenance", () => {
    expect(measured.difficulty).toBe(0);
    expect(measured.difficultySource).toBe("dataforseo_bulk");
    expect(measured.monthlySearches).toHaveLength(6);
    expect(measured.trendIsEstimated).toBe(false);
    expect(measured.trendStatus).toBe("breakout");
    expect(measured.trendPercent).toBe(146.15);
    expect(measured.trendDescription).toBe("Demand has increased.");
    expect(topicResearchMetrics(measured).difficulty.score).toBe(0);
    expect(topicResearchMetrics(measured).history.reportedCount).toBe(6);
  });

  test("keeps camel-case stored measurements and source metadata", () => {
    const normalized = normalizeTopicCandidate({ ...measured, monthlySearchesSource: "dataforseo_labs", monthlySearchesBasis: "search_volume", difficultyReason: "Provider coverage unavailable" });
    expect(normalized.monthlySearches).toEqual(measured.monthlySearches);
    expect(normalized.monthlySearchesSource).toBe("dataforseo_labs");
    expect(normalized.difficultyReason).toBe("Provider coverage unavailable");
  });

  test("renders a compact collapsed row with separate disclosure and article actions", () => {
    const html = renderToStaticMarkup(<TopicResearchRow topic={measured} selected onSelect={() => {}} onContinue={() => {}} onDecline={() => {}} />);
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("Show topic research");
    expect(html).toContain("Difficulty 0/100");
    expect(html).toContain("Continue");
    expect(html).not.toContain("Search trend");
    expect(html).not.toContain('role="button"');
    expect(html).not.toContain("Difficulty pending");
  });

  test("details expose dated observations, units, source, trend and difficulty", () => {
    const html = renderToStaticMarkup(<TopicResearchDetails candidate={measured} />);
    expect(html).toContain("Estimated monthly searches");
    expect(html).toContain("DataForSEO Labs");
    expect(html).toContain("Mar 2026");
    expect(html).toContain("Aug 2026");
    expect(html).toContain("Breakout");
    expect(html).toContain('aria-valuenow="0"');
    expect(html).toContain("View exact values");
    expect(html).toContain('scope="col"');
  });

  test("missing metrics render a reason, never a fabricated line or placeholder score", () => {
    const unavailable = normalizeTopicCandidate({ id: "missing", keyword: "niche", difficulty: 50, difficulty_source: "default", difficulty_status: "error", difficulty_reason: "The lookup failed. Research this topic again to retry." });
    const html = renderToStaticMarkup(<TopicResearchDetails candidate={unavailable} />);
    expect(html).toContain("Search history unavailable");
    expect(html).toContain("Could not load");
    expect(html).toContain("The lookup failed");
    expect(html).not.toContain("<polyline");
    expect(html).not.toContain('role="meter"');
  });

  test("retains a lone real observation without inventing a trend line", () => {
    const html = renderToStaticMarkup(<TopicResearchDetails candidate={{ ...measured, monthlySearches: [{ year: 2026, month: 8, search_volume: 123 }] }} />);
    expect(html).toContain("Not enough history to plot a trend");
    expect(html).toContain("123");
    expect(html).not.toContain("<polyline");
  });

  test("custom-research picker shares the same measured detail component", () => {
    const html = renderToStaticMarkup(<TopicDecisionCard candidate={measured} checked expanded onChange={() => {}} onToggleDetails={() => {}} />);
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain("Estimated monthly searches");
    expect(html).toContain('type="radio"');
    expect(html).not.toContain("Estimated shape");
  });
});


test("actual backend extraction payloads reach the UI without losing metrics", () => {
  const metrics = backendFixtures.map((raw) => topicResearchMetrics(normalizeTopicCandidate(raw)));
  expect(metrics[0].difficulty.score).toBe(0);
  expect(metrics[0].history.reportedCount).toBe(6);
  expect(metrics[0].trend).toMatchObject({ status: "breakout", changePercent: 120 });
  expect(metrics[1].difficulty.status).toBe("error");
  expect(metrics[1].history.summary).toBe("Provider did not return monthly history.");
  expect(metrics[2].history.unit).toBe("relative_interest");
  expect(metrics[2].trend).toMatchObject({ status: "declining", changePercent: -50 });
  expect(metrics[3].history.unit).toBe("monthly_searches");
  expect(metrics[3].difficulty.score).toBe(35);
});

test("shows provider freshness separately from the last research attempt", () => {
  const topic = normalizeTopicCandidate({ ...measured, trend_country: "Australia", trend_language: "English", metrics_checked_at: "2026-09-26T10:00:00Z", trend_last_updated_at: "2026-09-01T00:00:00Z" });
  const html = renderToStaticMarkup(<TopicResearchDetails candidate={topic} />);
  expect(html).toContain("Australia · English");
  expect(html).toContain("Provider updated");
  expect(html).toContain("Last research lookup:");
  expect(html).toContain("2026");
});
