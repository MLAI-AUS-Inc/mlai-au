import type { Route } from "./+types/founder-tools.marketing.run";
import { useEffect } from "react";
import { Form, Link, redirect, useActionData, useLoaderData, useNavigation, useRevalidator } from "react-router";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import MarketingEvidencePanel from "~/components/MarketingEvidencePanel";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import { getEnv } from "~/lib/env.server";
import { controlVibeMarketingRun, getVibeMarketingRun, reviseVibeMarketingRun } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";

const POLLING_STATUSES = new Set([
  "queued",
  "running",
  "awaiting_confirmation",
  "awaiting_delivery_mode",
  "awaiting_approval",
  "approval_required",
]);

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  const run = await getVibeMarketingRun(env, request, runId);
  return { run };
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  try {
    if (intent === "revise") {
      await reviseVibeMarketingRun(env, request, runId, {
        revisionInstructions: String(formData.get("revisionInstructions") ?? "").trim(),
        editedContent: String(formData.get("editedContent") ?? "").trim(),
      });
    } else if (["approve", "deny", "resume", "promote-bundle"].includes(intent)) {
      await controlVibeMarketingRun(env, request, runId, intent);
    } else if (intent === "delivery-mode") {
      await controlVibeMarketingRun(env, request, runId, "delivery-mode", {
        deliveryMode: String(formData.get("deliveryMode") ?? ""),
      });
    }
  } catch (error: any) {
    return {
      error:
        error?.data?.detail ??
        error?.response?.data?.detail ??
        error?.message ??
        "Run action failed.",
    };
  }

  throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(runId)}`);
}

function StepStatusDot({ status }: { status: string }) {
  const isComplete = status === "completed" || status === "skipped";
  const isFailed = ["failed", "blocked", "cancelled"].includes(status);
  return (
    <span
      className={clsx(
        "mt-1 h-3 w-3 flex-shrink-0 rounded-full",
        isComplete && "bg-emerald-500",
        isFailed && "bg-red-500",
        !isComplete && !isFailed && "bg-violet-300",
      )}
    />
  );
}

export default function FounderToolsMarketingRun() {
  const { run } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const isSubmitting = navigation.state === "submitting";
  const shouldPoll = POLLING_STATUSES.has(run.status);
  const canApprove = Boolean(run.previewUrl || run.prUrl || run.result?.["preview_url"] || run.result?.["pr_url"]);

  useEffect(() => {
    if (!shouldPoll) return;
    const timer = window.setInterval(() => {
      void revalidator.revalidate();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [revalidator, shouldPoll]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5">
        <div>
          <Link to="/founder-tools/marketing" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to marketing
          </Link>
          <h1 className="text-2xl font-black text-gray-950">Marketing run</h1>
          <p className="mt-2 break-all font-mono text-xs text-gray-500">{run.runId}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Form method="POST">
            <button type="submit" name="intent" value="resume" disabled={isSubmitting || !run.resumeAvailable} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50">
              <PlayIcon className="h-4 w-4" />
              Resume
            </button>
          </Form>
          <Form method="POST">
            <button type="submit" name="intent" value="deny" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50">
              <XCircleIcon className="h-4 w-4" />
              Deny
            </button>
          </Form>
          <Form method="POST">
            <button type="submit" name="intent" value="approve" disabled={isSubmitting || !canApprove} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50">
              <CheckCircleIcon className="h-4 w-4" />
              Approve
            </button>
          </Form>
        </div>
      </div>

      {actionData?.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionData.error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <main className="space-y-6">
          <MarketingRunProgressCard run={run} pollingDegraded={revalidator.state === "loading"} />

          {run.status === "blocked" || run.status === "failed" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-black">This run needs attention</p>
                  <p className="mt-1">{run.errors[0] ?? "Review the failed step and resume when ready."}</p>
                </div>
              </div>
            </div>
          ) : null}

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-gray-950">Step timeline</h2>
            {run.steps.length > 0 ? (
              <ol className="mt-5 space-y-4">
                {run.steps.map((step) => (
                  <li key={step.key} className="flex gap-3">
                    <StepStatusDot status={step.status} />
                    <div className="min-w-0 flex-1 border-b border-gray-100 pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-black text-gray-950">{step.name}</p>
                        <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                          {step.status.replace(/_/g, " ")}
                        </span>
                      </div>
                      {step.message ? <p className="mt-1 text-sm text-gray-600">{step.message}</p> : null}
                      {step.error ? <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{step.error}</p> : null}
                      {step.artifacts.length > 0 ? (
                        <p className="mt-2 text-xs font-semibold text-gray-500">{step.artifacts.length} artifacts</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 rounded-xl bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500">
                No step details have been reported yet.
              </p>
            )}
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-gray-950">Edit article</h2>
            <p className="mt-1 text-sm text-gray-600">Submit revision instructions or paste safe article-body edits. The backend keeps the request attached to this durable run.</p>
            <Form method="POST" className="mt-5 space-y-4">
              <input type="hidden" name="intent" value="revise" />
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Revision instructions</span>
                <textarea name="revisionInstructions" rows={4} placeholder="Make the intro more founder-focused, shorten the conclusion, add a comparison table..." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Manual content edits</span>
                <textarea name="editedContent" rows={8} defaultValue={String(run.result?.["markdown"] ?? run.result?.["content"] ?? "")} placeholder="Optional Markdown/article-body override" className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-xs leading-6 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
              </label>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                Submit revision
              </button>
            </Form>
          </section>
        </main>

        <MarketingEvidencePanel run={run} />
      </div>
    </div>
  );
}
