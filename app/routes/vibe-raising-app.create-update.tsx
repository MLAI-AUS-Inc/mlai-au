import { Form, Link, useActionData, useNavigate, useNavigation, useLoaderData, redirect } from "react-router";
import React, { useState, useCallback, useEffect, useRef } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import {
    requireFounder,
    getActiveCompany,
    createVibeRaisingPublishedUpdateCookie,
    createVibeRaisingSubmittedCookie,
    VIBE_RAISING_APP_PATH,
    VIBE_RAISING_COMPANY_SETUP_PATH,
    type PublishedVibeRaisingUpdate,
} from "~/lib/vibe-raising-session";
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
    BanknotesIcon,
    InformationCircleIcon,
    PlusIcon,
    LinkIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import { clsx } from "clsx";
import DraftFromEmailWizard from "~/components/DraftFromEmailWizard";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import {
    getVibeRaisingMonthTheme,
    parseVibeRaisingMonthYear,
    VibeRaisingDateTabs,
    VIBE_RAISING_MONTH_OPTIONS,
} from "~/components/VibeRaisingDateTabs";

function formatMetricValue(value: string | null, prefix = "", suffix = ""): string {
    const trimmedValue = value?.trim() || "";
    if (!trimmedValue) return "";
    return `${prefix}${trimmedValue}${suffix}`;
}

function buildPublishedUpdate(formData: FormData, companyId: string): PublishedVibeRaisingUpdate {
    const month = formData.get("month")?.toString().trim() || "Update";
    const year = formData.get("year")?.toString().trim() || new Date().getFullYear().toString();
    const date = new Date().toISOString();
    const rawVideoUrl = formData.get("videoUrl")?.toString().trim() || "";
    const videoUrl = rawVideoUrl && !rawVideoUrl.startsWith("blob:") ? rawVideoUrl : undefined;

    return {
        id: `published-${companyId}-${Date.now()}`,
        month: `${month} ${year}`,
        date,
        score: formData.get("grade")?.toString().trim() || "A+",
        summary: formData.get("summary")?.toString().trim() || "",
        sourceUrl: formData.get("sourceUrl")?.toString().trim() || "",
        videoUrl,
        metrics: {
            revenue: formatMetricValue(formData.get("revenue")?.toString() || "", "$"),
            users: formatMetricValue(formData.get("activeUsers")?.toString() || ""),
            mrr: formatMetricValue(formData.get("mrr")?.toString() || "", "$"),
            burnRate: formatMetricValue(formData.get("burnRate")?.toString() || "", "$"),
            runway: formatMetricValue(formData.get("runway")?.toString() || ""),
        },
        highlights: formData.get("highlights")?.toString() || "",
        challenges: formData.get("challenges")?.toString() || "",
        asks: formData.get("asks")?.toString() || "",
        likes: 0,
        comments: 0,
        investorsSentTo: 12,
        investorsViewed: 0,
        isCurrent: true,
    };
}

export async function loader({ request }: Route.LoaderArgs) {
    const user = requireFounder(request);

    // Require company registration before creating updates
    if (!user.companyRegistered) {
        throw redirect(VIBE_RAISING_COMPANY_SETUP_PATH);
    }

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
    const user = requireFounder(request);
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
        const company = getActiveCompany(user);
        const publishedUpdate = buildPublishedUpdate(formData, company.id);
        const headers = new Headers();
        headers.append("Set-Cookie", createVibeRaisingSubmittedCookie(company.id));
        headers.append("Set-Cookie", createVibeRaisingPublishedUpdateCookie(company.id, publishedUpdate));
        return redirect(VIBE_RAISING_APP_PATH, {
            headers,
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
    info?: string;
}

interface CustomMetric {
    key: string;
    label: string;
    prefix: string;
    value: string;
}

interface SectionWithExampleProps {
    label: string;
    name: string;
    placeholder: string;
    icon: React.ElementType<{ className?: string }>;
    value: string;
    onChange?: (value: string) => void;
    rows?: number;
}

const METRIC_OPTIONS: MetricOption[] = [
    { key: "revenue", label: "Revenue (AUD)", placeholder: "50,000", prefix: "$", icon: <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />, info: "Your total income this month." },
    { key: "activeUsers", label: "Active Users", placeholder: "1,500", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Number of unique users who engaged with your product." },
    { key: "mrr", label: "MRR (AUD)", placeholder: "10,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Monthly Recurring Revenue - the predictable revenue your business expects every month." },
    { key: "burnRate", label: "Burn Rate (AUD)", placeholder: "20,000", prefix: "$", icon: <FireIcon className="w-4 h-4 text-gray-400" />, info: "The rate at which your company is spending its capital reserves to finance overhead." },
];

function MonthYearTabs({
    month,
    year,
    onMonthChange,
    onYearChange,
    periodTabs = [],
    activePeriodKey = "current",
    onPeriodChange,
    submitDateFields = true,
    isDateEditable = true,
    statusLabel,
    showInfoControl = false,
}: {
    month: string;
    year: number;
    onMonthChange: (month: string) => void;
    onYearChange: (year: number) => void;
    periodTabs?: Array<{ key: string; month: string; year: number }>;
    activePeriodKey?: string;
    onPeriodChange?: (key: string) => void;
    submitDateFields?: boolean;
    isDateEditable?: boolean;
    statusLabel?: string;
    showInfoControl?: boolean;
}) {
    const monthTheme = getVibeRaisingMonthTheme(month);
    const [isMonthMenuOpen, setIsMonthMenuOpen] = useState(false);
    const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
    const monthMenuRef = useRef<HTMLDivElement | null>(null);
    const yearMenuRef = useRef<HTMLDivElement | null>(null);
    const yearOptions = Array.from({ length: 11 }, (_, index) => year - 5 + index);
    const visibleSecondaryMonths = periodTabs
        .filter((period) => period.key !== activePeriodKey)
        .slice(0, 2);

    useEffect(() => {
        if (!isMonthMenuOpen && !isYearMenuOpen) return;

        const closeOnOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;

            if (isMonthMenuOpen && !monthMenuRef.current?.contains(target)) {
                setIsMonthMenuOpen(false);
            }

            if (isYearMenuOpen && !yearMenuRef.current?.contains(target)) {
                setIsYearMenuOpen(false);
            }
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMonthMenuOpen(false);
                setIsYearMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isMonthMenuOpen, isYearMenuOpen]);

    return (
        <div className="absolute -top-3 left-4 z-20 flex items-stretch gap-2">
            <div ref={monthMenuRef} className="relative w-[360px] sm:w-[470px]">
                <div
                    className={clsx(
                        "relative z-10 flex w-full text-base font-black uppercase tracking-[0.12em] text-white shadow-xl ring-1 ring-white/30 transition-all duration-150",
                        isMonthMenuOpen ? "rounded-t-2xl rounded-b-none" : "rounded-t-2xl rounded-b-lg",
                        monthTheme.tabClass,
                    )}
                >
                    <button
                        type="button"
                        disabled={!isDateEditable}
                        onClick={() => {
                            if (!isDateEditable) return;
                            setIsYearMenuOpen(false);
                            setIsMonthMenuOpen((current) => !current);
                        }}
                        className={clsx(
                            "flex min-w-0 flex-1 items-center justify-between gap-4 px-5 py-3 text-left transition-colors",
                            isDateEditable ? "cursor-pointer hover:bg-white/10" : "cursor-default",
                        )}
                        aria-label="Select update month"
                        aria-haspopup={isDateEditable ? "listbox" : undefined}
                        aria-expanded={isDateEditable ? isMonthMenuOpen : undefined}
                    >
                        <span className="min-w-0 flex-1 truncate">{month}</span>
                        {statusLabel && (
                            <span className="shrink-0 text-[10px] font-medium normal-case tracking-normal text-white/75">
                                {statusLabel}
                            </span>
                        )}
                        {isDateEditable && (
                            <ChevronDownIcon className={clsx("h-4 w-4 shrink-0 text-white/80 transition-transform duration-150", isMonthMenuOpen && "rotate-180")} />
                        )}
                    </button>
                    {visibleSecondaryMonths.length > 0 && (
                        <div className="flex shrink-0 items-stretch border-l border-white/30 text-xs tracking-[0.16em]">
                            {visibleSecondaryMonths.map((period) => {
                                const periodTheme = getVibeRaisingMonthTheme(period.month);

                                return (
                                    <button
                                        key={period.key}
                                        type="button"
                                        onClick={() => onPeriodChange?.(period.key)}
                                        className={clsx(
                                            "flex min-w-[58px] items-center justify-center px-3 font-black text-white/90 transition-all hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70",
                                            periodTheme.tabClass,
                                        )}
                                    >
                                        {period.month.slice(0, 3).toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    {showInfoControl && (
                        <div className="group relative flex min-w-[30px] items-stretch border-l border-white/25">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center px-2 text-[13px] font-medium lowercase italic text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
                                aria-label="How generated monthly updates work"
                            >
                                i
                            </button>
                            <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-72 translate-y-1 rounded-2xl bg-gray-950 px-4 py-3 text-left text-[11px] font-medium normal-case leading-5 tracking-normal text-white opacity-0 shadow-2xl shadow-black/25 ring-1 ring-white/10 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                We generated three months for you: the current month and the two earlier months. Click any month button to check and edit that update.
                                <div className="absolute right-4 top-0 h-3 w-3 -translate-y-1.5 rotate-45 bg-gray-950" />
                            </div>
                        </div>
                    )}
                </div>
                {submitDateFields && <input type="hidden" name="month" value={month} />}
                <div
                    className={clsx(
                        "absolute left-0 top-full z-40 w-full origin-top overflow-hidden rounded-b-2xl border border-t-0 border-gray-200 bg-white shadow-2xl shadow-black/15 ring-1 ring-black/5 transition-all duration-150",
                        isDateEditable && isMonthMenuOpen
                            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none -translate-y-1 scale-95 opacity-0",
                    )}
                >
                    <div role="listbox" aria-label="Update month" className="max-h-80 overflow-y-auto py-1">
                        {VIBE_RAISING_MONTH_OPTIONS.map((option) => {
                            const isSelected = option.name === month;

                            return (
                                <button
                                    key={option.name}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        onMonthChange(option.name);
                                        onPeriodChange?.("current");
                                        setIsMonthMenuOpen(false);
                                    }}
                                    className={clsx(
                                        "flex w-full items-center justify-between px-4 py-2 text-left text-xs font-black uppercase tracking-[0.12em] transition-colors",
                                        isSelected
                                            ? `${option.tabClass} text-white`
                                            : "text-gray-600 hover:bg-gray-950 hover:text-white",
                                    )}
                                >
                                    <span>{option.name}</span>
                                    <span className={clsx("h-1.5 w-1.5 rounded-full", isSelected ? "bg-white" : option.tabClass)} />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div ref={yearMenuRef} className="relative min-w-[108px]">
                <div
                    className={clsx(
                        "relative z-10 flex h-full items-center overflow-hidden bg-gray-950 text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-150",
                        isYearMenuOpen ? "rounded-t-2xl rounded-b-none" : "rounded-t-2xl rounded-b-lg",
                    )}
                >
                    {submitDateFields && <input type="hidden" name="year" value={year} />}
                    <button
                        type="button"
                        disabled={!isDateEditable}
                        onClick={() => {
                            if (!isDateEditable) return;
                            setIsMonthMenuOpen(false);
                            setIsYearMenuOpen((current) => !current);
                        }}
                        className={clsx(
                            "flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-black tracking-[0.12em] transition-colors",
                            isDateEditable ? "hover:bg-white/10" : "cursor-default",
                        )}
                        aria-label="Select update year"
                        aria-haspopup={isDateEditable ? "listbox" : undefined}
                        aria-expanded={isDateEditable ? isYearMenuOpen : undefined}
                    >
                        <span>{year}</span>
                        {isDateEditable && (
                            <ChevronDownIcon className={clsx("h-3.5 w-3.5 text-white/75 transition-transform duration-150", isYearMenuOpen && "rotate-180")} />
                        )}
                    </button>
                </div>
                <div
                    className={clsx(
                        "absolute left-0 top-full z-40 w-full origin-top overflow-hidden rounded-b-2xl border border-t-0 border-gray-800 bg-gray-950 shadow-2xl shadow-black/20 ring-1 ring-black/10 transition-all duration-150",
                        isDateEditable && isYearMenuOpen
                            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none -translate-y-1 scale-95 opacity-0",
                    )}
                >
                    <div role="listbox" aria-label="Update year" className="max-h-72 overflow-y-auto py-1">
                        {yearOptions.map((optionYear) => {
                            const isSelected = optionYear === year;

                            return (
                                <button
                                    key={optionYear}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        onYearChange(optionYear);
                                        setIsYearMenuOpen(false);
                                    }}
                                    className={clsx(
                                        "flex w-full items-center justify-center px-4 py-2 text-sm font-black tracking-[0.12em] transition-colors",
                                        isSelected
                                            ? "bg-white text-gray-950"
                                            : "text-white/70 hover:bg-white/10 hover:text-white",
                                    )}
                                >
                                    {optionYear}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hint suggestions per section, cycled through as user adds points
const SECTION_HINTS: Record<string, string[]> = {
    summary: [
        "e.g. Building an AI-powered financial copilot for CFOs of series B software startups.",
        "e.g. Revolutionizing the $100B global freight industry with autonomous docking systems.",
        "e.g. Creating a next-gen marketplace that connects verified creative freelancers with agencies.",
    ],
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

type RecordingMode = "video" | "audio";
type RecordingAttemptKey = "video-audio" | "video-only" | "audio-only";

interface RecordingAttempt {
    key: RecordingAttemptKey;
    constraints: MediaStreamConstraints;
    mode: RecordingMode;
    notice: string | null;
    blockedMessage: string;
    missingDeviceMessage: string;
}

function buildRecordingAttempts(hasVideoInput: boolean | null, hasAudioInput: boolean | null): RecordingAttempt[] {
    const attemptsByKey: Record<RecordingAttemptKey, RecordingAttempt> = {
        "video-audio": {
            key: "video-audio",
            constraints: { video: true, audio: true },
            mode: "video",
            notice: null,
            blockedMessage: "Camera and microphone access was blocked. Please allow access and try again.",
            missingDeviceMessage: "We couldn't find both a camera and a microphone for video recording.",
        },
        "video-only": {
            key: "video-only",
            constraints: { video: true, audio: false },
            mode: "video",
            notice: "Microphone unavailable. Recording video without audio.",
            blockedMessage: "Camera access was blocked. Please allow access and try again.",
            missingDeviceMessage: "We couldn't find a camera for recording.",
        },
        "audio-only": {
            key: "audio-only",
            constraints: { video: false, audio: true },
            mode: "audio",
            notice: "Camera unavailable. Recording audio only.",
            blockedMessage: "Microphone access was blocked. Please allow access and try again.",
            missingDeviceMessage: "We couldn't find a microphone for recording.",
        },
    };

    if (hasVideoInput === false && hasAudioInput === false) {
        return [];
    }

    const orderedKeys: RecordingAttemptKey[] = [];

    if (hasVideoInput === true && hasAudioInput === true) {
        orderedKeys.push("video-audio", "video-only", "audio-only");
    } else if (hasVideoInput === true && hasAudioInput === false) {
        orderedKeys.push("video-only");
    } else if (hasVideoInput === false && hasAudioInput === true) {
        orderedKeys.push("audio-only");
    } else {
        if (hasVideoInput !== false && hasAudioInput !== false) {
            orderedKeys.push("video-audio");
        }
        if (hasVideoInput !== false) {
            orderedKeys.push("video-only");
        }
        if (hasAudioInput !== false) {
            orderedKeys.push("audio-only");
        }
    }

    return [...new Set(orderedKeys)].map((key) => attemptsByKey[key]);
}

function getRecordingErrorMessage(error: unknown, lastAttempt: RecordingAttempt | null): string {
    if (error instanceof DOMException) {
        if (error.name === "NotAllowedError" || error.name === "SecurityError") {
            return lastAttempt?.blockedMessage || "Camera and microphone access was blocked. Please allow access and try again.";
        }

        if (["NotFoundError", "DevicesNotFoundError", "OverconstrainedError"].includes(error.name)) {
            return lastAttempt?.missingDeviceMessage || "We couldn't find a camera or microphone for recording.";
        }

        if (["NotReadableError", "TrackStartError", "AbortError"].includes(error.name)) {
            return "Your camera or microphone is busy in another app. Close it there and try again.";
        }
    }

    return "Unable to start recording right now. Please try again.";
}

function MetricTooltip({ m, active, className }: { m: MetricOption; active: boolean; className?: string }) {
    return (
        <div className="mt-0.5">
            <p className={clsx("font-semibold uppercase tracking-wide text-center", active ? "text-gray-600" : "text-gray-400", className)}>{m.label}</p>
        </div>
    );
}

function MetricInfoBadge({ info }: { info?: string }) {
    if (!info) return null;
    return (
        <div className="group absolute right-1.5 top-1.5">
            <div className="cursor-help text-gray-300 transition-colors duration-150 hover:text-gray-400">
                <InformationCircleIcon className="h-3.5 w-3.5" />
            </div>
            <div className="pointer-events-none absolute bottom-full right-0 z-50 mb-2 w-48 translate-y-1 rounded-lg bg-gray-900 px-3 py-2 text-left text-[11px] font-medium leading-4 text-white opacity-0 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {info}
                <div className="absolute right-2 top-full h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-900" />
            </div>
        </div>
    );
}

function SectionWithExample({
    label,
    name,
    placeholder,
    icon: Icon,
    value,
    onChange,
}: SectionWithExampleProps) {
    // We split by newline for internal management - it's much more stable than periods
    const items = (value || "").split("\n");
    const hints = SECTION_HINTS[name] || [];

    const updateItem = (index: number, text: string) => {
        const updated = [...items];
        updated[index] = text;
        onChange?.(updated.join("\n"));
    };

    const addItem = () => {
        const current = value || "";
        onChange?.(current + (current ? "\n" : "") + "");
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        onChange?.(updated.join("\n"));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 bg-black px-4 py-2.5">
                <Icon className="w-4 h-4 text-white/80" />
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                    {label}
                </label>
            </div>
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={value || ""} />
            <div className="p-4 space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <span className="mt-2.5 text-violet-400 text-sm select-none flex-shrink-0 animate-pulse">•</span>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateItem(i, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder={hints[i % hints.length] || placeholder}
                            className="flex-1 px-4 py-2 text-sm border-2 border-gray-100 rounded-xl focus:border-violet-400 focus:ring-0 text-gray-900 placeholder:text-gray-300 placeholder:italic transition-all bg-white"
                        />
                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="mt-1.5 p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all"
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
                className="w-full py-3 text-xs text-violet-600 font-bold hover:bg-violet-50 flex items-center justify-center gap-1.5 border-t border-dashed border-gray-100 transition-colors"
            >
                <span className="text-base">+</span> Add point
            </button>
        </div>
    );
}

// Bullet-point input for past month cards
function BulletInput({ value, onChange, placeholder, section }: { value: string; onChange: (v: string) => void; placeholder?: string; section?: string }) {
    const items = (value || "").split("\n");
    const hints = section ? (SECTION_HINTS[section] || []) : [];

    const update = (i: number, text: string) => {
        const updated = [...items];
        updated[i] = text;
        onChange(updated.join("\n"));
    };
    const remove = (i: number) => onChange(items.filter((_, j) => j !== i).join("\n"));
    const add = () => {
        onChange((value || "") + "\n");
    };

    return (
        <div className="space-y-1.5 pt-1">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="text-violet-400 text-xs select-none">•</span>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => update(i, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder={hints[i % hints.length] || placeholder || "Add a point..."}
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-violet-400 focus:border-violet-400 bg-white shadow-sm text-gray-900 placeholder:text-gray-300 placeholder:italic transition-all"
                    />
                    {items.length > 1 && (
                        <button type="button" onClick={() => remove(i)} className="p-1 px-2 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-md transition-all">
                            <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className="mt-1 px-2 py-1.5 text-[10px] text-violet-600 font-bold hover:bg-violet-50 rounded-lg flex items-center gap-1 transition-all">
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
        blue: { bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-700", hoverBg: "hover:bg-violet-50/80" },
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
                    {/* Metrics - square boxes (read-only) */}
                    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                        <div className="grid grid-cols-4 gap-2">
                            {METRIC_OPTIONS.map(m => {
                                const val = pm.metrics[m.key];
                                return (
                                    <div
                                        key={m.key}
                                        className={clsx(
                                            "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-1.5 transition-all",
                                            val
                                                ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                                                : "border-gray-200 bg-gray-50 opacity-40"
                                        )}
                                    >
                                        <MetricInfoBadge info={m.info} />
                                        <div className={clsx(
                                            "w-5 h-5 rounded-full flex items-center justify-center mb-1",
                                            val ? "bg-violet-100" : "bg-white"
                                        )}>
                                            {m.icon}
                                        </div>
                                        <p className={clsx(
                                            "text-xs font-extrabold leading-tight",
                                            val ? "text-gray-900" : "text-gray-300"
                                        )}>
                                            {val ? `${m.prefix || ""}${val}` : "-"}
                                        </p>
                                        <MetricTooltip m={m} active={!!val} className="text-[8px]" />
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
                                    <QuestionMarkCircleIcon className="w-3 h-3 text-violet-500" />
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

function isHttpUrl(value: string) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
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

// Pick bar color based on MoM growth rate - catchy colors for high growth
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
                    const color = getBarColor(rate);
                    const monthName = d.month.trim().split(/\s+/)[0] || d.month;
                    const monthTheme = getVibeRaisingMonthTheme(monthName);
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
                                d.isSelected ? "text-gray-900" : color?.label || "text-gray-400"
                            )}>
                                {d.month.slice(0, 3)}
                            </span>

                            {/* Horizontal bar */}
                            <div className="flex-1 h-7 bg-gray-50 rounded-md overflow-hidden relative">
                                <div
                                    className={clsx(
                                        "h-full rounded-md transition-all duration-500 ease-out relative overflow-hidden",
                                        monthTheme.tabClass,
                                        d.isSelected ? "brightness-100" : "opacity-80 group-hover:opacity-100"
                                    )}
                                    style={{ width: `${Math.max(width, 3)}%` }}
                                >
                                    {d.isSelected && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full animate-[shimmer_2s_infinite]" />
                                    )}
                                </div>
                            </div>

                            {/* Value */}
                            <span className={clsx(
                                "w-16 text-right text-sm font-bold flex-shrink-0",
                                d.isSelected ? "text-gray-900" : "text-gray-600"
                            )}>
                                {formatter(d.value)}
                            </span>

                            {/* MoM rate */}
                            <span className="w-14 text-right flex-shrink-0">
                                {rate === null ? (
                                    <span className="text-[10px] text-gray-300">-</span>
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
    const { user, existingData, isEdit } = useLoaderData<typeof loader>();
    const activeCompany = getActiveCompany(user);
    const companyName = activeCompany.name || user.companyName;
    const companyDomain = activeCompany.domain || user.domain;
    const companyLocation = activeCompany.location || user.location;
    const actionData = useActionData<typeof action>() as any;
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [dismissedFeedback, setDismissedFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [recordingError, setRecordingError] = useState<string | null>(null);
    const [recordingNotice, setRecordingNotice] = useState<string | null>(null);
    const [recordingMode, setRecordingMode] = useState<RecordingMode | null>(null);
    const [previewMediaKind, setPreviewMediaKind] = useState<RecordingMode | null>(null);
    const [draftSaved, setDraftSaved] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [hasDraft, setHasDraft] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem("vibe_draft");
    });
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const livePreviewRef = useRef<HTMLVideoElement | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const discardNextRecordingRef = useRef(false);

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback") setDismissedFeedback(false);
    }, [actionData]);

    const defaultData = actionData?.step === "feedback" ? (actionData.data as any) : (existingData || {});

    // State declarations
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const [summary, setSummary] = useState<string>(defaultData?.summary || "");
    const [sourceUrl, setSourceUrl] = useState<string>(defaultData?.sourceUrl || "");
    const [showImportPanel, setShowImportPanel] = useState<boolean>(Boolean(defaultData?.sourceUrl));
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
    const [activeMonthKey, setActiveMonthKey] = useState("current");
    
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

    const handleDraftComplete = (data: any) => {
        setActiveMonthKey("current");
        if (data.month) setSelectedMonth(data.month);
        if (data.year) setSelectedYear(data.year);
        if (data.summary) setSummary(data.summary);
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
        Object.keys(data.metrics).forEach(key => {
            if (data.metrics[key]) newMetrics.add(key);
        });
        setSelectedMetrics(newMetrics);
    };

    const resumeDraft = () => {
        try {
            const raw = localStorage.getItem("vibe_draft");
            if (!raw) return;
            const draft = JSON.parse(raw);
            setActiveMonthKey("current");

            // Restore current month fields
            if (draft.month) setSelectedMonth(draft.month);
            if (draft.year) setSelectedYear(Number(draft.year));
            setSummary(draft.summary || "");
            setSourceUrl(draft.sourceUrl || "");
            setShowImportPanel(Boolean(draft.sourceUrl));
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

    useEffect(() => {
        if (activeMonthKey === "current") return;
        const activeIndex = Number(activeMonthKey.replace("past-", ""));
        if (!Number.isInteger(activeIndex) || !pastMonthCards[activeIndex]) {
            setActiveMonthKey("current");
        }
    }, [activeMonthKey, pastMonthCards]);

    // Custom metrics added by founders
    const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
    const [addingCustom, setAddingCustom] = useState(false);
    const [newMetricLabel, setNewMetricLabel] = useState('');
    const [newMetricPrefix, setNewMetricPrefix] = useState('');
    const [newMetricValue, setNewMetricValue] = useState('');
    const hasValidSourceUrl = isHttpUrl(sourceUrl);
    const manualPathActive = isRecording || Boolean(videoPreviewUrl) || showImportPanel || Boolean(sourceUrl);
    const emailPathActive = showEmailWizard;

    const replacePreviewMedia = useCallback((nextUrl: string | null, nextKind: RecordingMode | null) => {
        setVideoPreviewUrl((currentUrl) => {
            if (currentUrl && currentUrl !== nextUrl && currentUrl.startsWith("blob:")) {
                URL.revokeObjectURL(currentUrl);
            }
            return nextUrl;
        });
        setPreviewMediaKind(nextKind);
    }, []);

    const stopMediaStream = useCallback(() => {
        const stream = mediaStreamRef.current;
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }

        if (livePreviewRef.current) {
            livePreviewRef.current.srcObject = null;
        }
    }, []);

    const stopRecording = useCallback(() => {
        const recorder = mediaRecorderRef.current;

        if (recorder && recorder.state !== "inactive") {
            recorder.stop();
        } else {
            stopMediaStream();
        }

        setIsRecording(false);
        setRecordingMode(null);
    }, [stopMediaStream]);

    const openEmailDraftFlow = useCallback(() => {
        if (isRecording) {
            discardNextRecordingRef.current = true;
            stopRecording();
        }

        setShowEmailWizard(true);
    }, [isRecording, stopRecording]);

    const startRecording = useCallback(async () => {
        if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            setRecordingError("Video recording is not supported in this browser.");
            return;
        }

        setRecordingError(null);
        setRecordingNotice(null);
        let lastAttempt: RecordingAttempt | null = null;

        try {
            stopMediaStream();
            recordedChunksRef.current = [];
            discardNextRecordingRef.current = false;
            setRecordingMode(null);
            let hasAudioInput: boolean | null = null;
            let hasVideoInput: boolean | null = null;

            if (navigator.mediaDevices.enumerateDevices) {
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    const inputDevices = devices.filter(
                        (device) => device.kind === "audioinput" || device.kind === "videoinput"
                    );

                    if (inputDevices.length > 0) {
                        hasAudioInput = inputDevices.some((device) => device.kind === "audioinput");
                        hasVideoInput = inputDevices.some((device) => device.kind === "videoinput");
                    }
                } catch {
                    hasAudioInput = null;
                    hasVideoInput = null;
                }
            }

            const attempts = buildRecordingAttempts(hasVideoInput, hasAudioInput);

            if (attempts.length === 0) {
                setRecordingError("No camera or microphone was detected on this device.");
                setIsRecording(false);
                return;
            }

            let stream: MediaStream | null = null;
            let activeMode: RecordingMode | null = null;
            let activeNotice: string | null = null;
            let lastError: unknown = null;

            for (const attempt of attempts) {
                try {
                    lastAttempt = attempt;
                    stream = await navigator.mediaDevices.getUserMedia(attempt.constraints);
                    activeMode = attempt.mode;
                    activeNotice = attempt.notice;
                    break;
                } catch (error) {
                    lastError = error;

                    if (
                        error instanceof DOMException &&
                        ["NotFoundError", "DevicesNotFoundError", "OverconstrainedError"].includes(error.name)
                    ) {
                        continue;
                    }

                    throw error;
                }
            }

            if (!stream || !activeMode) {
                throw lastError instanceof Error ? lastError : new DOMException("No recording devices found.", "NotFoundError");
            }

            mediaStreamRef.current = stream;
            setRecordingMode(activeMode);
            setRecordingNotice(activeNotice);

            if (activeMode === "video" && livePreviewRef.current) {
                livePreviewRef.current.srcObject = stream;
                void livePreviewRef.current.play().catch(() => {});
            }

            const supportedMimeType = (
                activeMode === "audio"
                    ? [
                        "audio/webm;codecs=opus",
                        "audio/webm",
                    ]
                    : [
                        "video/webm;codecs=vp9,opus",
                        "video/webm;codecs=vp8,opus",
                        "video/webm",
                    ]
            ).find((mimeType) => MediaRecorder.isTypeSupported(mimeType));

            const recorder = supportedMimeType
                ? new MediaRecorder(stream, { mimeType: supportedMimeType })
                : new MediaRecorder(stream);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            recorder.onerror = () => {
                setRecordingError("Something went wrong while recording. Please try again.");
                setIsRecording(false);
                stopMediaStream();
            };

            recorder.onstop = () => {
                const hasRecordedData = recordedChunksRef.current.some((chunk) => chunk.size > 0);
                const blobType = supportedMimeType || recorder.mimeType || (activeMode === "audio" ? "audio/webm" : "video/webm");
                const shouldDiscardRecording = discardNextRecordingRef.current;
                discardNextRecordingRef.current = false;

                if (hasRecordedData && !shouldDiscardRecording) {
                    const recordedBlob = new Blob(recordedChunksRef.current, { type: blobType });
                    replacePreviewMedia(URL.createObjectURL(recordedBlob), activeMode);
                }

                recordedChunksRef.current = [];
                mediaRecorderRef.current = null;
                setRecordingMode(null);
                stopMediaStream();
            };

            mediaRecorderRef.current = recorder;
            recorder.start(250);
            setIsRecording(true);
        } catch (error) {
            const message = getRecordingErrorMessage(error, lastAttempt ?? null);

            setRecordingError(message);
            setRecordingNotice(null);
            setIsRecording(false);
            setRecordingMode(null);
            stopMediaStream();
        }
    }, [replacePreviewMedia, stopMediaStream]);

    const addCustomMetric = () => {
        if (!newMetricLabel.trim()) return;
        const key = 'custom_' + Date.now();
        setCustomMetrics(prev => [...prev, { key, label: newMetricLabel.trim(), prefix: newMetricPrefix.trim(), value: newMetricValue.trim() }]);
        setNewMetricLabel('');
        setNewMetricPrefix('');
        setNewMetricValue('');
        setAddingCustom(false);
    };

    const removeCustomMetric = (key: string) => {
        setCustomMetrics(prev => prev.filter(m => m.key !== key));
    };

    const updateCustomMetricValue = (key: string, value: string) => {
        setCustomMetrics(prev => prev.map(m => m.key === key ? { ...m, value } : m));
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

    const activePastIndex = activeMonthKey.startsWith("past-") ? Number(activeMonthKey.replace("past-", "")) : -1;
    const activePastCard = Number.isInteger(activePastIndex) ? pastMonthCards[activePastIndex] : undefined;
    const isViewingCurrentUpdate = activeMonthKey === "current" || !activePastCard;
    const activePastPeriod = activePastCard ? parseVibeRaisingMonthYear(activePastCard.month) : null;
    const activeDisplayMonth = isViewingCurrentUpdate ? selectedMonth : activePastPeriod?.month || selectedMonth;
    const activeDisplayYear = isViewingCurrentUpdate ? selectedYear : activePastPeriod?.year || selectedYear;
    const activeMonthTheme = getVibeRaisingMonthTheme(activeDisplayMonth);
    const periodTabs = [
        { key: "current", month: selectedMonth, year: selectedYear },
        ...pastMonthCards.map((card, index) => {
            const period = parseVibeRaisingMonthYear(card.month);
            return { key: `past-${index}`, month: period.month, year: period.year };
        }),
    ];
    const activeMetricValues = isViewingCurrentUpdate ? metricValues : activePastCard?.metrics || {};
    const activeSelectedMetrics = isViewingCurrentUpdate
        ? selectedMetrics
        : new Set(Object.keys(activeMetricValues).filter((key) => activeMetricValues[key]));
    const activeHighlights = isViewingCurrentUpdate ? highlights : activePastCard?.highlights || "";
    const activeChallenges = isViewingCurrentUpdate ? challenges : activePastCard?.challenges || "";
    const activeAsks = isViewingCurrentUpdate ? asks : activePastCard?.asks || "";

    const updateActiveMetricValue = (key: string, value: string) => {
        if (isViewingCurrentUpdate) {
            setMetricValues(prev => ({ ...prev, [key]: value }));
            return;
        }

        if (activePastIndex >= 0) {
            updatePastMonthMetric(activePastIndex, key, value);
        }
    };

    const toggleActiveMetric = (key: string) => {
        if (isViewingCurrentUpdate) {
            toggleMetric(key);
            return;
        }

        if (activePastIndex < 0 || !activePastCard) return;

        if (key in activePastCard.metrics) {
            const updated = { ...activePastCard.metrics };
            delete updated[key];
            setPastMonthCards(prev => prev.map((card, index) => index === activePastIndex ? { ...card, metrics: updated } : card));
        } else {
            updatePastMonthMetric(activePastIndex, key, "");
        }
    };

    const updateActiveHighlights = (value: string) => {
        if (isViewingCurrentUpdate) setHighlights(value);
        else if (activePastIndex >= 0) updatePastMonthField(activePastIndex, "highlights", value);
    };

    const updateActiveChallenges = (value: string) => {
        if (isViewingCurrentUpdate) setChallenges(value);
        else if (activePastIndex >= 0) updatePastMonthField(activePastIndex, "challenges", value);
    };

    const updateActiveAsks = (value: string) => {
        if (isViewingCurrentUpdate) setAsks(value);
        else if (activePastIndex >= 0) updatePastMonthField(activePastIndex, "asks", value);
    };

    // Prepare chart data - revenue bars with auto-calculated MoM
    const chartData: ChartData[] = [
        ...pastMonthCards.map((card, i) => ({
            month: card.month,
            value: parseRevenue(card.metrics.revenue || "0"),
            isSelected: activeMonthKey === `past-${i}`
        })),
        {
            month: selectedMonth,
            value: parseRevenue(metricValues.revenue || "0"),
            isCurrent: true,
            isSelected: isViewingCurrentUpdate
        }
    ];

    // Active users chart data
    const activeUsersChartData: ChartData[] = [
        ...pastMonthCards.map((card, i) => ({
            month: card.month,
            value: parseUsers(card.metrics.activeUsers || "0"),
            isSelected: activeMonthKey === `past-${i}`
        })),
        {
            month: selectedMonth,
            value: parseUsers(metricValues.activeUsers || "0"),
            isCurrent: true,
            isSelected: isViewingCurrentUpdate
        }
    ];

    // Chart click: always expand + scroll
    const expandCardFromChart = (index: number) => {
        setActiveMonthKey(index === pastMonthCards.length ? "current" : `past-${index}`);
        if (index === pastMonthCards.length) {
            const el = document.getElementById("current-month-card");
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        const el = document.getElementById("current-month-card");
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        setRecordingError(null);
        setRecordingNotice(null);
        if (isRecording) {
            discardNextRecordingRef.current = true;
        }
        stopRecording();
        const video = acceptedFiles.find(f => f.type.startsWith("video/"));
        const audio = acceptedFiles.find(f => f.type.startsWith("audio/"));
        if (video) {
            replacePreviewMedia(URL.createObjectURL(video), "video");
        } else if (audio) {
            replacePreviewMedia(URL.createObjectURL(audio), "audio");
        }
    }, [isRecording, replacePreviewMedia, stopRecording]);
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        noClick: true,
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

    useEffect(() => {
        return () => {
            stopMediaStream();
            mediaRecorderRef.current = null;
            if (videoPreviewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(videoPreviewUrl);
            }
        };
    }, [stopMediaStream, videoPreviewUrl]);

    useEffect(() => {
        if (!isRecording || !livePreviewRef.current || !mediaStreamRef.current) {
            return;
        }

        livePreviewRef.current.srcObject = mediaStreamRef.current;
        void livePreviewRef.current.play().catch(() => {});
    }, [isRecording]);

    // 1. Feedback View - preview-dominant with rating sidebar
    if (actionData?.step === "feedback" && !dismissedFeedback) {
        const { feedback, data } = actionData;
        const reviewMonth = (data as any)?.month || selectedMonth;
        const reviewYear = Number((data as any)?.year || selectedYear);

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
                {/* Header - back arrow top-left, title center-left, X on right */}
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

                    {/* PREVIEW - dominant, takes most of the width */}
                    <div className="flex-1 min-w-0">
                        <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <StartupRegionBadge
                                location={companyLocation}
                                variant="inverse"
                                className="absolute right-4 top-4 z-10"
                            />
                            {/* Hero banner - video or gradient */}
                            {videoPreviewUrl ? (
                                <div className="relative w-full aspect-video bg-black">
                                    {previewMediaKind === "audio" ? (
                                        <div className="flex h-full items-center justify-center px-6">
                                            <audio
                                                src={videoPreviewUrl}
                                                controls
                                                className="w-full max-w-md"
                                            />
                                        </div>
                                    ) : (
                                        <video
                                            src={videoPreviewUrl}
                                            controls
                                            className="w-full h-full object-contain"
                                            poster=""
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="relative w-full h-32 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-400" />
                                    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 200">
                                        <circle cx="120" cy="80" r="100" fill="white" />
                                        <circle cx="650" cy="140" r="70" fill="white" />
                                        <circle cx="400" cy="30" r="50" fill="white" />
                                        <rect x="250" y="100" width="180" height="180" rx="40" fill="white" transform="rotate(-15 340 190)" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-end px-6 pb-4">
                                        <div className="flex items-center gap-3">
                                            {companyDomain ? (
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${companyDomain}&sz=64`}
                                                    alt=""
                                                    className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-white">{companyName.charAt(0)}</span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-bold text-sm drop-shadow-sm">{companyName}</p>
                                                <p className="text-white/70 text-xs">Investor Update</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preview header */}
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Investor Update
                                    </h3>
                                    <VibeRaisingDateTabs month={reviewMonth} year={reviewYear} />
                                </div>
                            </div>

                            {(data as any)?.sourceUrl && (
                                <div className="px-6 py-3 border-b border-sky-100 bg-sky-50/50">
                                    <a
                                        href={(data as any).sourceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Open source update link
                                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            )}

                            
                            {(data as any)?.summary && (
                                <div className="px-6 py-4 bg-violet-50/40 border-b border-violet-100">
                                    <h2 className="text-xl font-extrabold text-gray-900 leading-snug tracking-tight italic">
                                        {(data as any).summary}
                                    </h2>
                                </div>
                            )}


                            {/* Metrics - square boxes */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <div className="grid grid-cols-4 gap-3">
                                    {METRIC_OPTIONS.map(m => {
                                        const val = (data as any)?.[m.key];
                                        return (
                                            <div
                                                key={m.key}
                                                className={clsx(
                                                    "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 transition-all",
                                                    val
                                                        ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                                                        : "border-gray-200 bg-gray-50 opacity-40"
                                                )}
                                            >
                                                <MetricInfoBadge info={m.info} />
                                                <div className={clsx(
                                                    "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                    val ? "bg-violet-100" : "bg-white"
                                                )}>
                                                    {m.icon}
                                                </div>
                                                <p className={clsx(
                                                    "text-base font-extrabold leading-tight",
                                                    val ? "text-gray-900" : "text-gray-300"
                                                )}>
                                                    {val ? `${m.prefix || ""}${val}` : "-"}
                                                </p>
                                                <MetricTooltip m={m} active={!!val} className="text-[10px]" />
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
                                            <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-violet-500" />
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
                                <div className="mt-6 bg-gradient-to-br from-violet-50 to-violet-50 border border-violet-100 rounded-xl p-5 shadow-sm">
                                    <h3 className="text-sm font-bold text-violet-900 mb-2 flex items-center gap-2">
                                        <UsersIcon className="w-4 h-4 text-violet-500" />
                                        Your Audience
                                    </h3>
                                    <p className="text-sm text-violet-800/80 mb-3">
                                        We found <strong className="text-violet-600 font-extrabold">{count} investors</strong> on Vibe Raising actively looking for updates matching your criteria:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {criteria.map(c => (
                                            <span key={c} className="px-2.5 py-1 bg-white border border-violet-200 text-violet-700 text-xs font-semibold rounded-lg shadow-sm">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Action buttons - below preview */}
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
                                        <input type="hidden" name="grade" value={feedback?.grade || "A+"} />
                                        <input type="hidden" name="videoUrl" value={videoPreviewUrl || ""} />
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

                    {/* RATING SIDEBAR - thin vertical bar on right */}
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
                                <div className="w-12 h-12 rounded-xl mb-2 bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
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

                        {/* Strengths - collapsible */}
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

                        {/* Improvements - collapsible */}
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

                        {/* Pro Tip - collapsible */}
                        <CollapsibleFeedback
                            icon={<LightBulbIcon className="w-3.5 h-3.5" />}
                            headline="Pro tip from AI"
                            color="blue"
                        >
                            <p className="text-xs text-violet-800 leading-relaxed">{feedback?.proTip}</p>
                        </CollapsibleFeedback>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Create/Edit Form View
    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="sticky top-0 z-10 py-4 mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                    {isEdit ? "Edit Monthly Update" : "Create Monthly Update"}
                </h1>
                <Link to={VIBE_RAISING_APP_PATH} className="text-gray-400 hover:text-gray-600">
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
                <input type="hidden" name="videoUrl" value={videoPreviewUrl || ""} />
                {!isViewingCurrentUpdate && (
                    <>
                        <input type="hidden" name="month" value={selectedMonth} />
                        <input type="hidden" name="year" value={selectedYear} />
                        <input type="hidden" name="highlights" value={highlights} />
                        <input type="hidden" name="challenges" value={challenges} />
                        <input type="hidden" name="asks" value={asks} />
                        {METRIC_OPTIONS.map((metric) => (
                            <input key={metric.key} type="hidden" name={metric.key} value={metricValues[metric.key] || ""} />
                        ))}
                    </>
                )}

                {/* Input Sections */}
                <div className="space-y-6">
                            <div>
                                <div
                                    className={clsx(
                                        "relative overflow-hidden rounded-2xl border bg-white p-8 transition-all shadow-sm",
                                        manualPathActive ? "border-violet-200 shadow-[0_24px_70px_-50px_rgba(109,40,217,0.25)]" : "border-gray-100",
                                        isDragActive ? "bg-violet-50/50 border-violet-200 scale-[1.01]" : "hover:bg-gray-50/50"
                                    )}
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

                                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-gray-400">
                                <CloudArrowUpIcon className="h-7 w-7 stroke-1" />
                            </div>

                            <div className="mb-4 flex items-center gap-2">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Say it your way
                                </h3>
                            </div>

                            <p className="max-w-2xl text-sm leading-6 text-gray-500">
                                Tell us what you&apos;ve been building, record a video, upload a file, or share a link.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isRecording) {
                                            stopRecording();
                                        } else {
                                            void startRecording();
                                        }
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowImportPanel(prev => !prev);
                                    }}
                                    className="px-6 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-gray-900 active:scale-95 transition-all shadow-sm"
                                >
                                    {showImportPanel ? "Hide file and link" : "Add local file or link"}
                                </button>
                            </div>

                            {recordingNotice && !recordingError && (
                                <p className="mt-4 text-sm font-medium text-amber-600">
                                    {recordingNotice}
                                </p>
                            )}

                            {recordingError && (
                                <p className="mt-4 text-sm font-medium text-red-600">
                                    {recordingError}
                                </p>
                            )}
                        </div>

                        {showImportPanel && (
                            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-5 shadow-sm">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                                            <LinkIcon className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <input
                                                type="url"
                                                name="sourceUrl"
                                                value={sourceUrl}
                                                onChange={(e) => setSourceUrl(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                placeholder="Paste a Notion, Google Doc, or similar link"
                                                inputMode="url"
                                                autoComplete="url"
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                                            />
                                        </div>
                                        {hasValidSourceUrl && (
                                            <a
                                                href={sourceUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100"
                                            >
                                                Open link
                                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>

                                    <div
                                        {...getRootProps()}
                                        className={clsx(
                                            "rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer bg-white",
                                            isDragActive
                                                ? "border-violet-300 bg-violet-50"
                                                : "border-gray-200 hover:border-violet-200 hover:bg-violet-50/40"
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            open();
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                                                <CloudArrowUpIcon className="h-6 w-6" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-900">
                                                Drop file
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(isRecording || videoPreviewUrl) && (
                            <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-5 shadow-sm">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                {isRecording
                                                    ? recordingMode === "audio"
                                                        ? "Recording audio"
                                                        : "Recording live preview"
                                                    : previewMediaKind === "audio"
                                                    ? "Recorded audio ready"
                                                    : "Recorded video ready"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {isRecording
                                                    ? recordingMode === "audio"
                                                        ? "Microphone is active. Click stop when you’re done."
                                                        : recordingNotice === "Microphone unavailable. Recording video without audio."
                                                        ? "Camera is active. Click stop when you’re done."
                                                        : "Camera and microphone are active. Click stop when you’re done."
                                                    : "This preview will be shown in review while you draft your update."}
                                            </p>
                                        </div>
                                        {!isRecording && videoPreviewUrl && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRecordingNotice(null);
                                                    replacePreviewMedia(null, null);
                                                }}
                                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                                            >
                                                Remove media
                                            </button>
                                        )}
                                    </div>

                                    <div className="overflow-hidden rounded-2xl bg-black">
                                        {isRecording && recordingMode === "video" ? (
                                            <video
                                                ref={livePreviewRef}
                                                muted
                                                autoPlay
                                                playsInline
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : isRecording && recordingMode === "audio" ? (
                                            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 px-6 text-center text-white">
                                                <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                                                <p className="text-sm font-semibold">Recording audio only</p>
                                                <p className="max-w-xs text-xs text-white/70">
                                                    We couldn&apos;t access a camera, so this recording will capture microphone audio.
                                                </p>
                                            </div>
                                        ) : previewMediaKind === "audio" ? (
                                            <div className="flex aspect-video w-full items-center justify-center px-6">
                                                <audio
                                                    src={videoPreviewUrl || undefined}
                                                    controls
                                                    className="w-full max-w-md"
                                                />
                                            </div>
                                        ) : (
                                            <video
                                                src={videoPreviewUrl || undefined}
                                                controls
                                                className="aspect-video w-full object-contain"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={openEmailDraftFlow}
                                    className={clsx(
                                        "group w-full overflow-hidden rounded-2xl border border-black bg-black p-6 text-left shadow-[0_24px_70px_-50px_rgba(0,0,0,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_80px_-50px_rgba(0,0,0,0.8)]",
                                        emailPathActive
                                            ? "ring-2 ring-purple-400/40"
                                            : ""
                                    )}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                        <SparklesIcon className="h-7 w-7" />
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-white">
                                            AI Drafting
                                        </h3>
                                    </div>

                                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72">
                                        AI agent will scan your filtered email to find key signals, metrics, wins, and asks, then help you make your first draft in seconds.
                                    </p>
                                </button>
                            </div>
                </div>

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
                        {/* Past month cards - grayed-out, peeking behind current */}
                        {pastMonthCards.map((card, index) => (
                            <div key={index} id={`past-month-${index}`} className="hidden">
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
                                        {/* Metrics - square boxes */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Metrics</label>
                                            <div className="grid grid-cols-4 gap-2">
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
                                                                "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-1.5 cursor-pointer transition-all",
                                                                active
                                                                    ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                                                                    : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                            )}
                                                        >
                                                            <MetricInfoBadge info={m.info} />
                                                            <div className={clsx(
                                                                "w-5 h-5 rounded-full flex items-center justify-center mb-1",
                                                                active ? "bg-violet-100" : "bg-white"
                                                            )}>
                                                                {m.icon}
                                                            </div>
                                                             {active ? (
                                                                <div className="flex items-center justify-center gap-0.5 w-full" onClick={(e) => e.stopPropagation()}>
                                                                    {m.prefix && (
                                                                        <span className="text-xs font-extrabold text-gray-900">{m.prefix}</span>
                                                                    )}
                                                                    <input
                                                                        autoFocus
                                                                        onFocus={(e) => e.currentTarget.select()}
                                                                        type="text"
                                                                        value={card.metrics[m.key] ?? ""}
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        onChange={(e) => updatePastMonthMetric(index, m.key, e.target.value)}
                                                                        placeholder={m.placeholder}
                                                                        className="w-full text-xs font-extrabold text-gray-900 bg-transparent border-b-2 border-violet-300 focus:border-violet-500 focus:outline-none text-center py-0.5 min-w-0"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <p className="text-xs font-extrabold text-gray-300">-</p>
                                                            )}
                                                            <MetricTooltip m={m} active={!!card.metrics[m.key]} className="text-[8px]" />
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

                        {/* Current month card - prominent, always visible */}
                        <div
                            id="current-month-card"
                            className={clsx(
                                "relative rounded-xl border-2 bg-white p-6 pt-14 space-y-5 shadow-md ring-1 scroll-mt-24",
                                activeMonthTheme.borderClass,
                                activeMonthTheme.ringClass,
                            )}
                        >
                            <MonthYearTabs
                                month={activeDisplayMonth}
                                year={activeDisplayYear}
                                onMonthChange={setSelectedMonth}
                                onYearChange={setSelectedYear}
                                periodTabs={periodTabs}
                                activePeriodKey={activeMonthKey}
                                onPeriodChange={setActiveMonthKey}
                                submitDateFields={isViewingCurrentUpdate}
                                isDateEditable={isViewingCurrentUpdate}
                                statusLabel={isViewingCurrentUpdate ? "Current Update" : "Previous Update"}
                                showInfoControl={pastMonthCards.length > 0}
                            />

                            
                            {/* Company Summary / One-Liner */}
                            <div className={clsx("p-5 rounded-2xl border shadow-sm mb-6", activeMonthTheme.softClass, activeMonthTheme.borderClass)}>
                                <div className="flex items-center gap-2 mb-3">
                                    <LightBulbIcon className="w-5 h-5 text-violet-500" />
                                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-widest">
                                        What does your company do?
                                    </label>
                                </div>
                                <textarea
                                    name="summary"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    rows={2}
                                    placeholder={(SECTION_HINTS.summary || [])[0]}
                                    className={clsx("w-full px-4 py-3 text-base font-semibold text-gray-900 bg-white border-2 rounded-xl focus:ring-0 placeholder:text-gray-300 placeholder:italic transition-all resize-none shadow-sm", activeMonthTheme.inputClass)}
                                />
                                <p className="mt-2 text-[10px] font-medium text-gray-400 uppercase tracking-widest italic text-center">A very short summary (max 2 lines) that clearly explains your business</p>
                            </div>


                            {/* Metrics - square boxes, click to activate */}
                            {(() => {
                                const allMetrics = [
                                    ...METRIC_OPTIONS,
                                    ...(isViewingCurrentUpdate ? customMetrics.map(cm => ({
                                        key: cm.key,
                                        label: cm.label,
                                        placeholder: "Value",
                                        icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />,
                                        isCustom: true
                                    })) : [])
                                ];
                                
                                const addCustomMetric = () => {
                                    const key = `customMetric_${Date.now()}`;
                                    setCustomMetrics(prev => [...prev, { key, label: "Custom Metric", prefix: "", value: "" }]);
                                    setSelectedMetrics(prev => {
                                        const next = new Set(prev);
                                        next.add(key);
                                        return next;
                                    });
                                };

                                return (
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {allMetrics.map((m: any) => {
                                            const active = activeSelectedMetrics.has(m.key);
                                            return (
                                                <div
                                                    key={m.key}
                                                    onClick={() => toggleActiveMetric(m.key)}
                                                    className={clsx(
                                                        "relative flex-1 min-w-[calc(25%-10px)] max-w-full rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                        active
                                                            ? clsx(activeMonthTheme.borderClass, activeMonthTheme.softClass, activeMonthTheme.ringClass, "ring-1 shadow-sm")
                                                            : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                    )}
                                                >
                                                    {m.info && <MetricInfoBadge info={m.info} />}
                                                    {m.isCustom && (
                                                        <input type="hidden" name={`${m.key}_label`} value={m.label} />
                                                    )}
                                                    <div className={clsx(
                                                        "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                        active ? "bg-violet-100" : "bg-white"
                                                    )}>
                                                        {m.icon}
                                                    </div>
                                                    {active ? (
                                                        <div className="flex items-center justify-center w-full" onClick={(e) => e.stopPropagation()}>
                                                            {m.prefix && (
                                                                <span className="text-base font-extrabold text-gray-900 pl-1">{m.prefix}</span>
                                                            )}
                                                            <input
                                                                autoFocus={m.isCustom}
                                                                onFocus={(e) => e.currentTarget.select()}
                                                                type="text"
                                                                name={isViewingCurrentUpdate ? m.key : undefined}
                                                                value={activeMetricValues[m.key] ?? ""}
                                                                onClick={(e) => e.stopPropagation()}
                                                                onChange={(e) => updateActiveMetricValue(m.key, e.target.value)}
                                                                placeholder={m.placeholder}
                                                                className={clsx("w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 focus:outline-none text-center py-0.5 min-w-0", activeMonthTheme.inputClass)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <p className="text-base font-extrabold text-gray-300">-</p>
                                                    )}
                                                    
                                                    {/* Tooltip or Editable Label for custom metrics */}
                                                    <div className="mt-0.5" onClick={e => e.stopPropagation()}>
                                                        {m.isCustom ? (
                                                            <input
                                                                type="text"
                                                                value={m.label}
                                                                onChange={(e) => {
                                                                    setCustomMetrics(prev => prev.map((cm) => cm.key === m.key ? { ...cm, label: e.target.value } : cm));
                                                                }}
                                                                className={clsx("font-semibold uppercase tracking-wide text-center bg-transparent border-b border-dashed focus:outline-none text-[10px] w-full", active ? "text-gray-600 border-gray-400 focus:border-violet-500" : "text-gray-400 border-gray-300")}
                                                            />
                                                        ) : (
                                                            <MetricTooltip m={m} active={!!activeMetricValues[m.key]} className="text-[10px]" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        
                                        {/* Add Custom Metric Card */}
                                        {isViewingCurrentUpdate && (
                                            <div
                                                onClick={addCustomMetric}
                                                className="relative min-w-[calc(25%-10px)] max-w-[calc(25%-10px)] rounded-xl border border-dashed border-gray-300 bg-white hover:bg-gray-50 flex flex-col items-center justify-center text-center py-4 px-2 cursor-pointer transition-all shadow-sm group"
                                            >
                                                <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center mb-1 group-hover:bg-violet-50 group-hover:border-violet-200 group-hover:text-violet-500 transition-colors">
                                                    <PlusIcon className="w-4 h-4 text-gray-400 group-hover:text-violet-500" />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-violet-500">
                                                    Add Metric
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                );
                            })()}

                            {/* Qualitative fields - auto-expanding, no scroll */}
                            <div className="space-y-4">
                                <SectionWithExample
                                    label="Key Highlights"
                                    name={isViewingCurrentUpdate ? "highlights" : `pastMonth_${activePastIndex}_highlights`}
                                    value={activeHighlights}
                                    onChange={updateActiveHighlights}
                                    rows={3}
                                    placeholder="What went well this month? Major wins, product launches, partnerships..."
                                    icon={SparklesIcon}
                                />
                                <SectionWithExample
                                    label="Challenges"
                                    name={isViewingCurrentUpdate ? "challenges" : `pastMonth_${activePastIndex}_challenges`}
                                    value={activeChallenges}
                                    onChange={updateActiveChallenges}
                                    rows={3}
                                    placeholder="What obstacles are you facing? Where do you need help?"
                                    icon={ExclamationCircleIcon}
                                />
                                <SectionWithExample
                                    label="Ask from Investors"
                                    name={isViewingCurrentUpdate ? "asks" : `pastMonth_${activePastIndex}_asks`}
                                    value={activeAsks}
                                    onChange={updateActiveAsks}
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
                    <div
                        className={clsx(
                            "relative rounded-xl border-2 bg-white p-6 pt-14 space-y-5 shadow-sm ring-1",
                            activeMonthTheme.borderClass,
                            activeMonthTheme.ringClass,
                        )}
                    >
                        <MonthYearTabs
                            month={selectedMonth}
                            year={selectedYear}
                            onMonthChange={setSelectedMonth}
                            onYearChange={setSelectedYear}
                            statusLabel="Current Update"
                        />
                        
                        {/* Company Summary / One-Liner */}
                        <div className={clsx("p-5 rounded-2xl border shadow-sm mb-6", activeMonthTheme.softClass, activeMonthTheme.borderClass)}>
                            <div className="flex items-center gap-2 mb-3">
                                <LightBulbIcon className="w-5 h-5 text-violet-500" />
                                <label className="block text-sm font-bold text-gray-900 uppercase tracking-widest">
                                    What does your company do?
                                </label>
                            </div>
                            <textarea
                                name="summary"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                rows={2}
                                placeholder={(SECTION_HINTS.summary || [])[0]}
                                className={clsx("w-full px-4 py-3 text-base font-semibold text-gray-900 bg-white border-2 rounded-xl focus:ring-0 placeholder:text-gray-300 placeholder:italic transition-all resize-none shadow-sm", activeMonthTheme.inputClass)}
                            />
                            <p className="mt-2 text-[10px] font-medium text-gray-400 uppercase tracking-widest italic text-center">A very short summary (max 2 lines) that clearly explains your business</p>
                        </div>

                        {/* Metrics - square boxes, click to activate */}
                            {(() => {
                                const allMetrics = [
                                    ...METRIC_OPTIONS,
                                    ...customMetrics.map(cm => ({
                                        key: cm.key,
                                        label: cm.label,
                                        placeholder: "Value",
                                        icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />,
                                        isCustom: true
                                    }))
                                ];
                                
                                const addCustomMetric = () => {
                                    const key = `customMetric_${Date.now()}`;
                                    setCustomMetrics(prev => [...prev, { key, label: "Custom Metric", prefix: "", value: "" }]);
                                    setSelectedMetrics(prev => {
                                        const next = new Set(prev);
                                        next.add(key);
                                        return next;
                                    });
                                };

                                return (
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {allMetrics.map((m: any) => {
                                            const active = selectedMetrics.has(m.key);
                                            return (
                                                <div
                                                    key={m.key}
                                                    onClick={() => toggleMetric(m.key)}
                                                    className={clsx(
                                                        "relative flex-1 min-w-[calc(25%-10px)] max-w-full rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                        active
                                                            ? clsx(activeMonthTheme.borderClass, activeMonthTheme.softClass, activeMonthTheme.ringClass, "ring-1 shadow-sm")
                                                            : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                    )}
                                                >
                                                    {m.info && <MetricInfoBadge info={m.info} />}
                                                    {m.isCustom && (
                                                        <input type="hidden" name={`${m.key}_label`} value={m.label} />
                                                    )}
                                                    <div className={clsx(
                                                        "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                        active ? "bg-violet-100" : "bg-white"
                                                    )}>
                                                        {m.icon}
                                                    </div>
                                                    {active ? (
                                                        <div className="flex items-center justify-center w-full" onClick={(e) => e.stopPropagation()}>
                                                            {m.prefix && (
                                                                <span className="text-base font-extrabold text-gray-900 pl-1">{m.prefix}</span>
                                                            )}
                                                            <input
                                                                autoFocus={m.isCustom}
                                                                onFocus={(e) => e.currentTarget.select()}
                                                                type="text"
                                                                name={m.key}
                                                                value={metricValues[m.key] ?? ""}
                                                                onClick={(e) => e.stopPropagation()}
                                                                onChange={(e) => setMetricValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                                                                placeholder={m.placeholder}
                                                                className={clsx("w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 focus:outline-none text-center py-0.5 min-w-0", activeMonthTheme.inputClass)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <p className="text-base font-extrabold text-gray-300">-</p>
                                                    )}
                                                    
                                                    {/* Tooltip or Editable Label for custom metrics */}
                                                    <div className="mt-0.5" onClick={e => e.stopPropagation()}>
                                                        {m.isCustom ? (
                                                            <input
                                                                type="text"
                                                                value={m.label}
                                                                onChange={(e) => {
                                                                    setCustomMetrics(prev => prev.map((cm) => cm.key === m.key ? { ...cm, label: e.target.value } : cm));
                                                                }}
                                                                className={clsx("font-semibold uppercase tracking-wide text-center bg-transparent border-b border-dashed focus:outline-none text-[10px] w-full", active ? "text-gray-600 border-gray-400 focus:border-violet-500" : "text-gray-400 border-gray-300")}
                                                            />
                                                        ) : (
                                                            <MetricTooltip m={m} active={!!metricValues[m.key]} className="text-[10px]" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        
                                        {/* Add Custom Metric Card */}
                                        <div
                                            onClick={addCustomMetric}
                                            className="relative min-w-[calc(25%-10px)] max-w-[calc(25%-10px)] rounded-xl border border-dashed border-gray-300 bg-white hover:bg-gray-50 flex flex-col items-center justify-center text-center py-4 px-2 cursor-pointer transition-all shadow-sm group"
                                        >
                                            <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center mb-1 group-hover:bg-violet-50 group-hover:border-violet-200 group-hover:text-violet-500 transition-colors">
                                                <PlusIcon className="w-4 h-4 text-gray-400 group-hover:text-violet-500" />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-violet-500">
                                                Add Metric
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                );
                            })()}

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
                        onClick={() => navigate(VIBE_RAISING_APP_PATH)}
                        className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 shadow-sm"
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
