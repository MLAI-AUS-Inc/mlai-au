import type { Route } from "./+types/founder-tools.marketing.run-status";
import { redirect } from "react-router";

import { getEnv } from "~/lib/env.server";
import { getVibeMarketingRun } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";

function isDocumentNavigation(request: Request) {
  const fetchDest = request.headers.get("Sec-Fetch-Dest")?.toLowerCase();
  const fetchMode = request.headers.get("Sec-Fetch-Mode")?.toLowerCase();
  const accept = request.headers.get("Accept")?.toLowerCase() ?? "";

  return fetchDest === "document" || fetchMode === "navigate" || accept.includes("text/html");
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const runId = params.runId ?? "";

  if (isDocumentNavigation(request)) {
    throw redirect(runId ? `/founder-tools/marketing/runs/${encodeURIComponent(runId)}` : "/founder-tools/marketing");
  }

  await requireVibeRaisingFounder(env, request);
  return Response.json(await getVibeMarketingRun(env, request, runId));
}
