// Actual recorded output is checked against executable downloads before build.
export const EVENT_REPLY_LAB = {
  version: "event-reply-lab-v1", checked: "2026-09-10",
  runtime: "Node 25.2.1 on macOS arm64", trainingExamples: 12,
  evaluationCases: 8, baselineCorrect: 4, candidateCorrect: 6, tests: 14,
  exampleQuestion: "At which hour does it commence",
  exampleDraft: "Start: 18 February 2026, 18:00 Australia/Melbourne.",
  failureQuestion: "I know the start time; tell me about parking",
} as const;
export const EVENT_REPLY_FILES = [
  { name: "model.mjs", purpose: "Required: the fitted classifier and independent rules baseline" },
  { name: "lab.mjs", purpose: "Required: input, evidence and response boundaries plus the runner" },
  { name: "synthetic-fixture.json", purpose: "Required: invented training questions, notices and all eight evaluation cases" },
  { name: "lab.test.mjs", purpose: "Run the 14 executable calculation, boundary and failure checks" },
  { name: "recorded-result.json", purpose: "Compare every prediction, draft and citation with the recorded output" },
  { name: "README.md", purpose: "Setup, source roles, failures, disable instructions and editable handover checklist" },
].map(file => ({ ...file, href: `/downloads/event-reply-lab/${file.name}` }));
