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
  const reason = cleanReason(candidate);
  if (metrics && reason) return `${metrics} ${reason}`;
  return metrics || reason || "Recommended from the latest topic discovery.";
}

function confidenceForCandidate(candidate: VibeMarketingTopicCandidate) {
  const explicit = stringValue(candidate.confidence);
  if (explicit) return titleCase(explicit);
  const score = numericValue(candidate.opportunityScore);
  if (score === undefined) return "Exploratory";
  if (score >= 150) return "High";
  if (score >= 50) return "Medium";
  return "Exploratory";
}

function opportunityText(candidate: VibeMarketingTopicCandidate) {
  const score = numericValue(candidate.opportunityScore);
  return score === undefined ? null : `Opportunity score ${formatNumber(score)}`;
}

export function TopicDecisionCard({
  candidate,
  checked,
  onChange,
  name = "topicCandidateId",
}: {
  candidate: VibeMarketingTopicCandidate;
  checked: boolean;
  onChange: () => void;
  name?: string;
}) {
  const opportunity = opportunityText(candidate);
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
          name={name}
          value={candidate.id}
          checked={checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 flex-none text-violet-600"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">What will we write?</p>
              <h3 className="mt-1 text-base font-black leading-6 text-gray-950">{candidate.title}</h3>
              <p className="mt-1 text-xs font-bold text-gray-500">Keyword: {candidate.keyword}</p>
            </div>
            <div className="flex flex-none flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-violet-700 ring-1 ring-violet-100">
                Confidence: {confidenceForCandidate(candidate)}
              </span>
              {opportunity ? (
                <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600 ring-1 ring-gray-100">
                  {opportunity}
                </span>
              ) : null}
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Who is it for?</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-gray-700">{audienceFromCandidate(candidate)}</p>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Why this topic?</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-gray-700">{whyTopic(candidate)}</p>
            </div>
          </div>
        </div>
      </div>
    </label>
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
          <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">What will we write?</p>
          <h3 className="mt-1 text-base font-black text-gray-950">Custom article</h3>
          <p className="mt-1 text-sm font-semibold text-gray-600">Use the keyword, title, and context fields below to define the article brief.</p>
        </div>
      </div>
    </label>
  );
}
