import { calculateAiPilot, type AiPilotInputs } from './ai-pilot-economics';

export const CAPABILITY_PRIORITY_VERSION = '2026-09-11';
export const CAPABILITY_PRIORITY_DOWNLOAD = '/downloads/ai-use-case-priorities.txt';
// Invented planning inputs for one retailer, not prices, observed work or AI benchmarks.
export const CAPABILITY_CANDIDATES = [
  {
    id: 'invoice', task: 'Extract supplier-invoice fields',
    inputs: { monthlyTasks: 40, baselineMinutes: 8, pilotMinutes: 4, hourlyCost: 60, maintenanceHours: 1, monthlyCashCost: 30, setupCashCost: 300, setupHours: 4, cashablePercent: 0 } satisfies AiPilotInputs,
    reworkCases: 6,
    data: 'Invented invoice samples can be used for a demonstration. Live supplier records have not been approved for connection; the accounts lead must confirm permission and source access.',
    oversight: 'Accounts lead checks every proposed field against the original. No posting to accounts, bank-detail changes or payments are in scope.',
    errorCost: 'A wrong total, duplicate or misread credit creates reconciliation work. Payment must remain unavailable. The cost and frequency of escaped errors are unknown, not zero.',
    cashBreakdown: { subscription: 15, usage: 5, externalSupport: 10, extraLabourCash: 0 },
    alternative: 'Compare manual entry, supplier CSV exports and existing accounting rules before a model.',
    decision: 'Investigate invoice extraction',
    reason: 'Prepare a synthetic demonstration brief with the accounts lead, then check document-level quality and review effort. This is not permission for a live pilot or a purchase.',
  },
  {
    id: 'reply', task: 'Draft routine customer replies',
    inputs: { monthlyTasks: 60, baselineMinutes: 5, pilotMinutes: 3, hourlyCost: 60, maintenanceHours: 1.5, monthlyCashCost: 25, setupCashCost: 150, setupHours: 3, cashablePercent: 0 } satisfies AiPilotInputs,
    reworkCases: 9,
    data: 'The fictional returns policy has conflicting versions. No approved answer source is ready; reviewer time has not been committed.',
    oversight: 'The operations lead must approve the policy and assign a reviewer. Any future system would draft only; sending and commitments remain separate.',
    errorCost: 'An unsupported refund, price or delivery promise can create a customer dispute. Consequential losses are unpriced; a fluent answer is not a control.',
    cashBreakdown: { subscription: 15, usage: 5, externalSupport: 5, extraLabourCash: 0 },
    alternative: 'Repair the policy and saved replies first.',
    decision: 'Fix the source first',
    reason: 'Do not select this AI trial while policy versions conflict or reviewer capacity is unknown, even if the arithmetic appears favourable.',
  },
  {
    id: 'recommend', task: 'Suggest compatible catalogue items',
    inputs: { monthlyTasks: 120, baselineMinutes: 3, pilotMinutes: 2, hourlyCost: 60, maintenanceHours: 1, monthlyCashCost: 25, setupCashCost: 300, setupHours: 6, cashablePercent: 0 } satisfies AiPilotInputs,
    reworkCases: 12,
    data: 'The fictional catalogue has approved compatibility fields and a catalogue owner. Customer profiling data is unnecessary for the initial comparison.',
    oversight: 'Staff confirm suitability and stock before recommending an item. A ranking does not approve a sale or determine customer eligibility.',
    errorCost: 'Wrong compatibility can cause returns, replacement work and trust damage. These losses are not measured or priced into this planning example.',
    cashBreakdown: { subscription: 10, usage: 5, externalSupport: 10, extraLabourCash: 0 },
    alternative: 'An exact compatibility filter using the existing catalogue is the first comparison.',
    decision: 'Try the catalogue filter first',
    reason: 'The highest task volume is not a reason to add AI. Establish what the simpler filter cannot do before considering generated recommendations.',
  },
] as const;

export const priorityAud = (amount: number) => `${amount < 0 ? '−' : ''}A$${Math.abs(amount).toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;
export const priorityMinutes = (hours: number) => Math.round(hours * 60);
export const CAPABILITY_COST_RESULTS = CAPABILITY_CANDIDATES.map(candidate => calculateAiPilot(candidate.inputs));
export const INVOICE_SLOW_REVIEW = calculateAiPilot({ ...CAPABILITY_CANDIDATES[0].inputs, pilotMinutes: 7 });
export const CAPABILITY_BRIEF_FIELDS = [
  { label: 'My business task and current method', value: 'Copy supplier-invoice fields into a review sheet. Fictional baseline: 40 documents/month, 8 active minutes each including existing checks and rework; six cases need correction. No actual baseline was collected.' },
  { label: 'Capability needed: draft, extract, recommend, detect or other', value: 'Extraction: proposed supplier, date, document type and total alongside the source. It is not accounting advice, autonomous bookkeeping or payment approval.' },
  { label: 'Permitted input and source owner', value: 'Invented documents initially; accounts lead owns the source/checking rules. Live-record permission and vendor data handling remain unresolved.' },
  { label: 'Exact output and who checks it', value: 'Proposed fields or an unresolved reason, with source location and version. The accounts lead reviews each complete document, not just an overall field-accuracy percentage.' },
  { label: 'What the output must NOT trigger automatically', value: 'No accounting write, payment, supplier bank-detail change or outbound commitment. The implementer must demonstrate these boundaries; they are not implemented by this worksheet.' },
  { label: 'Normal, missing, misleading and duplicate test cases', value: 'Clear invoice; unreadable total; credit note; repeated document; embedded hostile instructions. Actual outcomes: NOT RUN. Retain failures and review effort.' },
  { label: 'Evidence needed to judge accuracy and review effort', value: 'Original input, expected and actual fields, whole-document acceptance, all attempted cases, errors and review/correction/fallback time on the identified version. Seven review minutes per document would erase the planned capacity benefit.' },
  { label: 'Non-AI alternative to compare', value: 'Manual entry, a supplier-provided CSV and existing accounting rules. Stop if the simpler option meets the task without an AI build.' },
  { label: 'Systems involved, budget constraints and unresolved questions', value: 'Unconnected test document folder and review sheet. Illustrative A$300 setup cash plus four internal hours; A$30/month extra cash and one hour/month extra oversight. Obtain actual quotes and a spend cap. No purchase, live trial, independent review or positive cash payback is established.' },
] as const;
export const CAPABILITY_BRIEF_TEMPLATE = CAPABILITY_BRIEF_FIELDS.map(field => field.label + ':').join('\n');

export function capabilityPriorityText() {
  return [
    `MLAI AI use-case prioritisation record — ${CAPABILITY_PRIORITY_VERSION}`,
    'Article: https://mlai.au/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life',
    'Fictional retailer, invented inputs and planning decisions. Not a supplier quote, AI benchmark, client result, financial forecast or compliance approval.',
    'Independent owner/technical review pending. All proposed business tests are NOT RUN. No live trial or purchase is approved.',
    '', 'THREE TASKS — SAME MONTHLY BASIS',
    'Active baseline and assisted case minutes include case review, correction and fallback. Rework cases are a subset, not extra time to add again. Extra oversight/maintenance is separate.',
    'A$60/hour is an invented internal capacity value. All cash figures need a consistent cost/tax basis in real quotes. Existing payroll is not avoided; no additional revenue is evidenced.',
    ...CAPABILITY_CANDIDATES.flatMap((candidate, index) => {
      const i = candidate.inputs, r = CAPABILITY_COST_RESULTS[index];
      return ['', candidate.task,
        `Monthly workload and rework: ${i.monthlyTasks} cases x ${i.baselineMinutes} minutes = ${i.monthlyTasks * i.baselineMinutes} baseline minutes; ${candidate.reworkCases} cases need correction within that total.`,
        `Planned assisted work: ${i.monthlyTasks} x ${i.pilotMinutes} = ${i.monthlyTasks * i.pilotMinutes} case minutes, plus ${priorityMinutes(i.maintenanceHours)} additional oversight minutes. Potential capacity release: ${priorityMinutes(r.netHours)} minutes/month.`,
        `Data availability: ${candidate.data}`, `Human oversight: ${candidate.oversight}`, `Cost of error: ${candidate.errorCost}`,
        `Setup cash: ${priorityAud(i.setupCashCost)}; internal setup: ${i.setupHours} hours x A$60 = ${priorityAud(i.setupHours * i.hourlyCost)}; combined setup economic value: ${priorityAud(r.setupEconomicCost)}.`,
        `Incremental monthly cash: subscription ${priorityAud(candidate.cashBreakdown.subscription)}, usage ${priorityAud(candidate.cashBreakdown.usage)}, external support ${priorityAud(candidate.cashBreakdown.externalSupport)}, extra labour cash ${priorityAud(candidate.cashBreakdown.extraLabourCash)}; total ${priorityAud(i.monthlyCashCost)}.`,
        `Monthly cash change with no avoidable payroll: ${priorityAud(r.monthlyCashChange)}. No positive cash payback under these assumptions. Capacity is not profit.`,
        `Non-AI alternative: ${candidate.alternative}`, `Decision: ${candidate.decision}. ${candidate.reason}`,
      ];
    }),
    '', 'SENSITIVITY — NOT A NEW OBSERVED RESULT',
    `If invoice review/correction/fallback requires seven minutes per case: 40 x (8 - 7) - 60 = ${priorityMinutes(INVOICE_SLOW_REVIEW.netHours)} net minutes/month. It uses 20 more minutes, not a saving. The monthly cash change remains −A$30.`,
    'Setup, subscriptions, usage, external support, internal maintenance and per-case review are recorded separately. Error losses, revenue effects, taxes, financing, seasonality and actual supplier/support terms are not established. These exclusions prevent a complete ROI claim; obtain relevant evidence before spending.',
    '', 'COMPLETED CAPABILITY-TO-TASK REQUEST — INVESTIGATE ONLY',
    ...CAPABILITY_BRIEF_FIELDS.map((field, index) => `${index + 1}. ${field.label}:\n${field.value}`),
    '', 'BLANK PRIORITISATION WORKSHEET — COPY FOR EACH OF YOUR THREE TASKS',
    'Business task / capability / current workaround / process owner:',
    'Representative period / task count / active time including current checks and rework:',
    'Rework case count (subset, not extra minutes) / input availability and permission:',
    'Required output / reviewer and capacity / forbidden automatic action:',
    'Error consequence / recovery work / unresolved cost or obligation:',
    'Non-AI alternative and evidence of an unmet need:',
    'Assisted case time including review, correction and fallback:',
    'Extra maintenance/oversight time / internal hourly capacity value:',
    'External setup cash / internal setup time / training and handover:',
    'Monthly subscriptions / API use / external support / extra labour cash:',
    'Spending demonstrably avoidable / extra contribution evidenced (do not double count):',
    'Unknown costs / required quotes / tax basis / spend cap:',
    'Investigate, fix prerequisites, prefer simpler option or reject — and why:',
    'Evidence that would change the choice / owner / next review date:',
    '', 'BLANK CAPABILITY REQUEST', CAPABILITY_BRIEF_TEMPLATE,
    '', 'ACTUAL TEST RECORD — DO NOT REPLACE UNKNOWN WITH ZERO',
    'Case ID / permitted source and version / normal, missing, conflicting or duplicate:',
    'Expected output / actual output / whole-document or whole-task decision:',
    'Reviewer / date / failure and recovery / handling minutes / actual costs:',
    'Pass, fail, unresolved or NOT RUN / decision and next action:',
    '', 'Optional enquiry: https://mlai.au/mlai-studio/start-project',
    'Bring a permitted summary of the selected task, current work and acceptance criteria. The file is not automatically attached; acceptance, availability or savings are not guaranteed.',
    '', 'SOURCE ROLES — checked 11 September 2026',
    'https://business.gov.au/online-and-digital/artificial-intelligence — possible business capabilities and responsible adoption; not support for fictional prices or savings.',
    'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products — commercial-AI privacy due diligence, not compliance approval of this example.',
    'Use non-confidential facts only. Do not insert customer documents, credentials or private business details into a public article form.', '',
  ].join('\n');
}
