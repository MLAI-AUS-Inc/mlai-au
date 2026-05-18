import type { Route } from "./+types/founder-tools.marketing.run-status";
import { redirect } from "react-router";

import { getEnv } from "~/lib/env.server";
import { getVibeMarketingRun, refreshVibeMarketingLivePreview } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

const TERMINAL_ATTENTION_STATUSES = new Set(["blocked", "blocked_verification", "failed", "cancelled", "canceled"]);

function isDocumentNavigation(request: Request) {
  const fetchDest = request.headers.get("Sec-Fetch-Dest")?.toLowerCase();
  const fetchMode = request.headers.get("Sec-Fetch-Mode")?.toLowerCase();
  const accept = request.headers.get("Accept")?.toLowerCase() ?? "";

  return fetchDest === "document" || fetchMode === "navigate" || accept.includes("text/html");
}

function shouldRefreshSetupLivePreview(run: VibeMarketingRunSummary) {
  if (run.workflow !== "article_system_setup") return false;
  if (TERMINAL_ATTENTION_STATUSES.has(String(run.status || "").trim().toLowerCase())) return false;
  if (run.livePreview?.previewUrl || run.livePreview?.error) return false;
  const status = String(run.livePreview?.status || run.status || "").trim().toLowerCase();
  const platformStatus = String(run.livePreview?.platformStatus || "").trim().toLowerCase();
  return ["queued", "pending", "starting", "building", "running", "awaiting_approval", "approval_required"].includes(status) ||
    ["queued", "pending", "starting", "building", "running"].includes(platformStatus);
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const runId = params.runId ?? "";

  if (isDocumentNavigation(request)) {
    throw redirect(runId ? `/founder-tools/marketing/runs/${encodeURIComponent(runId)}` : "/founder-tools/marketing");
  }

  await requireVibeRaisingFounder(env, request);
  let run = await getVibeMarketingRun(env, request, runId, null, "status");
  if (shouldRefreshSetupLivePreview(run)) {
    try {
      run = await refreshVibeMarketingLivePreview(env, request, runId);
    } catch {
      // Keep normal status polling resilient if the remote preview endpoint is temporarily unavailable.
    }
  }
  return Response.json(run);
}
