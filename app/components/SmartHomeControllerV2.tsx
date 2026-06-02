import { type CSSProperties, useMemo, useState } from "react";
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
  type SlotShape,
  type SlotType,
} from "~/lib/smart-home-pipeline";

/**
 * v2 prototype — the "sense -> think -> act" pipeline builder from the draft.
 * Typed + shaped slots (only matching shapes snap in), single-capacity slots SWAP, and
 * Deploy compiles the filled pipeline -> backend block_ids (Path A). Shapes are approximate
 * clip-paths for the prototype; precise jigsaw silhouettes are a polish pass.
 */

const SHAPE_STYLE: Record<SlotShape, CSSProperties> = {
  plug: { clipPath: "polygon(0% 24%, 7% 24%, 7% 0%, 100% 0%, 100% 100%, 7% 100%, 7% 76%, 0% 76%)" },
  gem: { clipPath: "polygon(9% 0%, 100% 0%, 91% 100%, 0% 100%)" },
  square: { borderRadius: "0.4rem" },
  bolt: { clipPath: "polygon(0% 0%, 89% 0%, 100% 50%, 89% 100%, 0% 100%)" },
  node: { borderRadius: "1.5rem" },
  shield: { clipPath: "polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%)" },
};

const GLYPH: Record<SlotType, string> = {
  input: "▷",
  schedule: "◈",
  brain: "▣",
  action: "⚡",
  output: "⦿",
  safety: "🛡",
};

type PlacedCells = Record<SlotType, Array<BlockDef | null>>;

function makeEmptyCells(): PlacedCells {
  return Object.fromEntries(PIPELINE.map((slot) => [slot.type, Array(slot.max).fill(null)])) as PlacedCells;
}

function shapePadding(shape: SlotShape): string {
  // Give clipped shapes extra side padding so labels aren't cut.
  if (shape === "plug") return "py-2 pl-4 pr-3";
  if (shape === "bolt") return "py-2 pl-3 pr-5";
  if (shape === "gem") return "py-2 px-4";
  if (shape === "shield") return "pt-2 pb-4 px-3";
  return "py-2 px-3";
}

function BlockChip({ block, withBlurb = false }: { block: BlockDef; withBlurb?: boolean }) {
  const slot = PIPELINE_BY_TYPE[block.type];
  return (
    <div
      style={{ ...SHAPE_STYLE[slot.shape], borderColor: slot.accent, background: `${slot.accent}12` }}
      className={`w-full border-2 bg-[#fffefa] text-left shadow-sm ${shapePadding(slot.shape)}`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden style={{ color: slot.accent }} className="text-sm leading-none">{GLYPH[block.type]}</span>
        <span className="text-sm font-black text-[#121e16]">{block.label}</span>
      </div>
      {withBlurb && <p className="mt-1 text-[11px] font-medium leading-tight text-[#64705f]">{block.blurb}</p>}
    </div>
  );
}

function PaletteBlock({ block }: { block: BlockDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `pal#${block.id}`, data: { block } });
  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{ opacity: isDragging ? 0.35 : 1 }}
      className="w-full cursor-grab touch-none focus:outline-none active:cursor-grabbing"
      {...listeners}
      {...attributes}
    >
      <BlockChip block={block} withBlurb />
    </button>
  );
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
  const isTarget = activeType === slot.type; // a matching piece is being dragged
  const dimmed = activeType !== null && activeType !== slot.type;

  let ring = "border-[#d8cfbd]";
  if (isOver && isTarget) ring = "border-[#2f6f2c] ring-4 ring-[#2f6f2c]/20";
  else if (isTarget) ring = "border-[var(--accent)] ring-2 ring-[var(--accent)]/25 animate-pulse";

  if (block) {
    return (
      <div className="relative">
        <div ref={setNodeRef}>
          <BlockChip block={block} />
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${block.label}`}
          className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#e8dfcf] bg-[#fffefa] text-xs text-[#9f2f28] shadow-sm hover:bg-[#fff1ef]"
        >
          &times;
        </button>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...SHAPE_STYLE[slot.shape], ["--accent" as string]: slot.accent } as CSSProperties}
      className={`flex min-h-[3.25rem] items-center justify-center border-2 border-dashed bg-[#fbf6e9] text-center transition ${shapePadding(slot.shape)} ${ring} ${dimmed ? "opacity-40" : ""}`}
    >
      <span className="flex items-center gap-1.5 text-xs font-bold text-[#8a8477]">
        <span aria-hidden style={{ color: slot.accent }}>{GLYPH[slot.type]}</span>
        {slot.type}
      </span>
    </div>
  );
}

function SlotColumn({
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
  const filled = cells.filter(Boolean).length;
  return (
    <div className="min-w-[8.5rem] flex-1">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: slot.accent }}>
          {slot.label}
        </span>
        <span className="text-[10px] font-bold text-[#8a8477]">
          {slot.min === 0 ? "optional" : `${filled}/${slot.max}`}
        </span>
      </div>
      <div className="space-y-2">
        {cells.map((block, index) => (
          <SlotCell
            key={index}
            slot={slot}
            index={index}
            block={block}
            activeType={activeType}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}

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
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const flow = PIPELINE.filter((slot) => slot.type !== "safety");
  const safety = PIPELINE_BY_TYPE.safety;

  function handleDragStart(event: DragStartEvent) {
    setActiveBlock((event.active.data.current?.block as BlockDef | undefined) ?? null);
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveBlock(null);
    const block = event.active.data.current?.block as BlockDef | undefined;
    const overData = event.over?.data.current as { slotType?: SlotType } | undefined;
    const slotType = overData?.slotType;
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

  const pipeline: PlacedPipeline = useMemo(() => {
    const placed = emptyPipeline();
    for (const slot of PIPELINE) placed[slot.type] = cells[slot.type].filter(Boolean) as BlockDef[];
    return placed;
  }, [cells]);

  const complete = isComplete(pipeline);
  const { blockIds, incompatible } = useMemo(() => compilePipeline(pipeline), [pipeline]);
  const activeType = activeBlock?.type ?? null;
  const canDeploy = complete && blockIds.length > 0 && !isDeploying;

  const byType = (type: SlotType) => PALETTE.filter((block) => block.type === type);

  return (
    <section className={`${wattClasses.panel} p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={wattClasses.eyebrow}>Build your Smart Home Controller</p>
          <p className="mt-1 text-sm font-medium text-[#64705f]">
            Drag blocks into the controller. Each slot only accepts its own shape — there's room for one Brain
            and one Schedule. Deploy compiles your pipeline and the house above reacts.
          </p>
        </div>
        <button type="button" onClick={reset} className="shrink-0 text-xs font-bold text-[#9f2f28] hover:underline">
          ↺ Reset
        </button>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
          {/* Controller */}
          <div>
            <div className="flex items-stretch gap-2 overflow-x-auto rounded-[1rem] border border-[#e8dfcf] bg-[#fffefa]/60 p-3">
              {flow.map((slot, i) => (
                <div key={slot.type} className="flex items-stretch gap-2">
                  <SlotColumn slot={slot} cells={cells[slot.type]} activeType={activeType} onRemove={(idx) => removeAt(slot.type, idx)} />
                  {i < flow.length - 1 && <div className="flex items-center text-[#c9b98f]">▷</div>}
                </div>
              ))}
            </div>

            {/* Safety hangs below */}
            <div className="mt-3 max-w-[16rem]">
              <SlotColumn slot={safety} cells={cells.safety} activeType={activeType} onRemove={(idx) => removeAt("safety", idx)} />
            </div>

            {/* Deploy bar */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onDeploy(blockIds)}
                disabled={!canDeploy}
                className={`${wattClasses.buttonPrimary} px-6 py-2.5 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {isDeploying ? "Deploying…" : "🚀 Deploy Controller"}
              </button>
              <span className="text-xs font-semibold text-[#64705f]">
                {complete
                  ? `${blockIds.length} device command${blockIds.length === 1 ? "" : "s"} ready`
                  : "Fix all required slots to deploy"}
              </span>
              {feedback && (
                <span className={`text-sm font-semibold ${feedback.ok ? "text-[#155420]" : "text-[#9f2f28]"}`}>
                  {feedback.message}
                </span>
              )}
            </div>
            {incompatible.length > 0 && (
              <p className="mt-2 text-xs font-medium text-[#9f6a08]">
                Ignored {incompatible.length} incompatible pairing
                {incompatible.length === 1 ? "" : "s"} (e.g. {incompatible[0].action} → {incompatible[0].device}).
              </p>
            )}
          </div>

          {/* Palette */}
          <div className="rounded-[1rem] border border-[#e8dfcf] bg-[#fbf6e9] p-3">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#64705f]">Draggable blocks</p>
            <div className="mt-3 space-y-4">
              {PIPELINE.map((slot) => (
                <div key={slot.type}>
                  <div className="mb-2 flex items-center gap-1.5">
                    <span aria-hidden style={{ color: slot.accent }}>{GLYPH[slot.type]}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#354031]">{slot.label}</span>
                  </div>
                  <div className="space-y-2">
                    {byType(slot.type).map((block) => (
                      <PaletteBlock key={block.id} block={block} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>{activeBlock ? <div className="w-56"><BlockChip block={activeBlock} /></div> : null}</DragOverlay>
      </DndContext>
    </section>
  );
}
