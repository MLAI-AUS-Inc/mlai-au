import type { Route } from "./+types/founder-tools.marketing.autofill-run";

import { getEnv } from "~/lib/env.server";
import { getVibeMarketingRun } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

function runLoaderErrorMessage(error: unknown) {
  if (error && typeof error === "object") {
    const payload = error as {
      message?: unknown;
      response?: { data?: { detail?: unknown; error?: unknown; message?: unknown } };
    };
    const detail = payload.response?.data?.detail ?? payload.response?.data?.error ?? payload.response?.data?.message ?? payload.message;
    if (typeof detail === "string" && detail.trim()) return detail;
  }
  return "Company profile research status is unavailable. We will keep trying, but you can retry the research if this continues.";
}

function blockedRunPayload(runId: string, error: unknown): VibeMarketingRunSummary {
  const message = runLoaderErrorMessage(error);
  return {
    runId,
    workflow: "startup_autofill",
    domain: "",
    githubRepo: null,
    status: "blocked",
    currentStep: "status_check_failed",
    approvalState: null,
    resumeAvailable: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: [message],
    artifacts: [],
    previewUrl: null,
    prUrl: null,
    routePath: null,
    diagnostics: { statusLoaderError: message },
    contentPackage: null,
    componentManifest: null,
    livePreview: null,
    componentFeedback: null,
    workflowProgress: null,
    result: { error: message, errors: [message], diagnostics: { statusLoaderError: message } },
  };
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  try {
    return await getVibeMarketingRun(env, request, runId);
  } catch (error) {
    return blockedRunPayload(runId, error);
  }
}
