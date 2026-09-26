import { useId, useState } from "react";
import { Gauge, MoveRight, Search, TrendingDown, TrendingUp } from "lucide-react";
import { clsx } from "clsx";

import { topicResearchMetrics } from "~/lib/topic-research-metrics";
import type { VibeMarketingTopicCandidate } from "~/types/vibe-marketing";

function displayDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

const formatNumber = (value: number) => new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value);

function HistoryChart({ history }: { history: ReturnType<typeof topicResearchMetrics>["history"] }) {
  const chartId = useId();
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const values = history.points.filter((point) => point.value !== null);
  if (values.length < 2) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
        <div>
          <Search className="mx-auto h-5 w-5 text-slate-400" aria-hidden="true" />
          <p className="mt-2 text-sm font-bold text-slate-700">{values.length ? "Not enough history to plot a trend" : "Search history unavailable"}</p>
          {values.length === 1 ? <p className="mt-2 text-sm font-semibold text-slate-700">{values[0].label}: {formatNumber(values[0].value!)} {history.unit === "relative_interest" ? "/ 100 interest" : "searches"}</p> : null}
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{history.summary}</p>
        </div>
      </div>
    );
  }

  const width = 640;
  const height = 200;
  const left = 52;
  const right = 24;
  const top = 16;
  const bottom = 34;
  const max = history.unit === "relative_interest" ? 100 : Math.max(1, ...values.map((point) => point.value ?? 0)) * 1.1;
  const timestamps = history.points.map((point) => Date.parse(`${point.date}T00:00:00Z`));
  const firstTimestamp = timestamps[0];
  const timeSpan = Math.max(1, timestamps[timestamps.length - 1] - firstTimestamp);
  const x = (index: number) => left + (timestamps[index] - firstTimestamp) / timeSpan * (width - left - right);
  const y = (value: number) => top + (1 - value / max) * (height - top - bottom);
  const segments: string[][] = [];
  let segment: string[] = [];
  history.points.forEach((point, index) => {
    if (point.value === null) {
      if (segment.length) segments.push(segment);
      segment = [];
    } else {
      segment.push(`${x(index)},${y(point.value)}`);
    }
  });
  if (segment.length) segments.push(segment);
  const active = history.points.find((point) => point.date === activeDate) ?? values.at(-1)!;
  const labelEvery = Math.max(1, Math.ceil(history.points.length / 6));

  return (
    <div className="min-w-0 rounded-xl border border-slate-200/70 bg-white/80 px-3 pt-3 pb-2">
      <p aria-live="polite" className="min-h-5 text-right text-xs font-semibold text-slate-600">
        {active.label}: {active.value === null ? "No observation" : `${formatNumber(active.value)} ${history.unit === "relative_interest" ? "/ 100 interest" : "searches"}`}
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${chartId}-title ${chartId}-description`} className="w-full overflow-visible text-violet-600">
        <title id={`${chartId}-title`}>{`${history.unitLabel} over time`}</title>
        <desc id={`${chartId}-description`}>{history.coverageLabel}. {history.summary} Exact observations are available in the table below.</desc>
        {[0, 0.5, 1].map((fraction) => (
          <g key={fraction}>
            <line x1={left} x2={width - right} y1={y(max * fraction)} y2={y(max * fraction)} stroke="currentColor" className="text-slate-200" strokeDasharray="3 5" />
            <text x={left - 9} y={y(max * fraction) + 4} textAnchor="end" fill="currentColor" className="text-slate-500 text-2xl sm:text-xs">{formatNumber(max * fraction)}</text>
          </g>
        ))}
        {segments.map((points, index) => <polyline key={index} points={points.join(" ")} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
        {history.points.map((point, index) => (
          <g key={point.date}>
            {point.value !== null ? (
              <circle
                cx={x(index)} cy={y(point.value)} r={active.date === point.date ? 5 : 4}
                fill="currentColor" stroke="white" strokeWidth="2" tabIndex={index % Math.max(1, Math.ceil(history.points.length / 6)) === 0 || index === history.points.length - 1 ? 0 : -1}
                aria-label={`${point.label}: ${formatNumber(point.value)} ${history.unitLabel.toLowerCase()}`}
                onFocus={() => setActiveDate(point.date)} onMouseEnter={() => setActiveDate(point.date)}
              ><title>{`${point.label}: ${formatNumber(point.value)}`}</title></circle>
            ) : null}
            {index % labelEvery === 0 || index === history.points.length - 1 ? (
              <text x={x(index)} y={height - 9} textAnchor="middle" fill="currentColor" className="text-slate-500 text-2xl sm:text-xs">{new Intl.DateTimeFormat("en-AU", { month: "short", ...(history.unit === "monthly_searches" ? {} : { day: "numeric" }), timeZone: "UTC" }).format(new Date(`${point.date}T00:00:00Z`))}</text>
            ) : null}
          </g>
        ))}
      </svg>
      <details className="px-2 pb-1 text-xs text-slate-500">
        <summary className="cursor-pointer py-1 font-semibold">View exact values</summary>
        <div className="max-h-48 overflow-auto">
          <table className="mt-2 w-full text-left">
            <caption className="sr-only">{history.unitLabel} — {history.coverageLabel}</caption>
            <thead><tr><th scope="col" className="py-1">Date</th><th scope="col" className="py-1 text-right">{history.unitLabel}</th></tr></thead>
            <tbody>{history.points.map((point) => <tr key={point.date}><th scope="row" className="py-1 font-normal">{point.label}</th><td className="text-right tabular-nums">{point.value === null ? "Unavailable" : formatNumber(point.value)}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export default function TopicResearchDetails({ candidate }: { candidate: VibeMarketingTopicCandidate }) {
  const { difficulty, history, trend } = topicResearchMetrics(candidate);
  const providerUpdated = displayDate(candidate.trendLastUpdatedAt);
  const lastChecked = displayDate(candidate.metricsCheckedAt);
  const TrendIcon = trend.status === "declining" ? TrendingDown : trend.status === "stable" || trend.status === "unavailable" ? MoveRight : TrendingUp;
  const trendTone = trend.status === "declining" ? "bg-rose-50 text-rose-700" : trend.status === "stable" ? "bg-amber-50 text-amber-800" : trend.status === "unavailable" ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700";
  return (
    <div className="space-y-5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-500">Research keyword: <span className="font-bold text-slate-800">{candidate.keyword}</span></p>
        <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold", trendTone)}><TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />{trend.label}</span>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(220px,1fr)]">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-sm font-black text-slate-900">{history.unitLabel || "Search volume over time"}</h4>
            <span className="text-xs font-semibold text-slate-500">{history.coverageLabel}</span>
          </div>
          <HistoryChart history={history} />
          <p className="mt-2 text-xs leading-5 text-slate-500">{[history.sourceLabel, history.contextLabel, providerUpdated ? `Provider updated ${providerUpdated}` : null, history.summary].filter(Boolean).join(" · ")}</p>
        </div>
        <div className="grid content-start gap-5">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-black text-slate-900"><TrendIcon className="h-4 w-4" aria-hidden="true" />Search trend</h4>
            <p className="mt-2 text-xl font-black text-slate-900">{trend.label}{trend.changePercent !== null ? <span className="ml-2 text-sm font-bold text-slate-500">{trend.changePercent > 0 ? "+" : ""}{formatNumber(trend.changePercent)}%</span> : null}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{trend.summary}</p>
          </div>
          <div className="border-t border-slate-200/80 pt-4">
            <h4 className="flex items-center gap-2 text-sm font-black text-slate-900"><Gauge className="h-4 w-4" aria-hidden="true" />Ranking difficulty</h4>
            <p className="mt-2 text-xl font-black text-slate-900">{difficulty.score !== null ? <>{formatNumber(difficulty.score)}<span className="text-sm font-bold text-slate-500"> / 100</span></> : difficulty.label}</p>
            {difficulty.score !== null ? <><div role="meter" aria-label="Ranking difficulty" aria-valuemin={0} aria-valuemax={100} aria-valuenow={difficulty.score} className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-orange-500" style={{ width: `${difficulty.score}%` }} /></div><p className="mt-2 text-xs font-bold text-slate-700">{difficulty.label}</p></> : null}
            <p className="mt-2 text-sm leading-6 text-slate-600">{difficulty.summary}</p>
            {difficulty.sourceLabel ? <p className="mt-2 text-xs text-slate-500">{difficulty.sourceLabel}</p> : null}
          </div>
        </div>
      </div>
      {lastChecked ? <p className="text-xs text-slate-500">Last research lookup: {lastChecked}</p> : null}
      {candidate.whyRecommended || candidate.recommendationReason || candidate.reason ? <p className="border-t border-slate-200/80 pt-4 text-sm leading-6 text-slate-600"><span className="font-bold text-slate-800">Why this topic: </span>{candidate.whyRecommended || candidate.recommendationReason || candidate.reason}</p> : null}
      {candidate.relatedKeywords?.length ? <div className="flex flex-wrap gap-2">{candidate.relatedKeywords.slice(0, 8).map((keyword) => <span key={keyword} className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600">{keyword}</span>)}</div> : null}
    </div>
  );
}
