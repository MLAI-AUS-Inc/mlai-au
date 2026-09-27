import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { TopicDecisionCard } from "../app/components/TopicDecisionCard";
import type { VibeMarketingTopicCandidate } from "../app/types/vibe-marketing";

const baseCandidate: VibeMarketingTopicCandidate = {
  id: "topic-1",
  keyword: "founder marketing",
  title: "Founder Marketing",
  volume: 2900,
  trendStatus: "rising",
};

function render(candidate: VibeMarketingTopicCandidate) {
  return renderToStaticMarkup(
    createElement(TopicDecisionCard, {
      candidate,
      checked: false,
      expanded: true,
      onChange: () => undefined,
    }),
  );
}

describe("TopicDecisionCard measured trends", () => {
  test("does not invent a chart when provenance is missing", () => {
    const markup = render({
      ...baseCandidate,
      monthlySearches: [100, 500, 200, 900],
    });

    expect(markup).not.toContain('role="img"');
    expect(markup).toContain("Search history unavailable");
    expect(markup).toContain("The provider has not returned dated search history");
  });

  test("renders a measured Google Trends series with the real period label", () => {
    const markup = render({
      ...baseCandidate,
      monthlySearches: [
        { date: "2026-09-20", volume: 22 },
        { date: "2026-09-21", volume: 30 },
        { date: "2026-09-22", volume: 37 },
        { date: "2026-09-23", volume: 45 },
      ],
      trendSource: "google_trends",
      trendBasis: "relative_interest",
      trendIsEstimated: false,
    });

    expect(markup).toContain('role="img"');
    expect(markup).toContain("Relative search interest (0–100)");
    expect(markup).toContain("Google Trends");
    expect(markup).toContain("20 Sep 2026");
    expect(markup).toContain("23 Sep 2026");
    expect(markup).not.toContain("Search history unavailable");
  });

  test("suppresses dated series without verified provider provenance", () => {
    const markup = render({
      ...baseCandidate,
      monthlySearches: [
        { date: "2026-09-20", volume: 20 },
        { date: "2026-09-21", volume: 80 },
      ],
      trendSource: "model_estimate",
      trendBasis: "relative_interest",
      trendIsEstimated: true,
    });

    expect(markup).not.toContain('role="img"');
    expect(markup).toContain("Search history unavailable");
  });
});
