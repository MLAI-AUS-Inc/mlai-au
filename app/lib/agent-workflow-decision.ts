import { calculateAiPilot, type AiPilotInputs } from './ai-pilot-economics';

export const AGENT_DECISION_VERSION = '2026-09-11';
export const AGENT_DECISION_DOWNLOAD = '/downloads/agent-workflow-decision.txt';
export const agentDecisionMoney = (value: number) => `${value < 0 ? '−' : ''}A$${Math.abs(value).toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;
export const agentDecisionMinutes = (hours: number) => Math.round(hours * 60);
// A common invented workload, not observations, prices or an agent benchmark.
const common: AiPilotInputs = { monthlyTasks: 50, baselineMinutes: 8, pilotMinutes: 5, hourlyCost: 60, maintenanceHours: 100 / 60, monthlyCashCost: 50, setupCashCost: 400, setupHours: 6, cashablePercent: 0 };
export const AGENT_DESIGN_OPTIONS = [
  { name: 'Fixed automation', inputs: { ...common, pilotMinutes: 6, maintenanceHours: 1, monthlyCashCost: 20, setupCashCost: 150, setupHours: 3 },
    cash: { subscription: 10, usage: 0, externalSupport: 10, extraLabour: 0 },
    caseDecision: 'Required-field rules can flag the missing unit and route M-104 to a person. Do not guess which access note applies.',
    error: 'A weak rule may accept an incomplete request. A scheduler checks completeness; missed details and recovery costs are not measured.',
    owner: 'Office manager owns the rule list, checks rejected requests and fixes changed field requirements.',
    next: 'Prepare an improved-form and manual-queue trial first; no live trial is approved.' },
  { name: 'AI-assisted workflow', inputs: common,
    cash: { subscription: 20, usage: 10, externalSupport: 20, extraLabour: 0 },
    caseDecision: 'A fixed extraction-and-review sequence could draft the question from the request and both notes. Conflicting access information still needs a person.',
    error: 'A draft may omit a conflict or invent a booking. Office staff must inspect the original and every proposed commitment; sending remains unavailable.',
    owner: 'Office manager reviews drafts; the implementer maintains extraction versions, source references and the failure queue.',
    next: 'Consider only if the improved form leaves a material free-text burden. The planned 50-minute release is not an observed gain.' },
  { name: 'Bounded agent', inputs: { ...common, pilotMinutes: 4, maintenanceHours: 3, monthlyCashCost: 90, setupCashCost: 900, setupHours: 12 },
    cash: { subscription: 20, usage: 30, externalSupport: 40, extraLabour: 0 },
    caseDecision: 'Choosing which permitted note to read cannot establish which conflicting note is current. M-104 does not demonstrate a need for dynamic tool choice.',
    error: 'Wrong lookups, looping and cross-record access add failure paths. Read-only permissions, limits and review still require verification.',
    owner: 'Office manager handles unresolved work and can request a pause; the implementer owns access revocation, limit enforcement and incident diagnosis.',
    next: 'No agent justified yet. Require evidence of useful variable decisions that the simpler workflow cannot handle, within tested boundaries.' },
] as const;
export const AGENT_DESIGN_COSTS = AGENT_DESIGN_OPTIONS.map(option => calculateAiPilot(option.inputs));
export const AGENT_SLOW_REVIEW = calculateAiPilot({ ...common, pilotMinutes: 7 });

export const AGENT_CASE_RECORDS = [
  { id: 'M-104', type: 'Invented incoming request', text: 'The storeroom light is flickering. Please arrange someone next week. Site: Example Works. Unit and on-site contact are not supplied.' },
  { id: 'ACCESS-A / v1', type: 'Invented permitted access note', text: 'Reception handles access for Example Works.' },
  { id: 'ACCESS-B / v2', type: 'Invented permitted access note', text: 'A nominated unit contact must arrange access. No contact name is recorded.' },
  { id: 'CURRENT STATUS', type: 'Unresolved source state', text: 'No effective dates or confirmed replacement relationship were supplied. A larger version label alone does not resolve the conflict. Actual source lookup, model output and safety assessment: NOT RUN.' },
] as const;

export const AGENT_APPROVAL_STEPS = [
  { step: '1. Prepare D-1', record: 'Proposed clarification to maintenance-contact@example.invalid: “Please confirm the unit and access contact. No visit time is confirmed.”', expected: 'Internal draft only. The current design has no send capability. The address and wording are synthetic.', evidence: 'Original M-104, both access-note versions, draft D-1 and recipient identity.' },
  { step: '2. Approval A-1', record: 'In a separately proposed future send test, the office manager would approve only recipient maintenance-contact@example.invalid, action send-clarification and exact content D-1.', expected: 'A-1 is not a general permission to book work or approve a different message. This step has not occurred.', evidence: 'Approver authority, allowed action, immutable approved payload/version and approval status at execution.' },
  { step: '3. Changed draft D-2', record: 'The test changes the text to “A technician is booked for 9 am.” and retries using A-1.', expected: 'Reject the stale approval; no send. Booking commitments also remain prohibited, even if a model asks for approval.', evidence: 'D-1 versus D-2, attempted approval reference, downstream rejection and absence of a send in the delivery system.' },
  { step: '4. Recover the work', record: 'Expected recovery: retain M-104 and the failed attempt; discard D-2 and return the request to the office manager’s unresolved queue.', expected: 'Clarify the source conflict manually before a new draft. An already sent message cannot be undone merely by restoring records.', evidence: 'Queue item, responsible owner, preserved source and retry history. All four demonstration steps: NOT RUN.' },
] as const;

export const AGENT_COMPLETED_FIELDS = [
  { label: 'Workflow owner and business outcome', value: 'Fictional maintenance-office manager; give a scheduler a complete administrative request without promising a price, attendance time or safety assessment. No client has approved this brief.' },
  { label: 'Current steps and non-AI alternative', value: 'Staff read the request, inspect required fields and resolve omissions. Improve the form and retain a visible manual queue before adding AI.' },
  { label: 'Decision that cannot use a fixed rule, with an example', value: 'M-104 has two access notes with no established current authority. Dynamic lookup cannot decide which is true. No evidence yet that an agent is necessary.' },
  { label: 'Permitted information and access scope', value: 'Only the supplied invented M-104 and ACCESS-A/v1, ACCESS-B/v2 records for preparation. Live data permission and vendor retention remain unresolved; no customer credentials.' },
  { label: 'Read-only tools and allowed draft outputs', value: 'If later built, selected authorised lookups and an internal proposed clarification with source references. These tools do not exist in this worksheet.' },
  { label: 'Actions requiring approval; approver and exact approved version', value: 'Office manager checks each internal draft. In a separate future-send demonstration, A-1 would bind one recipient, action and D-1 payload; D-2 invalidates it. All steps NOT RUN; no actual approval exists.' },
  { label: 'Prohibited actions and technical enforcement', value: 'No sends in the initial design; no booking, safety dispatch, pricing, invoice, deletion or cross-customer access. Require unavailable capabilities and downstream permission checks, not only prompt instructions.' },
  { label: 'Step, time and spending limits', value: 'Call, elapsed-time and cash caps must be chosen with the owner and implementer before any test. Unchosen limits mean test not ready. No universal safe cap or approved budget is asserted.' },
  { label: 'Failure queue, responsible person and manual fallback', value: 'One unresolved work item per original request ID. Office manager owns missing/conflicting details; implementer investigates access, duplicate and outage defects. Handoff acceptance and pause/revoke procedures still need demonstration.' },
  { label: 'Recovery limits and irreversible consequences', value: 'Preserve M-104, discard D-2, retain failure/retry evidence and return to manual clarification. Restoring a database cannot undo an already delivered message.' },
  { label: 'Representative acceptance cases and evidence', value: 'Missing unit; conflicting notes; attempted other-customer export; unavailable lookup; repeated M-104; changed D-2 after A-1. Expected/actual results, source/model/software versions, review time and downstream evidence must be recorded. Actual outcomes: NOT RUN.' },
  { label: 'Baseline, ongoing costs and continue/stop decision', value: 'Invented 50 requests × 8 minutes = 400 monthly minutes. Fixed, assisted and agent plans release 40, 50 and 20 minutes after extra oversight. Monthly cash changes are −A$20, −A$50 and −A$90; no avoidable payroll or revenue is established. Prepare the improved-form comparison; no agent justified yet and no purchase/live trial approved.' },
] as const;
export const agentScopeFields = AGENT_COMPLETED_FIELDS.map(field => field.label + ':');

export function agentWorkflowDecisionText() {
  return [
    'AGENT OR SIMPLER WORKFLOW? — BUSINESS DECISION BRIEF', `MLAI editorial aid, ${AGENT_DECISION_VERSION}`,
    'Not a security certification, customer case study, supplier quote or savings forecast. All figures and records are invented. Independent owner/technical review pending.',
    'No AI system, approval gateway or customer workflow was evaluated. All business acceptance and approval demonstrations are NOT RUN.',
    '', 'SUPPLIED FICTIONAL CASE — M-104',
    ...AGENT_CASE_RECORDS.map(record => `${record.id} — ${record.type}: ${record.text}`),
    '', 'THREE DESIGNS — SAME MONTHLY WORKLOAD',
    'Baseline: 50 requests x 8 active minutes = 400 minutes. Case time includes checking, correction and fallback; extra oversight is separate, not the same review counted twice. A$60/hour values internal capacity, not avoidable payroll.',
    ...AGENT_DESIGN_OPTIONS.flatMap((option, index) => {
      const i = option.inputs, r = AGENT_DESIGN_COSTS[index];
      return ['', option.name, `M-104 handling: ${option.caseDecision}`, `Error consequence: ${option.error}`, `Failure and maintenance owner: ${option.owner}`,
        `Planned monthly work: ${i.monthlyTasks} x ${i.pilotMinutes} = ${i.monthlyTasks * i.pilotMinutes} case minutes + ${agentDecisionMinutes(i.maintenanceHours)} extra oversight minutes. Potential capacity release: ${agentDecisionMinutes(r.netHours)} minutes.`,
        `Setup: ${agentDecisionMoney(i.setupCashCost)} external cash + ${i.setupHours} internal hours (${agentDecisionMoney(i.setupHours * i.hourlyCost)}) = ${agentDecisionMoney(r.setupEconomicCost)} combined economic setup.`,
        `Monthly cash: subscription ${agentDecisionMoney(option.cash.subscription)}, usage ${agentDecisionMoney(option.cash.usage)}, external support ${agentDecisionMoney(option.cash.externalSupport)}, extra labour ${agentDecisionMoney(option.cash.extraLabour)}; total ${agentDecisionMoney(i.monthlyCashCost)}.`,
        `Monthly cash change: ${agentDecisionMoney(r.monthlyCashChange)}. No positive cash payback.`, `Decision: ${option.next}`];
    }),
    'Sensitivity: seven assisted case minutes rather than five gives 50 x 7 + 100 = 450 minutes, or −50 net minutes. It uses more time than the baseline; this is not an observed outcome.',
    'Actual prices, support terms, error losses, revenue, taxes, financing and workload variability are not established. Obtain quotes and consistent cost/tax treatment; these exclusions prevent a complete ROI claim.',
    '', 'PROPOSED APPROVAL AND RECOVERY DEMONSTRATION — ALL NOT RUN',
    ...AGENT_APPROVAL_STEPS.flatMap(step => [step.step, step.record, `Expected: ${step.expected}`, `Inspect: ${step.evidence}`, 'Actual: NOT RUN.']),
    '', 'COMPLETED FICTIONAL EXAMPLE — NOT A DEPLOYED SYSTEM',
    ...AGENT_COMPLETED_FIELDS.map((field, index) => `${index + 1}. ${field.label}:\n${field.value}`),
    '', 'BLANK BRIEF', ...agentScopeFields,
    '', 'BLANK COMPARISON — COPY FOR FIXED, ASSISTED AND AGENT OPTIONS',
    'Same task / representative period / cases / baseline time and rework:',
    'Required output / permitted sources / variable decision / simpler alternative:',
    'Case review, correction and fallback minutes / extra oversight:',
    'Setup cash / internal time / subscriptions / usage / external support / extra labour:',
    'Error consequences / access controls / failure owner / unknown costs and quotes:',
    'Evidence of benefit over simpler option / reasons to stop / owner decision and date:',
    '', 'ACTUAL ACCEPTANCE RECORD — COPY PER CASE',
    'Case and source IDs / versions / expected outcome / actual outcome or NOT RUN:',
    'Model/software/configuration / reviewer / review time / costs / retained failures:',
    'Action / recipient / exact content version / approval identity and current authority:',
    'Downstream evidence / duplicate count / denied access / failed or irreversible action:',
    'Pass, fail, unresolved or NOT RUN / manual queue owner / decision / retest:',
    '', 'BEFORE SHARING',
    'Remove private customer records, credentials and confidential details. The file is not automatically attached to an enquiry. Acceptance, availability and savings are not guaranteed; confirm market eligibility with MLAI.',
    'Optional client enquiry: https://mlai.au/mlai-studio/start-project',
    'Full guide: https://mlai.au/articles/featured/what-is-an-agent-in-artificial-intelligence',
    '', 'SOURCE ROLES — checked 11 September 2026',
    'https://www.anthropic.com/engineering/building-effective-agents — workflow/agent distinction, simpler designs and stopping conditions; dated architecture discussion, not current vendor ranking.',
    'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ — limited capabilities, permissions, approval and downstream authorisation; not certification of the proposed design.',
    'https://aws.amazon.com/what-is/ai-agents/ — memory, tools and learning/reflection terminology; not proof that a particular agent learns or improves.',
    'Codex assisted this fictional record and local arithmetic/resource checks. Independent review, live permission, actual caps and delivery validation remain pending.', '',
  ].join('\n');
}
