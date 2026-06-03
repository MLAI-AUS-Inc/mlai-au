"use client";

import { motion } from "framer-motion";
import {
  ActivityIcon,
  BatteryFullIcon,
  BuildingIcon,
  FuelIcon,
  SunIcon,
  ZapIcon,
} from "lucide-react";

import {
  selectLatestOutputs,
  selectStateForLatestOutputs,
  useSimStore,
} from "~/lib/watt-the-hack-sandbox/sim-store";
import { formatKw, formatPercent } from "~/lib/watt-the-hack-sandbox/utils";

function hasMechanic(
  mechanics: ReadonlyArray<{ id: string }> | undefined,
  id: string,
): boolean {
  return (mechanics ?? []).some((m) => m.id === id);
}

// ─── Layout constants ──────────────────────────────────────────────────────────
const SVG_W = 1020;
const SVG_H = 400;

// The "inside" entity centres (all three feed the city).
// Vertical spacing must clear ICON_R (38) plus value-text (~14px) plus
// label-text (~12px) plus a small breathing gap on both sides. ≥120 px
// between centres keeps "Solar" and "Diesel · idle" from clipping into the
// node below — tested against a 16-char label.
const SOLAR_X = 148;
const SOLAR_Y = 60;
const DIESEL_X = 148;
const DIESEL_Y = 185;
const BATT_X = 148;
const BATT_Y = 310;
const CITY_X = 492;
const CITY_Y = 190;

// The external grid entity
const GRID_X = 848;
const GRID_Y = 190;

// FCAS market node — sits OUTSIDE the city bubble, just under the city↔grid
// link, and feeds back into the external grid. It's a grid-side service: you
// hold battery capacity in reserve and sell frequency response to the market
// operator. Only rendered when the scenario unlocks FCAS. (We don't model the
// reserve actually degrading or being dispatched yet — the connector is
// indicative.)
const FCAS_X = 700;
const FCAS_Y = 300;

// Circle radii
const CITY_R = 58; // city centre node
const ICON_R = 38; // solar / battery / grid nodes
const SOC_W = 76; // width of SOC bar
const SOC_H = 7; // height of SOC bar

// Inverter capacity bar (sits below the SOC bar inside the battery node)
const INV_W = 76; // same width as SOC bar
const INV_H = 6; // slightly thinner than SOC bar
// Fallback only — the real value comes from `scenario.limits.max_inverter_mw`
// (set by the backend in `public_metadata`). Scenarios that override
// `max_inverter_mw` via `config_overrides` would otherwise render the
// allocation bar with stale proportions.
const DEFAULT_MAX_INVERTER_MW = 50;

// The large "Single City" enclosing circle
const ENC_CX = 330;
const ENC_CY = 190;
const ENC_R = 265;

// ─── Main export ──────────────────────────────────────────────────────────────
export function GridDiagram() {
  const state = useSimStore(selectStateForLatestOutputs);
  const latest = useSimStore(selectLatestOutputs);
  const scenario = useSimStore((s) => s.scenario);
  const mechanics = scenario?.mechanics;
  const maxInverterKw =
    scenario?.limits?.max_inverter_mw ?? DEFAULT_MAX_INVERTER_MW;
  const maxImportMw = scenario?.limits?.grid_max_import_mw ?? Infinity;
  const maxExportMw = scenario?.limits?.grid_max_export_mw ?? Infinity;
  const exportTariff = scenario?.penalties?.export_tariff_per_mwh ?? 0;

  // Scenario-driven node visibility. New mechanics that introduce a grid
  // node should add a check here.
  const showBattery = hasMechanic(mechanics, "battery");
  const showDiesel = hasMechanic(mechanics, "diesel");
  const showFcas = hasMechanic(mechanics, "fcas");

  const demand = state?.demand ?? 0;
  const solar = state?.solar ?? 0;
  const soc = state?.soc ?? 0;

  const netGrid = latest?.net_grid_power ?? 0;
  const battDispatch = latest?.battery_dispatch ?? 0;
  const unmetDemand = latest?.unmet_demand ?? 0;
  const overvoltageKw = latest?.overvoltage_mw ?? 0;
  const curtailedSolar = latest?.curtailed_solar ?? 0;
  const price = latest?.import_price ?? 0;
  const dieselKw = latest?.emergency_generator ?? 0;
  const fcasReserve = latest?.fcas_reserve ?? 0;
  const fcasDispatchRequired = latest?.fcas_dispatch_required ?? 0;
  const fcasDispatchDelivered = latest?.fcas_dispatch_delivered ?? 0;
  const isFcasDispatching = fcasDispatchRequired > 0.01;

  const actualSolar = Math.max(0, solar - curtailedSolar);
  const localSupply = actualSolar + dieselKw;
  const dieselRunning = dieselKw > 0.01;
  const curtailing = curtailedSolar > 0.01;
  const overvoltage = overvoltageKw > 0.01;

  const importing = netGrid > 0;
  const exporting = netGrid < 0;
  const battCharging = battDispatch < 0;
  const battDischarging = battDispatch > 0;

  const gridColor = importing ? "#DC2626" : exporting ? "#059669" : "#94A3B8";
  const gridLabel = importing
    ? "Importing"
    : exporting
      ? "Exporting"
      : "Balanced";

  return (
    <div
      className="relative w-full overflow-hidden bg-canvas select-none"
      style={{ height: "min(46vh, 400px)" }}
    >
      <div className="absolute inset-0 grid-bg-strong" aria-hidden />

      {/* Header badge */}
      <div className="pointer-events-none absolute left-3 top-3 z-10">
        <div className="rounded-md border border-line/70 bg-surface/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted shadow-soft backdrop-blur">
          City Grid
        </div>
      </div>

      {/* Penalty warnings */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-wrap justify-center gap-2">
        {unmetDemand > 0.01 && (
          <div className="whitespace-nowrap rounded-full border border-danger/30 bg-danger/5 px-3 py-1 text-[11px] font-medium text-danger shadow-soft backdrop-blur">
            ⚠ {formatKw(unmetDemand)} unmet · $10/MWh
          </div>
        )}
        {overvoltage && (
          <div className="whitespace-nowrap rounded-full border border-amber-500/40 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 shadow-soft backdrop-blur">
            ⚠ {formatKw(overvoltageKw)} overvoltage · $5/MWh
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="City power flow diagram"
      >
        {/* ── Large "Single City" enclosing circle ── */}
        {/* Subtle fill */}
        <circle
          cx={ENC_CX}
          cy={ENC_CY}
          r={ENC_R}
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth={1.5}
          strokeDasharray="8 5"
        />
        {/* "Single City" label at top of circle */}
        <text
          x={ENC_CX}
          y={ENC_CY - ENC_R - 10}
          textAnchor="middle"
          style={{
            fontSize: 11,
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
          fill="#94A3B8"
        >
          Single City
        </text>

        {/* ── Internal flow lines (inside city boundary) ── */}

        {/* Solar → City */}
        <FlowLine
          x1={SOLAR_X + ICON_R}
          y1={SOLAR_Y}
          x2={CITY_X - CITY_R}
          y2={CITY_Y - 32}
          active={actualSolar > 0.5}
          color="#D97706"
          direction="forward"
        />

        {/* Diesel → City */}
        {showDiesel && (
          <FlowLine
            x1={DIESEL_X + ICON_R}
            y1={DIESEL_Y}
            x2={CITY_X - CITY_R}
            y2={CITY_Y}
            active={dieselRunning}
            color="#B91C1C"
            direction="forward"
          />
        )}

        {/* Battery ↔ City */}
        {showBattery && (
          <FlowLine
            x1={BATT_X + ICON_R}
            y1={BATT_Y}
            x2={CITY_X - CITY_R}
            y2={CITY_Y + 32}
            active={Math.abs(battDispatch) > 0.5}
            color="#2563EB"
            direction={battDischarging ? "forward" : "reverse"}
          />
        )}

        {/* ── City → Grid (exits the enclosing circle) ── */}
        <FlowLine
          x1={CITY_X + CITY_R}
          y1={CITY_Y}
          x2={GRID_X - ICON_R}
          y2={GRID_Y}
          active={Math.abs(netGrid) > 0.5}
          color={gridColor}
          direction={importing ? "reverse" : "forward"}
        />

        {/* ── Battery → FCAS (capacity commitment from the battery directly) ──
            Conceptual: "your battery is committing inverter MW to FCAS".
            Active only when actively dispatching. */}
        {showFcas && (
          <g>
            <FlowLine
              x1={BATT_X + ICON_R}
              y1={BATT_Y}
              x2={FCAS_X - 25}
              y2={FCAS_Y + 10}
              active={isFcasDispatching}
              color="#7C3AED"
              direction="forward"
              pulse={isFcasDispatching}
            />
            {isFcasDispatching && (
              <text
                x={(BATT_X + ICON_R + FCAS_X - 25) / 2}
                y={(BATT_Y + FCAS_Y + 10) / 2 + 15}
                textAnchor="middle"
                style={{ fontSize: 10, fontFamily: "var(--font-geist-sans)", fontWeight: 600 }}
                fill="#7C3AED"
              >
                Dispatching!
              </text>
            )}
          </g>
        )}

        {/* ── FCAS → Grid (reserve backs the external grid) ──
            Conceptual: "the grid operator can call on this capacity".
            Active only when actively dispatching. */}
        {showFcas && (
          <FlowLine
            x1={FCAS_X}
            y1={FCAS_Y}
            x2={GRID_X}
            y2={GRID_Y}
            active={isFcasDispatching}
            color="#7C3AED"
            direction="forward"
            pulse={isFcasDispatching}
          />
        )}

        {/* ── Solar node ── */}
        <PeriphNode
          x={SOLAR_X}
          y={SOLAR_Y}
          color="#D97706"
          label={
            curtailing
              ? `Solar · −${formatKw(curtailedSolar)} curtailed`
              : "Solar"
          }
          value={formatKw(actualSolar)}
        >
          <SunIcon />
        </PeriphNode>

        {/* ── Diesel generator node ── */}
        {showDiesel && (
          <PeriphNode
            x={DIESEL_X}
            y={DIESEL_Y}
            color={dieselRunning ? "#B91C1C" : "#94A3B8"}
            label={dieselRunning ? "Diesel" : "Diesel · idle"}
            value={dieselRunning ? formatKw(dieselKw) : "Off"}
          >
            <FuelIcon />
          </PeriphNode>
        )}

        {/* ── Battery node (with SOC + inverter-allocation bars) ── */}
        {showBattery && (
          <BatteryNode
            x={BATT_X}
            y={BATT_Y}
            soc={soc}
            charging={battCharging}
            discharging={battDischarging}
            dispatch={battDispatch}
            maxInverterKw={maxInverterKw}
          />
        )}

        {/* ── City centre node ── */}
        <CityNode
          x={CITY_X}
          y={CITY_Y}
          demand={demand}
          localSupply={localSupply}
          price={price}
          unmet={unmetDemand}
        />

        {/* ── Grid node (outside the city circle) ── */}
        <PeriphNode
          x={GRID_X}
          y={GRID_Y}
          color={gridColor}
          label={gridLabel}
          value={netGrid !== 0 ? formatKw(Math.abs(netGrid)) : "Idle"}
        >
          <ZapIcon />
        </PeriphNode>

        {/* ── Grid Constraints Box ── */}
        <g transform={`translate(${GRID_X}, ${GRID_Y + 86})`}>
          <rect
            x={-56}
            y={0}
            width={112}
            height={52}
            rx={6}
            fill="rgba(255, 255, 255, 0.7)"
            stroke="#CBD5E1"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <text
            x={0}
            y={14}
            textAnchor="middle"
            style={{ fontSize: 9, fontFamily: "var(--font-geist-sans)", fontWeight: 600, letterSpacing: "0.05em" }}
            fill="#64748B"
          >
            GRID LIMITS
          </text>
          <text
            x={0}
            y={28}
            textAnchor="middle"
            style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}
            fill={maxImportMw === Infinity ? "#94A3B8" : "#0F172A"}
          >
            Imp: {maxImportMw === Infinity ? "∞" : `${maxImportMw} MW`}
          </text>
          <text
            x={0}
            y={42}
            textAnchor="middle"
            style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", fontWeight: 500 }}
            fill={maxExportMw === Infinity ? "#94A3B8" : "#0F172A"}
          >
            Exp: {maxExportMw === Infinity ? "∞" : `${maxExportMw} MW`}
          </text>
          {/* Small badge for export price */}
          <rect
            x={-34}
            y={58}
            width={68}
            height={18}
            rx={9}
            fill="#F0FDF4"
            stroke="#BBF7D0"
          />
          <text
            x={0}
            y={69}
            textAnchor="middle"
            style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)", fontWeight: 600 }}
            fill="#166534"
          >
            +${exportTariff}/MWh
          </text>
        </g>

        {/* ── FCAS market node (only when the scenario unlocks FCAS) ── */}
        {showFcas && (
          <PeriphNode
            x={FCAS_X}
            y={FCAS_Y}
            color={fcasReserve > 0.01 ? "#7C3AED" : "#94A3B8"}
            label="FCAS reserve"
            value={fcasReserve > 0.01 ? formatKw(fcasReserve) : "Idle"}
          >
            <ActivityIcon />
          </PeriphNode>
        )}
      </svg>
    </div>
  );
}

// ─── Flow line with animated dash ─────────────────────────────────────────────
function FlowLine({
  x1,
  y1,
  x2,
  y2,
  active,
  color,
  direction,
  pulse,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  color: string;
  direction: "forward" | "reverse";
  pulse?: boolean;
}) {
  const animClass = !active
    ? ""
    : direction === "forward"
      ? "animate-flow-dash"
      : "animate-flow-dash-reverse";

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#E2E8F0"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {pulse && active ? (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray="7 7"
          className={animClass}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      ) : (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={active ? 4 : 2}
          strokeOpacity={active ? 0.85 : 0.3}
          strokeLinecap="round"
          strokeDasharray="7 7"
          className={animClass}
        />
      )}
    </g>
  );
}

// ─── Generic peripheral icon node (Solar / Grid / FCAS) ─────────────────────────
function PeriphNode({
  x,
  y,
  color,
  label,
  value,
  children,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  // Text sits below the circle with a comfortable gap
  const valueY = y + ICON_R + 18;
  const labelY = valueY + 16;

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={ICON_R}
        fill="white"
        stroke={color}
        strokeWidth={2}
      />
      <circle cx={x} cy={y} r={ICON_R - 5} fill={color} fillOpacity={0.1} />

      <foreignObject
        x={x - 14}
        y={y - 14}
        width={28}
        height={28}
        pointerEvents="none"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ color }}
        >
          {children}
        </div>
      </foreignObject>

      <text
        x={x}
        y={valueY}
        textAnchor="middle"
        style={{
          fontSize: 12,
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 700,
        }}
        fill="#0A0E17"
      >
        {value}
      </text>
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        style={{ fontSize: 10, fontFamily: "var(--font-geist-sans)" }}
        fill="#64748B"
      >
        {label}
      </text>
    </g>
  );
}

// ─── Battery node — shows SOC and inverter dispatch utilisation ────────────────
function BatteryNode({
  x,
  y,
  soc,
  charging,
  discharging,
  dispatch,
  maxInverterKw,
}: {
  x: number;
  y: number;
  soc: number;
  charging: boolean;
  discharging: boolean;
  dispatch: number;
  maxInverterKw: number;
}) {
  const battColor = "#2563EB";
  const socColor = soc < 0.2 ? "#DC2626" : soc < 0.5 ? "#D97706" : battColor;
  const socFilled = SOC_W * Math.max(0, Math.min(1, soc));

  // Inverter utilisation bar — fraction of the inverter's MW headroom in
  // active use this step. Sized relative to the scenario's actual cap so
  // scenarios that override `max_inverter_mw` still render correctly.
  // FCAS reservation is surfaced via its own grid node now, NOT here.
  const cap = Math.max(1e-6, maxInverterKw);
  const dispatchAbs = Math.min(cap, Math.abs(dispatch));
  const dispatchW = (dispatchAbs / cap) * INV_W;

  const label = charging ? "Charging" : discharging ? "Discharging" : "Idle";

  // Layout: circle → SOC bar → inverter bar → SOC text → status text.
  const socBarY = y + ICON_R + 8;
  const invBarY = socBarY + SOC_H + 4;
  const valueY = invBarY + INV_H + 12;
  const labelY = valueY + 14;

  return (
    <g>
      {/* Circle */}
      <circle
        cx={x}
        cy={y}
        r={ICON_R}
        fill="white"
        stroke={battColor}
        strokeWidth={2}
      />
      <circle cx={x} cy={y} r={ICON_R - 5} fill={battColor} fillOpacity={0.1} />

      {/* Icon */}
      <foreignObject
        x={x - 14}
        y={y - 14}
        width={28}
        height={28}
        pointerEvents="none"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ color: battColor }}
        >
          <BatteryFullIcon />
        </div>
      </foreignObject>

      {/* SOC progress bar — energy stored */}
      <rect
        x={x - SOC_W / 2}
        y={socBarY}
        width={SOC_W}
        height={SOC_H}
        rx={3.5}
        fill="#E2E8F0"
      />
      <rect
        x={x - SOC_W / 2}
        y={socBarY}
        width={socFilled}
        height={SOC_H}
        rx={3.5}
        fill={socColor}
      />

      {/* Inverter utilisation bar — fraction of inverter MW in active use
          this step. FCAS is its own node and no longer renders here. */}
      <rect
        x={x - INV_W / 2}
        y={invBarY}
        width={INV_W}
        height={INV_H}
        rx={3}
        fill="#F1F5F9"
      />
      {dispatchW > 0.5 && (
        <rect
          x={x - INV_W / 2}
          y={invBarY}
          width={dispatchW}
          height={INV_H}
          rx={3}
          fill={battColor}
        />
      )}

      {/* Value text: SOC % */}
      <text
        x={x}
        y={valueY}
        textAnchor="middle"
        style={{
          fontSize: 12,
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 700,
        }}
        fill="#0A0E17"
      >
        {formatPercent(soc * 100)} SOC
      </text>

      {/* Label: dispatch status */}
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        style={{ fontSize: 10, fontFamily: "var(--font-geist-sans)" }}
        fill="#64748B"
      >
        {label}
        {Math.abs(dispatch) > 0.5 ? ` · ${formatKw(Math.abs(dispatch))}` : ""}
      </text>
    </g>
  );
}

// ─── City centre node ──────────────────────────────────────────────────────────
function CityNode({
  x,
  y,
  demand,
  localSupply,
  price,
  unmet,
}: {
  x: number;
  y: number;
  demand: number;
  localSupply: number;
  price: number;
  unmet: number;
}) {
  const hasUnmet = unmet > 0.01;
  const accent = hasUnmet ? "#DC2626" : "#1F2937";

  // Layout inside circle: icon top → demand value → "demand" label
  const demandY = y + 8;
  const demandLY = y + 24;

  // Below circle
  const supplyY = y + CITY_R + 18;
  const priceY = supplyY + 16;

  return (
    <g>
      {/* Pulsing glow when unmet demand */}
      <motion.circle
        cx={x}
        cy={y}
        r={CITY_R + 10}
        fill={accent}
        fillOpacity={0.05}
        animate={{ fillOpacity: hasUnmet ? [0.05, 0.16, 0.05] : 0.05 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main circle */}
      <circle
        cx={x}
        cy={y}
        r={CITY_R}
        fill="white"
        stroke={accent}
        strokeWidth={2.5}
      />

      {/* Building icon at top of circle */}
      <foreignObject
        x={x - 14}
        y={y - CITY_R + 10}
        width={28}
        height={28}
        pointerEvents="none"
      >
        <div className="flex h-full w-full items-center justify-center text-ink">
          <BuildingIcon className="h-5 w-5" />
        </div>
      </foreignObject>

      {/* Demand MW */}
      <text
        x={x}
        y={demandY}
        textAnchor="middle"
        style={{
          fontSize: 15,
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 700,
        }}
        fill="#0A0E17"
      >
        {demand.toFixed(1)} MW
      </text>
      <text
        x={x}
        y={demandLY}
        textAnchor="middle"
        style={{ fontSize: 10, fontFamily: "var(--font-geist-sans)" }}
        fill="#64748B"
      >
        demand
      </text>

      {/* Supply (below circle) */}
      <text
        x={x}
        y={supplyY}
        textAnchor="middle"
        style={{
          fontSize: 11,
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 600,
        }}
        fill={Math.abs(demand - localSupply) < 0.5 ? "#64748B" : "#D97706"}
      >
        supply {localSupply.toFixed(1)} MW
      </text>

      {/* Price */}
      <text
        x={x}
        y={priceY}
        textAnchor="middle"
        style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
        fill="#94A3B8"
      >
        {price > 0 ? `${price.toFixed(2)} $/MWh` : "—"}
      </text>
    </g>
  );
}
