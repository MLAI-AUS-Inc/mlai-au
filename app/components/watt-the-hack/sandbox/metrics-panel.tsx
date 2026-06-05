"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import {
  ActivityIcon,
  BatteryFullIcon,
  CloudIcon,
  DollarSignIcon,
  FuelIcon,
  LeafIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { buildCostTiles, type CostGroup } from "~/lib/watt-the-hack-sandbox/mechanics";
import { selectBreakdownTotals, useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import { cn } from "~/lib/watt-the-hack-sandbox/utils";

type Breakdown = Record<string, number>;

interface CostComponent {
  key: string;
  label: string;
}

// Tile chrome (icon + colour) per cost group. Composition (which keys
// appear in which tile) is computed from the active mechanics via
// buildCostTiles() — no hardcoded tile table.
const GROUP_CHROME: Record<
  CostGroup,
  { icon: LucideIcon; iconBg: string; iconFg: string }
> = {
  grid: { icon: ActivityIcon, iconBg: "bg-blue-50", iconFg: "text-blue-700" },
  penalties: {
    icon: ZapIcon,
    iconBg: "bg-rose-50",
    iconFg: "text-rose-700",
  },
  battery: {
    icon: BatteryFullIcon,
    iconBg: "bg-indigo-50",
    iconFg: "text-indigo-700",
  },
  diesel: { icon: FuelIcon, iconBg: "bg-amber-50", iconFg: "text-amber-700" },
  fcas: {
    icon: DollarSignIcon,
    iconBg: "bg-violet-50",
    iconFg: "text-violet-700",
  },
  carbon: {
    icon: LeafIcon,
    iconBg: "bg-emerald-50",
    iconFg: "text-emerald-700",
  },
};

// Two summary chips at the top: total cost and out-of-pocket spend.
const OPERATING_COMPONENTS: CostComponent[] = [
  { key: "tariff_import", label: "Grid tariff" },
  { key: "generator_fuel", label: "Generator fuel" },
];

export function MetricsPanel() {
  const summary = useSimStore((s) => s.metricsSummary);
  const breakdown = useSimStore(selectBreakdownTotals);
  const controllerError = useSimStore((s) => s.controllerError);
  const scenario = useSimStore((s) => s.scenario);
  const operatingCost = sumComponents(breakdown, OPERATING_COMPONENTS);
  const crashed = controllerError !== null;

  // Tile composition is scenario-driven: only cost categories the active
  // mechanics contribute to (or always-on penalties / tariffs) get a tile.
  // Tiles whose components sum to ~0 are dimmed so participants can still
  // see "this mechanic exists but isn't being exercised."
  const tiles = useMemo(() => {
    const ids = (scenario?.mechanics ?? []).map((m) => m.id);
    return buildCostTiles(ids);
  }, [scenario]);

  return (
    <Tooltip.Provider delayDuration={120}>
      <section className="card overflow-hidden ring-2 ring-sky-300/60 shadow-hero">
        <div className="grid gap-4 border-b border-line/70 bg-gradient-to-br from-sky-50 via-sky-50/40 to-white px-4 py-6 sm:grid-cols-[1fr_auto] sm:items-end sm:px-6 sm:py-7">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-sky-600 text-white">
                <DollarSignIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
                Total Cost
              </span>
            </div>
            {crashed ? (
              <div className="mt-2 text-base font-semibold text-warning sm:text-lg">
                Controller crashed — score invalid
                <div className="mt-0.5 text-[11px] font-normal text-muted">
                  Engine fell back to do-nothing actions. Fix the error pill
                  above and rerun.
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  key={summary.cost.toFixed(2)}
                  initial={{ opacity: 0.4, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={cn(
                    "mt-2 text-5xl font-bold tabular-nums leading-none tracking-tight sm:text-6xl",
                    summary.cost < 0 ? "text-emerald-700" : "text-ink",
                  )}
                >
                  {formatMoney(summary.cost)}
                </motion.div>
                <div className="mt-2 text-[11px] font-medium text-muted">
                  Total cost across the run — lower wins.
                </div>
              </>
            )}
          </div>

          <div className="rounded-lg border border-line/70 bg-canvas/60 px-3 py-2 sm:min-w-[220px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Operating cost
              </span>
              <span
                className={cn(
                  "text-sm font-semibold tabular-nums",
                  operatingCost < 0 ? "text-emerald-700" : "text-ink",
                )}
              >
                {formatMoney(operatingCost)}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted">
              {OPERATING_COMPONENTS.map((component) => (
                <span key={component.key}>
                  {component.label}:{" "}
                  {formatMoney(componentValue(breakdown, component))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {tiles.length > 0 ? (
          <div
            className="grid grid-cols-1 divide-y divide-line/70 md:divide-x md:divide-y-0"
            style={{
              gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))`,
            }}
          >
            {tiles.map((tile) => (
              <CostTile key={tile.group} tile={tile} breakdown={breakdown} />
            ))}
          </div>
        ) : null}
      </section>
    </Tooltip.Provider>
  );
}

function CostTile({
  tile,
  breakdown,
}: {
  tile: { group: CostGroup; label: string; keys: { key: string; label: string }[] };
  breakdown: Breakdown;
}) {
  const chrome = GROUP_CHROME[tile.group] ?? {
    icon: CloudIcon,
    iconBg: "bg-slate-100",
    iconFg: "text-slate-700",
  };
  const Icon = chrome.icon;
  const components = tile.keys;
  const value = sumComponents(breakdown, components);
  const idle = Math.abs(value) < 0.005;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-[112px] w-full items-stretch gap-3 px-4 py-3 text-left transition-colors hover:bg-canvas/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 sm:px-5",
            idle && "text-muted",
          )}
        >
          <span
            className={cn(
              "mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg",
              idle ? "bg-subtle text-muted" : chrome.iconBg,
              !idle && chrome.iconFg,
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {tile.label}
            </span>
            <span
              className={cn(
                "mt-1 text-xl font-semibold tabular-nums",
                value < 0
                  ? "text-emerald-700"
                  : idle
                    ? "text-muted"
                    : "text-ink",
              )}
            >
              {formatMoney(value)}
            </span>
          </span>
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          align="start"
          sideOffset={8}
          /* wth-sandbox: this content is portaled to <body>, outside the app
             shell's .wth-sandbox scope, so without it `text-muted` falls back
             to the near-white shadcn default and the rows go white-on-white. */
          className="wth-sandbox z-50 w-[280px] rounded-lg border border-line bg-white p-3 text-xs shadow-hero"
        >
          <div className="mb-2 flex items-center justify-between gap-3 border-b border-line/70 pb-2">
            <span className="font-semibold text-ink">{tile.label}</span>
            <span
              className={cn(
                "font-semibold tabular-nums",
                value < 0 ? "text-emerald-700" : "text-ink",
              )}
            >
              {formatMoney(value)}
            </span>
          </div>
          <div className="space-y-2">
            {components.map((component) => {
              const actual = componentValue(breakdown, component);
              return (
                <div
                  key={component.key}
                  className="grid grid-cols-[1fr_auto] gap-x-3"
                >
                  <span className="min-w-0 truncate text-muted">
                    {component.label}
                  </span>
                  <span
                    className={cn(
                      "font-medium tabular-nums",
                      signedCostTone(actual),
                    )}
                  >
                    {formatSignedMoney(actual)}
                  </span>
                </div>
              );
            })}
          </div>
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function sumComponents(
  breakdown: Breakdown,
  components: CostComponent[],
): number {
  return components.reduce((sum, component) => {
    return sum + componentValue(breakdown, component);
  }, 0);
}

function componentValue(
  breakdown: Breakdown,
  component: CostComponent,
): number {
  const raw = breakdown[component.key] ?? 0;
  return Number.isFinite(raw) ? raw : 0;
}

function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "$0.00";
  const abs = Math.abs(value);
  let formatted = "";
  if (abs >= 1_000_000) {
    formatted = (abs / 1_000_000).toFixed(2) + "M";
  } else if (abs >= 100_000) {
    formatted = (abs / 1_000).toFixed(0) + "k";
  } else {
    formatted = abs.toLocaleString("en-AU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value < 0 ? `-$${formatted}` : `$${formatted}`;
}

function formatSignedMoney(value: number): string {
  if (!Number.isFinite(value)) return "$0.00";
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  const abs = Math.abs(value);
  let formatted = "";
  if (abs >= 1_000_000) {
    formatted = (abs / 1_000_000).toFixed(2) + "M";
  } else if (abs >= 100_000) {
    formatted = (abs / 1_000).toFixed(0) + "k";
  } else {
    formatted = abs.toLocaleString("en-AU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return `${sign}$${formatted}`;
}

function signedCostTone(value: number): string {
  if (value < -0.005) return "text-emerald-700";
  if (value > 0.005) return "text-rose-700";
  return "text-muted";
}
