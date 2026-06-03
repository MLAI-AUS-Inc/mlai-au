import type {
  ControllerSpec,
  InitResponse,
  RunResponse,
  ScenarioSummary,
  SimulationState,
  StepResponse,
} from "./types";

const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

// Resolve the WTH sandbox FastAPI backend URL.
// - Vite uses import.meta.env, NOT process.env (Next.js convention).
// - On mlai.au production, the sandbox proxies through the Vercel-hosted
//   WTH frontend which has the FastAPI backend behind it.
const baseUrl = (): string => {
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
    // Production: WTH sandbox API is hosted at the Vercel deployment
    return "https://watt-the-hack.vercel.app";
  }

  return DEFAULT_BASE_URL;
};

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${baseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${path} failed: ${response.status} ${text}`);
  }

  return (await response.json()) as T;
}

export async function fetchInit(
  steps?: number,
  scenarioId?: string | null,
): Promise<InitResponse> {
  const body: Record<string, unknown> = {};
  if (steps) body.steps = steps;
  if (scenarioId) body.scenario_id = scenarioId;
  return post<InitResponse>("/sim/init", body);
}

export async function fetchScenarios(): Promise<ScenarioSummary[]> {
  const response = await fetch(`${baseUrl()}/sim/scenarios`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`API /sim/scenarios failed: ${response.status}`);
  }
  return (await response.json()) as ScenarioSummary[];
}

export async function fetchStep(
  state: SimulationState,
  controller: ControllerSpec,
): Promise<StepResponse> {
  return post<StepResponse>("/sim/step", { state, controller });
}

export async function fetchRun(
  state: SimulationState,
  controller: ControllerSpec,
  steps: number,
): Promise<RunResponse> {
  return post<RunResponse>("/sim/run", { state, controller, steps });
}
