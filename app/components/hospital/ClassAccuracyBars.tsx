import type { Feedback } from '~/types/submission';
import { normalizeClassStats } from '~/types/submission';

const CLASS_COLORS: Record<string, string> = {
    Normal: '#22c55e',
    Warning: '#f59e0b',
    Crisis: '#ef4444',
    Other: '#9ca3af',
};

interface ClassAccuracyBarsProps {
    classStats: Feedback['class_stats'] | undefined;
}

export default function ClassAccuracyBars({ classStats: rawClassStats }: ClassAccuracyBarsProps) {
    const classStats = normalizeClassStats(rawClassStats);
    if (!classStats) return null;

    return (
        <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Per-Class Accuracy
            </h3>
            <div className="space-y-3">
                {classStats.map((stat) => {
                    const color = CLASS_COLORS[stat.name] || '#9ca3af';
                    const pct = Math.round(stat.accuracy * 100);
                    const lowAccuracy = pct < 80;

                    return (
                        <div
                            key={stat.name}
                            className={`rounded-lg p-3 ${lowAccuracy ? 'ring-1 ring-red-400/50' : ''}`}
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-medium text-white">{stat.name}</span>
                                <span className="text-xs text-white/60">
                                    {stat.correct}/{stat.total} &middot; {pct}%
                                </span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${pct}%`,
                                        backgroundColor: color,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
