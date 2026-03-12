import { Form, Link, useActionData, useNavigate, useNavigation, useLoaderData, redirect } from "react-router";
import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import { requireFounder } from "~/lib/vibe-raising-session";
import {
    XMarkIcon,
    SparklesIcon,
    CloudArrowUpIcon,
    VideoCameraIcon,
    DocumentTextIcon,
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
    ArrowTrendingUpIcon,
    BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import { clsx } from "clsx";
import DraftFromEmailWizard, { type DraftedContent } from "~/components/DraftFromEmailWizard";

export async function loader({ request }: Route.LoaderArgs) {
    const user = requireFounder(request);

    // Check for edit mode
    const url = new URL(request.url);
    const editId = url.searchParams.get("edit");

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

    return { user, existingData, isEdit: !!editId };
}

export async function action({ request }: Route.ActionArgs) {
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
        return redirect("/vibe-raising", {
            headers: {
                "Set-Cookie": "vibe_raising_submitted=true; Path=/; Max-Age=3600; SameSite=Lax"
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
    { key: "growth", label: "Growth", placeholder: "25%", icon: <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400" /> },
    { key: "activeUsers", label: "Active Users", placeholder: "1,500", icon: <UsersIcon className="w-4 h-4 text-gray-400" /> },
    { key: "mrr", label: "MRR", placeholder: "10,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" /> },
    { key: "burnRate", label: "Burn Rate", placeholder: "20,000", prefix: "$", icon: <FireIcon className="w-4 h-4 text-gray-400" /> },
    { key: "runway", label: "Runway", placeholder: "18 months", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" /> },
];

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
    rows = 4,
    icon: Icon,
    defaultValue,
    value,
    onChange,
}: SectionWithExampleProps) {
    const [showExample, setShowExample] = useState(false);
    const isControlled = value !== undefined;
    const textareaRef = useAutoResize(value);

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            </div>
            <textarea
                ref={textareaRef}
                name={name}
                rows={rows}
                {...(isControlled
                    ? { value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value) }
                    : { defaultValue })}
                className="block w-full px-4 py-3 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 border resize-none mb-2 overflow-hidden"
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setShowExample(!showExample)}
                className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700"
            >
                <LightBulbIcon className="w-4 h-4" />
                {showExample ? "Hide Examples" : "Show Examples"}
                <ChevronDownIcon className={clsx("w-3 h-3 transition-transform", showExample && "rotate-180")} />
            </button>

            {showExample && (
                <div className="mt-2 p-3 bg-blue-50 text-sm text-blue-800 rounded-md border border-blue-100">
                    <strong>Example:</strong> "We grew revenue by 20% MoM thanks to the new enterprise tier launch..."
                </div>
            )}
        </div>
    );
}

// Auto-resize textarea for past month cards
function AutoTextarea({ value, onChange, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
    const ref = useAutoResize(value);
    return <textarea ref={ref} value={value} onChange={onChange} className={clsx(className, "overflow-hidden")} {...props} />;
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
                    {Object.keys(pm.metrics).length > 0 && (
                        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex flex-wrap gap-4">
                                {METRIC_OPTIONS.filter(m => m.key in pm.metrics).map(m => (
                                    <div key={m.key}>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{m.label}</p>
                                        <p className="text-sm font-bold text-gray-900 mt-0.5">{m.prefix || ""}{pm.metrics[m.key]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="px-5 py-4 space-y-3 border-t border-gray-100">
                        {pm.highlights && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <SparklesIcon className="w-3 h-3 text-purple-500" />
                                    Key Highlights
                                </h5>
                                <p className="text-xs text-gray-600 leading-relaxed">{pm.highlights}</p>
                            </div>
                        )}
                        {pm.challenges && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <ExclamationCircleIcon className="w-3 h-3 text-orange-500" />
                                    Challenges
                                </h5>
                                <p className="text-xs text-gray-600 leading-relaxed">{pm.challenges}</p>
                            </div>
                        )}
                        {pm.asks && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <QuestionMarkCircleIcon className="w-3 h-3 text-blue-500" />
                                    Ask from Investors
                                </h5>
                                <p className="text-xs text-gray-600 leading-relaxed">{pm.asks}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default function CreateUpdate() {
    const { existingData, isEdit } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [dismissedFeedback, setDismissedFeedback] = useState(false);

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback") setDismissedFeedback(false);
    }, [actionData]);

    // Maintain form state if coming back from feedback?
    // If we have actionData.data (from a "Revise" intent), prefer that over existingData
    const defaultData = actionData?.step === "feedback" ? (actionData.data as any) : (existingData || {});

    // Business info & wizard state
    const [businessName, setBusinessName] = useState("");
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const [highlights, setHighlights] = useState<string>(defaultData?.highlights || "");
    const [challenges, setChallenges] = useState<string>(defaultData?.challenges || "");
    const [asks, setAsks] = useState<string>(defaultData?.asks || "");
    const [pastMonthCards, setPastMonthCards] = useState<Array<{
        month: string;
        included: boolean;
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
        for (const m of METRIC_OPTIONS) {
            if ((defaultData as any)?.[m.key]) initial[m.key] = (defaultData as any)[m.key];
        }
        return initial;
    });
    const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        if (defaultData?.revenue) initial.add("revenue");
        if (defaultData?.growth) initial.add("growth");
        if (defaultData?.activeUsers) initial.add("activeUsers");
        if (initial.size === 0) initial.add("revenue");
        return initial;
    });

    const toggleMetric = (key: string) => {
        setSelectedMetrics(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                if (next.size <= 1) return prev;
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const handleDraftComplete = (content: DraftedContent) => {
        setHighlights(content.highlights);
        setChallenges(content.challenges);
        setAsks(content.asks);
        setPastMonthCards(content.pastMonths.map(pm => ({
            ...pm,
            included: true,
            expanded: false,
            metrics: pm.metrics || {},
        })));
        setSelectedMonth("February");
        setSelectedYear(2026);

        // Auto-fill metrics if found in emails
        if (content.metrics) {
            const metricKeyMap: Record<string, string> = {
                revenue: "revenue",
                growth: "growth",
                activeUsers: "activeUsers",
                mrr: "mrr",
                burnRate: "burnRate",
                runway: "runway",
            };
            const newSelected = new Set<string>();
            const newValues: Record<string, string> = {};
            for (const [key, value] of Object.entries(content.metrics)) {
                const metricKey = metricKeyMap[key];
                if (metricKey && value) {
                    newSelected.add(metricKey);
                    newValues[metricKey] = value;
                }
            }
            if (newSelected.size > 0) {
                setSelectedMetrics(newSelected);
                setMetricValues(newValues);
            }
        }
    };

    const togglePastMonthIncluded = (index: number) => {
        setPastMonthCards(prev => prev.map((card, i) =>
            i === index ? { ...card, included: !card.included } : card
        ));
    };

    const updatePastMonthField = (index: number, field: "highlights" | "challenges" | "asks", value: string) => {
        setPastMonthCards(prev => prev.map((card, i) =>
            i === index ? { ...card, [field]: value } : card
        ));
    };

    const updatePastMonthMetric = (index: number, key: string, value: string) => {
        setPastMonthCards(prev => prev.map((card, i) =>
            i === index ? { ...card, metrics: { ...card.metrics, [key]: value } } : card
        ));
    };

    // Dropzone setup
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
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
        return (
            <div className="max-w-5xl mx-auto pb-12">
                {/* Header */}
                <div className="flex items-center justify-between py-6 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Review Your Update</h1>
                        <p className="text-sm text-gray-400 mt-1">Preview exactly what investors will see</p>
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
                            {/* Preview header */}
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {(data as any)?.month} {(data as any)?.year} Update
                                    </h3>
                                    <span className="text-xs text-gray-400">{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
                                </div>
                            </div>

                            {/* Metrics row */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex flex-wrap gap-6">
                                    {METRIC_OPTIONS.filter(m => (data as any)?.[m.key]).map(m => (
                                        <div key={m.key}>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{m.label}</p>
                                            <p className="text-base font-bold text-gray-900 mt-0.5">
                                                {m.prefix || ""}{(data as any)?.[m.key]}
                                            </p>
                                        </div>
                                    ))}
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
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{(data as any).highlights}</p>
                                    </div>
                                )}
                                {(data as any)?.challenges && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <ExclamationCircleIcon className="w-3.5 h-3.5 text-orange-500" />
                                            Challenges
                                        </h4>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{(data as any).challenges}</p>
                                    </div>
                                )}
                                {(data as any)?.asks && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-blue-500" />
                                            Ask from Investors
                                        </h4>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{(data as any).asks}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Past month previews — collapsible */}
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
                            if (pastMonths.length === 0) return null;
                            return (
                                <div className="mt-4 space-y-2">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Previous Updates</p>
                                    {pastMonths.map((pm, i) => (
                                        <PastMonthPreviewCard key={i} pm={pm} />
                                    ))}
                                </div>
                            );
                        })()}

                        {/* Action buttons — below preview */}
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setDismissedFeedback(true)}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
                            >
                                ← Revise
                            </button>
                            <Form method="POST" className="flex-1">
                                <input type="hidden" name="intent" value="publish" />
                                {Object.entries(data || {}).map(([key, value]) => (
                                    <input key={key} type="hidden" name={key} value={value as any} />
                                ))}
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm transition-colors"
                                >
                                    Publish Update
                                </button>
                            </Form>
                        </div>
                    </div>

                    {/* RATING SIDEBAR — thin vertical bar on right */}
                    <div className="w-56 flex-shrink-0 sticky top-6 space-y-3">
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

            <Form method="POST" className="space-y-6">
                <input type="hidden" name="intent" value="review" />

                {/* Upload Section */}
                <div
                    {...getRootProps()}
                    className={clsx(
                        "border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors",
                        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CloudArrowUpIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                                Upload files or record a video update
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <DocumentTextIcon className="w-3.5 h-3.5" />
                                    PDF, Docs, Excel
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs text-purple-600 font-medium">
                                    <VideoCameraIcon className="w-3.5 h-3.5" />
                                    Video (MP4, MOV)
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    MP3
                                </span>
                            </div>
                        </div>
                        <button type="button" className="px-3 py-1.5 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                            Browse Files
                        </button>
                    </div>
                </div>

                {/* AI Email Draft Banner */}
                <div className="bg-gradient-to-r from-purple-50 to-white p-1 rounded-xl shadow-sm border border-purple-100">
                    <div className="bg-white rounded-lg p-5 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white flex-shrink-0">
                                <SparklesIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Save Time with AI</h3>
                                <p className="text-sm text-gray-500">Enter your business details, then let AI scan your email and draft your update</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                id="draftBusinessName"
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="Your company name"
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowEmailWizard(true)}
                                disabled={!businessName.trim()}
                                className={clsx(
                                    "px-5 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap",
                                    businessName.trim()
                                        ? "bg-purple-600 text-white hover:bg-purple-700"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                )}
                            >
                                <SparklesIcon className="w-4 h-4" />
                                Draft from Email
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─── Timeline + Side-by-Side Cards ─── */}
                {pastMonthCards.length > 0 && (
                    <>
                        {/* Timeline */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-5">Your Update Journey</h3>
                            <div className="relative pl-6">
                                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />
                                {pastMonthCards.map((card, i) => (
                                    <div key={i} className="relative pb-5">
                                        <div className="absolute left-[-20px] top-1.5 w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{card.month}</p>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-1">{card.highlights}</p>
                                    </div>
                                ))}
                                <div className="relative">
                                    <div className="absolute left-[-22px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-purple-200 ring-4 ring-purple-50" />
                                    <p className="text-sm font-bold text-gray-900">{selectedMonth} {selectedYear} <span className="text-purple-600">— Current Update</span></p>
                                    <p className="text-xs text-gray-400 mt-1">Editing below</p>
                                </div>
                            </div>
                        </div>

                        {/* ─── Stacked Card Layout ─── */}
                        <div className="relative">
                            {/* Past month cards — grayed-out, peeking behind current */}
                            {pastMonthCards.map((card, index) => (
                                <div key={index} className="mb-3">
                                    {/* Collapsed: gray card strip peeking behind */}
                                    <button
                                        type="button"
                                        onClick={() => setExpandedCards(prev => { const next = new Set(prev); if (next.has(index)) next.delete(index); else next.add(index); return next; })}
                                        className={clsx(
                                            "w-full text-left rounded-xl border transition-all",
                                            expandedCards.has(index)
                                                ? "border-gray-300 bg-white shadow-sm"
                                                : "border-gray-200 bg-gray-100/80 hover:bg-gray-100",
                                            !card.included && "opacity-40"
                                        )}
                                    >
                                        <div className="flex items-center justify-between px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={card.included}
                                                    onChange={(e) => { e.stopPropagation(); togglePastMonthIncluded(index); }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                                                />
                                                <h4 className="text-sm font-bold text-gray-600">{card.month}</h4>
                                                {!expandedCards.has(index) && card.included && (
                                                    <>
                                                        {Object.keys(card.metrics).length > 0 && (
                                                            <span className="flex items-center gap-2 text-xs text-gray-400">
                                                                {METRIC_OPTIONS.filter(m => m.key in card.metrics).map(m => (
                                                                    <span key={m.key} className="whitespace-nowrap">{m.label}: {m.prefix || ""}{card.metrics[m.key]}</span>
                                                                ))}
                                                            </span>
                                                        )}
                                                        {Object.keys(card.metrics).length === 0 && (
                                                            <span className="text-xs text-gray-400 truncate max-w-[300px]">{card.highlights.slice(0, 80)}...</span>
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
                                    {expandedCards.has(index) && card.included && (
                                        <div className="border border-t-0 border-gray-300 rounded-b-xl bg-white px-5 py-4 space-y-3 -mt-1">
                                            {/* Metrics row */}
                                            {Object.keys(card.metrics).length > 0 && (
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Metrics</label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {METRIC_OPTIONS.filter(m => m.key in card.metrics).map(m => (
                                                            <div key={m.key}>
                                                                <label className="block text-[10px] font-medium text-gray-400 mb-0.5 flex items-center gap-1">
                                                                    {m.icon} {m.label}
                                                                </label>
                                                                <div className="relative">
                                                                    {m.prefix && (
                                                                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                                                            <span className="text-gray-400 text-xs">{m.prefix}</span>
                                                                        </div>
                                                                    )}
                                                                    <input
                                                                        type="text"
                                                                        value={card.metrics[m.key] || ""}
                                                                        onChange={(e) => updatePastMonthMetric(index, m.key, e.target.value)}
                                                                        placeholder={m.placeholder}
                                                                        className={clsx(
                                                                            "block w-full py-1.5 text-xs border-gray-200 rounded-md focus:ring-gray-400 focus:border-gray-400 border bg-gray-50",
                                                                            m.prefix ? "pl-5 pr-2" : "px-2"
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Highlights</label>
                                                <AutoTextarea
                                                    rows={2}
                                                    value={card.highlights}
                                                    onChange={(e) => updatePastMonthField(index, "highlights", e.target.value)}
                                                    className="block w-full px-3 py-2 text-xs border-gray-200 rounded-lg focus:ring-gray-400 focus:border-gray-400 border resize-none bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Challenges</label>
                                                <AutoTextarea
                                                    rows={2}
                                                    value={card.challenges}
                                                    onChange={(e) => updatePastMonthField(index, "challenges", e.target.value)}
                                                    className="block w-full px-3 py-2 text-xs border-gray-200 rounded-lg focus:ring-gray-400 focus:border-gray-400 border resize-none bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Asks</label>
                                                <AutoTextarea
                                                    rows={2}
                                                    value={card.asks}
                                                    onChange={(e) => updatePastMonthField(index, "asks", e.target.value)}
                                                    className="block w-full px-3 py-2 text-xs border-gray-200 rounded-lg focus:ring-gray-400 focus:border-gray-400 border resize-none bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Hidden inputs for included past months */}
                                    {card.included && (
                                        <>
                                            <input type="hidden" name={`pastMonth_${index}_month`} value={card.month} />
                                            <input type="hidden" name={`pastMonth_${index}_highlights`} value={card.highlights} />
                                            <input type="hidden" name={`pastMonth_${index}_challenges`} value={card.challenges} />
                                            <input type="hidden" name={`pastMonth_${index}_asks`} value={card.asks} />
                                            {Object.entries(card.metrics).map(([key, value]) => (
                                                <input key={key} type="hidden" name={`pastMonth_${index}_${key}`} value={value} />
                                            ))}
                                        </>
                                    )}
                                </div>
                            ))}

                            {/* Current month card — prominent, always visible */}
                            <div className="rounded-xl border-2 border-purple-300 bg-white p-6 space-y-5 shadow-md ring-1 ring-purple-100">
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

                                {/* Metrics picker */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Metrics <span className="text-gray-400 font-normal">(at least 1)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {METRIC_OPTIONS.map((m) => (
                                            <button
                                                key={m.key}
                                                type="button"
                                                onClick={() => toggleMetric(m.key)}
                                                className={clsx(
                                                    "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                                                    selectedMetrics.has(m.key)
                                                        ? "bg-blue-50 border-blue-300 text-blue-700"
                                                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                                                )}
                                            >
                                                {selectedMetrics.has(m.key) ? (
                                                    <CheckCircleIcon className="w-3.5 h-3.5 text-blue-500" />
                                                ) : (
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                                                )}
                                                {m.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={clsx(
                                        "grid gap-3",
                                        selectedMetrics.size <= 2 ? "grid-cols-2" : "grid-cols-3"
                                    )}>
                                        {METRIC_OPTIONS.filter(m => selectedMetrics.has(m.key)).map((m) => (
                                            <div key={m.key}>
                                                <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                                                    {m.icon} {m.label}
                                                </label>
                                                <div className="relative">
                                                    {m.prefix && (
                                                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                                            <span className="text-gray-500 text-xs">{m.prefix}</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="text"
                                                        name={m.key}
                                                        value={metricValues[m.key] || ""}
                                                        onChange={(e) => setMetricValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                                                        placeholder={m.placeholder}
                                                        className={clsx(
                                                            "block w-full py-2 text-sm border-gray-200 rounded-md focus:ring-purple-500 focus:border-purple-500 border",
                                                            m.prefix ? "pl-6 pr-2" : "px-2.5"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        ))}
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
                    </>
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

                        {/* Metrics Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Metrics <span className="text-gray-400 font-normal">(at least 1)</span>
                            </label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {METRIC_OPTIONS.map((m) => (
                                    <button
                                        key={m.key}
                                        type="button"
                                        onClick={() => toggleMetric(m.key)}
                                        className={clsx(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                                            selectedMetrics.has(m.key)
                                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                                        )}
                                    >
                                        {selectedMetrics.has(m.key) ? (
                                            <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                        )}
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            <div className={clsx(
                                "grid gap-4",
                                selectedMetrics.size === 1 ? "grid-cols-1 max-w-xs" :
                                selectedMetrics.size === 2 ? "grid-cols-2" :
                                "grid-cols-1 md:grid-cols-3"
                            )}>
                                {METRIC_OPTIONS.filter(m => selectedMetrics.has(m.key)).map((m) => (
                                    <div key={m.key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                            {m.icon} {m.label}
                                        </label>
                                        <div className="relative">
                                            {m.prefix && (
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">{m.prefix}</span>
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                name={m.key}
                                                value={metricValues[m.key] || ""}
                                                onChange={(e) => setMetricValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                                                placeholder={m.placeholder}
                                                className={clsx(
                                                    "block w-full py-2.5 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 border",
                                                    m.prefix ? "pl-7 pr-3" : "px-3"
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
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

            <DraftFromEmailWizard
                isOpen={showEmailWizard}
                onClose={() => setShowEmailWizard(false)}
                onDraftComplete={handleDraftComplete}
            />
        </div>
    );
}
