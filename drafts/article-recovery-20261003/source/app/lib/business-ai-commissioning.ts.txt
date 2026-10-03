import { calculateAiPilot, type AiPilotInputs } from "./ai-pilot-economics";

export const COMMISSIONING_BRIEF_VERSION = "2026-09-10";
export const COMMISSIONING_ARTICLE_PATH = "/articles/featured/how-to-build-ai-for-real-business-problems";
export const COMMISSIONING_DOWNLOAD_PATH = "/downloads/business-ai-commissioning-brief.txt";

// All amounts, timings, volumes, roles and decisions below are invented teaching
// assumptions. They are not MLAI prices, a supplier quote or observed results.
export const COMMISSIONING_COST_ITEMS = [
  { stage: "Discovery and acceptance plan", cash: 600, evidence: "A checked scope, data/access questions and agreed test plan; no build approval implied." },
  { stage: "Draft-only prototype and test evidence", cash: 2400, evidence: "A test environment, restricted actions, versioned outputs and a complete failure log." },
  { stage: "Owner walkthrough and handover", cash: 600, evidence: "Pause/recovery/access-removal rehearsal, source/configuration and support boundaries." },
] as const;

export const COMMISSIONING_EXAMPLE_INPUTS: AiPilotInputs = {
  monthlyTasks: 120, baselineMinutes: 10, pilotMinutes: 6, hourlyCost: 45,
  maintenanceHours: 2, monthlyCashCost: 100,
  setupCashCost: COMMISSIONING_COST_ITEMS.reduce((total, item) => total + item.cash, 0),
  setupHours: 10, cashablePercent: 0,
};
export const COMMISSIONING_EXAMPLE_RESULT = calculateAiPilot(COMMISSIONING_EXAMPLE_INPUTS);
export const commissioningAud = (value: number) => `${value < 0 ? "−" : ""}A$${Math.abs(value).toLocaleString("en-AU", { maximumFractionDigits: 2 })}`;

export const COMMISSIONING_BRIEF_FIELDS = [
  { label: "Business outcome and baseline", example: "Reduce effort preparing routine enquiry replies without unsupported commitments. Fictional one-month baseline: 120 enquiries, 10 active minutes each including checking and corrections; 20 hours total. Twelve cases needed corrections within that total. No time saving has been observed." },
  { label: "User and accountable owner", example: "One enquiry coordinator uses the prototype. The operations manager owns scope, output review, pause decisions and acceptance; the business owner decides whether spending is justified. A backup reviewer must be named before any trial." },
  { label: "Trigger and expected monthly volume", example: "A coordinator deliberately selects a synthetic enquiry in the test queue. Planning volume is 120 tasks/month, not a promise that future demand is constant. No unattended inbox monitoring." },
  { label: "Permitted inputs and data owner", example: "Invented enquiries and a manager-approved public policy document, labelled Policy v1. The manager confirms permitted material. No customer inbox, customer records, credentials or confidential pricing enters this prototype." },
  { label: "Required output and human approval", example: "An internal suggested category, proposed reply and source passage, or an unresolved reason. The coordinator checks the exact draft. Nothing is sent; any later sending integration is a separate scope and approval decision." },
  { label: "Allowed actions / explicitly prohibited actions", example: "Read the permitted test materials and save an internal draft. Sending messages, refunds, booking changes, customer-record updates and price commitments are unavailable to the prototype's tools and service account, not merely forbidden by a prompt." },
  { label: "Existing systems and available test environment", example: "The existing shared inbox remains untouched. Use an isolated test queue, synthetic account identities and a restricted draft store. Provider, plan, retention and access controls are unresolved until due diligence; no live connector is approved." },
  { label: "Acceptance cases and expected results", example: "C-01: supported routine draft; C-02: missing/conflicting policy escalates; C-03: malicious instructions grant no authority; C-04: other-account access denied; C-05: timeout/retry preserves one recoverable case; C-06: revoked access rejected. Keep some cases out of development. Expected behaviour is specified; actual results are NOT RUN." },
  { label: "Critical stop conditions and manual fallback", example: "Pause on unauthorised access, an external action, an unsupported consequential commitment or lost work. Log failures, fix and retest before resuming. The manager can disable new tasks; the coordinator continues the unchanged manual inbox process." },
  { label: "Setup budget / ongoing cost ceiling / uncertainty", example: "Illustrative planning ceiling: A$3,600 external setup plus 10 internal setup hours at A$45/hour, not an authorised purchase. Allow A$100/month additional cash costs and two internal support hours. Actual provider/support prices are unknown; require a scoped quote and stop/requote before exceeding agreed limits." },
  { label: "Deliverables, access ownership and support boundary", example: "Request source/configuration, dependency and account inventory, test inputs/results, failure/usage logs and an owner walkthrough. Business-controlled accounts and licences must be agreed in real terms. The example assumes one handover session; ongoing monitoring, incident cover and new integrations are not silently included." },
  { label: "Version, change approval and review record", example: "Label the prototype, prompts, model/settings, Policy v1 and test cases in each review record. The operations manager approves material changes and requires affected cases to be rerun. A later send action needs a new scope and approval tied to its exact recipient/content/version." },
  { label: "Decision date and unresolved questions", example: "Review before accepting a build proposal, after the template comparison, access review and actual quote are available. Date: to be agreed. Decision: NOT APPROVED. The cash-saving case is negative under these assumptions; do not commission on a payroll-saving promise. No supplier, paid discovery, trial or release is authorised by this example." },
] as const;

export const PROJECT_BRIEF_TEMPLATE = [
  "AI workflow brief — replace prompts with your own non-confidential facts",
  ...COMMISSIONING_BRIEF_FIELDS.map(field => `${field.label}:`),
].join("\n");

export const COMMISSIONING_HANDOVER_STEPS = [
  { owner: "Builder", check: "Demonstrate C-01 to C-06 on the labelled version, including failures and held-out cases. Supply actual evidence; no screenshot alone proves access enforcement." },
  { owner: "Operations manager and backup", check: "Rehearse pausing new tasks, finding unresolved work, restoring the manual process and removing the builder's test access. Record who can do each action without the builder." },
  { owner: "Business owner", check: "Review quality, whole-task effort, actual cost, unresolved risks and support terms. Record accept / change scope / reject; do not treat a paid invoice or delivered code as acceptance." },
] as const;

export function commissioningBriefText() {
  const r = COMMISSIONING_EXAMPLE_RESULT;
  return [
    `MLAI business AI commissioning record — ${COMMISSIONING_BRIEF_VERSION}`,
    `Article: https://mlai.au${COMMISSIONING_ARTICLE_PATH}`,
    "Editorial scoping aid, not a contract, financial forecast or legal/compliance advice.",
    "Use non-confidential facts. The completed example is entirely fictional: no client results, MLAI price or supplier quote.",
    "", "BLANK BRIEF", PROJECT_BRIEF_TEMPLATE,
    "", "COMPLETED FICTIONAL BRIEF — NO PURCHASE OR RELEASE APPROVED",
    ...COMMISSIONING_BRIEF_FIELDS.map((field, index) => `\n${index + 1}. ${field.label}:\n${field.example}`),
    "", "ILLUSTRATIVE COST RECORD — NOT A QUOTE; CONSISTENT AUD/GST BASIS",
    ...COMMISSIONING_COST_ITEMS.map(item => `${item.stage}: ${commissioningAud(item.cash)}. Evidence requested: ${item.evidence}`),
    `External setup cash: ${commissioningAud(COMMISSIONING_EXAMPLE_INPUTS.setupCashCost)}. Internal setup: 10 x A$45 = A$450. Total economic setup: ${commissioningAud(r.setupEconomicCost)}.`,
    "Baseline: 120 x 10 / 60 = 20 human hours/month, including existing checking and corrections.",
    "Unmeasured assisted assumption: 120 x 6 / 60 = 12 hours/month, including review, correction and average manual fallback.",
    `Additional internal maintenance: 2 hours/month. Net capacity release: ${r.netHours} hours/month.`,
    `Net capacity value after A$100 running cash costs: ${commissioningAud(r.netCapacityValue)}/month. This is not profit.`,
    `Avoidable labour spending: A$0. Monthly cash change: ${commissioningAud(r.monthlyCashChange)}. No positive cash payback under these assumptions.`,
    "Additional revenue, taxes, financing, seasonal changes and unmeasured error benefits are excluded. Do not count internal hours again inside external cash costs.",
    "Decision: NOT APPROVED. Compare a clearer policy/template, obtain actual quotes and measure the unmet need before committing. Six released salaried hours do not fund the setup invoice.",
    "", "PROPOSED HANDOVER — NOT YET PERFORMED",
    ...COMMISSIONING_HANDOVER_STEPS.map(step => `${step.owner}: ${step.check}`),
    "", "ACCEPTANCE RECORD TO COMPLETE AFTER ACTUAL TESTING",
    "Prototype / model / prompt / policy / case-set versions:",
    "Case ID / expected result / actual result and evidence reference:",
    "Reviewer / date / pass, fail, unresolved or not run:",
    "Critical error / exception / review and fallback effort:",
    "Actual setup and running costs; comparison with agreed limits:",
    "Pause / recovery / access-removal demonstration evidence:",
    "Unresolved issues, support boundaries and authorised decision:",
    "A small test set does not establish general reliability. Keep failed cases. This file supplies no executed test evidence.",
    "", "Optional enquiry: https://mlai.au/mlai-studio/start-project",
    "Request a discussion of fit; no promise of acceptance, free assessment, availability or savings.",
    "", "SOURCE ROLES — checked 10 September 2026",
    "ACSC: small-business data, output and supplier-risk controls; not support for the example's prices or savings.",
    "https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business",
    "OAIC: commercial-AI privacy due diligence and publicly available generative-AI cautions; not a determination of this project's compliance.",
    "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products",
    "",
  ].join("\n");
}
