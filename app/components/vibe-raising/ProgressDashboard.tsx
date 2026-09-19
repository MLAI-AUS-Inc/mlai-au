import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  chartSeries,
  formatProgress,
  latestProgress,
  metricChart,
  progressMonth,
  PROGRESS_CATEGORIES,
  recommendedCharts,
  type ProgressChartSpec,
  type ProgressRange,
  type StartupProgress,
} from "~/lib/startup-progress";
import type { VibeRaisingMonthlyUpdate } from "~/types/vibe-raising";
import ProgressChart from "./ProgressChart";
import { ChartSelectionControls, MetricLibrary } from "./ProgressChartPicker";
import ProgressCustomMetricForm from "./ProgressCustomMetricForm";
import "~/styles/startup-progress.css";

const ROADMAP = [
  ["Search Console", "Search clicks, impressions and discovery", "Planned"],
  ["Google Sheets", "Your own dated measurements", "CSV available now"],
  ["Product analytics", "Activation, meaningful use and retention", "Planned"],
  ["HubSpot", "Qualified demand and pilots", "Planned"],
  ["Newsletters", "Subscribers and campaign engagement", "CSV available now"],
  ["YouTube", "Channel views, watch time and subscribers", "Planned"],
  [
    "Instagram & Facebook",
    "Professional-account audience and engagement",
    "Access validation",
  ],
  [
    "LinkedIn",
    "Company-page growth and content performance",
    "Approval required",
  ],
  [
    "TikTok & X",
    "Platform-specific audience and engagement",
    "Access validation",
  ],
];

export default function ProgressDashboard({
  progress,
  companyName,
  drafts,
  busy,
  error,
  onSave,
  lastIntent,
}: {
  progress: StartupProgress;
  companyName: string;
  drafts: VibeRaisingMonthlyUpdate[];
  busy: boolean;
  error: string | null;
  onSave: (intent: string, body: Record<string, unknown>) => void;
  lastIntent?: string;
}) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("overview");
  const [charts, setCharts] = useState<ProgressChartSpec[]>(
    () => progress.charts ?? recommendedCharts(progress.series),
  );
  const [range, setRange] = useState<ProgressRange>(progress.range || 6);
  const [panel, setPanel] = useState<
    "library" | "custom" | "ga" | "connectors" | null
  >(null);
  const [arrange, setArrange] = useState(false);
  const [attach, setAttach] = useState<ProgressChartSpec | null>(null);
  const [draftId, setDraftId] = useState("");
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState<string | null>(null);
  const [property, setProperty] = useState(
    progress.googleAnalytics.properties[0]?.property_id || "",
  );
  const [eventName, setEventName] = useState("");
  const [eventLabel, setEventLabel] = useState("");
  useEffect(() => {
    if (!lastIntent || error || busy) return;
    if (lastIntent === "preferences") {
      setCharts(progress.charts ?? []);
      setRange(progress.range);
      setMessage("Your view is saved.");
    }
    if (lastIntent === "custom") {
      setMessage(
        "Metric saved. You can now choose it for your dashboard or update.",
      );
      setPanel("library");
    }
    if (lastIntent === "ga")
      setMessage(
        "Google Analytics history is ready. Choose an observed event to measure a meaningful action.",
      );
  }, [progress.version, lastIntent, error, busy]);
  useEffect(() => {
    const mapping = progress.googleAnalytics.mappings[property];
    setEventName(mapping?.eventName || "");
    setEventLabel(mapping?.label || "");
  }, [property, progress.googleAnalytics.mappings]);
  const ready = progress.series.filter((item) => item.readiness === "ready");
  const visibleCharts =
    category === "overview"
      ? charts
      : ready
          .filter((item) => item.category === category)
          .map((item) => metricChart(item, range));
  const focused = focus
    ? visibleCharts.find((item) => item.seriesIds.includes(focus))
    : null;
  const displayed = focused
    ? [
        focused,
        ...visibleCharts.filter((item) => item.id !== focused.id),
      ].slice(0, 2)
    : visibleCharts.slice(0, 2);
  const headline = visibleCharts
    .flatMap((spec) => chartSeries(spec, progress.series))
    .filter(
      (item, index, all) =>
        all.findIndex((other) => other.id === item.id) === index,
    )
    .slice(0, 4);
  const dirty =
    JSON.stringify(charts) !==
      JSON.stringify(progress.charts ?? recommendedCharts(progress.series)) ||
    range !== progress.range;
  const changeCharts = (next: ProgressChartSpec[]) => {
    setCharts(next);
    setMessage("View changed. Save when you’re ready.");
  };
  const move = (index: number, direction: -1 | 1) => {
    const next = [...charts];
    [next[index], next[index + direction]] = [
      next[index + direction],
      next[index],
    ];
    changeCharts(next);
  };
  return (
    <main className="startup-progress">
      <header className="progress-heading">
        <div>
          <p className="progress-eyebrow">{companyName}</p>
          <h1>Progress</h1>
          <p>Your story, in numbers.</p>
        </div>
        <div className="progress-heading-actions">
          <label className="progress-range">
            <span className="sr-only">Chart history</span>
            <select
              disabled={busy}
              value={range}
              onChange={(event) =>
                setRange(Number(event.target.value) as ProgressRange)
              }
            >
              {[3, 6, 12, 24].map((value) => (
                <option key={value} value={value}>
                  Last {value} months
                </option>
              ))}
            </select>
          </label>
          <button
            className="progress-button"
            type="button"
            disabled={busy}
            onClick={() => setPanel("library")}
          >
            <AdjustmentsHorizontalIcon />
            Choose metrics
          </button>
          {dirty && (
            <button
              className="progress-button primary"
              disabled={busy}
              type="button"
              onClick={() => onSave("preferences", { charts, range })}
            >
              {busy ? "Saving…" : "Save view"}
            </button>
          )}
        </div>
      </header>
      {error && (
        <p className="progress-error" role="alert">
          {error}
        </p>
      )}
      <p className="progress-status" role="status">
        {message}
      </p>
      <nav className="progress-tabs" aria-label="Progress categories">
        {PROGRESS_CATEGORIES.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={category === item.key}
            onClick={() => {
              setCategory(item.key);
              setFocus(null);
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {headline.length > 0 && (
        <dl className="progress-headlines">
          {headline.map((item) => {
            const { latest, change } = latestProgress(item, progress.asOf);
            return (
              <div key={item.id}>
                <dt>{item.label}</dt>
                <dd>{formatProgress(latest?.value ?? null, item.unit)}</dd>
                <small>
                  {change !== null
                    ? `${change > 0 ? "+" : ""}${item.unit === "%" ? `${change.toFixed(1)} percentage points` : formatProgress(change, item.unit)} · `
                    : ""}
                  {latest ? progressMonth(latest.date) : "No data"}
                  {latest?.partial ? " · partial" : ""}
                </small>
                <span>{item.source}</span>
              </div>
            );
          })}
        </dl>
      )}
      {!visibleCharts.length && (
        <div className="progress-empty progress-onboarding">
          <span className="progress-empty-mark" aria-hidden="true">
            ↗
          </span>
          <h2>
            {ready.length
              ? "Make this view yours"
              : "Every startup has a different kind of progress."}
          </h2>
          <p>
            {ready.length
              ? "Choose the measurements you’d like to see here."
              : "Bring in numbers from your sources, or start with pilots, a waitlist or another milestone you measure."}
          </p>
          <div>
            <button
              className="progress-button primary"
              type="button"
              onClick={() => setPanel(ready.length ? "library" : "custom")}
            >
              {ready.length ? "Choose metrics" : "Add your first metric"}
            </button>
            <Link
              className="progress-button"
              to="/founder-tools/data-sources?next=%2Ffounder-tools%2Fprogress"
            >
              Manage connections
            </Link>
          </div>
        </div>
      )}
      <div className="progress-chart-grid">
        {displayed.map((spec) => (
          <ProgressChart
            key={spec.id}
            spec={{ ...spec, months: range }}
            series={chartSeries(spec, progress.series)}
            cutoff={progress.asOf}
            actions={
              <button
                className="progress-text-button"
                type="button"
                onClick={() => {
                  setAttach({ ...spec, months: range });
                  setDraftId("");
                }}
              >
                Add to update <PlusIcon />
              </button>
            }
          />
        ))}
      </div>
      {visibleCharts.length > 2 && (
        <div className="progress-other-charts">
          {visibleCharts
            .filter((spec) => !displayed.some((item) => item.id === spec.id))
            .map((spec) => (
              <button
                key={spec.id}
                className="progress-button"
                type="button"
                onClick={() => setFocus(spec.seriesIds[0])}
              >
                View{" "}
                {chartSeries(spec, progress.series)
                  .map((item) => item.label.toLowerCase())
                  .join(" & ")}
                <ArrowRightIcon />
              </button>
            ))}
        </div>
      )}
      <div className="progress-bottom-actions">
        <button
          type="button"
          className="progress-text-button"
          onClick={() => setPanel("custom")}
        >
          <PlusIcon />
          Add a metric
        </button>
        {charts.length > 0 && (
          <button
            className="progress-text-button"
            type="button"
            aria-expanded={arrange}
            onClick={() => setArrange(!arrange)}
          >
            {arrange ? "Done arranging" : "Arrange overview"}
          </button>
        )}
        <Link to="/founder-tools/data-sources?next=%2Ffounder-tools%2Fprogress">
          Manage connections ↗
        </Link>
      </div>
      {arrange && (
        <fieldset disabled={busy} className="progress-arrange">
          <h2>Your overview</h2>
          {charts.map((spec, index) => (
            <ChartSelectionControls
              key={spec.id}
              spec={spec}
              series={progress.series}
              index={index}
              total={charts.length}
              onChange={(value) =>
                changeCharts(
                  charts.map((item) => (item.id === spec.id ? value : item)),
                )
              }
              onRemove={() =>
                changeCharts(charts.filter((item) => item.id !== spec.id))
              }
              onMove={(direction) => move(index, direction)}
            />
          ))}
        </fieldset>
      )}
      <section className="progress-source-strip">
        <div>
          <h2>More of your progress, in one place.</h2>
          <p>Connect your tools, or bring your own monthly measurements.</p>
        </div>
        <div>
          {progress.googleAnalytics.properties.length > 0 && (
            <button
              className="progress-button"
              type="button"
              onClick={() => setPanel("ga")}
            >
              <ArrowPathIcon />
              Google Analytics history
            </button>
          )}
          <button
            className="progress-button"
            type="button"
            onClick={() => setPanel("connectors")}
          >
            Explore sources <ArrowRightIcon />
          </button>
        </div>
      </section>
      <footer className="progress-page-footer">
        <span>
          <LockClosedIcon />
          Private to your startup
        </span>
        <Link to="/founder-tools/updates">
          Your updates <ArrowRightIcon />
        </Link>
      </footer>
      <Dialog
        open={panel !== null}
        onClose={() => setPanel(null)}
        className="progress-dialog"
      >
        <div className="progress-backdrop" />
        <div className="progress-dialog-position">
          <DialogPanel className="progress-dialog-panel">
            <div className="progress-section-heading">
              <div>
                <DialogTitle>
                  {panel === "library"
                    ? "Choose your metrics"
                    : panel === "custom"
                      ? "Your own measurements"
                      : panel === "ga"
                        ? "Google Analytics"
                        : "Build your progress library"}
                </DialogTitle>
                <p>
                  {panel === "library"
                    ? "Pinned metrics stay private until you add them to an update."
                    : ""}
                </p>
              </div>
              <button
                className="progress-icon-button"
                type="button"
                aria-label="Close panel"
                onClick={() => setPanel(null)}
              >
                <XMarkIcon />
              </button>
            </div>
            {error && (
              <p className="progress-error" role="alert">
                {error}
              </p>
            )}
            {panel === "library" && (
              <>
                <MetricLibrary
                  series={progress.series}
                  selected={charts}
                  onChange={changeCharts}
                />
                <div className="progress-dialog-footer">
                  <button
                    className="progress-text-button"
                    type="button"
                    onClick={() => setPanel("custom")}
                  >
                    Add a founder-provided metric
                  </button>
                  <button
                    className="progress-button primary"
                    type="button"
                    onClick={() => setPanel(null)}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
            {panel === "custom" && (
              <ProgressCustomMetricForm
                progress={progress}
                busy={busy}
                onSave={(body) => onSave("custom", body)}
              />
            )}
            {panel === "ga" && (
              <div className="progress-custom-form">
                <p>
                  Load up to 24 months for one selected property. Users and
                  rates are calculated at monthly grain by Google Analytics.
                </p>
                <label>
                  Property
                  <select
                    value={property}
                    onChange={(event) => setProperty(event.target.value)}
                  >
                    {progress.googleAnalytics.properties.map((item) => (
                      <option key={item.property_id} value={item.property_id}>
                        {item.property_display_name || item.property_id}
                      </option>
                    ))}
                  </select>
                </label>
                {(progress.googleAnalytics.events[property] || []).length >
                  0 && (
                  <>
                    <label>
                      Which action matters?
                      <select
                        value={eventName}
                        onChange={(event) => setEventName(event.target.value)}
                      >
                        <option value="">Website traffic only</option>
                        {progress.googleAnalytics.events[property].map(
                          (name) => (
                            <option key={name}>{name}</option>
                          ),
                        )}
                      </select>
                    </label>
                    {eventName && (
                      <label>
                        Describe this action
                        <input
                          maxLength={70}
                          value={eventLabel}
                          onChange={(event) =>
                            setEventLabel(event.target.value)
                          }
                          placeholder="Completed a first project"
                        />
                      </label>
                    )}
                    <p>
                      Action occurrences and distinct action users will be
                      separate measures.
                    </p>
                  </>
                )}
                <button
                  className="progress-button primary"
                  disabled={busy || !property}
                  type="button"
                  onClick={() =>
                    onSave("ga", {
                      propertyId: property,
                      eventName,
                      eventLabel,
                    })
                  }
                >
                  {busy ? "Loading history…" : "Load history & events"}
                </button>
              </div>
            )}
            {panel === "connectors" && (
              <>
                <div className="progress-source-intro">
                  <h3>Available with your current tools</h3>
                  <p>
                    Xero and Stripe financial observations, Google Analytics
                    website and action history, and Luma event participation.
                    Availability depends on connection, coverage and source
                    setup.
                  </p>
                  <Link
                    className="progress-button"
                    to="/founder-tools/data-sources?next=%2Ffounder-tools%2Fprogress"
                  >
                    Manage connections <ArrowRightIcon />
                  </Link>
                  <button
                    type="button"
                    className="progress-text-button"
                    onClick={() => setPanel("custom")}
                  >
                    Import a CSV or add values
                  </button>
                </div>
                <h3 className="progress-roadmap-heading">Next connections</h3>
                <div className="progress-roadmap">
                  {ROADMAP.map(([name, description, status]) => (
                    <div key={name}>
                      <div>
                        <strong>{name}</strong>
                        <p>{description}</p>
                      </div>
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog
        open={attach !== null}
        onClose={() => setAttach(null)}
        className="progress-dialog"
      >
        <div className="progress-backdrop" />
        <div className="progress-dialog-position">
          <DialogPanel className="progress-dialog-panel compact">
            <div className="progress-section-heading">
              <DialogTitle>Add to an update</DialogTitle>
              <button
                type="button"
                className="progress-icon-button"
                aria-label="Close update selection"
                onClick={() => setAttach(null)}
              >
                <XMarkIcon />
              </button>
            </div>
            <p>
              This opens a private draft. You’ll review the chart before saving
              or sharing.
            </p>
            <label className="progress-field">
              Choose a draft
              <select
                value={draftId}
                onChange={(event) => setDraftId(event.target.value)}
              >
                <option value="">Start a new update</option>
                {drafts.map((draft) => (
                  <option key={draft.id} value={draft.id}>
                    {draft.updateDate || draft.month} ·{" "}
                    {draft.summary?.slice(0, 50) || "Draft update"}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="progress-button primary"
              onClick={() => {
                if (!attach) return;
                const params = new URLSearchParams(
                  draftId ? { edit: draftId } : {},
                );
                params.set("chart", JSON.stringify(attach));
                params.set("chartCompany", progress.companyId);
                navigate(`/founder-tools/updates/create?${params}`);
              }}
            >
              Open draft <ArrowRightIcon />
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </main>
  );
}
