"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/watt-the-hack/sandbox/ui/card";
import { useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import { formatClock, hourFromStep } from "~/lib/watt-the-hack-sandbox/time";

// Brand colours for the flat single-node series
const COLOR_DEMAND = "#0F172A"; // dark ink
const COLOR_SOLAR = "#D97706"; // amber
const COLOR_SOC = "#2563EB"; // blue
const COLOR_BATTERY = "#7C3AED"; // violet
const COLOR_GRID_IMP = "#DC2626"; // red  (positive = import)
const COLOR_GRID_EXP = "#059669"; // green (negative = export, shown positive)
const COLOR_PRICE = "#0EA5E9"; // sky
const COLOR_UNMET = "#EF4444"; // danger red

interface ChartRow {
  step: number;
  hour: string;
  demand: number;
  solar: number;
  soc: number;
  battery: number;
  net_grid: number;
  price: number;
  unmet: number;
}

export function TimeSeriesCharts() {
  const statesHistory = useSimStore((s) => s.statesHistory);
  const outputsHistory = useSimStore((s) => s.outputsHistory);
  const scenario = useSimStore((s) => s.scenario);
  const dtHours = scenario?.dt_hours ?? 0.25;
  const startHour = scenario?.start_hour ?? 0;

  const rows = useMemo<ChartRow[]>(() => {
    return outputsHistory.map((out, idx) => {
      const state = statesHistory[idx];
      return {
        step: idx,
        hour: formatClock(hourFromStep(idx, dtHours, startHour)),
        demand: round(state?.demand ?? 0),
        solar: round(state?.solar ?? 0),
        soc: round((state?.soc ?? 0) * 100),
        battery: round(out.battery_dispatch ?? 0),
        net_grid: round(out.net_grid_power ?? 0),
        price: round(out.import_price ?? 0),
        unmet: round(out.unmet_demand ?? 0),
      };
    });
  }, [outputsHistory, statesHistory, dtHours, startHour]);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {/* Chart 1 — Demand vs Solar */}
      <ChartCard title="Demand vs Solar" subtitle="MW city-wide">
        <Chart
          rows={rows}
          series={[
            { dataKey: "demand", name: "Demand", color: COLOR_DEMAND },
            {
              dataKey: "solar",
              name: "Solar",
              color: COLOR_SOLAR,
              dashed: true,
            },
          ]}
        />
      </ChartCard>

      {/* Chart 2 — Battery */}
      <ChartCard title="Battery" subtitle="SOC % · dispatch MW">
        <Chart
          rows={rows}
          series={[
            {
              dataKey: "soc",
              name: "SOC (%)",
              color: COLOR_SOC,
              yAxisId: "pct",
            },
            {
              dataKey: "battery",
              name: "Dispatch (MW)",
              color: COLOR_BATTERY,
              yAxisId: "mw",
              dashed: true,
            },
          ]}
          dualAxis={{ pctDomain: [0, 100] }}
        />
      </ChartCard>

      {/* Chart 3 — Grid & Price */}
      <ChartCard
        title="Grid & Price"
        subtitle="net MW (+ import / − export) · tariff $/MWh"
      >
        <Chart
          rows={rows}
          series={[
            {
              dataKey: "net_grid",
              name: "Net grid (MW)",
              color: COLOR_GRID_IMP,
              yAxisId: "mw",
            },
            {
              dataKey: "unmet",
              name: "Unmet (MW)",
              color: COLOR_UNMET,
              yAxisId: "mw",
              dashed: true,
            },
            {
              dataKey: "price",
              name: "Price ($/MWh)",
              color: COLOR_PRICE,
              yAxisId: "price",
            },
          ]}
          dualAxis={{ priceDomain: "auto" }}
          zeroLine
        />
      </ChartCard>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-[11px] text-muted">{subtitle}</p>
      </CardHeader>
      <CardContent className="h-56">{children}</CardContent>
    </Card>
  );
}

interface SeriesSpec {
  dataKey: string;
  name: string;
  color: string;
  dashed?: boolean;
  yAxisId?: string;
}

interface DualAxisConfig {
  pctDomain?: [number, number];
  priceDomain?: [number, number] | "auto";
}

function Chart({
  rows,
  series,
  dualAxis,
  zeroLine,
}: {
  rows: ChartRow[];
  series: SeriesSpec[];
  dualAxis?: DualAxisConfig;
  zeroLine?: boolean;
}) {
  if (rows.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-muted">
        Step the simulation to populate this chart.
      </div>
    );
  }

  // Recharts requires that yAxisId props are either consistently absent (single-axis)
  // or consistently present with matching ids (dual-axis). Never pass yAxisId={undefined}
  // explicitly — it registers as id "undefined" instead of the default id 0, causing the
  // "Could not find yAxis by id 0" invariant error.
  const hasDual = !!dualAxis;

  const axisProps = {
    stroke: "#94A3B8",
    tickLine: false as const,
    axisLine: false as const,
    tick: { fontSize: 10 },
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={rows}
        margin={{ top: 8, right: hasDual ? 44 : 8, bottom: 0, left: -8 }}
      >
        <CartesianGrid stroke="#F1F5F9" vertical={false} />
        <XAxis dataKey="hour" {...axisProps} interval="preserveStartEnd" />

        {/* ── Single-axis layout ── */}
        {!hasDual && <YAxis {...axisProps} width={36} />}

        {/* ── Dual-axis layout: PCT (left) + MW (right) ── */}
        {hasDual && dualAxis?.pctDomain && (
          <>
            <YAxis
              yAxisId="pct"
              {...axisProps}
              width={36}
              domain={dualAxis.pctDomain}
            />
            <YAxis yAxisId="mw" {...axisProps} width={36} orientation="right" />
          </>
        )}

        {/* ── Dual-axis layout: MW (left) + PRICE (right) ── */}
        {hasDual && dualAxis?.priceDomain && (
          <>
            <YAxis yAxisId="mw" {...axisProps} width={36} />
            <YAxis
              yAxisId="price"
              {...axisProps}
              width={40}
              orientation="right"
              domain={dualAxis.priceDomain as any}
            />
          </>
        )}

        {zeroLine && (
          <ReferenceLine
            yAxisId="mw"
            y={0}
            stroke="#CBD5E1"
            strokeDasharray="3 3"
          />
        )}

        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            fontSize: 12,
          }}
          labelClassName="font-medium text-ink"
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
          iconType="plainline"
        />
        {series.map((s) => {
          // Only spread yAxisId when it's explicitly defined (dual-axis charts).
          // For single-axis charts omit the prop entirely so Recharts uses its default.
          const lineProps = s.yAxisId ? { yAxisId: s.yAxisId } : {};
          return (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              stroke={s.color}
              strokeDasharray={s.dashed ? "4 4" : undefined}
              strokeWidth={1.6}
              dot={false}
              isAnimationActive={false}
              name={s.name}
              {...lineProps}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
