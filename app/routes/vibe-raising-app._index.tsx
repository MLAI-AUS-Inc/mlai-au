import { Link, useLoaderData } from "react-router";
import { format, differenceInDays } from "date-fns";
import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/vibe-raising-app._index";
import { getVibeRaisingUser } from "~/lib/vibe-raising-session";
import { clsx } from "clsx";
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

export async function loader({ request }: Route.LoaderArgs) {
    const user = getVibeRaisingUser(request);
    if (!user) return { user: null, updates: [], portfolioUpdates: [] };

    const cookieHeader = request.headers.get("Cookie") || "";
    const hasSubmitted = cookieHeader.includes("vibe_raising_submitted=true");

    // Founder Mock Data
    const mockUpdates = hasSubmitted ? [
        {
            id: 1,
            month: "February 2026",
            score: "A+",
            date: new Date().toISOString(),
            metrics: {
                revenue: "$127,500",
                growth: "18%",
                users: "3,420"
            },
            highlights: "Closed 3 new enterprise deals with Fortune 500 companies totaling $75K ARR. Launched new dashboard feature which increased user engagement by 32%. Featured in TechCrunch - drove 1,200+ signups. Team grew to 8 people with new Head of Sales joining.",
            challenges: "Customer onboarding time is averaging 14 days vs target of 7 days. Need to streamline our implementation process. CAC increased to $850 this month due to increased competition in paid channels.",
            asks: "Looking for introductions to VP of Customer Success at B2B SaaS companies to help optimize our onboarding process. Would appreciate feedback on our pricing strategy as we move upmarket.",
            likes: 0,
            comments: 0,
            investorsSentTo: 12,
            investorsViewed: 8,
            isCurrent: true,
        },
        {
            id: 2,
            month: "January 2026",
            score: "A",
            date: "2026-01-15T00:00:00.000Z",
            metrics: {
                revenue: "$32,000",
                growth: "15%",
                users: "820"
            },
            highlights: "Launched v2.0 with enterprise features. Revenue reached $32K MoM with 15% growth from new pricing tier.",
            challenges: "Hiring pipeline slower than expected for engineering roles. Onboarding new enterprise customers taking longer than projected.",
            asks: "Seeking referrals for senior full-stack engineers. Would love intros to heads of procurement at mid-market companies.",
            likes: 3,
            comments: 1,
            investorsSentTo: 12,
            investorsViewed: 10,
            isCurrent: false,
        },
        {
            id: 3,
            month: "December 2025",
            score: "B+",
            date: "2025-12-10T00:00:00.000Z",
            metrics: {
                revenue: "$18,000",
                growth: "",
                users: "500"
            },
            highlights: "Closed pre-seed round of $250K from angel investors. Onboarded first 5 beta customers and hit 500 active users milestone.",
            challenges: "Product stability issues during beta launch. Needed to prioritize bug fixes over new features.",
            asks: "Looking for introductions to early-stage B2B SaaS founders for peer learning and advice on product-market fit.",
            likes: 5,
            comments: 2,
            investorsSentTo: 12,
            investorsViewed: 11,
            isCurrent: false,
        }
    ] : [];

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

    return { user, updates: mockUpdates, portfolioUpdates };
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

// Reuseable Components
function MetricCard({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) {
    return (
        <div className={`${colorClass} rounded-lg p-4 border`}>
            <p className="text-xs font-medium flex items-center gap-1 mb-1 opacity-80">
                <Icon className="w-3.5 h-3.5" /> {label}
            </p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

// Editable metric input for inline editing
function EditableMetricCard({ label, value, icon: Icon, colorClass, editing, onChange }: { label: string, value: string, icon: any, colorClass: string, editing: boolean, onChange: (v: string) => void }) {
    if (!editing) return <MetricCard label={label} value={value} icon={Icon} colorClass={colorClass} />;
    return (
        <div className={`${colorClass} rounded-lg p-4 border`}>
            <p className="text-xs font-medium flex items-center gap-1 mb-1 opacity-80">
                <Icon className="w-3.5 h-3.5" /> {label}
            </p>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-0.5"
            />
        </div>
    );
}

// Available metric categories for toggle pills
const METRIC_OPTIONS = [
    { key: "revenue", label: "Revenue", icon: CurrencyDollarIcon, colorClass: "bg-green-50/50 border-green-100" },
    { key: "growth", label: "Growth", icon: ChartBarIcon, colorClass: "bg-blue-50/50 border-blue-100" },
    { key: "users", label: "Users", icon: UserGroupIcon, colorClass: "bg-purple-50/50 border-purple-100" },
    { key: "mrr", label: "MRR", icon: CurrencyDollarIcon, colorClass: "bg-emerald-50/50 border-emerald-100" },
    { key: "burnRate", label: "Burn Rate", icon: FireIcon, colorClass: "bg-red-50/50 border-red-100" },
    { key: "runway", label: "Runway", icon: ChartBarIcon, colorClass: "bg-amber-50/50 border-amber-100" },
];

// Inline-editable update card
function UpdateCard({ update, isCurrent }: { update: any; isCurrent: boolean }) {
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
            isCurrent ? "border-blue-200 ring-1 ring-blue-100" : "border-gray-200",
            expanded && "hover:shadow-md"
        )}>
            {/* Card header — always visible */}
            <button
                type="button"
                onClick={() => !editing && setExpanded(!expanded)}
                className={clsx(
                    "w-full p-5 flex items-center justify-between text-left",
                    !editing && "cursor-pointer hover:bg-gray-50/50 transition-colors"
                )}
            >
                <div className="flex items-center gap-3">
                    {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />}
                    {!isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />}
                    <h3 className="text-base font-bold text-gray-900">{update.month}</h3>
                    {isCurrent && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">Current</span>}
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-full border border-purple-100">
                        {update.score}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                        <UserGroupIcon className="w-3.5 h-3.5" />
                        {update.investorsSentTo} sent
                    </span>
                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <EyeIcon className="w-3.5 h-3.5" />
                        {update.investorsViewed} viewed
                    </span>
                    {!expanded && !editing && (
                        <>
                            <span className="w-px h-3 bg-gray-200" />
                            <span className="text-xs text-gray-400 max-w-[200px] truncate">{highlights.slice(0, 60)}...</span>
                        </>
                    )}
                    <ChevronDownIcon className={clsx("w-4 h-4 text-gray-400 transition-transform", expanded && "rotate-180")} />
                </div>
            </button>

            {/* Expanded content */}
            {expanded && (
                <div className="border-t border-gray-100">
                    {/* Action bar */}
                    <div className="px-5 py-2.5 bg-gray-50/80 flex items-center justify-between border-b border-gray-100">
                        <span className="text-xs text-gray-400">{format(new Date(update.date), "MMMM d, yyyy")}</span>
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
                                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors px-2.5 py-1 rounded-md hover:bg-blue-50"
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
                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                                        )}
                                    >
                                        {selectedMetrics.has(m.key) ? "✓ " : "+ "}{m.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {METRIC_OPTIONS.filter(m => selectedMetrics.has(m.key)).map(m => (
                                <EditableMetricCard
                                    key={m.key}
                                    label={m.label}
                                    value={metrics[m.key] || ""}
                                    icon={m.icon}
                                    colorClass={m.colorClass}
                                    editing={editing}
                                    onChange={(v) => updateMetricValue(m.key, v)}
                                />
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
                                    className="w-full text-sm text-gray-700 leading-relaxed px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-sm text-gray-600 leading-relaxed">{highlights}</p>
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
                                    className="w-full text-sm text-gray-700 leading-relaxed px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-sm text-gray-600 leading-relaxed">{challenges}</p>
                            )}
                        </div>

                        {/* Asks */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-blue-500" />
                                Ask from Investors
                            </h4>
                            {editing ? (
                                <textarea
                                    ref={asksRef}
                                    value={asks}
                                    onChange={(e) => setAsks(e.target.value)}
                                    className="w-full text-sm text-gray-700 leading-relaxed px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-sm text-gray-600 leading-relaxed">{asks}</p>
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
    const firstName = user.fullName.split(' ')[0];
    const hasUpdates = updates.length > 0;

    const latestUpdate = hasUpdates ? updates[0] : null;
    const daysSinceLast = latestUpdate ? differenceInDays(new Date(), new Date(latestUpdate.date)) : 0;
    const isOverdue = daysSinceLast > 21;
    const daysOverdue = daysSinceLast - 21;

    if (!hasUpdates) {
        return (
            <div className="max-w-4xl mx-auto space-y-12 py-8">
                <div className="text-center">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6 border border-blue-100">
                        Welcome to Vibe Raising
                    </span>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Welcome, {firstName}! 👋
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Transform how you communicate with investors through consistent monthly updates.
                    </p>
                    <Link
                        to="/vibe-raising/create-update"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        Create Your First Update
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>

                <div className="bg-blue-50/50 rounded-3xl p-12 border border-blue-100/50">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: 1, title: "Create Your Update" },
                            { step: 2, title: "Get AI Feedback" },
                            { step: 3, title: "Engage with Investors" }
                        ].map((item) => (
                            <div key={item.step} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
                                    {item.step}
                                </div>
                                <p className="font-bold text-gray-900">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-10 border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                    <div className="flex items-start gap-5">
                        <div className="mt-1 p-2 bg-red-50 rounded-lg">
                            <ExclamationTriangleIcon className="w-7 h-7 text-red-500" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Why Startups Fail</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Investors value consistency and transparency. When updates only appear at "wow" moments,
                                it creates distance rather than confidence. By the time a company urgently needs capital,
                                investors hesitate—not because the vision isn't exciting, but because the relationship
                                hasn't been built. Regular, honest monthly updates turn progress into trust, and trust
                                into continued support.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 rounded-l-2xl" />
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Create Update
                </Link>
            </div>

            {isOverdue && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full border border-orange-100 shadow-sm text-orange-500">
                                <ClockIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-lg font-bold text-gray-900">Time for Your Monthly Update!</h2>
                                    <span className="px-2.5 py-0.5 bg-orange-200 text-orange-800 text-xs font-bold rounded-full">
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
                            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors shadow-sm whitespace-nowrap"
                        >
                            Create Update Now
                        </Link>
                    </div>
                </div>
            )}

            {/* All update cards — current expanded, past collapsed */}
            <div className="space-y-3">
                {updates.map((update) => (
                    <UpdateCard key={update.id} update={update} isCurrent={update.isCurrent} />
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
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
                    <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors hover:bg-blue-50">
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
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
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
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-black text-gray-400">
                                    {update.companyName[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{update.companyName}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{update.founderName}</p>
                                    <p className="text-xs text-orange-600 font-bold mt-1 flex items-center gap-1">
                                        <LockClosedIcon className="w-3 h-3" />
                                        Update History (Premium Only)
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                                <CalendarIcon className="w-4 h-4" />
                                {format(new Date(update.date), "MMMM yyyy")}
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <MetricCard label="Revenue" value={update.metrics.revenue} icon={CurrencyDollarIcon} colorClass="bg-green-50/50 border-green-100" />
                                <MetricCard label="Growth" value={update.metrics.growth} icon={ChartBarIcon} colorClass="bg-blue-50/50 border-blue-100" />
                                <MetricCard label="Users" value={update.metrics.users} icon={UserGroupIcon} colorClass="bg-purple-50/50 border-purple-100" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5 text-yellow-500" />
                                    Highlights
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">{update.highlights}</p>
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
    const { user, updates, portfolioUpdates } = useLoaderData<typeof loader>();
    if (!user) return null;

    if (user.role === 'investor') {
        return <InvestorDashboard portfolioUpdates={portfolioUpdates} />;
    }

    return <FounderDashboard user={user} updates={updates} />;
}
