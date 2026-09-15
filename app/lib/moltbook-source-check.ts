// Arithmetic on reported, version-pinned source values only. No raw-data validation.
// Li v2 PDF p40; Jiang et al. v1 Table 1 and LLM-Driven Labeling Pipeline.
export const LI_REPORTED_OUTAGE = {
  start: "2026-01-31T17:35:00Z",
  end: "2026-02-03T13:25:00Z",
  statedApproximateHours: 44,
} as const;
export const LI_TIMESTAMP_INTERVAL_MINUTES =
  (Date.parse(LI_REPORTED_OUTAGE.end) - Date.parse(LI_REPORTED_OUTAGE.start)) / 60_000;
export const LI_TIMESTAMP_INTERVAL_LABEL = `${Math.floor(LI_TIMESTAMP_INTERVAL_MINUTES / 60)} hours ${LI_TIMESTAMP_INTERVAL_MINUTES % 60} minutes`;

export const JIANG_REPORTED_POSTS = {
  collected: 44_411,
  annotated: 44_376,
  humanComparison: 381,
  labels: { safe: 32_399, edgy: 3_733, toxic: 4_634, manipulative: 2_977, malicious: 633 },
} as const;
const labels = JIANG_REPORTED_POSTS.labels;
export const JIANG_COUNT_CHECK = {
  excluded: JIANG_REPORTED_POSTS.collected - JIANG_REPORTED_POSTS.annotated,
  nonSafe: labels.edgy + labels.toxic + labels.manipulative + labels.malicious,
  levelsTwoToFour: labels.toxic + labels.manipulative + labels.malicious,
} as const;
export const JIANG_NON_SAFE_PERCENT = (100 * JIANG_COUNT_CHECK.nonSafe / JIANG_REPORTED_POSTS.annotated).toFixed(2) + "%";
export const JIANG_LEVELS_TWO_TO_FOUR_PERCENT = (100 * JIANG_COUNT_CHECK.levelsTwoToFour / JIANG_REPORTED_POSTS.annotated).toFixed(2) + "%";
