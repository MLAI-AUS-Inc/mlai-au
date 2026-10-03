export const FIRST_WORKFLOW_VERSION = '2026-09-11';
export const FIRST_WORKFLOW_DOWNLOAD = '/downloads/first-ai-workflow-selection.txt';
export const firstWorkflowMoney = (value: number) => `${value < 0 ? '−' : ''}A$${Math.abs(value).toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;
export const firstWorkflowPercent = (value: number | null) => value === null ? 'Not defined' : `${value.toFixed(2)}%`;

/** Invented weekly planning inputs. Not a measured trial, quote or tax model. */
export const FIRST_WORKFLOW_PLAN = {
  replies: 40, baselineCaseMinutes: 6, reviewMinutes: 3,
  extraCorrectionMinutes: 30, maintenanceMinutes: 20, setupMinutes: 30,
  capacityHourlyValue: 60, setupCash: 90,
  subscription: 10, usage: 4, support: 6,
  baselineRemedies: 8, proposedRemedies: 12,
  weeklyRevenue: 5000, unchangedWeeklyExpenses: 4000,
};
export type FirstWorkflowPlan = typeof FIRST_WORKFLOW_PLAN;

export function calculateFirstWorkflow(plan: FirstWorkflowPlan) {
  for (const key of Object.keys(FIRST_WORKFLOW_PLAN) as (keyof FirstWorkflowPlan)[]) {
    if (!Number.isFinite(plan[key]) || plan[key] < 0 || plan[key] > 1e9) throw new RangeError(`Invalid ${key}`);
  }
  if (!Number.isInteger(plan.replies)) throw new RangeError('Replies must be a whole count');
  const baselineMinutes = plan.replies * plan.baselineCaseMinutes;
  const reviewMinutes = plan.replies * plan.reviewMinutes;
  const repeatWeekMinutes = reviewMinutes + plan.extraCorrectionMinutes + plan.maintenanceMinutes;
  const firstWeekMinutes = repeatWeekMinutes + plan.setupMinutes;
  const recurringCash = plan.subscription + plan.usage + plan.support;
  const incrementalRemedies = plan.proposedRemedies - plan.baselineRemedies;
  const repeatWeekChange = -recurringCash - incrementalRemedies;
  const firstWeekChange = repeatWeekChange - plan.setupCash;
  const baselineResult = plan.weeklyRevenue - plan.unchangedWeeklyExpenses - plan.baselineRemedies;
  const repeatWeekResult = baselineResult + repeatWeekChange;
  const firstWeekResult = baselineResult + firstWeekChange;
  const margin = (result: number) => plan.weeklyRevenue > 0 ? result / plan.weeklyRevenue * 100 : null;
  return {
    baselineMinutes, reviewMinutes, repeatWeekMinutes, firstWeekMinutes,
    firstWeekCapacity: baselineMinutes - firstWeekMinutes,
    repeatWeekCapacity: baselineMinutes - repeatWeekMinutes,
    internalSetupValue: plan.setupMinutes / 60 * plan.capacityHourlyValue,
    combinedSetupValue: plan.setupCash + plan.setupMinutes / 60 * plan.capacityHourlyValue,
    recurringCash, incrementalRemedies, repeatWeekChange, firstWeekChange,
    baselineResult, repeatWeekResult, firstWeekResult,
    baselineMargin: margin(baselineResult), repeatWeekMargin: margin(repeatWeekResult), firstWeekMargin: margin(firstWeekResult),
    repeatMarginPointChange: margin(repeatWeekChange), firstMarginPointChange: margin(firstWeekChange),
  };
}
export const FIRST_WORKFLOW_RESULTS = calculateFirstWorkflow(FIRST_WORKFLOW_PLAN);
export const FIRST_WORKFLOW_SLOW_REVIEW = calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, reviewMinutes: 5 });

export const FIRST_WORKFLOW_CANDIDATES = [
  { task: 'Routine FAQ replies', weeklyCases: 40, caseMinutes: 6, reworkCases: 8, readiness: 'Approved public FAQ has a named operations owner.', decision: 'First compare a clearer FAQ and reply template. Then test draft assistance only if it adds useful value.' },
  { task: 'Invoice categorisation', weeklyCases: 25, caseMinutes: 4, reworkCases: 5, readiness: 'Record access and reviewer capacity are unresolved.', decision: 'Pause AI testing. Ask the bookkeeper to identify the cause of rework and assess existing accounting rules first.' },
  { task: 'Hire application decisions', weeklyCases: 10, caseMinutes: 15, reworkCases: 2, readiness: 'Personal information and consequential decisions are involved.', decision: 'Keep the decision with the existing responsible person. Do not choose it merely because a demo looks fast.' },
] as const;
export const FIRST_WORKFLOW_BRIEF = [
  { label: 'Business and process owner', value: 'Fictional equipment-hire business; operations manager owns the public FAQ, review capacity and the decision to pause. No actual business has approved this brief.' },
  { label: 'One repeated task and current workaround', value: 'Prepare routine FAQ replies using approved public passages. First improve the FAQ and saved reply template; keep those as the non-AI comparison.' },
  { label: 'Representative period, volume and active work time', value: 'Invented one-week baseline: 40 replies × 6 minutes = 240 minutes including current checking/correction. Record elapsed waiting separately. A real representative period has not been observed.' },
  { label: 'Current error/rework and required quality', value: 'Eight baseline replies need correction within the 240 minutes; this is not an additional time allowance. Replies must be supported by current passages. No unsupported price, availability or safety claims are acceptable.' },
  { label: 'Allowed input sources and data permissions', value: 'Synthetic questions and approved public FAQ passages only for preparation. Live-record access, vendor handling and applicable obligations need review; no customer records or credentials.' },
  { label: 'Expected output and person responsible for review', value: 'A proposed reply beside its source passage or a visible unresolved reason. The operations manager checks the complete output against the approved version before any separate manual communication.' },
  { label: 'Actions the system must never take', value: 'No automatic sends, bookings, availability promises, hire approvals, payments or source-policy changes. The implementer must demonstrate unavailable capabilities and access controls; this brief does not implement them.' },
  { label: 'Systems involved; unknowns to investigate', value: 'A permitted test-question list, source document and review sheet. Real product, integration quote, access, support and privacy assessment are unresolved. Cost unknown—request a bounded estimate rather than treating the invented allowances as an offer.' },
  { label: 'Test cases: normal, missing, conflicting and out-of-scope input', value: 'Answer supported by a current FAQ passage; missing availability detail; two conflicting passage versions; request for a safety assessment or an automatic booking. Actual outcomes: NOT RUN. Retain source/version, expected and actual result, reviewer and handling time.' },
  { label: 'Spend/time cap and stop conditions', value: 'Caps require owner/implementer agreement before testing; no budget is approved. Stop for stale sources, missing reviewer, unsupported consequential output or a forbidden action. A percentage saving cannot override these conditions.' },
  { label: 'Manual fallback and person who can disable the test', value: 'Return unresolved questions to the operations manager and approved reply template. The implementer must show how that owner pauses new drafts and revokes access; no live controls have been evaluated.' },
  { label: 'Desired outcome and evidence required before expansion', value: 'Useful supported replies with acceptable complete handling effort and cost versus the improved template. First/repeat-week plans release 40/70 minutes but worsen the result after listed expenses by A$114/A$24. Do not approve AI on those figures; verify assumptions, cost of errors and quality first. No pilot has passed.' },
] as const;
export const FIRST_WORKFLOW_BRIEF_TEMPLATE = FIRST_WORKFLOW_BRIEF.map(field => field.label + ':').join('\n');

export function firstWorkflowSelectionText() {
  const p = FIRST_WORKFLOW_PLAN, r = FIRST_WORKFLOW_RESULTS;
  return [
    'MLAI first AI workflow selection record', `Version: ${FIRST_WORKFLOW_VERSION}`,
    'Article: https://mlai.au/articles/featured/how-to-get-started-with-ai-2026',
    '', 'PURPOSE',
    'Choose a business task before buying software. Invented planning inputs, not a client result, forecast, supplier quote, security assessment or working-system validation. Independent owner/technical review pending.',
    'Use non-confidential observations. Keep personal records, credentials and customer details out. All business tests are NOT RUN.',
    '', 'COMPLETED FICTIONAL EXAMPLE — NOT OBSERVED MLAI CUSTOMER DATA',
    ...FIRST_WORKFLOW_CANDIDATES.flatMap(candidate => [candidate.task, `${candidate.weeklyCases} × ${candidate.caseMinutes} = ${candidate.weeklyCases * candidate.caseMinutes} minutes/week including existing checks/correction; ${candidate.reworkCases} rework/escalation cases are within that total.`, candidate.readiness, candidate.decision]),
    'Recorded choice: investigate FAQ replies with the operations manager, beginning with the improved template. If it resolves the problem, stop there. Source repair, no reviewer or a consequential error can stop the proposed AI test regardless of arithmetic.',
    '', 'FIRST WEEK IS NOT A REPEAT WEEK — INVENTED ARITHMETIC',
    `Baseline: ${p.replies} × ${p.baselineCaseMinutes} = ${r.baselineMinutes} minutes. Planned review: ${p.replies} × ${p.reviewMinutes} = ${r.reviewMinutes} minutes.`,
    `Additional exception correction: ${p.extraCorrectionMinutes} minutes; source upkeep/maintenance: ${p.maintenanceMinutes} minutes; one-off setup: ${p.setupMinutes} minutes. These are distinct activities, not the same review time counted twice.`,
    `First week: ${r.reviewMinutes} + ${p.extraCorrectionMinutes} + ${p.maintenanceMinutes} + ${p.setupMinutes} = ${r.firstWeekMinutes} minutes; ${r.firstWeekCapacity} minutes released, not 120 minutes.`,
    `Repeat week without setup: ${r.repeatWeekMinutes} minutes; ${r.repeatWeekCapacity} minutes released only if the invented workload and performance repeat. This is not an annual projection.`,
    `External setup: ${firstWorkflowMoney(p.setupCash)}; internal setup capacity: ${p.setupMinutes} minutes at ${firstWorkflowMoney(p.capacityHourlyValue)}/hour = ${firstWorkflowMoney(r.internalSetupValue)}. Combined economic setup ${firstWorkflowMoney(r.combinedSetupValue)}, not all a cash expense.`,
    '', 'WHAT HAPPENS TO MARGIN UNDER THESE ASSUMPTIONS?',
    'All monetary figures are invented, weekly and GST-exclusive. Revenue and existing payroll/other expenses are assumed unchanged. Cash timing, depreciation, financing, tax and unpriced consequential losses are not modelled; this is not a statutory P&L or after-tax net-margin forecast.',
    `Weekly revenue: ${firstWorkflowMoney(p.weeklyRevenue)}. Other listed expenses including existing wages: ${firstWorkflowMoney(p.unchangedWeeklyExpenses)} in every case.`,
    `Additional weekly subscription ${firstWorkflowMoney(p.subscription)} + usage ${firstWorkflowMoney(p.usage)} + support ${firstWorkflowMoney(p.support)} = ${firstWorkflowMoney(r.recurringCash)}. Internal review/upkeep stays within existing wages, not a second cash charge.`,
    `Customer-remedy allowance: baseline ${firstWorkflowMoney(p.baselineRemedies)}, proposed ${firstWorkflowMoney(p.proposedRemedies)}; incremental ${firstWorkflowMoney(r.incrementalRemedies)}. Invented cash allowances, not measured error rates, costs per error or a cap on harm. They do not include the internal correction minutes again.`,
    `Baseline result after listed expenses: ${firstWorkflowMoney(r.baselineResult)} / ${firstWorkflowPercent(r.baselineMargin)} of revenue.`,
    `Proposed first-week result: ${firstWorkflowMoney(r.firstWeekResult)} / ${firstWorkflowPercent(r.firstWeekMargin)}; change ${firstWorkflowMoney(r.firstWeekChange)} (${r.firstMarginPointChange?.toFixed(2)} percentage points).`,
    `Proposed repeat-week result: ${firstWorkflowMoney(r.repeatWeekResult)} / ${firstWorkflowPercent(r.repeatWeekMargin)}; change ${firstWorkflowMoney(r.repeatWeekChange)} (${r.repeatMarginPointChange?.toFixed(2)} percentage points).`,
    'Decision: less handling time is not enough to approve this AI proposal. No payroll is avoided and no new revenue is evidenced. No positive cash payback is established. Confirm actual costs and the simpler-template result before any paid pilot.',
    `Sensitivity: five review minutes per reply makes repeat-week effort ${FIRST_WORKFLOW_SLOW_REVIEW.repeatWeekMinutes} minutes and first-week effort ${FIRST_WORKFLOW_SLOW_REVIEW.firstWeekMinutes} minutes; net capacity ${FIRST_WORKFLOW_SLOW_REVIEW.repeatWeekCapacity}/${FIRST_WORKFLOW_SLOW_REVIEW.firstWeekCapacity} minutes. Cash costs do not disappear when time performance worsens.`,
    '', 'COMPLETED FAQ WORKFLOW BRIEF — PREPARATION ONLY',
    ...FIRST_WORKFLOW_BRIEF.map((field, index) => `${index + 1}. ${field.label}:\n${field.value}`),
    '', 'BLANK COMPARISON — REPEAT FOR EACH CANDIDATE',
    'Task / current method / representative period / task count:',
    'Active minutes including existing checks/corrections / rework subset / separate waiting:',
    'Source owner and permitted input / output / reviewer capacity:',
    'Consequential errors / simpler comparison / investigate, fix prerequisite, keep manual or reject:',
    'Decision owner / reason / evidence that changes the choice / next review date:',
    '', 'BLANK WEEKLY ECONOMICS — mark unknowns explicitly',
    'Comparable replies / baseline minutes / planned per-reply review:',
    'Additional correction / recurring upkeep / one-off internal setup minutes:',
    'External setup cash / internal capacity value (not avoidable payroll):',
    'Weekly subscription / usage / external support / any additional wage cash:',
    'Baseline and proposed customer-remedy spending / other error consequences:',
    'Comparable weekly revenue / unchanged other expenses / confirmed avoidable costs:',
    'GST basis / first-week versus repeat-week treatment / excluded costs:',
    'Result after listed costs / percentage of revenue only when revenue is positive:',
    'Quality and access stop conditions / owner review / actual quotes / spend cap:',
    '', 'YOUR IMPLEMENTATION BRIEF', FIRST_WORKFLOW_BRIEF_TEMPLATE,
    '', 'ACTUAL CASE LOG — NOT RUN UNTIL OBSERVED',
    'Case / permitted source and version / expected result / actual result:',
    'Reviewer / complete handling time / correction and maintenance / actual cash cost:',
    'Pass, fail, unresolved or NOT RUN / consequential error / stop and recovery:',
    'Include every attempted case and exception; a few examples do not establish general reliability.',
    '', 'Optional next step: https://mlai.au/mlai-studio/start-project',
    'The file is not automatically attached. Share only a permitted summary. An enquiry is not a project commitment, a free assessment or promised savings. Confirm delivery-market eligibility with MLAI.',
    '', 'SOURCES — checked 11 September 2026',
    'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products — privacy due diligence, not compliance approval.',
    'https://business.gov.au/finance/financial-tools-and-templates/set-up-a-profit-and-loss-statement — sales/expense records, labelled estimates and GST basis, not the invented figures.',
    'Codex assisted the example, arithmetic, download and local checks. Independent review, actual business evidence and any live trial remain pending.', '',
  ].join('\n');
}
