import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { getVibeRaisingStartupUpdateActiveRun } from "~/lib/vibe-raising";
import type { VibeRaisingStartupUpdateStatusResponse } from "~/types/vibe-raising";
import { VIBE_RAISING_MONTH_OPTIONS } from "~/components/VibeRaisingDateTabs";

const ACTIVE_RUN_POLL_INTERVAL_MS = 25_000;

type ActiveDraftRunContextValue = {
    activeRun: VibeRaisingStartupUpdateStatusResponse | null;
    refreshActiveRun: () => void;
};

const ActiveDraftRunContext = createContext<ActiveDraftRunContextValue>({
    activeRun: null,
    refreshActiveRun: () => {},
});

export function useActiveDraftRun(): ActiveDraftRunContextValue {
    return useContext(ActiveDraftRunContext);
}

function isGeneratingRun(run: VibeRaisingStartupUpdateStatusResponse | null): run is VibeRaisingStartupUpdateStatusResponse {
    return Boolean(run?.runId && (run.state === "queued" || run.state === "running"));
}

export function activeDraftRunMonthLabel(run: VibeRaisingStartupUpdateStatusResponse | null): string | null {
    const match = /^(\d{4})-(\d{2})/.exec(String(run?.targetMonth || "").trim());
    if (!match) return null;
    const option = VIBE_RAISING_MONTH_OPTIONS[Number(match[2]) - 1];
    if (!option) return null;
    return `${option.name} ${match[1]}`;
}

function runProgressParts(run: VibeRaisingStartupUpdateStatusResponse) {
    const completedSteps = run.completedSteps ?? run.progress?.completedSteps ?? 0;
    const totalSteps = run.totalSteps ?? run.progress?.totalSteps ?? 0;
    const displayStage = run.displayStage || run.progress?.displayStage || "Drafting in progress";
    return { completedSteps, totalSteps, displayStage };
}

export function ActiveDraftRunProvider({
    backendBaseUrl,
    children,
}: {
    backendBaseUrl: string;
    children: ReactNode;
}) {
    const [activeRun, setActiveRun] = useState<VibeRaisingStartupUpdateStatusResponse | null>(null);
    const inFlightRef = useRef(false);

    const refreshActiveRun = useCallback(() => {
        if (inFlightRef.current) return;
        inFlightRef.current = true;
        getVibeRaisingStartupUpdateActiveRun(backendBaseUrl)
            .then((run) => {
                setActiveRun(isGeneratingRun(run) ? run : null);
            })
            .catch(() => {
                // Transient failures keep the last known state; the next poll corrects it.
            })
            .finally(() => {
                inFlightRef.current = false;
            });
    }, [backendBaseUrl]);

    useEffect(() => {
        refreshActiveRun();
        const intervalId = window.setInterval(refreshActiveRun, ACTIVE_RUN_POLL_INTERVAL_MS);
        window.addEventListener("focus", refreshActiveRun);
        return () => {
            window.clearInterval(intervalId);
            window.removeEventListener("focus", refreshActiveRun);
        };
    }, [refreshActiveRun]);

    return (
        <ActiveDraftRunContext.Provider value={{ activeRun, refreshActiveRun }}>
            {children}
        </ActiveDraftRunContext.Provider>
    );
}

export function ActiveDraftRunBanner() {
    const { activeRun } = useActiveDraftRun();
    const location = useLocation();

    if (!isGeneratingRun(activeRun)) return null;
    // The create-update wizard renders the full progress card; avoid doubling up.
    if (location.pathname.startsWith("/founder-tools/updates/create")) return null;

    const monthLabel = activeDraftRunMonthLabel(activeRun);
    const { completedSteps, totalSteps, displayStage } = runProgressParts(activeRun);

    return (
        <div className="sticky top-2 z-30 mb-4 px-1">
            <Link
                to="/founder-tools/updates/create"
                className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-[rgba(0,128,128,0.22)] bg-[linear-gradient(135deg,rgba(0,255,215,0.16),rgba(255,255,255,0.96))] px-4 py-3 shadow-lg shadow-[rgba(0,128,128,0.10)] backdrop-blur transition hover:border-[var(--vr-color-primary)]"
            >
                <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.18)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.30)]">
                        <SparklesIcon className="h-5 w-5 animate-pulse" />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-black text-gray-950">
                            Drafting {monthLabel ? `${monthLabel} ` : ""}update
                        </span>
                        <span className="block truncate text-xs font-semibold text-slate-500">
                            {displayStage}
                            {totalSteps > 0 ? ` · step ${Math.min(completedSteps + 1, totalSteps)} of ${totalSteps}` : ""}
                        </span>
                    </span>
                </span>
                <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-[var(--vr-color-primary)] px-3 py-2 text-xs font-extrabold text-white">
                    View progress
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
            </Link>
        </div>
    );
}

export function ActiveDraftRunChip({ className }: { className?: string }) {
    const { activeRun } = useActiveDraftRun();

    if (!isGeneratingRun(activeRun)) return null;

    const monthLabel = activeDraftRunMonthLabel(activeRun);
    const { completedSteps, totalSteps } = runProgressParts(activeRun);

    return (
        <Link
            to="/founder-tools/updates/create"
            className={[
                "inline-flex items-center gap-1.5 rounded-lg bg-[rgba(0,255,215,0.14)] px-3 py-1.5 text-xs font-black text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.32)] transition hover:bg-[rgba(0,255,215,0.24)]",
                className || "",
            ].join(" ").trim()}
        >
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--vr-color-primary)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--vr-color-primary)]" />
            </span>
            AI drafting{monthLabel ? ` ${monthLabel}` : ""}
            {totalSteps > 0 ? ` · ${Math.min(completedSteps + 1, totalSteps)}/${totalSteps}` : ""}
        </Link>
    );
}
