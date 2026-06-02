import { useId, useRef, useState } from "react";
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
import type { SmartHomeBlock, SmartHomeCatalog } from "~/lib/generic-hackathon";

export type DeployFeedback = { ok: boolean; message: string; decisions?: string[] } | null;

type PlacedBlock = { instanceId: string; block: SmartHomeBlock };

const GROUP_DOT: Record<string, string> = {
  Appliances: "bg-[#a8c75b]",
  "Battery & solar": "bg-[#f0c742]",
  "EV charging": "bg-[#2f6f2c]",
  "Climate & lights": "bg-[#64705f]",
};

function dotClass(group: string) {
  return GROUP_DOT[group] ?? "bg-[#2f6f2c]";
}

function BlockCard({ block, className = "" }: { block: SmartHomeBlock; className?: string }) {
  return (
    <div className={`rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-left shadow-sm ${className}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass(block.group)}`} />
        <span className="text-sm font-black text-[#121e16]">{block.label}</span>
      </div>
      <p className="mt-1 text-xs font-medium text-[#64705f]">{block.blurb}</p>
    </div>
  );
}

function PaletteBlock({ block, onAdd }: { block: SmartHomeBlock; onAdd: (block: SmartHomeBlock) => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${block.block_id}`,
    data: { block },
  });
  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={() => onAdd(block)}
      className="w-full cursor-grab touch-none rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-left shadow-sm transition hover:border-[#2f6f2c]/40 hover:bg-[#fbf6e9] focus:outline-none focus:ring-2 focus:ring-[#2f6f2c]/20 active:cursor-grabbing"
      style={{ opacity: isDragging ? 0.4 : 1 }}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass(block.group)}`} />
        <span className="text-sm font-black text-[#121e16]">{block.label}</span>
      </div>
      <p className="mt-1 text-xs font-medium text-[#64705f]">{block.blurb}</p>
    </button>
  );
}

function Canvas({ placed, onRemove }: { placed: PlacedBlock[]; onRemove: (instanceId: string) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[14rem] rounded-[1rem] border-2 border-dashed p-3 transition ${
        isOver ? "border-[#2f6f2c] bg-[#edf5df]" : "border-[#d8cfbd] bg-[#fbf6e9]"
      }`}
    >
      {placed.length === 0 ? (
        <div className="flex h-full min-h-[12rem] items-center justify-center px-6 text-center">
          <p className="text-sm font-semibold text-[#64705f]">
            Drag blocks here (or tap them) to build your smart-home program, then hit Deploy.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {placed.map((item) => (
            <li key={item.instanceId} className="flex items-start gap-2">
              <div className="flex-1">
                <BlockCard block={item.block} />
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.instanceId)}
                aria-label={`Remove ${item.block.label}`}
                className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e8dfcf] bg-[#fffefa] text-[#9f2f28] transition hover:border-[#df5047]/40 hover:bg-[#fff1ef]"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SmartHomeController({
  catalog,
  onDeploy,
  isDeploying,
  feedback,
}: {
  catalog: SmartHomeCatalog;
  onDeploy: (blockIds: string[]) => void;
  isDeploying: boolean;
  feedback: DeployFeedback;
}) {
  const [placed, setPlaced] = useState<PlacedBlock[]>([]);
  const [activeBlock, setActiveBlock] = useState<SmartHomeBlock | null>(null);
  const idPrefix = useId();
  const nextId = useRef(0);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const groups = catalog.groups.length
    ? catalog.groups
    : Array.from(new Set(catalog.blocks.map((block) => block.group)));
  const hasCatalog = catalog.blocks.length > 0;

  const addBlock = (block: SmartHomeBlock) =>
    setPlaced((prev) => [...prev, { instanceId: `${idPrefix}-${nextId.current++}`, block }]);
  const removeBlock = (instanceId: string) =>
    setPlaced((prev) => prev.filter((item) => item.instanceId !== instanceId));
  const clearAll = () => setPlaced([]);

  function handleDragStart(event: DragStartEvent) {
    const block = event.active.data.current?.block as SmartHomeBlock | undefined;
    setActiveBlock(block ?? null);
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveBlock(null);
    const block = event.active.data.current?.block as SmartHomeBlock | undefined;
    if (event.over?.id === "canvas" && block) addBlock(block);
  }

  const blockIds = placed.map((item) => item.block.block_id);

  return (
    <section className={`${wattClasses.panel} p-6`}>
      <p className={wattClasses.eyebrow}>Smart Home &middot; Beginner Track</p>
      <h2 className="mt-2 text-lg font-black text-[#121e16]">Your Smart Home Controller</h2>
      <p className="mt-1 text-sm font-medium text-[#64705f]">
        Drag energy blocks into the controller, then{" "}
        <span className="font-bold text-[#155420]">Deploy</span> &mdash; the house above updates in real time as
        Unity applies them.
      </p>

      {!hasCatalog ? (
        <div className={`${wattClasses.warningAlert} mt-4`}>
          Couldn&rsquo;t load your blocks. Make sure you&rsquo;re signed in and on a Watt team, then refresh.
        </div>
      ) : (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            {/* Palette */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#64705f]">Blocks</h3>
              <div className="mt-3 space-y-4">
                {groups.map((group) => {
                  const groupBlocks = catalog.blocks.filter((block) => block.group === group);
                  if (!groupBlocks.length) return null;
                  return (
                    <div key={group}>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${dotClass(group)}`} />
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#354031]">{group}</span>
                      </div>
                      <div className="mt-2 grid gap-2">
                        {groupBlocks.map((block) => (
                          <PaletteBlock key={block.block_id} block={block} onAdd={addBlock} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controller */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#64705f]">
                  Controller {placed.length > 0 ? `(${placed.length})` : ""}
                </h3>
                {placed.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-bold text-[#9f2f28] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="mt-3">
                <Canvas placed={placed} onRemove={removeBlock} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onDeploy(blockIds)}
                  disabled={isDeploying || placed.length === 0}
                  className={`${wattClasses.buttonPrimary} px-6 py-2.5 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {isDeploying ? "Deploying…" : "Deploy to Smart Home"}
                </button>
                {feedback && (
                  <span className={`text-sm font-semibold ${feedback.ok ? "text-[#155420]" : "text-[#9f2f28]"}`}>
                    {feedback.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <DragOverlay>{activeBlock ? <BlockCard block={activeBlock} className="w-64 shadow-lg" /> : null}</DragOverlay>
        </DndContext>
      )}
    </section>
  );
}
