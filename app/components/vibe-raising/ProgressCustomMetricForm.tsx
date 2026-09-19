import { useState } from "react";
import {
  PROGRESS_CATEGORIES,
  type StartupProgress,
} from "~/lib/startup-progress";

export function parseMetricCsv(text: string) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim());
  if (/^(month|date)\s*[,\t]/i.test(lines[0] || "")) lines.shift();
  if (!lines.length || lines.length > 24)
    throw new Error("Add between 1 and 24 monthly values.");
  const seen = new Set<string>();
  return lines.map((line) => {
    const [rawDate, rawValue, extra] = line.trim().split(/[,\t]/);
    const date = /^\d{4}-\d{2}$/.test(rawDate) ? `${rawDate}-01` : rawDate;
    if (
      extra !== undefined ||
      !/^\d{4}-(0[1-9]|1[0-2])-01$/.test(date) ||
      !rawValue?.trim() ||
      !Number.isFinite(Number(rawValue)) ||
      seen.has(date)
    )
      throw new Error(
        "Use one row per month: YYYY-MM, value. Do not include commas inside a number.",
      );
    seen.add(date);
    return { date, value: rawValue.trim() };
  });
}

export default function ProgressCustomMetricForm({
  progress,
  onSave,
  busy,
}: {
  progress: StartupProgress;
  onSave: (body: Record<string, unknown>) => void;
  busy: boolean;
}) {
  const [key, setKey] = useState("");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");
  const definition = progress.definitions.find((item) => item.key === key);
  return (
    <form
      className="progress-custom-form"
      onSubmit={(event) => {
        event.preventDefault();
        setError("");
        const form = new FormData(event.currentTarget);
        try {
          onSave({
            ...Object.fromEntries(form),
            ...(definition || {}),
            ...(key ? { key } : {}),
            points: parseMetricCsv(csv),
          });
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Check your values.",
          );
        }
      }}
    >
      <p>
        For pilots, waitlists, experiments or other nonfinancial progress. These
        values are labelled <strong>Founder provided</strong>.
      </p>
      {progress.definitions.length > 0 && (
        <label>
          Metric
          <select
            value={key}
            onChange={(event) => {
              setKey(event.target.value);
              const item = progress.series.find(
                (item) => item.metricKey === event.target.value,
              );
              setCsv(
                item?.points
                  .map(
                    (point) => `${point.date.slice(0, 7)},${point.value ?? ""}`,
                  )
                  .join("\n") || "",
              );
            }}
          >
            <option value="">Create a new metric</option>
            {progress.definitions.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      )}
      <div key={key}>
        <label>
          Name
          <input
            name="label"
            defaultValue={definition?.label}
            readOnly={!!definition}
            placeholder="Active pilots"
            maxLength={80}
            required
          />
        </label>
        <label>
          What counts?
          <textarea
            name="definition"
            defaultValue={definition?.definition}
            readOnly={!!definition}
            placeholder="Companies currently testing the product in an agreed pilot."
            maxLength={500}
            required
            rows={2}
          />
        </label>
        <div className="progress-settings-grid">
          <label>
            Category
            <select
              name="category"
              defaultValue={definition?.category || "customers"}
              disabled={!!definition}
            >
              {PROGRESS_CATEGORIES.filter(
                (item) => item.key !== "overview",
              ).map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Unit
            <select
              name="unit"
              defaultValue={definition?.unit || "count"}
              disabled={!!definition}
            >
              {[
                "count",
                "people",
                "accounts",
                "pilots",
                "subscribers",
                "actions",
                "%",
                "seconds",
                "hours",
              ].map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </label>
          <label>
            Counting basis
            <select
              name="aggregation"
              defaultValue={definition?.aggregation || "stock"}
              disabled={!!definition}
            >
              <option value="stock">Total at month end</option>
              <option value="sum">Count during the month</option>
              <option value="unique">Distinct during the month</option>
              <option value="ratio">Rate for the month</option>
              <option value="average">Average for the month</option>
            </select>
          </label>
        </div>
      </div>
      <label>
        Monthly values
        <textarea
          aria-describedby="progress-csv-help"
          value={csv}
          onChange={(event) => setCsv(event.target.value)}
          placeholder={"2026-07,3\n2026-08,5"}
          rows={5}
          required
        />
      </label>
      <p id="progress-csv-help">
        One month and value per row. Current-month values are marked partial.
      </p>
      <label className="progress-file-input">
        Import a CSV
        <input
          type="file"
          accept=".csv,text/csv,text/tab-separated-values"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (file.size > 50000) {
              setError("Use a CSV smaller than 50 KB with up to 24 months.");
              return;
            }
            setCsv(await file.text());
          }}
        />
      </label>
      {error && (
        <p className="progress-error" role="alert">
          {error}
        </p>
      )}
      <button className="progress-button primary" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save metric"}
      </button>
    </form>
  );
}
