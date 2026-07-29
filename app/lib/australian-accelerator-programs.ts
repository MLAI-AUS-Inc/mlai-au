export const ACCELERATOR_DATASET_VERIFIED_AT = "2026-07-29";
export const ACCELERATOR_DATASET_OWNER = "MLAI editorial";
export const ACCELERATOR_DATASET_REVIEW_CADENCE = "Quarterly";

export type AustralianAcceleratorProgram = {
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
};

export const AUSTRALIAN_ACCELERATOR_PROGRAMS: AustralianAcceleratorProgram[] = [
  {
    name: "Startmate Accelerator",
    kind: "accelerator",
    bestFor: "Early-stage Australia or New Zealand startups seeking investment, customers and a fundraising network.",
    locationFormat: "Hybrid; founders can join from Australia or New Zealand.",
    duration: "12 weeks",
    publishedTerms:
      "A$120,000. For founders without a prior qualifying raise, Startmate publishes a A$1.5m post-money valuation; qualifying previously funded companies may have their latest terms matched.",
    currentIntake:
      "The reviewed page lists 25 January–29 April 2027 and an 8 November 2026 application close; its current button is an expression of interest.",
    eligibilitySignal:
      "The selection process emphasises founder connection to the problem, ambition and customer conversations.",
    sourceUrl: "https://www.startmate.com/accelerator/program",
    sourceLabel: "Startmate program page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
  {
    name: "Google for Startups Accelerator: Australia and New Zealand",
    kind: "accelerator",
    bestFor: "Seed to Series A Australian or New Zealand startups building AI/ML-driven products or platforms.",
    locationFormat: "Hybrid, with remote and in-person sessions.",
    duration: "10 weeks",
    publishedTerms:
      "Equity-free support; eligible participants may receive product credits or Cloud TPU access subject to separate eligibility.",
    currentIntake:
      "2026 applications closed 19 July; the program is scheduled to start 1 September and graduate in November.",
    eligibilitySignal:
      "Seed to Series A or equivalent, based in Australia or New Zealand, with technical challenges suitable for expert support.",
    sourceUrl:
      "https://startup.google.com/programs/accelerator/australia-new-zealand/",
    sourceLabel: "Google for Startups program page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
  {
    name: "UNSW Founders 10x Accelerator",
    kind: "accelerator",
    bestFor: "UNSW-linked technology startups or research ventures with a prototype or MVP and some market validation.",
    locationFormat:
      "UNSW Founders is based in Sydney; the reviewed program page requires weekly commitment but does not clearly state a remote/hybrid policy.",
    duration: "10 weeks",
    publishedTerms:
      "A$100,000 seed investment through a pre-money SAFE with a 15% discount and no valuation cap; the program itself is free.",
    currentIntake:
      "2026 applications are closed; the page accepts expressions of interest for 2027.",
    eligibilitySignal:
      "Australian company or planned company, with a current UNSW student, staff member or alumnus as a co-founder.",
    sourceUrl: "https://unswfounders.com/10x-accelerator",
    sourceLabel: "UNSW Founders 10x page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
  {
    name: "CSIRO ON Accelerate",
    kind: "research commercialisation",
    bestFor: "Australian teams translating publicly funded research or licensed university/PFRO intellectual property into a venture.",
    locationFormat:
      "Australian teams; selection includes face-to-face bootcamp and core members must attend in-person workshops and coaching.",
    duration:
      "Three-month core commercialisation program, with selection and showcase milestones across a longer annual cycle.",
    publishedTerms:
      "Free and non-dilutive; IP remains with the team or sponsoring institute. The page describes A$20,000 per team via its TTO after immersion and up to A$80,000 per high-performing team.",
    currentIntake: "ON Accelerate 11 applications are open 27 July–31 August 2026.",
    eligibilitySignal:
      "Teams of 3–6 with specified Australian research involvement and a substantial time commitment.",
    sourceUrl:
      "https://www.csiro.au/en/work-with-us/funding-programs/Innovation-programs/ON-Accelerate",
    sourceLabel: "CSIRO ON Accelerate page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
  {
    name: "EnergyLab Climate Solutions Accelerator",
    kind: "accelerator",
    bestFor: "Climate-tech startups at any stage that can scale an emissions-reduction or climate solution.",
    locationFormat:
      "The reviewed page describes online interviews and five scheduled program modules; confirm attendance locations with EnergyLab.",
    duration: "3 August–11 December 2026 for the current cohort",
    publishedTerms:
      "Approximately A$80,000–A$100,000 at the startup’s latest post-money valuation.",
    currentIntake:
      "2026 applications are closed; EnergyLab is accepting expressions of interest for 2027.",
    eligibilitySignal:
      "Climate impact, capacity for fast growth and a team EnergyLab believes it can materially help.",
    sourceUrl: "https://energylab.org.au/programs/acceleration/",
    sourceLabel: "EnergyLab program page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
  {
    name: "Melbourne Accelerator Program (MAP)",
    kind: "accelerator",
    bestFor: "Scalable, high-impact startups that meet a University of Melbourne, social-impact or climate pathway.",
    locationFormat:
      "Melbourne-based office and desk space are included; confirm the required in-person cadence with MAP.",
    duration: "Five-month intensive program",
    publishedTerms:
      "A$20,000 equity-free funding, office space, coaching and a Claude team account for the program duration.",
    currentIntake:
      "The reviewed program page does not state a current application window; use the MEC portal for the latest status.",
    eligibilitySignal:
      "University of Melbourne affiliation, social impact at the core, or work addressing the climate crisis.",
    sourceUrl:
      "https://www.unimelb.edu.au/mec/MECPrograms/melbourne-accelerator-program",
    sourceLabel: "University of Melbourne MAP page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
  {
    name: "Antler Australia Residency",
    kind: "residency",
    bestFor: "Individuals and very early teams forming an inception or pre-seed venture, including people seeking a co-founder.",
    locationFormat: "Full-time Australian residency; the location page describes February and July cohorts.",
    duration: "8 weeks",
    publishedTerms:
      "Antler describes a pathway to pre-seed and follow-on investment, but the reviewed location page does not publish the equity instrument or ownership terms. Request the current offer documents.",
    currentIntake:
      "The Australian location page is accepting applications and publishes cohort start dates through its application flow.",
    eligibilitySignal:
      "Founder potential at inception or pre-seed; visa and preferred residency-location requirements also apply.",
    sourceUrl: "https://www.antler.co/location/australia",
    sourceLabel: "Antler Australia page",
    lastVerified: ACCELERATOR_DATASET_VERIFIED_AT,
  },
];
