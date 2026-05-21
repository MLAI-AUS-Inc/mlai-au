import type { Route } from "./+types/founder-tools.marketing";
import type { ShouldRevalidateFunctionArgs } from "react-router";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useLocation, useNavigation, useRevalidator } from "react-router";
import type { KeyboardEvent, ReactNode, RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  FileText,
  Flame,
  Loader2,
  MoreHorizontal,
  PenLine,
  Plus,
  Rocket,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  Trash2,
  Undo2,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";
import { clsx } from "clsx";

import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import type { MarketingRunProgressTheme } from "~/components/MarketingRunProgressCard";
import AvatarModal from "~/components/AvatarModal";
import VibeMarketingStartupBaselineSetup from "~/components/VibeMarketingStartupBaselineSetup";
import { getEnv } from "~/lib/env.server";
import { parseFounderProfilesFormValue } from "~/lib/founder-profiles";
import { useMarketingActionPending } from "~/lib/vibe-marketing-pending-actions";
import {
  controlVibeMarketingRun,
  getVibeMarketingBootstrap,
  replayVibeMarketingDaily,
  refreshVibeMarketingBaselineGoogle,
  recordVibeMarketingTopicFeedback,
  restoreVibeMarketingTopicFeedback,
  skipVibeMarketingBaseline,
  startVibeMarketingArticle,
  startVibeMarketingAutofill,
  startVibeMarketingBaseline,
  startVibeMarketingDiscovery,
  startVibeMarketingScan,
  uploadVibeMarketingCompanyAvatar,
} from "~/lib/vibe-marketing";
import {
  getActiveVibeRaisingCompany,
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
  saveVibeRaisingCompany,
  saveVibeRaisingProfile,
  setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";
import type {
  VibeMarketingAutofillCompetitor,
  VibeMarketingAutofillResult,
  VibeMarketingBootstrap,
  VibeMarketingDraftArticle,
  VibeMarketingRunSummary,
  VibeMarketingTopicCandidate,
  VibeMarketingTopicFeedback,
  VibeMarketingTopicPillar,
  VibeMarketingWebsiteBaseline,
  VibeMarketingWebsiteBaselineMetric,
  VibeMarketingWrittenTopic,
} from "~/types/vibe-marketing";
import type { VibeRaisingProfile } from "~/types/vibe-raising";

const FLOW_STEPS = [
  { label: "You tell us about your startup", icon: UserRound },
  { label: "We research your market", icon: Search },
  { label: "We write your SEO article", icon: PenLine },
  { label: "You review & publish", icon: Send },
  { label: "Drive more traffic & grow", icon: BarChart3 },
] as const;
const DRAFT_DELETE_CONFIRMATION_STORAGE_KEY = "vibe-marketing:skip-draft-delete-confirmation";
const CONTENT_ISLAND_DISCOVERY_DONE_STATUSES = new Set(["awaiting_confirmation", "completed"]);
const CONTENT_ISLAND_DISCOVERY_FAILED_STATUSES = new Set(["failed", "blocked", "denied", "cancelled", "canceled"]);

function normalizeContentIslandDiscoveryStatus(status: string | null | undefined) {
  return String(status || "").trim().toLowerCase();
}

function isContentIslandDiscoveryDoneStatus(status: string | null | undefined) {
  return CONTENT_ISLAND_DISCOVERY_DONE_STATUSES.has(normalizeContentIslandDiscoveryStatus(status));
}

function isContentIslandDiscoveryFailedStatus(status: string | null | undefined) {
  return CONTENT_ISLAND_DISCOVERY_FAILED_STATUSES.has(normalizeContentIslandDiscoveryStatus(status));
}

function isContentIslandDiscoveryTerminalStatus(status: string | null | undefined) {
  return isContentIslandDiscoveryDoneStatus(status) || isContentIslandDiscoveryFailedStatus(status);
}

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

function isGithubPublishingReady(bootstrap: VibeMarketingBootstrap) {
  return Boolean(bootstrap.checks.github?.passed && bootstrap.settings.githubRepo);
}

function isArticleSystemSetupBlocked(bootstrap: VibeMarketingBootstrap) {
  return Boolean(bootstrap.checks.scaffold?.setupBlocked);
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

function combineCompanyContext({
  shortDescription,
  problemSolved,
  targetAudience,
}: {
  shortDescription: string;
  problemSolved: string;
  targetAudience: string;
}) {
  return [
    shortDescription,
    problemSolved ? `Problem solved: ${problemSolved}` : "",
    targetAudience ? `Target audience: ${targetAudience}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function emptyBootstrapFromProfile(profile: VibeRaisingProfile | null): VibeMarketingBootstrap {
  const company = profile?.companies[0] ?? null;
  const companyName = company?.name ?? profile?.organizationName ?? "";
  const domain = company?.domain ?? "";

  return {
    company: {
      id: company?.id ?? "",
      name: companyName,
      domain,
      companyLinkedInUrl: company?.companyLinkedInUrl ?? null,
      location: company?.location ?? null,
      abn: company?.abn ?? null,
      organizationId: null,
    },
    organization: {
      id: null,
      name: companyName,
      domain,
      companyLinkedInUrl: company?.companyLinkedInUrl ?? null,
      competitors: [],
      seedKeywords: [],
    },
    settings: {
      brandName: companyName || null,
      companyContext: null,
      articleDeliveryMode: "review_draft",
      githubRepo: null,
      dailyDiscoveryEnabled: false,
      githubConnectionState: null,
    },
    startupProfile: {
      founderNames: [],
      stage: null,
      organizationKind: null,
      notes: null,
      companyAliases: [],
      domainAliases: [],
      competitorDomains: [],
      positiveKeywords: [],
    },
    websiteBaseline: {
      status: "missing",
      passed: false,
      domain,
      collectedAt: null,
      overallScore: null,
      summary: null,
      sourceStatus: {},
      metrics: {},
      recommendations: [],
    },
    googleBaselineConnection: {
      connected: false,
      hasBaselineScopes: false,
      status: "needs_connection",
      connectUrl: null,
    },
    checks: {},
    latestRuns: [],
    latestRunsByWorkflow: {},
    topicCandidates: [],
    topicPillars: [],
    hiddenTopicCandidates: [],
    declinedTopicFeedback: [],
    draftArticles: [],
    writtenTopics: [],
    publishEvidence: {},
    guidedSteps: [],
    currentGuidedStep: "startupDetails",
    recommendedNextAction: { key: "startupDetails", label: "Add startup details" },
    workflowProgress: null,
    hasCompletedArticleFlow: false,
    startPageMode: "first_article_setup",
  };
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  if (vibeContext.appUser && vibeContext.appUser.role !== "founder") {
    throw redirect("/founder-tools/updates");
  }

  if (!vibeContext.appUser) {
    return { bootstrap: emptyBootstrapFromProfile(vibeContext.profile), hasFounderCompany: false };
  }

  const bootstrap = await getVibeMarketingBootstrap(env, request, null, "summary");
  return { bootstrap, hasFounderCompany: true };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  if (vibeContext.appUser && vibeContext.appUser.role !== "founder") {
    throw redirect("/founder-tools/updates");
  }

  const formData = await request.formData();
  const intent = stringFromForm(formData, "intent");

  try {
    if (intent === "save-company-avatar") {
      if (!vibeContext.appUser) {
        return { intent, error: "Create your startup profile before adding an avatar." };
      }
      const avatar = formData.get("avatar");
      if (!(avatar instanceof File) || avatar.size === 0) {
        return { intent, error: "Choose an avatar image before saving." };
      }
      const bootstrap = await uploadVibeMarketingCompanyAvatar(env, request, avatar);
      return { intent, avatarUrl: bootstrap.company.avatarUrl ?? null };
    }

    if (intent === "save-startup-details") {
      const { founderProfiles, founderNames } = founderNamesFromForm(formData);
      const name = stringFromForm(formData, "companyName");
      const domain = stringFromForm(formData, "domain");
      const shortDescription = stringFromForm(formData, "shortDescription");
      const problemSolved = stringFromForm(formData, "problemSolved");
      const targetAudience = stringFromForm(formData, "targetAudience");
      const companyContext =
        stringFromForm(formData, "companyContext") ||
        combineCompanyContext({ shortDescription, problemSolved, targetAudience });

      if (!name) {
        return { intent, error: "Add your startup or company name before continuing." };
      }

      if (!vibeContext.profile || !vibeContext.appUser) {
        await saveVibeRaisingProfile(env, request, {
          role: "founder",
          organizationName: null,
        });
      }

      const activeCompany = vibeContext.appUser ? getActiveVibeRaisingCompany(vibeContext.appUser) : null;
      const companyId = await saveVibeRaisingCompany(env, request, {
        companyId: activeCompany?.id ?? null,
        name,
        domain,
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
        shortDescription,
        problemSolved,
        targetAudience,
        notes: targetAudience,
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
      if (!vibeContext.profile || !vibeContext.appUser) {
        await saveVibeRaisingProfile(env, request, {
          role: "founder",
          organizationName: null,
        });
      }

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
          companyContext:
            stringFromForm(formData, "companyContext") ||
            combineCompanyContext({
              shortDescription: stringFromForm(formData, "shortDescription"),
              problemSolved: stringFromForm(formData, "problemSolved"),
              targetAudience: stringFromForm(formData, "targetAudience"),
            }),
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
        companyContext:
          stringFromForm(formData, "companyContext") ||
          combineCompanyContext({
            shortDescription: stringFromForm(formData, "shortDescription"),
            problemSolved: stringFromForm(formData, "problemSolved"),
            targetAudience: stringFromForm(formData, "targetAudience"),
          }),
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
      });
      return { intent, autofillRunId: result.runId, status: result.status, error: result.error, errors: result.errors };
    }

    if (!vibeContext.appUser) {
      return { intent, error: "Save your startup details before starting article research." };
    }

    if (intent === "start-baseline") {
      const result = await startVibeMarketingBaseline(env, request, {});
      return { intent, baselineRunId: result.runId, status: result.status };
    }

    if (intent === "refresh-baseline-google") {
      const websiteBaseline = await refreshVibeMarketingBaselineGoogle(env, request, {});
      return { intent, websiteBaseline };
    }

    if (intent === "skip-baseline") {
      await skipVibeMarketingBaseline(env, request, {
        reason: stringFromForm(formData, "reason") || "Skipped during marketing setup",
      });
      return redirect("/founder-tools/marketing/create?step=articleSystem");
    }

    if (intent === "scan") {
      const run = await startVibeMarketingScan(env, request, {});
      if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
    }

    if (intent === "start-content-island-discovery") {
      const bootstrap = await getVibeMarketingBootstrap(env, request, null, "summary");
      if (isArticleSystemSetupBlocked(bootstrap)) {
        return { intent, error: "Finish approving, merging, and verifying the articles directory setup before researching topics." };
      }
      const contentIslandSlug = stringFromForm(formData, "contentIslandSlug");
      const pillar = bootstrap.topicPillars.find((item) => item.slug === contentIslandSlug);
      if (!pillar) {
        return { intent, error: "Choose a content island before generating article ideas." };
      }
      const contentIslandKeyword =
        stringFromForm(formData, "contentIslandKeyword") ||
        pillar.topicCandidates.find((candidate) => candidate.pillarKeyword)?.pillarKeyword ||
        pillar.name;
      const run = await startVibeMarketingDiscovery(env, request, {
        contentIslandSlug: pillar.slug,
        content_island_slug: pillar.slug,
        contentIslandName: pillar.name,
        content_island_name: pillar.name,
        contentIslandKeyword: contentIslandKeyword,
        content_island_keyword: contentIslandKeyword,
        contentIslandIconKey: pillar.iconKey,
        content_island_icon_key: pillar.iconKey,
        contentIslandColorKey: pillar.colorKey,
        content_island_color_key: pillar.colorKey,
        requestedTopicCount: 4,
        requested_topic_count: 4,
      });
      const runStatus = normalizeContentIslandDiscoveryStatus(run.status);
      const runQueuedSuccessfully = Boolean(run.runId) && !isContentIslandDiscoveryFailedStatus(runStatus);
      return {
        intent,
        runId: run.runId,
        status: run.status,
        islandSlug: pillar.slug,
        islandName: pillar.name,
        islandIconKey: pillar.iconKey,
        islandColorKey: pillar.colorKey,
        error: runQueuedSuccessfully ? null : run.error,
        errors: runQueuedSuccessfully ? [] : run.errors,
      };
    }

    if (intent === "start-discovery" || intent === "discovery") {
      const bootstrap = await getVibeMarketingBootstrap(env, request, null, "summary");
      if (isArticleSystemSetupBlocked(bootstrap)) {
        return { intent, error: "Finish approving, merging, and verifying the articles directory setup before researching topics." };
      }
      const run = await startVibeMarketingDiscovery(env, request, {});
      if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
    }

    if (intent === "resume-draft" || intent === "restart-draft") {
      const runId = stringFromForm(formData, "runId");
      if (!runId) {
        return { intent, error: "Choose a draft article to continue." };
      }
      const run = await controlVibeMarketingRun(
        env,
        request,
        runId,
        intent === "resume-draft" ? "resume" : "restart",
      );
      const nextRunId = run.runId || runId;
      throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(nextRunId)}`);
    }

    if (intent === "delete-draft") {
      const runId = stringFromForm(formData, "runId");
      if (!runId) {
        return { intent, error: "Choose a draft article to delete." };
      }
      await controlVibeMarketingRun(env, request, runId, "cancel");
      return { intent, runId };
    }

    if (intent === "start-article") {
      const bootstrap = await getVibeMarketingBootstrap(env, request);
      if (isArticleSystemSetupBlocked(bootstrap)) {
        return { intent, error: "Finish approving, merging, and verifying the articles directory setup before generating articles." };
      }
      const topicCandidateId = stringFromForm(formData, "topicCandidateId");
      const candidatePool = [
        ...bootstrap.topicCandidates,
        ...bootstrap.topicPillars.flatMap((pillar) => pillar.topicCandidates),
      ];
      const selectedCandidate =
        topicCandidateId && topicCandidateId !== "__custom__"
          ? candidatePool.find((candidate) => candidate.id === topicCandidateId) ?? null
          : null;

      if (topicCandidateId && topicCandidateId !== "__custom__" && !selectedCandidate) {
        return { intent, error: "That topic is no longer available. Choose another topic or enter a custom one." };
      }

      if (selectedCandidate?.alreadyWritten) {
        return { intent, error: "That topic has already been written. Choose another topic or enter a custom one." };
      }

      const customKeyword = stringFromForm(formData, "targetKeyword");
      const customTitle = stringFromForm(formData, "customTitle") || stringFromForm(formData, "titleAngle");
      const topic = customTitle || selectedCandidate?.title || customKeyword || selectedCandidate?.keyword || "";
      const targetKeyword = customKeyword || selectedCandidate?.keyword || topic;

      if (!topic && !targetKeyword) {
        return { intent, error: "Choose a topic or enter a custom article idea before generating." };
      }

      const result = await startVibeMarketingArticle(env, request, {
        topic,
        targetKeyword,
        customTitle: customTitle || selectedCandidate?.title || "",
        selectedTitle: selectedCandidate?.title ?? "",
        topicCandidateId,
        context: stringFromForm(formData, "articleContext"),
        deliveryMode: stringFromForm(formData, "deliveryMode") || effectiveArticleDeliveryMode(bootstrap),
        deliveryModeExplicit: stringFromForm(formData, "deliveryModeExplicit") === "true",
        deliveryModeConfirmed: true,
        sourceRunId: selectedCandidate?.sourceRunId || stringFromForm(formData, "sourceDiscoveryRunId"),
      });

      if (result.runId) {
        return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }

      return {
        intent,
        error:
          result.error ||
          result.errors?.[0] ||
          "Article generation was accepted, but the backend did not return a run id. Refresh and try again.",
      };
    }

    if (intent === "decline-topic") {
      const keyword = stringFromForm(formData, "keyword");
      if (!keyword) {
        return { intent, error: "Choose a topic to ignore." };
      }

      const feedback = await recordVibeMarketingTopicFeedback(env, request, {
        keyword,
        sessionId: stringFromForm(formData, "sourceDiscoveryRunId"),
        feedbackType: "declined",
        reasonCode: "not_appropriate",
        reasonText: null,
        declineScope: "similar",
        source: "homepage_topic_card",
      });
      return {
        intent,
        topicCandidateId: stringFromForm(formData, "topicCandidateId"),
        topicFeedback: feedback,
      };
    }

    if (intent === "restore-topic-feedback") {
      const feedbackId = stringFromForm(formData, "feedbackId");
      if (!feedbackId) {
        return { intent, error: "Choose a declined topic to restore." };
      }

      const feedback = await restoreVibeMarketingTopicFeedback(env, request, feedbackId);
      return { intent, topicFeedback: feedback };
    }

    if (intent === "daily-replay") {
      const run = await replayVibeMarketingDaily(env, request, {});
      if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
    }
  } catch (error: any) {
    if (error instanceof Response) throw error;
    const responseData = error?.data ?? error?.response?.data;
    const responseErrors = Array.isArray(responseData?.errors)
      ? responseData.errors.map((item: unknown) => String(item)).filter(Boolean)
      : [];
    return {
      intent,
      error:
        responseErrors[0] ??
        responseData?.detail ??
        responseData?.error ??
        responseData?.message ??
        error?.message ??
        "That action could not be completed.",
      errors: responseErrors,
    };
  }

  return null;
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  if (actionIntent(args.actionResult) === "start-content-island-discovery") {
    return false;
  }
  return args.defaultShouldRevalidate;
}

function actionError(data: unknown): string | null {
  if (!data || typeof data !== "object" || !("error" in data)) return null;
  const error = (data as { error?: unknown }).error;
  return typeof error === "string" ? error : null;
}

function actionIntent(data: unknown): string | null {
  if (!data || typeof data !== "object" || !("intent" in data)) return null;
  const intent = (data as { intent?: unknown }).intent;
  return typeof intent === "string" ? intent : null;
}

function numericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function volumeLabel(value: unknown) {
  const volume = numericValue(value);
  if (volume === null) return "Volume pending";
  if (volume >= 1000) return "High volume";
  if (volume >= 300) return "Medium volume";
  return "Niche volume";
}

const VERIFIED_DIFFICULTY_SOURCES = new Set(["dataforseo_labs", "dataforseo_bulk"]);

function difficultyLabel(topic: VibeMarketingTopicCandidate) {
  const difficultySource = typeof topic.difficultySource === "string" ? topic.difficultySource : "";
  if (!VERIFIED_DIFFICULTY_SOURCES.has(difficultySource)) return "Difficulty pending";
  const difficulty = numericValue(topic.difficulty);
  if (difficulty === null) return "Difficulty pending";
  return `Difficulty ${Math.round(difficulty)}/100`;
}

function opportunityLabel(value: unknown) {
  const score = numericValue(value);
  return score === null ? null : Math.round(score).toString();
}

function topicMemoryKey(value: unknown) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function declineReasonLabel(reasonCode: string | null | undefined) {
  const labels: Record<string, string> = {
    not_appropriate: "Not appropriate",
    off_topic: "Off-topic",
    wrong_audience: "Wrong audience",
    already_covered: "Already covered",
    too_broad: "Too broad",
    low_intent: "Low intent",
    other: "Other",
  };
  return labels[String(reasonCode ?? "").trim()] ?? "Not appropriate";
}

function companyInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "YS";
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
}

const stableDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatStableDate(value: string | null | undefined, fallback = "Recently") {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return stableDateFormatter.format(date);
}

function formatArticleDate(value: string | null | undefined) {
  return formatStableDate(value, "Recently");
}

function startupTags(bootstrap: VibeMarketingBootstrap) {
  const tags = [
    bootstrap.startupProfile.stage,
    bootstrap.startupProfile.organizationKind,
    ...bootstrap.organization.seedKeywords.slice(0, 2),
    ...(bootstrap.startupProfile.positiveKeywords ?? []).slice(0, 2),
  ]
    .map((tag) => String(tag ?? "").trim())
    .filter(Boolean);
  return Array.from(new Set(tags)).slice(0, 3);
}

function topicChips(bootstrap: VibeMarketingBootstrap) {
  const chips = [
    ...bootstrap.organization.seedKeywords,
    ...(bootstrap.startupProfile.positiveKeywords ?? []),
    bootstrap.startupProfile.organizationKind,
    bootstrap.startupProfile.stage,
  ]
    .map((chip) => String(chip ?? "").trim())
    .filter(Boolean);
  return Array.from(new Set(chips)).slice(0, 6);
}

function defaultTopicIdeas(bootstrap: VibeMarketingBootstrap) {
  const tags = topicChips(bootstrap);
  if (tags.length) return tags;
  return ["SaaS growth strategies", "Product-led growth", "User onboarding", "B2B marketing", "Customer retention"];
}

function FirstArticleProgressPanel() {
  return (
    <div className="min-w-0 rounded-2xl border border-violet-100 bg-violet-50/70 px-5 py-6 shadow-sm shadow-violet-100/60 lg:px-8">
      <p className="text-center text-sm font-black text-slate-600">What happens next?</p>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="relative flex flex-col items-center gap-3 text-center">
              <div
                className={clsx(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  index === 0 ? "bg-violet-200 text-violet-700" : "bg-white/70 text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="max-w-[120px] text-xs font-black leading-5 text-slate-900">{step.label}</p>
              {index < FLOW_STEPS.length - 1 ? (
                <ArrowRight className="absolute right-[-18px] top-4 hidden h-4 w-4 text-slate-400 lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormField({
  label,
  help,
  children,
}: {
  label: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-950">{label}</span>
      {help ? <span className="mt-1 block text-sm font-semibold text-slate-500">{help}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const STARTUP_STAGE_OPTIONS = [
  "",
  "Idea",
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Growth",
  "Bootstrapped",
  "Not fundraising",
  "Other",
];

const ORGANIZATION_KIND_OPTIONS = ["", "For-profit", "Not-for-profit"];

type StartupSetupField =
  | "companyName"
  | "domain"
  | "companyLinkedInUrl"
  | "location"
  | "abn"
  | "shortDescription"
  | "problemSolved"
  | "targetAudience"
  | "competitors"
  | "seedKeywords"
  | "founderNames"
  | "stage"
  | "organizationKind";

type StartupSetupValues = Record<StartupSetupField, string>;

function splitCompanyContext(context: string | null | undefined, fallbackTargetAudience: string | null | undefined) {
  const raw = String(context ?? "").trim();
  if (!raw) {
    return { shortDescription: "", problemSolved: "", targetAudience: String(fallbackTargetAudience ?? "").trim() };
  }

  const problemMatch = raw.match(/(?:^|\n+)Problem solved:\s*([\s\S]*?)(?=\n+Target audience:|$)/i);
  const audienceMatch = raw.match(/(?:^|\n+)Target audience:\s*([\s\S]*?)$/i);
  const shortDescription = raw
    .replace(/(?:^|\n+)Problem solved:\s*[\s\S]*?(?=\n+Target audience:|$)/i, "")
    .replace(/(?:^|\n+)Target audience:\s*[\s\S]*$/i, "")
    .trim();

  return {
    shortDescription: shortDescription || raw,
    problemSolved: problemMatch?.[1]?.trim() ?? "",
    targetAudience: audienceMatch?.[1]?.trim() || String(fallbackTargetAudience ?? "").trim(),
  };
}

function startupSetupDefaultsFromBootstrap(bootstrap: VibeMarketingBootstrap): StartupSetupValues {
  const splitContext = splitCompanyContext(bootstrap.settings.companyContext, bootstrap.startupProfile.notes);
  const companyName = bootstrap.company.name === "Company" ? "" : bootstrap.company.name ?? "";
  return {
    companyName,
    domain: bootstrap.company.domain ?? bootstrap.organization.domain ?? "",
    companyLinkedInUrl: bootstrap.organization.companyLinkedInUrl ?? bootstrap.company.companyLinkedInUrl ?? "",
    location: bootstrap.company.location ?? "",
    abn: bootstrap.company.abn ?? "",
    shortDescription: splitContext.shortDescription,
    problemSolved: splitContext.problemSolved,
    targetAudience: splitContext.targetAudience,
    competitors: (bootstrap.organization.competitors ?? []).join("\n"),
    seedKeywords: (bootstrap.organization.seedKeywords ?? []).join(", "),
    founderNames: (bootstrap.startupProfile.founderNames ?? []).join(", "),
    stage: bootstrap.startupProfile.stage ?? "",
    organizationKind: bootstrap.startupProfile.organizationKind ?? "",
  };
}

function companyContextFromSetup(values: StartupSetupValues) {
  return combineCompanyContext({
    shortDescription: values.shortDescription,
    problemSolved: values.problemSolved,
    targetAudience: values.targetAudience,
  });
}

function listFromUnknown(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  if (typeof value === "string") return listFromForm(value);
  return [];
}

function plainObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function objectArray(value: unknown): Record<string, unknown>[] | undefined {
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object" && !Array.isArray(item)))
    : undefined;
}

function competitorSuggestion(value: unknown): VibeMarketingAutofillCompetitor | null {
  if (!value || typeof value !== "object") {
    const text = String(value ?? "").trim();
    return text ? { name: text, domain: text } : null;
  }
  const payload = value as Record<string, unknown>;
  const name = String(payload.name ?? payload.company ?? payload.title ?? "").trim();
  const domain = String(payload.domain ?? "").trim();
  if (!name && !domain) return null;
  const rawScore = numericValue(payload.score);
  return {
    name: name || domain,
    domain,
    linkedinUrl: payload.linkedinUrl ? String(payload.linkedinUrl) : payload.linkedin_url ? String(payload.linkedin_url) : undefined,
    type: payload.type ? String(payload.type) : undefined,
    score: rawScore,
    reason: payload.reason ? String(payload.reason) : undefined,
    source: payload.source ? String(payload.source) : undefined,
    evidence: Array.isArray(payload.evidence) ? payload.evidence.map(String).filter(Boolean) : undefined,
    confidence: payload.confidence ? String(payload.confidence) : undefined,
  };
}

function competitorList(value: unknown): VibeMarketingAutofillCompetitor[] {
  if (!Array.isArray(value)) return [];
  return value.map(competitorSuggestion).filter((competitor): competitor is VibeMarketingAutofillCompetitor => Boolean(competitor));
}

function keywordGroups(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((group): group is Record<string, unknown> => Boolean(group && typeof group === "object"))
    .map((group) => ({
      group: group.group ? String(group.group) : group.name ? String(group.name) : undefined,
      intent: group.intent ? String(group.intent) : undefined,
      keywords: listFromUnknown(group.keywords),
    }))
    .filter((group) => group.keywords.length);
}

function researchDepth(value: unknown): Record<string, number> | undefined {
  if (!value || typeof value !== "object") return undefined;
  const result: Record<string, number> = {};
  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    const numberValue = numericValue(rawValue);
    if (numberValue !== null) result[key] = numberValue;
  }
  return Object.keys(result).length ? result : undefined;
}

function autofillSources(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((source): source is Record<string, unknown> => Boolean(source && typeof source === "object"))
    .map((source) => ({
      url: String(source.url ?? ""),
      title: source.title ? String(source.title) : undefined,
      type: source.type ? String(source.type) : undefined,
      query: source.query ? String(source.query) : undefined,
      description: source.description ? String(source.description) : undefined,
      source: source.source ? String(source.source) : undefined,
    }))
    .filter((source) => source.url);
}

function extractAutofill(run: VibeMarketingRunSummary | null | undefined): VibeMarketingAutofillResult | null {
  const raw = run?.result?.autofill;
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const groupsPayload = plainObject(payload.competitorGroups) ?? {};
  const directCompetitors = competitorList(payload.directCompetitors ?? payload.direct_competitors ?? groupsPayload.directCompetitors);
  const seoCompetitors = competitorList(payload.seoCompetitors ?? payload.seo_competitors ?? groupsPayload.seoCompetitors);
  const adjacentOrganizations = competitorList(
    payload.adjacentOrganizations ?? payload.adjacent_organizations ?? groupsPayload.adjacentOrganizations,
  );
  const competitorCandidates = Array.isArray(payload.competitors)
    ? payload.competitors
    : Array.isArray(payload.competitorCandidates)
      ? payload.competitorCandidates
      : [];
  const legacyDirectCompetitors = directCompetitors.length
    ? []
    : competitorCandidates
        .map((competitor) => competitorSuggestion(competitor))
        .filter(
          (competitor): competitor is VibeMarketingAutofillCompetitor =>
            competitor !== null && (!competitor.type || competitor.type === "direct"),
        );
  const competitorSuggestions = [
    ...directCompetitors,
    ...seoCompetitors,
    ...adjacentOrganizations,
    ...competitorCandidates.map(competitorSuggestion).filter((item): item is VibeMarketingAutofillCompetitor => Boolean(item)),
  ];
  const competitorStrings = [
    ...directCompetitors.map((competitor) => competitor.domain || competitor.name),
    ...legacyDirectCompetitors.map((competitor) => competitor.domain || competitor.name),
  ].filter(Boolean);
  const groups = keywordGroups(payload.keywordGroups ?? payload.keyword_groups);
  const explicitSeedKeywords = [
    ...listFromUnknown(payload.seedKeywords),
    ...listFromUnknown(payload.seed_keywords),
  ];
  const seedKeywords = explicitSeedKeywords;
  return {
    brandName: typeof payload.brandName === "string" ? payload.brandName : typeof payload.brand_name === "string" ? payload.brand_name : null,
    companyLinkedInUrl:
      typeof payload.companyLinkedInUrl === "string"
        ? payload.companyLinkedInUrl
        : typeof payload.company_linkedin_url === "string"
          ? payload.company_linkedin_url
          : null,
    companyContext:
      typeof payload.companyContext === "string"
        ? payload.companyContext
        : typeof payload.company_context === "string"
          ? payload.company_context
          : null,
    offeringProfile: plainObject(payload.offeringProfile ?? payload.offering_profile),
    competitors: Array.from(new Set(competitorStrings.map((competitor) => competitor.trim()).filter(Boolean))),
    competitorSuggestions,
    directCompetitors,
    seoCompetitors,
    adjacentOrganizations,
    competitorGroups: { directCompetitors, seoCompetitors, adjacentOrganizations },
    seedKeywords: Array.from(new Set(seedKeywords.map((keyword) => keyword.trim()).filter(Boolean))),
    keywordCandidates: objectArray(payload.keywordCandidates ?? payload.keyword_candidates),
    keywordGroups: groups,
    sources: autofillSources(payload.sources),
    linkedinProfile:
      payload.linkedinProfile && typeof payload.linkedinProfile === "object"
        ? {
            url: String((payload.linkedinProfile as Record<string, unknown>).url ?? ""),
            title: (payload.linkedinProfile as Record<string, unknown>).title
              ? String((payload.linkedinProfile as Record<string, unknown>).title)
              : undefined,
            description: (payload.linkedinProfile as Record<string, unknown>).description
              ? String((payload.linkedinProfile as Record<string, unknown>).description)
              : undefined,
            vanityName: (payload.linkedinProfile as Record<string, unknown>).vanityName
              ? String((payload.linkedinProfile as Record<string, unknown>).vanityName)
              : undefined,
            blocked: Boolean((payload.linkedinProfile as Record<string, unknown>).blocked),
          }
        : undefined,
    linkedinSimilarSignals: autofillSources(payload.linkedinSimilarSignals ?? payload.linkedin_similar_signals),
    sourceCount: numericValue(payload.sourceCount ?? payload.source_count) ?? undefined,
    competitorCount: numericValue(payload.competitorCount ?? payload.competitor_count) ?? undefined,
    seedKeywordCount: numericValue(payload.seedKeywordCount ?? payload.seed_keyword_count) ?? undefined,
    researchSummary:
      typeof payload.researchSummary === "string"
        ? payload.researchSummary
        : typeof payload.research_summary === "string"
          ? payload.research_summary
          : null,
    researchDepth: researchDepth(payload.researchDepth ?? payload.research_depth),
    researchQuality: plainObject(payload.researchQuality ?? payload.research_quality),
    modelTrace: objectArray(payload.modelTrace ?? payload.model_trace),
    queryLog: objectArray(payload.queryLog ?? payload.query_log),
    evidenceMap: plainObject(payload.evidenceMap ?? payload.evidence_map),
    stepDurations: researchDepth(payload.stepDurations ?? payload.step_durations),
    warnings: listFromUnknown(payload.warnings),
  };
}

function competitorStringsFromAutofill(autofill: VibeMarketingAutofillResult) {
  const directCandidates = (autofill.directCompetitors ?? []).map((competitor) => competitor.domain || competitor.name);
  const candidates = directCandidates.length ? directCandidates : (autofill.competitors ?? []);
  const seen = new Set<string>();
  return candidates
    .map((competitor) => String(competitor ?? "").trim())
    .filter((competitor) => {
      if (!competitor) return false;
      const key = competitor.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

const RESEARCH_RUNNING_STATUSES = new Set(["queued", "running"]);
const RESEARCH_FAILED_STATUSES = new Set(["failed", "blocked", "cancelled", "denied"]);
const RESEARCH_DONE_STATUSES = new Set(["completed", ...RESEARCH_FAILED_STATUSES]);

const PROFILE_RESEARCH_STEPS = [
  {
    id: "identity",
    label: "Resolving company identity",
    keys: ["queued", "resolve_company_identity", "profile_resolution"],
  },
  {
    id: "website",
    label: "Crawling owned website",
    keys: ["crawl_owned_web", "crawl_website", "scrape_website"],
  },
  {
    id: "public_web",
    label: "Researching public web",
    keys: ["research_public_web"],
  },
  {
    id: "linkedin",
    label: "Checking public LinkedIn signals",
    keys: ["research_linkedin_public"],
  },
  {
    id: "competitors",
    label: "Finding competitor candidates",
    keys: ["discover_competitor_candidates", "identify_competitors", "rank_competitors"],
  },
  {
    id: "keywords",
    label: "Generating keywords",
    keys: ["generate_keyword_landscape", "generate_seed_keywords"],
  },
  {
    id: "profile",
    label: "Writing company profile",
    keys: ["synthesize_company_profile", "synthesize_company_context"],
  },
  {
    id: "finalize",
    label: "Applying research results",
    keys: ["finalize"],
  },
] as const;

function normalizeResearchStepKey(step?: string | null) {
  return String(step ?? "").trim().toLowerCase();
}

function autofillStepLabel(step?: string | null) {
  const stepKey = normalizeResearchStepKey(step);
  const configuredStep = PROFILE_RESEARCH_STEPS.find((item) => item.keys.some((key) => key === stepKey));
  if (configuredStep) return configuredStep.label;
  return stepKey ? stepKey.replace(/_/g, " ") : "Researching company profile";
}

function researchStepIndex(step?: string | null) {
  const stepKey = normalizeResearchStepKey(step);
  return PROFILE_RESEARCH_STEPS.findIndex((item) => item.keys.some((key) => key === stepKey));
}

function isResearchFailedStatus(status?: string | null) {
  return RESEARCH_FAILED_STATUSES.has(normalizeResearchStepKey(status));
}

function isResearchTerminalStatus(status?: string | null) {
  return RESEARCH_DONE_STATUSES.has(normalizeResearchStepKey(status));
}

function isResearchRunningStatus(status?: string | null) {
  return RESEARCH_RUNNING_STATUSES.has(normalizeResearchStepKey(status));
}

function completedResearchStepCount(run?: VibeMarketingRunSummary | null, pending = false) {
  const totalSteps = PROFILE_RESEARCH_STEPS.length;
  if (pending || !run) return 0;
  if (run.status === "completed") return totalSteps;

  const stepStates = Array.isArray(run.steps) ? run.steps : [];
  if (stepStates.length) {
    return Math.min(
      totalSteps,
      stepStates.filter((step) => ["completed", "skipped"].includes(normalizeResearchStepKey(step.status))).length,
    );
  }

  const index = researchStepIndex(run.currentStep);
  if (index >= 0) return Math.min(index, totalSteps);
  return 0;
}

function researchProgressSignature(run?: VibeMarketingRunSummary | null) {
  if (!run) return "no-run";
  const steps = (run.steps ?? [])
    .map((step) => `${step.key}:${step.status}:${step.completedAt ?? ""}:${step.error ?? ""}`)
    .join("|");
  return [run.status, run.currentStep ?? "", run.updatedAt ?? "", run.errors?.join("|") ?? "", steps].join("::");
}

function ProfileResearchSegments({
  completedSteps,
  totalSteps,
  failed,
}: {
  completedSteps: number;
  totalSteps: number;
  failed: boolean;
}) {
  const segmentCount = Math.max(totalSteps, 1);
  const safeCompleted = Math.min(Math.max(completedSteps, 0), segmentCount);

  return (
    <div className="grid grid-cols-8 gap-2">
      {Array.from({ length: segmentCount }).map((_, index) => {
        const isComplete = index < safeCompleted;
        const isActive = !failed && index === safeCompleted && safeCompleted < segmentCount;
        return (
          <div
            key={index}
            className={clsx(
              "h-2 rounded-full transition-all",
              failed && "bg-rose-200",
              !failed && isComplete && "bg-purple-500",
              !failed && isActive && "animate-pulse bg-purple-300",
              !failed && !isComplete && !isActive && "bg-white/75",
            )}
          />
        );
      })}
    </div>
  );
}

function ProfileResearchProgressCard({
  run,
  runId,
  pending,
  startStatus,
  startError,
  stalled,
  unavailable,
  onRetry,
  retryDisabled,
}: {
  run?: VibeMarketingRunSummary | null;
  runId?: string | null;
  pending: boolean;
  startStatus?: string | null;
  startError?: string | null;
  stalled: boolean;
  unavailable: boolean;
  onRetry: () => void;
  retryDisabled: boolean;
}) {
  if (!runId && !pending) return null;
  const autofill = extractAutofill(run);
  const effectiveStatus = run?.status ?? startStatus ?? (pending ? "queued" : null);
  const active = pending || (!isResearchTerminalStatus(effectiveStatus) && (!run || isResearchRunningStatus(run.status)));
  const failed = isResearchFailedStatus(effectiveStatus) || unavailable;
  const completedSteps = completedResearchStepCount(run, pending);
  const totalSteps = PROFILE_RESEARCH_STEPS.length;
  const progressLabel = `${Math.min(completedSteps, totalSteps)} of ${totalSteps} research steps complete`;
  const label = pending
    ? "Starting AI fill"
    : run?.status === "completed"
      ? "AI suggestions added"
      : failed
        ? "AI fill needs attention"
        : autofillStepLabel(run?.currentStep);
  const sourceCount = autofill?.sourceCount ?? autofill?.sources?.length ?? 0;
  const competitorCount = autofill?.competitorCount ?? autofill?.competitorSuggestions?.length ?? autofill?.competitors?.length ?? 0;
  const seedKeywordCount = autofill?.seedKeywordCount ?? autofill?.seedKeywords?.length ?? 0;
  const errorMessage =
    startError ||
    run?.errors?.[0] ||
    (failed ? "AI fill is unavailable. Check the Content Factory backend and try again." : null);
  const notice = unavailable
    ? "We have not received a fresh status update for more than 2 minutes. You can retry now, or keep this page open while polling continues."
    : stalled
      ? "This is taking longer than expected. We will keep checking for progress in the background."
      : null;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border p-5 text-sm shadow-sm",
        failed ? "border-rose-200 bg-rose-50 text-rose-900" : "border-purple-100 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 text-violet-950",
      )}
    >
      <div
        className={clsx(
          "absolute right-0 top-0 -mr-10 -mt-10 h-36 w-36 rounded-full blur-3xl",
          failed ? "bg-rose-200/30" : "bg-purple-200/30",
        )}
      />
      <div className="relative z-10 flex gap-4">
        <div className={clsx("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", failed ? "bg-rose-100" : "bg-purple-100")}>
          {failed ? (
            <AlertTriangle className="h-6 w-6 text-rose-600" />
          ) : run?.status === "completed" ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          ) : (
            <Sparkles className="h-6 w-6 text-purple-600" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-base font-black text-slate-950">{label}</p>
            <span
              className={clsx(
                "rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide",
                failed ? "bg-white/80 text-rose-700" : "bg-white/80 text-purple-700",
              )}
            >
              {failed ? "Retry available" : progressLabel}
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-700">
            {pending ? "Contacting the AI fill service" : run?.status === "completed" ? "AI suggestions have been applied to the form." : autofillStepLabel(run?.currentStep)}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {active
              ? "Usually takes 1-3 minutes. Refreshing the page is safe."
              : failed
                ? "The form is unlocked so you can retry or fill the fields manually."
                : "Review the populated fields before continuing."}
          </p>

          {!failed ? (
            <div className="mt-4 space-y-2">
              <ProfileResearchSegments completedSteps={completedSteps} totalSteps={totalSteps} failed={false} />
              <p className="text-xs font-semibold text-slate-500">
                We&apos;ll keep checking until the fields below are ready to review.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <ProfileResearchSegments completedSteps={completedSteps} totalSteps={totalSteps} failed />
              <p className="rounded-xl border border-rose-200 bg-white/80 px-4 py-3 text-sm font-semibold text-rose-700">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={onRetry}
                disabled={retryDisabled}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-black text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                Retry research
              </button>
            </div>
          )}

          {notice && !failed ? (
            <p className="mt-3 rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-700">
              {notice}
            </p>
          ) : null}

          {autofill ? (
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-violet-800">
              <span>{sourceCount} sources reviewed</span>
              <span>{competitorCount} competitors found</span>
              <span>{seedKeywordCount} high-fit keywords selected</span>
            </div>
          ) : null}
          {autofill?.sources?.length ? (
            <p className="mt-2 truncate text-xs font-semibold text-violet-700">
              Sources: {autofill.sources.slice(0, 3).map((source) => source.title || source.url).join(", ")}
            </p>
          ) : null}
          {autofill?.warnings?.length ? <p className="mt-2 text-xs font-semibold text-amber-700">{autofill.warnings[0]}</p> : null}
        </div>
      </div>
    </div>
  );
}

function baselineFromRun(run: VibeMarketingRunSummary | null | undefined): VibeMarketingWebsiteBaseline | null {
  const raw = run?.result?.baseline;
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  return {
    runId: run?.runId,
    domain: typeof payload.domain === "string" ? payload.domain : run?.domain,
    status: typeof payload.status === "string" ? payload.status : run?.status,
    passed: run?.status === "completed",
    collectedAt:
      typeof payload.collectedAt === "string"
        ? payload.collectedAt
        : typeof payload.collected_at === "string"
          ? payload.collected_at
          : run?.updatedAt,
    overallScore:
      typeof payload.overallScore === "number"
        ? payload.overallScore
        : typeof payload.overall_score === "number"
          ? payload.overall_score
          : null,
    summary:
      typeof payload.summary === "string" || (payload.summary && typeof payload.summary === "object")
        ? (payload.summary as VibeMarketingWebsiteBaseline["summary"])
        : null,
    metrics: payload.metrics && typeof payload.metrics === "object" ? (payload.metrics as VibeMarketingWebsiteBaseline["metrics"]) : {},
    sourceStatus: payload.sourceStatus && typeof payload.sourceStatus === "object" ? (payload.sourceStatus as Record<string, string>) : {},
    recommendations: Array.isArray(payload.recommendations) ? (payload.recommendations as Array<Record<string, unknown>>) : [],
  };
}

function baselineSummaryText(summary: VibeMarketingWebsiteBaseline["summary"]) {
  if (typeof summary === "string") return summary;
  if (summary && typeof summary === "object" && typeof summary.text === "string") return summary.text;
  return "Run a baseline to capture website health, search visibility, authority, AI visibility, and traffic before article generation starts.";
}

function metricStatus(label: string, metric?: VibeMarketingWebsiteBaselineMetric) {
  const message = typeof metric?.message === "string" ? metric.message : "";
  if (label === "Lighthouse" && /429|too many requests|googleapis|pagespeedonline|runpagespeed/i.test(message)) {
    return "unavailable";
  }
  return metric?.status;
}

function metricScore(metric: VibeMarketingWebsiteBaselineMetric | undefined, status?: string | null) {
  return status === "measured" && typeof metric?.score === "number" ? Math.round(metric.score) : null;
}

function metricMessage(label: string, metric?: VibeMarketingWebsiteBaselineMetric) {
  const message = typeof metric?.message === "string" ? metric.message : null;
  if (label === "Lighthouse" && message && /429|too many requests|googleapis|pagespeedonline|runpagespeed/i.test(message)) {
    return "PageSpeed Insights is temporarily rate limited. Try again later.";
  }
  return message;
}

function sourceStatusLabel(status?: string | null) {
  if (status === "measured") return "Verified";
  if (status === "needs_connection") return "Needs connection";
  if (status === "error") return "Error";
  return "Unavailable";
}

function SourceStatusBadge({ status }: { status?: string | null }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-black",
        status === "measured" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
        status === "needs_connection" && "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
        status === "error" && "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
        !["measured", "needs_connection", "error"].includes(String(status)) && "bg-slate-50 text-slate-600 ring-1 ring-slate-100",
      )}
    >
      {sourceStatusLabel(status)}
    </span>
  );
}

function BaselineMetricCard({
  label,
  metric,
}: {
  label: string;
  metric?: VibeMarketingWebsiteBaselineMetric;
}) {
  const status = metricStatus(label, metric);
  const score = metricScore(metric, status);
  const message = metricMessage(label, metric);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-black text-slate-950">{label}</p>
        <SourceStatusBadge status={status} />
      </div>
      <p className="mt-3 text-2xl font-black text-slate-950">{score === null ? "—" : score}</p>
      {message ? <p className="mt-2 line-clamp-4 break-words text-xs font-semibold text-slate-500">{message}</p> : null}
    </div>
  );
}

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FirstArticleSetupPage({
  bootstrap,
  error,
}: {
  bootstrap: VibeMarketingBootstrap;
  error: string | null;
}) {
  const navigation = useNavigation();
  const autofillStartFetcher = useFetcher<{
    intent?: string;
    autofillRunId?: string | null;
    status?: string;
    error?: string;
    errors?: string[];
  }>();
  const autofillRunFetcher = useFetcher<VibeMarketingRunSummary>();
  const baselineStartFetcher = useFetcher<{ intent?: string; baselineRunId?: string | null; status?: string; error?: string }>();
  const baselineRunFetcher = useFetcher<VibeMarketingRunSummary>();
  const googleBaselineFetcher = useFetcher<{ intent?: string; websiteBaseline?: VibeMarketingWebsiteBaseline; error?: string }>();
  const skipBaselineFetcher = useFetcher<{ intent?: string; error?: string }>();
  const startupDefaults = useMemo(() => startupSetupDefaultsFromBootstrap(bootstrap), [bootstrap]);
  const startupDefaultsSignature = useMemo(() => JSON.stringify(startupDefaults), [startupDefaults]);
  const activeCompanyKey = String(
    bootstrap.company.id ||
      bootstrap.company.organizationId ||
      bootstrap.organization.id ||
      bootstrap.organization.domain ||
      bootstrap.company.domain ||
      "no-company",
  );
  const activeCompanyKeyRef = useRef(activeCompanyKey);
  const autofillPollStateRef = useRef(autofillRunFetcher.state);
  const baselinePollStateRef = useRef(baselineRunFetcher.state);
  const [startupValues, setStartupValues] = useState<StartupSetupValues>(startupDefaults);
  const [autofillRunId, setAutofillRunId] = useState<string | null>(null);
  const [appliedAutofillRunId, setAppliedAutofillRunId] = useState<string | null>(null);
  const [baselineRunId, setBaselineRunId] = useState<string | null>(null);
  const [googleBaseline, setGoogleBaseline] = useState<VibeMarketingWebsiteBaseline | null>(null);
  const [autofillStartedAt, setAutofillStartedAt] = useState<number | null>(null);
  const [autofillLastProgressAt, setAutofillLastProgressAt] = useState<number | null>(null);
  const [autofillLastPollAt, setAutofillLastPollAt] = useState<number | null>(null);
  const [autofillProgressSignature, setAutofillProgressSignature] = useState("");
  const [autofillClock, setAutofillClock] = useState(() => Date.now());

  const autofillStartData = autofillStartFetcher.data;
  const autofillRun = autofillRunFetcher.data as VibeMarketingRunSummary | undefined;
  const autofillStartStatus =
    autofillStartData?.autofillRunId && autofillStartData.autofillRunId === autofillRunId
      ? autofillStartData.status
      : null;
  const autofillStartError =
    autofillStartData?.autofillRunId && autofillStartData.autofillRunId === autofillRunId
      ? autofillStartData.error ?? autofillStartData.errors?.[0] ?? null
      : null;
  const baselineStartData = baselineStartFetcher.data;
  const baselineRun = baselineRunFetcher.data as VibeMarketingRunSummary | undefined;
  const latestBaselineRun = bootstrap.latestRuns.find((run) => run.workflow === "website_baseline");
  const effectiveBaseline = googleBaseline ?? baselineFromRun(baselineRun) ?? baselineFromRun(latestBaselineRun) ?? bootstrap.websiteBaseline;
  const baselineMetrics = effectiveBaseline.metrics ?? {};
  const trafficMetric = baselineMetrics.traffic;
  const trafficStatus = metricStatus("Traffic/users", trafficMetric);
  const hasGoogleBaselineScopes = Boolean(bootstrap.googleBaselineConnection?.hasBaselineScopes);
  const isSubmitting = navigation.state === "submitting";
  const autofillPending = autofillStartFetcher.state !== "idle";
  const baselinePending = baselineStartFetcher.state !== "idle";
  const googleBaselinePending = googleBaselineFetcher.state !== "idle";
  const skipBaselinePending = skipBaselineFetcher.state !== "idle";
  const autofillPolling = Boolean(
    autofillRunId &&
      !isResearchTerminalStatus(autofillStartStatus) &&
      (!autofillRun || isResearchRunningStatus(autofillRun.status)),
  );
  const baselinePolling = Boolean(baselineRunId && (!baselineRun || ["queued", "running"].includes(baselineRun.status)));
  const autofillStatusAgeMs = autofillStartedAt ? autofillClock - (autofillLastPollAt ?? autofillStartedAt) : 0;
  const autofillProgressAgeMs = autofillStartedAt ? autofillClock - (autofillLastProgressAt ?? autofillStartedAt) : 0;
  const autofillStalled = Boolean(autofillPolling && autofillProgressAgeMs > 60_000);
  const autofillUnavailable = Boolean(autofillPolling && (autofillStatusAgeMs > 120_000 || autofillProgressAgeMs > 120_000));
  const researchLocked = autofillPending || (autofillPolling && !autofillUnavailable);
  const canStartAutofill =
    Boolean(startupValues.companyName.trim() && startupValues.domain.trim()) &&
    !autofillPending &&
    (!autofillPolling || autofillUnavailable);
  const canRetryAutofill = Boolean(startupValues.companyName.trim() && startupValues.domain.trim()) && !autofillPending;
  const canStartBaseline = Boolean((bootstrap.organization.domain || bootstrap.company.domain || startupValues.domain).trim()) && !baselinePending && !baselinePolling;
  const canRefreshGoogleBaseline = hasGoogleBaselineScopes && effectiveBaseline.status !== "missing" && !googleBaselinePending;
  const companyContext = companyContextFromSetup(startupValues);
  const searchConsole = plainObject(trafficMetric?.googleSearchConsole);
  const searchConsoleSummary = plainObject(searchConsole?.last28Days);

  const updateValue = (field: StartupSetupField, value: string) => {
    setStartupValues((current) => ({ ...current, [field]: value }));
  };

  const startAutofill = () => {
    const snapshot = { ...startupValues };
    const now = Date.now();
    setAutofillRunId(null);
    setAppliedAutofillRunId(null);
    setAutofillStartedAt(now);
    setAutofillLastProgressAt(now);
    setAutofillLastPollAt(null);
    setAutofillProgressSignature("");
    setAutofillClock(now);
    const formData = new FormData();
    formData.set("intent", "start-autofill");
    formData.set("companyContext", companyContextFromSetup(snapshot));
    for (const [field, value] of Object.entries(snapshot)) {
      formData.set(field, value);
    }
    autofillStartFetcher.submit(formData, { method: "POST" });
  };

  const startBaseline = () => {
    setGoogleBaseline(null);
    const formData = new FormData();
    formData.set("intent", "start-baseline");
    baselineStartFetcher.submit(formData, { method: "POST" });
  };

  const refreshGoogleBaseline = () => {
    const formData = new FormData();
    formData.set("intent", "refresh-baseline-google");
    googleBaselineFetcher.submit(formData, { method: "POST" });
  };

  const skipBaseline = () => {
    const formData = new FormData();
    formData.set("intent", "skip-baseline");
    formData.set("reason", "Skipped during marketing setup");
    skipBaselineFetcher.submit(formData, { method: "POST" });
  };

  useEffect(() => {
    autofillPollStateRef.current = autofillRunFetcher.state;
  }, [autofillRunFetcher.state]);

  useEffect(() => {
    baselinePollStateRef.current = baselineRunFetcher.state;
  }, [baselineRunFetcher.state]);

  useEffect(() => {
    if (activeCompanyKeyRef.current === activeCompanyKey) return;
    activeCompanyKeyRef.current = activeCompanyKey;
    setStartupValues(startupDefaults);
    setAutofillRunId(null);
    setBaselineRunId(null);
    setGoogleBaseline(null);
    setAppliedAutofillRunId(null);
    setAutofillStartedAt(null);
    setAutofillLastProgressAt(null);
    setAutofillLastPollAt(null);
    setAutofillProgressSignature("");
  }, [activeCompanyKey, startupDefaults, startupDefaultsSignature]);

  useEffect(() => {
    if (autofillStartData?.autofillRunId) {
      const now = Date.now();
      setAutofillRunId(autofillStartData.autofillRunId);
      setAppliedAutofillRunId(null);
      setAutofillStartedAt((current) => current ?? now);
      setAutofillLastProgressAt((current) => current ?? now);
      setAutofillClock(now);
    }
  }, [autofillStartData?.autofillRunId]);

  useEffect(() => {
    if (baselineStartData?.baselineRunId) {
      setBaselineRunId(baselineStartData.baselineRunId);
      setGoogleBaseline(null);
    }
  }, [baselineStartData?.baselineRunId]);

  useEffect(() => {
    if (googleBaselineFetcher.data?.websiteBaseline) {
      setGoogleBaseline(googleBaselineFetcher.data.websiteBaseline);
    }
  }, [googleBaselineFetcher.data?.websiteBaseline]);

  useEffect(() => {
    if (!autofillPending && !autofillPolling) return;
    setAutofillClock(Date.now());
    const timer = window.setInterval(() => {
      setAutofillClock(Date.now());
    }, 5000);
    return () => window.clearInterval(timer);
  }, [autofillPending, autofillPolling]);

  useEffect(() => {
    if (!autofillRunId || !autofillRun) return;
    const now = Date.now();
    const signature = researchProgressSignature(autofillRun);
    setAutofillLastPollAt(now);
    if (signature !== autofillProgressSignature) {
      setAutofillProgressSignature(signature);
      setAutofillLastProgressAt(now);
    }
  }, [autofillProgressSignature, autofillRun, autofillRunId]);

  useEffect(() => {
    if (!autofillRunId) return;
    if (autofillRun && !isResearchRunningStatus(autofillRun.status)) return;
    if (isResearchTerminalStatus(autofillStartStatus)) return;
    const href = `/founder-tools/marketing/autofill-runs/${encodeURIComponent(autofillRunId)}`;
    const loadIfIdle = () => {
      if (autofillPollStateRef.current !== "idle") return;
      autofillPollStateRef.current = "loading";
      autofillRunFetcher.load(href);
    };
    loadIfIdle();
    const timer = window.setInterval(() => {
      loadIfIdle();
    }, 2500);
    return () => window.clearInterval(timer);
  }, [autofillRunId, autofillRun?.status, autofillStartStatus]);

  useEffect(() => {
    if (!baselineRunId) return;
    if (baselineRun && !["queued", "running"].includes(baselineRun.status)) return;
    const href = `/founder-tools/marketing/autofill-runs/${encodeURIComponent(baselineRunId)}`;
    const loadIfIdle = () => {
      if (baselinePollStateRef.current !== "idle") return;
      baselinePollStateRef.current = "loading";
      baselineRunFetcher.load(href);
    };
    loadIfIdle();
    const timer = window.setInterval(() => {
      loadIfIdle();
    }, 2500);
    return () => window.clearInterval(timer);
  }, [baselineRunId, baselineRun?.status]);

  useEffect(() => {
    if (!autofillRunId || appliedAutofillRunId === autofillRunId || autofillRun?.status !== "completed") return;
    const autofill = extractAutofill(autofillRun);
    if (!autofill) return;
    const splitContext = splitCompanyContext(autofill.companyContext, startupValues.targetAudience);
    const competitors = competitorStringsFromAutofill(autofill);

    setStartupValues((current) => {
      const updates: Partial<StartupSetupValues> = {
        companyLinkedInUrl: autofill.companyLinkedInUrl || current.companyLinkedInUrl,
        shortDescription: splitContext.shortDescription || current.shortDescription,
        problemSolved: splitContext.problemSolved || current.problemSolved,
        targetAudience: splitContext.targetAudience || current.targetAudience,
        competitors: competitors.length ? competitors.join("\n") : current.competitors,
        seedKeywords: autofill.seedKeywords?.length ? autofill.seedKeywords.join(", ") : current.seedKeywords,
      };
      return Object.keys(updates).length ? { ...current, ...updates } : current;
    });
    setAppliedAutofillRunId(autofillRunId);
  }, [appliedAutofillRunId, autofillRun, autofillRunId, startupValues.targetAudience]);

  const inputClass =
    "h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";
  const textareaClass =
    "w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

  return (
    <div className="mx-auto max-w-[1580px] px-4 py-8 sm:px-6 lg:px-10">
      <Link to="/founder-tools/updates" className="inline-flex items-center gap-2 text-xs font-bold text-violet-300">
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        Back to home
      </Link>

      <div className="mt-8 grid gap-8 2xl:grid-cols-[minmax(0,0.85fr)_minmax(520px,1.15fr)] 2xl:items-start">
        <div>
          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">
            Let&apos;s create your{" "}
            <span className="bg-gradient-to-r from-violet-700 to-blue-500 bg-clip-text text-transparent">
              first SEO article
            </span>{" "}
            <Rocket className="inline h-9 w-9 translate-y-1 text-orange-500" />
          </h1>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-slate-600">
            We just need a bit of info about your startup and website to get started.
          </p>
        </div>

        <FirstArticleProgressPanel />
      </div>

      <Form method="POST" className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <input type="hidden" name="intent" value="save-startup-details" />
        <input type="hidden" name="companyContext" value={companyContext} />
        {error ? (
          <div className="border-b border-rose-100 bg-rose-50 px-6 py-4 text-sm font-bold text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:p-8 xl:gap-12">
          <div>
            <p className="text-sm font-black text-violet-700">Step 1 of 5</p>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">Tell us about your startup</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              This helps us understand your business, audience, and what makes you unique.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <FormField label="Startup or Company Name" help="This will be used as the author for your articles.">
                <input
                  name="companyName"
                  value={startupValues.companyName}
                  onChange={(event) => updateValue("companyName", event.target.value)}
                  disabled={researchLocked}
                  placeholder="e.g. Your Startup Inc."
                  className={inputClass}
                />
              </FormField>

              <FormField label="Website domain" help="Connect this company to its website and articles setup.">
                <input
                  name="domain"
                  value={startupValues.domain}
                  onChange={(event) => updateValue("domain", event.target.value)}
                  disabled={researchLocked}
                  placeholder="e.g. yourstartup.com"
                  className={inputClass}
                />
              </FormField>
            </div>

            <div className="mt-8 space-y-3 rounded-xl border border-violet-200 bg-violet-50/70 p-4 shadow-sm shadow-violet-100/70">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-slate-950">Use AI to fill the details</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                    Use the website and public company info to fill the fields below. You can edit everything before continuing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startAutofill}
                  disabled={!canStartAutofill}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {autofillPending || autofillPolling ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {autofillPending || autofillPolling ? "Generating..." : "Generate with AI"}
                </button>
              </div>
              {!canStartAutofill && !autofillPending && !autofillPolling ? (
                <p className="text-xs font-bold text-slate-500">Add a company name and website domain before generating with AI.</p>
              ) : null}
              {autofillStartData?.error && !autofillStartData?.autofillRunId ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {autofillStartData.error}
                </div>
              ) : null}
              <ProfileResearchProgressCard
                run={autofillRun}
                runId={autofillRunId}
                pending={autofillPending}
                startStatus={autofillStartStatus}
                startError={autofillStartError}
                stalled={autofillStalled}
                unavailable={autofillUnavailable}
                onRetry={startAutofill}
                retryDisabled={!canRetryAutofill}
              />
            </div>

            <div
              className={clsx(
                "mt-8 rounded-xl border border-slate-200 bg-white p-4",
                researchLocked && "bg-slate-50/80",
              )}
            >
                  <div className="grid gap-7 lg:grid-cols-2">
                    <FormField label="Short description" help="In 1-2 sentences, what does your startup do?">
                      <textarea
                        name="shortDescription"
                        value={startupValues.shortDescription}
                        onChange={(event) => updateValue("shortDescription", event.target.value)}
                        disabled={researchLocked}
                        placeholder="e.g. We help SaaS companies automate customer onboarding..."
                        rows={5}
                        maxLength={600}
                        className={textareaClass}
                      />
                    </FormField>

                    <FormField label="What problem do you solve?" help="What's the main problem you help your customers solve?">
                      <textarea
                        name="problemSolved"
                        value={startupValues.problemSolved}
                        onChange={(event) => updateValue("problemSolved", event.target.value)}
                        disabled={researchLocked}
                        placeholder="e.g. SaaS teams waste time on manual processes..."
                        rows={5}
                        maxLength={400}
                        className={textareaClass}
                      />
                    </FormField>

                    <FormField label="Who is your target audience?" help="Who do you serve?">
                      <input
                        name="targetAudience"
                        value={startupValues.targetAudience}
                        onChange={(event) => updateValue("targetAudience", event.target.value)}
                        disabled={researchLocked}
                        placeholder="e.g. SaaS founders, marketing teams, eCommerce brands"
                        className={inputClass}
                      />
                    </FormField>

                  </div>
            </div>

            <details className="mt-8 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <summary className="cursor-pointer text-sm font-black text-slate-950">Advanced startup details</summary>
                  <div className="mt-5 grid gap-6 lg:grid-cols-2">
                    <FormField label="Company LinkedIn URL">
                      <input
                        name="companyLinkedInUrl"
                        value={startupValues.companyLinkedInUrl}
                        onChange={(event) => updateValue("companyLinkedInUrl", event.target.value)}
                        disabled={researchLocked}
                        placeholder="https://www.linkedin.com/company/yourstartup"
                        className={inputClass}
                      />
                    </FormField>
                    <FormField label="Location">
                      <input
                        name="location"
                        value={startupValues.location}
                        onChange={(event) => updateValue("location", event.target.value)}
                        disabled={researchLocked}
                        placeholder="Melbourne, Australia"
                        className={inputClass}
                      />
                    </FormField>
                    <FormField label="ABN">
                      <input
                        name="abn"
                        value={startupValues.abn}
                        onChange={(event) => updateValue("abn", event.target.value)}
                        disabled={researchLocked}
                        placeholder="Search ABN or business name"
                        className={inputClass}
                      />
                    </FormField>
                    <FormField label="Founder names">
                      <input
                        name="founderNames"
                        value={startupValues.founderNames}
                        onChange={(event) => updateValue("founderNames", event.target.value)}
                        disabled={researchLocked}
                        placeholder="Sam Donegan, Alex Founder"
                        className={inputClass}
                      />
                    </FormField>
                    <FormField label="Stage">
                      <select
                        name="stage"
                        value={startupValues.stage}
                        onChange={(event) => updateValue("stage", event.target.value)}
                        disabled={researchLocked}
                        className={inputClass}
                      >
                        {STARTUP_STAGE_OPTIONS.map((option) => (
                          <option key={option || "blank"} value={option}>
                            {option || "Select stage"}
                          </option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Organization type">
                      <select
                        name="organizationKind"
                        value={startupValues.organizationKind}
                        onChange={(event) => updateValue("organizationKind", event.target.value)}
                        disabled={researchLocked}
                        className={inputClass}
                      >
                        {ORGANIZATION_KIND_OPTIONS.map((option) => (
                          <option key={option || "blank"} value={option}>
                            {option || "Select type"}
                          </option>
                        ))}
                      </select>
                    </FormField>
                  </div>
            </details>
          </div>

          <aside className="self-start rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-sm font-black text-slate-950">
              Why we ask this <CheckCircle2 className="h-4 w-4 text-slate-400" />
            </h3>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
              The more details you provide, the better we can research and write high-performing articles that rank and convert.
            </p>
            <p className="mt-7 text-sm font-black text-slate-950">Tips</p>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-slate-600">
              {["Be specific about what you do", "Focus on the value you deliver", "Think about your ideal customer", "You can always update this later"].map((tip) => (
                <li key={tip} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 space-y-6 border-t border-slate-100 pt-6">
              <FormField label="Seed keywords" help="Optional starting keywords, separated by commas.">
                <input
                  name="seedKeywords"
                  value={startupValues.seedKeywords}
                  onChange={(event) => updateValue("seedKeywords", event.target.value)}
                  disabled={researchLocked}
                  placeholder="e.g. onboarding automation, product analytics"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Competitors" help="One competitor domain or company per line.">
                <textarea
                  name="competitors"
                  value={startupValues.competitors}
                  onChange={(event) => updateValue("competitors", event.target.value)}
                  disabled={researchLocked}
                  rows={5}
                  placeholder="competitor.com&#10;another competitor"
                  className={textareaClass}
                />
              </FormField>
            </div>
          </aside>
        </div>

        <section className="border-t border-slate-100 bg-white px-6 py-8 lg:px-8">
          <div>
            <p className="text-sm font-black text-violet-700">Optional baseline</p>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">Measure where the website starts</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
              Connect Google Search Console first if you want search traffic included. Then generate a baseline snapshot for technical health, SEO,
              authority, AI visibility, and traffic before the first article goes live.
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-violet-700 shadow-sm ring-1 ring-violet-100">
                  1
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-950">Connect Google Search Console</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                    Optional. Connect it to include clicks, impressions, and search query data in the baseline.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {hasGoogleBaselineScopes ? (
                  <>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Search Console connected
                    </span>
                    <button
                      type="button"
                      onClick={refreshGoogleBaseline}
                      disabled={!canRefreshGoogleBaseline}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {googleBaselinePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
                      {trafficStatus === "measured" ? "Refresh Search Console" : "Load Search Console"}
                    </button>
                  </>
                ) : bootstrap.googleBaselineConnection?.connectUrl ? (
                  <a
                    href={bootstrap.googleBaselineConnection.connectUrl}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-50"
                  >
                    <GoogleIcon />
                    Connect Google Search Console
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                    Search Console can be skipped
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-violet-700 shadow-sm ring-1 ring-violet-100">
                  2
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-950">Generate baseline snapshot</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                    This can run without Search Console. Use it to compare future article growth against today&apos;s website state.
                  </p>
                  <p className="mt-3 text-sm font-black text-slate-950">{effectiveBaseline.domain || startupValues.domain || "No domain saved yet"}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{baselineSummaryText(effectiveBaseline.summary)}</p>
                  {effectiveBaseline.collectedAt ? (
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Collected {formatStableDate(effectiveBaseline.collectedAt, "recently")}
                      {effectiveBaseline.stale ? " · stale" : ""}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={startBaseline}
                  disabled={!canStartBaseline}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {baselinePending || baselinePolling ? <Loader2 className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
                  {effectiveBaseline.overallScore === null || effectiveBaseline.status === "missing" ? "Generate baseline" : "Rerun baseline"}
                </button>
                <button
                  type="button"
                  onClick={skipBaseline}
                  disabled={skipBaselinePending}
                  className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-white disabled:opacity-50"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>

          {(baselineStartData?.error || googleBaselineFetcher.data?.error || skipBaselineFetcher.data?.error) ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {baselineStartData?.error ?? googleBaselineFetcher.data?.error ?? skipBaselineFetcher.data?.error}
            </div>
          ) : null}

          {baselineRunId ? (
            <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-900">
              <div className="flex items-center gap-2 font-black">
                {baselinePending || baselinePolling ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                <span>
                  {baselineRun?.status === "completed"
                    ? "Baseline ready"
                    : baselineRun?.status === "failed" || baselineRun?.status === "blocked"
                      ? "Baseline needs attention"
                      : "Collecting baseline"}
                </span>
              </div>
              {baselineRun?.errors?.length ? <p className="mt-2 font-semibold text-rose-700">{baselineRun.errors[0]}</p> : null}
            </div>
          ) : null}

          <div className="mt-5 grid gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-black text-slate-950">Overall</p>
                <SourceStatusBadge status={effectiveBaseline.status === "completed" ? "measured" : effectiveBaseline.status} />
              </div>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {typeof effectiveBaseline.overallScore === "number" ? effectiveBaseline.overallScore : "—"}
              </p>
            </div>
            <BaselineMetricCard label="Technical health" metric={baselineMetrics.technicalHealth} />
            <BaselineMetricCard label="Lighthouse" metric={baselineMetrics.lighthouse} />
            <BaselineMetricCard label="Organic search" metric={baselineMetrics.organicSearch} />
            <BaselineMetricCard label="AI visibility" metric={baselineMetrics.aiVisibility} />
            <BaselineMetricCard label="Authority" metric={baselineMetrics.authority} />
            <BaselineMetricCard label="Traffic/users" metric={trafficMetric} />
            {searchConsole?.status === "measured" && searchConsoleSummary ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-black text-slate-950">Search Console</p>
                  <GoogleIcon />
                </div>
                <p className="mt-3 text-2xl font-black text-slate-950">
                  {new Intl.NumberFormat("en-AU").format(Math.round(numericValue(searchConsoleSummary.clicks) ?? 0))}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  clicks from {new Intl.NumberFormat("en-AU").format(Math.round(numericValue(searchConsoleSummary.impressions) ?? 0))} impressions
                </p>
              </div>
            ) : null}
          </div>

          {effectiveBaseline.recommendations?.length ? (
            <div className="mt-5 rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-sm font-black text-slate-950">Recommended fixes</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {effectiveBaseline.recommendations.slice(0, 4).map((recommendation, index) => (
                  <div key={`${recommendation.title ?? recommendation.source ?? index}`} className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-sm font-black text-slate-950">{String(recommendation.title ?? "Review baseline recommendation")}</p>
                    {recommendation.detail ? <p className="mt-1 text-xs font-semibold text-slate-600">{String(recommendation.detail)}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="flex items-center gap-3 text-sm font-bold text-slate-500">
            <ShieldCheck className="h-5 w-5 text-slate-400" />
            Your data is secure and never shared.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              name="nextAction"
              value="save-exit"
              disabled={isSubmitting || researchLocked}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save and exit
            </button>
            <button
              type="submit"
              name="nextAction"
              value="continue"
              disabled={isSubmitting || researchLocked}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Continue to website
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

type TopicIslandVisual = {
  iconKey: string | null | undefined;
  colorKey: string | null | undefined;
  name?: string | null;
};

function TopicRow({
  topic,
  selected,
  submitting,
  islandVisual,
  onSelect,
  onContinue,
  onDecline,
}: {
  topic: VibeMarketingTopicCandidate;
  selected: boolean;
  submitting?: boolean;
  islandVisual?: TopicIslandVisual | null;
  onSelect: () => void;
  onContinue: () => void;
  onDecline: () => void;
}) {
  const score = opportunityLabel(topic.opportunityScore);
  const title = topic.title || topic.keyword;
  const islandTheme = islandVisual ? pillarTheme(islandVisual.colorKey) : null;
  const rowTheme = islandTheme?.row;
  const selectOrContinue = () => {
    if (selected) {
      onContinue();
      return;
    }
    onSelect();
  };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOrContinue();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={selectOrContinue}
      onKeyDown={handleKeyDown}
      className={clsx(
        "grid w-full cursor-pointer grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border px-4 py-3 text-left transition focus:outline-none focus:ring-4",
        rowTheme?.focus ?? "focus:ring-violet-100",
        selected
          ? rowTheme?.selected ?? "border-violet-300 bg-violet-50/60"
          : rowTheme?.idle ?? "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/30",
      )}
      aria-label={selected ? `Continue with topic: ${title}` : `Select topic: ${title}`}
      aria-pressed={selected}
    >
      {islandTheme ? (
        <span
          className={clsx("inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm", islandTheme.iconWrap)}
          title={islandVisual?.name ?? undefined}
        >
          <PillarIcon iconKey={islandVisual?.iconKey} className="h-4 w-4" />
        </span>
      ) : (
        <Flame className="h-5 w-5 text-violet-600" />
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-slate-950">{title}</span>
        <span className="mt-1 block text-sm font-semibold text-slate-500">
          {volumeLabel(topic.volume)} · {difficultyLabel(topic)}
          {score ? ` · Opportunity ${score}` : ""}
        </span>
      </span>
      <span className="flex items-center gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDecline();
          }}
          title={`Ignore suggestion: ${topic.keyword}`}
          aria-label={`Ignore suggestion: ${topic.keyword}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-100"
        >
          <ThumbsDown className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            selectOrContinue();
          }}
          disabled={selected && submitting}
          className={clsx(
            "inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-60",
            selected
              ? rowTheme?.selectedButton ?? "bg-white text-violet-700 hover:bg-violet-50"
              : rowTheme?.idleButton ?? "bg-violet-50 text-violet-700 hover:bg-violet-100",
          )}
        >
          {selected ? "Continue" : "Select"}
          {selected && submitting ? (
            <Loader2 className={clsx("h-4 w-4 animate-spin", rowTheme?.arrow ?? "text-violet-500")} />
          ) : (
            <ArrowRight className={clsx("h-4 w-4", rowTheme?.arrow ?? "text-violet-500")} />
          )}
        </button>
      </span>
    </div>
  );
}

function RecentArticleRow({ article }: { article: VibeMarketingWrittenTopic }) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)_auto] items-center gap-4 border-t border-slate-100 py-4 first:border-t-0">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Published
      </span>
      <p className="truncate text-sm font-black text-slate-950">{article.title || article.keyword}</p>
      <p className="text-sm font-bold text-slate-500">{formatArticleDate(article.writtenAt)}</p>
    </div>
  );
}

function draftStatusTone(draft: VibeMarketingDraftArticle) {
  if (["failed", "blocked", "denied"].includes(draft.status)) {
    return {
      label: "Needs attention",
      pill: "bg-red-50 text-red-700",
      dot: "bg-red-500",
    };
  }
  if (draft.status === "completed" || String(draft.status).startsWith("awaiting_") || draft.status === "approval_required") {
    return {
      label: "Ready for review",
      pill: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    };
  }
  return {
    label: "In progress",
    pill: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
  };
}

function draftActionVariant(actionKind: string) {
  if (actionKind === "restart") return "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100";
  if (actionKind === "resume") return "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100";
  if (actionKind === "review") return "border-red-200 bg-red-50 text-red-700 hover:bg-red-100";
  return "border-slate-200 bg-white text-violet-700 hover:bg-violet-50";
}

function DraftArticleRow({
  draft,
  submitting,
  deleting,
  skipDeleteConfirmation,
  onDeleteRequest,
}: {
  draft: VibeMarketingDraftArticle;
  submitting: boolean;
  deleting: boolean;
  skipDeleteConfirmation: boolean;
  onDeleteRequest: (draft: { runId: string; title: string }) => void;
}) {
  const tone = draftStatusTone(draft);
  const href = `/founder-tools/marketing/runs/${encodeURIComponent(draft.runId)}`;
  const canPostAction = draft.actionKind === "resume" || draft.actionKind === "restart";
  const actionIntent = draft.actionKind === "resume" ? "resume-draft" : "restart-draft";
  const actionLabel = draft.actionLabel || (draft.actionKind === "restart" ? "Restart" : "Resume");
  const title = draft.title || draft.targetKeyword || "Untitled article draft";

  return (
    <div className="grid gap-3 border-t border-slate-100 py-4 first:border-t-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <Link to={href} className="min-w-0 rounded-lg transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-violet-100">
        <span className="inline-flex items-center gap-2">
          <span className={clsx("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black", tone.pill)}>
            <span className={clsx("h-1.5 w-1.5 rounded-full", tone.dot)} />
            {tone.label}
          </span>
          <span className="text-xs font-black uppercase tracking-normal text-slate-400">{draft.stageLabel}</span>
        </span>
        <p className="mt-2 truncate text-sm font-black text-slate-950">{title}</p>
        <p className="mt-1 truncate text-xs font-bold text-slate-500">
          {draft.targetKeyword ? `${draft.targetKeyword} · ` : ""}
          Updated {formatArticleDate(draft.updatedAt ?? draft.createdAt)}
        </p>
      </Link>
      <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end">
        <Form method="POST">
          <input type="hidden" name="intent" value="delete-draft" />
          <input type="hidden" name="runId" value={draft.runId} />
          <button
            type="submit"
            disabled={submitting}
            onClick={(event) => {
              if (skipDeleteConfirmation) return;
              event.preventDefault();
              onDeleteRequest({ runId: draft.runId, title });
            }}
            title={`Delete draft: ${title}`}
            aria-label={`Delete draft: ${title}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </button>
        </Form>
        {canPostAction ? (
          <Form method="POST" className="flex-1 sm:flex-none">
            <input type="hidden" name="intent" value={actionIntent} />
            <input type="hidden" name="runId" value={draft.runId} />
            <button
              type="submit"
              disabled={submitting}
              className={clsx(
                "inline-flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-black shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto",
                draftActionVariant(draft.actionKind),
              )}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {actionLabel}
            </button>
          </Form>
        ) : (
          <Link
            to={href}
            className={clsx(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-black shadow-sm transition sm:flex-none",
              draftActionVariant(draft.actionKind),
            )}
          >
            <ArrowRight className="h-4 w-4" />
            {draft.actionLabel || "Continue"}
          </Link>
        )}
      </div>
    </div>
  );
}

function DraftArticlesCard({
  drafts,
  submitting,
  deletingRunId,
  skipDeleteConfirmation,
  onDeleteRequest,
}: {
  drafts: VibeMarketingDraftArticle[];
  submitting: boolean;
  deletingRunId: string | null;
  skipDeleteConfirmation: boolean;
  onDeleteRequest: (draft: { runId: string; title: string }) => void;
}) {
  if (!drafts.length) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">Draft articles</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">Continue interrupted or review-ready article runs.</p>
        </div>
        <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-violet-500" />
      </div>
      <div className="mt-5">
        {drafts.slice(0, 5).map((draft) => (
          <DraftArticleRow
            key={draft.runId}
            draft={draft}
            submitting={submitting}
            deleting={deletingRunId === draft.runId}
            skipDeleteConfirmation={skipDeleteConfirmation}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </div>
    </section>
  );
}

function DraftDeleteConfirmationModal({
  draft,
  submitting,
  onClose,
  onRememberSkip,
}: {
  draft: { runId: string; title: string };
  submitting: boolean;
  onClose: () => void;
  onRememberSkip: () => void;
}) {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="draft-delete-confirmation-title">
      <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-5 shadow-2xl">
        <h2 id="draft-delete-confirmation-title" className="text-lg font-black text-slate-950">Delete draft article?</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          This cancels the article run and removes generated content for &quot;{draft.title}&quot;.
        </p>
        <label className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-600">
          <input
            type="checkbox"
            checked={dontAskAgain}
            onChange={(event) => setDontAskAgain(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-200"
          />
          Don&apos;t ask me again
        </label>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Keep draft
          </button>
          <Form
            method="POST"
            onSubmit={() => {
              if (dontAskAgain) onRememberSkip();
            }}
          >
            <input type="hidden" name="intent" value="delete-draft" />
            <input type="hidden" name="runId" value={draft.runId} />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-50 sm:w-auto"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              {submitting ? "Deleting..." : "Delete draft"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

type TopicFeedbackActionData = {
  intent?: string;
  error?: string;
  topicCandidateId?: string;
  topicFeedback?: VibeMarketingTopicFeedback | null;
};

type ContentIslandDiscoveryActionData = {
  intent?: string;
  runId?: string | null;
  status?: string | null;
  islandSlug?: string | null;
  islandName?: string | null;
  islandIconKey?: string | null;
  islandColorKey?: string | null;
  error?: string | null;
  errors?: string[];
};

type CompanyAvatarActionData = {
  intent?: string;
  avatarUrl?: string | null;
  error?: string | null;
};

type ContentIslandDiscoveryRunState = {
  runId: string;
  islandSlug: string;
  islandName: string;
  iconKey: string;
  colorKey: string;
};

type TopicToast =
  | {
      kind: "declined";
      topicId: string;
      keyword: string;
      feedbackId?: string | null;
    }
  | {
      kind: "error";
      message: string;
    };

function TopicDeclineRequest({
  topic,
  onResult,
}: {
  topic: VibeMarketingTopicCandidate;
  onResult: (data: TopicFeedbackActionData) => void;
}) {
  const fetcher = useFetcher<TopicFeedbackActionData>({ key: `decline-topic-${topic.id}` });
  const submittedRef = useRef(false);
  const handledRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const formData = new FormData();
    formData.set("intent", "decline-topic");
    formData.set("topicCandidateId", topic.id);
    formData.set("keyword", topic.keyword);
    formData.set("sourceDiscoveryRunId", topic.sourceRunId ?? "");
    fetcher.submit(formData, { method: "POST" });
  }, [fetcher, topic.id, topic.keyword, topic.sourceRunId]);

  useEffect(() => {
    if (handledRef.current || fetcher.state !== "idle" || !fetcher.data) return;
    handledRef.current = true;
    onResult({
      ...fetcher.data,
      topicCandidateId: fetcher.data.topicCandidateId ?? topic.id,
    });
  }, [fetcher.data, fetcher.state, onResult, topic.id]);

  return null;
}

const PILLAR_THEMES = {
  green: {
    iconWrap: "bg-emerald-500 text-white shadow-emerald-100",
    button: "border-emerald-200 text-emerald-600 hover:bg-emerald-50",
    arrow: "text-emerald-500",
    row: {
      focus: "focus:ring-emerald-100",
      selected: "border-emerald-300 bg-emerald-50/60",
      idle: "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30",
      selectedButton: "bg-white text-emerald-700 hover:bg-emerald-50",
      idleButton: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
      arrow: "text-emerald-500",
    },
    progress: {
      containerClassName: "border-emerald-100 bg-emerald-50/80",
      iconClassName: "bg-emerald-500 text-white shadow-emerald-100",
      badgeClassName: "bg-white text-emerald-700",
      completedSegmentClassName: "bg-emerald-600",
      activeSegmentClassName: "animate-pulse bg-emerald-300",
      pendingSegmentClassName: "bg-white/80",
    },
  },
  purple: {
    iconWrap: "bg-violet-700 text-white shadow-violet-100",
    button: "border-violet-200 text-violet-700 hover:bg-violet-50",
    arrow: "text-violet-600",
    row: {
      focus: "focus:ring-violet-100",
      selected: "border-violet-300 bg-violet-50/60",
      idle: "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/30",
      selectedButton: "bg-white text-violet-700 hover:bg-violet-50",
      idleButton: "bg-violet-50 text-violet-700 hover:bg-violet-100",
      arrow: "text-violet-500",
    },
    progress: {
      containerClassName: "border-violet-100 bg-violet-50/80",
      iconClassName: "bg-violet-700 text-white shadow-violet-100",
      badgeClassName: "bg-white text-violet-700",
      completedSegmentClassName: "bg-violet-700",
      activeSegmentClassName: "animate-pulse bg-violet-300",
      pendingSegmentClassName: "bg-white/80",
    },
  },
  blue: {
    iconWrap: "bg-blue-600 text-white shadow-blue-100",
    button: "border-blue-200 text-blue-600 hover:bg-blue-50",
    arrow: "text-blue-500",
    row: {
      focus: "focus:ring-blue-100",
      selected: "border-blue-300 bg-blue-50/60",
      idle: "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30",
      selectedButton: "bg-white text-blue-700 hover:bg-blue-50",
      idleButton: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      arrow: "text-blue-500",
    },
    progress: {
      containerClassName: "border-blue-100 bg-blue-50/80",
      iconClassName: "bg-blue-600 text-white shadow-blue-100",
      badgeClassName: "bg-white text-blue-700",
      completedSegmentClassName: "bg-blue-600",
      activeSegmentClassName: "animate-pulse bg-blue-300",
      pendingSegmentClassName: "bg-white/80",
    },
  },
  orange: {
    iconWrap: "bg-orange-500 text-white shadow-orange-100",
    button: "border-orange-200 text-orange-600 hover:bg-orange-50",
    arrow: "text-orange-500",
    row: {
      focus: "focus:ring-orange-100",
      selected: "border-orange-300 bg-orange-50/60",
      idle: "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/30",
      selectedButton: "bg-white text-orange-700 hover:bg-orange-50",
      idleButton: "bg-orange-50 text-orange-700 hover:bg-orange-100",
      arrow: "text-orange-500",
    },
    progress: {
      containerClassName: "border-orange-100 bg-orange-50/80",
      iconClassName: "bg-orange-500 text-white shadow-orange-100",
      badgeClassName: "bg-white text-orange-700",
      completedSegmentClassName: "bg-orange-500",
      activeSegmentClassName: "animate-pulse bg-orange-300",
      pendingSegmentClassName: "bg-white/80",
    },
  },
} as const;

function pillarTheme(colorKey: string | null | undefined) {
  if (colorKey === "green" || colorKey === "purple" || colorKey === "blue" || colorKey === "orange") {
    return PILLAR_THEMES[colorKey];
  }
  return PILLAR_THEMES.purple;
}

function pillarProgressTheme(colorKey: string | null | undefined): MarketingRunProgressTheme {
  return pillarTheme(colorKey).progress;
}

function PillarIcon({ iconKey, className }: { iconKey: string | null | undefined; className?: string }) {
  const Icon =
    iconKey === "brain"
      ? Brain
      : iconKey === "community"
        ? UsersRound
        : iconKey === "rocket"
          ? Rocket
          : iconKey === "tools"
            ? Wrench
            : Sparkles;
  return <Icon className={className} />;
}

const CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS = [
  { key: "queue_research", name: "Queue research run" },
  { key: "load_context", name: "Load startup context" },
  { key: "research_keywords", name: "Research keyword ideas" },
  { key: "score_opportunities", name: "Score opportunities" },
  { key: "select_topics", name: "Select article ideas" },
  { key: "refresh_topics", name: "Update topic picker" },
] as const;

function dateMs(value: string | null | undefined) {
  const parsed = value ? Date.parse(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

function contentIslandResearchElapsedSeconds(run?: VibeMarketingRunSummary | null) {
  const researchStep = run?.steps.find((step) => step.key === "research_sources");
  const startedAt = dateMs(researchStep?.startedAt) ?? dateMs(run?.updatedAt) ?? dateMs(run?.createdAt);
  if (!startedAt) return 0;
  return Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
}

function contentIslandDiscoveryStepIndex(run?: VibeMarketingRunSummary | null) {
  if (!run) return 0;
  const status = normalizeContentIslandDiscoveryStatus(run.status);
  if (isContentIslandDiscoveryDoneStatus(status)) return CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS.length;
  const currentStep = String(run.currentStep || "").trim().toLowerCase();
  if (currentStep.includes("final")) return 5;
  if (currentStep.includes("research")) {
    const elapsed = contentIslandResearchElapsedSeconds(run);
    if (elapsed > 150) return 4;
    if (elapsed > 60) return 3;
    return 2;
  }
  if (currentStep.includes("load") || currentStep.includes("context")) return 1;
  if (status === "queued" || status === "") return 0;
  return 2;
}

function buildContentIslandDiscoveryRunSummary({
  run,
  activeRun,
  submitting,
  domain,
}: {
  run?: VibeMarketingRunSummary | null;
  activeRun?: ContentIslandDiscoveryRunState | null;
  submitting?: boolean;
  domain?: string | null;
}): VibeMarketingRunSummary | null {
  if (!run && !activeRun && !submitting) return null;
  const status = run?.status ?? (submitting ? "queued" : "running");
  const failed = isContentIslandDiscoveryFailedStatus(status);
  const activeIndex = failed
    ? Math.max(0, Math.min(contentIslandDiscoveryStepIndex(run), CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS.length - 1))
    : Math.min(contentIslandDiscoveryStepIndex(run), CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS.length);
  const steps = CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS.map((step, index) => ({
    key: step.key,
    name: step.name,
    required: true,
    status:
      index < activeIndex
        ? "completed"
        : failed && index === activeIndex
          ? "failed"
          : index === activeIndex && !isContentIslandDiscoveryDoneStatus(status)
            ? "running"
            : "pending",
    attempts: index <= activeIndex ? 1 : 0,
    artifacts: [],
  }));

  return {
    runId: run?.runId || activeRun?.runId || "content-island-discovery-starting",
    workflow: run?.workflow || "auto_discovery",
    domain: run?.domain || domain || "",
    githubRepo: run?.githubRepo ?? null,
    sourceRunId: run?.sourceRunId ?? null,
    status,
    currentStep: CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS[Math.min(activeIndex, CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS.length - 1)]?.key ?? run?.currentStep ?? "queue_research",
    approvalState: run?.approvalState ?? null,
    resumeAvailable: run?.resumeAvailable ?? false,
    createdAt: run?.createdAt,
    updatedAt: run?.updatedAt,
    stepOrder: CONTENT_ISLAND_DISCOVERY_DISPLAY_STEPS.map((step) => step.key),
    steps,
    warnings: run?.warnings ?? [],
    errors: run?.errors ?? [],
    artifacts: run?.artifacts ?? [],
    previewUrl: run?.previewUrl ?? null,
    prUrl: run?.prUrl ?? null,
    routePath: run?.routePath ?? null,
    diagnostics: run?.diagnostics ?? {},
    contentPackage: run?.contentPackage ?? null,
    componentManifest: run?.componentManifest ?? null,
    livePreview: run?.livePreview ?? null,
    componentFeedback: run?.componentFeedback ?? null,
    workflowProgress: run?.workflowProgress ?? null,
    publishChildStatus: run?.publishChildStatus ?? null,
    publishChildRecoverable: run?.publishChildRecoverable ?? false,
    publishChildWaitReason: run?.publishChildWaitReason ?? null,
    stale: run?.stale ?? false,
    staleReason: run?.staleReason ?? null,
    retryAvailable: run?.retryAvailable ?? false,
    queueName: run?.queueName ?? null,
    queuedAt: run?.queuedAt ?? null,
    result: run?.result ?? {},
  };
}

function contentIslandDiscoveryStepLabel(run: VibeMarketingRunSummary | null, activeRun: ContentIslandDiscoveryRunState | null) {
  const islandName = activeRun?.islandName || "this content island";
  if (!run) return `Starting article idea research for ${islandName}.`;
  if (isContentIslandDiscoveryFailedStatus(run.status)) return `Article idea research needs attention for ${islandName}.`;
  if (isContentIslandDiscoveryDoneStatus(run.status)) return `New article ideas for ${islandName} are ready. Updating the topic picker.`;
  const currentStep = String(run.currentStep || "").trim().toLowerCase();
  if (currentStep.includes("research")) return `Researching and scoring article ideas for ${islandName}.`;
  if (currentStep.includes("final")) return `Preparing the highest-value ideas for ${islandName}.`;
  if (currentStep.includes("load") || currentStep.includes("context")) return `Loading startup context for ${islandName}.`;
  return `Researching article ideas for ${islandName}.`;
}

function TopicPillarsSection({
  pillars,
  submitting,
  discoverySubmitting,
  generatingPillarSlug,
  activePillarSlug,
  customNotice,
  helpOpen,
  helpRef,
  onGenerate,
  onAddCustomPillar,
  onLearnMore,
}: {
  pillars: VibeMarketingTopicPillar[];
  submitting: boolean;
  discoverySubmitting: boolean;
  generatingPillarSlug?: string | null;
  activePillarSlug: string | null;
  customNotice: boolean;
  helpOpen: boolean;
  helpRef: RefObject<HTMLDivElement | null>;
  onGenerate: (pillar: VibeMarketingTopicPillar) => void;
  onAddCustomPillar: () => void;
  onLearnMore: () => void;
}) {
  const visiblePillars = pillars.slice(0, 4);
  const generating = Boolean(generatingPillarSlug);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black tracking-normal text-slate-950">
              Your content islands
            </h2>
            <CircleHelp className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
            These are broad content themes based on your business and seed keywords.
            <br />
            Click a content island to see topic ideas that live under it.
          </p>
        </div>
        <div className="flex flex-wrap justify-start gap-3 lg:ml-auto lg:justify-end lg:self-start">
          <Form method="POST">
            <button
              type="submit"
              name="intent"
              value="start-discovery"
              disabled={submitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 text-sm font-black text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {discoverySubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Suggest more content islands
            </button>
          </Form>
          <button
            type="button"
            onClick={onLearnMore}
            aria-expanded={helpOpen}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 text-sm font-black text-violet-700 transition hover:bg-violet-50"
          >
            <BookOpen className="h-4 w-4" />
            Learn more
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {visiblePillars.map((pillar) => {
          const theme = pillarTheme(pillar.colorKey);
          const active = pillar.slug === activePillarSlug;
          return (
            <article
              key={pillar.id || pillar.slug}
              className={clsx(
                "relative flex min-h-[220px] flex-col items-center rounded-xl border bg-white px-3 py-5 text-center shadow-sm transition",
                active ? "border-violet-300 ring-4 ring-violet-50" : "border-slate-200 hover:border-violet-200",
              )}
            >
              <MoreHorizontal className="absolute right-4 top-4 h-4 w-4 text-slate-400" />
              <div className={clsx("flex h-12 w-12 items-center justify-center rounded-full shadow-lg", theme.iconWrap)}>
                <PillarIcon iconKey={pillar.iconKey} className="h-6 w-6" />
              </div>
              <h3 className="mt-6 min-h-[42px] text-balance text-sm font-black leading-5 text-slate-950">
                {pillar.name}
              </h3>
              <div className="mt-2 h-4" aria-hidden="true" />
              <button
                type="button"
                onClick={() => onGenerate(pillar)}
                disabled={submitting || generating}
                className={clsx(
                  "mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border bg-white text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60",
                  theme.button,
                )}
              >
                {generatingPillarSlug === pillar.slug ? (
                  <>
                    <Loader2 className={clsx("h-4 w-4 animate-spin", theme.arrow)} />
                    loading
                  </>
                ) : (
                  <>
                    Generate
                    <ArrowRight className={clsx("h-4 w-4", theme.arrow)} />
                  </>
                )}
              </button>
            </article>
          );
        })}

        <button
          type="button"
          onClick={onAddCustomPillar}
          className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-5 text-center transition hover:border-violet-300 hover:bg-violet-50/30"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-violet-300 text-violet-600">
            <Plus className="h-6 w-6" />
          </span>
          <span className="mt-5 text-sm font-black text-slate-700">Add custom content island</span>
        </button>
      </div>

      <div
        ref={helpRef}
        tabIndex={-1}
        className={clsx(
          "mt-5 rounded-lg bg-violet-50 px-4 py-3 text-sm font-black text-violet-700 outline-none transition focus:ring-4 focus:ring-violet-100",
          helpOpen ? "ring-1 ring-violet-100" : "",
        )}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-violet-500" />
          <p>Content islands organize broad themes. Each content island contains many specific article ideas.</p>
        </div>
        {customNotice ? (
          <p className="mt-3 pl-8 text-sm font-bold text-violet-600">
            Custom content island creation is not available yet. Use the Custom topic tab above for one-off article ideas.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ReturningTopicPickerPage({
  bootstrap,
  error,
  errorIntent,
}: {
  bootstrap: VibeMarketingBootstrap;
  error: string | null;
  errorIntent?: string | null;
}) {
  const navigation = useNavigation();
  const location = useLocation();
  const revalidator = useRevalidator();
  const restoreFetcher = useFetcher<TopicFeedbackActionData>();
  const contentIslandDiscoveryFetcher = useFetcher<ContentIslandDiscoveryActionData>({ key: "content-island-discovery" });
  const contentIslandRunStatusFetcher = useFetcher<VibeMarketingRunSummary>({ key: "content-island-discovery-status" });
  const companyAvatarFetcher = useFetcher<CompanyAvatarActionData>({ key: "company-avatar" });
  const topicListRef = useRef<HTMLDivElement | null>(null);
  const pillarHelpRef = useRef<HTMLDivElement | null>(null);
  const baseTopics = useMemo(
    () => bootstrap.topicCandidates.filter((topic) => !topic.alreadyWritten).slice(0, 8),
    [bootstrap.topicCandidates],
  );
  const [pendingDeclines, setPendingDeclines] = useState<Record<string, VibeMarketingTopicCandidate>>({});
  const [declinedFeedback, setDeclinedFeedback] = useState<VibeMarketingTopicFeedback[]>(bootstrap.declinedTopicFeedback ?? []);
  const [visibleCount, setVisibleCount] = useState(5);
  const [toast, setToast] = useState<TopicToast | null>(null);
  const [activePillarSlug, setActivePillarSlug] = useState<string | null>(null);
  const [customPillarNotice, setCustomPillarNotice] = useState(false);
  const [pillarHelpOpen, setPillarHelpOpen] = useState(false);
  const [contentIslandDiscoveryRun, setContentIslandDiscoveryRun] = useState<ContentIslandDiscoveryRunState | null>(null);
  const [contentIslandRefreshRunId, setContentIslandRefreshRunId] = useState<string | null>(null);
  const [companyAvatarModalOpen, setCompanyAvatarModalOpen] = useState(false);
  const [companyAvatarPreviewUrl, setCompanyAvatarPreviewUrl] = useState<string | null>(null);
  const undoRequestedTopicIds = useRef<Set<string>>(new Set());
  const completedContentIslandDiscoveryRuns = useRef<Set<string>>(new Set());
  const contentIslandRefreshStartCount = useRef(0);
  const companyAvatarPreviewObjectUrl = useRef<string | null>(null);
  const articleFormRef = useRef<HTMLFormElement>(null);
  const activePillar = useMemo(
    () => bootstrap.topicPillars.find((pillar) => pillar.slug === activePillarSlug) ?? null,
    [activePillarSlug, bootstrap.topicPillars],
  );
  const pillarVisualsBySlug = useMemo(() => {
    const map = new Map<string, TopicIslandVisual>();
    for (const pillar of bootstrap.topicPillars) {
      map.set(pillar.slug, { iconKey: pillar.iconKey, colorKey: pillar.colorKey, name: pillar.name });
    }
    return map;
  }, [bootstrap.topicPillars]);
  const topicIslandVisual = useCallback(
    (topic: VibeMarketingTopicCandidate): TopicIslandVisual | null => {
      const fromPillar = topic.pillarSlug ? pillarVisualsBySlug.get(topic.pillarSlug) : null;
      const iconKey = topic.pillarIconKey ?? fromPillar?.iconKey ?? null;
      const colorKey = topic.pillarColorKey ?? fromPillar?.colorKey ?? null;
      if (!iconKey && !colorKey) return null;
      return {
        iconKey: iconKey ?? "default",
        colorKey: colorKey ?? "purple",
        name: topic.pillarName ?? fromPillar?.name ?? null,
      };
    },
    [pillarVisualsBySlug],
  );
  const topicSource = useMemo(
    () => (activePillar ? activePillar.topicCandidates.filter((topic) => !topic.alreadyWritten) : baseTopics),
    [activePillar, baseTopics],
  );
  const declinedTopicKeys = useMemo(
    () => new Set(declinedFeedback.filter((item) => item.active).map((item) => topicMemoryKey(item.keyword))),
    [declinedFeedback],
  );
  const topics = useMemo(
    () =>
      topicSource.filter(
        (topic) =>
          !pendingDeclines[topic.id] &&
          !declinedTopicKeys.has(topicMemoryKey(topic.keyword)),
      ),
    [declinedTopicKeys, pendingDeclines, topicSource],
  );
  const [activeTab, setActiveTab] = useState<"choose" | "custom">(topics.length ? "choose" : "custom");
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id ?? "");
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null;
  const githubReadyForPublishing = isGithubPublishingReady(bootstrap);
  const effectiveDeliveryMode = effectiveArticleDeliveryMode(bootstrap);
  const directPublishMode = effectiveDeliveryMode === "publish_code";
  const deliveryModeNote = directPublishMode
    ? `This will generate a draft and prepare it for publishing through ${bootstrap.settings.githubRepo}.`
    : effectiveDeliveryMode === "review_draft"
      ? "This will generate an article preview for comments before publishing."
      : "This will generate article copy and images for manual publishing.";
  const companyName = bootstrap.settings.brandName || bootstrap.organization.name || bootstrap.company.name || "YourStartup";
  const domain = bootstrap.company.domain || bootstrap.organization.domain;
  const tags = startupTags(bootstrap);
  const savedCompanyAvatarUrl = bootstrap.company.avatarUrl ?? null;
  const companyAvatarUrl = companyAvatarPreviewUrl || savedCompanyAvatarUrl;
  const companyAvatarSaving = companyAvatarFetcher.state !== "idle";
  const companyAvatarError =
    companyAvatarFetcher.data?.intent === "save-company-avatar"
      ? companyAvatarFetcher.data.error ?? null
      : null;
  const latestArticleRunId =
    bootstrap.latestRuns.find((run) => ["article_generation", "content_factory_article", "article_revision"].includes(run.workflow))?.runId ?? "";
  const latestDiscoveryRunId =
    bootstrap.latestRuns.find((run) => ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(run.workflow))?.runId ?? "";
  const draftArticlesSignature = useMemo(
    () => (bootstrap.draftArticles ?? []).map((draft) => `${draft.runId}:${draft.status}:${draft.updatedAt ?? ""}`).join("|"),
    [bootstrap.draftArticles],
  );
  const pendingActions = useMarketingActionPending({
    navigationState: navigation.state,
    navigationFormData: navigation.formData,
    clearSignal: `${location.pathname}${location.search}:${latestArticleRunId}:${latestDiscoveryRunId}:${bootstrap.topicCandidates.length}:${bootstrap.topicPillars.length}:${draftArticlesSignature}`,
    errorKey: error ? errorIntent : null,
  });
  const isSubmitting = pendingActions.isAnyPending;
  const submittedContentIslandSlug =
    contentIslandDiscoveryFetcher.state !== "idle"
      ? String(contentIslandDiscoveryFetcher.formData?.get("contentIslandSlug") ?? "").trim()
      : "";
  const submittedContentIslandPillar = submittedContentIslandSlug
    ? bootstrap.topicPillars.find((pillar) => pillar.slug === submittedContentIslandSlug) ?? null
    : null;
  const submittedContentIslandRun: ContentIslandDiscoveryRunState | null =
    contentIslandDiscoveryFetcher.state !== "idle" && submittedContentIslandPillar
      ? {
          runId: "content-island-discovery-starting",
          islandSlug: submittedContentIslandPillar.slug,
          islandName: submittedContentIslandPillar.name,
          iconKey: submittedContentIslandPillar.iconKey,
          colorKey: submittedContentIslandPillar.colorKey,
        }
      : null;
  const contentIslandPolledRun =
    contentIslandRunStatusFetcher.data && contentIslandDiscoveryRun?.runId && contentIslandRunStatusFetcher.data.runId === contentIslandDiscoveryRun.runId
      ? contentIslandRunStatusFetcher.data
      : null;
  const contentIslandPolledStatus = normalizeContentIslandDiscoveryStatus(contentIslandPolledRun?.status);
  const contentIslandRunTerminal = Boolean(contentIslandPolledRun && isContentIslandDiscoveryTerminalStatus(contentIslandPolledStatus));
  const contentIslandDiscoveryBusy =
    contentIslandDiscoveryFetcher.state !== "idle" || Boolean(contentIslandDiscoveryRun && !contentIslandRunTerminal);
  const generatingPillarSlug = contentIslandDiscoveryBusy
    ? submittedContentIslandSlug || contentIslandDiscoveryRun?.islandSlug || null
    : submittedContentIslandSlug || null;
  const articleSubmitting = pendingActions.isPending("start-article");
  const discoverySubmitting = pendingActions.isPending("start-discovery", "discovery");
  const deleteDraftSubmitting = pendingActions.isPending("delete-draft");
  const restoreBusy = restoreFetcher.state !== "idle";
  const visibleTopics = topics.slice(0, visibleCount);
  const contentIslandProgressState = contentIslandDiscoveryRun ?? submittedContentIslandRun;
  const contentIslandProgressRun = buildContentIslandDiscoveryRunSummary({
    run: contentIslandPolledRun,
    activeRun: contentIslandProgressState,
    submitting: contentIslandDiscoveryFetcher.state !== "idle",
    domain,
  });
  const contentIslandProgressLabel = contentIslandDiscoveryStepLabel(contentIslandPolledRun, contentIslandProgressState);
  const contentIslandProgressTheme = pillarProgressTheme(contentIslandProgressState?.colorKey);
  const [declineRequests, setDeclineRequests] = useState<Record<string, VibeMarketingTopicCandidate>>({});
  const [draftDeleteRequest, setDraftDeleteRequest] = useState<{ runId: string; title: string } | null>(null);
  const [skipDeleteConfirmation, setSkipDeleteConfirmation] = useState(false);
  const [deletingDraftRunId, setDeletingDraftRunId] = useState<string | null>(null);

  const submitSelectedTopic = useCallback(() => {
    if (articleSubmitting || !selectedTopic) return;
    articleFormRef.current?.requestSubmit();
  }, [articleSubmitting, selectedTopic]);

  const submitRestoreFeedback = useCallback((feedbackId: string) => {
    const formData = new FormData();
    formData.set("intent", "restore-topic-feedback");
    formData.set("feedbackId", feedbackId);
    restoreFetcher.submit(formData, { method: "POST" });
  }, [restoreFetcher]);

  const rememberSkipDeleteConfirmation = useCallback(() => {
    setSkipDeleteConfirmation(true);
    try {
      window.localStorage.setItem(DRAFT_DELETE_CONFIRMATION_STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures. The current delete should still submit normally.
    }
  }, []);

  function handleDeclineTopic(topic: VibeMarketingTopicCandidate) {
    setPendingDeclines((current) => ({ ...current, [topic.id]: topic }));
    setDeclineRequests((current) => ({ ...current, [topic.id]: topic }));
    setSelectedTopicId((current) => {
      if (current !== topic.id) return current;
      return topics.find((candidate) => candidate.id !== topic.id)?.id ?? "";
    });
    setToast({ kind: "declined", topicId: topic.id, keyword: topic.keyword, feedbackId: null });
  }

  function handleUndoDecline() {
    if (!toast || toast.kind !== "declined") return;
    setPendingDeclines((current) => {
      const next = { ...current };
      delete next[toast.topicId];
      return next;
    });
    if (toast.feedbackId) {
      submitRestoreFeedback(toast.feedbackId);
    } else {
      undoRequestedTopicIds.current.add(toast.topicId);
    }
    setToast(null);
  }

  function handleRestoreFeedback(feedback: VibeMarketingTopicFeedback) {
    submitRestoreFeedback(feedback.id);
  }

  function handleGenerateContentIslandIdeas(pillar: VibeMarketingTopicPillar) {
    if (contentIslandDiscoveryBusy) return;
    setActivePillarSlug(null);
    setActiveTab("choose");
    setVisibleCount(5);
    setToast(null);
    setContentIslandDiscoveryRun(null);
    setContentIslandRefreshRunId(null);
    const formData = new FormData();
    formData.set("intent", "start-content-island-discovery");
    formData.set("contentIslandSlug", pillar.slug);
    formData.set("contentIslandName", pillar.name);
    formData.set("contentIslandKeyword", pillar.topicCandidates.find((candidate) => candidate.pillarKeyword)?.pillarKeyword ?? pillar.name);
    formData.set("contentIslandIconKey", pillar.iconKey);
    formData.set("contentIslandColorKey", pillar.colorKey);
    contentIslandDiscoveryFetcher.submit(formData, { method: "POST" });
  }

  function handleAddCustomPillar() {
    setCustomPillarNotice(true);
    window.setTimeout(() => {
      pillarHelpRef.current?.focus({ preventScroll: false });
    }, 0);
  }

  function handleLearnMorePillars() {
    setPillarHelpOpen((open) => !open);
    window.setTimeout(() => {
      pillarHelpRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      pillarHelpRef.current?.focus({ preventScroll: true });
    }, 0);
  }

  const handleCompanyAvatarSave = useCallback(
    (file: File) => {
      if (companyAvatarPreviewObjectUrl.current) {
        window.URL.revokeObjectURL(companyAvatarPreviewObjectUrl.current);
      }
      const previewUrl = window.URL.createObjectURL(file);
      companyAvatarPreviewObjectUrl.current = previewUrl;
      setCompanyAvatarPreviewUrl(previewUrl);
      setToast(null);

      const formData = new FormData();
      formData.set("intent", "save-company-avatar");
      formData.set("avatar", file);
      companyAvatarFetcher.submit(formData, {
        method: "POST",
        encType: "multipart/form-data",
      });
    },
    [companyAvatarFetcher],
  );

  useEffect(() => {
    return () => {
      if (companyAvatarPreviewObjectUrl.current) {
        window.URL.revokeObjectURL(companyAvatarPreviewObjectUrl.current);
        companyAvatarPreviewObjectUrl.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const data = companyAvatarFetcher.data;
    if (companyAvatarFetcher.state !== "idle" || data?.intent !== "save-company-avatar") return;
    if (data.error) {
      if (companyAvatarPreviewObjectUrl.current) {
        window.URL.revokeObjectURL(companyAvatarPreviewObjectUrl.current);
        companyAvatarPreviewObjectUrl.current = null;
      }
      setCompanyAvatarPreviewUrl(null);
      setToast({ kind: "error", message: data.error });
      return;
    }
    if (companyAvatarPreviewObjectUrl.current) {
      window.URL.revokeObjectURL(companyAvatarPreviewObjectUrl.current);
      companyAvatarPreviewObjectUrl.current = null;
    }
    setCompanyAvatarPreviewUrl(data.avatarUrl ?? null);
    revalidator.revalidate();
  }, [companyAvatarFetcher.data, companyAvatarFetcher.state, revalidator]);

  useEffect(() => {
    try {
      setSkipDeleteConfirmation(window.localStorage.getItem(DRAFT_DELETE_CONFIRMATION_STORAGE_KEY) === "1");
    } catch {
      setSkipDeleteConfirmation(false);
    }
  }, []);

  useEffect(() => {
    if (navigation.state === "idle") return;
    if (String(navigation.formData?.get("intent") ?? "") !== "delete-draft") return;
    const runId = String(navigation.formData?.get("runId") ?? "").trim();
    setDeletingDraftRunId(runId || null);
  }, [navigation.formData, navigation.state]);

  useEffect(() => {
    if (deleteDraftSubmitting) return;
    setDeletingDraftRunId(null);
  }, [deleteDraftSubmitting]);

  useEffect(() => {
    if (!draftDeleteRequest) return;
    const stillPresent = (bootstrap.draftArticles ?? []).some((draft) => draft.runId === draftDeleteRequest.runId);
    if (!stillPresent) setDraftDeleteRequest(null);
  }, [bootstrap.draftArticles, draftDeleteRequest]);

  useEffect(() => {
    const data = contentIslandDiscoveryFetcher.data;
    if (contentIslandDiscoveryFetcher.state !== "idle" || !data || data.intent !== "start-content-island-discovery") return;
    const startStatusFailed = isContentIslandDiscoveryFailedStatus(data.status);
    if (!data.runId || (data.error && startStatusFailed)) {
      setContentIslandDiscoveryRun(null);
      setToast({ kind: "error", message: data.error || "Could not start article idea research for that content island." });
      return;
    }
    const pillar = bootstrap.topicPillars.find((item) => item.slug === data.islandSlug);
    setContentIslandDiscoveryRun({
      runId: data.runId,
      islandSlug: data.islandSlug || pillar?.slug || "",
      islandName: data.islandName || pillar?.name || "this content island",
      iconKey: data.islandIconKey || pillar?.iconKey || "default",
      colorKey: data.islandColorKey || pillar?.colorKey || "purple",
    });
  }, [bootstrap.topicPillars, contentIslandDiscoveryFetcher.data, contentIslandDiscoveryFetcher.state]);

  useEffect(() => {
    if (!contentIslandDiscoveryRun?.runId) return;
    if (contentIslandRunTerminal) return;
    const runId = contentIslandDiscoveryRun.runId;
    const statusPath = `/founder-tools/marketing/runs/${encodeURIComponent(runId)}/status`;
    contentIslandRunStatusFetcher.load(statusPath);
    const intervalId = window.setInterval(() => {
      if (contentIslandRunStatusFetcher.state === "idle") {
        contentIslandRunStatusFetcher.load(statusPath);
      }
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [contentIslandDiscoveryRun?.runId, contentIslandRunTerminal]);

  useEffect(() => {
    const run = contentIslandPolledRun;
    if (!run || !contentIslandDiscoveryRun || run.runId !== contentIslandDiscoveryRun.runId) return;
    const status = String(run.status || "").trim().toLowerCase();
    if (isContentIslandDiscoveryDoneStatus(status)) {
      if (!completedContentIslandDiscoveryRuns.current.has(run.runId)) {
        completedContentIslandDiscoveryRuns.current.add(run.runId);
        contentIslandRefreshStartCount.current = bootstrap.topicCandidates.length;
        setContentIslandRefreshRunId(run.runId);
        setActivePillarSlug(null);
        setActiveTab("choose");
        setVisibleCount(5);
        revalidator.revalidate();
        window.setTimeout(() => {
          topicListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          topicListRef.current?.focus({ preventScroll: true });
        }, 0);
      }
      return;
    }
    if (isContentIslandDiscoveryFailedStatus(status)) {
      setContentIslandRefreshRunId(null);
      setToast(null);
    }
  }, [bootstrap.topicCandidates.length, contentIslandDiscoveryRun, contentIslandPolledRun, revalidator]);

  useEffect(() => {
    if (!contentIslandRefreshRunId || revalidator.state !== "idle") return;
    const refreshedFromRun =
      latestDiscoveryRunId === contentIslandRefreshRunId ||
      bootstrap.topicCandidates.some((topic) => topic.sourceRunId === contentIslandRefreshRunId) ||
      bootstrap.topicCandidates.length !== contentIslandRefreshStartCount.current;
    if (!refreshedFromRun) return;
    const refreshedTopic =
      bootstrap.topicCandidates.find((topic) => topic.sourceRunId === contentIslandRefreshRunId && !topic.alreadyWritten) ??
      (contentIslandDiscoveryRun?.islandSlug
        ? bootstrap.topicCandidates.find(
            (topic) => topic.pillarSlug === contentIslandDiscoveryRun.islandSlug && !topic.alreadyWritten,
          )
        : null);
    if (refreshedTopic) {
      const refreshedTopicIndex = bootstrap.topicCandidates
        .filter((topic) => !topic.alreadyWritten)
        .findIndex((topic) => topic.id === refreshedTopic.id);
      setSelectedTopicId(refreshedTopic.id);
      if (refreshedTopicIndex >= 0) {
        setVisibleCount((current) => Math.max(current, Math.min(Math.max(refreshedTopicIndex + 1, 5), 8)));
      }
    }
    setContentIslandDiscoveryRun((current) =>
      current?.runId === contentIslandRefreshRunId ? null : current,
    );
    setContentIslandRefreshRunId(null);
  }, [
    bootstrap.topicCandidates,
    bootstrap.topicCandidates.length,
    contentIslandDiscoveryRun?.islandSlug,
    contentIslandRefreshRunId,
    latestDiscoveryRunId,
    revalidator.state,
  ]);

  useEffect(() => {
    if (!activePillarSlug) return;
    if (!bootstrap.topicPillars.some((pillar) => pillar.slug === activePillarSlug)) {
      setActivePillarSlug(null);
    }
  }, [activePillarSlug, bootstrap.topicPillars]);

  useEffect(() => {
    if (!topics.length) {
      setSelectedTopicId("");
      return;
    }
    if (!selectedTopicId || !topics.some((topic) => topic.id === selectedTopicId)) {
      setSelectedTopicId(topics[0].id);
    }
  }, [selectedTopicId, topics]);

  const handleDeclineResult = useCallback((data: TopicFeedbackActionData) => {
    if (!data || data.intent !== "decline-topic") return;
    const topicId = data.topicCandidateId ?? "";
    const feedback = data.topicFeedback ?? null;
    if (topicId) {
      setDeclineRequests((current) => {
        const next = { ...current };
        delete next[topicId];
        return next;
      });
    }

    if (data.error || !feedback) {
      setPendingDeclines((current) => {
        const next = { ...current };
        if (topicId) delete next[topicId];
        return next;
      });
      if (topicId) undoRequestedTopicIds.current.delete(topicId);
      setToast({ kind: "error", message: data.error ?? "Could not ignore that suggestion." });
      return;
    }

    if (topicId) {
      setPendingDeclines((current) => {
        const next = { ...current };
        delete next[topicId];
        return next;
      });
    }

    if (topicId && undoRequestedTopicIds.current.has(topicId)) {
      undoRequestedTopicIds.current.delete(topicId);
      submitRestoreFeedback(feedback.id);
      return;
    }

    setDeclinedFeedback((current) => {
      const existing = current.filter((item) => item.id !== feedback.id);
      return [feedback, ...existing];
    });
    setToast((current) =>
      current?.kind === "declined" && current.topicId === topicId
        ? { ...current, feedbackId: feedback.id }
        : current,
    );
  }, [submitRestoreFeedback]);

  useEffect(() => {
    const data = restoreFetcher.data;
    if (!data || data.intent !== "restore-topic-feedback") return;
    if (data.error || !data.topicFeedback) {
      setToast({ kind: "error", message: data.error ?? "Could not restore that suggestion." });
      return;
    }
    setDeclinedFeedback((current) => current.filter((item) => item.id !== data.topicFeedback?.id));
  }, [restoreFetcher.data]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-9 sm:px-6 lg:px-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)] xl:items-start">
        <div className="space-y-5">
          <Form ref={articleFormRef} method="POST" className="space-y-5">
            <input type="hidden" name="intent" value="start-article" />
            <input type="hidden" name="topicCandidateId" value={activeTab === "choose" ? selectedTopicId : "__custom__"} />
            <input type="hidden" name="deliveryMode" value={effectiveDeliveryMode} />
            <input type="hidden" name="deliveryModeExplicit" value="false" />
            <input type="hidden" name="sourceDiscoveryRunId" value={selectedTopic?.sourceRunId ?? ""} />
            {activeTab === "choose" ? (
              <>
                <input type="hidden" name="targetKeyword" value={selectedTopic?.keyword ?? ""} />
                <input type="hidden" name="customTitle" value={selectedTopic?.title ?? ""} />
              </>
            ) : null}

          <div>
            <p className="text-xs font-black uppercase tracking-wide text-violet-700">Create new article</p>
            <h1 className="mt-4 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              What should we write about next?
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              {directPublishMode
                ? "Choose a topic and we'll research, write, and prepare a high-performing SEO article for your site."
                : "Choose a topic and we'll research, write, and package a high-performing SEO article for manual publishing."}
            </p>
            <p className="mt-3 max-w-2xl text-sm font-bold text-slate-500">{deliveryModeNote}</p>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="border-b border-slate-200">
            <div className="flex gap-10">
              <button
                type="button"
                onClick={() => setActiveTab("choose")}
                className={clsx(
                  "inline-flex items-center gap-2 border-b-2 px-1 pb-4 text-sm font-black transition",
                  activeTab === "choose" ? "border-violet-700 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-800",
                )}
              >
                <FileText className="h-4 w-4" />
                Choose a topic
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("custom")}
                className={clsx(
                  "inline-flex items-center gap-2 border-b-2 px-1 pb-4 text-sm font-black transition",
                  activeTab === "custom" ? "border-violet-700 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-800",
                )}
              >
                <PenLine className="h-4 w-4" />
                Custom topic
              </button>
            </div>
          </div>

          <section ref={topicListRef} tabIndex={-1} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm outline-none">
            {activeTab === "choose" ? (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black tracking-normal text-slate-950">Popular topics for startups like yours</h2>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      {activePillar
                        ? `Showing topic ideas under ${activePillar.name}.`
                        : "These topics are stored from your research history and filtered against written, in-progress, and cooldown topics."}
                    </p>
                  </div>
                  {activePillar ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActivePillarSlug(null);
                        setVisibleCount(5);
                      }}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50"
                    >
                      Show all topics
                    </button>
                  ) : null}
                </div>
                {contentIslandProgressRun && contentIslandProgressState ? (
                  <div className="mt-5">
                    <MarketingRunProgressCard
                      run={contentIslandProgressRun}
                      title="Researching article ideas"
                      currentStepLabel={contentIslandProgressLabel}
                      icon={<PillarIcon iconKey={contentIslandProgressState.iconKey} className="h-5 w-5" />}
                      theme={contentIslandProgressTheme}
                    />
                  </div>
                ) : null}
                <div className="mt-5 space-y-3">
                  {topics.length ? (
                    visibleTopics.map((topic) => (
                      <TopicRow
                        key={topic.id}
                        topic={topic}
                        selected={topic.id === selectedTopicId}
                        submitting={articleSubmitting}
                        islandVisual={topicIslandVisual(topic)}
                        onSelect={() => setSelectedTopicId(topic.id)}
                        onContinue={submitSelectedTopic}
                        onDecline={() => handleDeclineTopic(topic)}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl bg-slate-50 px-5 py-10 text-center">
                      <Sparkles className="mx-auto h-8 w-8 text-violet-500" />
                      <p className="mt-3 text-sm font-black text-slate-950">No stored topic ideas are ready yet.</p>
                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        Choose a content island below and click Generate to research article ideas for this section.
                      </p>
                    </div>
                  )}
                </div>
                {toast ? (
                  <div
                    className={clsx(
                      "mt-4 flex flex-col gap-3 rounded-xl px-4 py-3 text-sm font-bold sm:flex-row sm:items-center sm:justify-between",
                      toast.kind === "error"
                        ? "border border-rose-100 bg-rose-50 text-rose-700"
                        : "border border-violet-100 bg-violet-50 text-slate-700",
                    )}
                  >
                    <span>
                      {toast.kind === "error"
                        ? toast.message
                        : `Ignored "${toast.keyword}". Future research will avoid this topic and close variants.`}
                    </span>
                    {toast.kind === "declined" ? (
                      <button
                        type="button"
                        onClick={handleUndoDecline}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black text-violet-700 shadow-sm hover:bg-violet-50"
                      >
                        <Undo2 className="h-4 w-4" />
                        Undo
                      </button>
                    ) : null}
                  </div>
                ) : null}
                {topics.length > visibleCount ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => Math.min(topics.length, count + 5))}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 hover:bg-slate-100"
                  >
                    Show more topic ideas
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : null}
                {declinedFeedback.length ? (
                  <details className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                    <summary className="cursor-pointer text-sm font-black text-slate-700">
                      Declined suggestions ({declinedFeedback.length})
                    </summary>
                    <div className="mt-3 divide-y divide-slate-200">
                      {declinedFeedback.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="grid gap-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-950">{feedback.keyword}</p>
                            <p className="mt-1 text-xs font-bold text-slate-500">
                              {declineReasonLabel(feedback.reasonCode)} · {formatArticleDate(feedback.createdAt)}
                            </p>
                          </div>
                          <button
                            type="button"
                            disabled={restoreBusy}
                            onClick={() => handleRestoreFeedback(feedback)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Undo2 className="h-4 w-4" />
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null}
                {Object.values(declineRequests).map((topic) => (
                  <TopicDeclineRequest key={topic.id} topic={topic} onResult={handleDeclineResult} />
                ))}
              </>
            ) : (
              <>
                <h2 className="text-xl font-black tracking-normal text-slate-950">Write from a custom idea</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Use this when you already know the angle, announcement, or keyword you want to target.
                </p>
                <div className="mt-6 grid gap-5">
                  <FormField label="Article title or angle">
                    <input
                      name="customTitle"
                      placeholder="e.g. How to scale a SaaS startup with lean marketing"
                      className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                  </FormField>
                  <FormField label="Target keyword">
                    <input
                      name="targetKeyword"
                      placeholder="e.g. scale SaaS startup"
                      className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                  </FormField>
                  <FormField label="Extra context">
                    <textarea
                      name="articleContext"
                      rows={5}
                      placeholder="Add any positioning, proof points, or constraints the article should use."
                      className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                  </FormField>
                </div>
              </>
            )}
          </section>

          </Form>

          <TopicPillarsSection
            pillars={bootstrap.topicPillars}
            submitting={isSubmitting || contentIslandDiscoveryBusy}
            discoverySubmitting={discoverySubmitting}
            generatingPillarSlug={generatingPillarSlug}
            activePillarSlug={activePillarSlug}
            customNotice={customPillarNotice}
            helpOpen={pillarHelpOpen}
            helpRef={pillarHelpRef}
            onGenerate={handleGenerateContentIslandIdeas}
            onAddCustomPillar={handleAddCustomPillar}
            onLearnMore={handleLearnMorePillars}
          />
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-black text-slate-500">Your startup</p>
              <Link to="/founder-tools/marketing/create?step=startupDetails" className="inline-flex items-center gap-1 text-sm font-black text-violet-700">
                <PenLine className="h-4 w-4" />
                Edit details
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="group relative h-14 w-14 shrink-0">
                {companyAvatarUrl ? (
                  <img
                    src={companyAvatarUrl}
                    alt={`${companyName} avatar`}
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-black text-white">
                    {companyInitials(companyName)}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setCompanyAvatarModalOpen(true)}
                  disabled={companyAvatarSaving}
                  aria-label="Edit company avatar"
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {companyAvatarSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                </button>
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-black text-slate-950">{companyName}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  {tags.length ? tags.join(" · ") : "Startup · SEO · Growth"}
                </p>
                {companyAvatarError ? <p className="mt-1 text-xs font-bold text-red-600">{companyAvatarError}</p> : null}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-950">Website connected</p>
                  <p className="truncate text-sm font-semibold text-slate-500">{domain || "Add your domain"}</p>
                </div>
              </div>
              <Link to="/founder-tools/marketing/settings" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50">
                Manage
              </Link>
            </div>
          </section>

          <DraftArticlesCard
            drafts={bootstrap.draftArticles ?? []}
            submitting={isSubmitting}
            deletingRunId={deleteDraftSubmitting ? deletingDraftRunId : null}
            skipDeleteConfirmation={skipDeleteConfirmation}
            onDeleteRequest={setDraftDeleteRequest}
          />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-slate-950">Your recent articles</h2>
              <Link to="/founder-tools/marketing/create?step=reviewPublish" className="inline-flex items-center gap-2 text-sm font-black text-violet-700">
                View all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5">
              {bootstrap.writtenTopics.length ? (
                bootstrap.writtenTopics.slice(0, 3).map((article) => (
                  <RecentArticleRow key={article.id ?? article.slug ?? article.title} article={article} />
                ))
              ) : (
                <div className="rounded-xl bg-slate-50 px-5 py-8 text-center">
                  <FileText className="mx-auto h-7 w-7 text-slate-400" />
                  <p className="mt-3 text-sm font-black text-slate-950">No completed articles yet.</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">Your published article memory will appear here.</p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <Sparkles className="mt-1 h-7 w-7 shrink-0 text-violet-700" />
                <div>
                  <h2 className="text-lg font-black text-slate-950">Let AI suggest topics</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">Get topic ideas based on your website and industry.</p>
                </div>
              </div>
              <Form method="POST">
                <button
                  type="submit"
                  name="intent"
                  value="start-discovery"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300 bg-white px-5 py-3 text-sm font-black text-violet-700 transition hover:bg-violet-50 disabled:opacity-50"
                >
                  {discoverySubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {discoverySubmitting ? "Generating ideas..." : "Generate ideas"}
                </button>
              </Form>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {defaultTopicIdeas(bootstrap).map((chip) => (
                <span key={chip} className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600">
                  {chip}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>
      <AvatarModal
        isOpen={companyAvatarModalOpen}
        onClose={() => setCompanyAvatarModalOpen(false)}
        onSave={handleCompanyAvatarSave}
        initialImage={savedCompanyAvatarUrl ?? undefined}
        seedInitialImage={Boolean(savedCompanyAvatarUrl)}
        title="Update company avatar"
      />
      {draftDeleteRequest ? (
        <DraftDeleteConfirmationModal
          draft={draftDeleteRequest}
          submitting={deleteDraftSubmitting}
          onClose={() => setDraftDeleteRequest(null)}
          onRememberSkip={rememberSkipDeleteConfirmation}
        />
      ) : null}
    </div>
  );
}

export default function FounderToolsMarketing() {
  const { bootstrap } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const error = actionError(actionData);
  const errorIntent = actionIntent(actionData);
  const setupBlocked = Boolean(bootstrap.checks.scaffold?.setupBlocked);
  const shouldShowTopicPicker = !setupBlocked && (bootstrap.startPageMode === "topic_picker" || Boolean(bootstrap.hasCompletedArticleFlow));

  return (
    <div className="min-h-screen bg-[#fbfaf8]">
      {shouldShowTopicPicker ? (
        <ReturningTopicPickerPage bootstrap={bootstrap} error={error} errorIntent={errorIntent} />
      ) : (
        <VibeMarketingStartupBaselineSetup bootstrap={bootstrap} error={error} />
      )}
    </div>
  );
}
