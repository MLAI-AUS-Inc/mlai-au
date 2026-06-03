"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import {
  CheckCircle2Icon,
  CircleAlertIcon,
  CodeIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

import { Button } from "~/components/watt-the-hack/sandbox/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/watt-the-hack/sandbox/ui/card";
import { Slider } from "~/components/watt-the-hack/sandbox/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/watt-the-hack/sandbox/ui/tabs";
import {
  getTemplatesForScenario,
  type ControllerTemplate,
} from "~/lib/watt-the-hack-sandbox/controller-templates";
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
  const controllerSource = useSimStore((s) => s.controllerSource);
  const setControllerSource = useSimStore((s) => s.setControllerSource);
  const controllerError = useSimStore((s) => s.controllerError);
  const scenario = useSimStore((s) => s.scenario);

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

  const [draft, setDraft] = useState(controllerSource);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) {
      setDraft(controllerSource);
    }
  }, [controllerSource, dirty]);

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
              scenarioId={scenario?.id ?? null}
              currentSource={draft}
              onLoad={(template) => {
                setDraft(template.source);
                setDirty(template.source !== controllerSource);
              }}
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
                  value={draft}
                  onChange={(value: string | undefined) => { 
                    const next = value ?? "";
                    setDraft(next);
                    setDirty(next !== controllerSource);
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
              <div className="text-[11px] text-muted">
                Imports and side effects are disabled. On error the engine
                falls back to do-nothing actions — your score will look like
                the passive baseline, NOT your sliders.
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setDraft(DEFAULT_CONTROLLER_SOURCE);
                    setDirty(DEFAULT_CONTROLLER_SOURCE !== controllerSource);
                  }}
                >
                  Reset code
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  disabled={!dirty}
                  onClick={() => {
                    setControllerSource(draft);
                    setDirty(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
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
  scenarioId: string | null;
  currentSource: string;
  onLoad: (template: ControllerTemplate) => void;
}

function TemplatePicker({ scenarioId, currentSource, onLoad }: TemplatePickerProps) {
  const templates = getTemplatesForScenario(scenarioId);
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
