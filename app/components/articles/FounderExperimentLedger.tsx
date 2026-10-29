import { useEffect, useRef, useState } from "react";

import {
  createEmptyFounderExperiment,
  EXPERIMENT_DECISIONS,
  founderExperimentLedgerToCsv,
  readFounderLedger,
  saveFounderLedger,
  FOUNDER_LEDGER_STORAGE_KEY,
  EXPERIMENT_EVIDENCE_STATUSES,
  FOUNDER_LEDGER_EXAMPLE,
  type FounderExperimentRow,
} from "~/lib/founder-experiment-ledger";

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
  const [exportMessage, setExportMessage] = useState("");
  const expectedRaw = useRef<string | null>(null);
  const canSave = useRef(false);

  useEffect(() => {
    try {
      const restored = readFounderLedger(window.localStorage);
      if (restored.rows) setRows(restored.rows);
      canSave.current = restored.kind === 'ready';
      expectedRaw.current = restored.raw ?? null;
      setSavedMessage(restored.kind === 'ready'
        ? (restored.rows ? 'Restored from this browser. Changes will save here when storage is available.' : 'Blank ledger. Changes will save in this browser when storage is available.')
        : restored.kind === 'invalid'
          ? 'The saved ledger could not be read safely and was not changed. This on-screen draft is not saved; export it before leaving.'
          : 'Browser storage is unavailable. This on-screen draft is not saved; export it before leaving.');
    } catch {
      canSave.current = false;
      setSavedMessage('Browser storage is unavailable. This on-screen draft is not saved; export it before leaving.');
    }
    setHasHydrated(true);
  }, []);

  const changeRows = (next: FounderExperimentRow[]) => {
    setRows(next);
    if (!canSave.current) return;
    try {
      const saved = saveFounderLedger(window.localStorage, next, expectedRaw.current);
      if (saved.kind === 'saved') {
        expectedRaw.current = saved.raw;
        setSavedMessage('Saved in this browser. Export a backup before leaving.');
      } else {
        canSave.current = false;
        setSavedMessage(saved.kind === 'conflict'
          ? 'The saved ledger changed elsewhere. Your on-screen draft was not saved over it. Export your draft, then reload to inspect the saved version.'
          : 'The latest changes could not be saved. Your on-screen draft is still here; export it before leaving.');
      }
    } catch {
      canSave.current = false;
      setSavedMessage('The latest changes could not be saved. Your on-screen draft is still here; export it before leaving.');
    }
  };

  const updateRow = (
    id: string,
    field: keyof Omit<FounderExperimentRow, "id">,
    value: string,
  ) => {
    changeRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const exportCsv = () => {
    try {
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
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    setExportMessage('CSV download requested. Check that your browser saved it before leaving.');
    } catch {
      setExportMessage('CSV download could not start. Copy your entries before leaving; the on-screen draft is unchanged.');
    }
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
            className="mt-2 text-3xl font-black tracking-tight text-gray-950 scroll-mt-28"
          >
            Turn assumptions into decisions
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-800">
            Set the success signal before running the test. Record what actually
            happened, then choose to continue, change or stop. Mark whether the
            evidence is planned, fictional or observed. A decision alone does
            not make a test complete.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-800">Use anonymised notes, not customer secrets or personal data. Local storage is not encrypted by this tool; other people using this browser profile and scripts on this site may access it. Browser settings, clearing site data or storage failures can remove your work. This tool has no submit action or cloud backup.</p>
          <p className="mt-3 text-sm leading-6"><a href="/downloads/founder-experiment-example.txt" download="founder-experiment-example.txt" className="font-bold underline">Download the blank record and fictional example</a> to work in a text editor.</p>
          <noscript><p className="mt-3 font-bold">JavaScript is off. The interactive ledger is disabled; use the text download or completed example below.</p></noscript>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            id="founder-ledger-add-experiment"
            type="button"
            disabled={!hasHydrated}
            onClick={() =>
              changeRows([
                ...rows,
                createEmptyFounderExperiment(createRowId()),
              ])
            }
            className="rounded-full border-2 border-gray-950 bg-white px-4 py-2 text-sm font-black text-gray-950 hover:bg-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00ffd7]"
          >
            Add experiment
          </button>
          <button
            type="button"
            disabled={!hasHydrated}
            onClick={exportCsv}
            className="rounded-full border-2 border-gray-950 bg-gray-950 px-4 py-2 text-sm font-black text-white hover:bg-[#4b1bd1] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00ffd7]"
          >
            Export CSV
          </button>
          <button type="button" disabled={!hasHydrated} onClick={() => changeRows([...rows, { ...FOUNDER_LEDGER_EXAMPLE, id: createRowId() }])} className="rounded-full border-2 border-gray-950 bg-white px-4 py-2 text-sm font-black text-gray-950 focus-visible:ring-4 focus-visible:ring-[#00ffd7]">Add fictional example</button>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        {rows.map((row, index) => (
          <fieldset
            disabled={!hasHydrated}
            key={row.id}
            className="rounded-[24px] border border-gray-400 bg-white p-4 sm:p-6"
          >
            <legend className="px-2 text-sm font-black uppercase tracking-wide text-gray-700">
              Experiment {index + 1}
            </legend>

            <div className="grid gap-5 lg:grid-cols-2">
              <label className="block text-sm font-black text-gray-900 lg:col-span-2">Evidence status<select value={row.evidenceStatus ?? 'Not recorded'} onChange={event => updateRow(row.id, 'evidenceStatus', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm text-gray-950 focus-visible:ring-4 focus-visible:ring-purple-100">{EXPERIMENT_EVIDENCE_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}</select></label>
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
                onClick={() => {
                  if (!window.confirm('Remove this experiment? Export it first if you want to keep it.')) return;
                  changeRows(rows.filter((candidate) => candidate.id !== row.id));
                  document.getElementById('founder-ledger-add-experiment')?.focus();
                }}
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
          {savedMessage || "The interactive ledger is loading. Use the text download if it does not become available."}
        </p>
        <button
          type="button"
          disabled={!hasHydrated}
          onClick={() => {
            if (!window.confirm('Reset this ledger and remove its saved entries, including any changes in another tab? Export anything you need first. Other site data is not removed.')) return;
            try {
              window.localStorage.removeItem(FOUNDER_LEDGER_STORAGE_KEY);
              expectedRaw.current = null;
              canSave.current = true;
              setRows([createEmptyFounderExperiment(createRowId())]);
              setSavedMessage('Saved ledger removed. The blank experiment is not saved until you edit it.');
            } catch {
              setSavedMessage('Could not remove the saved ledger. Your on-screen entries were kept; export them before leaving.');
            }
          }}
          className="shrink-0 font-black text-[#00ffd7] underline decoration-2 underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fefc22]"
        >
          Reset local ledger
        </button>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-800">CSV exports label missing evidence status as “Not recorded”. Formula-like values receive a visible “Text: ” prefix in the export; your entries here are unchanged. Import columns as text and check the file before sharing. Spreadsheet applications handle CSV differently.</p>
      <p role="status" className="mt-2 text-sm text-gray-900">{exportMessage}</p>
    </section>
  );
}
