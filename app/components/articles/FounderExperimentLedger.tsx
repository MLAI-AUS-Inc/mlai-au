import { useEffect, useState } from "react";

import {
  createEmptyFounderExperiment,
  EXPERIMENT_DECISIONS,
  founderExperimentLedgerToCsv,
  parseStoredFounderExperiments,
  type FounderExperimentRow,
} from "~/lib/founder-experiment-ledger";

const STORAGE_KEY = "mlai-founder-experiment-ledger-v1";

function createRowId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `experiment_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  const className =
    "mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm leading-6 text-gray-950 outline-none transition placeholder:text-gray-500 focus:border-[#4b1bd1] focus:ring-4 focus:ring-purple-100";

  return (
    <label className="block text-sm font-black text-gray-900">
      {label}
      {multiline ? (
        <textarea
          value={value}
          rows={3}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

export default function FounderExperimentLedger() {
  const [rows, setRows] = useState<FounderExperimentRow[]>([
    createEmptyFounderExperiment("experiment_initial"),
  ]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const restored = parseStoredFounderExperiments(
      window.localStorage.getItem(STORAGE_KEY),
    );
    if (restored) setRows(restored);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    setSavedMessage("Saved on this device");
  }, [hasHydrated, rows]);

  const updateRow = (
    id: string,
    field: keyof Omit<FounderExperimentRow, "id">,
    value: string,
  ) => {
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const exportCsv = () => {
    const csv = founderExperimentLedgerToCsv(rows);
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8",
    });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = "mlai-founder-experiment-ledger.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <section
      aria-labelledby="experiment-ledger-heading"
      className="not-prose my-10 rounded-[30px] border-2 border-gray-950 bg-[#fefc22] p-5 shadow-[7px_7px_0_#111827] sm:p-8"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
            MLAI founder tool
          </p>
          <h2
            id="experiment-ledger-heading"
            className="mt-2 text-3xl font-black tracking-tight text-gray-950"
          >
            Turn assumptions into decisions
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-800">
            Set the success signal before running the test. Record what actually
            happened, then choose to continue, change or stop. Entries stay in
            this browser until you clear its site data.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setRows((current) => [
                ...current,
                createEmptyFounderExperiment(createRowId()),
              ])
            }
            className="rounded-full border-2 border-gray-950 bg-white px-4 py-2 text-sm font-black text-gray-950 hover:bg-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00ffd7]"
          >
            Add experiment
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-full border-2 border-gray-950 bg-gray-950 px-4 py-2 text-sm font-black text-white hover:bg-[#4b1bd1] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00ffd7]"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        {rows.map((row, index) => (
          <fieldset
            key={row.id}
            className="rounded-[24px] border border-gray-400 bg-white p-4 sm:p-6"
          >
            <legend className="px-2 text-sm font-black uppercase tracking-wide text-gray-700">
              Experiment {index + 1}
            </legend>

            <div className="grid gap-5 lg:grid-cols-2">
              <Field
                label="Riskiest assumption"
                value={row.assumption}
                onChange={(value) => updateRow(row.id, "assumption", value)}
                placeholder="Example: Operations managers will pay to reduce manual triage."
                multiline
              />
              <Field
                label="Specific customer"
                value={row.customer}
                onChange={(value) => updateRow(row.id, "customer", value)}
                placeholder="Example: Australian support teams with 5–20 staff."
                multiline
              />
              <Field
                label="Smallest useful test"
                value={row.test}
                onChange={(value) => updateRow(row.id, "test", value)}
                placeholder="Example: Show a clickable workflow to 8 qualified operators."
                multiline
              />
              <Field
                label="Success signal—set before the test"
                value={row.successSignal}
                onChange={(value) => updateRow(row.id, "successSignal", value)}
                placeholder="Example: 3 agree to a paid pilot at the proposed price."
                multiline
              />
              <Field
                label="Evidence observed"
                value={row.evidence}
                onChange={(value) => updateRow(row.id, "evidence", value)}
                placeholder="Record behaviour, commitments, objections and numbers—not just compliments."
                multiline
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-black text-gray-900">
                  Decision
                  <select
                    value={row.decision}
                    onChange={(event) =>
                      updateRow(row.id, "decision", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm text-gray-950 outline-none focus:border-[#4b1bd1] focus:ring-4 focus:ring-purple-100"
                  >
                    {EXPERIMENT_DECISIONS.map((decision) => (
                      <option key={decision} value={decision}>
                        {decision}
                      </option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Next step"
                  value={row.nextStep}
                  onChange={(value) => updateRow(row.id, "nextStep", value)}
                  placeholder="Owner, action and date."
                />
              </div>
            </div>

            {rows.length > 1 ? (
              <button
                type="button"
                onClick={() =>
                  setRows((current) =>
                    current.filter((candidate) => candidate.id !== row.id),
                  )
                }
                className="mt-5 text-sm font-black text-red-700 underline decoration-2 underline-offset-4 hover:text-red-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
              >
                Remove experiment {index + 1}
              </button>
            ) : null}
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-gray-950 p-4 text-sm text-white sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="m-0 text-gray-200">
          {savedMessage || "Your ledger will save locally after this page loads."}
          {" "}Nothing is submitted to MLAI from this worksheet.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(STORAGE_KEY);
            setRows([createEmptyFounderExperiment(createRowId())]);
            setSavedMessage("Ledger reset to a blank experiment");
          }}
          className="shrink-0 font-black text-[#00ffd7] underline decoration-2 underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fefc22]"
        >
          Reset local ledger
        </button>
      </div>
    </section>
  );
}
