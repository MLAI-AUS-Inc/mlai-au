export type AiPilotInputs = {
  monthlyTasks: number;
  baselineMinutes: number;
  pilotMinutes: number;
  hourlyCost: number;
  maintenanceHours: number;
  monthlyCashCost: number;
  setupCashCost: number;
  setupHours: number;
  cashablePercent: number;
};

/** Illustrative inputs, not observed client results, prices or recommended budgets. */
export const EXAMPLE_AI_PILOT: AiPilotInputs = {
  monthlyTasks: 60, baselineMinutes: 20, pilotMinutes: 8, hourlyCost: 45,
  maintenanceHours: 2, monthlyCashCost: 100, setupCashCost: 600,
  setupHours: 6, cashablePercent: 0,
};

export const AI_PILOT_EVALUATION_TEMPLATE = [
  "EVALUATION SHEET — complete before and during your test",
  "This blank record is not a passed test. Use synthetic/permitted inputs; do not put customer records or credentials in this file.",
  "Accountable owner / reviewer / review date:",
  "Product/model/configuration and source-document versions:",
  "Allowed output/actions / prohibited actions / technical enforcement:",
  "Baseline method and representative case-selection period:",
  "Development case IDs (used to change prompts or configuration):",
  "Held-out evaluation case IDs (not used to tune this version):",
  "Quality requirements / consequential stop errors / time and cash caps:",
  "Manual fallback / person who can pause the system and revoke access:",
  "",
  "Copy one case record per normal, missing, conflicting, malicious-input, duplicate or outage case:",
  "Case ID / type / input reference / development or held-out:",
  "Expected result and why it is acceptable:",
  "Actual output/reference and any external action (NOT RUN until observed):",
  "Reviewer decision: pass / fail / unresolved / not run:",
  "Error severity and consequence; critical failures stop this pilot:",
  "Baseline active minutes / assisted review + correction + fallback minutes:",
  "Extra usage/cash cost / follow-up / reviewer and date:",
  "",
  "Fictional planned example — NOT RUN, not an MLAI evaluation result:",
  "Case: a product description input lacks warranty information.",
  "Expected: leave warranty unresolved and request staff review; no invented promise or publication.",
  "Actual result: NOT RUN. Reviewer: unassigned. Timing/cost: not measured.",
  "Proposed stop rule: an unsupported consequential claim or unapproved publication pauses the pilot.",
  "",
  "Decision record: continue / revise and retest / stop / insufficient evidence:",
  "Evidence and unresolved cases supporting the decision:",
  "All evaluated case counts, including failures and manual fallbacks:",
  "Comparable workload and total human effort; setup counted separately:",
  "Owner, conditions for expansion and next review date:",
  "A handful of examples is a smoke test, not evidence of general reliability. Do not discard failed cases or call an unrun case a pass.",
].join("\n");

export function calculateAiPilot(inputs: AiPilotInputs) {
  for (const key of Object.keys(EXAMPLE_AI_PILOT) as (keyof AiPilotInputs)[]) {
    const value = inputs[key];
    if (!Number.isFinite(value) || value < 0 || value > 1e9) throw new RangeError(`Invalid ${key}`);
  }
  if (!Number.isInteger(inputs.monthlyTasks) || inputs.cashablePercent > 100) throw new RangeError("Invalid task count or cashable share");
  const releasedHours = inputs.monthlyTasks * (inputs.baselineMinutes - inputs.pilotMinutes) / 60;
  const netHours = releasedHours - inputs.maintenanceHours;
  const capacityValue = netHours * inputs.hourlyCost;
  const netCapacityValue = capacityValue - inputs.monthlyCashCost;
  // Existing payroll does not disappear when work takes less time. The owner
  // must justify this share as avoidable spending, not a productivity guess.
  // Any extra cash labour required by a slower pilot belongs in monthlyCashCost.
  const avoidableLabourSpend = Math.max(0, capacityValue) * inputs.cashablePercent / 100;
  const monthlyCashChange = avoidableLabourSpend - inputs.monthlyCashCost;
  return {
    releasedHours, netHours, capacityValue, netCapacityValue,
    avoidableLabourSpend, monthlyCashChange,
    setupEconomicCost: inputs.setupCashCost + inputs.setupHours * inputs.hourlyCost,
    cashPaybackMonths: monthlyCashChange > 0 ? inputs.setupCashCost / monthlyCashChange : null,
  };
}

export function aiPilotText(inputs: AiPilotInputs, brief: string) {
  const result = calculateAiPilot(inputs);
  return [
    "MLAI AI pilot worksheet — estimate, not a measured result or financial advice",
    "Currency: AUD. Use consistent treatment of GST throughout. Values are monthly unless stated.",
    "Workflow / scope / acceptance / stop rule:", brief || "Not yet supplied",
    "", "Inputs:", ...Object.entries(inputs).map(([key, value]) => `${key}: ${value}`),
    "", "Results:", ...Object.entries(result).map(([key, value]) => `${key}: ${value === null ? "No positive cash payback under these assumptions" : value.toFixed(2)}`),
    "", "Pilot minutes must include human review, correction and fallback work.",
    "Cashable share means spending you can actually avoid. Released salaried time alone is not cash savings.",
    "Monthly cash costs must include additional labour cash outlays, subscriptions, API use and external support without double counting.",
    "No revenue uplift, tax, discounting, seasonality or unmeasured quality benefit is included.",
    "Check representative cases and consequential errors before deciding to continue. This calculation is not a release approval.",
    "", AI_PILOT_EVALUATION_TEMPLATE,
  ].join("\n");
}
