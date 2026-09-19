import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  canCompare,
  chartSeries,
  metricChart,
  PROGRESS_CATEGORIES,
  type ProgressChartSpec,
  type ProgressRange,
  type ProgressSeries,
} from "~/lib/startup-progress";
import ProgressChart from "./ProgressChart";
import "~/styles/startup-progress.css";

export function MetricLibrary({
  series,
  selected,
  onChange,
}: {
  series: ProgressSeries[];
  selected: ProgressChartSpec[];
  onChange: (charts: ProgressChartSpec[]) => void;
}) {
  const [category, setCategory] = useState("overview");
  return (
    <>
      <nav className="progress-tabs" aria-label="Metric categories">
        {PROGRESS_CATEGORIES.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={category === item.key}
            onClick={() => setCategory(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="progress-library-grid">
        {series
          .filter(
            (item) => category === "overview" || item.category === category,
          )
          .map((item) => {
            const included = selected.some((chart) =>
              chart.seriesIds.includes(item.id),
            );
            return (
              <button
                className="progress-metric-choice"
                type="button"
                key={item.id}
                aria-pressed={included}
                disabled={
                  item.readiness !== "ready" ||
                  (!included && selected.length >= 12)
                }
                onClick={() =>
                  onChange(
                    included
                      ? selected.filter(
                          (chart) => !chart.seriesIds.includes(item.id),
                        )
                      : [...selected, metricChart(item)],
                  )
                }
              >
                <span className="progress-choice-top">
                  <span>{item.source}</span>
                  {included ? (
                    <CheckIcon aria-hidden="true" />
                  ) : (
                    <PlusIcon aria-hidden="true" />
                  )}
                </span>
                <strong>{item.label}</strong>
                <span>{item.scopeLabel || item.definition}</span>
                <small>
                  {included
                    ? "Selected"
                    : item.readiness === "ready"
                      ? `${item.points.filter((p) => p.value !== null).length} months available · ${item.unit}`
                      : "Needs data"}
                </small>
              </button>
            );
          })}
      </div>
      {!series.some(
        (item) => category === "overview" || item.category === category,
      ) && (
        <div className="progress-empty">
          <h3>No measurements here yet</h3>
          <p>
            Connect a relevant source or add a founder-provided metric from
            Progress.
          </p>
        </div>
      )}
    </>
  );
}

export function ChartSelectionControls({
  spec,
  series,
  onChange,
  onRemove,
  onMove,
  index,
  total,
}: {
  spec: ProgressChartSpec;
  series: ProgressSeries[];
  onChange: (value: ProgressChartSpec) => void;
  onRemove: () => void;
  onMove?: (direction: -1 | 1) => void;
  index: number;
  total: number;
}) {
  const first = series.find((item) => item.id === spec.seriesIds[0]);
  const comparison = first
    ? series.filter((item) => canCompare(first, item))
    : [];
  return (
    <div className="progress-chart-controls">
      <div className="progress-controls-row">
        <span className="progress-order">{index + 1}</span>
        <strong>{first?.label || "Saved chart"}</strong>
        {onMove && (
          <>
            <button
              type="button"
              className="progress-icon-button"
              aria-label={`Move ${first?.label || "chart"} earlier`}
              disabled={index === 0}
              onClick={() => onMove(-1)}
            >
              <ArrowUpIcon />
            </button>
            <button
              type="button"
              className="progress-icon-button"
              aria-label={`Move ${first?.label || "chart"} later`}
              disabled={index === total - 1}
              onClick={() => onMove(1)}
            >
              <ArrowDownIcon />
            </button>
          </>
        )}
        <button
          type="button"
          className="progress-text-button"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
      <div className="progress-settings-grid">
        <label>
          History
          <select
            value={spec.months}
            onChange={(event) =>
              onChange({
                ...spec,
                months: Number(event.target.value) as ProgressRange,
              })
            }
          >
            {[3, 6, 12, 24].map((months) => (
              <option key={months} value={months}>
                {months} months
              </option>
            ))}
          </select>
        </label>
        <label>
          Style
          <select
            value={spec.type}
            onChange={(event) =>
              onChange({ ...spec, type: event.target.value as "line" | "bar" })
            }
          >
            <option value="line">Line</option>
            <option value="bar">Bars</option>
          </select>
        </label>
        {comparison.length > 0 && (
          <label>
            Compare with
            <select
              value={spec.seriesIds[1] || ""}
              onChange={(event) =>
                onChange({
                  ...spec,
                  seriesIds: [
                    spec.seriesIds[0],
                    ...(event.target.value ? [event.target.value] : []),
                  ],
                })
              }
            >
              <option value="">No comparison</option>
              {comparison.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <label className="progress-caption-input">
        Caption <span>Optional</span>
        <input
          maxLength={280}
          value={spec.caption}
          onChange={(event) =>
            onChange({ ...spec, caption: event.target.value })
          }
          placeholder="A little context for these numbers…"
        />
      </label>
    </div>
  );
}

export default function ProgressChartPicker({
  series,
  selected,
  onChange,
  cutoff,
  frozen = [],
}: {
  series: ProgressSeries[];
  selected: ProgressChartSpec[];
  onChange: (charts: ProgressChartSpec[]) => void;
  cutoff: string;
  frozen?: import("~/lib/startup-progress").ProgressChartSnapshot[];
}) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [preview, setPreview] = useState(false);
  const available = [
    ...series,
    ...frozen
      .flatMap((chart) => chart.series)
      .filter((item) => !series.some((current) => current.id === item.id)),
  ];
  const move = (index: number, direction: -1 | 1) => {
    const next = [...selected];
    [next[index], next[index + direction]] = [
      next[index + direction],
      next[index],
    ];
    onChange(next);
  };
  return (
    <section className="progress-update-picker" aria-label="Numbers to share">
      <div className="progress-section-heading">
        <div>
          <h2>
            Numbers to share <span>Optional</span>
          </h2>
          <p>
            {selected.length
              ? `${selected.length} chart${selected.length === 1 ? "" : "s"} in this update. You choose what to share.`
              : "Choose the progress that matters to you."}
          </p>
        </div>
        <button
          type="button"
          className="progress-button"
          onClick={() => setOpen(true)}
        >
          {selected.length ? "Choose charts" : "Add a chart"}
          <PlusIcon />
        </button>
      </div>
      {(preview || settings) &&
        selected.map((spec, index) => {
          const saved = frozen.find(
            (chart) => JSON.stringify(chart.spec) === JSON.stringify(spec),
          );
          return (
            <div key={spec.id} className="progress-update-chart">
              <ProgressChart
                spec={spec}
                series={
                  saved && saved.cutoff <= cutoff
                    ? saved.series
                    : chartSeries(spec, available)
                }
                cutoff={saved && saved.cutoff <= cutoff ? saved.cutoff : cutoff}
              />
              {settings && saved && (
                <button
                  type="button"
                  className="progress-text-button"
                  onClick={() =>
                    onChange(
                      selected.map((item) =>
                        item.id === spec.id
                          ? {
                              ...item,
                              id: `${item.seriesIds[0]}_${Date.now().toString(36)}`,
                            }
                          : item,
                      ),
                    )
                  }
                >
                  Use latest source figures
                </button>
              )}
              {settings && (
                <ChartSelectionControls
                  spec={spec}
                  series={available}
                  index={index}
                  total={selected.length}
                  onChange={(value) =>
                    onChange(
                      selected.map((item) =>
                        item.id === spec.id ? value : item,
                      ),
                    )
                  }
                  onRemove={() =>
                    onChange(selected.filter((item) => item.id !== spec.id))
                  }
                  onMove={(direction) => move(index, direction)}
                />
              )}
            </div>
          );
        })}
      {selected.length > 0 && (
        <button
          type="button"
          className="progress-text-button"
          aria-expanded={preview}
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Hide chart preview" : "Preview selected charts"}
        </button>
      )}
      {selected.length > 0 && (
        <button
          type="button"
          className="progress-text-button"
          aria-expanded={settings}
          onClick={() => setSettings(!settings)}
        >
          {settings ? "Done arranging" : "Arrange charts & add context"}
        </button>
      )}
      <Dialog open={open} onClose={setOpen} className="progress-dialog">
        <div className="progress-backdrop" />
        <div className="progress-dialog-position">
          <DialogPanel className="progress-dialog-panel">
            <div className="progress-section-heading">
              <div>
                <DialogTitle>Choose your charts</DialogTitle>
                <p>
                  Source figures stay read-only. Your update can include no
                  charts.
                </p>
              </div>
              <button
                className="progress-icon-button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chart picker"
              >
                <XMarkIcon />
              </button>
            </div>
            <MetricLibrary
              series={available}
              selected={selected}
              onChange={onChange}
            />
            <div className="progress-dialog-footer">
              <span>{selected.length} selected</span>
              <button
                type="button"
                className="progress-button primary"
                onClick={() => setOpen(false)}
              >
                Done
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
