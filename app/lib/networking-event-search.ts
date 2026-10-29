/** Dated discovery observations and a fictional reader decision, not endorsements. */
export const NETWORKING_PATH = "/articles/featured/how-to-find-networking-events";
export const NETWORKING_CHECKED_AT = "2026-09-10T12:33:24Z";
export const NETWORKING_REVIEW_AFTER = "2026-09-16T14:00:00Z";
export const NETWORKING_DOWNLOAD = "/downloads/networking-events/search-record.txt";

export function networkingSourceState(now: number | null): "unknown" | "checked" | "overdue" {
  if (now === null || !Number.isFinite(now) || now < Date.parse(NETWORKING_CHECKED_AT)) return "unknown";
  return now >= Date.parse(NETWORKING_REVIEW_AFTER) ? "overdue" : "checked";
}

export const NETWORKING_SEARCH_ROUTES = [
  {
    id: "meetup", name: "Meetup",
    url: "https://www.meetup.com/en-AU/find/?keywords=AI&location=au--Melbourne&source=EVENTS&eventType=online",
    query: "AI; Melbourne; venue Online. Checked in an existing signed-in desktop session on 10 September.",
    observed: "Online cards appeared, including AI Governance Is No Longer Optional: Here's How to Do It Right. The page also retained a distance selection; inspect each listing rather than interpreting that as a local online audience.",
    limits: "An earlier signed-out check applied the controls but did not verify rendered cards. That is incomplete evidence, not zero events or proof that login caused the difference. Account creation, registration and attendance were not tested.",
  },
  {
    id: "eventbrite", name: "Eventbrite",
    url: "https://www.eventbrite.com.au/d/australia--melbourne/ai/",
    query: "Melbourne AI directory; then Show online events. Public desktop search on 10 September.",
    observed: "Local results included Getting Found in the Age of AI marked Sold Out. Applying the online control reached Online ai events, with an Online filter and cards including AI in Taxation.",
    limits: "The online route now worked; the failed 9 September attempt is historical. The local location field remained visible on the online page, and a result used RM pricing. Neither proves Australian timing, currency, admission or a suitable audience.",
    secondaryUrl: "https://www.eventbrite.com.au/d/online/ai/?page=1", secondaryLabel: "Observed online search route",
  },
  {
    id: "humanitix", name: "Humanitix",
    url: "https://humanitix.com/au/search/au--vic--melbourne/AI?dates=all",
    query: "Australian home page; Melbourne; interested-in search AI; All dates. Public desktop search on 10 September.",
    observed: "Results included Introduction to AI in Sandringham. Opening its listing revealed a five-week programme marked full, not simply the first 90-minute session shown in the date header.",
    limits: "Some search titles named other cities. Check the actual venue. An online keyword on the opened listing did not establish remote delivery; its described programme had a physical venue. No ticket or waitlist request was submitted.",
    secondaryUrl: "https://events.humanitix.com/intro-ai", secondaryLabel: "Opened Introduction to AI listing",
  },
  {
    id: "linkedin", name: "LinkedIn",
    url: "https://www.linkedin.com/search/results/events/?keywords=AI%20Melbourne&origin=SWITCH_SEARCH_VERTICAL",
    query: "AI Melbourne in Search → See all results → Events. Existing signed-in desktop session on 10 September.",
    observed: "Four results appeared, including two procurement entries dated 9 September and AI Leadership Lab: Melbourne. The Events view did not automatically exclude those past entries.",
    limits: "Melbourne was a keyword, not a verified city filter. One procurement card said Online while its description named a physical venue; this did not establish a remote ticket. No dedicated location/online filter, external booking or attendance was tested.",
  },
] as const;

export const NETWORKING_RECORD_FIELDS = [
  ["goal", "My learning or conversation question"],
  ["constraints", "City or online / available dates / time and cash limits"],
  ["search", "Search topic, platform and date checked"],
  ["listing", "Event title and official listing"],
  ["audience", "Organiser / intended audience / prerequisites"],
  ["participation", "Participation offered and access confirmed"],
  ["commitment", "Full event date, timezone, location and total commitment"],
  ["unknowns", "What remains unknown and who can clarify it"],
  ["decision", "Decision: register, ask a question, keep looking, or stop"],
  ["confirmation", "Registration confirmation received, if applicable"],
  ["outcome", "Afterwards: what I learned and whether I would return"],
  ["followup", "Any mutually agreed follow-up and chosen channel"],
] as const;
type RecordKey = typeof NETWORKING_RECORD_FIELDS[number][0];

export const FICTIONAL_SEARCH_RECORD: Record<RecordKey, string> = {
  goal: "Fictional reader Ari wants a beginner conversation about checking an AI answer, not a course qualification or client introduction.",
  constraints: "Scenario limits: one visit in Melbourne during October, 120 minutes including travel/preparation, A$30 cash. Online is an alternative. These are invented preferences, not research about attendees.",
  search: "Use the observed Humanitix search above: AI, Melbourne, All dates, checked 10 September 2026. Ari is a teaching character, not an actual search participant.",
  listing: "Introduction to AI: https://events.humanitix.com/intro-ai. Provider information below was checked; Ari's decision is fictional. No provider endorsement or MLAI affiliation is implied.",
  audience: "Sandybeach Centre describes a beginner programme with no prior AI knowledge needed; bring a laptop.",
  participation: "Questions and hands-on practice are described. Peer networking and Ari's access needs are unconfirmed. The listing was marked full, with a waitlist route; that is not an available place.",
  commitment: "Published programme: Wednesdays, 7 October–4 November 2026, 1:30–3pm; the first date is labelled AEDT. Venue: 2 Sims Street, Sandringham. Five 90-minute sessions total 450 minutes before travel, preparation or follow-up—not a one-off 90-minute commitment. Displayed price: $75 per person; final currency/fees were not checked.",
  unknowns: "Whether a one-off alternative meets the question, access needs and full cash budget. Ask the organiser only if that alternative is worth investigating. Draft, not sent: Does a one-off beginner session include participant questions, and what are its total cost and access arrangements?",
  decision: "Keep looking for this task. The listed five-session commitment exceeds the scenario's one-visit/120-minute limit independently of any price comparison. A good topic match does not cancel that failed requirement. Do not assume the displayed $75 has a verified A$ currency or that waitlisting reserves a place.",
  confirmation: "Not registered; no ticket bought, waitlist joined or confirmation received.",
  outcome: "Not attended. No learning outcome, event-quality score or return decision has been observed.",
  followup: "None agreed and no enquiry sent. A public event page or attendee list is not consent to a marketing sequence.",
};

export const NETWORKING_BLANK = NETWORKING_RECORD_FIELDS.map(([, label]) => `${label}:`).join("\n");
export const NETWORKING_RECORD_FILE = [
  "MLAI event search-to-shortlist record — edited 10 September 2026",
  "Save and edit your own copy. This file sends no notes, registers for no event and does not reserve a place.",
  "Use before a decision; fill experience fields only after attending. Unknown essentials mean ask; a failed essential requirement can mean skip. A useful search can end without registering.",
  "\nCOMPLETED FICTIONAL READER DECISION — real dated listing, invented reader; no attendance or customer outcome",
  ...NETWORKING_RECORD_FIELDS.map(([key, label]) => `${label}:\n${FICTIONAL_SEARCH_RECORD[key]}\n`),
  "BLANK RECORD — duplicate for each candidate; leave unperformed steps marked not done",
  NETWORKING_BLANK,
  "\nCheck source dates, full commitment, exact format/ticket, access and total cost before committing. Provider facts can change; the example is not a live availability recommendation.",
  `Guide: https://mlai.au${NETWORKING_PATH}`,
].join("\n") + "\n";
