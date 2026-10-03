/** Editorial teaching material. No interviews, invitations or test outcomes occurred. */
export const DISCOVERY_VERSION = "customer-problem-v1";
export const DISCOVERY_PROVENANCE = "Entirely fictional example: all people, dates, counts and notes below are invented. No interviews or outreach occurred. No market demand, permission or customer result is established.";
export const DISCOVERY_QUESTIONS = [
  ["Tell me about the last time this happened.", "Follow the trigger, people, tools, exceptions and result."],
  ["What did you do instead?", "Ask what is satisfactory about the current workaround, including doing nothing."],
  ["How often does that happen, and how do you know?", "Label recollections as estimates; do not turn an anecdote into a market statistic."],
  ["What makes changing this difficult?", "Explore responsibilities, permissions, training, switching effort and competing priorities."],
  ["Who uses it, and who decides whether to change it?", "A user's enthusiasm is not purchasing approval."],
  ["What have I misunderstood?", "Invite correction rather than endorsement of a proposed feature."],
] as const;

export const DISCOVERY_FIELDS = [
  "Date / segment / participant role:",
  "Hypothesis and what would contradict it:",
  "Recruitment method / invitations / refusals / completed conversations:",
  "Recent workflow described / current workaround:",
  "Observed evidence versus my interpretation:",
  "Frequency / effort / cost: measured, estimated or unknown?",
  "User / decision maker / approval constraints:",
  "Small next test / time and spending limit:",
  "Expected observable action / stop condition:",
  "Result, including non-response and contrary evidence:",
  "Decision: investigate, change scope, test or stop — and why:",
] as const;
export const DISCOVERY_LOG = ["Customer problem test — keep identifying and confidential details out", ...DISCOVERY_FIELDS].join("\n");

export const DISCOVERY_INVITATIONS = [
  { id: "P1", invited: "2026-09-01", status: "completed", statusDate: "2026-09-03" },
  { id: "P2", invited: "2026-09-01", status: "declined", statusDate: "2026-09-02" },
  { id: "P3", invited: "2026-09-01", status: "completed", statusDate: "2026-09-04" },
  { id: "P4", invited: "2026-09-01", status: "no-response", statusDate: "2026-09-07" },
  { id: "P5", invited: "2026-09-02", status: "completed", statusDate: "2026-09-06" },
  { id: "P6", invited: "2026-09-02", status: "declined", statusDate: "2026-09-03" },
  { id: "P7", invited: "2026-09-02", status: "no-response", statusDate: "2026-09-07" },
  { id: "P8", invited: "2026-09-02", status: "no-response", statusDate: "2026-09-07" },
] as const;
export const DISCOVERY_COUNTS = {
  invited: DISCOVERY_INVITATIONS.length,
  completed: DISCOVERY_INVITATIONS.filter(row => row.status === "completed").length,
  declined: DISCOVERY_INVITATIONS.filter(row => row.status === "declined").length,
  noResponse: DISCOVERY_INVITATIONS.filter(row => row.status === "no-response").length,
};
export const DISCOVERY_CONVERSATIONS = [
  {
    id: "P1", date: "2026-09-03",
    note: "The owner describes last Tuesday's enquiry handoff and reports that an existing shared-inbox assignment handles it adequately.",
    interpretation: "Contradicts the assumption that this owner needs new reply software.",
    missing: "No inbox, time record or purchase decision was inspected. Do not count this as lost revenue or a lost sale.",
  },
  {
    id: "P3", date: "2026-09-04",
    note: "The owner reports one enquiry that two staff each assumed the other would handle. They describe unclear responsibility, not a difficult reply to write.",
    interpretation: "Reframe the question around ownership before considering automated drafting.",
    missing: "Frequency, business impact and whether a simple process change works are unknown. No customer messages were collected.",
  },
  {
    id: "P5", date: "2026-09-06",
    note: "The owner describes checking for replies after hours and asks whether the example could show who is responsible for each enquiry.",
    interpretation: "A possible question for a manual mockup; not willingness to pay for an agent.",
    missing: "The request is not consent to a trial or follow-up, and no staff user or budget approval has been established.",
  },
] as const;
export const DISCOVERY_EXAMPLE = [
  [DISCOVERY_FIELDS[0], "Fictional review on 7 September 2026. A Melbourne idea-stage founder explores enquiry handling with owners of small service businesses. Fit rule: personally handles or supervises the workflow and can describe a recent instance."],
  [DISCOVERY_FIELDS[1], "Hypothesis: missed replies mainly result from drafting effort, so an AI reply tool may help. Contrary evidence: existing software is adequate, ownership is unclear, or the issue is not important enough to change."],
  [DISCOVERY_FIELDS[2], "Fictional permission-first introductions through an existing professional network, 1–7 September. Eight invitations, three completed conversations, two declines and three without a response by the cutoff. No real contact details or permission records exist."],
  [DISCOVERY_FIELDS[3], "P1 reports adequate shared-inbox assignment. P3 describes a handoff with no clear owner. P5 describes after-hours checking. These invented participant reports are not observed customer behaviour."],
  [DISCOVERY_FIELDS[4], "No actual observations were collected. Within the teaching scenario, the notes are participant reports; the founder's ownership hypothesis is an interpretation. No quote, transcript, inbox or customer document is supplied."],
  [DISCOVERY_FIELDS[5], "Frequency unknown; active effort unknown; error cost unknown. Do not replace missing values with zero or claim recovered hours, sales or margin."],
  [DISCOVERY_FIELDS[6], "Owner perspectives only; staff users and buying authority for a proposed change remain unverified. No participant has agreed to a trial, follow-up or paid terms."],
  [DISCOVERY_FIELDS[7], "Propose an unrun manual ownership-card exercise, only after fresh participant agreement. Cap total founder effort at two hours and external spend at A$0; founder time still has an opportunity cost."],
  [DISCOVERY_FIELDS[8], "Observe whether willing participants can assign or escalate eight invented enquiries and explain responsibility. Record time, confusion and current-process preference; no market-validation threshold is claimed."],
  [DISCOVERY_FIELDS[9], "The hypothetical three conversations challenge the drafting premise; P1 is contrary evidence. Two declines and three non-responses remain recruitment outcomes, not proof that the problem is absent. The mockup test is UNRUN."],
  [DISCOVERY_FIELDS[10], "CHANGE SCOPE: stop building the automatic-reply feature for now. Investigate ownership with a manual mockup before considering any AI implementation. Revisit only if suitable participants demonstrate a consequential drafting problem that their existing process cannot address."],
] as const;

export const DISCOVERY_NEXT_TEST = [
  ["Question", "Would making responsibility visible address the described handoff confusion without new AI software?"],
  ["Status and participants", "UNRUN. Seek agreement from up to two relevant participants and confirm an appropriate staff role. None has consented or been recruited for this test."],
  ["Materials", "Prepare eight invented enquiry cards: four with a stated responsible role, two with conflicting ownership and two outside the proposed workflow. No real messages, contact details, model or integration."],
  ["Procedure", "First ask how each participant would handle the cards today. Then show a paper owner/status column. Ask them to assign or escalate each card and explain the choice; do not coach them toward the preferred result."],
  ["Limits", "Proposed window: 8–11 September 2026, entirely fictional. At most two hours of total founder effort, including preparation and review, with at most 30 minutes per session. A$0 external spend; the time is not free."],
  ["Record", "For each of the eight cards: current approach, proposed approach, assigned/escalated/unclear result, participant explanation and observed time. Keep missing observations unknown. Include refusals and interrupted sessions."],
  ["Decision rule", "If both completed sessions prefer the existing approach and reveal no useful change, stop this mockup. If ownership stays unclear, revise the responsibility rule before testing again. No completed sessions means an access problem to investigate, not proof of no demand. These are editorial choices, not statistically validated thresholds."],
  ["Stop and follow-up", "Stop immediately if a participant wishes to stop or private information is introduced. Do not connect a live inbox or send messages. Discuss any future invitation separately; this plan grants no contact permission."],
  ["Actual result", "UNRUN — no participant behaviour, timing, improvement, customer or willingness-to-pay result is available."],
] as const;

export function formatDiscoveryWorksheet() {
  return [
    "MLAI — Customer problem discovery worksheet",
    `Version: ${DISCOVERY_VERSION}; prepared 10 September 2026`,
    "Article: https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6",
    "Purpose: test a customer-problem hypothesis before pitching or automating outreach.",
    "Editorial working aid, not a validated research instrument or legal advice.",
    "Keep identifying/confidential details out. Agree participation, note use and any follow-up separately. Do not generate interviews, quotes or missing evidence with AI.",
    "", "1. CONVERSATION PROMPTS",
    ...DISCOVERY_QUESTIONS.map(([question, followup], i) => `${i + 1}. ${question}\n   ${followup}`),
    "", "2. BLANK DECISION LOG — use for your own separately permitted test",
    DISCOVERY_LOG,
    "", "3. COMPLETED FICTIONAL EXAMPLE", DISCOVERY_PROVENANCE,
    ...DISCOVERY_EXAMPLE.map(([label, answer]) => `${label}\n${answer}\n`),
    "Fictional recruitment ledger — status at 7 September 2026:",
    ...DISCOVERY_INVITATIONS.map(row => `${row.id} | invited ${row.invited} | ${row.status} | status/cutoff ${row.statusDate}`),
    `Total: ${DISCOVERY_COUNTS.invited} invitations = ${DISCOVERY_COUNTS.completed} completed + ${DISCOVERY_COUNTS.declined} declined + ${DISCOVERY_COUNTS.noResponse} no response. Not real conversion data.`,
    "", "Fictional conversation notes — not quotes or transcripts:",
    ...DISCOVERY_CONVERSATIONS.map(row => `${row.id} (${row.date})\nInvented report: ${row.note}\nInterpretation: ${row.interpretation}\nNot established: ${row.missing}\n`),
    "4. NEXT-TEST PLAN — FICTIONAL AND UNRUN",
    ...DISCOVERY_NEXT_TEST.map(([label, value]) => `${label}: ${value}\n`),
    "5. DISCUSS THE UNRESOLVED QUESTION",
    "Bring your own non-confidential problem statement and one contrary observation to a suitable MLAI event: https://mlai.au/events",
    "Check the actual date, topic, location, format and availability. Attendance is not a sales invitation or a promise of customers, introductions or individual review.",
    "Once a problem warrants an offer, the next-stage guide is https://mlai.au/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026",
    "No real participant research, independent review, registration or commercial result is claimed. Codex assisted this fictional teaching material; it is not a finding of the AI-in-sales paper.",
    "",
  ].join("\n");
}
