import type { Route } from "./+types/founder-tools.marketing";
import { Form, Link, redirect, useLoaderData, useNavigation } from "react-router";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import MarketingEvidencePanel from "~/components/MarketingEvidencePanel";
import { getEnv } from "~/lib/env.server";
import {
  getVibeMarketingBootstrap,
  replayVibeMarketingDaily,
  startVibeMarketingDiscovery,
  startVibeMarketingScan,
} from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";

const CHECKLIST = [
  ["websiteProfile", "Startup details"],
  ["baseline", "Website baseline"],
  ["github", "GitHub connected"],
  ["scan", "Repository scanned"],
  ["scaffold", "Article system ready"],
  ["research", "Topic research complete"],
  ["write", "Article written and checked"],
  ["publish", "Publish reviewed"],
  ["dailyAutomation", "Daily generation enabled"],
] as const;

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const bootstrap = await getVibeMarketingBootstrap(env, request);
  return { bootstrap };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "scan") {
    const run = await startVibeMarketingScan(env, request, {});
    if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
  }

  if (intent === "discovery") {
    const run = await startVibeMarketingDiscovery(env, request, {});
    if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
  }

  if (intent === "daily-replay") {
    const run = await replayVibeMarketingDaily(env, request, {});
    if (run.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
  }

  return null;
}

function StatusIcon({ passed }: { passed: boolean }) {
  if (passed) return <CheckCircleIcon className="h-5 w-5 text-emerald-600" />;
  return <ClockIcon className="h-5 w-5 text-gray-400" />;
}

export default function FounderToolsMarketing() {
  const { bootstrap } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const latestArticle = bootstrap.latestRuns.find((run) => ["article_generation", "content_factory_article"].includes(run.workflow));
  const currentAction = bootstrap.recommendedNextAction?.label ?? "Continue setup";
  const baseline = bootstrap.websiteBaseline;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet-600">Founder Tools</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-gray-950">Vibe Marketing</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Generate SEO article candidates, open previewable article PRs, review evidence, and approve publish when ready.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link to="/founder-tools/marketing/settings" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50">
            <Cog6ToothIcon className="h-4 w-4" />
            Settings
          </Link>
          <Link to={`/founder-tools/marketing/create?step=${bootstrap.currentGuidedStep ?? "startupDetails"}`} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700">
            <span className="truncate">{currentAction}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_340px] lg:items-start">
        <nav className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <Link to="/founder-tools/marketing/create" className="block rounded-lg px-3 py-2 text-sm font-bold text-violet-700 hover:bg-violet-50">Setup</Link>
          <Link to="/founder-tools/marketing/settings" className="block rounded-lg px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">Settings</Link>
          <a href="#runs" className="block rounded-lg px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">Runs</a>
        </nav>

        <main className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-gray-950">Operational checklist</h2>
                <p className="mt-1 text-sm text-gray-500">{bootstrap.company.name} · {bootstrap.organization.domain || "No domain"}</p>
              </div>
              {!bootstrap.checks.dailyAutomation?.passed ? (
                <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
              ) : (
                <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
              )}
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {CHECKLIST.map(([key, label]) => {
                const passed = Boolean(bootstrap.checks[key]?.passed);
                return (
                  <Link
                    key={key}
                    to={`/founder-tools/marketing/create?step=${key === "websiteProfile" ? "startupDetails" : key === "baseline" ? "baseline" : key === "scaffold" ? "articleSystem" : key === "write" ? "writeCheck" : key === "publish" ? "reviewPublish" : key === "dailyAutomation" ? "dailyAutomation" : key}`}
                    className={clsx(
                      "flex items-center justify-between gap-3 rounded-xl border p-4 transition",
                      passed ? "border-emerald-100 bg-emerald-50/60 hover:bg-emerald-50" : "border-gray-200 bg-white hover:bg-gray-50",
                    )}
                  >
                    <span className="text-sm font-black text-gray-900">{label}</span>
                    <StatusIcon passed={passed} />
                  </Link>
                );
              })}
            </div>
          </section>

          <section id="runs" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-gray-950">Recent runs</h2>
              <Form method="POST">
                <button type="submit" name="intent" value="scan" disabled={isSubmitting || !bootstrap.settings.githubRepo} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                  Scan
                </button>
              </Form>
            </div>

            {bootstrap.latestRuns.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {bootstrap.latestRuns.map((run) => (
                  <Link key={run.runId} to={`/founder-tools/marketing/runs/${run.runId}`} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-black text-gray-950">{run.workflow.replace(/_/g, " ")}</p>
                      <p className="mt-1 text-xs font-semibold text-gray-500">{run.status.replace(/_/g, " ")} · {run.currentStep ?? run.runId}</p>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500">
                No marketing runs yet.
              </p>
            )}
          </section>
        </main>

        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Website baseline</p>
                <p className="mt-2 text-lg font-black text-gray-950">
                  {typeof baseline.overallScore === "number" ? baseline.overallScore : "Not run"}
                </p>
              </div>
              <ChartBarIcon className="h-5 w-5 text-violet-600" />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-600">
              {baseline.collectedAt ? `Collected ${new Date(baseline.collectedAt).toLocaleDateString()}` : "Capture a starting point before article generation."}
            </p>
            <Link to="/founder-tools/marketing/create?step=baseline" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet-700">
              Open baseline
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Next action</p>
            <p className="mt-2 text-lg font-black text-gray-950">{currentAction}</p>
            <Link to={`/founder-tools/marketing/create?step=${bootstrap.currentGuidedStep ?? "startupDetails"}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet-700">
              Continue
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Daily generation</p>
            <p className="mt-2 text-sm font-semibold text-gray-700">
              {bootstrap.settings.dailyDiscoveryEnabled ? "Enabled with human approval before publish." : "Disabled."}
            </p>
            <Form method="POST" className="mt-4">
              <button type="submit" name="intent" value="daily-replay" disabled={isSubmitting || !bootstrap.checks.dailyAutomation?.passed} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50">
                Run today now
              </button>
            </Form>
          </div>

          <MarketingEvidencePanel run={latestArticle ?? null} evidence={bootstrap.publishEvidence} />
        </div>
      </div>
    </div>
  );
}
