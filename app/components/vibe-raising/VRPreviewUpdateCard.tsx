import { useState } from "react";
import { Link } from "react-router";
import { clsx } from "clsx";
import {
    ArrowTopRightOnSquareIcon,
    ChevronDownIcon,
    DocumentArrowUpIcon,
    LinkIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import { ActiveDraftRunChip } from "~/components/ActiveDraftRunStatus";
import { parseVibeRaisingMonthYear } from "~/components/VibeRaisingDateTabs";
import {
    VIBE_METRIC_OPTIONS,
    VIBE_METRIC_OPTION_MAP,
    hasDisplayableMetricValue,
    formatMetricDisplayValue,
    metricCardLabel,
    type MetricOption,
} from "~/lib/vibe-raising-metrics";

export function MetricCard({ label, value, icon: _Icon, active = true }: { label: string, value: string, icon: any, colorClass?: string, active?: boolean }) {
    const displayValue = formatMetricDisplayValue(value);

    return (
        <div className={clsx(
            "flex flex-col items-center justify-center rounded-xl border px-3 py-4 text-center",
            active
                ? "border-[var(--vr-color-border-md)] bg-white shadow-sm"
                : "border-gray-200 bg-gray-50/80 opacity-45"
        )}>
            <p className={clsx(
                "text-base font-black leading-tight sm:text-[1.75rem]",
                active ? "text-gray-900" : "text-gray-300"
            )}>{active ? displayValue : "—"}</p>
            <p className={clsx(
                "mt-2 text-[11px] font-bold uppercase tracking-[0.12em]",
                active ? "text-gray-600" : "text-gray-400"
            )}>{label}</p>
        </div>
    );
}

// Split a text blob into bullet items on newlines or sentence boundaries.
export function splitItems(text: string): string[] {
    const normalizedText = String(text || "").trim();
    if (!normalizedText) return [];
    return normalizedText.includes("\n")
        ? normalizedText.split(/\n+/).filter((item) => item.trim())
        : normalizedText.split(/(?<=\.)\s+/).filter((item) => item.trim());
}

function VRPreviewUpdateSection({
    label,
    text,
}: {
    label: string;
    text?: string | null;
}) {
    const normalizedText = String(text || "").trim();
    const items = splitItems(normalizedText);
    const [mobileExpanded, setMobileExpanded] = useState(false);
    const shouldClampOnMobile = items.length > 1;
    const visibleItems = mobileExpanded ? items : items.slice(0, 1);

    if (!normalizedText) return null;

    return (
        <div>
            <h4 className="mb-3 [font-family:var(--vr-font-title)] text-base font-black uppercase tracking-normal text-gray-950 sm:text-lg">
                {label}
            </h4>
            <ul className="list-outside list-disc space-y-2 pl-5 [font-family:var(--vr-font-body)] text-[15px] font-medium leading-7 text-gray-800 marker:text-[var(--vr-color-primary)] sm:text-base">
                {visibleItems.map((item, index) => (
                    <li key={`${label}-${index}`}>{item.trim()}</li>
                ))}
            </ul>
            {shouldClampOnMobile ? (
                <button
                    type="button"
                    onClick={() => setMobileExpanded((current) => !current)}
                    className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[var(--vr-color-primary)] sm:hidden"
                >
                    {mobileExpanded ? "Show less" : `Show all ${items.length}`}
                    <ChevronDownIcon className={clsx("h-3.5 w-3.5 transition-transform", mobileExpanded && "rotate-180")} />
                </button>
            ) : null}
        </div>
    );
}

function getUpdateFileExtension(fileName?: string | null) {
    const clean = String(fileName || "").split("?")[0]?.split("#")[0] || "";
    const lastDot = clean.lastIndexOf(".");
    return lastDot >= 0 ? clean.slice(lastDot).toLowerCase() : "";
}

export function formatUpdateFileSize(bytes?: number | null) {
    if (!bytes || !Number.isFinite(bytes)) return "";
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

function isUpdatePdfPitchDeck(contentType?: string | null, fileName?: string | null, src?: string | null) {
    return (
        String(contentType || "").split(";")[0].trim().toLowerCase() === "application/pdf" ||
        getUpdateFileExtension(fileName || src || "") === ".pdf"
    );
}

function VRPitchDeckPreview({
    src,
    contentType,
    fileName,
    fileSizeBytes,
}: {
    src: string;
    contentType?: string | null;
    fileName?: string | null;
    fileSizeBytes?: number | null;
}) {
    const isPdf = isUpdatePdfPitchDeck(contentType, fileName, src);
    const previewSrc = isPdf ? `${src}#page=1&toolbar=0&navpanes=0&scrollbar=0` : src;
    const fileSize = formatUpdateFileSize(fileSizeBytes);

    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] text-left">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--vr-color-border)] px-4 py-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-black text-gray-950">
                        {fileName || (isPdf ? "Pitch deck PDF" : "Pitch deck")}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">
                        {isPdf ? "First page preview" : "Pitch deck attached"}
                        {fileSize ? ` · ${fileSize}` : ""}
                    </p>
                </div>
                <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="flex-shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-950 ring-1 ring-[var(--vr-color-border)] transition hover:text-[var(--vr-color-primary)]"
                >
                    Open
                </a>
            </div>
            {isPdf ? (
                <iframe
                    src={previewSrc}
                    title="Pitch deck first page preview"
                    className="h-80 w-full bg-white"
                />
            ) : (
                <div className="flex min-h-48 flex-col items-center justify-center px-6 py-8 text-center">
                    <DocumentArrowUpIcon className="h-10 w-10 text-slate-300" />
                    <p className="mt-3 text-sm font-black text-gray-950">Deck uploaded</p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                        The file is attached and ready for investors to open.
                    </p>
                </div>
            )}
        </div>
    );
}

export function VRPreviewUpdateCard({
    update,
    user,
    statusLabel,
    trendsSlot,
    showFounderActions = true,
}: {
    update: any;
    user: any;
    statusLabel?: string;
    trendsSlot?: React.ReactNode;
    showFounderActions?: boolean;
}) {
    const updatePeriod = update.year
        ? { month: update.monthName || parseVibeRaisingMonthYear(update.month).month, year: update.year }
        : parseVibeRaisingMonthYear(update.month);
    const updateSummary = update.summary || "";
    const updateSourceUrl = update.sourceUrl || "";
    const valuedMetricOptions = VIBE_METRIC_OPTIONS.filter((option) =>
        hasDisplayableMetricValue(update.metrics?.[option.key]),
    );
    // The founder's per-update choice of metrics for the full view; without
    // a config (older data, dev stubs) every valued metric renders.
    const fullMetricKeys: string[] | null = update.displayConfig?.fullMetricKeys ?? null;
    const metrics = fullMetricKeys
        ? fullMetricKeys
            .map((key) => VIBE_METRIC_OPTION_MAP.get(key))
            .filter((option): option is MetricOption => Boolean(option))
            .filter((option) => hasDisplayableMetricValue(update.metrics?.[option.key]))
        : valuedMetricOptions;
    const companyName = user.companyName || "Company";
    const pitchDeckUrl = String(update.pitchDeckUrl || "").trim();
    const pitchDeckSummary = String(update.pitchDeckSummary || "").trim();
    const pitchDeckFileName = String(update.pitchDeckOriginalFilename || "").trim();
    const pitchDeckFileSize = formatUpdateFileSize(update.pitchDeckFileSizeBytes);
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
    const canExpandSummary = updateSummary.length > 180;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-24 w-full overflow-hidden sm:h-32">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--vr-palette-teal)_0%,var(--vr-palette-mint)_100%)]" />
                <svg className="absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 800 200">
                    <circle cx="120" cy="80" r="100" fill="white" />
                    <circle cx="650" cy="140" r="70" fill="white" />
                    <circle cx="400" cy="30" r="50" fill="white" />
                    <rect x="250" y="100" width="180" height="180" rx="40" fill="white" transform="rotate(-15 340 190)" />
                </svg>
                <div className="absolute inset-0 flex items-center px-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3.5">
                        {user.domain ? (
                            <img
                                src={`https://www.google.com/s2/favicons?domain=${user.domain}&sz=64`}
                                alt=""
                                className="h-12 w-12 rounded-xl border border-white/30 bg-white/20 object-cover shadow-sm backdrop-blur-sm"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm">
                                <span className="text-base font-bold text-white">{companyName.charAt(0)}</span>
                            </div>
                        )}
                        <div className="flex min-w-0 flex-col justify-center">
                            <p className="truncate [font-family:var(--vr-font-title)] text-3xl font-black uppercase leading-none tracking-normal text-white drop-shadow-sm sm:text-4xl">
                                {companyName}
                            </p>
                            <p className="mt-1 truncate [font-family:var(--vr-font-title)] text-sm font-black uppercase leading-none tracking-normal text-white/85 drop-shadow-sm sm:text-lg">
                                {updatePeriod.month} {updatePeriod.year} Update
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-wrap items-center gap-2">
                    <StartupRegionBadge location={user.location} />
                    {statusLabel ? (
                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-black text-gray-500 ring-1 ring-gray-200">
                            {statusLabel}
                        </span>
                    ) : null}
                    {showFounderActions ? (
                        <>
                            <ActiveDraftRunChip />
                            <Link
                                to={`/founder-tools/updates/create?edit=${encodeURIComponent(update.id)}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-black text-gray-500 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-200 hover:text-gray-700"
                            >
                                Edit
                                <PencilSquareIcon className="h-3.5 w-3.5" />
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>

            {metrics.length > 0 ? (
                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-6">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                        {metrics.map((metric) => (
                            <MetricCard
                                key={metric.key}
                                label={metricCardLabel(metric)}
                                value={update.metrics[metric.key]}
                                icon={metric.icon}
                            />
                        ))}
                    </div>
                </div>
            ) : null}

            {trendsSlot ? (
                <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
                    {trendsSlot}
                </div>
            ) : null}

            {pitchDeckUrl ? (
                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-color-primary)]">
                                Pitch deck
                            </p>
                            {pitchDeckSummary ? (
                                <p className="mt-2 text-sm leading-6 text-slate-500">{pitchDeckSummary}</p>
                            ) : null}
                        </div>
                        <div className="rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-4 sm:hidden">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)]">
                                    <DocumentArrowUpIcon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-black text-gray-950">Deck attached</p>
                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        {pitchDeckFileName || "Pitch deck file"}{pitchDeckFileSize ? ` · ${pitchDeckFileSize}` : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <VRPitchDeckPreview
                                src={pitchDeckUrl}
                                contentType={update.pitchDeckContentType}
                                fileName={update.pitchDeckOriginalFilename}
                                fileSizeBytes={update.pitchDeckFileSizeBytes}
                            />
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
                {(updateSummary || updateSourceUrl) ? (
                    <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3 sm:p-4">
                        {updateSummary ? (
                            <div className="space-y-2">
                                <p
                                    className={clsx(
                                        "text-sm font-medium leading-6 text-gray-700",
                                        !isSummaryExpanded && "line-clamp-4 sm:line-clamp-none",
                                    )}
                                >
                                    {updateSummary}
                                </p>
                                {canExpandSummary ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsSummaryExpanded((current) => !current)}
                                        className="inline-flex text-xs font-black uppercase tracking-[0.14em] text-[var(--vr-color-primary)] transition hover:text-[var(--vr-palette-black)] sm:hidden"
                                        aria-expanded={isSummaryExpanded}
                                    >
                                        {isSummaryExpanded ? "Show less" : "Show more"}
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                        {updateSourceUrl ? (
                            <a
                                href={updateSourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--vr-color-primary)] hover:text-[var(--vr-palette-black)]"
                            >
                                <LinkIcon className="h-3.5 w-3.5" />
                                Source materials
                                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                            </a>
                        ) : null}
                    </div>
                ) : null}

                <VRPreviewUpdateSection
                    label="Key Highlights"
                    text={update.highlights}
                />
                <VRPreviewUpdateSection
                    label="Challenges"
                    text={update.challenges}
                />
                <VRPreviewUpdateSection
                    label="Learnings"
                    text={update.learnings}
                />
                <VRPreviewUpdateSection
                    label="Next 30 Days"
                    text={update.next30Days}
                />
                <VRPreviewUpdateSection
                    label="Ask from Investors"
                    text={update.asks}
                />
            </div>
        </div>
    );
}

export default VRPreviewUpdateCard;
