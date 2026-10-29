export const UNICORN_DATASET_VERIFIED_AT = "2026-10-29";
export const UNICORN_DATASET_OWNER = "MLAI editorial";
export const UNICORN_DATASET_REVIEW_CADENCE = "Quarterly";

export type UnicornStatusConfidence = "recent-company-report" | "historical-threshold";

export type AustralianUnicornEvidence = {
  company: string;
  australianConnection: string;
  connectionSourceUrl: string;
  connectionSourceTitle: string;
  valuationDate: string;
  financingEvent: string;
  disclosedValuation: string;
  valuationUsdFloorBillions: number;
  sourceUrl: string;
  sourceTitle: string;
  sourceType: "company announcement";
  statusConfidence: UnicornStatusConfidence;
  statusLabel: string;
  statusNote: string;
  lastVerified: string;
};

/**
 * This is a dataset of documented valuation events, not a current unicorn
 * ranking. A row is included only when the linked announcement explicitly
 * reports a valuation of at least US$1 billion and provides an attributable
 * Australian founding or headquarters connection.
 */
export const AUSTRALIAN_UNICORN_EVIDENCE: AustralianUnicornEvidence[] = [
  {
    company: "Airwallex",
    australianConnection:
      "The company announcement says Airwallex was founded in Australia in 2015; its company profile specifies Melbourne.",
    connectionSourceUrl:
      "https://www.airwallex.com/global/newsroom/awx-raises-usd330m-series-g-at-usd8b-valuation-establishes-sf-as-dual-global-hq",
    connectionSourceTitle: "Airwallex Series G company profile",
    valuationDate: "2026-06-25",
    financingEvent: "Series H led by Addition",
    disclosedValuation: "US$11 billion",
    valuationUsdFloorBillions: 11,
    sourceUrl:
      "https://www.airwallex.com/global/newsroom/airwallex-secures-320-million-in-series-h-funding-valuation-hits-11-billion",
    sourceTitle: "Airwallex Series H announcement, 25 June 2026",
    sourceType: "company announcement",
    statusConfidence: "recent-company-report",
    statusLabel: "June 2026 company-reported event",
    statusNote:
      "The 25 June financing announcement gives the event; the company profile explicitly labels the $11 billion figure USD. Both were rechecked 29 October 2026. This is not a continuously traded market price.",
    lastVerified: UNICORN_DATASET_VERIFIED_AT,
  },
  {
    company: "Canva",
    australianConnection:
      "Canva announced the round from Sydney; its 2018 company announcement called Canva a startup unicorn from Australia.",
    connectionSourceUrl:
      "https://www.canva.com/newsroom/news/canva-raises-40m-round-earn-unicorn-title/",
    connectionSourceTitle: "Canva’s 2018 Australian unicorn announcement",
    valuationDate: "2021-09-15",
    financingEvent: "US$200 million funding round",
    disclosedValuation: "US$40 billion",
    valuationUsdFloorBillions: 40,
    sourceUrl:
      "https://www.canva.com/newsroom/news/canva-announces-usd-40-billion-valuation-fueled-global-demand-visual-communication/",
    sourceTitle:
      "Canva Announces USD 40 Billion Valuation Fueled by the Global Demand for Visual Communication",
    sourceType: "company announcement",
    statusConfidence: "historical-threshold",
    statusLabel: "Historical threshold evidence",
    statusNote:
      "The announcement proves that the threshold was crossed at this 2021 round. It does not establish Canva’s current valuation.",
    lastVerified: UNICORN_DATASET_VERIFIED_AT,
  },
  {
    company: "Culture Amp",
    australianConnection:
      "Culture Amp’s company material says it started in Melbourne in 2011.",
    connectionSourceUrl:
      "https://www.cultureamp.com/company/announcements/culture-amp-raises-82-million-dollars-in-global-funding",
    connectionSourceTitle: "Culture Amp’s Melbourne founding statement",
    valuationDate: "2021-07-29",
    financingEvent: "US$100 million Series F",
    disclosedValuation: "More than US$1.5 billion",
    valuationUsdFloorBillions: 1.5,
    sourceUrl:
      "https://www.cultureamp.com/company/announcements/global-employee-experience-leader-culture-amp-raises-100-million",
    sourceTitle: "Culture Amp raises $100M in Series F funding round",
    sourceType: "company announcement",
    statusConfidence: "historical-threshold",
    statusLabel: "Historical threshold evidence",
    statusNote:
      "The announcement proves that the threshold was crossed at this 2021 round. This retained historical round is not a claim about the current valuation or listing/acquisition status.",
    lastVerified: UNICORN_DATASET_VERIFIED_AT,
  },
  {
    company: "Go1",
    australianConnection:
      "Advance Queensland says Go1 was founded in Logan, Queensland, in 2015.",
    connectionSourceUrl:
      "https://advance.qld.gov.au/innovation-in-queensland/innovation-stories/igniting-innovation-the-go1-journey-from-logan-startup-to-brisbanes-first-unicorn",
    connectionSourceTitle: "Advance Queensland’s Go1 origin profile",
    valuationDate: "2021-07-19",
    financingEvent: "US$200 million Series D",
    disclosedValuation: "More than US$1 billion",
    valuationUsdFloorBillions: 1,
    sourceUrl:
      "https://www.globenewswire.com/news-release/2021/07/19/2264897/0/en/go1-raises-200-million-in-series-d-funding-to-further-corporate-learning.html",
    sourceTitle:
      "Go1 Raises $200 Million in Series D Funding to Further Corporate Learning",
    sourceType: "company announcement",
    statusConfidence: "historical-threshold",
    statusLabel: "Historical threshold evidence",
    statusNote:
      "The company announcement proves a greater-than-US$1 billion valuation at the 2021 round. It is not treated here as a current valuation.",
    lastVerified: UNICORN_DATASET_VERIFIED_AT,
  },
  {
    company: "Linktree",
    australianConnection:
      "The company announcement was issued from Melbourne; Linktree’s company profile says it is headquartered there and was founded in 2016.",
    connectionSourceUrl: "https://linktr.ee/about",
    connectionSourceTitle: "Linktree’s founders’ story",
    valuationDate: "2022-03-16",
    financingEvent: "US$110 million funding round",
    disclosedValuation: "US$1.3 billion",
    valuationUsdFloorBillions: 1.3,
    sourceUrl:
      "https://www.prnewswire.com/news-releases/linktree-raises-110-million-usd-led-by-index-and-coatue-to-power-next-phase-of-growth-for-creators-consumers-and-brands-301503884.html",
    sourceTitle:
      "Linktree Raises $110 Million USD Led by Index and Coatue",
    sourceType: "company announcement",
    statusConfidence: "historical-threshold",
    statusLabel: "Historical threshold evidence",
    statusNote:
      "The announcement proves that the threshold was crossed at this 2022 round. It does not establish Linktree’s current valuation.",
    lastVerified: UNICORN_DATASET_VERIFIED_AT,
  },
];
