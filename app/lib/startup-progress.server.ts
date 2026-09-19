import { createApiClient } from "~/lib/api";
import type { StartupProgress } from "./startup-progress";
import { progressEnabled } from "./startup-progress";
const PATH = "/api/v1/vibe-raising/progress/";

export async function getStartupProgress(
  env: Env,
  request: Request,
  companyId: string | null | undefined,
): Promise<StartupProgress | null> {
  if (!progressEnabled(env) || !companyId) return null;
  const response = await createApiClient(env, request).get(PATH, {
    params: { company_id: companyId },
  });
  return response.data;
}

export async function saveStartupProgress(
  env: Env,
  request: Request,
  companyId: string,
  intent: string,
  body: Record<string, unknown>,
): Promise<StartupProgress> {
  if (!progressEnabled(env)) throw new Error("Progress is not enabled.");
  const suffix =
    intent === "custom"
      ? "custom-metrics/"
      : intent === "ga"
        ? "google-analytics/"
        : "";
  const response = await createApiClient(env, request).post(
    `${PATH}${suffix}`,
    { ...body, companyId },
  );
  return response.data;
}
