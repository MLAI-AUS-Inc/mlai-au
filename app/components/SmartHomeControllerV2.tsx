import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  ArrowRightLeft,
  Battery,
  BatteryCharging,
  Bot,
  Brain,
  Calendar,
  Car,
  ChevronDown,
  CloudSun,
  Clock,
  Gem,
  GripVertical,
  Hand,
  Plus,
  PlugZap,
  Rocket,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { wattClasses } from "~/lib/watt-theme";
import type { DeployFeedback } from "~/components/SmartHomeController";
import {
  PIPELINE,
  PIPELINE_BY_TYPE,
  PALETTE,
  compilePipeline,
  emptyPipeline,
  isComplete,
  type BlockDef,
  type PlacedPipeline,
  type SlotDef,
  type SlotType,
} from "~/lib/smart-home-pipeline";

/**
 * v2.1 — game-board styling to match the draft.
 * - Palette (right) = plain rectangular cards w/ icon + drag handle (no shaping there).
 * - Slots are shaped per type (input tab / action arrow / rounded schedule+brain / output pill).
 * - The DragOverlay renders the *slot shape* of the dragged block, so the piece you drag
 *   visibly matches the hole it drops into.
 */

const ICON: Record<string, LucideIcon> = {
  in_smart_meter: Wifi,
  in_temp: Thermometer,
  in_weather: CloudSun,
  sc_time: Clock,
  sc_day: Calendar,
  sc_price: TrendingUp,
  br_chatgpt: Bot,
  br_claude: Sparkles,
  br_gemini: Gem,
  ac_shift: ArrowRightLeft,
  ac_reduce: TrendingDown,
  ac_charge: BatteryCharging,
  ou_plugs: PlugZap,
  ou_battery: Battery,
  ou_ev: Car,
  sa_manual: Hand,
  sa_budget: ShieldCheck,
};

type ShapeKind = "tab" | "arrow" | "rounded" | "pill";

const SHAPE_KIND: Record<SlotType, ShapeKind> = {
  input: "tab",
  schedule: "rounded",
  brain: "rounded",
  action: "arrow",
  output: "pill",
  safety: "rounded",
};

// SVG silhouettes (viewBox 0..100, stretched to the slot box). Only the non-rectangular
// shapes need SVG; rounded/pill use a plain CSS rounded border.
const SVG_PATH: Record<"tab" | "arrow", string> = {
  tab: "M2,3 H80 V36 H98 V64 H80 V97 H2 Z", // rectangle with a connector tab on the right
  arrow: "M2,3 H82 L98,50 L82,97 H2 L14,50 Z", // right-pointing arrow with a concave tail
};

type ShapeVariant = "empty" | "filled";

function ShapeBox({ type, variant, children }: { type: SlotType; variant: ShapeVariant; children: ReactNode }) {
  const accent = PIPELINE_BY_TYPE[type].accent;
  const kind = SHAPE_KIND[type];

  if (kind === "tab" || kind === "arrow") {
    return (
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            d={SVG_PATH[kind]}
            fill={variant === "empty" ? `${accent}10` : "#fffefa"}
            stroke={accent}
            strokeWidth={2}
            strokeDasharray={variant === "empty" ? "5 4" : "0"}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">{children}</div>
      </div>
    );
  }

  const radius = kind === "pill" ? "rounded-[1.5rem]" : "rounded-[1rem]";
  return (
    <div
      className={`flex h-full w-full items-center justify-center px-4 text-center ${radius} border-2 ${variant === "empty" ? "border-dashed" : ""}`}
      style={{ borderColor: accent, background: variant === "empty" ? `${accent}10` : "#fffefa" }}
    >
      {children}
    </div>
  );
}

function FilledContent({ block }: { block: BlockDef }) {
  const Icon = ICON[block.id] ?? Plus;
  const accent = PIPELINE_BY_TYPE[block.type].accent;
  return (
    <span className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} />
      <span className="truncate text-sm font-black text-[#121e16]">{block.label}</span>
    </span>
  );
}

function EmptyContent({ slot }: { slot: SlotDef }) {
  const Icon = slot.type === "brain" ? Brain : Plus;
  const label = slot.type === "safety" ? "Add a safety block" : `Add ${slot.type}`;
  return (
    <span className="flex flex-col items-center gap-1 text-xs font-bold" style={{ color: slot.accent }}>
      <Icon className={slot.type === "brain" ? "h-7 w-7" : "h-5 w-5"} />
      <span>{label}</span>
    </span>
  );
}

type PlacedCells = Record<SlotType, Array<BlockDef | null>>;

function makeEmptyCells(): PlacedCells {
  return Object.fromEntries(PIPELINE.map((slot) => [slot.type, Array(slot.max).fill(null)])) as PlacedCells;
}

function SlotCell({
  slot,
  index,
  block,
  activeType,
  onRemove,
}: {
  slot: SlotDef;
  index: number;
  block: BlockDef | null;
  activeType: SlotType | null;
  onRemove: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `${slot.type}#${index}`, data: { slotType: slot.type } });
  const isTarget = activeType === slot.type;
  const dimmed = activeType !== null && !isTarget;

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[4.5rem] flex-1 transition ${dimmed ? "opacity-35" : ""}`}
    >
      <div
        className={`h-full w-full rounded-[1rem] transition ${isTarget && !block ? "animate-pulse" : ""}`}
        style={isTarget ? ({ filter: `drop-shadow(0 0 0.45rem ${slot.accent}66)` } as CSSProperties) : undefined}
      >
        <ShapeBox type={slot.type} variant={block ? "filled" : "empty"}>
          {block ? <FilledContent block={block} /> : <EmptyContent slot={slot} />}
        </ShapeBox>
      </div>
      {block && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${block.label}`}
          className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#e8dfcf] bg-[#fffefa] text-xs text-[#9f2f28] shadow-sm hover:bg-[#fff1ef]"
        >
          &times;
        </button>
      )}
    </div>
  );
}

function FlowColumn({
  slot,
  cells,
  activeType,
  onRemove,
}: {
  slot: SlotDef;
  cells: Array<BlockDef | null>;
  activeType: SlotType | null;
  onRemove: (index: number) => void;
}) {
  const single = slot.max === 1;
  return (
    <div className="flex min-w-[8rem] flex-1 flex-col">
      <div className="mb-3 text-center">
        <div className="text-[13px] font-black uppercase tracking-[0.1em]" style={{ color: slot.accent }}>{slot.label}</div>
        <div className="text-[11px] font-bold text-[#8a8477]">{slot.min === 0 ? "Optional" : single ? "Add 1" : `Add up to ${slot.max}`}</div>
      </div>
      <div className={`flex flex-1 flex-col gap-3 ${single ? "justify-center" : ""}`}>
        {cells.map((block, index) => (
          <SlotCell key={index} slot={slot} index={index} block={block} activeType={activeType} onRemove={() => onRemove(index)} />
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="relative mt-12 w-5 self-stretch" aria-hidden>
      <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dotted border-[#d8cfbd]" />
    </div>
  );
}

function PaletteCard({ block }: { block: BlockDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `pal#${block.id}`, data: { block } });
  const accent = PIPELINE_BY_TYPE[block.type].accent;
  const Icon = ICON[block.id] ?? Plus;
  return (
    <div
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="flex w-full cursor-grab touch-none items-center gap-3 rounded-[0.8rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 shadow-sm transition hover:shadow-md active:cursor-grabbing"
      {...listeners}
      {...attributes}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accent}1a`, color: accent }}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-[#121e16]">{block.label}</span>
        <span className="block truncate text-[11px] font-medium text-[#64705f]">{block.blurb}</span>
      </span>
      <GripVertical className="h-4 w-4 shrink-0 text-[#c9b98f]" />
    </div>
  );
}

const HOW_IT_WORKS = [
  { n: 1, title: "Add Inputs", desc: "Sensors and data sources from your home.", Icon: Wifi },
  { n: 2, title: "Set the Schedule", desc: "Define when rules should run.", Icon: Clock },
  { n: 3, title: "Choose a Brain", desc: "AI agent that makes decisions.", Icon: Brain },
  { n: 4, title: "Add Actions", desc: "What the system should do.", Icon: ArrowRightLeft },
  { n: 5, title: "Get Outputs", desc: "Devices and systems that respond.", Icon: PlugZap },
];

export function SmartHomeControllerV2({
  onDeploy,
  isDeploying,
  feedback,
}: {
  onDeploy: (blockIds: string[]) => void;
  isDeploying: boolean;
  feedback: DeployFeedback;
}) {
  const [cells, setCells] = useState<PlacedCells>(makeEmptyCells);
  const [activeBlock, setActiveBlock] = useState<BlockDef | null>(null);
  const [collapsed, setCollapsed] = useState<Set<SlotType>>(new Set());
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const flow = PIPELINE.filter((slot) => slot.type !== "safety");
  const safety = PIPELINE_BY_TYPE.safety;

  function handleDragStart(event: DragStartEvent) {
    setActiveBlock((event.active.data.current?.block as BlockDef | undefined) ?? null);
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveBlock(null);
    const block = event.active.data.current?.block as BlockDef | undefined;
    const slotType = (event.over?.data.current as { slotType?: SlotType } | undefined)?.slotType;
    const index = Number(String(event.over?.id ?? "").split("#")[1]);
    if (!block || !slotType || slotType !== block.type || Number.isNaN(index)) return; // shape/type gate
    setCells((prev) => {
      const next: PlacedCells = { ...prev, [slotType]: [...prev[slotType]] };
      next[slotType][index] = block; // single-capacity slots have one cell => natural swap
      return next;
    });
  }
  function removeAt(type: SlotType, index: number) {
    setCells((prev) => {
      const next: PlacedCells = { ...prev, [type]: [...prev[type]] };
      next[type][index] = null;
      return next;
    });
  }
  const reset = () => setCells(makeEmptyCells());
  const toggleGroup = (type: SlotType) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });

  const pipeline: PlacedPipeline = useMemo(() => {
    const placed = emptyPipeline();
    for (const slot of PIPELINE) placed[slot.type] = cells[slot.type].filter(Boolean) as BlockDef[];
    return placed;
  }, [cells]);

  const complete = isComplete(pipeline);
  const { blockIds, incompatible } = useMemo(() => compilePipeline(pipeline), [pipeline]);
  const activeType = activeBlock?.type ?? null;
  const canDeploy = complete && blockIds.length > 0 && !isDeploying;
  const countOf = (type: SlotType) => cells[type].filter(Boolean).length;

  return (
    <section className={`${wattClasses.panel} p-6`}>
      {/* Header + counts */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#121e16]">Build Your Smart Home Controller</h2>
          <p className="mt-1 text-sm font-medium text-[#64705f]">Drag blocks from the right into the controller to program your smart home.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {flow.map((slot) => (
            <div key={slot.type} className="text-center">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: slot.accent }} />
                <span className="text-[11px] font-black uppercase tracking-wide" style={{ color: slot.accent }}>{slot.label}</span>
              </div>
              <div className="text-lg font-black text-[#121e16]">{countOf(slot.type)}/{slot.max}</div>
            </div>
          ))}
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
          {/* Controller board */}
          <div>
            <div className="rounded-[1.25rem] border border-[#e8dfcf] bg-[#fffefa]/70 p-4">
              <div className="flex items-stretch gap-1 overflow-x-auto pb-2">
                {flow.map((slot, i) => (
                  <div key={slot.type} className="flex items-stretch gap-1">
                    <FlowColumn slot={slot} cells={cells[slot.type]} activeType={activeType} onRemove={(idx) => removeAt(slot.type, idx)} />
                    {i < flow.length - 1 && <Connector />}
                  </div>
                ))}
              </div>

              {/* Safety & override */}
              <div className="mt-4 rounded-[1rem] border border-dashed border-[#d8cfbd] bg-[#fbf6e9] p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-[#64705f]" />
                  <div className="flex-1">
                    <div className="text-[12px] font-black uppercase tracking-[0.1em] text-[#64705f]">Safety &amp; Override (Optional)</div>
                    <div className="text-xs font-medium text-[#8a8477]">Overrides can stop or limit actions.</div>
                  </div>
                  <div className="w-44">
                    <div className="min-h-[3.5rem]">
                      <SlotCell slot={safety} index={0} block={cells.safety[0]} activeType={activeType} onRemove={() => removeAt("safety", 0)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deploy bar */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onDeploy(blockIds)}
                disabled={!canDeploy}
                className={`${wattClasses.buttonPrimary} gap-2 px-6 py-2.5 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <Rocket className="h-4 w-4" />
                {isDeploying ? "Deploying…" : "Deploy Controller"}
              </button>
              <span className="text-xs font-semibold text-[#64705f]">
                {complete ? `${blockIds.length} device command${blockIds.length === 1 ? "" : "s"} ready` : "Fix all required slots to deploy"}
              </span>
              {feedback && (
                <span className={`text-sm font-semibold ${feedback.ok ? "text-[#155420]" : "text-[#9f2f28]"}`}>{feedback.message}</span>
              )}
              <button type="button" onClick={reset} className="ml-auto inline-flex items-center gap-1.5 rounded-[0.65rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-xs font-bold text-[#64705f] hover:bg-[#fbf6e9]">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
            {incompatible.length > 0 && (
              <p className="mt-2 text-xs font-medium text-[#9f6a08]">
                Ignored {incompatible.length} incompatible pairing{incompatible.length === 1 ? "" : "s"} (e.g. {incompatible[0].action} → {incompatible[0].device}).
              </p>
            )}
          </div>

          {/* Palette */}
          <div className="rounded-[1.25rem] border border-[#e8dfcf] bg-[#fbf6e9] p-3">
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#354031]">Draggable Blocks</p>
            <p className="mt-0.5 text-[11px] font-medium text-[#8a8477]">Drag blocks to the left to build your controller.</p>
            <div className="mt-3 space-y-3">
              {PIPELINE.map((slot) => {
                const isCollapsed = collapsed.has(slot.type);
                const blocks = PALETTE.filter((b) => b.type === slot.type);
                return (
                  <div key={slot.type}>
                    <button type="button" onClick={() => toggleGroup(slot.type)} className="flex w-full items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: slot.accent }} />
                      <span className="text-[11px] font-black uppercase tracking-[0.1em] text-[#354031]">{slot.label}</span>
                      <ChevronDown className={`ml-auto h-3.5 w-3.5 text-[#8a8477] transition ${isCollapsed ? "-rotate-90" : ""}`} />
                    </button>
                    {!isCollapsed && (
                      <div className="mt-2 space-y-2">
                        {blocks.map((block) => (
                          <PaletteCard key={block.id} block={block} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The dragged piece takes the SHAPE of its slot type, so it matches the hole. */}
        <DragOverlay>
          {activeBlock ? (
            <div className="h-14 w-48">
              <ShapeBox type={activeBlock.type} variant="filled">
                <FilledContent block={activeBlock} />
              </ShapeBox>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* How it works */}
      <div className="mt-5 rounded-[1.25rem] border border-[#e8dfcf] bg-[#fffefa]/70 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#64705f]">How it works</p>
        <div className="mt-3 flex flex-wrap gap-4">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="flex min-w-[9rem] flex-1 items-start gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6efd7] text-xs font-black text-[#155420]">{step.n}</span>
              <div>
                <div className="flex items-center gap-1.5 text-sm font-black text-[#121e16]"><step.Icon className="h-3.5 w-3.5 text-[#2f6f2c]" />{step.title}</div>
                <div className="text-[11px] font-medium text-[#64705f]">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
