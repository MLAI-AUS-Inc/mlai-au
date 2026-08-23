import { describe, expect, test } from "bun:test";

import {
  ISLAND_EDGE_PADDING,
  ISLAND_MAX_RADIUS,
  ISLAND_MIN_RADIUS,
  computeIslandLayout,
  radiusForOpportunity,
} from "../app/lib/island-graph-layout";
import type { IslandLayoutEdge, IslandLayoutNode } from "../app/lib/island-graph-layout";

const WIDTH = 900;
const HEIGHT = 480;

function node(slug: string, opportunityScore: number): IslandLayoutNode {
  return { slug, opportunityScore };
}

describe("radiusForOpportunity", () => {
  test("grows monotonically with opportunity and stays inside the radius bounds", () => {
    const radii = [0, 250, 1200, 4800, 9600].map((score) => radiusForOpportunity(score, 0, 9600));
    for (let index = 1; index < radii.length; index += 1) {
      expect(radii[index]).toBeGreaterThan(radii[index - 1]);
    }
    expect(radii[0]).toBe(ISLAND_MIN_RADIUS);
    expect(radii[radii.length - 1]).toBe(ISLAND_MAX_RADIUS);
    for (const radius of radii) {
      expect(radius).toBeGreaterThanOrEqual(ISLAND_MIN_RADIUS);
      expect(radius).toBeLessThanOrEqual(ISLAND_MAX_RADIUS);
    }
  });

  test("clamps out-of-range scores and survives a degenerate range", () => {
    expect(radiusForOpportunity(-40, 0, 100)).toBe(ISLAND_MIN_RADIUS);
    expect(radiusForOpportunity(500, 0, 100)).toBe(ISLAND_MAX_RADIUS);
    expect(radiusForOpportunity(700, 700, 700)).toBe((ISLAND_MIN_RADIUS + ISLAND_MAX_RADIUS) / 2);
    expect(radiusForOpportunity(Number.NaN, 0, 0)).toBe((ISLAND_MIN_RADIUS + ISLAND_MAX_RADIUS) / 2);
  });
});

describe("computeIslandLayout", () => {
  const nodes = [
    node("ai-startup-fundraising", 9310),
    node("healthcare-ai", 4100),
    node("founder-marketing", 820),
  ];
  const edges: IslandLayoutEdge[] = [
    { source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0.41 },
    { source: "healthcare-ai", target: "founder-marketing", similarity: 0.32 },
  ];

  test("is deterministic across runs and never seeds from Math.random", () => {
    const first = computeIslandLayout(nodes, edges, WIDTH, HEIGHT);
    const second = computeIslandLayout(nodes, edges, WIDTH, HEIGHT);
    expect(second).toEqual(first);
    expect(first.map((positioned) => positioned.slug)).toEqual([
      "ai-startup-fundraising",
      "healthcare-ai",
      "founder-marketing",
    ]);
  });

  test("keeps every island inside the viewport and sizes circles by opportunity", () => {
    const positioned = computeIslandLayout(nodes, edges, WIDTH, HEIGHT);
    const bySlug = new Map(positioned.map((entry) => [entry.slug, entry]));
    expect(bySlug.get("ai-startup-fundraising")!.radius).toBeGreaterThan(
      bySlug.get("founder-marketing")!.radius,
    );
    for (const entry of positioned) {
      const bound = entry.radius + ISLAND_EDGE_PADDING;
      expect(entry.x).toBeGreaterThanOrEqual(bound);
      expect(entry.x).toBeLessThanOrEqual(WIDTH - bound);
      expect(entry.y).toBeGreaterThanOrEqual(bound);
      expect(entry.y).toBeLessThanOrEqual(HEIGHT - bound);
      expect(Number.isFinite(entry.x)).toBe(true);
      expect(Number.isFinite(entry.y)).toBe(true);
    }
  });

  test("clamps into a viewport too small for the padded circles without inverting the bounds", () => {
    const positioned = computeIslandLayout(nodes, edges, 120, 90);
    for (const entry of positioned) {
      expect(Number.isFinite(entry.x)).toBe(true);
      expect(Number.isFinite(entry.y)).toBe(true);
      expect(entry.x).toBeGreaterThan(0);
      expect(entry.y).toBeGreaterThan(0);
    }
  });

  test("joins edges on slug, so an edge referencing a missing island does not throw", () => {
    const withDangling: IslandLayoutEdge[] = [
      ...edges,
      { source: "ai-startup-fundraising", target: "island-that-was-archived", similarity: 0.55 },
      { source: "healthcare-ai", target: "healthcare-ai", similarity: 0.9 },
    ];
    const positioned = computeIslandLayout(nodes, withDangling, WIDTH, HEIGHT);
    expect(positioned).toHaveLength(3);
    for (const entry of positioned) {
      expect(Number.isFinite(entry.x)).toBe(true);
      expect(Number.isFinite(entry.y)).toBe(true);
    }
  });

  test("never joins on the island id", () => {
    const idEdges: IslandLayoutEdge[] = [
      { source: "island:ai-startup-fundraising", target: "island:healthcare-ai", similarity: 0.41 },
    ];
    const positioned = computeIslandLayout(nodes, idEdges, WIDTH, HEIGHT);
    expect(positioned).toHaveLength(3);
  });

  test("handles a single island and an island set with no edges", () => {
    const single = computeIslandLayout([node("solo-island", 120)], [], WIDTH, HEIGHT);
    expect(single).toHaveLength(1);
    expect(single[0].radius).toBe((ISLAND_MIN_RADIUS + ISLAND_MAX_RADIUS) / 2);
    expect(Number.isFinite(single[0].x)).toBe(true);

    const unlinked = computeIslandLayout(nodes, [], WIDTH, HEIGHT);
    expect(unlinked).toHaveLength(3);
    expect(new Set(unlinked.map((entry) => `${entry.x}:${entry.y}`)).size).toBe(3);
  });

  test("returns nothing for an empty island set", () => {
    expect(computeIslandLayout([], edges, WIDTH, HEIGHT)).toEqual([]);
  });

  test("leaves a visible gap between linked islands so the connecting line is not covered", () => {
    const dense = [
      node("ai-startup-fundraising", 9600),
      node("healthcare-ai", 8100),
      node("practical-ai-projects", 3300),
      node("learning-ai", 5200),
      node("ai-agents-ops", 1400),
    ];
    const denseEdges: IslandLayoutEdge[] = [
      { source: "ai-startup-fundraising", target: "healthcare-ai", similarity: 0.41 },
      { source: "healthcare-ai", target: "practical-ai-projects", similarity: 0.52 },
      { source: "practical-ai-projects", target: "learning-ai", similarity: 0.63 },
      { source: "learning-ai", target: "ai-startup-fundraising", similarity: 0.35 },
      { source: "practical-ai-projects", target: "ai-agents-ops", similarity: 0.58 },
    ];

    const bySlug = new Map(
      computeIslandLayout(dense, denseEdges, WIDTH, HEIGHT).map((entry) => [entry.slug, entry]),
    );

    for (const edge of denseEdges) {
      const source = bySlug.get(edge.source)!;
      const target = bySlug.get(edge.target)!;
      const centreDistance = Math.hypot(source.x - target.x, source.y - target.y);
      expect(centreDistance).toBeGreaterThan(source.radius + target.radius + 24);
    }
  });

  test("carries the caller's node payload through untouched", () => {
    const positioned = computeIslandLayout(
      [{ slug: "healthcare-ai", opportunityScore: 4100, name: "Healthcare AI" }],
      [],
      WIDTH,
      HEIGHT,
    );
    expect(positioned[0].name).toBe("Healthcare AI");
    expect(positioned[0].opportunityScore).toBe(4100);
  });
});
