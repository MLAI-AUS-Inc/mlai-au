import { Form, Link, useActionData, useLocation, useNavigate, useNavigation, useLoaderData, redirect } from "react-router";
import React, { startTransition, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import { getEnv } from "~/lib/env.server";
import {
    cancelVibeRaisingStartupUpdate,
    requireVibeRaisingFounder,
    bootstrapVibeRaisingStartupUpdate,
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
import StartupRegionBadge from "~/components/StartupRegionBadge";
import { getVibeRaisingMonthTheme, parseVibeRaisingMonthYear, VIBE_RAISING_MONTH_OPTIONS, VibeRaisingDateTabs } from "~/components/VibeRaisingDateTabs";
import type { VibeRaisingStartupUpdateStatusResponse, VibeRaisingVideoCompressionMetadata } from "~/types/vibe-raising";

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
        const metricKeys = ["revenue", "activeUsers", "mrr", "burnRate", "runway"];
        const metrics = Object.fromEntries(
            metricKeys
                .map((key) => [key, String(formData.get(key) || "").trim()] as const)
                .filter(([, value]) => value.length > 0),
        );
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
            metrics,
        });

        return redirect("/vibe-raising");
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
];

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
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch">
            <div ref={monthMenuRef} className="relative min-w-0 flex-1">
                <div
                    className={clsx(
                        "relative z-10 flex w-full overflow-hidden text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl ring-1 ring-white/30 transition-all duration-150",
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
                            "flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                            isDateEditable ? "cursor-pointer hover:bg-white/10" : "cursor-default",
                        )}
                        aria-label="Select update month"
                        aria-haspopup={isDateEditable ? "listbox" : undefined}
                        aria-expanded={isDateEditable ? isMonthMenuOpen : undefined}
                    >
                        <span className="min-w-0 flex-1 truncate">{month}</span>
                        {statusLabel && (
                            <span className="hidden shrink-0 text-[10px] font-medium normal-case tracking-normal text-white/75 sm:inline">
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
                                            "flex min-w-[48px] items-center justify-center px-2 font-black text-white/90 transition-all hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 sm:min-w-[58px] sm:px-3",
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
                            <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-64 translate-y-1 rounded-2xl bg-gray-950 px-4 py-3 text-left text-[11px] font-medium normal-case leading-5 tracking-normal text-white opacity-0 shadow-2xl shadow-black/25 ring-1 ring-white/10 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:w-72">
                                We generated the current month and earlier months from Gmail. Click any month button to check and edit that update.
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

const MAX_VIDEO_UPLOAD_BYTES = 250 * 1024 * 1024;
const MAX_SOURCE_VIDEO_BYTES = 750 * 1024 * 1024;
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
    if (firstError.code === "file-too-large") return "Video is too large to compress in the browser. Use a file under 750 MB.";
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
    let message = "We couldn't draft your update from Gmail. Please try again.";
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
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="flex items-center gap-2 bg-black px-4 py-2.5">
                <Icon className="w-4 h-4 text-white/80" />
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                    {label}
                </label>
            </div>
            <input type="hidden" name={name} value={value || ""} />
            <div className="space-y-3 p-4">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <span className="mt-2.5 text-sm text-violet-400 select-none flex-shrink-0">•</span>
                        <BulletTextarea
                            value={item}
                            onChange={(text) => updateItem(i, text)}
                            placeholder={hints[i % hints.length] || placeholder}
                            className="flex-1 rounded-xl border-2 border-gray-100 bg-white px-4 py-2 text-sm leading-6 text-gray-900 placeholder:text-gray-300 placeholder:italic focus:border-violet-400 focus:ring-0"
                        />
                        {(items.length > 1 || item.trim().length > 0) && (
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="mt-1.5 rounded-lg p-1.5 text-gray-300 transition-all hover:bg-red-50 hover:text-red-400"
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
                className="flex w-full items-center justify-center gap-1.5 border-t border-dashed border-gray-100 py-3 text-xs font-bold text-violet-600 transition-colors hover:bg-violet-50"
            >
                <span className="text-base leading-none">+</span>
                Add point
            </button>
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
                    <span className="mt-2 text-xs text-violet-400 select-none">•</span>
                    <BulletTextarea
                        value={item}
                        onChange={(text) => update(i, text)}
                        placeholder={hints[i % hints.length] || placeholder || "Add a point..."}
                        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs leading-5 text-gray-900 shadow-sm placeholder:text-gray-300 placeholder:italic focus:border-violet-400 focus:ring-violet-400"
                    />
                    {(items.length > 1 || item.trim().length > 0) && (
                        <button type="button" onClick={() => remove(i)} className="mt-1 rounded-md p-1 px-2 text-gray-300 transition-all hover:bg-red-50 hover:text-red-400">
                            <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className="mt-1 flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-violet-600 transition-all hover:bg-violet-50">
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
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
                                d.isCurrent ? "text-violet-600" : color?.label || "text-gray-400"
                            )}>
                                {d.month.slice(0, 3)}
                            </span>

                            {/* Horizontal bar */}
                            <div className="flex-1 h-7 bg-gray-50 rounded-md overflow-hidden relative">
                                <div
                                    className={clsx(
                                        "h-full rounded-md transition-all duration-500 ease-out relative overflow-hidden",
                                        d.isCurrent
                                            ? "bg-violet-600 shadow-sm"
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
    const defaultData = actionData?.step === "feedback" ? (actionData.data as any) : (existingData || {});
    const [dismissedFeedback, setDismissedFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(defaultData?.videoUrl || null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>(defaultData?.videoUrl || "");
    const [videoUploadStatus, setVideoUploadStatus] = useState<VideoUploadStatus>(defaultData?.videoUrl ? "ready" : "idle");
    const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
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

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback") setDismissedFeedback(false);
    }, [actionData]);

    // State declarations
    const [isClientMounted, setIsClientMounted] = useState(false);
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const [summary, setSummary] = useState<string>(defaultData?.summary || "");
    const [sourceUrl, setSourceUrl] = useState<string>(defaultData?.sourceUrl || "");
    const [showImportPanel, setShowImportPanel] = useState<boolean>(
        Boolean(defaultData?.summary || defaultData?.sourceUrl || defaultData?.videoUrl),
    );
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
    const [activePeriodKey, setActivePeriodKey] = useState("current");
    const selectedMonthTheme = getVibeRaisingMonthTheme(selectedMonth);
    
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

    const handleDraftComplete = (data: any) => {
        setActivePeriodKey("current");
        if (data.month) setSelectedMonth(data.month);
        if (data.year) setSelectedYear(data.year);
        setHighlights(data.highlights);
        setChallenges(data.challenges);
        setAsks(data.asks || "");
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
        if (data.summary || data.sourceUrl || data.source_url || data.videoUrl || data.video_url) {
            setShowImportPanel(true);
        }
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
        setShowImportPanel(true);
        revokeVideoPreviewObjectUrl();
        setVideoPreviewUrl(null);

        if (!isSupportedVideoFile(file)) {
            setVideoUploadStatus("error");
            setVideoUploadError("Use a common video format: MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.");
            return;
        }

        if (file.size > MAX_SOURCE_VIDEO_BYTES) {
            setVideoUploadStatus("error");
            setVideoUploadError("Video is too large to compress in the browser. Use a file under 750 MB.");
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
                        throw new Error("Video exceeds the 250 MB upload limit after compression. Try a shorter clip.");
                    }
                }
            }

            if (uploadCandidate.size > MAX_VIDEO_UPLOAD_BYTES) {
                throw new Error("Video exceeds the 250 MB upload limit.");
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
                shouldForceRegenerate ? { forceRegenerate: true } : undefined,
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
    }, [backendBaseUrl, emailDraftForceRegenerateKey]);

    const handleGenerateDraftFromEmailClick = useCallback(async () => {
        if (!canGenerateDraftFromEmail) {
            navigate("/vibe-raising/companies");
            return;
        }

        setEmailDraftActionBusy(true);
        setEmailDraftUiError(null);
        try {
            const bootstrap = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl);
            if (bootstrap.googleConnected) {
                await startOrResumeEmailDraft();
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
    }, [backendBaseUrl, canGenerateDraftFromEmail, navigate, startOrResumeEmailDraft]);

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
            ? "We couldn't start the Gmail draft."
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
                "We couldn't draft your update from Gmail. Please try again."
            )
            : undefined;
    const emailDraftCardNotice =
        isEmailDraftBusy && emailDraftStatus?.state !== "failed"
            ? emailDraftUiError
            : null;
    const emailDraftButtonTitle = emailDraftActionBusy
        ? "Checking Gmail connection..."
        : "AI Drafting";
    const emailDraftButtonDescription = emailDraftActionBusy
        ? "Contacting the MLAI backend and checking whether Gmail is already connected."
        : canGenerateDraftFromEmail
            ? "Scan filtered Gmail data for key signals, metrics, wins, and asks, then turn them into a first draft."
            : "Add a company domain first so Gmail emails can be matched to the right startup.";
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

    const handleRetryEmailDraft = () => {
        clearPersistedEmailDraftRun();
        void startOrResumeEmailDraft({ forceRegenerate: true });
    };

    const handleCancelEmailDraft = useCallback(async () => {
        const runId = String(emailDraftStatus?.runId || "").trim();
        if (!runId) return;
        if (typeof window !== "undefined") {
            const confirmed = window.confirm(
                "Cancel this Gmail draft run and reset the monthly update so you can try again?",
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
            setEmailDraftUiError("We couldn't cancel that Gmail draft run. We'll keep polling the current status.");
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
                    setShowImportPanel(true);
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
            setShowImportPanel(Boolean(draft.summary || draft.sourceUrl || draft.videoUrl));
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
        : new Set(Object.keys(activeMetricValues).filter((key) => activeMetricValues[key]));
    const activeHighlights = isViewingCurrentUpdate ? highlights : activePastCard?.highlights || "";
    const activeChallenges = isViewingCurrentUpdate ? challenges : activePastCard?.challenges || "";
    const activeAsks = isViewingCurrentUpdate ? asks : activePastCard?.asks || "";
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
                return Object.keys(nextMetrics).length > 0 ? { ...card, metrics: nextMetrics } : card;
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
        setShowImportPanel(true);
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

                {/* Main layout: Preview + thin rating bar.
                    Mobile: stacked (preview first, feedback below).
                    Desktop: preview left, sticky sidebar right. */}
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
                                                className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 hover:text-violet-900"
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

                    {/* RATING SIDEBAR — stacked below on mobile, sticky right on desktop */}
                    <div className="w-full lg:w-56 lg:flex-shrink-0 lg:sticky lg:top-6 space-y-3">
                        {/* Company identity (primary) with AI grade as supporting badge */}
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
                            <StartupRegionBadge location={user.location} className="mt-3" />
                            {feedback?.grade && (
                                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-green-700">AI Grade</span>
                                    <span className="text-sm font-bold text-green-700 leading-none">{feedback.grade}</span>
                                </div>
                            )}
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
                            <p className="text-xs text-violet-800 leading-relaxed">{feedback?.proTip}</p>
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
                        disabled={isEmailDraftBusy}
                        className="px-4 py-1.5 text-sm font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors disabled:opacity-60"
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

            <Form method="POST" className="space-y-6">
                <input type="hidden" name="intent" value="review" />
                <input type="hidden" name="summary" value={summary} />
                <input type="hidden" name="sourceUrl" value={sourceUrl} />
                <input type="hidden" name="videoUrl" value={uploadedVideoUrl} />
                <input type="hidden" name="videoStoragePath" value={videoStoragePath} />
                <input type="hidden" name="videoContentType" value={videoContentType} />
                <input type="hidden" name="videoFileSizeBytes" value={videoFileSizeBytes ?? ""} />
                <input type="hidden" name="videoOriginalFilename" value={videoOriginalFilename} />

                <div className="relative">
                    <fieldset disabled={isEmailDraftBusy} className={clsx(isEmailDraftBusy && "opacity-80")}>
                        {/* Upload Section */}
                        <div
                            {...getRootProps()}
                            className={clsx(
                                "relative border border-gray-100 rounded-2xl p-6 sm:p-12 transition-all flex flex-col items-center justify-center text-center",
                                isDragActive ? "bg-violet-50/50 border-violet-200 scale-[1.01]" : "bg-white hover:bg-gray-50/50"
                            )}
                        >
                            <input {...getInputProps()} />

                            <div className="flex flex-col items-center max-w-sm">
                                <div className="w-12 h-12 text-gray-400 mb-4">
                                    <CloudArrowUpIcon className="w-full h-full stroke-1" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    Drag a video here to upload
                                </h3>

                                <p className="text-sm text-gray-600 font-medium mb-1">
                                    MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV
                                </p>

                                <p className="text-sm text-gray-500 mb-6">
                                    Larger videos are compressed first. Final upload limit: 250 MB.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 w-full">
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
                                        disabled={isEmailDraftBusy}
                                        className={clsx(
                                            "flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm",
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
                                        disabled={isEmailDraftBusy}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            open();
                                        }}
                                        className="flex-1 px-6 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-gray-900 active:scale-95 transition-all shadow-sm disabled:opacity-60"
                                    >
                                        Select file
                                    </button>
                                </div>
                                {videoUploadStatusLabel && (
                                    <p className={clsx(
                                        "mt-4 text-sm font-semibold",
                                        videoUploadStatus === "ready" ? "text-green-600" : "text-violet-600",
                                    )}>
                                        {videoUploadStatusLabel}
                                    </p>
                                )}
                                {videoUploadError && (
                                    <p className="mt-4 text-sm font-semibold text-red-600">{videoUploadError}</p>
                                )}
                                {isRecording && (
                                    <p className="mt-4 text-sm font-semibold text-red-600">
                                        {recordingMode === "audio" ? "Recording audio. Click Stop Recording when done." : "Recording video. Click Stop Recording when done."}
                                    </p>
                                )}
                                {recordingError && (
                                    <p className="mt-4 text-sm font-semibold text-red-600">{recordingError}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <button
                                type="button"
                                onClick={() => setShowImportPanel((value) => !value)}
                                className="flex w-full items-center justify-between gap-4 text-left"
                            >
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">Manual materials</h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Add a source URL, a short summary, or a quick recorded note for this update.
                                    </p>
                                </div>
                                <ChevronDownIcon className={clsx("h-5 w-5 flex-shrink-0 text-gray-400 transition-transform", showImportPanel && "rotate-180")} />
                            </button>

                            {showImportPanel && (
                                <div className="mt-5 space-y-4">
                                    <label className="block">
                                        <span className="mb-1.5 flex items-center gap-2 text-sm font-bold text-gray-700">
                                            <LinkIcon className="h-4 w-4 text-gray-400" />
                                            Source URL
                                        </span>
                                        <input
                                            type="url"
                                            value={sourceUrl}
                                            onChange={(event) => setSourceUrl(event.target.value)}
                                            placeholder="https://docs.google.com/document/..."
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="mb-1.5 block text-sm font-bold text-gray-700">Short summary</span>
                                        <textarea
                                            value={summary}
                                            onChange={(event) => setSummary(event.target.value)}
                                            rows={3}
                                            placeholder="Topline context investors should read before the detailed sections..."
                                            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </label>

                                    {videoPreviewUrl && (
                                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
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
                                                <p className="mt-2 text-xs font-medium text-green-600">
                                                    Uploaded and ready to publish.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </fieldset>
                    {isEmailDraftBusy && (
                        <div className="absolute inset-0 z-10 cursor-wait rounded-2xl bg-white/30" aria-hidden />
                    )}
                </div>

                {emailDraftCardVisible ? (
                    <EmailDraftInProgressCard
                        status={emailDraftCardStatus}
                        displayStage={emailDraftCardDisplayStage}
                        completedSteps={emailDraftCardCompletedSteps}
                        totalSteps={emailDraftCardTotalSteps}
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
                        disabled={emailDraftActionBusy}
                        onClick={() => {
                            void handleGenerateDraftFromEmailClick();
                        }}
                        className={clsx(
                            "group relative w-full overflow-hidden rounded-2xl border border-black bg-black p-6 text-left shadow-[0_24px_70px_-50px_rgba(0,0,0,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_80px_-50px_rgba(0,0,0,0.8)]",
                            canGenerateDraftFromEmail
                                ? "cursor-pointer"
                                : "cursor-pointer opacity-80",
                            emailDraftActionBusy && "opacity-70",
                        )}
                    >
                        <div className="relative z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
                                {emailDraftActionBusy ? (
                                    <ArrowPathIcon className="h-7 w-7 animate-spin" />
                                ) : (
                                    <SparklesIcon className="h-7 w-7" />
                                )}
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {emailDraftButtonTitle}
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
                                        {emailDraftButtonDescription}
                                    </p>
                                </div>
                                <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-white/60 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </button>
                )}

                <div className="relative">
                    <fieldset disabled={isEmailDraftBusy} className={clsx(isEmailDraftBusy && "opacity-80")}>
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
                                        {/* Metrics — square boxes */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Metrics</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
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
                                                                <input
                                                                    type="text"
                                                                    value={card.metrics[m.key] || ""}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    onChange={(e) => updatePastMonthMetric(index, m.key, e.target.value)}
                                                                    placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                                    className="w-full text-xs font-extrabold text-gray-900 bg-transparent border-b-2 border-violet-300 focus:border-violet-500 focus:outline-none text-center py-0.5"
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
                        <div
                            id="current-month-card"
                            className={clsx(
	                                "rounded-xl border-2 bg-white p-6 space-y-5 shadow-md ring-1 scroll-mt-24",
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
	                                activePeriodKey={activePeriodKey}
	                                onPeriodChange={selectPeriod}
	                                submitDateFields={isViewingCurrentUpdate}
	                                isDateEditable={isViewingCurrentUpdate}
	                                statusLabel={isViewingCurrentUpdate ? "Current Update" : "Previous Update"}
	                                showInfoControl={pastMonthCards.length > 0}
	                            />

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

                            {/* Metrics — square boxes, click to activate */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                                </label>
	                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
	                                    {METRIC_OPTIONS.map((m) => {
	                                        const active = activeSelectedMetrics.has(m.key);
	                                        return (
	                                            <div
	                                                key={m.key}
	                                                onClick={() => toggleActiveMetric(m.key)}
                                                className={clsx(
                                                    "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                    active
                                                        ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                                                        : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                                )}
	                                            >
                                                <MetricInfoBadge info={m.info} />
	                                                <div className={clsx(
                                                    "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                    active ? "bg-violet-100" : "bg-white"
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
                                                        className="w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 border-violet-300 focus:border-violet-500 focus:outline-none text-center py-0.5"
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
	                        <MonthYearTabs
	                            month={selectedMonth}
	                            year={selectedYear}
	                            onMonthChange={setSelectedMonth}
	                            onYearChange={setSelectedYear}
	                            statusLabel="Current Update"
	                        />

                        {/* Metrics — square boxes, click to activate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Metrics <span className="text-gray-400 font-normal">(click to toggle)</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {METRIC_OPTIONS.map((m) => {
                                    const active = selectedMetrics.has(m.key);
                                    return (
                                        <div
                                            key={m.key}
                                            onClick={() => toggleMetric(m.key)}
                                            className={clsx(
                                                "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                active
                                                    ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200 shadow-sm"
                                                    : "border-gray-200 bg-gray-50 opacity-50 hover:opacity-75 hover:border-gray-300"
                                            )}
	                                        >
                                            <MetricInfoBadge info={m.info} />
	                                            <div className={clsx(
                                                "w-7 h-7 rounded-full flex items-center justify-center mb-1.5",
                                                active ? "bg-violet-100" : "bg-white"
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
                                                    className="w-full text-base font-extrabold text-gray-900 bg-transparent border-b-2 border-violet-300 focus:border-violet-500 focus:outline-none text-center py-0.5"
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
                                disabled={isEmailDraftBusy}
                                className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60"
                            >
                                Cancel
                            </button>
	                            <button
	                                type="submit"
	                                disabled={isSubmitting || isEmailDraftBusy || isVideoUploadBlocking}
	                                className="flex-1 px-6 py-3 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 shadow-sm disabled:opacity-60"
	                            >
	                                {isSubmitting ? "Reviewing..." : isVideoUploadPending ? "Uploading video..." : "Review"}
	                            </button>
                        </div>
                    </fieldset>
                    {isEmailDraftBusy && (
                        <div className="absolute inset-0 z-10 cursor-wait rounded-2xl bg-white/25" aria-hidden />
                    )}
                </div>
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
        </div>
    );
}
