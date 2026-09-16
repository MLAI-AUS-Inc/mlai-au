/** Author-created teaching fixture, not observed demand or a campaign that ran. */
export type GtmChannel = 'introductions' | 'session';
export type GtmRecord = Readonly<{
  id: string;
  channel: GtmChannel;
  fit: 'yes' | 'no' | 'unknown';
  demoReply: 'yes' | 'no' | 'pending' | 'not-invited';
  demoAttended: boolean;
  terms: 'accepted' | 'declined' | 'pending' | 'not-shown';
  payment: 'received' | 'pending' | 'not-due';
  reviewCompleted: boolean;
}>;

export const GTM_CHANNEL_LABELS = { introductions: 'Agreed introductions', session: 'Opt-in session' } as const;
export const GTM_PRICE = 600;
export const GTM_COSTS = { introductions: { cash: 40, hours: 4 }, session: { cash: 180, hours: 8 } } as const;
export const GTM_LIMITS = { cash: 250, hours: 12, commitments: 2, hourlyValue: 60 } as const;
export const GTM_PROVENANCE = 'Synthetic results for teaching only. Every ID, status, price, cost and date below is author-created, not an observed customer result. No campaign or pilot has run.';
export const GTM_REVIEW_STATUS = 'AI-assisted editorial example; independent founder/source review pending.';
export const GTM_OBJECTIONS = 'Objection reasons are not supplied. A declined invitation or offer does not tell us why; do not invent a customer explanation.';
export const GTM_DECISION = 'Pause new acquisition. The test has 0 hours remaining, AUD 30 cash remaining and no capacity for new pilot commitments under its two-commitment limit. Resolve the delivery plan for existing commitments before making new promises. Any further outreach needs newly agreed capacity and an appropriate contact basis; the fictional follow-up window has ended. Do not treat a pause in acquisition as cancellation of accepted terms.';
export const GTM_UNKNOWN = 'Delivery effort, actual operating costs, refunds, support, continued use, repeat demand and demand beyond personal contacts remain unknown. These counts cannot establish product-market fit, a profitable offer or a winning channel.';

const record = (id: string, channel: GtmChannel, fit: GtmRecord['fit'], demoReply: GtmRecord['demoReply'] = 'not-invited', demoAttended = false, terms: GtmRecord['terms'] = 'not-shown', payment: GtmRecord['payment'] = 'not-due'): GtmRecord => ({ id, channel, fit, demoReply, demoAttended, terms, payment, reviewCompleted: false });

export const GTM_RECORDS: readonly GtmRecord[] = [
  record('I01', 'introductions', 'yes', 'yes', true, 'accepted', 'received'),
  record('I02', 'introductions', 'yes', 'yes', true, 'declined'),
  record('I03', 'introductions', 'yes', 'yes', true, 'pending'),
  record('I04', 'introductions', 'yes', 'no'),
  record('I05', 'introductions', 'yes', 'pending'),
  record('I06', 'introductions', 'no'), record('I07', 'introductions', 'no'), record('I08', 'introductions', 'unknown'),
  record('S01', 'session', 'yes', 'yes', true, 'accepted', 'pending'),
  record('S02', 'session', 'yes', 'yes', true, 'declined'),
  record('S03', 'session', 'yes', 'no'), record('S04', 'session', 'yes', 'pending'),
  ...Array.from({ length: 16 }, (_, i) => record(`S${String(i + 5).padStart(2, '0')}`, 'session', i < 5 ? 'no' : 'unknown')),
];

/** Unknown is not rejection. This fixture's protocol offers terms after a demo. */
export function summariseGtmChannel(records: readonly GtmRecord[], channel: GtmChannel) {
  if (!Object.hasOwn(GTM_CHANNEL_LABELS, channel)) throw new Error('Unknown channel');
  const ids = new Set<string>();
  for (const row of records) {
    if (!row.id?.trim() || ids.has(row.id)) throw new Error('Missing or duplicate record ID');
    ids.add(row.id);
    if (!Object.hasOwn(GTM_CHANNEL_LABELS, row.channel) || !['yes', 'no', 'unknown'].includes(row.fit)
      || !['yes', 'no', 'pending', 'not-invited'].includes(row.demoReply)
      || !['accepted', 'declined', 'pending', 'not-shown'].includes(row.terms)
      || !['received', 'pending', 'not-due'].includes(row.payment)
      || typeof row.demoAttended !== 'boolean' || typeof row.reviewCompleted !== 'boolean') throw new Error('Invalid record status');
    if (row.demoReply !== 'not-invited' && row.fit !== 'yes') throw new Error('This protocol invites only verified-fit people');
    if (row.demoAttended && row.demoReply !== 'yes') throw new Error('Attendance requires an accepted demo invitation');
    if ((row.terms !== 'not-shown') !== row.demoAttended) throw new Error('This protocol shows terms at an attended demo');
    if ((row.payment !== 'not-due') !== (row.terms === 'accepted')) throw new Error('Track payment separately after accepted terms');
    if (row.reviewCompleted && row.payment !== 'received') throw new Error('This pilot review requires payment first');
  }
  const rows = records.filter(row => row.channel === channel);
  const count = (test: (row: GtmRecord) => boolean) => rows.filter(test).length;
  return {
    reached: rows.length, fit: count(r => r.fit === 'yes'), notFit: count(r => r.fit === 'no'), unknownFit: count(r => r.fit === 'unknown'),
    invited: count(r => r.demoReply !== 'not-invited'), replied: count(r => r.demoReply === 'yes' || r.demoReply === 'no'),
    pendingReply: count(r => r.demoReply === 'pending'), demos: count(r => r.demoAttended), termsShown: count(r => r.terms !== 'not-shown'),
    accepted: count(r => r.terms === 'accepted'), declinedTerms: count(r => r.terms === 'declined'), pendingTerms: count(r => r.terms === 'pending'),
    paid: count(r => r.payment === 'received'), pendingPayment: count(r => r.payment === 'pending'), activated: count(r => r.reviewCompleted),
  };
}

export function gtmRatio(numerator: number, denominator: number) {
  if (![numerator, denominator].every(n => Number.isSafeInteger(n) && n >= 0) || numerator > denominator) throw new Error('Invalid stage denominator');
  return denominator === 0 ? `${numerator} / 0 — not calculable` : `${numerator} / ${denominator} (${Math.round(numerator / denominator * 100)}%)`;
}

export const GTM_RESULTS = {
  introductions: summariseGtmChannel(GTM_RECORDS, 'introductions'),
  session: summariseGtmChannel(GTM_RECORDS, 'session'),
};

export function gtmBudget(cash: number, hours: number, commitments: number, hourlyValue: number = GTM_LIMITS.hourlyValue) {
  if (![cash, hours, hourlyValue].every(n => Number.isFinite(n) && n >= 0 && n <= 1e7)
    || !Number.isSafeInteger(commitments) || commitments < 0 || commitments > 10000) throw new Error('Invalid cost/capacity input');
  return { cashRemaining: GTM_LIMITS.cash - cash, hoursRemaining: GTM_LIMITS.hours - hours, commitmentsRemaining: GTM_LIMITS.commitments - commitments,
    valuedTime: hours * hourlyValue, cashPlusTime: cash + hours * hourlyValue,
    pause: cash >= GTM_LIMITS.cash || hours >= GTM_LIMITS.hours || commitments >= GTM_LIMITS.commitments };
}
export const GTM_BUDGET = gtmBudget(GTM_COSTS.introductions.cash + GTM_COSTS.session.cash,
  GTM_COSTS.introductions.hours + GTM_COSTS.session.hours, GTM_RESULTS.introductions.accepted + GTM_RESULTS.session.accepted);

const i = GTM_RESULTS.introductions, s = GTM_RESULTS.session;
export const GTM_STAGE_ROWS = [
  { label: 'People reached in the defined route', rule: 'An agreed introduction or an attendee; these are differently selected groups.', cells: [`${i.reached} recipient-agreed introductions`, `${s.reached} session attendees`] },
  { label: 'Verified fit / people reached', rule: 'Owner reports a recent quote-follow-up problem and can consider a pilot.', cells: [gtmRatio(i.fit, i.reached), gtmRatio(s.fit, s.reached)] },
  { label: 'Not fit / fit unknown', rule: 'Missing qualification is unknown, not a rejection.', cells: [i, s].map(r => `${r.notFit} not fit; ${r.unknownFit} unknown`) },
  { label: 'Replies to demo invitations', rule: 'Yes or no reply / individually invited verified-fit people. Not event attendance.', cells: [i, s].map(r => gtmRatio(r.replied, r.invited) + `; ${r.pendingReply} pending`) },
  { label: 'Demonstrations attended / invitees', rule: 'An attended demo, not a booking or a message reply.', cells: [i, s].map(r => gtmRatio(r.demos, r.invited)) },
  { label: 'Pilot terms accepted / terms shown', rule: 'Same AUD 600 terms shown to every demo attendee.', cells: [i, s].map(r => gtmRatio(r.accepted, r.termsShown) + `; ${r.declinedTerms} declined, ${r.pendingTerms} pending`) },
  { label: 'Payment received / accepted offers', rule: 'Full payment recorded separately; pending is not a lost sale.', cells: [i, s].map(r => gtmRatio(r.paid, r.accepted) + `; ${r.pendingPayment} payment pending`) },
  { label: 'Pilot review completed / paid buyers', rule: 'Activation here means the buyer completed the agreed ten-record review. Payment or a demo alone is not activation.', cells: [i, s].map(r => gtmRatio(r.activated, r.paid)) },
] as const;

export const GTM_COMPLETED_FIELDS = [
  { label: 'Reader segment, geography and buying role', value: 'A Melbourne early-stage founder testing an offer for commercial-maintenance owners who approve quote follow-ups. This is the hypothetical buyer, not the audience of a contractor-recruitment article.' },
  { label: 'Observed problem and source of that observation', value: 'Delayed quote follow-ups are the assumed problem. No interviews or customer records were supplied. Qualification statuses below are author-assigned for the exercise, not validated demand.' },
  { label: 'Current alternative, including doing nothing', value: 'Spreadsheet plus manually written emails, or leaving follow-up unchanged; both are assumptions to check.' },
  { label: 'Offer, deliverable, exclusions and price conditions', value: 'A synthetic demonstration, then optional AUD 600 total review-only pilot: one workflow, ten synthetic records, one buyer review session, no live integration or sends. Assume one full payment before the pilot review. Price and terms are invented, not an MLAI offer or proof of profitability; real scope, delivery costs, tax/payment/refund terms and permission need agreement.' },
  { label: 'Single question this test should answer', value: 'Will verified-fit owners take the next step on this specific demonstration and pilot offer through either accessible route? The example cannot determine a causal channel winner or product-market fit.' },
  { label: 'Channel and permission/organiser conditions', value: 'Recipient-agreed introductions; a separate organiser-approved opt-in session. The 28 fictional IDs do not overlap. In a real test, deduplicate recipients and record appropriate permission and follow-up limits; community attendance is not blanket contact consent.' },
  { label: 'Message and next action offered', value: 'See how a draft follow-up is checked against the quote before anyone sends it. Invite a demonstration first; show the same pilot scope and price at every attended demo. Acceptance of an introduction is not acceptance of this offer.' },
  { label: 'Fit rule and denominator for each stage', value: 'Verify owner role, a recent quote-follow-up problem and authority to consider a pilot. Individually invite only verified-fit people. Count yes/no replies per invitee, attended demos per invitee, accepted terms per terms shown, payments per accepted offer, and completed ten-record reviews per paid buyer. Unknown fit, pending replies, pending terms and pending payments stay separate.' },
  { label: 'Time, cash and delivery-capacity limits', value: 'Across both routes: at most 12 acquisition hours, AUD 250 acquisition cash and two accepted pilot commitments. Invented planning value: AUD 60 per founder hour. Pilot delivery and support effort are outside that acquisition budget and remain unestimated; two slots are a promise ceiling, not proof the founder can deliver them.' },
  { label: 'Start, end, follow-up and decision dates', value: 'Fictional future schedule: test 14–25 September 2026; appropriately agreed follow-up until 2 October; decision on 5 October. Statuses below are an author-created snapshot at that fictional decision, not events that have happened or a forecast.' },
  { label: 'Observed counts, costs, objections and missing data', value: 'Use the 28 synthetic status rows below. Introductions: 5 of 8 fit, 4 of 5 invitees replied, 3 demos, 1 accepted pilot, 1 payment, 0 completed reviews. Session: 4 of 20 fit, 3 of 4 invitees replied, 2 demos, 1 accepted pilot, payment pending, 0 completed reviews. Acquisition: AUD 40 / 4 hours and AUD 180 / 8 hours. Objection reasons and delivery economics are not supplied; see the stage definitions and cost limits, not an invented customer story.' },
  { label: 'Repeat / change / stop decision and next uncertainty', value: GTM_DECISION + ' ' + GTM_UNKNOWN },
] as const;
export const GTM_BLANK_FIELDS = GTM_COMPLETED_FIELDS.map(field => field.label + ':');

export function gtmRecordCells(row: GtmRecord) {
  return [row.id, GTM_CHANNEL_LABELS[row.channel], row.fit, row.demoReply, row.demoAttended ? 'attended' : 'not attended', row.terms, row.payment, row.reviewCompleted ? 'completed' : 'not completed'];
}
export const GTM_LOG_HEADERS = ['ID', 'Route', 'Fit', 'Demo reply', 'Demo', 'Pilot terms', 'Payment', 'Pilot review'];
export function gtmWorksheetText() {
  return [
    'GTM CHANNEL TEST — EDITABLE PLANNING RECORD', 'MLAI editorial aid, 11 September 2026', GTM_PROVENANCE, GTM_REVIEW_STATUS,
    'Not a validated score, commercial quote, legal/accounting advice or proof of profitable acquisition.', '',
    'BLANK RECORD', ...GTM_BLANK_FIELDS.map(field => field + '\n[Your evidence, assumption or explicit unknown]'), '',
    'COMPLETED FICTIONAL EXAMPLE — NOT OBSERVED CUSTOMER RESULTS', ...GTM_COMPLETED_FIELDS.map(field => field.label + ':\n' + field.value + '\n'),
    'STAGE DEFINITIONS AND DENOMINATORS', ...GTM_STAGE_ROWS.map(row => `${row.label}\n${row.rule}\nIntroductions: ${row.cells[0]}\nSession: ${row.cells[1]}\n`),
    'SYNTHETIC RECORD LOG', GTM_LOG_HEADERS.join(' | '), ...GTM_RECORDS.map(row => gtmRecordCells(row).join(' | ')), '', GTM_OBJECTIONS, '',
    'COST AND CAPACITY CHECK',
    'Introductions: AUD 40 cash + (4 hours × AUD 60/hour) = AUD 280 cash plus valued time.',
    'Session: AUD 180 cash + (8 hours × AUD 60/hour) = AUD 660 cash plus valued time.',
    'Combined: AUD 220 cash + AUD 720 valued time = AUD 940. Only AUD 220 is cash spending.',
    'Founder time is an opportunity-cost assumption, not a salary payment. Development, delivery, ongoing support, refunds, taxes and other overhead are excluded. These totals are not fully loaded CAC or a profit calculation.',
    'One fictional AUD 600 payment is not proof of profit. Zero payments so far does not make acquisition cost zero. No stable acquisition forecast follows from this small, differently selected sample.',
    GTM_DECISION, GTM_UNKNOWN, '',
    'ACTUAL FOLLOW-UP RECORD — LEAVE UNKNOWN UNTIL OBSERVED',
    'Internal ID / route / contact basis and expiry / stage / date / actual outcome / source / next allowed action:',
    '[Use an approved private system; do not put names, emails or prospect notes in analytics.]',
    'Any new acquisition hours/cash / delivery capacity / approval owner and date:',
    '[Record a new bounded decision, not an automatic extension of this fictional test.]', '',
    'EVENT DISCUSSION',
    'Bring one anonymised or synthetic question about the test decision. The event format control transfers only online/in-person preference, not this record. No automatic upload, booking, customer introduction or sales review is promised.',
    'Sources checked 15 September 2026; practical guidance, not endorsement of this fixture:',
    'https://startups.aws.com/learn/prove-whats-possible-make-your-idea-success-solid-go-to-market-strategy',
    'https://business.gov.au/planning/business-plans/develop-your-marketing-plan',
    'Full explanation: https://mlai.au/articles/featured/go-to-market-for-startups', '',
  ].join('\n');
}
