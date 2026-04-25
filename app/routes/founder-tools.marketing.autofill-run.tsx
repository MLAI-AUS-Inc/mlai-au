import type { Route } from "./+types/founder-tools.marketing.autofill-run";

import { getEnv } from "~/lib/env.server";
import { getVibeMarketingRun } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  return getVibeMarketingRun(env, request, runId);
}
