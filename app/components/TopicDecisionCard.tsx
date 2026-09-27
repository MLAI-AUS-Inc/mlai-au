import { clsx } from "clsx";
import { useId, useState } from "react";
import { Check, ChevronDown, Gauge, Search, Star, TrendingUp } from "lucide-react";

import TopicResearchDetails from "~/components/TopicResearchDetails";
import { numericMetricValue, topicResearchMetrics } from "~/lib/topic-research-metrics";
import type { VibeMarketingTopicCandidate } from "~/types/vibe-marketing";

export function topicOpportunityBadge(candidate: VibeMarketingTopicCandidate | null | undefined) {
  if (!candidate) return "Custom topic";
  const score = numericMetricValue(candidate.opportunityScore);
  if (score !== null) return score >= 800 ? "High" : score >= 400 ? "Good" : "Emerging";
  const trend = topicResearchMetrics(candidate).trend;
  return trend.status === "unavailable" ? "Trend unavailable" : trend.label;
}

export function TopicMetricExplainerStrip() {
  const items = [
    { title: "Search Volume", body: "Estimated monthly searches for the research keyword.", Icon: Search, tone: "text-violet-600 bg-violet-50" },
    { title: "Trend", body: "Whether measured search demand is growing, stable, or declining.", Icon: TrendingUp, tone: "text-emerald-600 bg-emerald-50" },
    { title: "Keyword Difficulty", body: "Provider estimate of Google ranking difficulty, out of 100.", Icon: Gauge, tone: "text-orange-500 bg-orange-50" },
    { title: "Opportunity Score", body: "Our combined score for prioritising a topic.", Icon: Star, tone: "text-violet-600 bg-violet-50" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, body, Icon, tone }) => (
        <div key={title} className="flex min-h-[92px] gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
          <span className={clsx("flex h-10 w-10 flex-none items-center justify-center rounded-lg", tone)}><Icon className="h-5 w-5" aria-hidden="true" /></span>
          <div><p className="text-sm font-black text-gray-950">{title}</p><p className="mt-1 text-sm font-semibold leading-5 text-gray-600">{body}</p></div>
        </div>
      ))}
    </div>
  );
}

export function TopicDecisionCard({ candidate, checked, expanded, rank = 1, onChange, onToggleDetails, name = "topicCandidateId" }: {
  candidate: VibeMarketingTopicCandidate;
  checked: boolean;
  expanded?: boolean;
  rank?: number;
  onChange: () => void;
  onToggleDetails?: () => void;
  name?: string;
}) {
  const [localExpanded, setLocalExpanded] = useState(false);
  const isExpanded = expanded ?? localExpanded;
  const detailsId = useId();
  const { difficulty } = topicResearchMetrics(candidate);
  const volume = numericMetricValue(candidate.volume);
  const toggleDetails = () => onToggleDetails ? onToggleDetails() : setLocalExpanded((value) => !value);
  return (
    <div className={clsx("rounded-xl border bg-white p-4 transition", checked ? "border-violet-400 bg-violet-50/20 shadow-sm ring-2 ring-violet-100" : "border-gray-200 hover:border-violet-200")}>
      <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-black text-white">{rank}</span>
        <button type="button" onClick={toggleDetails} aria-expanded={isExpanded} aria-controls={detailsId} className="min-w-0 flex-1 rounded-lg text-left outline-none focus-visible:ring-4 focus-visible:ring-violet-100">
          <span className="block text-base font-black leading-6 text-gray-950">{candidate.title}</span>
          <span className="mt-1 block text-sm font-semibold text-gray-500">{volume !== null ? `${new Intl.NumberFormat("en-AU").format(volume)} searches/mo` : "Volume unavailable"} · {difficulty.score !== null ? `Difficulty ${Math.round(difficulty.score)}/100` : difficulty.status === "pending" ? "Researching difficulty" : "Difficulty unavailable"}</span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-violet-700">{isExpanded ? "Hide research" : "View research"}<ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", isExpanded && "rotate-180")} aria-hidden="true" /></span>
        </button>
        <label className={clsx("ml-auto inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-black has-focus-visible:ring-4 has-focus-visible:ring-violet-200", checked ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-950")}>
          <input type="radio" name={name} value={candidate.id} checked={checked} onChange={onChange} className="sr-only" />
          {checked ? <Check className="h-4 w-4" aria-hidden="true" /> : null}{checked ? "Selected" : "Select topic"}<span className="sr-only">: {candidate.title}</span>
        </label>
      </div>
      <div id={detailsId} hidden={!isExpanded}>{isExpanded ? <div className="mt-4 border-t border-slate-200 pt-5"><TopicResearchDetails candidate={candidate} /></div> : null}</div>
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
