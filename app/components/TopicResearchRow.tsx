import { useId, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Flame, Loader2, ThumbsDown } from "lucide-react";
import { clsx } from "clsx";

import { RooPointCost } from "~/components/RooPointCost";
import TopicResearchDetails from "~/components/TopicResearchDetails";
import { VIBE_MARKETING_ARTICLE_JOB_COST_POINTS } from "~/lib/vibe-marketing-billing";
import { numericMetricValue, topicResearchMetrics } from "~/lib/topic-research-metrics";
import type { VibeMarketingTopicCandidate } from "~/types/vibe-marketing";

export interface TopicResearchRowTheme {
  focus?: string;
  selected?: string;
  idle?: string;
  selectedButton?: string;
  idleButton?: string;
  arrow?: string;
}

export default function TopicResearchRow({
  topic, selected, submitting, continueDisabled = false, articleCostPoints = VIBE_MARKETING_ARTICLE_JOB_COST_POINTS, icon, theme,
  onSelect, onContinue, onDecline,
}: {
  topic: VibeMarketingTopicCandidate;
  selected: boolean;
  submitting?: boolean;
  continueDisabled?: boolean;
  articleCostPoints?: number;
  icon?: ReactNode;
  theme?: TopicResearchRowTheme;
  onSelect: () => void;
  onContinue: () => void;
  onDecline: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const title = topic.title || topic.keyword;
  const volume = numericMetricValue(topic.volume);
  const volumeLabel = volume === null || volume === undefined || volume < 0 ? "Volume unavailable" : volume >= 1000 ? "High volume" : volume >= 300 ? "Medium volume" : "Niche volume";
  const { difficulty } = topicResearchMetrics(topic);
  const difficultyLabel = difficulty.score !== null ? `Difficulty ${Math.round(difficulty.score)}/100` : difficulty.status === "pending" ? "Researching difficulty" : "Difficulty unavailable";
  const selectOrContinue = () => {
    if (selected) {
      if (!submitting && !continueDisabled) onContinue();
    } else onSelect();
  };

  return (
    <div className={clsx("w-full overflow-hidden rounded-xl border text-left transition", selected ? theme?.selected ?? "border-violet-300 bg-violet-50/60" : theme?.idle ?? "border-slate-200 bg-white hover:border-violet-200")}>
      <div className="flex flex-wrap items-center gap-x-3 px-4 py-3 sm:flex-nowrap">
        <button
          type="button" aria-expanded={expanded} aria-controls={detailsId}
          onClick={() => setExpanded((value) => !value)}
          className={clsx("flex min-w-0 flex-1 basis-full items-center gap-4 rounded-lg py-1 text-left outline-none focus-visible:ring-4 sm:basis-auto", theme?.focus ?? "focus-visible:ring-violet-100")}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center">{icon ?? <Flame className="h-5 w-5 text-violet-600" aria-hidden="true" />}</span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black leading-6 text-slate-950">{title}</span>
            <span className="mt-1 block text-sm font-semibold text-slate-500">{volumeLabel} · {difficultyLabel}</span>
          </span>
          <ChevronDown aria-hidden="true" className={clsx("h-4 w-4 shrink-0 text-slate-400 transition-transform", expanded && "rotate-180")} />
          <span className="sr-only">{expanded ? "Hide" : "Show"} topic research</span>
        </button>
        <div className="ml-auto flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
          <button type="button" onClick={onDecline} title={`Ignore suggestion: ${topic.keyword}`} aria-label={`Ignore suggestion: ${topic.keyword}`} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-100">
            <ThumbsDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={selectOrContinue} disabled={selected && (submitting || continueDisabled)} className={clsx("inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black outline-none transition focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60", selected ? theme?.selectedButton ?? "bg-white text-violet-700 hover:bg-violet-50" : theme?.idleButton ?? "bg-violet-50 text-violet-700 hover:bg-violet-100")}>
            {selected ? <><span>Continue</span><span aria-hidden="true">(</span>{articleCostPoints === 0 ? <span>Free</span> : <RooPointCost points={-articleCostPoints} />}<span aria-hidden="true">)</span></> : "Select"}
            <span className="sr-only"> topic: {title}</span>
            {selected && submitting ? <Loader2 className={clsx("h-4 w-4 animate-spin", theme?.arrow ?? "text-violet-500")} aria-hidden="true" /> : <ArrowRight className={clsx("h-4 w-4", theme?.arrow ?? "text-violet-500")} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div id={detailsId} hidden={!expanded}>
        {expanded ? <div className="mx-4 border-t border-slate-200/70 py-5 sm:mx-5"><TopicResearchDetails candidate={topic} /></div> : null}
      </div>
    </div>
  );
}
