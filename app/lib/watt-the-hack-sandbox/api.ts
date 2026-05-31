import type {
  ControllerSpec,
  InitResponse,
  RunResponse,
  ScenarioSummary,
  SimulationState,
  StepResponse,
} from "./types";

import { API_URL } from "~/lib/api";

const SIM_BASE_PATH = "/api/v1/hackathons/watt-the-hack/sim";

const apiUrl = (path: string): string => `${API_URL}${SIM_BASE_PATH}${path}`;

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    credentials: "include",
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
  return post<InitResponse>("/init/", body);
}

export async function fetchScenarios(): Promise<ScenarioSummary[]> {
  const response = await fetch(apiUrl("/scenarios/"), {
    method: "GET",
    cache: "no-store",
    credentials: "include",
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
  return post<StepResponse>("/step/", { state, controller });
}

export async function fetchRun(
  state: SimulationState,
  controller: ControllerSpec,
  steps: number,
): Promise<RunResponse> {
  return post<RunResponse>("/run/", { state, controller, steps });
}
