import type { ClinicalMetrics } from "~/types/submission";

export default function ClinicalMetricsPanel({
    clinicalMetrics,
}: {
    clinicalMetrics: ClinicalMetrics | undefined;
}) {
    if (!clinicalMetrics) return null;

    const {
        crisis_episodes_total,
        patients_saved,
        patients_at_risk,
        crisis_detection_rate,
        warning_episodes_total,
        warnings_caught,
        warnings_missed,
        warning_detection_rate,
        false_alarms,
        false_alarm_breakdown,
        missed_episodes_sample,
    } = clinicalMetrics;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Clinical Impact</h3>

            {/* Hero stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Patients Saved */}
                <div className="bg-[#1a0e2e]/80 border border-emerald-500/30 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <svg className="h-6 w-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="text-sm font-medium text-emerald-300">Patients Saved</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">
                        {patients_saved}
                        <span className="text-base font-normal text-white/40"> / {crisis_episodes_total}</span>
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                        {(crisis_detection_rate * 100).toFixed(1)}% crisis detection rate
                    </p>
                </div>

                {/* Lives at Risk */}
                <div className="bg-[#1a0e2e]/80 border border-red-500/30 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <svg className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span className="text-sm font-medium text-red-300">Lives at Risk</span>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{patients_at_risk}</p>
                    <p className="mt-1 text-xs text-white/40">
                        Crisis episodes your model completely missed
                    </p>
                </div>

                {/* False Alarms */}
                <div className="bg-[#1a0e2e]/80 border border-amber-500/30 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <svg className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            <line x1="12" y1="2" x2="12" y2="5" />
                        </svg>
                        <span className="text-sm font-medium text-amber-300">False Alarms</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-400">{false_alarms}</p>
                    <p className="mt-1 text-xs text-white/40">
                        Times your model predicted a crisis that wasn't one
                    </p>
                </div>
            </div>

            {/* Warning detection row */}
            <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-300">
                        Warning Detection: {warnings_caught} / {warning_episodes_total}
                    </span>
                    <span className="text-xs text-white/40">
                        {warnings_missed} warning{warnings_missed !== 1 ? 's' : ''} missed
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${warning_detection_rate * 100}%` }}
                    />
                </div>
                <p className="mt-1 text-xs text-white/40">
                    {(warning_detection_rate * 100).toFixed(1)}% warning detection rate
                </p>
            </div>

            {/* False alarm breakdown */}
            {false_alarms > 0 && (
                <details className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-5 group">
                    <summary className="cursor-pointer text-sm font-medium text-white/70 hover:text-white/90 list-none flex items-center gap-2">
                        <svg className="h-4 w-4 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                        Of your {false_alarms} false alarm{false_alarms !== 1 ? 's' : ''}:
                    </summary>
                    <div className="mt-3 space-y-1 text-sm text-white/50 pl-6">
                        <p>{false_alarm_breakdown.actual_normal} were actually Normal</p>
                        <p>{false_alarm_breakdown.actual_warning} were actually Warning</p>
                        <p>{false_alarm_breakdown.actual_other} were other classes</p>
                    </div>
                </details>
            )}

            {/* Missed episodes sample */}
            {patients_at_risk > 0 && missed_episodes_sample.length > 0 && (
                <details className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-5 group">
                    <summary className="cursor-pointer text-sm font-medium text-white/70 hover:text-white/90 list-none flex items-center gap-2">
                        <svg className="h-4 w-4 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                        Missed crisis episodes (sample)
                    </summary>
                    <div className="mt-3 space-y-1 text-sm text-white/50 pl-6">
                        {missed_episodes_sample.map((ep, i) => (
                            <p key={i}>
                                Rows {ep.start_row}–{ep.end_row}{' '}
                                <span className="text-white/30">({ep.length} readings)</span>
                                {' — '}
                                <span className="text-red-400 font-medium">MISSED</span>
                            </p>
                        ))}
                    </div>
                </details>
            )}
        </div>
    );
}
