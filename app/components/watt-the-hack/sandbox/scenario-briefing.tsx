"use client";

/**
 * Top panel — the single container that orients the participant.
 *
 * Holds, top to bottom:
 *   1. Brand bar — wordmark + Colab/feedback links + the scenario picker.
 *      Always rendered (survives the initial backend connect).
 *   2. Scenario header — title, archetype, duration, narrative, optional
 *      long-form context and a short explainer-video link.
 *   3. Tools panel — the mechanics ACTIVE in this scenario, each expandable.
 *      Locked/future mechanics are intentionally not shown here.
 *
 * Everything is driven by the scenario meta from the backend; adding a
 * scenario needs no change in this file.
 */

import { ChevronDownIcon, ChevronRightIcon, PlayCircleIcon, HelpCircleIcon } from "lucide-react";
import { useState } from "react";

import { ScenarioPicker } from "~/components/watt-the-hack/sandbox/scenario-picker";
import { lookupMechanic, type MechanicDef } from "~/lib/watt-the-hack-sandbox/mechanics";
import { selectStepIndex, useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import type { ScenarioEvent } from "~/lib/watt-the-hack-sandbox/types";
import { cn } from "~/lib/watt-the-hack-sandbox/utils";

export function ScenarioBriefing() {
  const scenario = useSimStore((s) => s.scenario);
  const stepIndex = useSimStore(selectStepIndex);

  const activeIds = (scenario?.mechanics ?? []).map((m) => m.id);
  const activeMechanics = activeIds.map((id) => lookupMechanic(id));

  const activeEvent = scenario
    ? pickActiveEvent(scenario.events ?? [], stepIndex)
    : null;

  const totalSteps = scenario?.duration_steps ?? 96;
  const dtMins = Math.round((scenario?.dt_hours ?? 0.25) * 60);
  const durationHours = (totalSteps * (scenario?.dt_hours ?? 0.25)).toFixed(
    (totalSteps * (scenario?.dt_hours ?? 0.25)) % 1 === 0 ? 0 : 1,
  );

  const context = scenario?.narrative?.context;
  const explainerUrl = scenario?.narrative?.explainer_url;

  return (
    <section className="card overflow-hidden shadow-hero">
      <BrandBar />

      {scenario ? (
        <>
          <div className="flex flex-col gap-3 border-b border-line/70 px-4 py-3.5 sm:px-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {scenario.title}
                </h2>
                {scenario.archetype ? (
                  <span className="rounded-full bg-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {scenario.archetype}
                  </span>
                ) : null}
              </div>
              <span className="font-mono text-[11px] tabular-nums text-muted">
                {totalSteps} steps · {dtMins} min · {durationHours}h
              </span>
            </div>

            {scenario.narrative?.one_liner ? (
              <p className="text-sm leading-snug text-ink">
                {scenario.narrative.one_liner}
              </p>
            ) : null}

            {scenario.narrative?.teaching_moment ? (
              <p className="text-[12px] leading-relaxed text-muted">
                {scenario.narrative.teaching_moment}
              </p>
            ) : null}

            {context ? (
              <details className="group rounded-md border border-line/60 bg-canvas/50 px-3 py-2 text-[12px] leading-relaxed text-ink">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <ChevronRightIcon className="h-3 w-3 transition-transform group-open:rotate-90" />
                  What you&apos;re simulating
                </summary>
                <p className="mt-2 whitespace-pre-line">{context}</p>
              </details>
            ) : null}

            {explainerUrl ? (
              <a
                href={explainerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-md border border-sky-300 bg-sky-50 px-2.5 py-1.5 text-[11px] font-semibold text-sky-800 transition-colors hover:bg-sky-100"
              >
                <PlayCircleIcon className="h-3.5 w-3.5" />
                Watch 30s explainer
              </a>
            ) : null}


          </div>

          <ToolsPanel active={activeMechanics} />
        </>
      ) : null}
    </section>
  );
}

// ─── Brand bar ──────────────────────────────────────────────────────────────

function BrandBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 bg-canvas/40 px-4 py-2.5 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 border-r border-line/60 pr-3">
          <a
            href="https://www.linkedin.com/company/monashdeepneuron"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img src="/mdn-logo.png" alt="MDN Logo" className="h-10 object-contain" />
          </a>
          <a
            href="https://www.linkedin.com/company/mlai-aus-inc/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img src="/mlai-logo.webp" alt="MLAI Logo" className="h-10 object-contain" />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[17px] font-bold tracking-tight text-ink drop-shadow-sm">
            Watt-The-Hack Advanced Track
          </span>
          <a
            href="/watt-the-hack/resources#advanced-track"
            target="_blank"
            rel="noopener noreferrer"
            title="Official Documentation"
            className="flex items-center gap-1.5 rounded-md bg-canvas px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-ink hover:shadow-md border border-line"
          >
            <HelpCircleIcon className="h-4 w-4" />
            Docs
          </a>
          <a
            href="https://colab.research.google.com/github/AaronEliasZachariah/Watt-The-Hack-Engine-Public/blob/main/notebooks/training_starter.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          >
            <img
              src="https://colab.research.google.com/assets/colab-badge.svg"
              alt="Open in Colab"
              className="h-[22px]"
            />
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSftkjGzVPS9Ifa9bXHMHyh36v9fh_-9ALxQT7Vq4nEmvwrvRg/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gradient-to-r from-sky-500 to-indigo-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_14px_rgba(99,102,241,0.7)]"
          >
            Give Feedback
          </a>
        </div>
      </div>
      <div className="min-w-[200px]">
        <ScenarioPicker />
      </div>
    </div>
  );
}

// ─── Tools panel ──────────────────────────────────────────────────────────

function ToolsPanel({ active }: { active: MechanicDef[] }) {
  if (active.length === 0) return null;

  return (
    <div className="bg-canvas/40 px-4 py-3.5 sm:px-5">
      <h3 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
        Tools available this scenario
      </h3>
      {/* items-start: each card sizes to its own content. Without this,
          opening one card stretches its row-mate to the same height — so
          when the open card collapses, the closed neighbour appears stuck
          at full height with no content. */}
      <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2">
        {active.map((m) => (
          <ToolCard key={m.id} mech={m} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ mech }: { mech: MechanicDef }) {
  const [open, setOpen] = useState(false);
  const Icon = mech.icon;
  return (
    <div className="rounded-md border border-line bg-surface transition-shadow hover:shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left"
      >
        <span
          className={cn(
            "mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-md",
            mech.iconBg,
            mech.iconTint,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[13px] font-semibold text-ink">
            {mech.label}
          </span>
          <p className="text-[11px] leading-snug text-muted">{mech.short}</p>
        </div>
        <ChevronDownIcon
          className={cn(
            "mt-1 h-3.5 w-3.5 flex-shrink-0 text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-line/60 px-3 py-2.5 text-[11px] leading-relaxed text-ink">
          {mech.long}
        </div>
      ) : null}
    </div>
  );
}

// ─── Event banner ─────────────────────────────────────────────────────────

export function ActiveEventBanner() {
  const scenario = useSimStore((s) => s.scenario);
  const stepIndex = useSimStore(selectStepIndex);
  const activeEvent = scenario
    ? pickActiveEvent(scenario.events ?? [], stepIndex)
    : null;

  if (!activeEvent) return null;
  
  return (
    <div className="w-full">
      <EventBanner event={activeEvent} />
    </div>
  );
}

function EventBanner({ event }: { event: ScenarioEvent }) {
  const tone = SEVERITY_TONES[event.severity] ?? SEVERITY_TONES.info;
  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border px-5 py-3.5 shadow-sm transition-colors",
        tone,
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-black/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] opacity-90">
            {event.severity}
          </span>
          <div className="text-[15px] font-bold tracking-tight">{event.title}</div>
        </div>
        {event.description ? (
          <div className="mt-1.5 text-[13px] font-medium leading-relaxed opacity-95">
            {event.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const SEVERITY_TONES: Record<string, string> = {
  info: "border-sky-300 bg-sky-100 text-sky-950",
  low: "border-emerald-300 bg-emerald-100 text-emerald-950",
  medium: "border-amber-300 bg-amber-100 text-amber-950",
  high: "border-orange-400 bg-orange-100 text-orange-950",
  critical: "border-rose-400 bg-rose-100 text-rose-950",
};

function pickActiveEvent(
  events: readonly ScenarioEvent[],
  step: number,
): ScenarioEvent | null {
  const active = events.filter((e) => step >= e.at_step && step <= e.end_step);
  if (active.length === 0) return null;
  const order = ["critical", "high", "medium", "low", "info"];
  return active
    .slice()
    .sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity))[0];
}
