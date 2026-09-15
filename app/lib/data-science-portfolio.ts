// Recorded local output of workload-forecast-v1, not client or hiring outcomes.
// Prebuild tests rerun the executable fixture and require exact JSON agreement.
export const DATA_SCIENCE_PORTFOLIO = {
  version: "workload-forecast-v1",
  checked: "2026-09-10",
  runtime: "Node 25.2.1 on macOS arm64",
  trainingDays: 28,
  evaluationDays: 14,
  baselineAbsoluteError: 21,
  candidateAbsoluteError: 84,
  baselineMae: 1.5,
  candidateMae: 6,
  firstWeek: { baselineMae: 1, candidateMae: 4 },
  secondWeek: { baselineMae: 2, candidateMae: 8 },
  example: { date: "2026-02-09", actual: 26, baseline: 30, candidate: 35.5, baselineError: 4, candidateError: 9.5 },
} as const;

export const DATA_SCIENCE_PORTFOLIO_FILES = [
  { name: "forecast.mjs", purpose: "Required: fitting, forecasting, scoring and command-line runner" },
  { name: "synthetic-workload.json", purpose: "Required: all 42 invented daily records" },
  { name: "forecast.test.mjs", purpose: "Required for verification: 11 executable tests" },
  { name: "recorded-result.json", purpose: "Compare your output with the complete recorded local result" },
  { name: "README.md", purpose: "Setup, failure analysis, limitations and editable portfolio checklist" },
].map(file => ({ ...file, href: `/downloads/data-science-portfolio/${file.name}` }));
