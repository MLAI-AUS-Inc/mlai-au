import { Link, redirect, useLoaderData, useOutletContext, useNavigate } from "react-router";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/vibe-raising-app._index";
import {
    getVibeRaisingMonthlyUpdates,
    getOptionalVibeRaisingContext,
    getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";
import { isFounderToolsDiscoverEnabled } from "~/lib/founder-tools-preview";
import { clsx } from "clsx";
import { getEnv } from "~/lib/env.server";
import {
    ArrowRightIcon,
    ChartBarIcon,
    PencilSquareIcon,
    SparklesIcon,
    HandThumbUpIcon,
    ChatBubbleLeftIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    PlusIcon,
    CalendarIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    LockClosedIcon,
    CheckIcon,
    XMarkIcon,
    ChevronDownIcon,
    QuestionMarkCircleIcon,
    ExclamationCircleIcon,
    FireIcon,
    LightBulbIcon,
    LinkIcon,
    ArrowTopRightOnSquareIcon,
    InformationCircleIcon,
    DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import { parseVibeRaisingMonthYear, VibeRaisingDateTabs } from "~/components/VibeRaisingDateTabs";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const vibeContext = await getOptionalVibeRaisingContext(env, request);

    if (!vibeContext.authUser) {
        throw redirect(getVibeRaisingLoginHref(request));
    }

    if (!vibeContext.appUser) {
        return null;
    }

    const user = vibeContext.appUser;
    const updates = user.role === "founder"
        ? (await getVibeRaisingMonthlyUpdates(env, request)).map((update, index) => ({
            ...update,
            isCurrent: index === 0,
            score: null,
            likes: 0,
            comments: 0,
            investorsSentTo: 0,
            investorsViewed: 0,
        }))
        : [];

    // Investor Mock Data
    const portfolioUpdates = [
        {
            id: 'p1',
            companyName: "TechFlow",
            founderName: "Sarah Chen",
            date: "2025-12-01T00:00:00.000Z",
            metrics: {
                revenue: "$45,000",
                growth: "23%",
                users: "1,250"
            },
            highlights: "Reached product-market fit in the enterprise segment. Major partnership signed with Global Solutions Ltd.",
            likes: 4,
            comments: 2
        }
    ];

    return { user, updates, portfolioUpdates };
}

// ─── Auto-resize textarea hook ──────────────────────────────────
function useAutoResize(value?: string) {
    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }, [value]);
    return ref;
}

// ─── Bullet list helper ──────────────────────────────────────────
function BulletList({ text, className = "text-sm text-gray-600" }: { text: string; className?: string }) {
    const items = text.includes("\n")
        ? text.split(/\n+/).filter(s => s.trim())
        : text.split(/(?<=\.)\s+/).filter(s => s.trim());
    return (
        <ul className={clsx("space-y-1 list-disc list-inside", className)}>
            {items.map((item, i) => (
                <li key={i}>{item.trim()}</li>
            ))}
        </ul>
    );
}

function canPreviewUpdateVideo(contentType?: string | null) {
    const normalized = String(contentType || "").split(";")[0].trim().toLowerCase();
    if (!normalized) return true;
    return ["video/mp4", "video/x-m4v", "video/webm", "video/ogg", "video/quicktime"].includes(normalized);
}

function UpdateVideoHero({ update }: { update: { videoUrl?: string | null; videoContentType?: string | null; videoOriginalFilename?: string | null } }) {
    const [playbackFailed, setPlaybackFailed] = useState(false);
    if (!update.videoUrl) return null;

    if (!playbackFailed && canPreviewUpdateVideo(update.videoContentType)) {
        return (
            <div className="absolute inset-0">
                <video
                    src={update.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setPlaybackFailed(true)}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 px-5 text-center text-white">
            <p className="relative z-10 text-sm font-bold">Video uploaded</p>
            <p className="relative z-10 mt-1 max-w-xs text-xs text-white/60">
                {update.videoOriginalFilename || "This video format may not preview in your browser."}
            </p>
            <a
                href={update.videoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="relative z-10 mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-950 hover:bg-gray-100"
            >
                Open video
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>
    );
}

// Reuseable Components
function MetricCard({ label, value, icon: _Icon, active = true }: { label: string, value: string, icon: any, colorClass?: string, active?: boolean }) {
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
            )}>{active ? value : "—"}</p>
            <p className={clsx(
                "mt-2 text-[11px] font-bold uppercase tracking-[0.12em]",
                active ? "text-gray-600" : "text-gray-400"
            )}>{label}</p>
        </div>
    );
}

// Editable metric input for inline editing
function EditableMetricCard({ label, value, icon: _Icon, active = true, editing, onChange }: { label: string, value: string, icon: any, colorClass?: string, active?: boolean, editing: boolean, onChange: (v: string) => void }) {
    if (!editing) return <MetricCard label={label} value={value} icon={_Icon} active={active} />;
    return (
        <div className={clsx(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border px-3 py-4 text-center transition-all",
            active
                ? "border-[var(--vr-color-border-md)] bg-white shadow-sm"
                : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
        )}>
            {active ? (
                <input
                    type="text"
                    value={value}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border-b-2 border-[rgba(0,128,128,0.18)] bg-transparent py-0.5 text-center text-base font-black text-gray-900 focus:border-[var(--vr-color-primary)] focus:outline-none sm:text-[1.75rem]"
                />
            ) : (
                <p className="text-base font-extrabold text-gray-300">—</p>
            )}
            <p className={clsx(
                "mt-2 text-[11px] font-bold uppercase tracking-[0.12em]",
                active ? "text-gray-600" : "text-gray-400"
            )}>{label}</p>
        </div>
    );
}

// Available metric categories for toggle pills
const METRIC_OPTIONS = [
    { key: "revenue", label: "Revenue", icon: CurrencyDollarIcon, colorClass: "bg-[rgba(0,255,215,0.12)] border-[rgba(0,255,215,0.28)]" },
    { key: "users", label: "Users", icon: UserGroupIcon, colorClass: "bg-[rgba(76,110,245,0.10)] border-[rgba(76,110,245,0.24)]" },
    { key: "mrr", label: "MRR", icon: CurrencyDollarIcon, colorClass: "bg-[rgba(0,128,128,0.10)] border-[rgba(0,128,128,0.24)]" },
    { key: "burnRate", label: "Burn Rate", icon: FireIcon, colorClass: "bg-[rgba(242,114,63,0.10)] border-[rgba(242,114,63,0.24)]" },
    { key: "runway", label: "Runway", icon: ChartBarIcon, colorClass: "bg-[rgba(255,200,1,0.14)] border-[rgba(255,200,1,0.34)]" },
    { key: "monthlyCosts", label: "Costs", icon: CurrencyDollarIcon, colorClass: "bg-[var(--vr-color-neutral-50)] border-[var(--vr-color-border)]" },
];

const GRADIENTS = [
    "linear-gradient(135deg, var(--vr-palette-teal), var(--vr-palette-mint))",
    "linear-gradient(135deg, var(--vr-palette-blue), var(--vr-palette-blue-soft))",
    "linear-gradient(135deg, var(--vr-palette-orange), var(--vr-palette-coral))",
    "linear-gradient(135deg, var(--vr-palette-purple), var(--vr-palette-lavender))",
    "linear-gradient(135deg, var(--vr-palette-black), var(--vr-palette-teal))",
    "linear-gradient(135deg, var(--vr-palette-yellow), var(--vr-palette-gold))",
];

// Inline-editable update card
function UpdateCard({ update, isCurrent, user }: { update: any; isCurrent: boolean; user: any }) {
    const [editing, setEditing] = useState(false);
    const [expanded, setExpanded] = useState(isCurrent);
    const [highlights, setHighlights] = useState(update.highlights);
    const [challenges, setChallenges] = useState(update.challenges);
    const [asks, setAsks] = useState(update.asks);
    const [learnings, setLearnings] = useState(update.learnings || "");
    const [next30Days, setNext30Days] = useState(update.next30Days || "");
    const [metrics, setMetrics] = useState<Record<string, string>>(update.metrics);
    const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(
        new Set(Object.keys(update.metrics).filter(k => update.metrics[k]))
    );
    const [saved, setSaved] = useState(false);

    // Hash numeric or string ID to pick a deterministic gradient
    const hashId = typeof update.id === 'number' ? update.id : update.id?.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) || 0;
    const gradientClass = GRADIENTS[hashId % GRADIENTS.length];
    const updatePeriod = update.year
        ? { month: update.monthName || parseVibeRaisingMonthYear(update.month).month, year: update.year }
        : parseVibeRaisingMonthYear(update.month);
    const updateSummary = update.summary || "";
    const updateSourceUrl = update.sourceUrl || "";
    const cardExcerpt = updateSummary || highlights;

    const highlightsRef = useAutoResize(highlights);
    const challengesRef = useAutoResize(challenges);
    const asksRef = useAutoResize(asks);
    const learningsRef = useAutoResize(learnings);
    const next30DaysRef = useAutoResize(next30Days);

    const handleSave = () => {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleCancel = () => {
        setHighlights(update.highlights);
        setChallenges(update.challenges);
        setAsks(update.asks);
        setLearnings(update.learnings || "");
        setNext30Days(update.next30Days || "");
        setMetrics(update.metrics);
        setSelectedMetrics(new Set(Object.keys(update.metrics).filter(k => update.metrics[k])));
        setEditing(false);
    };

    const toggleMetric = (key: string) => {
        setSelectedMetrics(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const updateMetricValue = (key: string, value: string) => {
        setMetrics(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={clsx(
            "bg-white rounded-xl border shadow-sm overflow-hidden transition-shadow",
            isCurrent ? "border-[var(--vr-color-primary)] ring-1 ring-[rgba(0,128,128,0.16)]" : "border-gray-200",
            expanded && "hover:shadow-md"
        )}>
            {/* Collapsed header - plain white */}
            {!expanded && (
                <button
                    type="button"
                    onClick={() => !editing && setExpanded(true)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                    <div className="flex items-center gap-3 min-w-0">
                        {isCurrent && <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--vr-color-primary)]" />}
                        {!isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />}
                        <h3 className="text-base font-bold text-gray-900 truncate">{update.month}</h3>
                        {isCurrent && <span className="rounded-full border border-[rgba(0,255,215,0.26)] bg-[rgba(0,255,215,0.12)] px-2 py-0.5 text-[10px] font-bold text-[var(--vr-color-primary)]">Current</span>}
                        {update.score && (
                            <span className="rounded-full border border-[rgba(150,73,210,0.24)] bg-[rgba(150,73,210,0.10)] px-2 py-0.5 text-[10px] font-bold text-[var(--vr-palette-purple)]">
                                {update.score}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden sm:flex items-center gap-3">
                            {update.investorsSentTo > 0 && (
                                <span className="flex items-center gap-1 text-xs font-medium text-[var(--vr-color-primary)]">
                                    <UserGroupIcon className="w-3.5 h-3.5" />
                                    {update.investorsSentTo} sent
                                </span>
                            )}
                            {update.investorsViewed > 0 && (
                                <span className="flex items-center gap-1 text-xs font-medium text-[var(--vr-color-primary)]">
                                    <EyeIcon className="w-3.5 h-3.5" />
                                    {update.investorsViewed} viewed
                                </span>
                            )}
                            {(update.investorsSentTo > 0 || update.investorsViewed > 0) && (
                                <span className="w-px h-3 bg-gray-200" />
                            )}
                            {!expanded ? (
                                <span className="text-xs text-gray-600 max-w-[200px] truncate">{cardExcerpt.slice(0, 60)}...</span>
                            ) : null}
                        </div>
                        <ChevronDownIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                </button>
            )}

            {/* Expanded content */}
            {expanded && (
                <div>
                    {/* Hero gradient cover with header info */}
                    <button
                        type="button"
                        onClick={() => !editing && setExpanded(false)}
                        className="relative w-full h-32 overflow-hidden text-left cursor-pointer group bg-black"
                    >
                        {update.videoUrl ? (
                            <UpdateVideoHero update={update} />
                        ) : (
                            <>
                                <div className="absolute inset-0 transition-colors duration-300" style={{ background: gradientClass }} />
                                <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 200">
                                    <circle cx="120" cy="80" r="100" fill="white" />
                                    <circle cx="650" cy="140" r="70" fill="white" />
                                    <circle cx="400" cy="30" r="50" fill="white" />
                                    <rect x="250" y="100" width="180" height="180" rx="40" fill="white" transform="rotate(-15 340 190)" />
                                </svg>
                            </>
                        )}
                        {/* Top row: date + collapse chevron */}
                        <div className="absolute top-0 left-0 right-0 px-5 pt-3 flex flex-wrap items-center justify-between gap-2">
                            <VibeRaisingDateTabs month={updatePeriod.month} year={updatePeriod.year} size="compact" />
                            <span className="text-white/60 text-[11px] font-medium">{format(new Date(update.date), "MMMM d, yyyy")}</span>
                            <ChevronDownIcon className="w-4 h-4 text-white/60 rotate-180" />
                        </div>
                        {/* Bottom row: company + month + badges + stats */}
                        <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 flex items-end justify-between">
                            <div className="flex items-center gap-2.5">
                                {user?.domain ? (
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${user.domain}&sz=64`}
                                        alt=""
                                        aria-hidden="true"
                                        className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                        <span className="text-sm font-bold text-white">{user?.companyName?.charAt(0) || "?"}</span>
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-bold text-sm drop-shadow-sm">{update.month}</p>
                                        {isCurrent && <span className="text-[9px] font-bold text-white bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full">Current</span>}
                                        {update.score && (
                                            <span className="text-[9px] font-bold text-white bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full">{update.score}</span>
                                        )}
                                        <StartupRegionBadge location={user?.location} variant="inverse" />
                                    </div>
                                    <p className="text-white/60 text-[11px]">{user?.companyName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {update.investorsSentTo > 0 && (
                                    <span className="flex items-center gap-1 text-white/80 text-xs font-medium">
                                        <UserGroupIcon className="w-3.5 h-3.5" />
                                        {update.investorsSentTo} sent
                                    </span>
                                )}
                                {update.investorsViewed > 0 && (
                                    <span className="flex items-center gap-1 text-white/80 text-xs font-medium">
                                        <EyeIcon className="w-3.5 h-3.5" />
                                        {update.investorsViewed} viewed
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>

                    {/* Action bar */}
                    <div className="px-5 py-2.5 bg-gray-50/80 flex items-center justify-end border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            {saved && (
                                <span className="flex items-center gap-1 text-xs font-medium text-[var(--vr-color-primary)]">
                                    <CheckIcon className="w-3.5 h-3.5" /> Saved
                                </span>
                            )}
                            {!editing ? (
                                <button
                                    type="button"
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-[rgba(0,255,215,0.12)] hover:text-[var(--vr-color-primary)]"
                                >
                                    <PencilSquareIcon className="w-3.5 h-3.5" />
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 px-2.5 py-1 rounded-md hover:bg-gray-100"
                                    >
                                        <XMarkIcon className="w-3.5 h-3.5" />
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="flex items-center gap-1 rounded-md bg-[var(--vr-color-primary)] px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-[var(--vr-palette-black)]"
                                    >
                                        <CheckIcon className="w-3.5 h-3.5" />
                                        Save Update
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-5 space-y-5">
                        {/* Metrics */}
                        {editing && (
                            <div className="flex flex-wrap gap-2">
                                {METRIC_OPTIONS.map(m => (
                                    <button
                                        key={m.key}
                                        type="button"
                                        onClick={() => toggleMetric(m.key)}
                                        className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                                            selectedMetrics.has(m.key)
                                                ? "border-[rgba(0,255,215,0.26)] bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)]"
                                                : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                                        )}
                                    >
                                        {selectedMetrics.has(m.key) ? "✓ " : "+ "}{m.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                            {(editing ? METRIC_OPTIONS : METRIC_OPTIONS.filter(m => selectedMetrics.has(m.key))).map(m => (
                                <div key={m.key} onClick={() => editing && toggleMetric(m.key)}>
                                    <EditableMetricCard
                                        label={m.label}
                                        value={metrics[m.key] || ""}
                                        icon={m.icon}
                                        active={selectedMetrics.has(m.key)}
                                        editing={editing}
                                        onChange={(v) => updateMetricValue(m.key, v)}
                                    />
                                </div>
                            ))}
                        </div>

                        {(updateSummary || updateSourceUrl) && (
                            <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                                {updateSummary && (
                                    <p className="text-sm font-medium leading-relaxed text-gray-700">{updateSummary}</p>
                                )}
                                {updateSourceUrl && (
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
                                )}
                            </div>
                        )}

                        {/* Highlights */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <SparklesIcon className="h-3.5 w-3.5 text-[var(--vr-palette-purple)]" />
                                Key Highlights
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={highlightsRef}
                                    value={highlights}
                                    onChange={(e) => setHighlights(e.target.value)}
                                    className="w-full resize-none overflow-hidden rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed text-gray-700 focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                                    rows={3}
                                />
                            ) : (
                                <BulletList text={highlights} />
                            )}
                        </div>

                        {/* Challenges */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <ExclamationCircleIcon className="h-3.5 w-3.5 text-[var(--vr-palette-orange)]" />
                                Challenges
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={challengesRef}
                                    value={challenges}
                                    onChange={(e) => setChallenges(e.target.value)}
                                    className="w-full resize-none overflow-hidden rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed text-gray-700 focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                                    rows={3}
                                />
                            ) : (
                                <BulletList text={challenges} />
                            )}
                        </div>

                        {/* Learnings */}
                        {(editing || learnings) && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <LightBulbIcon className="h-3.5 w-3.5 text-[var(--vr-palette-yellow)]" />
                                    Learnings
                                </h4>
                                {editing ? (
                                    <textarea
                                        ref={learningsRef}
                                        value={learnings}
                                        onChange={(e) => setLearnings(e.target.value)}
                                        className="w-full resize-none overflow-hidden rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed text-gray-700 focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                                        rows={3}
                                    />
                                ) : (
                                    <BulletList text={learnings} />
                                )}
                            </div>
                        )}

                        {/* Next 30 Days */}
                        {(editing || next30Days) && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <CalendarIcon className="h-3.5 w-3.5 text-[var(--vr-palette-blue)]" />
                                    Next 30 Days
                                </h4>
                                {editing ? (
                                    <textarea
                                        ref={next30DaysRef}
                                        value={next30Days}
                                        onChange={(e) => setNext30Days(e.target.value)}
                                        className="w-full resize-none overflow-hidden rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed text-gray-700 focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                                        rows={3}
                                    />
                                ) : (
                                    <BulletList text={next30Days} />
                                )}
                            </div>
                        )}

                        {/* Asks */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <QuestionMarkCircleIcon className="h-3.5 w-3.5 text-[var(--vr-palette-lavender)]" />
                                Ask from Investors
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={asksRef}
                                    value={asks}
                                    onChange={(e) => setAsks(e.target.value)}
                                    className="w-full resize-none overflow-hidden rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed text-gray-700 focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                                    rows={3}
                                />
                            ) : (
                                <BulletList text={asks} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Vibe Raising design-system components (scoped via .vr-scope on the page wrapper) ──
// Split a text blob into bullet items on newlines or sentence boundaries.
function splitItems(text: string): string[] {
    if (!text) return [];
    return text.includes("\n")
        ? text.split(/\n+/).filter(s => s.trim())
        : text.split(/(?<=\.)\s+/).filter(s => s.trim());
}

function VRAlertInfo({ title, body }: { title: string; body: string }) {
    return (
        <div className="vr-alert vr-alert-info">
            <span className="vr-alert-icon">
                <InformationCircleIcon className="w-4 h-4" />
            </span>
            <div>
                <div className="vr-alert-title">{title}</div>
                <div className="vr-alert-body">{body}</div>
            </div>
        </div>
    );
}

function VRUpdateSection({
    icon: Icon,
    iconColorVar,
    label,
    items,
}: {
    icon: any;
    iconColorVar: string;
    label: string;
    items: string[];
}) {
    const [mobileExpanded, setMobileExpanded] = useState(false);
    if (items.length === 0) return null;
    const shouldClampOnMobile = items.length > 1;
    const visibleItems = mobileExpanded ? items : items.slice(0, 1);

    return (
        <div className="vr-us-block">
            <div className="vr-us-heading">
                <span className="vr-us-heading-icon" style={{ color: `var(${iconColorVar})` }}>
                    <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="vr-us-heading-text">{label}</span>
            </div>
            <div className="vr-us-list">
                {visibleItems.map((item, i) => (
                    <div className="vr-us-item" key={i}>
                        <span className="vr-us-item-dot">•</span>
                        <span className="vr-us-item-text">{item.trim()}</span>
                    </div>
                ))}
            </div>
            {shouldClampOnMobile ? (
                <button
                    type="button"
                    onClick={() => setMobileExpanded((current) => !current)}
                    className="mt-2 inline-flex text-xs font-bold text-[var(--vr-color-primary)] sm:hidden"
                >
                    {mobileExpanded ? "Show less" : `Show all ${items.length}`}
                </button>
            ) : null}
        </div>
    );
}

function VRPreviewUpdateSection({
    icon: Icon,
    iconClassName,
    label,
    text,
}: {
    icon: any;
    iconClassName: string;
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
            <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-900">
                <Icon className={clsx("h-3.5 w-3.5", iconClassName)} />
                {label}
            </h4>
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-600">
                {visibleItems.map((item, index) => (
                    <li key={`${label}-${index}`}>{item.trim()}</li>
                ))}
            </ul>
            {shouldClampOnMobile ? (
                <button
                    type="button"
                    onClick={() => setMobileExpanded((current) => !current)}
                    className="mt-2 inline-flex text-xs font-bold text-[var(--vr-color-primary)] sm:hidden"
                >
                    {mobileExpanded ? "Show less" : `Show all ${items.length}`}
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

function formatUpdateFileSize(bytes?: number | null) {
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

function VRPreviewUpdateCard({
    update,
    user,
    statusLabel,
}: {
    update: any;
    user: any;
    statusLabel?: string;
}) {
    const updatePeriod = update.year
        ? { month: update.monthName || parseVibeRaisingMonthYear(update.month).month, year: update.year }
        : parseVibeRaisingMonthYear(update.month);
    const updateSummary = update.summary || "";
    const updateSourceUrl = update.sourceUrl || "";
    const updateDate = new Date(update.date);
    const formattedDate = Number.isNaN(updateDate.getTime())
        ? ""
        : format(updateDate, "MMMM d, yyyy");
    const metrics = METRIC_OPTIONS.filter((metric) => update.metrics?.[metric.key]);
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
                <div className="absolute inset-0 flex items-end px-4 pb-3 sm:px-6 sm:pb-4">
                    <div className="flex items-center gap-3">
                        {user.domain ? (
                            <img
                                src={`https://www.google.com/s2/favicons?domain=${user.domain}&sz=64`}
                                alt=""
                                className="h-10 w-10 rounded-lg border border-white/30 bg-white/20 object-cover shadow-sm backdrop-blur-sm"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm">
                                <span className="text-sm font-bold text-white">{companyName.charAt(0)}</span>
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-bold text-white drop-shadow-sm">{companyName}</p>
                            <p className="text-xs text-white/70">Investor Update</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-100 px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3 sm:block">
                            <h3 className="text-lg font-bold text-gray-900">
                                {updatePeriod.month} {updatePeriod.year} Update
                            </h3>
                            <Link
                                to={`/founder-tools/updates/create?edit=${encodeURIComponent(update.id)}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-black text-gray-500 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-200 hover:text-gray-700 sm:hidden"
                            >
                                Edit
                                <PencilSquareIcon className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
                            <StartupRegionBadge location={user.location} />
                            {statusLabel ? (
                                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-black text-gray-500 ring-1 ring-gray-200">
                                    {statusLabel}
                                </span>
                            ) : null}
                            {formattedDate ? (
                                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-400 ring-1 ring-gray-200">
                                    {formattedDate}
                                </span>
                            ) : null}
                        </div>
                        <div className="mt-2 hidden flex-wrap items-center gap-2 sm:flex">
                            <VibeRaisingDateTabs month={updatePeriod.month} year={updatePeriod.year} size="compact" />
                            <StartupRegionBadge location={user.location} />
                            {statusLabel ? (
                                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-black text-gray-500 ring-1 ring-gray-200">
                                    {statusLabel}
                                </span>
                            ) : null}
                            <Link
                                to={`/founder-tools/updates/create?edit=${encodeURIComponent(update.id)}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-black text-gray-500 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-200 hover:text-gray-700"
                            >
                                Edit
                                <PencilSquareIcon className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                    {formattedDate ? (
                        <span className="hidden text-xs text-gray-400 sm:block">{formattedDate}</span>
                    ) : null}
                </div>
            </div>

            {metrics.length > 0 ? (
                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-6">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                        {metrics.map((metric) => (
                            <MetricCard
                                key={metric.key}
                                label={metric.label}
                                value={update.metrics[metric.key]}
                                icon={metric.icon}
                            />
                        ))}
                    </div>
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

            <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5">
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
                    icon={SparklesIcon}
                    iconClassName="text-[var(--vr-palette-purple)]"
                    label="Key Highlights"
                    text={update.highlights}
                />
                <VRPreviewUpdateSection
                    icon={ExclamationCircleIcon}
                    iconClassName="text-[var(--vr-palette-orange)]"
                    label="Challenges"
                    text={update.challenges}
                />
                <VRPreviewUpdateSection
                    icon={LightBulbIcon}
                    iconClassName="text-[var(--vr-palette-yellow)]"
                    label="Learnings"
                    text={update.learnings}
                />
                <VRPreviewUpdateSection
                    icon={ArrowRightIcon}
                    iconClassName="text-[var(--vr-palette-blue)]"
                    label="Next 30 Days"
                    text={update.next30Days}
                />
                <VRPreviewUpdateSection
                    icon={QuestionMarkCircleIcon}
                    iconClassName="text-[var(--vr-palette-lavender)]"
                    label="Ask from Investors"
                    text={update.asks}
                />
            </div>
        </div>
    );
}

function VRCurrentUpdateCard({ update, user }: { update: any; user: any }) {
    return <VRPreviewUpdateCard update={update} user={user} statusLabel="Current" />;
}

function VRPastUpdateRow({
    update,
    user,
    expanded,
    onToggle,
}: {
    update: any;
    user: any;
    expanded: boolean;
    onToggle: () => void;
}) {
    const previewSource = update.highlights || update.challenges || "";
    const preview = previewSource.length > 0
        ? (previewSource.split(/(?<=\.)\s+/)[0] || previewSource).slice(0, 80) + (previewSource.length > 80 ? "…" : "")
        : "No content yet";
    const highlights = splitItems(update.highlights || "");
    const challenges = splitItems(update.challenges || "");
    const asks = splitItems(update.asks || "");
    const learnings = splitItems(update.learnings || "");
    const next30Days = splitItems(update.next30Days || "");

    return (
        <div className={clsx("vr-past-card", expanded && "is-expanded")}>
            <button type="button" className="vr-past-row" onClick={onToggle} aria-expanded={expanded}>
                <div className="vr-past-left">
                    <span className="vr-past-dot" />
                    <div>
                        <div className="vr-past-month">{update.month}</div>
                        <div className="vr-past-preview">{preview}</div>
                    </div>
                </div>
                <div className="vr-past-right">
                    <span className="vr-badge vr-badge-teal">Sent</span>
                    <span className={clsx("vr-past-arrow", expanded && "is-expanded")} aria-hidden="true">›</span>
                </div>
            </button>

            {expanded ? (
                <div className="vr-past-body">
                    <div className="vr-past-meta">
                        <span>{format(new Date(update.date), "MMMM d, yyyy")}</span>
                        <Link
                            to={`/founder-tools/updates/create?edit=${encodeURIComponent(update.id)}`}
                            className="vr-past-edit"
                        >
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit
                        </Link>
                    </div>

                    <div className="vr-past-metrics-grid">
                        {update.metrics?.revenue ? (
                            <MetricCard label="Revenue" value={update.metrics.revenue} icon={CurrencyDollarIcon} />
                        ) : null}
                        {update.metrics?.users ? (
                            <MetricCard label="Users" value={update.metrics.users} icon={UserGroupIcon} />
                        ) : null}
                        {update.metrics?.runway ? (
                            <MetricCard label="Runway" value={update.metrics.runway} icon={ChartBarIcon} />
                        ) : null}
                        {update.metrics?.mrr ? (
                            <MetricCard label="MRR" value={update.metrics.mrr} icon={CurrencyDollarIcon} />
                        ) : null}
                        {update.metrics?.burnRate ? (
                            <MetricCard label="Burn Rate" value={update.metrics.burnRate} icon={FireIcon} />
                        ) : null}
                        {update.metrics?.monthlyCosts ? (
                            <MetricCard label="Costs" value={update.metrics.monthlyCosts} icon={CurrencyDollarIcon} />
                        ) : null}
                    </div>

                    <VRUpdateSection
                        icon={SparklesIcon}
                        iconColorVar="--vr-color-warning"
                        label="Key Highlights"
                        items={highlights}
                    />
                    <VRUpdateSection
                        icon={ExclamationCircleIcon}
                        iconColorVar="--vr-color-brand-orange"
                        label="Challenges"
                        items={challenges}
                    />
                    <VRUpdateSection
                        icon={LightBulbIcon}
                        iconColorVar="--vr-color-warning"
                        label="Learnings"
                        items={learnings}
                    />
                    <VRUpdateSection
                        icon={CalendarIcon}
                        iconColorVar="--vr-color-primary"
                        label="Next 30 Days"
                        items={next30Days}
                    />
                    <VRUpdateSection
                        icon={QuestionMarkCircleIcon}
                        iconColorVar="--vr-color-primary"
                        label="Ask from Investors"
                        items={asks}
                    />

                    <div className="vr-past-footer">
                        <div className="vr-ucf-left">
                            <div className="vr-ucf-avatar">
                                {(user.fullName || user.companyName || "U")
                                    .split(" ")
                                    .map((part: string) => part[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>
                            <div>
                                <div className="vr-ucf-name">{user.companyName}</div>
                                <div className="vr-ucf-company">Past investor update</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

// 1. Founder Dashboard View
function FounderDashboard({ user, updates }: { user: any, updates: any[] }) {
    const { triggerAnnouncement } = useOutletContext<{ triggerAnnouncement: (cb?: () => void) => void }>();
    const navigate = useNavigate();
    const showDiscover = isFounderToolsDiscoverEnabled();
    const firstName = user.fullName.split(' ')[0];
    const hasUpdates = updates.length > 0;

    const latestUpdate = hasUpdates ? updates[0] : null;

    const now = new Date();
    const currentUpdate = updates.find((update) => {
        const updateDate = new Date(update.date);
        return (
            !Number.isNaN(updateDate.getTime()) &&
            updateDate.getMonth() === now.getMonth() &&
            updateDate.getFullYear() === now.getFullYear()
        );
    }) || null;
    const pastUpdates = currentUpdate
        ? updates.filter((update) => update !== currentUpdate)
        : updates;
    const [activeTab, setActiveTab] = useState<"current" | "past">(
        currentUpdate ? "current" : "past"
    );
    const [activeMetricCard, setActiveMetricCard] = useState<string | null>(null);

    if (!hasUpdates) {
        return (
            <div className="vr-scope mx-auto max-w-6xl space-y-8 pb-12">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <div className="vr-text-eyebrow mb-1.5">MLAI Vibe Raising</div>
                        <h1 className="vr-text-page-title">Your Monthly Updates</h1>
                        <p className="vr-text-body-small mt-1" style={{ color: "var(--vr-color-text-mid)" }}>
                            Keep your update workspace ready, then jump into the overview page whenever you want the full founder pitch surface again.
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <Link
                            to="/founder-tools/overview"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-white hover:text-gray-950"
                        >
                            View Overview
                        </Link>
                        <Link
                            to="/founder-tools/drafts"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-white hover:text-gray-950"
                        >
                            My Drafts
                        </Link>
                        <button
                            type="button"
                            onClick={() => triggerAnnouncement(() => navigate("/founder-tools/data-sources"))}
                            className="inline-flex items-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)]"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Create Update
                        </button>
                    </div>
                </div>

                <div
                    className="rounded-[28px] border p-6 sm:p-8"
                    style={{
                        borderColor: "var(--vr-color-border-md)",
                        background: "linear-gradient(135deg, rgba(0,255,215,0.08), rgba(255,255,255,0.95))",
                        boxShadow: "var(--vr-shadow-sm)",
                    }}
                >
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
                        <div className="space-y-4">
                            <div className="inline-flex rounded-full bg-[rgba(0,128,128,0.10)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--vr-color-text-strong)]">
                                Dashboard ready
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                No monthly update yet, {firstName}.
                            </h2>
                            <p className="max-w-2xl text-base leading-7 text-gray-600">
                                Your workspace is ready. Start a draft from your data sources, or head back to the overview page any time to revisit the full founder-facing hero and example update.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => triggerAnnouncement(() => navigate("/founder-tools/data-sources"))}
                                    className="inline-flex items-center gap-3 rounded-xl bg-[var(--vr-color-primary)] px-6 py-3 font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)]"
                                >
                                    Create Your First Update
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                                <Link
                                    to="/founder-tools/overview"
                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-[var(--vr-color-text-strong)] shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-white"
                                >
                                    Revisit Overview
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-[24px] border bg-white/90 p-5 backdrop-blur-sm" style={{ borderColor: "var(--vr-color-border-md)" }}>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--vr-color-primary-dark)]">
                                        Next steps
                                    </p>
                                    <h3 className="mt-2 text-xl font-bold text-gray-900">Build your first investor-ready update</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        "Connect one source or start with manual materials.",
                                        "Generate a private draft and keep refining it.",
                                        "Publish when you are ready for investors to see it.",
                                    ].map((item) => (
                                        <div className="flex items-start gap-3" key={item}>
                                            <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--vr-color-primary)]" />
                                            <p className="text-sm leading-6 text-gray-600">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="vr-scope mx-auto max-w-6xl space-y-8 pb-12">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <div className="vr-text-eyebrow mb-1.5">MLAI Vibe Raising</div>
                    <h1 className="vr-text-page-title">Your Monthly Updates</h1>
                    <p className="vr-text-body-small mt-1" style={{ color: "var(--vr-color-text-mid)" }}>
                        Share progress with your investors. Ship fast, build trust from day one.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                    {showDiscover ? (
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-white hover:text-gray-950"
                            onClick={() => navigate("/founder-tools/discover")}
                        >
                            Discover Investors
                        </button>
                    ) : null}
                    <Link
                        to="/founder-tools/drafts"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-white hover:text-gray-950"
                    >
                        My Drafts
                    </Link>
                    <Link
                        to="/founder-tools/data-sources"
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)]"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Create Update
                    </Link>
                </div>
            </div>

            {/* Info alert — investor engagement signal */}
            <div className="hidden sm:block">
                <VRAlertInfo
                    title="3 investors opened your last update"
                    body="AirTree, Blackbird, and Antler viewed your most recent update. Consider following up with personalised notes."
                />
            </div>

            {/* Dashboard metrics row — prototype .metric-card design, scoped under vr- */}
            <div className="hidden sm:block">
                <div className="vr-metrics-row">
                <button
                    type="button"
                    aria-pressed={activeMetricCard === "mrr"}
                    className={clsx("vr-metric-card", activeMetricCard === "mrr" && "vr-metric-card-active")}
                    onClick={() => setActiveMetricCard((current) => current === "mrr" ? null : "mrr")}
                >
                    <div
                        className="vr-metric-card-bar"
                        style={{ background: "linear-gradient(90deg, var(--vr-color-primary), var(--vr-color-secondary))" }}
                    />
                    <div className="vr-metric-eyebrow">
                        MRR
                        <span className="vr-badge vr-badge-purple">↗ vs last mo</span>
                    </div>
                    <div className="vr-metric-value">
                        {latestUpdate?.metrics?.revenue?.replace(/\s*MRR$/i, "") || "—"}
                    </div>
                    <div className="vr-metric-delta vr-delta-up">↑ 18% month-on-month</div>
                </button>

                <button
                    type="button"
                    aria-pressed={activeMetricCard === "active-users"}
                    className={clsx("vr-metric-card", activeMetricCard === "active-users" && "vr-metric-card-active")}
                    onClick={() => setActiveMetricCard((current) => current === "active-users" ? null : "active-users")}
                >
                    <div
                        className="vr-metric-card-bar"
                        style={{ background: "linear-gradient(90deg, var(--vr-color-secondary), var(--vr-color-featured))" }}
                    />
                    <div className="vr-metric-eyebrow">Active Users</div>
                    <div className="vr-metric-value">
                        {latestUpdate?.metrics?.users?.replace(/\s*active$/i, "") || "—"}
                    </div>
                    <div className="vr-metric-delta vr-delta-up">↑ 220 new this month</div>
                </button>

                <button
                    type="button"
                    aria-pressed={activeMetricCard === "runway"}
                    className={clsx("vr-metric-card", activeMetricCard === "runway" && "vr-metric-card-active")}
                    onClick={() => setActiveMetricCard((current) => current === "runway" ? null : "runway")}
                >
                    <div
                        className="vr-metric-card-bar"
                        style={{ background: "var(--vr-color-brand-orange)" }}
                    />
                    <div className="vr-metric-eyebrow">
                        Runway
                        <span className="vr-badge vr-badge-orange">⚠ Low</span>
                    </div>
                    <div className="vr-metric-value">
                        {latestUpdate?.metrics?.runway?.replace(/\s*months?$/i, " mo") || "—"}
                    </div>
                    <div className="vr-metric-delta vr-delta-down">↓ 2 months vs forecast</div>
                </button>

                <button
                    type="button"
                    aria-pressed={activeMetricCard === "raise-committed"}
                    className={clsx("vr-metric-card", activeMetricCard === "raise-committed" && "vr-metric-card-active")}
                    onClick={() => setActiveMetricCard((current) => current === "raise-committed" ? null : "raise-committed")}
                >
                    <div
                        className="vr-metric-card-bar"
                        style={{ background: "linear-gradient(90deg, var(--vr-color-featured), var(--vr-color-brand-teal-light))" }}
                    />
                    <div className="vr-metric-eyebrow">Raise Committed</div>
                    <div className="vr-metric-value">62%</div>
                    <div className="vr-metric-delta vr-delta-neutral">$750K of $1.2M</div>
                </button>

                <button
                    type="button"
                    aria-pressed={activeMetricCard === "burn-rate"}
                    className={clsx("vr-metric-card", activeMetricCard === "burn-rate" && "vr-metric-card-active")}
                    onClick={() => setActiveMetricCard((current) => current === "burn-rate" ? null : "burn-rate")}
                >
                    <div
                        className="vr-metric-card-bar"
                        style={{ background: "linear-gradient(90deg, var(--vr-color-brand-orange), var(--vr-color-warning))" }}
                    />
                    <div className="vr-metric-eyebrow">Burn Rate</div>
                    <div className="vr-metric-value">$52K/mo</div>
                    <div className="vr-metric-delta vr-delta-down">↑ 8% vs last month</div>
                </button>
                </div>
            </div>

            {/* Tabs + tab content */}
            <div>
                <div className="vr-tabs">
                    <button
                        type="button"
                        className={clsx("vr-tab", activeTab === "current" && "is-active")}
                        onClick={() => setActiveTab("current")}
                    >
                        Current Update
                    </button>
                    <button
                        type="button"
                        className={clsx("vr-tab", activeTab === "past" && "is-active")}
                        onClick={() => setActiveTab("past")}
                    >
                        Past Updates
                    </button>
                </div>

                <div className="mt-6">
                    {activeTab === "current" ? (
                        currentUpdate ? (
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                                <div className="min-w-0 flex-1">
                                    <VRCurrentUpdateCard update={currentUpdate} user={user} />
                                </div>
                            </div>
                        ) : (
                            <p className="vr-text-body-small" style={{ color: "var(--vr-color-text-sub)" }}>
                                No current update yet — create your first one above.
                            </p>
                        )
                    ) : (
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                            {pastUpdates.length > 0 ? (
                                <div className="min-w-0 flex-1 space-y-4">
                                    {pastUpdates.map((u) => (
                                        <VRPreviewUpdateCard
                                            key={`${user.activeCompanyId || "default"}-${u.id}`}
                                            update={u}
                                            user={user}
                                            statusLabel="Sent"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="vr-text-body-small" style={{ color: "var(--vr-color-text-sub)" }}>
                                    No past updates yet. Once you send one, it'll show up here.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

// 2. Investor Dashboard View
function InvestorDashboard({ portfolioUpdates }: { portfolioUpdates: any[] }) {
    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Portfolio Updates</h1>
                <p className="text-gray-500 mt-1">Stay connected with your portfolio companies</p>
            </div>

            {/* Free Preview Mode Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--vr-palette-teal),var(--vr-palette-mint))] p-8 text-[var(--vr-palette-black)] shadow-lg">
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-90">
                        <EyeIcon className="w-5 h-5" />
                        Free Preview Mode
                    </div>
                    <p className="text-lg">
                        You've viewed <span className="font-bold">0 of 3</span> free monthly updates. Upgrade to view unlimited updates!
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-[5%]" />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-[var(--vr-color-primary)] transition-colors hover:bg-[var(--vr-color-neutral-50)]">
                        <SparklesIcon className="w-4 h-4" />
                        Upgrade for $8.99/month
                    </button>
                </div>
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by company or founder name..."
                        className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--vr-color-primary)]"
                    />
                </div>
                <button className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
                    Filter Updates
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Portfolio List */}
            <div className="space-y-6">
                {portfolioUpdates.map((update) => (
                    <div key={update.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Hero gradient banner */}
                        <div className="relative w-full h-28 overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--vr-palette-teal),var(--vr-palette-mint))]" />
                            <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 200">
                                <circle cx="120" cy="80" r="100" fill="white" />
                                <circle cx="650" cy="140" r="70" fill="white" />
                                <circle cx="400" cy="30" r="50" fill="white" />
                                <rect x="250" y="100" width="180" height="180" rx="40" fill="white" transform="rotate(-15 340 190)" />
                            </svg>
                            <div className="absolute inset-0 flex items-end justify-between px-6 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-lg font-black text-white shadow-sm">
                                        {update.companyName[0]}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm drop-shadow-sm">{update.companyName}</p>
                                        <p className="text-white/70 text-xs">{update.founderName}</p>
                                    </div>
                                </div>
                                <div className="text-white/70 text-xs font-medium flex items-center gap-1.5">
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    {format(new Date(update.date), "MMMM yyyy")}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-2 border-b border-gray-100 flex items-center">
                            <p className="flex items-center gap-1 text-xs font-bold text-[var(--vr-palette-orange)]">
                                <LockClosedIcon className="w-3 h-3" />
                                Update History (Premium Only)
                            </p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                                {update.metrics.revenue && <MetricCard label="Revenue" value={update.metrics.revenue} icon={CurrencyDollarIcon} />}
                                {update.metrics.users && <MetricCard label="Users" value={update.metrics.users} icon={UserGroupIcon} />}
                                {update.metrics.mrr && <MetricCard label="MRR" value={update.metrics.mrr} icon={CurrencyDollarIcon} />}
                                {update.metrics.burnRate && <MetricCard label="Burn Rate" value={update.metrics.burnRate} icon={FireIcon} />}
                                {update.metrics.runway && <MetricCard label="Runway" value={update.metrics.runway} icon={ChartBarIcon} />}
                                {update.metrics.monthlyCosts && <MetricCard label="Costs" value={update.metrics.monthlyCosts} icon={CurrencyDollarIcon} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <SparklesIcon className="h-5 w-5 text-[var(--vr-palette-purple)]" />
                                    Highlights
                                </h4>
                                <BulletList text={update.highlights} />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-6 text-sm font-bold text-gray-400">
                            <button className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                                <HandThumbUpIcon className="w-5 h-5" />
                                {update.likes}
                            </button>
                            <button className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                                {update.comments}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function VibeRaisingHome() {
    const data = useLoaderData<typeof loader>();

    if (!data) {
        return null;
    }

    const { user, updates, portfolioUpdates } = data;
    if (!user) return null;

    if (user.role === 'investor') {
        return <InvestorDashboard portfolioUpdates={portfolioUpdates} />;
    }

    return <FounderDashboard user={user} updates={updates} />;
}

