import type { KeyboardEvent, ReactNode, RefObject } from "react";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  List,
  Loader2,
  Network,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { clsx } from "clsx";

import { PillarIcon } from "~/components/VibeMarketingPillarIcon";
import { RooPointCost } from "~/components/RooPointCost";
import { computeIslandLayout } from "~/lib/island-graph-layout";
import { VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS } from "~/lib/vibe-marketing-billing";
import type {
  IslandGraphNode,
  VibeMarketingIslandGraph,
  VibeMarketingTopicPillar,
} from "~/types/vibe-marketing";

const GRAPH_WIDTH = 960;
const GRAPH_HEIGHT = 620;
const MIN_GRAPH_CONTAINER_WIDTH = 640;
const MOBILE_COLLAPSED_ISLAND_COUNT = 6;
const MAP_VISIBLE_LABEL_COUNT = 8;
const MAP_LABEL_LINE_LENGTH = 18;

// Mirrors ISLAND_COLOR_KEYS in mlai-backend `content_factory/content_islands.py`.
const ISLAND_NODE_COLORS: Record<string, string> = {
  green: "#10b981",
  purple: "#6d28d9",
  blue: "#2563eb",
  orange: "#f97316",
  teal: "#14b8a6",
  rose: "#f43f5e",
  amber: "#f59e0b",
  indigo: "#6366f1",
  cyan: "#06b6d4",
  lime: "#84cc16",
};

function islandColor(colorKey: string | null | undefined): string {
  return (colorKey ? ISLAND_NODE_COLORS[colorKey] : undefined) ?? ISLAND_NODE_COLORS.purple;
}

// Locale-free so server and client markup match byte for byte.
function formatMetric(value: number): string {
  const rounded = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  return String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function truncateText(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trimEnd()}…` : value;
}

/** Keeps map labels readable without reducing every island name to one ambiguous fragment. */
export function wrapIslandLabel(name: string): string[] {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return ["Untitled island"];

  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= MAP_LABEL_LINE_LENGTH) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
  }
  if (current) lines.push(current);

  if (lines.length <= 2) return lines.map((line) => truncateText(line, MAP_LABEL_LINE_LENGTH + 1));
  return [
    truncateText(lines[0], MAP_LABEL_LINE_LENGTH + 1),
    truncateText(lines.slice(1).join(" "), MAP_LABEL_LINE_LENGTH + 1),
  ];
}

interface MapLabelNode {
  slug: string;
  name: string;
  x: number;
  y: number;
  radius: number;
}

interface MapLabelLayout {
  centerX: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
}

interface LabelRectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function labelRectangle(layout: MapLabelLayout): LabelRectangle {
  return {
    left: layout.centerX - layout.width / 2,
    right: layout.centerX + layout.width / 2,
    top: layout.y,
    bottom: layout.y + layout.height,
  };
}

function rectanglesOverlap(left: LabelRectangle, right: LabelRectangle, padding = 5): boolean {
  return !(
    left.right + padding <= right.left ||
    right.right + padding <= left.left ||
    left.bottom + padding <= right.top ||
    right.bottom + padding <= left.top
  );
}

function rectangleTouchesCircle(rectangle: LabelRectangle, node: MapLabelNode): boolean {
  const nearestX = Math.max(rectangle.left, Math.min(node.x, rectangle.right));
  const nearestY = Math.max(rectangle.top, Math.min(node.y, rectangle.bottom));
  return Math.hypot(node.x - nearestX, node.y - nearestY) < node.radius + 5;
}

/** Places labels around the force layout using the least-crowded side of each circle. */
export function computeIslandLabelLayouts(
  nodes: MapLabelNode[],
  width = GRAPH_WIDTH,
  height = GRAPH_HEIGHT,
): Map<string, MapLabelLayout> {
  const layouts = new Map<string, MapLabelLayout>();
  const placedRectangles: LabelRectangle[] = [];
  const ordered = [...nodes].sort((left, right) => {
    const radiusOrder = right.radius - left.radius;
    if (radiusOrder) return radiusOrder;
    return left.slug < right.slug ? -1 : left.slug > right.slug ? 1 : 0;
  });

  for (const node of ordered) {
    const lines = wrapIslandLabel(node.name);
    const labelWidth = Math.min(
      150,
      Math.max(82, Math.max(...lines.map((line) => line.length)) * 7 + 16),
    );
    const labelHeight = lines.length * 17 + 10;
    const gap = 10;
    const below: MapLabelLayout = {
      centerX: node.x,
      y: node.y + node.radius + gap,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const above: MapLabelLayout = {
      centerX: node.x,
      y: node.y - node.radius - labelHeight - gap,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const right: MapLabelLayout = {
      centerX: node.x + node.radius + gap + labelWidth / 2,
      y: node.y - labelHeight / 2,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const left: MapLabelLayout = {
      centerX: node.x - node.radius - gap - labelWidth / 2,
      y: node.y - labelHeight / 2,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const diagonalOffset = node.radius * 0.72 + gap;
    const upperRight: MapLabelLayout = {
      centerX: node.x + diagonalOffset + labelWidth / 2,
      y: node.y - diagonalOffset - labelHeight,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const upperLeft: MapLabelLayout = {
      centerX: node.x - diagonalOffset - labelWidth / 2,
      y: node.y - diagonalOffset - labelHeight,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const lowerRight: MapLabelLayout = {
      centerX: node.x + diagonalOffset + labelWidth / 2,
      y: node.y + diagonalOffset,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const lowerLeft: MapLabelLayout = {
      centerX: node.x - diagonalOffset - labelWidth / 2,
      y: node.y + diagonalOffset,
      width: labelWidth,
      height: labelHeight,
      lines,
    };
    const candidates = node.y > height * 0.68
      ? [above, upperRight, upperLeft, right, left, lowerRight, lowerLeft, below]
      : node.y < height * 0.28
        ? [below, lowerRight, lowerLeft, right, left, upperRight, upperLeft, above]
        : [below, above, lowerRight, lowerLeft, upperRight, upperLeft, right, left];

    let best = candidates[0];
    let bestScore = Number.POSITIVE_INFINITY;
    for (const [candidateIndex, candidate] of candidates.entries()) {
      const rectangle = labelRectangle(candidate);
      const overflow =
        Math.max(0, 6 - rectangle.left) +
        Math.max(0, rectangle.right - width + 6) +
        Math.max(0, 6 - rectangle.top) +
        Math.max(0, rectangle.bottom - height + 6);
      const labelCollisions = placedRectangles.filter((placed) => rectanglesOverlap(rectangle, placed)).length;
      const circleCollisions = nodes.filter(
        (other) => other.slug !== node.slug && rectangleTouchesCircle(rectangle, other),
      ).length;
      const score = overflow * 1000 + labelCollisions * 10000 + circleCollisions * 5000 + candidateIndex;
      if (score < bestScore) {
        best = candidate;
        bestScore = score;
      }
    }

    layouts.set(node.slug, best);
    placedRectangles.push(labelRectangle(best));
  }

  return layouts;
}

function islandAccessibleLabel(node: IslandGraphNode): string {
  const articleLabel = node.articlesWritten === 1 ? "article" : "articles";
  return `${node.name}: ${formatMetric(node.keywordCount)} keywords, ${formatMetric(node.totalVolume)} monthly searches, opportunity score ${formatMetric(node.opportunityScore)}, ${formatMetric(node.aiSearchVolume)} AI searches, ${formatMetric(node.articlesWritten)} ${articleLabel} written. Select to review this island.`;
}

export interface VibeMarketingIslandGraphProps {
  graph: VibeMarketingIslandGraph;
  pillars: VibeMarketingTopicPillar[];
  submitting: boolean;
  generatingPillarSlug?: string | null;
  confirmingPillarSlug?: string | null;
  activePillarSlug: string | null;
  customNotice: boolean;
  helpOpen: boolean;
  helpRef: RefObject<HTMLDivElement | null>;
  onGenerate: (pillar: VibeMarketingTopicPillar) => void;
  onSelectIsland: (slug: string | null) => void;
  onAddCustomPillar: () => void;
  /** Shared with the no-graph fallback so both variants carry the same section header. */
  header?: ReactNode;
  /** Used by focused rendering tests; normal product behavior starts in map view. */
  defaultView?: "map" | "list";
}

export default function VibeMarketingIslandGraph({
  graph,
  pillars,
  submitting,
  generatingPillarSlug,
  confirmingPillarSlug,
  activePillarSlug,
  customNotice,
  helpOpen,
  helpRef,
  onGenerate,
  onSelectIsland,
  onAddCustomPillar,
  header,
  defaultView = "map",
}: VibeMarketingIslandGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [view, setView] = useState<"map" | "list">(defaultView);
  const [listExpanded, setListExpanded] = useState(false);
  const [pointerDevice, setPointerDevice] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);

  // `lazy()` is not a client boundary under streaming SSR, so every browser API needs an
  // explicit guard: the server renders the wide layout and the observer only runs after mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = containerRef.current;
    if (!element) return;
    const measure = () => setContainerWidth(element.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setPointerDevice(query.matches);
    const listener = (event: MediaQueryListEvent) => setPointerDevice(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  const positioned = useMemo(
    () => computeIslandLayout(graph.nodes, graph.edges, GRAPH_WIDTH, GRAPH_HEIGHT),
    [graph.edges, graph.nodes],
  );
  const positionBySlug = useMemo(
    () => new Map(positioned.map((node) => [node.slug, node])),
    [positioned],
  );
  const labelBySlug = useMemo(
    () => computeIslandLabelLayouts(positioned),
    [positioned],
  );
  const pillarBySlug = useMemo(
    () => new Map(pillars.map((pillar) => [pillar.slug, pillar])),
    [pillars],
  );
  const selectedNode = useMemo(
    () => graph.nodes.find((node) => node.slug === activePillarSlug) ?? null,
    [activePillarSlug, graph.nodes],
  );
  const hoveredNode = useMemo(
    () => (hoveredSlug ? graph.nodes.find((node) => node.slug === hoveredSlug) ?? null : null),
    [graph.nodes, hoveredSlug],
  );
  const sortedNodes = useMemo(
    () => [...graph.nodes].sort((left, right) => {
      const leftScore = Number.isFinite(left.opportunityScore) ? left.opportunityScore : 0;
      const rightScore = Number.isFinite(right.opportunityScore) ? right.opportunityScore : 0;
      return rightScore - leftScore;
    }),
    [graph.nodes],
  );
  const persistentLabelSlugs = useMemo(
    () => new Set(sortedNodes.slice(0, MAP_VISIBLE_LABEL_COUNT).map((node) => node.slug)),
    [sortedNodes],
  );

  const generating = Boolean(generatingPillarSlug);
  const busy = submitting || generating;
  const narrow = containerWidth !== null && containerWidth < MIN_GRAPH_CONTAINER_WIDTH;
  const effectiveView = narrow ? "list" : view;
  const visibleListNodes = useMemo(() => {
    if (!narrow || listExpanded) return sortedNodes;
    const topNodes = sortedNodes.slice(0, MOBILE_COLLAPSED_ISLAND_COUNT);
    if (!selectedNode || topNodes.some((node) => node.slug === selectedNode.slug)) return topNodes;
    return [...topNodes, selectedNode];
  }, [listExpanded, narrow, selectedNode, sortedNodes]);
  const selectedPillar = selectedNode ? pillarBySlug.get(selectedNode.slug) ?? null : null;
  const selectedConfirming = Boolean(selectedNode && confirmingPillarSlug === selectedNode.slug);
  const selectedGenerating = Boolean(selectedNode && generatingPillarSlug === selectedNode.slug);

  const selectIsland = useCallback(
    (slug: string) => {
      if (!pillarBySlug.has(slug) || busy) return;
      onSelectIsland(slug);
    },
    [busy, onSelectIsland, pillarBySlug],
  );

  const handleMapKeyDown = useCallback(
    (event: KeyboardEvent<SVGGElement>, slug: string) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectIsland(slug);
    },
    [selectIsland],
  );

  const emphasisSlug = hoveredSlug ?? focusedSlug ?? activePillarSlug;
  const emphasizedSlugs = useMemo(() => {
    if (!emphasisSlug) return null;
    const slugs = new Set([emphasisSlug]);
    for (const edge of graph.edges) {
      if (edge.source === emphasisSlug) slugs.add(edge.target);
      if (edge.target === emphasisSlug) slugs.add(edge.source);
    }
    return slugs;
  }, [emphasisSlug, graph.edges]);

  const emergingCaption = graph.emergingCount > 0
    ? `${formatMetric(graph.emergingCount)} island${graph.emergingCount === 1 ? "" : "s"} forming`
    : null;
  const graphLabel = `Content island map: ${graph.nodes
    .map((node) => node.name)
    .join(", ")}. Circle size shows opportunity, lines show related islands.`;

  const selectedPanel = selectedNode ? (
    <SelectedIslandPanel
      node={selectedNode}
      pillar={selectedPillar}
      confirming={selectedConfirming}
      generating={selectedGenerating}
      busy={busy}
      onClose={() => onSelectIsland(null)}
      onGenerate={() => {
        if (selectedPillar) onGenerate(selectedPillar);
      }}
    />
  ) : null;

  return (
    <div ref={containerRef}>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-5 pb-0 sm:p-6 sm:pb-0">{header}</div>

        <div className="mt-5 border-y border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-600">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                {formatMetric(graph.nodes.length)} active island{graph.nodes.length === 1 ? "" : "s"}
              </span>
              {emergingCaption ? (
                <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-violet-700">
                  {emergingCaption}
                </span>
              ) : null}
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                Ranked by opportunity
              </span>
            </div>

            {!narrow ? (
              <div className="inline-flex w-fit rounded-xl border border-slate-200 bg-white p-1 shadow-sm" aria-label="Content island view">
                <ViewButton active={effectiveView === "map"} onClick={() => setView("map")}>
                  <Network className="h-4 w-4" />
                  Map
                </ViewButton>
                <ViewButton active={effectiveView === "list"} onClick={() => setView("list")}>
                  <List className="h-4 w-4" />
                  List
                </ViewButton>
              </div>
            ) : null}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {effectiveView === "map" ? (
            <>
              <div className="mb-3 flex items-start gap-2 rounded-xl bg-violet-50 px-3 py-2.5 text-sm font-bold leading-5 text-violet-800">
                <CircleHelp className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Top opportunities are labelled. Select any island to compare audience demand. Browsing is free.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f8fafc_72%)] shadow-inner">
                <svg
                  viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
                  className="h-auto w-full"
                  preserveAspectRatio="xMidYMid meet"
                  role="group"
                  aria-label={graphLabel}
                >
                  {graph.edges.map((edge) => {
                    const source = positionBySlug.get(edge.source);
                    const target = positionBySlug.get(edge.target);
                    if (!source || !target) return null;
                    const emphasized = Boolean(
                      emphasisSlug && (edge.source === emphasisSlug || edge.target === emphasisSlug),
                    );
                    return (
                      <line
                        key={`${edge.source}--${edge.target}`}
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={emphasized ? "#8b5cf6" : "#94a3b8"}
                        strokeWidth={emphasized ? 3 : 1.5}
                        opacity={emphasisSlug ? (emphasized ? 0.82 : 0.14) : 0.4 + 0.35 * edge.similarity}
                      />
                    );
                  })}

                  {positioned.map((node) => {
                    const color = islandColor(node.colorKey);
                    const selected = node.slug === activePillarSlug;
                    const emphasized = !emphasizedSlugs || emphasizedSlugs.has(node.slug);
                    const showLabel = persistentLabelSlugs.has(node.slug) || emphasisSlug === node.slug;
                    const iconSize = Math.max(18, Math.round(node.radius * 0.62));
                    const label = labelBySlug.get(node.slug);
                    if (!label) return null;
                    return (
                      <g
                        key={node.slug}
                        role="button"
                        tabIndex={busy ? -1 : 0}
                        aria-disabled={busy || undefined}
                        aria-pressed={selected}
                        aria-label={islandAccessibleLabel(node)}
                        aria-controls={selected ? "selected-content-island" : undefined}
                        className="cursor-pointer outline-none transition-opacity focus-visible:[&>circle.island-focus]:opacity-100"
                        opacity={emphasized ? 1 : 0.4}
                        onClick={() => selectIsland(node.slug)}
                        onKeyDown={(event) => handleMapKeyDown(event, node.slug)}
                        onFocus={() => setFocusedSlug(node.slug)}
                        onBlur={() => setFocusedSlug((current) => (current === node.slug ? null : current))}
                        onMouseEnter={() => setHoveredSlug(node.slug)}
                        onMouseLeave={() => setHoveredSlug((current) => (current === node.slug ? null : current))}
                      >
                        <title>{islandAccessibleLabel(node)}</title>
                        <circle
                          className="island-focus opacity-0"
                          cx={node.x}
                          cy={node.y}
                          r={node.radius + 10}
                          fill="none"
                          stroke="#7c3aed"
                          strokeWidth={4}
                        />
                        {selected ? (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.radius + 7}
                            fill="none"
                            stroke="#7c3aed"
                            strokeWidth={3}
                          />
                        ) : null}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={Math.max(node.radius + 5, 27)}
                          fill="transparent"
                        />
                        <circle cx={node.x} cy={node.y} r={node.radius} fill={color} opacity={0.94} />
                        <PillarIcon
                          iconKey={node.iconKey}
                          x={node.x - iconSize / 2}
                          y={node.y - iconSize / 2}
                          width={iconSize}
                          height={iconSize}
                          color="#ffffff"
                          strokeWidth={2.25}
                        />
                        {node.isNew ? (
                          <circle
                            cx={node.x + node.radius * 0.68}
                            cy={node.y - node.radius * 0.68}
                            r={7}
                            fill="#7c3aed"
                            stroke="#ffffff"
                            strokeWidth={3}
                          />
                        ) : null}
                        {showLabel ? (
                          <>
                            <rect
                              x={label.centerX - label.width / 2}
                              y={label.y}
                              width={label.width}
                              height={label.height}
                              rx={7}
                              fill="#ffffff"
                              opacity={0.92}
                            />
                            <text
                              x={label.centerX}
                              y={label.y + 17}
                              textAnchor="middle"
                              fontSize={13}
                              fontWeight={800}
                              fill="#1e293b"
                            >
                              {label.lines.map((line, index) => (
                                <tspan key={`${node.slug}-${line}`} x={label.centerX} dy={index === 0 ? 0 : 17}>
                                  {line}
                                </tspan>
                              ))}
                            </text>
                          </>
                        ) : null}
                      </g>
                    );
                  })}

                  {pointerDevice && hoveredNode ? (
                    <IslandTooltip node={hoveredNode} position={positionBySlug.get(hoveredNode.slug)} />
                  ) : null}
                </svg>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500" aria-label="Map legend">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-slate-300" aria-hidden="true" />
                  Bigger circle = higher opportunity
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-slate-400" aria-hidden="true" />
                  Line = related audience
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-600 ring-2 ring-violet-100" aria-hidden="true" />
                  New this cycle
                </span>
              </div>

              {selectedPanel ?? (
                <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center text-sm font-bold text-slate-500">
                  Select any island to see its description, search demand, and article opportunity.
                </div>
              )}
            </>
          ) : (
            <div aria-label="Content islands ranked by opportunity">
              <div className="mb-3">
                <h3 className="text-sm font-black text-slate-900">Browse your strongest opportunities</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Select an island for the full breakdown. Browsing does not use Roo Points.
                </p>
              </div>
              <div className="space-y-3">
                {visibleListNodes.map((node, index) => {
                  const selected = node.slug === activePillarSlug;
                  return (
                    <Fragment key={node.slug}>
                      <button
                        type="button"
                        onClick={() => selectIsland(node.slug)}
                        disabled={busy}
                        aria-expanded={selected}
                        aria-controls={selected ? "selected-content-island" : undefined}
                        className={clsx(
                          "group w-full rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60",
                          selected
                            ? "border-violet-300 bg-violet-50/60 shadow-sm"
                            : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                            style={{ backgroundColor: islandColor(node.colorKey) }}
                          >
                            <PillarIcon iconKey={node.iconKey} className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-black leading-5 text-slate-950">
                                <span className="mr-1.5 text-slate-400">#{index + 1}</span>
                                {node.name}
                              </span>
                              {node.isNew ? (
                                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-violet-700">
                                  New
                                </span>
                              ) : null}
                            </span>
                            {node.description ? (
                              <span className="mt-1 hidden line-clamp-2 text-xs font-semibold leading-5 text-slate-500 sm:block">
                                {node.description}
                              </span>
                            ) : null}
                          </span>
                          <ArrowRight
                            className={clsx(
                              "mt-2 h-4 w-4 shrink-0 transition",
                              selected ? "text-violet-700" : "text-slate-400 group-hover:text-violet-600",
                            )}
                          />
                        </div>
                        <span className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
                          <ListMetric label="Searches/mo" value={formatMetric(node.totalVolume)} />
                          <ListMetric label="Opportunity" value={formatMetric(node.opportunityScore)} />
                          <ListMetric label="Articles" value={formatMetric(node.articlesWritten)} />
                        </span>
                      </button>
                      {selected ? selectedPanel : null}
                    </Fragment>
                  );
                })}
              </div>

              {narrow && sortedNodes.length > MOBILE_COLLAPSED_ISLAND_COUNT ? (
                <button
                  type="button"
                  onClick={() => setListExpanded((expanded) => !expanded)}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-100"
                >
                  {listExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {listExpanded ? "Show fewer islands" : `Show all ${formatMetric(sortedNodes.length)} islands`}
                </button>
              ) : null}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-slate-900">Need a different content theme?</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                Use the Custom topic tab above for a one-off idea while custom islands are being built.
              </p>
            </div>
            <button
              type="button"
              onClick={onAddCustomPillar}
              aria-describedby="custom-island-status"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 bg-white px-4 text-sm font-black text-violet-700 transition hover:bg-violet-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-100"
            >
              <Plus className="h-4 w-4" />
              Custom island
              <span id="custom-island-status" className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                Coming soon
              </span>
            </button>
          </div>

          {helpOpen || customNotice ? (
            <div
              ref={helpRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="mt-4 rounded-xl border border-violet-100 bg-violet-50 px-4 py-4 text-sm font-semibold leading-6 text-violet-800 outline-none transition focus:ring-4 focus:ring-violet-100"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                <div>
                  <p className="font-black">How content islands work</p>
                  <p className="mt-1">
                    Each island is a broad audience theme containing many specific article ideas. Larger circles have more search opportunity; connecting lines show overlapping audiences.
                  </p>
                  {customNotice ? (
                    <p className="mt-2 font-bold">
                      Custom island creation is coming soon. Choose the Custom topic tab above to research a one-off article idea now.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ViewButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
        active ? "bg-violet-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      {children}
    </button>
  );
}

function ListMetric({ label, value }: { label: string; value: string }) {
  return (
    <span className="min-w-0">
      <span className="block truncate text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</span>
      <span className="mt-0.5 block text-xs font-black text-slate-800">{value}</span>
    </span>
  );
}

function SelectedIslandPanel({
  node,
  pillar,
  confirming,
  generating,
  busy,
  onClose,
  onGenerate,
}: {
  node: IslandGraphNode;
  pillar: VibeMarketingTopicPillar | null;
  confirming: boolean;
  generating: boolean;
  busy: boolean;
  onClose: () => void;
  onGenerate: () => void;
}) {
  return (
    <article
      id="selected-content-island"
      aria-live="polite"
      className="mt-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
          style={{ backgroundColor: islandColor(node.colorKey) }}
        >
          <PillarIcon iconKey={node.iconKey} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black text-slate-950">{node.name}</h3>
            {node.isNew ? (
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-violet-700">
                New
              </span>
            ) : null}
          </div>
          {node.description ? (
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{node.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${node.name} details`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <IslandMetric label="Keywords" value={formatMetric(node.keywordCount)} />
        <IslandMetric label="Searches / month" value={formatMetric(node.totalVolume)} />
        <IslandMetric label="Opportunity" value={formatMetric(node.opportunityScore)} />
        <IslandMetric label="AI searches" value={formatMetric(node.aiSearchVolume)} />
        <IslandMetric label="Articles written" value={formatMetric(node.articlesWritten)} />
      </dl>

      <div className="mt-4 flex flex-col gap-3 border-t border-violet-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-semibold leading-5 text-slate-500">
          {confirming ? (
            <p className="font-bold text-violet-800">
              Ready to research? Confirm below to use {VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS} Roo Point.
            </p>
          ) : (
            <p>Reviewing an island is free. Roo Points are only used after you confirm generation.</p>
          )}
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={busy || !pillar}
          aria-label={
            confirming
              ? `Confirm topic idea generation for ${node.name} for ${VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS} Roo Point`
              : `Generate topic ideas for ${node.name}`
          }
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-700 bg-violet-700 px-4 text-sm font-black text-white shadow-sm transition hover:border-violet-800 hover:bg-violet-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Researching ideas…
            </>
          ) : confirming ? (
            <>
              <Check className="h-4 w-4" />
              Confirm
              <RooPointCost points={-VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS} />
            </>
          ) : (
            <>
              Generate topic ideas
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </article>
  );
}

function IslandMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/80 bg-white/80 px-3 py-2.5 shadow-sm">
      <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-black text-slate-900">{value}</dd>
    </div>
  );
}

const TOOLTIP_WIDTH = 232;
const TOOLTIP_HEIGHT = 122;

function IslandTooltip({
  node,
  position,
}: {
  node: IslandGraphNode;
  position: { x: number; y: number; radius: number } | undefined;
}) {
  if (!position) return null;
  const x = Math.min(GRAPH_WIDTH - TOOLTIP_WIDTH - 8, Math.max(8, position.x - TOOLTIP_WIDTH / 2));
  const preferredY = position.y - position.radius - TOOLTIP_HEIGHT - 14;
  const y = preferredY >= 8
    ? preferredY
    : Math.min(GRAPH_HEIGHT - TOOLTIP_HEIGHT - 8, position.y + position.radius + 14);
  const rows = [
    `Keywords: ${formatMetric(node.keywordCount)}`,
    `Monthly searches: ${formatMetric(node.totalVolume)}`,
    `Opportunity: ${formatMetric(node.opportunityScore)}`,
    `AI searches: ${formatMetric(node.aiSearchVolume)}`,
    `Articles written: ${formatMetric(node.articlesWritten)}`,
  ];
  return (
    <g pointerEvents="none">
      <rect
        x={x}
        y={y}
        width={TOOLTIP_WIDTH}
        height={TOOLTIP_HEIGHT}
        rx={12}
        fill="#0f172a"
        opacity={0.96}
      />
      <text x={x + 12} y={y + 22} fontSize={12} fontWeight={800} fill="#ffffff">
        {truncateText(node.name, 30)}
      </text>
      {rows.map((row, index) => (
        <text key={row} x={x + 12} y={y + 43 + index * 15} fontSize={11} fontWeight={600} fill="#cbd5e1">
          {row}
        </text>
      ))}
    </g>
  );
}
