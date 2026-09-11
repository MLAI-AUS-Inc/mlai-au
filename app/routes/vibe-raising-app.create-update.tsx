import UpdateCoverEditor from "~/components/vibe-raising/UpdateCoverEditor";
import { coverUpdateText, normalizeUpdateCover, parseUpdateCoverForm } from "~/lib/update-cover";
import type { VibeRaisingUpdateCover } from "~/types/vibe-raising";
import UpdateEvidenceText from "~/components/vibe-raising/UpdateEvidenceText";
import ReportingEvidenceNotice from "~/components/vibe-raising/ReportingEvidenceNotice";
import VibeRaisingAudienceVisibilityField from "~/components/VibeRaisingAudienceVisibilityField";
import { Form, Link, useActionData, useFetcher, useLocation, useNavigate, useNavigation, useLoaderData, useSubmit, redirect } from "react-router";
import React, { startTransition, useCallback, useEffect, useEffectEvent, useId, useMemo, useRef, useState, type RefObject } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import { getEnv } from "~/lib/env.server";
import {
    cancelVibeRaisingStartupUpdate,
    requireVibeRaisingFounder,
    bootstrapVibeRaisingStartupUpdate,
    getVibeRaisingDrafts,
    getStartupHealth,
    getVibeRaisingMonthlyUpdates,
    getVibeRaisingMonthlyUpdateById,
    getVibeRaisingInputSourcesStatus,
    getVibeRaisingStartupUpdateActiveRun,
    getVibeRaisingStartupUpdateDraftResults,
    getVibeRaisingStartupUpdateStatus,
    publishVibeRaisingMonthlyUpdate,
    createVibeRaisingLocalPublishedUpdateCookie,
    createVibeRaisingLocalDraftUpdateCookie,
    saveVibeRaisingCompany,
    runVibeRaisingStartupUpdate,
    saveVibeRaisingMonthlyUpdate,
    uploadVibeRaisingPitchDeck,
    uploadVibeRaisingUpdateVideo,
    resolveActiveCompanyId,
    setVibeRaisingActiveCompany,
    normalizeConciseAnalysis,
    normalizeFinancialSnapshot,
} from "~/lib/vibe-raising";
import {
    getMonthlyUpdateReminderCompanyId,
    removeReminderCompanySelector,
    resolveMonthlyUpdateReminderCompany,
} from "~/lib/monthly-update-reminder-link";
import { parseFounderProfilesFormValue } from "~/lib/founder-profiles";
import { normalizeVibeRaisingAudienceVisibility } from "~/lib/vibe-raising-audience-visibility";
import { buildVibeRaisingDraftReturnPath, readVibeRaisingDraftReturnState } from "~/lib/vibe-raising-draft-return";
import {
    buildVibeRaisingFinancialSurveyQuestion,
    type VibeRaisingFinancialSurveyContext,
    type VibeRaisingFinancialSurveyQuestionKey,
} from "~/lib/vibe-raising-survey";
import {
    VIBE_METRIC_KEYS,
    VIBE_METRIC_OPTIONS,
    metricOptionsForValues,
    VIBE_METRIC_OPTION_MAP,
    hasDisplayableMetricValue,
    type MetricOption,
} from "~/lib/vibe-raising-metrics";
import {
    XMarkIcon,
    SparklesIcon,
    ArrowPathIcon,
    CloudArrowUpIcon,
    VideoCameraIcon,
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
    ArrowLeftIcon,
    ArrowRightIcon,
    BanknotesIcon,
    InformationCircleIcon,
    LinkIcon,
    ArrowTopRightOnSquareIcon,
    CalendarDaysIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
    HandThumbUpIcon as HandThumbUpSolidIcon,
    HandThumbDownIcon as HandThumbDownSolidIcon,
} from "@heroicons/react/24/solid";
import { motion, useInView } from "motion/react";
import { clsx } from "clsx";
import { useActiveDraftRun } from "~/components/ActiveDraftRunStatus";
import DraftFromEmailWizard from "~/components/DraftFromEmailWizard";
import EmailDraftInProgressCard from "~/components/EmailDraftInProgressCard";
import type { MonthlyUpdateStepKey } from "~/components/MonthlyUpdateStepper";
import VibeRaisingWorkflowLayout from "~/components/VibeRaisingWorkflowLayout";
import { getVibeRaisingDraftProgress } from "~/lib/vibe-raising-progress";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import VibeRaisingStickyStepBar from "~/components/VibeRaisingStickyStepBar";
import FinancialChartsSection from "~/components/vibe-raising/FinancialChartsSection";
import { getVibeRaisingMonthTheme, parseVibeRaisingMonthYear, VIBE_RAISING_MONTH_OPTIONS } from "~/components/VibeRaisingDateTabs";
import type {
    VibeRaisingInputSourceKey,
    VibeRaisingFounderProfile,
    VibeRaisingInputSourceSummary,
    VibeRaisingManualDocument,
    VibeRaisingAudienceVisibilitySelection,
    VibeRaisingMetricDisplayConfig,
    VibeRaisingMetricSuggestion,
    VibeRaisingMetricVisibility,
    VibeRaisingMonthlyUpdate,
    VibeRaisingFinancialSnapshot,
    VibeRaisingConciseAnalysis,
    VibeRaisingStartupUpdateStatusResponse,
    VibeRaisingVideoCompressionMetadata,
} from "~/types/vibe-raising";

const VALID_INPUT_SOURCE_KEYS = new Set<VibeRaisingInputSourceKey>([
    "gmail",
    "google_analytics",
    "stripe",
    "xero",
    "bank_feed",
    "notion",
    "google_drive",
    "slack",
    "linear",
    "luma",
    "manual_documents",
]);

const INPUT_SOURCE_LABELS: Record<VibeRaisingInputSourceKey, string> = {
    gmail: "Gmail",
    google_analytics: "Google Analytics",
    stripe: "Stripe",
    xero: "Xero",
    bank_feed: "Bank Feed",
    notion: "Notion",
    google_drive: "Google Drive",
    slack: "Slack",
    linear: "Linear",
    luma: "Luma",
    manual_documents: "Manual documents",
};

const COMPACT_OPTIONAL_SOURCE_KEYS: VibeRaisingInputSourceKey[] = [
    "google_analytics",
    "stripe",
    "luma",
    "linear",
    "notion",
    "google_drive",
    "gmail",
    "slack",
    "xero",
];

const DEFAULT_BACKEND_BASE_URL = "https://api.mlai.au";
const MANUAL_MATERIALS_STORAGE_KEY = "vibe_raising_manual_materials";
const CREATE_UPDATE_MOBILE_TOUR_STORAGE_KEY = "vibe_raising_create_update_mobile_tour_seen_v1";
const SHOW_AI_REVIEW_FEEDBACK = false;
const DRAFT_REVIEW_FORM_ID = "vibe-raising-draft-review-form";
const SEND_TO_MLAI_FORM_ID = "vibe-raising-send-to-mlai-form";
const BACKEND_DRAFT_ID_PATTERN = /^\d+$/;
const REQUIRED_FOUNDER_QUESTION_COUNT = 3;
const FOUNDER_QUESTION_FIELDS = ["highlights", "challenges", "learnings", "next30Days", "asks"] as const;
const FINANCIAL_METRIC_SOURCE_KEYS = ["stripe", "xero"] as const;

type CreateUpdateMobileTourStep = {
    key: string;
    title: string;
    body: string;
    targetRef: RefObject<Element | null>;
};

type UpdateCadence = "monthly" | "weekly";
type MlaiFeedbackPreference = "yes" | "no";
type BinarySurveyAnswer = "yes" | "no" | null;
type EndOfFlowSurveyQuestionKey = VibeRaisingFinancialSurveyQuestionKey | "guidedQuestionsUseful" | "previewAccurate";

const END_OF_FLOW_SURVEY_CORE_QUESTIONS: Array<{
    key: EndOfFlowSurveyQuestionKey;
    label: string;
}> = [
    { key: "guidedQuestionsUseful", label: "Did the guided questions help you explain your progress, challenges, and support needs?" },
    { key: "previewAccurate", label: "Did the final preview feel accurate enough to send without major edits?" },
];
const END_OF_FLOW_SURVEY_STEP_COUNT = END_OF_FLOW_SURVEY_CORE_QUESTIONS.length + 2;

function hasMeaningfulFounderAnswer(value: unknown) {
    return String(value || "").replace(/[\s\-•]+/g, "").length > 0;
}

function countAnsweredFounderQuestions(formData: FormData) {
    return FOUNDER_QUESTION_FIELDS.filter((field) => hasMeaningfulFounderAnswer(formData.get(field))).length;
}

type WeeklyUpdateOption = {
    key: string;
    startIso: string;
    endIso: string;
    label: string;
    month: string;
    year: number;
    isCurrent: boolean;
};

function readStoredManualMaterials(scope: string): {
    summary: string;
    sourceUrl: string;
    pitchDeckSummary: string;
    pitchDeckUrl: string;
    manualDocumentIds: string[];
    documents: VibeRaisingManualDocument[];
} {
    const empty = { summary: "", sourceUrl: "", pitchDeckSummary: "", pitchDeckUrl: "", manualDocumentIds: [], documents: [] };
    if (typeof window === "undefined") return empty;
    try {
        const raw = window.sessionStorage.getItem(`${MANUAL_MATERIALS_STORAGE_KEY}:${scope}`);
        if (!raw) return empty;
        const parsed = JSON.parse(raw) as {
            summary?: unknown;
            sourceUrl?: unknown;
            pitchDeckSummary?: unknown;
            pitchDeckUrl?: unknown;
            manualDocumentIds?: unknown;
            documents?: unknown;
        };
        const documents = Array.isArray(parsed.documents)
            ? parsed.documents.filter((item): item is VibeRaisingManualDocument =>
                Boolean(item && typeof item === "object" && typeof (item as VibeRaisingManualDocument).id === "string"),
            )
            : [];
        const manualDocumentIds = Array.isArray(parsed.manualDocumentIds)
            ? parsed.manualDocumentIds.map((item) => String(item || "").trim()).filter(Boolean)
            : documents.map((document) => document.id);
        return {
            summary: typeof parsed.summary === "string" ? parsed.summary : "",
            sourceUrl: typeof parsed.sourceUrl === "string" ? parsed.sourceUrl : "",
            pitchDeckSummary: typeof parsed.pitchDeckSummary === "string" ? parsed.pitchDeckSummary : "",
            pitchDeckUrl: typeof parsed.pitchDeckUrl === "string" ? parsed.pitchDeckUrl : "",
            manualDocumentIds,
            documents,
        };
    } catch {
        return empty;
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

function isConnectedInputSource(source: VibeRaisingInputSourceSummary) {
    return source.status === "connected" || source.status === "syncing";
}

function compactSourceStatusLabel(source: VibeRaisingInputSourceSummary) {
    switch (source.status) {
        case "connected":
            return "Connected";
        case "syncing":
            return "Syncing";
        case "error":
            return "Needs attention";
        case "coming_soon":
        case "unavailable":
            return "Coming soon";
        default:
            return "Not connected";
    }
}

function DraftSourceLogo({ sourceKey }: { sourceKey: VibeRaisingInputSourceKey }) {
    const badgeClassName = "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200";
    const officialLogoClassName = "h-8 w-8 object-contain";

    if (sourceKey === "gmail") {
        return (
            <span className={badgeClassName}>
                <img src="/vibe-raising/logos/gmail.svg" alt="" className={officialLogoClassName} />
            </span>
        );
    }

    if (sourceKey === "slack") {
        return (
            <span className={badgeClassName}>
                <img src="/vibe-raising/logos/slack.png" alt="" className={officialLogoClassName} />
            </span>
        );
    }

    if (sourceKey === "google_analytics") {
        return (
            <span className={badgeClassName}>
                <img src="/vibe-raising/logos/google-analytics.svg" alt="" className={officialLogoClassName} />
            </span>
        );
    }

    if (sourceKey === "linear") {
        return (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 shadow-sm">
                <svg viewBox="0 0 36 36" className="h-8 w-8" aria-hidden>
                    <path d="M8 25l17-17" stroke="white" strokeLinecap="round" strokeWidth="3" />
                    <path d="M14 28l14-14" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.85" />
                    <path d="M8 17l9-9" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.7" />
                    <path d="M22 28l6-6" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.55" />
                </svg>
            </span>
        );
    }

    if (sourceKey === "stripe") {
        return (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#635bff] text-2xl font-black text-white shadow-sm">
                S
            </span>
        );
    }

    if (sourceKey === "bank_feed") {
        return (
            <span className={badgeClassName}>
                <BanknotesIcon className="h-7 w-7 text-[var(--vr-color-primary)]" />
            </span>
        );
    }

    if (sourceKey === "notion") {
        return (
            <span className={badgeClassName}>
                <img src="/vibe-raising/logos/notion.png" alt="" className="h-8 w-8 rounded-lg object-contain" />
            </span>
        );
    }

    if (sourceKey === "luma") {
        return (
            <span className={badgeClassName}>
                <img src="/vibe-raising/logos/luma.webp" alt="" className={officialLogoClassName} />
            </span>
        );
    }

    if (sourceKey === "google_drive") {
        return (
            <span className={badgeClassName}>
                <svg viewBox="0 0 36 32" className="h-8 w-8" aria-hidden>
                    <path d="M13 2h10l11 19H24z" fill="#34a853" />
                    <path d="M13 2L2 21l5 9 11-19z" fill="#fbbc05" />
                    <path d="M7 30h22l5-9H12z" fill="#4285f4" />
                    <path d="M13 2l5 9h10l-5-9z" fill="#188038" opacity="0.55" />
                </svg>
            </span>
        );
    }

    return (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#13b5ea] text-xs font-black uppercase text-white shadow-sm">
            xero
        </span>
    );
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

function monthYearFromIso(value?: string | null): { month: string; year: number } | null {
    const match = /^(\d{4})-(\d{2})/.exec(String(value || "").trim());
    if (!match) return null;
    const year = Number(match[1]);
    const option = VIBE_RAISING_MONTH_OPTIONS[Number(match[2]) - 1];
    if (!option || !Number.isFinite(year)) return null;
    return { month: option.name, year };
}

function isFutureMonthlyUpdate(month: string, year: number | string) {
    const monthIndex = VIBE_RAISING_MONTH_OPTIONS.findIndex((option) => option.name === month);
    const parsedYear = Number(year);
    if (monthIndex < 0 || !Number.isFinite(parsedYear)) return true;
    const now = new Date();
    return parsedYear > now.getFullYear() || (parsedYear === now.getFullYear() && monthIndex > now.getMonth());
}

const MIN_MONTHLY_UPDATE_YEAR = 2025;
const MIN_MONTHLY_UPDATE_MONTH_INDEX = 5; // June 2025 is the earliest selectable update month.

function isBeforeMinimumMonthlyUpdate(month: string, year: number | string) {
    const monthIndex = VIBE_RAISING_MONTH_OPTIONS.findIndex((option) => option.name === month);
    const parsedYear = Number(year);
    if (monthIndex < 0 || !Number.isFinite(parsedYear)) return true;
    return parsedYear < MIN_MONTHLY_UPDATE_YEAR ||
        (parsedYear === MIN_MONTHLY_UPDATE_YEAR && monthIndex < MIN_MONTHLY_UPDATE_MONTH_INDEX);
}

function firstAllowedMonthForYear(year: number) {
    return VIBE_RAISING_MONTH_OPTIONS.find((option) => !isBeforeMinimumMonthlyUpdate(option.name, year))?.name;
}

function getCurrentMonthlyUpdatePeriod(now = new Date()) {
    return {
        month: VIBE_RAISING_MONTH_OPTIONS[now.getMonth()]?.name || "January",
        year: now.getFullYear(),
    };
}

function getPreviousMonthlyUpdatePeriod(now = new Date()) {
    const previous = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return {
        month: VIBE_RAISING_MONTH_OPTIONS[previous.getMonth()]?.name || "December",
        year: previous.getFullYear(),
    };
}

function getCreateStepMonthOptions(now = new Date()) {
    const previous = getPreviousMonthlyUpdatePeriod(now);
    const current = getCurrentMonthlyUpdatePeriod(now);
    return [previous, current];
}

function toLocalIsoDate(value: Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getStartOfWeek(value: Date) {
    const start = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    const day = start.getDay() || 7;
    start.setDate(start.getDate() - day + 1);
    return start;
}

function formatWeeklyUpdateLabel(start: Date, end: Date) {
    const startMonth = start.toLocaleDateString("en-AU", { month: "short" });
    const endMonth = end.toLocaleDateString("en-AU", { month: "short" });
    if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()}–${end.getDate()} ${endMonth}`;
    }
    return `${start.getDate()} ${startMonth}–${end.getDate()} ${endMonth}`;
}

function getCreateStepWeekOptions(now = new Date()): WeeklyUpdateOption[] {
    const currentWeekStart = getStartOfWeek(now);

    return Array.from({ length: 4 }, (_, index) => {
        const start = new Date(currentWeekStart);
        start.setDate(currentWeekStart.getDate() - ((3 - index) * 7));
        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return {
            key: toLocalIsoDate(start),
            startIso: toLocalIsoDate(start),
            endIso: toLocalIsoDate(end),
            label: formatWeeklyUpdateLabel(start, end),
            month: VIBE_RAISING_MONTH_OPTIONS[end.getMonth()]?.name || "January",
            year: end.getFullYear(),
            isCurrent: index === 3,
        };
    });
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

// Accepts either the object shape (loader data) or the JSON string echoed
// back through the hidden form input on the feedback step.
function parseDisplayConfigValue(raw: unknown): VibeRaisingMetricDisplayConfig | null {
    if (!raw) return null;
    if (typeof raw === "string") {
        const text = raw.trim();
        if (!text) return null;
        try {
            return parseDisplayConfigValue(JSON.parse(text));
        } catch {
            return null;
        }
    }
    if (typeof raw !== "object" || Array.isArray(raw)) return null;
    const candidate = raw as Record<string, unknown>;
    const toKeys = (value: unknown) =>
        Array.isArray(value) ? value.map(String).filter(Boolean) : [];
    return {
        snippetMetricKeys: toKeys(candidate.snippetMetricKeys),
        fullMetricKeys: toKeys(candidate.fullMetricKeys),
    };
}

function parseJsonObjectValue<T extends Record<string, unknown>>(raw: unknown): T | null {
    if (!raw) return null;
    if (typeof raw === "string") {
        try {
            return parseJsonObjectValue<T>(JSON.parse(raw));
        } catch {
            return null;
        }
    }
    return typeof raw === "object" && !Array.isArray(raw) ? raw as T : null;
}

function buildExistingUpdateFormData(update: VibeRaisingMonthlyUpdate) {
    const parsedPeriod = parseVibeRaisingMonthYear(update.month);
    const metrics = update.metrics || {};
    return {
        id: update.id,
        revisionId: update.revisionId,
        revisionHash: update.revisionHash,
        audienceVisibility: update.audienceVisibility || "",
        month: update.monthName || parsedPeriod.month,
        year: update.year || parsedPeriod.year,
        coverImage: update.coverImage || null,
        summary: update.summary || "",
        sourceUrl: update.sourceUrl || "",
        pitchDeckUrl: update.pitchDeckUrl || "",
        pitchDeckStoragePath: update.pitchDeckStoragePath || "",
        pitchDeckContentType: update.pitchDeckContentType || "",
        pitchDeckFileSizeBytes: update.pitchDeckFileSizeBytes || null,
        pitchDeckOriginalFilename: update.pitchDeckOriginalFilename || "",
        pitchDeckSummary: update.pitchDeckSummary || "",
        videoUrl: update.videoUrl || "",
        videoStoragePath: update.videoStoragePath || "",
        videoContentType: update.videoContentType || "",
        videoFileSizeBytes: update.videoFileSizeBytes || null,
        videoOriginalFilename: update.videoOriginalFilename || "",
        highlights: update.highlights || "",
        challenges: update.challenges || "",
        asks: update.asks || "",
        learnings: update.learnings || "",
        next30Days: update.next30Days || "",
        metrics,
        metricSuggestions: update.metricSuggestions || [],
        displayConfig: update.displayConfig || null,
        financialSnapshot: update.financialSnapshot || null,
        conciseAnalysis: update.conciseAnalysis || null,
        presentationMode: update.presentationMode || null,
        metricKeys: Object.keys(metrics).join(","),
        ...metrics,
    };
}

function normalizeAudienceVisibilityValue(value: unknown): VibeRaisingAudienceVisibilitySelection {
    return normalizeVibeRaisingAudienceVisibility(value);
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const { appUser: user } = await requireVibeRaisingFounder(env, request);
    const url = new URL(request.url);
    const reminderCompany = resolveMonthlyUpdateReminderCompany(
        user,
        getMonthlyUpdateReminderCompanyId(url),
    );

    if (reminderCompany.status === "invalid") {
        throw redirect("/founder-tools/companies?error=invalid-reminder-company");
    }
    if (reminderCompany.status === "valid") {
        if (reminderCompany.needsSwitch) {
            await setVibeRaisingActiveCompany(env, request, reminderCompany.company.id);
        }
        // Strip the one-use selector so refreshes and copied URLs do not keep
        // mutating the user's active-company preference. Attribution remains.
        throw redirect(removeReminderCompanySelector(url));
    }


    // Check for edit mode
    const editId = url.searchParams.get("edit");
    const resumeEmailDrafting =
        url.searchParams.get("email_draft") === "1" ||
        url.searchParams.get("draft_from_email") === "1";
    const selectedInputSources = parseInputSources(url.searchParams.get("inputs"));
    const requestedDraftReturn = readVibeRaisingDraftReturnState(url.search);
    const draftReturnState = requestedDraftReturn &&
        !isBeforeMinimumMonthlyUpdate(requestedDraftReturn.month, requestedDraftReturn.year) &&
        !isFutureMonthlyUpdate(requestedDraftReturn.month, requestedDraftReturn.year)
            ? requestedDraftReturn
            : null;

    let existingData = null;
    if (editId) {
        const existingUpdate = await getVibeRaisingMonthlyUpdateById(env, request, editId, resolveActiveCompanyId(user)).catch((error) => {
            console.warn("Unable to load Vibe Raising update for editing.", error);
            return null;
        });
        existingData = existingUpdate ? buildExistingUpdateFormData(existingUpdate) : null;
    }

    const existingMonthlyUpdates = await getVibeRaisingMonthlyUpdates(env, request, resolveActiveCompanyId(user)).catch((error) => {
        console.warn("Unable to load existing Vibe Raising monthly updates for create flow.", error);
        return [];
    });

    const health = await getStartupHealth(env, request, resolveActiveCompanyId(user));
    return {
        user,
        metricDefinitions: health.configuration.metricDefinitions || [],
        existingData,
        isEdit: !!editId,
        backendBaseUrl: String(env.BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL),
        resumeEmailDrafting,
        selectedInputSources,
        draftReturnState,
        existingMonthlyUpdates,
    };
}

function buildMonthlyUpdateSavePayload(formData: FormData) {
    const dynamicMetricKeys = String(formData.get("metricKeys") || "")
        .split(",")
        .map((key) => key.trim())
        .filter((key) => /^[A-Za-z][A-Za-z0-9_.]{0,63}$/.test(key));
    const selectedMetricKeys = Array.from(new Set(dynamicMetricKeys));
    const metricKeys = Array.from(new Set([...METRIC_FORM_KEYS, ...selectedMetricKeys]));
    const metrics = Object.fromEntries(
        metricKeys
            .map((key) => [key, String(formData.get(key) || "").trim()] as const)
            .filter(([, value]) => value.length > 0),
    );
    const metricSuggestions = metricSuggestionsFromKeys(selectedMetricKeys, metrics);
    const displayConfig = parseDisplayConfigValue(formData.get("displayConfig"));
    const financialSnapshot = parseJsonObjectValue<VibeRaisingFinancialSnapshot & Record<string, unknown>>(
        formData.get("financialSnapshot"),
    );
    const conciseAnalysis = parseJsonObjectValue<VibeRaisingConciseAnalysis & Record<string, unknown>>(
        formData.get("conciseAnalysis"),
    );
    const rawPitchDeckFileSizeBytes = Number(formData.get("pitchDeckFileSizeBytes") || 0);
    const rawVideoUrl = String(formData.get("videoUrl") || "").trim();
    const rawVideoFileSizeBytes = Number(formData.get("videoFileSizeBytes") || 0);
    const manualDocumentIds = String(formData.get("manualDocumentIds") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    const rawMlaiFeedbackOptIn = String(formData.get("mlaiFeedbackOptIn") || "").trim().toLowerCase();
    const rawSurveyFinancialQuestionContext = String(formData.get("surveyFinancialQuestionContext") || "").trim();
    const surveyFinancialQuestionContext: VibeRaisingFinancialSurveyContext | null =
        rawSurveyFinancialQuestionContext === "imported_metrics" || rawSurveyFinancialQuestionContext === "connector_value"
            ? rawSurveyFinancialQuestionContext
            : null;
    const parseSurveyAnswer = (value: FormDataEntryValue | null): boolean | null => {
        const normalized = String(value || "").trim().toLowerCase();
        if (normalized === "yes" || normalized === "true") return true;
        if (normalized === "no" || normalized === "false") return false;
        return null;
    };

    return {
        audienceVisibility: normalizeAudienceVisibilityValue(formData.getAll("audienceVisibility")),
        month: String(formData.get("month") || "").trim(),
        year: Number(formData.get("year") || 0),
        ...(formData.has("coverImage") ? { coverImage: parseUpdateCoverForm(formData.get("coverImage")) } : {}),
        summary: String(formData.get("summary") || "").trim() || null,
        sourceUrl: String(formData.get("sourceUrl") || "").trim() || null,
        manualDocumentIds,
        manualSummary: String(formData.get("manualSummary") || "").trim() || null,
        pitchDeckUrl: String(formData.get("pitchDeckUrl") || "").trim() || null,
        pitchDeckStoragePath: String(formData.get("pitchDeckStoragePath") || "").trim() || null,
        pitchDeckContentType: String(formData.get("pitchDeckContentType") || "").trim() || null,
        pitchDeckFileSizeBytes: Number.isFinite(rawPitchDeckFileSizeBytes) && rawPitchDeckFileSizeBytes > 0 ? rawPitchDeckFileSizeBytes : null,
        pitchDeckOriginalFilename: String(formData.get("pitchDeckOriginalFilename") || "").trim() || null,
        pitchDeckSummary: String(formData.get("pitchDeckSummary") || "").trim() || null,
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
        displayConfig,
        financialSnapshot,
        conciseAnalysis,
        presentationMode: String(formData.get("presentationMode") || "").trim() || null,
        mlaiFeedbackOptIn: rawMlaiFeedbackOptIn
            ? rawMlaiFeedbackOptIn === "yes" || rawMlaiFeedbackOptIn === "true"
            : null,
        submissionDestination: String(formData.get("submissionDestination") || "").trim() || null,
        surveyFinancialQuestionContext,
        surveyImportedMetricsUseful: parseSurveyAnswer(formData.get("surveyImportedMetricsUseful")),
        surveyConnectorValueClear: parseSurveyAnswer(formData.get("surveyConnectorValueClear")),
        surveyGuidedQuestionsUseful: parseSurveyAnswer(formData.get("surveyGuidedQuestionsUseful")),
        surveyPreviewAccurate: parseSurveyAnswer(formData.get("surveyPreviewAccurate")),
        surveyComments: String(formData.get("surveyComments") || "").trim() || null,
    };
}

// The backend blocks update creation for a company that isn't a verified registered
// Australian company (HTTP 422, code ACN_REQUIRED). Send the founder back to company
// setup to complete verification rather than dead-ending on the update form.
function acnGateRedirect(error: unknown) {
    const data = (error as any)?.response?.data ?? (error as any)?.data;
    if (data && typeof data === "object" && data.code === "ACN_REQUIRED") {
        return redirect(typeof data.redirect === "string" ? data.redirect : "/founder-tools/company-setup");
    }
    return null;
}

function extractVibeRaisingActionError(error: unknown, fallback: string) {
    const responseData = (error as any)?.response?.data;
    if (typeof responseData?.detail === "string" && responseData.detail.trim()) {
        return responseData.detail.trim();
    }

    if (responseData && typeof responseData === "object") {
        const firstValue = Object.values(responseData)[0];
        if (Array.isArray(firstValue) && firstValue.length > 0) {
            return String(firstValue[0]);
        }
        if (typeof firstValue === "string" && firstValue.trim()) {
            return firstValue.trim();
        }
    }

    return fallback;
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const { appUser } = await requireVibeRaisingFounder(env, request);
    // Pin every read and save in this action to the company the page was
    // rendered for, instead of the backend's mutable active_company.
    const formData = await request.formData();
    const activeCompanyId = String(formData.get("companyId") || "");
    if (!activeCompanyId || !appUser.companies.some((company) => company.id === activeCompanyId)) {
        throw new Response("Select the startup this form belongs to.", { status: 409 });
    }
    const intent = formData.get("intent");
    const answerGatedIntents = new Set(["review", "save-draft", "send-to-mlai", "publish"]);
    const answeredFounderQuestionCount = countAnsweredFounderQuestions(formData);
    if (answerGatedIntents.has(String(intent || "")) && answeredFounderQuestionCount < REQUIRED_FOUNDER_QUESTION_COUNT) {
        return {
            step: "validation-error",
            error: `Answer at least ${REQUIRED_FOUNDER_QUESTION_COUNT} founder questions before saving or submitting.`,
            answeredQuestionCount: answeredFounderQuestionCount,
        };
    }
    const savePayload = buildMonthlyUpdateSavePayload(formData);
    const updates: Record<string, unknown> = {
        ...Object.fromEntries(formData),
        audienceVisibility: savePayload.audienceVisibility,
    };

    if (intent === "publish") {
        const draftId = String(formData.get("draftId") || "");
        const revisionId = Number(formData.get("revisionId"));
        const revisionHash = String(formData.get("revisionHash") || "");
        try {
            if (!BACKEND_DRAFT_ID_PATTERN.test(draftId) || !revisionId || !revisionHash) throw new Error("Save and review this revision before publishing.");
            await publishVibeRaisingMonthlyUpdate(env, request, draftId, {
                companyId: activeCompanyId, revisionId, revisionHash,
                audienceVisibility: normalizeAudienceVisibilityValue(formData.get("audienceVisibility")),
            });
            return redirect("/founder-tools/updates");
        } catch (error) {
            return { step: "publish-error", data: updates,
                error: extractVibeRaisingActionError(error, "This revision could not be published. Reload and review the saved update.") };
        }
    }

    const founderProfiles = parseFounderProfilesFormValue(formData.get("founderProfiles"));
    const activeCompany =
        appUser.companies.find((company) => company.id === activeCompanyId) ??
        appUser.companies[0] ??
        null;
    const founderProfilesForCompanySave =
        founderProfiles.some((profile) => String(profile.linkedinUrl || "").trim())
            ? founderProfiles
            : activeCompany?.founderProfiles?.length
                ? activeCompany.founderProfiles
                : founderProfiles;
    const founderNamesForCompanySave = founderProfilesForCompanySave
        .map((profile) => profile.name)
        .filter(Boolean);

    if (activeCompany && formData.has("founderProfiles")) {
        // This is an incidental founder-profile sync — it must not re-trigger the
        // registration gate, so `registered` is intentionally omitted (sending it true
        // would force a fresh ABR re-verification on every save).
        await saveVibeRaisingCompany(env, request, {
            companyId: activeCompany.id,
            name: activeCompany.name || appUser.companyName,
            domain: activeCompany.domain ?? appUser.domain ?? null,
            companyLinkedInUrl: activeCompany.companyLinkedInUrl ?? null,
            abn: activeCompany.abn ?? appUser.abn ?? null,
            location: activeCompany.location ?? appUser.location ?? null,
            founderNames: founderNamesForCompanySave.length > 0
                ? founderNamesForCompanySave
                : (activeCompany.founderNames ?? []),
            founderProfiles: founderProfilesForCompanySave,
            stage: activeCompany.stage ?? appUser.stage ?? null,
        });
    }

    if (intent === "review") {
        let savedUpdate;
        try {
            savedUpdate = await saveVibeRaisingMonthlyUpdate(env, request, {
                ...savePayload,
                companyId: activeCompanyId,
                expectedRevision: formData.get("expectedRevision") ? Number(formData.get("expectedRevision")) : null,
                saveMode: "ready",
            });
        } catch (error) {
            const gate = acnGateRedirect(error);
            if (gate) return gate;
            throw error;
        }

        return {
            step: "feedback",
            data: { ...updates, ...(savedUpdate ? buildExistingUpdateFormData(savedUpdate) : {}),
                companyId: activeCompanyId, draftId: savedUpdate?.id,
                revisionId: savedUpdate?.revisionId, revisionHash: savedUpdate?.revisionHash },
            update: savedUpdate,
        };
    }

    if (intent === "save-draft") {
        let update;
        try {
            update = await saveVibeRaisingMonthlyUpdate(env, request, {
                ...savePayload,
                companyId: activeCompanyId,
                expectedRevision: formData.get("expectedRevision") ? Number(formData.get("expectedRevision")) : null,
                saveMode: "draft",
            });
        } catch (error) {
            const gate = acnGateRedirect(error);
            if (gate) return gate;
            throw error;
        }
        const cookie = update ? createVibeRaisingLocalDraftUpdateCookie(update) : null;

        return Response.json(
            {
                step: "draft-saved",
                update,
            },
            cookie ? { headers: { "Set-Cookie": cookie } } : undefined,
        );
    }

    return null;
}

// ─── Metric Options ──────────────────────────────────────────────
// Catalog lives in ~/lib/vibe-raising-metrics so the dashboard, article
// page, and editor all share one source of truth.
const METRIC_OPTIONS = VIBE_METRIC_OPTIONS;
const METRIC_OPTION_MAP = VIBE_METRIC_OPTION_MAP;
const METRIC_FORM_KEYS = VIBE_METRIC_KEYS;
const PRIMARY_DRAFT_METRIC_KEYS = ["revenue", "activeUsers", "revenueGrowthRate", "monthlyCosts"] as const;
const PRIMARY_DRAFT_METRIC_KEY_SET = new Set<string>(PRIMARY_DRAFT_METRIC_KEYS);

function orderDraftMetricOptions(options: MetricOption[]) {
    const byKey = new Map(options.map((option) => [option.key, option]));
    const primary = PRIMARY_DRAFT_METRIC_KEYS
        .map((key) => byKey.get(key))
        .filter((option): option is MetricOption => Boolean(option));
    const optional = options.filter((option) => !PRIMARY_DRAFT_METRIC_KEY_SET.has(option.key));
    return [...primary, ...optional];
}

function getMetricOptionsForMetrics(metrics?: Record<string, string>) {
    const keys = Object.keys(metrics || {}).filter((key) => hasDisplayableMetricValue(metrics?.[key]));
    return metricOptionsForValues(metrics).filter((option) => keys.includes(option.key));
}

function getMetricOptionsForDisplay(metrics?: Record<string, string>) {
    return getMetricOptionsForMetrics(metrics);
}

function getEditableMetricOptions(metrics?: Record<string, string>, selected?: Set<string>) {
    return metricOptionsForValues(metrics).filter((option) => {
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
        <div className="absolute right-1.5 top-1.5">
            <CardInfoTooltip info={info} mobileAlign="right" />
        </div>
    );
}

function CardInfoTooltip({
    info,
    mobileAlign = "center",
}: {
    info: string;
    mobileAlign?: "center" | "right";
}) {
    const tooltipId = useId();
    const tooltipRef = useRef<HTMLDetailsElement | null>(null);
    const closeTimerRef = useRef<number | null>(null);

    const clearCloseTimer = () => {
        if (closeTimerRef.current === null) return;
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
    };

    useEffect(() => {
        const closeWhenAnotherTooltipOpens = (event: Event) => {
            if ((event as CustomEvent<string>).detail === tooltipId) return;
            tooltipRef.current?.removeAttribute("open");
            clearCloseTimer();
        };

        const closeOnOutsidePointerDown = (event: PointerEvent) => {
            const tooltip = tooltipRef.current;
            if (!tooltip || tooltip.contains(event.target as Node)) return;
            tooltip.removeAttribute("open");
            clearCloseTimer();
        };

        window.addEventListener("vibe-raising-tooltip-open", closeWhenAnotherTooltipOpens);
        document.addEventListener("pointerdown", closeOnOutsidePointerDown);
        return () => {
            clearCloseTimer();
            window.removeEventListener("vibe-raising-tooltip-open", closeWhenAnotherTooltipOpens);
            document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
        };
    }, [tooltipId]);

    return (
        <details
            ref={tooltipRef}
            onMouseEnter={() => {
                if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                tooltipRef.current?.setAttribute("open", "");
            }}
            onMouseLeave={() => {
                if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                tooltipRef.current?.removeAttribute("open");
            }}
            onToggle={(event) => {
                clearCloseTimer();
                if (!event.currentTarget.open) return;
                window.dispatchEvent(new CustomEvent("vibe-raising-tooltip-open", { detail: tooltipId }));
                closeTimerRef.current = window.setTimeout(() => {
                    tooltipRef.current?.removeAttribute("open");
                }, 5000);
            }}
            className="group relative inline-flex h-5 w-5 flex-shrink-0 align-middle text-[var(--vr-color-primary)]"
        >
            <summary
                aria-label="More information"
                aria-describedby={tooltipId}
                onClick={(event) => {
                    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                        event.preventDefault();
                    }
                }}
                className="flex h-5 w-5 list-none touch-manipulation cursor-pointer items-center justify-center [&::-webkit-details-marker]:hidden hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vr-color-primary)]"
            >
                <InformationCircleIcon className="h-3.5 w-3.5" />
            </summary>
            <span
                id={tooltipId}
                role="tooltip"
                className={clsx(
                    "pointer-events-none absolute bottom-full z-50 mb-2 w-52 max-w-[calc(100vw-2rem)] translate-y-1 rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-left text-xs font-medium normal-case leading-5 tracking-normal text-white opacity-0 shadow-[0_14px_30px_-10px_rgba(15,23,42,0.65)] transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-open:translate-y-0 group-open:opacity-100 sm:left-0 sm:right-auto sm:w-64 sm:translate-x-0",
                    mobileAlign === "right"
                        ? "right-0 left-auto translate-x-0"
                        : "left-1/2 -translate-x-1/2",
                )}
            >
                {info}
                <span
                    className={clsx(
                        "absolute top-full h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-slate-950 sm:left-2 sm:right-auto sm:translate-x-0",
                        mobileAlign === "right" ? "right-2" : "left-1/2 -translate-x-1/2",
                    )}
                />
            </span>
        </details>
    );
}

function MonthYearTabs({
    month,
    year,
    onMonthChange,
    onYearChange,
    onPeriodChange,
    monthChoices,
    submitDateFields = true,
    isDateEditable = true,
}: {
    month: string;
    year: number;
    onMonthChange: (month: string) => void;
    onYearChange: (year: number) => void;
    onPeriodChange?: (key: string) => void;
    monthChoices?: Array<{ month: string; year: number }>;
    submitDateFields?: boolean;
    isDateEditable?: boolean;
}) {
    const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState<"month" | "year" | null>(null);
    const yearMenuRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const yearOptions = Array.from({ length: 11 }, (_, index) => year - 5 + index);
    const visibleMonthChoices = monthChoices?.length
        ? monthChoices
        : VIBE_RAISING_MONTH_OPTIONS.map((option) => ({ month: option.name, year }));
    const useCompactCreateTimeline = Boolean(monthChoices?.length && monthChoices.length <= 2);
    const showYearInMonthLabel = new Set(visibleMonthChoices.map((option) => option.year)).size > 1;
    const mobileMonthOptions = useCompactCreateTimeline
        ? VIBE_RAISING_MONTH_OPTIONS.map((option) => ({ month: option.name, year }))
        : monthChoices?.length
            ? visibleMonthChoices.filter((option, index, options) => (
                options.findIndex((candidate) => candidate.month === option.month) === index
            ))
        : VIBE_RAISING_MONTH_OPTIONS.map((option) => ({ month: option.name, year }));
    const mobileYearOptions = yearOptions;

    useEffect(() => {
        if (!isYearMenuOpen && !mobileMenu) return;

        const closeOnOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!yearMenuRef.current?.contains(target) && !mobileMenuRef.current?.contains(target)) {
                setIsYearMenuOpen(false);
                setMobileMenu(null);
            }
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsYearMenuOpen(false);
                setMobileMenu(null);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isYearMenuOpen, mobileMenu]);

    const selectMobileMonth = (nextMonth: string) => {
        const matchingChoice =
            visibleMonthChoices.find((option) => option.month === nextMonth && option.year === year) ??
            visibleMonthChoices.find((option) => option.month === nextMonth);
        onMonthChange(nextMonth);
        if (matchingChoice) onYearChange(matchingChoice.year);
        onPeriodChange?.("current");
        setMobileMenu(null);
    };

    const selectMobileYear = (nextYear: number) => {
        const matchingChoice = visibleMonthChoices.find(
            (option) => option.year === nextYear && option.month === month,
        );
        const fallbackChoice = visibleMonthChoices.find((option) => option.year === nextYear);
        const fallbackAllowedMonth = firstAllowedMonthForYear(nextYear);
        onYearChange(nextYear);
        if (isBeforeMinimumMonthlyUpdate(month, nextYear) && fallbackAllowedMonth) {
            onMonthChange(fallbackAllowedMonth);
        } else if (!matchingChoice && fallbackChoice) {
            onMonthChange(fallbackChoice.month);
        }
        onPeriodChange?.("current");
        setMobileMenu(null);
    };

    return (
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch">
            {submitDateFields && (
                <>
                    <input type="hidden" name="month" value={month} />
                    <input type="hidden" name="year" value={year} />
                </>
            )}

            <div ref={mobileMenuRef} className="grid grid-cols-[minmax(0,1fr)_104px] gap-2 sm:hidden">
                <div className="relative">
                    <button
                        type="button"
                        disabled={!isDateEditable}
                        onClick={() => setMobileMenu((current) => current === "month" ? null : "month")}
                        aria-label="Select update month"
                        aria-haspopup="listbox"
                        aria-expanded={mobileMenu === "month"}
                        className={clsx(
                            "flex h-12 w-full items-center justify-between rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 text-sm font-black text-gray-950 shadow-sm outline-none ring-1 ring-white/60 transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,255,215,0.18)]",
                            isDateEditable ? "cursor-pointer" : "cursor-default opacity-70",
                        )}
                    >
                        <span>{month || "Select month"}</span>
                        <ChevronDownIcon className={clsx("h-4 w-4 transition-transform", mobileMenu === "month" && "rotate-180")} />
                    </button>
                    {mobileMenu === "month" ? (
                        <div role="listbox" aria-label="Update month" className="absolute left-0 top-[calc(100%+0.5rem)] z-50 max-h-64 w-full overflow-y-auto rounded-2xl border border-[var(--vr-color-border)] bg-white p-1.5 shadow-2xl">
                            {mobileMonthOptions.map((option) => {
                                const isDisabled = isBeforeMinimumMonthlyUpdate(option.month, year);
                                return (
                                    <button
                                        key={option.month}
                                        type="button"
                                        role="option"
                                        aria-selected={option.month === month}
                                        disabled={isDisabled}
                                        onClick={() => selectMobileMonth(option.month)}
                                        className={clsx(
                                            "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-black transition",
                                            isDisabled ? "cursor-not-allowed text-slate-300" : option.month === month ? "bg-[var(--vr-color-primary)] text-white" : "text-gray-950 hover:bg-[var(--vr-palette-paper)]",
                                        )}
                                    >
                                        {option.month}
                                    </button>
                                );
                            })}
                        </div>
                    ) : null}
                </div>

                <div className="relative">
                    <button
                        type="button"
                        disabled={!isDateEditable}
                        onClick={() => setMobileMenu((current) => current === "year" ? null : "year")}
                        aria-label="Select update year"
                        aria-haspopup="listbox"
                        aria-expanded={mobileMenu === "year"}
                        className={clsx(
                            "flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-gray-950 bg-gray-950 px-3 text-center text-sm font-black tracking-[0.08em] text-white shadow-lg shadow-black/15 outline-none ring-1 ring-white/10 transition focus:ring-4 focus:ring-[rgba(11,11,11,0.16)]",
                            isDateEditable ? "cursor-pointer" : "cursor-default opacity-70",
                        )}
                    >
                        <span>{year}</span>
                        <ChevronDownIcon className={clsx("h-4 w-4 transition-transform", mobileMenu === "year" && "rotate-180")} />
                    </button>
                    {mobileMenu === "year" ? (
                        <div role="listbox" aria-label="Update year" className="absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-64 w-36 overflow-y-auto rounded-2xl border border-gray-800 bg-gray-950 p-1.5 shadow-2xl">
                            {mobileYearOptions.map((optionYear) => (
                                <button
                                    key={optionYear}
                                    type="button"
                                    role="option"
                                    aria-selected={optionYear === year}
                                    onClick={() => selectMobileYear(optionYear)}
                                    className={clsx(
                                        "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-black transition",
                                        optionYear === year ? "bg-white text-gray-950" : "text-white/75 hover:bg-white/10 hover:text-white",
                                    )}
                                >
                                    {optionYear}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="hidden min-w-0 flex-1 sm:block">
                <div className="overflow-hidden rounded-t-2xl rounded-b-lg border border-[var(--vr-color-border)] bg-white shadow-xl ring-1 ring-white/40">
                    <div
                        role="listbox"
                        aria-label="Update month"
                        className={clsx(
                            "grid w-full divide-x divide-[var(--vr-color-border)]",
                            useCompactCreateTimeline ? "grid-cols-2" : "grid-cols-12",
                        )}
                    >
                        {visibleMonthChoices.map((option) => {
                            const monthTheme = getVibeRaisingMonthTheme(option.month);
                            const isSelected = option.month === month && option.year === year;
                            const isDisabled = !isDateEditable || isBeforeMinimumMonthlyUpdate(option.month, option.year);
                            const monthLabel = showYearInMonthLabel
                                ? `${option.month.slice(0, 3).toUpperCase()} ${option.year}`
                                : option.month.slice(0, 3).toUpperCase();
                            return (
                                <button
                                    key={`${option.year}-${option.month}`}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    aria-disabled={isDisabled}
                                    disabled={isDisabled}
                                    onClick={() => {
                                        if (isDisabled) return;
                                        onMonthChange(option.month);
                                        onYearChange(option.year);
                                        onPeriodChange?.("current");
                                        setIsYearMenuOpen(false);
                                    }}
                                    className={clsx(
                                        "flex min-h-[54px] min-w-0 items-center justify-center px-2 text-center font-black uppercase tracking-[0.08em] transition-colors",
                                        useCompactCreateTimeline ? "text-[11px] sm:text-xs md:text-sm" : "text-[9px] sm:text-[10px] md:text-[11px]",
                                        isDisabled ? "cursor-not-allowed bg-gray-100 text-slate-300 opacity-60 grayscale" : "cursor-pointer",
                                        isSelected && !isDisabled
                                            ? `${monthTheme.tabClass} ${monthTheme.textClass} shadow-none`
                                            : !isDisabled && "bg-[var(--vr-palette-paper)] text-slate-500 hover:bg-white hover:text-gray-950",
                                    )}
                                >
                                    <span className="truncate">{monthLabel}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div ref={yearMenuRef} className="relative hidden sm:block sm:min-w-[108px]">
                {useCompactCreateTimeline ? (
                    <div className="relative z-10 flex h-full items-center justify-center overflow-hidden rounded-t-2xl rounded-b-lg bg-gray-950 px-4 py-3 text-sm font-black tracking-[0.12em] text-white shadow-lg shadow-black/20 ring-1 ring-white/10">
                        <span>{year}</span>
                    </div>
                ) : (
                    <>
                        <div
                            className={clsx(
                                "relative z-10 flex h-full items-center overflow-hidden bg-gray-950 text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-150",
                                isYearMenuOpen ? "rounded-t-2xl rounded-b-none" : "rounded-t-2xl rounded-b-lg",
                            )}
                        >
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
                                                const fallbackAllowedMonth = firstAllowedMonthForYear(optionYear);
                                                onYearChange(optionYear);
                                                if (isBeforeMinimumMonthlyUpdate(month, optionYear) && fallbackAllowedMonth) {
                                                    onMonthChange(fallbackAllowedMonth);
                                                }
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
                    </>
                )}
            </div>
        </div>
    );
}

function WeeklyUpdateTabs({
    options,
    selectedKey,
    onSelect,
    isDateEditable = true,
}: {
    options: WeeklyUpdateOption[];
    selectedKey: string;
    onSelect: (option: WeeklyUpdateOption) => void;
    isDateEditable?: boolean;
}) {
    return (
        <div
            role="listbox"
            aria-label="Update week"
            className="grid w-full gap-2 sm:grid-cols-4"
        >
            {options.map((option) => {
                const isSelected = option.key === selectedKey;
                return (
                    <button
                        key={option.key}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={!isDateEditable}
                        onClick={() => onSelect(option)}
                        className={clsx(
                            "flex min-h-[74px] flex-col items-start justify-center rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus:ring-4 focus:ring-[rgba(76,110,245,0.18)]",
                            !isDateEditable && "cursor-not-allowed opacity-60",
                            isSelected
                                ? "border-[var(--vr-palette-blue)] bg-[var(--vr-palette-blue)] text-white shadow-lg shadow-[rgba(76,110,245,0.18)]"
                                : "border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] text-gray-950 hover:border-[var(--vr-palette-blue)] hover:bg-white",
                        )}
                    >
                        <span className={clsx(
                            "text-[10px] font-black uppercase tracking-[0.16em]",
                            isSelected ? "text-white/75" : "text-slate-500",
                        )}>
                            {option.isCurrent ? "Current week" : "Recent week"}
                        </span>
                        <span className="mt-1 text-sm font-black">{option.label}</span>
                    </button>
                );
            })}
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
type PitchDeckUploadStatus = "idle" | "creating_session" | "uploading" | "finalizing" | "ready" | "error";
type MissingFounderLinkedInDraft = {
    id: string;
    sourceIndex: number;
    name: string;
    linkedinUrl: string;
};

const MAX_PITCH_DECK_UPLOAD_SIZE_MB = 10;
const MAX_VIDEO_UPLOAD_SIZE_MB = 25;
const MAX_VIDEO_UPLOAD_BYTES = MAX_VIDEO_UPLOAD_SIZE_MB * 1024 * 1024;
const MAX_SOURCE_VIDEO_BYTES = MAX_VIDEO_UPLOAD_SIZE_MB * 1024 * 1024;
const MAX_PITCH_DECK_UPLOAD_BYTES = MAX_PITCH_DECK_UPLOAD_SIZE_MB * 1024 * 1024;
const VIDEO_COMPRESSION_THRESHOLD_BYTES = 75 * 1024 * 1024;
const FFMPEG_CORE_BASE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
const PITCH_DECK_ACCEPT = {
    "application/pdf": [".pdf"],
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
};
const SUPPORTED_PITCH_DECK_EXTENSIONS = [".pdf", ".ppt", ".pptx"];
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
const SUPPORTED_AUDIO_EXTENSIONS = [".mp3", ".m4a", ".wav", ".webm", ".ogg"];
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
const AUDIO_ACCEPT = {
    "audio/mpeg": [".mp3"],
    "audio/mp3": [".mp3"],
    "audio/mp4": [".m4a"],
    "audio/wav": [".wav"],
    "audio/webm": [".webm"],
    "audio/ogg": [".ogg"],
    "audio/*": SUPPORTED_AUDIO_EXTENSIONS,
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
    ".mp3": "audio/mpeg",
    ".m4a": "audio/mp4",
    ".wav": "audio/wav",
};

type DraftStageKey = "reporting";
const BROWSER_PLAYABLE_VIDEO_TYPES = new Set([
    "video/mp4",
    "video/x-m4v",
    "video/webm",
    "video/ogg",
    "video/quicktime",
]);
const BROWSER_PLAYABLE_AUDIO_TYPES = new Set([
    "audio/mpeg",
    "audio/mp3",
    "audio/mp4",
    "audio/wav",
    "audio/webm",
    "audio/ogg",
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

function isAudioMedia(contentType?: string | null, fileName?: string | null) {
    const inferredType = inferVideoContentType(contentType, fileName);
    return inferredType.startsWith("audio/") || SUPPORTED_AUDIO_EXTENSIONS.includes(getFileExtension(fileName));
}

function isBrowserPlayableAudio(contentType?: string | null, fileName?: string | null) {
    const inferredType = inferVideoContentType(contentType, fileName);
    if (!inferredType) return true;
    if (!BROWSER_PLAYABLE_AUDIO_TYPES.has(inferredType)) return false;
    if (typeof document === "undefined") return true;
    return document.createElement("audio").canPlayType(inferredType).length > 0;
}

function isSupportedVideoFile(file: File) {
    const contentType = String(file.type || "").toLowerCase();
    if (contentType.startsWith("video/")) return true;
    if (contentType.startsWith("audio/")) return true;
    const extension = getFileExtension(file.name);
    return SUPPORTED_VIDEO_EXTENSIONS.includes(extension) || SUPPORTED_AUDIO_EXTENSIONS.includes(extension);
}

function getDropzoneRejectionMessage(fileRejections: Array<{ errors: Array<{ code: string; message: string }> }>) {
    const firstError = fileRejections[0]?.errors[0];
    if (!firstError) return "We couldn't use that file. Add a PDF, PPT, PPTX, or a supported video walkthrough.";
    if (firstError.code === "file-too-large") return `File is too large. Use a file under ${MAX_VIDEO_UPLOAD_SIZE_MB} MB.`;
    if (firstError.code === "file-invalid-type") {
        return "Use a PDF, PPT, PPTX, or a common video format like MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.";
    }
    return firstError.message || "We couldn't use that file. Add a PDF, PPT, PPTX, or a supported video walkthrough.";
}

function inferPitchDeckContentType(contentType?: string | null, fileName?: string | null) {
    const normalized = String(contentType || "").split(";")[0].trim().toLowerCase();
    if (normalized) return normalized;
    const extension = getFileExtension(fileName);
    if (extension === ".pdf") return "application/pdf";
    if (extension === ".ppt") return "application/vnd.ms-powerpoint";
    if (extension === ".pptx") {
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }
    return "";
}

function isSupportedPitchDeckFile(file: File) {
    const extension = getFileExtension(file.name);
    return SUPPORTED_PITCH_DECK_EXTENSIONS.includes(extension);
}

function getPitchDeckUploadErrorMessage(error: unknown) {
    const statusCode = (error as { status?: number })?.status;
    const requestPath = String((error as { requestPath?: string })?.requestPath || "");
    const data = (error as { data?: { detail?: string; error?: string } | string })?.data;
    const detail =
        typeof data === "string"
            ? data
            : data?.detail || data?.error || (error instanceof Error ? error.message : "");

    if (statusCode === 404 && requestPath.includes("/uploads/pitch-deck/session/")) {
        return "Pitch deck uploads are not available on the backend yet. Deploy the latest backend release and try again.";
    }
    if (statusCode === 413) {
        return `This deck is too large. Use a file under ${MAX_PITCH_DECK_UPLOAD_SIZE_MB} MB.`;
    }
    if (statusCode === 403 && requestPath === "signed-storage-upload") {
        return "The pitch deck upload session expired. Please select the file again.";
    }
    if (requestPath === "signed-storage-upload") {
        return "Storage rejected the pitch deck upload. Please try again.";
    }
    return detail || "Pitch deck upload failed. Please try again.";
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
    const isAudio = isAudioMedia(contentType, fileName || src);
    const canPreview = !playbackFailed && (isAudio
        ? isBrowserPlayableAudio(contentType, fileName || src)
        : isBrowserPlayableVideo(contentType, fileName || src));

    useEffect(() => {
        setPlaybackFailed(false);
    }, [src, contentType, fileName]);

    if (canPreview) {
        if (isAudio) {
            return (
                <div className={clsx("flex min-h-32 flex-col justify-center bg-gray-950 p-6 text-white", className)}>
                    <p className="mb-3 text-sm font-bold">{fileName || "Audio walkthrough"}</p>
                    <audio
                        src={src}
                        controls
                        onError={() => setPlaybackFailed(true)}
                        className="w-full"
                    />
                </div>
            );
        }

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
            <p className="mt-3 text-sm font-bold">{isAudio ? "Audio uploaded" : "Video uploaded"}</p>
            <p className="mt-1 max-w-sm text-xs leading-5 text-white/60">
                {fileName || `This ${isAudio ? "audio" : "video"} format may not preview in your browser.`}
                {formatFileSize(fileSizeBytes) ? ` · ${formatFileSize(fileSizeBytes)}` : ""}
            </p>
            <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-950 hover:bg-gray-100"
            >
                Open {isAudio ? "audio" : "video"}
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
        </div>
    );
}

function isPdfPitchDeck(contentType?: string | null, fileName?: string | null, src?: string | null) {
    return (
        String(contentType || "").split(";")[0].trim().toLowerCase() === "application/pdf" ||
        getFileExtension(fileName || src || "") === ".pdf"
    );
}

function PitchDeckAssetPreview({
    src,
    openUrl,
    contentType,
    fileName,
    fileSizeBytes,
}: {
    src: string;
    openUrl?: string | null;
    contentType?: string | null;
    fileName?: string | null;
    fileSizeBytes?: number | null;
}) {
    const isPdf = isPdfPitchDeck(contentType, fileName, src);
    const previewSrc = isPdf ? `${src}#page=1&toolbar=0&navpanes=0&scrollbar=0` : src;
    const externalUrl = openUrl || src;

    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] text-left">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--vr-color-border)] px-4 py-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-black text-gray-950">
                        {fileName || (isPdf ? "Pitch deck PDF" : "Pitch deck")}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">
                        {isPdf ? "First page preview" : "PowerPoint file attached"}
                        {formatFileSize(fileSizeBytes) ? ` · ${formatFileSize(fileSizeBytes)}` : ""}
                    </p>
                </div>
                <a
                    href={externalUrl}
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
                    <CloudArrowUpIcon className="h-10 w-10 text-slate-300" />
                    <p className="mt-3 text-sm font-black text-gray-950">Deck uploaded</p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                        PPT/PPTX first-slide rendering needs a slide converter. For now, the file is attached and ready to open.
                    </p>
                </div>
            )}
        </div>
    );
}

function uniqueFounderProfiles(profiles: VibeRaisingFounderProfile[]) {
    const seen = new Set<string>();
    const result: VibeRaisingFounderProfile[] = [];

    profiles.forEach((profile) => {
        const name = String(profile.name || "").trim();
        const linkedinUrl = String(profile.linkedinUrl || "").trim();
        const key = `${name.toLowerCase()}|${linkedinUrl.toLowerCase()}`;
        if ((!name && !linkedinUrl) || seen.has(key)) return;
        seen.add(key);
        result.push(linkedinUrl ? { name: name || "Founder", linkedinUrl } : { name: name || "Founder" });
    });

    return result;
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
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    enableMobileAdvance?: boolean;
    mobileAdvanceTo?: string;
}

const DRAFT_QUESTION_META = {
    highlights: {
        step: "01",
        eyebrow: "Momentum",
        prompt: "What moved the business forward?",
    },
    challenges: {
        step: "02",
        eyebrow: "Context",
        prompt: "What is slowing you down?",
    },
    learnings: {
        step: "03",
        eyebrow: "Learning",
        prompt: "What did customers or experiments teach you?",
    },
    next30Days: {
        step: "04",
        eyebrow: "Focus",
        prompt: "What happens next?",
    },
    asks: {
        step: "05",
        eyebrow: "Help",
        prompt: "Where could MLAI help?",
    },
} as const;

type DraftQuestionKey = keyof typeof DRAFT_QUESTION_META;

function getDraftQuestionKey(name: string, label: string): DraftQuestionKey | null {
    const source = `${name} ${label}`.toLowerCase();
    if (source.includes("highlight")) return "highlights";
    if (source.includes("challenge")) return "challenges";
    if (source.includes("learning")) return "learnings";
    if (source.includes("next30")) return "next30Days";
    if (source.includes("ask")) return "asks";
    return null;
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
        .map((item) => item.replace(/^\s*(?:[-*]|\u2022)\s*/, "").trim())
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
    onEnterNewItem,
    onMobileAdvance,
    bulletIndex,
    enterKeyHint,
    className,
}: {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onEnterNewItem?: () => void;
    onMobileAdvance?: () => void;
    bulletIndex?: number;
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
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
            onKeyDown={(event) => {
                if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
                if (!onEnterNewItem && !onMobileAdvance) return;
                event.preventDefault();
                if (onEnterNewItem) {
                    onEnterNewItem();
                    return;
                }
                onMobileAdvance?.();
            }}
            enterKeyHint={enterKeyHint}
            data-bullet-input-index={bulletIndex}
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
    value,
    onChange,
    enableMobileAdvance = false,
    mobileAdvanceTo,
}: SectionWithExampleProps) {
    const titleId = useId();
    const cardRef = useRef<HTMLElement | null>(null);
    const cardInView = useInView(cardRef, { amount: 0.15, once: true });
    const { items, commitItems } = useBulletItemsState(value, onChange);
    const questionKey = getDraftQuestionKey(name, label);
    const questionMeta = questionKey ? DRAFT_QUESTION_META[questionKey] : null;
    const hints = SECTION_HINTS[name] || (questionKey ? SECTION_HINTS[questionKey] : []) || [];
    const questionPrompt = questionMeta?.prompt || placeholder;

    const handleMobileAdvance = useCallback(() => {
        if (!enableMobileAdvance || typeof document === "undefined") return;

        if (!mobileAdvanceTo) {
            const activeElement = document.activeElement;
            if (activeElement instanceof HTMLElement) activeElement.blur();
            return;
        }

        const nextSection = document.querySelector<HTMLElement>(`[data-draft-section="${mobileAdvanceTo}"]`);
        if (!nextSection) return;

        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });

        window.setTimeout(() => {
            const nextInput = nextSection.querySelector<HTMLTextAreaElement>("textarea");
            if (!nextInput) return;
            nextInput.focus({ preventScroll: true });
            const end = nextInput.value.length;
            nextInput.setSelectionRange(end, end);
        }, 180);
    }, [enableMobileAdvance, mobileAdvanceTo]);

    const updateItem = (index: number, text: string) => {
        const updated = [...items];
        updated[index] = text;
        commitItems(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        commitItems(updated.length ? updated : [""]);
    };

    const focusItem = (index: number) => {
        if (typeof window === "undefined") return;
        window.requestAnimationFrame(() => {
            const nextInput = cardRef.current?.querySelector<HTMLTextAreaElement>(`textarea[data-bullet-input-index="${index}"]`);
            if (!nextInput) return;
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        });
    };

    const addItemAfter = (index: number) => {
        const insertionIndex = Math.max(0, Math.min(index + 1, items.length));
        const updated = [...items];
        updated.splice(insertionIndex, 0, "");
        commitItems(updated);
        focusItem(insertionIndex);
    };

    return (
        <motion.section
            ref={cardRef}
            className="rounded-2xl border border-[var(--vr-color-border)] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] motion-safe:will-change-transform sm:p-5"
            data-draft-section={name}
            data-draft-question-card="true"
            aria-labelledby={titleId}
            initial={{ y: 20, opacity: 0 }}
            animate={cardInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
        >
            <input type="hidden" name={name} value={value || ""} />
            <header className="space-y-1.5">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.24em] text-gray-400 sm:hidden">
                    {questionMeta ? `${questionMeta.step} / 05 - ${questionMeta.eyebrow}` : label}
                </p>
                <h3 id={titleId} className="text-[17px] font-black leading-6 text-gray-950 sm:text-lg sm:leading-snug">
                    {questionPrompt}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--vr-color-primary)] sm:hidden">{label}</p>
            </header>

            <ul className="mt-4 space-y-2" aria-labelledby={titleId}>
                {items.map((item, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr_auto] items-start gap-2 rounded-xl bg-[var(--vr-palette-paper)] px-3 py-2.5 ring-1 ring-[var(--vr-color-border)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--vr-color-primary)]">
                        <span className="mt-2.5 select-none text-sm font-black text-[var(--vr-color-primary)]" aria-hidden="true">-</span>
                        <BulletTextarea
                            value={item}
                            onChange={(text) => updateItem(i, text)}
                            onEnterNewItem={() => addItemAfter(i)}
                            onMobileAdvance={handleMobileAdvance}
                            bulletIndex={i}
                            enterKeyHint={enableMobileAdvance ? (mobileAdvanceTo ? "next" : "done") : undefined}
                            placeholder={hints[i % hints.length] || placeholder}
                            className="min-h-11 flex-1 rounded-none border-0 bg-transparent px-0 py-2 text-[16px] leading-6 text-gray-900 placeholder:text-gray-400 placeholder:italic focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        {(items.length > 1 || item.trim().length > 0) && (
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="mt-2 flex h-6 w-6 items-center justify-center rounded-full border border-red-100 bg-red-50/60 text-red-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.32)] [&:hover_svg]:drop-shadow-[0_0_4px_rgba(239,68,68,0.55)]"
                                aria-label={`Remove ${label} point ${i + 1}`}
                            >
                                <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <footer className="mt-3 border-t border-dashed border-[var(--vr-color-border)] pt-3">
                <button
                    type="button"
                    onClick={() => addItemAfter(items.length - 1)}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[rgba(0,128,128,0.08)] px-4 py-2 text-xs font-black uppercase tracking-wide text-[var(--vr-color-primary)] transition hover:bg-[rgba(0,255,215,0.16)]"
                >
                    Add point +
                </button>
            </footer>
        </motion.section>
    );
}

// Bullet-point input for past month cards
function BulletInput({ value, onChange, placeholder, section }: { value: string; onChange: (v: string) => void; placeholder?: string; section?: string }) {
    const inputListRef = useRef<HTMLDivElement | null>(null);
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
    const focusItem = (index: number) => {
        if (typeof window === "undefined") return;
        window.requestAnimationFrame(() => {
            const nextInput = inputListRef.current?.querySelector<HTMLTextAreaElement>(`textarea[data-bullet-input-index="${index}"]`);
            if (!nextInput) return;
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        });
    };
    const addItemAfter = (index: number) => {
        const insertionIndex = Math.max(0, Math.min(index + 1, items.length));
        const updated = [...items];
        updated.splice(insertionIndex, 0, "");
        commitItems(updated);
        focusItem(insertionIndex);
    };

    return (
        <div ref={inputListRef} className="space-y-1.5 pt-1">
            {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                    <span className="mt-2 select-none text-xs text-[var(--vr-color-primary)]">•</span>
                    <BulletTextarea
                        value={item}
                        onChange={(text) => update(i, text)}
                        onEnterNewItem={() => addItemAfter(i)}
                        bulletIndex={i}
                        placeholder={hints[i % hints.length] || placeholder || "Add a point..."}
                        className="flex-1 rounded-lg border border-[var(--vr-color-border)] bg-white px-3 py-1.5 text-xs leading-5 text-gray-900 shadow-sm placeholder:text-gray-300 placeholder:italic focus:border-[var(--vr-color-primary)] focus:ring-[var(--vr-color-primary)]"
                    />
                    {(items.length > 1 || item.trim().length > 0) && (
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-red-100 bg-red-50/60 text-red-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.32)] [&:hover_svg]:drop-shadow-[0_0_4px_rgba(239,68,68,0.55)]"
                            aria-label={`Remove point ${i + 1}`}
                        >
                            <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => addItemAfter(items.length - 1)} className="mt-1 flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-[var(--vr-color-primary)] transition-all hover:bg-[rgba(0,255,215,0.12)]">
                Add point +
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

// Collapsible past month card for the founder preview
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
                                <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    Key Highlights
                                </h5>
                                <BulletList text={pm.highlights} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.challenges && (
                            <div>
                                <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    Challenges
                                </h5>
                                <BulletList text={pm.challenges} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.learnings && (
                            <div>
                                <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    Learnings
                                </h5>
                                <BulletList text={pm.learnings} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.next30Days && (
                            <div>
                                <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    Next 30 Days
                                </h5>
                                <BulletList text={pm.next30Days} className="text-xs text-gray-600" />
                            </div>
                        )}
                        {pm.asks && (
                            <div>
                                <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    Support request
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
    const normalizedText = String(text || "").trim();
    const items = normalizedText.includes("\n")
        ? normalizedText.split(/\n+/).filter((item) => item.trim())
        : normalizedText.split(/(?<=\.)\s+/).filter((item) => item.trim());
    return (
        <ul className={clsx("space-y-1 list-disc list-inside", className)}>
            {items.map((item, i) => (
                <li key={i}>{item.trim()}</li>
            ))}
        </ul>
    );
}

function ReviewSummaryBlock({ summary, sourceUrl }: { summary?: string; sourceUrl?: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const canExpand = String(summary || "").trim().length > 180;

    if (!summary && !sourceUrl) return null;

    return (
        <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3 sm:p-4">
            {summary ? (
                <div className="space-y-2">
                    <p
                        className={clsx(
                            "text-sm font-medium leading-6 text-gray-700",
                            !isExpanded && "line-clamp-4 sm:line-clamp-none",
                        )}
                    >
                        {summary}
                    </p>
                    {canExpand ? (
                        <button
                            type="button"
                            onClick={() => setIsExpanded((current) => !current)}
                            className="inline-flex text-xs font-black uppercase tracking-[0.14em] text-[var(--vr-color-primary)] transition hover:text-[var(--vr-palette-black)] sm:hidden"
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? "Show less" : "Show more"}
                        </button>
                    ) : null}
                </div>
            ) : null}
            {sourceUrl ? (
                <a
                    href={sourceUrl}
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
    );
}

function ReviewPreviewSection({
    label,
    text,
}: {
    label: string;
    text?: string | null;
}) {
    const normalizedText = String(text || "").trim();
    const items = normalizedText.includes("\n")
        ? normalizedText.split(/\n+/).filter((item) => item.trim())
        : normalizedText.split(/(?<=\.)\s+/).filter((item) => item.trim());

    if (!normalizedText) return null;

    return (
        <div>
            <h4 className="mb-3 [font-family:var(--vr-font-title)] text-base font-black uppercase tracking-normal text-gray-950 sm:text-lg">
                {label}
            </h4>
            <ul className="list-outside list-disc space-y-2 pl-5 [font-family:var(--vr-font-body)] text-[15px] font-medium leading-7 text-gray-800 marker:text-[var(--vr-color-primary)] sm:text-base">
                {items.map((item, index) => (
                    <li key={`${label}-${index}`}><UpdateEvidenceText text={item.trim()} /></li>
                ))}
            </ul>
        </div>
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

function CreateUpdateMobileTour({
    open,
    stepIndex,
    steps,
    onBack,
    onClose,
    onNext,
}: {
    open: boolean;
    stepIndex: number;
    steps: CreateUpdateMobileTourStep[];
    onBack: () => void;
    onClose: () => void;
    onNext: () => void;
}) {
    const titleId = useId();
    const step = steps[stepIndex];
    const [targetRect, setTargetRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

    useEffect(() => {
        if (!open || !step) {
            setTargetRect(null);
            return;
        }

        const updateTargetRect = () => {
            const node = step.targetRef.current;
            if (!node) {
                setTargetRect(null);
                return;
            }

            const rect = node.getBoundingClientRect();
            setTargetRect({
                top: Math.max(rect.top - 8, 12),
                left: Math.max(rect.left - 8, 12),
                width: Math.min(rect.width + 16, window.innerWidth - 24),
                height: rect.height + 16,
            });
        };

        const handleViewportChange = () => window.requestAnimationFrame(updateTargetRect);

        handleViewportChange();
        window.addEventListener("resize", handleViewportChange);
        window.addEventListener("scroll", handleViewportChange, true);
        return () => {
            window.removeEventListener("resize", handleViewportChange);
            window.removeEventListener("scroll", handleViewportChange, true);
        };
    }, [open, step]);

    if (!open || !step) return null;

    return (
        <div className="fixed inset-0 z-[140] sm:hidden" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <button
                type="button"
                className="absolute inset-0 bg-slate-950/55"
                onClick={onClose}
                aria-label="Close create update tour"
            />

            {targetRect ? (
                <>
                    <div
                        className="pointer-events-none absolute rounded-[28px] border-2 border-[var(--vr-color-primary)] bg-transparent shadow-[0_0_0_9999px_rgba(15,23,42,0.58)] transition-all duration-200"
                        style={targetRect}
                    />
                </>
            ) : null}

            <section className="absolute inset-x-4 bottom-4 rounded-[28px] bg-white p-5 shadow-2xl shadow-black/20">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--vr-color-primary)]">Quick mobile tour</p>
                <h2 id={titleId} className="mt-2 text-xl font-black text-gray-950">{step.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{step.body}</p>

                <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        Skip
                    </button>

                    <div className="flex items-center gap-2">
                        {stepIndex > 0 ? (
                            <button
                                type="button"
                                onClick={onBack}
                                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                                Back
                            </button>
                        ) : null}
                        <button
                            type="button"
                            onClick={onNext}
                            className="inline-flex items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-4 py-2 text-sm font-black text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)]"
                        >
                            {stepIndex === steps.length - 1 ? "Got it" : "Next"}
                        </button>
                    </div>
                </div>
            </section>
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
        selectedInputSources: initialSelectedInputSources,
        draftReturnState,
        existingMonthlyUpdates,
        metricDefinitions,
    } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>() as any;
    const [activeReviewActionData, setActiveReviewActionData] = useState<any>(null);
    const saveDraftFetcher = useFetcher<typeof action>();
    const submit = useSubmit();
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const { activeRun: sharedActiveDraftRun, refreshActiveRun } = useActiveDraftRun();
    const initialSelectedInputSourcesKey = initialSelectedInputSources.join(",");
    const defaultData = actionData?.step === "feedback" || actionData?.step === "publish-error" ? (actionData.data as any) : (existingData || {});
    const [dismissedFeedback, setDismissedFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [pitchDeckPreviewUrl, setPitchDeckPreviewUrl] = useState<string | null>(defaultData?.pitchDeckUrl || null);
    const [uploadedPitchDeckUrl, setUploadedPitchDeckUrl] = useState<string>(defaultData?.pitchDeckUrl || "");
    const [pitchDeckUploadStatus, setPitchDeckUploadStatus] = useState<PitchDeckUploadStatus>(defaultData?.pitchDeckUrl ? "ready" : "idle");
    const [pitchDeckUploadError, setPitchDeckUploadError] = useState<string | null>(null);
    const [pitchDeckStoragePath, setPitchDeckStoragePath] = useState<string>(defaultData?.pitchDeckStoragePath || "");
    const [pitchDeckContentType, setPitchDeckContentType] = useState<string>(defaultData?.pitchDeckContentType || "");
    const [pitchDeckFileSizeBytes, setPitchDeckFileSizeBytes] = useState<number | null>(defaultData?.pitchDeckFileSizeBytes || null);
    const [pitchDeckOriginalFilename, setPitchDeckOriginalFilename] = useState<string>(defaultData?.pitchDeckOriginalFilename || "");
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(defaultData?.videoUrl || null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>(defaultData?.videoUrl || "");
    const [videoUploadStatus, setVideoUploadStatus] = useState<VideoUploadStatus>(defaultData?.videoUrl ? "ready" : "idle");
    const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
    const shouldOpenDraftTemplate = Boolean(draftReturnState || (isEdit && existingData));
    const [updateCadence, setUpdateCadence] = useState<UpdateCadence | null>(() => draftReturnState?.cadence ?? (isEdit ? "monthly" : null));
    const [monthConfirmed, setMonthConfirmed] = useState(() => shouldOpenDraftTemplate);
    const [selectedDraftStage, setSelectedDraftStage] = useState<DraftStageKey | null>(() => shouldOpenDraftTemplate ? "reporting" : null);
    const [metricsConfirmed, setMetricsConfirmed] = useState(() => shouldOpenDraftTemplate);
    const [isRecordingPermissionPending, setIsRecordingPermissionPending] = useState(false);
    const [videoStoragePath, setVideoStoragePath] = useState<string>(defaultData?.videoStoragePath || "");
    const [videoContentType, setVideoContentType] = useState<string>(defaultData?.videoContentType || "");
    const [videoFileSizeBytes, setVideoFileSizeBytes] = useState<number | null>(defaultData?.videoFileSizeBytes || null);
    const [videoOriginalFilename, setVideoOriginalFilename] = useState<string>(defaultData?.videoOriginalFilename || "");
    const [previewMediaKind, setPreviewMediaKind] = useState<RecordedMediaKind | null>(defaultData?.videoUrl ? "video" : null);
    const [recordingMode, setRecordingMode] = useState<RecordedMediaKind | null>(null);
    const [recordingError, setRecordingError] = useState<string | null>(null);
    const [draftSaved, setDraftSaved] = useState(false);
    const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);
    const [showReviewLinkedInPopup, setShowReviewLinkedInPopup] = useState(false);
    const [showAllCreateStepMonths, setShowAllCreateStepMonths] = useState(false);
    const [mlaiFeedbackPreference, setMlaiFeedbackPreference] = useState<MlaiFeedbackPreference>("yes");
    const [hasReviewedFeedbackPreference, setHasReviewedFeedbackPreference] = useState(false);
    const [showSendToMlaiConfirmation, setShowSendToMlaiConfirmation] = useState(false);
    const [endOfFlowSurveyStep, setEndOfFlowSurveyStep] = useState(0);
    const [endOfFlowSurvey, setEndOfFlowSurvey] = useState<Record<EndOfFlowSurveyQuestionKey, BinarySurveyAnswer>>({
        importedMetricsUseful: null,
        connectorValueClear: null,
        guidedQuestionsUseful: null,
        previewAccurate: null,
    });
    const [endOfFlowSurveyComments, setEndOfFlowSurveyComments] = useState("");
    const [pendingDraftRequest, setPendingDraftRequest] = useState<{
        forceRegenerate?: boolean;
        clearPersistedRun?: boolean;
        inputSources?: VibeRaisingInputSourceKey[];
    } | null>(null);
    const currentCreatePeriod = getCurrentMonthlyUpdatePeriod();
    const createStepMonthOptions = getCreateStepMonthOptions();
    const createStepWeekOptions = useMemo(() => {
        const options = getCreateStepWeekOptions();
        // An OAuth round trip can span a new week. Keep the original period selectable.
        if (draftReturnState?.weekStart && !options.some((option) => option.key === draftReturnState.weekStart)) {
            const restoredWeek = getCreateStepWeekOptions(new Date(`${draftReturnState.weekStart}T12:00:00`)).at(-1);
            if (restoredWeek) return [restoredWeek, ...options];
        }
        return options;
    }, [draftReturnState?.weekStart]);

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback" || actionData?.step === "publish-error") {
            setActiveReviewActionData(actionData);
            setDismissedFeedback(false);
        }
    }, [actionData]);

    useEffect(() => {
        if (actionData?.step !== "feedback" && actionData?.step !== "publish-error") return;
        setMonthConfirmed(true);
        setSelectedDraftStage("reporting");
        setMetricsConfirmed(true);
    }, [actionData?.step]);

    useEffect(() => {
        if (saveDraftFetcher.data?.step !== "draft-saved") return;
        setDraftSaved(true);
        const timeoutId = window.setTimeout(() => setDraftSaved(false), 2500);
        return () => window.clearTimeout(timeoutId);
    }, [saveDraftFetcher.data]);

    // State declarations
    const [isClientMounted, setIsClientMounted] = useState(false);
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const storedManualMaterials = useMemo(() => readStoredManualMaterials(`${user.authUser.id}:${resolveActiveCompanyId(user)}`), [user.authUser.id, user.activeCompanyId]);
    const [manualSummary, setManualSummary] = useState<string>(() => storedManualMaterials.summary || "");
    const [manualDocumentIds, setManualDocumentIds] = useState<string[]>(() => {
        const defaultDocuments = Array.isArray(defaultData?.manualDocuments) ? defaultData.manualDocuments : [];
        if (defaultDocuments.length > 0) return defaultDocuments.map((document: VibeRaisingManualDocument) => document.id);
        return storedManualMaterials.manualDocumentIds;
    });
    const [manualDocuments, setManualDocuments] = useState<VibeRaisingManualDocument[]>(() => {
        const defaultDocuments = Array.isArray(defaultData?.manualDocuments) ? defaultData.manualDocuments : [];
        return defaultDocuments.length > 0 ? defaultDocuments : storedManualMaterials.documents;
    });
    const [privateAudienceVisibility, setAudienceVisibility] = useState<VibeRaisingAudienceVisibilitySelection>(() => normalizeAudienceVisibilityValue(defaultData?.audienceVisibility));
    const [coverImage, setCoverImage] = useState<VibeRaisingUpdateCover | null>(() => normalizeUpdateCover(defaultData?.coverImage));
    const [summary, setSummary] = useState<string>(() => defaultData?.summary || storedManualMaterials.summary || "");
    const coverEditedRef = useRef(false);
    const coverCompanyRef = useRef(resolveActiveCompanyId(user));
    useEffect(() => {
        const companyId = resolveActiveCompanyId(user);
        if (coverCompanyRef.current !== companyId) {
            coverCompanyRef.current = companyId;
            coverEditedRef.current = false;
            setCoverImage(normalizeUpdateCover(existingData?.coverImage));
        }
    }, [user.activeCompanyId, existingData]);
    const [sourceUrl, setSourceUrl] = useState<string>(() => defaultData?.sourceUrl || storedManualMaterials.sourceUrl || "");
    const [pitchDeckUrl, setPitchDeckUrl] = useState<string>(() => defaultData?.pitchDeckUrl || storedManualMaterials.pitchDeckUrl || "");
    const [pitchDeckSummary, setPitchDeckSummary] = useState<string>(() => defaultData?.pitchDeckSummary || storedManualMaterials.pitchDeckSummary || "");
    const [highlights, setHighlights] = useState<string>(defaultData?.highlights || "");
    const [challenges, setChallenges] = useState<string>(defaultData?.challenges || "");
    const [asks, setAsks] = useState<string>(defaultData?.asks || "");
    const [learnings, setLearnings] = useState<string>(defaultData?.learnings || "");
    const [next30Days, setNext30Days] = useState<string>(defaultData?.next30Days || "");
    const [financialSnapshot, setFinancialSnapshot] = useState<VibeRaisingFinancialSnapshot | null>(
        defaultData?.financialSnapshot || null,
    );
    const [conciseAnalysis, setConciseAnalysis] = useState<VibeRaisingConciseAnalysis | null>(
        defaultData?.conciseAnalysis || null,
    );
    const [presentationMode, setPresentationMode] = useState<string>(defaultData?.presentationMode || "");
    const [pastMonthCards, setPastMonthCards] = useState<EditorMonthCard[]>([]);
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const [selectedMonth, setSelectedMonth] = useState<string>(draftReturnState?.month || defaultData?.month || currentCreatePeriod.month);
    const [selectedYear, setSelectedYear] = useState<number>(draftReturnState?.year || defaultData?.year || currentCreatePeriod.year);
    const [selectedWeekKey, setSelectedWeekKey] = useState<string>(() => draftReturnState?.weekStart || createStepWeekOptions.at(-1)?.key || "");
    const [activePeriodKey, setActivePeriodKey] = useState("current");
    const createStepVisibleMonthOptions = useMemo(() => {
        if (isEdit || showAllCreateStepMonths || selectedYear === MIN_MONTHLY_UPDATE_YEAR) {
            return VIBE_RAISING_MONTH_OPTIONS.map((option) => ({
                month: option.name,
                year: selectedYear,
            }));
        }
        return createStepMonthOptions;
    }, [createStepMonthOptions, isEdit, selectedYear, showAllCreateStepMonths]);
    const isWeeklyUpdate = updateCadence === "weekly";
    const selectedWeekOption = createStepWeekOptions.find((option) => option.key === selectedWeekKey) ?? null;
    const hasSelectedMonth = Boolean(selectedMonth.trim());
    const hasSelectedPeriod = isWeeklyUpdate ? Boolean(selectedWeekOption) : hasSelectedMonth;
    const selectedMonthTheme = getVibeRaisingMonthTheme(selectedMonth);
    const selectedMonthUpdateKey = getMonthlyUpdateKey(selectedMonth, selectedYear);
    const targetMonthIso = getMonthlyUpdateIsoMonth(selectedMonth, selectedYear);
    const isSelectedMonthInFuture = hasSelectedMonth && isFutureMonthlyUpdate(selectedMonth, selectedYear);
    const isSelectedMonthBeforeMinimum = hasSelectedMonth && isBeforeMinimumMonthlyUpdate(selectedMonth, selectedYear);
    const isSelectedMonthUnavailable = isSelectedMonthInFuture || isSelectedMonthBeforeMinimum;
    const existingUpdateForSelectedMonth = existingMonthlyUpdates.find(
        (update) => getMonthlyUpdateStorageKey(update) === selectedMonthUpdateKey,
    );
    const selectedMonthLabel = hasSelectedMonth ? `${selectedMonth} ${selectedYear}` : "Select a month";
    const selectedPeriodLabel = isWeeklyUpdate
        ? selectedWeekOption?.label || "Select a week"
        : selectedMonthLabel;
    const selectedPeriodName = isWeeklyUpdate ? "week" : "month";
    const catchUpMonthLabel = createStepMonthOptions[0]?.month || "May";
    const currentDraftMonthLabel = createStepMonthOptions[1]?.month || currentCreatePeriod.month;
    const monthSelectionCaption = `Select the month this update covers. ${catchUpMonthLabel} is available if you're catching up; ${currentDraftMonthLabel} is ready for your current draft.`;

    const handleWeekChange = useCallback((option: WeeklyUpdateOption) => {
        setSelectedWeekKey(option.key);
        setSelectedMonth(option.month);
        setSelectedYear(option.year);
        setActivePeriodKey("current");
    }, []);
    
    const [metricValues, setMetricValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = Object.fromEntries(metricDefinitions.map(item => [item.key, String(defaultData?.[item.key] || "")]));
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

    // Per-metric snippet/full visibility. Seeded from the update being
    // edited, else carried forward from the most recent prior update.
    const [metricDisplayStates] = useState<Record<string, VibeRaisingMetricVisibility>>(() => {
        const seeded =
            parseDisplayConfigValue(defaultData?.displayConfig) ||
            existingMonthlyUpdates.find((update) => update.displayConfig)?.displayConfig ||
            null;
        if (!seeded) return {};
        const states: Record<string, VibeRaisingMetricVisibility> = {};
        seeded.fullMetricKeys.forEach((key) => { states[key] = "full"; });
        seeded.snippetMetricKeys.forEach((key) => { states[key] = "snippet"; });
        return states;
    });
    const [compactSources, setCompactSources] = useState<VibeRaisingInputSourceSummary[]>([]);
    const [compactSourcesLoading, setCompactSourcesLoading] = useState(false);
    const [compactSourcesError, setCompactSourcesError] = useState<string | null>(null);
    const [selectedDraftInputSources, setSelectedDraftInputSources] = useState<Set<VibeRaisingInputSourceKey>>(
        () => new Set(initialSelectedInputSources),
    );
    useEffect(() => {
        setSelectedDraftInputSources(new Set(initialSelectedInputSources));
    }, [initialSelectedInputSourcesKey]);
    const selectedInputSources = useMemo(
        () => Array.from(selectedDraftInputSources).filter((key) => VALID_INPUT_SOURCE_KEYS.has(key)),
        [selectedDraftInputSources],
    );
    const hasSelectedInputSources = selectedInputSources.length > 0;
    const isManualOnlyDraftFlow = !hasSelectedInputSources;
    const selectedMetricOptions = Array.from(selectedMetrics)
        .map((key) => METRIC_OPTION_MAP.get(key))
        .filter((metric): metric is MetricOption => Boolean(metric));
    const draftMetricOptions = orderDraftMetricOptions(metricOptionsForValues(metricValues));
    const draftMetricInitialCount = PRIMARY_DRAFT_METRIC_KEYS.length;
    const collapsedHiddenDraftMetricCount = draftMetricOptions.filter(
        (metric, index) => index >= draftMetricInitialCount && !String(metricValues[metric.key] || "").trim(),
    ).length;
    const [areDraftMetricsExpanded, setAreDraftMetricsExpanded] = useState(false);
    const [isMobileTourViewport, setIsMobileTourViewport] = useState(false);
    const [mobileTourOpen, setMobileTourOpen] = useState(false);
    const [mobileTourStepIndex, setMobileTourStepIndex] = useState(0);
    const [mobileTourChecked, setMobileTourChecked] = useState(false);
    const showLegacyDraftFlow = false;
    const selectedInputSourceLabels = selectedInputSources.map((key) => INPUT_SOURCE_LABELS[key]);
    const selectedInputSourceDescription = selectedInputSourceLabels.length > 0
        ? selectedInputSourceLabels.join(", ")
        : "Manual materials only";
    const activeUserCompany = useMemo(
        () =>
            user.companies.find((company) => company.id === user.activeCompanyId) ??
            user.companies[0] ??
            null,
        [user.activeCompanyId, user.companies],
    );
    const founderProfiles = useMemo(
        () =>
            uniqueFounderProfiles([
                ...(user.founderProfiles || []),
                ...(activeUserCompany?.founderProfiles || []),
            ])
                .map((profile) => ({
                    name: String(profile.name || "").trim(),
                    linkedinUrl: String(profile.linkedinUrl || "").trim(),
                }))
                .filter((profile) => profile.name),
        [activeUserCompany?.founderProfiles, user.founderProfiles],
    );
    const missingFounderLinkedInDefaults = useMemo<MissingFounderLinkedInDraft[]>(
        () =>
            founderProfiles
                .map((profile, sourceIndex) => ({
                    id: `${sourceIndex}-${profile.name}`,
                    sourceIndex,
                    name: profile.name,
                    linkedinUrl: "",
                }))
                .filter((profile) => !founderProfiles[profile.sourceIndex]?.linkedinUrl),
        [founderProfiles],
    );
    const [missingFounderLinkedInDrafts, setMissingFounderLinkedInDrafts] = useState<MissingFounderLinkedInDraft[]>(() => missingFounderLinkedInDefaults);
    useEffect(() => {
        setMissingFounderLinkedInDrafts(missingFounderLinkedInDefaults);
    }, [missingFounderLinkedInDefaults]);
    const founderProfilesForSave = useMemo(() => {
        const mergedProfiles = founderProfiles.map((profile, index) => {
            const missingDraft = missingFounderLinkedInDrafts.find((entry) => entry.sourceIndex === index);
            const linkedinUrl = String(missingDraft?.linkedinUrl || profile.linkedinUrl || "").trim();
            return linkedinUrl ? { name: profile.name, linkedinUrl } : { name: profile.name };
        });

        activeUserCompany?.founderProfiles?.forEach((profile) => {
            if (!String(profile.linkedinUrl || "").trim()) return;
            const existingIndex = mergedProfiles.findIndex(
                (entry) =>
                    String(entry.name || "").trim().toLowerCase() === String(profile.name || "").trim().toLowerCase(),
            );
            if (existingIndex >= 0) {
                mergedProfiles[existingIndex] = {
                    ...mergedProfiles[existingIndex],
                    linkedinUrl: String(mergedProfiles[existingIndex].linkedinUrl || profile.linkedinUrl || "").trim(),
                };
                return;
            }
            mergedProfiles.push({
                name: profile.name || "Founder",
                linkedinUrl: String(profile.linkedinUrl || "").trim(),
            });
        });

        return uniqueFounderProfiles(mergedProfiles).filter((profile) => profile.name);
    }, [activeUserCompany?.founderProfiles, founderProfiles, missingFounderLinkedInDrafts]);
    const isEarlyStageCompany = ["idea", "pre-seed"].includes(String(user.stage || "").trim().toLowerCase());
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
    const hydratedRunInputSourcesRef = useRef<string | null>(null);
    const pitchDeckLinkInputRef = useRef<HTMLInputElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);
    const videoUploadAbortRef = useRef<AbortController | null>(null);
    const videoUploadSequenceRef = useRef(0);
    const videoPreviewObjectUrlRef = useRef<string | null>(null);
    const pitchDeckUploadAbortRef = useRef<AbortController | null>(null);
    const pitchDeckPreviewObjectUrlRef = useRef<string | null>(null);
    const loadedExistingUpdateKeyRef = useRef<string | null>(null);
    const editorMonthKeyRef = useRef<string>(selectedMonthUpdateKey);
    const draftStepperRef = useRef<HTMLDivElement | null>(null);
    const monthSelectorRef = useRef<HTMLDivElement | null>(null);
    const draftTemplateSectionRef = useRef<HTMLDivElement | null>(null);
    const generateDraftSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
    const shouldDimMetricsTemplate = false;
    const [awakeMetricCards, setAwakeMetricCards] = useState<Set<string>>(new Set());
    const compactOptionalSources = useMemo(() => {
        const byKey = new Map(compactSources.map((source) => [source.key, source]));
        return COMPACT_OPTIONAL_SOURCE_KEYS
            .map((key) => byKey.get(key))
            .filter((source): source is VibeRaisingInputSourceSummary => Boolean(source && isConnectedInputSource(source)));
    }, [compactSources]);
    const financialMetricSources = useMemo(() => {
        const byKey = new Map(compactSources.map((source) => [source.key, source]));
        return FINANCIAL_METRIC_SOURCE_KEYS.map((key): VibeRaisingInputSourceSummary => (
            byKey.get(key) ?? {
                key,
                label: INPUT_SOURCE_LABELS[key],
                capabilities: ["metrics"],
                selected: false,
                status: "not_connected",
            }
        ));
    }, [compactSources]);
    const draftReturnPath = useMemo(() => {
        return buildVibeRaisingDraftReturnPath(
            location.pathname,
            location.search,
            monthConfirmed && updateCadence ? {
                cadence: updateCadence,
                month: selectedMonth,
                year: selectedYear,
                weekStart: isWeeklyUpdate ? selectedWeekOption?.startIso : undefined,
            } : null,
            Array.from(selectedDraftInputSources),
        );
    }, [location.pathname, location.search, monthConfirmed, updateCadence, selectedMonth, selectedYear, isWeeklyUpdate, selectedWeekOption?.startIso, selectedDraftInputSources]);
    const manageConnectionsHref = `/founder-tools/data-sources?next=${encodeURIComponent(draftReturnPath)}`;
    const goToConnectDataStep = useCallback(() => {
        navigate(manageConnectionsHref);
    }, [manageConnectionsHref, navigate]);
    const handleDraftStepperClick = useCallback((step: MonthlyUpdateStepKey) => {
        if (step === "connect") {
            goToConnectDataStep();
            return;
        }
        if (step === "draft") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [goToConnectDataStep]);
    const connectedDraftInputSources = useMemo(
        () => compactOptionalSources.filter(isConnectedInputSource).map((source) => source.key),
        [compactOptionalSources],
    );

    useEffect(() => {
        let cancelled = false;
        setCompactSourcesLoading(true);
        setCompactSourcesError(null);
        getVibeRaisingInputSourcesStatus(backendBaseUrl)
            .then((response) => {
                if (!cancelled) {
                    setCompactSources(response.sources);
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setCompactSourcesError(error instanceof Error ? error.message : "We couldn't load source status.");
                }
            })
            .finally(() => {
                if (!cancelled) setCompactSourcesLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [backendBaseUrl]);

    // On the edit/regenerate path (no ?inputs= deep link), pre-select the founder's
    // connected sources once so the picker isn't empty and the generate button is enabled.
    // Bails for create-new, for ?inputs= deep links, and once a selection already exists.
    const didSeedEditSourcesRef = useRef(false);
    useEffect(() => {
        if (didSeedEditSourcesRef.current) return;
        if (!isEdit || initialSelectedInputSources.length > 0) {
            didSeedEditSourcesRef.current = true;
            return;
        }
        if (connectedDraftInputSources.length === 0) return;
        if (selectedDraftInputSources.size === 0) {
            setSelectedDraftInputSources(new Set(connectedDraftInputSources));
        }
        didSeedEditSourcesRef.current = true;
    }, [isEdit, initialSelectedInputSources, connectedDraftInputSources, selectedDraftInputSources]);

    const toggleDraftInputSource = useCallback((source: VibeRaisingInputSourceSummary) => {
        if (!isConnectedInputSource(source)) return;
        setSelectedDraftInputSources((previous) => {
            const next = new Set(previous);
            if (next.has(source.key)) {
                next.delete(source.key);
            } else {
                next.add(source.key);
            }
            return next;
        });
    }, []);

    const wakeMetricCard = useCallback((metricKey: string) => {
        if (shouldDimMetricsTemplate) {
            setAwakeMetricCards((previous) => {
                if (previous.has(metricKey)) return previous;
                const next = new Set(previous);
                next.add(metricKey);
                return next;
            });
        }
    }, [shouldDimMetricsTemplate]);

    const focusMetricInput = useCallback((inputId: string) => {
        window.requestAnimationFrame(() => {
            document.getElementById(inputId)?.focus();
        });
    }, []);

    useEffect(() => {
        if (isEdit) return;
        if (isWeeklyUpdate) return;
        if (showAllCreateStepMonths) return;
        if (!selectedMonth.trim()) return;
        const isVisibleCreateStepMonth = (createStepVisibleMonthOptions || []).some(
            (option) => option.month === selectedMonth && option.year === selectedYear,
        );
        if (isVisibleCreateStepMonth || !isFutureMonthlyUpdate(selectedMonth, selectedYear)) return;
        setSelectedMonth("");
        setSelectedYear(currentCreatePeriod.year);
    }, [createStepVisibleMonthOptions, currentCreatePeriod.year, isEdit, isWeeklyUpdate, selectedMonth, selectedYear, showAllCreateStepMonths]);

    const dismissMetricCard = useCallback((metricKey: string) => {
        setAwakeMetricCards((previous) => {
            if (!previous.has(metricKey)) return previous;
            const next = new Set(previous);
            next.delete(metricKey);
            return next;
        });
        setMetricValues((previous) => {
            if (!(metricKey in previous)) return previous;
            const next = { ...previous };
            delete next[metricKey];
            return next;
        });
        setSelectedMetrics((previous) => {
            if (!previous.has(metricKey)) return previous;
            const next = new Set(previous);
            next.delete(metricKey);
            return next;
        });
    }, []);

    const [generatedRevisionId, setGeneratedRevisionId] = useState<number | null>(null);
    const handleDraftComplete = (data: any) => {
        setGeneratedRevisionId(data.revisionId || null);
        if (!coverEditedRef.current && "coverImage" in data) setCoverImage(normalizeUpdateCover(data.coverImage));
        const resolvedMonth = typeof data.month === "string" && data.month.trim() ? data.month.trim() : selectedMonth;
        const resolvedYear = typeof data.year === "number" && Number.isFinite(data.year) ? data.year : selectedYear;
        const resolvedEditorKey = getMonthlyUpdateKey(resolvedMonth, resolvedYear);

        loadedExistingUpdateKeyRef.current = resolvedEditorKey;
        editorMonthKeyRef.current = resolvedEditorKey;
        setActivePeriodKey("current");
        if (data.month) setSelectedMonth(resolvedMonth);
        if (data.year) setSelectedYear(resolvedYear);
        setHighlights(data.highlights);
        setChallenges(data.challenges);
        setAsks(data.asks || "");
        setLearnings(data.learnings || "");
        setNext30Days(data.next30Days || "");
        setFinancialSnapshot(data.financialSnapshot || data.financial_snapshot || null);
        setConciseAnalysis(data.conciseAnalysis || data.concise_analysis || null);
        setPresentationMode(data.presentationMode || data.presentation_mode || "");
        setSummary(data.summary || "");
        setSourceUrl(data.sourceUrl || data.source_url || "");
        if (Array.isArray(data.manualDocuments || data.manual_documents)) {
            const documents = (data.manualDocuments || data.manual_documents) as VibeRaisingManualDocument[];
            setManualDocuments(documents);
            setManualDocumentIds(documents.map((document) => document.id));
        }
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
            setPreviewMediaKind(isAudioMedia(data.videoContentType || data.video_content_type, data.videoOriginalFilename || data.video_original_filename || nextVideoUrl) ? "audio" : "video");
        }
        const currentMetrics = data.metrics || {};
        setMetricValues(currentMetrics);
        setAwakeMetricCards(
            new Set(
                Object.keys(currentMetrics).filter((key) => String(currentMetrics[key] || "").trim()),
            ),
        );
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

    useEffect(() => {
        if (selectedDraftStage !== "reporting") {
            setAwakeMetricCards(new Set());
            return;
        }

        setAwakeMetricCards(
            shouldDimMetricsTemplate
                ? new Set(Object.keys(metricValues).filter((key) => String(metricValues[key] || "").trim()))
                : new Set(),
        );
    }, [selectedDraftStage, selectedMonthUpdateKey, shouldDimMetricsTemplate]);

    const revokeVideoPreviewObjectUrl = useCallback(() => {
        if (videoPreviewObjectUrlRef.current) {
            URL.revokeObjectURL(videoPreviewObjectUrlRef.current);
            videoPreviewObjectUrlRef.current = null;
        }
    }, []);

    const revokePitchDeckPreviewObjectUrl = useCallback(() => {
        if (pitchDeckPreviewObjectUrlRef.current) {
            URL.revokeObjectURL(pitchDeckPreviewObjectUrlRef.current);
            pitchDeckPreviewObjectUrlRef.current = null;
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

    const resetPitchDeckUpload = useCallback(() => {
        pitchDeckUploadAbortRef.current?.abort();
        pitchDeckUploadAbortRef.current = null;
        revokePitchDeckPreviewObjectUrl();
        setPitchDeckPreviewUrl(null);
        setUploadedPitchDeckUrl("");
        setPitchDeckStoragePath("");
        setPitchDeckContentType("");
        setPitchDeckFileSizeBytes(null);
        setPitchDeckOriginalFilename("");
        setPitchDeckUploadStatus("idle");
        setPitchDeckUploadError(null);
    }, [revokePitchDeckPreviewObjectUrl]);

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
        setPreviewMediaKind(isAudioMedia(file.type, file.name) ? "audio" : "video");
        revokeVideoPreviewObjectUrl();
        setVideoPreviewUrl(null);

        if (!isSupportedVideoFile(file)) {
            setVideoUploadStatus("error");
            setVideoUploadError("Use a common video format: MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.");
            return;
        }

        if (file.size > MAX_SOURCE_VIDEO_BYTES) {
            setVideoUploadStatus("error");
            setVideoUploadError(`File is too large. Use a file under ${MAX_VIDEO_UPLOAD_SIZE_MB} MB.`);
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
                        throw new Error(`File exceeds the ${MAX_VIDEO_UPLOAD_SIZE_MB} MB upload limit after compression. Try a shorter clip.`);
                    }
                }
            }

            if (uploadCandidate.size > MAX_VIDEO_UPLOAD_BYTES) {
                throw new Error(`File exceeds the ${MAX_VIDEO_UPLOAD_SIZE_MB} MB upload limit.`);
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

    const uploadPitchDeckFile = useCallback(async (file: File) => {
        pitchDeckUploadAbortRef.current?.abort();
        const abortController = new AbortController();
        pitchDeckUploadAbortRef.current = abortController;

        setPitchDeckUploadError(null);
        setPitchDeckUploadStatus("creating_session");
        setUploadedPitchDeckUrl("");
        setPitchDeckStoragePath("");
        setPitchDeckContentType(inferPitchDeckContentType(file.type, file.name));
        setPitchDeckFileSizeBytes(file.size);
        setPitchDeckOriginalFilename(file.name);

        if (!isSupportedPitchDeckFile(file)) {
            setPitchDeckUploadStatus("error");
            setPitchDeckUploadError("Use a PDF, PPT, or PPTX pitch deck.");
            return;
        }

        if (file.size > MAX_PITCH_DECK_UPLOAD_BYTES) {
            setPitchDeckUploadStatus("error");
            setPitchDeckUploadError(`Pitch deck is too large. Use a file under ${MAX_PITCH_DECK_UPLOAD_SIZE_MB} MB.`);
            return;
        }

        revokePitchDeckPreviewObjectUrl();
        const localPitchDeckPreviewUrl = URL.createObjectURL(file);
        pitchDeckPreviewObjectUrlRef.current = localPitchDeckPreviewUrl;
        setPitchDeckPreviewUrl(localPitchDeckPreviewUrl);

        try {
            setPitchDeckUploadStatus("uploading");
            const uploaded = await uploadVibeRaisingPitchDeck(backendBaseUrl, file, abortController.signal);
            if (abortController.signal.aborted) return;
            setUploadedPitchDeckUrl(uploaded.pitchDeckUrl);
            setPitchDeckStoragePath(uploaded.storagePath);
            setPitchDeckContentType(uploaded.contentType);
            setPitchDeckFileSizeBytes(uploaded.fileSizeBytes);
            setPitchDeckOriginalFilename(uploaded.originalFilename);
            setPitchDeckUrl(uploaded.pitchDeckUrl);
            setPitchDeckUploadStatus("ready");
        } catch (error) {
            if (abortController.signal.aborted) return;
            setPitchDeckUploadStatus("error");
            setPitchDeckUploadError(getPitchDeckUploadErrorMessage(error));
        } finally {
            if (pitchDeckUploadAbortRef.current === abortController) {
                pitchDeckUploadAbortRef.current = null;
            }
        }
    }, [backendBaseUrl, revokePitchDeckPreviewObjectUrl]);

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

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)");
        const syncViewport = () => setIsMobileTourViewport(mediaQuery.matches);
        syncViewport();
        mediaQuery.addEventListener("change", syncViewport);
        return () => mediaQuery.removeEventListener("change", syncViewport);
    }, []);

    useEffect(() => {
        if (mobileTourChecked || !isMobileTourViewport || monthConfirmed || selectedDraftStage === "reporting") return;
        setMobileTourChecked(true);

        try {
            if (window.localStorage.getItem(CREATE_UPDATE_MOBILE_TOUR_STORAGE_KEY) === "1") return;
        } catch {
            // Ignore storage failures and still show the tour for this session.
        }

        const timer = window.setTimeout(() => {
            setMobileTourStepIndex(0);
            setMobileTourOpen(true);
        }, 450);

        return () => window.clearTimeout(timer);
    }, [isMobileTourViewport, mobileTourChecked, monthConfirmed, selectedDraftStage]);

    const closeMobileTour = () => {
        setMobileTourOpen(false);
        try {
            window.localStorage.setItem(CREATE_UPDATE_MOBILE_TOUR_STORAGE_KEY, "1");
        } catch {
            // Ignore storage failures.
        }
    };

    const goToPreviousMobileTourStep = () => {
        setMobileTourStepIndex((current) => Math.max(0, current - 1));
    };

    const goToNextMobileTourStep = () => {
        if (mobileTourStepIndex >= 1) {
            closeMobileTour();
            return;
        }
        setMobileTourStepIndex((current) => current + 1);
    };

    const mobileTourSteps = useMemo<CreateUpdateMobileTourStep[]>(
        () => [
            {
                key: "stepper",
                title: "Draft first",
                body: "Pick a reporting period and start from the template. Connected data is optional if you want source-assisted drafting.",
                targetRef: draftStepperRef,
            },
            {
                key: "period",
                title: "Pick a period, then draft",
                body: "Choose the update period first. Early stage? No worries. A selfie video or short presentation can still tell your founder story well.",
                targetRef: monthSelectorRef,
            },
        ],
        [],
    );

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
                // Restore the drafting stage from the run status itself so the
                // progress card renders even on a fresh page load (refresh
                // recovery), where monthConfirmed / selectedDraftStage would
                // otherwise still be at their defaults and hide it.
                const parsedMonth = monthYearFromIso(statusResponse.targetMonth);
                if (parsedMonth) {
                    setSelectedMonth(parsedMonth.month);
                    setSelectedYear(parsedMonth.year);
                }
                const runInputSources = (statusResponse.run?.inputSources || []).filter(
                    (key): key is VibeRaisingInputSourceKey => VALID_INPUT_SOURCE_KEYS.has(key as VibeRaisingInputSourceKey),
                );
                // Hydrate the source picker from the run for refresh-recovery only —
                // when the founder hasn't picked any sources yet. Never overwrite a
                // live selection (e.g. a freshly-ticked Google Analytics) when a run
                // starts, or the card flips to unchecked and drops out of the run.
                const runId = statusResponse.runId ?? null;
                if (runInputSources.length > 0 && runId && hydratedRunInputSourcesRef.current !== runId) {
                    hydratedRunInputSourcesRef.current = runId;
                    setSelectedDraftInputSources((previous) => (previous.size === 0 ? new Set(runInputSources) : previous));
                }
                setMonthConfirmed(true);
                setSelectedDraftStage("reporting");
                setMetricsConfirmed(true);
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

    useEffect(() => {
        // The app shell already polls the active run; seed the wizard from it
        // so arriving here (banner/chip click or navigation) lands straight on
        // the progress view without waiting for this page's own recovery fetch.
        if (!isClientMounted) return;
        if (emailDraftStatus?.runId) return;
        if (!sharedActiveDraftRun?.runId) return;
        if (sharedActiveDraftRun.state !== "queued" && sharedActiveDraftRun.state !== "running") return;
        void processEmailDraftStatus(sharedActiveDraftRun);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClientMounted, sharedActiveDraftRun?.runId, emailDraftStatus?.runId]);

    const startOrResumeEmailDraft = useCallback(async (options?: { forceRegenerate?: boolean; inputSources?: VibeRaisingInputSourceKey[] }) => {
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
                    inputSources: options?.inputSources?.length ? options.inputSources : selectedInputSources,
                    targetMonth: targetMonthIso,
                    manualDocumentIds,
                    manualSummary,
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
    }, [backendBaseUrl, emailDraftForceRegenerateKey, manualDocumentIds, manualSummary, selectedInputSources, targetMonthIso]);

    const startDraftFromSelectedInputs = useCallback(async (options?: { forceRegenerate?: boolean; inputSources?: VibeRaisingInputSourceKey[] }) => {
        const effectiveInputSources = options?.inputSources?.length ? options.inputSources : selectedInputSources;
        if (effectiveInputSources.length === 0) {
            setEmailDraftUiError("Choose an optional connected source before generating a source-assisted draft.");
            return;
        }
        if (!canGenerateDraftFromEmail) {
            navigate("/founder-tools/companies");
            return;
        }
        if (isSelectedMonthUnavailable || !targetMonthIso) {
            setEmailDraftUiError("Choose the current month or a previous month before generating an update.");
            return;
        }

        setEmailDraftActionBusy(true);
        setEmailDraftUiError(null);
        try {
            if (!effectiveInputSources.includes("gmail")) {
                await startOrResumeEmailDraft({ forceRegenerate: options?.forceRegenerate, inputSources: effectiveInputSources });
                return;
            }
            const bootstrap = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl);
            if (bootstrap.googleConnected) {
                await startOrResumeEmailDraft({ forceRegenerate: options?.forceRegenerate, inputSources: effectiveInputSources });
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
        isSelectedMonthUnavailable,
        navigate,
        selectedInputSources,
        startOrResumeEmailDraft,
        targetMonthIso,
    ]);

    const executeDraftRequest = useCallback((request?: { forceRegenerate?: boolean; clearPersistedRun?: boolean; inputSources?: VibeRaisingInputSourceKey[] }) => {
        if (request?.clearPersistedRun) {
            clearPersistedEmailDraftRun();
        }
        void startDraftFromSelectedInputs({ forceRegenerate: request?.forceRegenerate, inputSources: request?.inputSources });
    }, [clearPersistedEmailDraftRun, startDraftFromSelectedInputs]);

    const requestDraftFromSelectedInputs = useCallback((request?: { forceRegenerate?: boolean; clearPersistedRun?: boolean; inputSources?: VibeRaisingInputSourceKey[] }) => {
        // Entry paths like "Edit" never pass ?inputs= and hide the source cards,
        // so fall back to every connected source rather than refusing to run.
        const fallbackInputSources =
            !request?.inputSources?.length && selectedInputSources.length === 0 && connectedDraftInputSources.length > 0
                ? connectedDraftInputSources
                : undefined;
        if (fallbackInputSources) {
            setSelectedDraftInputSources(new Set(fallbackInputSources));
        }
        const enrichedRequest = {
            ...request,
            inputSources: request?.inputSources ?? fallbackInputSources,
        };
        if (existingUpdateForSelectedMonth) {
            setPendingDraftRequest({
                ...enrichedRequest,
                forceRegenerate: true,
            });
            setShowRegenerateConfirm(true);
            return;
        }
        executeDraftRequest(enrichedRequest);
    }, [connectedDraftInputSources, executeDraftRequest, existingUpdateForSelectedMonth, selectedInputSources]);

    const handleGenerateSelectedMonthUpdate = useCallback(() => {
        if (!hasSelectedMonth || isSelectedMonthUnavailable) return;
        setMonthConfirmed(true);
        setSelectedDraftStage("reporting");
        setMetricsConfirmed(true);
        setShowEmailWizard(false);
        setEmailDraftStatus(null);
        setEmailDraftUiError(null);
        setEmailDraftPollingDegraded(false);
        setEmailDraftPollDelayMs(EMAIL_DRAFT_POLL_INTERVAL_MS);
        if (typeof window !== "undefined") {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    const scrollTarget = isMobileTourViewport
                        ? document.getElementById("mobile-selected-month-summary")
                        : draftTemplateSectionRef.current;
                    scrollTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            });
        }
    }, [hasSelectedMonth, isMobileTourViewport, isSelectedMonthUnavailable]);

    const handleGenerateDraftFromEmailClick = useCallback(() => {
        requestDraftFromSelectedInputs();
    }, [requestDraftFromSelectedInputs]);
    const handleGenerateDraftCardTouchStart = useCallback((event: React.TouchEvent<HTMLButtonElement>) => {
        const touch = event.touches[0];
        if (!touch) return;
        generateDraftSwipeStartRef.current = { x: touch.clientX, y: touch.clientY };
    }, []);
    const handleGenerateDraftCardTouchEnd = useCallback((event: React.TouchEvent<HTMLButtonElement>) => {
        const start = generateDraftSwipeStartRef.current;
        generateDraftSwipeStartRef.current = null;
        if (!start || !isMobileTourViewport || !hasSelectedMonth || isSelectedMonthUnavailable || emailDraftActionBusy) return;

        const touch = event.changedTouches[0];
        if (!touch) return;

        const deltaX = touch.clientX - start.x;
        const deltaY = Math.abs(touch.clientY - start.y);
        if (deltaX >= 72 && deltaY <= 40) {
            handleGenerateSelectedMonthUpdate();
        }
    }, [emailDraftActionBusy, handleGenerateSelectedMonthUpdate, hasSelectedMonth, isMobileTourViewport, isSelectedMonthUnavailable]);

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

    // useEffectEvent so the recovery cannot be cancelled mid-flight by state
    // churn (restoring the run re-renders, which previously re-fired this
    // effect via callback identities and left emailDraftActionBusy stuck true,
    // disabling every draft action including cancel).
    const runEmailDraftRecovery = useEffectEvent(async () => {
        setEmailDraftActionBusy(true);
        try {
            if (!resumeEmailDrafting) {
                clearPersistedEmailDraftRun();
                resetEmailDraftUi();
                return;
            }

            const activeRun = await getVibeRaisingStartupUpdateActiveRun(backendBaseUrl);
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
            startTransition(() => {
                setEmailDraftUiError(getEmailDraftErrorMessage(error));
            });
        } finally {
            setEmailDraftActionBusy(false);
            if (resumeEmailDrafting) {
                clearEmailDraftingParams();
            }
        }
    });

    useEffect(() => {
        if (!isClientMounted) return;

        const recoveryKey = `${backendBaseUrl}:${emailDraftStorageKey}:${resumeEmailDrafting ? "resume" : "idle"}`;
        if (emailDraftRecoveryKeyRef.current === recoveryKey) {
            return;
        }
        emailDraftRecoveryKeyRef.current = recoveryKey;
        void runEmailDraftRecovery();
    }, [
        backendBaseUrl,
        emailDraftStorageKey,
        isClientMounted,
        resumeEmailDrafting,
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
                coverEditedRef.current = false;
                setCoverImage(null);
                setSummary("");
                setSourceUrl("");
                setPitchDeckUrl("");
                setPitchDeckSummary("");
                resetPitchDeckUpload();
                setManualDocumentIds([]);
                setManualDocuments([]);
                setManualSummary("");
                resetVideoUpload();
                setHighlights("");
                setChallenges("");
                setAsks("");
                setLearnings("");
                setNext30Days("");
                setFinancialSnapshot(null);
                setConciseAnalysis(null);
                setPresentationMode("");
                setMetricValues({});
                setSelectedMetrics(new Set());
                setAwakeMetricCards(new Set());
                setPastMonthCards([]);
                setExpandedCards(new Set());
                setActivePeriodKey("current");
            }
            return;
        }
        if (loadedExistingUpdateKeyRef.current === selectedMonthUpdateKey) return;
        loadedExistingUpdateKeyRef.current = selectedMonthUpdateKey;
        editorMonthKeyRef.current = selectedMonthUpdateKey;

        coverEditedRef.current = false;
        setCoverImage(existingUpdateForSelectedMonth.coverImage || null);
        setSummary(existingUpdateForSelectedMonth.summary || "");
        setSourceUrl(existingUpdateForSelectedMonth.sourceUrl || "");
        revokePitchDeckPreviewObjectUrl();
        setPitchDeckUrl(existingUpdateForSelectedMonth.pitchDeckUrl || "");
        setPitchDeckPreviewUrl(existingUpdateForSelectedMonth.pitchDeckUrl || null);
        setUploadedPitchDeckUrl(existingUpdateForSelectedMonth.pitchDeckUrl || "");
        setPitchDeckStoragePath(existingUpdateForSelectedMonth.pitchDeckStoragePath || "");
        setPitchDeckContentType(existingUpdateForSelectedMonth.pitchDeckContentType || "");
        setPitchDeckFileSizeBytes(existingUpdateForSelectedMonth.pitchDeckFileSizeBytes || null);
        setPitchDeckOriginalFilename(existingUpdateForSelectedMonth.pitchDeckOriginalFilename || "");
        setPitchDeckSummary(existingUpdateForSelectedMonth.pitchDeckSummary || "");
        setPitchDeckUploadStatus(existingUpdateForSelectedMonth.pitchDeckUrl ? "ready" : "idle");
        setPitchDeckUploadError(null);
        setManualDocuments(existingUpdateForSelectedMonth.manualDocuments || []);
        setManualDocumentIds((existingUpdateForSelectedMonth.manualDocuments || []).map((document) => document.id));
        setManualSummary("");
        setUploadedVideoUrl(existingUpdateForSelectedMonth.videoUrl || "");
        setVideoPreviewUrl(existingUpdateForSelectedMonth.videoUrl || null);
        setVideoStoragePath(existingUpdateForSelectedMonth.videoStoragePath || "");
        setVideoContentType(existingUpdateForSelectedMonth.videoContentType || "");
        setVideoFileSizeBytes(existingUpdateForSelectedMonth.videoFileSizeBytes || null);
        setVideoOriginalFilename(existingUpdateForSelectedMonth.videoOriginalFilename || "");
        setPreviewMediaKind(existingUpdateForSelectedMonth.videoUrl
            ? isAudioMedia(existingUpdateForSelectedMonth.videoContentType, existingUpdateForSelectedMonth.videoOriginalFilename || existingUpdateForSelectedMonth.videoUrl) ? "audio" : "video"
            : null);
        setVideoUploadStatus(existingUpdateForSelectedMonth.videoUrl ? "ready" : "idle");
        setVideoUploadError(null);
        setHighlights(existingUpdateForSelectedMonth.highlights || "");
        setChallenges(existingUpdateForSelectedMonth.challenges || "");
        setAsks(existingUpdateForSelectedMonth.asks || "");
        setLearnings(existingUpdateForSelectedMonth.learnings || "");
        setNext30Days(existingUpdateForSelectedMonth.next30Days || "");
        setFinancialSnapshot(existingUpdateForSelectedMonth.financialSnapshot || null);
        setConciseAnalysis(existingUpdateForSelectedMonth.conciseAnalysis || null);
        setPresentationMode(existingUpdateForSelectedMonth.presentationMode || "");
        const nextMetrics = existingUpdateForSelectedMonth.metrics || {};
        setMetricValues(nextMetrics);
        setSelectedMetrics(new Set(Object.keys(nextMetrics).filter((key) => METRIC_OPTION_MAP.has(key))));
        setAwakeMetricCards(
            shouldDimMetricsTemplate
                ? new Set(Object.keys(nextMetrics).filter((key) => String(nextMetrics[key] || "").trim()))
                : new Set(),
        );
        setActivePeriodKey("current");
    }, [existingUpdateForSelectedMonth, isEmailDraftBusy, resetPitchDeckUpload, resetVideoUpload, revokePitchDeckPreviewObjectUrl, selectedMonthUpdateKey, shouldDimMetricsTemplate]);

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
    const hasNoSourceForAssistedDraft = selectedInputSources.length === 0;
    const emailDraftButtonTitle = hasNoSourceForAssistedDraft
        ? "Connect one source to unlock AI drafting"
        : emailDraftActionBusy
        ? `Generating ${selectedPeriodLabel} update`
        : `Draft from ${selectedInputSourceDescription}`;
    const emailDraftButtonDescription = hasNoSourceForAssistedDraft
        ? "MLAI needs at least one approved source to generate a draft. You can also skip this and write manually."
        : emailDraftActionBusy
        ? "Contacting the MLAI backend and preparing the selected sources for drafting."
        : isSelectedMonthBeforeMinimum
            ? "Choose June 2025 or later. Older updates are not eligible for scoring or draft rewards."
        : isSelectedMonthInFuture
            ? "Choose the current month or a previous month. Future monthly updates can be drafted once that month starts."
        : canGenerateDraftFromEmail
            ? `Use ${selectedInputSourceDescription} to find key signals, metrics, wins, and asks for ${selectedPeriodLabel}, then turn them into a first draft.`
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
                                    ? isAudioMedia(videoContentType, videoOriginalFilename) ? "Audio ready" : "Video ready"
                                : null;
    const pitchDeckUploadStatusLabel =
        pitchDeckUploadStatus === "creating_session"
            ? "Preparing deck upload..."
            : pitchDeckUploadStatus === "uploading"
                ? "Uploading deck..."
                : pitchDeckUploadStatus === "finalizing"
                    ? "Finalizing deck..."
                    : pitchDeckUploadStatus === "ready"
                        ? "Deck ready"
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
    const answeredFounderQuestionCount = [highlights, challenges, learnings, next30Days, asks]
        .filter(hasMeaningfulFounderAnswer)
        .length;
    const hasMinimumFounderAnswers = answeredFounderQuestionCount >= REQUIRED_FOUNDER_QUESTION_COUNT;
    const draftProgress = getVibeRaisingDraftProgress(Boolean(updateCadence), monthConfirmed, answeredFounderQuestionCount);
    const founderQuestionRequirementText = hasMinimumFounderAnswers
        ? `${answeredFounderQuestionCount} founder questions answered.`
        : `Answer at least ${REQUIRED_FOUNDER_QUESTION_COUNT} questions before saving (${answeredFounderQuestionCount}/${REQUIRED_FOUNDER_QUESTION_COUNT} complete).`;
    const founderQuestionGateError =
        actionData?.step === "validation-error"
            ? String(actionData.error || "")
            : saveDraftFetcher.data?.step === "validation-error"
                ? String(saveDraftFetcher.data.error || "")
                : "";
    const returnToMonthSelection = useCallback(() => {
        setMonthConfirmed(false);
        setSelectedDraftStage(null);
        setMetricsConfirmed(false);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    const renderSelectedMonthSummaryCard = (className?: string) => (
        <section
            className={clsx(
                "flex min-h-[5.25rem] w-full items-center rounded-2xl border border-[var(--vr-color-border)] bg-white px-5 py-3 text-left shadow-sm sm:min-h-0 sm:px-6 sm:py-4",
                className,
            )}
            aria-label={`Selected update ${selectedPeriodName}: ${selectedPeriodLabel}`}
        >
            <div className="flex w-full min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                        <span>Selected {selectedPeriodName}</span>
                        <CardInfoTooltip info={`This update covers the selected ${selectedPeriodName}. Use Edit to choose a different reporting ${selectedPeriodName}.`} />
                    </p>
                    <p className="truncate text-base font-black text-gray-950">
                        {selectedPeriodLabel}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={returnToMonthSelection}
                    className="inline-flex min-h-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-4 py-2 text-xs font-black text-white shadow-md shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)] focus:outline-none focus:ring-4 focus:ring-[rgba(0,255,215,0.18)]"
                    aria-label={`Edit selected update ${selectedPeriodName}: ${selectedPeriodLabel}`}
                >
                    Edit
                </button>
            </div>
        </section>
    );

    // Regenerating an existing draft returns the user to the pristine GENERATE view
    // (month + source picker + "Draft from X" button) so they can re-pick sources and
    // re-run with the same generate button. Keep monthConfirmed + selectedDraftStage
    // ("reporting") so the picker and generate button stay visible; clearing
    // metricsConfirmed hides the populated template.
    const handleReturnToGenerate = useCallback(() => {
        setDismissedFeedback(true);
        resetEmailDraftUi();
        clearPersistedEmailDraftRun();
        setMetricsConfirmed(false);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    const draftStickyStatusIcon = (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
            {hasDraftTemplate ? <CheckCircleIcon className="h-5 w-5" /> : <SparklesIcon className="h-5 w-5" />}
        </div>
    );
    const draftStickyBar = (() => {
        if (!monthConfirmed) {
            return {
                statusTitle: isWeeklyUpdate ? "Select week" : "Select month",
                statusDetail: selectedPeriodLabel,
                primaryLabel: "Start draft",
                onPrimary: handleGenerateSelectedMonthUpdate,
                primaryDisabled: !hasSelectedPeriod || isSelectedMonthUnavailable || emailDraftActionBusy,
                primaryType: "button" as const,
            };
        }

        if (isAutoDrafting && !canContinueDraftManually) {
            return {
                statusTitle: showEmailWizard
                    ? "Connect Gmail to continue"
                    : emailDraftCardStatus === "failed"
                        ? "Draft generation needs attention"
                        : `Generating ${selectedPeriodLabel} update`,
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
                statusDetail: hasMinimumFounderAnswers
                    ? "Backend drafting is unavailable right now. You can still edit this update and review it when ready."
                    : founderQuestionRequirementText,
                primaryLabel: isSubmitting ? "Saving..." : "Save and review",
                primaryType: "submit" as const,
                primaryForm: DRAFT_REVIEW_FORM_ID,
                primaryDisabled: isSubmitting || !hasMinimumFounderAnswers,
                onBack: () => setMonthConfirmed(false),
            };
        }

        return {
            statusTitle: isManualOnlyDraftFlow ? "Draft template ready" : "AI draft ready",
            statusDetail: !hasMinimumFounderAnswers
                ? founderQuestionRequirementText
                : selectedMetricOptions.length > 0
                    ? `AI selected ${selectedMetricOptions.length} metric${selectedMetricOptions.length === 1 ? "" : "s"} for ${selectedPeriodLabel}.`
                    : isManualOnlyDraftFlow
                        ? undefined
                        : `AI drafted ${selectedPeriodLabel}; connected metrics are ready below.`,
            primaryLabel: isSubmitting ? "Saving..." : "Save and review",
            primaryType: "submit" as const,
            primaryForm: DRAFT_REVIEW_FORM_ID,
            primaryDisabled: isSubmitting || !hasMinimumFounderAnswers,
            onBack: () => setMonthConfirmed(false),
        };
    })();

    const regenerateSourcesAvailable = selectedInputSources.length > 0 || connectedDraftInputSources.length > 0;
    const regenerateDialogSourceLabels = (
        pendingDraftRequest?.inputSources?.length
            ? pendingDraftRequest.inputSources
            : selectedInputSources.length > 0
                ? selectedInputSources
                : connectedDraftInputSources
    ).map((key) => INPUT_SOURCE_LABELS[key]).filter(Boolean);
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
                refreshActiveRun();
                return;
            }

            if (cancelResponse.status === "cancelled" || cancelResponse.terminalState === "cancelled") {
                clearPersistedEmailDraftRun();
                setPendingEmailDraftForceRegenerate(emailDraftForceRegenerateKey);
                resetEmailDraftUi();
                // Clear the app-shell "drafting" banner right away instead of
                // waiting for its next poll cycle.
                refreshActiveRun();
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
        refreshActiveRun,
    ]);

    const stopMediaStream = useCallback(() => {
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
    }, []);

    const getRecordingErrorMessage = (error: unknown) => {
        const name = error instanceof DOMException ? error.name : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
            return "Camera or microphone permission was blocked. Allow access in your browser, then try recording again.";
        }
        if (name === "NotFoundError" || name === "DevicesNotFoundError") {
            return "No camera or microphone was found. Upload a pitch deck or video file instead.";
        }
        if (name === "SecurityError") {
            return "Recording needs a secure browser context. Try localhost/HTTPS, or upload a file instead.";
        }
        return "We couldn't access your camera or microphone. Upload a pitch deck or video file instead.";
    };

    const startRecording = useCallback(async () => {
        if (isRecording || isRecordingPermissionPending) return;
        if (typeof window === "undefined" || typeof navigator === "undefined") {
            return;
        }
        if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            setRecordingError("Recording is not supported in this browser. Upload a pitch deck or video file instead.");
            return;
        }

        try {
            setRecordingError(null);
            setIsRecordingPermissionPending(true);
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
        } catch (error) {
            setRecordingError(getRecordingErrorMessage(error));
            setIsRecording(false);
            setRecordingMode(null);
            stopMediaStream();
        } finally {
            setIsRecordingPermissionPending(false);
        }
    }, [isRecording, isRecordingPermissionPending, resetVideoUpload, stopMediaStream, uploadVideoFile]);

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
            pitchDeckUploadAbortRef.current?.abort();
            revokePitchDeckPreviewObjectUrl();
            if (mediaRecorderRef.current?.state === "recording") {
                mediaRecorderRef.current.stop();
            }
            stopMediaStream();
        };
    }, [revokePitchDeckPreviewObjectUrl, revokeVideoPreviewObjectUrl, stopMediaStream]);

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
    // Snippet/full selection for the update being saved, restricted to
    // valued metrics in catalog order (snippet keys are a subset of full).
    const displayConfigFormValue = useMemo(() => {
        const valuedKeys = VIBE_METRIC_KEYS.filter(
            (key) => String(metricValues[key] || "").trim().length > 0,
        );
        const hasExplicitStates = Object.keys(metricDisplayStates).length > 0;
        const fullMetricKeys = valuedKeys.filter(
            (key) => (metricDisplayStates[key] ?? "full") !== "hidden",
        );
        const snippetMetricKeys = hasExplicitStates
            ? valuedKeys.filter((key) => metricDisplayStates[key] === "snippet")
            : fullMetricKeys.slice(0, 4);
        return JSON.stringify({ snippetMetricKeys, fullMetricKeys });
    }, [metricValues, metricDisplayStates]);
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

    const activateActiveMetric = (key: string) => {
        if (isViewingCurrentUpdate) {
            setSelectedMetrics((previous) => {
                if (previous.has(key)) return previous;
                const next = new Set(previous);
                next.add(key);
                return next;
            });
            focusMetricInput(`active-metric-${key}`);
            return;
        }

        if (activePastIndex < 0 || !activePastCard) return;
        setPastMonthCards((previous) => previous.map((card, index) => {
            if (index !== activePastIndex || key in card.metrics) return card;
            return { ...card, metrics: { ...card.metrics, [key]: "" } };
        }));
        focusMetricInput(`active-metric-${key}`);
    };

    const coverScopeKey = `${user.authUser.id}:${resolveActiveCompanyId(user)}:${selectedYear}:${selectedMonth}`;
    const coverEditor = (
        <UpdateCoverEditor
            key={coverScopeKey}
            scopeKey={coverScopeKey}
            backendBaseUrl={backendBaseUrl}
            companyId={resolveActiveCompanyId(user) || ""}
            updateText={coverUpdateText({ summary, highlights, challenges, learnings, next30Days })}
            value={coverImage}
            onChange={(cover) => { coverEditedRef.current = true; setCoverImage(cover); }}
        />
    );

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

    const chartData: ChartData[] = [];
    const activeUsersChartData: ChartData[] = [];
    const hasRevenueChart = false;
    const hasActiveUsersChart = false;

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

    const optionalDataSourcesSection = (
        <section className="flex min-h-[5.25rem] w-full flex-col rounded-2xl border border-[var(--vr-color-border)] bg-white px-5 py-3 shadow-sm sm:min-h-0 sm:rounded-[2rem] sm:p-6">
            <div className="flex w-full min-w-0 flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="min-w-0">
                    <h2 className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 sm:text-xl sm:normal-case sm:tracking-normal sm:text-gray-950">
                        <span className="sm:hidden">Connect data</span>
                        <span className="hidden sm:inline">Connect data for AI drafting</span>
                        <CardInfoTooltip info="Connect external data sources here. You can still complete and save the update manually without them." />
                    </h2>
                    <p className="mt-2 hidden max-w-2xl text-sm leading-6 text-slate-600 sm:block">
                        The draft template works without connected data. Select a connected source only if you want MLAI to generate a source-assisted first draft.
                    </p>
                </div>

                <div className="flex w-full flex-wrap items-center justify-end gap-3 sm:ml-auto sm:w-auto sm:max-w-[50%] sm:shrink-0">
                    {compactSourcesLoading ? (
                        <ArrowPathIcon className="h-5 w-5 animate-spin text-slate-400" aria-label="Checking connections" />
                    ) : (
                        compactOptionalSources.map((source) => {
                            const selected = selectedDraftInputSources.has(source.key);
                            return (
                                <button
                                    key={source.key}
                                    type="button"
                                    onClick={() => toggleDraftInputSource(source)}
                                    className={clsx(
                                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vr-color-primary)] focus-visible:ring-offset-2",
                                        selected
                                            ? "bg-[rgba(0,255,215,0.12)] ring-1 ring-[var(--vr-color-primary)]"
                                            : "hover:bg-[rgba(0,255,215,0.08)]",
                                    )}
                                    title={`${selected ? "Remove" : "Use"} ${source.label} for source-assisted drafting`}
                                    aria-pressed={selected}
                                    aria-label={`${selected ? "Remove" : "Use"} ${source.label} for source-assisted drafting`}
                                >
                                    <DraftSourceLogo sourceKey={source.key} />
                                </button>
                            );
                        })
                    )}
                    <Link
                        to={manageConnectionsHref}
                        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:-translate-y-0.5 hover:bg-[var(--vr-palette-black)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(0,255,215,0.18)] sm:w-auto sm:min-w-48"
                    >
                        Manage connections
                    </Link>
                </div>
            </div>

            {compactSourcesError ? (
                <p className="mt-4 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
                    {compactSourcesError}
                </p>
            ) : null}
        </section>
    );

    const handlePersistDraft = useCallback(() => {
        const draftForm = document.getElementById(DRAFT_REVIEW_FORM_ID);
        if (!(draftForm instanceof HTMLFormElement)) return;
        const nextFormData = new FormData(draftForm);
        nextFormData.set("intent", "save-draft");
        saveDraftFetcher.submit(nextFormData, { method: "post" });
    }, [saveDraftFetcher]);

    const mlaiGenerateUpdateBrand = (
        <>
            <style>{`
                body:has(.mlai-vibe-update) {
                    --vr-color-app-bg: #f5f0e6;
                    background: #f5f0e6;
                }
                .mlai-vibe-update {
                    --vr-font-title: 'Oswald', 'Arial Narrow', sans-serif;
                    --vr-font-body: 'Roboto', system-ui, sans-serif;
                    --vr-color-primary: #1a1a1a;
                    --vr-color-primary-contrast: #f5f0e6;
                    --vr-color-text: #1a1a1a;
                    --vr-color-border: #d7cfbf;
                    --vr-palette-paper: #f5f0e6;
                    --vr-palette-black: #1a1a1a;
                    --vr-palette-orange: #ff3c00;
                    --vr-palette-coral: #ff3c00;
                    background: #f5f0e6;
                    color: #1a1a1a;
                    font-family: 'Roboto', system-ui, sans-serif;
                }
                .mlai-vibe-update :is(h1, h2, h3, h4) {
                    font-family: 'Oswald', 'Arial Narrow', sans-serif;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    line-height: 0.96;
                    text-transform: uppercase;
                }
                .mlai-vibe-update h2 { font-size: clamp(1.5rem, 2.4vw, 2rem); }
                .mlai-vibe-update h3 { font-size: clamp(1.2rem, 1.7vw, 1.5rem); }
                .mlai-vibe-update :is(button, [role="button"]) {
                    font-family: 'Oswald', 'Arial Narrow', sans-serif;
                    font-weight: 700;
                    letter-spacing: 0.025em;
                    text-transform: uppercase;
                }
                .mlai-vibe-update :is(input, textarea, select) {
                    font-family: 'Roboto', system-ui, sans-serif;
                    font-size: 0.9375rem;
                    line-height: 1.5;
                }
                .mlai-vibe-update [class*="shadow"] { box-shadow: none !important; }
                .mlai-vibe-update__identity {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 1.5rem;
                    border-radius: 28px;
                    background: #1a1a1a;
                    color: #f5f0e6;
                    padding: clamp(1.5rem, 3vw, 2.5rem);
                }
                .mlai-vibe-update__kicker {
                    position: relative;
                    z-index: 1;
                    margin: 0;
                    font-family: 'Roboto', system-ui, sans-serif;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                }
                .mlai-vibe-update__kicker { color: #00ffd7; }
                .mlai-vibe-update__graphic {
                    position: relative;
                    z-index: 1;
                    flex: 0 0 auto;
                    width: clamp(9rem, 17vw, 13rem);
                    height: clamp(7rem, 13vw, 9.5rem);
                }
                .mlai-vibe-update__graphic-block,
                .mlai-vibe-update__graphic-dot {
                    position: absolute;
                    display: block;
                }
                .mlai-vibe-update__graphic-block {
                    bottom: 0;
                    border-radius: 1.15rem 1.15rem 0.25rem 0.25rem;
                }
                .mlai-vibe-update__graphic-block--one {
                    left: 0;
                    width: 28%;
                    height: 39%;
                    background: #00ffd7;
                }
                .mlai-vibe-update__graphic-block--two {
                    left: 34%;
                    width: 28%;
                    height: 64%;
                    background: #f5f0e6;
                }
                .mlai-vibe-update__graphic-block--three {
                    right: 0;
                    width: 31%;
                    height: 91%;
                    background: #ff3c00;
                }
                .mlai-vibe-update__graphic-dot {
                    top: 0;
                    left: 42%;
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 999px;
                    background: #00ffd7;
                }
                .mlai-vibe-update__title {
                    position: relative;
                    z-index: 1;
                    margin: 0.5rem 0 0;
                    color: #f5f0e6;
                    font-family: 'Oswald', 'Arial Narrow', sans-serif;
                    font-size: clamp(2.5rem, 7vw, 4.5rem);
                    font-weight: 700;
                    letter-spacing: -0.025em;
                    line-height: 0.86;
                    text-transform: uppercase;
                }
                .mlai-vibe-update__subtitle {
                    position: relative;
                    z-index: 1;
                    max-width: 38rem;
                    margin: 0.85rem 0 0;
                    color: #ebe4d4;
                    font-size: 0.95rem;
                    font-weight: 500;
                    line-height: 1.5;
                }
                @media (max-width: 640px) {
                    .mlai-vibe-update__identity { align-items: flex-start; flex-direction: column; gap: 1rem; }
                    .mlai-vibe-update__graphic { width: 8rem; height: 6rem; }
                }
            `}</style>
            <header className="mlai-vibe-update__identity">
                <div>
                    <p className="mlai-vibe-update__kicker">MLAI / Founder Tools</p>
                    <h1 className="mlai-vibe-update__title">Vibe Raising</h1>
                    <p className="mlai-vibe-update__subtitle">Founder update studio for sharing progress with MLAI.</p>
                </div>
                <div className="mlai-vibe-update__graphic" aria-hidden="true">
                    <span className="mlai-vibe-update__graphic-block mlai-vibe-update__graphic-block--one" />
                    <span className="mlai-vibe-update__graphic-block mlai-vibe-update__graphic-block--two" />
                    <span className="mlai-vibe-update__graphic-block mlai-vibe-update__graphic-block--three" />
                    <span className="mlai-vibe-update__graphic-dot" />
                </div>
            </header>
        </>
    );
    // 1. Feedback View — preview-dominant with rating sidebar
    const reviewActionData = activeReviewActionData?.step === "feedback" || activeReviewActionData?.step === "publish-error"
        ? activeReviewActionData
        : actionData;

    if ((reviewActionData?.step === "feedback" || reviewActionData?.step === "publish-error") && !dismissedFeedback) {
        const { data } = reviewActionData;
        const sendError = reviewActionData.step === "publish-error" ? String((reviewActionData as any).error || "") : "";
        const reviewData = data as any;
        const reviewAnsweredFounderQuestionCount = FOUNDER_QUESTION_FIELDS
            .filter((field) => hasMeaningfulFounderAnswer(reviewData?.[field]))
            .length;
        const canSubmitReviewToMlai = reviewAnsweredFounderQuestionCount >= REQUIRED_FOUNDER_QUESTION_COUNT && Boolean(reviewData?.revisionId && reviewData?.revisionHash);
        const rawReviewDraftId = String(reviewData?.draftId || reviewActionData?.update?.id || "").trim();
        const reviewDraftId = BACKEND_DRAFT_ID_PATTERN.test(rawReviewDraftId) ? rawReviewDraftId : "";
        const reviewMonth = String(reviewData?.month || selectedMonth);
        const reviewYear = Number(reviewData?.year || selectedYear);
        const reviewSummary = String(reviewData?.summary || "").trim();
        const reviewSourceUrl = String(reviewData?.sourceUrl || "").trim();
        const reviewPitchDeckUrl = String(reviewData?.pitchDeckUrl || "").trim();
        const reviewPitchDeckContentType = String(reviewData?.pitchDeckContentType || "").trim();
        const reviewPitchDeckOriginalFilename = String(reviewData?.pitchDeckOriginalFilename || "").trim();
        const reviewPitchDeckSummary = String(reviewData?.pitchDeckSummary || "").trim();
        const reviewPitchDeckFileSizeBytes = Number(reviewData?.pitchDeckFileSizeBytes || 0) || null;
        const reviewPitchDeckPreviewUrl = pitchDeckPreviewUrl || reviewPitchDeckUrl || uploadedPitchDeckUrl;
        const reviewPitchDeckOpenUrl = reviewPitchDeckUrl || uploadedPitchDeckUrl || pitchDeckPreviewUrl;
        const hasReviewPitchDeck = Boolean(reviewPitchDeckPreviewUrl);
        const reviewFinancialSnapshot = normalizeFinancialSnapshot(
            reviewData && Object.hasOwn(reviewData, "financialSnapshot") ? reviewData.financialSnapshot :
            reviewData && Object.hasOwn(reviewData, "financial_snapshot") ? reviewData.financial_snapshot :
            reviewActionData?.update && Object.hasOwn(reviewActionData.update, "financialSnapshot") ? reviewActionData.update.financialSnapshot :
            financialSnapshot,
        );
        const reviewConciseAnalysis = normalizeConciseAnalysis(
            reviewData?.conciseAnalysis ||
            reviewData?.concise_analysis ||
            reviewActionData?.update?.conciseAnalysis ||
            conciseAnalysis,
        );
        const reviewFounderProfiles = parseFounderProfilesFormValue(reviewData?.founderProfiles ?? null);
        const reviewFounderProfilesForDisplay = uniqueFounderProfiles([
            ...reviewFounderProfiles,
            ...founderProfilesForSave,
            ...(activeUserCompany?.founderProfiles || []),
            ...(user.founderProfiles || []),
        ]);
        const reviewFounderLinkedInProfiles = reviewFounderProfilesForDisplay.filter((profile) => String(profile.linkedinUrl || "").trim());
        const reviewCompanyLinkedInUrl = String(activeUserCompany?.companyLinkedInUrl || "").trim();
        const hasReviewLinkedIn =
            reviewFounderLinkedInProfiles.length > 0 ||
            Boolean(reviewCompanyLinkedInUrl) ||
            missingFounderLinkedInDrafts.some((draft) => String(draft.linkedinUrl || "").trim());
        const reviewLinkedInDrafts =
            missingFounderLinkedInDrafts.length > 0
                ? missingFounderLinkedInDrafts
                : founderProfiles.length > 0
                    ? founderProfiles.map((profile, index) => ({
                        id: `review-${index}-${profile.name}`,
                        sourceIndex: index,
                        name: profile.name,
                        linkedinUrl: profile.linkedinUrl || "",
                    }))
                    : [{
                        id: "review-founder-0",
                        sourceIndex: 0,
                        name: user.fullName || "Founder",
                        linkedinUrl: "",
                    }];
        const reviewCover = normalizeUpdateCover(reviewActionData?.update?.coverImage ?? reviewData?.coverImage);
        const reviewVideoUrl = String(reviewData?.videoUrl || videoPreviewUrl || "").trim();
        const reviewVideoContentType = String(reviewData?.videoContentType || videoContentType || "").trim();
        const reviewVideoOriginalFilename = String(reviewData?.videoOriginalFilename || videoOriginalFilename || "").trim();
        const reviewVideoFileSizeBytes = Number(reviewData?.videoFileSizeBytes || videoFileSizeBytes || 0) || null;
        const reviewMediaIsAudio = isAudioMedia(reviewVideoContentType, reviewVideoOriginalFilename || reviewVideoUrl);
        const reviewPitchDeckLabel = reviewPitchDeckOriginalFilename || pitchDeckOriginalFilename || "Pitch deck file";
        const reviewVideoLabel = reviewVideoOriginalFilename || (reviewMediaIsAudio ? "Founder voice note" : "Founder walkthrough");
        const selectedFinancialSurveySourceKeys = FINANCIAL_METRIC_SOURCE_KEYS
            .filter((sourceKey) => selectedDraftInputSources.has(sourceKey));
        const financialSurveyQuestion = buildVibeRaisingFinancialSurveyQuestion(selectedFinancialSurveySourceKeys);
        const endOfFlowSurveyQuestions = [financialSurveyQuestion, ...END_OF_FLOW_SURVEY_CORE_QUESTIONS];
        const handleReviewStepperClick = (step: MonthlyUpdateStepKey) => {
            if (step === "connect") {
                goToConnectDataStep();
                return;
            }

            if (step === "draft") {
                setDismissedFeedback(true);
                return;
            }

            if (step === "review") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            if (step === "publish" && canSubmitReviewToMlai && !isSubmitting) {
                handleSendToMlai();
            }
        };

        const handleSendToMlai = () => {
            setEndOfFlowSurveyStep(0);
            setShowSendToMlaiConfirmation(true);
        };

        const reviewAudienceVisibility = normalizeAudienceVisibilityValue(reviewData?.audienceVisibility);
        const handleConfirmSendToMlai = () => {
            const sendForm = document.getElementById(SEND_TO_MLAI_FORM_ID);
            if (!(sendForm instanceof HTMLFormElement)) return;

            const formData = new FormData(sendForm);
            submit(formData, {
                method: "post",
                action: `${location.pathname}${location.search || ""}`,
            });
        };
        const activeSurveyQuestion = endOfFlowSurveyQuestions[endOfFlowSurveyStep] ?? null;
        const isSurveyCommentsStep = endOfFlowSurveyStep === END_OF_FLOW_SURVEY_STEP_COUNT - 1;

        return (
            <VibeRaisingWorkflowLayout
                activeStep={showSendToMlaiConfirmation ? "publish" : "review"}
                completedSteps={showSendToMlaiConfirmation ? ["draft", "connect", "review"] : ["draft", "connect"]}
                enabledSteps={isSubmitting || showSendToMlaiConfirmation ? [] : canSubmitReviewToMlai ? ["draft", "connect", "review", "publish"] : ["draft", "connect", "review"]}
                onStepClick={handleReviewStepperClick}
                progress={{ review: hasReviewedFeedbackPreference ? 0.75 : 0.4, publish: showSendToMlaiConfirmation ? 0.15 + endOfFlowSurveyStep * 0.2 + (endOfFlowSurveyComments.trim() ? 0.05 : 0) : 0 }}
                details={{
                    draft: `${reviewAnsweredFounderQuestionCount} questions answered`,
                    connect: selectedDraftInputSources.size ? "Sources selected" : "Skipped · optional",
                    review: showSendToMlaiConfirmation ? "Preview checked" : "Check the saved preview and audience",
                    publish: showSendToMlaiConfirmation ? "Confirm this revision" : "Founder approval",
                }}
            >
            <div className="mlai-vibe-update mx-auto max-w-6xl space-y-10 rounded-[32px] bg-[#f5f0e6] px-4 pb-32 sm:px-6">
                {mlaiGenerateUpdateBrand}
                <Form id={SEND_TO_MLAI_FORM_ID} method="POST" className="hidden">
                    <input type="hidden" name="intent" value="publish" />
                    {reviewDraftId ? <input type="hidden" name="draftId" value={reviewDraftId} /> : null}
                    {reviewAudienceVisibility.map((audience) => (
                        <input key={audience} type="hidden" name="audienceVisibility" value={audience} />
                    ))}
                    <input type="hidden" name="month" value={reviewMonth} />
                    <input type="hidden" name="year" value={reviewYear} />
                    {Object.entries(reviewData || {})
                        .filter(([key, value]) => (
                            ![
                                "intent",
                                "draftId",
                                "audienceVisibility",
                                "month",
                                "year",
                                "mlaiFeedbackOptIn",
                                "submissionDestination",
                                "surveyFinancialQuestionContext",
                                "surveyImportedMetricsUseful",
                                "surveyConnectorValueClear",
                                "surveyGuidedQuestionsUseful",
                                "surveyPreviewAccurate",
                                "surveyComments",
                            ].includes(key) &&
                            (typeof value === "string" || typeof value === "number" || typeof value === "boolean")
                        ))
                        .map(([key, value]) => (
                            <input key={key} type="hidden" name={key} value={String(value)} />
                        ))}
                </Form>

                <div className="rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5">
                    <div className="min-w-0">
                        <h2 className="text-lg font-black text-gray-950">Approve this update</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Review the saved content and audience before approving this revision.
                        </p>
                        {!canSubmitReviewToMlai ? (
                            <p className="mt-3 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
                                Answer at least {REQUIRED_FOUNDER_QUESTION_COUNT} founder questions before sending this update. You currently have {reviewAnsweredFounderQuestionCount}.
                            </p>
                        ) : null}
                    </div>

                    <p className="mt-4 font-semibold">Audience: {reviewAudienceVisibility.includes("community") ? "Community" : "Just for me"}. Return to the draft to change this choice and review a new revision.</p>
                </div>

                {/* Main layout: founder preview. AI grading/feedback is hidden for now. */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-start">

                    {/* PREVIEW — dominant, takes most of the width */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {reviewCover ? <img src={reviewCover.url} alt={reviewCover.alt || ""} className="aspect-[16/9] w-full object-cover" /> : null}
                            {/* Hero banner */}
                            <div className="relative w-full h-24 overflow-hidden sm:h-32">
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--vr-palette-teal)_0%,var(--vr-palette-mint)_100%)]" />
                                <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 800 200">
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
                                                <span className="text-base font-bold text-white">{user.companyName.charAt(0)}</span>
                                            </div>
                                        )}
                                        <div className="flex min-w-0 flex-col justify-center">
                                            <p className="truncate [font-family:var(--vr-font-title)] text-3xl font-black uppercase leading-none tracking-normal text-white drop-shadow-sm sm:text-4xl">
                                                {user.companyName}
                                            </p>
                                            <p className="mt-1 truncate [font-family:var(--vr-font-title)] text-sm font-black uppercase leading-none tracking-normal text-white/85 drop-shadow-sm sm:text-lg">
                                                {reviewMonth} {reviewYear} Update
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview header */}
                            <div className="border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <StartupRegionBadge location={user.location} />
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewLinkedInPopup(true)}
                                        className={clsx(
                                            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black shadow-sm ring-1 transition",
                                            hasReviewLinkedIn
                                                ? "bg-[#0A66C2] text-white ring-[#0A66C2]/20 hover:bg-[#084f96]"
                                                : "bg-gray-100 text-gray-400 ring-gray-200 hover:bg-gray-200 hover:text-gray-600",
                                        )}
                                        aria-label={hasReviewLinkedIn ? "Edit founder LinkedIn" : "Add founder LinkedIn"}
                                    >
                                        LinkedIn
                                        {hasReviewLinkedIn ? (
                                            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                                        ) : null}
                                    </button>
                                </div>
                            </div>

                            <ReportingEvidenceNotice period={reviewActionData?.update?.reportingPeriod} warnings={reviewActionData?.update?.evidenceWarnings} />
                            {reviewFinancialSnapshot ? (
                                <FinancialChartsSection snapshot={reviewFinancialSnapshot} analysis={reviewConciseAnalysis} />
                            ) : null}

                            {hasReviewPitchDeck ? (
                                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-6 sm:py-5">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="mb-3">
                                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-color-primary)]">
                                                    Pitch deck
                                                </p>
                                            </div>
                                            <div className="rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-4 sm:hidden">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)]">
                                                        <CloudArrowUpIcon className="h-5 w-5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-black text-gray-950">Pitch deck attached</p>
                                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                                            {reviewPitchDeckLabel}{formatFileSize(reviewPitchDeckFileSizeBytes || pitchDeckFileSizeBytes) ? ` · ${formatFileSize(reviewPitchDeckFileSizeBytes || pitchDeckFileSizeBytes)}` : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block">
                                                <PitchDeckAssetPreview
                                                    src={reviewPitchDeckPreviewUrl}
                                                    openUrl={reviewPitchDeckOpenUrl}
                                                    contentType={reviewPitchDeckContentType || pitchDeckContentType}
                                                    fileName={reviewPitchDeckOriginalFilename || pitchDeckOriginalFilename}
                                                    fileSizeBytes={reviewPitchDeckFileSizeBytes || pitchDeckFileSizeBytes}
                                                />
                                            </div>
                                        </div>
                                        {reviewVideoUrl ? (
                                            <div>
                                                <div className="mb-3">
                                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-palette-coral)]">
                                                        {reviewMediaIsAudio ? "Voice note" : "Walkthrough video"}
                                                    </p>
                                                    <h4 className="mt-1 text-base font-black text-gray-950">
                                                        Founder {reviewMediaIsAudio ? "audio" : "video"} preview
                                                    </h4>
                                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                                        This {reviewMediaIsAudio ? "voice note" : "video"} will appear with the deck so MLAI can understand the story directly.
                                                    </p>
                                                </div>
                                                <div className="rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-4 sm:hidden">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(242,114,63,0.10)] text-[var(--vr-palette-coral)]">
                                                            <CloudArrowUpIcon className="h-5 w-5" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-black text-gray-950">{reviewMediaIsAudio ? "Voice note attached" : "Walkthrough video attached"}</p>
                                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                                {reviewVideoLabel}{formatFileSize(reviewVideoFileSizeBytes) ? ` · ${formatFileSize(reviewVideoFileSizeBytes)}` : ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block overflow-hidden rounded-2xl border border-[var(--vr-color-border)] bg-black">
                                                    <VideoAssetPreview
                                                        src={reviewVideoUrl}
                                                        contentType={reviewVideoContentType}
                                                        fileName={reviewVideoOriginalFilename || reviewVideoUrl}
                                                        fileSizeBytes={reviewVideoFileSizeBytes}
                                                        className="aspect-video w-full rounded-none"
                                                    />
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ) : (
                                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-6">
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                                        {(() => {
                                            const metricRecord = (((data as any)?.metrics || data) as Record<string, string>) || {};
                                            const selectedReviewKeys = String((data as any)?.metricKeys || "")
                                                .split(",")
                                                .map((key) => key.trim())
                                                .filter((key) => hasDisplayableMetricValue(metricRecord[key] ?? (data as any)?.[key]));
                                            const options = selectedReviewKeys.length > 0
                                                ? metricOptionsFromKeys(selectedReviewKeys)
                                                : getMetricOptionsForDisplay(metricRecord);
                                            return options.map(m => {
                                            const val = (data as any)?.[m.key] || (data as any)?.metrics?.[m.key];
                                            if (!hasDisplayableMetricValue(val)) return null;
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
                            )}

                            {!hasReviewPitchDeck && reviewVideoUrl ? (
                                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-6 sm:py-5">
                                    <div className="mb-3">
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-palette-coral)]">
                                            {reviewMediaIsAudio ? "Voice note" : "Walkthrough video"}
                                        </p>
                                        <h4 className="mt-1 text-base font-black text-gray-950">
                                            Founder {reviewMediaIsAudio ? "audio" : "video"} preview
                                        </h4>
                                    </div>
                                    <div className="rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-4 sm:hidden">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(242,114,63,0.10)] text-[var(--vr-palette-coral)]">
                                                <CloudArrowUpIcon className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-black text-gray-950">{reviewMediaIsAudio ? "Voice note attached" : "Walkthrough video attached"}</p>
                                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                                    {reviewVideoLabel}{formatFileSize(reviewVideoFileSizeBytes) ? ` · ${formatFileSize(reviewVideoFileSizeBytes)}` : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block overflow-hidden rounded-2xl border border-[var(--vr-color-border)] bg-black">
                                        <VideoAssetPreview
                                            src={reviewVideoUrl}
                                            contentType={reviewVideoContentType}
                                            fileName={reviewVideoOriginalFilename || reviewVideoUrl}
                                            fileSizeBytes={reviewVideoFileSizeBytes}
                                            className="aspect-video w-full rounded-none"
                                        />
                                    </div>
                                </div>
                            ) : null}

                            {/* Content sections */}
                            <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
                                <ReviewSummaryBlock summary={reviewSummary} sourceUrl={reviewSourceUrl} />
                                <ReviewPreviewSection
                                    label="Key Highlights"
                                    text={(data as any)?.highlights}
                                />
                                <ReviewPreviewSection
                                    label="Challenges"
                                    text={(data as any)?.challenges}
                                />
                                <ReviewPreviewSection
                                    label="Learnings"
                                    text={(data as any)?.learnings}
                                />
                                <ReviewPreviewSection
                                    label="Next 30 Days"
                                    text={(data as any)?.next30Days}
                                />
                                <ReviewPreviewSection
                                    label="Support request"
                                    text={(data as any)?.asks}
                                />
                            </div>
                        </div>

                        {/* Revenue chart + Past month previews */}
                        {!reviewFinancialSnapshot && !hasReviewPitchDeck && (() => {
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

                            const hasRevenue = reviewChartData.some(r => r.value > 0);

                            return (
                                <>
                                    {hasRevenue && (
                                        <div className="mt-4 hidden grid-cols-1 gap-4 sm:grid">
                                            <GrowthChart
                                                data={reviewChartData}
                                                onSelect={() => {}}
                                                title="Revenue"
                                                subtitle="Monthly revenue with MoM growth"
                                                formatter={formatCompact}
                                            />
                                        </div>
                                    )}
                                    {pastMonths.length > 0 && (
                                        <div className="mt-4 hidden space-y-2 sm:block">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Previous Updates</p>
                                            {pastMonths.map((pm, i) => (
                                                <PastMonthPreviewCard key={i} pm={pm} />
                                            ))}
                                        </div>
                                    )}
                                </>
                            );
                        })()}

                        <div className="mt-6 rounded-xl border border-[rgba(0,255,215,0.24)] bg-[rgba(0,255,215,0.10)] p-4">
                            <p className="text-sm font-semibold text-[var(--vr-color-text)]">
                                This update is saved privately in <Link to="/founder-tools/drafts" className="font-black text-[var(--vr-color-primary)] hover:text-[var(--vr-palette-black)]">My Drafts</Link> until you send it to MLAI.
                            </p>
                        </div>

                    </div>

                    {showReviewLinkedInPopup ? (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <div
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                                onClick={() => setShowReviewLinkedInPopup(false)}
                                aria-hidden
                            />
                            <section
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="review-linkedin-popup-title"
                                className="relative z-[110] w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--vr-color-card)] shadow-2xl"
                            >
                                <div className="flex items-start justify-between gap-4 border-b border-[var(--vr-color-border)] px-6 pb-4 pt-6">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0A66C2]">
                                            Founder LinkedIn
                                        </p>
                                        <h2 id="review-linkedin-popup-title" className="mt-2 text-xl font-black leading-tight text-[var(--vr-color-text)]">
                                            Add a founder LinkedIn link
                                        </h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewLinkedInPopup(false)}
                                        className="flex-shrink-0 rounded-full p-2 text-[var(--vr-color-text-sub)] transition hover:bg-[var(--vr-color-neutral-100)] hover:text-[var(--vr-color-text)]"
                                        aria-label="Close founder LinkedIn popup"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 px-6 py-6">
                                    <p className="text-sm leading-6 text-[var(--vr-color-text-mid)]">
                                        A founder LinkedIn link gives MLAI useful company context. Add or update it here and it will be saved with this update.
                                    </p>
                                    {reviewLinkedInDrafts.map((draft) => (
                                        <label key={draft.id} className="block">
                                            <span className="mb-2 block text-sm font-black text-gray-950">{draft.name || "Founder"}</span>
                                            <input
                                                type="url"
                                                inputMode="url"
                                                value={draft.linkedinUrl}
                                                onChange={(event) => {
                                                    const nextValue = event.target.value;
                                                    setMissingFounderLinkedInDrafts((current) => {
                                                        if (current.some((item) => item.id === draft.id)) {
                                                            return current.map((item) =>
                                                                item.id === draft.id ? { ...item, linkedinUrl: nextValue } : item,
                                                            );
                                                        }
                                                        return [
                                                            ...current,
                                                            {
                                                                id: draft.id,
                                                                sourceIndex: draft.sourceIndex,
                                                                name: draft.name || "Founder",
                                                                linkedinUrl: nextValue,
                                                            },
                                                        ];
                                                    });
                                                }}
                                                placeholder="https://www.linkedin.com/in/founder"
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/10"
                                            />
                                        </label>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewLinkedInPopup(false)}
                                        className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#0A66C2] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#0A66C2]/10 transition hover:bg-[#084f96] active:scale-[0.98]"
                                    >
                                        Save LinkedIn
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewLinkedInPopup(false)}
                                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-[var(--vr-color-border)] bg-white px-5 py-3.5 text-sm font-extrabold text-[var(--vr-color-text)] transition hover:border-[var(--vr-color-primary)] hover:text-[var(--vr-color-primary)] active:scale-[0.98]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </section>
                        </div>
                    ) : null}


                </div>

                <VibeRaisingStickyStepBar
                    alignToContent
                    hideStatus
                    compactOnMobile
                    statusTitle={`Review ${reviewMonth} ${reviewYear} update`}
                    onBack={() => setDismissedFeedback(true)}
                    primaryLabel={isSubmitting ? "Sending..." : "Approve update"}
                    mobilePrimaryLabel={isSubmitting ? "Sending..." : "Approve update"}
                    primaryDisabled={isSubmitting || !canSubmitReviewToMlai}
                    onPrimary={handleSendToMlai}
                />

                {sendError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800 shadow-sm">
                        {sendError}
                    </div>
                ) : null}

                {showSendToMlaiConfirmation ? (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/70 p-4">
                        <section role="dialog" aria-modal="true" aria-labelledby="publication-confirmation" className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
                            <h2 id="publication-confirmation" className="text-2xl font-bold">Approve this monthly update?</h2>
                            <p className="mt-4">This approves the exact saved revision shown in the preview for {reviewAudienceVisibility.includes("community") ? "the community" : "your private archive"}.</p>
                            <div className="mt-6 flex gap-4">
                                <button type="button" onClick={() => setShowSendToMlaiConfirmation(false)} className="rounded border px-4 py-3">Back to review</button>
                                <button type="button" onClick={handleConfirmSendToMlai} disabled={isSubmitting || !reviewData?.revisionId} className="rounded bg-teal-700 px-4 py-3 font-bold text-white disabled:opacity-50">{isSubmitting ? "Publishing…" : "Approve this revision"}</button>
                            </div>
                        </section>
                    </div>
                ) : null}
            </div>
            </VibeRaisingWorkflowLayout>
        );
    }

    if (!isEdit && updateCadence === null) {
        const cadenceOptions: Array<{
            value: UpdateCadence;
            title: string;
            description: string;
            badge?: string;
            accentClassName: string;
        }> = [
            {
                value: "monthly",
                title: "Monthly",
                description: "Share a fuller progress update once each month.",
                accentClassName: "bg-[var(--vr-palette-black)] text-[var(--vr-palette-paper)]",
            },
            {
                value: "weekly",
                title: "Weekly",
                description: "Create a shorter update every week through the Victor AI experience.",
                badge: "Victor AI-only",
                accentClassName: "bg-[var(--vr-palette-orange)] text-white",
            },
        ];

        return (
            <VibeRaisingWorkflowLayout activeStep="draft" progress={{ draft: 0 }} details={{ draft: "Choose monthly or weekly" }}>
            <div className="mlai-vibe-update mx-auto w-full max-w-6xl space-y-8 rounded-[32px] bg-[#f5f0e6] px-4 pb-24 sm:px-6 sm:pb-8">
                {mlaiGenerateUpdateBrand}
                <section className="w-full rounded-[2rem] border border-[var(--vr-color-border)] bg-white p-5 sm:p-8 lg:p-10">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-palette-orange)]">
                        Before you start
                    </p>
                    <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
                        How often do you want to update?
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-600 sm:text-base sm:leading-7">
                        Choose the cadence that matches how often you want to share progress with MLAI.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {cadenceOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    setUpdateCadence(option.value);
                                    if (option.value === "weekly" && selectedWeekOption) {
                                        handleWeekChange(selectedWeekOption);
                                    }
                                }}
                                className="group flex min-h-48 w-full flex-col items-start justify-between rounded-[1.75rem] border-2 border-[var(--vr-palette-black)] bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#1a1a1a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(255,60,0,0.24)]"
                                aria-label={`Choose ${option.title.toLowerCase()} updates`}
                            >
                                <span className={clsx(
                                    "inline-flex h-12 min-w-12 items-center justify-center rounded-full px-4 text-sm font-black uppercase tracking-[0.12em]",
                                    option.accentClassName,
                                )}>
                                    {option.value === "monthly" ? "M" : "W"}
                                </span>
                                <span className="mt-8 block">
                                    <span className="flex flex-wrap items-center gap-3">
                                        <span className="block text-3xl font-black text-gray-950">{option.title}</span>
                                        {option.badge ? (
                                            <span className="rounded-full border border-[var(--vr-palette-orange)] bg-[rgba(255,60,0,0.10)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--vr-palette-orange)]">
                                                {option.badge}
                                            </span>
                                        ) : null}
                                    </span>
                                    <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">
                                        {option.description}
                                    </span>
                                </span>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--vr-palette-orange)]">
                                    Continue
                                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
            </VibeRaisingWorkflowLayout>
        );
    }

    // 3. Create/Edit Form View
    return (
        <VibeRaisingWorkflowLayout
            activeStep="draft"
            panelRef={draftStepperRef}
            enabledSteps={isEdit ? ["draft"] : ["draft", "connect"]}
            onStepClick={handleDraftStepperClick}
            progress={{ draft: draftProgress, connect: selectedDraftInputSources.size ? 1 : connectedDraftInputSources.length ? 0.5 : 0 }}
            details={{
                draft: monthConfirmed ? `${answeredFounderQuestionCount} of 5 answered · 3 required` : `Choose your ${selectedPeriodName}`,
                connect: selectedDraftInputSources.size ? `${selectedDraftInputSources.size} source${selectedDraftInputSources.size === 1 ? "" : "s"} selected` : "Optional inputs",
            }}
        >
        <div
            className={clsx(
                "mlai-vibe-update mx-auto w-full max-w-6xl space-y-4 rounded-[32px] bg-[#f5f0e6] px-4 pb-32 sm:space-y-10 sm:px-6",
            )}
        >
            {mlaiGenerateUpdateBrand}
            {!isEdit && updateCadence ? (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-3 sm:px-5">
                    <p className="text-sm font-semibold text-slate-600">
                        Update cadence:{" "}
                        <strong className="font-black text-gray-950">
                            {updateCadence === "monthly" ? "Monthly" : "Weekly - Victor AI-only"}
                        </strong>
                    </p>
                    <button
                        type="button"
                        onClick={() => setUpdateCadence(null)}
                        className="text-sm font-black text-[var(--vr-palette-orange)] underline decoration-2 underline-offset-4 transition hover:text-[var(--vr-palette-black)]"
                    >
                        Change
                    </button>
                </div>
            ) : null}
            {!monthConfirmed ? (
            <section>
                <div className="space-y-4">
                        <div ref={monthSelectorRef} className="space-y-3">
                            <div className="hidden sm:block">
                                <h2 className="text-3xl font-black tracking-tight text-gray-950">
                                    {isWeeklyUpdate ? "Select week" : "Select month"}
                                </h2>
                            </div>
                            <div className="overflow-visible rounded-[2rem] border border-[var(--vr-color-border)] bg-white p-5 shadow-sm transition-all sm:p-8 lg:p-10">
                                <div className="grid gap-4">
                                    <div>
                                        <div className="rounded-3xl bg-white p-4 shadow-sm sm:p-5">
                                            <p className="mb-5 max-w-2xl text-sm font-semibold leading-6 text-slate-600 sm:text-base sm:leading-7">
                                                {isWeeklyUpdate
                                                    ? "Select the Monday–Sunday period this Victor AI update covers. Choose the current week or catch up on one of the three previous weeks."
                                                    : monthSelectionCaption}
                                            </p>
                                            {isWeeklyUpdate ? (
                                                <WeeklyUpdateTabs
                                                    options={createStepWeekOptions}
                                                    selectedKey={selectedWeekKey}
                                                    onSelect={handleWeekChange}
                                                    isDateEditable={!isEmailDraftBusy}
                                                />
                                            ) : (
                                                <MonthYearTabs
                                                    month={selectedMonth}
                                                    year={selectedYear}
                                                    onMonthChange={setSelectedMonth}
                                                    onYearChange={setSelectedYear}
                                                    onPeriodChange={setActivePeriodKey}
                                                    monthChoices={createStepVisibleMonthOptions}
                                                    isDateEditable={!isEmailDraftBusy}
                                                />
                                            )}
                                            <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
                                                {isWeeklyUpdate
                                                    ? "Weekly updates are created through Victor AI only."
                                                    : "20 Roo Points are awarded only for updates from the last 3 months."}
                                            </p>
                                            {!isWeeklyUpdate && !isEdit && !showAllCreateStepMonths ? (
                                                <div className="mt-5 hidden items-center gap-3 text-sm font-semibold text-[var(--vr-color-primary)] sm:flex">
                                                    <span className="text-[var(--vr-color-primary)]">Need an older month?</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAllCreateStepMonths(true)}
                                                        className="font-black underline underline-offset-4 transition hover:text-[var(--vr-palette-black)]"
                                                    >
                                                        View all months
                                                    </button>
                                                </div>
                                            ) : null}
                                            {!isWeeklyUpdate && isSelectedMonthBeforeMinimum ? (
                                                <p className="mt-3 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
                                                    Updates before June 2025 are not eligible for scoring or draft rewards.
                                                </p>
                                            ) : null}
                                            {!isWeeklyUpdate && isSelectedMonthInFuture && (
                                                <p className="mt-3 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
                                                    Future monthly updates can be generated once that month starts.
                                                </p>
                                            )}
                                            {!isWeeklyUpdate && existingUpdateForSelectedMonth && !isSelectedMonthUnavailable && (
                                                <p className="mt-3 rounded-xl border border-[rgba(0,128,128,0.18)] bg-[rgba(0,255,215,0.12)] px-4 py-3 text-sm font-medium text-[var(--vr-color-primary)]">
                                                    An update already exists for {selectedMonthLabel}. Generate a new private revision from the selected sources, then review it before replacing the published update.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={!hasSelectedPeriod || isSelectedMonthUnavailable || emailDraftActionBusy}
                                        onClick={() => {
                                            handleGenerateSelectedMonthUpdate();
                                        }}
                                        onTouchStart={handleGenerateDraftCardTouchStart}
                                        onTouchEnd={handleGenerateDraftCardTouchEnd}
                                        className={clsx(
                                            "group flex w-full flex-col justify-between rounded-3xl border px-5 py-5 text-left shadow-sm transition [touch-action:pan-y] focus:outline-none focus:ring-4 sm:hidden",
                                            !hasSelectedPeriod || isSelectedMonthUnavailable || emailDraftActionBusy
                                                ? "cursor-not-allowed border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] text-slate-400"
                                                : "cursor-pointer border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white hover:-translate-y-0.5 hover:border-[var(--vr-palette-black)] hover:bg-[var(--vr-palette-black)] focus:ring-[rgba(0,128,128,0.2)]",
                                        )}
                                        aria-label={hasSelectedPeriod ? `Start ${selectedPeriodLabel} draft` : `Select a ${selectedPeriodName} before starting a draft`}
                                    >
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                                                Step 1
                                            </p>
                                            <p className="mt-3 text-lg font-black">
                                                {hasSelectedPeriod ? "Start draft" : `Select ${selectedPeriodName} first`}
                                            </p>
                                        </div>
                                        <span className="mt-5 flex items-center justify-between text-sm font-black">
                                            <span>{hasSelectedPeriod ? selectedPeriodLabel : `Choose a ${selectedPeriodName}`}</span>
                                            {emailDraftActionBusy ? (
                                                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
            ) : (
                <section id="mobile-selected-month-summary" className="scroll-mt-36 sm:hidden">
                    <div className="space-y-4">
                        {renderSelectedMonthSummaryCard()}
                    </div>
                </section>
            )}

            <section
                className={clsx(
                    "transition-opacity",
                    !monthConfirmed && "hidden sm:block",
                )}
            >
                {selectedDraftStage === "reporting" ? (
                        <>
                            {shouldShowEmailDraftProgress ? (
                                <EmailDraftInProgressCard
                                    status={emailDraftCardStatus}
                                    displayStage={emailDraftCardDisplayStage}
                                    completedSteps={emailDraftCardCompletedSteps}
                                    totalSteps={emailDraftCardTotalSteps}
                                    sourceLabel={`${selectedInputSourceDescription} for ${selectedPeriodLabel}`}
                                    error={emailDraftCardError}
                                    notice={emailDraftCardNotice}
                                    pollingDegraded={emailDraftPollingDegraded}
                                    onRetry={emailDraftCardStatus === "failed" ? handleRetryEmailDraft : undefined}
                                    retryDisabled={emailDraftActionBusy || emailDraftCancelBusy}
                                    onCancel={isEmailDraftBusy ? () => {
                                        void handleCancelEmailDraft();
                                    } : undefined}
                                    cancelDisabled={emailDraftCancelBusy}
                                    isCancelling={emailDraftCancelBusy}
                                    manualFallbackMessage={canContinueDraftManually ? "You can keep editing the update below while the backend draft connection is unavailable." : null}
                                />
                            ) : null}
                            {hasDraftTemplate ? (
                                <>
                                    <div ref={draftTemplateSectionRef} className="scroll-mt-28 space-y-4 sm:mt-8 sm:space-y-6 lg:mt-10">
                                    {optionalDataSourcesSection}
                                    {!shouldShowEmailDraftProgress ? (
                                        <div className="relative">
                                        <button
                                            type="button"
                                            disabled={emailDraftActionBusy || isSelectedMonthInFuture || selectedInputSources.length === 0}
                                            onClick={() => {
                                                void handleGenerateDraftFromEmailClick();
                                            }}
                                            className={clsx(
                                                "group flex min-h-[5.25rem] w-full items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left shadow-sm transition disabled:cursor-not-allowed sm:min-h-0 sm:gap-4 sm:p-5",
                                                canGenerateDraftFromEmail && !isSelectedMonthInFuture && selectedInputSources.length > 0
                                                    ? "cursor-pointer border-[var(--vr-color-border)] bg-white hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.12)]"
                                                    : "cursor-not-allowed border-[var(--vr-color-border)] bg-white sm:border-[rgba(0,128,128,0.32)] sm:bg-[rgba(0,255,215,0.08)]",
                                            )}
                                        >
                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                <div className={clsx(
                                                    "hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1 sm:flex",
                                                    hasNoSourceForAssistedDraft
                                                        ? "bg-[rgba(0,255,215,0.10)] text-[rgba(0,128,128,0.58)] ring-[rgba(0,128,128,0.14)]"
                                                        : "bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-[rgba(0,255,215,0.26)]",
                                                )}>
                                                    {emailDraftActionBusy ? (
                                                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <SparklesIcon className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 sm:text-base sm:font-bold sm:normal-case sm:tracking-normal sm:text-gray-950">
                                                        <span className="sm:hidden">AI drafting</span>
                                                        <span className="hidden sm:inline">{emailDraftButtonTitle}</span>
                                                        <span className="relative ml-2 hidden align-middle text-[var(--vr-color-primary)] transition group-hover:text-black sm:inline-flex" aria-hidden="true">
                                                            <InformationCircleIcon className="h-3.5 w-3.5" />
                                                            <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-64 max-w-[calc(100vw-2rem)] translate-y-1 rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-left text-xs font-medium normal-case leading-5 tracking-normal text-white opacity-0 shadow-[0_14px_30px_-10px_rgba(15,23,42,0.65)] transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                                                                {emailDraftButtonDescription}
                                                                <span className="absolute left-2 top-full h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-slate-950" />
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={clsx(
                                                "flex flex-shrink-0 items-center justify-center rounded-full border px-3 py-1 text-xs font-black transition sm:h-10 sm:w-10 sm:rounded-xl sm:px-0 sm:py-0 sm:group-hover:translate-x-1",
                                                "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white shadow-sm shadow-[rgba(0,128,128,0.18)] group-hover:border-[var(--vr-palette-black)] group-hover:bg-[var(--vr-palette-black)]",
                                            )}>
                                                <span className="sm:hidden">Draft</span>
                                                <ArrowRightIcon className={clsx(
                                                    "hidden h-5 w-5 sm:block",
                                                    "text-current",
                                                )} />
                                            </span>
                                        </button>
                                        <div className="absolute left-[6.75rem] top-1/2 z-10 -translate-y-1/2 sm:hidden">
                                            <CardInfoTooltip info={emailDraftButtonDescription} />
                                        </div>
                                        </div>
                                    ) : null}
                                <Form id={DRAFT_REVIEW_FORM_ID} method="POST" className="space-y-6">
<input type="hidden" name="companyId" value={resolveActiveCompanyId(user) || ""} />
<input type="hidden" name="expectedRevision" value={saveDraftFetcher.data?.update?.revisionId ?? actionData?.update?.revisionId ?? generatedRevisionId ?? existingUpdateForSelectedMonth?.revisionId ?? (existingData as any)?.revisionId ?? ""} />
                                    <input type="hidden" name="intent" value="review" />
                                    <input type="hidden" name="metricKeys" value={formMetricKeys.join(",")} />
                                    {formMetricKeys.map((metricKey) => (
                                        <input key={metricKey} type="hidden" name={metricKey} value={metricValues[metricKey] || ""} />
                                    ))}
                                    <input type="hidden" name="displayConfig" value={displayConfigFormValue} />
                                    <input type="hidden" name="financialSnapshot" value={financialSnapshot ? JSON.stringify(financialSnapshot) : ""} />
                                    <input type="hidden" name="conciseAnalysis" value={conciseAnalysis ? JSON.stringify(conciseAnalysis) : ""} />
                                    <input type="hidden" name="presentationMode" value={presentationMode} />
                                    <VibeRaisingAudienceVisibilityField name="audienceVisibility" value={privateAudienceVisibility} onChange={setAudienceVisibility} />
                                    <input type="hidden" name="summary" value={summary} />
                                    <input type="hidden" name="coverImage" value={JSON.stringify(coverImage)} />
                                    <input type="hidden" name="sourceUrl" value={sourceUrl} />
                                    <input type="hidden" name="pitchDeckUrl" value={pitchDeckUrl} />
                                    <input type="hidden" name="pitchDeckStoragePath" value={pitchDeckStoragePath} />
                                    <input type="hidden" name="pitchDeckContentType" value={pitchDeckContentType} />
                                    <input type="hidden" name="pitchDeckFileSizeBytes" value={pitchDeckFileSizeBytes ?? ""} />
                                    <input type="hidden" name="pitchDeckOriginalFilename" value={pitchDeckOriginalFilename} />
                                    <input type="hidden" name="pitchDeckSummary" value={pitchDeckSummary} />
                                    <input type="hidden" name="manualDocumentIds" value={manualDocumentIds.join(",")} />
                                    <input type="hidden" name="manualSummary" value={manualSummary} />
                                    <input type="hidden" name="videoUrl" value={uploadedVideoUrl} />
                                    <input type="hidden" name="videoStoragePath" value={videoStoragePath} />
                                    <input type="hidden" name="videoContentType" value={videoContentType} />
                                    <input type="hidden" name="videoFileSizeBytes" value={videoFileSizeBytes ?? ""} />
                                    <input type="hidden" name="videoOriginalFilename" value={videoOriginalFilename} />
                                    <input type="hidden" name="founderProfiles" value={JSON.stringify(founderProfilesForSave)} />
                                    <input type="hidden" name="month" value={selectedMonth} />
                                    <input type="hidden" name="year" value={selectedYear} />
                                    <input type="hidden" name="updateCadence" value={updateCadence || "monthly"} />
                                    {isWeeklyUpdate && selectedWeekOption ? (
                                        <>
                                            <input type="hidden" name="weekStart" value={selectedWeekOption.startIso} />
                                            <input type="hidden" name="weekEnd" value={selectedWeekOption.endIso} />
                                        </>
                                    ) : null}

                                    {renderSelectedMonthSummaryCard("hidden sm:block")}

                                    <section className="rounded-[1.75rem] border border-[var(--vr-color-border)] bg-white p-4 shadow-sm sm:p-5" aria-labelledby="financial-metrics-source-title">
                                        <div>
                                            <h2 id="financial-metrics-source-title" className="text-base font-black text-gray-950 sm:text-lg">Financial metrics</h2>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                Connect your financial data to generate credible, verifiable metrics.
                                                <br />
                                                We only access the information needed for reporting, and you remain in control of your connected accounts.
                                            </p>
                                        </div>

                                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                            {financialMetricSources.map((source) => {
                                                const connected = isConnectedInputSource(source);
                                                const selected = selectedDraftInputSources.has(source.key);
                                                const isStripe = source.key === "stripe";
                                                return (
                                                    <article key={source.key} className="flex min-h-32 flex-col justify-between rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] p-4">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex min-w-0 items-center gap-3">
                                                                <DraftSourceLogo sourceKey={source.key} />
                                                                <div className="min-w-0">
                                                                    <h3 className="text-base font-black text-gray-950">{source.label}</h3>
                                                                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                                                                        {isStripe ? "Revenue and subscription metrics" : "Invoices and accounting metrics"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className={clsx(
                                                                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]",
                                                                connected
                                                                    ? "bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)]"
                                                                    : "bg-white text-slate-500 ring-1 ring-[var(--vr-color-border)]",
                                                            )}>
                                                                {compactSourceStatusLabel(source)}
                                                            </span>
                                                        </div>

                                                        {connected ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleDraftInputSource(source)}
                                                                aria-pressed={selected}
                                                                className={clsx(
                                                                    "mt-4 inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-black transition",
                                                                    selected
                                                                        ? "bg-[var(--vr-color-primary)] text-white"
                                                                        : "border border-[var(--vr-color-primary)] bg-white text-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.10)]",
                                                                )}
                                                            >
                                                                {selected ? `Using ${source.label}` : `Use ${source.label}`}
                                                            </button>
                                                        ) : (
                                                            <Link
                                                                to={manageConnectionsHref}
                                                                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-4 py-2 text-sm font-black text-white transition hover:bg-[var(--vr-palette-black)]"
                                                            >
                                                                Connect {source.label}
                                                            </Link>
                                                        )}
                                                    </article>
                                                );
                                            })}
                                        </div>
                                        {compactSourcesLoading ? (
                                            <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                                                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                                                Checking connector status...
                                            </p>
                                        ) : null}
                                    </section>

                                    <div
                                        role="status"
                                        className={clsx(
                                            "flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold",
                                            hasMinimumFounderAnswers
                                                ? "border-[rgba(0,128,128,0.22)] bg-[rgba(0,255,215,0.10)] text-[var(--vr-color-primary)]"
                                                : "border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] text-[var(--vr-color-text)]",
                                        )}
                                    >
                                        <span>{founderQuestionRequirementText}</span>
                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black">
                                            {answeredFounderQuestionCount}/5 answered
                                        </span>
                                    </div>
                                    {founderQuestionGateError ? (
                                        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                                            {founderQuestionGateError}
                                        </p>
                                    ) : null}

                                    <div className="space-y-5">
                                        <SectionWithExample
                                            label="Key Highlights"
                                            name="highlights"
                                            value={highlights}
                                            onChange={setHighlights}
                                            enableMobileAdvance={isMobileTourViewport}
                                            mobileAdvanceTo="challenges"
                                            placeholder="What went well this month? Major wins, product launches, partnerships..."
                                        />
                                        <SectionWithExample
                                            label="Challenges"
                                            name="challenges"
                                            value={challenges}
                                            onChange={setChallenges}
                                            enableMobileAdvance={isMobileTourViewport}
                                            mobileAdvanceTo="learnings"
                                            placeholder="What obstacles are you facing? Where do you need help?"
                                        />
                                        <SectionWithExample
                                            label="Learnings"
                                            name="learnings"
                                            value={learnings}
                                            onChange={setLearnings}
                                            enableMobileAdvance={isMobileTourViewport}
                                            mobileAdvanceTo="next30Days"
                                            placeholder="What did you learn from customers, experiments, or execution this month?"
                                        />
                                        <SectionWithExample
                                            label="Next 30 Days"
                                            name="next30Days"
                                            value={next30Days}
                                            onChange={setNext30Days}
                                            enableMobileAdvance={isMobileTourViewport}
                                            mobileAdvanceTo="asks"
                                            placeholder="What are the highest priority actions, deadlines, or goals for the next month?"
                                        />
                                        <SectionWithExample
                                            label="Support request"
                                            name="asks"
                                            value={asks}
                                            onChange={setAsks}
                                            enableMobileAdvance={isMobileTourViewport}
                                            placeholder="How can MLAI help? Feedback, introductions, advice, or specific expertise..."
                                        />
                                    </div>

                                    {coverEditor}
                                </Form>
                                    </div>
                                </>
                            ) : null}
                        </>
                    ) : null}

            </section>

            <VibeRaisingStickyStepBar
                alignToContent
                key={monthConfirmed ? "draft-template-actions" : "select-month-actions"}
                className={clsx(
                    !monthConfirmed && "hidden sm:block",
                )}
                hideStatusOnMobile={isMobileTourViewport && selectedDraftStage === "reporting" && hasDraftTemplate}
                hideBackOnMobile
                statusIcon={draftStickyStatusIcon}
                statusTitle={draftStickyBar.statusTitle}
                statusDetail={draftStickyBar.statusDetail}
                onBack={draftStickyBar.onBack}
                tertiaryLabel={isEmailDraftBusy ? (emailDraftCancelBusy ? "Cancelling..." : "Cancel draft") : undefined}
                mobileTertiaryLabel={isEmailDraftBusy ? (emailDraftCancelBusy ? "Cancelling" : "Cancel") : undefined}
                onTertiary={isEmailDraftBusy ? () => { void handleCancelEmailDraft(); } : undefined}
                tertiaryDisabled={emailDraftCancelBusy}
                primaryLabel={draftStickyBar.primaryLabel}
                onPrimary={draftStickyBar.onPrimary}
                primaryDisabled={draftStickyBar.primaryDisabled}
                primaryType={draftStickyBar.primaryType}
                primaryForm={draftStickyBar.primaryForm}
            />

            {showRegenerateConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/55 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--vr-color-card)] shadow-2xl ring-1 ring-black/5">
                        <div className="border-b border-[var(--vr-color-border)] px-6 py-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(255,200,1,0.16)] text-[var(--vr-palette-orange)] ring-1 ring-[rgba(255,200,1,0.30)]">
                                    <ExclamationTriangleIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[var(--vr-color-text)]">Replace this draft?</h2>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Running again rebuilds the <strong className="font-bold text-gray-900">{selectedPeriodLabel}</strong> draft from scratch using your latest data{regenerateDialogSourceLabels.length > 0 ? <> from <strong className="font-bold text-gray-900">{regenerateDialogSourceLabels.join(", ")}</strong></> : null}, and can take up to 20 minutes. The current draft — including any manual edits — will be replaced. We keep a backup of the previous version.
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
                                Regenerate {selectedPeriodLabel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLegacyDraftFlow ? (
            <>
            <Form method="POST" className="space-y-6">
<input type="hidden" name="companyId" value={resolveActiveCompanyId(user) || ""} />
<input type="hidden" name="expectedRevision" value={saveDraftFetcher.data?.update?.revisionId ?? actionData?.update?.revisionId ?? generatedRevisionId ?? existingUpdateForSelectedMonth?.revisionId ?? (existingData as any)?.revisionId ?? ""} />
                <input type="hidden" name="intent" value="review" />
                <input
                    type="hidden"
                    name="metricKeys"
                    value={formMetricKeys.join(",")}
                />
                <input type="hidden" name="displayConfig" value={displayConfigFormValue} />
                <input type="hidden" name="financialSnapshot" value={financialSnapshot ? JSON.stringify(financialSnapshot) : ""} />
                <input type="hidden" name="conciseAnalysis" value={conciseAnalysis ? JSON.stringify(conciseAnalysis) : ""} />
                <input type="hidden" name="presentationMode" value={presentationMode} />
                <input type="hidden" name="summary" value={summary} />
                <input type="hidden" name="coverImage" value={JSON.stringify(coverImage)} />
                <input type="hidden" name="sourceUrl" value={sourceUrl} />
                <input type="hidden" name="pitchDeckUrl" value={pitchDeckUrl} />
                <input type="hidden" name="pitchDeckStoragePath" value={pitchDeckStoragePath} />
                <input type="hidden" name="pitchDeckContentType" value={pitchDeckContentType} />
                <input type="hidden" name="pitchDeckFileSizeBytes" value={pitchDeckFileSizeBytes ?? ""} />
                <input type="hidden" name="pitchDeckOriginalFilename" value={pitchDeckOriginalFilename} />
                <input type="hidden" name="pitchDeckSummary" value={pitchDeckSummary} />
                <input type="hidden" name="manualDocumentIds" value={manualDocumentIds.join(",")} />
                <input type="hidden" name="manualSummary" value={manualSummary} />
                <input type="hidden" name="videoUrl" value={uploadedVideoUrl} />
                <input type="hidden" name="videoStoragePath" value={videoStoragePath} />
                <input type="hidden" name="videoContentType" value={videoContentType} />
                <input type="hidden" name="videoFileSizeBytes" value={videoFileSizeBytes ?? ""} />
                <input type="hidden" name="videoOriginalFilename" value={videoOriginalFilename} />
                <input type="hidden" name="founderProfiles" value={JSON.stringify(founderProfilesForSave)} />

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
                            {manualDocuments.length > 0 ? (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {manualDocuments.map((document) => (
                                        <span key={document.id} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                                            {document.originalFilename}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex shrink-0 justify-end">
                            {!isEdit && (
                                <Link
                                    to={manageConnectionsHref}
                                    className="inline-flex items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)]"
                                >
                                    Manage connections
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
                                sourceLabel={`${selectedInputSourceDescription} for ${selectedPeriodLabel}`}
                                error={emailDraftCardError}
                                notice={emailDraftCardNotice}
                                pollingDegraded={emailDraftPollingDegraded}
                                onRetry={emailDraftCardStatus === "failed" ? handleRetryEmailDraft : undefined}
                                retryDisabled={emailDraftActionBusy || emailDraftCancelBusy}
                                onCancel={isEmailDraftBusy ? () => {
                                    void handleCancelEmailDraft();
                                } : undefined}
                                cancelDisabled={emailDraftCancelBusy}
                                isCancelling={emailDraftCancelBusy}
                            />
                        ) : (
                            <button
                                type="button"
                                disabled={emailDraftActionBusy || isSelectedMonthUnavailable || selectedInputSources.length === 0}
                                onClick={() => {
                                    void handleGenerateDraftFromEmailClick();
                                }}
                                className={clsx(
                                    "group flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left shadow-sm transition disabled:cursor-not-allowed",
                                    canGenerateDraftFromEmail && !isSelectedMonthUnavailable && selectedInputSources.length > 0
                                        ? "cursor-pointer border-[var(--vr-color-border)] bg-white hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.12)]"
                                        : "cursor-not-allowed border-[rgba(0,128,128,0.32)] bg-[rgba(0,255,215,0.08)]",
                                )}
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className={clsx(
                                        "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1",
                                        hasNoSourceForAssistedDraft
                                            ? "bg-[rgba(0,255,215,0.10)] text-[rgba(0,128,128,0.58)] ring-[rgba(0,128,128,0.14)]"
                                            : "bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-[rgba(0,255,215,0.26)]",
                                    )}>
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
                                <span className={clsx(
                                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition group-hover:translate-x-1",
                                    hasNoSourceForAssistedDraft
                                        ? "border-[rgba(0,128,128,0.14)] bg-[rgba(0,128,128,0.08)] text-[rgba(0,128,128,0.38)]"
                                        : "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white shadow-sm shadow-[rgba(0,128,128,0.18)] group-hover:bg-[var(--vr-palette-black)]",
                                )}>
                                    <ArrowRightIcon className={clsx(
                                        "h-5 w-5",
                                        hasNoSourceForAssistedDraft ? "text-gray-300" : "text-current",
                                    )} />
                                </span>
                            </button>
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black text-gray-950">Update draft</h2>
                            <p className="mt-3 text-sm text-slate-500">
                                Edit metrics and submission-ready dot points for {activeDisplayMonth} {activeDisplayYear}.
                            </p>
                        </div>
                    </div>
                    <div className="relative mt-6">
                    <fieldset disabled={isEmailDraftBusy} className={clsx(isEmailDraftBusy && "opacity-80")}>
	                    {financialSnapshot ? (
	                        <FinancialChartsSection snapshot={financialSnapshot} analysis={conciseAnalysis} />
	                    ) : null}
	                        {/* ─── Growth Charts ─── */}
                        {!financialSnapshot && pastMonthCards.length > 0 && (hasRevenueChart || hasActiveUsersChart) && (
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
                                                                    : "border-[3px] border-dashed border-gray-400 bg-gray-50 opacity-80 hover:opacity-100 hover:border-gray-500"
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
                                            <BulletInput value={card.asks} onChange={(v) => updatePastMonthField(index, "asks", v)} placeholder="Where could MLAI help?" section="asks" />
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
	                                                onClick={(event) => {
	                                                    if ((event.target as HTMLElement).closest("input,button,a,textarea,select")) return;
	                                                    activateActiveMetric(m.key);
	                                                }}
                                                className={clsx(
                                                    "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                    active
                                                        ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                        : "border-[3px] border-dashed border-gray-400 bg-gray-50 opacity-80 hover:opacity-100 hover:border-gray-500"
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
	                                                        id={`active-metric-${m.key}`}
	                                                        type="text"
	                                                        name={isViewingCurrentUpdate ? m.key : undefined}
	                                                        value={activeMetricValues[m.key] || ""}
	                                                        onClick={(e) => e.stopPropagation()}
	                                                        onChange={(e) => updateActiveMetric(m.key, e.target.value)}
                                                        placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                        className="w-full min-w-0 border-b-2 border-[rgba(0,128,128,0.26)] bg-transparent py-0.5 text-center text-sm font-extrabold text-gray-900 placeholder:text-xs focus:border-[var(--vr-color-primary)] focus:outline-none sm:text-base"
                                                    />
                                                ) : (
                                                    <p className="text-base font-extrabold text-gray-300">—</p>
                                                )}
                                                <p className={clsx(
                                                    "mt-1 max-w-full break-words text-[10px] font-semibold uppercase leading-tight tracking-wide",
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
                                    enableMobileAdvance={isMobileTourViewport}
                                    mobileAdvanceTo={isViewingCurrentUpdate ? "challenges" : `pastMonth_${activePastIndex}_challenges`}
                                    rows={3}
                                    placeholder="What went well this month? Major wins, product launches, partnerships..."
                                />
	                                <SectionWithExample
	                                    label="Challenges"
	                                    name={isViewingCurrentUpdate ? "challenges" : `pastMonth_${activePastIndex}_challenges`}
	                                    value={activeChallenges}
	                                    onChange={updateActiveChallenges}
                                    enableMobileAdvance={isMobileTourViewport}
                                    mobileAdvanceTo={isViewingCurrentUpdate ? "learnings" : `pastMonth_${activePastIndex}_learnings`}
                                    rows={3}
                                    placeholder="What obstacles are you facing? Where do you need help?"
                                />
	                                <SectionWithExample
	                                    label="Learnings"
	                                    name={isViewingCurrentUpdate ? "learnings" : `pastMonth_${activePastIndex}_learnings`}
	                                    value={activeLearnings}
	                                    onChange={updateActiveLearnings}
                                    enableMobileAdvance={isMobileTourViewport}
                                    mobileAdvanceTo={isViewingCurrentUpdate ? "next30Days" : `pastMonth_${activePastIndex}_next30Days`}
                                    rows={3}
                                    placeholder="What did you learn from customers, experiments, or execution this month?"
                                />
	                                <SectionWithExample
	                                    label="Next 30 Days"
	                                    name={isViewingCurrentUpdate ? "next30Days" : `pastMonth_${activePastIndex}_next30Days`}
	                                    value={activeNext30Days}
	                                    onChange={updateActiveNext30Days}
                                    enableMobileAdvance={isMobileTourViewport}
                                    mobileAdvanceTo={isViewingCurrentUpdate ? "asks" : `pastMonth_${activePastIndex}_asks`}
                                    rows={3}
                                    placeholder="What are the highest priority actions, deadlines, or goals for the next month?"
                                />
	                                <SectionWithExample
	                                    label="Support request"
	                                    name={isViewingCurrentUpdate ? "asks" : `pastMonth_${activePastIndex}_asks`}
	                                    value={activeAsks}
	                                    onChange={updateActiveAsks}
                                    enableMobileAdvance={isMobileTourViewport}
                                    rows={3}
                                    placeholder="How can MLAI help? Feedback, introductions, advice, or specific expertise..."
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
                                            onClick={(event) => {
                                                if ((event.target as HTMLElement).closest("input,button,a,textarea,select")) return;
                                                setSelectedMetrics((previous) => {
                                                    if (previous.has(m.key)) return previous;
                                                    const next = new Set(previous);
                                                    next.add(m.key);
                                                    return next;
                                                });
                                                focusMetricInput(`default-metric-${m.key}`);
                                            }}
                                            className={clsx(
                                                "relative rounded-xl border-2 flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer transition-all",
                                                active
                                                    ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)] shadow-sm"
                                                    : "border-[3px] border-dashed border-gray-400 bg-gray-50 opacity-80 hover:opacity-100 hover:border-gray-500"
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
                                                    id={`default-metric-${m.key}`}
                                                    type="text"
                                                    name={m.key}
                                                    value={metricValues[m.key] || ""}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => setMetricValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                                                    placeholder={m.prefix ? `${m.prefix}${m.placeholder}` : m.placeholder}
                                                    className="w-full min-w-0 border-b-2 border-[rgba(0,128,128,0.26)] bg-transparent py-0.5 text-center text-sm font-extrabold text-gray-900 placeholder:text-xs focus:border-[var(--vr-color-primary)] focus:outline-none sm:text-base"
                                                />
                                            ) : (
                                                <p className="text-base font-extrabold text-gray-300">—</p>
                                            )}
                                            <p className={clsx(
                                                "mt-1 max-w-full break-words text-[10px] font-semibold uppercase leading-tight tracking-wide",
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
                            />
                            <SectionWithExample
                                label="Challenges"
                                name="challenges"
                                value={challenges}
                                onChange={setChallenges}
                                placeholder="What obstacles are you facing? Where do you need help?"
                            />
                            <SectionWithExample
                                label="Learnings"
                                name="learnings"
                                value={learnings}
                                onChange={setLearnings}
                                placeholder="What did you learn from customers, experiments, or execution this month?"
                            />
                            <SectionWithExample
                                label="Next 30 Days"
                                name="next30Days"
                                value={next30Days}
                                onChange={setNext30Days}
                                placeholder="What are the highest priority actions, deadlines, or goals for the next month?"
                            />
                            <SectionWithExample
                                label="Support request"
                                name="asks"
                                value={asks}
                                onChange={setAsks}
                                placeholder="How can MLAI help? Feedback, introductions, advice, or specific expertise..."
                            />
                        </div>
                    </div>
                )}

                    {coverEditor}
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
            <CreateUpdateMobileTour
                open={mobileTourOpen}
                stepIndex={mobileTourStepIndex}
                steps={mobileTourSteps}
                onBack={goToPreviousMobileTourStep}
                onClose={closeMobileTour}
                onNext={goToNextMobileTourStep}
            />
            </>
            ) : null}
        </div>
        </VibeRaisingWorkflowLayout>
    );
}
