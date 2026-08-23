import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import VibeMarketingIslandGraph from "../app/components/VibeMarketingIslandGraph";
import type { VibeMarketingIslandGraphProps } from "../app/components/VibeMarketingIslandGraph";
import VibeMarketingIslandGraphSection from "../app/components/VibeMarketingIslandGraphSection";
import type { VibeMarketingIslandGraph as IslandGraph, VibeMarketingTopicPillar } from "../app/types/vibe-marketing";

const graph: IslandGraph = {
  updatedAt: "2026-08-23T04:00:00Z",
  emergingCount: 2,
  nodes: [
    {
      id: "island:ai-startup-fundraising",
      slug: "ai-startup-fundraising",
      name: "AI Startup Fundraising",
      description: "How AI founders raise their first round.",
      pillarKeyword: "ai startup fundraising",
      iconKey: "rocket",
      colorKey: "blue",
      status: "visible",
      isNew: true,
      keywordCount: 14,
      totalVolume: 5200,
      avgDifficulty: 28.4,
      opportunityScore: 9310.2,
      aiSearchVolume: 840,
      ideaCount: 6,
      articlesWritten: 2,
    },
    {
      id: "island:healthcare-ai",
      slug: "healthcare-ai",
      name: "Healthcare AI",
      description: "Clinical AI adoption.",
      pillarKeyword: "healthcare ai",
      iconKey: "not-a-real-icon",
      colorKey: "not-a-real-color",
      status: "visible",
      isNew: false,
      keywordCount: 9,
      totalVolume: 4400,
      avgDifficulty: 31.2,
      opportunityScore: 8120.5,
      aiSearchVolume: 0,
      ideaCount: 0,
      articlesWritten: 0,
    },
  ],
  edges: [{ source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0.41 }],
};

const pillars: VibeMarketingTopicPillar[] = graph.nodes.map((node) => ({
  id: node.id,
  slug: node.slug,
  name: node.name,
  description: node.description,
  ideaCount: node.ideaCount,
  iconKey: node.iconKey,
  colorKey: node.colorKey,
  source: "content_island",
  pillarKeyword: node.pillarKeyword,
  topicCandidates: [],
}));

function props(overrides: Partial<VibeMarketingIslandGraphProps> = {}): VibeMarketingIslandGraphProps {
  return {
    graph,
    pillars,
    submitting: false,
    generatingPillarSlug: null,
    confirmingPillarSlug: null,
    activePillarSlug: null,
    customNotice: false,
    helpOpen: false,
    helpRef: { current: null },
    onGenerate: () => {},
    onSelectIsland: () => {},
    onAddCustomPillar: () => {},
    header: createElement("h2", null, "Your content islands"),
    narrowFallback: createElement("p", null, "Legacy content island cards"),
    ...overrides,
  };
}

describe("VibeMarketingIslandGraph", () => {
  test("renders the island map server-side with labels, edges and the accessible island list", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain('role="img"');
    expect(markup).toContain(
      'aria-label="Content island map: AI Startup Fundraising, Healthcare AI. Circle size shows opportunity, lines show related islands."',
    );
    expect(markup).toContain("AI Startup Fundra…");
    expect(markup).toContain(">Healthcare AI<");
    expect(markup).toContain("<line");
    expect(markup).toContain("<circle");

    expect(markup).toContain('<ul class="sr-only">');
    expect(markup).toContain(
      "AI Startup Fundraising: 14 keywords, 5,200 monthly searches, opportunity score 9,310, 840 AI searches, 2 articles written. Generate topic ideas.",
    );
    expect(markup).toContain(
      "Healthcare AI: 9 keywords, 4,400 monthly searches, opportunity score 8,121, 0 AI searches, 0 articles written. Generate topic ideas.",
    );
  });

  test("paints persisted island colors and falls back to purple for an unknown color key", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain('fill="#2563eb"');
    expect(markup).toContain('fill="#6d28d9"');
  });

  test("shows the NEW badge and the emerging-islands caption", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain(">NEW<");
    expect(markup).toContain("2 islands forming from ongoing research");

    const quiet = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ graph: { ...graph, emergingCount: 0 } })),
    );
    expect(quiet).not.toContain("forming from ongoing research");

    const single = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ graph: { ...graph, emergingCount: 1 } })),
    );
    expect(single).toContain("1 island forming from ongoing research");
  });

  test("renders the selected island action card with its metrics and the arm/fire button", () => {
    const idle = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ activePillarSlug: "healthcare-ai" })),
    );
    expect(idle).toContain("Clinical AI adoption.");
    expect(idle).toContain("Monthly searches");
    expect(idle).toContain(">4,400<");
    expect(idle).toContain('aria-label="Generate topic ideas for Healthcare AI"');
    expect(idle).toContain(">Generate<");

    const armed = renderToStaticMarkup(
      createElement(
        VibeMarketingIslandGraph,
        props({ activePillarSlug: "healthcare-ai", confirmingPillarSlug: "healthcare-ai" }),
      ),
    );
    expect(armed).toContain('aria-label="Generate topic ideas for 1 Roo Point"');

    const firing = renderToStaticMarkup(
      createElement(
        VibeMarketingIslandGraph,
        props({ activePillarSlug: "healthcare-ai", generatingPillarSlug: "healthcare-ai" }),
      ),
    );
    expect(firing).toContain("loading");
  });

  test("renders no action card until an island is selected", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).not.toContain("Clinical AI adoption.");
    expect(markup).not.toContain("Articles written");
  });

  test("renders the wide layout server-side rather than the narrow fallback", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).not.toContain("Legacy content island cards");
    expect(markup).toContain("Add custom content island");
  });

  test("stays renderable when a global window exists but carries no browser APIs", () => {
    const globals = globalThis as unknown as { window?: unknown };
    const original = globals.window;
    globals.window = {};
    try {
      const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));
      expect(markup).toContain('role="img"');
      expect(markup).toContain("AI Startup Fundra…");
    } finally {
      if (original === undefined) delete globals.window;
      else globals.window = original;
    }
  });
});

describe("VibeMarketingIslandGraphSection", () => {
  test("renders the header and a loading skeleton while the graph chunk resolves", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraphSection, props()));

    expect(markup).toContain("Your content islands");
    expect(markup).toContain("Loading your content islands…");
    expect(markup).not.toContain('role="img"');
  });
});
