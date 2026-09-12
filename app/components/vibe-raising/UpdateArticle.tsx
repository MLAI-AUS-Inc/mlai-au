import { Link } from "react-router";
import { PencilSquareIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import UpdateEvidenceText from "./UpdateEvidenceText";
import UpdatesIncomeChart from "./UpdatesIncomeChart";
import { getUpdatesFinancialSeries } from "~/lib/startup-updates-presentation";
import {
  metricOptionsForValues,
  formatMetricDisplayValue,
  hasDisplayableMetricValue,
} from "~/lib/vibe-raising-metrics";
import type { VibeRaisingMonthlyUpdate } from "~/types/vibe-raising";
import "~/styles/update-editor.css";

/** Newlines are founder-authored points. Do not split prose or URLs at full stops. */
export function updateArticlePoints(text?: string) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim().replace(/^[-•]\s+/, ""))
    .filter(Boolean);
}
function StoryPoint({ text }: { text: string }) {
  const references = text.match(/\[[^\]\n]+\]\(https?:\/\/[^\s)]+\)/g) || [];
  const narrative = text
    .replace(/\[[^\]\n]+\]\(https?:\/\/[^\s)]+\)/g, "")
    .trim();
  return (
    <>
      {narrative}
      <>
        {references.length > 0 && (
          <details>
            <summary>
              {references.length} source{references.length === 1 ? "" : "s"}
            </summary>
            {references.map((reference, i) => (
              <div key={i}>
                <UpdateEvidenceText text={reference} />
              </div>
            ))}
          </details>
        )}
      </>
    </>
  );
}

export default function UpdateArticle({
  update,
  companyName,
  title,
  editable = false,
}: {
  update: VibeRaisingMonthlyUpdate;
  companyName: string;
  title?: string;
  editable?: boolean;
}) {
  const period = update.reportingPeriod;
  const cutoff = period?.cutoff ? new Date(period.cutoff) : null;
  const cutoffLabel =
    cutoff && Number.isFinite(cutoff.getTime())
      ? new Intl.DateTimeFormat("en-AU", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: period?.timezone || "UTC",
        }).format(cutoff)
      : null;
  const month =
    update.monthName || String(update.month || "").replace(/\s+\d{4}$/, "");
  const cover = update.coverImage?.url || update.coverImageUrl;
  // Historical articles use their frozen evidence even if a connector is later disconnected.
  const providers = Object.values(update.metricEvidence || {}).map((item) => ({
    key: item.source_provider,
    status: "connected",
  }));
  const series = getUpdatesFinancialSeries(
    [update],
    providers as Parameters<typeof getUpdatesFinancialSeries>[1],
  );
  const metrics = metricOptionsForValues(update.metrics).filter(
    (option) =>
      hasDisplayableMetricValue(update.metrics?.[option.key]) &&
      (!Array.isArray(update.displayConfig?.fullMetricKeys) ||
        update.displayConfig.fullMetricKeys.includes(option.key)),
  );
  const sections = [
    ["Highlights", update.highlights],
    ["Challenges", update.challenges],
    ["Learnings", update.learnings],
    ["Next steps", update.next30Days],
    ["How you can help", update.asks],
  ];
  const warnings = [
    ...(update.evidenceWarnings || []),
    ...(update.financialSnapshot?.dataQuality?.warnings || []),
  ];
  return (
    <article className="update-article">
      <header className="update-article-header">
        <div className="update-article-eyebrow">
          <span>{companyName}</span>
          <span aria-hidden="true">/</span>
          <span>Updates</span>
          {editable && (
            <Link
              to={`/founder-tools/updates/create?edit=${encodeURIComponent(update.id)}`}
              className="update-button secondary"
            >
              <PencilSquareIcon className="h-3.5 w-3.5" />
              Edit update
            </Link>
          )}
        </div>
        <h1>{title || `${month} Update`}</h1>
        <div className="update-article-meta">
          <span>{update.year || ""}</span>
          {period?.is_partial && (
            <span>
              Month to date
              {cutoffLabel
                ? ` · through ${cutoffLabel}`
                : " · incomplete period"}
            </span>
          )}
          {update.evidenceStatus === "legacy_unverified" && (
            <span>Historical update · unverified evidence</span>
          )}
        </div>
      </header>
      {cover && (
        <img
          className="update-article-cover"
          src={cover}
          alt={update.coverImage?.alt || ""}
        />
      )}
      <div className="update-article-body">
        {update.summary && (
          <div className="update-article-intro">
            <UpdateEvidenceText text={update.summary} />
          </div>
        )}
        {sections.map(([label, text]) => {
          const points = updateArticlePoints(text);
          return points.length ? (
            <section className="update-article-section" key={label}>
              <h2>{label}</h2>
              <ul>
                {points.map((point, index) => (
                  <li key={index}>
                    <StoryPoint text={point} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null;
        })}
        {(metrics.length > 0 || series) && (
          <section className="update-article-section">
            <h2>This period in numbers</h2>
            {period?.is_partial && (
              <p className="update-section-help">
                Partial period{cutoffLabel ? ` through ${cutoffLabel}` : ""}.
                Figures are not comparable with a complete month.
              </p>
            )}
            <dl className="update-metrics">
              {metrics.map((metric) => {
                const evidence = update.metricEvidence?.[metric.key];
                return (
                  <div className="update-metric" key={metric.key}>
                    <dt>{metric.label}</dt>
                    <dd>
                      {formatMetricDisplayValue(update.metrics[metric.key])}
                    </dd>
                    <small>
                      {evidence?.quality === "founder_asserted"
                        ? "Founder reported"
                        : evidence?.source_provider
                          ? `${evidence.source_provider === "xero" ? "Xero" : evidence.source_provider === "stripe" ? "Stripe" : evidence.source_provider} · imported`
                          : "Historical value · source unverified"}
                      {evidence?.quality === "partial"
                        ? " · partial coverage"
                        : ""}
                    </small>
                  </div>
                );
              })}
            </dl>
            {series && (
              <details>
                <summary>View income & costs over time</summary>
                <UpdatesIncomeChart series={series} showSourceLink={false} />
              </details>
            )}
          </section>
        )}
        {(update.pitchDeckUrl || update.videoUrl || update.sourceUrl) && (
          <section className="update-article-section">
            <h2>Links & attachments</h2>
            <div className="flex flex-wrap gap-3">
              {[
                ["Pitch deck", update.pitchDeckUrl],
                ["Walkthrough", update.videoUrl],
                ["Related link", update.sourceUrl],
              ].map(
                ([label, url]) =>
                  url && (
                    <a
                      className="update-button secondary"
                      href={url}
                      key={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label} ↗
                    </a>
                  ),
              )}
            </div>
          </section>
        )}
        {(warnings.length > 0 || period?.cutoff) && (
          <details className="update-article-evidence">
            <summary>Sources & reporting details</summary>
            {period?.cutoff && (
              <p>
                Source cutoff: {cutoffLabel || period.cutoff} ·{" "}
                {period.timezone || "UTC"}. This update uses its saved figures.
              </p>
            )}
            <ul>
              {[...new Set(warnings)].map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}
