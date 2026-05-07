import type { Route } from "./+types/founder-tools.marketing.create";
import { Form, Link, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import MarketingWorkflowShell from "~/components/MarketingWorkflowShell";
import { CustomTopicDecisionCard, TopicDecisionCard } from "~/components/TopicDecisionCard";
import VibeMarketingStartupBaselineSetup from "~/components/VibeMarketingStartupBaselineSetup";
import { type VibeMarketingStepKey } from "~/components/VibeMarketingStepper";
import { getEnv } from "~/lib/env.server";
import { combineCompanyContext as combineStartupCompanyContext } from "~/lib/vibe-marketing-startup-setup";
import {
  connectVibeMarketingGithub,
  getVibeMarketingBootstrap,
  replayVibeMarketingDaily,
  refreshVibeMarketingBaselineGoogle,
  saveVibeMarketingSettings,
  skipVibeMarketingBaseline,
  startVibeMarketingArticle,
  startVibeMarketingAutofill,
  startVibeMarketingBaseline,
  startVibeMarketingDiscovery,
  startVibeMarketingScan,
} from "~/lib/vibe-marketing";
import type { VibeMarketingBootstrap } from "~/types/vibe-marketing";
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
    next: "Run it or skip it for now, then connect the repository used for previews and publishing.",
  },
  github: {
    why: "Repository access lets us find the article system and prepare reviewable preview branches or PRs.",
    next: "Choose the repo, review the permissions on GitHub, then return here to scan the article setup.",
    safety: "Generated changes stay reviewable before publishing.",
  },
  scan: {
    why: "We inspect the repo so generated articles land in the right files and preview safely.",
    next: "The scan records framework, routes, build commands, article components, and publish targets.",
    safety: "The scan does not publish changes.",
  },
  articleSystem: {
    why: "The article system contract tells Content Factory how this website renders articles.",
    next: "Once the contract is ready, topic research and generation can use the correct route and components.",
    safety: "Preparation stays in setup until you explicitly generate or publish.",
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
    next: "Publish to the website when ready, or inspect PR and preview evidence first.",
    safety: "Package completion does not publish automatically.",
  },
  dailyAutomation: {
    why: "Automation keeps new topic candidates flowing without removing human review.",
    next: "Daily candidates still need selection, review, revision, and publish approval.",
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

function normalizeStep(value: string | null | undefined, fallback: string | null | undefined): VibeMarketingStepKey {
  const candidate = value && STEP_KEYS.includes(value as VibeMarketingStepKey) ? value : fallback;
  return STEP_KEYS.includes(candidate as VibeMarketingStepKey) ? (candidate as VibeMarketingStepKey) : "startupDetails";
}

function createStepForWorkflowStep(stepId: string | null | undefined): VibeMarketingStepKey | null {
  return stepId ? CREATE_STEP_BY_WORKFLOW_STEP_ID[stepId] ?? null : null;
}

function resolveActiveStep(value: string | null | undefined, bootstrap: VibeMarketingBootstrap): VibeMarketingStepKey {
  const requiredStep =
    createStepForWorkflowStep(bootstrap.workflowProgress?.currentStepId) ??
    normalizeStep(bootstrap.currentGuidedStep, "startupDetails");
  const requested = normalizeStep(value, requiredStep);
  const requestedWorkflowStepId = WORKFLOW_STEP_ID_BY_CREATE_STEP[requested];
  const requestedWorkflowStep = bootstrap.workflowProgress?.steps?.find((step) => step.id === requestedWorkflowStepId);

  if (requestedWorkflowStep?.status === "locked") {
    return requiredStep;
  }

  return requested;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const bootstrap = await getVibeMarketingBootstrap(env, request);
  const url = new URL(request.url);
  const activeStep = resolveActiveStep(url.searchParams.get("step"), bootstrap);
  const requestedStep = normalizeStep(url.searchParams.get("step"), activeStep);
  return { bootstrap, activeStep, requestedStep, shouldRefreshGoogleBaseline: url.searchParams.get("googleBaseline") === "refresh" };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const activeCompany = getActiveVibeRaisingCompany(appUser);
  const formData = await request.formData();
  const intent = stringFromForm(formData, "intent");

  try {
    if (intent === "save-startup-details") {
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
        founderNames: listFromForm(formData.get("founderNames")),
        stage: stringFromForm(formData, "stage"),
        organizationKind: stringFromForm(formData, "organizationKind"),
        notes: stringFromForm(formData, "targetAudience"),
        registered: true,
      });
      if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
      }
      return redirect("/founder-tools/marketing/create?step=baseline");
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
        existingFields: {
          companyContext,
          competitors: listFromForm(formData.get("competitors")),
          seedKeywords: listFromForm(formData.get("seedKeywords")),
          companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
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
      return redirect("/founder-tools/marketing/create?step=github");
    }

    if (intent === "connect-github") {
      const githubRepo = stringFromForm(formData, "githubRepo");
      const response = await connectVibeMarketingGithub(env, request, { githubRepo, github_repo: githubRepo });
      const authUrl = response.auth_url ?? response.authUrl;
      if (authUrl) throw redirect(authUrl);
      const connectionState = response.connection_state ?? response.connectionState;
      if (response.status === "already_connected" || response.status === "connected" || connectionState === "connected") {
        return redirect("/founder-tools/marketing/create?step=scan");
      }
      return {
        intent,
        error: response.detail ?? response.error ?? "GitHub connection could not be completed.",
      };
    }

    if (intent === "start-scan") {
      const result = await startVibeMarketingScan(env, request, {
        githubRepo: stringFromForm(formData, "githubRepo"),
      });
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=scan");
    }

    if (intent === "start-discovery") {
      const result = await startVibeMarketingDiscovery(env, request, {});
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=research");
    }

    if (intent === "start-article") {
      const bootstrap = await getVibeMarketingBootstrap(env, request);
      const topicCandidateId = stringFromForm(formData, "topicCandidateId");
      const selectedCandidate =
        topicCandidateId && topicCandidateId !== "__custom__"
          ? bootstrap.topicCandidates.find((candidate) => candidate.id === topicCandidateId) ?? null
          : null;
      if (topicCandidateId && topicCandidateId !== "__custom__" && !selectedCandidate) {
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
      const result = await startVibeMarketingArticle(env, request, {
        topic,
        targetKeyword,
        customTitle: customTitle || selectedCandidate?.title || "",
        selectedTitle: selectedCandidate?.title ?? "",
        topicCandidateId,
        context: stringFromForm(formData, "articleContext"),
        deliveryMode: stringFromForm(formData, "deliveryMode"),
        deliveryModeConfirmed: true,
        sourceRunId: selectedCandidate?.sourceRunId || stringFromForm(formData, "sourceDiscoveryRunId"),
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
    return {
      intent,
      error:
        error?.data?.detail ??
        error?.data?.error ??
        error?.response?.data?.detail ??
        error?.message ??
        "That action could not be completed.",
    };
  }

  return null;
}

function actionIntentStep(intent?: string | null): VibeMarketingStepKey | null {
  if (!intent) return null;
  if (intent === "connect-github") return "github";
  if (intent === "save-daily" || intent === "daily-replay") return "dailyAutomation";
  if (intent === "start-scan") return "scan";
  if (intent === "save-article-system") return "articleSystem";
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
  const { bootstrap, activeStep, requestedStep, shouldRefreshGoogleBaseline } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const latestActionIntent = actionDataIntent(actionData);
  const latestActionError = actionDataError(actionData);
  const actionErrorStep = actionIntentStep(latestActionIntent);
  const githubConnectError = activeStep === "github" && latestActionIntent === "connect-github" ? latestActionError : null;
  const topActionError =
    latestActionError && latestActionIntent !== "connect-github" && (!actionErrorStep || actionErrorStep === activeStep)
      ? latestActionError
      : null;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const latestScan = bootstrap.latestRuns.find((run) => ["repo_scan", "content_factory_scan"].includes(run.workflow));
  const latestDiscovery = bootstrap.latestRuns.find((run) => ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(run.workflow));
  const latestArticle = bootstrap.latestRuns.find((run) => ["article_generation", "content_factory_article"].includes(run.workflow));
  const latestContentPackage = latestArticle?.contentPackage ?? bootstrap.publishEvidence?.contentPackage ?? null;
  const contentPackageReady = Boolean(latestContentPackage?.contentPackaged);
  const selectableTopicCandidates = useMemo(
    () => bootstrap.topicCandidates.filter((candidate) => !candidate.alreadyWritten).slice(0, 5),
    [bootstrap.topicCandidates],
  );
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
  const chooseArticleStatusLabel = !bootstrap.checks.baseline?.passed
    ? "Needs baseline"
    : selectableTopicCandidates.length > 0
      ? "Ready"
      : alreadyWrittenCandidates.length > 0
        ? "Topics written"
        : "No pending topics";
  const defaultTopicCandidateId = selectableTopicCandidates[0]?.id ?? "__custom__";
  const [selectedTopicCandidateId, setSelectedTopicCandidateId] = useState(defaultTopicCandidateId);
  const selectedTopicCandidate = useMemo(
    () => selectableTopicCandidates.find((candidate) => candidate.id === selectedTopicCandidateId) ?? null,
    [selectableTopicCandidates, selectedTopicCandidateId],
  );
  const selectedTopicLabel = selectedTopicCandidate?.title ?? "Custom article";

  useEffect(() => {
    const selectionStillValid =
      selectedTopicCandidateId === "__custom__" ||
      selectableTopicCandidates.some((candidate) => candidate.id === selectedTopicCandidateId);
    if (!selectionStillValid) {
      setSelectedTopicCandidateId(defaultTopicCandidateId);
    }
  }, [defaultTopicCandidateId, selectableTopicCandidates, selectedTopicCandidateId]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <nav className="border-b border-gray-200 pb-4" aria-label="Breadcrumb">
        <Link to="/founder-tools/marketing" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to marketing
        </Link>
      </nav>

      <MarketingWorkflowShell
        progress={bootstrap.workflowProgress}
        viewedStepId={WORKFLOW_STEP_ID_BY_CREATE_STEP[activeStep]}
        title="Create and publish article"
        isSubmitting={isSubmitting}
        showPrimaryAction={false}
      />

      {topActionError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {topActionError}
        </div>
      ) : null}

      <main className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        {activeStep === "startupDetails" || activeStep === "baseline" ? (
          <VibeMarketingStartupBaselineSetup
            bootstrap={bootstrap}
            error={topActionError}
            variant="workflow"
            focusSection={requestedStep === "baseline" ? "baseline" : "profile"}
            autoRefreshGoogleBaseline={shouldRefreshGoogleBaseline}
          />
        ) : null}

          {activeStep === "github" ? (
            <>
              <PanelHeader
                title="Connect GitHub"
                description="Vibe Marketing needs repository access to detect your article system and open previewable article PRs."
                passed={Boolean(bootstrap.checks.github?.passed)}
                explainer={STEP_EXPLAINERS.github}
              />
              <Form method="POST" className="space-y-5">
                <input type="hidden" name="intent" value="connect-github" />
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-gray-700">Repository</span>
                  <input
                    name="githubRepo"
                    defaultValue={bootstrap.settings.githubRepo ?? ""}
                    placeholder="owner/repo"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </label>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CodeBracketIcon className="h-4 w-4" />}
                  Connect GitHub
                </button>
                {githubConnectError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {githubConnectError}
                  </div>
                ) : null}
              </Form>
            </>
          ) : null}

          {activeStep === "scan" || activeStep === "articleSystem" ? (
            <>
              <PanelHeader
                title={activeStep === "scan" ? "Scan repository" : "Prepare article system"}
                description="The scan detects your framework, build commands, article directories, registries, components, and safe publish targets."
                passed={activeStep === "scan" ? Boolean(bootstrap.checks.scan?.passed) : Boolean(bootstrap.checks.scaffold?.passed)}
                explainer={STEP_EXPLAINERS[activeStep]}
              />
              {latestScan ? (
                <div className="mb-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm font-black text-gray-950">Latest scan: {latestScan.status.replace(/_/g, " ")}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">{latestScan.currentStep ?? latestScan.runId}</p>
                  <Link to={`/founder-tools/marketing/runs/${latestScan.runId}`} className="mt-3 inline-flex text-sm font-bold text-violet-700 hover:text-violet-900">
                    View scan run
                  </Link>
                </div>
              ) : null}
              <Form method="POST">
                <input type="hidden" name="intent" value="start-scan" />
                <input type="hidden" name="githubRepo" value={bootstrap.settings.githubRepo ?? ""} />
                <button type="submit" disabled={isSubmitting || !bootstrap.settings.githubRepo} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                  Run repository scan
                </button>
              </Form>
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
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                  Start topic research
                </button>
              </Form>
              {latestDiscovery ? <Link to={`/founder-tools/marketing/runs/${latestDiscovery.runId}`} className="mt-4 inline-flex text-sm font-bold text-violet-700">View latest research run</Link> : null}
            </>
          ) : null}

          {activeStep === "chooseArticle" ? (
            <>
              <PanelHeader
                title="Choose article"
                description="Pick a discovered topic or enter a known keyword and title angle."
                passed={Boolean(latestArticle || selectableTopicCandidates.length > 0)}
                statusLabel={chooseArticleStatusLabel}
                explainer={STEP_EXPLAINERS.chooseArticle}
              />
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
                <input type="hidden" name="sourceDiscoveryRunId" value={latestDiscovery?.runId ?? ""} />
                <div className="grid gap-3">
                  {selectableTopicCandidates.length === 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                      {alreadyWrittenCandidates.length > 0
                        ? "All discovered topics have already been written. Run new research or enter a custom article."
                        : "No pending discovered topics are available yet. Run topic research or enter a custom article."}
                    </div>
                  ) : null}
                  {selectableTopicCandidates.map((candidate) => (
                    <TopicDecisionCard
                      key={candidate.id}
                      candidate={candidate}
                      checked={selectedTopicCandidateId === candidate.id}
                      onChange={() => setSelectedTopicCandidateId(candidate.id)}
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
                {bootstrap.writtenTopics.length > 0 ? (
                  <div className="rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-black text-gray-900">Recent written topics</div>
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      {bootstrap.writtenTopics.slice(0, 6).map((topic) => (
                        <div key={topic.id ?? `${topic.slug}:${topic.keyword}`} className="rounded-lg bg-gray-50 px-3 py-2 text-sm">
                          <div className="font-bold text-gray-900">{topic.title}</div>
                          <div className="mt-1 text-xs font-semibold text-gray-500">{topic.keyword}</div>
                          {topic.articleUrl || topic.prUrl ? (
                            <a href={topic.articleUrl || topic.prUrl || "#"} className="mt-2 inline-flex text-xs font-black text-violet-700 underline">
                              Open evidence
                            </a>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
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
                    <select name="deliveryMode" defaultValue={bootstrap.settings.articleDeliveryMode ?? "publish_code"} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
                      <option value="publish_code">Publish code</option>
                      <option value="content_only">Content only</option>
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-gray-700">Article context</span>
                  <textarea name="articleContext" rows={4} placeholder="Add any angle, product detail, proof point, or audience note." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                </label>
                <div className="sticky bottom-4 z-10 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Selected topic</p>
                      <p className="mt-1 max-w-2xl text-sm font-black leading-5 text-gray-950">{selectedTopicLabel}</p>
                    </div>
                    <button type="submit" disabled={isSubmitting || !bootstrap.checks.baseline?.passed} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                      {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <RocketLaunchIcon className="h-4 w-4" />}
                      Generate draft article
                    </button>
                  </div>
                </div>
              </Form>
            </>
          ) : null}

          {["writeCheck", "editArticle", "reviewPublish"].includes(activeStep) ? (
            <>
              <PanelHeader
                title={activeStep === "editArticle" ? "Edit article" : activeStep === "reviewPublish" ? "Review publish" : "Write and check"}
                description="The run workspace shows generation status, content package evidence, revision controls, preview links, PR links, and publish approval."
                passed={
                  activeStep === "reviewPublish"
                    ? Boolean(bootstrap.checks.publish?.passed || bootstrap.checks.contentPackage?.passed || contentPackageReady)
                    : Boolean(bootstrap.checks.write?.passed)
                }
                explainer={STEP_EXPLAINERS[activeStep]}
              />
              {latestArticle ? (
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
                    Save daily settings
                  </button>
                  <button type="submit" name="intent" value="daily-replay" disabled={isSubmitting || !bootstrap.checks.dailyAutomation?.passed} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60">
                    Run today now
                  </button>
                </div>
              </Form>
            </>
        ) : null}
      </main>
    </div>
  );
}
