import { Form, Link, useFetcher, useLocation, useRevalidator } from "react-router";
import { clsx } from "clsx";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Eye,
  FileText,
  FolderSearch,
  HelpCircle,
  Home,
  Link2,
  Loader2,
  LockKeyhole,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import ArticleSystemSurfaceSummary, {
  articleSurfaceCandidates,
  candidateLabel,
  isSelectablePublicRoute,
  type SurfaceCandidate,
} from "~/components/ArticleSystemSurfaceSummary";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import type { VibeMarketingBootstrap, VibeMarketingGithubReposResponse, VibeMarketingRunSummary } from "~/types/vibe-marketing";

type ArticleSystemConnectionPanelProps = {
  bootstrap: VibeMarketingBootstrap;
  githubRepos: VibeMarketingGithubReposResponse;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
  repoSelection?: string;
  onRepoSelectionChange?: (value: string) => void;
  articleSurfaceDefault?: string;
  articleSurfacePlaceholder?: string;
  connectionError?: string | null;
  scanRun?: VibeMarketingRunSummary | null;
  framed?: boolean;
  showDenySetupAction?: boolean;
  autoStartInventoryScan?: boolean;
};

const SCAN_RUNNING_STATUSES = new Set(["queued", "running", "pending", "starting"]);
const SCAN_POLLING_STATUSES = SCAN_RUNNING_STATUSES;
const SCAN_FAILED_STATUSES = new Set(["failed", "blocked", "blocked_verification", "denied"]);
const SCAN_ACTION_NEEDED_STATUSES = new Set(["awaiting_confirmation", "awaiting_approval", "approval_required"]);

function isGithubPublishingReady(bootstrap: VibeMarketingBootstrap) {
  return Boolean(bootstrap.checks.github?.passed && bootstrap.settings.githubRepo);
}

function githubConnectionState(githubRepos: VibeMarketingGithubReposResponse, bootstrap: VibeMarketingBootstrap) {
  return String(
    githubRepos.connectionState ??
      githubRepos.connection_state ??
      bootstrap.settings.githubConnectionState ??
      githubRepos.status ??
      "",
  ).trim();
}

function isGithubConnected(githubRepos: VibeMarketingGithubReposResponse, bootstrap: VibeMarketingBootstrap) {
  const state = githubConnectionState(githubRepos, bootstrap).toLowerCase();
  return (
    isGithubPublishingReady(bootstrap) ||
    state === "connected" ||
    state === "already_connected" ||
    Boolean(githubRepos.repos?.length || githubRepos.repositories?.length)
  );
}

function repoNames(githubRepos: VibeMarketingGithubReposResponse) {
  return (githubRepos.repos?.length ? githubRepos.repos : githubRepos.repositories ?? [])
    .map((repo) => repo.fullName || repo.full_name || [repo.owner, repo.name].filter(Boolean).join("/"))
    .filter(Boolean);
}

function selectedRepoName({
  bootstrap,
  githubRepos,
  repos,
  repoSelection,
}: {
  bootstrap: VibeMarketingBootstrap;
  githubRepos: VibeMarketingGithubReposResponse;
  repos: string[];
  repoSelection?: string;
}) {
  return (
    repoSelection ||
    githubRepos.selectedRepo ||
    githubRepos.selected_repo ||
    githubRepos.githubRepo ||
    githubRepos.github_repo ||
    bootstrap.settings.githubRepo ||
    repos.find((repo) => repo.toLowerCase() === "mlai-aus-inc/mlai-au") ||
    repos[0] ||
    ""
  );
}

function resultObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function resultValue(run: VibeMarketingRunSummary, key: string): unknown {
  if (run.result?.[key] !== undefined) return run.result[key];
  const nested = resultObject(run.result?.result);
  if (nested[key] !== undefined) return nested[key];
  const latestControl = resultObject(run.result?.latest_control_response);
  return latestControl[key];
}

function stringResultValue(run: VibeMarketingRunSummary, ...keys: string[]) {
  for (const key of keys) {
    const value = resultValue(run, key);
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function articleSystemSetupPayload(run: VibeMarketingRunSummary) {
  const direct = resultObject(run.result?.article_system_setup);
  if (Object.keys(direct).length) return direct;
  const nested = resultObject(resultObject(run.result?.result).article_system_setup);
  if (Object.keys(nested).length) return nested;
  return resultObject(resultObject(run.result?.latest_control_response).article_system_setup);
}

function setupRunIdForRun(run: VibeMarketingRunSummary) {
  const direct = stringResultValue(run, "setup_run_id", "setupRunId", "scaffold_job_id", "scaffoldJobId");
  if (direct) return direct;
  const setup = articleSystemSetupPayload(run);
  const value = setup.setup_run_id ?? setup.setupRunId;
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function isScanAwaitingSetupApproval(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return false;
  if (SCAN_ACTION_NEEDED_STATUSES.has(run.status)) return true;
  const requestedAction = stringResultValue(run, "requested_action", "setup_requested_action");
  return requestedAction === "article_system_setup" || requestedAction === "scaffold_publish_route";
}

function runRequestObject(run: VibeMarketingRunSummary | null | undefined): Record<string, unknown> {
  if (!run) return {};
  const request = run.result?.["run_request"] ?? run.result?.["request"];
  return resultObject(request);
}

function scanPurposeForRun(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return "";
  const request = runRequestObject(run);
  return String(
    run.result?.["scan_purpose"] ??
      run.result?.["scanPurpose"] ??
      request.scan_purpose ??
      request.scanPurpose ??
      "",
  ).trim();
}

function scanHasArticleSurfaceHint(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return false;
  return Boolean(resultValue(run, "article_surface_hint") || run.result?.["articleSurfaceHint"]);
}

function isInventoryScan(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return false;
  const purpose = scanPurposeForRun(run);
  if (purpose) return purpose === "inventory";
  return !scanHasArticleSurfaceHint(run) && !isScanAwaitingSetupApproval(run);
}

function isSetupTargetScan(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return false;
  const purpose = scanPurposeForRun(run);
  return purpose === "setup" || scanHasArticleSurfaceHint(run) || isScanAwaitingSetupApproval(run);
}

function normalizeManualLocation(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return { value: "", error: "Enter a public URL, route path, or repo path." };
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      return { value: url.pathname || "/", error: "" };
    } catch {
      return { value: "", error: "Enter a valid URL, route path, or repo path." };
    }
  }
  if (trimmed.startsWith("/") || /^[A-Za-z0-9._~:/@-]+$/.test(trimmed)) {
    return { value: trimmed, error: "" };
  }
  return { value: "", error: "Enter a valid URL, route path, or repo path." };
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function ReassuranceItem({ icon, title, copy, tone }: { icon: ReactNode; title: string; copy: string; tone: "emerald" | "blue" | "violet" | "orange" }) {
  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    orange: "bg-orange-50 text-orange-700",
  }[tone];
  return (
    <div className="flex items-center gap-3 border-slate-100 px-4 py-3 sm:border-r last:sm:border-r-0">
      <span className={clsx("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", toneClass)}>{icon}</span>
      <div>
        <p className="text-sm font-black text-slate-950">{title}</p>
        <p className="mt-0.5 text-xs font-semibold text-slate-500">{copy}</p>
      </div>
    </div>
  );
}

function ReassuranceStrip() {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 xl:grid-cols-4">
      <ReassuranceItem tone="emerald" icon={<ShieldCheck className="h-5 w-5" />} title="Connected securely" copy="We use GitHub OAuth" />
      <ReassuranceItem tone="blue" icon={<LockKeyhole className="h-5 w-5" />} title="Read-only scan" copy="We only read your files" />
      <ReassuranceItem tone="violet" icon={<UserCheck className="h-5 w-5" />} title="You choose" copy="You pick the correct location" />
      <ReassuranceItem tone="orange" icon={<Eye className="h-5 w-5" />} title="Approval required" copy="No changes without approval" />
    </div>
  );
}

function FlowStep({
  number,
  title,
  description,
  children,
  muted = false,
}: {
  number: number;
  title: string;
  description?: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-4 top-10 bottom-[-1.25rem] w-px bg-slate-200 last:hidden" aria-hidden="true" />
      <span
        className={clsx(
          "absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-black shadow-sm",
          muted ? "bg-slate-200 text-slate-500" : "bg-violet-600 text-white",
        )}
      >
        {number}
      </span>
      <section className={clsx("rounded-2xl border bg-white p-4 shadow-sm sm:p-5", muted ? "border-slate-200" : "border-slate-200")}>
        <div className="mb-4">
          <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
            <HelpCircle className="h-4 w-4 text-violet-600" />
            {title}
          </h3>
          {description ? <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{description}</p> : null}
        </div>
        {children}
      </section>
    </div>
  );
}

function SmallProof({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
      {icon}
      {label}
    </span>
  );
}

function SurfaceIcon({ candidate }: { candidate: SurfaceCandidate }) {
  if (candidate.route === "/") return <Home className="h-6 w-6" />;
  return <FileText className="h-6 w-6" />;
}

function candidateFiles(candidate: SurfaceCandidate) {
  return candidate.files.length ? candidate.files : [candidate.path].filter(Boolean);
}

function SurfaceChoiceCard({
  candidate,
  selected,
  bestMatch,
  onSelect,
}: {
  candidate: SurfaceCandidate;
  selected: boolean;
  bestMatch: boolean;
  onSelect: () => void;
}) {
  const files = candidateFiles(candidate);
  return (
    <label
      className={clsx(
        "block cursor-pointer rounded-xl border p-4 transition",
        selected ? "border-violet-400 bg-violet-50/50 shadow-sm" : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/30",
      )}
    >
      <div className="flex gap-4">
        <input type="radio" checked={selected} onChange={onSelect} className="mt-4 h-5 w-5 border-slate-300 text-violet-600 focus:ring-violet-500" />
        <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <SurfaceIcon candidate={candidate} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-black text-slate-950">{candidateLabel(candidate)}</p>
            {bestMatch ? <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black text-emerald-700">Best match</span> : null}
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-600">Public route: {candidate.route}</p>
          {files.length ? (
            <p className="mt-1 break-words text-xs font-semibold leading-5 text-slate-500">Files: {files.slice(0, 3).join(", ")}</p>
          ) : null}
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{candidate.reason}</p>
          <details className="mt-3">
            <summary className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-black text-slate-600">
              Why this? <ChevronDown className="h-3 w-3" />
            </summary>
            <div className="mt-2 rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold leading-5 text-slate-600">
              {candidate.confidence !== null ? <p>Confidence: {Math.round(candidate.confidence * 100)}%</p> : null}
              <p>Candidate type: {[candidate.group, candidate.kind, candidate.systemType].filter(Boolean).join(" / ") || "route candidate"}</p>
              {candidate.path && candidate.path !== candidate.route ? <p className="break-all">Repo evidence: {candidate.path}</p> : null}
            </div>
          </details>
        </div>
      </div>
    </label>
  );
}

function CreateNewChoiceCard({
  selected,
  createNewPath,
  onSelect,
  onPathChange,
}: {
  selected: boolean;
  createNewPath: string;
  onSelect: () => void;
  onPathChange: (value: string) => void;
}) {
  return (
    <label
      className={clsx(
        "block cursor-pointer rounded-xl border p-4 transition",
        selected ? "border-emerald-300 bg-emerald-50/60 shadow-sm" : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40",
      )}
    >
      <div className="flex gap-4">
        <input type="radio" checked={selected} onChange={onSelect} className="mt-4 h-5 w-5 border-slate-300 text-violet-600 focus:ring-violet-500" />
        <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Plus className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-slate-950">Create a new articles folder</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
            Use this if your site does not already have an articles or blog section.
          </p>
          {selected ? (
            <input
              value={createNewPath}
              onChange={(event) => onPathChange(event.target.value)}
              onFocus={onSelect}
              placeholder="/articles"
              className="mt-3 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          ) : null}
        </div>
      </div>
    </label>
  );
}

function githubConnectHref({ forceReconnect = false, githubRepo = "" }: { forceReconnect?: boolean; githubRepo?: string } = {}) {
  const params = new URLSearchParams({
    returnTo: "/founder-tools/marketing/create?step=articleSystem",
  });
  if (forceReconnect) params.set("forceReconnect", "true");
  if (githubRepo && !forceReconnect) params.set("githubRepo", githubRepo);
  return `/founder-tools/marketing/github-connect?${params.toString()}`;
}

export default function ArticleSystemConnectionPanel({
  bootstrap,
  githubRepos,
  isSubmitting,
  isActionPending,
  repoSelection,
  onRepoSelectionChange,
  articleSurfaceDefault = "",
  articleSurfacePlaceholder = "https://example.com/articles or /articles",
  connectionError,
  scanRun,
  framed = true,
  showDenySetupAction = false,
  autoStartInventoryScan = false,
}: ArticleSystemConnectionPanelProps) {
  const inventoryFetcher = useFetcher();
  const runStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const location = useLocation();
  const revalidator = useRevalidator();
  const actionPending = isActionPending ?? (() => isSubmitting);
  const connected = isGithubConnected(githubRepos, bootstrap);
  void showDenySetupAction;
  const repos = repoNames(githubRepos);
  const selectedRepo = selectedRepoName({ bootstrap, githubRepos, repos, repoSelection });
  const repoUrl = selectedRepo.includes("/") ? `https://github.com/${selectedRepo}` : "";
  const scaffoldReady = Boolean(bootstrap.checks.scaffold?.passed);
  const requestedScanRunId = new URLSearchParams(location.search).get("scanRunId")?.trim() ?? "";
  const currentScanRunId = requestedScanRunId || scanRun?.runId || "";
  const scanRunForCurrentId = !requestedScanRunId || scanRun?.runId === requestedScanRunId ? scanRun : null;
  const [polledScanRun, setPolledScanRun] = useState<VibeMarketingRunSummary | null>(null);
  const effectiveScanRun = polledScanRun?.runId === currentScanRunId ? polledScanRun : scanRunForCurrentId;
  const scanRunning = Boolean(effectiveScanRun && SCAN_RUNNING_STATUSES.has(effectiveScanRun.status));
  const scanFailed = Boolean(effectiveScanRun && SCAN_FAILED_STATUSES.has(effectiveScanRun.status));
  const scanStale = Boolean(effectiveScanRun?.stale || effectiveScanRun?.staleReason === "scan_queue_not_started");
  const scanNeedsSetupApproval = isScanAwaitingSetupApproval(effectiveScanRun);
  const setupRunId = effectiveScanRun ? setupRunIdForRun(effectiveScanRun) : "";
  const inventoryScan = isInventoryScan(effectiveScanRun);
  const setupTargetScan = isSetupTargetScan(effectiveScanRun);
  const inventoryReady = Boolean(effectiveScanRun && inventoryScan && effectiveScanRun.status === "completed");
  const setupTargetReady = Boolean(effectiveScanRun && setupTargetScan && (scanNeedsSetupApproval || setupRunId));
  const scanStartPending = actionPending("start-scan") || inventoryFetcher.state !== "idle";
  const retryScanPending = actionPending("retry-scan");
  const cancelScanPending = actionPending("cancel-scan");
  const confirmSurfacePending = actionPending("confirm-article-surface");
  const createSurfacePending = actionPending("create-article-surface");
  const [selectedChoiceId, setSelectedChoiceId] = useState("");
  const [manualArticleRoute, setManualArticleRoute] = useState("");
  const [manualRouteError, setManualRouteError] = useState("");
  const [createNewPath, setCreateNewPath] = useState(articleSurfaceDefault || "/articles");
  const lastScanProgressSignatureRef = useRef("");
  const lastScanProgressAtRef = useRef(Date.now());
  const [pageVisible, setPageVisible] = useState(true);
  const [githubAuthWaiting, setGithubAuthWaiting] = useState(() =>
    typeof window !== "undefined" && window.sessionStorage.getItem("vibe-marketing:github-auth-open") === "true",
  );

  const candidates = useMemo(() => (effectiveScanRun ? articleSurfaceCandidates(effectiveScanRun) : []), [effectiveScanRun]);
  const publicRouteCandidates = useMemo(() => candidates.filter((candidate) => isSelectablePublicRoute(candidate.route)), [candidates]);
  const fileOnlyCandidates = useMemo(() => candidates.filter((candidate) => !isSelectablePublicRoute(candidate.route)), [candidates]);
  const bestCandidateKey = useMemo(() => {
    const ranked = publicRouteCandidates
      .map((candidate, index) => ({ candidate, score: candidate.confidence ?? (index === 0 ? 0.5 : 0) }))
      .sort((left, right) => right.score - left.score);
    return ranked[0]?.candidate.key ?? "";
  }, [publicRouteCandidates]);
  const selectedCandidate = publicRouteCandidates.find((candidate) => candidate.key === selectedChoiceId);
  const selectedMode = selectedChoiceId === "create" ? "create" : selectedChoiceId === "manual" ? "manual" : selectedCandidate ? "existing" : "";
  const selectedSurfaceUrl =
    selectedMode === "existing"
      ? selectedCandidate?.route ?? ""
      : selectedMode === "manual"
        ? manualArticleRoute.trim()
        : selectedMode === "create"
          ? createNewPath.trim()
          : "";
  const selectedTitle =
    selectedMode === "existing"
      ? selectedCandidate
        ? candidateLabel(selectedCandidate)
        : "Selected route"
      : selectedMode === "manual"
        ? "Manual article location"
        : selectedMode === "create"
          ? "New articles folder"
          : "";
  const selectedFiles =
    selectedMode === "existing" && selectedCandidate
      ? candidateFiles(selectedCandidate)
      : selectedMode === "create"
        ? [createNewPath.trim() || "/articles"]
        : [manualArticleRoute.trim()].filter(Boolean);
  const saveIntent = selectedMode === "create" ? "create-article-surface" : "confirm-article-surface";
  const savePending = confirmSurfacePending || createSurfacePending;

  useEffect(() => {
    setSelectedChoiceId("");
    setManualArticleRoute("");
    setManualRouteError("");
    setCreateNewPath(articleSurfaceDefault || "/articles");
  }, [articleSurfaceDefault, effectiveScanRun?.runId]);

  useEffect(() => {
    setPolledScanRun(null);
  }, [currentScanRunId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!githubAuthWaiting || (!connected && !connectionError && !githubRepos.error)) return;
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("vibe-marketing:github-auth-open");
    }
    setGithubAuthWaiting(false);
  }, [connected, connectionError, githubAuthWaiting, githubRepos.error]);

  useEffect(() => {
    if (
      runStatusFetcher.state !== "idle" ||
      !runStatusFetcher.data?.runId ||
      runStatusFetcher.data.runId !== currentScanRunId
    ) {
      return;
    }
    setPolledScanRun(runStatusFetcher.data);
  }, [currentScanRunId, runStatusFetcher.data, runStatusFetcher.state]);

  useEffect(() => {
    if (!currentScanRunId || runStatusFetcher.state !== "idle") return;
    if (!pageVisible) return;
    const shouldPollScan =
      !effectiveScanRun ||
      (SCAN_POLLING_STATUSES.has(effectiveScanRun.status) &&
        !SCAN_ACTION_NEEDED_STATUSES.has(effectiveScanRun.status) &&
        !scanStale);
    if (!shouldPollScan) return;
    const hasLoadedCurrentRun = runStatusFetcher.data?.runId === currentScanRunId;
    const signature = [
      effectiveScanRun?.runId,
      effectiveScanRun?.status,
      effectiveScanRun?.currentStep,
      effectiveScanRun?.updatedAt,
      effectiveScanRun?.steps.map((step) => `${step.key}:${step.status}:${step.completedAt ?? ""}`).join(","),
    ].join("|");
    if (lastScanProgressSignatureRef.current !== signature) {
      lastScanProgressSignatureRef.current = signature;
      lastScanProgressAtRef.current = Date.now();
    }
    const idleMs = Date.now() - lastScanProgressAtRef.current;
    const pollDelay = !hasLoadedCurrentRun ? 0 : idleMs > 60_000 ? 15_000 : idleMs > 10_000 ? 5_000 : 2_500;
    const timer = window.setTimeout(
      () => {
        void runStatusFetcher.load(`/founder-tools/marketing/runs/${encodeURIComponent(currentScanRunId)}/status`);
      },
      pollDelay,
    );
    return () => window.clearTimeout(timer);
  }, [
    currentScanRunId,
    effectiveScanRun,
    pageVisible,
    runStatusFetcher,
    runStatusFetcher.data?.runId,
    runStatusFetcher.state,
    scanStale,
  ]);

  useEffect(() => {
    if (!autoStartInventoryScan || !connected || !selectedRepo || currentScanRunId || inventoryFetcher.state !== "idle") return;
    const key = `vibe-marketing:auto-inventory-scan:${bootstrap.organization.id ?? "org"}:${selectedRepo}`;
    if (typeof window !== "undefined" && window.sessionStorage.getItem(key) === "started") return;
    if (typeof window !== "undefined") window.sessionStorage.setItem(key, "started");
    const formData = new FormData();
    formData.set("intent", "start-scan");
    formData.set("scanPurpose", "inventory");
    formData.set("articleSurfaceMode", "not_sure");
    formData.set("githubRepo", selectedRepo);
    void inventoryFetcher.submit(formData, { method: "POST" });
  }, [autoStartInventoryScan, bootstrap.organization.id, connected, currentScanRunId, inventoryFetcher, selectedRepo]);

  useEffect(() => {
    if (!githubAuthWaiting || typeof window === "undefined") return;
    const maybeRevalidate = () => {
      revalidator.revalidate();
    };
    window.addEventListener("focus", maybeRevalidate);
    document.addEventListener("visibilitychange", maybeRevalidate);
    const timer = window.setInterval(maybeRevalidate, 5000);
    return () => {
      window.removeEventListener("focus", maybeRevalidate);
      document.removeEventListener("visibilitychange", maybeRevalidate);
      window.clearInterval(timer);
    };
  }, [githubAuthWaiting, revalidator]);

  const markGithubAuthOpen = () => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem("vibe-marketing:github-auth-open", "true");
    setGithubAuthWaiting(true);
  };

  const repoControlProps = onRepoSelectionChange
    ? {
        value: selectedRepo,
        onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => onRepoSelectionChange(event.target.value),
      }
    : {
        defaultValue: selectedRepo,
      };

  const checkManualRoute = () => {
    const normalized = normalizeManualLocation(manualArticleRoute);
    setManualRouteError(normalized.error);
    if (!normalized.error) {
      setManualArticleRoute(normalized.value);
      setSelectedChoiceId("manual");
    }
  };

  return (
    <section className={clsx(framed && "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Connect GitHub & set your articles/blogs location
          </h2>
          <p className="mt-3 max-w-4xl text-base font-medium leading-7 text-slate-600">
            Choose the repository that contains your website, run a read-only scan, then choose where articles should live.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 ring-1 ring-emerald-100">
          {connected ? "Connected" : "Ready"}
          <CheckCircle2 className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-6">
        <ReassuranceStrip />
      </div>

      <div className="mt-6 space-y-5">
        <FlowStep
          number={1}
          title="Connect GitHub & choose repository"
          description="Choose the repository that contains your website."
        >
          {!connected ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-950 shadow-sm">
                <GitHubMark className="h-8 w-8" />
              </div>
              <h4 className="mt-4 text-lg font-black text-slate-950">Connect your GitHub repository</h4>
              <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
                GitHub will open securely, then return you here when the connection is ready.
              </p>
              <a
                href={githubConnectHref()}
                onClick={markGithubAuthOpen}
                className="mt-5 inline-flex items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-black"
              >
                <GitHubMark className="h-5 w-5" />
                {githubAuthWaiting ? "Open GitHub again" : "Connect GitHub"}
              </a>
              <div className="mt-5 flex flex-wrap justify-center gap-4">
                <SmallProof icon={<LockKeyhole className="h-4 w-4" />} label="Secure OAuth" />
                <SmallProof icon={<ShieldCheck className="h-4 w-4" />} label="Granular permissions" />
                <SmallProof icon={<Eye className="h-4 w-4" />} label="You're in control" />
              </div>
              {githubAuthWaiting ? (
                <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-left text-sm font-semibold text-violet-800">
                  Finish authorising in GitHub, then you will return here.
                </div>
              ) : null}
              {connectionError ? (
                <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700">
                  {connectionError}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[minmax(260px,1fr)_minmax(260px,420px)]">
              <div className="space-y-4">
                <Form method="POST" className="space-y-4">
                  <input type="hidden" name="intent" value="start-scan" />
                  <input type="hidden" name="scanPurpose" value="inventory" />
                  <input type="hidden" name="articleSurfaceMode" value="not_sure" />
                  <label className="block">
                    <span className="mb-2 block text-sm font-black text-slate-800">Repository</span>
                    {repos.length ? (
                      <select
                        name="githubRepo"
                        {...repoControlProps}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                      >
                        {repos.map((repo) => (
                          <option key={repo} value={repo}>
                            {repo}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name="githubRepo"
                        {...repoControlProps}
                        placeholder="owner/repo"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                      />
                    )}
                  </label>
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={scanStartPending || scanRunning || (repos.length > 0 && !selectedRepo)}
                      className="inline-flex min-w-56 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                    >
                      {scanStartPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      {scanStartPending ? "Starting scan..." : "Scan repository"}
                    </button>
                  </div>
                  <p className="flex justify-center gap-2 text-xs font-semibold text-slate-500">
                    <LockKeyhole className="h-4 w-4" />
                    This scan only reads file names, routes and page structure.
                  </p>
                </Form>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Connected to GitHub{selectedRepo ? ` as ${selectedRepo.split("/")[0]}` : ""}.
                    {repoUrl ? (
                      <a href={repoUrl} target="_blank" rel="noreferrer" className="inline-flex text-slate-500 transition hover:text-violet-700">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </p>
                  <a
                    href={githubConnectHref({ forceReconnect: true })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={markGithubAuthOpen}
                    className="text-sm font-black text-violet-700 transition hover:text-violet-900"
                  >
                    Manage GitHub access
                  </a>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <FolderSearch className="h-8 w-8" />
                </span>
                <div>
                  <p className="text-sm font-black text-slate-950">We&apos;ll scan this repository</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                    We&apos;ll look for article or blog routes and content folders so you can choose the right location.
                  </p>
                  <p className="mt-2 text-xs font-black text-slate-600">No code is changed during this scan.</p>
                </div>
              </div>
            </div>
          )}
        </FlowStep>

        {currentScanRunId && !effectiveScanRun ? (
          <FlowStep number={2} title="Scanning repository" description="Loading scan progress">
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 text-sm font-semibold text-violet-800">
              Loading scan progress...
            </div>
          </FlowStep>
        ) : null}

        {effectiveScanRun && inventoryScan ? (
          <FlowStep number={2} title="Scanning repository" description="Looking for article pages and content locations">
            <MarketingRunProgressCard run={effectiveScanRun} />
            {scanRunning || scanFailed || scanStale ? (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to={`/founder-tools/marketing/runs/${encodeURIComponent(effectiveScanRun.runId)}`}
                  className="inline-flex text-xs font-black text-violet-700 transition hover:text-violet-900"
                >
                  View scan run
                </Link>
                <Form method="POST" className="flex flex-col gap-2 sm:flex-row">
                  <input type="hidden" name="scanRunId" value={effectiveScanRun.runId} />
                  {effectiveScanRun.retryAvailable || effectiveScanRun.stale ? (
                    <button
                      type="submit"
                      name="intent"
                      value="retry-scan"
                      disabled={retryScanPending || cancelScanPending}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-black text-violet-700 transition hover:bg-violet-50 disabled:opacity-50"
                    >
                      <Loader2 className={clsx("h-4 w-4", retryScanPending && "animate-spin")} />
                      {retryScanPending ? "Retrying..." : "Retry scan"}
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    name="intent"
                    value="cancel-scan"
                    disabled={retryScanPending || cancelScanPending}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {cancelScanPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {cancelScanPending ? "Cancelling..." : "Cancel scan"}
                  </button>
                </Form>
              </div>
            ) : null}
          </FlowStep>
        ) : null}

        {inventoryReady ? (
          <FlowStep
            number={3}
            title="Choose your articles/blogs location"
            description="Pick the right place from routes we found, paste a path manually, or create a new articles directory."
          >
            <div className="space-y-3">
              {publicRouteCandidates.length ? (
                publicRouteCandidates.map((candidate) => (
                  <SurfaceChoiceCard
                    key={candidate.key}
                    candidate={candidate}
                    selected={selectedChoiceId === candidate.key}
                    bestMatch={bestCandidateKey === candidate.key}
                    onSelect={() => {
                      setManualRouteError("");
                      setSelectedChoiceId(candidate.key);
                    }}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
                  We did not find a clean public articles route. Paste the correct URL/path, or create a new articles directory.
                </div>
              )}

              <CreateNewChoiceCard
                selected={selectedChoiceId === "create"}
                createNewPath={createNewPath}
                onSelect={() => {
                  setManualRouteError("");
                  setSelectedChoiceId("create");
                }}
                onPathChange={(value) => {
                  setCreateNewPath(value);
                  setSelectedChoiceId("create");
                }}
              />

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-black text-slate-950">Or paste manually</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Already know the right location? Paste the public URL, route path, or repo path.</p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={manualArticleRoute}
                      onChange={(event) => {
                        setManualArticleRoute(event.target.value);
                        if (selectedChoiceId === "manual") setSelectedChoiceId("");
                        setManualRouteError("");
                      }}
                      placeholder={articleSurfacePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={checkManualRoute}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-violet-200 hover:bg-violet-50"
                  >
                    Check this location
                  </button>
                </div>
                {manualRouteError ? <p className="mt-2 text-xs font-black text-red-600">{manualRouteError}</p> : null}
              </div>

              {fileOnlyCandidates.length ? (
                <details className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <summary className="cursor-pointer text-sm font-black text-slate-800">Pages found without a public URL</summary>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    {fileOnlyCandidates.map((candidate) => (
                      <div key={candidate.key} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                        <p className="break-all font-black text-slate-800">{candidate.path || candidate.route}</p>
                        <p className="mt-1">{candidate.reason}</p>
                      </div>
                    ))}
                  </div>
                </details>
              ) : null}

              <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800">
                You can change this anytime later from your project settings.
              </div>

              {effectiveScanRun ? <ArticleSystemSurfaceSummary run={effectiveScanRun} /> : null}
            </div>
          </FlowStep>
        ) : null}

        {selectedSurfaceUrl || setupTargetReady ? (
          <FlowStep number={4} title="Articles/blogs location selected">
            {setupTargetReady ? (
              <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <FileText className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-slate-950">Articles/blogs location saved</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        Build the articles/blogs directory page and inspect the setup preview.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                    Content Factory will use this location when preparing article drafts and previews.
                  </p>
                  {setupRunId ? (
                    <Link
                      to={`/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700"
                    >
                      Open articles setup build
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Form method="POST">
                      <input type="hidden" name="scanRunId" value={effectiveScanRun?.runId ?? ""} />
                      <button
                        type="submit"
                        name="intent"
                        value="build-article-system-preview"
                        disabled={isSubmitting || !effectiveScanRun?.runId}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                      >
                        Build articles/blogs directory page
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Form>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <FileText className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-slate-950">{selectedTitle}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-600">Public route: {selectedSurfaceUrl}</p>
                      {selectedFiles.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedFiles.slice(0, 4).map((file) => (
                            <span key={file} className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-500">
                              {file}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                    Good choice. Content Factory will use this location for the articles setup preview.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChoiceId("");
                        setManualRouteError("");
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Change selection
                    </button>
                    <Form method="POST">
                      <input type="hidden" name="intent" value={saveIntent} />
                      <input type="hidden" name="githubRepo" value={selectedRepo} />
                      <input type="hidden" name="sourceScanRunId" value={effectiveScanRun?.runId ?? ""} />
                      <input type="hidden" name="articleSurfaceUrl" value={selectedSurfaceUrl} />
                      <button
                        type="submit"
                        disabled={savePending || !selectedSurfaceUrl}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                      >
                        {savePending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {savePending ? "Starting setup..." : "Build articles/blogs directory page"}
                        {!savePending ? <ArrowRight className="h-4 w-4" /> : null}
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            )}
          </FlowStep>
        ) : null}

        {connected && !currentScanRunId && !inventoryFetcher.data ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
            Run the repository scan first. It is read-only and will not create branches, pull requests, or setup files.
          </div>
        ) : null}

        {connected && scaffoldReady && !setupTargetReady && !inventoryReady ? (
          <Link
            to="/founder-tools/marketing/create?step=research"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
