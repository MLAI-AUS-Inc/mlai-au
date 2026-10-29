/** Public records, not testimonials or evidence of paid work/attendance. */
export const PARTICIPATION_PATH = "/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group";
export const PARTICIPATION_CHECKED = "2026-09-10";
export const PARTICIPATION_DOWNLOAD = "/downloads/community-participation/participation-record.txt";

export const PUBLIC_CONTRIBUTIONS = [
  {
    number: 1586,
    label: "Sidebar navigation contribution",
    url: "https://github.com/MLAI-AUS-Inc/mlai-au/pull/1586",
    author: "Coder-Jake",
    change: "Added number-key navigation with a check to avoid handling shortcuts while someone is typing; changed the sidebar layout.",
    response: "Approved by drsamdonegan, who also merged it. The approval has no written review explanation.",
    reviewStatus: "Approved by another maintainer",
    reviewer: "drsamdonegan",
    mergedBy: "drsamdonegan",
    mergedAt: "2026-09-05T22:19:50Z",
    headCommit: "932025ab58bf830f88a6c26091b5114e6d1e5cb5",
    mergeCommit: "d573ce5afc48ca7bfa3267f53603e0259091980c",
    limit: "A recorded proposal, response and accepted change—not proof that every keyboard interaction works or that users benefited.",
  },
  {
    number: 1514,
    label: "Engineering onboarding documentation",
    url: "https://github.com/MLAI-AUS-Inc/mlai-au/pull/1514",
    author: "callumholt",
    change: "Reframed the README around the wider website, separated Valley prototype notes and added setup/safety context.",
    response: "Merged by its author, callumholt. No review recorded on the pull request when checked.",
    reviewStatus: "No review recorded",
    reviewer: null,
    mergedBy: "callumholt",
    mergedAt: "2026-08-23T10:13:31Z",
    headCommit: "89b1b24e4932eea64d5b6acf6051533823a0d220",
    mergeCommit: "63a4bbefe49d7c6f98bb9fd699b51b3bebaa049c",
    limit: "A contribution to a shared reference—not evidence that another person checked it or that a newcomer completed setup.",
  },
] as const;

export const PARTICIPATION_FIELDS = [
  "My question or learning goal:",
  "Event, official listing, format and timezone:",
  "Prerequisites, cost and accessibility checks:",
  "One small contribution I can offer:",
  "What I actually learned or tried:",
  "Follow-up agreed, with whom and about what:",
  "What remains unknown and my next step:",
] as const;

export const DESK_READING_RECORD = [
  "How does a proposed change become something other community members can use?",
  "Desk reading of the two public pull requests on 10 September 2026. No event selected, registered for or attended for this record.",
  "The public changes and review histories were read. No development setup was run; event prerequisites, costs and access remain unchecked.",
  "Proposed question, not sent: what should we test so a navigation shortcut does not interrupt someone typing?",
  "PR #1586 records another maintainer's approval and merge. PR #1514 records a self-merge without a review. These are different kinds of contribution evidence.",
  "None. No contributor was contacted, and no follow-up or introduction was agreed.",
  "No attendance, pay, career or usability outcome is established. Next proposed step: choose a relevant event, verify its listing and bring one question if the format permits it.",
] as const;

export const PARTICIPATION_PROVENANCE = "Completed editorial desk-reading example, not a member attendance story. Public records were checked on 10 September 2026; the proposed question and event participation were not carried out.";
export const PARTICIPATION_BLANK = PARTICIPATION_FIELDS.join("\n");
export const PARTICIPATION_RECORD_FILE = [
  "MLAI COMMUNITY PARTICIPATION RECORD",
  `Article: https://mlai.au${PARTICIPATION_PATH}`,
  "",
  PARTICIPATION_PROVENANCE,
  "",
  "PUBLIC SOURCE RECORDS (timestamps are UTC)",
  ...PUBLIC_CONTRIBUTIONS.flatMap(row => [
    `PR #${row.number}: ${row.label}`,
    row.url,
    `Author: ${row.author}`,
    `Change: ${row.change}`,
    `Response: ${row.response}`,
    `Merged: ${row.mergedAt}`,
    `Reviewed/proposed head: ${row.headCommit}`,
    `Merge commit: ${row.mergeCommit}`,
    `Limit: ${row.limit}`,
    "",
  ]),
  "COMPLETED DESK-READING RECORD",
  ...PARTICIPATION_FIELDS.flatMap((field, index) => [field, DESK_READING_RECORD[index], ""]),
  "YOUR OWN RECORD — replace blanks with observations, not assumed outcomes",
  PARTICIPATION_BLANK,
  "",
  "Keep names and contact details private. Ask before sharing another person's work, words or image. Record an agreed follow-up only when it was actually agreed. No event, contract, job or introduction is promised. The file saves locally; it is not submitted to MLAI or an event organiser.",
  "",
].join("\n");
