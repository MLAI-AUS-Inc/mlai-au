import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import type {
    VibeRaisingMetricDisplayConfig,
    VibeRaisingMetricHistory,
} from "~/types/vibe-raising";
import { VIBE_METRIC_KEYS, VIBE_METRIC_OPTION_MAP, metricCardLabel } from "~/lib/vibe-raising-metrics";
import { windowPointsToMonth } from "~/lib/vibe-raising-metric-history";
import MetricTrendChart from "./MetricTrendChart";

// Trend charts for the metrics shown on the full update, windowed to the
// update's own month so a past article never charts data from its future.
export default function TrendsSection({
    metricHistory,
    displayConfig,
    currentIsoMonth,
    monthsBack = 12,
}: {
    metricHistory: VibeRaisingMetricHistory;
    displayConfig?: VibeRaisingMetricDisplayConfig | null;
    currentIsoMonth?: string | null;
    monthsBack?: number;
}) {
    const metricKeys = displayConfig
        ? displayConfig.fullMetricKeys
        : VIBE_METRIC_KEYS.filter((key) => metricHistory[key]);

    const chartableSeries = metricKeys
        .map((key) => {
            const series = metricHistory[key];
            if (!series) return null;
            const points = windowPointsToMonth(series.points, currentIsoMonth, monthsBack);
            if (points.length < 2) return null;
            const option = VIBE_METRIC_OPTION_MAP.get(key);
            return {
                key,
                label: option ? metricCardLabel(option) : series.label,
                series: { ...series, points },
            };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    if (!chartableSeries.length) return null;

    return (
        <div>
            <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-900">
                <ArrowTrendingUpIcon className="h-3.5 w-3.5 text-[var(--vr-color-primary)]" />
                Trends
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {chartableSeries.map(({ key, label, series }) => (
                    <MetricTrendChart
                        key={key}
                        series={series}
                        label={label}
                        highlightMonth={currentIsoMonth}
                    />
                ))}
            </div>
        </div>
    );
}
