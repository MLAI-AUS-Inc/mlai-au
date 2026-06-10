"use client";

/**
 * Conditional visuals — forecast chart + throughput-budget gauge.
 *
 * Each component checks the scenario's active mechanics and renders
 * itself only when its mechanic is declared. No prop-drilling: state
 * comes from useSimStore. Composed together by <ScenarioExtras /> which
 * the page mounts unconditionally — empty when no extras apply.
 */

import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/watt-the-hack/sandbox/ui/card";
import { useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import { formatClock, hourFromStep } from "~/lib/watt-the-hack-sandbox/time";

function activeMechanic(
  mechanics: ReadonlyArray<{ id: string; config?: Record<string, unknown> }> | undefined,
  id: string,
) {
  return (mechanics ?? []).find((m) => m.id === id);
}

export function ScenarioExtras() {
  const scenario = useSimStore((s) => s.scenario);
  const mechanics = scenario?.mechanics;
  const hasForecast = !!activeMechanic(mechanics, "forecast");
  const hasBudget = !!activeMechanic(mechanics, "throughput_budget");
  const hasForecastBias = !!activeMechanic(mechanics, "forecast_bias");
  if (!scenario) return null;

  // When the scenario uses forecast_bias, surface the solar chart as well
  // — that's where the divergence between forecast and reality will show
  // up most clearly. Otherwise just the headline demand chart.
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      <PriceSignalCard hasForecast={hasForecast} />
      {hasForecast ? (
        <>
          <ForecastChart
            channel="price"
            title="Price · forecast horizon"
            unit="$/MWh"
            color="#0EA5E9"
            subtitle="Current price is exact. Forecast prices are noisy lookahead values exposed to controllers as state['forecast']['price']."
          />
          <ForecastChart
            channel="demand"
            title="Demand · forecast horizon"
            unit="MW"
            color="#0F172A"
          />
        </>
      ) : null}
      {hasForecast && hasForecastBias ? (
        <ForecastChart
          channel="solar"
          title="Solar · forecast vs actual"
          unit="MW"
          color="#D97706"
          subtitle="Forecast bias is in play — watch for divergence inside the event window."
        />
      ) : null}
      {hasBudget ? <ThroughputGauge /> : null}
    </div>
  );
}

// ─── Price signal card ────────────────────────────────────────────────────────

function PriceSignalCard({ hasForecast }: { hasForecast: boolean }) {
  const state = useSimStore((s) => s.state);
  const statesHistory = useSimStore((s) => s.statesHistory);
  const currentPrice = numberOrNull(state?.price);
  const priceForecast =
    (state?.forecast as Partial<Record<ForecastChannel, number[]>> | undefined)
      ?.price ?? [];
  const observedPrices = statesHistory
    .map((s) => numberOrNull(s.price))
    .filter((v): v is number => v !== null);
  const allVisiblePrices =
    currentPrice === null ? observedPrices : [...observedPrices, currentPrice];
  const observedMin =
    allVisiblePrices.length > 0 ? Math.min(...allVisiblePrices) : null;
  const observedMax =
    allVisiblePrices.length > 0 ? Math.max(...allVisiblePrices) : null;
  const nextForecast = numberOrNull(priceForecast[0]);
  const forecastMax =
    priceForecast.length > 0 ? Math.max(...priceForecast.map(Number)) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price signal</CardTitle>
        <p className="text-[11px] text-muted">
          For participants, the safest source is{" "}
          <code className="rounded bg-canvas px-1 font-mono text-[10px] text-ink">
            state[&apos;price&apos;]
          </code>
          . Use the forecast only when this scenario unlocks lookahead.
        </p>
      </CardHeader>
      <CardContent className="flex h-56 flex-col justify-between gap-3">
        <div className="grid grid-cols-2 gap-2">
          <PriceStat
            label="Current import"
            value={currentPrice === null ? "n/a" : formatPrice(currentPrice)}
            emphasis
          />
          <PriceStat
            label={hasForecast ? "Next forecast" : "Forecast"}
            value={
              hasForecast && nextForecast !== null
                ? formatPrice(nextForecast)
                : "locked"
            }
          />
          <PriceStat
            label="Seen low"
            value={observedMin === null ? "n/a" : formatPrice(observedMin)}
          />
          <PriceStat
            label={hasForecast ? "Lookahead high" : "Seen high"}
            value={
              hasForecast && forecastMax !== null
                ? formatPrice(forecastMax)
                : observedMax === null
                  ? "n/a"
                  : formatPrice(observedMax)
            }
          />
        </div>

        <div className="space-y-1.5 rounded-md border border-line/70 bg-canvas/60 p-2 text-[11px] leading-relaxed text-muted">
          <div>
            Read now:{" "}
            <code className="rounded bg-surface px-1 font-mono text-[10px] text-ink">
              price = float(state.get(&apos;price&apos;, 0))
            </code>
          </div>
          <div>
            {hasForecast ? (
              <>
                Look ahead:{" "}
                <code className="rounded bg-surface px-1 font-mono text-[10px] text-ink">
                  state[&apos;forecast&apos;][&apos;price&apos;]
                </code>
              </>
            ) : (
              "No future price data is exposed in this scenario."
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PriceStat({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </div>
      <div
        className={
          emphasis
            ? "mt-1 font-mono text-xl font-semibold tabular-nums text-ink"
            : "mt-1 font-mono text-sm font-semibold tabular-nums text-ink"
        }
      >
        {value}
      </div>
    </div>
  );
}

// ─── Forecast chart ───────────────────────────────────────────────────────────

interface ForecastRow {
  step: number;
  hour: string;
  actual: number | null;
  forecast: number | null;
}

type ForecastChannel = "demand" | "solar" | "price";

function ForecastChart({
  channel,
  title,
  unit,
  color,
  subtitle,
}: {
  channel: ForecastChannel;
  title: string;
  unit: string;
  color: string;
  subtitle?: string;
}) {
  const state = useSimStore((s) => s.state);
  const statesHistory = useSimStore((s) => s.statesHistory);
  const scenario = useSimStore((s) => s.scenario);
  const dt = scenario?.dt_hours ?? 0.25;
  const startHour = scenario?.start_hour ?? 0;

  const rows = useMemo<ForecastRow[]>(() => {
    // Walk the recorded states + append the forecast horizon from the
    // most recent state. Aligns "what we've seen" (actual) with "what
    // the controller is being told" (noisy forecast lookahead).
    const out: ForecastRow[] = [];

    for (let i = 0; i < statesHistory.length; i++) {
      const s = statesHistory[i];
      const actualVal =
        channel === "price"
          ? Number(s?.price ?? 0)
          : Number(s?.[channel] ?? 0);
      out.push({
        step: i,
        hour: formatClock(hourFromStep(i, dt, startHour)),
        actual: round(actualVal),
        forecast: null,
      });
    }

    const t = statesHistory.length;
    const fc = state?.forecast as Partial<Record<ForecastChannel, number[]>> | undefined;
    const series = fc?.[channel] ?? [];
    for (let h = 0; h < series.length; h++) {
      out.push({
        step: t + h,
        hour: formatClock(hourFromStep(t + h, dt, startHour)),
        actual: null,
        forecast: round(series[h] ?? 0),
      });
    }
    return out;
  }, [channel, state, statesHistory, dt, startHour]);

  const blurb =
    subtitle ??
    `Actual (so far) vs the noisy lookahead the controller currently sees (AR(1) error — fit a bias, don't chase jitter). ${unit}.`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-[11px] text-muted">{blurb}</p>
      </CardHeader>
      <CardContent className="h-56">
        {rows.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            Step the simulation to populate this chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={rows}
              margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
            >
              <CartesianGrid stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="hour"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                width={36}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={color}
                strokeWidth={1.6}
                dot={false}
                isAnimationActive={false}
                name="Actual"
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#0EA5E9"
                strokeWidth={1.6}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
                name="Forecast"
                connectNulls={false}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
                iconType="plainline"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Throughput-budget gauge ──────────────────────────────────────────────────

function ThroughputGauge() {
  const state = useSimStore((s) => s.state);
  const scenario = useSimStore((s) => s.scenario);

  const mech = activeMechanic(scenario?.mechanics, "throughput_budget");
  const totalKwh = Number((mech?.config?.mwh as number | undefined) ?? 0);
  const remainingKwh = Number(
    (state?.battery_throughput_remaining_mwh as number | undefined) ?? totalKwh,
  );
  const used = Math.max(0, totalKwh - remainingKwh);
  const pct = totalKwh > 0 ? Math.min(100, (used / totalKwh) * 100) : 0;
  const remainingPct = 100 - pct;

  const tone =
    remainingPct < 10
      ? "bg-rose-500"
      : remainingPct < 30
        ? "bg-amber-500"
        : "bg-indigo-500";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Battery throughput budget</CardTitle>
        <p className="text-[11px] text-muted">
          Total |MWh| the battery may move across the whole run. Every MWh
          charged OR discharged eats the budget — spend cycles where the
          price spread is biggest.
        </p>
      </CardHeader>
      <CardContent className="flex h-56 flex-col justify-center gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Remaining
            </div>
            <div className="font-mono text-3xl font-semibold tabular-nums text-ink">
              {remainingKwh.toFixed(1)} MWh
            </div>
          </div>
          <div className="text-right text-[11px] text-muted">
            of {totalKwh.toFixed(0)} MWh total
            <div className="mt-0.5 font-mono tabular-nums text-ink">
              {used.toFixed(1)} MWh used
            </div>
          </div>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-subtle">
          <div
            className={`h-full rounded-full transition-all duration-300 ${tone}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-[11px] text-muted">
          Read in code as{" "}
          <code className="rounded bg-canvas px-1 font-mono text-[10px] text-ink">
            state[&apos;battery_throughput_remaining_mwh&apos;]
          </code>
          .
        </div>
      </CardContent>
    </Card>
  );
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function numberOrNull(value: unknown): number | null {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function formatPrice(value: number): string {
  return `$${value.toFixed(0)}/MWh`;
}
