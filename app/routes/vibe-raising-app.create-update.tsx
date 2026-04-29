import { Form, Link, useActionData, useLocation, useNavigate, useNavigation, useLoaderData, redirect } from "react-router";
import React, { startTransition, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import { getEnv } from "~/lib/env.server";
import {
    cancelVibeRaisingStartupUpdate,
    requireVibeRaisingFounder,
    bootstrapVibeRaisingStartupUpdate,
    getVibeRaisingMonthlyUpdates,
    getVibeRaisingStartupUpdateActiveRun,
    getVibeRaisingStartupUpdateDraftResults,
    getVibeRaisingStartupUpdateStatus,
    runVibeRaisingStartupUpdate,
    saveVibeRaisingMonthlyUpdate,
    uploadVibeRaisingUpdateVideo,
} from "~/lib/vibe-raising";
import {
    XMarkIcon,
    SparklesIcon,
    ArrowPathIcon,
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
    InformationCircleIcon,
    LinkIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import { clsx } from "clsx";
import DraftFromEmailWizard from "~/components/DraftFromEmailWizard";
import EmailDraftInProgressCard from "~/components/EmailDraftInProgressCard";
import MonthlyUpdateStepper, { type MonthlyUpdateStepKey } from "~/components/MonthlyUpdateStepper";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import VibeRaisingStickyStepBar from "~/components/VibeRaisingStickyStepBar";
import { getVibeRaisingMonthTheme, parseVibeRaisingMonthYear, VIBE_RAISING_MONTH_OPTIONS, VibeRaisingDateTabs } from "~/components/VibeRaisingDateTabs";
import type {
    VibeRaisingInputSourceKey,
    VibeRaisingMetricSuggestion,
    VibeRaisingMonthlyUpdate,
    VibeRaisingStartupUpdateStatusResponse,
    VibeRaisingVideoCompressionMetadata,
} from "~/types/vibe-raising";

const VALID_INPUT_SOURCE_KEYS = new Set<VibeRaisingInputSourceKey>([
    "gmail",
    "stripe",
    "xero",
    "bank_feed",
    "notion",
    "google_drive",
    "slack",
    "linear",
]);

const INPUT_SOURCE_LABELS: Record<VibeRaisingInputSourceKey, string> = {
    gmail: "Gmail",
    stripe: "Stripe",
    xero: "Xero",
    bank_feed: "Bank Feed",
    notion: "Notion",
    google_drive: "Google Drive",
    slack: "Slack",
    linear: "Linear",
};

const DEFAULT_BACKEND_BASE_URL = "https://api.mlai.au";
const MANUAL_MATERIALS_STORAGE_KEY = "vibe_raising_manual_materials";
const SHOW_AI_REVIEW_FEEDBACK = false;
const DRAFT_REVIEW_FORM_ID = "vibe-raising-draft-review-form";

function readStoredManualMaterials(): { summary: string; sourceUrl: string } {
    if (typeof window === "undefined") return { summary: "", sourceUrl: "" };
    try {
        const raw = window.localStorage.getItem(MANUAL_MATERIALS_STORAGE_KEY);
        if (!raw) return { summary: "", sourceUrl: "" };
        const parsed = JSON.parse(raw) as { summary?: unknown; sourceUrl?: unknown };
        return {
            summary: typeof parsed.summary === "string" ? parsed.summary : "",
            sourceUrl: typeof parsed.sourceUrl === "string" ? parsed.sourceUrl : "",
        };
    } catch {
        return { summary: "", sourceUrl: "" };
    }
}

function parseInputSources(value: string | null): VibeRaisingInputSourceKey[] {
    if (!value) return [];
    const seen = new Set<VibeRaisingInputSourceKey>();
    value
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .forEach((item) => {
            if (VALID_INPUT_SOURCE_KEYS.has(item as VibeRaisingInputSourceKey)) {
                seen.add(item as VibeRaisingInputSourceKey);
            }
        });
    return Array.from(seen);
}

function getMonthlyUpdateKey(month: string, year: number | string) {
    const monthIndex = VIBE_RAISING_MONTH_OPTIONS.findIndex((option) => option.name === month);
    const parsedYear = Number(year);
    if (monthIndex < 0 || !Number.isFinite(parsedYear)) return "";
    return `${parsedYear}-${String(monthIndex + 1).padStart(2, "0")}`;
}

function getMonthlyUpdateIsoMonth(month: string, year: number | string) {
    const key = getMonthlyUpdateKey(month, year);
    return key ? `${key}-01` : "";
}

function isFutureMonthlyUpdate(month: string, year: number | string) {
    const monthIndex = VIBE_RAISING_MONTH_OPTIONS.findIndex((option) => option.name === month);
    const parsedYear = Number(year);
    if (monthIndex < 0 || !Number.isFinite(parsedYear)) return true;
    const now = new Date();
    return parsedYear > now.getFullYear() || (parsedYear === now.getFullYear() && monthIndex > now.getMonth());
}

function getMonthlyUpdateStorageKey(update: VibeRaisingMonthlyUpdate) {
    const isoMonth = String(update.isoMonth || "").trim();
    const isoMatch = isoMonth.match(/^(\d{4})-(\d{2})/);
    if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}`;

    if (update.monthName && update.year) {
        return getMonthlyUpdateKey(update.monthName, update.year);
    }

    const parsed = parseVibeRaisingMonthYear(update.month);
    return getMonthlyUpdateKey(parsed.month, parsed.year);
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);

    // Require company registration before creating updates
    if (!user.companyRegistered) {
        throw redirect("/founder-tools/company-setup");
    }

    // Check for edit mode
    const url = new URL(request.url);
    const editId = url.searchParams.get("edit");
    const resumeEmailDrafting =
        url.searchParams.get("email_draft") === "1" ||
        url.searchParams.get("draft_from_email") === "1";
    const selectedInputSources = parseInputSources(url.searchParams.get("inputs"));

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
            asks: "Looking for introductions to VP of Customer Success at B2B SaaS companies to help optimize our onboarding process. Would appreciate feedback on our pricing strategy as we move upmarket.",
            learnings: "Enterprise buyers care most about implementation speed once the security review is complete.",
            next30Days: "Reduce onboarding time to 10 days and close two more enterprise pilots."
        };
    }

    const existingMonthlyUpdates = await getVibeRaisingMonthlyUpdates(env, request);

    return {
        user,
        existingData,
        isEdit: !!editId,
        backendBaseUrl: String(env.BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL),
        resumeEmailDrafting,
        selectedInputSources,
        existingMonthlyUpdates,
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
        const dynamicMetricKeys = String(formData.get("metricKeys") || "")
            .split(",")
            .map((key) => key.trim())
            .filter((key) => key && METRIC_OPTION_MAP.has(key));
        const selectedMetricKeys = Array.from(new Set(dynamicMetricKeys));
        const metricKeys = Array.from(new Set([...METRIC_FORM_KEYS, ...selectedMetricKeys]));
        const metrics = Object.fromEntries(
            metricKeys
                .map((key) => [key, String(formData.get(key) || "").trim()] as const)
                .filter(([, value]) => value.length > 0),
        );
        const metricSuggestions = metricSuggestionsFromKeys(selectedMetricKeys, metrics);
        const rawVideoUrl = String(formData.get("videoUrl") || "").trim();
        const rawVideoFileSizeBytes = Number(formData.get("videoFileSizeBytes") || 0);

        await saveVibeRaisingMonthlyUpdate(env, request, {
            month: String(formData.get("month") || "").trim(),
            year: Number(formData.get("year") || 0),
            summary: String(formData.get("summary") || "").trim() || null,
            sourceUrl: String(formData.get("sourceUrl") || "").trim() || null,
            videoUrl: rawVideoUrl && !rawVideoUrl.startsWith("blob:") ? rawVideoUrl : null,
            videoStoragePath: String(formData.get("videoStoragePath") || "").trim() || null,
            videoContentType: String(formData.get("videoContentType") || "").trim() || null,
            videoFileSizeBytes: Number.isFinite(rawVideoFileSizeBytes) && rawVideoFileSizeBytes > 0 ? rawVideoFileSizeBytes : null,
            videoOriginalFilename: String(formData.get("videoOriginalFilename") || "").trim() || null,
            highlights: String(formData.get("highlights") || ""),
            challenges: String(formData.get("challenges") || ""),
            asks: String(formData.get("asks") || ""),
            learnings: String(formData.get("learnings") || ""),
            next30Days: String(formData.get("next30Days") || ""),
            metrics,
            metricSuggestions,
        });

        return redirect("/founder-tools/updates");
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

const METRIC_OPTIONS: MetricOption[] = [
    { key: "revenue", label: "Revenue (AUD)", placeholder: "50,000", prefix: "$", icon: <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />, info: "Your total income this month." },
    { key: "activeUsers", label: "Active Users", placeholder: "1,500", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Unique users who engaged with your product this month." },
    { key: "mrr", label: "MRR (AUD)", placeholder: "10,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Monthly recurring revenue from active subscriptions." },
    { key: "burnRate", label: "Burn Rate (AUD)", placeholder: "20,000", prefix: "$", icon: <FireIcon className="w-4 h-4 text-gray-400" />, info: "How much capital the company is spending per month." },
    { key: "runway", label: "Runway", placeholder: "18 months", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Estimated time before the company needs more funding." },
    { key: "monthlyCosts", label: "Costs (AUD)", placeholder: "25,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Total monthly costs from Xero Profit and Loss expense rows." },
    { key: "invoiceRevenue", label: "Invoice Revenue", placeholder: "45,000", prefix: "$", icon: <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />, info: "Sales invoice revenue from accounting data." },
    { key: "cashCollected", label: "Cash Collected", placeholder: "42,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Cash received from accounting payments." },
    { key: "revenueGrowthRate", label: "Revenue Growth", placeholder: "12%", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Month-on-month revenue or MRR growth when source data supports it." },
    { key: "customerCount", label: "Customers", placeholder: "24", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Number of active or paying customers when source data supports it." },
    { key: "churn", label: "Churn", placeholder: "2%", icon: <ArrowPathIcon className="w-4 h-4 text-gray-400" />, info: "Customer or revenue churn when source data supports it." },
    { key: "invoiceCount", label: "Invoices", placeholder: "12", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Sales invoice count or invoices sent this month." },
    { key: "recurringInvoiceCount", label: "Recurring Invoices", placeholder: "6", icon: <ArrowPathIcon className="w-4 h-4 text-gray-400" />, info: "Active recurring invoice count from accounting data." },
    { key: "websiteVisitors", label: "Website Visitors", placeholder: "1,200", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Visitors to the company website this month." },
    { key: "waitlistSignups", label: "Waitlist Signups", placeholder: "85", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "People who joined the waitlist this month." },
    { key: "demoRequests", label: "Demo Requests", placeholder: "14", icon: <ArrowRightIcon className="w-4 h-4 text-gray-400" />, info: "Inbound requests to see or try the product." },
    { key: "customerInterviews", label: "Customer Interviews", placeholder: "10", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Potential or current customers interviewed this month." },
    { key: "experimentsRun", label: "Experiments Run", placeholder: "4", icon: <LightBulbIcon className="w-4 h-4 text-gray-400" />, info: "Validation, growth, product, or pricing experiments completed." },
    { key: "pilotCount", label: "Pilots", placeholder: "3", icon: <SparklesIcon className="w-4 h-4 text-gray-400" />, info: "Active pilots, design partners, or trials." },
    { key: "qualifiedPipeline", label: "Qualified Pipeline", placeholder: "250,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Qualified sales pipeline with customer intent." },
];

const METRIC_OPTION_MAP = new Map(METRIC_OPTIONS.map((option) => [option.key, option]));
const METRIC_FORM_KEYS = METRIC_OPTIONS.map((option) => option.key);

function getMetricOptionsForMetrics(metrics?: Record<string, string>) {
    const keys = Object.keys(metrics || {}).filter((key) => String(metrics?.[key] || "").trim());
    return METRIC_OPTIONS.filter((option) => keys.includes(option.key));
}

function getMetricOptionsForDisplay(metrics?: Record<string, string>) {
    return getMetricOptionsForMetrics(metrics);
}

function getEditableMetricOptions(metrics?: Record<string, string>, selected?: Set<string>) {
    return METRIC_OPTIONS.filter((option) => {
        const hasKnownValue = Object.prototype.hasOwnProperty.call(metrics || {}, option.key);
        const isSelected = selected?.has(option.key) ?? false;
        return hasKnownValue || isSelected || METRIC_OPTION_MAP.has(option.key);
    });
}

function metricKeysFromSuggestions(suggestions?: VibeRaisingMetricSuggestion[]) {
    return (suggestions || [])
        .map((suggestion) => suggestion.metricKey)
        .filter((key) => METRIC_OPTION_MAP.has(key));
}

function metricSuggestionsFromKeys(keys: string[], metrics: Record<string, string>) {
    const suggestions: VibeRaisingMetricSuggestion[] = [];
    const seen = new Set<string>();
    keys.forEach((key) => {
        if (seen.has(key) || !METRIC_OPTION_MAP.has(key) || String(metrics[key] || "").trim()) return;
        seen.add(key);
        const option = METRIC_OPTION_MAP.get(key);
        suggestions.push({ metricKey: key, label: option?.label || key, reason: "" });
    });
    return suggestions;
}

function metricOptionsFromKeys(keys: string[]) {
    const selected = new Set(keys.filter((key) => METRIC_OPTION_MAP.has(key)));
    return METRIC_OPTIONS.filter((option) => selected.has(option.key));
}

function MetricInfoBadge({ info }: { info?: string }) {
    if (!info) return null;

    return (
        <div className="group absolute right-1.5 top-1.5">
            <div className="cursor-help text-gray-300 transition-colors hover:text-gray-500">
                <InformationCircleIcon className="h-3.5 w-3.5" />
            </div>
            <div className="pointer-events-none absolute bottom-full right-0 z-50 mb-2 w-48 translate-y-1 rounded-lg bg-gray-900 px-3 py-2 text-left text-[11px] font-medium leading-4 text-white opacity-0 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {info}
                <div className="absolute right-2 top-full h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-900" />
            </div>
        </div>
    );
}

function MonthYearTabs({
    month,
    year,
    onMonthChange,
    onYearChange,
    onPeriodChange,
    submitDateFields = true,
    isDateEditable = true,
}: {
    month: string;
    year: number;
    onMonthChange: (month: string) => void;
    onYearChange: (year: number) => void;
    onPeriodChange?: (key: string) => void;
    submitDateFields?: boolean;
    isDateEditable?: boolean;
}) {
    const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
    const yearMenuRef = useRef<HTMLDivElement | null>(null);
    const yearOptions = Array.from({ length: 11 }, (_, index) => year - 5 + index);

    useEffect(() => {
        if (!isYearMenuOpen) return;

        const closeOnOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (isYearMenuOpen && !yearMenuRef.current?.contains(target)) {
                setIsYearMenuOpen(false);
            }
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsYearMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isYearMenuOpen]);

    return (
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch">
            <div className="min-w-0 flex-1">
                {submitDateFields && <input type="hidden" name="month" value={month} />}
                <div className="overflow-hidden rounded-t-2xl rounded-b-lg border border-[var(--vr-color-border)] bg-white shadow-xl ring-1 ring-white/40">
                    <div role="listbox" aria-label="Update month" className="grid w-full grid-cols-12">
                        {VIBE_RAISING_MONTH_OPTIONS.map((option) => {
                            const isSelected = option.name === month;
                            return (
                                <button
                                    key={option.name}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    disabled={!isDateEditable}
                                    onClick={() => {
                                        if (!isDateEditable) return;
                                        onMonthChange(option.name);
                                        onPeriodChange?.("current");
                                        setIsYearMenuOpen(false);
                                    }}
                                    className={clsx(
                                        "flex min-h-[54px] min-w-0 items-center justify-center border-r border-[var(--vr-color-border)] px-1 text-center text-[9px] font-black uppercase tracking-[0.08em] transition-colors last:border-r-0 sm:text-[10px] md:text-[11px]",
                                        isDateEditable ? "cursor-pointer" : "cursor-default",
                                        isSelected
                                            ? `${option.tabClass} ${option.textClass} shadow-none`
                                            : "bg-[var(--vr-palette-paper)] text-slate-500 hover:bg-white hover:text-gray-950",
                                    )}
                                >
                                    <span className="truncate">{option.name.slice(0, 3).toUpperCase()}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div ref={yearMenuRef} className="relative sm:min-w-[108px]">
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

const EMAIL_DRAFT_POLL_INTERVAL_MS = 5000;
const EMAIL_DRAFT_POLL_BACKOFF_MS = 10000;

type PersistedEmailDraftRun = {
    runId: string;
    domain: string;
    bindingId?: number | null;
    googleConnectionId?: number | null;
};

type RecordedMediaKind = "video" | "audio";
type VideoUploadStatus = "idle" | "validating" | "compressing" | "creating_session" | "uploading" | "finalizing" | "ready" | "error";

const MAX_VIDEO_UPLOAD_BYTES = 50 * 1024 * 1024;
const MAX_SOURCE_VIDEO_BYTES = 50 * 1024 * 1024;
const VIDEO_COMPRESSION_THRESHOLD_BYTES = 75 * 1024 * 1024;
const FFMPEG_CORE_BASE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
const SUPPORTED_VIDEO_EXTENSIONS = [
    ".mp4",
    ".mov",
    ".m4v",
    ".webm",
    ".avi",
    ".mpeg",
    ".mpg",
    ".3gp",
    ".3g2",
    ".ogv",
    ".mkv",
];
const VIDEO_ACCEPT = {
    "video/mp4": [".mp4", ".m4v"],
    "video/quicktime": [".mov"],
    "video/webm": [".webm"],
    "video/x-msvideo": [".avi"],
    "video/mpeg": [".mpeg", ".mpg"],
    "video/3gpp": [".3gp"],
    "video/3gpp2": [".3g2"],
    "video/ogg": [".ogv"],
    "video/x-matroska": [".mkv"],
    "video/*": SUPPORTED_VIDEO_EXTENSIONS,
    "application/octet-stream": [".mkv", ".avi", ".mov", ".mp4"],
};
const VIDEO_EXTENSION_CONTENT_TYPES: Record<string, string> = {
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".m4v": "video/x-m4v",
    ".webm": "video/webm",
    ".avi": "video/x-msvideo",
    ".mpeg": "video/mpeg",
    ".mpg": "video/mpeg",
    ".3gp": "video/3gpp",
    ".3g2": "video/3gpp2",
    ".ogv": "video/ogg",
    ".mkv": "video/x-matroska",
};

type DraftStageKey = "reporting";
const BROWSER_PLAYABLE_VIDEO_TYPES = new Set([
    "video/mp4",
    "video/x-m4v",
    "video/webm",
    "video/ogg",
    "video/quicktime",
]);

let ffmpegLoaderPromise: Promise<{
    ffmpeg: any;
    fetchFile: (input: File | Blob | string) => Promise<Uint8Array>;
}> | null = null;

function formatFileSize(bytes?: number | null) {
    if (!bytes || !Number.isFinite(bytes)) return "";
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
    if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${bytes} B`;
}

function getFileExtension(fileName?: string | null) {
    const cleanName = String(fileName || "").split("?")[0].toLowerCase();
    const dotIndex = cleanName.lastIndexOf(".");
    return dotIndex >= 0 ? cleanName.slice(dotIndex) : "";
}

function inferVideoContentType(contentType?: string | null, fileName?: string | null) {
    const normalized = String(contentType || "").split(";")[0].trim().toLowerCase();
    if (normalized) return normalized;
    return VIDEO_EXTENSION_CONTENT_TYPES[getFileExtension(fileName)] || "";
}

function isBrowserPlayableVideo(contentType?: string | null, fileName?: string | null) {
    const inferredType = inferVideoContentType(contentType, fileName);
    if (!inferredType) return true;
    if (!BROWSER_PLAYABLE_VIDEO_TYPES.has(inferredType)) return false;
    if (typeof document === "undefined") return true;
    return document.createElement("video").canPlayType(inferredType).length > 0;
}

function isSupportedVideoFile(file: File) {
    const contentType = String(file.type || "").toLowerCase();
    if (contentType.startsWith("video/")) return true;
    return SUPPORTED_VIDEO_EXTENSIONS.includes(getFileExtension(file.name));
}

function getDropzoneRejectionMessage(fileRejections: Array<{ errors: Array<{ code: string; message: string }> }>) {
    const firstError = fileRejections[0]?.errors[0];
    if (!firstError) return "We couldn't use that file. Please try another video.";
    if (firstError.code === "file-too-large") return "File is too large. Use a file under 50 MB.";
    if (firstError.code === "file-invalid-type") {
        return "Use a common video format: MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.";
    }
    return firstError.message || "We couldn't use that file. Please try another video.";
}

function shouldCompressVideo(file: File, forceCompress?: boolean) {
    return forceCompress || file.size > VIDEO_COMPRESSION_THRESHOLD_BYTES;
}

function getCompressedVideoName(file: File) {
    const stem = String(file.name || "update-video").replace(/\.[^.]+$/, "") || "update-video";
    return `${stem}-compressed.mp4`;
}

async function getFfmpegVideoCompressor() {
    if (!ffmpegLoaderPromise) {
        ffmpegLoaderPromise = (async () => {
            const [{ FFmpeg }, { fetchFile, toBlobURL }] = await Promise.all([
                import("@ffmpeg/ffmpeg"),
                import("@ffmpeg/util"),
            ]);
            const ffmpeg = new FFmpeg();
            await ffmpeg.load({
                coreURL: await toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
                wasmURL: await toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
            });
            return { ffmpeg, fetchFile };
        })();
    }
    return ffmpegLoaderPromise;
}

async function compressVideoForUpload(file: File, signal: AbortSignal): Promise<{ file: File; metadata: VibeRaisingVideoCompressionMetadata }> {
    if (signal.aborted) throw new DOMException("Upload cancelled", "AbortError");

    const { ffmpeg, fetchFile } = await getFfmpegVideoCompressor();
    if (signal.aborted) throw new DOMException("Upload cancelled", "AbortError");

    const inputName = `input-${Date.now()}${getFileExtension(file.name) || ".video"}`;
    const outputName = `output-${Date.now()}.mp4`;
    await ffmpeg.writeFile(inputName, await fetchFile(file));
    const exitCode = await ffmpeg.exec([
        "-i",
        inputName,
        "-vf",
        "scale='min(1280,iw)':-2",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-b:v",
        "2000k",
        "-maxrate",
        "2400k",
        "-bufsize",
        "4000k",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "faststart",
        outputName,
    ]);
    if (signal.aborted) throw new DOMException("Upload cancelled", "AbortError");
    if (exitCode !== 0) throw new Error("Video compression failed.");

    const data = await ffmpeg.readFile(outputName);
    await Promise.allSettled([
        ffmpeg.deleteFile(inputName),
        ffmpeg.deleteFile(outputName),
    ]);
    const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(String(data));
    const outputBuffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(outputBuffer).set(bytes);
    const compressedFile = new File([outputBuffer], getCompressedVideoName(file), { type: "video/mp4" });
    return {
        file: compressedFile,
        metadata: {
            compressed: true,
            originalFilename: file.name,
            originalContentType: file.type || inferVideoContentType(null, file.name),
            originalFileSizeBytes: file.size,
            compressedFileSizeBytes: compressedFile.size,
            compressionRatio: file.size > 0 ? Number((compressedFile.size / file.size).toFixed(4)) : null,
        },
    };
}

function getVideoUploadErrorMessage(error: unknown) {
    const statusCode = (error as { status?: number })?.status;
    const requestPath = String((error as { requestPath?: string })?.requestPath || "");
    const data = (error as { data?: { detail?: string; error?: string } | string })?.data;
    const detail =
        typeof data === "string"
            ? data
            : data?.detail || data?.error || (error instanceof Error ? error.message : "");

    if (statusCode === 404 && requestPath.includes("/uploads/video/session/")) {
        return "Video uploads are not available on the backend yet. Deploy the latest backend release and try again.";
    }
    if (statusCode === 413) {
        return "This video is too large for the current upload path. Try a shorter clip or compress it before uploading.";
    }
    if (statusCode === 403 && requestPath === "signed-storage-upload") {
        return "The video upload session expired. Please select the video again.";
    }
    if (requestPath === "signed-storage-upload") {
        return "Firebase Storage rejected the upload. Check Storage CORS and try again.";
    }
    return detail || "Video upload failed. Please try again.";
}

function VideoAssetPreview({
    src,
    contentType,
    fileName,
    fileSizeBytes,
    className,
}: {
    src: string;
    contentType?: string | null;
    fileName?: string | null;
    fileSizeBytes?: number | null;
    className?: string;
}) {
    const [playbackFailed, setPlaybackFailed] = useState(false);
    const canPreview = !playbackFailed && isBrowserPlayableVideo(contentType, fileName || src);

    useEffect(() => {
        setPlaybackFailed(false);
    }, [src, contentType, fileName]);

    if (canPreview) {
        return (
            <video
                src={src}
                controls
                onError={() => setPlaybackFailed(true)}
                className={clsx("bg-black object-contain", className)}
            />
        );
    }

    return (
        <div className={clsx("flex min-h-40 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-950 p-6 text-center text-white", className)}>
            <CloudArrowUpIcon className="h-8 w-8 text-white/50" />
            <p className="mt-3 text-sm font-bold">Video uploaded</p>
            <p className="mt-1 max-w-sm text-xs leading-5 text-white/60">
                {fileName || "This format may not preview in your browser."}
                {formatFileSize(fileSizeBytes) ? ` · ${formatFileSize(fileSizeBytes)}` : ""}
            </p>
            <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-950 hover:bg-gray-100"
            >
                Open video
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
        </div>
    );
}

function getEmailDraftStorageKey(domain?: string | null) {
    const normalized = String(domain || "").trim().toLowerCase() || "unknown";
    return `vibe_raising_email_draft:${normalized}`;
}

function getEmailDraftForceRegenerateKey(domain?: string | null) {
    const normalized = String(domain || "").trim().toLowerCase() || "unknown";
    return `vibe_raising_email_draft_force_regenerate:${normalized}`;
}

function readPersistedEmailDraftRun(storageKey: string): PersistedEmailDraftRun | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<PersistedEmailDraftRun>;
        const runId = String(parsed.runId || "").trim();
        const domain = String(parsed.domain || "").trim();
        if (!runId || !domain) return null;
        return {
            runId,
            domain,
            bindingId:
                typeof parsed.bindingId === "number" && Number.isFinite(parsed.bindingId)
                    ? parsed.bindingId
                    : null,
            googleConnectionId:
                typeof parsed.googleConnectionId === "number" && Number.isFinite(parsed.googleConnectionId)
                    ? parsed.googleConnectionId
                    : null,
        };
    } catch {
        return null;
    }
}

function hasPendingEmailDraftForceRegenerate(storageKey: string) {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(storageKey) === "1";
}

function setPendingEmailDraftForceRegenerate(storageKey: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, "1");
}

function clearPendingEmailDraftForceRegenerate(storageKey: string) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(storageKey);
}

function isEmailDraftRunning(statusResponse: VibeRaisingStartupUpdateStatusResponse | null) {
    return statusResponse?.state === "queued" || statusResponse?.state === "running";
}

function isHtmlErrorDocument(value: unknown) {
    if (typeof value !== "string") return false;
    const normalized = value.trim().toLowerCase();
    return normalized.startsWith("<!doctype html") || normalized.startsWith("<html");
}

function appendEmailDraftDiagnostics(message: string, error: unknown) {
    const statusCode = (error as { status?: number })?.status;
    const requestId = (error as { requestId?: string })?.requestId;
    const diagnostics = [
        statusCode ? `status ${statusCode}` : null,
        requestId ? `request ${requestId}` : null,
    ].filter(Boolean);

    if (diagnostics.length === 0) return message;

    const separator = message.endsWith(".") ? " " : ". ";
    return `${message}${separator}Reference: ${diagnostics.join(" · ")}.`;
}

function getEmailDraftErrorMessage(error: unknown) {
    const statusCode = (error as { status?: number })?.status;
    const payload = (error as { data?: { error?: string; detail?: string } })?.data;
    let message = "We couldn't draft your update from the selected inputs. Please try again.";
    if (typeof payload === "string" && isHtmlErrorDocument(payload)) {
        if (statusCode === 404) {
            message = "This email draft action is not available on the current backend deploy yet. Deploy the latest mlai-backend and try again.";
            return appendEmailDraftDiagnostics(message, error);
        }
        message = "The server returned an HTML error page instead of a draft response. Please retry after the backend deploy is updated.";
        return appendEmailDraftDiagnostics(message, error);
    }
    if (payload?.error) return appendEmailDraftDiagnostics(payload.error, error);
    if (payload?.detail) return appendEmailDraftDiagnostics(payload.detail, error);
    if (error instanceof Error && error.message) {
        if (isHtmlErrorDocument(error.message)) {
            if (statusCode === 404) {
                message = "This email draft action is not available on the current backend deploy yet. Deploy the latest mlai-backend and try again.";
                return appendEmailDraftDiagnostics(message, error);
            }
            message = "The server returned an HTML error page instead of a draft response. Please retry after the backend deploy is updated.";
            return appendEmailDraftDiagnostics(message, error);
        }
        return appendEmailDraftDiagnostics(error.message, error);
    }
    return appendEmailDraftDiagnostics(message, error);
}

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
    learnings: [
        "e.g. Enterprise buyers care most about security posture before pricing.",
        "e.g. Founder-led demos convert better when the problem is framed by workflow.",
        "e.g. Smaller customers need onboarding templates before they expand usage.",
    ],
    next30Days: [
        "e.g. Convert two pilots into paid annual agreements.",
        "e.g. Ship the onboarding checklist and measure activation lift.",
        "e.g. Complete 12 customer interviews before pricing changes.",
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

function parseBulletItems(value?: string) {
    const normalized = String(value || "").replace(/\r\n/g, "\n").trim();
    if (!normalized) return [""];

    const paragraphs = normalized.includes("\n")
        ? normalized.split(/\n+/)
        : normalized.length >= 160
            ? normalized.split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
            : [normalized];

    const items = paragraphs
        .map((item) => item.replace(/^\s*•\s*/, "").trim())
        .filter(Boolean);

    return items.length ? items : [""];
}

function serializeBulletItems(items: string[]) {
    return items
        .map((item) => item.trim())
        .filter(Boolean)
        .join("\n");
}

function useBulletItemsState(
    value: string | undefined,
    onChange?: (value: string) => void,
) {
    const [items, setItems] = useState<string[]>(() => parseBulletItems(value));
    const lastCommittedValueRef = React.useRef(String(value || ""));

    useEffect(() => {
        const normalizedValue = String(value || "").replace(/\r\n/g, "\n").trim();
        const parsedItems = parseBulletItems(normalizedValue);
        const serialized = serializeBulletItems(parsedItems);
        if (normalizedValue && serialized !== normalizedValue) {
            setItems(parsedItems);
            lastCommittedValueRef.current = serialized;
            onChange?.(serialized);
            return;
        }

        if (normalizedValue === lastCommittedValueRef.current) return;

        setItems(parsedItems);
        lastCommittedValueRef.current = normalizedValue;
    }, [value, onChange]);

    const commitItems = useCallback((nextItems: string[]) => {
        const safeItems = nextItems.length ? nextItems : [""];
        setItems(safeItems);

        const serialized = serializeBulletItems(nextItems);
        lastCommittedValueRef.current = serialized;
        onChange?.(serialized);
    }, [onChange]);

    return { items, commitItems };
}

function BulletTextarea({
    value,
    placeholder,
    onChange,
    onFocus,
    className,
}: {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    className?: string;
}) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "0px";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(event) => {
                event.currentTarget.style.height = "0px";
                event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                onChange(event.target.value);
            }}
            onFocus={onFocus}
            placeholder={placeholder}
            className={clsx(
                "w-full resize-none overflow-hidden whitespace-pre-wrap break-words",
                className,
            )}
        />
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
    const { items, commitItems } = useBulletItemsState(value, onChange);
    const hints = SECTION_HINTS[name] || [];

    const updateItem = (index: number, text: string) => {
        const updated = [...items];
        updated[index] = text;
        commitItems(updated);
    };

    const addItem = () => {
        commitItems([...items, ""]);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        commitItems(updated.length ? updated : [""]);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
                <Icon className="h-4 w-4 text-[var(--vr-color-primary)]" />
                <p className="text-sm font-black text-gray-950">{label}</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-[var(--vr-color-border)] bg-white">
            <input type="hidden" name={name} value={value || ""} />
            <div className="space-y-3 p-4">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <span className="mt-2.5 flex-shrink-0 select-none text-sm text-[var(--vr-color-primary)]">•</span>
                        <BulletTextarea
                            value={item}
                            onChange={(text) => updateItem(i, text)}
                            placeholder={hints[i % hints.length] || placeholder}
                            className="flex-1 rounded-xl border-2 border-[var(--vr-color-border)] bg-white px-4 py-2 text-sm leading-6 text-gray-900 placeholder:text-gray-300 placeholder:italic focus:border-[var(--vr-color-primary)] focus:ring-0"
                        />
                        {(items.length > 1 || item.trim().length > 0) && (
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="mt-1.5 rounded-lg p-1.5 text-gray-300 transition-all hover:bg-[rgba(242,114,63,0.12)] hover:text-[var(--vr-palette-coral)]"
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
                className="flex w-full items-center justify-center gap-1.5 border-t border-dashed border-[var(--vr-color-border)] py-3 text-xs font-bold text-[var(--vr-color-primary)] transition-colors hover:bg-[rgba(0,255,215,0.12)]"
            >
                <span className="text-base leading-none">+</span>
                Add point
            </button>
            </div>
        </div>
    );
}

// Bullet-point input for past month cards
function BulletInput({ value, onChange, placeholder, section }: { value: string; onChange: (v: string) => void; placeholder?: string; section?: string }) {
    const { items, commitItems } = useBulletItemsState(value, onChange);
    const hints = section ? (SECTION_HINTS[section] || []) : [];

    const update = (i: number, text: string) => {
        const updated = [...items];
        updated[i] = text;
        commitItems(updated);
    };
    const remove = (i: number) => {
        const updated = items.filter((_, j) => j !== i);
        commitItems(updated.length ? updated : [""]);
    };
    const add = () => {
        commitItems([...items, ""]);
    };

    return (
        <div className="space-y-1.5 pt-1">
            {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                    <span className="mt-2 select-none text-xs text-[var(--vr-color-primary)]">•</span>
                    <BulletTextarea
                        value={item}
                        onChange={(text) => update(i, text)}
                        placeholder={hints[i % hints.length] || placeholder || "Add a point..."}
                        className="flex-1 rounded-lg border border-[var(--vr-color-border)] bg-white px-3 py-1.5 text-xs leading-5 text-gray-900 shadow-sm placeholder:text-gray-300 placeholder:italic focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                    />
                    {(items.length > 1 || item.trim().length > 0) && (
                        <button type="button" onClick={() => remove(i)} className="mt-1 rounded-md p-1 px-2 text-gray-300 transition-all hover:bg-[rgba(242,114,63,0.12)] hover:text-[var(--vr-palette-coral)]">
                            <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className="mt-1 flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-[var(--vr-color-primary)] transition-all hover:bg-[rgba(0,255,215,0.12)]">
                <span className="text-sm leading-none">+</span> Add point
            </button>
        </div>
    );
}

// Collapsible feedback item for rating sidebar
function CollapsibleFeedback({ icon, headline, color, children }: { icon: React.ReactNode; headline: string; color: "green" | "orange" | "blue"; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const colors = {
        green: { bg: "bg-[rgba(0,255,215,0.12)]", border: "border-[rgba(0,255,215,0.28)]", text: "text-[var(--vr-color-primary)]", hoverBg: "hover:bg-[rgba(0,255,215,0.18)]" },
        orange: { bg: "bg-[rgba(237,95,0,0.10)]", border: "border-[rgba(237,95,0,0.24)]", text: "text-[var(--vr-palette-orange)]", hoverBg: "hover:bg-[rgba(237,95,0,0.16)]" },
        blue: { bg: "bg-[rgba(76,110,245,0.10)]", border: "border-[rgba(76,110,245,0.24)]", text: "text-[var(--vr-palette-blue)]", hoverBg: "hover:bg-[rgba(76,110,245,0.16)]" },
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
function PastMonthPreviewCard({ pm }: { pm: { month: string; highlights: string; challenges: string; asks: string; learnings: string; next30Days: string; metrics: Record<string, string> } }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--vr-color-border)] bg-white shadow-sm">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-gray-700">{pm.month}</h4>
                    {!open && getMetricOptionsForMetrics(pm.metrics).length > 0 && (
                        <span className="flex items-center gap-2 text-xs text-gray-400">
                            {getMetricOptionsForMetrics(pm.metrics).map(m => (
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                            {getMetricOptionsForDisplay(pm.metrics).map(m => {
                                const val = pm.metrics[m.key];
                                return (
                                    <div
                                        key={m.key}
                                        className={clsx(
                                            "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-1.5 transition-all",
                                            val
                                                ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                : "border-gray-200 bg-gray-50 opacity-40"
                                        )}
	                                    >
                                        <MetricInfoBadge info={m.info} />
	                                        <div className={clsx(
                                            "w-5 h-5 rounded-full flex items-center justify-center mb-1",
                                            val ? "bg-[rgba(0,255,215,0.18)]" : "bg-white"
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
                                    <SparklesIcon className="h-3 w-3 text-[var(--vr-palette-purple)]" />
                                    Key Highlights
                                </h5>
                                <BulletList text={pm.highlights} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.challenges && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <ExclamationCircleIcon className="h-3 w-3 text-[var(--vr-palette-orange)]" />
                                    Challenges
                                </h5>
                                <BulletList text={pm.challenges} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.learnings && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <LightBulbIcon className="h-3 w-3 text-[var(--vr-palette-yellow)]" />
                                    Learnings
                                </h5>
                                <BulletList text={pm.learnings} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.next30Days && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <ArrowRightIcon className="h-3 w-3 text-[var(--vr-palette-blue)]" />
                                    Next 30 Days
                                </h5>
                                <BulletList text={pm.next30Days} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.asks && (
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <QuestionMarkCircleIcon className="h-3 w-3 text-[var(--vr-palette-lavender)]" />
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

type EditorMonthCard = {
    month: string;
    expanded: boolean;
    highlights: string;
    challenges: string;
    asks: string;
    learnings: string;
    next30Days: string;
    metrics: Record<string, string>;
};

function parseRevenue(raw: string): number {
    const text = String(raw || "").trim();
    if (!text) return 0;

    const isAccountingNegative = /^\(.*\)$/.test(text);
    const match = text.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    if (!match) return 0;

    const value = Number.parseFloat(match[0]);
    if (!Number.isFinite(value)) return 0;
    return isAccountingNegative ? -Math.abs(value) : value;
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
    if (rate === null) return { bar: "bg-[var(--vr-palette-gray-soft)]", hover: "group-hover:bg-[var(--vr-palette-gray)]", selected: "bg-[var(--vr-palette-gray)]", label: "text-[var(--vr-color-text-sub)]" };
    if (rate >= 20)    return { bar: "bg-[var(--vr-palette-mint)]", hover: "group-hover:bg-[var(--vr-palette-teal-soft)]", selected: "bg-[var(--vr-palette-teal-soft)]", label: "text-[var(--vr-color-primary)]" };
    if (rate > 0)      return { bar: "bg-[var(--vr-palette-teal)]", hover: "group-hover:bg-[var(--vr-palette-teal-soft)]", selected: "bg-[var(--vr-palette-teal-soft)]", label: "text-[var(--vr-color-primary)]" };
    if (rate === 0)    return { bar: "bg-[var(--vr-palette-yellow)]", hover: "group-hover:bg-[var(--vr-palette-gold)]", selected: "bg-[var(--vr-palette-gold)]", label: "text-[var(--vr-palette-orange)]" };
    return               { bar: "bg-[var(--vr-palette-coral)]", hover: "group-hover:bg-[var(--vr-palette-orange)]", selected: "bg-[var(--vr-palette-orange)]", label: "text-[var(--vr-palette-coral)]" };
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
        <div className="mb-6 rounded-2xl border border-[var(--vr-color-border)] bg-white p-6 shadow-sm">
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
                                d.isCurrent ? "text-[var(--vr-color-primary)]" : color?.label || "text-gray-400"
                            )}>
                                {d.month.slice(0, 3)}
                            </span>

                            {/* Horizontal bar */}
                            <div className="flex-1 h-7 bg-gray-50 rounded-md overflow-hidden relative">
                                <div
                                    className={clsx(
                                        "h-full rounded-md transition-all duration-500 ease-out relative overflow-hidden",
                                        d.isCurrent
                                            ? "bg-[var(--vr-color-primary)] shadow-sm"
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
                                        rate >= 20 ? "text-[var(--vr-color-primary)]" : rate > 0 ? "text-[var(--vr-color-primary)]" : rate < 0 ? "text-[var(--vr-palette-coral)]" : "text-gray-400"
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
        selectedInputSources,
        existingMonthlyUpdates,
    } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>() as any;
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const goToConnectDataStep = useCallback(() => {
        const returnPath = `${location.pathname}${location.search || ""}`;
        navigate(`/founder-tools/data-sources?next=${encodeURIComponent(returnPath)}`);
    }, [location.pathname, location.search, navigate]);
    const handleDraftStepperClick = useCallback((step: MonthlyUpdateStepKey) => {
        if (step === "connect") {
            goToConnectDataStep();
            return;
        }

        if (step === "draft") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [goToConnectDataStep]);
    const defaultData = actionData?.step === "feedback" ? (actionData.data as any) : (existingData || {});
    const [dismissedFeedback, setDismissedFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(defaultData?.videoUrl || null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>(defaultData?.videoUrl || "");
    const [videoUploadStatus, setVideoUploadStatus] = useState<VideoUploadStatus>(defaultData?.videoUrl ? "ready" : "idle");
    const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
    const [monthConfirmed, setMonthConfirmed] = useState(false);
    const [selectedDraftStage, setSelectedDraftStage] = useState<DraftStageKey | null>(null);
    const [metricsConfirmed, setMetricsConfirmed] = useState(false);
    const [videoStoragePath, setVideoStoragePath] = useState<string>(defaultData?.videoStoragePath || "");
    const [videoContentType, setVideoContentType] = useState<string>(defaultData?.videoContentType || "");
    const [videoFileSizeBytes, setVideoFileSizeBytes] = useState<number | null>(defaultData?.videoFileSizeBytes || null);
    const [videoOriginalFilename, setVideoOriginalFilename] = useState<string>(defaultData?.videoOriginalFilename || "");
    const [previewMediaKind, setPreviewMediaKind] = useState<RecordedMediaKind | null>(defaultData?.videoUrl ? "video" : null);
    const [recordingMode, setRecordingMode] = useState<RecordedMediaKind | null>(null);
    const [recordingError, setRecordingError] = useState<string | null>(null);
    const [draftSaved, setDraftSaved] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [hasDraft, setHasDraft] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem("vibe_draft");
    });
    const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);
    const [pendingDraftRequest, setPendingDraftRequest] = useState<{
        forceRegenerate?: boolean;
        clearPersistedRun?: boolean;
    } | null>(null);

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback") setDismissedFeedback(false);
    }, [actionData]);

    // State declarations
    const [isClientMounted, setIsClientMounted] = useState(false);
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const [summary, setSummary] = useState<string>(() => defaultData?.summary || readStoredManualMaterials().summary || "");
    const [sourceUrl, setSourceUrl] = useState<string>(() => defaultData?.sourceUrl || readStoredManualMaterials().sourceUrl || "");
    const [highlights, setHighlights] = useState<string>(defaultData?.highlights || "");
    const [challenges, setChallenges] = useState<string>(defaultData?.challenges || "");
    const [asks, setAsks] = useState<string>(defaultData?.asks || "");
    const [learnings, setLearnings] = useState<string>(defaultData?.learnings || "");
    const [next30Days, setNext30Days] = useState<string>(defaultData?.next30Days || "");
    const [pastMonthCards, setPastMonthCards] = useState<EditorMonthCard[]>([]);
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const [selectedMonth, setSelectedMonth] = useState<string>(defaultData?.month || "February");
    const [selectedYear, setSelectedYear] = useState<number>(defaultData?.year || 2026);
    const [activePeriodKey, setActivePeriodKey] = useState("current");
    const selectedMonthTheme = getVibeRaisingMonthTheme(selectedMonth);
    const selectedMonthUpdateKey = getMonthlyUpdateKey(selectedMonth, selectedYear);
    const targetMonthIso = getMonthlyUpdateIsoMonth(selectedMonth, selectedYear);
    const isSelectedMonthInFuture = isFutureMonthlyUpdate(selectedMonth, selectedYear);
    const existingUpdateForSelectedMonth = existingMonthlyUpdates.find(
        (update) => getMonthlyUpdateStorageKey(update) === selectedMonthUpdateKey,
    );
    const selectedMonthLabel = `${selectedMonth} ${selectedYear}`;
    
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
        return initial;
    });
    const selectedMetricOptions = Array.from(selectedMetrics)
        .map((key) => METRIC_OPTION_MAP.get(key))
        .filter((metric): metric is MetricOption => Boolean(metric));
    const draftMetricOptions = selectedMetricOptions.length > 0
        ? selectedMetricOptions
        : metricOptionsFromKeys(["revenue", "activeUsers", "mrr", "burnRate"]);
    const showLegacyDraftFlow = false;
    const selectedInputSourceLabels = selectedInputSources.map((key) => INPUT_SOURCE_LABELS[key]);
    const selectedInputSourceDescription = selectedInputSourceLabels.length > 0
        ? selectedInputSourceLabels.join(", ")
        : "Manual materials only";
    const canGenerateDraftFromEmail = Boolean((user.domain || "").trim());
    const emailDraftStorageKey = getEmailDraftStorageKey(user.domain);
    const emailDraftForceRegenerateKey = getEmailDraftForceRegenerateKey(user.domain);
    const [emailDraftStatus, setEmailDraftStatus] = useState<VibeRaisingStartupUpdateStatusResponse | null>(null);
    const [emailDraftUiError, setEmailDraftUiError] = useState<string | null>(null);
    const [emailDraftActionBusy, setEmailDraftActionBusy] = useState(false);
    const [emailDraftCancelBusy, setEmailDraftCancelBusy] = useState(false);
    const [emailDraftPollingDegraded, setEmailDraftPollingDegraded] = useState(false);
    const [emailDraftPollDelayMs, setEmailDraftPollDelayMs] = useState(EMAIL_DRAFT_POLL_INTERVAL_MS);
    const emailDraftRecoveryKeyRef = useRef<string | null>(null);
    const emailDraftIgnoredRunIdRef = useRef<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);
    const videoUploadAbortRef = useRef<AbortController | null>(null);
    const videoUploadSequenceRef = useRef(0);
    const videoPreviewObjectUrlRef = useRef<string | null>(null);
    const loadedExistingUpdateKeyRef = useRef<string | null>(null);
    const editorMonthKeyRef = useRef<string>(selectedMonthUpdateKey);

    const handleDraftComplete = (data: any) => {
        setActivePeriodKey("current");
        if (data.month) setSelectedMonth(data.month);
        if (data.year) setSelectedYear(data.year);
        setHighlights(data.highlights);
        setChallenges(data.challenges);
        setAsks(data.asks || "");
        setLearnings(data.learnings || "");
        setNext30Days(data.next30Days || "");
        setSummary(data.summary || "");
        setSourceUrl(data.sourceUrl || data.source_url || "");
        if (data.videoUrl || data.video_url) {
            const nextVideoUrl = data.videoUrl || data.video_url;
            setUploadedVideoUrl(nextVideoUrl);
            setVideoPreviewUrl(nextVideoUrl);
            setVideoStoragePath(data.videoStoragePath || data.video_storage_path || "");
            setVideoContentType(data.videoContentType || data.video_content_type || "");
            setVideoFileSizeBytes(data.videoFileSizeBytes || data.video_file_size_bytes || null);
            setVideoOriginalFilename(data.videoOriginalFilename || data.video_original_filename || "");
            setVideoUploadStatus("ready");
            setVideoUploadError(null);
            setPreviewMediaKind("video");
        }
        const currentMetrics = data.metrics || {};
        setMetricValues(currentMetrics);
        setPastMonthCards((data.pastMonths || []).map((pm: any) => ({
            ...pm,
            month: pm.month || "Unknown",
            expanded: Boolean(pm.expanded),
            highlights: pm.highlights || "",
            challenges: pm.challenges || "",
            asks: pm.asks || "",
            learnings: pm.learnings || "",
            next30Days: pm.next30Days || "",
            metrics: {
                ...Object.fromEntries(metricKeysFromSuggestions(pm.metricSuggestions).map((key) => [key, ""])),
                ...(pm.metrics || {}),
            }
        })));
        
        const newMetrics = new Set<string>();
        Object.keys(currentMetrics).forEach(key => {
            if (METRIC_OPTION_MAP.has(key) && currentMetrics[key]) newMetrics.add(key);
        });
        metricKeysFromSuggestions(data.metricSuggestions).forEach((key) => newMetrics.add(key));
        setSelectedMetrics(newMetrics);
        setMonthConfirmed(true);
        setSelectedDraftStage("reporting");
        setMetricsConfirmed(true);
    };

    const revokeVideoPreviewObjectUrl = useCallback(() => {
        if (videoPreviewObjectUrlRef.current) {
            URL.revokeObjectURL(videoPreviewObjectUrlRef.current);
            videoPreviewObjectUrlRef.current = null;
        }
    }, []);

    const resetVideoUpload = useCallback(() => {
        videoUploadAbortRef.current?.abort();
        videoUploadAbortRef.current = null;
        videoUploadSequenceRef.current += 1;
        revokeVideoPreviewObjectUrl();
        setVideoPreviewUrl(null);
        setUploadedVideoUrl("");
        setVideoStoragePath("");
        setVideoContentType("");
        setVideoFileSizeBytes(null);
        setVideoOriginalFilename("");
        setPreviewMediaKind(null);
        setVideoUploadStatus("idle");
        setVideoUploadError(null);
    }, [revokeVideoPreviewObjectUrl]);

    const uploadVideoFile = useCallback(async (file: File, options?: { forceCompress?: boolean }) => {
        const sequence = videoUploadSequenceRef.current + 1;
        videoUploadSequenceRef.current = sequence;
        videoUploadAbortRef.current?.abort();
        const abortController = new AbortController();
        videoUploadAbortRef.current = abortController;

        setVideoUploadStatus("validating");
        setVideoUploadError(null);
        setUploadedVideoUrl("");
        setVideoStoragePath("");
        setVideoContentType(file.type || inferVideoContentType(null, file.name));
        setVideoFileSizeBytes(file.size);
        setVideoOriginalFilename(file.name);
        setPreviewMediaKind("video");
        revokeVideoPreviewObjectUrl();
        setVideoPreviewUrl(null);

        if (!isSupportedVideoFile(file)) {
            setVideoUploadStatus("error");
            setVideoUploadError("Use a common video format: MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.");
            return;
        }

        if (file.size > MAX_SOURCE_VIDEO_BYTES) {
            setVideoUploadStatus("error");
            setVideoUploadError("File is too large. Use a file under 50 MB.");
            return;
        }

        const localPreviewUrl = URL.createObjectURL(file);
        videoPreviewObjectUrlRef.current = localPreviewUrl;
        setVideoPreviewUrl(localPreviewUrl);

        try {
            let uploadCandidate = file;
            let compression: VibeRaisingVideoCompressionMetadata | undefined;
            if (shouldCompressVideo(file, options?.forceCompress)) {
                setVideoUploadStatus("compressing");
                try {
                    const compressed = await compressVideoForUpload(file, abortController.signal);
                    if (videoUploadSequenceRef.current !== sequence) return;
                    if (compressed.file.size < file.size) {
                        uploadCandidate = compressed.file;
                        compression = compressed.metadata;
                    }
                } catch (compressionError) {
                    if (abortController.signal.aborted || videoUploadSequenceRef.current !== sequence) return;
                    if (file.size > MAX_VIDEO_UPLOAD_BYTES) {
                        throw new Error("File exceeds the 50 MB upload limit after compression. Try a shorter clip.");
                    }
                }
            }

            if (uploadCandidate.size > MAX_VIDEO_UPLOAD_BYTES) {
                throw new Error("File exceeds the 50 MB upload limit.");
            }

            setVideoContentType(uploadCandidate.type || inferVideoContentType(null, uploadCandidate.name));
            setVideoFileSizeBytes(uploadCandidate.size);
            setVideoOriginalFilename(uploadCandidate.name);

            const uploaded = await uploadVibeRaisingUpdateVideo(
                backendBaseUrl,
                uploadCandidate,
                abortController.signal,
                compression,
                (phase) => {
                    if (videoUploadSequenceRef.current !== sequence) return;
                    setVideoUploadStatus(phase);
                },
            );
            if (videoUploadSequenceRef.current !== sequence) return;

            setUploadedVideoUrl(uploaded.videoUrl);
            setVideoStoragePath(uploaded.storagePath || "");
            setVideoContentType(uploaded.contentType || uploadCandidate.type || "");
            setVideoFileSizeBytes(uploaded.fileSizeBytes || uploadCandidate.size);
            setVideoOriginalFilename(uploaded.originalFilename || uploadCandidate.name);
            setVideoUploadStatus("ready");
            setVideoUploadError(null);
        } catch (error) {
            if (abortController.signal.aborted || videoUploadSequenceRef.current !== sequence) return;
            setUploadedVideoUrl("");
            setVideoStoragePath("");
            setVideoUploadStatus("error");
            setVideoUploadError(getVideoUploadErrorMessage(error));
        } finally {
            if (videoUploadSequenceRef.current === sequence) {
                videoUploadAbortRef.current = null;
            }
        }
    }, [backendBaseUrl, revokeVideoPreviewObjectUrl]);

    const persistEmailDraftRun = useEffectEvent((statusResponse: VibeRaisingStartupUpdateStatusResponse) => {
        if (typeof window === "undefined" || !statusResponse.runId) return;

        localStorage.setItem(
            emailDraftStorageKey,
            JSON.stringify({
                runId: statusResponse.runId,
                domain: String(user.domain || "").trim().toLowerCase(),
                bindingId: statusResponse.binding?.id ?? null,
                googleConnectionId: statusResponse.binding?.googleConnectionId ?? null,
            }),
        );
    });

    const clearPersistedEmailDraftRun = useEffectEvent(() => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(emailDraftStorageKey);
    });

    const resetEmailDraftUi = useEffectEvent(() => {
        setEmailDraftStatus(null);
        setEmailDraftUiError(null);
        setEmailDraftPollingDegraded(false);
        setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_INTERVAL_MS);
    });

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

    useEffect(() => {
        setIsClientMounted(true);
    }, []);

    const hydrateCompletedEmailDraft = useEffectEvent(async (runId?: string | null) => {
        const results = await getVibeRaisingStartupUpdateDraftResults(backendBaseUrl, runId);
        if (!results.draft) {
            throw new Error("Draft generation completed, but no draft payload was returned.");
        }

        startTransition(() => {
            handleDraftComplete(results.draft);
            resetEmailDraftUi();
        });
        clearPersistedEmailDraftRun();
    });

    const processEmailDraftStatus = useEffectEvent(async (statusResponse: VibeRaisingStartupUpdateStatusResponse) => {
        if (
            statusResponse.runId &&
            emailDraftIgnoredRunIdRef.current === statusResponse.runId &&
            statusResponse.state !== "completed" &&
            statusResponse.state !== "cancelled"
        ) {
            return;
        }

        if (statusResponse.runId) {
            persistEmailDraftRun(statusResponse);
        }

        if (statusResponse.targetMonthConflict) {
            startTransition(() => {
                setEmailDraftStatus(statusResponse);
                setEmailDraftUiError(statusResponse.error ?? "Another monthly update is already generating.");
            });
            return;
        }

        if (statusResponse.state === "queued" || statusResponse.state === "running") {
            startTransition(() => {
                setEmailDraftStatus(statusResponse);
                setEmailDraftUiError(null);
            });
            return;
        }

        if (statusResponse.state === "completed") {
            startTransition(() => {
                setEmailDraftStatus({
                    ...statusResponse,
                    state: "running",
                    displayStage:
                        statusResponse.displayStage ||
                        statusResponse.progress?.displayStage ||
                        "Loading drafted update",
                });
                setEmailDraftUiError(null);
            });
            try {
                await hydrateCompletedEmailDraft(statusResponse.runId ?? null);
                return;
            } catch (error) {
                startTransition(() => {
                    setEmailDraftPollingDegraded(true);
                    setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_BACKOFF_MS);
                });
                throw error;
            }
        }

        if (statusResponse.state === "failed") {
            startTransition(() => {
                setEmailDraftStatus(statusResponse);
                setEmailDraftUiError(null);
                setEmailDraftPollingDegraded(false);
                setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_INTERVAL_MS);
            });
            return;
        }

        if (statusResponse.state === "cancelled") {
            clearPersistedEmailDraftRun();
            resetEmailDraftUi();
            return;
        }

        clearPersistedEmailDraftRun();
        startTransition(() => {
            setEmailDraftStatus(null);
            setEmailDraftUiError(statusResponse.error ?? null);
            setEmailDraftPollingDegraded(false);
            setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_INTERVAL_MS);
        });
    });

    const startOrResumeEmailDraft = useCallback(async (options?: { forceRegenerate?: boolean }) => {
        setEmailDraftActionBusy(true);
        setEmailDraftUiError(null);

        try {
            const shouldForceRegenerate = Boolean(
                options?.forceRegenerate || hasPendingEmailDraftForceRegenerate(emailDraftForceRegenerateKey),
            );
            const statusResponse = await runVibeRaisingStartupUpdate(
                backendBaseUrl,
                {
                    ...(shouldForceRegenerate ? { forceRegenerate: true } : {}),
                    inputSources: selectedInputSources,
                    targetMonth: targetMonthIso,
                },
            );
            emailDraftIgnoredRunIdRef.current = null;
            if (statusResponse.state === "auth_required") {
                setShowEmailWizard(true);
                return;
            }

            if (shouldForceRegenerate) {
                clearPendingEmailDraftForceRegenerate(emailDraftForceRegenerateKey);
            }
            await processEmailDraftStatus(statusResponse);
        } catch (error) {
            startTransition(() => {
                setEmailDraftStatus(null);
                setEmailDraftUiError(getEmailDraftErrorMessage(error));
            });
        } finally {
            setEmailDraftActionBusy(false);
        }
    }, [backendBaseUrl, emailDraftForceRegenerateKey, selectedInputSources, targetMonthIso]);

    const startDraftFromSelectedInputs = useCallback(async (options?: { forceRegenerate?: boolean }) => {
        if (!canGenerateDraftFromEmail) {
            navigate("/founder-tools/companies");
            return;
        }
        if (isSelectedMonthInFuture || !targetMonthIso) {
            setEmailDraftUiError("Choose the current month or a previous month before generating an update.");
            return;
        }

        setEmailDraftActionBusy(true);
        setEmailDraftUiError(null);
        try {
            if (!selectedInputSources.includes("gmail")) {
                await startOrResumeEmailDraft({ forceRegenerate: options?.forceRegenerate });
                return;
            }
            const bootstrap = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl);
            if (bootstrap.googleConnected) {
                await startOrResumeEmailDraft({ forceRegenerate: options?.forceRegenerate });
                return;
            }
            setShowEmailWizard(true);
        } catch (error) {
            startTransition(() => {
                setEmailDraftStatus(null);
                setEmailDraftUiError(getEmailDraftErrorMessage(error));
            });
        } finally {
            setEmailDraftActionBusy(false);
        }
    }, [
        backendBaseUrl,
        canGenerateDraftFromEmail,
        isSelectedMonthInFuture,
        navigate,
        selectedInputSources,
        startOrResumeEmailDraft,
        targetMonthIso,
    ]);

    const executeDraftRequest = useCallback((request?: { forceRegenerate?: boolean; clearPersistedRun?: boolean }) => {
        if (request?.clearPersistedRun) {
            clearPersistedEmailDraftRun();
        }
        void startDraftFromSelectedInputs({ forceRegenerate: request?.forceRegenerate });
    }, [clearPersistedEmailDraftRun, startDraftFromSelectedInputs]);

    const requestDraftFromSelectedInputs = useCallback((request?: { forceRegenerate?: boolean; clearPersistedRun?: boolean }) => {
        if (existingUpdateForSelectedMonth) {
            setPendingDraftRequest({
                ...request,
                forceRegenerate: true,
            });
            setShowRegenerateConfirm(true);
            return;
        }
        executeDraftRequest(request);
    }, [executeDraftRequest, existingUpdateForSelectedMonth]);

    const handleGenerateSelectedMonthUpdate = useCallback(() => {
        if (isSelectedMonthInFuture) return;
        setMonthConfirmed(true);
        setSelectedDraftStage("reporting");
        setMetricsConfirmed(true);
        requestDraftFromSelectedInputs();
    }, [isSelectedMonthInFuture, requestDraftFromSelectedInputs]);

    const handleGenerateDraftFromEmailClick = useCallback(() => {
        handleGenerateSelectedMonthUpdate();
    }, [handleGenerateSelectedMonthUpdate]);

    const handleConfirmRegenerateDraft = useCallback(() => {
        const request = pendingDraftRequest ?? {};
        setShowRegenerateConfirm(false);
        setPendingDraftRequest(null);
        executeDraftRequest({
            ...request,
            forceRegenerate: true,
        });
    }, [executeDraftRequest, pendingDraftRequest]);

    const handleCancelRegenerateDraft = useCallback(() => {
        setShowRegenerateConfirm(false);
        setPendingDraftRequest(null);
    }, []);

    const handleEmailWizardConnected = useCallback(() => {
        setShowEmailWizard(false);
        void startOrResumeEmailDraft();
    }, [startOrResumeEmailDraft]);

    const pollEmailDraftStatus = useEffectEvent(async (runId: string) => {
        try {
            const statusResponse = await getVibeRaisingStartupUpdateStatus(backendBaseUrl, runId);
            setEmailDraftPollingDegraded(false);
            setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_INTERVAL_MS);
            await processEmailDraftStatus(statusResponse);
        } catch {
            setEmailDraftPollingDegraded(true);
            setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_BACKOFF_MS);
        }
    });

    useEffect(() => {
        if (!isClientMounted) return;

        const recoveryKey = `${backendBaseUrl}:${emailDraftStorageKey}:${resumeEmailDrafting ? "resume" : "idle"}`;
        if (emailDraftRecoveryKeyRef.current === recoveryKey) {
            return;
        }
        emailDraftRecoveryKeyRef.current = recoveryKey;

        let cancelled = false;
        void (async () => {
            setEmailDraftActionBusy(true);
            try {
                const activeRun = await getVibeRaisingStartupUpdateActiveRun(backendBaseUrl);
                if (cancelled) return;
                if (activeRun) {
                    await processEmailDraftStatus(activeRun);
                    return;
                }

                const persistedRun = readPersistedEmailDraftRun(emailDraftStorageKey);
                if (persistedRun?.runId) {
                    try {
                        const storedStatus = await getVibeRaisingStartupUpdateStatus(
                            backendBaseUrl,
                            persistedRun.runId,
                        );
                        if (cancelled) return;
                        await processEmailDraftStatus(storedStatus);
                        return;
                    } catch {
                        clearPersistedEmailDraftRun();
                    }
                }

                if (resumeEmailDrafting) {
                    await startOrResumeEmailDraft();
                    return;
                }

                try {
                    await hydrateCompletedEmailDraft();
                    return;
                } catch (error) {
                    if ((error as { status?: number })?.status !== 404) {
                        throw error;
                    }
                }
            } catch (error) {
                if (!cancelled) {
                    startTransition(() => {
                        setEmailDraftUiError(getEmailDraftErrorMessage(error));
                    });
                }
            } finally {
                if (!cancelled) {
                    setEmailDraftActionBusy(false);
                    if (resumeEmailDrafting) {
                        clearEmailDraftingParams();
                    }
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [
        backendBaseUrl,
        clearEmailDraftingParams,
        emailDraftStorageKey,
        isClientMounted,
        resumeEmailDrafting,
        startOrResumeEmailDraft,
    ]);

    useEffect(() => {
        if (
            !isClientMounted ||
            emailDraftCancelBusy ||
            !emailDraftStatus?.runId ||
            !isEmailDraftRunning(emailDraftStatus)
        ) {
            return;
        }

        const intervalId = window.setInterval(() => {
            void pollEmailDraftStatus(emailDraftStatus.runId ?? "");
        }, emailDraftPollDelayMs);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [
        emailDraftPollDelayMs,
        emailDraftCancelBusy,
        emailDraftStatus?.runId,
        emailDraftStatus?.state,
        isClientMounted,
    ]);

    const isEmailDraftBusy = isEmailDraftRunning(emailDraftStatus);
    useEffect(() => {
        if (isEmailDraftBusy) return;

        if (!existingUpdateForSelectedMonth) {
            loadedExistingUpdateKeyRef.current = null;
            if (editorMonthKeyRef.current !== selectedMonthUpdateKey) {
                editorMonthKeyRef.current = selectedMonthUpdateKey;
                setSummary("");
                setSourceUrl("");
                resetVideoUpload();
                setHighlights("");
                setChallenges("");
                setAsks("");
                setLearnings("");
                setNext30Days("");
                setMetricValues({});
                setSelectedMetrics(new Set());
                setPastMonthCards([]);
                setExpandedCards(new Set());
                setActivePeriodKey("current");
            }
            return;
        }
        if (loadedExistingUpdateKeyRef.current === selectedMonthUpdateKey) return;
        loadedExistingUpdateKeyRef.current = selectedMonthUpdateKey;
        editorMonthKeyRef.current = selectedMonthUpdateKey;

        setSummary(existingUpdateForSelectedMonth.summary || "");
        setSourceUrl(existingUpdateForSelectedMonth.sourceUrl || "");
        setUploadedVideoUrl(existingUpdateForSelectedMonth.videoUrl || "");
        setVideoPreviewUrl(existingUpdateForSelectedMonth.videoUrl || null);
        setVideoStoragePath(existingUpdateForSelectedMonth.videoStoragePath || "");
        setVideoContentType(existingUpdateForSelectedMonth.videoContentType || "");
        setVideoFileSizeBytes(existingUpdateForSelectedMonth.videoFileSizeBytes || null);
        setVideoOriginalFilename(existingUpdateForSelectedMonth.videoOriginalFilename || "");
        setPreviewMediaKind(existingUpdateForSelectedMonth.videoUrl ? "video" : null);
        setVideoUploadStatus(existingUpdateForSelectedMonth.videoUrl ? "ready" : "idle");
        setVideoUploadError(null);
        setHighlights(existingUpdateForSelectedMonth.highlights || "");
        setChallenges(existingUpdateForSelectedMonth.challenges || "");
        setAsks(existingUpdateForSelectedMonth.asks || "");
        setLearnings(existingUpdateForSelectedMonth.learnings || "");
        setNext30Days(existingUpdateForSelectedMonth.next30Days || "");
        const nextMetrics = existingUpdateForSelectedMonth.metrics || {};
        setMetricValues(nextMetrics);
        setSelectedMetrics(new Set(Object.keys(nextMetrics).filter((key) => METRIC_OPTION_MAP.has(key))));
        setActivePeriodKey("current");
    }, [existingUpdateForSelectedMonth, isEmailDraftBusy, resetVideoUpload, selectedMonthUpdateKey]);

    const emailDraftCardVisible =
        isEmailDraftBusy ||
        emailDraftStatus?.state === "failed" ||
        (!emailDraftStatus && Boolean(emailDraftUiError));
    const emailDraftCardStatus =
        emailDraftStatus?.state === "failed" || (!emailDraftStatus && emailDraftUiError)
            ? "failed"
            : "running";
    const emailDraftCardDisplayStage =
        (emailDraftCancelBusy
            ? "Cancelling draft..."
            : emailDraftStatus?.displayStage) ||
        emailDraftStatus?.progress?.displayStage ||
        (emailDraftUiError
            ? "We couldn't start drafting from the selected inputs."
            : "Preparing company context");
    const emailDraftCardCompletedSteps =
        emailDraftStatus?.completedSteps ??
        emailDraftStatus?.progress?.completedSteps ??
        0;
    const emailDraftCardTotalSteps =
        emailDraftStatus?.totalSteps ??
        emailDraftStatus?.progress?.totalSteps ??
        8;
    const emailDraftCardError =
        emailDraftStatus?.state === "failed" || !emailDraftStatus
            ? (
                emailDraftStatus?.error ||
                emailDraftUiError ||
                "We couldn't draft your update from the selected inputs. Please try again."
            )
            : undefined;
    const emailDraftCardNotice =
        isEmailDraftBusy && emailDraftStatus?.state !== "failed"
            ? emailDraftUiError
            : null;
    const selectedMonthGenerationVerb = existingUpdateForSelectedMonth ? "Regenerate" : "Generate";
    const emailDraftButtonTitle = emailDraftActionBusy
        ? `Generating ${selectedMonthLabel} update`
        : `${selectedMonthGenerationVerb} ${selectedMonthLabel} update`;
    const emailDraftButtonDescription = emailDraftActionBusy
        ? "Contacting the MLAI backend and preparing the selected sources for drafting."
        : isSelectedMonthInFuture
            ? "Choose the current month or a previous month. Future monthly updates can be drafted once that month starts."
        : canGenerateDraftFromEmail
            ? `Use ${selectedInputSourceDescription} to find key signals, metrics, wins, and asks for ${selectedMonthLabel}, then turn them into a first draft.`
            : "Add a company domain first so inputs can be matched to the right startup.";
    const isVideoUploadPending = videoUploadStatus === "validating" ||
        videoUploadStatus === "compressing" ||
        videoUploadStatus === "creating_session" ||
        videoUploadStatus === "uploading" ||
        videoUploadStatus === "finalizing";
    const isVideoUploadBlocking = isVideoUploadPending || (videoUploadStatus === "error" && previewMediaKind === "video" && Boolean(videoPreviewUrl));
    const videoUploadStatusLabel =
        videoUploadStatus === "validating"
            ? "Checking video..."
            : videoUploadStatus === "compressing"
                ? "Compressing video..."
                : videoUploadStatus === "creating_session"
                    ? "Preparing upload..."
                    : videoUploadStatus === "uploading"
                        ? "Uploading video..."
                        : videoUploadStatus === "finalizing"
                            ? "Finalizing video..."
                            : videoUploadStatus === "ready"
                                ? "Video ready"
                                : null;
    const shouldShowEmailDraftProgress = emailDraftActionBusy || emailDraftCardVisible;
    const isAutoDrafting = shouldShowEmailDraftProgress || showEmailWizard;
    const canContinueDraftManually =
        monthConfirmed &&
        selectedDraftStage === "reporting" &&
        metricsConfirmed &&
        !showEmailWizard &&
        emailDraftCardStatus === "failed";
    const hasDraftTemplate =
        monthConfirmed &&
        selectedDraftStage === "reporting" &&
        metricsConfirmed &&
        (!isAutoDrafting || canContinueDraftManually) &&
        !showEmailWizard;
    const draftStickyStatusIcon = (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
            {hasDraftTemplate ? <CheckCircleIcon className="h-5 w-5" /> : <SparklesIcon className="h-5 w-5" />}
        </div>
    );
    const draftStickyBar = (() => {
        if (!monthConfirmed) {
            return {
                statusTitle: "Select month",
                statusDetail: selectedMonthLabel,
                primaryLabel: `${selectedMonthGenerationVerb} update`,
                onPrimary: handleGenerateSelectedMonthUpdate,
                primaryDisabled: isSelectedMonthInFuture || emailDraftActionBusy,
                onBack: goToConnectDataStep,
            };
        }

        if (isAutoDrafting && !canContinueDraftManually) {
            return {
                statusTitle: showEmailWizard
                    ? "Connect Gmail to continue"
                    : emailDraftCardStatus === "failed"
                        ? "Draft generation needs attention"
                        : `Generating ${selectedMonthLabel} update`,
                statusDetail: showEmailWizard ? "Finish the connection in the popup, then we will generate the draft." : emailDraftCardDisplayStage,
                primaryLabel: showEmailWizard ? "Waiting..." : emailDraftCardStatus === "failed" ? "Retry" : "Generating...",
                onPrimary: emailDraftCardStatus === "failed"
                    ? () => requestDraftFromSelectedInputs({ forceRegenerate: true, clearPersistedRun: true })
                    : undefined,
                primaryDisabled: showEmailWizard || emailDraftCardStatus !== "failed",
                onBack: () => setMonthConfirmed(false),
            };
        }

        if (canContinueDraftManually) {
            return {
                statusTitle: "Continue manually",
                statusDetail: "Backend drafting is unavailable right now. You can still edit this update and review it when ready.",
                primaryLabel: isSubmitting ? "Reviewing..." : "Review draft",
                primaryType: "submit" as const,
                primaryForm: DRAFT_REVIEW_FORM_ID,
                primaryDisabled: isSubmitting,
                onBack: () => setMonthConfirmed(false),
            };
        }

        return {
            statusTitle: "AI draft ready",
            statusDetail: selectedMetricOptions.length > 0
                ? `AI selected ${selectedMetricOptions.length} metric${selectedMetricOptions.length === 1 ? "" : "s"} for ${selectedMonthLabel}.`
                : `AI drafted ${selectedMonthLabel}; core metrics are ready to edit below.`,
            primaryLabel: isSubmitting ? "Reviewing..." : "Review draft",
            primaryType: "submit" as const,
            primaryForm: DRAFT_REVIEW_FORM_ID,
            primaryDisabled: isSubmitting,
            onBack: () => setMonthConfirmed(false),
        };
    })();

    const handleRetryEmailDraft = () => {
        requestDraftFromSelectedInputs({ forceRegenerate: true, clearPersistedRun: true });
    };

    const handleCancelEmailDraft = useCallback(async () => {
        const runId = String(emailDraftStatus?.runId || "").trim();
        if (!runId) return;
        if (typeof window !== "undefined") {
            const confirmed = window.confirm(
                "Cancel this draft run and reset the monthly update so you can try again?",
            );
            if (!confirmed) {
                return;
            }
        }

        setEmailDraftCancelBusy(true);
        setEmailDraftUiError(null);
        emailDraftIgnoredRunIdRef.current = runId;

        try {
            const cancelResponse = await cancelVibeRaisingStartupUpdate(backendBaseUrl, runId);
            if (cancelResponse.status === "completed" || cancelResponse.terminalState === "completed") {
                emailDraftIgnoredRunIdRef.current = null;
                await hydrateCompletedEmailDraft(cancelResponse.runId);
                return;
            }

            if (cancelResponse.status === "cancelled" || cancelResponse.terminalState === "cancelled") {
                clearPersistedEmailDraftRun();
                setPendingEmailDraftForceRegenerate(emailDraftForceRegenerateKey);
                resetEmailDraftUi();
                return;
            }

            emailDraftIgnoredRunIdRef.current = null;
            setEmailDraftUiError("We couldn't cancel that draft run. We'll keep polling the current status.");
        } catch (error) {
            emailDraftIgnoredRunIdRef.current = null;
            setEmailDraftUiError(getEmailDraftErrorMessage(error));
        } finally {
            setEmailDraftCancelBusy(false);
        }
    }, [
        backendBaseUrl,
        emailDraftForceRegenerateKey,
        emailDraftStatus?.runId,
    ]);

    const stopMediaStream = useCallback(() => {
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
    }, []);

    const startRecording = useCallback(async () => {
        if (typeof window === "undefined" || typeof navigator === "undefined") {
            return;
        }
        if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            setRecordingError("Recording is not supported in this browser. Upload a file or add a source URL instead.");
            return;
        }

        try {
            setRecordingError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .catch(() => navigator.mediaDevices.getUserMedia({ audio: true }));
            const hasVideo = stream.getVideoTracks().length > 0;
            recordedChunksRef.current = [];
            mediaStreamRef.current = stream;
            setRecordingMode(hasVideo ? "video" : "audio");

            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };
            recorder.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, {
                    type: recorder.mimeType || (hasVideo ? "video/webm" : "audio/webm"),
                });
                if (blob.size > 0) {
                    if (hasVideo) {
                        const recordedVideo = new File(
                            [blob],
                            `recorded-update-${Date.now()}.webm`,
                            { type: blob.type || "video/webm" },
                        );
                        void uploadVideoFile(recordedVideo, { forceCompress: true });
                    } else {
                        resetVideoUpload();
                        const audioPreviewUrl = URL.createObjectURL(blob);
                        videoPreviewObjectUrlRef.current = audioPreviewUrl;
                        setVideoPreviewUrl(audioPreviewUrl);
                        setPreviewMediaKind("audio");
                    }
                }
                recordedChunksRef.current = [];
                mediaRecorderRef.current = null;
                setIsRecording(false);
                setRecordingMode(null);
                stopMediaStream();
            };
            recorder.start();
            setIsRecording(true);
        } catch {
            setRecordingError("We couldn't access your camera or microphone. Upload a file or add a source URL instead.");
            setIsRecording(false);
            setRecordingMode(null);
            stopMediaStream();
        }
    }, [resetVideoUpload, stopMediaStream, uploadVideoFile]);

    const stopRecording = useCallback(() => {
        const recorder = mediaRecorderRef.current;
        if (recorder?.state === "recording") {
            recorder.stop();
            return;
        }
        setIsRecording(false);
        setRecordingMode(null);
        stopMediaStream();
    }, [stopMediaStream]);

    useEffect(() => {
        return () => {
            videoUploadAbortRef.current?.abort();
            revokeVideoPreviewObjectUrl();
            if (mediaRecorderRef.current?.state === "recording") {
                mediaRecorderRef.current.stop();
            }
            stopMediaStream();
        };
    }, [revokeVideoPreviewObjectUrl, stopMediaStream]);

    const resumeDraft = () => {
        try {
            const raw = localStorage.getItem("vibe_draft");
            if (!raw) return;
            const draft = JSON.parse(raw);

            // Restore current month fields
            if (draft.month) setSelectedMonth(draft.month);
            if (draft.year) setSelectedYear(Number(draft.year));
            setSummary(draft.summary || "");
            setSourceUrl(draft.sourceUrl || "");
            revokeVideoPreviewObjectUrl();
            setUploadedVideoUrl(draft.videoUrl || "");
            setVideoPreviewUrl(draft.videoUrl || null);
            setVideoStoragePath(draft.videoStoragePath || "");
            setVideoContentType(draft.videoContentType || "");
            setVideoFileSizeBytes(draft.videoFileSizeBytes ? Number(draft.videoFileSizeBytes) : null);
            setVideoOriginalFilename(draft.videoOriginalFilename || "");
            setVideoUploadStatus(draft.videoUrl ? "ready" : "idle");
            setVideoUploadError(null);
            setPreviewMediaKind(draft.videoUrl ? "video" : null);
            setHighlights(draft.highlights || "");
            setChallenges(draft.challenges || "");
            setAsks(draft.asks || "");
            setLearnings(draft.learnings || "");
            setNext30Days(draft.next30Days || "");

            // Restore current month metrics
            const metrics: Record<string, string> = {};
            METRIC_OPTIONS.forEach(opt => {
                if (draft[opt.key]) metrics[opt.key] = draft[opt.key];
            });
            setMetricValues(metrics);
            const restoredMetricKeys = String(draft.metricKeys || "")
                .split(",")
                .map((key: string) => key.trim())
                .filter((key: string) => METRIC_OPTION_MAP.has(key));
            const newSelected = new Set<string>([
                ...restoredMetricKeys,
                ...Object.keys(metrics).filter(k => metrics[k]),
            ]);
            setSelectedMetrics(newSelected);

            // Reconstruct past month cards from flat pastMonth_N_* fields
            const restoredPastMonths: EditorMonthCard[] = [];
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
                    learnings: draft[`pastMonth_${i}_learnings`] || "",
                    next30Days: draft[`pastMonth_${i}_next30Days`] || "",
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
        const wasSelected = selectedMetrics.has(key);
        setSelectedMetrics(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
        if (wasSelected) {
            setMetricValues(values => {
                const updated = { ...values };
                delete updated[key];
                return updated;
            });
        }
    };

    const updatePastMonthField = (index: number, field: string, value: string) => {
        setPastMonthCards(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
    };

    const updatePastMonthMetric = (index: number, key: string, value: string) => {
        setPastMonthCards(prev => prev.map((c, i) => i === index ? { ...c, metrics: { ...c.metrics, [key]: value } } : c));
    };

    const activePastIndex = activePeriodKey.startsWith("past-")
        ? Number(activePeriodKey.replace("past-", ""))
        : -1;
    const activePastCard = Number.isInteger(activePastIndex) ? pastMonthCards[activePastIndex] : undefined;
    const isViewingCurrentUpdate = activePeriodKey === "current" || !activePastCard;
    const activePastPeriod = activePastCard ? parseVibeRaisingMonthYear(activePastCard.month) : null;
    const activeDisplayMonth = isViewingCurrentUpdate ? selectedMonth : activePastPeriod?.month || selectedMonth;
    const activeDisplayYear = isViewingCurrentUpdate ? selectedYear : activePastPeriod?.year || selectedYear;
    const activeMonthTheme = getVibeRaisingMonthTheme(activeDisplayMonth);
    const activeMetricValues = isViewingCurrentUpdate ? metricValues : activePastCard?.metrics || {};
    const activeSelectedMetrics = isViewingCurrentUpdate
        ? selectedMetrics
        : new Set(Object.keys(activeMetricValues).filter((key) => METRIC_OPTION_MAP.has(key)));
    const formMetricKeys = Array.from(new Set([
        ...Array.from(selectedMetrics),
        ...Object.keys(metricValues),
    ])).filter((key) => METRIC_OPTION_MAP.has(key));
    const activeHighlights = isViewingCurrentUpdate ? highlights : activePastCard?.highlights || "";
    const activeChallenges = isViewingCurrentUpdate ? challenges : activePastCard?.challenges || "";
    const activeAsks = isViewingCurrentUpdate ? asks : activePastCard?.asks || "";
    const activeLearnings = isViewingCurrentUpdate ? learnings : activePastCard?.learnings || "";
    const activeNext30Days = isViewingCurrentUpdate ? next30Days : activePastCard?.next30Days || "";
    const periodTabs = [
        { key: "current", month: selectedMonth, year: selectedYear },
        ...pastMonthCards.map((card, index) => {
            const period = parseVibeRaisingMonthYear(card.month);
            return { key: `past-${index}`, month: period.month, year: period.year };
        }),
    ];

    const updateActiveMetric = (key: string, value: string) => {
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
        setPastMonthCards(prev => prev.map((card, index) => {
            if (index !== activePastIndex) return card;
            const nextMetrics = { ...card.metrics };
            if (key in nextMetrics) {
                delete nextMetrics[key];
                return { ...card, metrics: nextMetrics };
            }
            return { ...card, metrics: { ...nextMetrics, [key]: "" } };
        }));
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

    const updateActiveLearnings = (value: string) => {
        if (isViewingCurrentUpdate) setLearnings(value);
        else if (activePastIndex >= 0) updatePastMonthField(activePastIndex, "learnings", value);
    };

    const updateActiveNext30Days = (value: string) => {
        if (isViewingCurrentUpdate) setNext30Days(value);
        else if (activePastIndex >= 0) updatePastMonthField(activePastIndex, "next30Days", value);
    };

    useEffect(() => {
        if (activePeriodKey === "current") return;
        if (activePastCard) return;
        setActivePeriodKey("current");
    }, [activePastCard, activePeriodKey]);

    // Prepare chart data — revenue bars with auto-calculated MoM
    const chartData: ChartData[] = [
        ...pastMonthCards.map((card, i) => ({
            month: card.month,
            value: parseRevenue(card.metrics.revenue || "0"),
            isSelected: activePeriodKey === `past-${i}`
        })),
        {
            month: selectedMonth,
            value: parseRevenue(metricValues.revenue || "0"),
            isCurrent: true,
            isSelected: activePeriodKey === "current"
        }
    ];

    // Active users chart data
    const activeUsersChartData: ChartData[] = [
        ...pastMonthCards.map((card, i) => ({
            month: card.month,
            value: parseUsers(card.metrics.activeUsers || "0"),
            isSelected: activePeriodKey === `past-${i}`
        })),
        {
            month: selectedMonth,
            value: parseUsers(metricValues.activeUsers || "0"),
            isCurrent: true,
            isSelected: activePeriodKey === "current"
        }
    ];
    const hasRevenueChart = chartData.some((item) => item.value > 0);
    const hasActiveUsersChart = activeUsersChartData.some((item) => item.value > 0);

    // Chart click: always expand + scroll
    const expandCardFromChart = (index: number) => {
        if (index === pastMonthCards.length) {
            setActivePeriodKey("current");
            const el = document.getElementById("current-month-card");
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setActivePeriodKey(`past-${index}`);

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

    const selectPeriod = (periodKey: string) => {
        setActivePeriodKey(periodKey);
        if (periodKey === "current") {
            document.getElementById("current-month-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const index = Number(periodKey.replace("past-", ""));
        if (!Number.isFinite(index)) return;
        setExpandedCards((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
        });
        setTimeout(() => {
            document.getElementById(`past-month-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    };

    // Dropzone setup
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const video = acceptedFiles.find(isSupportedVideoFile);
        if (video) {
            void uploadVideoFile(video);
            return;
        }
        setVideoUploadStatus("error");
        setVideoUploadError("Use a common video format: MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.");
    }, [uploadVideoFile]);
    const onDropRejected = useCallback((fileRejections: any[]) => {
        setVideoUploadStatus("error");
        setVideoUploadError(getDropzoneRejectionMessage(fileRejections));
    }, []);
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        onDropRejected,
        maxFiles: 1,
        multiple: false,
        noClick: true,
        maxSize: MAX_SOURCE_VIDEO_BYTES,
        accept: VIDEO_ACCEPT,
    });

    const videoInputSection = (
        <section>
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-black text-gray-950">Say it your way</h2>
                    <p className="mt-3 text-sm text-slate-500">
                        Record a video or upload a file to support this update.
                    </p>
                </div>
            </div>
            <div className="relative mt-6">
                <fieldset disabled={isEmailDraftBusy} className={clsx(isEmailDraftBusy && "opacity-80")}>
                    <div
                        {...getRootProps()}
                        className={clsx(
                            "relative flex flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all sm:p-12",
                            isDragActive ? "scale-[1.01] border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)]" : "border-[var(--vr-color-border)] bg-white hover:bg-[var(--vr-color-neutral-50)]"
                        )}
                    >
                        <input {...getInputProps()} />

                        <div className="flex max-w-sm flex-col items-center">
                            <div className="mb-4 h-12 w-12 text-gray-400">
                                <CloudArrowUpIcon className="h-full w-full stroke-1" />
                            </div>

                            <p className="mb-1 text-lg font-bold text-gray-900">
                                Drag a video here to upload
                            </p>

                            <p className="mb-1 text-sm font-medium text-gray-600">
                                MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV
                            </p>

                            <p className="mb-6 text-sm text-gray-500">
                                Larger videos are compressed first. Final upload limit: 50 MB.
                            </p>

                            <div className="flex w-full flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        if (isRecording) {
                                            stopRecording();
                                        } else {
                                            void startRecording();
                                        }
                                    }}
                                    disabled={isEmailDraftBusy}
                                    className={clsx(
                                        "flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-2.5 font-bold transition-all shadow-sm",
                                        isRecording
                                            ? "animate-pulse bg-[rgba(242,114,63,0.14)] text-[var(--vr-palette-coral)] ring-2 ring-[rgba(242,114,63,0.22)]"
                                            : "bg-[rgba(242,114,63,0.10)] text-[var(--vr-palette-coral)] hover:bg-[rgba(242,114,63,0.16)] active:scale-95"
                                    )}
                                >
                                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--vr-palette-coral)]" />
                                    {isRecording ? "Stop Recording" : "Record"}
                                </button>

                                <button
                                    type="button"
                                    disabled={isEmailDraftBusy}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        open();
                                    }}
                                    className="flex-1 rounded-xl bg-black px-6 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95 disabled:opacity-60"
                                >
                                    Select file
                                </button>
                            </div>
                            {videoUploadStatusLabel && (
                                <p
                                    className={clsx(
                                        "mt-4 text-sm font-semibold",
                                        videoUploadStatus === "ready" ? "text-[var(--vr-color-primary)]" : "text-[var(--vr-palette-blue)]",
                                    )}
                                >
                                    {videoUploadStatusLabel}
                                </p>
                            )}
                            {videoUploadError && (
                                <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">{videoUploadError}</p>
                            )}
                            {isRecording && (
                                <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">
                                    {recordingMode === "audio" ? "Recording audio. Click Stop Recording when done." : "Recording video. Click Stop Recording when done."}
                                </p>
                            )}
                            {recordingError && (
                                <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">{recordingError}</p>
                            )}
                            {videoPreviewUrl && (
                                <div className="mt-5 w-full rounded-xl border border-gray-100 bg-gray-50 p-3 text-left">
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                            {previewMediaKind === "audio" ? "Recorded audio" : "Update video"}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={resetVideoUpload}
                                            className="text-xs font-bold text-gray-400 hover:text-gray-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    {previewMediaKind === "audio" ? (
                                        <audio src={videoPreviewUrl} controls className="w-full" />
                                    ) : (
                                        <VideoAssetPreview
                                            src={videoPreviewUrl}
                                            contentType={videoContentType}
                                            fileName={videoOriginalFilename || videoPreviewUrl}
                                            fileSizeBytes={videoFileSizeBytes}
                                            className="aspect-video w-full"
                                        />
                                    )}
                                    {videoUploadStatus === "ready" && uploadedVideoUrl && (
                                        <p className="mt-2 text-xs font-medium text-[var(--vr-color-primary)]">
                                            Uploaded and ready to publish.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </fieldset>
                {isEmailDraftBusy && (
                    <div className="absolute inset-0 z-10 cursor-wait rounded-2xl bg-white/30" aria-hidden />
                )}
            </div>
        </section>
    );

    // 1. Feedback View — preview-dominant with rating sidebar
    if (actionData?.step === "feedback" && !dismissedFeedback) {
        const { feedback, data } = actionData;
        const reviewData = data as any;
        const reviewMonth = String(reviewData?.month || selectedMonth);
        const reviewYear = Number(reviewData?.year || selectedYear);
        const reviewSummary = String(reviewData?.summary || "").trim();
        const reviewSourceUrl = String(reviewData?.sourceUrl || "").trim();
        const reviewVideoUrl = String(reviewData?.videoUrl || (previewMediaKind === "video" ? videoPreviewUrl : "") || "").trim();
        const reviewVideoStoragePath = String(reviewData?.videoStoragePath || videoStoragePath || "").trim();
        const reviewVideoContentType = String(reviewData?.videoContentType || videoContentType || "").trim();
        const reviewVideoOriginalFilename = String(reviewData?.videoOriginalFilename || videoOriginalFilename || "").trim();
        const reviewVideoFileSizeBytes = Number(reviewData?.videoFileSizeBytes || videoFileSizeBytes || 0) || null;

        const handleSaveDraft = () => {
            try {
                localStorage.setItem("vibe_draft", JSON.stringify(data));
                setDraftSaved(true);
                setTimeout(() => setDraftSaved(false), 2500);
            } catch (e) {
                console.error("Failed to save draft", e);
            }
        };

        const handleReviewStepperClick = (step: MonthlyUpdateStepKey) => {
            if (step === "connect") {
                goToConnectDataStep();
                return;
            }

            if (step === "draft") {
                setShowConfirmPopup(false);
                setDismissedFeedback(true);
                return;
            }

            if (step === "review") {
                setShowConfirmPopup(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            if (step === "publish") {
                setShowConfirmPopup(true);
            }
        };

        return (
            <div className="mx-auto max-w-6xl space-y-10 pb-32">
                <MonthlyUpdateStepper
                    activeStep={showConfirmPopup ? "publish" : "review"}
                    enabledSteps={["connect", "draft", "review", "publish"]}
                    onStepClick={handleReviewStepperClick}
                    expandOnHover
                    frameless
                    className="mt-8"
                />

                <div className="rounded-2xl border border-[rgba(0,255,215,0.24)] bg-[rgba(0,255,215,0.10)] px-5 py-4 shadow-sm">
                    <div className="flex min-w-0 gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[var(--vr-color-primary)] shadow-sm ring-1 ring-[var(--vr-color-border)]">
                            <SparklesIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-sm font-extrabold text-[var(--vr-color-primary)]">How it works</h2>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Preview page shows exactly what investors will see before you publish this monthly update.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main layout: investor preview. AI grading/feedback is hidden for now. */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-start">

                    {/* PREVIEW — dominant, takes most of the width */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Hero banner — video or gradient */}
                            {reviewVideoUrl ? (
                                <div className="relative w-full aspect-video bg-black">
                                    <VideoAssetPreview
                                        src={reviewVideoUrl}
                                        contentType={reviewVideoContentType}
                                        fileName={reviewVideoOriginalFilename || reviewVideoUrl}
                                        fileSizeBytes={reviewVideoFileSizeBytes}
                                        className="h-full w-full rounded-none"
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full h-32 overflow-hidden">
                                    <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--vr-palette-teal)_0%,var(--vr-palette-mint)_100%)]" />
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
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {reviewMonth} {reviewYear} Update
                                        </h3>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <VibeRaisingDateTabs month={reviewMonth} year={reviewYear} size="compact" />
                                            <StartupRegionBadge location={user.location} />
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
                                </div>
                            </div>

                            {/* Metrics — square boxes */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {(() => {
                                        const metricRecord = (((data as any)?.metrics || data) as Record<string, string>) || {};
                                        const selectedReviewKeys = String((data as any)?.metricKeys || "")
                                            .split(",")
                                            .map((key) => key.trim())
                                            .filter(Boolean);
                                        const options = selectedReviewKeys.length > 0
                                            ? metricOptionsFromKeys(selectedReviewKeys)
                                            : getMetricOptionsForDisplay(metricRecord);
                                        return options.map(m => {
                                        const val = (data as any)?.[m.key] || (data as any)?.metrics?.[m.key];
                                        return (
                                            <div
                                                key={m.key}
                                                className={clsx(
                                                    "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 transition-all",
                                                    val
                                                        ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                        : "border-gray-200 bg-gray-50 opacity-40"
                                                )}
	                                            >
                                                <MetricInfoBadge info={m.info} />
	                                                <div className={clsx(
                                                    "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                    val ? "bg-[rgba(0,255,215,0.18)]" : "bg-white"
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
                                    });
                                    })()}
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="px-6 py-5 space-y-5">
                                {(reviewSummary || reviewSourceUrl) && (
                                    <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                        {reviewSummary && (
                                            <p className="text-sm font-medium leading-relaxed text-gray-700">{reviewSummary}</p>
                                        )}
                                        {reviewSourceUrl && (
                                            <a
                                                href={reviewSourceUrl}
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
                                {(data as any)?.highlights && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <SparklesIcon className="h-3.5 w-3.5 text-[var(--vr-palette-purple)]" />
                                            Key Highlights
                                        </h4>
                                        <BulletList text={(data as any).highlights} />
                                    </div>
                                )}
                                {(data as any)?.challenges && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <ExclamationCircleIcon className="h-3.5 w-3.5 text-[var(--vr-palette-orange)]" />
                                            Challenges
                                        </h4>
                                        <BulletList text={(data as any).challenges} />
                                    </div>
                                )}
                                {(data as any)?.learnings && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <LightBulbIcon className="h-3.5 w-3.5 text-[var(--vr-palette-yellow)]" />
                                            Learnings
                                        </h4>
                                        <BulletList text={(data as any).learnings} />
                                    </div>
                                )}
                                {(data as any)?.next30Days && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <ArrowRightIcon className="h-3.5 w-3.5 text-[var(--vr-palette-blue)]" />
                                            Next 30 Days
                                        </h4>
                                        <BulletList text={(data as any).next30Days} />
                                    </div>
                                )}
                                {(data as any)?.asks && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <QuestionMarkCircleIcon className="h-3.5 w-3.5 text-[var(--vr-palette-lavender)]" />
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
                            const pastMonths: Array<{ month: string; highlights: string; challenges: string; asks: string; learnings: string; next30Days: string; metrics: Record<string, string> }> = [];
                            for (let i = 0; d?.[`pastMonth_${i}_month`]; i++) {
                                const pm: any = {
                                    month: d[`pastMonth_${i}_month`],
                                    highlights: d[`pastMonth_${i}_highlights`] || "",
                                    challenges: d[`pastMonth_${i}_challenges`] || "",
                                    asks: d[`pastMonth_${i}_asks`] || "",
                                    learnings: d[`pastMonth_${i}_learnings`] || "",
                                    next30Days: d[`pastMonth_${i}_next30Days`] || "",
                                    metrics: {},
                                };
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
                                        <div className={`mt-4 grid gap-4 ${hasRevenue && hasActiveUsers ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
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
                            const text = [(d.highlights || ''), (d.challenges || ''), (d.learnings || ''), (d.next30Days || ''), (d.asks || '')].join(" ").toLowerCase();
                            
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
                                <div className="mt-6 rounded-xl border border-[rgba(76,110,245,0.22)] bg-[rgba(76,110,245,0.08)] p-5 shadow-sm">
                                    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--vr-color-text)]">
                                        <UsersIcon className="h-4 w-4 text-[var(--vr-palette-blue)]" />
                                        Your Audience
                                    </h3>
                                    <p className="mb-3 text-sm text-[var(--vr-color-text-mid)]">
                                        We found <strong className="font-extrabold text-[var(--vr-palette-blue)]">{count} investors</strong> on Vibe Raising actively looking for updates matching your criteria:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {criteria.map(c => (
                                            <span key={c} className="rounded-lg border border-[rgba(76,110,245,0.24)] bg-white px-2.5 py-1 text-xs font-semibold text-[var(--vr-palette-blue)] shadow-sm">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Secondary action below preview */}
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                            >
                                {draftSaved ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--vr-color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Draft Saved!
                                    </>
                                ) : (
                                    <>Save as Draft</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Pre-Publish Confirmation Popup */}
                    {showConfirmPopup && (() => {
                        const d = data as any;
                        const text = [(d.highlights || ''), (d.challenges || ''), (d.learnings || ''), (d.next30Days || ''), (d.asks || '')].join(" ").toLowerCase();
                        
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
                                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center relative overflow-hidden animate-in fade-in zoom-in duration-300">
                                    <MonthlyUpdateStepper
                                        activeStep="publish"
                                        enabledSteps={["connect", "draft", "review", "publish"]}
                                        onStepClick={handleReviewStepperClick}
                                        expandOnHover
                                        frameless
                                        className="mb-6 text-left"
                                    />
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
                                        <input type="hidden" name="summary" value={reviewSummary} />
                                        <input type="hidden" name="sourceUrl" value={reviewSourceUrl} />
                                        <input type="hidden" name="videoUrl" value={reviewVideoUrl} />
                                        <input type="hidden" name="videoStoragePath" value={reviewVideoStoragePath} />
                                        <input type="hidden" name="videoContentType" value={reviewVideoContentType} />
                                        <input type="hidden" name="videoFileSizeBytes" value={reviewVideoFileSizeBytes ?? ""} />
                                        <input type="hidden" name="videoOriginalFilename" value={reviewVideoOriginalFilename} />
                                        {Object.entries(data || {})
                                            .filter(([key]) => !["summary", "sourceUrl", "videoUrl", "videoStoragePath", "videoContentType", "videoFileSizeBytes", "videoOriginalFilename"].includes(key))
                                            .map(([key, value]) => (
                                                <input key={key} type="hidden" name={key} value={value as any} />
                                            ))}
                                        
                                        <button
                                            type="submit"
                                            className="w-full rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[var(--vr-palette-black)] active:scale-95"
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

                    {SHOW_AI_REVIEW_FEEDBACK && (
                        <div className="w-full space-y-3 lg:sticky lg:top-6 lg:w-56 lg:flex-shrink-0">
                            <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                {user.domain ? (
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${user.domain}&sz=64`}
                                        alt={user.companyName}
                                        className="mb-2 h-12 w-12 rounded-xl bg-gray-50"
                                    />
                                ) : (
                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--vr-palette-teal-soft),var(--vr-palette-mint))]">
                                        <span className="text-lg font-bold text-[var(--vr-palette-black)]">{user.companyName.charAt(0)}</span>
                                    </div>
                                )}
                                <p className="text-sm font-bold text-gray-900">{user.companyName}</p>
                                {user.domain && (
                                    <p className="mt-0.5 text-[11px] text-gray-400">{user.domain}</p>
                                )}
                                <StartupRegionBadge location={user.location} className="mt-3" />
                                {feedback?.grade && (
                                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,255,215,0.28)] bg-[rgba(0,255,215,0.12)] px-2.5 py-1">
                                        <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--vr-color-primary)]">AI Grade</span>
                                        <span className="text-sm font-bold leading-none text-[var(--vr-color-primary)]">{feedback.grade}</span>
                                    </div>
                                )}
                            </div>

                            <CollapsibleFeedback
                                icon={<CheckCircleIcon className="w-3.5 h-3.5" />}
                                headline={`${feedback?.strengths.length} strengths found`}
                                color="green"
                            >
                                <ul className="space-y-1.5">
                                    {feedback?.strengths.map((str: string, i: number) => (
                                        <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-[var(--vr-color-text)]">
                                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--vr-color-primary)]" />
                                            {str}
                                        </li>
                                    ))}
                                </ul>
                            </CollapsibleFeedback>

                            <CollapsibleFeedback
                                icon={<ExclamationTriangleIcon className="w-3.5 h-3.5" />}
                                headline={`${feedback?.improvements.length} areas to improve`}
                                color="orange"
                            >
                                <ul className="space-y-1.5">
                                    {feedback?.improvements.map((imp: string, i: number) => (
                                        <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-[var(--vr-color-text)]">
                                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--vr-palette-orange)]" />
                                            {imp}
                                        </li>
                                    ))}
                                </ul>
                            </CollapsibleFeedback>

                            <CollapsibleFeedback
                                icon={<LightBulbIcon className="w-3.5 h-3.5" />}
                                headline="Pro tip from AI"
                                color="blue"
                            >
                                <p className="text-xs leading-relaxed text-[var(--vr-color-text)]">{feedback?.proTip}</p>
                            </CollapsibleFeedback>
                        </div>
                    )}
                </div>

                <VibeRaisingStickyStepBar
                    statusIcon={
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
                            <CheckCircleIcon className="h-5 w-5" />
                        </div>
                    }
                    statusTitle={`Review ${reviewMonth} ${reviewYear} update`}
                    statusDetail="Preview is ready. Publish when the story feels right."
                    onBack={() => setDismissedFeedback(true)}
                    primaryLabel="Publish and Send"
                    onPrimary={() => setShowConfirmPopup(true)}
                />
            </div>
        );
    }

    // 3. Create/Edit Form View
    return (
        <div className="mx-auto max-w-6xl space-y-10 pb-32">
            <div className="space-y-4">
                <MonthlyUpdateStepper
                    activeStep="draft"
                    enabledSteps={isEdit ? ["draft"] : ["connect", "draft"]}
                    onStepClick={handleDraftStepperClick}
                    expandOnHover
                    frameless
                    className="mt-8"
                />

                <div className="rounded-2xl border border-[rgba(0,255,215,0.24)] bg-[rgba(0,255,215,0.10)] px-5 py-4 shadow-sm">
                    <div className="flex min-w-0 gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[var(--vr-color-primary)] shadow-sm ring-1 ring-[var(--vr-color-border)]">
                            <SparklesIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-sm font-extrabold text-[var(--vr-color-primary)]">How it works</h2>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Bring in your raw materials first. We keep the selected month, inputs, and draft fields together through review and publish.
                                <br />
                                Early stage? No worries. Record a selfie video or short presentation to share your idea with investors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="space-y-4">
                    {monthConfirmed ? (
                        <button
                            type="button"
                            onClick={() => {
                                setMonthConfirmed(false);
                                setSelectedDraftStage(null);
                                setMetricsConfirmed(false);
                            }}
                            className="group flex w-full items-center rounded-2xl border border-[var(--vr-color-border)] bg-white px-5 py-3 text-left shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.08)] focus:outline-none focus:ring-4 focus:ring-[rgba(0,255,215,0.24)] sm:px-6 sm:py-4"
                            aria-label={`Change selected update month, currently ${selectedMonthLabel}`}
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--vr-palette-mint)] ring-4 ring-[rgba(0,255,215,0.14)] transition group-hover:ring-[rgba(0,255,215,0.28)]" />
                                <p className="truncate text-base font-black text-gray-950">
                                    {selectedMonthLabel}
                                </p>
                            </div>
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <p className="px-1 text-sm font-black text-gray-950">Select month</p>
                            <div className="overflow-visible rounded-[2rem] border border-[var(--vr-color-border)] bg-white p-5 shadow-sm transition-all sm:p-8 lg:p-10">
                                <div className="grid gap-4 lg:grid-cols-4 lg:items-stretch">
                                    <div className="lg:col-span-3">
                                        <div className="rounded-3xl border border-gray-200 bg-[var(--vr-palette-paper)] p-4 shadow-sm sm:p-5">
                                            <MonthYearTabs
                                                month={selectedMonth}
                                                year={selectedYear}
                                                onMonthChange={setSelectedMonth}
                                                onYearChange={setSelectedYear}
                                                onPeriodChange={setActivePeriodKey}
                                                isDateEditable={!isEmailDraftBusy}
                                            />
                                            {isSelectedMonthInFuture && (
                                                <p className="mt-3 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
                                                    Future monthly updates can be generated once that month starts.
                                                </p>
                                            )}
                                            {existingUpdateForSelectedMonth && !isSelectedMonthInFuture && (
                                                <p className="mt-3 rounded-xl border border-[rgba(0,128,128,0.18)] bg-[rgba(0,255,215,0.12)] px-4 py-3 text-sm font-medium text-[var(--vr-color-primary)]">
                                                    An update already exists for {selectedMonthLabel}. Regenerating will refresh matching points and add new evidence-backed points.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={isSelectedMonthInFuture || emailDraftActionBusy}
                                        onClick={() => {
                                            void handleGenerateDraftFromEmailClick();
                                        }}
                                        className={clsx(
                                            "group flex w-full flex-col justify-between rounded-3xl border px-5 py-5 text-left shadow-sm transition focus:outline-none focus:ring-4 lg:col-span-1 lg:min-h-[132px]",
                                            isSelectedMonthInFuture || emailDraftActionBusy
                                                ? "cursor-not-allowed border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] text-slate-400"
                                                : "cursor-pointer border-[var(--vr-palette-black)] bg-[var(--vr-palette-black)] text-white hover:-translate-y-0.5 hover:bg-[var(--vr-palette-purple)] focus:ring-[rgba(150,73,210,0.24)]",
                                        )}
                                    >
                                        <div>
                                            <p
                                                className={clsx(
                                                    "text-xs font-black uppercase tracking-[0.16em]",
                                                    isSelectedMonthInFuture || emailDraftActionBusy ? "text-slate-400" : "text-white/65",
                                                )}
                                            >
                                                AI drafting
                                            </p>
                                            <p className="mt-3 text-lg font-black leading-tight">
                                                {selectedMonthGenerationVerb} update
                                            </p>
                                        </div>
                                        <div className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold">
                                            <span>{selectedMonthLabel}</span>
                                            {emailDraftActionBusy ? (
                                                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedDraftStage === "reporting" ? (
                        <>
                            {shouldShowEmailDraftProgress ? (
                                <EmailDraftInProgressCard
                                    status={emailDraftCardStatus}
                                    displayStage={emailDraftCardDisplayStage}
                                    completedSteps={emailDraftCardCompletedSteps}
                                    totalSteps={emailDraftCardTotalSteps}
                                    sourceLabel={`${selectedInputSourceDescription} for ${selectedMonthLabel}`}
                                    error={emailDraftCardError}
                                    notice={emailDraftCardNotice}
                                    pollingDegraded={emailDraftPollingDegraded}
                                    onRetry={emailDraftCardStatus === "failed" ? handleRetryEmailDraft : undefined}
                                    retryDisabled={emailDraftActionBusy || emailDraftCancelBusy}
                                    onCancel={isEmailDraftBusy ? () => {
                                        void handleCancelEmailDraft();
                                    } : undefined}
                                    cancelDisabled={emailDraftActionBusy || emailDraftCancelBusy}
                                    isCancelling={emailDraftCancelBusy}
                                    manualFallbackMessage={canContinueDraftManually ? "You can keep editing the update below while the backend draft connection is unavailable." : null}
                                />
                            ) : null}
                            {hasDraftTemplate ? (
                                <div className="overflow-hidden rounded-[2rem] border border-[var(--vr-color-border)] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
                                <Form id={DRAFT_REVIEW_FORM_ID} method="POST" className="space-y-6">
                                    <input type="hidden" name="intent" value="review" />
                                    <input type="hidden" name="metricKeys" value={formMetricKeys.join(",")} />
                                    <input type="hidden" name="summary" value={summary} />
                                    <input type="hidden" name="sourceUrl" value={sourceUrl} />
                                    <input type="hidden" name="videoUrl" value={uploadedVideoUrl} />
                                    <input type="hidden" name="videoStoragePath" value={videoStoragePath} />
                                    <input type="hidden" name="videoContentType" value={videoContentType} />
                                    <input type="hidden" name="videoFileSizeBytes" value={videoFileSizeBytes ?? ""} />
                                    <input type="hidden" name="videoOriginalFilename" value={videoOriginalFilename} />
                                    <input type="hidden" name="month" value={selectedMonth} />
                                    <input type="hidden" name="year" value={selectedYear} />

                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        {draftMetricOptions.map((metric) => (
                                                <label key={metric.key} className="rounded-2xl border border-gray-200 bg-[var(--vr-palette-paper)] p-4">
                                                    <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-gray-500">
                                                        {metric.icon}
                                                        {metric.label}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name={metric.key}
                                                        value={metricValues[metric.key] || ""}
                                                        onChange={(event) => setMetricValues((previous) => ({ ...previous, [metric.key]: event.target.value }))}
                                                        placeholder={metric.prefix ? `${metric.prefix}${metric.placeholder}` : metric.placeholder}
                                                        className="mt-4 w-full border-b-2 border-[rgba(0,128,128,0.26)] bg-transparent py-1 text-lg font-black text-gray-950 outline-none transition focus:border-[var(--vr-color-primary)]"
                                                    />
                                                </label>
                                        ))}
                                    </div>

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
                                            label="Learnings"
                                            name="learnings"
                                            value={learnings}
                                            onChange={setLearnings}
                                            placeholder="What did you learn from customers, experiments, or execution this month?"
                                            icon={LightBulbIcon}
                                        />
                                        <SectionWithExample
                                            label="Next 30 Days"
                                            name="next30Days"
                                            value={next30Days}
                                            onChange={setNext30Days}
                                            placeholder="What are the highest priority actions, deadlines, or goals for the next month?"
                                            icon={ArrowRightIcon}
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

                                </Form>
                                </div>
                            ) : null}
                            {videoInputSection}
                        </>
                    ) : null}

                </div>
            </section>

            <VibeRaisingStickyStepBar
                statusIcon={draftStickyStatusIcon}
                statusTitle={draftStickyBar.statusTitle}
                statusDetail={draftStickyBar.statusDetail}
                onBack={draftStickyBar.onBack}
                primaryLabel={draftStickyBar.primaryLabel}
                onPrimary={draftStickyBar.onPrimary}
                primaryDisabled={draftStickyBar.primaryDisabled}
                primaryType={draftStickyBar.primaryType}
                primaryForm={draftStickyBar.primaryForm}
            />

            {showLegacyDraftFlow ? (
            <>
            {/* Draft Resume Banner */}
            {hasDraft && (
                <div className="mb-5 flex items-center gap-4 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-5 py-3.5 shadow-sm">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(255,200,1,0.24)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--vr-palette-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                        disabled={isEmailDraftBusy}
                        className="rounded-lg bg-[rgba(255,200,1,0.22)] px-4 py-1.5 text-sm font-bold text-[var(--vr-color-text)] transition-colors hover:bg-[rgba(255,200,1,0.30)] disabled:opacity-60"
                    >
                        Resume Draft
                    </button>
                    <button
                        type="button"
                        onClick={dismissDraft}
                        disabled={isEmailDraftBusy}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Dismiss"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {showRegenerateConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/55 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--vr-color-card)] shadow-2xl ring-1 ring-black/5">
                        <div className="border-b border-[var(--vr-color-border)] px-6 py-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(255,200,1,0.16)] text-[var(--vr-palette-orange)] ring-1 ring-[rgba(255,200,1,0.30)]">
                                    <ExclamationTriangleIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--vr-color-text)]">Draft another update?</h2>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        You already have a monthly update for <strong className="font-bold text-gray-900">{selectedMonthLabel}</strong>. Creating a new draft from these inputs can take up to 20 minutes. Previous dot points will not be overwritten; matching points will be refreshed and new points will be added.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse gap-3 px-6 py-4 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={handleCancelRegenerateDraft}
                                disabled={emailDraftActionBusy}
                                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmRegenerateDraft}
                                disabled={emailDraftActionBusy}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {emailDraftActionBusy ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                                Regenerate {selectedMonthLabel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Form method="POST" className="space-y-6">
                <input type="hidden" name="intent" value="review" />
                <input
                    type="hidden"
                    name="metricKeys"
                    value={formMetricKeys.join(",")}
                />
                <input type="hidden" name="summary" value={summary} />
                <input type="hidden" name="sourceUrl" value={sourceUrl} />
                <input type="hidden" name="videoUrl" value={uploadedVideoUrl} />
                <input type="hidden" name="videoStoragePath" value={videoStoragePath} />
                <input type="hidden" name="videoContentType" value={videoContentType} />
                <input type="hidden" name="videoFileSizeBytes" value={videoFileSizeBytes ?? ""} />
                <input type="hidden" name="videoOriginalFilename" value={videoOriginalFilename} />

                <section>
                    {videoInputSection}
                </section>

                <section>
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black text-gray-950">Selected inputs</h2>
                            <p className="mt-3 text-sm text-slate-500">
                                Sources and materials included in this draft.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 rounded-2xl border border-[var(--vr-color-border)] bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-2">
                                {selectedInputSourceLabels.length > 0 ? (
                                    selectedInputSourceLabels.map((label) => (
                                        <span key={label} className="rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
                                            {label}
                                        </span>
                                    ))
                                ) : (
                                    <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-gray-500 ring-1 ring-gray-100">
                                        Manual materials only
                                    </span>
                                )}
                            </div>
                            {!isEdit && (
                                <Link
                                    to="/founder-tools/data-sources"
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                                >
                                    Change inputs
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black text-gray-950">AI drafting</h2>
                            <p className="mt-3 text-sm text-slate-500">
                                Use selected sources to generate a first draft.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        {emailDraftCardVisible ? (
                            <EmailDraftInProgressCard
                                status={emailDraftCardStatus}
                                displayStage={emailDraftCardDisplayStage}
                                completedSteps={emailDraftCardCompletedSteps}
                                totalSteps={emailDraftCardTotalSteps}
                                sourceLabel={`${selectedInputSourceDescription} for ${selectedMonthLabel}`}
                                error={emailDraftCardError}
                                notice={emailDraftCardNotice}
                                pollingDegraded={emailDraftPollingDegraded}
                                onRetry={emailDraftCardStatus === "failed" ? handleRetryEmailDraft : undefined}
                                retryDisabled={emailDraftActionBusy || emailDraftCancelBusy}
                                onCancel={isEmailDraftBusy ? () => {
                                    void handleCancelEmailDraft();
                                } : undefined}
                                cancelDisabled={emailDraftActionBusy || emailDraftCancelBusy}
                                isCancelling={emailDraftCancelBusy}
                            />
                        ) : (
                            <button
                                type="button"
                                disabled={emailDraftActionBusy || isSelectedMonthInFuture}
                                onClick={() => {
                                    void handleGenerateDraftFromEmailClick();
                                }}
                                className={clsx(
                                    "group flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--vr-color-border)] bg-white p-5 text-left shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.12)] disabled:cursor-not-allowed disabled:opacity-60",
                                    canGenerateDraftFromEmail && !isSelectedMonthInFuture
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed",
                                )}
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
                                        {emailDraftActionBusy ? (
                                            <ArrowPathIcon className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <SparklesIcon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-base font-bold text-gray-950">
                                            {emailDraftButtonTitle}
                                        </p>
                                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                                            {emailDraftButtonDescription}
                                        </p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
                            </button>
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black text-gray-950">Update draft</h2>
                            <p className="mt-3 text-sm text-slate-500">
                                Edit metrics and investor-facing dot points for {activeDisplayMonth} {activeDisplayYear}.
                            </p>
                        </div>
                    </div>
                    <div className="relative mt-6">
                    <fieldset disabled={isEmailDraftBusy} className={clsx(isEmailDraftBusy && "opacity-80")}>
	                        {/* ─── Growth Charts ─── */}
                        {pastMonthCards.length > 0 && (hasRevenueChart || hasActiveUsersChart) && (
                            <div className={clsx("grid gap-4", hasRevenueChart && hasActiveUsersChart ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
                                {hasRevenueChart && (
                                    <GrowthChart
                                        data={chartData}
                                        onSelect={expandCardFromChart}
                                        title="Revenue"
                                        subtitle="Monthly revenue with MoM growth"
                                        formatter={formatCompact}
                                    />
                                )}
                                {hasActiveUsersChart && (
                                    <GrowthChart
                                        data={activeUsersChartData}
                                        onSelect={expandCardFromChart}
                                        title="Active Users"
                                        subtitle="Monthly active users with MoM growth"
                                        formatter={formatUsers}
                                    />
                                )}
                            </div>
                        )}

                {/* ─── Stacked Card Layout ─── */}
                {pastMonthCards.length > 0 && (
                    <div className="relative">
                        {/* Past month cards — grayed-out, peeking behind current */}
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
                                                    {getMetricOptionsForMetrics(card.metrics).length > 0 && (
                                                        <span className="flex items-center gap-2 text-xs text-gray-400">
                                                            {getMetricOptionsForMetrics(card.metrics).map(m => (
                                                                <span key={m.key} className="whitespace-nowrap">{m.label}: {m.prefix || ""}{card.metrics[m.key]}</span>
                                                            ))}
                                                        </span>
                                                    )}
                                                    {getMetricOptionsForMetrics(card.metrics).length === 0 && (
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
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                                {getEditableMetricOptions(card.metrics, new Set(Object.keys(card.metrics))).map(m => {
                                                    const active = m.key in card.metrics;
                                                    return (
                                                        <div
                                                            key={m.key}
                                                            onClick={() => {
                                                                if (active) {
                                                                    const updated = { ...card.metrics };
                                                                    delete updated[m.key];
                                                                    setPastMonthCards(prev => prev.map((c, i) => i === index ? { ...c, metrics: updated } : c));
                                                                } else {
                                                                    updatePastMonthMetric(index, m.key, "");
                                                                }
                                                            }}
                                                            className={clsx(
                                                                "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-1.5 cursor-pointer transition-all",
                                                                active
                                                                    ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                                    : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                            )}
	                                                        >
                                                            <MetricInfoBadge info={m.info} />
	                                                            <div className={clsx(
                                                                "w-5 h-5 rounded-full flex items-center justify-center mb-1",
                                                                active ? "bg-[rgba(0,255,215,0.18)]" : "bg-white"
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
                                                                    className="w-full border-b-2 border-[rgba(0,128,128,0.26)] bg-transparent py-0.5 text-center text-xs font-extrabold text-gray-900 focus:border-[var(--vr-color-primary)] focus:outline-none"
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
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Learnings</label>
                                            <BulletInput value={card.learnings} onChange={(v) => updatePastMonthField(index, "learnings", v)} placeholder="Learning from this month..." section="learnings" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Next 30 Days</label>
                                            <BulletInput value={card.next30Days} onChange={(v) => updatePastMonthField(index, "next30Days", v)} placeholder="Priority for the next month..." section="next30Days" />
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
                                <input type="hidden" name={`pastMonth_${index}_learnings`} value={card.learnings} />
                                <input type="hidden" name={`pastMonth_${index}_next30Days`} value={card.next30Days} />
                                {Object.entries(card.metrics).map(([key, value]) => (
                                    <input key={key} type="hidden" name={`pastMonth_${index}_${key}`} value={value} />
                                ))}
                            </div>
                        ))}

                        {/* Current month card — prominent, always visible */}
                        <div
                            id="current-month-card"
                            className={clsx(
	                                "rounded-xl border-2 bg-white p-6 space-y-5 shadow-md ring-1 scroll-mt-24",
	                                activeMonthTheme.borderClass,
	                                activeMonthTheme.ringClass,
	                            )}
	                        >
	                            {!isViewingCurrentUpdate && (
	                                <>
	                                    <input type="hidden" name="month" value={selectedMonth} />
	                                    <input type="hidden" name="year" value={selectedYear} />
	                                    <input type="hidden" name="highlights" value={highlights} />
	                                    <input type="hidden" name="challenges" value={challenges} />
	                                    <input type="hidden" name="asks" value={asks} />
	                                    <input type="hidden" name="learnings" value={learnings} />
	                                    <input type="hidden" name="next30Days" value={next30Days} />
	                                    <input type="hidden" name="metricKeys" value={formMetricKeys.join(",")} />
	                                    {getMetricOptionsForMetrics(metricValues).map((metric) => (
	                                        <input key={metric.key} type="hidden" name={metric.key} value={metricValues[metric.key] || ""} />
	                                    ))}
	                                </>
	                            )}

                            {/* Metrics — square boxes, click to activate */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                                </label>
	                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
	                                    {getEditableMetricOptions(activeMetricValues, activeSelectedMetrics).map((m) => {
	                                        const active = activeSelectedMetrics.has(m.key);
	                                        return (
	                                            <div
	                                                key={m.key}
	                                                onClick={() => toggleActiveMetric(m.key)}
                                                className={clsx(
                                                    "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                    active
                                                        ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                        : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                )}
	                                            >
                                                <MetricInfoBadge info={m.info} />
	                                                <div className={clsx(
                                                    "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                    active ? "bg-[rgba(0,255,215,0.18)]" : "bg-white"
                                                )}>
                                                    {m.icon}
                                                </div>
                                                {active ? (
                                                    <input
	                                                        type="text"
	                                                        name={isViewingCurrentUpdate ? m.key : undefined}
	                                                        value={activeMetricValues[m.key] || ""}
	                                                        onClick={(e) => e.stopPropagation()}
	                                                        onChange={(e) => updateActiveMetric(m.key, e.target.value)}
                                                        placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                        className="w-full border-b-2 border-[rgba(0,128,128,0.26)] bg-transparent py-0.5 text-center text-base font-extrabold text-gray-900 focus:border-[var(--vr-color-primary)] focus:outline-none"
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
	                                    label="Learnings"
	                                    name={isViewingCurrentUpdate ? "learnings" : `pastMonth_${activePastIndex}_learnings`}
	                                    value={activeLearnings}
	                                    onChange={updateActiveLearnings}
                                    rows={3}
                                    placeholder="What did you learn from customers, experiments, or execution this month?"
                                    icon={LightBulbIcon}
                                />
	                                <SectionWithExample
	                                    label="Next 30 Days"
	                                    name={isViewingCurrentUpdate ? "next30Days" : `pastMonth_${activePastIndex}_next30Days`}
	                                    value={activeNext30Days}
	                                    onChange={updateActiveNext30Days}
                                    rows={3}
                                    placeholder="What are the highest priority actions, deadlines, or goals for the next month?"
                                    icon={ArrowRightIcon}
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
                            "rounded-xl border bg-white p-6 space-y-5 ring-1",
                            selectedMonthTheme.borderClass,
                            selectedMonthTheme.ringClass,
                        )}
                    >
                        {/* Metrics — square boxes, click to activate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {getEditableMetricOptions(metricValues, selectedMetrics).map((m) => {
                                    const active = selectedMetrics.has(m.key);
                                    return (
                                        <div
                                            key={m.key}
                                            onClick={() => toggleMetric(m.key)}
                                            className={clsx(
                                                "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                active
                                                    ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                    : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                            )}
	                                        >
                                            <MetricInfoBadge info={m.info} />
	                                            <div className={clsx(
                                                "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                active ? "bg-[rgba(0,255,215,0.18)]" : "bg-white"
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
                                                    className="w-full border-b-2 border-[rgba(0,128,128,0.26)] bg-transparent py-0.5 text-center text-base font-extrabold text-gray-900 focus:border-[var(--vr-color-primary)] focus:outline-none"
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
                                label="Learnings"
                                name="learnings"
                                value={learnings}
                                onChange={setLearnings}
                                placeholder="What did you learn from customers, experiments, or execution this month?"
                                icon={LightBulbIcon}
                            />
                            <SectionWithExample
                                label="Next 30 Days"
                                name="next30Days"
                                value={next30Days}
                                onChange={setNext30Days}
                                placeholder="What are the highest priority actions, deadlines, or goals for the next month?"
                                icon={ArrowRightIcon}
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
                                onClick={() => navigate("/founder-tools/updates")}
                                disabled={isEmailDraftBusy}
                                className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60"
                            >
                                Cancel
                            </button>
	                            <button
	                                type="submit"
	                                disabled={isSubmitting || isEmailDraftBusy || isVideoUploadBlocking}
	                                className="flex-1 rounded-lg bg-[var(--vr-color-primary)] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[var(--vr-palette-black)] disabled:opacity-60"
	                            >
	                                {isSubmitting ? "Reviewing..." : isVideoUploadPending ? "Uploading video..." : "Review"}
	                            </button>
                        </div>
                    </fieldset>
                    {isEmailDraftBusy && (
                        <div className="absolute inset-0 z-10 cursor-wait rounded-2xl bg-white/25" aria-hidden />
                    )}
                    </div>
                </section>
            </Form>

            {isClientMounted ? (
                <DraftFromEmailWizard
                    isOpen={showEmailWizard}
                    onClose={handleEmailWizardClose}
                    onGoogleConnected={handleEmailWizardConnected}
                    backendBaseUrl={backendBaseUrl}
                    companyDomain={user.domain}
                />
            ) : null}
            </>
            ) : null}
        </div>
    );
}
