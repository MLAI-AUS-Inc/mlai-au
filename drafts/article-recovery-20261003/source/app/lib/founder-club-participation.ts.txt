/** Provider descriptions and an editorial exercise, not member-outcome evidence. */
export const FOUNDER_CLUB_PATH = "/articles/featured/why-founders-clubs-work-for-early-stage-growth";
export const CLUB_SOURCES_CHECKED_AT = "2026-09-10T11:36:37Z";
export const CLUB_SOURCES_REVIEW_AFTER = "2026-09-16T14:00:00Z";
export const CLUB_RECORD_DOWNLOAD = "/downloads/founder-club/participation-record.txt";

export function clubSourceState(now: number | null): "unknown" | "checked" | "overdue" {
  if (now === null || !Number.isFinite(now) || now < Date.parse(CLUB_SOURCES_CHECKED_AT)) return "unknown";
  return now >= Date.parse(CLUB_SOURCES_REVIEW_AFTER) ? "overdue" : "checked";
}

export const CLUB_FORMATS = [
  {
    id: "cohort-founders", name: "Cohort Founders Club",
    source: "https://cohortspace.com.au/gold-coast-startup-programs/",
    audience: "Growth-stage startup and scaleup founders.",
    participation: "Provider describes monthly in-person peer sharing and networking.",
    location: "Gold Coast programme; confirm the next session's venue and dates.",
    cost: "No Founders Club fee displayed in the inspected programme entry. The $20/month Cohort Club is a different product.",
    check: "Ask about current operation, eligibility and terms. This page also contains older programme material; a live page is not proof of an open intake.",
  },
  {
    id: "cohort-start", name: "Cohort Start Club",
    source: "https://cohortspace.com.au/gold-coast-startup-programs/",
    audience: "Early-stage founders.",
    participation: "Provider describes four workshops, a pitch night and mentoring; not the Founders Club's monthly peer format.",
    location: "Gold Coast programme; current delivery dates/format unconfirmed.",
    cost: "Price and commitment not established by the inspected entry.",
    check: "Ask about a current cohort, inclusions and access before planning a visit.",
  },
  {
    id: "startup-network", name: "The Startup Network — Early Founder",
    source: "https://thestartupnetwork.com.au/membership",
    audience: "Founders from idea through product–market fit.",
    participation: "Member space, advisor office hours and discounted events; a fixed peer-meeting cadence is not stated.",
    location: "Membership page addresses Australia; check each online/in-person session separately.",
    cost: "Displayed $300 every year. Switching Early Founder to 3 Months showed $100 every 3 months; these are different billing periods, not monthly fees.",
    check: "Confirm currency, GST, inclusions, renewal/cancellation and session access. Membership is not a booking. Public events include Founder Connect and webinars, with event-specific dates.",
    details: "https://thestartupnetwork.com.au/events",
    detailsLabel: "Provider events",
  },
  {
    id: "fishburners", name: "Fishburners Founders Passport",
    source: "https://fishburners.org/passport",
    audience: "Startup founders; verify eligibility for your stage.",
    participation: "Provider lists weekly coffee gatherings and monthly founder sessions; not a guaranteed private peer group.",
    location: "In-person Sydney connections are described. Remote participation in a specific session is unverified; a separate Passport Hub adds workspace.",
    cost: "Advertised from $89/month, or $54.92/month when billed annually. The latter is not a monthly payment option or a verified annual checkout total.",
    check: "The linked onboarding route reached a domain-configuration error in this check. Ask for a working route and exact terms; do not treat the offer as purchase-verified.",
    details: "https://fishburners.org/terms",
    detailsLabel: "Provider terms — confirm which apply",
  },
] as const;

export const CLUB_RECORD_FIELDS = [
  ["goal", "My current question or participation goal"],
  ["provider", "Provider, session and official listing checked"],
  ["fit", "Eligibility, format and participation confirmed"],
  ["commitment", "Costs, time and recurring terms"],
  ["boundaries", "Recording, conduct and confidentiality expectations"],
  ["contribution", "What I contributed"],
  ["learning", "What I actually learned or experienced"],
  ["evidence", "What was opinion versus supported evidence"],
  ["followup", "Any mutually agreed follow-up"],
  ["unknowns", "What remains unanswered"],
  ["decision", "Decision: return, try a different format, or stop"],
] as const;
type ClubRecordKey = typeof CLUB_RECORD_FIELDS[number][0];

export const FICTIONAL_CLUB_REVIEW: Record<ClubRecordKey, string> = {
  goal: "Fictional Rowan wants to compare how early-stage founders separate polite pilot feedback from evidence of use. Limits: two hours and A$30 for one trial experience; no annual commitment yet.",
  provider: "Unnamed invented online discussion, not Cohort, The Startup Network, Fishburners or MLAI. No real listing, organiser reply, member interview or attendance is represented.",
  fit: "In the scenario, one optional question round is offered, no coding is needed and remote access meets Rowan's needs. For a real event, leave unconfirmed requirements unknown and ask first.",
  commitment: "Scenario: 60-minute session + 20-minute preparation + 15-minute follow-up = 95 minutes. Ticket A$0; internet/equipment and time value excluded. No membership bought. This is not a real provider's guest pass or refund policy.",
  boundaries: "Scenario: Rowan shares no customer names, commercial documents or sensitive detail. The discussion is not assumed legally confidential; any real recording/access rules need checking before disclosure.",
  contribution: "Scenario: Rowan asks which observable action would distinguish praise for a prototype from continued use, without pitching or collecting attendee details.",
  learning: "Scenario: two contrasting suggestions emerge—watch repeat use and ask about the existing process. Rowan leaves with a question for a later pilot review, not evidence that either suggestion works.",
  evidence: "Peer suggestions in an invented conversation, not measured results or professional advice. No change in sales, retention, funding or margin has been observed.",
  followup: "Scenario: one person explicitly agrees to receive a short, non-sensitive summary by the chosen channel. One opted-in follow-up is not permission for an ongoing marketing sequence.",
  unknowns: "Will the proposed check be useful in Rowan's pilot? Not tested. Will a later event include suitable discussion? Not known. Additional access costs were not quantified. No recurring-group comparison or member-outcome evidence exists here.",
  decision: "Consider another suitable one-off discussion; do not buy recurring membership on this evidence. The scenario's 95 minutes fit the 120-minute limit, but a zero ticket fee does not establish the full A$30 cash limit. Check any extra costs first. There is only one fictional experience and no business-outcome evidence.",
};

export const CLUB_REVIEW_BLANK = CLUB_RECORD_FIELDS.map(([, label]) => `${label}:`).join("\n");
export const CLUB_RECORD_FILE = [
  "MLAI founder participation record — edited 10 September 2026",
  "Save your own copy. Nothing in this file registers you, sends notes or purchases membership.",
  "Complete the goal and essential requirements before a visit; record outcomes afterwards, not in advance. Unknown essential requirements mean ask. Failed requirements can mean skip; positive scores cannot cancel them out.",
  "\nCOMPLETED FICTIONAL TEACHING EXAMPLE — no real provider or member experience",
  ...CLUB_RECORD_FIELDS.map(([key, label]) => `${label}:\n${FICTIONAL_CLUB_REVIEW[key]}\n`),
  "BLANK RECORD — duplicate for each actual experience; keep unperformed steps marked not done",
  CLUB_REVIEW_BLANK,
  "\nReview relevance, opportunity to participate, full time/cash cost and mutually agreed follow-up separately. Do not add them into a guaranteed-growth score.",
  `Guide: https://mlai.au${FOUNDER_CLUB_PATH}`,
  "Provider descriptions, prices and access may change. Verify the exact offer before committing.",
].join("\n") + "\n";
