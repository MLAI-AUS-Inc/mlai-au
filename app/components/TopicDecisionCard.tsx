import { clsx } from "clsx";

import type { VibeMarketingTopicCandidate } from "~/types/vibe-marketing";

function numericValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    if (!cleaned) return undefined;
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function stringValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || undefined;
  }
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: value >= 100 ? 0 : 1 }).format(value);
}

function titleCase(value: string) {
  return value
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function intentLabel(candidate: VibeMarketingTopicCandidate) {
  const explicit = stringValue(candidate.intent);
  if (explicit) return titleCase(explicit);
  return "Informational";
}

function audienceFromCandidate(candidate: VibeMarketingTopicCandidate) {
  const explicit = stringValue(candidate.audience);
  if (explicit) return explicit;

  const intentRecord = recordValue(candidate.intent);
  const recordAudience =
    stringValue(intentRecord?.audience) ||
    stringValue(intentRecord?.target_audience) ||
    stringValue(intentRecord?.targetAudience) ||
    stringValue(intentRecord?.segment);
  if (recordAudience) return recordAudience;

  const intentText = stringValue(candidate.intent);
  if (intentText) return `${titleCase(intentText)} searchers looking for practical guidance.`;

  const keyword = candidate.keyword.toLowerCase();
  if (keyword.startsWith("what is") || keyword.startsWith("what are")) {
    return "Beginners searching for a plain-English explanation.";
  }
  if (keyword.startsWith("how to") || keyword.includes("guide")) {
    return "Readers looking for step-by-step guidance.";
  }
  return `Readers searching for practical guidance on ${candidate.keyword}.`;
}

function difficultyLabel(value: unknown) {
  const difficulty = numericValue(value);
  if (difficulty === undefined) return "Unavailable";
  if (difficulty <= 35) return "Low";
  if (difficulty <= 65) return "Moderate";
  return "High";
}

function trendRecord(candidate: VibeMarketingTopicCandidate) {
  return recordValue(candidate.velocity);
}

function dailyVolumes(candidate: VibeMarketingTopicCandidate) {
  const record = trendRecord(candidate);
  const raw = record?.dailyVolumes ?? record?.daily_volumes;
  if (!Array.isArray(raw)) return [];
  return raw.map(numericValue).filter((value): value is number => value !== undefined);
}

function trendStatus(candidate: VibeMarketingTopicCandidate) {
  const record = trendRecord(candidate);
  return (
    stringValue(record?.trendStatus) ||
    stringValue(record?.trend_status) ||
    stringValue(candidate.trend) ||
    stringValue(candidate.interest)
  );
}

function normalizedTrendStatus(candidate: VibeMarketingTopicCandidate) {
  const status = trendStatus(candidate)?.toLowerCase();
  if (!status) return null;
  if (status.includes("breakout")) return "breakout";
  if (status.includes("rising") || status.includes("growing")) return "rising";
  if (status.includes("declin")) return "declining";
  if (status.includes("stable")) return "stable";
  return status;
}

function trendLabel(candidate: VibeMarketingTopicCandidate) {
  const explicit = stringValue(candidate.trendLabel);
  if (explicit) return explicit;
  const status = normalizedTrendStatus(candidate);
  if (status === "breakout") return "Breakout";
  if (status === "rising") return "Growing";
  if (status === "declining") return "Declining";
  if (status === "stable") return "Stable";
  return "Unavailable";
}

function trendSummary(candidate: VibeMarketingTopicCandidate) {
  const explicit = stringValue(candidate.statsMeaning);
  if (explicit) return explicit;
  const score = numericValue(recordValue(candidate.velocity)?.velocityScore ?? recordValue(candidate.velocity)?.velocity_score);
  const percent = score !== undefined ? `${score > 0 ? "+" : ""}${Math.round(score * 100)}%` : null;
  const status = normalizedTrendStatus(candidate);
  if (status === "breakout") return `${percent ?? "Strong"} recent growth in search interest.`;
  if (status === "rising") return `${percent ?? "Growing"} recent search interest.`;
  if (status === "declining") return `${percent ?? "Lower"} recent search interest.`;
  if (status === "stable") return "Search interest looks steady.";
  return "Trend data is not available yet.";
}

function opportunityScore(candidate: VibeMarketingTopicCandidate) {
  return numericValue(candidate.opportunityScore);
}

export function topicOpportunityBadge(candidate: VibeMarketingTopicCandidate | null | undefined) {
  if (!candidate) return "Custom topic";
  const score = opportunityScore(candidate);
  if (score !== undefined) {
    if (score > 100) {
      if (score >= 900) return "High opportunity";
      if (score >= 500) return "Good opportunity";
      return "Exploratory";
    }
    if (score >= 80) return "High opportunity";
    if (score >= 40) return "Good opportunity";
    return "Exploratory";
  }
  if (trendStatus(candidate)) return trendLabel(candidate);
  return "Trend unavailable";
}

function whyTopic(candidate: VibeMarketingTopicCandidate) {
  return (
    stringValue(candidate.whyRecommended) ||
    stringValue(candidate.recommendationReason) ||
    stringValue(candidate.reason) ||
    "Recommended from the latest topic research."
  );
}

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) {
    return (
      <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs font-bold text-gray-400">
        Trend unavailable
      </div>
    );
  }
  const width = 320;
  const height = 112;
  const padding = 10;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = padding + (index / Math.max(values.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / span) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const areaPoints = `${padding},${height - padding} ${points.join(" ")} ${width - padding},${height - padding}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Search trend chart" className="h-28 w-full overflow-visible">
      <polygon points={areaPoints} className="fill-violet-100/70" />
      <polyline points={points.join(" ")} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-violet-600" />
      {points.map((point) => {
        const [cx, cy] = point.split(",");
        return <circle key={point} cx={cx} cy={cy} r="3.5" className="fill-violet-600" />;
      })}
    </svg>
  );
}

function MetricCard({ label, value, helper }: { label: string; value: string; helper?: string | null }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
      <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-black text-gray-950">{value}</p>
      {helper ? <p className="mt-0.5 text-xs font-semibold text-gray-500">{helper}</p> : null}
    </div>
  );
}

function TopicDetails({ candidate }: { candidate: VibeMarketingTopicCandidate }) {
  const relatedKeywords = candidate.relatedKeywords ?? [];
  const paaQuestions = candidate.paaQuestions ?? [];
  const saturation = recordValue(candidate.aiSaturation);
  const serpNotes = [
    saturation?.aiOverviewPresent ? "AI overview present" : null,
    saturation?.featuredSnippetPresent ? "Featured snippet present" : null,
    saturation?.videoCarouselPresent ? "Video carousel present" : null,
    saturation?.knowledgePanelPresent ? "Knowledge panel present" : null,
    stringValue(saturation?.hostilityRecommendation)
      ? `SERP priority: ${titleCase(String(saturation?.hostilityRecommendation))}`
      : null,
  ].filter(Boolean);

  return (
    <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 lg:grid-cols-3">
      <div className="rounded-lg bg-gray-50 px-3 py-3">
        <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Why this topic</p>
        <p className="mt-1 text-sm font-semibold leading-5 text-gray-700">{whyTopic(candidate)}</p>
      </div>
      <div className="rounded-lg bg-gray-50 px-3 py-3">
        <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Related keywords</p>
        {relatedKeywords.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedKeywords.slice(0, 6).map((keyword) => (
              <span key={keyword} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-gray-600 ring-1 ring-gray-200">
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-1 text-sm font-semibold text-gray-500">No related keyword data yet.</p>
        )}
      </div>
      <div className="rounded-lg bg-gray-50 px-3 py-3">
        <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Search notes</p>
        {paaQuestions.length > 0 || serpNotes.length > 0 ? (
          <div className="mt-2 space-y-2 text-sm font-semibold leading-5 text-gray-700">
            {paaQuestions.slice(0, 3).map((item) => (
              <p key={item.question}>{item.question}</p>
            ))}
            {serpNotes.map((note) => (
              <p key={String(note)}>{note}</p>
            ))}
          </div>
        ) : (
          <p className="mt-1 text-sm font-semibold text-gray-500">No extra SERP detail yet.</p>
        )}
      </div>
    </div>
  );
}

export function TopicMetricExplainerStrip() {
  const items = [
    ["Search volume", "How many people search each month."],
    ["Trend", "Whether interest is growing, stable, or declining."],
    ["Keyword difficulty", "How hard it may be to rank on Google."],
    ["Opportunity score", "Our overall score for this topic."],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([title, body]) => (
        <div key={title} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-sm font-black text-gray-950">{title}</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-gray-600">{body}</p>
        </div>
      ))}
    </div>
  );
}

export function TopicDecisionCard({
  candidate,
  checked,
  expanded = false,
  rank = 1,
  onChange,
  onToggleDetails,
  name = "topicCandidateId",
}: {
  candidate: VibeMarketingTopicCandidate;
  checked: boolean;
  expanded?: boolean;
  rank?: number;
  onChange: () => void;
  onToggleDetails?: () => void;
  name?: string;
}) {
  const volume = numericValue(candidate.volume);
  const score = opportunityScore(candidate);
  const trendValues = dailyVolumes(candidate);
  const hasTrend = trendValues.length >= 2 || Boolean(trendStatus(candidate));
  const opportunity = score === undefined ? "Unavailable" : formatNumber(score);
  return (
    <div
      className={clsx(
        "rounded-xl border bg-white p-4 transition",
        checked ? "border-violet-400 shadow-sm ring-2 ring-violet-100" : "border-gray-200 hover:border-violet-200",
      )}
    >
      <input
        type="radio"
        name={name}
        value={candidate.id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(260px,1fr)_minmax(220px,0.75fr)_160px] xl:items-center">
        <div className="flex min-w-0 gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-violet-600 text-sm font-black text-white">
            {rank}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-black leading-6 text-gray-950">{candidate.title}</h3>
            <p className="mt-1 text-sm font-bold text-gray-500">Keyword: {candidate.keyword}</p>
            <span className="mt-3 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
              {intentLabel(candidate)}
            </span>
            <p className="mt-3 text-sm font-semibold leading-5 text-gray-600">{audienceFromCandidate(candidate)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white px-4 py-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-black text-gray-950">Search trend</p>
            <p className="text-xs font-bold text-gray-500">
              {volume !== undefined ? `${formatNumber(volume)} searches/mo` : candidate.volumeDisplay ?? "Volume unavailable"}
            </p>
          </div>
          <Sparkline values={trendValues} />
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
          <MetricCard label="Search volume" value={volume !== undefined ? formatNumber(volume) : "Unavailable"} helper="per month" />
          <MetricCard label="Difficulty" value={difficultyLabel(candidate.difficulty)} helper={numericValue(candidate.difficulty) !== undefined ? `${formatNumber(numericValue(candidate.difficulty)!)} / 100` : null} />
          <MetricCard label="Opportunity" value={opportunity} helper={topicOpportunityBadge(candidate)} />
          <MetricCard label="Trend" value={trendLabel(candidate)} helper={hasTrend ? trendSummary(candidate) : "Trend unavailable"} />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onToggleDetails}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-violet-200 px-4 text-sm font-black text-violet-700 transition hover:bg-violet-50"
          >
            {expanded ? "Hide details" : "View details"}
          </button>
          <button
            type="button"
            onClick={onChange}
            className={clsx(
              "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-black transition",
              checked ? "bg-violet-600 text-white shadow-sm" : "bg-gray-950 text-white hover:bg-black",
            )}
          >
            {checked ? "Selected" : "Select topic"}
          </button>
        </div>
      </div>
      {expanded ? <TopicDetails candidate={candidate} /> : null}
    </div>
  );
}

export function CustomTopicDecisionCard({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={clsx(
        "block cursor-pointer rounded-xl border p-4 transition",
        checked
          ? "border-violet-400 bg-violet-50/70 shadow-sm ring-2 ring-violet-100"
          : "border-gray-200 bg-white hover:border-violet-200 hover:bg-violet-50/30",
      )}
    >
      <div className="flex gap-3">
        <input
          type="radio"
          name="topicCandidateId"
          value="__custom__"
          checked={checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 flex-none text-violet-600"
        />
        <div>
          <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Custom article</p>
          <h3 className="mt-1 text-base font-black text-gray-950">Enter my own topic</h3>
          <p className="mt-1 text-sm font-semibold text-gray-600">Use your own keyword, title, and article context.</p>
        </div>
      </div>
    </label>
  );
}
