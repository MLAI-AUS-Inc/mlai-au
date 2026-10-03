/** Dated discovery observations, not ticket availability or an event ranking. */
export const DISCOVERY_CHECKED_AT = "2026-09-10T11:18:07Z";
export const DISCOVERY_REVIEW_AFTER = "2026-09-16T14:00:00Z";
export const EVENT_DISCOVERY_PATH = "/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia";
export const EVENT_SHORTLIST_DOWNLOAD = "/downloads/event-discovery/shortlist.txt";

export function discoveryReviewState(now: number | null): "unknown" | "checked" | "overdue" {
  if (now === null || !Number.isFinite(now) || now < Date.parse(DISCOVERY_CHECKED_AT)) return "unknown";
  return now >= Date.parse(DISCOVERY_REVIEW_AFTER) ? "overdue" : "checked";
}

export const DISCOVERY_ROUTES = [
  {
    id: "meetup", name: "Meetup", url: "https://www.meetup.com/",
    task: "Find a recurring group or search by location and event format.",
    steps: "Enter AI in the event search, replace the suggested location with Melbourne, select Melbourne, Australia, then search. Open the type filter and choose Online to repeat the search for remote participation.",
    result: "The signed-out check applied Melbourne and Online, but its result list was not verified because no cards rendered. A follow-up in an existing signed-in browser returned online cards, including AI Governance Is No Longer Optional: Here's How to Do It Right. Online and Within 30 kilometers remained selected. This is not evidence that Melbourne has no AI events, nor a ranking of the returned sessions.",
    coverage: "Meetup documents keyword/city, date, online/in-person, distance and category filters. It does not offer country or language filtering; search another city separately. Its time-of-day filter is documented for the app, not this web test.",
    account: "Public search controls were accessible signed out. Meetup says an account is required to join a group or attend an event. Account creation is free; event charges are a separate question. No account or RSVP was created in this check.",
    documentation: "https://help.meetup.com/hc/en-us/articles/39235072484109-Finding-an-event",
    accountSource: "https://help.meetup.com/hc/en-us/articles/39232700471181-How-do-I-sign-up-for-a-Meetup-account",
  },
  {
    id: "luma", name: "Luma Discover", url: "https://luma.com/discover",
    task: "Find a public city event, then inspect its exact ticket options.",
    steps: "From Discover, open Melbourne, use the city page's Search button and enter AI. Open an individual result rather than treating its small city card as the complete listing.",
    result: "The signed-out AI search displayed event results including AI Hype to Practice and AI Engineer Night Melbourne #1. The latter showed Waitlist. This is an observed search example, not an assessment of the sessions or a promise of admission.",
    coverage: "Luma documents city/category search, but Search and Discover are for public in-person events with recognised locations; online-only and private events do not appear. City highlights are curated and are not the same as the wider search results. For remote sessions, use the host's calendar or ask for its direct event link.",
    account: "Browsing was possible signed out. Luma's documentation says initial registration requires name and email, not a Luma account or sign-in. Additional questions, payment and approval may apply; registering again can require sign-in. Registration and email delivery were not tested.",
    documentation: "https://help.luma.com/p/searching-for-events",
    accountSource: "https://help.luma.com/p/event-registration-process",
  },
  {
    id: "atrium", name: "Atrium's Australian Tech Communities", url: "https://www.atrium.me/community",
    task: "Discover a specialist community whose own calendar you can follow.",
    steps: "Enter Melbourne in Search communities to narrow the directory. Replace it with Build Club, open its Website link, then follow Events on the Build Club site to its Luma calendar.",
    result: "Both directory searches narrowed the visible community rows. The Build Club entry led to buildclub.ai, whose Events link points to the buildercommunityanz calendar. This checks the discovery path, not the directory's claims about community size, member outcomes or quality.",
    coverage: "The inspected directory has keyword search and category buttons, not a verified date/online-event filter. A city keyword can find community descriptions; it does not prove a session is scheduled there. Check dates and format at the organiser.",
    account: "The directory, linked organiser site and public calendar can be read without joining the community. Requirements for participating belong to the particular organiser and registration page; no membership or subscription was attempted.",
    documentation: "https://www.buildclub.ai/",
    accountSource: "https://luma.com/buildercommunityanz",
  },
  {
    id: "mlai", name: "MLAI event calendar", url: "/events",
    task: "Find the publisher's AI and startup-community sessions.",
    steps: "Open Events, switch between Calendar View and List View, then follow Register for a particular session. On the linked ticket page, compare each ticket's format and conditions.",
    result: "The public check followed AI Hype to Practice to its Luma listing. A physical venue and a separate Join Online ticket appeared on the same event. Neither the venue nor the cheapest displayed price describes every ticket.",
    coverage: "This is MLAI's own calendar, not a comparison of all Australian organisers. Calendar entries and a source-checked shortlist can have different coverage; inspect the chosen session even when it matches your preferred city or online format.",
    account: "The calendar and linked event were readable signed out. Registration takes place at the linked provider; the inspected session used Luma. No registration, approval, purchase or attendance was tested.",
    documentation: "https://mlai.au/events",
    accountSource: "https://luma.com/mlai-nu4n",
  },
] as const;

export const EVENT_RECORD_FIELDS = [
  ["goal", "My goal / city or online / available dates"],
  ["event", "Event title / organiser / official listing URL"],
  ["checked", "Checked on / event date / displayed timezone"],
  ["format", "Format / venue or joining instructions"],
  ["activity", "Topic / level / prerequisites / what I will do"],
  ["cost", "Exact ticket / currency / fees / travel / total budget"],
  ["terms", "Cancellation / refund terms"],
  ["access", "Accessibility or participation needs / organiser response"],
  ["admission", "Registration confirmed, pending or waitlisted"],
  ["unknowns", "Unresolved requirements / question / answer needed by"],
  ["decision", "Decision: attend, ask a question, or skip — why?"],
  ["afterwards", "Afterwards: what was useful / would I return?"],
] as const;
type RecordKey = typeof EVENT_RECORD_FIELDS[number][0];
export const FICTIONAL_EVENT_RECORD: Record<RecordKey, string> = {
  goal: "Fictional reader: understand healthcare AI deployment, without coding; online only; evening of 15 September; total budget A$20; captions required.",
  event: "AI Hype to Practice / MLAI and listed co-host / https://luma.com/mlai-nu4n. Real listing, fictional reader decision; not an attendance review.",
  checked: "10 September 2026. Listing: Tuesday 15 September, 5:30–8:30 pm AEST. This is the event window, not a verified online-stream duration.",
  format: "Venue listed: Stone & Chalk Melbourne. Separate Join Online ticket observed; remote joining instructions and which parts are streamed are unverified.",
  activity: "Healthcare AI deployment panel and Q&A described. No coding exercise promised. Beginner suitability still needs confirmation.",
  cost: "City card: $12.50 beside a venue. Event page: Standard $24.60; Early Bird $14.60 marked Sold Out; Join Online $12.50. Displayed dollar amounts at the check, not a verified final charge or currency. Do not infer that the in-person ticket costs $12.50 or that the online option meets the A$20 budget.",
  terms: "Not recorded in this check. Ask for the cancellation/refund conditions before paying.",
  access: "Captions required by this fictional reader; not confirmed. No organiser response has been obtained.",
  admission: "Not registered. No confirmed place, pending request or waitlist entry exists for this fictional reader.",
  unknowns: "Confirm captions, beginner suitability, streamed segments, joining process, final currency/fees and refund terms. Fictional decision deadline: 14 September; this is not the organiser's sales deadline.",
  decision: "Ask before paying. Topic and a remote ticket are promising, but unknown access and total cost are blockers. If captions cannot be confirmed or the full charge exceeds the budget, skip and choose another session.",
  afterwards: "Not attended; no outcome or intention to return recorded. Complete this only after a real visit.",
};
export const EVENT_SHORTLIST = EVENT_RECORD_FIELDS.map(([, label]) => `${label}:`).join("\n");
export const EVENT_SHORTLIST_FILE = [
  "MLAI event discovery record",
  "Edited 10 September 2026. Save your own copy. This file does not register you or send answers to MLAI.",
  "Use evidence, not an additive score. An unknown essential requirement means ask; a failed requirement can mean skip. A good topic cannot compensate for an inaccessible format.",
  "\nCOMPLETED FICTIONAL READER EXAMPLE — real dated listing, no purchase or attendance",
  ...EVENT_RECORD_FIELDS.map(([key, label]) => `${label}:\n${FICTIONAL_EVENT_RECORD[key]}\n`),
  "BLANK RECORD — duplicate for each candidate; use unknown, not a guessed answer",
  EVENT_SHORTLIST,
  `\nGuide: https://mlai.au${EVENT_DISCOVERY_PATH}`,
  "Recheck the current organiser page before making plans; the historical example is not current ticket availability.",
].join("\n") + "\n";
