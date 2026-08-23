import type { SimulationLinkDatum, SimulationNodeDatum } from "d3-force";
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from "d3-force";

export const ISLAND_MIN_RADIUS = 26;
export const ISLAND_MAX_RADIUS = 60;
// Room reserved around a circle for the 12px name label below it and the NEW pill above.
export const ISLAND_EDGE_PADDING = 26;

const SIMULATION_TICKS = 300;
// Wide enough to clear a neighbour's furniture, not just its circle: the name label sits
// up to 30px below a node and the NEW pill up to 24px above it.
const COLLIDE_PADDING = 32;
const CENTERING_STRENGTH = 0.05;
// Repulsion scales with the circle so a large island pushes its neighbours proportionally
// further away instead of swallowing them.
const CHARGE_PER_RADIUS = -26;
// Link length is measured rim-to-rim, not centre-to-centre: a fixed centre distance is
// shorter than two large radii, which buries the connecting line under the circles.
const LINK_GAP_FAR = 130;
const LINK_GAP_NEAR = 64;

export interface IslandLayoutNode {
  slug: string;
  opportunityScore: number;
}

export interface IslandLayoutEdge {
  source: string;
  target: string;
  similarity: number;
}

export interface IslandLayoutPosition {
  x: number;
  y: number;
  radius: number;
}

export type PositionedIslandNode<TNode extends IslandLayoutNode> = TNode & IslandLayoutPosition;

interface SimulationIslandNode extends SimulationNodeDatum {
  slug: string;
  radius: number;
}

interface SimulationIslandLink extends SimulationLinkDatum<SimulationIslandNode> {
  similarity: number;
}

/**
 * Circle radius for an island, sqrt-scaled so area (not radius) tracks opportunity.
 * A degenerate range — every island scoring the same, or a single island — returns the
 * mid radius so the map stays legible instead of collapsing to the minimum.
 */
export function radiusForOpportunity(score: number, min: number, max: number): number {
  const safeScore = Number.isFinite(score) ? Math.max(0, score) : 0;
  const lower = Math.min(Number.isFinite(min) ? min : 0, Number.isFinite(max) ? max : 0);
  const upper = Math.max(Number.isFinite(min) ? min : 0, Number.isFinite(max) ? max : 0);
  const span = upper - lower;
  if (span <= 0) return (ISLAND_MIN_RADIUS + ISLAND_MAX_RADIUS) / 2;
  const clamped = Math.min(upper, Math.max(lower, safeScore));
  const ratio = Math.sqrt((clamped - lower) / span);
  return ISLAND_MIN_RADIUS + ratio * (ISLAND_MAX_RADIUS - ISLAND_MIN_RADIUS);
}

// FNV-1a over the slug: the layout must be identical on the server, on hydration, and
// across reloads, so seeds are derived from island identity and never from Math.random.
function hashSlug(slug: string, salt: number): number {
  let hash = 2166136261 ^ salt;
  for (let index = 0; index < slug.length; index += 1) {
    hash ^= slug.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Force-directed positions for the island map, run to completion synchronously so the
 * markup is identical server-side and client-side.
 *
 * Edges join on `slug`. Island `id` is `island:<slug>` and must never be the join key —
 * `forceLink` throws at initialize time for a link id it cannot resolve, which is also
 * why edges pointing at an unknown slug are dropped here rather than passed through.
 */
export function computeIslandLayout<TNode extends IslandLayoutNode>(
  nodes: TNode[],
  edges: IslandLayoutEdge[],
  width: number,
  height: number,
): Array<PositionedIslandNode<TNode>> {
  if (!nodes.length) return [];

  const scores = nodes.map((node) => (Number.isFinite(node.opportunityScore) ? node.opportunityScore : 0));
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const centerX = width / 2;
  const centerY = height / 2;
  const spreadX = Math.max(width / 4, 1);
  const spreadY = Math.max(height / 4, 1);

  const simulationNodes: SimulationIslandNode[] = nodes.map((node, index) => {
    const angle = (hashSlug(node.slug, 0) % 3600) / 3600 * Math.PI * 2;
    const distance = 0.35 + ((hashSlug(node.slug, 1) % 1000) / 1000) * 0.65;
    return {
      index,
      slug: node.slug,
      radius: radiusForOpportunity(scores[index], minScore, maxScore),
      x: centerX + Math.cos(angle) * spreadX * distance,
      y: centerY + Math.sin(angle) * spreadY * distance,
      vx: 0,
      vy: 0,
    };
  });

  const bySlug = new Map(simulationNodes.map((node) => [node.slug, node]));
  const simulationLinks: SimulationIslandLink[] = edges
    .filter((edge) => edge.source !== edge.target && bySlug.has(edge.source) && bySlug.has(edge.target))
    .map((edge) => ({
      source: edge.source,
      target: edge.target,
      similarity: Number.isFinite(edge.similarity) ? Math.max(0, Math.min(1, edge.similarity)) : 0,
    }));

  const random = seededRandom(hashSlug(simulationNodes.map((node) => node.slug).join("|"), 2));
  const simulation = forceSimulation(simulationNodes)
    .randomSource(random)
    .force("charge", forceManyBody<SimulationIslandNode>().strength((node) => CHARGE_PER_RADIUS * node.radius))
    .force(
      "link",
      forceLink<SimulationIslandNode, SimulationIslandLink>(simulationLinks)
        .id((node) => node.slug)
        .distance((link) => {
          const source = link.source as SimulationIslandNode;
          const target = link.target as SimulationIslandNode;
          const rims = (source?.radius ?? ISLAND_MIN_RADIUS) + (target?.radius ?? ISLAND_MIN_RADIUS);
          return rims + LINK_GAP_FAR - (LINK_GAP_FAR - LINK_GAP_NEAR) * link.similarity;
        })
        .strength((link) => 0.25 + 0.35 * link.similarity),
    )
    .force("collide", forceCollide<SimulationIslandNode>((node) => node.radius + COLLIDE_PADDING))
    .force("x", forceX<SimulationIslandNode>(centerX).strength(CENTERING_STRENGTH))
    .force("y", forceY<SimulationIslandNode>(centerY).strength(CENTERING_STRENGTH))
    .stop();

  for (let tick = 0; tick < SIMULATION_TICKS; tick += 1) {
    simulation.tick();
  }

  return nodes.map((node, index) => {
    const simulated = simulationNodes[index];
    const bound = simulated.radius + ISLAND_EDGE_PADDING;
    const maxX = Math.max(bound, width - bound);
    const maxY = Math.max(bound, height - bound);
    return {
      ...node,
      radius: round(simulated.radius),
      x: round(Math.min(maxX, Math.max(bound, simulated.x ?? centerX))),
      y: round(Math.min(maxY, Math.max(bound, simulated.y ?? centerY))),
    };
  });
}
