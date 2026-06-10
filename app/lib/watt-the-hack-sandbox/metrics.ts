/**
 * Metrics accumulation.
 *
 * Mirrors watt_the_hack/metrics/metrics.py. The leaderboard sorts by
 * raw cost ascending, so `final_score` is the accumulated step cost.
 * No weighted aggregation, no baseline-normalised score — those lived
 * in the engine until the scoring simplification and are gone now.
 */

import type {
  MetricsSummary,
  SimulationOutputs,
  SimulationState,
} from "./types";

export const DT_HOURS = 0.25;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface MetricsAccumulator {
  dt_hours: number;
  demandServedSum: number;
  demandSum: number;
  gridStabilitySum: number;
  costSum: number;
  unmetDemandSum: number;
  previousGridPower: number | null;
  breakdownTotals: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function createMetrics(dtHours: number = DT_HOURS): MetricsAccumulator {
  return {
    dt_hours: dtHours,
    demandServedSum: 0,
    demandSum: 0,
    gridStabilitySum: 0,
    costSum: 0,
    unmetDemandSum: 0,
    previousGridPower: null,
    breakdownTotals: {},
  };
}

export function updateMetrics(
  acc: MetricsAccumulator,
  state: SimulationState,
  outputs: SimulationOutputs,
): MetricsAccumulator {
  const next: MetricsAccumulator = {
    ...acc,
    breakdownTotals: { ...acc.breakdownTotals },
  };

  const demand = state.demand ?? 0;
  const gridPower = outputs.net_grid_power ?? 0;
  const emergencyKw = outputs.emergency_generator ?? 0;
  const unmetDemand = outputs.unmet_demand ?? 0;
  const stepCost = outputs.step_cost ?? 0;

  const cleanLocal = Math.max(0, demand - Math.max(0, gridPower) - emergencyKw);
  next.demandServedSum += cleanLocal;
  next.demandSum += demand;
  next.costSum += stepCost;
  next.unmetDemandSum += unmetDemand * next.dt_hours;

  for (const [key, value] of Object.entries(outputs.cost_breakdown ?? {})) {
    if (typeof value === "number" && Number.isFinite(value)) {
      next.breakdownTotals[key] = (next.breakdownTotals[key] ?? 0) + value;
    }
  }

  if (next.previousGridPower !== null) {
    const ramp = gridPower - next.previousGridPower;
    next.gridStabilitySum -= ramp * ramp;
  }
  next.previousGridPower = gridPower;

  return next;
}

export function summariseMetrics(acc: MetricsAccumulator): MetricsSummary {
  const renewable_ratio =
    acc.demandSum > 0 ? acc.demandServedSum / acc.demandSum : 0;

  return {
    renewable_ratio,
    grid_stability: acc.gridStabilitySum,
    cost: acc.costSum,
    unmet_demand_total: acc.unmetDemandSum,
    final_score: acc.costSum,
  };
}
