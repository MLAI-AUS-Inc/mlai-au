import type { Route } from "./+types/founder-tools.marketing.create";
import type { ShouldRevalidateFunctionArgs } from "react-router";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useLocation, useNavigation, useRevalidator, useSearchParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import MarketingWorkflowShell from "~/components/MarketingWorkflowShell";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import ArticleSystemConnectionPanel from "~/components/ArticleSystemConnectionPanel";
import ArticlesSetupProgressCard from "~/components/ArticlesSetupProgressCard";
import CancelSetupBuildButton, { CANCEL_SETUP_BUILD_INTENT, canCancelSetupBuild } from "~/components/CancelSetupBuildButton";
import {
  CustomTopicDecisionCard,
  TopicDecisionCard,
  TopicMetricExplainerStrip,
  topicOpportunityBadge,
} from "~/components/TopicDecisionCard";
import VibeMarketingStartupBaselineSetup from "~/components/VibeMarketingStartupBaselineSetup";
import { type VibeMarketingStepKey } from "~/components/VibeMarketingStepper";
import { readableBackendError } from "~/lib/backend-error";
import { getEnv } from "~/lib/env.server";
import { parseFounderProfilesFormValue } from "~/lib/founder-profiles";
import { useMarketingActionPending } from "~/lib/vibe-marketing-pending-actions";
import {
  VIBE_MARKETING_ARTICLE_JOB_COST_POINTS,
  createVibeMarketingClientRequestId,
} from "~/lib/vibe-marketing-billing";
import { repoScanProgressRefreshKey } from "~/lib/vibe-marketing-run-polling";
import { shouldSkipVibeMarketingCreateRevalidation } from "~/lib/vibe-marketing-step-revalidation";
import { combineCompanyContext as combineStartupCompanyContext } from "~/lib/vibe-marketing-startup-setup";
import {
  connectVibeMarketingGithub,
  controlVibeMarketingRun,
  getVibeMarketingGithubRepos,
  getVibeMarketingBootstrap,
  replayVibeMarketingDaily,
  refreshVibeMarketingBaselineGoogle,
  resetVibeMarketingArticleSetup,
  saveVibeMarketingSettings,
  skipVibeMarketingBaseline,
  startVibeMarketingArticle,
  startVibeMarketingArticleSystemSetup,
  startVibeMarketingAutofill,
  startVibeMarketingBaseline,
  startVibeMarketingDiscovery,
  startVibeMarketingScan,
} from "~/lib/vibe-marketing";
import type { VibeMarketingArticleSetupState, VibeMarketingBootstrap, VibeMarketingGithubReposResponse, VibeMarketingRunSummary } from "~/types/vibe-marketing";
import {
  getActiveVibeRaisingCompany,
  requireVibeRaisingFounder,
  saveVibeRaisingCompany,
  setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";

const STEP_KEYS: VibeMarketingStepKey[] = [
  "startupDetails",
  "baseline",
  "github",
  "scan",
  "articleSystem",
  "research",
  "chooseArticle",
  "writeCheck",
  "editArticle",
  "reviewPublish",
  "dailyAutomation",
];

const WORKFLOW_STEP_ID_BY_CREATE_STEP: Record<VibeMarketingStepKey, string> = {
  startupDetails: "profile",
  baseline: "baseline",
  github: "repo",
  scan: "article_system",
  articleSystem: "article_system",
  research: "research",
  chooseArticle: "choose_topic",
  writeCheck: "generate",
  editArticle: "review",
  reviewPublish: "package",
  dailyAutomation: "automation",
};

const CREATE_STEP_BY_WORKFLOW_STEP_ID: Record<string, VibeMarketingStepKey> = {
  profile: "startupDetails",
  baseline: "baseline",
  repo: "github",
  article_system: "articleSystem",
  research: "research",
  choose_topic: "chooseArticle",
  generate: "writeCheck",
  review: "editArticle",
  revise: "editArticle",
  package: "reviewPublish",
  publish: "reviewPublish",
  automation: "dailyAutomation",
};

const SETUP_POLLING_STATUSES = new Set(["queued", "pending", "starting", "processing", "running", "in_progress", "preview_building"]);
const SETUP_READY_STATUSES = new Set(["awaiting_confirmation", "awaiting_approval", "approval_required"]);
const SETUP_FAILED_STATUSES = new Set(["failed", "blocked", "blocked_verification", "preview_failed", "denied", "cancelled"]);

type StepExplainer = {
  why: string;
  next: string;
  safety?: string;
};

const STEP_EXPLAINERS: Record<VibeMarketingStepKey, StepExplainer> = {
  startupDetails: {
    why: "Company details anchor the article tone, audience, proof points, and topic relevance.",
    next: "Save the profile, then capture a baseline or continue through setup.",
  },
  baseline: {
    why: "The baseline records current site health, search visibility, and traffic before content changes.",
    next: "Run it or skip it for now, then connect GitHub only if you want direct website publishing.",
  },
  github: {
    why: "GitHub is optional. It lets us publish generated articles through your website repository.",
    next: "Connect a repo for direct publishing, or continue with content-only article copy and assets.",
    safety: "Generated changes stay reviewable before publishing when GitHub is connected.",
  },
  scan: {
    why: "Repository scanning is only needed for direct website publishing.",
    next: "The scan records framework, routes, build commands, article components, and publishing details.",
    safety: "The scan does not publish changes.",
  },
  articleSystem: {
    why: "GitHub access lets Content Factory inspect the website repo and find the exact articles/blogs location before editing anything.",
    next: "Choose the repo and articles URL, scan the structure, then approve a setup preview only if changes are needed.",
    safety: "The agent creates review branches and previews; nothing is merged or published until you explicitly approve.",
  },
  research: {
    why: "Research turns company context, competitors, seed keywords, and topic history into article candidates.",
    next: "Choose a pending topic or run new research if the current candidates have already been used.",
  },
  chooseArticle: {
    why: "The selected topic becomes the article brief, including the title angle and target keyword.",
    next: "Content Factory generates the article, images, and content package for review.",
  },
  writeCheck: {
    why: "Generation creates the article and validates the files before you review the result.",
    next: "When the run completes, open the exact live preview and inspect the article.",
  },
  editArticle: {
    why: "Review shows the article as it will render in the target app, with component comments for changes.",
    next: "Leave comments, send one AI revision batch, or continue once the draft is acceptable.",
  },
  reviewPublish: {
    why: "The package is the handoff point between reviewed content and an explicit publish action.",
    next: "If GitHub is connected, publish through the repo. Otherwise, copy or download the generated content package.",
    safety: "Package completion does not publish automatically.",
  },
  dailyAutomation: {
    why: "Automation keeps new topic candidates flowing without removing human review.",
    next: "Daily candidates still need selection, review, revision, and publish approval.",
  },
};

const ARTICLE_SETUP_STEP_EXPLAINERS: Partial<Record<VibeMarketingStepKey, StepExplainer>> = {
  writeCheck: {
    why: "Setup generation creates the articles/blogs location changes and validates the repo files before review.",
    next: "When the setup preview is ready, open the Cloudflare preview and inspect the articles/blogs location.",
  },
  editArticle: {
    why: "Review shows the proposed articles/blogs setup as it will render in the target app.",
    next: "Leave revision comments if needed, then continue once the setup preview is acceptable.",
  },
  reviewPublish: {
    why: "Approval creates the reviewed setup PR so future articles have a known publishing location.",
    next: "After setup is approved, continue to topic research and generate the first SEO article.",
    safety: "Nothing is merged or published until you approve the articles setup.",
  },
};

function listFromForm(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringFromForm(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function founderNamesFromForm(formData: FormData) {
  const founderProfiles = parseFounderProfilesFormValue(formData.get("founderProfiles"));
  const founderNames = founderProfiles
    .map((profile) => profile.name)
    .filter(Boolean);

  return {
    founderProfiles,
    founderNames: founderNames.length > 0 ? founderNames : listFromForm(formData.get("founderNames")),
  };
}

function normalizeStep(value: string | null | undefined, fallback: string | null | undefined): VibeMarketingStepKey {
  const candidate = value && STEP_KEYS.includes(value as VibeMarketingStepKey) ? value : fallback;
  return STEP_KEYS.includes(candidate as VibeMarketingStepKey) ? (candidate as VibeMarketingStepKey) : "startupDetails";
}

function createStepForWorkflowStep(stepId: string | null | undefined): VibeMarketingStepKey | null {
  return stepId ? CREATE_STEP_BY_WORKFLOW_STEP_ID[stepId] ?? null : null;
}

function isGithubPublishingReady(bootstrap: VibeMarketingBootstrap) {
  return Boolean(bootstrap.checks.github?.passed && bootstrap.settings.githubRepo);
}

function resultObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function stringResultValue(run: VibeMarketingRunSummary, ...keys: string[]) {
  for (const key of keys) {
    const value = run.result?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    const nestedResult = resultObject(run.result?.result);
    const nestedValue = nestedResult[key];
    if (typeof nestedValue === "string" && nestedValue.trim()) return nestedValue.trim();
    const latestControl = resultObject(run.result?.latest_control_response);
    const latestValue = latestControl[key];
    if (typeof latestValue === "string" && latestValue.trim()) return latestValue.trim();
  }
  return "";
}

function articleSystemSetupPayload(run: VibeMarketingRunSummary) {
  const direct = resultObject(run.result?.article_system_setup);
  if (Object.keys(direct).length) return direct;
  const nested = resultObject(resultObject(run.result?.result).article_system_setup);
  if (Object.keys(nested).length) return nested;
  const latest = resultObject(resultObject(run.result?.latest_control_response).article_system_setup);
  return latest;
}

function setupRunIdForRun(run: VibeMarketingRunSummary) {
  const direct = stringResultValue(run, "setup_run_id", "setupRunId", "scaffold_job_id", "scaffoldJobId");
  if (direct) return direct;
  const setup = articleSystemSetupPayload(run);
  const value = setup.setup_run_id ?? setup.setupRunId;
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function scanRunHasPendingArticleSystemSetup(run: VibeMarketingRunSummary | null | undefined) {
  if (!run || !["repo_scan", "content_factory_scan"].includes(run.workflow)) return false;
  if (setupRunIdForRun(run)) return true;
  const requestedAction = stringResultValue(run, "requested_action", "setup_requested_action");
  return requestedAction === "article_system_setup" || requestedAction === "scaffold_publish_route";
}

function isArticleSystemSetupRun(run: VibeMarketingRunSummary | null | undefined) {
  return run?.workflow === "article_system_setup";
}

function hasExactArticleSystemSetupPreview(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return false;
  const livePreviewUrl = String(run.livePreview?.previewUrl ?? "").trim();
  if (run.livePreview && run.livePreview.exactRender === true && livePreviewUrl) return true;
  return Boolean(run.previewUrl && (!run.livePreview || run.livePreview.exactRender === true));
}

function isSetupProgressTerminal(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return true;
  return (
    SETUP_READY_STATUSES.has(run.status) ||
    SETUP_FAILED_STATUSES.has(run.status) ||
    run.status === "completed" ||
    run.approvalState === "approved"
  );
}

function findSetupChildRun(
  setupRunId: string,
  parentRunId: string,
  latestRuns: VibeMarketingRunSummary[],
  polledChildRun: VibeMarketingRunSummary | null,
) {
  if (setupRunId && polledChildRun?.runId === setupRunId) return polledChildRun;
  if (setupRunId) {
    const exact = latestRuns.find((run) => run.runId === setupRunId);
    if (exact) return exact;
  }
  return latestRuns.find((run) => isArticleSystemSetupRun(run) && run.sourceRunId === parentRunId) ?? null;
}

function activeSetupProgressRun(
  parentScan: VibeMarketingRunSummary | null | undefined,
  latestRuns: VibeMarketingRunSummary[],
  polledChildRun: VibeMarketingRunSummary | null,
) {
  if (!parentScan) return null;
  const setupRunId = setupRunIdForRun(parentScan);
  return findSetupChildRun(setupRunId, parentScan.runId, latestRuns, polledChildRun);
}

function findRunById(runs: VibeMarketingRunSummary[], runId: string | null | undefined) {
  const id = runId?.trim();
  return id ? runs.find((run) => run.runId === id) ?? null : null;
}

function articleSetupStateHasSetupWork(state: VibeMarketingArticleSetupState | null | undefined) {
  const setupRunStatus = state?.setupRunStatus?.trim();
  return Boolean(
    (state?.setupRunId?.trim() && setupRunStatus) ||
      setupRunStatus ||
      state?.setupBlocked,
  );
}

function runFromArticleSetupState(
  state: VibeMarketingArticleSetupState | null | undefined,
  bootstrap: VibeMarketingBootstrap,
): VibeMarketingRunSummary | null {
  if (!state) return null;
  const setupRunId = state.setupRunId?.trim();
  const scanRunId = state.scanRunId?.trim();
  const runId = setupRunId || scanRunId;
  if (!runId) return null;
  const setupRunStatus = state.setupRunStatus?.trim();
  const rawSetupStatus = state.setupStatus?.trim();
  const setupStatus =
    setupRunStatus && SETUP_POLLING_STATUSES.has(setupRunStatus)
      ? setupRunStatus
      : rawSetupStatus || setupRunStatus;
  const isSetupRun = Boolean(setupRunId);
  if (isSetupRun && !setupRunStatus) return null;
  const status = String(isSetupRun ? setupStatus || "queued" : state.scanStatus || "completed");
  const currentStep = isSetupRun ? state.setupCurrentStep || setupStatus || status : state.scanStatus || status;
  return {
    runId,
    workflow: isSetupRun ? "article_system_setup" : "repo_scan",
    domain: bootstrap.organization.domain,
    githubRepo: state.githubRepo || state.repo || bootstrap.settings.githubRepo,
    sourceRunId: isSetupRun ? scanRunId || null : null,
    status,
    currentStep,
    approvalState: null,
    resumeAvailable: Boolean(state.retryAvailable),
    createdAt: state.scanCompletedAt || state.updatedAt || undefined,
    updatedAt: state.updatedAt || state.scanUpdatedAt || state.scanCompletedAt || undefined,
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: state.error ? [state.error] : [],
    artifacts: [],
    previewUrl: state.previewUrl,
    prUrl: state.prUrl,
    routePath: state.routePath,
    diagnostics: {},
    contentPackage: null,
    componentManifest: null,
    livePreview: state.livePreview ?? null,
    componentFeedback: null,
    workflowProgress: null,
    publishChildStatus: null,
    publishChildRecoverable: false,
    publishChildWaitReason: null,
    stale: Boolean(state.scanStale),
    staleReason: state.staleReason,
    retryAvailable: Boolean(state.retryAvailable),
    result: {
      status,
      setup_run_id: setupRunId || undefined,
      setupRunId: setupRunId || undefined,
      scan_purpose: isSetupRun ? "setup" : undefined,
      route_path: state.routePath || undefined,
      article_surface_hint: state.articleSurfaceHint || undefined,
      article_system_setup: isSetupRun
        ? {
            setup_run_id: setupRunId,
            status: setupStatus || status,
            current_step: state.setupCurrentStep || undefined,
            preview_url: state.previewUrl || undefined,
            fallback_preview_url: state.fallbackPreviewUrl || undefined,
            live_preview_url: state.livePreviewUrl || undefined,
            pr_url: state.prUrl || undefined,
            error: state.error || undefined,
          }
        : undefined,
    },
    articleSetupState: state,
  };
}

type ArticleDeliveryMode = "review_draft" | "publish_code" | "content_only";

function effectiveArticleDeliveryMode(bootstrap: VibeMarketingBootstrap): ArticleDeliveryMode {
  const effective = bootstrap.settings.articleDeliveryModeEffective;
  if (effective === "review_draft" || effective === "publish_code" || effective === "content_only") {
    return effective;
  }
  const configured = bootstrap.settings.articleDeliveryMode;
  if (configured === "review_draft" || configured === "publish_code") {
    return configured;
  }
  if (configured === "content_only" && !isGithubPublishingReady(bootstrap)) {
    return "content_only";
  }
  return isGithubPublishingReady(bootstrap) ? "review_draft" : "content_only";
}

function isArticleSystemSetupBlocked(bootstrap: VibeMarketingBootstrap) {
  return Boolean(
    bootstrap.checks.scaffold?.setupBlocked &&
      !bootstrap.hasCompletedArticleFlow &&
      !bootstrap.checks.scaffold?.generationReady &&
      !bootstrap.checks.scaffold?.setupMerged &&
      !bootstrap.articleSetupState?.generationReady &&
      !bootstrap.articleSetupState?.setupMerged,
  );
}

function isArticleSystemPublished(bootstrap: VibeMarketingBootstrap) {
  const scaffold = bootstrap.checks.scaffold;
  return Boolean(
    scaffold?.generationReady ||
      bootstrap.articleSetupState?.generationReady ||
      scaffold?.setupMerged ||
      bootstrap.articleSetupState?.setupMerged ||
      scaffold?.published ||
      (scaffold?.passed && !isArticleSystemSetupBlocked(bootstrap)),
  );
}

function resolveActiveStep(
  value: string | null | undefined,
  bootstrap: VibeMarketingBootstrap,
  options: { hasResearchRun?: boolean } = {},
): VibeMarketingStepKey {
  const requiredStep =
    createStepForWorkflowStep(bootstrap.workflowProgress?.currentStepId) ??
    normalizeStep(bootstrap.currentGuidedStep, "startupDetails");
  const requested = normalizeStep(value, requiredStep);
  if (isArticleSystemSetupBlocked(bootstrap) && ["research", "chooseArticle"].includes(requested)) {
    return "articleSystem";
  }
  // Custom-topic research routes here with ?researchRunId=… to show progress and the resulting
  // candidates. Honour that target even while choose_topic is still locked (no candidates yet),
  // otherwise the lock-gate below would bounce it back to the research step mid-research.
  if (requested === "chooseArticle" && options.hasResearchRun) {
    return "chooseArticle";
  }
  const requestedWorkflowStepId = WORKFLOW_STEP_ID_BY_CREATE_STEP[requested];
  const requestedWorkflowStep = bootstrap.workflowProgress?.steps?.find((step) => step.id === requestedWorkflowStepId);
  const contentOnlyAllowedStep = ["research", "chooseArticle"].includes(requested);
  const repoArticleAllowedStep = ["github", "scan", "articleSystem"].includes(requested);
  const latestScan = bootstrap.latestRuns.find((run) => ["repo_scan", "content_factory_scan"].includes(run.workflow));
  const articleSystemSetupAllowedStep =
    (articleSetupStateHasSetupWork(bootstrap.articleSetupState) || scanRunHasPendingArticleSystemSetup(latestScan)) &&
    ["writeCheck", "editArticle", "reviewPublish"].includes(requested);

  if (
    requestedWorkflowStep?.status === "locked" &&
    !repoArticleAllowedStep &&
    !articleSystemSetupAllowedStep &&
    !(contentOnlyAllowedStep && bootstrap.checks.baseline?.passed && !isGithubPublishingReady(bootstrap))
  ) {
    return requiredStep;
  }

  return requested;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const url = new URL(request.url);
  const rawStep = url.searchParams.get("step");
  if (rawStep === "github" || rawStep === "scan") {
    url.searchParams.set("step", "articleSystem");
    throw redirect(`${url.pathname}?${url.searchParams.toString()}`);
  }

  const bootstrap = await getVibeMarketingBootstrap(env, request, null, "summary");
  const requestedStep = normalizeStep(url.searchParams.get("step"), "startupDetails");
  if (isArticleSystemSetupBlocked(bootstrap) && ["research", "chooseArticle"].includes(requestedStep)) {
    url.searchParams.set("step", "articleSystem");
    throw redirect(`${url.pathname}?${url.searchParams.toString()}`);
  }
  let githubRepos: VibeMarketingGithubReposResponse = {
    status: "unavailable",
    repos: [],
    repositories: [],
  };
  const activeStep = resolveActiveStep(url.searchParams.get("step"), bootstrap, {
    hasResearchRun: Boolean(url.searchParams.get("researchRunId")?.trim()),
  });
  if (activeStep === "articleSystem" || requestedStep === "articleSystem") {
    try {
      githubRepos = await getVibeMarketingGithubRepos(env, request);
    } catch (error) {
      githubRepos = {
        status: "unavailable",
        repos: [],
        repositories: [],
        error: error instanceof Error ? error.message : "Unable to load repositories.",
      };
    }
  }
  return {
    bootstrap,
    githubRepos,
    billingRequestIds: {
      articleJob: createVibeMarketingClientRequestId("vibe-article-job"),
    },
  };
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  if (shouldSkipVibeMarketingCreateRevalidation(args)) {
    return false;
  }
  return args.defaultShouldRevalidate;
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const activeCompany = getActiveVibeRaisingCompany(appUser);
  const formData = await request.formData();
  const intent = stringFromForm(formData, "intent");

  try {
    if (intent === "save-startup-details") {
      const { founderProfiles, founderNames } = founderNamesFromForm(formData);
      const companyContext =
        stringFromForm(formData, "companyContext") ||
        combineStartupCompanyContext({
          shortDescription: stringFromForm(formData, "shortDescription"),
          problemSolved: stringFromForm(formData, "problemSolved"),
          targetAudience: stringFromForm(formData, "targetAudience"),
        });
      const companyId = await saveVibeRaisingCompany(env, request, {
        companyId: activeCompany?.id ?? null,
        name: stringFromForm(formData, "companyName"),
        domain: stringFromForm(formData, "domain"),
        companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
        location: stringFromForm(formData, "location"),
        abn: stringFromForm(formData, "abn"),
        companyContext,
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
        founderNames,
        founderProfiles,
        stage: stringFromForm(formData, "stage"),
        organizationKind: stringFromForm(formData, "organizationKind"),
        shortDescription: stringFromForm(formData, "shortDescription"),
        problemSolved: stringFromForm(formData, "problemSolved"),
        targetAudience: stringFromForm(formData, "targetAudience"),
        notes: stringFromForm(formData, "targetAudience"),
        registered: true,
      });
      if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
      }
      if (stringFromForm(formData, "nextAction") === "save-exit") {
        return redirect("/founder-tools/marketing");
      }
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "start-autofill") {
      const companyContext =
        stringFromForm(formData, "companyContext") ||
        combineStartupCompanyContext({
          shortDescription: stringFromForm(formData, "shortDescription"),
          problemSolved: stringFromForm(formData, "problemSolved"),
          targetAudience: stringFromForm(formData, "targetAudience"),
        });
      const result = await startVibeMarketingAutofill(env, request, {
        companyName: stringFromForm(formData, "companyName"),
        company_name: stringFromForm(formData, "companyName"),
        domain: stringFromForm(formData, "domain"),
        companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
        company_linkedin_url: stringFromForm(formData, "companyLinkedInUrl"),
        location: stringFromForm(formData, "location"),
        abn: stringFromForm(formData, "abn"),
        organizationKind: stringFromForm(formData, "organizationKind"),
        organization_kind: stringFromForm(formData, "organizationKind"),
        shortDescription: stringFromForm(formData, "shortDescription"),
        short_description: stringFromForm(formData, "shortDescription"),
        problemSolved: stringFromForm(formData, "problemSolved"),
        problem_solved: stringFromForm(formData, "problemSolved"),
        targetAudience: stringFromForm(formData, "targetAudience"),
        target_audience: stringFromForm(formData, "targetAudience"),
        founderNames: listFromForm(formData.get("founderNames")),
        founder_names: listFromForm(formData.get("founderNames")),
        stage: stringFromForm(formData, "stage"),
        notes: stringFromForm(formData, "targetAudience"),
        existingFields: {
          companyContext,
          competitors: listFromForm(formData.get("competitors")),
          seedKeywords: listFromForm(formData.get("seedKeywords")),
          companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
          profileFields: {
            shortDescription: stringFromForm(formData, "shortDescription"),
            problemSolved: stringFromForm(formData, "problemSolved"),
            targetAudience: stringFromForm(formData, "targetAudience"),
            location: stringFromForm(formData, "location"),
            founderNames: listFromForm(formData.get("founderNames")),
            stage: stringFromForm(formData, "stage"),
            organizationKind: stringFromForm(formData, "organizationKind"),
            abn: stringFromForm(formData, "abn"),
          },
        },
        companyContext,
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
      });
      return { intent, autofillRunId: result.runId, status: result.status, error: result.error, errors: result.errors };
    }

    if (intent === "start-baseline") {
      const result = await startVibeMarketingBaseline(env, request, {});
      return { intent, baselineRunId: result.runId, status: result.status, error: result.error };
    }

    if (intent === "refresh-baseline-google") {
      const websiteBaseline = await refreshVibeMarketingBaselineGoogle(env, request, {});
      return { intent, websiteBaseline };
    }

    if (intent === "skip-baseline") {
      await skipVibeMarketingBaseline(env, request, {
        reason: stringFromForm(formData, "reason") || "Skipped during onboarding",
      });
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "connect-github") {
      const githubRepo = stringFromForm(formData, "githubRepo");
      const forceReconnect = stringFromForm(formData, "forceReconnect") === "true";
      const response = await connectVibeMarketingGithub(
        env,
        request,
        {
          ...(githubRepo && !forceReconnect ? { githubRepo, github_repo: githubRepo } : {}),
          ...(forceReconnect ? { forceReconnect: true, force_reconnect: true } : {}),
        },
      );
      const authUrl = response.auth_url ?? response.authUrl;
      if (authUrl) throw redirect(authUrl);
      if (forceReconnect) {
        return {
          intent,
          error:
            response.detail ??
            response.error ??
            "GitHub is connected, but we could not open the GitHub access settings. Use the repository dropdown if the repo is already listed.",
        };
      }
      const connectionState = response.connection_state ?? response.connectionState;
      if (response.status === "already_connected" || response.status === "connected" || connectionState === "connected") {
        return redirect("/founder-tools/marketing/create?step=articleSystem");
      }
      return {
        intent,
        error: response.detail ?? response.error ?? "GitHub connection could not be completed.",
      };
    }

    if (intent === "start-scan") {
      const scanPurpose = stringFromForm(formData, "scanPurpose") || "inventory";
      const result = await startVibeMarketingScan(env, request, {
        githubRepo: stringFromForm(formData, "githubRepo"),
        github_repo: stringFromForm(formData, "githubRepo"),
        scanPurpose,
        scan_purpose: scanPurpose,
        articleSurfaceMode: scanPurpose === "inventory" ? "not_sure" : "existing",
        article_surface_mode: scanPurpose === "inventory" ? "not_sure" : "existing",
        ...(scanPurpose === "inventory"
          ? {}
          : {
              articleSurfaceUrl: stringFromForm(formData, "articleSurfaceUrl"),
              article_surface_url: stringFromForm(formData, "articleSurfaceUrl"),
            }),
        autoSetupPreview: false,
        auto_setup_preview: false,
      });
      if (result.runId) {
        return redirect(`/founder-tools/marketing/create?step=articleSystem&scanRunId=${encodeURIComponent(result.runId)}`);
      }
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "confirm-article-surface" || intent === "create-article-surface") {
      const githubRepo = stringFromForm(formData, "githubRepo");
      const articleSurfaceUrl = stringFromForm(formData, "articleSurfaceUrl");
      if (!githubRepo) return { intent, error: "Choose a GitHub repository before continuing." };
      if (!articleSurfaceUrl) return { intent, error: "Choose or enter an article/blog route before continuing." };
      const result = await startVibeMarketingArticleSystemSetup(env, request, {
        githubRepo,
        github_repo: githubRepo,
        scanPurpose: "setup",
        scan_purpose: "setup",
        articleSurfaceMode: intent === "create-article-surface" ? "none" : "existing",
        article_surface_mode: intent === "create-article-surface" ? "none" : "existing",
        articleSurfaceUrl,
        article_surface_url: articleSurfaceUrl,
        sourceScanRunId: stringFromForm(formData, "sourceScanRunId"),
        source_scan_run_id: stringFromForm(formData, "sourceScanRunId"),
        autoSetupPreview: true,
        auto_setup_preview: true,
      });
      const setupRunId = result.setupRunId || result.runId;
      if (setupRunId) {
        return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}`);
      }
      if (result.runId) {
        return redirect(`/founder-tools/marketing/create?step=articleSystem&scanRunId=${encodeURIComponent(result.runId)}`);
      }
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "retry-scan" || intent === "cancel-scan") {
      const scanRunId = stringFromForm(formData, "scanRunId");
      if (!scanRunId) {
        return { intent, error: "No repository scan was available to update." };
      }
      const result = await controlVibeMarketingRun(env, request, scanRunId, intent === "retry-scan" ? "resume" : "cancel", {
        ...(intent === "cancel-scan" ? { cleanup: true } : {}),
        workflow: "repo_scan",
      });
      if (intent === "retry-scan" && result.runId) {
        return redirect(`/founder-tools/marketing/create?step=articleSystem&scanRunId=${encodeURIComponent(result.runId)}`);
      }
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "reset-article-setup") {
      const githubRepo = stringFromForm(formData, "githubRepo");
      if (!githubRepo) return { intent, error: "Choose a GitHub repository before resetting articles setup." };
      await resetVibeMarketingArticleSetup(env, request, {
        githubRepo,
        github_repo: githubRepo,
      });
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "build-article-system-preview") {
      const scanRunId = stringFromForm(formData, "scanRunId");
      if (!scanRunId) {
        return { intent, error: "Open the scan result before building the articles setup preview." };
      }
      const result = await controlVibeMarketingRun(env, request, scanRunId, "approve", { workflow: "repo_scan" });
      const setupRunId = setupRunIdForRun(result);
      if (setupRunId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}`);
      return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(scanRunId)}`);
    }

    if (intent === CANCEL_SETUP_BUILD_INTENT) {
      const setupRunId = stringFromForm(formData, "setupRunId");
      if (!setupRunId) return { intent, error: "No setup build was available to cancel." };
      await controlVibeMarketingRun(env, request, setupRunId, "cancel", {
        cleanup: true,
        workflow: "article_system_setup",
      });
      return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}`);
    }

    if (intent === "start-discovery") {
      const bootstrap = await getVibeMarketingBootstrap(env, request, null, "summary");
      if (isArticleSystemSetupBlocked(bootstrap)) {
        return {
          intent,
          error: "Merge the articles setup PR before researching topics. If you merged it in GitHub, refresh merge status.",
        };
      }
      const result = await startVibeMarketingDiscovery(env, request, {});
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=research");
    }

    if (intent === "start-article") {
      const bootstrap = await getVibeMarketingBootstrap(env, request);
      if (isArticleSystemSetupBlocked(bootstrap)) {
        return {
          intent,
          error: "Merge the articles setup PR before generating articles. If you merged it in GitHub, refresh merge status.",
        };
      }
      const topicCandidateId = stringFromForm(formData, "topicCandidateId");
      const isCustomTopic = !topicCandidateId || topicCandidateId === "__custom__";
      const selectedCandidate =
        !isCustomTopic
          ? bootstrap.topicCandidates.find((candidate) => candidate.id === topicCandidateId) ?? null
          : null;
      if (!isCustomTopic && !selectedCandidate) {
        return {
          intent,
          error: "That topic is no longer available. Choose a pending topic or enter a custom article.",
        };
      }
      if (selectedCandidate?.alreadyWritten) {
        return {
          intent,
          error: "That topic has already been written. Choose a pending topic or enter a custom article.",
        };
      }
      const customKeyword = stringFromForm(formData, "targetKeyword");
      const customTitle = stringFromForm(formData, "customTitle") || stringFromForm(formData, "titleAngle");
      const topic = customTitle || selectedCandidate?.title || customKeyword || selectedCandidate?.keyword || "";
      const targetKeyword = customKeyword || selectedCandidate?.keyword || topic;
      if (!topic && !targetKeyword) {
        return {
          intent,
          error: "Choose a discovered topic or enter a custom title or keyword before generating an article.",
        };
      }
      const deliveryModeExplicit = stringFromForm(formData, "deliveryModeExplicit") === "true";
      const result = await startVibeMarketingArticle(env, request, {
        clientRequestId: stringFromForm(formData, "clientRequestId"),
        client_request_id: stringFromForm(formData, "clientRequestId"),
        topic,
        targetKeyword,
        customTitle: customTitle || selectedCandidate?.title || "",
        selectedTitle: selectedCandidate?.title ?? "",
        topicCandidateId,
        context: stringFromForm(formData, "articleContext"),
        deliveryMode: deliveryModeExplicit ? stringFromForm(formData, "deliveryMode") || effectiveArticleDeliveryMode(bootstrap) : undefined,
        deliveryModeExplicit,
        deliveryModeConfirmed: deliveryModeExplicit,
        sourceRunId: isCustomTopic ? "" : selectedCandidate?.sourceRunId || stringFromForm(formData, "sourceDiscoveryRunId"),
      });
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=writeCheck");
    }

    if (intent === "save-daily") {
      await saveVibeMarketingSettings(env, request, {
        dailyDiscoveryEnabled: formData.get("dailyDiscoveryEnabled") === "on",
        defaultTimezone: stringFromForm(formData, "defaultTimezone"),
      });
      return redirect("/founder-tools/marketing/create?step=dailyAutomation");
    }

    if (intent === "daily-replay") {
      const result = await replayVibeMarketingDaily(env, request, {});
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
    }
  } catch (error: any) {
    if (error instanceof Response) throw error;
    const fallback =
      intent === "start-autofill"
        ? "AI research could not start. Check the backend logs and try again."
        : "That action could not be completed.";
    return {
      intent,
      error: readableBackendError(error, { fallback }),
    };
  }

  return null;
}

function actionIntentStep(intent?: string | null): VibeMarketingStepKey | null {
  if (!intent) return null;
  if (intent === "connect-github") return "articleSystem";
  if (intent === "build-article-system-preview") return "articleSystem";
  if (intent === "save-daily" || intent === "daily-replay") return "dailyAutomation";
  if (intent === "start-scan") return "articleSystem";
  if (intent === "confirm-article-surface" || intent === "create-article-surface") return "articleSystem";
  if (intent === "save-article-system") return "articleSystem";
  if (intent === "reset-article-setup") return "articleSystem";
  if (intent === "start-discovery") return "research";
  if (intent === "start-article") return "chooseArticle";
  if (intent === "save-startup-details" || intent === "start-autofill") return "startupDetails";
  if (intent === "start-baseline" || intent === "skip-baseline" || intent === "refresh-baseline-google") return "baseline";
  return null;
}

function actionDataIntent(data: unknown): string | null {
  if (!data || typeof data !== "object" || !("intent" in data)) return null;
  const intent = (data as { intent?: unknown }).intent;
  return typeof intent === "string" ? intent : null;
}

function actionDataError(data: unknown): string | null {
  if (!data || typeof data !== "object" || !("error" in data)) return null;
  const error = (data as { error?: unknown }).error;
  return typeof error === "string" ? error : null;
}

function StatusBadge({ passed, label }: { passed: boolean; label?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
        passed ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
      )}
    >
      {label ?? (passed ? "Ready" : "Needs setup")}
    </span>
  );
}

function PanelHeader({
  title,
  description,
  passed,
  statusLabel,
  explainer,
}: {
  title: string;
  description: string;
  passed: boolean;
  statusLabel?: string;
  explainer?: StepExplainer;
}) {
  return (
    <div className="mb-6 border-b border-gray-100 pb-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-950">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{description}</p>
        </div>
        <StatusBadge passed={passed} label={statusLabel} />
      </div>
      {explainer ? (
        <div className="mt-4 grid gap-3 border-l-4 border-violet-200 bg-violet-50/50 py-3 pl-4 pr-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-violet-700">Why we need this</p>
            <p className="mt-1 text-sm font-semibold leading-5 text-gray-700">{explainer.why}</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-violet-700">What happens next</p>
            <p className="mt-1 text-sm font-semibold leading-5 text-gray-700">{explainer.next}</p>
          </div>
          {explainer.safety ? (
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-[11px] font-black uppercase tracking-wide text-violet-700">Safety</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-gray-700">{explainer.safety}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function FounderToolsMarketingCreate() {
  const { bootstrap, githubRepos, billingRequestIds } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const activeStep = resolveActiveStep(searchParams.get("step"), bootstrap, {
    hasResearchRun: Boolean(searchParams.get("researchRunId")?.trim()),
  });
  const requestedStep = normalizeStep(searchParams.get("step"), activeStep);
  const shouldRefreshGoogleBaseline = searchParams.get("googleBaseline") === "refresh";
  const actionData = useActionData<typeof action>();
  const latestActionIntent = actionDataIntent(actionData);
  const latestActionError = actionDataError(actionData);
  const actionErrorStep = actionIntentStep(latestActionIntent);
  const isRepoArticleStep = activeStep === "github" || activeStep === "scan" || activeStep === "articleSystem";
  const githubAuthError = searchParams.get("githubAuthError");
  const githubConnectError =
    isRepoArticleStep && (githubAuthError || latestActionIntent === "connect-github")
      ? githubAuthError || latestActionError
      : null;
  const topActionError =
    latestActionError && latestActionIntent !== "connect-github" && (!actionErrorStep || actionErrorStep === activeStep)
      ? latestActionError
      : null;
  const navigation = useNavigation();
  const location = useLocation();
  const setupScanStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const setupChildStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const setupParentProgressAtRef = useRef(Date.now());
  const setupParentProgressSignatureRef = useRef("");
  const setupChildProgressAtRef = useRef(Date.now());
  const setupChildProgressSignatureRef = useRef("");
  const [pageVisible, setPageVisible] = useState(true);
  const articleSetupState = bootstrap.articleSetupState ?? null;
  const canonicalScanRun =
    findRunById(bootstrap.latestRuns, articleSetupState?.scanRunId) ??
    runFromArticleSetupState(
      articleSetupState?.scanRunId && !articleSetupState?.setupRunId ? articleSetupState : null,
      bootstrap,
    );
  const latestScan = canonicalScanRun ?? bootstrap.latestRuns.find((run) => ["repo_scan", "content_factory_scan"].includes(run.workflow));
  const bootstrapPendingArticleSystemScan =
    scanRunHasPendingArticleSystemSetup(latestScan) || articleSetupStateHasSetupWork(articleSetupState)
      ? latestScan ?? runFromArticleSetupState(articleSetupState, bootstrap)
      : null;
  const [polledSetupScan, setPolledSetupScan] = useState<VibeMarketingRunSummary | null>(null);
  const [polledSetupChildRun, setPolledSetupChildRun] = useState<VibeMarketingRunSummary | null>(null);
  const pendingArticleSystemScan =
    polledSetupScan?.runId === bootstrapPendingArticleSystemScan?.runId ? polledSetupScan : bootstrapPendingArticleSystemScan;
  const pendingArticleSystemSetupRunId =
    articleSetupState?.setupRunId?.trim() || (pendingArticleSystemScan ? setupRunIdForRun(pendingArticleSystemScan) : "");
  const setupChildRun = pendingArticleSystemScan
    ? findSetupChildRun(
        pendingArticleSystemSetupRunId,
        pendingArticleSystemScan.runId,
        bootstrap.latestRuns,
        polledSetupChildRun?.runId === pendingArticleSystemSetupRunId ? polledSetupChildRun : null,
      )
    : null;
  const canonicalSetupRun =
    findRunById(bootstrap.latestRuns, pendingArticleSystemSetupRunId) ??
    (polledSetupChildRun?.runId === pendingArticleSystemSetupRunId ? polledSetupChildRun : null) ??
    runFromArticleSetupState(articleSetupStateHasSetupWork(articleSetupState) ? articleSetupState : null, bootstrap);
  const setupProgressRun =
    canonicalSetupRun ?? activeSetupProgressRun(pendingArticleSystemScan, bootstrap.latestRuns, setupChildRun);
  const pendingSetupStepActive = Boolean(setupProgressRun && ["writeCheck", "editArticle", "reviewPublish"].includes(activeStep));
  const articleSetupFlowActive = isRepoArticleStep || pendingSetupStepActive;
  const latestDiscovery = bootstrap.latestRuns.find((run) => ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(run.workflow));
  const latestArticle = bootstrap.latestRuns.find((run) => ["article_generation", "content_factory_article"].includes(run.workflow));
  const latestContentPackage = latestArticle?.contentPackage ?? bootstrap.publishEvidence?.contentPackage ?? null;
  const contentPackageReady = Boolean(latestContentPackage?.contentPackaged);
  const pendingActions = useMarketingActionPending({
    navigationState: navigation.state,
    navigationFormData: navigation.formData,
    clearSignal: [
      location.pathname,
      location.search,
      activeStep,
      latestScan?.runId,
      latestScan?.status,
      latestScan?.stale,
      latestScan?.retryAvailable,
      setupProgressRun?.runId,
      setupProgressRun?.status,
      pendingArticleSystemSetupRunId,
      latestDiscovery?.runId,
      latestDiscovery?.status,
      latestArticle?.runId,
      latestArticle?.status,
      bootstrap.checks.scaffold?.passed,
      bootstrap.checks.dailyAutomation?.passed,
      bootstrap.settings.dailyDiscoveryEnabled,
      bootstrap.topicCandidates.length,
    ].join("|"),
    errorKey: latestActionError ? latestActionIntent : null,
  });
  const isSubmitting = pendingActions.isAnyPending;
  const discoveryPending = pendingActions.isPending("start-discovery");
  const articleStartPending = pendingActions.isPending("start-article");
  const buildArticleSystemPreviewPending = pendingActions.isPending("build-article-system-preview");
  const saveDailyPending = pendingActions.isPending("save-daily");
  const dailyReplayPending = pendingActions.isPending("daily-replay");
  const researchRunId = searchParams.get("researchRunId")?.trim() ?? "";
  const selectableTopicCandidates = useMemo(() => {
    const available = bootstrap.topicCandidates.filter((candidate) => !candidate.alreadyWritten);
    const scoped = researchRunId
      ? available.filter((candidate) => candidate.sourceRunId === researchRunId)
      : available;
    return scoped.slice(0, 5);
  }, [bootstrap.topicCandidates, researchRunId]);
  const alreadyWrittenCandidates = useMemo(() => {
    const candidates = [...bootstrap.hiddenTopicCandidates, ...bootstrap.topicCandidates].filter(
      (candidate) => candidate.alreadyWritten,
    );
    const seen = new Set<string>();
    return candidates.filter((candidate) => {
      const key = `${candidate.keyword.toLowerCase()}::${candidate.title.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [bootstrap.hiddenTopicCandidates, bootstrap.topicCandidates]);
  const defaultTopicCandidateId = selectableTopicCandidates[0]?.id ?? "__custom__";
  const [selectedTopicCandidateId, setSelectedTopicCandidateId] = useState(defaultTopicCandidateId);
  const [expandedTopicCandidateId, setExpandedTopicCandidateId] = useState<string | null>(null);
  const selectedTopicCandidate = useMemo(
    () => selectableTopicCandidates.find((candidate) => candidate.id === selectedTopicCandidateId) ?? null,
    [selectableTopicCandidates, selectedTopicCandidateId],
  );
  const isCustomArticleSelected = selectedTopicCandidateId === "__custom__";

  // Custom-topic research lands here with ?researchRunId=…; poll until it produces candidates,
  // then render them scoped to that run (selectableTopicCandidates already filters by sourceRunId).
  const researchStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const researchRevalidator = useRevalidator();
  const polledResearchRun =
    researchStatusFetcher.data && researchStatusFetcher.data.runId === researchRunId
      ? researchStatusFetcher.data
      : null;
  const researchRun = polledResearchRun ?? findRunById(bootstrap.latestRuns, researchRunId);
  const researchStatus = String(researchRun?.status ?? "").trim().toLowerCase();
  const researchFailed = ["failed", "blocked", "blocked_verification", "denied", "cancelled", "canceled"].includes(
    researchStatus,
  );
  const researchCandidates = researchRunId ? selectableTopicCandidates : [];
  const researchRunReady = ["completed", "awaiting_confirmation", "awaiting_approval", "approval_required"].includes(
    researchStatus,
  );
  // Revalidate the loader exactly once after the run finishes so freshly materialized
  // candidates load in; the ref stops the 3s poll from re-triggering it every tick.
  const researchRevalidatedRunRef = useRef<string | null>(null);
  // Show progress while the run is in flight or settling, then fall through to the candidate
  // list (or empty state) once it has finished and reloaded — so it never spins forever.
  const researchSettled =
    researchFailed ||
    (researchRunReady && researchRevalidatedRunRef.current === researchRunId && researchRevalidator.state === "idle");
  const researchActive = Boolean(researchRunId) && researchCandidates.length === 0 && !researchSettled;

  useEffect(() => {
    if (!researchRunId || researchFailed || researchRunReady || researchCandidates.length > 0) return;
    const statusPath = `/founder-tools/marketing/runs/${encodeURIComponent(researchRunId)}/status`;
    researchStatusFetcher.load(statusPath);
    const intervalId = window.setInterval(() => {
      if (researchStatusFetcher.state === "idle") {
        researchStatusFetcher.load(statusPath);
      }
    }, 3000);
    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchRunId, researchFailed, researchRunReady, researchCandidates.length]);

  useEffect(() => {
    if (!researchRunId || !researchRunReady || researchCandidates.length > 0) return;
    if (researchRevalidatedRunRef.current === researchRunId) return;
    researchRevalidatedRunRef.current = researchRunId;
    if (researchRevalidator.state === "idle") {
      researchRevalidator.revalidate();
    }
  }, [researchRunId, researchRunReady, researchCandidates.length, researchRevalidator]);

  useEffect(() => {
    if (!researchRunId || researchCandidates.length === 0) return;
    setSelectedTopicCandidateId((current) =>
      researchCandidates.some((candidate) => candidate.id === current) ? current : researchCandidates[0].id,
    );
  }, [researchRunId, researchCandidates]);
  const selectedTopicLabel = selectedTopicCandidate?.title ?? "Custom article";
  const githubReadyForPublishing = isGithubPublishingReady(bootstrap);
  const effectiveDeliveryMode = effectiveArticleDeliveryMode(bootstrap);
  const directPublishMode = effectiveDeliveryMode === "publish_code";
  const reviewDraftMode = effectiveDeliveryMode === "review_draft";
  const githubRepoOptions = githubRepos.repos ?? githubRepos.repositories ?? [];
  const selectedGithubRepo =
    githubRepos.selectedRepo ??
    githubRepos.selected_repo ??
    bootstrap.settings.githubRepo ??
    githubRepoOptions[0]?.fullName ??
    "";
  const [repoSelection, setRepoSelection] = useState(selectedGithubRepo);
  const deliveryModeNote = directPublishMode
    ? `This will generate a draft and prepare it for publishing through ${bootstrap.settings.githubRepo}.`
    : reviewDraftMode
      ? "This will generate an article preview for comments before publishing."
      : "This will generate article copy and images for manual publishing.";
  const reviewDescription =
    directPublishMode
      ? "The run workspace shows generation status, revision controls, preview links, PR links, and publish approval."
      : reviewDraftMode
        ? "The run workspace shows the generated article preview, component comments, and AI revision controls before publishing."
        : "The run workspace shows generated article copy, image assets, and revision controls for manual publishing.";

  useEffect(() => {
    setPolledSetupScan(null);
    setPolledSetupChildRun(null);
  }, [bootstrapPendingArticleSystemScan?.runId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (setupScanStatusFetcher.state !== "idle") return;
    if (!setupScanStatusFetcher.data?.runId || setupScanStatusFetcher.data.runId !== bootstrapPendingArticleSystemScan?.runId) {
      return;
    }
    setPolledSetupScan(setupScanStatusFetcher.data);
  }, [bootstrapPendingArticleSystemScan?.runId, setupScanStatusFetcher.data, setupScanStatusFetcher.state]);

  useEffect(() => {
    if (!pendingArticleSystemScan?.runId || setupScanStatusFetcher.state !== "idle") return;
    if (!pageVisible) return;
    if (pendingArticleSystemSetupRunId) return;
    const shouldPollParent =
      SETUP_POLLING_STATUSES.has(pendingArticleSystemScan.status) ||
      (!pendingArticleSystemSetupRunId && !isSetupProgressTerminal(pendingArticleSystemScan));
    if (!shouldPollParent) return;
    const hasLoadedCurrentRun = setupScanStatusFetcher.data?.runId === pendingArticleSystemScan.runId;
    const signature = repoScanProgressRefreshKey(pendingArticleSystemScan);
    if (setupParentProgressSignatureRef.current !== signature) {
      setupParentProgressSignatureRef.current = signature;
      setupParentProgressAtRef.current = Date.now();
    }
    const idleMs = Date.now() - setupParentProgressAtRef.current;
    const pollDelay = !hasLoadedCurrentRun ? 0 : idleMs > 60_000 ? 15_000 : idleMs > 10_000 ? 5_000 : 2_500;
    const timer = window.setTimeout(
      () => {
        setupScanStatusFetcher.load(`/founder-tools/marketing/runs/${encodeURIComponent(pendingArticleSystemScan.runId)}/status`);
      },
      pollDelay,
    );
    return () => window.clearTimeout(timer);
  }, [
    pendingArticleSystemScan,
    pendingArticleSystemSetupRunId,
    pageVisible,
    setupScanStatusFetcher,
    setupScanStatusFetcher.data?.runId,
    setupScanStatusFetcher.state,
  ]);

  useEffect(() => {
    setPolledSetupChildRun(null);
  }, [pendingArticleSystemSetupRunId]);

  useEffect(() => {
    if (setupChildStatusFetcher.state !== "idle") return;
    if (!setupChildStatusFetcher.data?.runId || setupChildStatusFetcher.data.runId !== pendingArticleSystemSetupRunId) {
      return;
    }
    setPolledSetupChildRun(setupChildStatusFetcher.data);
  }, [pendingArticleSystemSetupRunId, setupChildStatusFetcher.data, setupChildStatusFetcher.state]);

  useEffect(() => {
    if (!pendingArticleSystemSetupRunId || setupChildStatusFetcher.state !== "idle") return;
    if (!pageVisible) return;
    if (setupChildRun && isSetupProgressTerminal(setupChildRun)) return;
    const hasLoadedCurrentRun = setupChildStatusFetcher.data?.runId === pendingArticleSystemSetupRunId;
    const signature = `${setupChildRun?.runId ?? pendingArticleSystemSetupRunId}:${setupChildRun?.status ?? ""}:${setupChildRun?.currentStep ?? ""}:${setupChildRun?.updatedAt ?? ""}`;
    if (setupChildProgressSignatureRef.current !== signature) {
      setupChildProgressSignatureRef.current = signature;
      setupChildProgressAtRef.current = Date.now();
    }
    const idleMs = Date.now() - setupChildProgressAtRef.current;
    const pollDelay = !hasLoadedCurrentRun ? 0 : idleMs > 60_000 ? 15_000 : idleMs > 10_000 ? 5_000 : 2_500;
    const timer = window.setTimeout(
      () => {
        setupChildStatusFetcher.load(`/founder-tools/marketing/runs/${encodeURIComponent(pendingArticleSystemSetupRunId)}/status`);
      },
      pollDelay,
    );
    return () => window.clearTimeout(timer);
  }, [
    pendingArticleSystemSetupRunId,
    pageVisible,
    setupChildRun?.runId,
    setupChildRun?.status,
    setupChildRun?.approvalState,
    setupChildStatusFetcher,
    setupChildStatusFetcher.data?.runId,
    setupChildStatusFetcher.state,
  ]);

  useEffect(() => {
    const selectionStillValid =
      selectedTopicCandidateId === "__custom__" ||
      selectableTopicCandidates.some((candidate) => candidate.id === selectedTopicCandidateId);
    if (!selectionStillValid) {
      setSelectedTopicCandidateId(defaultTopicCandidateId);
    }
  }, [defaultTopicCandidateId, selectableTopicCandidates, selectedTopicCandidateId]);

  useEffect(() => {
    setRepoSelection((current) => current || selectedGithubRepo);
  }, [selectedGithubRepo]);

  const setupStepActive = activeStep === "startupDetails" || activeStep === "baseline";
  const setupProgressTechnicalUrl = setupProgressRun
    ? `/founder-tools/marketing/runs/${encodeURIComponent(setupProgressRun.runId)}`
    : "";
  const setupPreviewRunId = setupChildRun?.runId || pendingArticleSystemSetupRunId;
  const setupBlocked = isArticleSystemSetupBlocked(bootstrap);
  const setupPublished = isArticleSystemPublished(bootstrap);
  const setupStatusRun = setupChildRun ?? (setupProgressRun?.workflow === "article_system_setup" ? setupProgressRun : null);
  const setupChildStatus = setupStatusRun
    ? stringResultValue(setupStatusRun, "status", "setupStatus", "setup_status") || setupStatusRun.currentStep || setupStatusRun.status
    : "";
  const setupManualMergeRequired = Boolean(setupBlocked && setupChildStatus === "manual_merge_required");
  const setupVerifying = Boolean(
    setupBlocked &&
      (bootstrap.checks.scaffold?.rescanRunId ||
        ["completed", "merged", "merged_verifying", "verifying"].includes(setupChildStatus)),
  );
  const setupReadyWithoutPreview = Boolean(
    pendingArticleSystemScan &&
      !setupChildRun &&
      !pendingArticleSystemSetupRunId &&
      pendingArticleSystemScan.status === "completed",
  );
  const setupPreviewReady = Boolean(
    setupStatusRun &&
      !setupPublished &&
      !setupVerifying &&
      !setupManualMergeRequired &&
      hasExactArticleSystemSetupPreview(setupStatusRun),
  );
  const setupLegacyNeedsPreview = Boolean(
    pendingArticleSystemScan && !pendingArticleSystemSetupRunId && SETUP_READY_STATUSES.has(pendingArticleSystemScan.status),
  );
  const setupProgressFailed = Boolean(setupProgressRun && SETUP_FAILED_STATUSES.has(setupProgressRun.status));
  const setupCancelRun = setupStatusRun ?? setupProgressRun;
  const setupCancelButton =
    setupCancelRun && canCancelSetupBuild(setupCancelRun) ? (
      <CancelSetupBuildButton
        run={setupCancelRun}
        pending={pendingActions.isPending(CANCEL_SETUP_BUILD_INTENT)}
        disabled={isSubmitting}
      />
    ) : null;
  const setupProgressPrimaryActionSlot = setupPublished ? (
    <Link
      to="/founder-tools/marketing/create?step=research"
      className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
    >
      Continue to topic research
    </Link>
  ) : setupVerifying ? (
    <button
      type="button"
      disabled
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white opacity-60 shadow-sm"
    >
      <ArrowPathIcon className="h-4 w-4 animate-spin" />
      Verifying merged articles directory...
    </button>
  ) : setupManualMergeRequired ? (
    <Link
      to={setupPreviewRunId ? `/founder-tools/marketing/runs/${encodeURIComponent(setupPreviewRunId)}` : "/founder-tools/marketing/create?step=articleSystem"}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-800 shadow-sm transition hover:bg-amber-100"
    >
      Manual merge required
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  ) : setupPreviewReady && setupPreviewRunId ? (
    <Link
      to={`/founder-tools/marketing/runs/${encodeURIComponent(setupPreviewRunId)}`}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black"
    >
      Review articles setup preview
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  ) : setupLegacyNeedsPreview ? (
    <Form method="POST">
      <input type="hidden" name="scanRunId" value={pendingArticleSystemScan?.runId ?? ""} />
      <button
        type="submit"
        name="intent"
        value="build-article-system-preview"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
      >
        {buildArticleSystemPreviewPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <RocketLaunchIcon className="h-4 w-4" />}
        {buildArticleSystemPreviewPending ? "Building setup page..." : "Build articles/blogs directory page"}
      </button>
    </Form>
  ) : setupProgressFailed ? null : setupProgressRun ? (
    <button
      type="button"
      disabled
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white opacity-60 shadow-sm"
    >
      <ArrowPathIcon className="h-4 w-4 animate-spin" />
      {setupProgressRun.workflow === "article_system_setup" || pendingArticleSystemSetupRunId
        ? "Building preview..."
        : "Preparing setup..."}
    </button>
  ) : null;
  const setupProgressActionSlot = setupProgressPrimaryActionSlot || setupCancelButton ? (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      {setupProgressPrimaryActionSlot}
      {setupCancelButton}
    </div>
  ) : null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <nav className="border-b border-gray-200 pb-4" aria-label="Breadcrumb">
        <Link to="/founder-tools/marketing" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to marketing
        </Link>
      </nav>

      {!setupStepActive ? (
        <MarketingWorkflowShell
          progress={bootstrap.workflowProgress}
          viewedStepId={articleSetupFlowActive ? "article_system" : WORKFLOW_STEP_ID_BY_CREATE_STEP[activeStep]}
          workflowMode={articleSetupFlowActive ? "article_setup" : "article"}
          title={articleSetupFlowActive ? "Set up articles/blogs location" : "Create and publish article"}
          subtitle={articleSetupFlowActive ? "Prepare the repo location where future articles will be written." : undefined}
          isSubmitting={isSubmitting}
          showPrimaryAction={false}
        />
      ) : null}

      {topActionError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {topActionError}
        </div>
      ) : null}

      <main className={clsx(setupStepActive ? "space-y-6" : "rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6")}>
        {setupStepActive ? (
          <VibeMarketingStartupBaselineSetup
            bootstrap={bootstrap}
            error={topActionError}
            variant="workflow"
            focusSection={requestedStep === "baseline" ? "baseline" : "profile"}
            autoRefreshGoogleBaseline={shouldRefreshGoogleBaseline}
          />
        ) : null}

        {activeStep === "github" || activeStep === "scan" || activeStep === "articleSystem" ? (
          <>
            <ArticleSystemConnectionPanel
              bootstrap={bootstrap}
              githubRepos={githubRepos}
              isSubmitting={isSubmitting}
              isActionPending={pendingActions.isPending}
              repoSelection={repoSelection}
              onRepoSelectionChange={setRepoSelection}
              articleSurfacePlaceholder="https://www.mlai.au/articles or /articles"
              connectionError={githubConnectError}
              scanRun={latestScan}
              articleSetupState={articleSetupState}
              framed={false}
            />

            {!githubReadyForPublishing ? (
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold leading-6 text-gray-700">
                  Skip repository setup for now and generate article copy and images for manual publishing.
                </p>
                <Link to="/founder-tools/marketing/create?step=research" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2 text-sm font-black text-white transition hover:bg-black">
                  Continue to topic research
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </>
        ) : null}

        {activeStep === "research" ? (
          <>
            <PanelHeader
                title="Research topics"
                description="Discovery uses your company context, competitors, and seed keywords to find article candidates."
                passed={Boolean(bootstrap.checks.research?.passed)}
                explainer={STEP_EXPLAINERS.research}
              />
              <div className="mb-5 grid gap-3 lg:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Seed keywords</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">{bootstrap.organization.seedKeywords.join(", ") || "None saved yet"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Competitors</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">{bootstrap.organization.competitors.join(", ") || "None saved yet"}</p>
                </div>
              </div>
              <Form method="POST">
                <input type="hidden" name="intent" value="start-discovery" />
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                  {discoveryPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                  {discoveryPending ? "Starting research..." : "Start topic research"}
                </button>
              </Form>
              {latestDiscovery ? <Link to={`/founder-tools/marketing/runs/${latestDiscovery.runId}`} className="mt-4 inline-flex text-sm font-bold text-violet-700">View latest research run</Link> : null}
            </>
          ) : null}

          {activeStep === "chooseArticle" ? (
            <>
              <div className="mb-6 border-b border-gray-100 pb-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h1 className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-gray-950">
                      Discover SEO article opportunities
                      <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                      We found topics your audience is already searching for. Pick one and we will{" "}
                      {directPublishMode
                        ? "prepare it for your website repository."
                        : "generate article copy and images for manual publishing."}
                    </p>
                  </div>
                  <div className="rounded-xl bg-violet-50 px-4 py-3 text-sm font-semibold leading-5 text-violet-700 ring-1 ring-violet-100 lg:max-w-sm">
                    <LightBulbIcon className="mr-1 inline h-4 w-4 align-[-2px]" />
                    Tip: Focus on topics with high Opportunity Score, growing trend, and lower difficulty.
                  </div>
                </div>
              </div>
              {researchActive ? (
                researchRun ? (
                  <MarketingRunProgressCard
                    run={researchRun}
                    title="Researching your topic"
                    currentStepLabel="Finding the strongest keywords and titles for your idea…"
                  />
                ) : (
                  <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-6 text-sm font-black text-slate-700">
                    <ArrowPathIcon className="h-4 w-4 animate-spin text-violet-600" />
                    Starting research…
                  </div>
                )
              ) : (
                <>
                  {researchRunId && researchFailed ? (
                    <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                      Research could not complete. Try a different angle or keyword from the{" "}
                      <Link to="/founder-tools/marketing" className="font-black text-rose-900 underline">
                        custom topic form
                      </Link>
                      .
                    </div>
                  ) : null}
              {!bootstrap.checks.baseline?.passed ? (
                <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  Run or skip the website baseline before generating an article.
                  <Link to="/founder-tools/marketing/create?step=baseline" className="ml-2 font-black text-amber-900 underline">
                    Open baseline
                  </Link>
                </div>
              ) : null}
              <Form method="POST" className="space-y-5">
                <input type="hidden" name="intent" value="start-article" />
                <input type="hidden" name="clientRequestId" value={billingRequestIds.articleJob} />
                <input type="hidden" name="sourceDiscoveryRunId" value={latestDiscovery?.runId ?? ""} />
                {!isCustomArticleSelected ? <input type="hidden" name="deliveryModeExplicit" value="false" /> : null}
                <TopicMetricExplainerStrip />
                <div className="grid gap-3">
                  {selectableTopicCandidates.length === 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                      {alreadyWrittenCandidates.length > 0
                        ? "All discovered topics have already been written. Run new research or enter a custom article."
                        : "No pending discovered topics are available yet. Run topic research or enter a custom article."}
                    </div>
                  ) : null}
                  {selectableTopicCandidates.map((candidate, index) => (
                    <TopicDecisionCard
                      key={candidate.id}
                      candidate={candidate}
                      rank={index + 1}
                      expanded={expandedTopicCandidateId === candidate.id}
                      checked={selectedTopicCandidateId === candidate.id}
                      onChange={() => setSelectedTopicCandidateId(candidate.id)}
                      onToggleDetails={() =>
                        setExpandedTopicCandidateId((current) => (current === candidate.id ? null : candidate.id))
                      }
                    />
                  ))}
                  <CustomTopicDecisionCard
                    checked={selectedTopicCandidateId === "__custom__"}
                    onChange={() => setSelectedTopicCandidateId("__custom__")}
                  />
                </div>
                {alreadyWrittenCandidates.length > 0 ? (
                  <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <summary className="cursor-pointer text-sm font-black text-gray-800">Already written from this discovery</summary>
                    <div className="mt-3 grid gap-2">
                      {alreadyWrittenCandidates.slice(0, 8).map((candidate) => (
                        <div key={`${candidate.id}:${candidate.keyword}`} className="rounded-lg bg-white px-3 py-2 text-sm">
                          <div className="font-bold text-gray-900">{candidate.writtenArticle?.title || candidate.title}</div>
                          <div className="mt-1 text-xs font-semibold text-gray-500">{candidate.keyword}</div>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null}
                {isCustomArticleSelected ? (
                  <>
                    <input type="hidden" name="deliveryModeExplicit" value="true" />
                    <div className="grid gap-4 lg:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-gray-700">Custom keyword</span>
                        <input name="targetKeyword" placeholder="Optional keyword override" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-gray-700">Custom title</span>
                        <input name="customTitle" placeholder="Optional article title override" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                      </label>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-gray-700">Delivery mode</span>
                        <select name="deliveryMode" defaultValue={effectiveDeliveryMode} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
                          <option value="review_draft">Review draft first</option>
                          <option value="publish_code">Publish code</option>
                          <option value="content_only">Content only</option>
                        </select>
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-gray-700">Article context</span>
                      <textarea name="articleContext" rows={4} placeholder="Add any angle, product detail, proof point, or audience note." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                    </label>
                  </>
                ) : null}
                <div className="sticky bottom-4 z-10 rounded-xl border border-violet-100 bg-violet-50/95 p-3 shadow-lg backdrop-blur">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Selected topic</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="max-w-2xl text-sm font-black leading-5 text-gray-950">{selectedTopicLabel}</p>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                          {isCustomArticleSelected ? "Custom topic" : topicOpportunityBadge(selectedTopicCandidate)}
                        </span>
                      </div>
                      <p className="mt-1 max-w-2xl text-xs font-semibold leading-5 text-gray-500">{deliveryModeNote}</p>
                    </div>
                    <button type="submit" disabled={isSubmitting || !bootstrap.checks.baseline?.passed} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                      {articleStartPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <RocketLaunchIcon className="h-4 w-4" />}
                      {articleStartPending ? "Starting article..." : `Generate draft article (${VIBE_MARKETING_ARTICLE_JOB_COST_POINTS} pts)`}
                    </button>
                  </div>
                </div>
              </Form>
                </>
              )}
            </>
          ) : null}

          {["writeCheck", "editArticle", "reviewPublish"].includes(activeStep) ? (
            <>
              <PanelHeader
                title={
                  pendingArticleSystemScan
                    ? activeStep === "reviewPublish"
                      ? "Approve articles setup"
                      : activeStep === "editArticle"
                        ? "Review articles setup preview"
                        : "Build articles/blogs directory page"
                    : activeStep === "editArticle"
                    ? "Edit article"
                    : activeStep === "reviewPublish"
                      ? effectiveDeliveryMode === "publish_code"
                        ? "Review publish"
                        : effectiveDeliveryMode === "review_draft"
                          ? "Review draft"
                        : "Review content package"
                      : "Write and check"
                }
                description={
                  pendingArticleSystemScan
                    ? "Build the articles/blogs location setup, inspect the Cloudflare preview, then approve setup PR creation."
                    : reviewDescription
                }
                passed={
                  pendingArticleSystemScan
                    ? Boolean(setupPreviewReady || setupPublished)
                    : activeStep === "reviewPublish"
                    ? Boolean(bootstrap.checks.publish?.passed || bootstrap.checks.contentPackage?.passed || contentPackageReady)
                    : Boolean(bootstrap.checks.write?.passed)
                }
                explainer={pendingArticleSystemScan ? ARTICLE_SETUP_STEP_EXPLAINERS[activeStep] ?? STEP_EXPLAINERS[activeStep] : STEP_EXPLAINERS[activeStep]}
              />
              {pendingArticleSystemScan && setupProgressRun ? (
                <ArticlesSetupProgressCard
                  run={setupProgressRun}
                  technicalUrl={setupProgressTechnicalUrl}
                  actionSlot={setupProgressActionSlot}
                />
              ) : latestArticle ? (
                <div className="space-y-4">
                  {latestContentPackage ? (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
                      <p className="font-black">Content package ready</p>
                      <p className="mt-1 font-semibold">{latestContentPackage.title ?? latestContentPackage.slug ?? "Generated article package"}</p>
                      {latestContentPackage.targetKeyword ? <p className="mt-1 text-xs font-bold">Keyword: {latestContentPackage.targetKeyword}</p> : null}
                    </div>
                  ) : null}
                  <Link to={`/founder-tools/marketing/runs/${latestArticle.runId}`} className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black">
                    Open article run
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <Link to="/founder-tools/marketing/create?step=chooseArticle" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700">
                  Choose an article first
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              )}
            </>
          ) : null}

          {activeStep === "dailyAutomation" ? (
            <>
              <PanelHeader
                title="Daily automation"
                description="Daily generation creates candidates and keeps human approval before final publish by default."
                passed={Boolean(bootstrap.checks.dailyAutomation?.passed)}
                explainer={STEP_EXPLAINERS.dailyAutomation}
              />
              <Form method="POST" className="space-y-5">
                <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                  <input name="dailyDiscoveryEnabled" type="checkbox" defaultChecked={bootstrap.settings.dailyDiscoveryEnabled} className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600" />
                  <span>
                    <span className="block text-sm font-black text-gray-950">Enable daily candidate generation</span>
                    <span className="mt-1 block text-sm text-gray-600">Articles still require review and approval before publish.</span>
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-gray-700">Timezone</span>
                  <input name="defaultTimezone" defaultValue={bootstrap.settings.defaultTimezone ?? "Australia/Melbourne"} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" name="intent" value="save-daily" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                    {saveDailyPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                    {saveDailyPending ? "Saving..." : "Save daily settings"}
                  </button>
                  <button type="submit" name="intent" value="daily-replay" disabled={isSubmitting || !bootstrap.checks.dailyAutomation?.passed} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60">
                    {dailyReplayPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                    {dailyReplayPending ? "Starting..." : "Run today now"}
                  </button>
                </div>
              </Form>
            </>
        ) : null}
      </main>
    </div>
  );
}
