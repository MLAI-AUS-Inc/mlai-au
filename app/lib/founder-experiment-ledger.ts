export const EXPERIMENT_DECISIONS = [
  "Not decided",
  "Continue",
  "Change",
  "Stop",
] as const;

export type ExperimentDecision = (typeof EXPERIMENT_DECISIONS)[number];
export const EXPERIMENT_EVIDENCE_STATUSES = ['Not recorded', 'Planned (not run)', 'Illustrative (fictional)', 'Observed (not independently reviewed)'] as const;
export type ExperimentEvidenceStatus = (typeof EXPERIMENT_EVIDENCE_STATUSES)[number];
export const FOUNDER_LEDGER_STORAGE_KEY = 'mlai-founder-experiment-ledger-v1';

export type FounderExperimentRow = {
  id: string;
  assumption: string;
  customer: string;
  test: string;
  successSignal: string;
  evidence: string;
  decision: ExperimentDecision;
  nextStep: string;
  // Optional for compatibility with saved v1 entries. Missing is never "observed".
  evidenceStatus?: ExperimentEvidenceStatus;
};

export function createEmptyFounderExperiment(id: string): FounderExperimentRow {
  return {
    id,
    assumption: "",
    customer: "",
    test: "",
    successSignal: "",
    evidence: "",
    decision: "Not decided",
    nextStep: "",
  };
}

function escapeCsvCell(value: string): string {
  const normalised = value.replace(/\r\n?/g, "\n");
  // A visible text prefix avoids relying on an apostrophe surviving CSV re-save.
  // Keep the original on-screen value; CSV consumers still need text-column import.
  const formulaLike = /^[\s\u0000-\u001f\u007f]*[=+\-@＝＋－＠]/u.test(normalised) || /^[\u0000-\u001f\u007f]/u.test(normalised);
  const text = formulaLike ? `Text: ${normalised}` : normalised;
  return `"${text.replace(/"/g, '""')}"`;
}

export function founderExperimentLedgerToCsv(
  rows: FounderExperimentRow[],
): string {
  const header = [
    "Evidence status",
    "Assumption",
    "Customer",
    "Smallest useful test",
    "Success signal set before test",
    "Evidence observed",
    "Decision",
    "Next step",
  ];

  const body = rows.map((row) =>
    [
      row.evidenceStatus ?? 'Not recorded',
      row.assumption,
      row.customer,
      row.test,
      row.successSignal,
      row.evidence,
      row.decision,
      row.nextStep,
    ]
      .map(escapeCsvCell)
      .join(","),
  );

  return [header.map(escapeCsvCell).join(","), ...body].join("\n");
}

function isExperimentDecision(value: unknown): value is ExperimentDecision {
  return (
    typeof value === "string" &&
    EXPERIMENT_DECISIONS.includes(value as ExperimentDecision)
  );
}

export function parseStoredFounderExperiments(
  storedValue: string | null,
): FounderExperimentRow[] | null {
  if (!storedValue) return null;

  try {
    const parsed = JSON.parse(storedValue);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    const rows = parsed
      .map((candidate): FounderExperimentRow | null => {
        if (!candidate || typeof candidate !== "object") return null;

        const row = candidate as Record<string, unknown>;
        if (
          Object.keys(row).some(key => !['id', 'assumption', 'customer', 'test', 'successSignal', 'evidence', 'decision', 'nextStep', 'evidenceStatus'].includes(key)) ||
          typeof row.id !== "string" || !row.id.trim() ||
          typeof row.assumption !== "string" ||
          typeof row.customer !== "string" ||
          typeof row.test !== "string" ||
          typeof row.successSignal !== "string" ||
          typeof row.evidence !== "string" ||
          !isExperimentDecision(row.decision) ||
          typeof row.nextStep !== "string" ||
          (row.evidenceStatus !== undefined && !EXPERIMENT_EVIDENCE_STATUSES.includes(row.evidenceStatus as ExperimentEvidenceStatus))
        ) {
          return null;
        }

        return {
          id: row.id,
          assumption: row.assumption,
          customer: row.customer,
          test: row.test,
          successSignal: row.successSignal,
          evidence: row.evidence,
          decision: row.decision,
          nextStep: row.nextStep,
          ...(row.evidenceStatus === undefined ? {} : { evidenceStatus: row.evidenceStatus as ExperimentEvidenceStatus }),
        };
      });

    if (rows.some(row => row === null)) return null;
    const complete = rows as FounderExperimentRow[];
    if (new Set(complete.map(row => row.id)).size !== complete.length) return null;
    return complete;
  } catch {
    return null;
  }
}

type LedgerStorage = Pick<Storage, 'getItem' | 'setItem'>;
export function readFounderLedger(storage: LedgerStorage) {
  try {
    const raw = storage.getItem(FOUNDER_LEDGER_STORAGE_KEY);
    const rows = parseStoredFounderExperiments(raw);
    return { kind: raw !== null && !rows ? 'invalid' as const : 'ready' as const, raw, rows };
  } catch { return { kind: 'unavailable' as const, raw: undefined, rows: null }; }
}

export function saveFounderLedger(storage: LedgerStorage, rows: FounderExperimentRow[], expectedRaw: string | null) {
  try {
    if (storage.getItem(FOUNDER_LEDGER_STORAGE_KEY) !== expectedRaw) return { kind: 'conflict' as const };
    const raw = JSON.stringify(rows);
    if (!parseStoredFounderExperiments(raw)) return { kind: 'invalid' as const };
    storage.setItem(FOUNDER_LEDGER_STORAGE_KEY, raw);
    return { kind: 'saved' as const, raw };
  } catch { return { kind: 'unavailable' as const }; }
}

export const FOUNDER_LEDGER_EXAMPLE: FounderExperimentRow = {
  id: 'fictional-update-example',
  evidenceStatus: 'Illustrative (fictional)',
  assumption: 'FICTIONAL: Early founders who already send stakeholder updates will return for a second monthly evidence-organising session.',
  customer: 'Three imagined Australian founders with an existing reporting task. They are not contractor applicants or researched customers.',
  test: 'Proposed design: one manual session using synthetic company notes, then ask whether the same three want the next monthly session. Cap planning at eight hours and A$200; these are invented limits, not a recommended budget.',
  successSignal: 'Set in advance for this story: all three return in the next monthly cycle and independently use the output. A compliment or unanswered invitation does not count.',
  evidence: 'SCRIPTED OUTCOME: P1 returns and uses the output; P2 declines; P3 has not replied. One of three meets the proposed signal. P3 is unknown, not a refusal. No interviews, payments, customer records or real sessions produced this example.',
  decision: 'Change',
  nextStep: 'Fictional owner: the organiser. Pause expansion at the next review; ask permission to investigate the differing reporting needs before proposing another test. No outreach or retest has run. This does not validate a market or authorise more spending.',
};
export const FOUNDER_LEDGER_FIELDS = [
  ['Evidence status', 'evidenceStatus'], ['Riskiest assumption', 'assumption'],
  ['Specific customer', 'customer'], ['Smallest useful test', 'test'],
  ['Success signal—set before the test', 'successSignal'], ['Evidence observed', 'evidence'],
  ['Decision', 'decision'], ['Next step', 'nextStep'],
] as const;
