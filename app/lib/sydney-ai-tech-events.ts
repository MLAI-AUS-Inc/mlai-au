export const SYDNEY_EVENT_DATASET_VERIFIED_AT = "2026-07-29";
export const SYDNEY_EVENT_DATASET_OWNER = "MLAI editorial";
export const SYDNEY_EVENT_DATASET_REVIEW_CADENCE = "Monthly";

export type SydneyEventGoal =
  | "build"
  | "research"
  | "founders"
  | "business"
  | "careers"
  | "data"
  | "web";

export type SydneyEventFormat = "in-person" | "online";
export type SydneyEventActivityStatus = "upcoming" | "recent-recurring";
export type SydneyEventCost = "free" | "paid" | "mixed" | "not-stated";

export type SydneyAiTechEvent = {
  name: string;
  kind: "meetup" | "user group" | "event hub";
  audience: string;
  topics: string;
  goals: SydneyEventGoal[];
  cadence: string;
  nextOrLatestActivity: string;
  activityDate: string;
  activityStatus: SydneyEventActivityStatus;
  costCategory: SydneyEventCost;
  cost: string;
  formats: SydneyEventFormat[];
  venueOrPlatform: string;
  accessibility: string;
  sourceUrl: string;
  sourceLabel: string;
  lastVerified: string;
};

/**
 * This is a dated discovery aid, not an endorsement or a promise that an event
 * will run. "Upcoming" means MLAI found a future date on the organiser's page
 * during the review. "Recent recurring" means the group showed recent activity
 * or an explicit recurring cadence, but no future date was verified.
 */
export const SYDNEY_AI_TECH_EVENTS: SydneyAiTechEvent[] = [
  {
    name: "Cursor Sydney",
    kind: "meetup",
    audience:
      "Software engineers, product managers, designers, students and people building with AI coding tools",
    topics: "AI-assisted software development, product demos and technical talks",
    goals: ["build", "careers", "web"],
    cadence: "Numbered community meetups; check the organiser for later dates",
    nextOrLatestActivity:
      "Upcoming: Cursor Sydney #7, 12 August 2026, 5:30–8:00 pm",
    activityDate: "2026-08-12",
    activityStatus: "upcoming",
    costCategory: "not-stated",
    cost: "Not stated on the reviewed event page",
    formats: ["in-person"],
    venueOrPlatform: "Atlassian, George Street, Sydney",
    accessibility:
      "Access adjustments were not stated on the reviewed page; contact the organiser before booking if needed",
    sourceUrl: "https://cursorsydney.com/events/2026-08-meetup/",
    sourceLabel: "Cursor Sydney event page",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "Proof to Production Australia — AI on Tap",
    kind: "meetup",
    audience:
      "Founders, marketers, business leaders and operators; the organiser says no technical background is required",
    topics:
      "Applied AI in business, implementation lessons, panels and structured networking",
    goals: ["founders", "business", "careers"],
    cadence: "Described by the organiser as a monthly meetup",
    nextOrLatestActivity:
      "Upcoming: AI on Tap, 6 August 2026, 5:30–8:30 pm",
    activityDate: "2026-08-06",
    activityStatus: "upcoming",
    costCategory: "paid",
    cost: "A$25 on the reviewed event page",
    formats: ["in-person"],
    venueOrPlatform: "El Loco at Slip Inn, 111 Sussex Street, Sydney",
    accessibility:
      "Access adjustments were not stated on the reviewed page; contact the organiser before booking if needed",
    sourceUrl:
      "https://www.meetup.com/en-au/proof-to-production-australia/events/314330717/",
    sourceLabel: "Proof to Production organiser listing",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "AI Week Sydney",
    kind: "event hub",
    audience:
      "AI engineers, software developers, researchers, product people, designers, founders and students",
    topics:
      "AI engineering, workshops, research, product practice, side events and a community hack day",
    goals: ["build", "research", "founders", "careers", "data"],
    cadence: "Annual multi-event program",
    nextOrLatestActivity:
      "Upcoming: 6–13 December 2026; individual sessions have separate registrations",
    activityDate: "2026-12-06",
    activityStatus: "upcoming",
    costCategory: "mixed",
    cost:
      "Mixed: the main conference is paid, the Hack Day is described as free, and other event terms vary",
    formats: ["in-person", "online"],
    venueOrPlatform:
      "Multiple Sydney venues; the main AI Engineer conference is at Hilton Sydney and offers streaming",
    accessibility:
      "The reviewed pages describe transport and streaming but not access adjustments; check the relevant event organiser",
    sourceUrl: "https://aiweek.com.au/",
    sourceLabel: "AI Week Sydney program",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "Sydney AI Meetup",
    kind: "meetup",
    audience:
      "Students, researchers, academics, practitioners and industry participants interested in AI",
    topics:
      "AI research and practice through seminars, symposia and technical presentations",
    goals: ["build", "research", "data"],
    cadence: "Monthly seminars plus recurring symposia",
    nextOrLatestActivity:
      "Recent recurring activity: free online seminar on 24 July 2026; no later date was listed",
    activityDate: "2026-07-24",
    activityStatus: "recent-recurring",
    costCategory: "free",
    cost: "The most recent reviewed seminar was free",
    formats: ["in-person", "online"],
    venueOrPlatform:
      "Recent event on Zoom; other listed events include University of Sydney sessions",
    accessibility:
      "Access adjustments were not stated on the reviewed page; ask the organiser for the specific event",
    sourceUrl: "https://sydneyaimeetup.org/",
    sourceLabel: "Sydney AI Meetup official site",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "SydJS",
    kind: "meetup",
    audience:
      "JavaScript and web developers, including people exploring AI-assisted development",
    topics: "JavaScript, web engineering, developer tools and occasional AI themes",
    goals: ["build", "careers", "web"],
    cadence: "Recurring community meetups; several events were listed in 2026",
    nextOrLatestActivity:
      "Recent recurring activity: AI special event on 22 July 2026; no later date was listed",
    activityDate: "2026-07-22",
    activityStatus: "recent-recurring",
    costCategory: "not-stated",
    cost: "Not stated on the reviewed event page",
    formats: ["in-person"],
    venueOrPlatform: "Most recent reviewed event: Atlassian HQ, Sydney",
    accessibility:
      "Access adjustments were not stated on the reviewed page; contact the organiser before booking if needed",
    sourceUrl: "https://sydjs.com/",
    sourceLabel: "SydJS official site",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "Google Developer Group Sydney",
    kind: "user group",
    audience:
      "Software developers, data practitioners and people learning Google technologies",
    topics:
      "Software development, AI, data, Android and developer career connections",
    goals: ["build", "careers", "data"],
    cadence: "Community-organised developer meetups; verify each new event",
    nextOrLatestActivity:
      "Recent activity: Sydney meetup on 10 June 2026; no later date was verified",
    activityDate: "2026-06-10",
    activityStatus: "recent-recurring",
    costCategory: "not-stated",
    cost: "Not stated on the reviewed event page",
    formats: ["in-person"],
    venueOrPlatform: "Most recent reviewed event: Mantel Group, 580 George Street, Sydney",
    accessibility:
      "Access adjustments were not stated on the reviewed page; contact the organiser before booking if needed",
    sourceUrl:
      "https://gdg.community.dev/events/details/google-gdg-sydney-presents-gdg-sydney-meetup-june-2026/",
    sourceLabel: "GDG Sydney event page",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "Sydney AI Developers Group",
    kind: "meetup",
    audience:
      "AI developers, machine-learning engineers, data practitioners and technical learners",
    topics:
      "Generative AI, LLMs, agents, machine learning, MLOps, data and code labs",
    goals: ["build", "research", "careers", "data"],
    cadence:
      "The organiser describes regular talks, workshops and code labs; 205 past events were displayed",
    nextOrLatestActivity:
      "Recent activity: Build with AI event on 26 May 2026; no future date was listed",
    activityDate: "2026-05-26",
    activityStatus: "recent-recurring",
    costCategory: "not-stated",
    cost: "Not stated for the most recent reviewed event",
    formats: ["in-person", "online"],
    venueOrPlatform:
      "Most recent reviewed in-person event: Google Sydney; the group also lists virtual sessions",
    accessibility:
      "Access adjustments were not stated on the reviewed page; ask the organiser for the specific event",
    sourceUrl: "https://www.meetup.com/en-au/sydney-ai-tech-talks/",
    sourceLabel: "Sydney AI Developers Group organiser page",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
  {
    name: "Microsoft Power BI & Fabric User Group Sydney",
    kind: "user group",
    audience:
      "Data analysts, reporting practitioners, Microsoft Fabric users and beginners",
    topics:
      "Data analytics, Power BI, Microsoft Fabric, reporting and practitioner case studies",
    goals: ["business", "careers", "data"],
    cadence: "Recurring user-group events; verify the next listing before travel",
    nextOrLatestActivity:
      "Recent activity: in-person meetup on 17 June 2026; no future date was listed",
    activityDate: "2026-06-17",
    activityStatus: "recent-recurring",
    costCategory: "not-stated",
    cost: "Not stated on the reviewed group page",
    formats: ["in-person"],
    venueOrPlatform: "Most recent reviewed event: Microsoft, North Sydney",
    accessibility:
      "Access adjustments were not stated on the reviewed page; contact the organiser before booking if needed",
    sourceUrl:
      "https://www.meetup.com/en-au/microsoft-power-bi-fabric-user-group-sydney/",
    sourceLabel: "Power BI & Fabric Sydney organiser page",
    lastVerified: SYDNEY_EVENT_DATASET_VERIFIED_AT,
  },
];
