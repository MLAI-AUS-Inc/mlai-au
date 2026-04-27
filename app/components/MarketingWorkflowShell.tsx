import type { ReactNode } from "react";
import { Form, Link } from "react-router";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import type {
  VibeMarketingWorkflowAction,
  VibeMarketingWorkflowProgress,
  VibeMarketingWorkflowStep,
} from "~/types/vibe-marketing";

interface MarketingWorkflowShellProps {
  progress?: VibeMarketingWorkflowProgress | null;
  title?: string;
  subtitle?: string;
  isSubmitting?: boolean;
  primaryActionSlot?: ReactNode;
  className?: string;
}

function statusLabel(status: string) {
  if (status === "needs_action") return "Needs action";
  if (status === "ready") return "Ready";
  if (status === "running") return "Running";
  if (status === "complete") return "Complete";
  if (status === "blocked") return "Blocked";
  return "Locked";
}

function statusTone(status: string) {
  if (status === "complete") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "running") return "border-violet-200 bg-violet-50 text-violet-800";
  if (status === "needs_action" || status === "ready") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "blocked") return "border-red-200 bg-red-50 text-red-800";
  return "border-gray-200 bg-gray-50 text-gray-500";
}

function StepStatusIcon({ status }: { status: string }) {
  if (status === "complete") return <CheckCircleIcon className="h-4 w-4" />;
  if (status === "running") return <ArrowPathIcon className="h-4 w-4 animate-spin" />;
  if (status === "needs_action" || status === "blocked") return <ExclamationTriangleIcon className="h-4 w-4" />;
  if (status === "ready") return <ClockIcon className="h-4 w-4" />;
  return <LockClosedIcon className="h-4 w-4" />;
}

function ActionButton({
  action,
  disabled,
}: {
  action?: VibeMarketingWorkflowAction | null;
  disabled?: boolean;
}) {
  if (!action?.label) return null;
  const className = clsx(
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black shadow-sm transition",
    action.variant === "secondary"
      ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      : "bg-gray-950 text-white hover:bg-black",
    disabled && "opacity-50",
  );
  if (action.intent) {
    return (
      <Form method="POST">
        <button type="submit" name="intent" value={action.intent} disabled={disabled} className={className}>
          {action.label}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </Form>
    );
  }
  if (action.href) {
    return (
      <Link to={action.href} className={className}>
        {action.label}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    );
  }
  return null;
}

function stepKey(step: VibeMarketingWorkflowStep) {
  return `${step.id}-${step.order ?? step.label}`;
}

export default function MarketingWorkflowShell({
  progress,
  title = "Article workflow",
  subtitle,
  isSubmitting = false,
  primaryActionSlot,
  className,
}: MarketingWorkflowShellProps) {
  const steps = progress?.steps ?? [];
  if (!steps.length) return null;
  const currentStep = steps.find((step) => step.id === progress?.currentStepId) ?? steps.find((step) => step.status !== "complete" && step.status !== "locked") ?? steps[0];
  const currentIndex = Math.max(0, steps.findIndex((step) => step.id === currentStep.id));
  const completeCount = steps.filter((step) => step.status === "complete").length;
  const percent = Math.max(4, Math.round((completeCount / steps.length) * 100));
  const phases = Array.from(new Set(steps.map((step) => step.phase)));

  return (
    <section className={clsx("rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">
            Step {currentIndex + 1} of {steps.length}
          </p>
          <h2 className="mt-1 text-xl font-black text-gray-950">{title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={clsx("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-black", statusTone(currentStep.status))}>
              <StepStatusIcon status={currentStep.status} />
              {statusLabel(currentStep.status)}
            </span>
            <span className="text-sm font-bold text-gray-700">{currentStep.label}</span>
          </div>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-500">
            {subtitle ?? currentStep.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {primaryActionSlot ?? <ActionButton action={currentStep.primaryAction} disabled={isSubmitting} />}
        </div>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden>
        <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {phases.map((phase) => {
          const phaseSteps = steps.filter((step) => step.phase === phase);
          const phaseComplete = phaseSteps.every((step) => step.status === "complete");
          const phaseActive = phaseSteps.some((step) => step.id === currentStep.id);
          return (
            <span
              key={phase}
              className={clsx(
                "min-w-fit rounded-full px-3 py-1.5 text-xs font-black ring-1",
                phaseActive && "bg-violet-50 text-violet-700 ring-violet-100",
                !phaseActive && phaseComplete && "bg-emerald-50 text-emerald-700 ring-emerald-100",
                !phaseActive && !phaseComplete && "bg-gray-50 text-gray-500 ring-gray-100",
              )}
            >
              {phase}
            </span>
          );
        })}
      </div>

      <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {steps.map((step, index) => {
          const active = step.id === currentStep.id;
          const locked = step.status === "locked";
          const content = (
            <>
              <span className={clsx("flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black", statusTone(step.status))}>
                {step.status === "complete" ? <CheckCircleIcon className="h-4 w-4" /> : index + 1}
              </span>
              <span className="min-w-0">
                <span className={clsx("block truncate text-sm font-black", active ? "text-violet-800" : "text-gray-900")}>{step.label}</span>
                <span className="mt-0.5 block truncate text-xs font-semibold text-gray-500">{statusLabel(step.status)}</span>
              </span>
            </>
          );
          const itemClass = clsx(
            "flex min-h-[64px] items-center gap-3 rounded-xl border px-3 py-2 text-left transition",
            active ? "border-violet-200 bg-violet-50 shadow-sm" : "border-gray-100 bg-gray-50/70",
            !locked && "hover:border-violet-200 hover:bg-white",
            locked && "opacity-70",
          );
          return (
            <li key={stepKey(step)}>
              {locked ? (
                <div className={itemClass}>{content}</div>
              ) : (
                <Link to={step.href} className={itemClass}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
