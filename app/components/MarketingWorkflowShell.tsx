import { useId, useState, type ReactNode } from "react";
import { Form, Link } from "react-router";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import type {
  VibeMarketingWorkflowAction,
  VibeMarketingWorkflowProgress,
  VibeMarketingWorkflowStep,
} from "~/types/vibe-marketing";

interface MarketingWorkflowShellProps {
  progress?: VibeMarketingWorkflowProgress | null;
  viewedStepId?: string | null;
  title?: string;
  titleAs?: "h1" | "h2";
  subtitle?: string;
  isSubmitting?: boolean;
  primaryActionSlot?: ReactNode;
  topRightActionSlot?: ReactNode;
  activeDetailSlot?: ReactNode;
  activeDetailLabel?: string;
  activeDetailDefaultExpanded?: boolean;
  showPrimaryAction?: boolean;
  className?: string;
}

const ACTIONABLE_STATUSES = new Set(["blocked", "needs_action", "running", "ready"]);

type WorkflowDisplayGroupId =
  | "profile_baseline"
  | "research_topic"
  | "repo_article_system"
  | "article_creation"
  | "publish_automation";

interface WorkflowDisplayGroupDefinition {
  id: WorkflowDisplayGroupId;
  label: string;
  summary: string;
  stepIds: string[];
  completionStepId: string;
  icon: typeof UserCircleIcon;
}

interface WorkflowDisplayGroup {
  id: WorkflowDisplayGroupId;
  label: string;
  summary: string;
  status: string;
  href: string;
  primaryAction?: VibeMarketingWorkflowAction | null;
  sourceStep?: VibeMarketingWorkflowStep;
  actionStep?: VibeMarketingWorkflowStep;
  childSteps: VibeMarketingWorkflowStep[];
  icon: typeof UserCircleIcon;
}

const WORKFLOW_DISPLAY_GROUPS: WorkflowDisplayGroupDefinition[] = [
  {
    id: "profile_baseline",
    label: "Startup profile & baseline",
    summary: "Company details, competitors, seed keywords, and the starting website baseline.",
    stepIds: ["profile", "baseline"],
    completionStepId: "baseline",
    icon: UserCircleIcon,
  },
  {
    id: "research_topic",
    label: "Research & choose topic",
    summary: "Find topic opportunities and choose the article brief.",
    stepIds: ["research", "choose_topic"],
    completionStepId: "choose_topic",
    icon: MagnifyingGlassIcon,
  },
  {
    id: "repo_article_system",
    label: "Connect repo & article system",
    summary: "Connect GitHub, scan the repository, and prepare the article system.",
    stepIds: ["repo", "article_system"],
    completionStepId: "article_system",
    icon: CodeBracketIcon,
  },
  {
    id: "article_creation",
    label: "Generate, review & revise",
    summary: "Generate the article, review the live preview, and revise with comments.",
    stepIds: ["generate", "review", "revise"],
    completionStepId: "review",
    icon: PencilSquareIcon,
  },
  {
    id: "publish_automation",
    label: "Publish & automate",
    summary: "Review the package, publish to the site, and enable daily automation.",
    stepIds: ["package", "publish", "automation"],
    completionStepId: "automation",
    icon: RocketLaunchIcon,
  },
];

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

function groupForStepId(stepId: string | null | undefined, groups: WorkflowDisplayGroup[]) {
  return groups.find((group) => group.childSteps.some((step) => step.id === stepId));
}

function buildWorkflowDisplayGroups(steps: VibeMarketingWorkflowStep[]): WorkflowDisplayGroup[] {
  const stepById = new Map(steps.map((step) => [step.id, step]));
  return WORKFLOW_DISPLAY_GROUPS.map((definition) => {
    const childSteps = definition.stepIds.map((stepId) => stepById.get(stepId)).filter((step): step is VibeMarketingWorkflowStep => Boolean(step));
    const actionableStep = childSteps.find((step) => ACTIONABLE_STATUSES.has(step.status));
    const completionStep = stepById.get(definition.completionStepId) ?? childSteps[childSteps.length - 1] ?? childSteps[0];
    const fallbackStep = childSteps[0];
    const sourceStep = actionableStep ?? (completionStep?.status === "complete" ? completionStep : fallbackStep);
    const status = actionableStep?.status ?? (completionStep?.status === "complete" ? "complete" : "locked");
    const hrefStep = actionableStep ?? completionStep ?? fallbackStep;

    return {
      id: definition.id,
      label: definition.label,
      summary: sourceStep?.summary ?? definition.summary,
      status,
      href: actionableStep?.primaryAction?.href || hrefStep?.href || fallbackStep?.href || "/founder-tools/marketing/create",
      primaryAction: actionableStep?.primaryAction ?? null,
      sourceStep,
      actionStep: actionableStep,
      childSteps,
      icon: definition.icon,
    };
  });
}

export default function MarketingWorkflowShell({
  progress,
  viewedStepId,
  title = "Article workflow",
  titleAs = "h2",
  subtitle,
  isSubmitting = false,
  primaryActionSlot,
  topRightActionSlot,
  activeDetailSlot,
  activeDetailLabel = "Progress details",
  activeDetailDefaultExpanded = true,
  showPrimaryAction = true,
  className,
}: MarketingWorkflowShellProps) {
  const activeDetailId = useId();
  const [activeDetailExpanded, setActiveDetailExpanded] = useState(activeDetailDefaultExpanded);
  const steps = progress?.steps ?? [];
  if (!steps.length) return null;
  const requiredStep = steps.find((step) => step.id === progress?.currentStepId) ?? steps.find((step) => step.status !== "complete" && step.status !== "locked") ?? steps[0];
  const viewedStep = steps.find((step) => step.id === viewedStepId) ?? requiredStep;
  const displayGroups = buildWorkflowDisplayGroups(steps);
  const requiredGroup = groupForStepId(requiredStep.id, displayGroups) ?? displayGroups[0];
  const viewedGroup = groupForStepId(viewedStep.id, displayGroups) ?? requiredGroup;
  const viewingRequiredGroup = viewedGroup.id === requiredGroup.id;
  const viewedIndex = Math.max(0, displayGroups.findIndex((group) => group.id === viewedGroup.id));
  const completeCount = displayGroups.filter((group) => group.status === "complete").length;
  const activeProgressCount = viewedGroup.status === "running" ? viewedIndex + 1 : completeCount;
  const percent = Math.max(4, Math.round((Math.max(completeCount, activeProgressCount) / displayGroups.length) * 100));
  const headerLabel = viewingRequiredGroup
    ? viewedGroup.status === "running"
      ? `Current step: ${viewedGroup.label}`
      : `Next required step: ${requiredGroup.label}`
    : viewedGroup.status === "running"
      ? `Current step: ${viewedGroup.label}`
      : `Viewing: ${viewedGroup.label} - ${statusLabel(viewedGroup.status)}`;
  const requiredNavigationAction =
    requiredGroup.primaryAction?.label
      ? {
          ...requiredGroup.primaryAction,
          href: requiredGroup.primaryAction.href || requiredGroup.href,
          variant: requiredGroup.primaryAction.variant ?? "secondary",
        }
      : { label: `Go to ${requiredGroup.label}`, href: requiredGroup.href, variant: "secondary" as const };
  const HeadingTag = titleAs;
  const hasActiveDetail = activeDetailSlot !== undefined && activeDetailSlot !== null;
  const activeDetailAnchorPercent = ((viewedIndex + 0.5) / Math.max(displayGroups.length, 1)) * 100;

  return (
    <section className={clsx("rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">
            Step {viewedIndex + 1} of {displayGroups.length}
          </p>
          <HeadingTag className={clsx("mt-1 font-black text-gray-950", titleAs === "h1" ? "text-2xl" : "text-xl")}>
            {title}
          </HeadingTag>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={clsx("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-black", statusTone(viewedGroup.status))}>
              <StepStatusIcon status={viewedGroup.status} />
              {statusLabel(viewedGroup.status)}
            </span>
            <span className="text-sm font-bold text-gray-700">{headerLabel}</span>
            {!viewingRequiredGroup ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-black text-violet-700">
                Next required step: {requiredGroup.label}
              </span>
            ) : null}
          </div>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-500">
            {subtitle ?? viewedGroup.summary}
          </p>
        </div>
        {showPrimaryAction ? (
          <div className="flex flex-wrap gap-2">
            {topRightActionSlot ? (
              topRightActionSlot
            ) : primaryActionSlot && viewedGroup.status !== "locked" ? (
              primaryActionSlot
            ) : viewingRequiredGroup ? (
              <ActionButton action={viewedGroup.primaryAction} disabled={isSubmitting} />
            ) : (
              <ActionButton action={requiredNavigationAction} disabled={isSubmitting} />
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden>
        <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <ol className="mt-5 grid gap-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 shadow-sm shadow-violet-100/60 sm:grid-cols-2 lg:grid-cols-5 lg:p-5">
        {displayGroups.map((group, index) => {
          const active = group.id === viewedGroup.id;
          const nextRequired = group.id === requiredGroup.id;
          const locked = group.status === "locked";
          const Icon = group.icon;
          const content = (
            <div className="relative flex h-full flex-col items-center gap-3 text-center">
              <span
                className={clsx(
                  "flex h-14 w-14 items-center justify-center rounded-full border transition",
                  active && "border-violet-200 bg-violet-200 text-violet-700 shadow-sm",
                  !active && group.status === "complete" && "border-emerald-200 bg-white text-emerald-600",
                  !active && group.status === "running" && "border-violet-100 bg-white text-violet-600",
                  !active && (group.status === "needs_action" || group.status === "ready") && "border-amber-200 bg-white text-amber-600",
                  !active && group.status === "blocked" && "border-red-200 bg-white text-red-600",
                  !active && locked && "border-gray-100 bg-white/70 text-gray-400",
                )}
              >
                {group.status === "complete" ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : group.status === "running" ? (
                  <ArrowPathIcon className="h-6 w-6 animate-spin" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </span>
              <span className="max-w-[180px] text-sm font-black leading-5 text-gray-950">{group.label}</span>
              <span className={clsx("text-xs font-bold", active ? "text-violet-700" : locked ? "text-gray-400" : "text-gray-500")}>
                {statusLabel(group.status)}
              </span>
              {nextRequired && !active ? (
                <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-black uppercase text-violet-700">
                  Next required
                </span>
              ) : null}
              {index < displayGroups.length - 1 ? (
                <ArrowRightIcon className="absolute -right-5 top-5 hidden h-5 w-5 text-gray-400 lg:block" />
              ) : null}
            </div>
          );
          return (
            <li key={group.id} className="min-h-[156px]">
              {locked ? (
                <div className="h-full rounded-xl px-3 py-4 opacity-70">{content}</div>
              ) : (
                <Link
                  to={group.href}
                  aria-current={active ? "step" : undefined}
                  className={clsx(
                    "block h-full rounded-xl px-3 py-4 transition",
                    active ? "bg-white shadow-sm ring-1 ring-violet-200" : "hover:bg-white/80",
                  )}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {hasActiveDetail ? (
        <div className="relative mt-4">
          <span
            className="pointer-events-none absolute -top-2 hidden h-4 w-4 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-violet-100 bg-white lg:block"
            style={{ left: `${activeDetailAnchorPercent}%` }}
            aria-hidden
          />
          <div className="rounded-2xl border border-violet-100 bg-white p-3 shadow-sm shadow-violet-100/50">
            <button
              type="button"
              aria-expanded={activeDetailExpanded}
              aria-controls={activeDetailId}
              onClick={() => setActiveDetailExpanded((expanded) => !expanded)}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <span className="min-w-0">
                <span className="block text-sm font-black text-gray-950">{activeDetailLabel}</span>
                <span className="mt-0.5 block text-xs font-bold text-gray-500">
                  {viewedGroup.label} - {statusLabel(viewedGroup.status)}
                </span>
              </span>
              <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-violet-100 bg-white text-violet-700 shadow-sm">
                {activeDetailExpanded ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </span>
            </button>
            <div id={activeDetailId} hidden={!activeDetailExpanded}>
              {activeDetailExpanded ? (
                <div className="mt-3 border-t border-violet-100 px-1 pt-4">
                  {activeDetailSlot}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
