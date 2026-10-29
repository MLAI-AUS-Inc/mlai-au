// Fictional owner-scoping record, not a customer outcome or an implemented connector.
export const COLLABORATION_HANDOFF_VERSION = "2026-09-11";
export const COLLABORATION_HANDOFF_DOWNLOAD = "/downloads/collaboration-handoff.txt";
export const HANDOFF_FIELDS = [
  { label: "Workflow and business consequence of a missed handoff", example: "Accepted quote to scheduling in a fictional 12-person service business. Missed requests create chasing and rework; no lost-revenue amount is assumed." },
  { label: "Trigger / current source of truth / unique record ID", example: "Sales marks a quote ready in the existing approved-quote register. Q-104 plus approved version identifies the handoff. Chat and the scheduling board link to that record; neither becomes the approval authority." },
  { label: "Required information and who checks it", example: "Sales checks the approved scope, approval evidence, version and permitted contact reference. The scheduler checks completeness before accepting. These are fictional placeholders, not customer records." },
  { label: "Sending owner / receiving owner / backup owner", example: "Sales lead sends; duty scheduler accepts; operations manager is the authorised backup and decision owner. A notification or read receipt does not transfer responsibility." },
  { label: "Definition of ready / explicit acceptance by receiver", example: "Complete approved version is ready. The receiver records acceptance of that exact version. Missing approval or an unavailable authorised receiver stays visibly unresolved; no service date is promised." },
  { label: "Allowed changes / actions requiring human approval", example: "An alert may link to the task. Price, scope, acceptance and customer commitments require the responsible person's decision. A later Q-104 version goes back for review instead of silently replacing accepted work." },
  { label: "Missing information, duplicate and absence handling", example: "Missing approval: HOLD. Same ID/version repeated: find the existing handoff. Changed version: review the difference. Absent scheduler: named authorised backup, otherwise manual queue. These rules have not been implemented or tested." },
  { label: "Access groups / offboarding / export and recovery owner", example: "Sales may mark ready; scheduling may read permitted scope and accept; the operations manager manages the backup and unresolved queue. Unrelated customer records stay excluded. The administrator must demonstrate account removal and recovery before a live trial." },
  { label: "Baseline period, case count, active minutes and rework", example: "Invented baseline week: 40 handoffs at 12 active minutes each = 480 minutes. Six required chasing/correction, already included in that time. No actual baseline was collected." },
  { label: "Pilot period, comparable cases and exception log", example: "Proposed next comparable 40 cases: target 7 active minutes each, including case review/rework, plus 80 minutes of additional weekly oversight. Cases H-01 to H-06 below are NOT RUN. Keep missed requests and difficult cases; do not select only easy transfers." },
  { label: "Setup cost / ongoing cost / cash spending actually avoidable", example: "Process-only planning assumption: 3 internal setup hours; existing subscriptions unchanged if their controls are adequate. At an invented A$50/hour, setup capacity is valued at A$150, not an extra cash invoice. No payroll reduction or extra contribution is evidenced." },
  { label: "Stop conditions / manual fallback / decision owner and date", example: "Stop on a lost request, unauthorised access or unapproved commitment. Retain the approved-quote register and a reconciled manual queue. Operations manager decides after reviewing exceptions and actual effort; review date is not yet set. NOT APPROVED for live use." },
] as const;

export const HANDOFF_WORKSHEET = ["Handoff worksheet — use non-confidential examples", ...HANDOFF_FIELDS.map(field => field.label + ":")].join("\n");
export const HANDOFF_PLANNING_OPTIONS = [
  { name: "Process-only trial", setupHours: 3, setupCash: 0, monthlyCash: 0, costLimit: "Zero additional cash assumes existing plans already provide the required controls; confirm that first.", upkeep: "Planning allowance: 80 extra minutes/week of queue review and maintenance, beyond per-case handling. Operations manager owns it.", access: "No connector account. Check sender/receiver access, absence cover and export of unresolved work in the existing tools.", decision: "First candidate: test the ownership and acceptance rules manually. No AI needed. A failed required control blocks the trial." },
  { name: "Configure existing tools", setupHours: 6, setupCash: 200, monthlyCash: 30, costLimit: "Invented external setup and monthly-upgrade allowances, not supplier prices. Training and testing are included in the six internal hours only as a planning assumption.", upkeep: "Planning allowance: 45 extra minutes/week for rule and exception checks. Administrator maintains configuration; actual support effort is unmeasured.", access: "Demonstrate the exact plan's permissions, version history, duplicate behaviour, access removal and export. No feature is assumed available.", decision: "Investigate if the manual trial identifies a requirement the current setup cannot reliably meet. Measure handling time again; no saving is assumed." },
  { name: "Scoped integration", setupHours: null, setupCash: null, monthlyCash: null, costLimit: "Unknown — obtain a quote covering discovery, implementation, testing, handover and tax basis. Include internal setup, licences, API use and support.", upkeep: "Unknown review, failure-recovery and maintenance effort. Name a business owner and agree supplier support/exit terms before committing.", access: "A restricted connector must demonstrate source/version checks, duplicate recovery and revoked access. Retain a manual fallback and usable export.", decision: "Only after a demonstrated cross-tool gap remains. Unknown cost or an untested control is not a passing comparison; AI is optional, not the default." },
] as const;
export const HANDOFF_EFFORT = { cases: 40, baselineMinutesPerCase: 12, plannedMinutesPerCase: 7, extraOversightMinutes: 80, hourlyCapacityValue: 50 } as const;
export const HANDOFF_CAPACITY_MINUTES = HANDOFF_EFFORT.cases * (HANDOFF_EFFORT.baselineMinutesPerCase - HANDOFF_EFFORT.plannedMinutesPerCase) - HANDOFF_EFFORT.extraOversightMinutes;
export const HANDOFF_ACCEPTANCE_CASES = [
  { id: "H-01", case: "Approved, complete request", expected: "One task links to the exact approved version; receiver acceptance is separate.", evidence: "Record ID, version, task link and acceptance history." },
  { id: "H-02", case: "Missing approval", expected: "Visible unresolved reason; no commitment sent.", evidence: "Exception queue and outbound-message history." },
  { id: "H-03", case: "Duplicate trigger or retry", expected: "No duplicate task or customer action.", evidence: "Repeated-input test and record count." },
  { id: "H-04", case: "Scope changed after acceptance", expected: "Flag for review; accepted version remains traceable.", evidence: "Before/after versions and review decision." },
  { id: "H-05", case: "Owner absent or access revoked", expected: "Authorised backup sees the exception; revoked accounts cannot read or change it.", evidence: "Tests with relevant accounts, not only an administrator." },
  { id: "H-06", case: "Integration unavailable", expected: "Original request stays recoverable; visible failure and manual queue.", evidence: "Simulated outage, alert and recovery without duplicates; for a process-only trial test the equivalent tool outage." },
] as const;

export function handoffSetupCost(option: typeof HANDOFF_PLANNING_OPTIONS[number]): number | null {
  return option.setupHours === null || option.setupCash === null ? null : option.setupCash + option.setupHours * HANDOFF_EFFORT.hourlyCapacityValue;
}

export function collaborationHandoffText() {
  return [
    `MLAI collaboration handoff record — ${COLLABORATION_HANDOFF_VERSION}`,
    "Article: https://mlai.au/articles/featured/what-are-collaboration-tools",
    "Owner-scoping aid, not a contract, quote, financial forecast or compliance approval.",
    "All example roles, cases, timings and costs are fictional. Independent review pending.",
    "No live system, client experiment, cost saving, access test or handover was performed.",
    "", "COMPLETED FICTIONAL HANDOFF — NOT APPROVED FOR LIVE USE",
    ...HANDOFF_FIELDS.map((field, i) => `\n${i + 1}. ${field.label}:\n${field.example}`),
    "", "COMPARE THE THREE PATHS — PLANNING ASSUMPTIONS, NOT SUPPLIER PRICES",
    "Use one consistent cost/tax basis; confirm actual quote terms. A$50/hour is an invented internal capacity valuation, not an avoidable payroll cost.",
    ...HANDOFF_PLANNING_OPTIONS.flatMap(option => [
      "", option.name,
      `Internal setup: ${option.setupHours === null ? "unknown" : option.setupHours + " hours"}; external setup cash: ${option.setupCash === null ? "unknown" : "A$" + option.setupCash}; incremental monthly cash: ${option.monthlyCash === null ? "unknown" : "A$" + option.monthlyCash}.`,
      `Known setup economic value: ${handoffSetupCost(option) === null ? "unknown, not zero" : "A$" + handoffSetupCost(option)}. ${option.costLimit}`,
      `Review/maintenance: ${option.upkeep}`, `Access and exit: ${option.access}`, `Decision: ${option.decision}`,
    ]),
    "", "EFFORT CHECK — ARITHMETIC, NOT AN OBSERVED RESULT",
    "40 x 12 = 480 baseline person-minutes; 40 x 7 = 280 planned case person-minutes.",
    `480 - 280 - 80 additional oversight = ${HANDOFF_CAPACITY_MINUTES} minutes (two hours) of potential capacity, not cash savings.`,
    "Baseline chasing/correction is already included. Extra rework outside the seven-minute assumption must be added, not hidden. Different case mixes invalidate a simple comparison.",
    "No payroll saving or additional contribution is evidenced. Do not count the same capacity as both cash savings and revenue. Setup and subscriptions still matter.",
    "", "ACCEPTANCE PLAN — ALL CASES NOT RUN",
    ...HANDOFF_ACCEPTANCE_CASES.map(row => `${row.id}: ${row.case}\nExpected: ${row.expected}\nEvidence required: ${row.evidence}\nActual: NOT RUN; reviewer unassigned.`),
    "", "DECISION: prepare a process-only trial; no live trial, purchase or build approved.",
    "Change the decision only after sender/receiver agreement, required controls demonstrated, a representative baseline and actual test/cost evidence. Unknown is not pass.",
    "", "BLANK HANDOFF — REPLACE WITH YOUR OWN NON-CONFIDENTIAL FACTS", HANDOFF_WORKSHEET,
    "", "ACTUAL CASE LOG (copy one block for each case; keep failures)",
    "Case ID / input / approved source version:", "Expected result / actual result / evidence reference:",
    "Case handling, review, rework and extra maintenance minutes (avoid double counting):",
    "Reviewer / date / pass, fail, unresolved or not run:", "Change, retest and owner decision:",
    "", "OPTIONAL ENQUIRY: https://mlai.au/mlai-studio/start-project",
    "Describe the remaining handoff problem, existing systems, access limits and tests. This record is not automatically attached; no acceptance, availability, free assessment or savings are promised.",
    "", "SOURCE ROLES — checked 11 September 2026",
    "ACSC: cloud access, configuration, incident and recovery responsibilities; not support for fictional timings or costs.",
    "https://www.cyber.gov.au/business-government/protecting-devices-systems/cloud-computing/cloud-shared-responsibility-model-guidance-for-individuals-and-small-and-medium-businesses",
    "OAIC: commercial-AI due diligence and privacy cautions; not a determination that this example is compliant.",
    "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products",
    "Use permitted material only. Do not share customer names, credentials or confidential commercial details in a public article form or enquiry.", "",
  ].join("\n");
}
