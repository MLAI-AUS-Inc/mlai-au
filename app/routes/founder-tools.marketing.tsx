import type { Route } from "./+types/founder-tools.marketing";
import { Form, Link, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  FileText,
  Flame,
  PenLine,
  Rocket,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { clsx } from "clsx";

import { getEnv } from "~/lib/env.server";
import {
  getVibeMarketingBootstrap,
  replayVibeMarketingDaily,
  startVibeMarketingArticle,
  startVibeMarketingDiscovery,
  startVibeMarketingScan,
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
  VibeMarketingBootstrap,
  VibeMarketingTopicCandidate,
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

function listFromForm(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringFromForm(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
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
      articleDeliveryMode: "publish_code",
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
    hiddenTopicCandidates: [],
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

  const bootstrap = await getVibeMarketingBootstrap(env, request);
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
    if (intent === "save-startup-details") {
      const name = stringFromForm(formData, "companyName");
      const domain = stringFromForm(formData, "domain");
      const shortDescription = stringFromForm(formData, "shortDescription") || stringFromForm(formData, "companyContext");
      const problemSolved = stringFromForm(formData, "problemSolved");
      const targetAudience = stringFromForm(formData, "targetAudience");
      const companyContext = combineCompanyContext({ shortDescription, problemSolved, targetAudience });

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
        seedKeywords: listFromForm(formData.get("seedKeywords")),
        founderNames: listFromForm(formData.get("founderNames")),
        stage: stringFromForm(formData, "stage"),
        organizationKind: stringFromForm(formData, "organizationKind"),
        notes: targetAudience,
        registered: true,
      });

      if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
      }

      if (stringFromForm(formData, "nextAction") === "save-exit") {
        return redirect("/founder-tools/marketing");
      }

      return redirect("/founder-tools/marketing/create?step=baseline");
    }

    if (!vibeContext.appUser) {
      return { intent, error: "Save your startup details before starting article research." };
    }

    if (intent === "scan") {
      const run = await startVibeMarketingScan(env, request, {});
      if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
    }

    if (intent === "start-discovery" || intent === "discovery") {
      const run = await startVibeMarketingDiscovery(env, request, {});
      if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
    }

    if (intent === "start-article") {
      const bootstrap = await getVibeMarketingBootstrap(env, request);
      const topicCandidateId = stringFromForm(formData, "topicCandidateId");
      const selectedCandidate =
        topicCandidateId && topicCandidateId !== "__custom__"
          ? bootstrap.topicCandidates.find((candidate) => candidate.id === topicCandidateId) ?? null
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
        deliveryMode: stringFromForm(formData, "deliveryMode") || bootstrap.settings.articleDeliveryMode || "publish_code",
        deliveryModeConfirmed: true,
        sourceRunId: selectedCandidate?.sourceRunId || stringFromForm(formData, "sourceDiscoveryRunId"),
      });

      if (result.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=writeCheck");
    }

    if (intent === "daily-replay") {
      const run = await replayVibeMarketingDaily(env, request, {});
      if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
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

function actionError(data: unknown): string | null {
  if (!data || typeof data !== "object" || !("error" in data)) return null;
  const error = (data as { error?: unknown }).error;
  return typeof error === "string" ? error : null;
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

function difficultyLabel(value: unknown) {
  const difficulty = numericValue(value);
  if (difficulty === null) return "Competition pending";
  if (difficulty <= 30) return "Low competition";
  if (difficulty <= 60) return "Medium competition";
  return "High competition";
}

function opportunityLabel(value: unknown) {
  const score = numericValue(value);
  return score === null ? null : Math.round(score).toString();
}

function companyInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "YS";
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
}

function formatArticleDate(value: string | null | undefined) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

function FirstArticleSetupPage({
  bootstrap,
  error,
}: {
  bootstrap: VibeMarketingBootstrap;
  error: string | null;
}) {
  const context = bootstrap.settings.companyContext ?? "";
  const companyName = bootstrap.company.name === "Company" ? "" : bootstrap.company.name;

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

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="space-y-7">
                <FormField label="Startup or Company Name" help="This will be used as the author for your articles.">
                  <input
                    name="companyName"
                    defaultValue={companyName}
                    placeholder="e.g. Your Startup Inc."
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </FormField>

                <FormField label="Website domain" help="Connect this company to its website and article system.">
                  <input
                    name="domain"
                    defaultValue={bootstrap.company.domain ?? bootstrap.organization.domain ?? ""}
                    placeholder="e.g. yourstartup.com"
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </FormField>

                <FormField label="Short description" help="In 1-2 sentences, what does your startup do?">
                  <textarea
                    name="shortDescription"
                    defaultValue={context}
                    placeholder="e.g. We help SaaS companies automate customer onboarding..."
                    rows={5}
                    maxLength={600}
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </FormField>
              </div>

              <div className="space-y-7">
                <FormField label="What problem do you solve?" help="What's the main problem you help your customers solve?">
                  <textarea
                    name="problemSolved"
                    placeholder="e.g. SaaS teams waste time on manual processes..."
                    rows={5}
                    maxLength={400}
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </FormField>

                <FormField label="Who is your target audience?" help="Who do you serve?">
                  <input
                    name="targetAudience"
                    placeholder="e.g. SaaS founders, marketing teams, eCommerce brands"
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </FormField>

                <FormField label="Seed keywords" help="Optional starting keywords, separated by commas.">
                  <input
                    name="seedKeywords"
                    defaultValue={bootstrap.organization.seedKeywords.join(", ")}
                    placeholder="e.g. onboarding automation, product analytics"
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </FormField>
              </div>
            </div>
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
          </aside>
        </div>

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
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Save className="h-4 w-4" />
              Save and exit
            </button>
            <button
              type="submit"
              name="nextAction"
              value="continue"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-800"
            >
              Continue to website
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

function TopicRow({
  topic,
  selected,
  onSelect,
}: {
  topic: VibeMarketingTopicCandidate;
  selected: boolean;
  onSelect: () => void;
}) {
  const score = opportunityLabel(topic.opportunityScore);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "grid w-full grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border px-4 py-3 text-left transition",
        selected ? "border-violet-300 bg-violet-50/60" : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/30",
      )}
    >
      <Flame className="h-5 w-5 text-violet-600" />
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-slate-950">{topic.title || topic.keyword}</span>
        <span className="mt-1 block text-sm font-semibold text-slate-500">
          {volumeLabel(topic.volume)} · {difficultyLabel(topic.difficulty)}
          {score ? ` · Opportunity ${score}` : ""}
        </span>
      </span>
      <span className="flex items-center gap-3">
        <span className={clsx("rounded-lg px-3 py-2 text-xs font-black", selected ? "bg-white text-violet-700" : "bg-violet-50 text-violet-700")}>
          {selected ? "Selected" : "Select"}
        </span>
        <ArrowRight className="h-4 w-4 text-violet-500" />
      </span>
    </button>
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

function ReturningTopicPickerPage({
  bootstrap,
  error,
}: {
  bootstrap: VibeMarketingBootstrap;
  error: string | null;
}) {
  const navigation = useNavigation();
  const topics = useMemo(
    () => bootstrap.topicCandidates.filter((topic) => !topic.alreadyWritten).slice(0, 8),
    [bootstrap.topicCandidates],
  );
  const [activeTab, setActiveTab] = useState<"choose" | "custom">(topics.length ? "choose" : "custom");
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id ?? "");
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null;
  const companyName = bootstrap.settings.brandName || bootstrap.organization.name || bootstrap.company.name || "YourStartup";
  const domain = bootstrap.company.domain || bootstrap.organization.domain;
  const tags = startupTags(bootstrap);
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-9 sm:px-6 lg:px-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)] xl:items-start">
        <Form method="POST" className="space-y-5">
          <input type="hidden" name="intent" value="start-article" />
          <input type="hidden" name="topicCandidateId" value={activeTab === "choose" ? selectedTopicId : "__custom__"} />
          <input type="hidden" name="deliveryMode" value={bootstrap.settings.articleDeliveryMode ?? "publish_code"} />
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
              Choose a topic and we&apos;ll research, write, and publish a high-performing SEO article for you.
            </p>
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

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {activeTab === "choose" ? (
              <>
                <h2 className="text-xl font-black tracking-normal text-slate-950">Popular topics for startups like yours</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  These topics are stored from your research history and filtered against written, in-progress, and cooldown topics.
                </p>
                <div className="mt-5 space-y-3">
                  {topics.length ? (
                    topics.slice(0, 5).map((topic) => (
                      <TopicRow
                        key={topic.id}
                        topic={topic}
                        selected={topic.id === selectedTopicId}
                        onSelect={() => setSelectedTopicId(topic.id)}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl bg-slate-50 px-5 py-10 text-center">
                      <Sparkles className="mx-auto h-8 w-8 text-violet-500" />
                      <p className="mt-3 text-sm font-black text-slate-950">No stored topic ideas are ready yet.</p>
                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        Generate ideas or enter a custom topic to start the next article.
                      </p>
                    </div>
                  )}
                </div>
                {topics.length > 5 ? (
                  <button
                    type="button"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 hover:bg-slate-100"
                  >
                    Show more topic ideas
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : null}
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

          <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-violet-50/80 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <TrendingUp className="mt-1 h-8 w-8 shrink-0 text-violet-700" />
              <div>
                <p className="text-base font-black text-slate-950">Consistent content. Compounding results.</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Start from researched keywords and avoid repeating topics you&apos;ve already published.
                </p>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || (activeTab === "choose" && !selectedTopic)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create article from topic
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Form>

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
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-black text-white">
                {companyInitials(companyName)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-black text-slate-950">{companyName}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  {tags.length ? tags.join(" · ") : "Startup · SEO · Growth"}
                </p>
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
                  <Sparkles className="h-4 w-4" />
                  Generate ideas
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
    </div>
  );
}

export default function FounderToolsMarketing() {
  const { bootstrap } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const error = actionError(actionData);
  const shouldShowTopicPicker = bootstrap.startPageMode === "topic_picker" || Boolean(bootstrap.hasCompletedArticleFlow);

  return (
    <div className="min-h-screen bg-[#fbfaf8]">
      {shouldShowTopicPicker ? (
        <ReturningTopicPickerPage bootstrap={bootstrap} error={error} />
      ) : (
        <FirstArticleSetupPage bootstrap={bootstrap} error={error} />
      )}
    </div>
  );
}
