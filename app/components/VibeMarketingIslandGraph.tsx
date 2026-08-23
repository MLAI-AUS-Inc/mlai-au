import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { clsx } from "clsx";

import { PillarIcon } from "~/components/VibeMarketingPillarIcon";
import { RooPointCost } from "~/components/RooPointCost";
import { computeIslandLayout } from "~/lib/island-graph-layout";
import { VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS } from "~/lib/vibe-marketing-billing";
import type { VibeMarketingIslandGraph, VibeMarketingTopicPillar } from "~/types/vibe-marketing";

const GRAPH_WIDTH = 900;
const GRAPH_HEIGHT = 480;

// Below this container width the graph is unreadable (12px labels, hover tooltips) and
// tapping a 26px circle is a coin flip, so the legacy cards render instead.
const MIN_GRAPH_CONTAINER_WIDTH = 640;

const LABEL_MAX_CHARS = 18;

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

function truncateLabel(name: string): string {
  return name.length > LABEL_MAX_CHARS ? `${name.slice(0, LABEL_MAX_CHARS - 1)}…` : name;
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
  onSelectIsland: (slug: string) => void;
  onAddCustomPillar: () => void;
  /** Shared with the legacy card grid so both variants carry the same section header. */
  header?: ReactNode;
  /** Rendered instead of the graph below {@link MIN_GRAPH_CONTAINER_WIDTH}. */
  narrowFallback?: ReactNode;
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
  narrowFallback,
}: VibeMarketingIslandGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [pointerDevice, setPointerDevice] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // `lazy()` is not a client boundary under streaming SSR, so every browser API needs an
  // explicit guard: the server renders the wide layout and the observer only ever runs
  // after mount.
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

  const generating = Boolean(generatingPillarSlug);
  const busy = submitting || generating;

  // The island graph and `topicPillars` are emitted from the same rows, so every node has
  // a pillar. Resolve the real one — a synthetic pillar object would dispatch a slug the
  // route action cannot re-resolve.
  const activateIsland = useCallback(
    (slug: string) => {
      const pillar = pillarBySlug.get(slug);
      if (!pillar) return;
      onSelectIsland(slug);
      onGenerate(pillar);
    },
    [onGenerate, onSelectIsland, pillarBySlug],
  );

  const narrow = containerWidth !== null && containerWidth < MIN_GRAPH_CONTAINER_WIDTH;
  if (narrow && narrowFallback) {
    return <div ref={containerRef}>{narrowFallback}</div>;
  }

  const emergingCaption =
    graph.emergingCount > 0
      ? `${formatMetric(graph.emergingCount)} island${graph.emergingCount === 1 ? "" : "s"} forming from ongoing research`
      : null;
  const selectedPillar = selectedNode ? pillarBySlug.get(selectedNode.slug) ?? null : null;
  const selectedConfirming = Boolean(selectedNode && confirmingPillarSlug === selectedNode.slug);
  const selectedGenerating = Boolean(selectedNode && generatingPillarSlug === selectedNode.slug);
  const graphLabel = `Content island map: ${graph.nodes
    .map((node) => node.name)
    .join(", ")}. Circle size shows opportunity, lines show related islands.`;

  return (
    <div ref={containerRef}>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {header}

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60">
          <svg
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            className="h-auto w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={graphLabel}
          >
            {graph.edges.map((edge) => {
              const source = positionBySlug.get(edge.source);
              const target = positionBySlug.get(edge.target);
              if (!source || !target) return null;
              return (
                <line
                  key={`${edge.source}--${edge.target}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#cbd5e1"
                  strokeWidth={1}
                  opacity={0.35 + 0.4 * edge.similarity}
                />
              );
            })}

            {positioned.map((node) => {
              const color = islandColor(node.colorKey);
              const selected = node.slug === activePillarSlug;
              const iconSize = Math.max(16, Math.round(node.radius * 0.62));
              return (
                <g
                  key={node.slug}
                  className="cursor-pointer"
                  onClick={() => activateIsland(node.slug)}
                  onMouseEnter={() => setHoveredSlug(node.slug)}
                  onMouseLeave={() => setHoveredSlug((current) => (current === node.slug ? null : current))}
                >
                  {node.isNew ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius + 8}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      opacity={0.45}
                      className="animate-pulse motion-reduce:animate-none"
                    />
                  ) : null}
                  {selected ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius + 6}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth={3}
                    />
                  ) : null}
                  <circle cx={node.x} cy={node.y} r={node.radius} fill={color} opacity={0.92} />
                  <PillarIcon
                    iconKey={node.iconKey}
                    x={node.x - iconSize / 2}
                    y={node.y - iconSize / 2}
                    width={iconSize}
                    height={iconSize}
                    color="#ffffff"
                  />
                  <text
                    x={node.x}
                    y={node.y + node.radius + 18}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="#334155"
                  >
                    {truncateLabel(node.name)}
                  </text>
                  {node.isNew ? (
                    <g>
                      <rect
                        x={node.x - 20}
                        y={node.y - node.radius - 24}
                        width={40}
                        height={18}
                        rx={9}
                        fill="#7c3aed"
                      />
                      <text
                        x={node.x}
                        y={node.y - node.radius - 11}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={800}
                        fill="#ffffff"
                      >
                        NEW
                      </text>
                    </g>
                  ) : null}
                </g>
              );
            })}

            {pointerDevice && hoveredNode ? <IslandTooltip node={hoveredNode} position={positionBySlug.get(hoveredNode.slug)} /> : null}
          </svg>
        </div>

        <ul className="sr-only">
          {graph.nodes.map((node) => (
            <li key={node.slug}>
              <button type="button" onClick={() => activateIsland(node.slug)} disabled={busy}>
                {`${node.name}: ${formatMetric(node.keywordCount)} keywords, ${formatMetric(node.totalVolume)} monthly searches, opportunity score ${formatMetric(node.opportunityScore)}, ${formatMetric(node.aiSearchVolume)} AI searches, ${formatMetric(node.articlesWritten)} articles written. Generate topic ideas.`}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
          <span>Circle size shows opportunity</span>
          <span aria-hidden="true">·</span>
          <span>Lines connect related islands</span>
          {emergingCaption ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-violet-600">{emergingCaption}</span>
            </>
          ) : null}
        </div>

        {selectedNode ? (
          <article className="mt-5 rounded-xl border border-violet-200 bg-violet-50/40 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                    style={{ backgroundColor: islandColor(selectedNode.colorKey) }}
                  >
                    <PillarIcon iconKey={selectedNode.iconKey} className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-black text-slate-950">{selectedNode.name}</h3>
                </div>
                {selectedNode.description ? (
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{selectedNode.description}</p>
                ) : null}
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  <IslandMetric label="Keywords" value={formatMetric(selectedNode.keywordCount)} />
                  <IslandMetric label="Monthly searches" value={formatMetric(selectedNode.totalVolume)} />
                  <IslandMetric label="Opportunity" value={formatMetric(selectedNode.opportunityScore)} />
                  <IslandMetric label="AI searches" value={formatMetric(selectedNode.aiSearchVolume)} />
                  <IslandMetric label="Articles written" value={formatMetric(selectedNode.articlesWritten)} />
                </dl>
              </div>
              <button
                type="button"
                onClick={() => activateIsland(selectedNode.slug)}
                disabled={busy || !selectedPillar}
                aria-label={
                  selectedConfirming
                    ? `Generate topic ideas for ${VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS} Roo Point`
                    : `Generate topic ideas for ${selectedNode.name}`
                }
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-700 bg-violet-700 px-4 text-sm font-black text-white shadow-violet-100 transition hover:border-violet-800 hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {selectedGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    loading
                  </>
                ) : selectedConfirming ? (
                  <>
                    <RooPointCost points={-VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS} />
                    <span aria-hidden="true">?</span>
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </article>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onAddCustomPillar}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-violet-300 hover:bg-violet-50/30"
          >
            <Plus className="h-4 w-4 text-violet-600" />
            Add custom content island
          </button>
        </div>

        <div
          ref={helpRef}
          tabIndex={-1}
          className={clsx(
            "mt-5 rounded-lg bg-violet-50 px-4 py-3 text-sm font-black text-violet-700 outline-none transition focus:ring-4 focus:ring-violet-100",
            helpOpen ? "ring-1 ring-violet-100" : "",
          )}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 shrink-0 text-violet-500" />
            <p>Content islands organize broad themes. Each content island contains many specific article ideas.</p>
          </div>
          {customNotice ? (
            <p className="mt-3 pl-8 text-sm font-bold text-violet-600">
              Custom content island creation is not available yet. Use the Custom topic tab above for one-off article ideas.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function IslandMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-black text-slate-900">{value}</dd>
    </div>
  );
}

const TOOLTIP_WIDTH = 216;
const TOOLTIP_HEIGHT = 118;

function IslandTooltip({
  node,
  position,
}: {
  node: VibeMarketingIslandGraph["nodes"][number];
  position: { x: number; y: number; radius: number } | undefined;
}) {
  if (!position) return null;
  const x = Math.min(GRAPH_WIDTH - TOOLTIP_WIDTH - 8, Math.max(8, position.x - TOOLTIP_WIDTH / 2));
  const y = Math.max(8, position.y - position.radius - TOOLTIP_HEIGHT - 12);
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
        rx={10}
        fill="#0f172a"
        opacity={0.94}
      />
      <text x={x + 12} y={y + 22} fontSize={12} fontWeight={800} fill="#ffffff">
        {truncateLabel(node.name)}
      </text>
      {rows.map((row, index) => (
        <text key={row} x={x + 12} y={y + 42 + index * 15} fontSize={11} fontWeight={600} fill="#cbd5e1">
          {row}
        </text>
      ))}
    </g>
  );
}
