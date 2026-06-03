import type {
  ControllerSpec,
  InitResponse,
  RunResponse,
  ScenarioSummary,
  SimulationState,
  StepResponse,
} from "./types";

const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

const baseUrl = (): string =>
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;

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
