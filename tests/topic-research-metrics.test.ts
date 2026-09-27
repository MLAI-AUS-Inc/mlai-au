import { describe, expect, test } from "bun:test";

import { numericMetricValue, topicResearchMetrics } from "../app/lib/topic-research-metrics";
import type { VibeMarketingTopicCandidate } from "../app/types/vibe-marketing";

function candidate(overrides: Record<string, unknown> = {}): VibeMarketingTopicCandidate {
  return { id: "topic-1", keyword: "ai search", title: "AI search", ...overrides };
}

function monthly(values: number[], overrides: Record<string, unknown> = {}): VibeMarketingTopicCandidate {
  return candidate({
    monthlySearchesSource: "dataforseo_labs",
    monthlySearchesBasis: "search_volume",
    monthlySearches: values.map((search_volume, index) => ({ year: 2026, month: index + 1, search_volume })),
    ...overrides,
  });
}

describe("topic difficulty evidence", () => {
  test("preserves a verified zero difficulty score", () => {
    const result = topicResearchMetrics(candidate({ difficulty: "0", difficultySource: "dataforseo_bulk" }));
    expect(result.difficulty).toMatchObject({ status: "available", score: 0, label: "Very approachable", sourceLabel: "DataForSEO" });
  });

  test("does not trust a legacy default or turn invalid scores into valid bounds", () => {
    for (const difficulty of [-1, 101, 20.5, "", null, Number.NaN, true]) {
      expect(topicResearchMetrics(candidate({ difficulty, difficultySource: "dataforseo_labs" })).difficulty.score).toBeNull();
    }
    expect(topicResearchMetrics(candidate({ difficulty: 0, difficultySource: "legacy_default" })).difficulty.status).toBe("unavailable");
    expect(topicResearchMetrics(candidate({ difficulty: 12 })).difficulty.score).toBeNull();
  });

  test("distinguishes failed lookup and actual in-flight work from unavailable", () => {
    expect(topicResearchMetrics(candidate({ difficultyStatus: "error", difficultyReason: "Provider request failed." })).difficulty)
      .toMatchObject({ status: "error", score: null, summary: "Provider request failed." });
    expect(topicResearchMetrics(candidate({ difficultyStatus: "pending" })).difficulty.status).toBe("pending");
    expect(topicResearchMetrics(candidate()).difficulty).toMatchObject({ status: "unavailable", label: "Unavailable" });
    expect(topicResearchMetrics(candidate()).difficulty.summary).not.toContain("pending");
  });
});

describe("dated topic search history", () => {
  test("sorts provider months, limits the chart to six calendar months and retains zero", () => {
    const result = topicResearchMetrics(monthly([80, 90, 100, 110, 120, 130, 0], {
      monthlySearches: [
        { year: 2026, month: 7, search_volume: 0 },
        { year: 2025, month: 12, search_volume: 60 },
        { year: 2026, month: 2, search_volume: 90 },
        { year: 2026, month: 1, search_volume: 80 },
        { year: 2026, month: 4, search_volume: 110 },
        { year: 2026, month: 3, search_volume: 100 },
        { year: 2026, month: 6, search_volume: 130 },
        { year: 2026, month: 5, search_volume: 120 },
      ],
      trendCountry: "Australia", trendLanguage: "English",
    }));
    expect(result.history.points.map(({ date }) => date)).toEqual([
      "2026-02-01", "2026-03-01", "2026-04-01", "2026-05-01", "2026-06-01", "2026-07-01",
    ]);
    expect(result.history.points.map(({ value }) => value)).toEqual([90, 100, 110, 120, 130, 0]);
    expect(result.history).toMatchObject({ status: "available", unit: "monthly_searches", reportedCount: 6, contextLabel: "Australia · English" });
    expect(result.history.coverageLabel).toMatch(/^Feb 2026 – Jul(?:y)? 2026 · 6 of 6 months reported$/);
  });

  test("leaves missing months as null gaps and withholds a direction claim", () => {
    const result = topicResearchMetrics(monthly([], {
      monthlySearches: [{ year: 2026, month: 1, search_volume: 100 }, { year: 2026, month: 3, search_volume: 900 }],
      trendStatus: "breakout", trendPercent: 800,
    }));
    expect(result.history.points.map(({ value }) => value)).toEqual([null, null, null, 100, null, 900]);
    expect(result.history.reportedCount).toBe(2);
    expect(result.trend).toMatchObject({ status: "unavailable", changePercent: null });
    expect(result.trend.summary).toContain("gaps");
  });

  test("accepts real month/date observations while rejecting invalid dates and negatives", () => {
    const result = topicResearchMetrics(monthly([], {
      monthlySearches: [
        { date: "2026-01", volume: 100 },
        { date: "2026-02-01", volume: "1,000" },
        { date: "2026-02-30", volume: 9000 },
        { year: 2026, month: 13, search_volume: 9000 },
        { date: "2026-03-01", volume: -1 },
      ],
    }));
    expect(result.history.points.slice(-2).map(({ value }) => value)).toEqual([100, 1000]);
    expect(result.history.points.at(-1)?.date).toBe("2026-02-01");
  });

  test("does not invent dates for old numeric arrays or reuse an unverified trend label", () => {
    const result = topicResearchMetrics(candidate({
      monthlySearches: [10, 20, 30, 40, 50, 60], trendSource: "dataforseo_labs",
      trendStatus: "breakout", trendLabel: "Breakout", trendPercent: 500,
      velocity: { source: "google_trends", daily_volumes: [10, 90], velocity_score: 8 },
    }));
    expect(result.history).toMatchObject({ status: "unavailable", points: [], unit: null });
    expect(result.trend.status).toBe("unavailable");
  });

  test("requires matching provenance and does not present AI history as Google demand", () => {
    expect(topicResearchMetrics(monthly([100, 200], { monthlySearchesSource: "unknown" })).history.status).toBe("unavailable");
    expect(topicResearchMetrics(monthly([100, 200], { monthlySearchesBasis: "ai_search_volume" })).history.status).toBe("unavailable");
    expect(topicResearchMetrics(monthly([100, 200], { monthlySearchesSource: "dataforseo_ai" })).history.status).toBe("unavailable");
  });

  test("keeps Google Trends date coverage and relative units distinct from monthly volume", () => {
    const result = topicResearchMetrics(candidate({
      velocity: {
        source: "google_trends", basis: "relative_interest", velocity_score: 25,
        daily_volumes: [{ date: "2026-09-22", volume: 80 }, { date: "2026-09-20", volume: 20 }, { date: "2026-09-21", volume: 40 }],
      },
    }));
    expect(result.history).toMatchObject({ status: "available", unit: "relative_interest", sourceLabel: "Google Trends", reportedCount: 3 });
    expect(result.history.points.map(({ value }) => value)).toEqual([20, 40, 80]);
    expect(result.history.coverageLabel).toMatch(/^20 Sept? 2026 – 22 Sept? 2026 · 3 observations$/);
    expect(result.history.summary).toContain("not search counts");
    expect(result.trend.changePercent).toBe(300);
    expect(result.trend.summary).not.toContain("six months");
  });

  test("reads the API's flat daily-history contract without converting it to monthly searches", () => {
    const result = topicResearchMetrics(candidate({
      monthlySearches: [{ date: "2026-09-20", volume: 10 }, { date: "2026-09-21", volume: 40 }],
      monthlySearchesSource: "google_trends", monthlySearchesBasis: "relative_interest",
      trendSource: "google_trends", trendBasis: "relative_interest",
    }));
    expect(result.history).toMatchObject({ status: "available", unit: "relative_interest", reportedCount: 2 });
    expect(result.history.points.map(({ date }) => date)).toEqual(["2026-09-20", "2026-09-21"]);
    expect(result.trend).toMatchObject({ status: "breakout", changePercent: 300 });
  });

  test("accepts aligned provider date arrays and filters impossible relative scores", () => {
    const result = topicResearchMetrics(candidate({
      velocity: { source: "pytrends", dailyVolumes: [0, 100, 101], dates: ["2026-09-20", "2026-09-21", "2026-09-22"] },
    }));
    expect(result.history.points.map(({ value }) => value)).toEqual([0, 100, null]);
    expect(result.trend).toMatchObject({ status: "breakout", changePercent: null });
    expect(result.trend.summary).toContain("zero baseline");
  });

  test("withholds a daily direction claim for missing measurements or irregular observation intervals", () => {
    for (const velocity of [
      { source: "google_trends", dailyVolumes: [10, null, 80], dates: ["2026-09-20", "2026-09-21", "2026-09-22"] },
      { source: "google_trends", dailyVolumes: [10, 20, 80], dates: ["2026-09-20", "2026-09-21", "2026-09-23"] },
    ]) {
      const result = topicResearchMetrics(candidate({ velocity }));
      expect(result.history.status).toBe("available");
      expect(result.trend.status).toBe("unavailable");
      expect(result.trend.summary).toContain("gaps");
    }
  });

  test("accepts regular weekly and calendar-month relative-interest observations", () => {
    for (const dates of [
      ["2026-09-01", "2026-09-08", "2026-09-15"],
      ["2026-01-01", "2026-02-01", "2026-03-01"],
    ]) {
      expect(topicResearchMetrics(candidate({ velocity: { source: "google_trends", dailyVolumes: [20, 40, 80], dates } })).trend.status).toBe("breakout");
    }
  });
});

describe("measured topic trend classification", () => {
  test("compares equal first and last windows using explicit thresholds", () => {
    expect(topicResearchMetrics(monthly([100, 100, 100, 200, 200, 200])).trend).toMatchObject({ status: "breakout", changePercent: 100 });
    expect(topicResearchMetrics(monthly([100, 100, 100, 116, 116, 116])).trend.status).toBe("growing");
    expect(topicResearchMetrics(monthly([100, 100, 100, 115, 115, 115])).trend.status).toBe("stable");
    expect(topicResearchMetrics(monthly([100, 100, 100, 85, 85, 85])).trend.status).toBe("stable");
    expect(topicResearchMetrics(monthly([100, 100, 100, 84, 84, 84])).trend.status).toBe("declining");
  });

  test("skips an odd centre sample and does not call all-zero demand stable", () => {
    expect(topicResearchMetrics(monthly([100, 100, 99999, 200, 200])).trend.changePercent).toBe(100);
    expect(topicResearchMetrics(monthly([0, 0, 0, 0, 0, 0])).trend.status).toBe("unavailable");
    expect(topicResearchMetrics(monthly([100, 100, 100, 0, 0, 0])).trend).toMatchObject({ status: "declining", changePercent: -100 });
    expect(topicResearchMetrics(monthly([0, 0, 0, 100, 100, 100])).trend).toMatchObject({ status: "breakout", changePercent: null });
  });

  test("uses only the actual partial history for its comparison label", () => {
    const result = topicResearchMetrics(monthly([100, 110]));
    expect(result.history.coverageLabel).toContain("2 of 6 months reported");
    expect(result.trend.summary).toContain("Jan 2026 – Feb 2026");
    expect(result.trend.summary).toContain("first 1 and last 1 reported month");
    expect(topicResearchMetrics(monthly([100])).trend.status).toBe("unavailable");
  });
});

test("numeric parsing does not coerce absent or non-decimal values into metrics", () => {
  expect(numericMetricValue("1,200")).toBe(1200);
  expect(numericMetricValue("0")).toBe(0);
  for (const value of [null, undefined, "", " ", true, "0x20", Infinity, Number.NaN]) {
    expect(numericMetricValue(value)).toBeNull();
  }
});
