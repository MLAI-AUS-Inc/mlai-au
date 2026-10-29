export const ACCELERATOR_DATASET_VERIFIED_AT = "2026-10-29";
export const ACCELERATOR_DATASET_OWNER = "MLAI editorial";
export const ACCELERATOR_DATASET_REVIEW_CADENCE = "Recheck by 30 October 2026, before the 1 November Startmate deadline, and whenever a provider reports a change";
export const ACCELERATOR_REVIEW_AFTER = "2026-10-30";

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

const review = { lastVerified: ACCELERATOR_DATASET_VERIFIED_AT, intakeVerifiedAt: ACCELERATOR_DATASET_VERIFIED_AT, reviewAfter: ACCELERATOR_REVIEW_AFTER, previousFullCheck: "2026-09-10" };

export const AUSTRALIAN_ACCELERATOR_PROGRAMS: AustralianAcceleratorProgram[] = [
  {
    id: "startmate",
    name: "Startmate Accelerator",
    ...review,
    intakeKind: "application-link",
    intakeClosesOn: "2026-11-01",
    programStartsOn: "2027-02-01",
    programEndsOn: "2027-05-07",
    kind: "accelerator",
    bestFor: "Early-stage Australia or New Zealand startups seeking investment, customers and a fundraising network.",
    locationFormat: "Remote-first, with three in-person weeks including Week 0 in Melbourne; confirm travel costs and attendance.",
    duration: "14 weeks",
    publishedTerms:
      "A$120,000 at A$1.5m post-money for founders who have not raised; the page offers SAFE or priced equity. Prior-term matching requires A$250,000+ from VC/angels and executed documents before interviews. Confirm the actual instrument.",
    currentIntake:
      "Summer 2027: 1 February–7 May. Apply link visible; applications close 1 November 2026 at 11:59 pm AEDT. The application form was not submitted.",
    eligibilitySignal:
      "At least one founder must be full-time for the programme. Overseas founders can apply with a strong Australia/New Zealand connection and the required in-person attendance.",
    sourceUrl: "https://www.startmate.com/accelerator",
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
    intakeKind: "closed",
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
      "2026 applications closed 18 May. Programme dates: 5 August–7 October, with Demo Day 15 October. No dated 2027 intake is established by the reviewed page.",
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
      "Free programme; IP remains with the team or sponsoring institute. The current page does not confirm the previous snapshot’s A$20,000/A$80,000 cash amounts; do not budget for them.",
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
    bestFor: "Climate-tech startups at any stage that can scale an emissions-reduction or climate solution.",
    locationFormat:
      "The FAQ permits participation from the Pacific Rim; most activities run 10 am–2 pm Sydney time. Confirm the precise attendance and travel requirements.",
    duration: "3 August–11 December 2026 for the current cohort",
    publishedTerms:
      "Approximately A$80,000–A$100,000. Participation requires accepting investment: the FAQ uses the last priced round’s post-money valuation, or A$1,000,000 pre-money when no priced round has been raised. Request the actual terms.",
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
    sourceLimit: "Programme text was retrieved on 29 October; the Key Dates banner supplies no readable dates in that retrieval. The portal was not submitted or inspected for a current intake. An earlier September browser challenge is historical, not a new check.",
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
