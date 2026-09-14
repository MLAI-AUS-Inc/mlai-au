import { describe, expect, test } from "bun:test";
import { ISLAND_BRIEF_EXAMPLES, ISLAND_FOCUSES, islandExampleAngles, islandFocusBrief, suggestIslandName } from "../app/lib/custom-content-island";
import { normalizeIslandGraph } from "../app/lib/vibe-marketing";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import VibeMarketingIslandGraph from "../app/components/VibeMarketingIslandGraph";

describe("custom content island", () => {
  test("supports unrelated subjects without requiring a product or launch", () => {
    for (const subject of ["Bird migration", "Local history", "Community volunteering", "AI transformation", "Invoice reminders"]) {
      for (const focus of ISLAND_FOCUSES.filter((option) => option.id !== "custom")) {
        const angles = islandExampleAngles(subject, focus.id);
        expect(angles).toHaveLength(3);
        expect(angles.every((angle) => angle.includes(subject))).toBe(true);
        expect(suggestIslandName(subject, focus.id)).toStartWith(`${subject}:`);
        expect(islandFocusBrief(focus.id)).not.toMatch(/product|purchase|business/);
      }
    }
    expect(ISLAND_BRIEF_EXAMPLES.map((example) => example.label)).toEqual(["A topic", "A service", "A product or feature"]);
  });

  test("preserves a user's own direction without forcing a suggested purpose", () => {
    const direction = "Tell the stories of local volunteers and invite readers to share their own experiences.";
    expect(islandFocusBrief("custom", `  ${direction}  `)).toBe(direction);
    expect(suggestIslandName("Community stories", "custom")).toBe("Community stories");
    expect(islandExampleAngles("Community stories", "custom")).toEqual([]);
    expect(islandFocusBrief("custom", "   ")).toBe("");
  });

  test("keeps unknown search demand distinct from measured zero", () => {
    const graph = normalizeIslandGraph({ nodes: [{slug: "custom-ai", name: "AI transformation", researchPending: true}], edges: [] })!;
    expect(graph.nodes[0].researchPending).toBe(true);
    const pillar = { ...graph.nodes[0], source: "content_island", topicCandidates: [] };
    const markup = renderToStaticMarkup(createElement(VibeMarketingIslandGraph, {
      graph, pillars: [pillar], activePillarSlug: "custom-ai", submitting: false,
      customNotice: false, helpOpen: false, helpRef: {current: null}, header: null,
      onGenerate() {}, onSelectIsland() {}, onAddCustomPillar() {},
    }));
    expect(markup).toContain("Not researched");
    expect(markup).toContain("Search demand and opportunity are not researched yet");
    expect(markup).not.toContain("0 monthly searches");
    expect(markup).not.toContain("Coming soon");
  });
});
