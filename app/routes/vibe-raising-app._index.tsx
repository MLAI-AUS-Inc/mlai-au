import { Link, redirect, useLoaderData, useOutletContext, useNavigate } from "react-router";
import { format, differenceInDays } from "date-fns";
import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/vibe-raising-app._index";
import {
    getVibeRaisingMonthlyUpdates,
    getOptionalVibeRaisingContext,
    getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";
import { clsx } from "clsx";
import { getEnv } from "~/lib/env.server";
import {
    ArrowRightIcon,
    ExclamationTriangleIcon,
    ClockIcon,
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
} from "@heroicons/react/24/outline";

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

// Reuseable Components
function MetricCard({ label, value, icon: Icon, active = true }: { label: string, value: string, icon: any, colorClass?: string, active?: boolean }) {
    return (
        <div className={clsx(
            "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 transition-all",
            active
                ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                : "border-gray-200 bg-gray-50 opacity-40"
        )}>
            <div className={clsx(
                "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                active ? "bg-violet-100" : "bg-white"
            )}>
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <p className={clsx(
                "text-base font-extrabold leading-tight",
                active ? "text-gray-900" : "text-gray-300"
            )}>{active ? value : "—"}</p>
            <p className={clsx(
                "text-xs sm:text-[10px] font-semibold uppercase tracking-wide mt-1",
                active ? "text-gray-600" : "text-gray-400"
            )}>{label}</p>
        </div>
    );
}

// Editable metric input for inline editing
function EditableMetricCard({ label, value, icon: Icon, active = true, editing, onChange }: { label: string, value: string, icon: any, colorClass?: string, active?: boolean, editing: boolean, onChange: (v: string) => void }) {
    if (!editing) return <MetricCard label={label} value={value} icon={Icon} active={active} />;
    return (
        <div className={clsx(
            "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
            active
                ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
        )}>
            <div className={clsx(
                "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                active ? "bg-violet-100" : "bg-white"
            )}>
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
            {active ? (
                <input
                    type="text"
                    value={value}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 border-violet-300 focus:border-violet-500 focus:outline-none text-center py-0.5"
                />
            ) : (
                <p className="text-base font-extrabold text-gray-300">—</p>
            )}
            <p className={clsx(
                "text-xs sm:text-[10px] font-semibold uppercase tracking-wide mt-1",
                active ? "text-gray-600" : "text-gray-400"
            )}>{label}</p>
        </div>
    );
}

// Available metric categories for toggle pills
const METRIC_OPTIONS = [
    { key: "revenue", label: "Revenue", icon: CurrencyDollarIcon, colorClass: "bg-green-50/50 border-green-100" },
    { key: "users", label: "Users", icon: UserGroupIcon, colorClass: "bg-purple-50/50 border-purple-100" },
    { key: "mrr", label: "MRR", icon: CurrencyDollarIcon, colorClass: "bg-emerald-50/50 border-emerald-100" },
    { key: "burnRate", label: "Burn Rate", icon: FireIcon, colorClass: "bg-red-50/50 border-red-100" },
    { key: "runway", label: "Runway", icon: ChartBarIcon, colorClass: "bg-amber-50/50 border-amber-100" },
];

const GRADIENTS = [
    "from-violet-500 via-purple-500 to-pink-400 group-hover:from-violet-600 group-hover:via-purple-600 group-hover:to-pink-500",
    "from-violet-500 via-cyan-500 to-teal-400 group-hover:from-violet-600 group-hover:via-cyan-600 group-hover:to-teal-500",
    "from-rose-500 via-red-500 to-orange-400 group-hover:from-rose-600 group-hover:via-red-600 group-hover:to-orange-500",
    "from-emerald-500 via-teal-500 to-cyan-400 group-hover:from-emerald-600 group-hover:via-teal-600 group-hover:to-cyan-500",
    "from-fuchsia-500 via-pink-500 to-rose-400 group-hover:from-fuchsia-600 group-hover:via-pink-600 group-hover:to-rose-500",
    "from-amber-500 via-orange-500 to-rose-400 group-hover:from-amber-600 group-hover:via-orange-600 group-hover:to-rose-500"
];

// Inline-editable update card
function UpdateCard({ update, isCurrent, user }: { update: any; isCurrent: boolean; user: any }) {
    const [editing, setEditing] = useState(false);
    const [expanded, setExpanded] = useState(isCurrent);
    const [highlights, setHighlights] = useState(update.highlights);
    const [challenges, setChallenges] = useState(update.challenges);
    const [asks, setAsks] = useState(update.asks);
    const [metrics, setMetrics] = useState<Record<string, string>>(update.metrics);
    const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(
        new Set(Object.keys(update.metrics).filter(k => update.metrics[k]))
    );
    const [saved, setSaved] = useState(false);

    // Hash numeric or string ID to pick a deterministic gradient
    const hashId = typeof update.id === 'number' ? update.id : update.id?.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) || 0;
    const gradientClass = GRADIENTS[hashId % GRADIENTS.length];

    const highlightsRef = useAutoResize(highlights);
    const challengesRef = useAutoResize(challenges);
    const asksRef = useAutoResize(asks);

    const handleSave = () => {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleCancel = () => {
        setHighlights(update.highlights);
        setChallenges(update.challenges);
        setAsks(update.asks);
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
            isCurrent ? "border-violet-200 ring-1 ring-violet-100" : "border-gray-200",
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
                        {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-violet-500 flex-shrink-0" />}
                        {!isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />}
                        <h3 className="text-base font-bold text-gray-900 truncate">{update.month}</h3>
                        {isCurrent && <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100">Current</span>}
                        {update.score && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-full border border-purple-100">
                                {update.score}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden sm:flex items-center gap-3">
                            {update.investorsSentTo > 0 && (
                                <span className="flex items-center gap-1 text-violet-600 text-xs font-medium">
                                    <UserGroupIcon className="w-3.5 h-3.5" />
                                    {update.investorsSentTo} sent
                                </span>
                            )}
                            {update.investorsViewed > 0 && (
                                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                    <EyeIcon className="w-3.5 h-3.5" />
                                    {update.investorsViewed} viewed
                                </span>
                            )}
                            {(update.investorsSentTo > 0 || update.investorsViewed > 0) && (
                                <span className="w-px h-3 bg-gray-200" />
                            )}
                            <span className="text-xs text-gray-600 max-w-[200px] truncate">{highlights.slice(0, 60)}...</span>
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
                            <div className="absolute inset-0">
                                <video 
                                    src={update.videoUrl} 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline 
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>
                        ) : (
                            <>
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-colors duration-300`} />
                                <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 200">
                                    <circle cx="120" cy="80" r="100" fill="white" />
                                    <circle cx="650" cy="140" r="70" fill="white" />
                                    <circle cx="400" cy="30" r="50" fill="white" />
                                    <rect x="250" y="100" width="180" height="180" rx="40" fill="white" transform="rotate(-15 340 190)" />
                                </svg>
                            </>
                        )}
                        {/* Top row: date + collapse chevron */}
                        <div className="absolute top-0 left-0 right-0 px-5 pt-3 flex items-center justify-between">
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
                                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                    <CheckIcon className="w-3.5 h-3.5" /> Saved
                                </span>
                            )}
                            {!editing ? (
                                <button
                                    type="button"
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-violet-600 transition-colors px-2.5 py-1 rounded-md hover:bg-violet-50"
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
                                        className="flex items-center gap-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition-colors"
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
                                                ? "bg-violet-50 text-violet-700 border-violet-200"
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

                        {/* Highlights */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <SparklesIcon className="w-3.5 h-3.5 text-yellow-500" />
                                Key Highlights
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={highlightsRef}
                                    value={highlights}
                                    onChange={(e) => setHighlights(e.target.value)}
                                    className="w-full text-sm text-gray-700 leading-relaxed px-3 py-2 border border-gray-200 rounded-lg focus:ring-violet-500 focus:border-violet-500 resize-none overflow-hidden"
                                    rows={3}
                                />
                            ) : (
                                <BulletList text={highlights} />
                            )}
                        </div>

                        {/* Challenges */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <ExclamationCircleIcon className="w-3.5 h-3.5 text-orange-500" />
                                Challenges
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={challengesRef}
                                    value={challenges}
                                    onChange={(e) => setChallenges(e.target.value)}
                                    className="w-full text-sm text-gray-700 leading-relaxed px-3 py-2 border border-gray-200 rounded-lg focus:ring-violet-500 focus:border-violet-500 resize-none overflow-hidden"
                                    rows={3}
                                />
                            ) : (
                                <BulletList text={challenges} />
                            )}
                        </div>

                        {/* Asks */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-violet-500" />
                                Ask from Investors
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={asksRef}
                                    value={asks}
                                    onChange={(e) => setAsks(e.target.value)}
                                    className="w-full text-sm text-gray-700 leading-relaxed px-3 py-2 border border-gray-200 rounded-lg focus:ring-violet-500 focus:border-violet-500 resize-none overflow-hidden"
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

// 1. Founder Dashboard View
function FounderDashboard({ user, updates }: { user: any, updates: any[] }) {
    const { triggerAnnouncement } = useOutletContext<{ triggerAnnouncement: (cb?: () => void) => void }>();
    const navigate = useNavigate();
    const firstName = user.fullName.split(' ')[0];
    const hasUpdates = updates.length > 0;

    const latestUpdate = hasUpdates ? updates[0] : null;
    const daysSinceLast = latestUpdate ? differenceInDays(new Date(), new Date(latestUpdate.date)) : 0;
    const isOverdue = daysSinceLast > 21;
    const daysOverdue = daysSinceLast - 21;

    if (!hasUpdates) {
        return (
            <div className="-m-6 sm:-m-8 lg:-m-10">
                {/* Hero section with background image */}
                <div className="relative min-h-[60vh] sm:min-h-[calc(100vh-64px)] overflow-hidden">
                    {/* Background image — cropped to viewport height */}
                    <img
                        src="/hero-bg.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

                    {/* Content over the image */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg whitespace-nowrap">
                            Let's get you ready to raise, {firstName}.
                        </h1>
                        <p className="text-base sm:text-lg text-white/80 max-w-md mx-auto mb-8 leading-snug">
                            Build investor trust and secure funding through
                            <br />
                            consistent, transparent monthly updates.
                        </p>
                        <button
                            onClick={() => triggerAnnouncement(() => navigate("/vibe-raising/create-update"))}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-gray-100 active:scale-[0.98]"
                        >
                            Create Your First Update
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* How It Works - thin vertical line separators */}
                <div className="px-6 py-14">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
                    <div className="flex items-center justify-center max-w-5xl mx-auto">
                        {[
                            { step: 1, title: "Create Your Update", desc: "Draft your monthly progress in minutes" },
                            { step: 2, title: "Get AI Feedback", desc: "Receive scoring and suggestions instantly" },
                            { step: 3, title: "Engage with Investors", desc: "We match you with the right investors" }
                        ].map((item, idx) => (
                            <div key={item.step} className="flex items-center">
                                <div className="text-center px-8 sm:px-14 space-y-2">
                                    <span className="text-3xl font-extrabold text-violet-600">{item.step}</span>
                                    <p className="font-bold text-gray-900 text-sm whitespace-nowrap">{item.title}</p>
                                    <p className="text-xs text-gray-500 whitespace-nowrap">{item.desc}</p>
                                </div>
                                {idx < 2 && (
                                    <div className="w-px h-16 bg-gray-300 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Warning card - investor outreach timing */}
                <div className="max-w-4xl mx-auto px-6 pb-14">
                    <div className="bg-white rounded-2xl p-10 border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                        <div className="flex items-start gap-5">
                            <div className="mt-1 p-2 bg-red-50 rounded-lg flex-shrink-0">
                                <ExclamationTriangleIcon className="w-7 h-7 text-red-500" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900">Don't Wait Until You Need Money</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    If you're reaching out to investors only when you need capital, it's already too late.
                                    Investors can smell desperation - and when that moment comes, you've already messed up.
                                    The best founders plan ahead. Start building relationships at least 6 months before you
                                    need funding. Send regular updates, share your progress and challenges honestly.
                                    We will match you with the proper investors based on your updates, so when the time comes
                                    to raise, the trust is already there.
                                </p>
                            </div>
                        </div>
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 rounded-l-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Monthly Updates</h1>
                    <p className="text-gray-500 mt-1">Share progress with your investors</p>
                </div>
                <Link
                    to="/vibe-raising/create-update"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Create Update
                </Link>
            </div>

            {isOverdue && (
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full border border-violet-100 shadow-sm text-violet-600">
                                <ClockIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-lg font-bold text-gray-900">Time for Your Monthly Update!</h2>
                                    <span className="px-2.5 py-0.5 bg-violet-200 text-violet-800 text-xs font-bold rounded-full">
                                        {daysOverdue} days overdue
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    Your last update was on <span className="font-semibold">{format(new Date(latestUpdate!.date), "MMMM d, yyyy")}</span>.
                                    Keep your investors engaged with your latest progress!
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/vibe-raising/create-update"
                            className="px-6 py-3 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-700 transition-colors shadow-sm whitespace-nowrap"
                        >
                            Create Update Now
                        </Link>
                    </div>
                </div>
            )}

            {/* All update cards - current expanded, past collapsed */}
            <div className="space-y-3">
                {updates.map((update) => (
                    <UpdateCard key={`${user.activeCompanyId || "default"}-${update.id}`} update={update} isCurrent={update.isCurrent} user={user} />
                ))}
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
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
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
                    <button className="bg-white text-violet-600 px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors hover:bg-violet-50">
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
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all font-medium"
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
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-400" />
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
                            <p className="text-xs text-orange-600 font-bold flex items-center gap-1">
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
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5 text-yellow-500" />
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
