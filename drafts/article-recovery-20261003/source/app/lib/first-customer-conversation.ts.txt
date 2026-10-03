/** Supplied teaching material. No message, interview or customer outcome is real. */
export const CUSTOMER_PROVENANCE = 'COMPLETED FICTIONAL EXAMPLE — NOT CUSTOMER RESEARCH. All dialogue, dates and statuses are invented teaching material. No interview, message, demonstration or pilot actually ran.';
export const CUSTOMER_REVIEW_STATUS = 'AI-assisted editorial example; independent founder/source review pending.';
export const CUSTOMER_INVITATION = 'Thanks for agreeing to an introduction. I am exploring a tool for drafting quote follow-ups and trying to understand how people handle this today. Would you be open to a 15-minute conversation about a recent example? There is no need to share customer details or buy anything. If relevant, I can separately outline a synthetic demonstration. No problem if this is not a priority.';
export const CUSTOMER_NOTES = [
  { id: 'N1', question: 'Tell me about the last quote you followed up. What happened from quote to reply?', answer: 'Last week I drafted six follow-ups from our quote spreadsheet. I think drafting took about an hour altogether. I did not keep a time log.', interpretation: 'Participant-reported count and rough total time, not six separately timed tasks. No spreadsheet was inspected.', unknown: 'Frequency in other weeks, verified time, customer replies and financial consequences.' },
  { id: 'N2', question: 'Who did each step, and what did you use?', answer: 'I prepare the drafts in email from the spreadsheet. The owner checks the wording before I send them.', interpretation: 'The administrator describes the workflow and a separate approver. This is not verified authority to buy a new tool.', unknown: 'The actual approval policy, access permissions and implementation requirements.' },
  { id: 'N3', question: 'Where did it take extra effort or go wrong? What happened as a result?', answer: 'The awkward part is finding whether the owner has already agreed something by phone. Sometimes I wait for that answer. I cannot tell you what it costs us.', interpretation: 'Missing context may be the problem; a faster draft would not resolve it. No lost-revenue figure is supplied.', unknown: 'How often missing context occurs, time spent waiting and whether a different process would solve it.' },
  { id: 'N4', question: 'What have you tried changing, and why did you keep or stop it?', answer: 'We made an email template. It covers most straightforward follow-ups. I would probably tidy the spreadsheet before adding another tool.', interpretation: 'Contrary evidence: the existing template may be adequate. Include the simpler process option.', unknown: 'Whether the remaining exceptions justify a new product or a paid pilot.' },
  { id: 'N5', question: 'How would a change to this process be approved? Who else would need to assess it?', answer: 'The owner decides on software. We have not discussed a budget for this. I am not arranging an introduction to them.', interpretation: 'A user conversation is not buyer approval. No permission to approach the owner is given.', unknown: 'Owner interest, budget, procurement conditions and willingness to pay.' },
  { id: 'N6', question: 'Is there a next step you would find useful, or is the current process good enough?', answer: 'You can send one outline on Thursday, but I am not booking a demo. Private written notes are fine for this exercise until 30 September; no recording, AI upload or public quote.', interpretation: 'One dated outline is permitted in the story, not a sequence, booking or publication release. The later reply can end the proposed next step.', unknown: 'Whether the participant will want a demonstration after reading the outline.' },
] as const;

export const CUSTOMER_OUTLINE = 'As agreed, here is the outline. A proposed walkthrough would compare two fictional quote records with draft follow-ups, checking wording before any send. There is no live integration and nothing will be sent to customers. You do not need to send records or book anything. This is an outline, not a completed test or paid proposal; I will not send reminders without a new agreement.';
export const CUSTOMER_DECLINE = 'Thanks, please leave it here. Our template is enough for now. Please do not chase this or contact the owner.';
export const CUSTOMER_DECISION = 'Stop contact with this participant. The later refusal ends the proposed demonstration path; the earlier permission for one outline cannot justify reminders or an owner approach. Keep the recorded decline, do not invoice, and do not claim a customer win.';

export const CUSTOMER_EVENTS = [
  { id: 'E1', date: '2026-09-14', action: 'Recipient-agreed introduction and invitation for one conversation.', source: 'Supplied invitation above; the contact route is an assumption of the story, not permission for a real recipient.', status: 'Conversation accepted for 16 September. No demo booked or paid offer shown.' },
  { id: 'E2', date: '2026-09-16', action: 'Fictional conversation produces notes N1–N6.', source: 'The six supplied answers; private paraphrases only. No customer document, timing log or recording.', status: 'One outline agreed for 17 September. Buying authority unresolved; no demo booking.' },
  { id: 'E3', date: '2026-09-17', action: 'Founder sends the single agreed outline.', source: CUSTOMER_OUTLINE, status: 'Outline sent, not a demonstration attended. No price or paid terms shown.' },
  { id: 'E4', date: '2026-09-18', action: 'Participant declines further contact.', source: CUSTOMER_DECLINE, status: 'No demo, trial or purchase. No further outreach or owner introduction agreed.' },
  { id: 'E5', date: '2026-09-21', action: 'Founder reviews the record without contacting the participant.', source: 'N3, N4, N5 and E4: missing context, a useful existing template, unresolved buyer approval and an explicit refusal.', status: CUSTOMER_DECISION },
] as const;

export const CUSTOMER_STAGE_ROWS = [
  { stage: 'Conversation response and completion', state: 'One conversation accepted and held in the story.', evidence: 'E1–E2; agreement to speak is not agreement to buy.' },
  { stage: 'Outline and later reply', state: 'One requested outline sent; further contact declined.', evidence: 'E3–E4; the negative reply is a response, not a conversion.' },
  { stage: 'Demonstration', state: 'No booking and no attendance.', evidence: 'N6 and E4; an outline is not a demo or use of a product.' },
  { stage: 'Trial and use', state: 'No trial, usage or completed pilot review.', evidence: 'Nothing was provided for independent use; no use result exists.' },
  { stage: 'Price and accepted terms', state: 'No priced offer shown; no accepted paid terms.', evidence: 'The possible AUD 600 pilot below is a founder planning assumption, not an offer made in this conversation.' },
  { stage: 'Payment and delivery', state: 'No payment or completed delivery.', evidence: 'No order, invoice, paid pilot or delivered workflow is supplied.' },
] as const;

export const CUSTOMER_COMPLETED_FIELDS = [
  { label: 'Internal record ID and conversation date', value: 'SYNTHETIC-01; conversation 16 September 2026, record updated 21 September after a refusal on 18 September. These are future fictional dates, not bookings or observations. This record is separate from the companion GTM dataset.' },
  { label: 'Role, segment fit and permission to follow up', value: 'Office administrator at a fictional Melbourne commercial-maintenance firm. Fits the workflow-user question; not established as a buyer. One outline was agreed and sent. E4 ends further contact; no owner approach is permitted by this story.' },
  { label: 'Recent problem described by the participant', value: 'N1 reports six manually drafted follow-ups last week, roughly one hour total with no time log. N3 describes missing context about promises made by phone. Neither frequency nor loss is verified.' },
  { label: 'Current workaround and consequence', value: 'Spreadsheet, email template, manual drafting and owner review. N4 says the template covers most cases and spreadsheet tidying may be preferable. The consequence of waiting for missing context is not quantified.' },
  { label: 'Evidence observed versus participant report', value: 'In the story, the founder records the conversation, sent outline and refusal. Workflow counts, effort and approval descriptions are participant reports only. No real document, product test or independent timing is supplied. Outside the story, every item is synthetic.' },
  { label: 'Buying process and unresolved approval', value: 'N5 reports that the owner decides on software. Budget and owner interest remain unknown. The owner was not approached; the administrator did not approve a purchase or offer an introduction.' },
  { label: 'Offer actually shown, price and exclusions', value: 'Only the E3 unpriced demonstration outline was sent: two fictional records, draft review, no live integration or customer sends. The optional AUD 600 ten-record review-only pilot is a possible future proposal, not a price shown, rejected or accepted here.' },
  { label: 'Response / demo / trial / accepted terms / payment / delivery', value: 'Conversation held and outline sent; later refusal recorded. No demo booked or attended; no trial, accepted paid terms, payment or completed delivery. One participant is not a market or channel-conversion sample.' },
  { label: 'Objection, uncertainty or reason to decline', value: 'E4 explicitly says the current template is enough for now and asks for no further contact. Do not infer a price objection: no price was shown. Buyer demand, urgency beyond this participant, actual cost and delivery feasibility remain unknown.' },
  { label: 'Next action, owner and agreed date', value: 'Founder completes the internal review on 21 September; no outgoing message or owner approach. The four-week learning plan does not override the 18 September refusal. Any other discovery requires independently appropriate access and its own record.' },
  { label: 'Retention and public quotation permissions', value: 'N6 permits private written notes until 30 September in this fictional exercise; no recording, AI upload or permission to publish names, quotes, logos or results. Review/remove working notes then. Appropriate retention and minimal do-not-contact handling must be approved for a real workflow; this invented date is not legal guidance.' },
  { label: 'What would change our decision', value: 'Stop this contact now. The broader product hypothesis could change with independent evidence of unresolved exceptions, an authorised interested buyer and a deliverable scope; it is not rescued by inventing savings or revisiting a refusal. Prefer a simpler template/process if the evidence supports it.' },
] as const;
export const CUSTOMER_BLANK_FIELDS = CUSTOMER_COMPLETED_FIELDS.map(field => field.label + ':');
export const CUSTOMER_WEEKS = [
  { window: 'Week 1', work: 'Define the user/buyer question, establish an appropriate route, invite and hold a manageable first conversation.', evidence: 'Fit rule, invitation, supplied questions, actual answers and permission boundaries.', decision: 'In the fictional case, 14–18 September includes a conversation, outline and refusal. Stop contact when refused; do not wait for week four.' },
  { window: 'Week 2', work: 'Review the notes and any expressly agreed follow-up; distinguish user reports from buyer evidence.', evidence: 'What was sent, replies or missing replies, approvals and contradictory evidence.', decision: 'On 21 September the fictional founder reviews internally. The template may be adequate; no further contact is made.' },
  { window: 'Week 3', work: 'Only for a continuing, appropriate case: demonstrate synthetic material and separately discuss bounded terms.', evidence: 'Actual booking/attendance, price shown, who can approve and feasible scope.', decision: 'Not run in this example. No permission, no useful unresolved problem or unsafe delivery means no demo or offer.' },
  { window: 'Week 4', work: 'Review the cycle and decide whether another, independently appropriate test is justified.', evidence: 'Limits and actual costs; accepted terms, payments, use and delivery separately, if any.', decision: 'Planned, not run here. Do not fabricate a sale to finish the schedule or restart declined follow-up.' },
] as const;

export function firstCustomerWorksheetText() {
  return [
    'FIRST-CUSTOMER CONVERSATION RECORD', 'MLAI editorial aid — 11 September 2026', CUSTOMER_PROVENANCE, CUSTOMER_REVIEW_STATUS,
    'A worked teaching example, not a validated instrument, MLAI commercial quote or legal advice.', '',
    'BLANK RECORD', ...CUSTOMER_BLANK_FIELDS.map(field => field + '\n[Your evidence, assumption or explicit unknown]'), '',
    'COMPLETED FICTIONAL EXAMPLE — RECORD AFTER THE DECLINE', ...CUSTOMER_COMPLETED_FIELDS.map(field => field.label + ':\n' + field.value + '\n'),
    'INVITATION — ONLY AFTER APPROPRIATE RECIPIENT AGREEMENT', CUSTOMER_INVITATION, '',
    'SIX SUPPLIED INTERVIEW NOTES — FICTIONAL, NOT A TRANSCRIPT', ...CUSTOMER_NOTES.map(note => `${note.id}. ${note.question}\nScripted answer: ${note.answer}\nInterpretation: ${note.interpretation}\nStill unknown: ${note.unknown}\n`),
    'FIVE-EVENT SEQUENCE — FICTIONAL FUTURE DATES', ...CUSTOMER_EVENTS.map(event => `${event.id} | ${event.date}\n${event.action}\nSource material: ${event.source}\nState: ${event.status}\n`),
    'STAGE CHECK', ...CUSTOMER_STAGE_ROWS.map(row => `${row.stage}\n${row.state}\n${row.evidence}\n`),
    'FOUR-WEEK LEARNING PLAN — LATER WEEKS ARE CONDITIONAL', ...CUSTOMER_WEEKS.map(week => `${week.window}\n${week.work}\nKeep: ${week.evidence}\nDecision: ${week.decision}\n`),
    'ACTUAL-CASE FOLLOW-UP — DO NOT PREFILL A SUCCESS',
    'Internal ID / date / agreed action and scope / expiry / source / current permission or refusal / stage / actual result / owner / next allowed action:',
    '[Keep identifying material in an approved private system, not public URLs or analytics.]',
    'Time and cash limit / actual use / delivery capacity / review date / decision:',
    '[Unknown is not zero. No additional contact is authorised by this worksheet.]',
    'Permission and retention review / working-note removal / minimal do-not-contact handling:',
    '[Set appropriate rules for the actual circumstances before collecting notes.]', '',
    CUSTOMER_DECISION,
    'If the next task is comparing routes, spending limits and funnel denominators, use the separate GTM guide. Do not combine SYNTHETIC-01 with its 28 invented records.',
    'EVENT DISCUSSION: bring one anonymised or synthetic question about what changed your decision. The event control transfers only format preference, not notes or this file. No booking, leads, buyers or individual sales review is promised.',
    'Founder Tools is optional for organising actual company evidence; a workspace requires an account and this record is not automatically imported.',
    'Sources checked 11 September 2026; guidance, not endorsements of this example:',
    'https://entrepreneur.nyu.edu/blog/2025/01/13/choosing-your-initial-target-customer/',
    'https://www.stoneandchalk.com.au/articles/how-to-get-your-first-startup-customers',
    'Full explanation: https://mlai.au/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026', '',
  ].join('\n');
}
