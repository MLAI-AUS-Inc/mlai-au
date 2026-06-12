import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { VibeRaisingMetricHistorySeries } from "~/types/vibe-raising";
import {
    formatCompactNumber,
    formatMonthLabel,
    monthKey,
} from "~/lib/vibe-raising-metric-history";

function TrendTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
    if (!active || !payload?.length) return null;
    const point = payload[0]?.payload as { month?: string; valueText?: string } | undefined;
    if (!point?.month) return null;

    return (
        <div className="rounded-lg border border-[var(--vr-color-border)] bg-white px-3 py-2 shadow-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                {formatMonthLabel(point.month)}
            </p>
            {/* The founder's original string, so currency/percent/duration read correctly. */}
            <p className="mt-0.5 text-sm font-black text-gray-900">{point.valueText}</p>
        </div>
    );
}

// One metric's trend over the trailing months, themed with the vr-* tokens.
export default function MetricTrendChart({
    series,
    label,
    highlightMonth,
}: {
    series: VibeRaisingMetricHistorySeries;
    label?: string;
    highlightMonth?: string | null;
}) {
    const points = series.points;
    if (points.length < 2) return null;

    const highlightKey = monthKey(highlightMonth);
    const highlightPoint = highlightKey
        ? points.find((point) => monthKey(point.month) === highlightKey)
        : undefined;

    return (
        <div className="rounded-xl border border-[var(--vr-color-border)] bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-600">
                {label || series.label}
            </p>
            <div className="mt-3 h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={points} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--vr-color-border)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickFormatter={formatMonthLabel}
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                            tickLine={false}
                            axisLine={{ stroke: "var(--vr-color-border)" }}
                            interval="preserveStartEnd"
                            minTickGap={24}
                        />
                        <YAxis
                            tickFormatter={formatCompactNumber}
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                            tickLine={false}
                            axisLine={false}
                            width={42}
                        />
                        <Tooltip content={<TrendTooltip />} cursor={{ stroke: "var(--vr-color-border)" }} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="var(--vr-color-primary)"
                            strokeWidth={2}
                            dot={{ r: 2.5, strokeWidth: 0, fill: "var(--vr-color-primary)" }}
                            activeDot={{ r: 4 }}
                            isAnimationActive={false}
                        />
                        {highlightPoint ? (
                            <ReferenceDot
                                x={highlightPoint.month}
                                y={highlightPoint.value}
                                r={5}
                                fill="var(--vr-color-primary)"
                                stroke="white"
                                strokeWidth={2}
                            />
                        ) : null}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
