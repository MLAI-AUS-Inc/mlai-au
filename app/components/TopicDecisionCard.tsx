import { clsx } from "clsx";
import type { ComponentType } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Gauge,
  MoveRight,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

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

const VERIFIED_DIFFICULTY_SOURCES = new Set(["dataforseo_labs", "dataforseo_bulk"]);

function verifiedDifficulty(candidate: VibeMarketingTopicCandidate) {
  const source = stringValue(candidate.difficultySource);
  if (!source || !VERIFIED_DIFFICULTY_SOURCES.has(source)) return undefined;
  const difficulty = numericValue(candidate.difficulty);
  if (difficulty === undefined) return undefined;
  return Math.max(0, Math.min(100, difficulty));
}

function difficultyGuidance(score: number) {
  if (score <= 20) return "very approachable; strong content could start getting traction in a few months";
  if (score <= 40) return "achievable with strong content and a realistic 4-6 month ranking window";
  if (score <= 60) return "moderate; likely needs a strong article, internal links, and time, often 6-9+ months";
  if (score <= 80) return "hard; usually needs authority, supporting content, and backlinks";
  return "very hard; treat this as a long-term authority play";
}

function difficultyPhrase(candidate: VibeMarketingTopicCandidate) {
  const difficulty = verifiedDifficulty(candidate);
  if (difficulty === undefined) return "Difficulty pending";
  return `Difficulty ${formatNumber(difficulty)}/100: ${difficultyGuidance(difficulty)}`;
}

function cleanReason(candidate: VibeMarketingTopicCandidate) {
  const reason = stringValue(candidate.reason);
  if (!reason) return null;
  const cleaned = reason
    .replace(/\bwith\s+(?:low|moderate|medium|high)\s+competition\.?/gi, "")
    .replace(/\b(?:low|moderate|medium|high)\s+competition(?:\s+at\s+\d+(?:\.\d+)?\/100)?\.?/gi, "")
    .replace(/\bdifficulty\s+\d+(?:\.\d+)?\/100\.?/gi, "")
    .replace(/\bdifficulty pending\.?/gi, "")
    .replace(/\bopportunity score\s+\d+(?:\.\d+)?\.?/gi, "")
    .replace(/\b\d[\d,]*\s+monthly searches\.?/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return cleaned || null;
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

function difficultyLabel(candidate: VibeMarketingTopicCandidate) {
  const difficulty = verifiedDifficulty(candidate);
  if (difficulty === undefined) return "Pending";
  if (difficulty <= 20) return "Very approachable";
  if (difficulty <= 40) return "Achievable";
  if (difficulty <= 60) return "Moderate";
  if (difficulty <= 80) return "Hard";
  return "Very hard";
}

function difficultyMetricHelper(candidate: VibeMarketingTopicCandidate) {
  const difficulty = verifiedDifficulty(candidate);
  if (difficulty === undefined) return "Difficulty pending";
  return `${formatNumber(difficulty)} / 100`;
}

function trendRecord(candidate: VibeMarketingTopicCandidate) {
  return recordValue(candidate.velocity);
}

function numberSeries(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "number" || typeof item === "string") return numericValue(item);
      const record = recordValue(item);
      return numericValue(
        record?.value ??
          record?.volume ??
          record?.search_volume ??
          record?.searchVolume ??
          record?.monthly_searches ??
          record?.monthlySearches,
      );
    })
    .filter((item): item is number => item !== undefined);
}

function searchHistory(candidate: VibeMarketingTopicCandidate) {
  const explicit = numberSeries(candidate.monthlySearches);
  if (explicit.length >= 2) return explicit;
  const record = trendRecord(candidate);
  const velocityHistory = numberSeries(record?.dailyVolumes ?? record?.daily_volumes);
  if (velocityHistory.length >= 2) return velocityHistory;
  return [];
}

function placeholderHistory(candidate: VibeMarketingTopicCandidate) {
  const volume = numericValue(candidate.volume);
  const base = volume && volume > 0 ? volume : 100;
  const multipliers = [0.52, 0.68, 0.61, 0.76, 0.72, 0.84, 0.91, 0.8];
  return multipliers.map((multiplier) => Math.max(1, Math.round(base * multiplier)));
}

function chartValues(candidate: VibeMarketingTopicCandidate) {
  const history = searchHistory(candidate);
  return history.length >= 2 ? history : placeholderHistory(candidate);
}

function trendStatus(candidate: VibeMarketingTopicCandidate) {
  const record = trendRecord(candidate);
  return (
    stringValue(candidate.trendStatus) ||
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
  const explicit = stringValue(candidate.trendDescription) || stringValue(candidate.statsMeaning);
  if (explicit) return explicit;
  const trendPercent = numericValue(candidate.trendPercent);
  const score = numericValue(recordValue(candidate.velocity)?.velocityScore ?? recordValue(candidate.velocity)?.velocity_score);
  const percentValue = trendPercent !== undefined ? trendPercent : score !== undefined ? Math.round(score * 100) : undefined;
  const percent = percentValue !== undefined ? `${percentValue > 0 ? "+" : ""}${Math.round(percentValue)}%` : null;
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
    if (score >= 800) return "High";
    if (score >= 400) return "Good";
    return "Emerging";
  }
  if (trendStatus(candidate)) return trendLabel(candidate);
  return "Trend unavailable";
}

function whyTopic(candidate: VibeMarketingTopicCandidate) {
  const parts: string[] = [];
  const volume = numericValue(candidate.volume);
  if (volume !== undefined) parts.push(`${formatNumber(volume)} monthly searches`);
  parts.push(difficultyPhrase(candidate));
  const trend = stringValue(candidate.trend) || stringValue(candidate.interest);
  if (trend) parts.push(`${trend.toLowerCase().includes("interest") ? trend : `${trend} interest`}`);
  const aiSearches = numericValue(candidate.aiSearches);
  if (aiSearches !== undefined) parts.push(`${formatNumber(aiSearches)} AI searches/mo`);

  const metrics = parts.length ? `${parts.join(". ")}.` : null;
  const reason =
    stringValue(candidate.whyRecommended) ||
    stringValue(candidate.recommendationReason) ||
    cleanReason(candidate);
  if (metrics && reason) return `${metrics} ${reason}`;
  return metrics || reason || "Recommended from the latest topic discovery.";
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

function trendIcon(candidate: VibeMarketingTopicCandidate) {
  const status = normalizedTrendStatus(candidate);
  if (status === "declining") return TrendingDown;
  if (status === "stable") return MoveRight;
  return TrendingUp;
}

function trendTone(candidate: VibeMarketingTopicCandidate) {
  const status = normalizedTrendStatus(candidate);
  if (status === "declining") return "text-red-600";
  if (status === "stable") return "text-amber-500";
  return "text-emerald-600";
}

function trendPercentLabel(candidate: VibeMarketingTopicCandidate) {
  const trendPercent = numericValue(candidate.trendPercent);
  const score = numericValue(recordValue(candidate.velocity)?.velocityScore ?? recordValue(candidate.velocity)?.velocity_score);
  const value = trendPercent !== undefined ? trendPercent : score !== undefined ? score * 100 : undefined;
  if (value === undefined) return null;
  return `${value > 0 ? "+" : ""}${Math.round(value)}% past 6 months`;
}

function TrendPanel({ candidate }: { candidate: VibeMarketingTopicCandidate }) {
  const Icon = trendIcon(candidate);
  return (
    <div className="min-h-[132px] border-gray-100 px-0 py-1 xl:border-l xl:px-5">
      <div className="flex items-center gap-2">
        <p className="text-sm font-black text-gray-950">Trend</p>
        <Icon className={clsx("h-4 w-4", trendTone(candidate))} />
      </div>
      <p className={clsx("mt-3 text-base font-black", trendTone(candidate))}>{trendLabel(candidate)}</p>
      {trendPercentLabel(candidate) ? <p className="mt-2 text-xs font-bold text-gray-500">{trendPercentLabel(candidate)}</p> : null}
      <p className="mt-3 text-sm font-semibold leading-5 text-gray-600">{trendSummary(candidate)}</p>
    </div>
  );
}

function MetricCard({ label, value, helper, icon }: { label: string; value: string; helper?: string | null; icon?: ComponentType<{ className?: string }> }) {
  const Icon = icon;
  return (
    <div className="flex min-h-[58px] items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
      {Icon ? <Icon className="h-4 w-4 flex-none text-violet-600" /> : null}
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="mt-0.5 text-sm font-black text-gray-950">{value}</p>
        {helper ? <p className="mt-0.5 text-xs font-semibold text-gray-500">{helper}</p> : null}
      </div>
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
    { title: "Search Volume", body: "How many people search for this topic each month.", Icon: Search, tone: "text-violet-600 bg-violet-50" },
    { title: "Trend", body: "Whether interest is growing, stable, or declining.", Icon: TrendingUp, tone: "text-emerald-600 bg-emerald-50" },
    { title: "Keyword Difficulty", body: "How hard it is to rank on Google (difficulty out of 100).", Icon: Gauge, tone: "text-orange-500 bg-orange-50" },
    { title: "Opportunity Score", body: "Our overall score of how good this topic is to target.", Icon: Star, tone: "text-violet-600 bg-violet-50" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, body, Icon, tone }) => (
        <div key={title} className="flex min-h-[92px] gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
          <span className={clsx("flex h-10 w-10 flex-none items-center justify-center rounded-lg", tone)}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black text-gray-950">{title}</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-gray-600">{body}</p>
          </div>
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
  const history = searchHistory(candidate);
  const trendValues = chartValues(candidate);
  const hasTrend = history.length >= 2 || Boolean(trendStatus(candidate));
  const opportunity = score === undefined ? "Unavailable" : `${formatNumber(score)} / 2,000`;
  const relatedKeywords = candidate.relatedKeywords ?? [];
  const handleSelect = () => onChange();
  return (
    <div
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      }}
      className={clsx(
        "cursor-pointer rounded-xl border bg-white p-4 transition",
        checked ? "border-violet-400 bg-violet-50/20 shadow-sm ring-2 ring-violet-100" : "border-gray-200 hover:border-violet-200",
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
      <div className="grid gap-5 xl:grid-cols-[minmax(220px,0.95fr)_minmax(280px,1fr)_minmax(150px,0.5fr)_minmax(210px,0.62fr)_150px] xl:items-center">
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
            {relatedKeywords.length > 0 && onToggleDetails ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleDetails?.();
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-violet-700 hover:text-violet-800"
              >
                {expanded ? "Hide related keywords" : "Show related keywords"}
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white px-4 py-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-black text-gray-950">Search Volume Over Time</p>
            <p className="text-xs font-bold text-gray-500">
              {volume !== undefined ? `${formatNumber(volume)} searches/mo` : candidate.volumeDisplay ?? "Volume unavailable"}
            </p>
          </div>
          <Sparkline values={trendValues} />
          {!hasTrend ? <p className="mt-1 text-[11px] font-bold text-gray-400">Estimated shape until trend history is available.</p> : null}
        </div>

        <TrendPanel candidate={candidate} />

        <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
          <MetricCard label="Search Volume" value={volume !== undefined ? formatNumber(volume) : "Unavailable"} helper="per month" icon={Search} />
          <MetricCard label="Keyword Difficulty" value={difficultyLabel(candidate)} helper={difficultyMetricHelper(candidate)} icon={Gauge} />
          <MetricCard label="Opportunity Score" value={opportunity} helper={topicOpportunityBadge(candidate)} icon={Star} />
        </div>

        <div className="flex flex-col gap-2">
          {onToggleDetails ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleDetails();
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-violet-200 px-4 text-sm font-black text-violet-700 transition hover:bg-violet-50"
            >
              {expanded ? "Hide details" : "View details"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleSelect();
            }}
            className={clsx(
              "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-black transition",
              checked ? "bg-violet-600 text-white shadow-sm" : "bg-gray-950 text-white hover:bg-black",
            )}
          >
            {checked ? <Check className="h-4 w-4" /> : null}
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
