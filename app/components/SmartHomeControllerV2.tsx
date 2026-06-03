import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  defaultDropAnimation,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  AlertTriangle,
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
import type { SmartHomePipeline } from "~/lib/generic-hackathon";
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

/**
 * Hover/focus tooltip copy — one beginner-friendly line per block describing what it IS and
 * what it does once deployed. Kept in the presentation layer (like ICON / HOW_IT_WORKS) and
 * worded to match the real backend policy (smart_home_policy.py), so the hover never over-promises.
 */
const BLOCK_DETAIL: Record<string, string> = {
  // Inputs (sensors the brain reads)
  in_smart_meter: "Reads your home's live power draw. Lets the brain react when usage spikes — e.g. trim the thermostat when the grid draw is high.",
  in_temp: "Reads indoor & outdoor temperature, so the brain can ease off heating or cooling when it's already mild outside.",
  in_weather: "Sun & temperature outlook. Unlocks solar-aware moves — pre-charge the battery or pre-heat water before a cloudy morning.",
  // Schedule (the trigger / timing)
  sc_time: "Runs your rules against the clock, so flexible jobs land in the cheaper off-peak hours.",
  sc_day: "Tells weekdays from weekends, so the plan matches when you're actually home.",
  sc_price: "Reacts to live electricity prices — turns the battery into smart peak-shaving: store cheap power, spend it through the expensive peak.",
  // Brain (the policy engine — one only)
  br_chatgpt: "The decision-maker, tuned as a saver: leans to lower setpoints and tighter budgets to cut cost.",
  br_claude: "The decision-maker, comfort-first: keeps rooms and hot water a little warmer.",
  br_gemini: "The decision-maker, balanced: a middle ground between saving money and staying comfy.",
  // Actions (strategy verbs)
  ac_shift: "Moves flexible jobs — dishwasher, laundry, EV — into cheaper, greener hours instead of cutting them.",
  ac_reduce: "Trims consumption where comfort allows: eco thermostat, lights off in empty rooms.",
  ac_charge: "Stores cheap or solar energy now to use later, when grid power is pricey.",
  // Outputs (target devices)
  ou_plugs: "Controls appliances, lights and the thermostat — the everyday loads.",
  ou_battery: "Your home battery: charges on cheap/solar power and discharges through the peak.",
  ou_ev: "Your EV charger — best filled overnight on cheap power, ready by morning.",
  // Safety (guardrails)
  sa_manual: "A guardrail: you can always step in and take control back from the automation.",
  sa_budget: "A guardrail that caps spending — won't grid-charge the battery during the pricey peak.",
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
  energized = false,
  dead = false,
  onRemove,
}: {
  slot: SlotDef;
  index: number;
  block: BlockDef | null;
  activeType: SlotType | null;
  energized?: boolean;
  dead?: boolean;
  onRemove: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `${slot.type}#${index}`, data: { slotType: slot.type } });
  const isTarget = activeType === slot.type;
  const dimmed = activeType !== null && !isTarget;
  // A filled slot whose upstream flow is unbroken reads as "powered" (steady accent glow). The
  // active drop target keeps its stronger highlight; a dead (incompatible) block never glows.
  const glow = isTarget ? `${slot.accent}66` : energized && block && !dead ? `${slot.accent}44` : null;

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[4.5rem] flex-1 transition ${dimmed ? "opacity-35" : ""} ${dead ? "opacity-60" : ""}`}
    >
      <div
        className={`h-full w-full rounded-[1rem] transition ${isTarget && !block ? "animate-pulse" : ""}`}
        style={glow ? ({ filter: `drop-shadow(0 0 0.45rem ${glow})` } as CSSProperties) : undefined}
      >
        <ShapeBox type={slot.type} variant={block ? "filled" : "empty"}>
          {block ? <FilledContent block={block} /> : <EmptyContent slot={slot} />}
        </ShapeBox>
      </div>
      {dead && block && (
        <span
          className="absolute -left-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#e7d3a3] bg-[#fdf6e3] text-[#9a6b00] shadow-sm"
          title="This block isn't paired with a compatible block, so it won't do anything."
        >
          <AlertTriangle className="h-3 w-3" />
        </span>
      )}
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
  energized,
  deadLabels,
  onRemove,
}: {
  slot: SlotDef;
  cells: Array<BlockDef | null>;
  activeType: SlotType | null;
  energized: boolean;
  deadLabels: Set<string>;
  onRemove: (index: number) => void;
}) {
  const single = slot.max === 1;
  return (
    <div className="flex min-w-[8rem] flex-1 flex-col">
      <div className="mb-3 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[13px] font-black uppercase tracking-[0.1em]" style={{ color: slot.accent }}>
          {/* Power pip: lit when the flow has reached this stage, dim otherwise. */}
          <span
            className={`h-1.5 w-1.5 rounded-full transition ${energized ? "" : "opacity-30"}`}
            style={{ background: slot.accent, boxShadow: energized ? `0 0 6px ${slot.accent}` : undefined }}
          />
          {slot.label}
        </div>
        <div className="text-[11px] font-bold text-[#8a8477]">{slot.min === 0 ? "Optional" : single ? "Add 1" : `Add up to ${slot.max}`}</div>
      </div>
      <div className={`flex flex-1 flex-col gap-3 ${single ? "justify-center" : ""}`}>
        {cells.map((block, index) => (
          <SlotCell
            key={index}
            slot={slot}
            index={index}
            block={block}
            activeType={activeType}
            energized={energized}
            dead={!!block && deadLabels.has(block.label)}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}

function Connector({ live, index }: { live: boolean; index: number }) {
  return (
    <div className="relative mt-12 w-6 self-stretch" aria-hidden>
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 transition-colors ${live ? "border-solid border-[#2f6f2c]/70" : "border-dotted border-[#d8cfbd]"}`}
      />
      {live && (
        // A pulse travels left->right; the per-connector delay makes one wave flow down the chain.
        <span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#2f6f2c]"
          style={{ animation: "watt-flow 1.25s linear infinite", animationDelay: `${index * 0.18}s`, boxShadow: "0 0 6px 1px rgba(47,111,44,0.75)" }}
        />
      )}
    </div>
  );
}

function PaletteTooltip({ accent, label, detail }: { accent: string; label: string; detail: string }) {
  // Reveals on hover/focus of the parent `.group` card. Sits above the card on narrow layouts
  // and to its left on xl (where there's open board space). Opacity-only transition avoids any
  // transform conflict between the two placements. The panel doesn't clip overflow, so no clamp.
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-60 rounded-[0.8rem] border border-black/10 bg-[#121e16] p-3 text-left opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 xl:bottom-auto xl:left-auto xl:right-full xl:top-1/2 xl:mb-0 xl:mr-3 xl:-translate-y-1/2"
    >
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />
        <span className="text-[12px] font-black text-[#fffefa]">{label}</span>
      </div>
      <p className="mt-1 text-[11px] font-medium leading-snug text-[#cdd6c6]">{detail}</p>
    </div>
  );
}

function PaletteCard({ block }: { block: BlockDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `pal#${block.id}`, data: { block } });
  const accent = PIPELINE_BY_TYPE[block.type].accent;
  const Icon = ICON[block.id] ?? Plus;
  const detail = BLOCK_DETAIL[block.id] ?? block.blurb;
  return (
    <div className="group relative">
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
      {/* Hidden mid-drag so the tip doesn't linger over the lifted card. */}
      {!isDragging && <PaletteTooltip accent={accent} label={block.label} detail={detail} />}
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
  onDeploy: (pipeline: SmartHomePipeline) => void;
  isDeploying: boolean;
  feedback: DeployFeedback;
}) {
  const [cells, setCells] = useState<PlacedCells>(makeEmptyCells);
  const [activeBlock, setActiveBlock] = useState<BlockDef | null>(null);
  const [collapsed, setCollapsed] = useState<Set<SlotType>>(new Set());
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  // Drives the DragOverlay drop animation: true => the drop missed, so fly the piece back to the
  // palette; false => it landed in a slot, so kill the animation and let it snap into place.
  const returnToPaletteRef = useRef(false);

  const flow = PIPELINE.filter((slot) => slot.type !== "safety");
  const safety = PIPELINE_BY_TYPE.safety;

  function handleDragStart(event: DragStartEvent) {
    setActiveBlock((event.active.data.current?.block as BlockDef | undefined) ?? null);
  }
  function handleDragEnd(event: DragEndEvent) {
    const block = event.active.data.current?.block as BlockDef | undefined;
    const slotType = (event.over?.data.current as { slotType?: SlotType } | undefined)?.slotType;
    const index = Number(String(event.over?.id ?? "").split("#")[1]);
    const accepted = Boolean(block && slotType && slotType === block.type && !Number.isNaN(index));
    returnToPaletteRef.current = !accepted; // fly back only when the drop missed a matching slot
    setActiveBlock(null);
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
  const pipelinePayload = useMemo<SmartHomePipeline>(
    () => ({
      inputs: pipeline.input.map((b) => b.id),
      schedule: pipeline.schedule.map((b) => b.id),
      brain: pipeline.brain.map((b) => b.id),
      actions: pipeline.action.map((b) => b.id),
      outputs: pipeline.output.map((b) => b.id),
      safety: pipeline.safety.map((b) => b.id),
    }),
    [pipeline],
  );
  const activeType = activeBlock?.type ?? null;
  const canDeploy = complete && !isDeploying;
  const countOf = (type: SlotType) => cells[type].filter(Boolean).length;

  // --- Living pipeline: how far the SENSE->THINK->ACT flow reaches before it hits an empty stage. ---
  let poweredUpTo = 0;
  for (const slot of flow) {
    if (pipeline[slot.type].length > 0) poweredUpTo++;
    else break;
  }
  const fullyConnected = poweredUpTo === flow.length;

  // --- Pre-deploy preview: the one thing we can know for sure client-side is which output x action
  //     pairings are incompatible (no command). Surfaced as warnings + dimmed "dead" blocks. ---
  const { incompatible } = useMemo(() => compilePipeline(pipeline), [pipeline]);
  const deadLabels = useMemo(() => {
    const bad = new Set(incompatible.map((p) => `${p.device}|${p.action}`));
    const dead = new Set<string>();
    if (pipeline.action.length && pipeline.output.length) {
      for (const o of pipeline.output) {
        if (o.device && pipeline.action.every((a) => bad.has(`${o.label}|${a.label}`))) dead.add(o.label);
      }
      for (const a of pipeline.action) {
        if (a.intent && pipeline.output.every((o) => bad.has(`${o.label}|${a.label}`))) dead.add(a.label);
      }
    }
    return dead;
  }, [incompatible, pipeline]);

  // The chain is "charged" when every stage is filled AND nothing is mismatched. Fire a one-shot
  // surge the moment it first becomes ready, so committing feels earned.
  const chargedReady = fullyConnected && incompatible.length === 0;
  const [surge, setSurge] = useState(false);
  const wasReadyRef = useRef(false);
  useEffect(() => {
    if (chargedReady && !wasReadyRef.current) {
      wasReadyRef.current = true;
      setSurge(true);
      const t = setTimeout(() => setSurge(false), 1100);
      return () => clearTimeout(t);
    }
    if (!chargedReady) wasReadyRef.current = false;
  }, [chargedReady]);

  return (
    <section className={`${wattClasses.panel} p-6`}>
      <style>{`
@keyframes watt-flow { 0% { left: -8%; opacity: 0 } 12% { opacity: 1 } 88% { opacity: 1 } 100% { left: 108%; opacity: 0 } }
@keyframes watt-charge { 0%, 100% { box-shadow: 0 0 0 0 rgba(47,111,44,0.5) } 70% { box-shadow: 0 0 0 8px rgba(47,111,44,0) } }
`}</style>
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

      <DndContext id="watt-smart-home-controller" sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
          {/* Controller board */}
          <div>
            <div className="rounded-[1.25rem] border border-[#e8dfcf] bg-[#fffefa]/70 p-4">
              <div className="flex items-stretch gap-1 overflow-x-auto pb-2">
                {flow.map((slot, i) => (
                  <div key={slot.type} className="flex items-stretch gap-1">
                    <FlowColumn
                      slot={slot}
                      cells={cells[slot.type]}
                      activeType={activeType}
                      energized={i < poweredUpTo}
                      deadLabels={deadLabels}
                      onRemove={(idx) => removeAt(slot.type, idx)}
                    />
                    {i < flow.length - 1 && <Connector live={i + 1 < poweredUpTo} index={i} />}
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
              <span className="relative inline-flex">
                {surge && (
                  <span className="pointer-events-none absolute inset-0 rounded-[0.65rem] bg-[#2f6f2c]/40 animate-ping" aria-hidden />
                )}
                <button
                  type="button"
                  onClick={() => onDeploy(pipelinePayload)}
                  disabled={!canDeploy}
                  style={chargedReady && !isDeploying ? { animation: "watt-charge 1.6s ease-in-out infinite" } : undefined}
                  className={`relative ${wattClasses.buttonPrimary} gap-2 px-6 py-2.5 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <Rocket className="h-4 w-4" />
                  {isDeploying ? "Deploying…" : "Deploy Controller"}
                </button>
              </span>
              <span className="text-xs font-semibold text-[#64705f]">
                {!complete
                  ? "Finish your controller — fill every required slot."
                  : incompatible.length > 0
                    ? "Ready — but some blocks are mismatched (see below)."
                    : "Charged and ready to deploy ⚡"}
              </span>
              {feedback && (
                <span className={`text-sm font-semibold ${feedback.ok ? "text-[#155420]" : "text-[#9f2f28]"}`}>{feedback.message}</span>
              )}
              <button type="button" onClick={reset} className="ml-auto inline-flex items-center gap-1.5 rounded-[0.65rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-xs font-bold text-[#64705f] hover:bg-[#fbf6e9]">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
            {incompatible.length > 0 && (
              <ul className="mt-3 space-y-1.5 rounded-[0.9rem] border border-[#e7d3a3] bg-[#fdf6e3] p-3">
                <li className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#9a6b00]">
                  <AlertTriangle className="h-3.5 w-3.5" /> Mismatched blocks
                </li>
                {incompatible.map((pair, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-[#5c4a16]">
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>
                      <b>{pair.action}</b> won’t do anything to <b>{pair.device}</b> — pair it with a compatible output.
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {feedback?.decisions && feedback.decisions.length > 0 && (
              <ul className="mt-3 space-y-1.5 rounded-[0.9rem] border border-[#e8dfcf] bg-[#fbf6e9] p-3">
                <li className="text-[11px] font-black uppercase tracking-[0.12em] text-[#7c5cd6]">Your brain decided</li>
                {feedback.decisions.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-[#354031]">
                    <Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7c5cd6]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
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
        <DragOverlay dropAnimation={returnToPaletteRef.current ? defaultDropAnimation : null}>
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
