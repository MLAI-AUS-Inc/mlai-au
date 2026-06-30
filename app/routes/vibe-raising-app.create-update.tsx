import { Form, Link, useActionData, useFetcher, useLocation, useNavigate, useNavigation, useLoaderData, useSubmit, redirect } from "react-router";
import React, { startTransition, useCallback, useEffect, useEffectEvent, useId, useMemo, useRef, useState, type RefObject } from "react";
import type { Route } from "./+types/vibe-raising-app.create-update";
import { getEnv } from "~/lib/env.server";
import {
    cancelVibeRaisingStartupUpdate,
    requireVibeRaisingFounder,
    bootstrapVibeRaisingStartupUpdate,
    getVibeRaisingDrafts,
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
} from "~/lib/vibe-raising";
import { parseFounderProfilesFormValue } from "~/lib/founder-profiles";
import {
    VIBE_METRIC_KEYS,
    VIBE_METRIC_OPTIONS,
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
} from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import { motion, useInView } from "motion/react";
import { clsx } from "clsx";
import { useActiveDraftRun } from "~/components/ActiveDraftRunStatus";
import DraftFromEmailWizard from "~/components/DraftFromEmailWizard";
import EmailDraftInProgressCard from "~/components/EmailDraftInProgressCard";
import MonthlyUpdateStepper, { type MonthlyUpdateStepKey } from "~/components/MonthlyUpdateStepper";
import StartupRegionBadge from "~/components/StartupRegionBadge";
import VibeRaisingAudienceVisibilityField from "~/components/VibeRaisingAudienceVisibilityField";
import VibeRaisingStickyStepBar from "~/components/VibeRaisingStickyStepBar";
import { getVibeRaisingMonthTheme, parseVibeRaisingMonthYear, VIBE_RAISING_MONTH_OPTIONS } from "~/components/VibeRaisingDateTabs";
import type {
    VibeRaisingInputSourceKey,
    VibeRaisingFounderProfile,
    VibeRaisingInputSourceSummary,
    VibeRaisingManualDocument,
    VibeRaisingAudienceVisibility,
    VibeRaisingMetricDisplayConfig,
    VibeRaisingMetricSuggestion,
    VibeRaisingMetricVisibility,
    VibeRaisingMonthlyUpdate,
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
const PUBLISH_REVIEW_FORM_ID = "vibe-raising-publish-review-form";
const BACKEND_DRAFT_ID_PATTERN = /^\d+$/;

type CreateUpdateMobileTourStep = {
    key: string;
    title: string;
    body: string;
    targetRef: RefObject<Element | null>;
};

function readStoredManualMaterials(): {
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
        const raw = window.localStorage.getItem(MANUAL_MATERIALS_STORAGE_KEY);
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

function buildExistingUpdateFormData(update: VibeRaisingMonthlyUpdate) {
    const parsedPeriod = parseVibeRaisingMonthYear(update.month);
    const metrics = update.metrics || {};
    return {
        id: update.id,
        audienceVisibility: update.audienceVisibility || "",
        month: update.monthName || parsedPeriod.month,
        year: update.year || parsedPeriod.year,
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
        metricKeys: Object.keys(metrics).join(","),
        ...metrics,
    };
}

function normalizeAudienceVisibilityValue(value: unknown): VibeRaisingAudienceVisibility {
    const text = String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
    if (text === "community") return "community";
    if (text === "investors" || text === "investor") return "investors";
    return "just_me";
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
        const existingUpdate = await getVibeRaisingMonthlyUpdateById(env, request, editId).catch((error) => {
            console.warn("Unable to load Vibe Raising update for editing.", error);
            return null;
        });
        existingData = existingUpdate ? buildExistingUpdateFormData(existingUpdate) : null;
    }

    const existingMonthlyUpdates = await getVibeRaisingMonthlyUpdates(env, request).catch((error) => {
        console.warn("Unable to load existing Vibe Raising monthly updates for create flow.", error);
        return [];
    });

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

function buildMonthlyUpdateSavePayload(formData: FormData) {
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
    const displayConfig = parseDisplayConfigValue(formData.get("displayConfig"));
    const rawPitchDeckFileSizeBytes = Number(formData.get("pitchDeckFileSizeBytes") || 0);
    const rawVideoUrl = String(formData.get("videoUrl") || "").trim();
    const rawVideoFileSizeBytes = Number(formData.get("videoFileSizeBytes") || 0);
    const manualDocumentIds = String(formData.get("manualDocumentIds") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    return {
        audienceVisibility: normalizeAudienceVisibilityValue(formData.get("audienceVisibility")),
        month: String(formData.get("month") || "").trim(),
        year: Number(formData.get("year") || 0),
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
    };
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
    const formData = await request.formData();
    const intent = formData.get("intent");
    const updates = Object.fromEntries(formData);
    const savePayload = buildMonthlyUpdateSavePayload(formData);

    if (intent === "publish") {
        const draftId = String(formData.get("draftId") || "").trim();
        console.log("[monthly-update:publish-action] received publish request", JSON.stringify({
            draftId,
            month: savePayload.month,
            year: savePayload.year,
            formEntries: Object.fromEntries(formData),
        }));
        try {
            if (BACKEND_DRAFT_ID_PATTERN.test(draftId)) {
                await publishVibeRaisingMonthlyUpdate(env, request, draftId);
                console.log("[monthly-update:publish-action] published draft by id", { draftId });
                return redirect("/founder-tools/updates");
            }

            const drafts = await getVibeRaisingDrafts(env, request);
            console.log("[monthly-update:publish-action] loaded drafts for fallback", JSON.stringify({
                draftCount: drafts.length,
                publishableDrafts: drafts
                    .filter((draft) => draft.status === "ready" && draft.visibility !== "published")
                    .map((draft) => ({
                        id: draft.id,
                        month: draft.month,
                        monthName: draft.monthName,
                        year: draft.year,
                        status: draft.status,
                        visibility: draft.visibility,
                    })),
            }));
            const formMonth = savePayload.month;
            const formYear = savePayload.year;
            const matchingDraft = drafts.find((draft) => (
                (!formMonth || draft.monthName === formMonth || draft.month === `${formMonth} ${formYear}`) &&
                (!Number.isFinite(formYear) || !formYear || draft.year === formYear) &&
                draft.status === "ready" &&
                draft.visibility !== "published" &&
                BACKEND_DRAFT_ID_PATTERN.test(draft.id)
            ));
            const fallbackDraft = matchingDraft ?? drafts.find((draft) => (
                draft.status === "ready" &&
                draft.visibility !== "published" &&
                BACKEND_DRAFT_ID_PATTERN.test(draft.id)
            ));

            if (fallbackDraft) {
                await publishVibeRaisingMonthlyUpdate(env, request, fallbackDraft.id);
                console.log("[monthly-update:publish-action] published fallback draft", {
                    draftId: fallbackDraft.id,
                });
                return redirect("/founder-tools/updates");
            }

            const savedUpdate = await saveVibeRaisingMonthlyUpdate(env, request, {
                ...savePayload,
                saveMode: "ready",
            });
            if (savedUpdate?.id && BACKEND_DRAFT_ID_PATTERN.test(savedUpdate.id)) {
                await publishVibeRaisingMonthlyUpdate(env, request, savedUpdate.id);
                console.log("[monthly-update:publish-action] saved then published draft", {
                    draftId: savedUpdate.id,
                });
                return redirect("/founder-tools/updates");
            }

            if (savedUpdate?.id) {
                const publishedUpdate = {
                    ...savedUpdate,
                    status: "ready",
                    visibility: "published",
                    publishedAt: new Date().toISOString(),
                };
                const cookie = createVibeRaisingLocalPublishedUpdateCookie(publishedUpdate);
                console.log("[monthly-update:publish-action] using local published update fallback", {
                    draftId: savedUpdate.id,
                    hasCookie: Boolean(cookie),
                });
                return redirect("/founder-tools/updates", cookie ? { headers: { "Set-Cookie": cookie } } : undefined);
            }

            console.warn("[monthly-update:publish-action] saved update did not include a backend draft id", JSON.stringify({
                savedUpdate,
            }));
        } catch (error) {
            console.warn("Unable to publish Vibe Raising monthly update.", (error as any)?.response?.data ?? error);
            return {
                step: "publish-error",
                data: updates,
                error: extractVibeRaisingActionError(error, "We could not publish this update yet. Please check the draft content and try again."),
            };
        }

        return {
            step: "publish-error",
            data: updates,
            error: "We could not find a saved draft to publish. Review the draft once, then publish again.",
        };
    }

    const founderProfiles = parseFounderProfilesFormValue(formData.get("founderProfiles"));
    const activeCompany =
        appUser.companies.find((company) => company.id === appUser.activeCompanyId) ??
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
            registered: activeCompany.registered ?? appUser.companyRegistered,
        });
    }

    if (intent === "review") {
        const savedUpdate = await saveVibeRaisingMonthlyUpdate(env, request, {
            ...savePayload,
            saveMode: "ready",
        });

        // Mock AI analysis
        return {
            step: "feedback",
            data: {
                ...updates,
                draftId: savedUpdate?.id ?? updates.draftId,
            },
            update: savedUpdate,
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

    if (intent === "save-draft") {
        const update = await saveVibeRaisingMonthlyUpdate(env, request, {
            ...savePayload,
            saveMode: "draft",
        });
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
    const yearMenuRef = useRef<HTMLDivElement | null>(null);
    const yearOptions = Array.from({ length: 11 }, (_, index) => year - 5 + index);
    const visibleMonthChoices = monthChoices?.length
        ? monthChoices
        : VIBE_RAISING_MONTH_OPTIONS.map((option) => ({ month: option.name, year }));
    const useCompactCreateTimeline = Boolean(monthChoices?.length);
    const showYearInMonthLabel = new Set(visibleMonthChoices.map((option) => option.year)).size > 1;
    const mobileMonthOptions = monthChoices?.length
        ? visibleMonthChoices.filter((option, index, options) => (
            options.findIndex((candidate) => candidate.month === option.month) === index
        ))
        : VIBE_RAISING_MONTH_OPTIONS.map((option) => ({ month: option.name, year }));
    const mobileYearOptions = monthChoices?.length
        ? Array.from(new Set(visibleMonthChoices.map((option) => option.year))).sort((a, b) => b - a)
        : yearOptions;

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
            {submitDateFields && (
                <>
                    <input type="hidden" name="month" value={month} />
                    <input type="hidden" name="year" value={year} />
                </>
            )}

            <div className="grid grid-cols-[minmax(0,1fr)_104px] gap-2 sm:hidden">
                <div>
                    <label className="sr-only" htmlFor="vibe-raising-mobile-month-select">
                        Select update month
                    </label>
                    <select
                        id="vibe-raising-mobile-month-select"
                        value={month}
                        disabled={!isDateEditable}
                        onChange={(event) => {
                            if (!isDateEditable) return;
                            const nextMonth = event.target.value;
                            const matchingChoice =
                                visibleMonthChoices.find((option) => option.month === nextMonth && option.year === year) ??
                                visibleMonthChoices.find((option) => option.month === nextMonth);
                            onMonthChange(nextMonth);
                            if (matchingChoice) {
                                onYearChange(matchingChoice.year);
                            }
                            onPeriodChange?.("current");
                            setIsYearMenuOpen(false);
                        }}
                        className={clsx(
                            "h-12 w-full rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 text-sm font-black text-gray-950 shadow-sm outline-none ring-1 ring-white/60 transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,255,215,0.18)]",
                            isDateEditable ? "cursor-pointer" : "cursor-default opacity-70",
                        )}
                    >
                        {!month.trim() ? (
                            <option value="" disabled>
                                Select month
                            </option>
                        ) : null}
                        {mobileMonthOptions.map((option) => (
                            <option key={option.month} value={option.month}>
                                {option.month}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="sr-only" htmlFor="vibe-raising-mobile-year-select">
                        Select update year
                    </label>
                    <select
                        id="vibe-raising-mobile-year-select"
                        value={year}
                        disabled={!isDateEditable}
                        onChange={(event) => {
                            if (!isDateEditable) return;
                            const nextYear = Number(event.target.value);
                            if (!Number.isFinite(nextYear)) return;
                            const matchingChoice = visibleMonthChoices.find(
                                (option) => option.year === nextYear && option.month === month,
                            );
                            const fallbackChoice = visibleMonthChoices.find((option) => option.year === nextYear);
                            onYearChange(nextYear);
                            if (!matchingChoice && fallbackChoice) {
                                onMonthChange(fallbackChoice.month);
                            }
                            onPeriodChange?.("current");
                            setIsYearMenuOpen(false);
                        }}
                        className={clsx(
                            "h-12 w-full rounded-2xl border border-gray-950 bg-gray-950 px-3 text-center text-sm font-black tracking-[0.08em] text-white shadow-lg shadow-black/15 outline-none ring-1 ring-white/10 transition focus:ring-4 focus:ring-[rgba(11,11,11,0.16)]",
                            isDateEditable ? "cursor-pointer" : "cursor-default opacity-70",
                        )}
                    >
                        {mobileYearOptions.map((optionYear) => (
                            <option key={optionYear} value={optionYear}>
                                {optionYear}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="hidden min-w-0 flex-1 sm:block">
                <div className="overflow-hidden rounded-t-2xl rounded-b-lg border border-[var(--vr-color-border)] bg-white shadow-xl ring-1 ring-white/40">
                    <div
                        role="listbox"
                        aria-label="Update month"
                        className={clsx(
                            "grid w-full",
                            useCompactCreateTimeline ? "grid-cols-2" : "grid-cols-12",
                        )}
                    >
                        {visibleMonthChoices.map((option) => {
                            const monthTheme = getVibeRaisingMonthTheme(option.month);
                            const isSelected = option.month === month && option.year === year;
                            const monthLabel = showYearInMonthLabel
                                ? `${option.month.slice(0, 3).toUpperCase()} ${option.year}`
                                : option.month.slice(0, 3).toUpperCase();
                            return (
                                <button
                                    key={`${option.year}-${option.month}`}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    disabled={!isDateEditable}
                                    onClick={() => {
                                        if (!isDateEditable) return;
                                        onMonthChange(option.month);
                                        onYearChange(option.year);
                                        onPeriodChange?.("current");
                                        setIsYearMenuOpen(false);
                                    }}
                                    className={clsx(
                                        "flex min-h-[54px] min-w-0 items-center justify-center border-r border-[var(--vr-color-border)] px-2 text-center font-black uppercase tracking-[0.08em] transition-colors last:border-r-0",
                                        useCompactCreateTimeline ? "text-[11px] sm:text-xs md:text-sm" : "text-[9px] sm:text-[10px] md:text-[11px]",
                                        isDateEditable ? "cursor-pointer" : "cursor-default",
                                        isSelected
                                            ? `${monthTheme.tabClass} ${monthTheme.textClass} shadow-none`
                                            : "bg-[var(--vr-palette-paper)] text-slate-500 hover:bg-white hover:text-gray-950",
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
                    </>
                )}
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
const STORY_MATERIALS_SUGGESTION_TEXT_THRESHOLD = 4;
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
const SHARED_MATERIAL_ACCEPT = {
    ...PITCH_DECK_ACCEPT,
    ...VIDEO_ACCEPT,
    ...AUDIO_ACCEPT,
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
        prompt: "What should investors help with?",
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
    onMobileAdvance,
    enterKeyHint,
    className,
}: {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onMobileAdvance?: () => void;
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
                if (!onMobileAdvance) return;
                if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
                event.preventDefault();
                onMobileAdvance();
            }}
            enterKeyHint={enterKeyHint}
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
    const cardInView = useInView(cardRef, { amount: 0.45, once: false });
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

    const addItem = () => {
        commitItems([...items, ""]);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        commitItems(updated.length ? updated : [""]);
    };

    return (
        <motion.section
            ref={cardRef}
            className="rounded-2xl border border-[var(--vr-color-border)] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] motion-safe:will-change-transform sm:p-5"
            data-draft-section={name}
            data-draft-question-card="true"
            aria-labelledby={titleId}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
        >
            <input type="hidden" name={name} value={value || ""} />
            <header className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400 sm:hidden">
                    {questionMeta ? `${questionMeta.step} / 05 - ${questionMeta.eyebrow}` : label}
                </p>
                <h3 id={titleId} className="text-base font-black leading-snug text-gray-950 sm:text-lg">
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
                            onMobileAdvance={handleMobileAdvance}
                            enterKeyHint={enableMobileAdvance ? (mobileAdvanceTo ? "next" : "done") : undefined}
                            placeholder={hints[i % hints.length] || placeholder}
                            className="min-h-11 flex-1 rounded-none border-0 bg-transparent px-0 py-2 text-[16px] leading-6 text-gray-900 placeholder:text-gray-400 placeholder:italic focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        {(items.length > 1 || item.trim().length > 0) && (
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="mt-1.5 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-300 transition hover:bg-[rgba(242,114,63,0.12)] hover:text-[var(--vr-palette-coral)]"
                                aria-label={`Remove ${label} point ${i + 1}`}
                            >
                                Remove
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <footer className="mt-3 border-t border-dashed border-[var(--vr-color-border)] pt-3">
                <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[rgba(0,128,128,0.08)] px-4 py-2 text-xs font-black uppercase tracking-wide text-[var(--vr-color-primary)] transition hover:bg-[rgba(0,255,215,0.16)]"
                >
                    Add point
                </button>
            </footer>
        </motion.section>
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
                        <button type="button" onClick={() => remove(i)} className="mt-1 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-300 transition-all hover:bg-[rgba(242,114,63,0.12)] hover:text-[var(--vr-palette-coral)]">
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className="mt-1 flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-[var(--vr-color-primary)] transition-all hover:bg-[rgba(0,255,215,0.12)]">
                Add point
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
                    <li key={`${label}-${index}`}>{item.trim()}</li>
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
        existingMonthlyUpdates,
    } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>() as any;
    const saveDraftFetcher = useFetcher<typeof action>();
    const submit = useSubmit();
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const { activeRun: sharedActiveDraftRun, refreshActiveRun } = useActiveDraftRun();
    const initialSelectedInputSourcesKey = initialSelectedInputSources.join(",");
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
    const defaultData = actionData?.step === "feedback" || actionData?.step === "publish-error" ? (actionData.data as any) : (existingData || {});
    const [dismissedFeedback, setDismissedFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [pitchDeckPreviewUrl, setPitchDeckPreviewUrl] = useState<string | null>(defaultData?.pitchDeckUrl || null);
    const [uploadedPitchDeckUrl, setUploadedPitchDeckUrl] = useState<string>(defaultData?.pitchDeckUrl || "");
    const [pitchDeckUploadStatus, setPitchDeckUploadStatus] = useState<PitchDeckUploadStatus>(defaultData?.pitchDeckUrl ? "ready" : "idle");
    const [pitchDeckUploadError, setPitchDeckUploadError] = useState<string | null>(null);
    const [materialsUploadError, setMaterialsUploadError] = useState<string | null>(null);
    const [pitchDeckStoragePath, setPitchDeckStoragePath] = useState<string>(defaultData?.pitchDeckStoragePath || "");
    const [pitchDeckContentType, setPitchDeckContentType] = useState<string>(defaultData?.pitchDeckContentType || "");
    const [pitchDeckFileSizeBytes, setPitchDeckFileSizeBytes] = useState<number | null>(defaultData?.pitchDeckFileSizeBytes || null);
    const [pitchDeckOriginalFilename, setPitchDeckOriginalFilename] = useState<string>(defaultData?.pitchDeckOriginalFilename || "");
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(defaultData?.videoUrl || null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>(defaultData?.videoUrl || "");
    const [videoUploadStatus, setVideoUploadStatus] = useState<VideoUploadStatus>(defaultData?.videoUrl ? "ready" : "idle");
    const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
    const shouldOpenDraftTemplate = Boolean(isEdit && existingData);
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
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);
    const [showReviewLinkedInPopup, setShowReviewLinkedInPopup] = useState(false);
    const [showStoryMaterialsSuggestion, setShowStoryMaterialsSuggestion] = useState(false);
    const [dismissedStoryMaterialsSuggestionKey, setDismissedStoryMaterialsSuggestionKey] = useState<string | null>(null);
    const [highlightMaterialsSection, setHighlightMaterialsSection] = useState(false);
    const [showAllCreateStepMonths, setShowAllCreateStepMonths] = useState(false);
    const [pendingDraftRequest, setPendingDraftRequest] = useState<{
        forceRegenerate?: boolean;
        clearPersistedRun?: boolean;
        inputSources?: VibeRaisingInputSourceKey[];
    } | null>(null);
    const currentCreatePeriod = getCurrentMonthlyUpdatePeriod();
    const createStepMonthOptions = getCreateStepMonthOptions();

    // Reset dismissed state when new feedback arrives
    useEffect(() => {
        if (actionData?.step === "feedback" || actionData?.step === "publish-error") setDismissedFeedback(false);
    }, [actionData]);

    useEffect(() => {
        const navigationFormData = navigation.formData;
        const navigationIntent = navigationFormData?.get("intent");
        if (!navigationFormData || navigationIntent !== "publish") return;

        const payload = {
            state: navigation.state,
            location: navigation.location
                ? `${navigation.location.pathname}${navigation.location.search || ""}`
                : null,
            formEntries: Object.fromEntries(navigationFormData.entries()),
            url: window.location.href,
            timestamp: new Date().toISOString(),
        };
        console.error("[monthly-update:publish] router submit state", JSON.stringify(payload));
        window.localStorage.setItem("monthly-update-publish-router-debug", JSON.stringify(payload));
    }, [navigation.formData, navigation.location, navigation.state]);

    useEffect(() => {
        if (actionData?.step !== "publish-error") return;

        const payload = {
            step: actionData.step,
            error: String((actionData as any).error || ""),
            data: (actionData as any).data || null,
            url: window.location.href,
            timestamp: new Date().toISOString(),
        };
        console.error("[monthly-update:publish] action returned publish-error", JSON.stringify(payload));
        window.localStorage.setItem("monthly-update-publish-action-debug", JSON.stringify(payload));
    }, [actionData]);

    useEffect(() => {
        if (saveDraftFetcher.data?.step !== "draft-saved") return;
        setDraftSaved(true);
        const timeoutId = window.setTimeout(() => setDraftSaved(false), 2500);
        return () => window.clearTimeout(timeoutId);
    }, [saveDraftFetcher.data]);

    // State declarations
    const [isClientMounted, setIsClientMounted] = useState(false);
    const [showEmailWizard, setShowEmailWizard] = useState(false);
    const storedManualMaterials = useMemo(() => readStoredManualMaterials(), []);
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
    const [audienceVisibility, setAudienceVisibility] = useState<VibeRaisingAudienceVisibility>(
        () => normalizeAudienceVisibilityValue(defaultData?.audienceVisibility || user.audienceVisibility),
    );
    const [summary, setSummary] = useState<string>(() => defaultData?.summary || storedManualMaterials.summary || "");
    const [sourceUrl, setSourceUrl] = useState<string>(() => defaultData?.sourceUrl || storedManualMaterials.sourceUrl || "");
    const [pitchDeckUrl, setPitchDeckUrl] = useState<string>(() => defaultData?.pitchDeckUrl || storedManualMaterials.pitchDeckUrl || "");
    const [pitchDeckSummary, setPitchDeckSummary] = useState<string>(() => defaultData?.pitchDeckSummary || storedManualMaterials.pitchDeckSummary || "");
    const [highlights, setHighlights] = useState<string>(defaultData?.highlights || "");
    const [challenges, setChallenges] = useState<string>(defaultData?.challenges || "");
    const [asks, setAsks] = useState<string>(defaultData?.asks || "");
    const [learnings, setLearnings] = useState<string>(defaultData?.learnings || "");
    const [next30Days, setNext30Days] = useState<string>(defaultData?.next30Days || "");
    const [pastMonthCards, setPastMonthCards] = useState<EditorMonthCard[]>([]);
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const [selectedMonth, setSelectedMonth] = useState<string>(defaultData?.month || currentCreatePeriod.month);
    const [selectedYear, setSelectedYear] = useState<number>(defaultData?.year || currentCreatePeriod.year);
    const [activePeriodKey, setActivePeriodKey] = useState("current");
    const hasSelectedMonth = Boolean(selectedMonth.trim());
    const selectedMonthTheme = getVibeRaisingMonthTheme(selectedMonth);
    const selectedMonthUpdateKey = getMonthlyUpdateKey(selectedMonth, selectedYear);
    const targetMonthIso = getMonthlyUpdateIsoMonth(selectedMonth, selectedYear);
    const isSelectedMonthInFuture = hasSelectedMonth && isFutureMonthlyUpdate(selectedMonth, selectedYear);
    const existingUpdateForSelectedMonth = existingMonthlyUpdates.find(
        (update) => getMonthlyUpdateStorageKey(update) === selectedMonthUpdateKey,
    );
    const selectedMonthLabel = hasSelectedMonth ? `${selectedMonth} ${selectedYear}` : "Select a month";
    const catchUpMonthLabel = createStepMonthOptions[0]?.month || "May";
    const currentDraftMonthLabel = createStepMonthOptions[1]?.month || currentCreatePeriod.month;
    const monthSelectionCaption = `Select the month this update covers. ${catchUpMonthLabel} is available if you're catching up; ${currentDraftMonthLabel} is ready for your current draft.`;
    
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
    const draftMetricOptions = orderDraftMetricOptions(METRIC_OPTIONS);
    const draftMetricInitialCount = PRIMARY_DRAFT_METRIC_KEYS.length;
    const collapsedHiddenDraftMetricCount = draftMetricOptions.filter(
        (metric, index) => index >= draftMetricInitialCount && !String(metricValues[metric.key] || "").trim(),
    ).length;
    const [areDraftMetricsExpanded, setAreDraftMetricsExpanded] = useState(false);
    const [isMobileTourViewport, setIsMobileTourViewport] = useState(false);
    const [mobileTourOpen, setMobileTourOpen] = useState(false);
    const [mobileTourStepIndex, setMobileTourStepIndex] = useState(0);
    const [mobileTourChecked, setMobileTourChecked] = useState(false);
    const [mobileReviewHowItWorksSeen, setMobileReviewHowItWorksSeen] = useState(false);
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
    const materialsSectionRef = useRef<HTMLElement | null>(null);
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
    const draftStickyTriggerRef = useRef<HTMLDivElement | null>(null);
    const generateDraftSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
    const shouldDimMetricsTemplate = false;
    const [awakeMetricCards, setAwakeMetricCards] = useState<Set<string>>(new Set());
    const [showDraftStickyOnMobile, setShowDraftStickyOnMobile] = useState(false);
    const compactOptionalSources = useMemo(() => {
        const byKey = new Map(compactSources.map((source) => [source.key, source]));
        return COMPACT_OPTIONAL_SOURCE_KEYS
            .map((key) => byKey.get(key))
            .filter((source): source is VibeRaisingInputSourceSummary => Boolean(source && isConnectedInputSource(source)));
    }, [compactSources]);
    const selectedConnectedSourceLabels = useMemo(
        () => compactOptionalSources
            .filter((source) => selectedDraftInputSources.has(source.key))
            .map((source) => source.label),
        [compactOptionalSources, selectedDraftInputSources],
    );
    const draftReturnPath = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const selected = Array.from(selectedDraftInputSources);
        if (selected.length > 0) {
            params.set("inputs", selected.join(","));
        } else {
            params.delete("inputs");
        }
        const query = params.toString();
        return `${location.pathname}${query ? `?${query}` : ""}`;
    }, [location.pathname, location.search, selectedDraftInputSources]);
    const manageConnectionsHref = `/founder-tools/data-sources?next=${encodeURIComponent(draftReturnPath)}`;
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
        if (showAllCreateStepMonths) return;
        if (!selectedMonth.trim()) return;
        const isVisibleCreateStepMonth = createStepMonthOptions.some(
            (option) => option.month === selectedMonth && option.year === selectedYear,
        );
        if (isVisibleCreateStepMonth) return;
        setSelectedMonth("");
        setSelectedYear(currentCreatePeriod.year);
    }, [createStepMonthOptions, currentCreatePeriod.year, isEdit, selectedMonth, selectedYear, showAllCreateStepMonths]);

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

    const handleDraftComplete = (data: any) => {
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
        setMaterialsUploadError(null);
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
        setMaterialsUploadError(null);
    }, [revokePitchDeckPreviewObjectUrl]);

    const removePitchDeck = useCallback(() => {
        setPitchDeckUrl("");
        setPitchDeckSummary("");
        resetPitchDeckUpload();
    }, [resetPitchDeckUpload]);

    const uploadVideoFile = useCallback(async (file: File, options?: { forceCompress?: boolean }) => {
        const sequence = videoUploadSequenceRef.current + 1;
        videoUploadSequenceRef.current = sequence;
        videoUploadAbortRef.current?.abort();
        const abortController = new AbortController();
        videoUploadAbortRef.current = abortController;

        setMaterialsUploadError(null);
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

        setMaterialsUploadError(null);
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
        if (!isMobileTourViewport) {
            setMobileReviewHowItWorksSeen(false);
            return;
        }

        const syncMobileReviewIntro = () => {
            try {
                setMobileReviewHowItWorksSeen(window.localStorage.getItem(CREATE_UPDATE_MOBILE_TOUR_STORAGE_KEY) === "1");
            } catch {
                setMobileReviewHowItWorksSeen(false);
            }
        };

        syncMobileReviewIntro();
        window.addEventListener("focus", syncMobileReviewIntro);
        document.addEventListener("visibilitychange", syncMobileReviewIntro);
        return () => {
            window.removeEventListener("focus", syncMobileReviewIntro);
            document.removeEventListener("visibilitychange", syncMobileReviewIntro);
        };
    }, [isMobileTourViewport]);

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
                body: "Pick a month and start from the template. Connected data is optional if you want source-assisted drafting.",
                targetRef: draftStepperRef,
            },
            {
                key: "month",
                title: "Pick a month, then draft",
                body: "Choose the update month first. Early stage? No worries. A selfie video or short presentation can still tell the investor story well.",
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
        if (isSelectedMonthInFuture || !targetMonthIso) {
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
        isSelectedMonthInFuture,
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
        if (!hasSelectedMonth || isSelectedMonthInFuture) return;
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
                    draftTemplateSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            });
        }
    }, [hasSelectedMonth, isSelectedMonthInFuture]);

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
        if (!start || !isMobileTourViewport || !hasSelectedMonth || isSelectedMonthInFuture || emailDraftActionBusy) return;

        const touch = event.changedTouches[0];
        if (!touch) return;

        const deltaX = touch.clientX - start.x;
        const deltaY = Math.abs(touch.clientY - start.y);
        if (deltaX >= 72 && deltaY <= 40) {
            handleGenerateSelectedMonthUpdate();
        }
    }, [emailDraftActionBusy, handleGenerateSelectedMonthUpdate, hasSelectedMonth, isMobileTourViewport, isSelectedMonthInFuture]);

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
        ? `Generating ${selectedMonthLabel} update`
        : `Draft from ${selectedInputSourceDescription}`;
    const emailDraftButtonDescription = hasNoSourceForAssistedDraft
        ? "MLAI needs at least one approved source to generate a draft. You can also skip this and write manually."
        : emailDraftActionBusy
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
    useEffect(() => {
        if (!isMobileTourViewport || selectedDraftStage !== "reporting" || !hasDraftTemplate) {
            setShowDraftStickyOnMobile(false);
            return;
        }

        const updateStickyVisibility = () => {
            const trigger = draftStickyTriggerRef.current;
            if (!trigger) {
                setShowDraftStickyOnMobile(false);
                return;
            }

            const rect = trigger.getBoundingClientRect();
            setShowDraftStickyOnMobile(rect.top <= window.innerHeight - 140);
        };

        updateStickyVisibility();
        window.addEventListener("scroll", updateStickyVisibility, true);
        window.addEventListener("resize", updateStickyVisibility);
        return () => {
            window.removeEventListener("scroll", updateStickyVisibility, true);
            window.removeEventListener("resize", updateStickyVisibility);
        };
    }, [hasDraftTemplate, isMobileTourViewport, selectedDraftStage]);
    const hasAnyMetricValue = Object.values(metricValues).some((value) => String(value || "").trim().length > 0);
    const qualitativeDraftText = [highlights, challenges, learnings, next30Days, asks].join("\n");
    const hasQualitativeDraftText =
        qualitativeDraftText.replace(/[\s\-•]+/g, "").length >= STORY_MATERIALS_SUGGESTION_TEXT_THRESHOLD;
    const hasUploadedStoryMaterial = Boolean(
        String(uploadedPitchDeckUrl || pitchDeckStoragePath || "").trim() ||
        (pitchDeckUploadStatus === "ready" && String(pitchDeckPreviewUrl || "").trim()) ||
        String(uploadedVideoUrl || videoStoragePath || "").trim() ||
        (videoUploadStatus === "ready" && String(videoPreviewUrl || "").trim())
    );
    const draftQuestionCompletionItems = [
        { label: "Highlights", done: String(highlights || "").trim().length > 0 },
        { label: "Challenges", done: String(challenges || "").trim().length > 0 },
        { label: "Learnings", done: String(learnings || "").trim().length > 0 },
        { label: "Next", done: String(next30Days || "").trim().length > 0 },
        { label: "Ask", done: String(asks || "").trim().length > 0 },
    ];
    const draftProgressItems = [
        { label: "Story", done: hasUploadedStoryMaterial },
        { label: "Metrics", done: hasAnyMetricValue },
        ...draftQuestionCompletionItems,
    ];
    const draftCompletedCount = draftProgressItems.filter((item) => item.done).length;
    const draftCompletionPercent = Math.round((draftCompletedCount / draftProgressItems.length) * 100);
    const nextDraftProgressItem = draftProgressItems.find((item) => !item.done);
    const shouldSuggestStoryMaterials =
        hasDraftTemplate &&
        hasQualitativeDraftText &&
        !hasAnyMetricValue &&
        !hasUploadedStoryMaterial &&
        dismissedStoryMaterialsSuggestionKey !== selectedMonthUpdateKey;

    useEffect(() => {
        if (!shouldSuggestStoryMaterials) {
            setShowStoryMaterialsSuggestion(false);
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setShowStoryMaterialsSuggestion(true);
        }, 900);

        return () => window.clearTimeout(timeoutId);
    }, [shouldSuggestStoryMaterials]);

    const dismissStoryMaterialsSuggestion = useCallback(() => {
        setDismissedStoryMaterialsSuggestionKey(selectedMonthUpdateKey);
        setShowStoryMaterialsSuggestion(false);
    }, [selectedMonthUpdateKey]);

    const handleAddStoryMaterials = useCallback(() => {
        dismissStoryMaterialsSuggestion();
        window.setTimeout(() => {
            materialsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightMaterialsSection(true);
            window.setTimeout(() => setHighlightMaterialsSection(false), 2400);
        }, 80);
    }, [dismissStoryMaterialsSuggestion]);

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
            aria-label={`Selected update month: ${selectedMonthLabel}`}
        >
            <div className="flex w-full min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                        Selected month
                    </p>
                    <p className="truncate text-base font-black text-gray-950">
                        {selectedMonthLabel}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={returnToMonthSelection}
                    className="flex-shrink-0 cursor-pointer rounded-full border border-[rgba(0,128,128,0.18)] bg-[rgba(0,255,215,0.10)] px-3 py-1 text-xs font-black text-[var(--vr-color-primary)] transition hover:border-[var(--vr-color-primary)] hover:bg-[var(--vr-color-primary)] hover:text-white focus:outline-none focus:ring-4 focus:ring-[rgba(0,255,215,0.18)]"
                    aria-label={`Edit selected update month: ${selectedMonthLabel}`}
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
                statusTitle: "Select month",
                statusDetail: selectedMonthLabel,
                primaryLabel: "Start draft",
                onPrimary: handleGenerateSelectedMonthUpdate,
                primaryDisabled: !hasSelectedMonth || isSelectedMonthInFuture || emailDraftActionBusy,
                primaryType: "button" as const,
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
                primaryLabel: isSubmitting ? "Saving..." : "Save and review",
                primaryType: "submit" as const,
                primaryForm: DRAFT_REVIEW_FORM_ID,
                primaryDisabled: isSubmitting,
                onBack: () => setMonthConfirmed(false),
            };
        }

        return {
            statusTitle: isManualOnlyDraftFlow ? "Draft template ready" : "AI draft ready",
            statusDetail: selectedMetricOptions.length > 0
                ? `AI selected ${selectedMetricOptions.length} metric${selectedMetricOptions.length === 1 ? "" : "s"} for ${selectedMonthLabel}.`
                : isManualOnlyDraftFlow
                    ? undefined
                    : `AI drafted ${selectedMonthLabel}; core metrics are ready to edit below.`,
            primaryLabel: isSubmitting ? "Saving..." : "Save and review",
            primaryType: "submit" as const,
            primaryForm: DRAFT_REVIEW_FORM_ID,
            primaryDisabled: isSubmitting,
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
            setMaterialsUploadError(null);
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

    const removeWalkthroughMedia = useCallback(() => {
        if (mediaRecorderRef.current?.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        setRecordingError(null);
        setRecordingMode(null);
        setIsRecording(false);
        setIsRecordingPermissionPending(false);
        stopMediaStream();
        resetVideoUpload();
    }, [resetVideoUpload, stopMediaStream]);

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
    const onMaterialsDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        if (!uploadedFile) return;
        setMaterialsUploadError(null);
        if (isSupportedPitchDeckFile(uploadedFile)) {
            void uploadPitchDeckFile(uploadedFile);
            return;
        }
        if (isSupportedVideoFile(uploadedFile)) {
            void uploadVideoFile(uploadedFile);
            return;
        }
        setMaterialsUploadError("Use a PDF, PPT, PPTX, MP3, or a common video format like MP4, MOV, M4V, WebM, AVI, MPEG, 3GP, OGV, or MKV.");
    }, [uploadPitchDeckFile, uploadVideoFile]);
    const onMaterialsDropRejected = useCallback((fileRejections: any[]) => {
        setMaterialsUploadError(getDropzoneRejectionMessage(fileRejections));
    }, []);
    const { getRootProps: getMaterialsRootProps, getInputProps: getMaterialsInputProps, isDragActive: isMaterialsDragActive, open: openMaterialsPicker } = useDropzone({
        onDrop: onMaterialsDrop,
        onDropRejected: onMaterialsDropRejected,
        maxFiles: 1,
        multiple: false,
        noClick: true,
        maxSize: MAX_SOURCE_VIDEO_BYTES,
        accept: SHARED_MATERIAL_ACCEPT,
    });

    const materialsSection = (
        <section
            ref={materialsSectionRef}
            className={clsx(
                "scroll-mt-28 rounded-[2rem] pt-4 transition-all duration-300 sm:pt-6",
                highlightMaterialsSection && "ring-4 ring-[rgba(242,114,63,0.28)] ring-offset-4 ring-offset-[var(--vr-palette-paper)]",
            )}
        >
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-black text-gray-950">Add a deck or short founder walkthrough.</h2>
                </div>
            </div>
            <div className="relative mt-6">
                <fieldset disabled={isEmailDraftBusy} className={clsx(isEmailDraftBusy && "opacity-80")}>
                    <div className="contents">
                        <div
                            {...getMaterialsRootProps()}
                            className={clsx(
                                "relative flex flex-col items-center justify-center rounded-[2rem] border p-6 text-center shadow-sm transition-all sm:p-8 lg:p-10",
                                isMaterialsDragActive
                                    ? "scale-[1.01] border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)]"
                                    : "border-[var(--vr-color-border)] bg-white",
                            )}
                        >
                            <input {...getMaterialsInputProps()} />
                            <div className="w-full max-w-4xl">
                                <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                                    <button
                                        type="button"
                                        disabled={isEmailDraftBusy}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openMaterialsPicker();
                                        }}
                                        className="group flex min-h-44 cursor-pointer flex-col items-center rounded-2xl p-4 text-center transition hover:bg-[rgba(0,128,128,0.05)] focus:outline-none focus:ring-2 focus:ring-[var(--vr-color-primary)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 md:items-start md:text-left"
                                    >
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-color-primary)]">
                                            Pitch deck
                                        </p>
                                        <h3 className="mt-2 text-xl font-black text-gray-950">Upload deck</h3>
                                        <span className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-black px-5 py-2 text-sm font-black text-white shadow-sm transition group-hover:bg-gray-900">
                                            <CloudArrowUpIcon className="h-4 w-4" aria-hidden="true" />
                                            Upload file
                                        </span>
                                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                                            Slides, bio, market story, traction.
                                        </p>
                                        <p className="mt-2 text-xs font-black uppercase tracking-[0.08em] text-slate-400">
                                            PDF, PPT, or PPTX
                                        </p>
                                        <p className="mt-1 text-[11px] font-bold text-slate-400">
                                            Up to {MAX_PITCH_DECK_UPLOAD_SIZE_MB} MB
                                        </p>
                                    </button>

                                    <div className="h-px w-full bg-[var(--vr-color-border)] md:h-auto md:w-px" aria-hidden />

                                    <button
                                        type="button"
                                        disabled={isEmailDraftBusy || isRecordingPermissionPending}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            if (isRecording) {
                                                stopRecording();
                                            } else {
                                                void startRecording();
                                            }
                                        }}
                                        className={clsx(
                                            "group flex min-h-44 cursor-pointer flex-col items-center rounded-2xl p-4 text-center transition focus:outline-none focus:ring-2 focus:ring-[var(--vr-palette-coral)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 md:items-start md:text-left",
                                            isRecording ? "bg-[rgba(242,114,63,0.10)]" : "hover:bg-[rgba(242,114,63,0.06)]",
                                        )}
                                    >
                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-palette-coral)]">
                                            Walkthrough video
                                        </p>
                                        <span className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-black px-5 py-2 text-sm font-black text-white shadow-sm transition group-hover:bg-gray-900">
                                            <VideoCameraIcon className="h-4 w-4" aria-hidden="true" />
                                            {isRecordingPermissionPending ? "Requesting access" : isRecording ? "Stop recording" : "Start recording"}
                                        </span>
                                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                                            Useful when metrics are light.
                                        </p>
                                        <p className="mt-2 text-xs font-black uppercase tracking-[0.08em] text-slate-400">
                                            MP4, MOV, WebM
                                        </p>
                                        <p className="mt-1 text-[11px] font-bold text-slate-400">
                                            Up to {MAX_VIDEO_UPLOAD_SIZE_MB} MB
                                        </p>
                                    </button>
                                </div>

                                {isRecordingPermissionPending ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-color-primary)]">
                                        Waiting for your browser camera and microphone prompt...
                                    </p>
                                ) : null}
                                {isRecording ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">
                                        Recording {recordingMode === "audio" ? "audio" : "video"} now. Click Stop recording when you are done.
                                    </p>
                                ) : null}
                                {pitchDeckPreviewUrl ? (
                                    <div
                                        className="mt-6"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <div className="mb-3 flex items-center justify-between gap-3 text-left">
                                            <div>
                                                <p className="text-sm font-black text-gray-950">Pitch deck preview</p>
                                                <p className="mt-1 text-xs font-semibold text-slate-500">
                                                    {isPdfPitchDeck(pitchDeckContentType, pitchDeckOriginalFilename, pitchDeckPreviewUrl)
                                                        ? "Showing the first PDF page."
                                                        : "PowerPoint file attached."}
                                                </p>
                                            </div>
                                            <div className="flex flex-shrink-0 items-center gap-2">
                                                {pitchDeckUploadStatusLabel ? (
                                                    <span className="rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)]">
                                                        {pitchDeckUploadStatusLabel}
                                                    </span>
                                                ) : null}
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        removePitchDeck();
                                                    }}
                                                    className="rounded-full border border-[rgba(242,114,63,0.24)] bg-white px-3 py-1 text-xs font-extrabold text-[var(--vr-palette-coral)] transition hover:bg-[rgba(242,114,63,0.08)]"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <PitchDeckAssetPreview
                                            src={pitchDeckPreviewUrl}
                                            openUrl={uploadedPitchDeckUrl || pitchDeckUrl || pitchDeckPreviewUrl}
                                            contentType={pitchDeckContentType}
                                            fileName={pitchDeckOriginalFilename}
                                            fileSizeBytes={pitchDeckFileSizeBytes}
                                        />
                                    </div>
                                ) : null}
                                {videoPreviewUrl && previewMediaKind ? (
                                    <div
                                        className="mt-6 overflow-hidden rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] p-4 text-left"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-black text-gray-950">
                                                    {previewMediaKind === "audio" ? "Recorded audio preview" : "Recorded video preview"}
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-slate-500">
                                                    Review it here before you continue.
                                                </p>
                                            </div>
                                            <div className="flex flex-shrink-0 items-center gap-2">
                                                {videoUploadStatusLabel ? (
                                                    <span className="rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1 text-xs font-bold text-[var(--vr-color-primary)]">
                                                        {videoUploadStatusLabel}
                                                    </span>
                                                ) : null}
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        removeWalkthroughMedia();
                                                    }}
                                                    className="rounded-full border border-[rgba(242,114,63,0.24)] bg-white px-3 py-1 text-xs font-extrabold text-[var(--vr-palette-coral)] transition hover:bg-[rgba(242,114,63,0.08)]"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        {previewMediaKind === "audio" ? (
                                            <audio
                                                src={videoPreviewUrl}
                                                controls
                                                className="w-full"
                                            />
                                        ) : (
                                            <VideoAssetPreview
                                                src={videoPreviewUrl}
                                                contentType={videoContentType || "video/webm"}
                                                fileName={videoOriginalFilename || "Recorded walkthrough"}
                                                fileSizeBytes={videoFileSizeBytes}
                                                className="aspect-video w-full rounded-xl"
                                            />
                                        )}
                                    </div>
                                ) : null}
                                {recordingError ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">{recordingError}</p>
                                ) : null}
                                {videoUploadStatusLabel && !videoPreviewUrl ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-color-primary)]">{videoUploadStatusLabel}</p>
                                ) : null}
                                {videoUploadError ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">{videoUploadError}</p>
                                ) : null}
                                {pitchDeckUploadStatusLabel && !pitchDeckPreviewUrl ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-color-primary)]">{pitchDeckUploadStatusLabel}</p>
                                ) : null}
                                {pitchDeckUploadError ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">{pitchDeckUploadError}</p>
                                ) : null}
                                {materialsUploadError ? (
                                    <p className="mt-4 text-sm font-semibold text-[var(--vr-palette-coral)]">{materialsUploadError}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </fieldset>
                {isEmailDraftBusy && (
                    <div className="absolute inset-0 z-10 cursor-wait rounded-[2rem] bg-white/30" aria-hidden />
                )}
            </div>
        </section>
    );

    const connectedDataSummary = selectedConnectedSourceLabels.length > 0
        ? selectedConnectedSourceLabels.join(", ")
        : compactSourcesLoading
            ? "Checking sources..."
            : "Manual draft only";

    const optionalDataSourcesSection = (
        <section className="flex min-h-[5.25rem] w-full items-center rounded-2xl border border-[var(--vr-color-border)] bg-white px-5 py-3 shadow-sm sm:min-h-0 sm:rounded-[2rem] sm:p-6">
            <div className="flex w-full min-w-0 items-center justify-between gap-3 sm:flex-col sm:items-stretch sm:gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 items-center gap-3 sm:block">
                    <div className="min-w-0">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 sm:text-xl sm:normal-case sm:tracking-normal sm:text-gray-950">
                            <span className="sm:hidden">Connect data</span>
                            <span className="hidden sm:inline">Connect data for AI drafting</span>
                        </h2>
                        <p className="mt-1 truncate text-base font-black leading-tight text-gray-950 sm:hidden">
                            {connectedDataSummary}
                        </p>
                        <p className="mt-2 hidden max-w-2xl text-sm leading-6 text-slate-600 sm:block">
                            The draft template works without connected data. Select a connected source only if you want MLAI to generate a source-assisted first draft.
                        </p>
                    </div>
                </div>
                <Link
                    to={manageConnectionsHref}
                    className="inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(0,128,128,0.18)] bg-[rgba(0,255,215,0.10)] px-3 py-1 text-xs font-black text-[var(--vr-color-primary)] transition hover:border-[var(--vr-color-primary)] hover:bg-[var(--vr-color-primary)] hover:text-white sm:rounded-xl sm:border-[var(--vr-color-border)] sm:bg-[var(--vr-palette-paper)] sm:px-4 sm:py-3 sm:text-sm sm:font-extrabold sm:text-[var(--vr-color-text)] sm:hover:bg-[var(--vr-palette-paper)] sm:hover:text-[var(--vr-color-primary)]"
                >
                    <span className="sm:hidden">Manage</span>
                    <span className="hidden sm:inline">Manage connections</span>
                </Link>
            </div>
            {compactSourcesError ? (
                <p className="mt-4 rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
                    {compactSourcesError}
                </p>
            ) : null}

            <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
                {selectedConnectedSourceLabels.length > 0 ? (
                    selectedConnectedSourceLabels.map((label) => (
                        <span
                            key={label}
                            className="rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1 text-xs font-black text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]"
                        >
                            Using {label}
                        </span>
                    ))
                ) : (
                    <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-gray-100">
                        Manual draft only
                    </span>
                )}
                {compactSourcesLoading ? (
                    <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-gray-100">
                        Checking sources...
                    </span>
                ) : null}
            </div>

            <div className="mt-5 hidden sm:block">
                <div className="grid grid-cols-3 gap-3 lg:grid-cols-8">
                {compactOptionalSources.map((source) => {
                    const connected = isConnectedInputSource(source);
                    const selected = selectedDraftInputSources.has(source.key);
                    return (
                        <button
                            key={source.key}
                            type="button"
                            disabled={!connected}
                            onClick={() => toggleDraftInputSource(source)}
                            className={clsx(
                                "group relative flex min-w-0 flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition sm:px-3",
                                source.key !== "google_analytics" && source.key !== "stripe" && "hidden lg:flex",
                                connected
                                    ? selected
                                        ? "cursor-pointer border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] ring-1 ring-[rgba(0,128,128,0.16)]"
                                        : "cursor-pointer border-gray-200 bg-white hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.08)]"
                                    : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60",
                            )}
                            title={`${source.label}: ${compactSourceStatusLabel(source)}`}
                            aria-pressed={connected ? selected : undefined}
                            aria-label={`${selected ? "Remove" : "Use"} ${source.label} for source-assisted drafting`}
                        >
                            <DraftSourceLogo sourceKey={source.key} />
                            <span
                                className={clsx(
                                    "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-white text-[10px] font-black shadow-sm",
                                    selected
                                        ? "border-[var(--vr-color-primary)] text-[var(--vr-color-primary)]"
                                        : connected
                                            ? "border-emerald-200 text-emerald-500"
                                            : "border-gray-200 text-gray-300",
                                )}
                                aria-hidden
                            >
                                {selected ? (
                                    <CheckCircleIcon className="h-4 w-4" />
                                ) : connected ? (
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                ) : null}
                            </span>
                            <span className="w-full truncate text-xs font-black text-gray-950">{source.label}</span>
                            <span
                                className={clsx(
                                    "w-full truncate text-[11px] font-bold",
                                    connected ? "text-[var(--vr-color-primary)]" : "text-slate-400",
                                )}
                            >
                                {compactSourceStatusLabel(source)}
                            </span>
                        </button>
                    );
                })}
                    <Link
                        to={manageConnectionsHref}
                        className="group relative flex min-w-0 cursor-pointer flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white px-2 py-3 text-center transition hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.08)] sm:px-3 lg:hidden"
                        aria-label="Open all source connections"
                    >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                            </span>
                        </span>
                        <span className="w-full truncate text-xs font-black text-gray-950">More</span>
                        <span className="w-full truncate text-[11px] font-bold text-slate-400">Connections</span>
                    </Link>
                </div>
            </div>
        </section>
    );

    const handlePersistDraft = useCallback(() => {
        const draftForm = document.getElementById(DRAFT_REVIEW_FORM_ID);
        if (!(draftForm instanceof HTMLFormElement)) return;
        const nextFormData = new FormData(draftForm);
        nextFormData.set("intent", "save-draft");
        saveDraftFetcher.submit(nextFormData, { method: "post" });
    }, [saveDraftFetcher]);

    // 1. Feedback View — preview-dominant with rating sidebar
    if ((actionData?.step === "feedback" || actionData?.step === "publish-error") && !dismissedFeedback) {
        const { feedback, data } = actionData;
        const publishError = actionData.step === "publish-error" ? String((actionData as any).error || "") : "";
        const reviewData = data as any;
        const rawReviewDraftId = String(reviewData?.draftId || actionData?.update?.id || "").trim();
        const reviewDraftId = BACKEND_DRAFT_ID_PATTERN.test(rawReviewDraftId) ? rawReviewDraftId : "";
        const reviewMonth = String(reviewData?.month || selectedMonth);
        const reviewYear = Number(reviewData?.year || selectedYear);
        const reviewSummary = String(reviewData?.summary || "").trim();
        const reviewSourceUrl = String(reviewData?.sourceUrl || "").trim();
        const reviewPitchDeckUrl = String(reviewData?.pitchDeckUrl || "").trim();
        const reviewPitchDeckStoragePath = String(reviewData?.pitchDeckStoragePath || "").trim();
        const reviewPitchDeckContentType = String(reviewData?.pitchDeckContentType || "").trim();
        const reviewPitchDeckOriginalFilename = String(reviewData?.pitchDeckOriginalFilename || "").trim();
        const reviewPitchDeckSummary = String(reviewData?.pitchDeckSummary || "").trim();
        const reviewPitchDeckFileSizeBytes = Number(reviewData?.pitchDeckFileSizeBytes || 0) || null;
        const reviewPitchDeckPreviewUrl = pitchDeckPreviewUrl || reviewPitchDeckUrl || uploadedPitchDeckUrl;
        const reviewPitchDeckOpenUrl = reviewPitchDeckUrl || uploadedPitchDeckUrl || pitchDeckPreviewUrl;
        const hasReviewPitchDeck = Boolean(reviewPitchDeckPreviewUrl);
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
        const reviewManualDocuments = Array.isArray(reviewData?.manualDocuments || reviewData?.manual_documents)
            ? (reviewData.manualDocuments || reviewData.manual_documents) as VibeRaisingManualDocument[]
            : manualDocuments;
        const reviewManualDocumentIds = reviewManualDocuments.map((document) => document.id);
        const reviewManualSummary = String(reviewData?.manualSummary || reviewData?.manual_summary || manualSummary || "").trim();
        const reviewVideoUrl = String(reviewData?.videoUrl || videoPreviewUrl || "").trim();
        const reviewVideoStoragePath = String(reviewData?.videoStoragePath || videoStoragePath || "").trim();
        const reviewVideoContentType = String(reviewData?.videoContentType || videoContentType || "").trim();
        const reviewVideoOriginalFilename = String(reviewData?.videoOriginalFilename || videoOriginalFilename || "").trim();
        const reviewVideoFileSizeBytes = Number(reviewData?.videoFileSizeBytes || videoFileSizeBytes || 0) || null;
        const reviewMediaIsAudio = isAudioMedia(reviewVideoContentType, reviewVideoOriginalFilename || reviewVideoUrl);
        const reviewPitchDeckLabel = reviewPitchDeckOriginalFilename || pitchDeckOriginalFilename || "Pitch deck file";
        const reviewVideoLabel = reviewVideoOriginalFilename || (reviewMediaIsAudio ? "Founder voice note" : "Founder walkthrough");
        const reviewAudienceVisibility = normalizeAudienceVisibilityValue(reviewData?.audienceVisibility || audienceVisibility);
        const reviewAudienceText = [
            String(reviewData?.highlights || ""),
            String(reviewData?.challenges || ""),
            String(reviewData?.learnings || ""),
            String(reviewData?.next30Days || ""),
            String(reviewData?.asks || ""),
            reviewPitchDeckOriginalFilename,
            reviewVideoOriginalFilename,
        ].join(" ").toLowerCase();
        const reviewAudienceCriteria: string[] = [];
        if (reviewAudienceText.includes("saas") || reviewAudienceText.includes("software")) reviewAudienceCriteria.push("B2B SaaS");
        if (reviewAudienceText.includes("health") || reviewAudienceText.includes("medtech") || reviewAudienceText.includes("medical")) reviewAudienceCriteria.push("MedTech");
        if (reviewAudienceText.includes("agri") || reviewAudienceText.includes("farm") || reviewAudienceText.includes("agriculture")) reviewAudienceCriteria.push("AgTech");
        if (reviewAudienceText.includes("ai") || reviewAudienceText.includes("machine learning") || reviewAudienceText.includes("artificial intelligence")) reviewAudienceCriteria.push("AI/ML");
        if (reviewAudienceText.includes("enterprise") || reviewAudienceText.includes("b2b") || reviewAudienceText.includes("fortune 500")) reviewAudienceCriteria.push("Enterprise");
        if (reviewAudienceText.includes("fintech") || reviewAudienceText.includes("finance") || reviewAudienceText.includes("payment")) reviewAudienceCriteria.push("FinTech");
        if (reviewAudienceText.includes("consumer") || reviewAudienceText.includes("b2c")) reviewAudienceCriteria.push("Consumer Tech");
        if (reviewAudienceCriteria.length === 0) reviewAudienceCriteria.push("Sector Agnostic", "Early Stage");
        const reviewAudienceCount = 18 + (reviewAudienceCriteria.length * 14);

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
        };

        const getPublishDebugPayload = () => {
            const publishForm = document.getElementById(PUBLISH_REVIEW_FORM_ID);
            const formEntries =
                publishForm instanceof HTMLFormElement
                    ? Object.fromEntries(new FormData(publishForm).entries())
                    : null;

            return {
                rawReviewDraftId,
                reviewDraftId,
                reviewMonth,
                reviewYear,
                isSubmitting,
                formEntries,
                url: window.location.href,
                timestamp: new Date().toISOString(),
            };
        };

        const handlePublishPopupOpen = () => {
            const payload = getPublishDebugPayload();
            console.error("[monthly-update:publish] confirmation opened", payload);
            window.localStorage.setItem("monthly-update-publish-confirmation-debug", JSON.stringify(payload));
            setShowConfirmPopup(true);
        };

        const handlePublishDebugClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            const publishForm = document.getElementById(PUBLISH_REVIEW_FORM_ID);
            const draftReviewForm = document.getElementById(DRAFT_REVIEW_FORM_ID);
            const formData =
                draftReviewForm instanceof HTMLFormElement
                    ? new FormData(draftReviewForm)
                    : publishForm instanceof HTMLFormElement
                        ? new FormData(publishForm)
                        : null;

            if (formData) {
                formData.set("intent", "publish");
                formData.set("month", reviewMonth);
                formData.set("year", String(reviewYear));
                if (reviewDraftId) {
                    formData.set("draftId", reviewDraftId);
                } else {
                    formData.delete("draftId");
                }
            }

            const payload = {
                ...getPublishDebugPayload(),
                willSubmit: Boolean(formData),
                submitSource: draftReviewForm instanceof HTMLFormElement ? DRAFT_REVIEW_FORM_ID : PUBLISH_REVIEW_FORM_ID,
                submitEntries: formData ? Object.fromEntries(formData.entries()) : null,
            };
            console.error("[monthly-update:publish] popup button clicked", payload);
            window.localStorage.setItem("monthly-update-publish-submit-debug", JSON.stringify(payload));

            if (!formData) {
                console.error("[monthly-update:publish] hidden publish form not found", {
                    formId: PUBLISH_REVIEW_FORM_ID,
                });
                setShowConfirmPopup(true);
                return;
            }

            const actionPath = `${location.pathname}${location.search || ""}`;
            console.error("[monthly-update:publish] invoking router submit", JSON.stringify({
                actionPath,
                formEntries: Object.fromEntries(formData.entries()),
                timestamp: new Date().toISOString(),
            }));
            submit(formData, { method: "post", action: actionPath });
            console.error("[monthly-update:publish] router submit invoked", JSON.stringify({
                actionPath,
                timestamp: new Date().toISOString(),
            }));
        };

        return (
            <div className="mx-auto max-w-6xl space-y-10 pb-32">
                <Form id={PUBLISH_REVIEW_FORM_ID} method="POST" className="hidden">
                    <input type="hidden" name="intent" value="publish" />
                    {reviewDraftId ? <input type="hidden" name="draftId" value={reviewDraftId} /> : null}
                    <input type="hidden" name="audienceVisibility" value={reviewAudienceVisibility} />
                    <input type="hidden" name="month" value={reviewMonth} />
                    <input type="hidden" name="year" value={reviewYear} />
                </Form>

                {showConfirmPopup ? (
                    <div
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
                        onClick={() => setShowConfirmPopup(false)}
                    >
                        <div
                            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <MonthlyUpdateStepper
                                activeStep="publish"
                                disableMotion
                                enabledSteps={["connect", "draft", "review", "publish"]}
                                onStepClick={handleReviewStepperClick}
                                expandOnHover
                                frameless
                                className="mb-6 text-left"
                            />
                            <h2 className="mb-2 text-2xl font-black tracking-tight text-gray-900">Ready to publish?</h2>
                            <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                Your update is about to go live on Vibe Raising for <strong className="font-bold text-gray-900">{reviewAudienceCount} investors</strong> matching your criteria: {reviewAudienceCriteria.join(", ")}.
                            </p>
                            <p className="mb-6 rounded-xl border border-[rgba(0,255,215,0.24)] bg-[rgba(0,255,215,0.10)] px-4 py-3 text-left text-sm leading-relaxed text-[var(--vr-color-text)]">
                                You do not need to publish this yet. Save it locally first if you want to come back and keep refining the earlier steps.
                            </p>
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    disabled
                                    aria-disabled="true"
                                    className="w-full cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 text-sm font-bold text-gray-500 shadow-sm"
                                >
                                    Publish update coming soon
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handlePersistDraft();
                                        setShowConfirmPopup(false);
                                    }}
                                    disabled={saveDraftFetcher.state !== "idle"}
                                    className="w-full rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition-all hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-55 active:scale-95"
                                >
                                    {saveDraftFetcher.state !== "idle" ? "Saving..." : "Save it locally"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}

                <MonthlyUpdateStepper
                    activeStep="review"
                    disableMotion
                    enabledSteps={["connect", "draft", "review"]}
                    onStepClick={handleReviewStepperClick}
                    expandOnHover
                    frameless
                    className="mt-8"
                />

                <div className={clsx(
                    "rounded-2xl border border-[var(--vr-color-border)] bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5",
                    isMobileTourViewport && mobileReviewHowItWorksSeen && "hidden sm:block",
                )}>
                    <div className="min-w-0">
                        <h2 className="text-lg font-black text-gray-950">How it works</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Review shows exactly what investors will see before you publish this monthly update.
                        </p>
                    </div>

                    <div className="mt-4 border-t border-[var(--vr-color-border)] pt-4 sm:mt-6 sm:pt-6">
                        <div className="min-w-0">
                            <h3 className="text-lg font-black text-gray-950">Your audience</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                We found <strong className="font-extrabold text-[var(--vr-palette-blue)]">{reviewAudienceCount} investors</strong> on Vibe Raising actively looking for updates matching your criteria.
                            </p>
                            <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
                                {reviewAudienceCriteria.map((criteria) => (
                                    <span key={criteria} className="rounded-lg border border-[rgba(76,110,245,0.24)] bg-[rgba(76,110,245,0.08)] px-2.5 py-1 text-xs font-semibold text-[var(--vr-palette-blue)]">
                                        {criteria}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main layout: investor preview. AI grading/feedback is hidden for now. */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-start">

                    {/* PREVIEW — dominant, takes most of the width */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                                                        This {reviewMediaIsAudio ? "voice note" : "video"} will appear with the deck so investors can hear the story directly.
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
                                    label="Ask from Investors"
                                    text={(data as any)?.asks}
                                />
                            </div>
                        </div>

                        {/* Revenue chart + Past month previews */}
                        {!hasReviewPitchDeck && (() => {
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
                                This update is saved privately in <Link to="/founder-tools/drafts" className="font-black text-[var(--vr-color-primary)] hover:text-[var(--vr-palette-black)]">My Drafts</Link> until you publish it.
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
                                        Investors use founder LinkedIn as a quick trust signal. Add or update it here and it will be saved with this update.
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

                    {/* Pre-Publish Confirmation Popup */}
                    {false && showConfirmPopup && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
                                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center relative overflow-hidden animate-in fade-in zoom-in duration-300">
                                    <div className="mb-6 text-left">
                                        <p className="inline-flex rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                                            Coming soon
                                        </p>
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Ready to send? 🚀</h2>
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                        Your update is about to go live on Vibe Raising for <strong className="font-bold text-gray-900">{reviewAudienceCount} investors</strong> matching your criteria: {reviewAudienceCriteria.join(", ")}.
                                    </p>
                                    <p className="mb-6 rounded-xl border border-[rgba(0,255,215,0.24)] bg-[rgba(0,255,215,0.10)] px-4 py-3 text-left text-sm leading-relaxed text-[var(--vr-color-text)]">
                                        You do not need to publish this yet. Save it locally first if you want to come back and keep refining the earlier steps.
                                    </p>

                                    <Form 
                                        method="POST" 
                                        className="space-y-3"
                                    >
                                        <input type="hidden" name="intent" value="publish" />
                                        {reviewDraftId ? <input type="hidden" name="draftId" value={reviewDraftId} /> : null}
                                        <input type="hidden" name="summary" value={reviewSummary} />
                                        <input type="hidden" name="sourceUrl" value={reviewSourceUrl} />
                                        <input type="hidden" name="pitchDeckUrl" value={reviewPitchDeckUrl} />
                                        <input type="hidden" name="pitchDeckStoragePath" value={reviewPitchDeckStoragePath} />
                                        <input type="hidden" name="pitchDeckContentType" value={reviewPitchDeckContentType} />
                                        <input type="hidden" name="pitchDeckFileSizeBytes" value={reviewPitchDeckFileSizeBytes ?? ""} />
                                        <input type="hidden" name="pitchDeckOriginalFilename" value={reviewPitchDeckOriginalFilename} />
                                        <input type="hidden" name="pitchDeckSummary" value={reviewPitchDeckSummary} />
                                        <input type="hidden" name="manualDocumentIds" value={reviewManualDocumentIds.join(",")} />
                                        <input type="hidden" name="manualSummary" value={reviewManualSummary} />
                                        <input type="hidden" name="videoUrl" value={reviewVideoUrl} />
                                        <input type="hidden" name="videoStoragePath" value={reviewVideoStoragePath} />
                                        <input type="hidden" name="videoContentType" value={reviewVideoContentType} />
                                        <input type="hidden" name="videoFileSizeBytes" value={reviewVideoFileSizeBytes ?? ""} />
                                        <input type="hidden" name="videoOriginalFilename" value={reviewVideoOriginalFilename} />
                                        <input type="hidden" name="founderProfiles" value={JSON.stringify(founderProfilesForSave)} />
                                        {Object.entries(data || {})
                                            .filter(([key]) => !["summary", "sourceUrl", "pitchDeckUrl", "pitchDeckStoragePath", "pitchDeckContentType", "pitchDeckFileSizeBytes", "pitchDeckOriginalFilename", "pitchDeckSummary", "manualDocumentIds", "manualSummary", "manualDocuments", "videoUrl", "videoStoragePath", "videoContentType", "videoFileSizeBytes", "videoOriginalFilename", "founderProfiles"].includes(key))
                                            .map(([key, value]) => (
                                                <input key={key} type="hidden" name={key} value={value as any} />
                                            ))}
                                        
                                        <div className="group relative">
                                            <button
                                                type="submit"
                                                disabled
                                                aria-disabled="true"
                                                className="w-full rounded-xl bg-gray-200 px-5 py-3 text-sm font-bold text-gray-500 shadow-sm transition-all cursor-not-allowed"
                                            >
                                                Yes, Publish and Send
                                            </button>
                                            <div className="pointer-events-none absolute inset-x-0 -top-11 flex justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                                <span className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-lg">
                                                    Coming soon
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handlePersistDraft();
                                                setShowConfirmPopup(false);
                                            }}
                                            disabled={saveDraftFetcher.state !== "idle"}
                                            className="w-full rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition-all hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-55 active:scale-95"
                                        >
                                            {saveDraftFetcher.state !== "idle" ? "Saving..." : "Save it locally"}
                                        </button>
                                    </Form>
                                </div>
                            </div>
                    )}

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
                    hideStatus
                    compactOnMobile
                    statusTitle={`Review ${reviewMonth} ${reviewYear} update`}
                    onBack={() => setDismissedFeedback(true)}
                    primaryLabel="Publish update"
                    mobilePrimaryLabel="Publish"
                    onPrimary={handlePublishPopupOpen}
                />

                {publishError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800 shadow-sm">
                        {publishError}
                    </div>
                ) : null}
            </div>
        );
    }

    // 3. Create/Edit Form View
    return (
        <div className="mx-auto max-w-6xl space-y-4 pb-32 sm:space-y-10">
            <div className="space-y-4">
                <div ref={draftStepperRef} className="hidden sm:block">
                    <MonthlyUpdateStepper
                        activeStep="draft"
                        disableMotion
                        enabledSteps={isEdit ? ["draft"] : ["draft", "connect"]}
                        onStepClick={handleDraftStepperClick}
                        expandOnHover
                        frameless
                        className="mt-8"
                    />
                </div>
            </div>

            {!monthConfirmed ? (
            <section>
                <div className="space-y-4">
                        <div ref={monthSelectorRef} className="space-y-3">
                            <div className="hidden sm:block">
                                <h2 className="text-3xl font-black tracking-tight text-gray-950">
                                    Select month
                                </h2>
                            </div>
                            <div className="overflow-visible rounded-[2rem] border border-[var(--vr-color-border)] bg-white p-5 shadow-sm transition-all sm:p-8 lg:p-10">
                                <div className="grid gap-4">
                                    <div>
                                        <div className="rounded-3xl border border-gray-200 bg-[var(--vr-palette-paper)] p-4 shadow-sm sm:p-5">
                                            <p className="mb-5 max-w-2xl text-sm font-semibold leading-6 text-slate-600 sm:text-base sm:leading-7">
                                                {monthSelectionCaption}
                                            </p>
                                            <MonthYearTabs
                                                month={selectedMonth}
                                                year={selectedYear}
                                                onMonthChange={setSelectedMonth}
                                                onYearChange={setSelectedYear}
                                                onPeriodChange={setActivePeriodKey}
                                                monthChoices={!isEdit && !showAllCreateStepMonths ? createStepMonthOptions : undefined}
                                                isDateEditable={!isEmailDraftBusy}
                                            />
                                            {!isEdit && !showAllCreateStepMonths ? (
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
                                        disabled={!hasSelectedMonth || isSelectedMonthInFuture || emailDraftActionBusy}
                                        onClick={() => {
                                            handleGenerateSelectedMonthUpdate();
                                        }}
                                        onTouchStart={handleGenerateDraftCardTouchStart}
                                        onTouchEnd={handleGenerateDraftCardTouchEnd}
                                        className={clsx(
                                            "group flex w-full flex-col justify-between rounded-3xl border px-5 py-5 text-left shadow-sm transition [touch-action:pan-y] focus:outline-none focus:ring-4 sm:hidden",
                                            !hasSelectedMonth || isSelectedMonthInFuture || emailDraftActionBusy
                                                ? "cursor-not-allowed border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] text-slate-400"
                                                : "cursor-pointer border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white hover:-translate-y-0.5 hover:border-[var(--vr-palette-black)] hover:bg-[var(--vr-palette-black)] focus:ring-[rgba(0,128,128,0.2)]",
                                        )}
                                        aria-label={hasSelectedMonth ? `Start ${selectedMonthLabel} draft` : "Select a month before starting a draft"}
                                    >
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                                                Step 1
                                            </p>
                                            <p className="mt-3 text-lg font-black">
                                                {hasSelectedMonth ? "Start draft" : "Select month first"}
                                            </p>
                                        </div>
                                        <span className="mt-5 flex items-center justify-between text-sm font-black">
                                            <span>{hasSelectedMonth ? selectedMonthLabel : "Choose a month"}</span>
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
                <section className="sm:hidden">
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
                                    sourceLabel={`${selectedInputSourceDescription} for ${selectedMonthLabel}`}
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
                                                    </p>
                                                    <p className="mt-1 text-sm font-black leading-tight text-gray-950 sm:max-w-2xl sm:text-sm sm:font-medium sm:leading-6 sm:text-gray-600">
                                                        <span className="sm:hidden">{emailDraftButtonTitle}</span>
                                                        <span className="hidden sm:inline">{emailDraftButtonDescription}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={clsx(
                                                "flex flex-shrink-0 items-center justify-center rounded-full border px-3 py-1 text-xs font-black transition sm:h-10 sm:w-10 sm:rounded-xl sm:px-0 sm:py-0 sm:group-hover:translate-x-1",
                                                hasNoSourceForAssistedDraft
                                                    ? "border-[rgba(0,128,128,0.14)] bg-[rgba(0,128,128,0.08)] text-[rgba(0,128,128,0.38)]"
                                                    : "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white shadow-sm shadow-[rgba(0,128,128,0.18)] group-hover:bg-[var(--vr-palette-black)]",
                                            )}>
                                                <span className="sm:hidden">Draft</span>
                                                <ArrowRightIcon className={clsx(
                                                    "hidden h-5 w-5 sm:block",
                                                    hasNoSourceForAssistedDraft ? "text-gray-300" : "text-current",
                                                )} />
                                            </span>
                                        </button>
                                    ) : null}
                                <Form id={DRAFT_REVIEW_FORM_ID} method="POST" className="space-y-6">
                                    <input type="hidden" name="intent" value="review" />
                                    <input type="hidden" name="metricKeys" value={formMetricKeys.join(",")} />
                                    <input type="hidden" name="displayConfig" value={displayConfigFormValue} />
                                    <input type="hidden" name="audienceVisibility" value={audienceVisibility} />
                                    <input type="hidden" name="summary" value={summary} />
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

                                    {renderSelectedMonthSummaryCard("hidden sm:block")}

                                    <VibeRaisingAudienceVisibilityField
                                        name="draftAudienceVisibility"
                                        value={audienceVisibility}
                                        onChange={setAudienceVisibility}
                                        title="Update visibility"
                                        description="For this draft"
                                    />

                                    <div className="rounded-[1.75rem] border border-[var(--vr-color-border)] bg-white p-4 shadow-sm sm:p-5">
                                        {shouldDimMetricsTemplate ? (
                                            <p className="text-xs font-medium tracking-[0.02em] text-gray-500">
                                                Click any metric card to start editing.
                                            </p>
                                        ) : null}
                                        <div className="grid grid-cols-2 gap-3 transition duration-200 lg:grid-cols-4">
                                        {draftMetricOptions.map((metric, metricIndex) => (
                                                (() => {
                                                    const hasMetricValue = String(metricValues[metric.key] || "").trim().length > 0;
                                                    const isMetricCardAwake = !shouldDimMetricsTemplate || awakeMetricCards.has(metric.key) || hasMetricValue;
                                                    const isHiddenInDropdown = !areDraftMetricsExpanded && metricIndex >= draftMetricInitialCount && !hasMetricValue;
                                                    return (
                                                <label
                                                    key={metric.key}
                                                    className={clsx(
                                                        "relative min-w-0 rounded-2xl border p-3 transition duration-200 sm:p-4",
                                                        isHiddenInDropdown ? "hidden" : null,
                                                        isMetricCardAwake
                                                            ? "cursor-pointer border-[rgba(0,128,128,0.12)] bg-[var(--vr-palette-paper)]"
                                                            : "cursor-pointer border-gray-200/80 bg-[rgba(247,246,242,0.65)] opacity-45 saturate-0",
                                                    )}
                                                    onClick={(event) => {
                                                        if ((event.target as HTMLElement).closest("button")) return;
                                                        if (isMobileTourViewport && shouldDimMetricsTemplate && isMetricCardAwake) {
                                                            dismissMetricCard(metric.key);
                                                            return;
                                                        }
                                                        wakeMetricCard(metric.key);
                                                        focusMetricInput(`draft-metric-${metric.key}`);
                                                    }}
                                                >
                                                    {shouldDimMetricsTemplate && isMetricCardAwake ? (
                                                        <button
                                                            type="button"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                dismissMetricCard(metric.key);
                                                            }}
                                                            className="absolute right-2 top-2 hidden rounded-full p-1 text-gray-400 transition hover:bg-white hover:text-gray-700 sm:inline-flex"
                                                            aria-label={`Dismiss ${metric.label}`}
                                                        >
                                                            <XMarkIcon className="h-3.5 w-3.5" />
                                                        </button>
                                                    ) : null}
                                                    <div className="flex items-center gap-2">
                                                        <span className={clsx(
                                                            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition duration-200",
                                                            isMetricCardAwake ? "bg-[rgba(0,255,215,0.18)]" : "bg-white text-gray-500",
                                                        )}>
                                                            {metric.icon}
                                                        </span>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="group/metric-heading relative flex max-w-full flex-wrap items-center gap-1">
                                                                <span className={clsx(
                                                                    "min-w-0 cursor-help break-words text-left text-[11px] font-black uppercase leading-tight tracking-wide transition duration-200 sm:text-xs",
                                                                    "text-gray-500",
                                                                )}>
                                                                    {metric.label}
                                                                </span>
                                                                {metric.info ? (
                                                                    <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-52 rounded-lg bg-gray-900 px-3 py-2 text-left text-[11px] font-medium normal-case leading-4 text-white opacity-0 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-150 ease-out group-hover/metric-heading:translate-y-0 group-hover/metric-heading:opacity-100">
                                                                        {metric.info}
                                                                        <div className="absolute left-3 top-0 h-0 w-0 -translate-y-full border-b-[5px] border-l-[5px] border-r-[5px] border-b-gray-900 border-l-transparent border-r-transparent" />
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        id={`draft-metric-${metric.key}`}
                                                        type="text"
                                                        name={metric.key}
                                                        value={metricValues[metric.key] || ""}
                                                        onFocus={() => wakeMetricCard(metric.key)}
                                                        onChange={(event) => {
                                                            wakeMetricCard(metric.key);
                                                            setMetricValues((previous) => ({ ...previous, [metric.key]: event.target.value }));
                                                        }}
                                                        placeholder={metric.prefix ? `${metric.prefix}${metric.placeholder}` : metric.placeholder}
                                                        className={clsx(
                                                            "mt-4 w-full min-w-0 border-b-2 bg-transparent py-1 text-base font-black outline-none transition placeholder:text-sm sm:text-lg",
                                                            isMetricCardAwake
                                                                ? "border-[rgba(0,128,128,0.26)] text-gray-950 focus:border-[var(--vr-color-primary)]"
                                                                : "border-gray-200 text-gray-300 opacity-45 saturate-0 placeholder:text-gray-300 focus:border-[var(--vr-color-primary)] focus:opacity-100 focus:saturate-100",
                                                        )}
                                                    />
                                                </label>
                                                    );
                                                })()
                                        ))}
                                        </div>
                                        {draftMetricOptions.length > draftMetricInitialCount && (areDraftMetricsExpanded || collapsedHiddenDraftMetricCount > 0) ? (
                                            <button
                                                type="button"
                                                onClick={() => setAreDraftMetricsExpanded((expanded) => !expanded)}
                                                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--vr-color-border)] bg-white px-4 py-2 text-sm font-black text-[var(--vr-color-primary)] shadow-sm transition hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.10)]"
                                                aria-expanded={areDraftMetricsExpanded}
                                            >
                                                {areDraftMetricsExpanded ? "Show less" : "More metrics"}
                                                {!areDraftMetricsExpanded ? (
                                                    <span className="rounded-full bg-[rgba(0,128,128,0.08)] px-2 py-0.5 text-xs text-[var(--vr-color-primary)]">
                                                        {collapsedHiddenDraftMetricCount}
                                                    </span>
                                                ) : null}
                                                <ChevronDownIcon className={clsx("h-4 w-4 transition-transform", areDraftMetricsExpanded && "rotate-180")} />
                                            </button>
                                        ) : null}
                                    </div>

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
                                            label="Ask from Investors"
                                            name="asks"
                                            value={asks}
                                            onChange={setAsks}
                                            enableMobileAdvance={isMobileTourViewport}
                                            placeholder="How can your investors help? Introductions, advice, specific expertise..."
                                        />
                                    </div>

                                </Form>
                                    {materialsSection}
                                    <div ref={draftStickyTriggerRef} aria-hidden className="h-1 w-full" />
                                    </div>
                                </>
                            ) : null}
                        </>
                    ) : null}

            </section>

            {isMobileTourViewport && selectedDraftStage === "reporting" && hasDraftTemplate ? (
                <div className="pointer-events-none fixed left-14 right-4 top-0 z-50 flex h-16 items-center sm:hidden" aria-label="Draft progress">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-[var(--vr-color-primary)]">Draft progress</p>
                            <p className="shrink-0 text-sm font-black text-gray-950">{draftCompletionPercent}%</p>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200/80">
                                <div
                                    className="h-full rounded-full bg-[var(--vr-color-primary)] transition-all duration-300 ease-out"
                                    style={{ width: `${draftCompletionPercent}%` }}
                                />
                            </div>
                            <p className="max-w-[8rem] truncate text-[10px] font-bold text-slate-500">
                                {nextDraftProgressItem ? `Next: ${nextDraftProgressItem.label}` : "Ready"}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}

            <VibeRaisingStickyStepBar
                key={monthConfirmed ? "draft-template-actions" : "select-month-actions"}
                className={clsx(
                    !monthConfirmed && "hidden sm:block",
                    isMobileTourViewport && selectedDraftStage === "reporting" && hasDraftTemplate && !showDraftStickyOnMobile && "hidden sm:block",
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

            {showStoryMaterialsSuggestion ? (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={dismissStoryMaterialsSuggestion}
                        aria-hidden
                    />

                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="story-materials-suggestion-title"
                        className="relative z-[110] w-full max-w-2xl overflow-hidden rounded-2xl bg-[var(--vr-color-card)] shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-[var(--vr-color-border)] px-6 pb-4 pt-6">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vr-palette-coral)]">
                                    Founder-first update
                                </p>
                                <h2 id="story-materials-suggestion-title" className="mt-2 text-xl font-black leading-tight text-[var(--vr-color-text)]">
                                    No metrics? Add deck/video.
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={dismissStoryMaterialsSuggestion}
                                className="flex-shrink-0 rounded-full p-2 text-[var(--vr-color-text-sub)] transition hover:bg-[var(--vr-color-neutral-100)] hover:text-[var(--vr-color-text)]"
                                aria-label="Dismiss pitch deck and video suggestion"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-6 py-6">
                            <p className="text-sm leading-7 text-[var(--vr-color-text-mid)]">
                                Add a short deck or walkthrough so investors can see the story behind the numbers.
                            </p>

                            {missingFounderLinkedInDrafts.length > 0 ? (
                                <div className="mt-5 space-y-3 rounded-2xl border border-[var(--vr-color-border)] bg-[var(--vr-palette-paper)] p-4">
                                    <p className="text-sm font-black text-[var(--vr-color-text)]">Strongly recommended: founder LinkedIn</p>
                                    {missingFounderLinkedInDrafts.map((draft) => (
                                        <label key={draft.id} className="block">
                                            <span className="mb-1 block text-xs font-bold text-[var(--vr-color-text-sub)]">{draft.name}</span>
                                            <input
                                                type="url"
                                                inputMode="url"
                                                value={draft.linkedinUrl}
                                                onChange={(event) => {
                                                    const nextValue = event.target.value;
                                                    setMissingFounderLinkedInDrafts((current) =>
                                                        current.map((item) =>
                                                            item.id === draft.id ? { ...item, linkedinUrl: nextValue } : item,
                                                        ),
                                                    );
                                                }}
                                                placeholder="https://www.linkedin.com/in/..."
                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
                                            />
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-5 rounded-2xl border border-[rgba(0,128,128,0.14)] bg-[rgba(0,255,215,0.10)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-primary)]">
                                    Founder LinkedIn links are already attached. Nice, that gives investors a trust trail.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleAddStoryMaterials}
                                className="inline-flex flex-1 items-center justify-center rounded-xl bg-[var(--vr-palette-black)] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition hover:bg-[var(--vr-palette-coral)] active:scale-[0.98]"
                            >
                                Add pitch deck or video
                            </button>
                            <button
                                type="button"
                                onClick={dismissStoryMaterialsSuggestion}
                                className="inline-flex flex-1 items-center justify-center rounded-xl border border-[var(--vr-color-border)] bg-white px-5 py-3.5 text-sm font-extrabold text-[var(--vr-color-text)] transition hover:border-[var(--vr-color-primary)] hover:text-[var(--vr-color-primary)] active:scale-[0.98]"
                            >
                                Keep writing
                            </button>
                        </div>
                    </section>
                </div>
            ) : null}

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
                                        Running again rebuilds the <strong className="font-bold text-gray-900">{selectedMonthLabel}</strong> draft from scratch using your latest data{regenerateDialogSourceLabels.length > 0 ? <> from <strong className="font-bold text-gray-900">{regenerateDialogSourceLabels.join(", ")}</strong></> : null}, and can take up to 20 minutes. The current draft — including any manual edits — will be replaced. We keep a backup of the previous version.
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

            {showLegacyDraftFlow ? (
            <>
            <Form method="POST" className="space-y-6">
                <input type="hidden" name="intent" value="review" />
                <input
                    type="hidden"
                    name="metricKeys"
                    value={formMetricKeys.join(",")}
                />
                <input type="hidden" name="displayConfig" value={displayConfigFormValue} />
                <input type="hidden" name="summary" value={summary} />
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
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
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
                                sourceLabel={`${selectedInputSourceDescription} for ${selectedMonthLabel}`}
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
                                disabled={emailDraftActionBusy || isSelectedMonthInFuture || selectedInputSources.length === 0}
                                onClick={() => {
                                    void handleGenerateDraftFromEmailClick();
                                }}
                                className={clsx(
                                    "group flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left shadow-sm transition disabled:cursor-not-allowed",
                                    canGenerateDraftFromEmail && !isSelectedMonthInFuture && selectedInputSources.length > 0
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
	                                    label="Ask from Investors"
	                                    name={isViewingCurrentUpdate ? "asks" : `pastMonth_${activePastIndex}_asks`}
	                                    value={activeAsks}
	                                    onChange={updateActiveAsks}
                                    enableMobileAdvance={isMobileTourViewport}
                                    rows={3}
                                    placeholder="How can your investors help? Introductions, advice, specific expertise..."
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
                                label="Ask from Investors"
                                name="asks"
                                value={asks}
                                onChange={setAsks}
                                placeholder="How can your investors help? Introductions, advice, specific expertise..."
                            />
                        </div>
                    </div>
                )}

                    </fieldset>
                    {isEmailDraftBusy && (
                        <div className="absolute inset-0 z-10 cursor-wait rounded-2xl bg-white/25" aria-hidden />
                    )}
                    </div>
                </section>

                {materialsSection}
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
    );
}

