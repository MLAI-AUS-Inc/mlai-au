import { melbourneEventStatus, type MelbourneEventListing } from "./melbourne-ai-events";

export const SYDNEY_EVENT_DATASET_VERIFIED_AT = "2026-10-29";
export const SYDNEY_EVENT_DATASET_OWNER = "MLAI editorial";
export const SYDNEY_EVENT_REVIEW_AFTER = "2026-11-05T00:00:00+11:00";
/** Calendar-day helper also used by the separate accelerator intake notice. */
export function sydneyDate(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Sydney", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  return part("year") + "-" + part("month") + "-" + part("day");
}
export type SydneyEventGoal = "all" | "build" | "research" | "founders" | "business" | "careers" | "data" | "web";
export type SydneyEventFormat = "in-person" | "online";
export type SydneyEventSession = MelbourneEventListing & {
  goals: Exclude<SydneyEventGoal, "all">[];
  costCategory: "free" | "paid" | "not-stated";
  /** Earliest conflicting end: do not present a current-time match after this. */
  uncertainAfter?: string;
  uncertainty?: string;
};
export type SydneyAiTechEvent = { name: string; audience: string; sourceUrl: string; sessions: SydneyEventSession[] };
const review = { checkedAt: "2026-09-10T06:19:00Z", reviewAfter: "2026-09-17T00:00:00+10:00" };

const freshReview = { checkedAt: "2026-10-29T11:05:13Z", reviewAfter: SYDNEY_EVENT_REVIEW_AFTER };

// Event-specific formats and prices, never every option a group has ever offered.
export const SYDNEY_AI_TECH_EVENTS: SydneyAiTechEvent[] = [
  { name: "Cursor Sydney", audience: "People interested in AI-assisted software development and product demos.", sourceUrl: "https://cursorsydney.com/events/", sessions: [{
    id: "cursor-august", name: "Cursor Sydney #7", organiser: "Cursor Sydney", inPersonCity: "Sydney", formats: ["in-person"], goals: ["build", "web", "careers"],
    startAt: "2026-08-12T17:30:00+10:00", endAt: "2026-08-13T00:00:00+10:00", precision: "date-window",
    schedule: "12 August 2026, doors 5:30 pm AEST. Closing time not stated; 8 pm starts networking, not a verified finish.",
    location: "Historical venue: Atlassian, George Street, Sydney.", readerFit: "AI coding talks and discussion. No later date found on the reviewed index.",
    costCategory: "not-stated", price: "Price not stated in the reviewed event page.",
    admission: "Historical listing despite a surviving Upcoming label; no future booking is established.",
    sourceUrl: "https://cursorsydney.com/events/2026-08-meetup/", ...review,
  }] },
  { name: "AI on Tap Australia", audience: "Founders, business leaders and operators; the organiser says no technical background is required.", sourceUrl: "https://www.meetup.com/ai-on-tap-australia/events/314330717/", sessions: [{ id: "ai-on-tap-november", name: "AI on Tap | Sydney | Episode 7 (November listing)", organiser: "AI on Tap Australia", inPersonCity: "Sydney", formats: ["in-person"], goals: ["business", "founders", "careers"], startAt: "2026-11-05T17:30:00+11:00", endAt: "2026-11-05T20:30:00+11:00", precision: "minute", schedule: "5 November 2026, 5:30–8:30 pm AEDT (UTC+11).", location: "El Loco at Slip Inn, 111 Sussex Street, Sydney.", readerFit: "Business panel, tips and conversation; no technical background stated as necessary.", costCategory: "paid", price: "$25 displayed; confirm currency and final checkout charges.", admission: "Reused event URL now displays November; ticket capacity and checkout were not tested.", sourceUrl: "https://www.meetup.com/ai-on-tap-australia/events/314330717/", ...freshReview }, {
    id: "ai-on-tap-october", name: "AI on Tap | Sydney | Episode 7", organiser: "AI on Tap Australia", inPersonCity: "Sydney", formats: ["in-person"], goals: ["business", "founders", "careers"],
    startAt: "2026-10-01T17:30:00+10:00", endAt: "2026-10-01T20:30:00+10:00", precision: "minute",
    schedule: "1 October 2026, 5:30–8:30 pm AEST (UTC+10).", location: "El Loco at Slip Inn, 111 Sussex Street, Sydney.",
    readerFit: "Business-oriented panel and discussion, not a coding workshop.", costCategory: "paid",
    price: "$25 displayed in the Sydney description; confirm currency and final charges.",
    admission: "Ticket capacity and checkout terms were not verified.",
    sourceUrl: "https://www.meetup.com/ai-on-tap-australia/events/314330717/", ...review,
  }] },
  { name: "AI Week Sydney", audience: "AI engineers, developers and technical learners; individual events have different commitments.", sourceUrl: "https://aiweek.com.au/", sessions: [{
    id: "sydney-hackathon", name: "AI Engineer Sydney Hackathon", organiser: "Web Directions with MLAI", mlaiCoHosted: true, inPersonCity: "Sydney", formats: ["in-person"], goals: ["build", "founders", "careers"],
    startAt: "2026-12-04T00:00:00+11:00", endAt: "2026-12-06T00:00:00+11:00", precision: "date-window",
    schedule: "4–5 December 2026: Friday evening and Saturday, Sydney time (AEDT, UTC+11). Exact session times not published.",
    location: "Stone & Chalk, Sydney on the dedicated hackathon page; confirm exact address. The programme hub still says venue TBA.",
    readerFit: "Team-based building with mentors; finalists are offered a conference pitch. Not a paid Studio project.",
    costCategory: "free", price: "The dedicated page says free and fully catered.",
    admission: "RSVP form visible; places limited. No RSVP or admission tested. Web Directions explicitly names MLAI as co-host.",
    sourceUrl: "https://webdirections.org/ai-engineer/hack-day/", ...freshReview,
  }, {
    id: "ai-engineer-sydney", name: "AI Engineer Sydney conference", organiser: "Web Directions", inPersonCity: "Sydney", formats: ["in-person", "online"], goals: ["build", "research", "data", "careers"],
    startAt: "2026-12-07T09:00:00+11:00", endAt: "2026-12-08T17:00:00+11:00", precision: "date-window",
    schedule: "7–8 December 2026; the programme hub lists 9 am–5 pm each day, AEDT (UTC+11). Not a continuous overnight session.",
    location: "Hilton Sydney, 488 George Street, with a separate online streaming pass.",
    readerFit: "Conference talks; workshop passes are separate. A larger paid commitment than a meetup.",
    costCategory: "paid", price: "Paid in-person and streaming passes; compare the actual tier, currency, taxes and final charges.",
    admission: "Streaming is separate from the free in-person hackathon. No purchase or stream access was tested.",
    sourceUrl: "https://webdirections.org/ai-engineer/", ...freshReview,
  }] },
  { name: "Sydney AI Meetup", audience: "Students, researchers and practitioners interested in technical research seminars.", sourceUrl: "https://sydneyaimeetup.org/", sessions: [{ id: "sydney-ai-october", name: "From Reasoning to Control: Distilling Control-Relevant Summaries via Latent Workspaces", organiser: "Sydney AI Meetup", formats: ["online"], goals: ["research", "data"], startAt: "2026-10-30T14:00:00+11:00", endAt: "2026-10-30T15:00:00+11:00", precision: "minute", schedule: "30 October 2026, 2–3 pm AEDT (Sydney).", location: "Online via Zoom; organiser links free Eventbrite registration.", readerFit: "Specialist vision-language-action research: 45-minute talk and 15-minute Q&A, not a no-code introduction.", costCategory: "free", price: "Organiser labels registration FREE.", admission: "Check the organiser registration and joining details; no registration or stream was tested.", sourceUrl: "https://sydneyaimeetup.org/", ...freshReview }, {
    id: "sydney-ai-august", name: "Intelligent robots for microsurgery seminar", organiser: "Sydney AI Meetup", formats: ["online"], goals: ["research", "data"],
    startAt: "2026-08-28T11:00:00+10:00", endAt: "2026-08-28T12:30:00+10:00", precision: "minute",
    schedule: "28 August 2026, 11 am–12:30 pm AEST. No later date visible at the check.",
    location: "Zoom for this historical seminar.", readerFit: "Specialist research discussion, not a general coding introduction or medical advice.",
    costCategory: "free", price: "The August seminar was advertised as free.",
    admission: "The homepage still calls this Next Event; the date has passed. This does not establish a current free online session.",
    sourceUrl: "https://sydneyaimeetup.org/", ...review,
  }] },
  { name: "SydJS", audience: "JavaScript and web developers; past AI agendas do not make every meetup an AI workshop.", sourceUrl: "https://sydjs.com/", sessions: [{
    id: "sydjs-september", name: "Complex queries with simple JavaScript", organiser: "SydJS", inPersonCity: "Sydney", formats: ["in-person"], goals: ["build", "web", "data", "careers"],
    startAt: "2026-09-16T18:00:00+10:00", endAt: "2026-09-16T20:00:00+10:00", uncertainAfter: "2026-09-16T19:30:00+10:00", precision: "minute",
    schedule: "16 September 2026, 6 pm AEST; Meetup ends 7:30 pm while sydjs.com lists 8 pm. Confirm the finish.",
    uncertainty: "Conflicting end times: 7:30 versus 8 pm. After 7:30 pm this is no longer a current-time match.",
    location: "Atlassian, Level 29, 363 George Street, Sydney.", readerFit: "JSMQL/MongoDB-query talk, explicitly a break from recent AI agendas; not an AI code-along.",
    costCategory: "not-stated", price: "Price not stated on the reviewed pages; do not assume free.",
    admission: "Check registration and the differing end times before travel.",
    sourceUrl: "https://www.meetup.com/en-au/sydjs-classic/events/312469944/", ...review,
  }] },
  { name: "Google Developer Group Sydney", audience: "Developers and technical learners interested in AI security and delivery.", sourceUrl: "https://gdg.community.dev/gdg-sydney/", sessions: [{
    id: "gdg-september", name: "GDG Sydney Meetup: September 2026", organiser: "GDG Sydney", inPersonCity: "Sydney", formats: ["in-person"], goals: ["build", "business", "careers"],
    startAt: "2026-09-10T17:30:00+10:00", endAt: "2026-09-10T20:00:00+10:00", uncertainAfter: "2026-09-10T19:30:00+10:00", precision: "minute",
    schedule: "10 September 2026, 5:30 pm AEST; agenda ends 7:30 pm but the date box ends 8 pm.",
    uncertainty: "The same page gives two finish times. After 7:30 pm this is no longer a current-time match.",
    location: "Mantel, 580 George Street, Sydney.", readerFit: "AI security and governance talks, plus a short hiring/job-seeker segment; no job outcome is promised.",
    costCategory: "free", price: "The GDG chapter index advertises free registration for this meetup.",
    admission: "In person only; the organiser explicitly says no stream is planned. RSVP is not guaranteed admission.",
    sourceUrl: "https://gdg.community.dev/events/details/google-gdg-sydney-presents-gdg-sydney-meetup-september-2026/", ...review,
  }] },
  { name: "Sydney AI Developers Group", audience: "AI developers interested in moving from prototypes to production.", sourceUrl: "https://www.meetup.com/en-au/sydney-ai-tech-talks/", sessions: [{ id: "aicamp-november", name: "AI Deep Dive with Google: Discriminative models (Ep 5)", organiser: "AICamp / Sydney AI Developers", formats: ["online"], goals: ["build", "data"], startAt: "2026-11-12T04:00:00+11:00", endAt: "2026-11-13T00:00:00+11:00", precision: "date-window", schedule: "AICamp states 11 November 2026 at 9 am PST, equivalent to 12 November at 4 am AEDT. End time unverified; the boundary only marks the end of the Sydney calendar day.", location: "Online; joining link through AICamp registration.", readerFit: "Technical discriminative-model workshop; confirm preparation and local time.", costCategory: "not-stated", price: "No price confirmed on the reviewed event page; does not pass the free filter.", admission: "AICamp registration/login is required; Meetup RSVP alone does not supply a joining link. No registration was submitted.", sourceUrl: "https://www.aicamp.ai/event/eventdetails/W2026111109", ...freshReview }, {
    id: "fde-september", name: "AI Meetup for Forward Deployed Engineering", organiser: "AICamp / Sydney AI Developers", inPersonCity: "Sydney", formats: ["in-person"], goals: ["build", "business", "careers"],
    startAt: "2026-09-22T17:30:00+10:00", endAt: "2026-09-23T00:00:00+10:00", uncertainAfter: "2026-09-22T19:30:00+10:00", precision: "date-window",
    schedule: "22 September 2026, check-in 5:30 pm AEST, panel 6–7:30 pm, then mixer. Closing time unverified.",
    uncertainty: "Meetup metadata ends at 7:30 pm, but AICamp starts the mixer then. Do not treat that metadata as a confirmed closing time.",
    location: "Atlassian, Level 29, 363 George Street, Sydney.", readerFit: "Forward deployed engineering panel. Generic group references to labs do not make this a promised hands-on workshop.",
    costCategory: "not-stated", price: "Price not stated on the reviewed AICamp page.",
    admission: "The Meetup group requires AICamp registration; Meetup RSVP alone is insufficient. AICamp requires login. No submission or admission tested.",
    sourceUrl: "https://www.aicamp.ai/event/eventdetails/W2026092123", ...review,
  }] },
  { name: "Microsoft Power BI & Fabric User Group Sydney", audience: "Data analysts and reporting practitioners, including beginners in Microsoft data tools.", sourceUrl: "https://www.meetup.com/en-au/microsoft-power-bi-fabric-user-group-sydney/", sessions: [{
    id: "power-bi-june", name: "Power BI and Fabric CAT Tour", organiser: "Power BI & Fabric User Group Sydney", inPersonCity: "Sydney", formats: ["in-person"], goals: ["data", "business", "careers"],
    startAt: "2026-06-17T17:00:00+10:00", endAt: "2026-06-18T00:00:00+10:00", precision: "date-window",
    schedule: "17 June 2026, 5 pm AEST start; closing time unverified. No upcoming event displayed.",
    location: "Historical listing: Microsoft, Level 27, 1 Denison Street, North Sydney.", readerFit: "Analytics and reporting community, not a general AI-coding meetup.",
    costCategory: "not-stated", price: "Not stated on the reviewed group page.",
    admission: "Past activity does not establish the next date, venue, price or admission.",
    sourceUrl: "https://www.meetup.com/en-au/microsoft-power-bi-fabric-user-group-sydney/", ...review,
  }] },
];
export const SYDNEY_STATUS_LABELS = {
  unknown: "Date status unavailable — check organiser",
  snapshot: "Dated source snapshot — check organiser",
  past: "Listed dates have passed",
  "needs-review": "Source recheck overdue — do not assume availability",
  "listed-future": "Future date listed — admission is separate",
  "listed-window": "Within listed dates — check session times and admission",
  "uncertain-end": "Closing time uncertain — check organiser",
} as const;
export function sydneyEventStatus(event: SydneyEventSession, now: number | null): keyof typeof SYDNEY_STATUS_LABELS {
  const status = melbourneEventStatus(event, now);
  if (event.uncertainAfter) {
    const boundary = Date.parse(event.uncertainAfter);
    if (melbourneEventStatus({ ...event, endAt: event.uncertainAfter }, now) === "unknown" || boundary > Date.parse(event.endAt)) return "unknown";
    if (now !== null && now >= boundary && status === "listed-window") return "uncertain-end";
  }
  return status;
}
export function sydneyEventSessions(events = SYDNEY_AI_TECH_EVENTS) { return events.flatMap(group => group.sessions); }
export function currentSydneySessions(now: number | null, events = SYDNEY_AI_TECH_EVENTS) {
  return sydneyEventSessions(events).filter(event => ["listed-future", "listed-window"].includes(sydneyEventStatus(event, now)));
}

export const SYDNEY_ORGANISER_RECHECKS = [
 { name: "Cursor Sydney", note: "Index lists 7 October as past; no later date was visible. The older August record remains historical." },
 { name: "AI on Tap Australia", note: "The same Episode 7 URL now shows 5 November; its earlier October snapshot is retained as history." },
 { name: "AI Week Sydney", note: "Dedicated December hackathon/conference dates remain listed; hub/navigation week-range and venue differences remain." },
 { name: "Sydney AI Meetup", note: "New free Zoom research seminar listed for 30 October, 2–3 pm AEDT." },
 { name: "SydJS", note: "The index calls 26 October Upcoming despite its passed date. No next date was verified." },
 { name: "Google Developer Group Sydney", note: "Chapter index says no upcoming events and lists 9 October DevFest in past events." },
 { name: "Sydney AI Developers Group", note: "The group links a 12 November AEDT online AICamp workshop; end time and price remain unverified." },
 { name: "Microsoft Power BI & Fabric User Group Sydney", note: "The accessible group page showed past events only; a new date was not established." },
].map(row => ({ ...row, last_verified_at: "2026-10-29", next_review_at: SYDNEY_EVENT_REVIEW_AFTER }));
