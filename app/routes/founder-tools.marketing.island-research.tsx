import type { Route } from "./+types/founder-tools.marketing.island-research";
import { apiErrorDetail } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import { adoptResearchedContentIsland, getVibeMarketingRun, startContentIslandResearch } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder, resolveActiveCompanyId } from "~/lib/vibe-raising";

function failure(error: unknown) {
  if (error instanceof Response) return error;
  const status = (error as { response?: { status?: number } })?.response?.status || 503;
  const body = (error as { response?: { data?: { runId?: string; run_id?: string } } })?.response?.data;
  return Response.json({ error: apiErrorDetail(error, "Island research is temporarily unavailable. Please try again."),
    runId: body?.runId || body?.run_id,
    paymentRequired: status === 402 }, { status });
}

export async function action({ request, context }: Route.ActionArgs) {
  try {
    const env = getEnv(context);
    const { appUser } = await requireVibeRaisingFounder(env, request);
    const body = await request.json() as Record<string, unknown>;
    if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "Describe a topic to research." }, { status: 400 });
    const companyId = typeof body.companyId === "string" ? body.companyId : resolveActiveCompanyId(appUser);
    if (body.action === "research") {
      const run = await startContentIslandResearch(env, request, { ...body, companyId });
      return Response.json(run);
    }
    if (body.action === "adopt" && typeof body.runId === "string") {
      const island = await adoptResearchedContentIsland(env, request, body.runId, { companyId, proposalId: body.proposalId });
      return Response.json({ island });
    }
    return Response.json({ error: "Choose an island action." }, { status: 400 });
  } catch (error) { return failure(error); }
}

export async function loader({ request, context }: Route.LoaderArgs) {
  try {
    const env = getEnv(context);
    const { appUser } = await requireVibeRaisingFounder(env, request);
    const params = new URL(request.url).searchParams;
    const runId = params.get("runId");
    if (!runId) return Response.json({ error: "Research not found." }, { status: 404 });
    const run = await getVibeMarketingRun(env, request, runId, params.get("companyId") || resolveActiveCompanyId(appUser), "status");
    return Response.json(run, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return failure(error); }
}
