export default function ReportingEvidenceNotice({ period, warnings = [] }: {
    period?: { start?: string; cutoff?: string; timezone?: string; is_partial?: boolean } | null;
    warnings?: string[];
}) {
    if (!period?.is_partial && !warnings.length) return null;
    const cutoff = period?.cutoff ? new Date(period.cutoff) : null;
    const cutoffLabel = cutoff && Number.isFinite(cutoff.getTime())
        ? new Intl.DateTimeFormat("en-CA", { timeZone: period?.timezone || "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).format(cutoff)
        : "an unavailable cutoff";
    return <aside className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" aria-label="Reporting evidence status">
        {period?.is_partial ? <p>Month to date · incomplete period through {cutoffLabel} ({period.timezone || "UTC"}).</p> : null}
        {warnings.length ? <ul>{warnings.map(warning => <li key={warning}>{warning}</li>)}</ul> : null}
    </aside>;
}
