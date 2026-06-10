"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import {
  selectLatestOutputs,
  selectStepIndex,
  useSimStore,
} from "~/lib/watt-the-hack-sandbox/sim-store";
import {
  ARC_PATH,
  celestialPosition,
  describePhase,
  formatClock,
  hourFromStep,
} from "~/lib/watt-the-hack-sandbox/time";
import { cn } from "~/lib/watt-the-hack-sandbox/utils";

const VIEW_W = 200;
const VIEW_H = 100;

export function SkyStrip() {
  const stepIndex = useSimStore(selectStepIndex);
  const totalSteps = useSimStore((s) => s.steps);
  const state = useSimStore((s) => s.state);
  const scenario = useSimStore((s) => s.scenario);

  const dtHours = scenario?.dt_hours ?? 0.25;
  const startHour = scenario?.start_hour ?? 0;

  const hour = hourFromStep(stepIndex, dtHours, startHour);
  const phase = useMemo(() => describePhase(hour), [hour]);
  const sun = useMemo(() => celestialPosition(hour), [hour]);
  const clock = formatClock(hour);

  const latest = useSimStore(selectLatestOutputs);
  const totalSolar = state?.solar ?? 0;
  const totalDemand = state?.demand ?? 0;
  const importPrice = latest?.import_price ?? 0;

  const isLight = phase.ink === "light";
  const textOnSky = isLight ? "text-white" : "text-slate-900";
  const subtleStroke = isLight
    ? "rgba(255,255,255,0.55)"
    : "rgba(15,23,42,0.55)";
  const subtleStrokeFaint = isLight
    ? "rgba(255,255,255,0.25)"
    : "rgba(15,23,42,0.18)";

  return (
    <motion.div
      className="relative overflow-hidden"
      animate={{
        background: `linear-gradient(135deg, ${phase.gradient[0]} 0%, ${phase.gradient[1]} 100%)`,
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {!sun.isDay ? <Stars /> : null}

      <div className="relative flex items-stretch">
        <div
          className={cn(
            "flex flex-1 items-center gap-5 py-3 pl-5 pr-4",
            textOnSky,
          )}
        >
          <div className="flex flex-col">
            <div
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.18em]",
                isLight ? "text-white/80" : "text-slate-700",
              )}
            >
              {phase.label}
            </div>
            <div className="font-mono text-[34px] font-semibold leading-none tabular-nums">
              {clock}
            </div>
            <div
              className={cn(
                "mt-0.5 text-[11px] leading-tight",
                isLight ? "text-white/85" : "text-slate-700",
              )}
            >
              {phase.caption}
            </div>
          </div>

          {phase.isPeak ? (
            <div
              className={cn(
                "self-start rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                phase.isPeak === "demand"
                  ? "bg-rose-500/95 text-white"
                  : "bg-amber-300/95 text-slate-900",
              )}
            >
              {phase.isPeak === "demand" ? "Demand peak" : "Solar peak"}
            </div>
          ) : null}

          <div className="ml-auto hidden flex-row gap-2 sm:flex">
            <SkyPill
              label="Demand"
              value={`${totalDemand.toFixed(1)} MW`}
              ink={phase.ink}
            />
            <SkyPill
              label="Price"
              value={importPrice > 0 ? `$${importPrice.toFixed(2)}/MWh` : "—"}
              ink={phase.ink}
            />
            <SkyPill
              label="Solar"
              value={`${totalSolar.toFixed(1)} MW`}
              ink={phase.ink}
            />
            <SkyPill
              label="Step"
              value={`${stepIndex} / ${totalSteps}`}
              ink={phase.ink}
            />
          </div>
        </div>

        <div className="relative w-[42%] max-w-[420px] py-3 pb-6 pr-5">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="block h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff7d6" stopOpacity={0.95} />
                <stop offset="55%" stopColor="#facc15" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#facc15" stopOpacity={0} />
              </radialGradient>
              <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1f5f9" stopOpacity={0.85} />
                <stop offset="55%" stopColor="#cbd5e1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0} />
              </radialGradient>
            </defs>

            <line
              x1={4}
              y1={88}
              x2={196}
              y2={88}
              stroke={subtleStroke}
              strokeWidth={0.8}
            />
            <path
              d={ARC_PATH}
              fill="none"
              stroke={subtleStrokeFaint}
              strokeWidth={0.7}
              strokeDasharray="2.2 3"
            />

            <motion.circle
              initial={false}
              animate={{ cx: sun.x, cy: sun.y }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              cx={sun.x}
              cy={sun.y}
              r={sun.isDay ? 14 : 9}
              fill={sun.isDay ? "url(#sun-glow)" : "url(#moon-glow)"}
            />
            <motion.circle
              initial={false}
              animate={{ cx: sun.x, cy: sun.y }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              cx={sun.x}
              cy={sun.y}
              r={5.5}
              fill={sun.isDay ? "#fde68a" : "#e2e8f0"}
              stroke={sun.isDay ? "#f59e0b" : "#94a3b8"}
              strokeWidth={0.8}
            />
            {!sun.isDay ? (
              <motion.circle
                initial={false}
                animate={{ cx: sun.x + 1.6, cy: sun.y - 1.6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                cx={sun.x + 1.6}
                cy={sun.y - 1.6}
                r={1.8}
                fill={phase.gradient[0]}
                opacity={0.75}
              />
            ) : null}
          </svg>

          <div
            className="pointer-events-none absolute bottom-1 left-0 right-5 h-4"
            aria-hidden
          >
            {[0, 6, 12, 18].map((markerHour) => {
              const m = celestialPosition(markerHour);
              const leftPct = (m.x / VIEW_W) * 100;
              return (
                <div
                  key={markerHour}
                  className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center font-mono text-[10px] leading-none tabular-nums"
                  style={{ left: `${leftPct}%`, color: subtleStroke }}
                >
                  <span
                    className="mb-1 h-[3px] w-[3px] rounded-full"
                    style={{ background: subtleStroke }}
                  />
                  <span>{markerHour.toString().padStart(2, "0")}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 bg-white/30"
        style={{ width: `${(stepIndex / totalSteps) * 100}%` }}
      />
    </motion.div>
  );
}

function SkyPill({
  label,
  value,
  ink,
}: {
  label: string;
  value: string;
  ink: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-2 py-1",
        ink === "light"
          ? "border-white/20 bg-white/10 text-white"
          : "border-slate-900/15 bg-white/55 text-slate-900",
      )}
    >
      <div
        className={cn(
          "text-[9px] font-semibold uppercase tracking-wider",
          ink === "light" ? "text-white/75" : "text-slate-600",
        )}
      >
        {label}
      </div>
      <div className="text-[12px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}

const STAR_POSITIONS: { x: number; y: number; r: number; o: number }[] = [
  { x: 8, y: 14, r: 0.4, o: 0.65 },
  { x: 18, y: 26, r: 0.5, o: 0.85 },
  { x: 28, y: 12, r: 0.3, o: 0.55 },
  { x: 38, y: 22, r: 0.45, o: 0.7 },
  { x: 48, y: 10, r: 0.4, o: 0.6 },
  { x: 60, y: 30, r: 0.35, o: 0.55 },
  { x: 72, y: 14, r: 0.5, o: 0.85 },
  { x: 84, y: 28, r: 0.4, o: 0.6 },
  { x: 96, y: 16, r: 0.4, o: 0.7 },
  { x: 108, y: 30, r: 0.35, o: 0.55 },
  { x: 122, y: 12, r: 0.45, o: 0.7 },
  { x: 134, y: 24, r: 0.4, o: 0.6 },
  { x: 146, y: 14, r: 0.35, o: 0.55 },
  { x: 158, y: 28, r: 0.45, o: 0.75 },
  { x: 170, y: 12, r: 0.4, o: 0.65 },
  { x: 182, y: 22, r: 0.35, o: 0.55 },
];

function Stars() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} 36`}
      className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      {STAR_POSITIONS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="white"
          fillOpacity={s.o}
        />
      ))}
    </svg>
  );
}
