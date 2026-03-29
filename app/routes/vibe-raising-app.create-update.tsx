import { Form, Link, useActionData, useLocation, useNavigate, useNavigation, useLoaderData, redirect } from "react-router";
import React, { useState, useCallback, useEffect } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import { getEnv } from "~/lib/env.server";
import {
    createVibeRaisingSubmittedCookie,
    getActiveVibeRaisingCompany,
    requireVibeRaisingFounder,
} from "~/lib/vibe-raising";
import {
    XMarkIcon,
    SparklesIcon,
    CloudArrowUpIcon,
    ChevronDownIcon,
    LightBulbIcon,
    QuestionMarkCircleIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    UsersIcon,
    FireIcon,
    ArrowRightIcon,
    BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import { clsx } from "clsx";
import DraftFromEmailWizard from "~/components/DraftFromEmailWizard";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);

    // Require company registration before creating updates
    if (!user.companyRegistered) {
        throw redirect("/vibe-raising/company-setup");
    }

    // Check for edit mode
    const url = new URL(request.url);
    const editId = url.searchParams.get("edit");
    const resumeEmailDrafting =
        url.searchParams.get("email_draft") === "1" ||
        url.searchParams.get("draft_from_email") === "1";

    let existingData = null;
    if (editId) {
        // Mock existing data (matching the Test update on dashboard)
        existingData = {
            month: "January",
            year: 2026,
            revenue: "127500",
            growth: "18",
            activeUsers: "3420",
            highlights: "Closed 3 new enterprise deals with Fortune 500 companies totaling $75K ARR. Launched new dashboard feature which increased user engagement by 32%. Featured in TechCrunch - drove 1,200+ signups. Team grew to 8 people with new Head of Sales joining.",
            challenges: "Customer onboarding time is averaging 14 days vs target of 7 days. Need to streamline our implementation process. CAC increased to $850 this month due to increased competition in paid channels.",
            asks: "Looking for introductions to VP of Customer Success at B2B SaaS companies to help optimize our onboarding process. Would appreciate feedback on our pricing strategy as we move upmarket."
        };
    }

    return {
        user,
        existingData,
        isEdit: !!editId,
        backendBaseUrl: String(env.BACKEND_BASE_URL || "http://localhost:8000"),
        resumeEmailDrafting,
    };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const formData = await request.formData();
    const intent = formData.get("intent");
    const updates = Object.fromEntries(formData);

    if (intent === "review") {
        // Mock AI analysis
        return {
            step: "feedback",
            data: updates,
            feedback: {
                grade: "A+",
                strengths: [
                    "Detailed highlights show clear progress",
                    "Includes quantifiable metrics and data",
                    "Transparent about challenges facing the business"
                ],
                improvements: [
                    "Consider adding comparison to previous month",
                    "Include customer testimonials or feedback"
                ],
                proTip: "Investors appreciate transparency. Don't hide challenges - instead, show how you're actively addressing them. Specific asks get better responses than vague requests."
            }
        };
    }

    if (intent === "publish") {
        console.log("Publishing update:", updates);
        const company = getActiveVibeRaisingCompany(user);

        if (!company) {
            throw redirect("/vibe-raising/company-setup");
        }

        return redirect("/vibe-raising", {
            headers: {
                "Set-Cookie": createVibeRaisingSubmittedCookie(company.id)
            }
        });
    }

    return null;
}

// ─── Metric Options ──────────────────────────────────────────────
interface MetricOption {
    key: string;
    label: string;
    placeholder: string;
    prefix?: string;
    icon: React.ReactNode;
}

const METRIC_OPTIONS: MetricOption[] = [
    { key: "revenue", label: "Revenue", placeholder: "50,000", prefix: "$", icon: <CurrencyDollarIcon className="w-4 h-4 text-gray-400" /> },
    { key: "activeUsers", label: "Active Users", placeholder: "1,500", icon: <UsersIcon className="w-4 h-4 text-gray-400" /> },
    { key: "mrr", label: "MRR", placeholder: "10,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" /> },
    { key: "burnRate", label: "Burn Rate", placeholder: "20,000", prefix: "$", icon: <FireIcon className="w-4 h-4 text-gray-400" /> },
    { key: "runway", label: "Runway", placeholder: "18 months", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" /> },
];

// Hint suggestions per section, cycled through as user adds points
const SECTION_HINTS: Record<string, string[]> = {
    highlights: [
        "e.g. Closed 3 new enterprise deals worth $50K ARR.",
        "e.g. Launched v2.0 with 5 new features.",
        "e.g. Featured in TechCrunch, drove 1,200 signups.",
        "e.g. Hired Head of Sales from a top SaaS company.",
        "e.g. Reached 1,000 active users milestone.",
    ],
    challenges: [
        "e.g. Customer onboarding taking 14 days vs 7 day target.",
        "e.g. CAC increased to $850 due to paid channel competition.",
        "e.g. Engineering hiring pipeline slower than expected.",
        "e.g. Churn rate increased from 3% to 5% this month.",
        "e.g. Struggling to close enterprise deals over $50K.",
    ],
    asks: [
        "e.g. Intros to VP of Customer Success at B2B SaaS companies.",
        "e.g. Feedback on our pricing strategy for enterprise tier.",
        "e.g. Referrals for senior full-stack engineers.",
        "e.g. Warm intro to procurement leads at mid-market firms.",
        "e.g. Advice on expanding into the US market.",
    ],
};

// Collapsible Helper Component
interface SectionWithExampleProps {
    label: string;
    name: string;
    placeholder: string;
    rows?: number;
    icon: any;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}

function SectionWithExample({
    label,
    name,
    placeholder,
    icon: Icon,
    value,
    onChange,
}: SectionWithExampleProps) {
    // Split value into bullet items (by sentence-ending period or newlines)
    const items = (value || "").split(/(?<=\.)\s+/).filter(s => s.trim());
    if (items.length === 0) items.push("");

    const hints = SECTION_HINTS[name] || [];

    const updateItem = (index: number, text: string) => {
        const updated = [...items];
        updated[index] = text;
        onChange?.(updated.filter(s => s.trim()).join(" "));
    };

    const addItem = () => {
        const trimmed = (value || "").trim();
        const base = trimmed && !trimmed.endsWith(".") ? trimmed + "." : trimmed;
        // Add empty item — placeholder hint will guide the user
        onChange?.(base + (base ? " " : "") + ".");
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        onChange?.(updated.filter(s => s.trim()).join(" "));
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            </div>
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={value || ""} />
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="mt-2.5 text-gray-400 text-sm select-none flex-shrink-0">•</span>
                        <input
                            type="text"
                            value={item === "." ? "" : item}
                            onChange={(e) => updateItem(i, e.target.value)}
                            onFocus={() => { if (item === ".") updateItem(i, ""); }}
                            placeholder={hints[i % hints.length] || placeholder}
                            className="flex-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 placeholder:italic"
                        />
                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="mt-1.5 p-1 text-gray-300 hover:text-red-400 transition-colors"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addItem}
                className="mt-2 flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700"
            >
                <span className="text-lg leading-none">+</span>
                Add point
            </button>
        </div>
    );
}

// Bullet-point input for past month cards
function BulletInput({ value, onChange, placeholder, section }: { value: string; onChange: (v: string) => void; placeholder?: string; section?: string }) {
    const items = value.split(/(?<=\.)\s+/).filter(s => s.trim());
    if (items.length === 0) items.push("");

    const hints = section ? (SECTION_HINTS[section] || []) : [];

    const update = (i: number, text: string) => {
        const updated = [...items];
        updated[i] = text;
        onChange(updated.filter(s => s.trim()).join(" "));
    };
    const remove = (i: number) => onChange(items.filter((_, j) => j !== i).filter(s => s.trim()).join(" "));
    const add = () => {
        const trimmed = value.trim();
        const base = trimmed && !trimmed.endsWith(".") ? trimmed + "." : trimmed;
        onChange(base + (base ? " " : "") + ".");
    };

    return (
        <div className="space-y-1.5">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs select-none">•</span>
                    <input
                        type="text"
                        value={item === "." ? "" : item}
                        onChange={(e) => update(i, e.target.value)}
                        onFocus={() => { if (item === ".") update(i, ""); }}
                        placeholder={hints[i % hints.length] || placeholder || "Add a point..."}
                        className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-md focus:ring-gray-400 focus:border-gray-400 bg-gray-50 text-gray-900 placeholder:text-gray-400 placeholder:italic"
                    />
                    {items.length > 1 && (
                        <button type="button" onClick={() => remove(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className="text-[11px] text-blue-600 font-medium hover:text-blue-700 flex items-center gap-0.5">
                <span className="text-sm leading-none">+</span> Add point
            </button>
        </div>
    );
}

// Collapsible feedback item for rating sidebar
function CollapsibleFeedback({ icon, headline, color, children }: { icon: React.ReactNode; headline: string; color: "green" | "orange" | "blue"; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const colors = {
        green: { bg: "bg-green-50", border: "border-green-100", text: "text-green-700", hoverBg: "hover:bg-green-50/80" },
        orange: { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-700", hoverBg: "hover:bg-orange-50/80" },
        blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", hoverBg: "hover:bg-blue-50/80" },
    }[color];
    return (
        <div className={clsx("rounded-xl border overflow-hidden", colors.border, colors.bg)}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={clsx("w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors", colors.text, colors.hoverBg)}
            >
                {icon}
                <span className="text-xs font-semibold flex-1">{headline}</span>
                <ChevronDownIcon className={clsx("w-3.5 h-3.5 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <div className="px-3 pb-3">
                    {children}
                </div>
            )}
        </div>
    );
}

// Collapsible past month card for investor preview
function PastMonthPreviewCard({ pm }: { pm: { month: string; highlights: string; challenges: string; asks: string; metrics: Record<string, string> } }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-gray-700">{pm.month}</h4>
                    {!open && Object.keys(pm.metrics).length > 0 && (
                        <span className="flex items-center gap-2 text-xs text-gray-400">
                            {METRIC_OPTIONS.filter(m => m.key in pm.metrics).map(m => (
                                <span key={m.key} className="whitespace-nowrap">{m.label}: {m.prefix || ""}{pm.metrics[m.key]}</span>
                            ))}
                        </span>
                    )}
                </div>
                <ChevronDownIcon className={clsx("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <>
                    {/* Metrics — square boxes (read-only) */}
                    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                        <div className="grid grid-cols-5 gap-2">
                            {METRIC_OPTIONS.map(m => {
                                const val = pm.metrics[m.key];
                                return (
                                    <div
                                        key={m.key}
                                        className={clsx(
                                            "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-1.5 transition-all",
                                            val
                                                ? "border-blue-400 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                                                : "border-gray-200 bg-gray-50 opacity-40"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-5 h-5 rounded-full flex items-center justify-center mb-1",
                                            val ? "bg-blue-100" : "bg-white"
                                        )}>
                                            {m.icon}
                                        </div>
                                        <p className={clsx(
                                            "text-xs font-extrabold leading-tight",
                                            val ? "text-gray-900" : "text-gray-300"
                                        )}>
                                            {val ? `${m.prefix || ""}${val}` : "—"}
                                        </p>
                                        <p className={clsx(
                                            "text-[8px] font-semibold uppercase tracking-wide mt-0.5",
                                            val ? "text-gray-600" : "text-gray-400"
                                        )}>{m.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="px-5 py-4 space-y-3 border-t border-gray-100">
                        {pm.highlights && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <SparklesIcon className="w-3 h-3 text-purple-500" />
                                    Key Highlights
                                </h5>
                                <BulletList text={pm.highlights} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.challenges && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <ExclamationCircleIcon className="w-3 h-3 text-orange-500" />
                                    Challenges
                                </h5>
                                <BulletList text={pm.challenges} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.asks && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <QuestionMarkCircleIcon className="w-3 h-3 text-blue-500" />
                                    Ask from Investors
                                </h5>
                                <BulletList text={pm.asks} className="text-xs text-gray-600" />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Bullet list helper ─────────────────────────────────────────────
function BulletList({ text, className = "text-sm text-gray-700" }: { text: string; className?: string }) {
    const items = text.split(/(?<=\.)\s+/).filter(s => s.trim());
    return (
        <ul className={clsx("space-y-1 list-disc list-inside", className)}>
            {items.map((item, i) => (
                <li key={i}>{item.trim()}</li>
            ))}
        </ul>
    );
}

// ─── Revenue Chart Component ────────────────────────────────────────
interface ChartData {
    month: string;
    value: number;
    isCurrent?: boolean;
    isSelected?: boolean;
}

function parseRevenue(raw: string): number {
    return parseInt(String(raw).replace(/[$,\s]/g, "")) || 0;
}

function formatCompact(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
}

function formatUsers(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return `${n}`;
}

function parseUsers(raw: string): number {
    return parseInt(String(raw).replace(/[,\s]/g, "")) || 0;
}

// Pick bar color based on MoM growth rate — catchy colors for high growth
function getBarColor(rate: number | null) {
    if (rate === null) return { bar: "bg-slate-300", hover: "group-hover:bg-slate-400", selected: "bg-slate-400", label: "text-slate-400" };
    if (rate >= 20)    return { bar: "bg-lime-400", hover: "group-hover:bg-lime-500", selected: "bg-lime-500", label: "text-lime-600" };
    if (rate > 0)      return { bar: "bg-emerald-400", hover: "group-hover:bg-emerald-500", selected: "bg-emerald-500", label: "text-emerald-500" };
    if (rate === 0)    return { bar: "bg-amber-300", hover: "group-hover:bg-amber-400", selected: "bg-amber-400", label: "text-amber-500" };
    return               { bar: "bg-rose-300", hover: "group-hover:bg-rose-400", selected: "bg-rose-400", label: "text-rose-500" };
}

function GrowthChart({
    data,
    onSelect,
    title = "Revenue",
    subtitle = "Monthly revenue with MoM growth",
    formatter = formatCompact,
}: {
    data: ChartData[];
    onSelect: (index: number) => void;
    title?: string;
    subtitle?: string;
    formatter?: (n: number) => string;
}) {
    const max = Math.max(...data.map(d => d.value), 1);

    // Auto-calculate MoM rates
    const momRates = data.map((d, i) => {
        if (i === 0) return null;
        const prev = data[i - 1].value;
        if (prev === 0) return null;
        return ((d.value - prev) / prev) * 100;
    });

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                </div>
            </div>

            <div className="space-y-2.5">
                {data.map((d, i) => {
                    const width = max > 0 ? (d.value / max) * 100 : 0;
                    const rate = momRates[i];
                    const color = d.isCurrent ? null : getBarColor(rate);
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => onSelect(i)}
                            className={clsx(
                                "w-full flex items-center gap-3 group outline-none rounded-lg px-1 py-1 -mx-1 transition-colors",
                                d.isSelected && !d.isCurrent && "bg-gray-50"
                            )}
                        >
                            {/* Month label */}
                            <span className={clsx(
                                "w-10 text-[11px] font-bold uppercase tracking-tight text-right flex-shrink-0",
                                d.isCurrent ? "text-blue-600" : color?.label || "text-gray-400"
                            )}>
                                {d.month.slice(0, 3)}
                            </span>

                            {/* Horizontal bar */}
                            <div className="flex-1 h-7 bg-gray-50 rounded-md overflow-hidden relative">
                                <div
                                    className={clsx(
                                        "h-full rounded-md transition-all duration-500 ease-out relative overflow-hidden",
                                        d.isCurrent
                                            ? "bg-blue-600 shadow-sm"
                                            : d.isSelected
                                                ? color?.selected
                                                : clsx(color?.bar, color?.hover)
                                    )}
                                    style={{ width: `${Math.max(width, 3)}%` }}
                                >
                                    {d.isCurrent && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full animate-[shimmer_2s_infinite]" />
                                    )}
                                </div>
                            </div>

                            {/* Value */}
                            <span className={clsx(
                                "w-16 text-right text-sm font-bold flex-shrink-0",
                                d.isCurrent ? "text-gray-900" : "text-gray-600"
                            )}>
                                {formatter(d.value)}
                            </span>

                            {/* MoM rate */}
                            <span className="w-14 text-right flex-shrink-0">
                                {rate === null ? (
                                    <span className="text-[10px] text-gray-300">—</span>
                                ) : (
                                    <span className={clsx(
                                        "text-xs font-bold",
                                        rate >= 20 ? "text-lime-600" : rate > 0 ? "text-green-600" : rate < 0 ? "text-red-500" : "text-gray-400"
                                    )}>
                                        {rate > 0 ? "+" : ""}{rate.toFixed(0)}%
                                    </span>
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function CreateUpdate() {
    const {
        user,
        existingData,
        isEdit,
        backendBaseUrl,
        resumeEmailDrafting,
    } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>() as any;
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [dismissedFeedback, setDismissedFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [draftSaved, setDraftSaved] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [hasDraft, setHasDraft] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem("vibe_draft");
    });

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback") setDismissedFeedback(false);
    }, [actionData]);

    const defaultData = actionData?.step === "feedback" ? (actionData.data as any) : (existingData || {});

    // State declarations
    const [isClientMounted, setIsClientMounted] = useState(false);
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const [highlights, setHighlights] = useState<string>(defaultData?.highlights || "");
    const [challenges, setChallenges] = useState<string>(defaultData?.challenges || "");
    const [asks, setAsks] = useState<string>(defaultData?.asks || "");
    const [pastMonthCards, setPastMonthCards] = useState<Array<{
        month: string;
        expanded: boolean;
        highlights: string;
        challenges: string;
        asks: string;
        metrics: Record<string, string>;
    }>>([]);
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const [selectedMonth, setSelectedMonth] = useState<string>(defaultData?.month || "February");
    const [selectedYear, setSelectedYear] = useState<number>(defaultData?.year || 2026);
    
    const [metricValues, setMetricValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        METRIC_OPTIONS.forEach(opt => {
            if (defaultData?.[opt.key]) {
                initial[opt.key] = defaultData[opt.key];
            }
        });
        return initial;
    });

    const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        METRIC_OPTIONS.forEach(opt => {
            if (defaultData?.[opt.key]) {
                initial.add(opt.key);
            }
        });
        if (initial.size === 0) initial.add("revenue");
        return initial;
    });
    const canGenerateDraftFromEmail = Boolean((user.domain || "").trim());

    const handleDraftComplete = (data: any) => {
        if (data.month) setSelectedMonth(data.month);
        if (data.year) setSelectedYear(data.year);
        setHighlights(data.highlights);
        setChallenges(data.challenges);
        setAsks(data.asks || "");
        setMetricValues(data.metrics || {});
        setPastMonthCards((data.pastMonths || []).map((pm: any) => ({
            ...pm,
            month: pm.month || "Unknown",
            highlights: pm.highlights || "",
            challenges: pm.challenges || "",
            asks: pm.asks || "",
            metrics: pm.metrics || {}
        })));
        
        const newMetrics = new Set<string>();
        Object.keys(data.metrics || {}).forEach(key => {
            if (data.metrics[key]) newMetrics.add(key);
        });
        setSelectedMetrics(newMetrics.size > 0 ? newMetrics : new Set(["revenue"]));
    };

    const clearEmailDraftingParams = useCallback(() => {
        const params = new URLSearchParams(location.search);
        let changed = false;

        ["gmail_connected", "draft_from_email", "email_draft"].forEach((key) => {
            if (params.has(key)) {
                params.delete(key);
                changed = true;
            }
        });

        if (!changed) return;

        const nextSearch = params.toString();
        navigate(
            `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}`,
            { replace: true },
        );
    }, [location.pathname, location.search, navigate]);

    const handleEmailWizardClose = useCallback(() => {
        setShowEmailWizard(false);
        if (resumeEmailDrafting) {
            clearEmailDraftingParams();
        }
    }, [clearEmailDraftingParams, resumeEmailDrafting]);

    const handleEmailDraftComplete = useCallback((data: any) => {
        handleDraftComplete(data);
        setShowEmailWizard(false);
        clearEmailDraftingParams();
    }, [clearEmailDraftingParams, handleDraftComplete]);

    useEffect(() => {
        setIsClientMounted(true);
    }, []);

    useEffect(() => {
        if (!isClientMounted) return;
        if (resumeEmailDrafting) {
            setShowEmailWizard(true);
        }
    }, [isClientMounted, resumeEmailDrafting]);

    const resumeDraft = () => {
        try {
            const raw = localStorage.getItem("vibe_draft");
            if (!raw) return;
            const draft = JSON.parse(raw);

            // Restore current month fields
            if (draft.month) setSelectedMonth(draft.month);
            if (draft.year) setSelectedYear(Number(draft.year));
            setHighlights(draft.highlights || "");
            setChallenges(draft.challenges || "");
            setAsks(draft.asks || "");

            // Restore current month metrics
            const metrics: Record<string, string> = {};
            METRIC_OPTIONS.forEach(opt => {
                if (draft[opt.key]) metrics[opt.key] = draft[opt.key];
            });
            setMetricValues(metrics);
            const newSelected = new Set<string>(Object.keys(metrics).filter(k => metrics[k]));
            if (newSelected.size === 0) newSelected.add("revenue");
            setSelectedMetrics(newSelected);

            // Reconstruct past month cards from flat pastMonth_N_* fields
            const restoredPastMonths: Array<{
                month: string; expanded: boolean;
                highlights: string; challenges: string; asks: string;
                metrics: Record<string, string>;
            }> = [];
            for (let i = 0; draft[`pastMonth_${i}_month`]; i++) {
                const pmMetrics: Record<string, string> = {};
                METRIC_OPTIONS.forEach(opt => {
                    const val = draft[`pastMonth_${i}_${opt.key}`];
                    if (val) pmMetrics[opt.key] = val;
                });
                restoredPastMonths.push({
                    month: draft[`pastMonth_${i}_month`] || "Unknown",
                    expanded: false,
                    highlights: draft[`pastMonth_${i}_highlights`] || "",
                    challenges: draft[`pastMonth_${i}_challenges`] || "",
                    asks: draft[`pastMonth_${i}_asks`] || "",
                    metrics: pmMetrics,
                });
            }
            if (restoredPastMonths.length > 0) {
                setPastMonthCards(restoredPastMonths);
            }

            setHasDraft(false);
        } catch (e) {
            console.error("Failed to resume draft", e);
        }
    };

    const dismissDraft = () => {
        localStorage.removeItem("vibe_draft");
        setHasDraft(false);
    };

    const toggleMetric = (key: string) => {
        setSelectedMetrics(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                if (next.size > 1) next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const updatePastMonthField = (index: number, field: string, value: string) => {
        setPastMonthCards(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
    };

    const updatePastMonthMetric = (index: number, key: string, value: string) => {
        setPastMonthCards(prev => prev.map((c, i) => i === index ? { ...c, metrics: { ...c.metrics, [key]: value } } : c));
    };

    // Prepare chart data — revenue bars with auto-calculated MoM
    const chartData: ChartData[] = [
        ...pastMonthCards.map((card, i) => ({
            month: card.month,
            value: parseRevenue(card.metrics.revenue || "0"),
            isSelected: expandedCards.has(i)
        })),
        {
            month: selectedMonth,
            value: parseRevenue(metricValues.revenue || "0"),
            isCurrent: true
        }
    ];

    // Active users chart data
    const activeUsersChartData: ChartData[] = [
        ...pastMonthCards.map((card, i) => ({
            month: card.month,
            value: parseUsers(card.metrics.activeUsers || "0"),
            isSelected: expandedCards.has(i)
        })),
        {
            month: selectedMonth,
            value: parseUsers(metricValues.activeUsers || "0"),
            isCurrent: true
        }
    ];

    // Chart click: always expand + scroll
    const expandCardFromChart = (index: number) => {
        if (index === pastMonthCards.length) {
            const el = document.getElementById("current-month-card");
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setExpandedCards(prev => {
            const next = new Set(prev);
            next.add(index);
            return next;
        });

        setTimeout(() => {
            const el = document.getElementById(`past-month-${index}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    // Card header click: toggle expand/collapse
    const toggleCardExpand = (index: number) => {
        setExpandedCards(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    // Dropzone setup
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        const video = acceptedFiles.find(f => f.type.startsWith("video/"));
        if (video) {
            setVideoPreviewUrl(URL.createObjectURL(video));
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: 20 * 1024 * 1024, // 20MB
        accept: {
            'image/*': [],
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/vnd.ms-excel': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            'video/quicktime': ['.mov'],
            'video/mp4': [],
            'audio/*': []
        }
    });

    // 1. Feedback View — preview-dominant with rating sidebar
    if (actionData?.step === "feedback" && !dismissedFeedback) {
        const { feedback, data } = actionData;

        const handleSaveDraft = () => {
            try {
                localStorage.setItem("vibe_draft", JSON.stringify(data));
                setDraftSaved(true);
                setTimeout(() => setDraftSaved(false), 2500);
            } catch (e) {
                console.error("Failed to save draft", e);
            }
        };

        return (
            <div className="max-w-5xl mx-auto pb-12">
                {/* Header — back arrow top-left, title center-left, X on right */}
                <div className="flex items-center gap-3 py-6 mb-4">
                    <button
                        onClick={() => setDismissedFeedback(true)}
                        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors flex-shrink-0"
                        aria-label="Back to edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
                        </svg>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900">Review Your Update</h1>
                        <p className="text-sm text-gray-400 mt-0.5">Preview exactly what investors will see</p>
                    </div>
                    <button onClick={() => window.history.back()} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Main layout: Preview + thin rating bar */}
                <div className="flex gap-4 items-start">

                    {/* PREVIEW — dominant, takes most of the width */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Hero banner — video or gradient */}
                            {videoPreviewUrl ? (
                                <div className="relative w-full aspect-video bg-black">
                                    <video
                                        src={videoPreviewUrl}
                                        controls
                                        className="w-full h-full object-contain"
                                        poster=""
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full h-32 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400" />
                                    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 200">
                                        <circle cx="120" cy="80" r="100" fill="white" />
                                        <circle cx="650" cy="140" r="70" fill="white" />
                                        <circle cx="400" cy="30" r="50" fill="white" />
                                        <rect x="250" y="100" width="180" height="180" rx="40" fill="white" transform="rotate(-15 340 190)" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-end px-6 pb-4">
                                        <div className="flex items-center gap-3">
                                            {user.domain ? (
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${user.domain}&sz=64`}
                                                    alt=""
                                                    className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-white">{user.companyName.charAt(0)}</span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-bold text-sm drop-shadow-sm">{user.companyName}</p>
                                                <p className="text-white/70 text-xs">Investor Update</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preview header */}
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {(data as any)?.month} {(data as any)?.year} Update
                                    </h3>
                                    <span className="text-xs text-gray-400">{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
                                </div>
                            </div>

                            {/* Metrics — square boxes */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <div className="grid grid-cols-5 gap-3">
                                    {METRIC_OPTIONS.map(m => {
                                        const val = (data as any)?.[m.key];
                                        return (
                                            <div
                                                key={m.key}
                                                className={clsx(
                                                    "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 transition-all",
                                                    val
                                                        ? "border-blue-400 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                                                        : "border-gray-200 bg-gray-50 opacity-40"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                    val ? "bg-blue-100" : "bg-white"
                                                )}>
                                                    {m.icon}
                                                </div>
                                                <p className={clsx(
                                                    "text-base font-extrabold leading-tight",
                                                    val ? "text-gray-900" : "text-gray-300"
                                                )}>
                                                    {val ? `${m.prefix || ""}${val}` : "—"}
                                                </p>
                                                <p className={clsx(
                                                    "text-[10px] font-semibold uppercase tracking-wide mt-1",
                                                    val ? "text-gray-600" : "text-gray-400"
                                                )}>{m.label}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="px-6 py-5 space-y-5">
                                {(data as any)?.highlights && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <SparklesIcon className="w-3.5 h-3.5 text-purple-500" />
                                            Key Highlights
                                        </h4>
                                        <BulletList text={(data as any).highlights} />
                                    </div>
                                )}
                                {(data as any)?.challenges && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <ExclamationCircleIcon className="w-3.5 h-3.5 text-orange-500" />
                                            Challenges
                                        </h4>
                                        <BulletList text={(data as any).challenges} />
                                    </div>
                                )}
                                {(data as any)?.asks && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-blue-500" />
                                            Ask from Investors
                                        </h4>
                                        <BulletList text={(data as any).asks} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Revenue + Active Users charts + Past month previews */}
                        {(() => {
                            const d = data as any;
                            const pastMonths: Array<{ month: string; highlights: string; challenges: string; asks: string; metrics: Record<string, string> }> = [];
                            for (let i = 0; d?.[`pastMonth_${i}_month`]; i++) {
                                const pm: any = { month: d[`pastMonth_${i}_month`], highlights: d[`pastMonth_${i}_highlights`] || "", challenges: d[`pastMonth_${i}_challenges`] || "", asks: d[`pastMonth_${i}_asks`] || "", metrics: {} };
                                for (const m of METRIC_OPTIONS) {
                                    if (d[`pastMonth_${i}_${m.key}`]) pm.metrics[m.key] = d[`pastMonth_${i}_${m.key}`];
                                }
                                pastMonths.push(pm);
                            }

                            // Build revenue chart data
                            const reviewChartData: ChartData[] = [
                                ...pastMonths.map(pm => ({
                                    month: pm.month,
                                    value: parseRevenue(pm.metrics.revenue || "0"),
                                })),
                                {
                                    month: d?.month || selectedMonth,
                                    value: parseRevenue(d?.revenue || "0"),
                                    isCurrent: true,
                                }
                            ];

                            // Build active users chart data
                            const reviewActiveUsersChartData: ChartData[] = [
                                ...pastMonths.map(pm => ({
                                    month: pm.month,
                                    value: parseUsers(pm.metrics.activeUsers || "0"),
                                })),
                                {
                                    month: d?.month || selectedMonth,
                                    value: parseUsers(d?.activeUsers || "0"),
                                    isCurrent: true,
                                }
                            ];

                            const hasRevenue = reviewChartData.some(r => r.value > 0);
                            const hasActiveUsers = reviewActiveUsersChartData.some(r => r.value > 0);
                            const hasAnyChart = hasRevenue || hasActiveUsers;

                            return (
                                <>
                                    {hasAnyChart && (
                                        <div className={`mt-4 grid gap-4 ${hasRevenue && hasActiveUsers ? "grid-cols-2" : "grid-cols-1"}`}>
                                            {hasRevenue && (
                                                <GrowthChart
                                                    data={reviewChartData}
                                                    onSelect={() => {}}
                                                    title="Revenue"
                                                    subtitle="Monthly revenue with MoM growth"
                                                    formatter={formatCompact}
                                                />
                                            )}
                                            {hasActiveUsers && (
                                                <GrowthChart
                                                    data={reviewActiveUsersChartData}
                                                    onSelect={() => {}}
                                                    title="Active Users"
                                                    subtitle="Monthly active users with MoM growth"
                                                    formatter={formatUsers}
                                                />
                                            )}
                                        </div>
                                    )}
                                    {pastMonths.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Previous Updates</p>
                                            {pastMonths.map((pm, i) => (
                                                <PastMonthPreviewCard key={i} pm={pm} />
                                            ))}
                                        </div>
                                    )}
                                </>
                            );
                        })()}

                        {/* Your Audience Block */}
                        {(() => {
                            const d = data as any;
                            const text = [(d.highlights || ''), (d.challenges || ''), (d.asks || '')].join(" ").toLowerCase();
                            
                            const criteria = [];
                            if (text.includes("saas") || text.includes("software")) criteria.push("B2B SaaS");
                            if (text.includes("health") || text.includes("medtech") || text.includes("medical")) criteria.push("MedTech");
                            if (text.includes("agri") || text.includes("farm") || text.includes("agriculture")) criteria.push("AgTech");
                            if (text.includes("ai") || text.includes("machine learning") || text.includes("artificial intelligence")) criteria.push("AI/ML");
                            if (text.includes("enterprise") || text.includes("b2b") || text.includes("fortune 500")) criteria.push("Enterprise");
                            if (text.includes("fintech") || text.includes("finance") || text.includes("payment")) criteria.push("FinTech");
                            if (text.includes("consumer") || text.includes("b2c")) criteria.push("Consumer Tech");
                            if (criteria.length === 0) criteria.push("Sector Agnostic", "Early Stage");

                            const count = 18 + (criteria.length * 14);

                            return (
                                <div className="mt-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-5 shadow-sm">
                                    <h3 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                        <UsersIcon className="w-4 h-4 text-indigo-500" />
                                        Your Audience
                                    </h3>
                                    <p className="text-sm text-indigo-800/80 mb-3">
                                        We found <strong className="text-indigo-600 font-extrabold">{count} investors</strong> on Vibe Raising actively looking for updates matching your criteria:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {criteria.map(c => (
                                            <span key={c} className="px-2.5 py-1 bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg shadow-sm">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Action buttons — below preview */}
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                            >
                                {draftSaved ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Draft Saved!
                                    </>
                                ) : (
                                    <>Save as Draft</>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowConfirmPopup(true)}
                                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm transition-colors"
                            >
                                Publish and Send
                            </button>
                        </div>
                    </div>

                    {/* Pre-Publish Confirmation Popup */}
                    {showConfirmPopup && (() => {
                        const d = data as any;
                        const text = [(d.highlights || ''), (d.challenges || ''), (d.asks || '')].join(" ").toLowerCase();
                        
                        const criteria = [];
                        if (text.includes("saas") || text.includes("software")) criteria.push("B2B SaaS");
                        if (text.includes("health") || text.includes("medtech") || text.includes("medical")) criteria.push("MedTech");
                        if (text.includes("agri") || text.includes("farm") || text.includes("agriculture")) criteria.push("AgTech");
                        if (text.includes("ai") || text.includes("machine learning") || text.includes("artificial intelligence")) criteria.push("AI/ML");
                        if (text.includes("enterprise") || text.includes("b2b") || text.includes("fortune 500")) criteria.push("Enterprise");
                        if (text.includes("fintech") || text.includes("finance") || text.includes("payment")) criteria.push("FinTech");
                        if (text.includes("consumer") || text.includes("b2c")) criteria.push("Consumer Tech");
                        if (criteria.length === 0) criteria.push("Sector Agnostic", "Early Stage");

                        const count = 18 + (criteria.length * 14);

                        return (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
                                <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 text-center relative overflow-hidden animate-in fade-in zoom-in duration-300">
                                    <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Ready to send? 🚀</h2>
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                        Your update is about to go live on Vibe Raising. We will send it directly to <strong className="font-bold text-gray-900">{count} investors</strong> matching your criteria: {criteria.join(", ")}.
                                    </p>

                                    <Form 
                                        method="POST" 
                                        className="space-y-3"
                                        onSubmit={() => {
                                            localStorage.removeItem("vibe_draft");
                                        }}
                                    >
                                        <input type="hidden" name="intent" value="publish" />
                                        {Object.entries(data || {}).map(([key, value]) => (
                                            <input key={key} type="hidden" name={key} value={value as any} />
                                        ))}
                                        
                                        <button
                                            type="submit"
                                            className="w-full px-5 py-3 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-md transition-all active:scale-95"
                                        >
                                            Yes, Publish and Send
                                        </button>
                                        
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPopup(false)}
                                            className="w-full px-5 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                                        >
                                            Wait, go back
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        );
                    })()}

                    {/* RATING SIDEBAR — thin vertical bar on right */}
                    <div className="w-56 flex-shrink-0 sticky top-6 space-y-3">
                        {/* Company identity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center">
                            {user.domain ? (
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${user.domain}&sz=64`}
                                    alt={user.companyName}
                                    className="w-12 h-12 rounded-xl mb-2 bg-gray-50"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-xl mb-2 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                    <span className="text-lg font-bold text-purple-600">{user.companyName.charAt(0)}</span>
                                </div>
                            )}
                            <p className="text-sm font-bold text-gray-900">{user.companyName}</p>
                            {user.domain && (
                                <p className="text-[11px] text-gray-400 mt-0.5">{user.domain}</p>
                            )}
                        </div>

                        {/* Grade pill */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">AI Grade</p>
                            <div className="text-4xl font-bold text-green-600 leading-none">{feedback?.grade}</div>
                        </div>

                        {/* Strengths — collapsible */}
                        <CollapsibleFeedback
                            icon={<CheckCircleIcon className="w-3.5 h-3.5" />}
                            headline={`${feedback?.strengths.length} strengths found`}
                            color="green"
                        >
                            <ul className="space-y-1.5">
                                {feedback?.strengths.map((str: string, i: number) => (
                                    <li key={i} className="flex items-start gap-1.5 text-green-800 text-xs leading-relaxed">
                                        <span className="mt-1.5 w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                                        {str}
                                    </li>
                                ))}
                            </ul>
                        </CollapsibleFeedback>

                        {/* Improvements — collapsible */}
                        <CollapsibleFeedback
                            icon={<ExclamationTriangleIcon className="w-3.5 h-3.5" />}
                            headline={`${feedback?.improvements.length} areas to improve`}
                            color="orange"
                        >
                            <ul className="space-y-1.5">
                                {feedback?.improvements.map((imp: string, i: number) => (
                                    <li key={i} className="flex items-start gap-1.5 text-orange-800 text-xs leading-relaxed">
                                        <span className="mt-1.5 w-1 h-1 bg-orange-400 rounded-full flex-shrink-0" />
                                        {imp}
                                    </li>
                                ))}
                            </ul>
                        </CollapsibleFeedback>

                        {/* Pro Tip — collapsible */}
                        <CollapsibleFeedback
                            icon={<LightBulbIcon className="w-3.5 h-3.5" />}
                            headline="Pro tip from AI"
                            color="blue"
                        >
                            <p className="text-xs text-blue-800 leading-relaxed">{feedback?.proTip}</p>
                        </CollapsibleFeedback>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Create/Edit Form View
    return (
        <div className="max-w-3xl mx-auto pb-12">
            {/* Header */}
            <div className="sticky top-0 z-10 py-4 mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                    {isEdit ? "Edit Monthly Update" : "Create Monthly Update"}
                </h1>
                <Link to="/vibe-raising" className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="w-6 h-6" />
                </Link>
            </div>

            {/* Draft Resume Banner */}
            {hasDraft && (
                <div className="mb-5 flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3.5 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">You have a saved draft</p>
                        <p className="text-xs text-gray-500">Resume where you left off.</p>
                    </div>
                    <button
                        type="button"
                        onClick={resumeDraft}
                        className="px-4 py-1.5 text-sm font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                    >
                        Resume Draft
                    </button>
                    <button
                        type="button"
                        onClick={dismissDraft}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Dismiss"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            <Form method="POST" className="space-y-6">
                <input type="hidden" name="intent" value="review" />

                {/* Upload Section */}
                <div
                    {...getRootProps()}
                    className={clsx(
                        "relative border border-gray-100 rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center",
                        isDragActive ? "bg-blue-50/50 border-blue-200 scale-[1.01]" : "bg-white hover:bg-gray-50/50"
                    )}
                >
                    <input {...getInputProps()} />
                    
                    <div className="flex flex-col items-center max-w-sm">
                        <div className="w-12 h-12 text-gray-400 mb-4">
                            <CloudArrowUpIcon className="w-full h-full stroke-1" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Drag files here to upload
                        </h3>
                        
                        <p className="text-sm text-gray-400 font-medium mb-1">
                            Supported video files are MP4, MOV, AVI
                        </p>
                        
                        <p className="text-sm text-gray-400 mb-6">
                            Minimize processing time
                        </p>

                        <div className="flex items-center gap-3">
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRecording(!isRecording);
                                }}
                                className={clsx(
                                    "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm",
                                    isRecording 
                                        ? "bg-red-50 text-red-600 ring-2 ring-red-500/20 animate-pulse" 
                                        : "bg-red-50 text-red-600 hover:bg-red-100 active:scale-95"
                                )}
                            >
                                <span className={clsx(
                                    "w-2.5 h-2.5 rounded-full",
                                    isRecording ? "bg-red-600" : "bg-red-500"
                                )} />
                                {isRecording ? "Stop Recording" : "Record"}
                            </button>
                            
                            <button 
                                type="button"
                                className="px-6 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-gray-900 active:scale-95 transition-all shadow-sm"
                            >
                                Select file
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─── Draft from Email Banner ─── */}
                <button
                    type="button"
                    onClick={() => {
                        if (canGenerateDraftFromEmail) {
                            setShowEmailWizard(true);
                            return;
                        }
                        navigate("/vibe-raising/companies");
                    }}
                    className={clsx(
                        "w-full rounded-2xl border p-8 shadow-sm overflow-hidden relative text-left transition-all",
                        canGenerateDraftFromEmail
                            ? "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100 group hover:shadow-md hover:border-purple-200 cursor-pointer"
                            : "bg-gray-50 border-gray-200 cursor-pointer hover:border-gray-300",
                    )}
                >
                    <div className={clsx(
                        "absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 blur-3xl rounded-full",
                        canGenerateDraftFromEmail ? "bg-purple-200/20" : "bg-gray-300/20",
                    )} />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className={clsx(
                            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                            canGenerateDraftFromEmail ? "bg-purple-100 group-hover:bg-purple-200" : "bg-gray-200",
                        )}>
                            <SparklesIcon className={clsx("w-7 h-7", canGenerateDraftFromEmail ? "text-purple-600" : "text-gray-500")} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900">
                                Generate Draft from Email
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {canGenerateDraftFromEmail
                                    ? "Connect your inbox and let AI analyze recent emails to auto-fill metrics, highlights, and past months in seconds."
                                    : "Add a company domain first so Gmail emails can be matched to the right startup."}
                            </p>
                        </div>
                        <ArrowRightIcon className={clsx(
                            "w-5 h-5 transition-transform flex-shrink-0",
                            canGenerateDraftFromEmail ? "text-purple-400 group-hover:translate-x-1" : "text-gray-400",
                        )} />
                    </div>
                </button>

                {/* ─── Growth Charts ─── */}
                {pastMonthCards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GrowthChart
                            data={chartData}
                            onSelect={expandCardFromChart}
                            title="Revenue"
                            subtitle="Monthly revenue with MoM growth"
                            formatter={formatCompact}
                        />
                        <GrowthChart
                            data={activeUsersChartData}
                            onSelect={expandCardFromChart}
                            title="Active Users"
                            subtitle="Monthly active users with MoM growth"
                            formatter={formatUsers}
                        />
                    </div>
                )}

                {/* ─── Stacked Card Layout ─── */}
                {pastMonthCards.length > 0 && (
                    <div className="relative">
                        {/* Past month cards — grayed-out, peeking behind current */}
                        {pastMonthCards.map((card, index) => (
                            <div key={index} id={`past-month-${index}`} className="mb-3 scroll-mt-24">
                                {/* Collapsed: gray card strip peeking behind */}
                                <button
                                    type="button"
                                    onClick={() => toggleCardExpand(index)}
                                    className={clsx(
                                        "w-full text-left rounded-xl border transition-all",
                                        expandedCards.has(index)
                                            ? "border-gray-300 bg-white shadow-sm"
                                            : "border-gray-200 bg-gray-100/80 hover:bg-gray-100"
                                    )}
                                >
                                    <div className="flex items-center justify-between px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-sm font-bold text-gray-600">{card.month}</h4>
                                            {!expandedCards.has(index) && (
                                                <>
                                                    {Object.keys(card.metrics).length > 0 && (
                                                        <span className="flex items-center gap-2 text-xs text-gray-400">
                                                            {METRIC_OPTIONS.filter(m => m.key in card.metrics).map(m => (
                                                                <span key={m.key} className="whitespace-nowrap">{m.label}: {m.prefix || ""}{card.metrics[m.key]}</span>
                                                            ))}
                                                        </span>
                                                    )}
                                                    {Object.keys(card.metrics).length === 0 && (
                                                        <span className="text-xs text-gray-400 truncate max-w-[300px]">{(card.highlights || "").slice(0, 80)}...</span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400 font-medium bg-gray-200/60 px-2 py-0.5 rounded-full">Past</span>
                                            <ChevronDownIcon className={clsx("w-4 h-4 text-gray-400 transition-transform", expandedCards.has(index) && "rotate-180")} />
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded: full editable content */}
                                {expandedCards.has(index) && (
                                    <div className="border border-t-0 border-gray-300 rounded-b-xl bg-white px-5 py-4 space-y-3 -mt-1">
                                        {/* Metrics — square boxes */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Metrics</label>
                                            <div className="grid grid-cols-5 gap-2">
                                                {METRIC_OPTIONS.map(m => {
                                                    const active = m.key in card.metrics;
                                                    return (
                                                        <div
                                                            key={m.key}
                                                            onClick={() => {
                                                                if (active) {
                                                                    const updated = { ...card.metrics };
                                                                    delete updated[m.key];
                                                                    if (Object.keys(updated).length > 0) {
                                                                        setPastMonthCards(prev => prev.map((c, i) => i === index ? { ...c, metrics: updated } : c));
                                                                    }
                                                                } else {
                                                                    updatePastMonthMetric(index, m.key, "");
                                                                }
                                                            }}
                                                            className={clsx(
                                                                "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-1.5 cursor-pointer transition-all",
                                                                active
                                                                    ? "border-blue-400 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                                                                    : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                            )}
                                                        >
                                                            <div className={clsx(
                                                                "w-5 h-5 rounded-full flex items-center justify-center mb-1",
                                                                active ? "bg-blue-100" : "bg-white"
                                                            )}>
                                                                {m.icon}
                                                            </div>
                                                            {active ? (
                                                                <input
                                                                    type="text"
                                                                    value={card.metrics[m.key] || ""}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    onChange={(e) => updatePastMonthMetric(index, m.key, e.target.value)}
                                                                    placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                                    className="w-full text-xs font-extrabold text-gray-900 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none text-center py-0.5"
                                                                />
                                                            ) : (
                                                                <p className="text-xs font-extrabold text-gray-300">—</p>
                                                            )}
                                                            <p className={clsx(
                                                                "text-[8px] font-semibold uppercase tracking-wide mt-0.5",
                                                                active ? "text-gray-600" : "text-gray-400"
                                                            )}>{m.label}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Highlights</label>
                                            <BulletInput value={card.highlights} onChange={(v) => updatePastMonthField(index, "highlights", v)} placeholder="Key highlight..." section="highlights" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Challenges</label>
                                            <BulletInput value={card.challenges} onChange={(v) => updatePastMonthField(index, "challenges", v)} placeholder="Challenge faced..." section="challenges" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Asks</label>
                                            <BulletInput value={card.asks} onChange={(v) => updatePastMonthField(index, "asks", v)} placeholder="Ask from investors..." section="asks" />
                                        </div>
                                    </div>
                                )}

                                {/* Hidden inputs for included past months */}
                                <input type="hidden" name={`pastMonth_${index}_month`} value={card.month} />
                                <input type="hidden" name={`pastMonth_${index}_highlights`} value={card.highlights} />
                                <input type="hidden" name={`pastMonth_${index}_challenges`} value={card.challenges} />
                                <input type="hidden" name={`pastMonth_${index}_asks`} value={card.asks} />
                                {Object.entries(card.metrics).map(([key, value]) => (
                                    <input key={key} type="hidden" name={`pastMonth_${index}_${key}`} value={value} />
                                ))}
                            </div>
                        ))}

                        {/* Current month card — prominent, always visible */}
                        <div id="current-month-card" className="rounded-xl border-2 border-purple-300 bg-white p-6 space-y-5 shadow-md ring-1 ring-purple-100 scroll-mt-24">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-purple-600" />
                                    <h4 className="text-base font-bold text-gray-900">{selectedMonth} {selectedYear}</h4>
                                </div>
                                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">Current Update</span>
                            </div>

                            {/* Month/Year selector */}
                            <div className="flex items-center gap-2">
                                <select
                                    name="month"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="text-sm border-gray-200 rounded-md py-1.5 pl-2 pr-7 focus:ring-purple-500 focus:border-purple-500 border bg-gray-50"
                                >
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                </select>
                                <input
                                    type="number"
                                    name="year"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    className="w-20 text-sm border-gray-200 rounded-md py-1.5 px-2 focus:ring-purple-500 focus:border-purple-500 border bg-gray-50"
                                />
                            </div>

                            {/* Metrics — square boxes, click to activate */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                                </label>
                                <div className="grid grid-cols-5 gap-3">
                                    {METRIC_OPTIONS.map((m) => {
                                        const active = selectedMetrics.has(m.key);
                                        return (
                                            <div
                                                key={m.key}
                                                onClick={() => toggleMetric(m.key)}
                                                className={clsx(
                                                    "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                    active
                                                        ? "border-blue-400 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                                                        : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                    active ? "bg-blue-100" : "bg-white"
                                                )}>
                                                    {m.icon}
                                                </div>
                                                {active ? (
                                                    <input
                                                        type="text"
                                                        name={m.key}
                                                        value={metricValues[m.key] || ""}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => setMetricValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                                                        placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                        className="w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none text-center py-0.5"
                                                    />
                                                ) : (
                                                    <p className="text-base font-extrabold text-gray-300">—</p>
                                                )}
                                                <p className={clsx(
                                                    "text-[10px] font-semibold uppercase tracking-wide mt-1",
                                                    active ? "text-gray-600" : "text-gray-400"
                                                )}>{m.label}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Qualitative fields — auto-expanding, no scroll */}
                            <div className="space-y-4">
                                <SectionWithExample
                                    label="Key Highlights"
                                    name="highlights"
                                    value={highlights}
                                    onChange={setHighlights}
                                    rows={3}
                                    placeholder="What went well this month? Major wins, product launches, partnerships..."
                                    icon={SparklesIcon}
                                />
                                <SectionWithExample
                                    label="Challenges"
                                    name="challenges"
                                    value={challenges}
                                    onChange={setChallenges}
                                    rows={3}
                                    placeholder="What obstacles are you facing? Where do you need help?"
                                    icon={ExclamationCircleIcon}
                                />
                                <SectionWithExample
                                    label="Ask from Investors"
                                    name="asks"
                                    value={asks}
                                    onChange={setAsks}
                                    rows={3}
                                    placeholder="How can your investors help? Introductions, advice, specific expertise..."
                                    icon={QuestionMarkCircleIcon}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── Default Form (when no email draft) ─── */}
                {pastMonthCards.length === 0 && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
                        {/* Month/Year */}
                        <div className="flex items-center gap-3">
                            <select
                                name="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="text-sm border-gray-200 rounded-md py-1.5 pl-2 pr-7 focus:ring-blue-500 focus:border-blue-500 border bg-gray-50"
                            >
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                            </select>
                            <input
                                type="number"
                                name="year"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="w-20 text-sm border-gray-200 rounded-md py-1.5 px-2 focus:ring-blue-500 focus:border-blue-500 border bg-gray-50"
                            />
                        </div>

                        {/* Metrics — square boxes, click to activate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                            </label>
                            <div className="grid grid-cols-5 gap-3">
                                {METRIC_OPTIONS.map((m) => {
                                    const active = selectedMetrics.has(m.key);
                                    return (
                                        <div
                                            key={m.key}
                                            onClick={() => toggleMetric(m.key)}
                                            className={clsx(
                                                "rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                active
                                                    ? "border-blue-400 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                                                    : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                            )}
                                        >
                                            <div className={clsx(
                                                "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                active ? "bg-blue-100" : "bg-white"
                                            )}>
                                                {m.icon}
                                            </div>
                                            {active ? (
                                                <input
                                                    type="text"
                                                    name={m.key}
                                                    value={metricValues[m.key] || ""}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => setMetricValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                                                    placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                    className="w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none text-center py-0.5"
                                                />
                                            ) : (
                                                <p className="text-base font-extrabold text-gray-300">—</p>
                                            )}
                                            <p className={clsx(
                                                "text-[10px] font-semibold uppercase tracking-wide mt-1",
                                                active ? "text-gray-600" : "text-gray-400"
                                            )}>{m.label}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Qualitative Sections */}
                        <div className="space-y-5">
                            <SectionWithExample
                                label="Key Highlights"
                                name="highlights"
                                value={highlights}
                                onChange={setHighlights}
                                placeholder="What went well this month? Major wins, product launches, partnerships..."
                                icon={SparklesIcon}
                            />
                            <SectionWithExample
                                label="Challenges"
                                name="challenges"
                                value={challenges}
                                onChange={setChallenges}
                                placeholder="What obstacles are you facing? Where do you need help?"
                                icon={ExclamationCircleIcon}
                            />
                            <SectionWithExample
                                label="Ask from Investors"
                                name="asks"
                                value={asks}
                                onChange={setAsks}
                                placeholder="How can your investors help? Introductions, advice, specific expertise..."
                                icon={QuestionMarkCircleIcon}
                            />
                        </div>
                    </div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate("/vibe-raising")}
                        className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                    >
                        {isSubmitting ? "Reviewing..." : "Review"}
                    </button>
                </div>

            </Form>

            {isClientMounted ? (
                <DraftFromEmailWizard
                    isOpen={showEmailWizard}
                    onClose={handleEmailWizardClose}
                    onDraftComplete={handleEmailDraftComplete}
                    backendBaseUrl={backendBaseUrl}
                    companyDomain={user.domain}
                    resumeAfterGoogleAuth={resumeEmailDrafting}
                />
            ) : null}
        </div>
    );
}
