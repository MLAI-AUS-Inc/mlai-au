import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { VibeRaisingMetricHistoryPoint } from "~/types/vibe-raising";

// Subtle trend line for snippet metric tiles: no axes, no tooltip, just the
// shape of the series. Renders nothing when there is no trend to show.
export default function MetricSparkline({
    points,
    height = 28,
}: {
    points: VibeRaisingMetricHistoryPoint[];
    height?: number;
}) {
    if (points.length < 2) return null;

    return (
        <div style={{ height }} className="w-full" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={points} margin={{ top: 4, right: 2, bottom: 2, left: 2 }}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--vr-color-primary)"
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
