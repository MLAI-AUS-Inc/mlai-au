export const ACCELERATOR_DATASET_VERIFIED_AT = "2026-09-15";
export const ACCELERATOR_DATASET_OWNER = "Maintainer assignment pending";
export const ACCELERATOR_DATASET_REVIEW_CADENCE = "Recheck by 22 September 2026, and sooner at a deadline or reported change";
export const ACCELERATOR_REVIEW_AFTER = "2026-09-22";

export type AustralianAcceleratorProgram = {
  id: string;
  name: string;
  kind: "accelerator" | "residency" | "research commercialisation";
  bestFor: string;
  locationFormat: string;
  duration: string;
  publishedTerms: string;
  currentIntake: string;
  eligibilitySignal: string;
  sourceUrl: string;
  sourceLabel: string;
  lastVerified: string;
  intakeVerifiedAt?: string;
  reviewAfter: string;
  previousFullCheck: string;
  intakeKind: "closed" | "expression-of-interest" | "application-link" | "not-stated";
  intakeOpensOn?: string;
  intakeClosesOn?: string;
  programStartsOn?: string;
  programEndsOn?: string;
  sourceLimit?: string;
  termsSourceUrl?: string;
};

const review = { lastVerified: ACCELERATOR_DATASET_VERIFIED_AT, intakeVerifiedAt: ACCELERATOR_DATASET_VERIFIED_AT, reviewAfter: ACCELERATOR_REVIEW_AFTER, previousFullCheck: "2026-07-29" };

export const AUSTRALIAN_ACCELERATOR_PROGRAMS: AustralianAcceleratorProgram[] = [
  {
    id: "startmate",
    name: "Startmate Accelerator",
    ...review,
    intakeKind: "expression-of-interest",
    intakeClosesOn: "2026-11-08",
    programStartsOn: "2027-01-25",
    programEndsOn: "2027-04-29",
    kind: "accelerator",
    bestFor: "Early-stage Australia or New Zealand startups seeking investment, customers and a fundraising network.",
    locationFormat: "Hybrid from Australia or New Zealand, with three in-person weeks. Confirm locations, attendance and travel costs.",
    duration: "12 weeks",
    publishedTerms:
      "A$120,000; the linked terms describe a A$1.5m post-money SAFE cap for founders who have not raised. Matching previous terms requires at least A$250,000 from VC/angel investors and executed documents. Request the actual instrument.",
    currentIntake:
      "The reviewed page lists 25 January–29 April 2027 and an 8 November 2026 application close; its current button is an expression of interest.",
    eligibilitySignal:
      "At least one co-founder must work on the startup full time, and at least one founder must be based in Australia or New Zealand; confirm the complete cohort criteria.",
    sourceUrl: "https://www.startmate.com/accelerator/program",
    sourceLabel: "Startmate program page",
    termsSourceUrl: "https://www.startmate.com/writing/startmate-accelerator-investment-terms-101",
  },
  {
    id: "google-anz",
    name: "Google for Startups Accelerator: Australia and New Zealand",
    ...review,
    intakeKind: "closed",
    intakeClosesOn: "2026-07-19",
    programStartsOn: "2026-09-01",
    kind: "accelerator",
    bestFor: "Seed to Series A Australian or New Zealand startups building AI/ML-driven products or platforms.",
    locationFormat: "Hybrid, with remote and in-person sessions.",
    duration: "10 weeks",
    publishedTerms:
      "Equity-free support; eligible participants may receive product credits or Cloud TPU access subject to separate eligibility.",
    currentIntake:
      "The 2026 calendar lists a 19 July application close, 1 September kick-off and November graduation. The listed start has passed; no later intake is established here.",
    eligibilitySignal:
      "AI/ML product, Seed to Series A or equivalent, with traction and technical team participation. The page includes Australia/New Zealand and Sydney in-person activity; verify full cohort requirements.",
    sourceUrl:
      "https://startup.google.com/programs/accelerator/australia-new-zealand/",
    sourceLabel: "Google for Startups program page",
  },
  {
    id: "unsw",
    name: "UNSW Founders 10x Accelerator",
    ...review,
    intakeKind: "expression-of-interest",
    intakeClosesOn: "2026-05-18",
    programStartsOn: "2026-08-05",
    programEndsOn: "2026-10-07",
    kind: "accelerator",
    bestFor: "UNSW-linked technology startups or research ventures with a prototype or MVP and some market validation.",
    locationFormat:
      "UNSW Founders is based in Sydney; the reviewed program page requires weekly commitment but does not clearly state a remote/hybrid policy.",
    duration: "10 weeks",
    publishedTerms:
      "A$100,000 seed investment through a pre-money SAFE with a 15% discount and no valuation cap; the program itself is free.",
    currentIntake:
      "2026 applications closed 18 May. Programme dates: 5 August–7 October, with Demo Day 15 October. A generic expression-of-interest link is visible; a 2027 intake is not dated on the reviewed page.",
    eligibilitySignal:
      "Australian company or planned company, with a current UNSW student, staff member or alumnus as a co-founder.",
    sourceUrl: "https://unswfounders.com/10x-accelerator",
    sourceLabel: "UNSW Founders 10x page",
  },
  {
    id: "csiro",
    name: "CSIRO ON Accelerate",
    ...review,
    intakeKind: "closed",
    kind: "research commercialisation",
    bestFor: "Australian teams translating publicly funded research or licensed university/PFRO intellectual property into a venture.",
    locationFormat:
      "Australian teams; selection includes face-to-face bootcamp and core members must attend in-person workshops and coaching.",
    duration:
      "Three-month core commercialisation program, with selection and showcase milestones across a longer annual cycle.",
    publishedTerms:
      "Free and non-dilutive; IP remains with the team or sponsoring institute. The page describes A$20,000 per team via its TTO after immersion and up to A$80,000 per high-performing team.",
    currentIntake: "The source states applications are closed. Subscribe to CSIRO for future rounds; no next opening is confirmed here.",
    eligibilitySignal:
      "Teams of 3–6, all in Australia, with specified university/PFRO research or licensed-IP involvement. At least three attend workshops; the team commits one full-time equivalent outside sessions.",
    sourceUrl:
      "https://www.csiro.au/en/work-with-us/funding-programs/Innovation-programs/ON-Accelerate",
    sourceLabel: "CSIRO ON Accelerate page",
    sourceLimit: "The earlier snapshot recorded a 31 August deadline. The current source says closed and gives a typical annual schedule, not a new dated opening.",
  },
  {
    id: "energylab",
    name: "EnergyLab Climate Solutions Accelerator",
    ...review,
    intakeKind: "expression-of-interest",
    intakeOpensOn: "2027-01-11",
    programStartsOn: "2026-08-03",
    programEndsOn: "2026-12-11",
    kind: "accelerator",
    bestFor: "Climate-tech startups with a scalable emissions-reduction or climate solution; the page spans stages, but selection depends on readiness and fit.",
    locationFormat:
      "The FAQ permits participation from the Pacific Rim; most activities run 10 am–2 pm Sydney time. Confirm the precise attendance and travel requirements.",
    duration: "3 August–11 December 2026 for the current cohort",
    publishedTerms:
      "Approximately A$80,000–A$100,000. Participation requires accepting the investment: the FAQ uses the latest post-money valuation after a priced round, or A$1m pre-money if no priced round has been raised. Confirm the actual offer.",
    currentIntake:
      "2026 applications ran 12 January–15 March. A 2027 expression of interest is visible; the next application opening is listed as 11 January 2027. An EOI is not an application or acceptance.",
    eligibilitySignal:
      "Climate impact, capacity for fast growth and a team EnergyLab believes it can materially help.",
    sourceUrl: "https://energylab.org.au/programs/acceleration/",
    sourceLabel: "EnergyLab program page",
  },
  {
    id: "map",
    name: "Melbourne Accelerator Program (MAP)",
    ...review,
    intakeKind: "not-stated",
    kind: "accelerator",
    bestFor: "Scalable, high-impact startups that meet a University of Melbourne, social-impact or climate pathway.",
    locationFormat:
      "Melbourne-based office and desk space are included; confirm the required in-person cadence with MAP.",
    duration: "No duration stated in the retrieved current page text; confirm with MAP.",
    publishedTerms:
      "A$20,000 equity-free funding, office space, coaching and a Claude team account for the program duration.",
    currentIntake:
      "The reviewed program page does not state a current application window; use the MEC portal for the latest status.",
    eligibilitySignal:
      "University of Melbourne affiliation, social impact at the core, or work addressing the climate crisis.",
    sourceUrl:
      "https://www.unimelb.edu.au/mec/MECPrograms/melbourne-accelerator-program",
    sourceLabel: "University of Melbourne MAP page",
    sourceLimit: "The retrieved page exposes a Key Dates Banner label without dates. No current application window or programme duration was verified; the portal link alone does not confirm an open intake.",
  },
  {
    id: "antler",
    name: "Antler Australia Residency",
    ...review,
    intakeKind: "application-link",
    kind: "residency",
    bestFor: "Individuals and very early teams forming an inception or pre-seed venture, including people seeking a co-founder.",
    locationFormat: "Australian residency; confirm next cohort location, attendance commitment and permission to participate before applying.",
    duration: "The current overview says 8 weeks, with February/July cadence. A February 2026 news card describes that older cohort as 10 weeks; do not reuse it as the next schedule.",
    publishedTerms:
      "Antler describes a pathway to pre-seed and follow-on investment, but the reviewed location page does not publish the equity instrument or ownership terms. Request the current offer documents.",
    currentIntake:
      "Apply links are visible, but the next dated application window and cohort were not verified. No application flow was submitted.",
    eligibilitySignal:
      "Inception/pre-seed founders may join solo to form a team, but the current FAQ says Antler does not invest in solo founders. Confirm residency and investment criteria separately.",
    sourceUrl: "https://www.antler.co/location/australia",
    sourceLabel: "Antler Australia page",
  },
];
