/** Entirely invented teaching record. IDs are not anonymised real participants. */
export const ENGAGEMENT_PATH = "/articles/featured/how-to-foster-community-engagement";
export const ENGAGEMENT_DOWNLOAD = "/downloads/community-engagement/decision-feedback-record.txt";
export const ENGAGEMENT_PROVENANCE = "Fictional teaching record — not an MLAI event, participant study or measured community result. Every person, note, date and delivery observation below is invented.";

export const FICTIONAL_INVITATION = "We are choosing the exercise for a beginner AI session on 14 August 2026, 6–7pm AEST. Would spotting unsupported answers or drafting a reply be more useful, and what would help you take part? Send a short written response by 7 August, 5pm AEST, or join the optional 20-minute discussion on 5 August at 6pm AEST. The volunteer organiser, Lee, will decide within the booked room time and post a plain-text update in this same group on 10 August. Taking part is optional and unpaid; no expenses are offered. Use invented examples, not personal or workplace records. Contact Lee through the existing group route about participation needs; do not assume a recording, captions or other support is available until confirmed.";

type FeedbackNote = {
  id: string; contributor: string; route: "discussion" | "written";
  input: string; decision: string | null;
};
export const FICTIONAL_INVITEES = Array.from({ length: 12 }, (_, i) => `P${i + 1}`);
export const FICTIONAL_FEEDBACK_NOTES: readonly FeedbackNote[] = [
  { id: "N1", contributor: "P1", route: "discussion", input: "The code-first exercise is difficult to follow.", decision: "D1" },
  { id: "N2", contributor: "P2", route: "discussion", input: "Practise checking an answer before learning a tool.", decision: "D1" },
  { id: "N3", contributor: "P3", route: "discussion", input: "Start with a short answer and the source it claims to use.", decision: "D1" },
  { id: "N4", contributor: "P5", route: "discussion", input: "Keep a code demonstration available after the basic exercise.", decision: "D1" },
  { id: "N5", contributor: "P2", route: "written", input: "An example beforehand would help prepare a question.", decision: "D2" },
  { id: "N6", contributor: "P4", route: "discussion", input: "Allow written questions rather than requiring speaking.", decision: "D2" },
  { id: "N7", contributor: "P7", route: "written", input: "Use a short plain-text version, not only presentation slides.", decision: "D2" },
  { id: "N8", contributor: "P8", route: "written", input: "Keep sharing in the existing group without a new account.", decision: "D2" },
  { id: "N9", contributor: "P1", route: "discussion", input: "An earlier start is needed to attend.", decision: "D3" },
  { id: "N10", contributor: "P4", route: "written", input: "Consider an online alternative if the room time is fixed.", decision: "D3" },
  { id: "N11", contributor: "P3", route: "discussion", input: "Real client emails might make the exercise more familiar.", decision: "D4" },
  { id: "N12", contributor: "P6", route: "discussion", input: "Keep private records out; invented examples are enough.", decision: "D4" },
  { id: "N13", contributor: "P7", route: "written", input: "Make the discussion private — meaning still unclear.", decision: null },
  { id: "N14", contributor: "P8", route: "written", input: "The recording arrangements are unclear — desired change not yet clarified.", decision: null },
];

export const FICTIONAL_FEEDBACK_DECISIONS = [
  { id: "D1", input: "A non-code starting point, with an optional code demonstration.", decision: "Choose answer checking, not reply drafting. Provide an invented answer and source excerpt first; keep code optional. This is an organiser decision, not a vote count.", response: "Lee posts the decision and reason on 10 August.", delivery: "Within the fiction, the printed non-code exercise is supplied on 14 August. Its usefulness still needs participant feedback; supplying it does not establish comprehension." },
  { id: "D2", input: "Preparation and written contribution without another account.", decision: "Share a plain-text example in the existing group and accept written questions.", response: "Lee posts the decision and reason on 10 August.", delivery: "Within the fiction, the example is posted on 11 August and the written route offered. This does not show everyone received it or could use it." },
  { id: "D3", input: "Earlier timing or an online alternative.", decision: "The booked room time cannot change. Investigate a future online option, without promising it for this session.", response: "Lee explains the constraint on 10 August; a response does not remove the barrier.", delivery: "The access barrier remains. Lee owns the next update on 21 August; availability, cost and suitability of an alternative remain unconfirmed as of the fictional 14 August review." },
  { id: "D4", input: "Conflicting requests about real client data.", decision: "Use synthetic messages. There is no permission to use client records; realism does not override that limit.", response: "Lee explains the boundary on 10 August rather than treating the two notes as votes.", delivery: "Within the fiction, the demonstration uses invented material on 14 August. This is not evidence of permission to process real participant or client data." },
] as const;

export function summariseFeedback(invitees: readonly string[], notes: readonly FeedbackNote[]) {
  if (new Set(invitees).size !== invitees.length || invitees.some(id => !id.trim())) throw new Error("Invitee IDs must be unique and nonempty");
  if (new Set(notes.map(n => n.id)).size !== notes.length) throw new Error("Note IDs must be unique");
  if (notes.some(n => !n.id.trim() || !invitees.includes(n.contributor) || !["discussion", "written"].includes(n.route))) throw new Error("Each note requires a known contributor and route");
  if (notes.some(n => n.decision !== null && !FICTIONAL_FEEDBACK_DECISIONS.some(d => d.id === n.decision))) throw new Error("Unknown decision reference");
  const discussion = new Set(notes.filter(n => n.route === "discussion").map(n => n.contributor));
  const written = new Set(notes.filter(n => n.route === "written").map(n => n.contributor));
  const contributors = new Set(notes.map(n => n.contributor));
  return {
    invited: invitees.length, discussion: discussion.size, written: written.size,
    both: [...discussion].filter(id => written.has(id)).length, contributors: contributors.size,
    contributionPercent: invitees.length ? Math.round(contributors.size / invitees.length * 100) : null,
    notes: notes.length, withDecision: notes.filter(n => n.decision !== null).length,
    needsClarification: notes.filter(n => n.decision === null).length,
  };
}
export const FICTIONAL_FEEDBACK_COUNTS = summariseFeedback(FICTIONAL_INVITEES, FICTIONAL_FEEDBACK_NOTES);

export const ENGAGEMENT_RECORD_FIELDS = [
  ["activity", "Activity, decision owner and actual dates/timezone"],
  ["influence", "Decision still open / constraints already fixed"],
  ["audience", "Who is invited and why; whose input may be missing"],
  ["access", "Participation routes and confirmed access arrangements"],
  ["expectations", "Time, payment/expenses and data-use expectations"],
  ["input", "Input received, with duplicates and uncertainties noted"],
  ["checking", "Contributor check: is the summary accurate?"],
  ["decision", "Decision / reason / what did not change"],
  ["delivery", "Response given versus change actually delivered"],
  ["unresolved", "Unresolved issue / responsible person / next update date"],
  ["permission", "Permission and identification check before sharing"],
  ["outcome", "Participant feedback after delivery / next adjustment"],
] as const;
type Field = typeof ENGAGEMENT_RECORD_FIELDS[number][0];
export const COMPLETED_ENGAGEMENT_RECORD: Record<Field, string> = {
  activity: "Invented beginner exercise, 14 August 2026, 6–7pm AEST; fictional volunteer organiser Lee owns the decision. Invitation 1 August; input closes 7 August at 5pm AEST; decision update 10 August; review snapshot 14 August. No actual event occurred.",
  influence: "Open: answer checking versus reply drafting, non-code starting point, preparation and question route. Fixed: booked room/time, one-hour session, available volunteer effort and no private/client data. Lee retains the choice; no co-design or transfer of authority is claimed.",
  audience: "Twelve invented existing members, P1–P12. Eight contribute. P9–P12 have no recorded input; reasons are unknown. Existing members do not represent all newcomers, non-members or the Australian AI community.",
  access: "Optional 20-minute discussion on 5 August at 6pm AEST, or written input in the existing group by 7 August, 5pm AEST. Using that group needs no new account for these invitees. No universal accessibility, remote event, recording or captions promise is made. The timing barrier remains.",
  expectations: "Optional unpaid contribution; no expenses offered in this invented invitation. No sensitive data requested. Lee keeps the minimum working notes for the stated decision and contributor checks, not for marketing or AI-service uploads. A real organiser must confirm appropriate payment, support and data handling for their activity.",
  input: "All 14 invented notes N1–N14 are supplied below. Discussion contributors: P1–P6. Written: P2, P4, P7, P8. Overlap P2/P4: 6 + 4 − 2 = 8 distinct contributors. Notes are issues, not votes; repeated contributions cannot create extra people.",
  checking: "In the fiction, N1–N12 have summaries checked with their contributors before the decision update. N13/N14 still need clarification; their meaning is not inferred from a theme label. These are invented steps, not actual consent or member validation.",
  decision: "D1: non-code answer checking before optional code. D2: advance plain-text example and written questions. D3: retain fixed room time, investigate a later online option. D4: synthetic data only. Reasons and note references are retained; disagreement is not erased.",
  delivery: "All 12 notes linked to D1–D4 have an organiser response dated 10 August in the fiction. The advance example is posted 11 August and the non-code synthetic exercise supplied 14 August. The response count does not mean 12 resolved issues or successful participation.",
  unresolved: "N13/N14 await clarification. D3's earlier-time need is not met; an online alternative is not confirmed. Lee owns the 21 August update. These remain open at the 14 August snapshot even though the session plan was delivered.",
  permission: "Every ID and observation is invented, not de-identified MLAI research. Do not publish an equivalent real row-level log by default: combinations of route, timing and request can identify someone. Keep raw input private, obtain appropriate permission and review a safe summary before sharing.",
  outcome: "No post-session participant feedback is included, even within this example. Delivery and response rates cannot establish trust, learning, retention, attendance improvement or that barriers were removed. Next ask what remains difficult; the response and next adjustment have not been observed.",
};

export const ENGAGEMENT_BLANK = ENGAGEMENT_RECORD_FIELDS.map(([, label]) => `${label}:`).join("\n");
export const ENGAGEMENT_RECORD_FILE = [
  "MLAI community decision-and-feedback record — edited 10 September 2026",
  ENGAGEMENT_PROVENANCE,
  "Save and edit your own copy. No notes are submitted, no participant permission is granted and no event registration occurs.",
  "\nORIGINAL FICTIONAL INVITATION\n" + FICTIONAL_INVITATION,
  "\nCOMPLETED FICTIONAL RECORD",
  ...ENGAGEMENT_RECORD_FIELDS.map(([key, label]) => `${label}:\n${COMPLETED_ENGAGEMENT_RECORD[key]}\n`),
  "ALL 14 INVENTED INPUT NOTES — IDs are not real people; do not publish equivalent real raw records by default",
  ...FICTIONAL_FEEDBACK_NOTES.map(n => `${n.id} | ${n.contributor} | ${n.route} | ${n.input} | ${n.decision ?? "Needs clarification; no decision/response recorded"}`),
  "\nDECISION, RESPONSE AND DELIVERY RECORDS — every observation here is fictional",
  ...FICTIONAL_FEEDBACK_DECISIONS.map(d => `${d.id} (${FICTIONAL_FEEDBACK_NOTES.filter(n => n.decision === d.id).map(n => n.id).join(", ")}):\n${d.input}\nDecision: ${d.decision}\nResponse: ${d.response}\nDelivery/open issue: ${d.delivery}\n`),
  "BLANK COPY — replace fictional values, keep unperformed steps marked not done",
  ENGAGEMENT_BLANK,
  "\nPRIVATE INPUT LOG TEMPLATE — restrict access; do not collect identities beyond the activity's needs",
  "Note ID / appropriately managed contributor reference / route / input / summary checked or unclear / linked decision / response actually given / delivery evidence / remaining issue:",
  "\nPUBLIC UPDATE TEMPLATE — remove identifying combinations; confirm permission before sharing",
  "What you could influence / what we heard (safe themes, disagreement and missing input) / decision and reason / what changed or did not / what was delivered / still open, owner and next update / how to correct the summary:",
  `\nGuide: https://mlai.au${ENGAGEMENT_PATH}`,
].join("\n") + "\n";
