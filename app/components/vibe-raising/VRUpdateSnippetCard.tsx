import { Link } from "react-router";
import { format } from "date-fns";
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import { parseVibeRaisingMonthYear, VibeRaisingDateTabs } from "~/components/VibeRaisingDateTabs";
import type { VibeRaisingMetricHistory } from "~/types/vibe-raising";
import {
    VIBE_METRIC_OPTIONS,
    VIBE_METRIC_OPTION_MAP,
    hasDisplayableMetricValue,
    metricCardLabel,
    type MetricOption,
} from "~/lib/vibe-raising-metrics";
import { windowPointsToMonth } from "~/lib/vibe-raising-metric-history";
import MetricSparkline from "./MetricSparkline";
import { splitItems } from "./VRPreviewUpdateCard";

const MAX_SNIPPET_METRICS = 4;

// Compact TLDR card for the Past Updates list: headline metrics (with
// sparklines), the summary, and a link through to the full article.
export default function VRUpdateSnippetCard({
    update,
    user,
    metricHistory,
    statusLabel = "Sent",
}: {
    update: any;
    user: any;
    metricHistory: VibeRaisingMetricHistory;
    statusLabel?: string;
}) {
    const updatePeriod = update.year
        ? { month: update.monthName || parseVibeRaisingMonthYear(update.month).month, year: update.year }
        : parseVibeRaisingMonthYear(update.month);
    const updateDate = new Date(update.date);
    const formattedDate = Number.isNaN(updateDate.getTime())
        ? ""
        : format(updateDate, "MMMM d, yyyy");

    const summaryText = String(update.summary || "").trim();
    const fallbackExcerpt = splitItems(String(update.highlights || ""))[0] || "";
    const excerpt = summaryText || fallbackExcerpt;

    // The founder's per-update snippet selection; older data without a
    // config falls back to the first few valued metrics.
    const snippetKeys: string[] | null = update.displayConfig?.snippetMetricKeys ?? null;
    const valuedOptions = VIBE_METRIC_OPTIONS.filter((option) =>
        hasDisplayableMetricValue(update.metrics?.[option.key]),
    );
    const metrics = (snippetKeys
        ? snippetKeys
            .map((key) => VIBE_METRIC_OPTION_MAP.get(key))
            .filter((option): option is MetricOption => Boolean(option))
            .filter((option) => hasDisplayableMetricValue(update.metrics?.[option.key]))
        : valuedOptions
    ).slice(0, MAX_SNIPPET_METRICS);

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 sm:px-5">
                <h3 className="text-base font-bold text-gray-900">
                    {updatePeriod.month} {updatePeriod.year} Update
                </h3>
                <Link
                    to={`/founder-tools/updates/create?edit=${encodeURIComponent(update.id)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-black text-gray-500 ring-1 ring-gray-200 transition hover:bg-gray-200 hover:text-gray-700"
                >
                    Edit
                    <PencilSquareIcon className="h-3.5 w-3.5" />
                </Link>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 px-4 sm:px-5">
                <VibeRaisingDateTabs month={updatePeriod.month} year={updatePeriod.year} size="compact" />
                <StartupRegionBadge location={user.location} />
                {statusLabel ? (
                    <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-black text-gray-500 ring-1 ring-gray-200">
                        {statusLabel}
                    </span>
                ) : null}
                {formattedDate ? (
                    <span className="text-xs text-gray-400">{formattedDate}</span>
                ) : null}
            </div>

            {excerpt ? (
                <p className="mt-3 px-4 text-sm font-medium leading-6 text-gray-700 line-clamp-3 sm:px-5">
                    {excerpt}
                </p>
            ) : null}

            {metrics.length > 0 ? (
                <div className={`mt-4 grid gap-2 px-4 sm:px-5 ${metrics.length > 2 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
                    {metrics.map((metric) => {
                        const series = metricHistory[metric.key];
                        const points = series
                            ? windowPointsToMonth(series.points, update.isoMonth)
                            : [];
                        return (
                            <div
                                key={metric.key}
                                className="rounded-xl border border-[var(--vr-color-border)] bg-gray-50/60 px-3 py-2.5"
                            >
                                <p className="truncate text-sm font-black leading-tight text-gray-900">
                                    {update.metrics[metric.key]}
                                </p>
                                <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                                    {metricCardLabel(metric)}
                                </p>
                                <MetricSparkline points={points} />
                            </div>
                        );
                    })}
                </div>
            ) : null}

            <div className="mt-4 border-t border-gray-100 px-4 py-3 sm:px-5">
                <Link
                    to={`/founder-tools/updates/${encodeURIComponent(update.id)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-[var(--vr-color-primary)] transition hover:text-[var(--vr-palette-black)]"
                >
                    Read full update
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    );
}
