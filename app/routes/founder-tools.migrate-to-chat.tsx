import type { Route } from "./+types/founder-tools.migrate-to-chat";
import { createApiClient, apiErrorDetail } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  let body: Record<string, unknown>;
  try {
    const value: unknown = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid handoff");
    body = value as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid startup handoff." }, { status: 400 });
  }
  if (!appUser.companies.some((company) => company.id === body.companyId)) {
    return Response.json({ error: "Choose one of your startups." }, { status: 404 });
  }
  try {
    const response = await createApiClient(env, request).post("/api/v1/founder-tools/my-startup-handoff/", body);
    return Response.json(response.data, { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  } catch (error) {
    return Response.json({ error: apiErrorDetail(error, "Your startup could not be handed over. Please try again.") }, { status: 503 });
  }
}
