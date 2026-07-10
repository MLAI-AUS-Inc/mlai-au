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
  workflowMode?: "article" | "article_setup";
  title?: string;
  titleAs?: "h1" | "h2";
  subtitle?: string;
  isSubmitting?: boolean;
  primaryActionSlot?: ReactNode;
  topRightActionSlot?: ReactNode;
  activeDetailSlot?: ReactNode;
  activeDetailLabel?: string;
  activeDetailDefaultExpanded?: boolean;
  mobileSummary?: {
    eyebrow: string;
    title: string;
    status: string;
    description?: string;
  };
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
    id: "repo_article_system",
    label: "Connect repo & articles location",
    summary: "Connect GitHub, scan the repository, and prepare the articles/blogs location.",
    stepIds: ["repo", "article_system"],
    completionStepId: "article_system",
    icon: CodeBracketIcon,
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

const ARTICLE_SETUP_WORKFLOW_DISPLAY_GROUPS: WorkflowDisplayGroupDefinition[] = [
  {
    id: "profile_baseline",
    label: "Startup profile & baseline",
    summary: "Company details, competitors, seed keywords, and the starting website baseline.",
    stepIds: ["profile", "baseline"],
    completionStepId: "baseline",
    icon: UserCircleIcon,
  },
  {
    id: "repo_article_system",
    label: "Connect repo & articles location",
    summary: "Prepare the repo location where future articles will be written.",
    stepIds: ["repo", "article_system"],
    completionStepId: "article_system",
    icon: CodeBracketIcon,
  },
  {
    id: "article_creation",
    label: "Build setup page",
    summary: "Create the articles/blogs directory changes and hosted preview.",
    stepIds: ["generate"],
    completionStepId: "generate",
    icon: PencilSquareIcon,
  },
  {
    id: "research_topic",
    label: "Review setup preview",
    summary: "Inspect the Cloudflare preview and request revisions if needed.",
    stepIds: ["review", "revise"],
    completionStepId: "review",
    icon: MagnifyingGlassIcon,
  },
  {
    id: "publish_automation",
    label: "Publish",
    summary: "Publish the articles setup so article generation unlocks.",
    stepIds: ["package", "publish"],
    completionStepId: "publish",
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

function iconCircleTone(status: string, active: boolean) {
  if (active || status === "running") return "border-violet-200 bg-violet-100 text-violet-700 shadow-inner";
  if (status === "complete") return "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-inner";
  if (status === "needs_action" || status === "ready") return "border-orange-200 bg-orange-50 text-orange-600 shadow-inner";
  if (status === "blocked") return "border-red-200 bg-red-50 text-red-600 shadow-inner";
  return "border-gray-100 bg-gray-50 text-gray-400";
}

function connectorNodeTone(group: WorkflowDisplayGroup, nextGroup: WorkflowDisplayGroup | undefined, active: boolean, nextRequired: boolean) {
  if (active || nextRequired || nextGroup?.status === "running") return "bg-violet-600";
  if (group.status === "complete") return "bg-emerald-500";
  if (group.status === "needs_action" || group.status === "ready") return "bg-orange-500";
  if (group.status === "blocked") return "bg-red-500";
  return "bg-gray-300";
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

function buildWorkflowDisplayGroups(steps: VibeMarketingWorkflowStep[], workflowMode: MarketingWorkflowShellProps["workflowMode"]): WorkflowDisplayGroup[] {
  const definitions = workflowMode === "article_setup" ? ARTICLE_SETUP_WORKFLOW_DISPLAY_GROUPS : WORKFLOW_DISPLAY_GROUPS;
  const stepById = new Map(steps.map((step) => [step.id, step]));
  return definitions.map((definition) => {
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
  workflowMode = "article",
  title = "Article workflow",
  titleAs = "h2",
  subtitle,
  isSubmitting = false,
  primaryActionSlot,
  topRightActionSlot,
  activeDetailSlot,
  activeDetailLabel = "Progress details",
  activeDetailDefaultExpanded = true,
  mobileSummary,
  showPrimaryAction = false,
  className,
}: MarketingWorkflowShellProps) {
  const activeDetailId = useId();
  const [activeDetailExpanded, setActiveDetailExpanded] = useState(activeDetailDefaultExpanded);
  const [mobileStepsExpanded, setMobileStepsExpanded] = useState(false);
  const steps = progress?.steps ?? [];
  if (!steps.length) return null;
  const requiredStep = steps.find((step) => step.id === progress?.currentStepId) ?? steps.find((step) => step.status !== "complete" && step.status !== "locked") ?? steps[0];
  const viewedStep = steps.find((step) => step.id === viewedStepId) ?? requiredStep;
  const displayGroups = buildWorkflowDisplayGroups(steps, workflowMode);
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
    <section className={clsx("min-w-0 lg:rounded-2xl lg:border lg:border-gray-200 lg:bg-white lg:px-8 lg:py-9 lg:shadow-md lg:shadow-gray-200/60", className)}>
      {mobileSummary ? (
        <div className="lg:hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wide text-violet-600">
                {mobileSummary.eyebrow}
              </p>
              <HeadingTag className="mt-1.5 text-2xl font-black leading-tight tracking-tight text-gray-950">
                {mobileSummary.title}
              </HeadingTag>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-800">
              <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
              {mobileSummary.status}
            </span>
          </div>
          {mobileSummary.description ? (
            <p className="mt-2 max-w-xl text-sm font-semibold leading-5 text-gray-600">
              {mobileSummary.description}
            </p>
          ) : null}
        </div>
      ) : (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-violet-600">
              Step {viewedIndex + 1} of {displayGroups.length}
            </p>
            <HeadingTag className="mt-2 text-2xl font-black leading-tight tracking-tight text-gray-950">
              {title}
            </HeadingTag>
          </div>
          <span
            className={clsx(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-black",
              statusTone(viewedGroup.status),
            )}
          >
            <StepStatusIcon status={viewedGroup.status} />
            {statusLabel(viewedGroup.status)}
          </span>
        </div>

        <p className="mt-3 text-sm font-black leading-5 text-gray-700">
          {headerLabel}
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-gray-500">
          {subtitle ?? viewedGroup.summary}
        </p>

        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-violet-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <button
          type="button"
          aria-expanded={mobileStepsExpanded}
          onClick={() => setMobileStepsExpanded((expanded) => !expanded)}
          className="mt-3 flex min-h-11 w-full items-center justify-between rounded-xl px-2 text-left text-sm font-black text-violet-700 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        >
          <span>
            {mobileStepsExpanded ? "Hide all steps" : "View all steps"}
          </span>
          {mobileStepsExpanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>

        {mobileStepsExpanded ? (
          <ol className="mt-2 space-y-2 border-t border-gray-100 pt-3">
            {displayGroups.map((group, index) => {
              const active = group.id === viewedGroup.id;
              const locked =
                group.status === "locked" && group.id !== "repo_article_system";
              const Icon = group.icon;
              const row = (
                <div className="flex min-h-12 items-center gap-3 px-3 py-2.5">
                  <span
                    className={clsx(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                      iconCircleTone(group.status, active),
                    )}
                  >
                    {group.status === "complete" ? (
                      <CheckCircleIcon className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black leading-5 text-gray-950">
                      {group.label}
                    </span>
                    <span className="block text-xs font-bold text-gray-500">
                      {statusLabel(group.status)}
                    </span>
                  </span>
                  <span className="text-xs font-black text-gray-400">
                    {index + 1}
                  </span>
                </div>
              );
              return (
                <li key={group.id}>
                  {locked ? (
                    <div className="rounded-xl bg-gray-50 opacity-70">
                      {row}
                    </div>
                  ) : (
                    <Link
                      to={group.href}
                      aria-current={active ? "step" : undefined}
                      aria-label={`${group.label}, ${statusLabel(group.status)}`}
                      className={clsx(
                        "block rounded-xl border transition",
                        active
                          ? "border-violet-200 bg-violet-50"
                          : "border-gray-100 bg-white hover:bg-gray-50",
                      )}
                    >
                      {row}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>
      )}

      <div className="hidden lg:block">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-wide text-violet-600">
            STEP {viewedIndex + 1} OF {displayGroups.length}
          </p>
          <HeadingTag className={clsx("mt-3 font-black tracking-tight text-gray-950", titleAs === "h1" ? "text-4xl" : "text-3xl")}>
            {title}
          </HeadingTag>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className={clsx("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-black", statusTone(viewedGroup.status))}>
              <StepStatusIcon status={viewedGroup.status} />
              {statusLabel(viewedGroup.status)}
            </span>
            <span className="text-base font-black text-gray-700">{headerLabel}</span>
            {!viewingRequiredGroup ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-black text-violet-700">
                Next required step: {requiredGroup.label}
              </span>
            ) : null}
          </div>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-7 text-gray-500">
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

      <div className="mt-9 h-2 overflow-hidden rounded-full bg-gray-100" aria-hidden>
        <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <ol className="mt-8 grid gap-5 rounded-2xl border border-violet-100 bg-violet-50/40 p-5 shadow-sm shadow-violet-100/60 sm:grid-cols-2 xl:grid-cols-5 xl:gap-8 xl:p-8">
        {displayGroups.map((group, index) => {
          const active = group.id === viewedGroup.id;
          const nextRequired = group.id === requiredGroup.id;
          const locked = group.status === "locked" && group.id !== "repo_article_system";
          const Icon = group.icon;
          const nextGroup = displayGroups[index + 1];
          const connectorNodeClass = connectorNodeTone(group, nextGroup, active, nextRequired);
          const content = (
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <span
                className={clsx(
                  "flex h-20 w-20 items-center justify-center rounded-full border transition",
                  iconCircleTone(group.status, active),
                )}
              >
                {group.status === "complete" ? (
                  <CheckCircleIcon className="h-9 w-9" />
                ) : group.status === "running" ? (
                  <ArrowPathIcon className="h-9 w-9 animate-spin" />
                ) : (
                  <Icon className="h-9 w-9" />
                )}
              </span>
              <span className="mt-7 max-w-[190px] text-lg font-black leading-6 text-gray-950">{group.label}</span>
              <span className="sr-only">Status: {statusLabel(group.status)}</span>
            </div>
          );
          return (
            <li key={group.id} className="relative min-h-[220px]">
              {locked ? (
                <div className="h-full rounded-2xl border border-gray-100 bg-white/65 px-4 py-6 opacity-80 shadow-sm" aria-label={`${group.label}, ${statusLabel(group.status)}`}>
                  {content}
                </div>
              ) : (
                <Link
                  to={group.href}
                  aria-current={active ? "step" : undefined}
                  aria-label={`${group.label}, ${statusLabel(group.status)}`}
                  className={clsx(
                    "block h-full rounded-2xl border bg-white px-4 py-6 transition",
                    active
                      ? "border-violet-200 shadow-lg shadow-violet-100/70 ring-1 ring-violet-100"
                      : "border-gray-100 shadow-sm hover:border-violet-100 hover:shadow-md",
                  )}
                >
                  {content}
                </Link>
              )}
              {index < displayGroups.length - 1 ? (
                <div className="pointer-events-none absolute left-[calc(100%+0.25rem)] top-1/2 hidden w-7 -translate-y-1/2 items-center text-gray-300 xl:flex">
                  <span className="h-0 flex-1 border-t-2 border-dotted border-gray-300" />
                  <span className="mx-1 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white">
                    <span className={clsx("h-3 w-3 rounded-full", connectorNodeClass)} />
                  </span>
                  <span className="h-0 flex-1 border-t-2 border-dotted border-gray-300" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      </div>

      {hasActiveDetail ? (
        <div className="relative mt-4 min-w-0 lg:rounded-2xl lg:border lg:border-violet-100 lg:bg-white lg:p-3 lg:shadow-sm lg:shadow-violet-100/50">
          <span
            className="pointer-events-none absolute -top-2 hidden h-4 w-4 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-violet-100 bg-white lg:block"
            style={{ left: `${activeDetailAnchorPercent}%` }}
            aria-hidden
          />
          <button
            type="button"
            aria-expanded={activeDetailExpanded}
            aria-controls={activeDetailId}
            onClick={() => setActiveDetailExpanded((expanded) => !expanded)}
            className="hidden w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 lg:flex"
          >
            <span className="min-w-0">
              <span className="block text-sm font-black text-gray-950">
                {activeDetailLabel}
              </span>
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
          <div
            id={activeDetailId}
            className={clsx("min-w-0", !activeDetailExpanded && "lg:hidden")}
          >
            <div className="min-w-0 lg:mt-3 lg:border-t lg:border-violet-100 lg:px-1 lg:pt-4">
              {activeDetailSlot}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
