import type {
  ControllerSpec,
  InitResponse,
  RunResponse,
  ScenarioSummary,
  SimulationState,
  StepResponse,
} from "./types";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

// Resolve the WTH sandbox FastAPI backend URL.
// - Vite uses import.meta.env, NOT process.env (Next.js convention).
// - On mlai.au production, the sandbox proxies through the Vercel-hosted
//   WTH frontend which has the FastAPI backend behind it.
const baseUrl = (): string => {
  assertWattTheHackPublicAccessEnabled();

  // Explicit override always wins (set in .dev.vars or Cloudflare dashboard)
  const configured = (typeof import.meta !== "undefined" && import.meta.env?.VITE_WTH_SANDBOX_API_URL) || "";
  if (configured) return configured;

  // Hostname-based resolution (mirrors app/lib/api.ts pattern)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.endsWith(".localhost")
    ) {
      return DEFAULT_BASE_URL;
    }
    // Production: WTH sim API is served by the Django backend
    return "https://api.mlai.au/api/v1/hackathons/watt-the-hack";
  }

  return DEFAULT_BASE_URL;
};

import { axiosInstance } from "../api";

async function post<T>(path: string, body: unknown): Promise<T> {
  const url = `${baseUrl()}${path}`;
  try {
    const response = await axiosInstance.post(url, body);
    return response.data as T;
  } catch (error: any) {
    const status = error.response?.status || "Unknown";
    const text = error.response?.data ? JSON.stringify(error.response.data) : error.message;
    throw new Error(`API ${path} failed: ${status} ${text}`);
  }
}

export async function fetchInit(
  steps?: number,
  scenarioId?: string | null,
): Promise<InitResponse> {
  const body: Record<string, unknown> = {};
  if (steps) body.steps = steps;
  if (scenarioId) body.scenario_id = scenarioId;
  return post<InitResponse>("/sim/init/", body);
}

export async function fetchScenarios(): Promise<ScenarioSummary[]> {
  const url = `${baseUrl()}/sim/scenarios/`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as ScenarioSummary[];
  } catch (error: any) {
    const status = error.response?.status || "Unknown";
    throw new Error(`API /sim/scenarios/ failed: ${status}`);
  }
}

export async function fetchStep(
  state: SimulationState,
  controller: ControllerSpec,
): Promise<StepResponse> {
  return post<StepResponse>("/sim/step/", { state, controller });
}

export async function fetchRun(
  state: SimulationState,
  controller: ControllerSpec,
  steps: number,
): Promise<RunResponse> {
  return post<RunResponse>("/sim/run/", { state, controller, steps });
}
