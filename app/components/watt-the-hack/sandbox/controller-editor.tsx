"use client";

import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2Icon,
  CircleAlertIcon,
  CodeIcon,
  RotateCcwIcon,
  SlidersHorizontalIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Button } from "~/components/watt-the-hack/sandbox/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/watt-the-hack/sandbox/ui/card";
import { Slider } from "~/components/watt-the-hack/sandbox/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/watt-the-hack/sandbox/ui/tabs";
import {
  getTemplatesForScenario,
  type ControllerTemplate,
} from "~/lib/watt-the-hack-sandbox/controller-templates";
import { draftNeedsConfirm } from "~/lib/watt-the-hack-sandbox/controller-drafts";
import { DEFAULT_CONTROLLER_SOURCE } from "~/lib/watt-the-hack-sandbox/default-controller";
import { lookupMechanic, type MechanicSlider } from "~/lib/watt-the-hack-sandbox/mechanics";
import { useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import type { SimpleControllerParams } from "~/lib/watt-the-hack-sandbox/types";
import { cn } from "~/lib/watt-the-hack-sandbox/utils";

// Code-split Monaco — it's ~2 MB and only used on this page. Originally this
// used Next.js `dynamic()` (file was synced from a Next-based source), which
// doesn't exist in this React Router project; we use React's built-in `lazy`
// + `Suspense` instead. SSR is fine to skip — the editor is interactive only.
const MonacoEditor = lazy(async () => {
  const mod = await import("@monaco-editor/react");
  return { default: mod.default };
});

export function ControllerEditor() {
  const controllerKind = useSimStore((s) => s.controllerKind);
  const setControllerKind = useSimStore((s) => s.setControllerKind);
  const simpleParams = useSimStore((s) => s.simpleParams);
  const setSimpleParams = useSimStore((s) => s.setSimpleParams);
  // Draft + applied live in the store, keyed per-scenario and persisted, so
  // switching scenarios (and refreshes) never lose code. `dirty` = the editor
  // content hasn't been Applied to the running sim yet.
  const controllerSource = useSimStore((s) => s.controllerSource);
  const controllerDraft = useSimStore((s) => s.controllerDraft);
  const setControllerDraft = useSimStore((s) => s.setControllerDraft);
  const applyController = useSimStore((s) => s.applyController);
  const controllerError = useSimStore((s) => s.controllerError);
  const scenario = useSimStore((s) => s.scenario);

  const dirty = controllerDraft !== controllerSource;

  // Sliders are scenario-driven: only mechanics this scenario declares get
  // a slider. New mechanic = one entry in lib/mechanics.ts; no edit here.
  const activeSliders = (scenario?.mechanics ?? [])
    .map((m) => lookupMechanic(m.id).slider)
    .filter((s): s is MechanicSlider => s !== undefined);

  // Scenario-level controller-mode gate. Tutorial 1 restricts to "simple"
  // so brand-new players just feel the knobs; later tutorials introduce
  // "code". When absent, both modes are allowed.
  const allowedModes = scenario?.controller_modes;
  const simpleAllowed = !allowedModes || allowedModes.includes("simple");
  const codeAllowed = !allowedModes || allowedModes.includes("code");

  useEffect(() => {
    if (!simpleAllowed && controllerKind === "simple") {
      setControllerKind("code");
    } else if (!codeAllowed && controllerKind === "code") {
      setControllerKind("simple");
    }
  }, [simpleAllowed, codeAllowed, controllerKind, setControllerKind]);

  const templates = useMemo(
    () => getTemplatesForScenario(scenario?.id ?? null),
    [scenario?.id],
  );

  // "Known" starting points the user could be sitting on without having
  // hand-edited anything. Loading away from one of these is frictionless; only
  // genuinely custom unsaved work triggers a confirm.
  const knownSources = useMemo(
    () => [DEFAULT_CONTROLLER_SOURCE, ...templates.map((t) => t.source)],
    [templates],
  );

  // Destructive draft replacements (load template / reset / revert) route
  // through here so they ask before throwing away custom unsaved edits.
  const [pending, setPending] = useState<{
    source: string;
    action: string;
  } | null>(null);

  const requestReplace = (source: string, action: string) => {
    if (source === controllerDraft) return;
    if (draftNeedsConfirm(controllerDraft, controllerSource, knownSources)) {
      setPending({ source, action });
    } else {
      setControllerDraft(source);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Controller</CardTitle>
            <p className="text-xs text-muted">
              Returns an action dict each timestep. Simple tab pushes constant
              values; Code tab runs your Python against the live state. The
              engine clips against physical limits before applying.
            </p>
          </div>
          <ControllerErrorPill error={controllerError} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={controllerKind}
          onValueChange={(value) =>
            setControllerKind(value as "simple" | "code")
          }
        >
          <TabsList>
            {simpleAllowed ? (
              <TabsTrigger value="simple" className="gap-1.5">
                <SlidersHorizontalIcon className="h-3 w-3" />
                Simple
              </TabsTrigger>
            ) : null}
            {codeAllowed ? (
              <TabsTrigger value="code" className="gap-1.5">
                <CodeIcon className="h-3 w-3" />
                Code
              </TabsTrigger>
            ) : null}
          </TabsList>

          <TabsContent value="simple">
            <p className="mb-4 text-[11px] text-muted">
              Each slider is the constant action value sent every step. The
              engine clips against inverter, SOC, and generator limits. Only
              the actions this scenario supports are shown.
            </p>
            {activeSliders.length === 0 ? (
              <p className="text-xs text-muted">
                This scenario exposes no Simple-tab actions. Switch to the
                Code tab to write a controller.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                {activeSliders.map((s) => (
                  <SliderField
                    key={s.actionKey}
                    label={s.label}
                    description={s.description}
                    value={simpleParams[s.actionKey]}
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    onChange={(v) =>
                      setSimpleParams({
                        [s.actionKey]: v,
                      } as Partial<SimpleControllerParams>)
                    }
                    format={(v) => `${v.toFixed(0)} MW`}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="code">
            <TemplatePicker
              templates={templates}
              currentSource={controllerDraft}
              onLoad={(template) =>
                requestReplace(
                  template.source,
                  `load the “${template.label}” template`,
                )
              }
            />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_280px]">
              <div className="overflow-hidden rounded-lg border border-line">
                <Suspense
                  fallback={
                    <div className="flex h-[460px] items-center justify-center bg-[#fafafa] text-sm text-muted-foreground">
                      Loading editor…
                    </div>
                  }
                >
                <MonacoEditor
                  height="460px"
                  language="python"
                  theme="vs"
                  value={controllerDraft}
                  onChange={(value: string | undefined) => {
                    setControllerDraft(value ?? "");
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: "var(--font-geist-mono)",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    padding: { top: 16, bottom: 16 },
                    fontLigatures: true,
                    tabSize: 4,
                    automaticLayout: true,
                    scrollbar: {
                      vertical: "auto",
                      horizontal: "auto",
                    },
                  }}
                />
                </Suspense>
              </div>
              <CodeReference />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="max-w-md text-[11px] text-muted">
                Imports and side effects are disabled. On error the engine
                falls back to do-nothing actions — your score will look like
                the passive baseline, NOT your sliders. <strong>Note:</strong> You cannot import packages inside this sandbox. Switch to your local IDE or Google Colab if you need to use external libraries.
              </div>
              <div className="flex items-center gap-2">
                <DraftStatus dirty={dirty} />
                {dirty ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    title="Discard unsaved edits and return to the applied code"
                    onClick={() =>
                      requestReplace(
                        controllerSource,
                        "discard your unsaved changes",
                      )
                    }
                  >
                    <RotateCcwIcon className="h-3 w-3" />
                    Revert
                  </Button>
                ) : null}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    requestReplace(
                      DEFAULT_CONTROLLER_SOURCE,
                      "reset to the starter controller",
                    )
                  }
                >
                  Reset code
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  disabled={!dirty}
                  onClick={applyController}
                >
                  Apply
                </Button>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-muted">
              Your code is saved per scenario — switch scenarios freely and it's
              restored when you come back, even after a refresh.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>

      <ConfirmDialog
        open={pending !== null}
        title="Discard unsaved changes?"
        body={
          pending
            ? `You have edits that haven't been applied. Continue to ${pending.action}? Your unsaved changes will be lost.`
            : ""
        }
        confirmLabel="Discard & continue"
        onConfirm={() => {
          if (pending) setControllerDraft(pending.source);
          setPending(null);
        }}
        onCancel={() => setPending(null)}
      />
    </Card>
  );
}

interface SliderFieldProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  trailing?: React.ReactNode;
}

function SliderField({
  label,
  description,
  value,
  min,
  max,
  step,
  onChange,
  format,
  trailing,
}: SliderFieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-ink">{label}</div>
          <div className="text-[11px] leading-relaxed text-muted">
            {description}
          </div>
        </div>
        <span className="text-sm font-semibold tabular-nums text-ink">
          {format(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="mt-2"
      />
      {trailing ? <div className="mt-1.5">{trailing}</div> : null}
    </div>
  );
}

// Shows whether the editor content matches what the sim is running. Amber when
// there are edits waiting on Apply; green once applied.
function DraftStatus({ dirty }: { dirty: boolean }) {
  return (
    <span
      title={
        dirty
          ? "You have unsaved edits — click Apply to run them"
          : "The editor matches the controller the sim is running"
      }
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        dirty
          ? "border-warning/40 bg-warning/5 text-warning"
          : "border-positive/30 bg-positive/5 text-positive",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dirty ? "bg-warning" : "bg-positive",
        )}
      />
      {dirty ? "Unsaved changes" : "Applied"}
    </span>
  );
}

function CodeReference() {
  const scenario = useSimStore((s) => s.scenario);
  const limits = scenario?.limits;
  const penalties = scenario?.penalties;
  const dtMins = Math.round((scenario?.dt_hours ?? 0.25) * 60);
  const totalSteps = scenario?.duration_steps ?? 96;
  const activeIds = new Set((scenario?.mechanics ?? []).map((m) => m.id));
  const hasForecast = activeIds.has("forecast");
  const hasBudget = activeIds.has("throughput_budget");

  // Build the action block dynamically — only show keys for mechanics this
  // scenario supports. Mirrors the Simple-tab slider filtering.
  const actionLines: string[] = [];
  if (activeIds.has("battery"))
    actionLines.push(`  "battery_flow_mw":      float,  # MW, + dis / - chg`);
  if (activeIds.has("diesel"))
    actionLines.push(`  "emergency_generator":  float,  # MW, >= 0`);
  if (activeIds.has("curtailment"))
    actionLines.push(`  "curtail_solar":        float,  # MW, >= 0`);
  if (activeIds.has("fcas"))
    actionLines.push(
      `  "fcas_reserve_mw":      float,  # MW, >= 0 (eats battery_flow budget)`,
    );

  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-[11px] text-muted">
      <section>
        <div className="mb-1 text-xs font-semibold text-ink">state (read)</div>
        <ul className="space-y-0.5 font-mono text-[11px] text-ink">
          <li>
            <span className="text-muted">time</span> · int step (0–{totalSteps - 1}, {dtMins}min)
          </li>
          <li>
            <span className="text-muted">demand</span> · MW (current step only)
          </li>
          <li>
            <span className="text-muted">solar</span> · MW (current step only)
          </li>
          <li>
            <span className="text-muted">soc</span> · 0–1 (current step only)
          </li>
          <li>
            <span className="text-muted">price</span> · $/MWh import (current step)
          </li>
          {hasForecast ? (
            <li>
              <span className="text-muted">forecast</span> · noisy lookahead
              dict (up to 24h ahead)
            </li>
          ) : null}
          {hasBudget ? (
            <li>
              <span className="text-muted">battery_throughput_remaining_mwh</span>{" "}
              · float
            </li>
          ) : null}
        </ul>
      </section>

      <section>
        <div className="mb-1 text-xs font-semibold text-ink">
          action (return)
        </div>
        <pre className="whitespace-pre-wrap font-mono text-[11px] text-ink">{`{
${actionLines.join("\n")}
}`}</pre>
      </section>

      {limits ? (
        <section>
          <div className="mb-1 text-xs font-semibold text-ink">engine limits</div>
          <ul className="space-y-0.5">
            <li>
              battery: ±{limits.max_inverter_mw.toFixed(0)} MW inverter,{" "}
              {limits.battery_capacity_mwh.toFixed(0)} MWh
            </li>
            <li>
              grid: import ≤ {limits.grid_max_import_mw.toFixed(0)} MW, export
              ≤ {limits.grid_max_export_mw.toFixed(0)} MW
            </li>
            {activeIds.has("diesel") ? (
              <li>
                diesel: 0–{limits.max_emergency_generator_mw.toFixed(0)} MW
              </li>
            ) : null}
            <li>values outside these are clipped, not rejected</li>
          </ul>
        </section>
      ) : null}

      {penalties ? (
        <section>
          <div className="mb-1 text-xs font-semibold text-ink">
            penalties ($/MWh unless noted)
          </div>
          <ul className="space-y-0.5">
            <li>
              blackout: ${penalties.blackout_per_mwh.toFixed(2)}
            </li>
            <li>
              overvoltage: ${penalties.overvoltage_per_mwh.toFixed(2)}
            </li>
            {activeIds.has("diesel") ? (
              <li>diesel fuel: ${penalties.diesel_per_mwh.toFixed(2)}</li>
            ) : null}
            <li>
              battery wear: ${penalties.battery_wear_per_mwh.toFixed(2)}{" "}
              (per MWh moved)
            </li>
            <li>
              demand charge: ${penalties.demand_charge_per_mw.toFixed(2)} per MW
              of peak
            </li>
            {activeIds.has("fcas") ? (
              <li>
                FCAS revenue: $
                {penalties.fcas_revenue_per_kw_per_hour.toFixed(2)}/MW/h
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}

      <section className="text-[10px]">
        Imports and side effects are sandboxed out. Built-ins:{" "}
        <span className="font-mono">
          abs, all, any, bool, dict, divmod, enumerate, filter, float, int, len,
          list, map, max, min, pow, range, reversed, round, set, sorted, str,
          sum, tuple, zip
        </span>
        . 100ms time limit per step.
      </section>

      <section>
        <div className="mb-1 text-xs font-semibold text-ink">Controller Design</div>
        <ul className="space-y-0.5">
          <li>The evaluator auto-detects your entrypoint (a `controller(state)` function or a class with a `step(state)` method).</li>
          <li>To persist memory across iterations (e.g., arrays or tracking variables), use a class with `self` or module-level variables.</li>
        </ul>
      </section>
    </div>
  );
}

interface TemplatePickerProps {
  templates: ControllerTemplate[];
  currentSource: string;
  onLoad: (template: ControllerTemplate) => void;
}

function TemplatePicker({ templates, currentSource, onLoad }: TemplatePickerProps) {
  const activeId =
    templates.find((t) => t.source === currentSource)?.id ?? null;
  const activeDescription = templates.find(
    (t) => t.id === activeId,
  )?.description;

  return (
    <div className="mb-3 rounded-lg border border-line bg-canvas p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Templates
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {templates.map((template) => {
            const isActive = template.id === activeId;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onLoad(template)}
                title={template.description}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                  isActive
                    ? "border-ink bg-ink text-canvas"
                    : "border-line bg-surface text-ink hover:border-ink/40",
                )}
              >
                {template.label}
              </button>
            );
          })}

          <div className="mx-1 h-4 w-px bg-line" />

          <button
            type="button"
            disabled
            title={activeId === null ? "You are editing custom code" : "Modify the code to create your own custom controller"}
            className={cn(
              "cursor-default rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
              activeId === null
                ? "border-amber-500 bg-amber-500 text-white"
                : "border-transparent bg-transparent text-muted",
            )}
          >
            Custom Code
          </button>
        </div>
      </div>
      {activeDescription ? (
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          {activeDescription}
        </p>
      ) : (
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          Custom code — pick a template above to start from a known baseline, or continue writing your own!
        </p>
      )}
    </div>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="controller-confirm-title"
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-xl border border-line bg-surface p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
            <TriangleAlertIcon className="h-4 w-4" />
          </span>
          <div>
            <h3
              id="controller-confirm-title"
              className="text-sm font-semibold text-ink"
            >
              {title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{body}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button size="sm" variant="secondary" onClick={onCancel} autoFocus>
            Keep editing
          </Button>
          <Button size="sm" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ControllerErrorPill({ error }: { error: string | null }) {
  return (
    <div
      className={cn(
        "flex max-w-md items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]",
        error
          ? "border-warning/40 bg-warning/5 text-warning"
          : "border-positive/30 bg-positive/5 text-positive",
      )}
    >
      {error ? (
        <>
          <CircleAlertIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium">Fallback active:</span>
          <span className="truncate">{error}</span>
        </>
      ) : (
        <>
          <CheckCircle2Icon className="h-3.5 w-3.5" />
          <span>Controller running cleanly.</span>
        </>
      )}
    </div>
  );
}
