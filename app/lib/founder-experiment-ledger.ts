export const EXPERIMENT_DECISIONS = [
  "Not decided",
  "Continue",
  "Change",
  "Stop",
] as const;

export type ExperimentDecision = (typeof EXPERIMENT_DECISIONS)[number];

export type FounderExperimentRow = {
  id: string;
  assumption: string;
  customer: string;
  test: string;
  successSignal: string;
  evidence: string;
  decision: ExperimentDecision;
  nextStep: string;
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
  return `"${normalised.replace(/"/g, '""')}"`;
}

export function founderExperimentLedgerToCsv(
  rows: FounderExperimentRow[],
): string {
  const header = [
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
          typeof row.id !== "string" ||
          typeof row.assumption !== "string" ||
          typeof row.customer !== "string" ||
          typeof row.test !== "string" ||
          typeof row.successSignal !== "string" ||
          typeof row.evidence !== "string" ||
          !isExperimentDecision(row.decision) ||
          typeof row.nextStep !== "string"
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
        };
      })
      .filter((row): row is FounderExperimentRow => Boolean(row));

    return rows.length > 0 ? rows : null;
  } catch {
    return null;
  }
}
