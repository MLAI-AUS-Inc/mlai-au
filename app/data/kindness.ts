// Hacks of Kindness (/kindness): every fact, link, flag and line of copy.
//
// Rules for editing this file:
// - A fact the organisers have not confirmed is `null`. The element that would
//   show it is not rendered, so no placeholder ever reaches the page.
// - Display lines are authored line by line (arrays) and are never left to wrap.
// - Each section has a `show` flag so sections can go live in page order.

export type KindnessPhase = "before" | "live" | "after";

export type KindnessLogo = {
  /** The organisation's name: the image's alt text, and the fallback when there is no logo file. */
  name: string;
  /** A logo file under /public, or null to print the name instead. */
  src: string | null;
  /** Intrinsic size of the logo file, so the image reserves its space. */
  width?: number;
  height?: number;
  /** Size correction for marks that read too big or small at the shared height. */
  scale?: number;
  url?: string | null;
};

/** Event facts. Change these in one place; every section reads from here. */
export const facts = {
  name: "Hacks of Kindness",
  shortName: "Hacks of Kindness",
  cities: ["Sydney", "Melbourne"] as const,
  /** ISO dates with the Melbourne and Sydney summer offset. */
  fridayDate: "2026-12-04",
  saturdayDate: "2026-12-05",
  grandFinalDate: "2026-12-07",
  /** Start time on Friday evening, as an ISO instant. Not confirmed yet. */
  fridayStartAt: null as string | null,
  /** Venue lines. Not confirmed yet. */
  venues: { sydney: null as string | null, melbourne: null as string | null },
  /** Luma registration pages. City-specific links are not confirmed. */
  luma: {
    sydney: null as string | null,
    melbourne: null as string | null,
    /** Shared registration page for all participants. */
    both: "https://luma.com/n6q3mp7y" as string | null,
  },
  /** MLAI Slack invite link. Not confirmed yet. */
  slackUrl: null as string | null,
  /** Where a for-purpose business pitches a problem. Not confirmed yet. */
  pitchProblemUrl: null as string | null,
  /** Where a society, club or meetup asks to come as a crew. Not confirmed yet. */
  crewContactUrl: null as string | null,
  /** Event contact email addresses. Not confirmed yet. */
  contactEmail: null as string | null,
  secondContactEmail: null as string | null,
  codeOfConductUrl: null as string | null,
  /** Where finished builds are shown after the event. Not confirmed yet. */
  showcaseUrl: null as string | null,
  webDirectionsUrl: null as string | null,
  mlaiUrl: "https://mlai.au",
  privacyUrl: "/privacy",
  mlaiMembers: 12000,
} as const;

/** Phase clock. Both instants are null until confirmed, which keeps the page in "before". */
export const phase = {
  liveAt: null as string | null,
  afterAt: null as string | null,
  force: null as KindnessPhase | null,
};

export const meta = {
  title: "Hacks of Kindness: build in one day for a for-purpose business",
  description:
    "A free hackathon in Sydney and Melbourne, 4 to 5 December 2026. Use tech and AI to solve a real problem for a for-purpose business. Presented by Web Directions and MLAI.",
  image: "https://mlai.au/kindness/social-card.jpg",
  imageAlt:
    "Hacks of Kindness: Roo the kangaroo in pixel sunglasses over a teal hand-lettered wordmark. Sydney and Melbourne, 4 to 5 December 2026. Free.",
  themeColor: "#def7fc",
};

/** Official MLAI lockups, used flat and exactly as supplied. */
export const mlaiLogos = {
  /** Reversed "MLAI AUS" wordmark, for dark grounds. */
  reversedWordmark: { name: "MLAI", src: "/press-kit/text-logo.png", width: 522, height: 150 },
  /** Teal-disc mascot lockup, for dark grounds. */
  mascotDisc: { name: "MLAI", src: "/press-kit/mascot-teal.png", width: 584, height: 666 },
  /** Wide teal-disc lockup, for cream grounds. */
  wideOnCream: { name: "MLAI", src: "/press-kit/logo-wide-teal.png", width: 741, height: 257 },
} as const;

export const sections = {
  hero: { id: "top", label: "Top", show: true },
  whatsInIt: { id: "whats-in-it", label: "What's in it", show: true },
  crew: { id: "crew", label: "Your crew", show: true },
  whatYouDo: { id: "what-you-do", label: "What you do", show: true },
  briefs: { id: "briefs", label: "The briefs", show: true },
  hopIn: { id: "hop-in", label: "Hop in", show: true },
  faq: { id: "faq", label: "FAQ", show: true },
  why: { id: "why", label: "Why", show: true },
  behind: { id: "whos-behind-it", label: "Who's behind it", show: true },
  /** Off until there is real material from a past MLAI hackathon. */
  lastTime: { id: "last-time", label: "Last time", show: false },
  contact: { id: "contact", label: "Contact", show: true },
} as const;

/** Rail order. "Why" has no rail stop; the rail lists the deck's ten labels. */
export const railOrder = [
  "hero",
  "whatsInIt",
  "crew",
  "whatYouDo",
  "briefs",
  "hopIn",
  "faq",
  "behind",
  "lastTime",
  "contact",
] as const satisfies ReadonlyArray<keyof typeof sections>;

export const intro = {
  credit: "A WEB DIRECTIONS × MLAI HACKATHON",
  stages: ["MIXING THE INK", "PULLING THE PRINT", "DOORS OPEN"],
};

export const chrome = {
  skipLink: { label: "Skip to tickets", href: "#hop-in" },
  cornerButton: "FREE TICKET",
  /** Each top link: label, arrow glyph, resting tilt in degrees (Top links). */
  topLinks: {
    society: { label: "BRING YOUR SOCIETY", arrow: "↗", rot: -2, href: "#crew" },
    /** No destination yet, so this chip is not rendered. */
    problem: { label: "GOT A PROBLEM TO SOLVE?", arrow: "↗", rot: 1.5, href: facts.pitchProblemUrl },
    mlai: { label: "mlai.au", arrow: "↗", rot: -1, href: facts.mlaiUrl },
  },
  /** Accessible name of the chapter rail (a utility label, not in the deck). */
  rail: { label: "Chapters" },
  motion: { pause: "PAUSE MOTION", play: "PLAY MOTION" },
  sound: { on: "Sound on", off: "Sound off" },
};

export const hero = {
  eyebrow: "A HACKATHON FOR GOOD · WEB DIRECTIONS × MLAI",
  wordmark: {
    art: { src: "/kindness/wordmark.webp", alt: "Hacks of Kindness", width: 1400, height: 609 },
    /** Live-text fallback lines (P2 shows them if the art fails), uppercased in CSS. */
    live: ["Hacks of", "Kindness"],
    /** The accessible name of the whole wordmark. */
    name: "Hacks of Kindness",
  },
  oval: {
    small: "A for-purpose business needs a hand.",
    lines: ["BUILD THE FIX", "IN 1 DAY."],
    /** The character that misprints. */
    flicker: "1",
  },
  where: {
    cities: "SYDNEY + MELBOURNE",
    /** Confirmation pending; shown after the cities with a " · " when set. */
    soloOrTeam: null as string | null,
    dates: ["FRI 4 DEC, EVENING", "SAT 5 DEC, ALL DAY"],
    lines: [
      "Free. Fully catered. Places are limited.",
      "For-purpose businesses bring real problems. You bring your laptop.",
      "Finalists pitch on stage at AI Engineer Sydney on Mon 7 Dec.",
    ],
    stepByStep: { label: "Step by step", arrow: "↓", href: "#run-sheet" },
    slack: { label: "Join the Slack", arrow: "→", href: facts.slackUrl },
  },
  button: {
    before: "GET A FREE TICKET",
    live: "IT'S ON. COME IN",
    after: "SEE WHAT GOT BUILT",
  },
  backed: {
    label: "BACKED BY",
    main: [
      { name: "Web Directions", src: null, url: facts.webDirectionsUrl },
      { ...mlaiLogos.reversedWordmark, url: facts.mlaiUrl },
    ] as KindnessLogo[],
    partners: [
      { name: "Prune", src: null },
      { name: "Exa", src: null },
      { name: "AutoHand", src: null },
    ] as KindnessLogo[],
    briefsLink: { label: "See the briefs", arrow: "↓", href: "#briefs" },
  },
  logoTape: {
    label: "IN THE CREW:",
    /** Community logos. Empty until confirmed, which hides the tape. */
    communities: [] as KindnessLogo[],
  },
};

export const whatsInIt = {
  eyebrow: "WHAT'S IN IT FOR YOU",
  title: ["BRAGGING RIGHTS.", "REAL ONES."],
  monument: {
    number: "$0",
    stamp: "FREE",
    plate: "TO GET IN. FOOD'S ON US.",
    /** A positive whole number turns on the count-up (P2). */
    countTo: null as number | null,
  },
  ribbon: {
    /** The chip above the line: the grand final's date (facts.grandFinalDate). Empty string removes it. */
    lead: "MON 7 DEC",
    line: "FINALISTS PITCH TO 800 AT AI ENGINEER SYDNEY",
  },
  perks: [
    { text: "A ticket to AI Engineer Sydney for every finalist." },
    {
      text: "Your build in front of 800 engineers, founders and AI leaders, plus the AI Engineer YouTube channel.",
    },
    {
      text: "Prizes from our partners.",
      /** Prize details. Not confirmed yet; appended after the sentence when set. */
      detail: null as string | null,
    },
  ],
  kicker: "The actual prize: a for-purpose business that uses what you built.",
};

export const crew = {
  eyebrow: "RUN A SOCIETY, CLUB OR MEETUP?",
  title: ["BRING YOUR", "WHOLE CREW."],
  body: "Uni societies, meetups, group chats: come as a pack. We'll sew your patch on the vest and save your people a table.",
  button: { label: "PUT US ON THE VEST", href: facts.crewContactUrl },
  /** "Ask" links to the same contact target as the button; the note is not rendered without it. */
  note: { lead: "Want the one-pager for your committee?", link: "Ask", tail: "and we'll send it." },
  vest: {
    src: "/kindness/vest.webp",
    width: 1000,
    height: 1300,
    /** Smaller copies for phones and tablets. */
    srcSet: [
      { src: "/kindness/vest-360.webp", width: 360 },
      { src: "/kindness/vest-720.webp", width: 720 },
      { src: "/kindness/vest.webp", width: 1000 },
    ],
    alt: "",
    /** The name-tape patch (decorative), one line per entry. */
    nameTape: ["IN THE", "CREW:"],
    /** Accessible name of the list of communities on the vest. */
    listLabel: "In the crew",
  },
  /**
   * Community patches on the vest. Empty until communities confirm. Optional
   * patch settings: `slot` (1 to 11, see the slot table in Crew), `field`
   * (patch colour), `shape` ("pill" or "round"), `mono` (logo forced to ink on
   * light fields), `crop` (only with the community's say-so), `bare` (a logo
   * that is already a badge).
   */
  communities: [] as Array<
    KindnessLogo & {
      slot?: number;
      field?: "ink" | "ink-2" | "cream" | "cream-2" | "teal" | "yellow" | "blue" | "purple" | "orange";
      shape?: "pill" | "round";
      mono?: boolean;
      crop?: boolean;
      bare?: boolean;
    }
  >,
  /** The eight decorative patches, in sheet order. */
  decoPatches: [
    { src: "/kindness/patch-01.webp", name: "pixel heart" },
    { src: "/kindness/patch-02.webp", name: "pixel sunglasses" },
    { src: "/kindness/patch-03.webp", name: "megaphone shield" },
    { src: "/kindness/patch-04.webp", name: "paw print" },
    { src: "/kindness/patch-05.webp", name: "sparkle" },
    { src: "/kindness/patch-06.webp", name: "crest" },
    { src: "/kindness/patch-07.webp", name: "wombat" },
    { src: "/kindness/patch-08.webp", name: "needle and thread" },
  ],
};

export const whatYouDo = {
  eyebrow: "WHAT YOU ACTUALLY DO",
  title: ["REAL PROBLEM.", "REAL PEOPLE.", "ONE DAY."],
  cards: [
    {
      n: "01",
      title: "HEAR THE BRIEF",
      body: "Friday night. A for-purpose business tells you what's broken and why it matters. Ask anything.",
      /** The "●" is drawn by CSS (a pinging dot); only the words are rendered. */
      badge: "● REAL PROBLEM" as string | null,
      art: { src: "/kindness/card-brief.webp", alt: "", width: 720, height: 482 },
    },
    {
      n: "02",
      title: "BUILD THE FIX",
      body: "Saturday. Ship something small that works. Mentors on hand, snacks on tap.",
      badge: null as string | null,
      art: { src: "/kindness/card-build.webp", alt: "", width: 720, height: 481 },
    },
    {
      n: "03",
      title: "HAND IT OVER",
      body: "Demo it, get judged, and leave it with the people who will use it.",
      badge: null as string | null,
      art: { src: "/kindness/card-handover.webp", alt: "", width: 720, height: 572 },
    },
  ],
  stamp: "SHIPPED",
  button: "GET A FREE TICKET",
};

export const careTapes = {
  first: "HANDLE WITH CARE ✦ REAL PROBLEMS INSIDE ✦",
  second: "BE KIND ✦ BUILD LOUD ✦",
};

export const briefs = {
  /** The lit sign above the heading (decorative, hidden from screen readers). */
  onAir: "ON AIR",
  eyebrow: "THE BRIEFS",
  /** The "●" is drawn by CSS (the blinking status light); only the word is rendered. */
  sealedTag: "● SEALED",
  /** Visually hidden status read after each zine's number (the stamp is decorative). */
  statusSr: "sealed",
  title: ["SEALED UNTIL", "FRIDAY NIGHT."],
  body: "Every brief comes from a for-purpose business with a real problem and a real person to answer your questions. We open them together on Friday 4 December.",
  /** Four sealed briefs. Cause areas are not confirmed yet. */
  items: [
    { n: "01", label: "BRIEF 01", causeArea: null as string | null, cover: "/kindness/brief-01.webp" },
    { n: "02", label: "BRIEF 02", causeArea: null as string | null, cover: "/kindness/brief-02.webp" },
    { n: "03", label: "BRIEF 03", causeArea: null as string | null, cover: "/kindness/brief-03.webp" },
    { n: "04", label: "BRIEF 04", causeArea: null as string | null, cover: "/kindness/brief-04.webp" },
  ],
  causeAreaLabel: "CAUSE AREA",
  stamp: "SEALED",
  grand: ["GRAND FINAL", "MON 7 DEC", "AI ENGINEER SYDNEY"],
  /**
   * Countdown to the Friday evening opening (facts.fridayStartAt). With a time
   * set, the line reads "> briefs open in 18d 04h 12m_", computed when the page
   * is rendered. While the time is null, `pendingLine` names the confirmed day
   * and never a time; set it to null to leave the line out until the time is set.
   */
  countdown: {
    prefix: "> briefs open in",
    openedLine: "> briefs are open",
    openedSr: "The briefs are open.",
    pendingLine: "> briefs open fri 4 dec" as string | null,
    pendingSr: "Briefs open on Friday 4 December.",
  },
  pitch: {
    question: "Work at a for-purpose business?",
    label: "Pitch us a problem",
    arrow: "→" as const,
    href: facts.pitchProblemUrl,
  },
  wombat: { src: "/kindness/wombat.webp", alt: "" },
};

export type HopInStep = {
  /** The step's name, in display type. */
  name: string;
  /** A second line in body type, continuing the same sentence (steps 2 and 6). */
  detail?: string;
  /** Step 3's outlined link. Not rendered while `href` is null. */
  link?: { label: string; arrow: "→"; href: string | null };
  /** Step 4's time slot, an ISO instant. Not rendered while null. */
  time?: string | null;
};

export const hopIn = {
  eyebrow: "HOW TO GET IN",
  /** One authored line; on phones it breaks after "HOP" (CSS). */
  title: ["HOP IN."],
  ticket: {
    step: "STEP 1",
    title: ["GRAB A FREE", "TICKET"],
    body: "Pick your city. Tell us what you'd love to fix. We approve tickets by hand, so say something real.",
    /** One button per city. A city whose Luma link is null is not rendered. */
    cities: [
      { key: "sydney", label: "SYDNEY", href: facts.luma.sydney },
      { key: "melbourne", label: "MELBOURNE", href: facts.luma.melbourne },
    ] as Array<{ key: "sydney" | "melbourne"; label: string; href: string | null }>,
    newTabNote: " (opens Luma in a new tab)",
    stub: "ADMIT ONE · $0",
  },
  pledge: {
    step: "STEP 2",
    title: ["TAKE THE", "KINDNESS", "PLEDGE"],
    lines: [
      "I'll be kind to everyone in the room.",
      "I'll listen before I build.",
      "I'll ship something a real person can use.",
      "I'll hand it over properly.",
    ],
    signature: "signed, you",
    /** Roo with the rubber stamp (IMG-17), decorative. */
    roo: {
      src: "/kindness/roo-stamp.webp",
      alt: "",
      width: 560,
      height: 560,
      srcSet: "/kindness/roo-stamp-180.webp 180w, /kindness/roo-stamp-360.webp 360w, /kindness/roo-stamp.webp 560w",
    },
  },
  runSheet: {
    id: "run-sheet",
    title: ["FROM FREE TICKET", "TO HANDOVER"],
    steps: [
      { name: "Grab a free ticket." },
      { name: "Get the yes", detail: "we approve by hand; watch your inbox" },
      {
        name: "Join the Slack and say g'day.",
        link: { label: "Join the Slack", arrow: "→", href: facts.slackUrl },
      },
      { name: "Friday night: hear the briefs", time: facts.fridayStartAt },
      { name: "Pick a brief, find a team." },
      { name: "Saturday: build", detail: "with mentors and the for-purpose businesses in the room" },
      { name: "Demo, judging, handover." },
    ] as HopInStep[],
  },
  /** The taped Slack strip. Not rendered while `href` is null. */
  slack: {
    lead: "FIND YOUR TEAM NOW:",
    link: "JOIN THE MLAI SLACK",
    arrow: "→",
    href: facts.slackUrl,
    /** The words stay as plain text while `href` is null. */
    conduct: {
      before: "Coming along means you're in on the ",
      link: "code of conduct",
      after: ".",
      href: facts.codeOfConductUrl,
    },
  },
  weekend: {
    eyebrow: "THE WEEKEND",
    /** `when` is split on " · " into the day and the part of day; `date` feeds the time element. */
    days: [
      { when: "FRI 4 DEC · EVENING", what: "DOORS, BRIEFS, TEAMS", date: facts.fridayDate },
      { when: "SAT 5 DEC · MORNING", what: "BUILD", date: facts.saturdayDate },
      { when: "SAT 5 DEC · ARVO", what: "DEMOS + JUDGING", date: facts.saturdayDate },
      { when: "MON 7 DEC", what: "FINALISTS ON THE BIG STAGE", date: facts.grandFinalDate },
    ],
    /** The perched Roo on the first card (IMG-02, the 280px copy), decorative. */
    roo: {
      src: "/kindness/roo-bust-280.webp",
      alt: "",
      width: 280,
      height: 280,
      srcSet: "/kindness/roo-bust-192.webp 192w, /kindness/roo-bust-280.webp 280w",
    },
  },
};

export const faq = {
  eyebrow: "FAQ",
  title: ["FAIR", "QUESTIONS."],
  /** A card whose answer is null is not rendered. */
  items: [
    {
      q: "I can't code. Can I come?",
      a: "Yes. Good fixes need designers, writers, researchers, organisers and people who ask annoying questions. With AI tools, everyone can build.",
    },
    {
      q: "Do I need a team?",
      a: "No. Come solo and find one on Friday night, or bring your crew.",
      /** Team-size rule. Not confirmed yet; appended when set. */
      extra: null as string | null,
    },
    {
      q: "What does it cost?",
      a: "Nothing. It's free and fully catered. Places are limited, so we approve tickets by hand.",
    },
    {
      q: "Who are the for-purpose businesses?",
      a: "We'll announce them before the weekend. Each one brings a real problem and a real person to answer your questions.",
    },
    {
      q: "Who owns what I build?",
      /** Not confirmed with the organisers yet, so this card is hidden. */
      a: null as string | null,
    },
    {
      q: "What happens after Saturday?",
      a: "Finalists pitch on stage at AI Engineer Sydney on Monday 7 December. Everyone's build goes home with the for-purpose business that it was made for.",
    },
  ] as Array<{ q: string; a: string | null; extra?: string | null }>,
  ask: {
    label: "STILL STUCK? ASK A HUMAN",
    arrow: "→",
    email: facts.contactEmail,
    cocky: { src: "/kindness/cocky-balloon.webp", alt: "" },
  },
};

export const why = {
  label: "WHY WE'RE DOING THIS",
  note: [
    "For-purpose businesses do some of the most important work in the country on some of the worst software. Spreadsheets held together with hope. Forms nobody can find. One day of your skills can save them a year of pain.",
    "So we're putting builders and for-purpose businesses in one room, feeding everyone, and seeing what a weekend of loud kindness can do. Come build something that matters to someone.",
  ],
  /** Who signs the note. Not confirmed yet, so the signature line is hidden. */
  signers: null as string[] | null,
  peekTag: "I'M IN.",
  /** Shows the optional third name under the peek; off because the words are not in the deck. */
  peekSigns: false,
  /** The optional third name Roo adds to the signature (only with signers set and peekSigns on). */
  peekName: "& ROO",
  slogan: {
    sentence: "Soft hearts. Loud builds.",
    /**
     * Each line with its natural width in em, for the fit-to-box formula.
     * Measured with Anton at 100px (width / 100, rounded up to two decimals).
     */
    lines: [
      { text: "SOFT", w: 1.75 },
      { text: "HEARTS.", w: 2.96 },
      { text: "LOUD", w: 1.86 },
      { text: "BUILDS.", w: 2.76 },
    ],
  },
  button: "GET A FREE TICKET",
  crowd: { src: "/kindness/crowd.webp", alt: "" },
  peek: { src: "/kindness/roo-peek.webp", alt: "" },
};

export const behind = {
  eyebrow: "THE PEOPLE BEHIND THIS",
  words: ["WEB DIRECTIONS", "× MLAI."],
  /** Accessible name of the giant words ("and" for the "×"). */
  wordsLabel: "Web Directions and MLAI.",
  /** Web Directions sentence. Wording not confirmed with Web Directions yet. */
  webDirectionsLine: null as string | null,
  mlaiLine: "MLAI is Australia's volunteer-run AI community.",
  count: {
    value: 12000,
    display: "12,000+",
    label: ["PEOPLE IN THE", "MLAI", "COMMUNITY"],
    /** What screen readers hear for the sticker. */
    srText: "12,000+ people in the MLAI community",
  },
  links: [
    { label: "Meet Web Directions", arrow: "↗", href: facts.webDirectionsUrl },
    { label: "Meet MLAI", arrow: "↗", href: facts.mlaiUrl },
  ],
  /** Event footage and its poster frame. Real material, not supplied yet. */
  footage: { video: null as string | null, poster: null as string | null },
};

export const lastTime = {
  /** "DATE · PLACE" of the past event. */
  eyebrow: null as string | null,
  title: ["LAST TIME", "WE DID THIS"],
  body: null as string | null,
  logo: null as KindnessLogo | null,
  projects: [] as Array<{ title: string; caption: string; src: string; url: string | null }>,
  allProjects: { label: "SEE ALL PROJECTS", arrow: "↗", href: null as string | null },
};

export const footer = {
  presentedBy: "PRESENTED BY",
  names: ["WEB DIRECTIONS", "×", "MLAI"],
  emails: [facts.contactEmail, facts.secondContactEmail],
  ticket: {
    line: "FRI 4 TO SAT 5 DEC 2026 ✦ SYDNEY + MELBOURNE ✦ FREE",
    links: [
      { label: "Code of conduct", href: facts.codeOfConductUrl },
      { label: "Privacy", href: facts.privacyUrl },
      { label: "mlai.au", href: facts.mlaiUrl },
    ],
    stub: "HOP BACK UP ↑",
  },
  encore: {
    src: "/kindness/encore.webp",
    alt: "Roo the kangaroo on a milk crate with a megaphone, in front of a crowd of animals.",
  },
  /** Utility label for the ticket bar's link list (not in the copy deck). */
  navLabel: "Footer",
  /** Hidden word read for the "×" between the two names. */
  and: "and",
};

export const takeover = {
  close: "✕ NOT YET",
  title: "GRAB YOUR FREE TICKET",
  tabs: ["SYDNEY", "MELBOURNE"],
  fallback: "Tickets not loading? Open Luma in a new tab →",
  failure: "The ticket desk didn't show up. Open it in a new tab →",
};

/**
 * Where a general "GET A FREE TICKET" button goes in release 1: one Luma page
 * for both cities when there is one, otherwise the two city buttons in Hop in.
 */
export const ticketHref = facts.luma.both ?? "#hop-in";

export function resolvePhase(now: number): KindnessPhase {
  if (phase.force) return phase.force;
  if (phase.afterAt && now >= Date.parse(phase.afterAt)) return "after";
  if (phase.liveAt && now >= Date.parse(phase.liveAt)) return "live";
  return "before";
}
