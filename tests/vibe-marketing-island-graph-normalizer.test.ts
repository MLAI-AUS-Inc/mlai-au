import { describe, expect, test } from "bun:test";

import { normalizeBootstrap, normalizeIslandGraph } from "../app/lib/vibe-marketing";

describe("normalizeIslandGraph", () => {
  test("reads a camelCase graph payload", () => {
    const graph = normalizeIslandGraph({
      updatedAt: "2026-08-23T04:00:00Z",
      emergingCount: 2,
      nodes: [
        {
          id: "island:ai-startup-fundraising",
          slug: "ai-startup-fundraising",
          name: "AI Startup Fundraising",
          description: "Raising for an AI company.",
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
      ],
      edges: [],
    });

    expect(graph).not.toBeNull();
    expect(graph!.updatedAt).toBe("2026-08-23T04:00:00Z");
    expect(graph!.emergingCount).toBe(2);
    expect(graph!.nodes[0]).toEqual({
      id: "island:ai-startup-fundraising",
      slug: "ai-startup-fundraising",
      name: "AI Startup Fundraising",
      description: "Raising for an AI company.",
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
    });
  });

  test("reads the same graph in snake_case", () => {
    const graph = normalizeIslandGraph({
      updated_at: "2026-08-23T04:00:00Z",
      emerging_count: 2,
      nodes: [
        {
          slug: "ai-startup-fundraising",
          name: "AI Startup Fundraising",
          pillar_keyword: "ai startup fundraising",
          icon_key: "rocket",
          color_key: "blue",
          is_new: true,
          keyword_count: 14,
          total_volume: 5200,
          avg_difficulty: 28.4,
          opportunity_score: 9310.2,
          ai_search_volume: 840,
          idea_count: 6,
          articles_written: 2,
        },
      ],
      edges: [],
    });

    expect(graph!.updatedAt).toBe("2026-08-23T04:00:00Z");
    expect(graph!.emergingCount).toBe(2);
    expect(graph!.nodes[0].id).toBe("island:ai-startup-fundraising");
    expect(graph!.nodes[0].pillarKeyword).toBe("ai startup fundraising");
    expect(graph!.nodes[0].iconKey).toBe("rocket");
    expect(graph!.nodes[0].colorKey).toBe("blue");
    expect(graph!.nodes[0].isNew).toBe(true);
    expect(graph!.nodes[0].keywordCount).toBe(14);
    expect(graph!.nodes[0].totalVolume).toBe(5200);
    expect(graph!.nodes[0].avgDifficulty).toBe(28.4);
    expect(graph!.nodes[0].opportunityScore).toBe(9310.2);
    expect(graph!.nodes[0].aiSearchVolume).toBe(840);
    expect(graph!.nodes[0].ideaCount).toBe(6);
    expect(graph!.nodes[0].articlesWritten).toBe(2);
  });

  test("falls back to purple, default and zeroed metrics for a bare node", () => {
    const graph = normalizeIslandGraph({ nodes: [{ slug: "healthcare-ai", name: "Healthcare AI" }] });

    expect(graph!.emergingCount).toBe(0);
    expect(graph!.updatedAt).toBeNull();
    expect(graph!.nodes[0]).toEqual({
      id: "island:healthcare-ai",
      slug: "healthcare-ai",
      name: "Healthcare AI",
      description: "",
      pillarKeyword: null,
      iconKey: "default",
      colorKey: "purple",
      status: "visible",
      isNew: false,
      keywordCount: 0,
      totalVolume: 0,
      avgDifficulty: 0,
      opportunityScore: 0,
      aiSearchVolume: 0,
      ideaCount: 0,
      articlesWritten: 0,
    });
  });

  test("drops edges whose source or target slug has no node", () => {
    const graph = normalizeIslandGraph({
      nodes: [
        { slug: "ai-startup-fundraising", name: "AI Startup Fundraising" },
        { slug: "healthcare-ai", name: "Healthcare AI" },
      ],
      edges: [
        { source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0.41 },
        { source: "ai-startup-fundraising", target: "island-that-was-archived", similarity: 0.55 },
        { source: "island-that-was-archived", target: "healthcare-ai", similarity: 0.52 },
        { source: "healthcare-ai", target: "healthcare-ai", similarity: 0.99 },
      ],
    });

    expect(graph!.edges).toEqual([
      { source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0.41 },
    ]);
  });

  test("reads snake_case island_a/island_b edges and defaults similarity", () => {
    const graph = normalizeIslandGraph({
      nodes: [
        { slug: "ai-startup-fundraising", name: "AI Startup Fundraising" },
        { slug: "healthcare-ai", name: "Healthcare AI" },
      ],
      edges: [{ island_a: "ai-startup-fundraising", island_b: "healthcare-ai" }],
    });

    expect(graph!.edges).toEqual([
      { source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0 },
    ]);
  });

  test("skips nodes without a slug or a name and rejects non-object payloads", () => {
    const graph = normalizeIslandGraph({
      nodes: [{ name: "No slug" }, { slug: "no-name" }, null, "healthcare-ai", { slug: "ok", name: "Ok" }],
    });

    expect(graph!.nodes.map((node) => node.slug)).toEqual(["ok"]);
    expect(normalizeIslandGraph(null)).toBeNull();
    expect(normalizeIslandGraph(undefined)).toBeNull();
    expect(normalizeIslandGraph([])).toBeNull();
    expect(normalizeIslandGraph("islands")).toBeNull();
  });
});

describe("normalizeBootstrap island wiring", () => {
  const pillars = [
    {
      slug: "ai-startup-fundraising",
      name: "AI Startup Fundraising",
      pillar_keyword: "ai startup fundraising",
      source: "content_island",
    },
    {
      slug: "healthcare-ai",
      name: "Healthcare AI",
      pillarKeyword: "healthcare ai",
      source: "content_island",
    },
    { slug: "founder-marketing", name: "Founder Marketing" },
  ];

  test("exposes islandGraph and carries pillarKeyword in both cases", () => {
    const bootstrap = normalizeBootstrap({
      topicPillars: pillars,
      island_graph: {
        emerging_count: 1,
        nodes: [
          { slug: "ai-startup-fundraising", name: "AI Startup Fundraising", color_key: "blue" },
          { slug: "healthcare-ai", name: "Healthcare AI" },
        ],
        edges: [{ source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0.41 }],
      },
    });

    expect(bootstrap.islandGraph!.emergingCount).toBe(1);
    expect(bootstrap.islandGraph!.nodes.map((node) => node.slug)).toEqual([
      "ai-startup-fundraising",
      "healthcare-ai",
    ]);
    expect(bootstrap.islandGraph!.edges).toHaveLength(1);
    expect(bootstrap.topicPillars.map((pillar) => pillar.pillarKeyword)).toEqual([
      "ai startup fundraising",
      "healthcare ai",
      null,
    ]);
  });

  test("every island graph node resolves to a topic pillar", () => {
    const bootstrap = normalizeBootstrap({
      topicPillars: pillars,
      islandGraph: {
        nodes: [
          { slug: "ai-startup-fundraising", name: "AI Startup Fundraising" },
          { slug: "healthcare-ai", name: "Healthcare AI" },
        ],
      },
    });

    const pillarSlugs = new Set(bootstrap.topicPillars.map((pillar) => pillar.slug));
    for (const node of bootstrap.islandGraph!.nodes) {
      expect(pillarSlugs.has(node.slug)).toBe(true);
    }
  });

  test("is null when the backend omits the graph", () => {
    expect(normalizeBootstrap({ topicPillars: pillars }).islandGraph).toBeNull();
  });
});
