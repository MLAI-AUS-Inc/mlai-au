import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import VibeMarketingIslandGraph, {
  computeIslandLabelLayouts,
  wrapIslandLabel,
} from "../app/components/VibeMarketingIslandGraph";
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
    ...overrides,
  };
}

describe("VibeMarketingIslandGraph", () => {
  test("renders an accessible island map server-side with wrapped labels and edges", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain('role="group"');
    expect(markup).toContain(
      'aria-label="Content island map: AI Startup Fundraising, Healthcare AI. Circle size shows opportunity, lines show related islands."',
    );
    expect(markup).toContain(">AI Startup<");
    expect(markup).toContain(">Fundraising<");
    expect(markup).toContain(">Healthcare AI<");
    expect(markup).toContain("<line");
    expect(markup).toContain("<circle");
    expect(markup).toContain('role="button"');
    expect(markup).toContain('tabindex="0"');
    expect(markup).toContain('aria-pressed="false"');
    expect(markup).toContain(
      "AI Startup Fundraising: 14 keywords, 5,200 monthly searches, opportunity score 9,310, 840 AI searches, 2 articles written. Select to review this island.",
    );
    expect(markup).toContain(
      "Healthcare AI: 9 keywords, 4,400 monthly searches, opportunity score 8,121, 0 AI searches, 0 articles written. Select to review this island.",
    );
  });

  test("wraps common island names onto two useful map lines", () => {
    expect(wrapIslandLabel("AI Startup Fundraising")).toEqual(["AI Startup", "Fundraising"]);
    expect(wrapIslandLabel("Healthcare AI")).toEqual(["Healthcare AI"]);
    expect(wrapIslandLabel("A very long content island label with several extra words")).toEqual([
      "A very long",
      "content island lab…",
    ]);
  });

  test("moves crowded labels to an open side of their circles", () => {
    const layouts = computeIslandLabelLayouts([
      { slug: "founder-community", name: "AI Founder Community", x: 283, y: 444, radius: 60 },
      { slug: "founder-brand", name: "Founder Brand Building", x: 89, y: 362, radius: 49 },
      { slug: "early-growth", name: "Early-stage Growth", x: 108, y: 513, radius: 36 },
    ]);
    const rectangles = [...layouts.values()].map((layout) => ({
      left: layout.centerX - layout.width / 2,
      right: layout.centerX + layout.width / 2,
      top: layout.y,
      bottom: layout.y + layout.height,
    }));

    for (let left = 0; left < rectangles.length; left += 1) {
      for (let right = left + 1; right < rectangles.length; right += 1) {
        expect(
          rectangles[left].right <= rectangles[right].left ||
            rectangles[right].right <= rectangles[left].left ||
            rectangles[left].bottom <= rectangles[right].top ||
            rectangles[right].bottom <= rectangles[left].top,
        ).toBe(true);
      }
    }
  });

  test("paints persisted island colors and falls back to purple for an unknown color key", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain('fill="#2563eb"');
    expect(markup).toContain('fill="#6d28d9"');
  });

  test("shows a quiet new-island marker and the emerging-islands summary", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain("New this cycle");
    expect(markup).toContain("2 islands forming");

    const quiet = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ graph: { ...graph, emergingCount: 0 } })),
    );
    expect(quiet).not.toContain("islands forming");

    const single = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ graph: { ...graph, emergingCount: 1 } })),
    );
    expect(single).toContain("1 island forming");
  });

  test("renders the selected island action card with its metrics and the arm/fire button", () => {
    const idle = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ activePillarSlug: "healthcare-ai" })),
    );
    expect(idle).toContain("Clinical AI adoption.");
    expect(idle).toContain("Searches / month");
    expect(idle).toContain(">4,400<");
    expect(idle).toContain('aria-label="Generate topic ideas for Healthcare AI"');
    expect(idle).toContain("Generate topic ideas");
    expect(idle).toContain("Reviewing an island is free");

    const armed = renderToStaticMarkup(
      createElement(
        VibeMarketingIslandGraph,
        props({ activePillarSlug: "healthcare-ai", confirmingPillarSlug: "healthcare-ai" }),
      ),
    );
    expect(armed).toContain(
      'aria-label="Confirm topic idea generation for Healthcare AI for 1 Roo Point"',
    );
    expect(armed).toContain("Ready to research? Confirm below to use 1 Roo Point.");
    expect(armed).toContain("Confirm");

    const firing = renderToStaticMarkup(
      createElement(
        VibeMarketingIslandGraph,
        props({ activePillarSlug: "healthcare-ai", generatingPillarSlug: "healthcare-ai" }),
      ),
    );
    expect(firing).toContain("Researching ideas…");
  });

  test("renders no action card until an island is selected", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).not.toContain("Clinical AI adoption.");
    expect(markup).not.toContain('id="selected-content-island"');
    expect(markup).toContain("Browsing is free.");
  });

  test("renders the map by default with a clear custom-island status", () => {
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));

    expect(markup).toContain("Content island map:");
    expect(markup).toContain("Custom island");
    expect(markup).toContain("Coming soon");
  });

  test("renders every island with full names and useful metrics in list view", () => {
    const markup = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ defaultView: "list" })),
    );

    expect(markup).toContain('aria-label="Content islands ranked by opportunity"');
    expect(markup).toContain("Browse your strongest opportunities");
    expect(markup).toContain("AI Startup Fundraising");
    expect(markup).toContain("Healthcare AI");
    expect(markup).toContain("Searches/mo");
    expect(markup).toContain("Opportunity");
    expect(markup).toContain("Articles");
  });

  test("only expands the contextual help when requested", () => {
    const quiet = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));
    expect(quiet).not.toContain("How content islands work");

    const expanded = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ helpOpen: true })),
    );
    expect(expanded).toContain("How content islands work");
    expect(expanded).toContain("Larger circles have more search opportunity");

    const custom = renderToStaticMarkup(
      createElement(VibeMarketingIslandGraph, props({ customNotice: true })),
    );
    expect(custom).toContain("Custom island creation is coming soon");
  });

  test("stays renderable when a global window exists but carries no browser APIs", () => {
    const globals = globalThis as unknown as { window?: unknown };
    const original = globals.window;
    globals.window = {};
    try {
      const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, props()));
      expect(markup).toContain('role="group"');
      expect(markup).toContain(">AI Startup<");
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
