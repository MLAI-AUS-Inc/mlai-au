import { describe, expect, test } from "bun:test";
import { ISLAND_BRIEF_EXAMPLES, ISLAND_FOCUSES, EMPTY_ISLAND_BRIEF, researchedIslands, researchIsTerminal } from "../app/lib/custom-content-island";
import { normalizeIslandGraph } from "../app/lib/vibe-marketing";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import VibeMarketingIslandGraph from "../app/components/VibeMarketingIslandGraph";

describe("custom content island", () => {
  test("supports arbitrary topics and explicit intent without user-selected keywords", () => {
    expect(ISLAND_FOCUSES.map(item => item.id)).toEqual(["any", "informational", "commercial", "transactional", "navigational", "custom"]);
    expect(ISLAND_BRIEF_EXAMPLES.map(item => item.label)).toEqual(["A topic", "A service", "A product or feature"]);
    expect(EMPTY_ISLAND_BRIEF).not.toHaveProperty("keyword");
    expect(EMPTY_ISLAND_BRIEF).not.toHaveProperty("name");
  });
  test("shows only measured proposals and recognises terminal research states", () => {
    const island = { id: "one", name: "Gardening", metrics: { total_volume: 600, avg_difficulty: 20 }, keywords: [{}, {}, {}] };
    expect(researchedIslands({suggested_islands: [island, {...island, metrics: {total_volume: 0}}, {name: "Made up"}]})).toEqual([island]);
    expect(researchIsTerminal("completed")).toBe(true);
    expect(researchIsTerminal("failed")).toBe(true);
    expect(researchIsTerminal("queued")).toBe(false);
  });

  test("keeps unknown search demand distinct from measured zero", () => {
    const graph = normalizeIslandGraph({ nodes: [{slug: "custom-ai", name: "AI transformation", researchPending: true}], edges: [] })!;
    expect(graph.nodes[0].researchPending).toBe(true);
    const pillar = { ...graph.nodes[0], source: "content_island", topicCandidates: [] };
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, {
      graph, pillars: [pillar], activePillarSlug: "custom-ai", submitting: false,
      header: null,
      onGenerate() {}, onSelectIsland() {},
    }));
    expect(markup).toContain("Not researched");
    expect(markup).toContain("Search demand and opportunity are not researched yet");
    expect(markup).not.toContain("0 monthly searches");
    expect(markup).not.toContain("Coming soon");
  });
});
