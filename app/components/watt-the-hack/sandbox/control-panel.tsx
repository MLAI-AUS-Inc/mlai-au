"use client";

import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  StepForwardIcon,
} from "lucide-react";

import { Button } from "~/components/watt-the-hack/sandbox/ui/button";
import { selectStepIndex, useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import { describePhase, formatClock, hourFromStep } from "~/lib/watt-the-hack-sandbox/time";
import { cn } from "~/lib/watt-the-hack-sandbox/utils";

export function TimelineBar() {
  const step = useSimStore((s) => s.step);
  const runAll = useSimStore((s) => s.runAll);
  const fastForward = useSimStore((s) => s.fastForward);
  const pause = useSimStore((s) => s.pause);
  const reset = useSimStore((s) => s.reset);
  const running = useSimStore((s) => s.running);
  const loading = useSimStore((s) => s.loading);
  const stepIndex = useSimStore(selectStepIndex);
  const totalSteps = useSimStore((s) => s.steps);
  const scenario = useSimStore((s) => s.scenario);

  const dtHours = scenario?.dt_hours ?? 0.25;
  const startHour = scenario?.start_hour ?? 0;

  const finished = stepIndex >= totalSteps;
  const progressPct = (stepIndex / totalSteps) * 100;

  const hour = hourFromStep(stepIndex, dtHours, startHour);
  const phase = describePhase(hour);
  const clock = formatClock(hour);

  return (
    <div className="flex items-center gap-3 border-t border-line/70 bg-surface px-4 py-2.5 sm:gap-4 sm:px-5">
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <span className="font-mono text-sm font-semibold tabular-nums text-ink">
          {clock}
        </span>
        <span className="text-[11px] text-muted">{phase.label}</span>
      </div>

      <div className="relative flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-subtle">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500 ease-out",
              running ? "bg-positive" : finished ? "bg-warning" : "bg-ink",
            )}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <HourTicks
          totalSteps={totalSteps}
          dtHours={dtHours}
          startHour={startHour}
        />
      </div>

      <div className="flex items-baseline gap-1 whitespace-nowrap text-[11px] text-muted">
        step{" "}
        <span className="font-mono text-xs font-semibold tabular-nums text-ink">
          {stepIndex}
        </span>
        <span className="text-muted">/</span>
        <span className="font-mono text-xs tabular-nums">{totalSteps}</span>
      </div>

      <div className="flex gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => step()}
          disabled={running || loading || finished}
        >
          <StepForwardIcon className="h-3.5 w-3.5" />
          Step
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => (running ? pause() : runAll())}
          disabled={loading || (finished && !running)}
        >
          {running ? (
            <>
              <PauseIcon className="h-3.5 w-3.5" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="h-3.5 w-3.5" />
              Run
            </>
          )}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fastForward()}
          disabled={loading || finished}
          title="Run all remaining steps in a single backend call — jump straight to the final score."
        >
          <FastForwardIcon className="h-3.5 w-3.5" />
          Skip
        </Button>
        <Button variant="ghost" size="sm" onClick={() => reset()}>
          <RotateCcwIcon className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}

// Tick labels derived from scenario duration + cadence — no hardcoded
// 24-hour assumption. Picks 5 evenly-spaced points across the run.
function HourTicks({
  totalSteps,
  dtHours,
  startHour,
}: {
  totalSteps: number;
  dtHours: number;
  startHour: number;
}) {
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const step = Math.round((i / (tickCount - 1)) * totalSteps);
    return formatClock(hourFromStep(step, dtHours, startHour));
  });
  return (
    <div className="pointer-events-none absolute inset-x-0 top-2.5 flex justify-between px-0.5 text-[9px] font-medium text-muted">
      {ticks.map((label, i) => (
        <span key={i}>{label}</span>
      ))}
    </div>
  );
}
