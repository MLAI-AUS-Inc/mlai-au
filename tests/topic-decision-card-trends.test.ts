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

    expect(markup).not.toContain('aria-label="Search trend chart"');
    expect(markup).toContain("Trend unavailable");
    expect(markup).toContain("Measured trend history is not available for this topic.");
  });

  test("renders a measured Google Trends series with the real period label", () => {
    const markup = render({
      ...baseCandidate,
      monthlySearches: [22, 30, 37, 45],
      trendSource: "google_trends",
      trendBasis: "relative_interest",
      trendPeriodLabel: "past 30 days",
      trendIsEstimated: false,
      trendPercent: 24,
    });

    expect(markup).toContain('aria-label="Search trend chart"');
    expect(markup).toContain("+24% past 30 days");
    expect(markup).not.toContain("Measured trend history is not available");
  });

  test("suppresses explicitly estimated series", () => {
    const markup = render({
      ...baseCandidate,
      monthlySearches: [20, 80, 30, 90],
      trendSource: "google_trends",
      trendBasis: "relative_interest",
      trendIsEstimated: true,
    });

    expect(markup).not.toContain('aria-label="Search trend chart"');
    expect(markup).toContain("Trend unavailable");
  });
});
