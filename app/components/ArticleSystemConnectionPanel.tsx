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
  RotateCcw,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import {
  articleSurfaceCandidates,
  candidateLabel,
  isSelectablePublicRoute,
  type SurfaceCandidate,
} from "~/components/ArticleSystemSurfaceSummary";
import GitHubMark from "~/components/GitHubMark";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import {
  articleSystemScaffoldActionLabel,
  articleSystemConnectionStepStates,
  type ArticleSystemScaffoldStatus,
  type ArticleSystemConnectionStepState,
} from "~/lib/article-system-connection-steps";
import { runFailureGuidance } from "~/lib/vibe-marketing-run-failures";
import { repoScanProgressRefreshKey } from "~/lib/vibe-marketing-run-polling";
import type { VibeMarketingArticleSetupState, VibeMarketingBootstrap, VibeMarketingGithubReposResponse, VibeMarketingRunSummary } from "~/types/vibe-marketing";

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
  articleSetupState?: VibeMarketingArticleSetupState | null;
  framed?: boolean;
  showDenySetupAction?: boolean;
};

const SCAN_RUNNING_STATUSES = new Set(["queued", "running", "pending", "starting"]);
const SCAN_POLLING_STATUSES = SCAN_RUNNING_STATUSES;
const SCAN_FAILED_STATUSES = new Set(["failed", "blocked", "blocked_verification", "denied"]);
const SCAN_ACTION_NEEDED_STATUSES = new Set(["awaiting_confirmation", "awaiting_approval", "approval_required"]);
const SCAN_TERMINAL_REVALIDATE_STATUSES = new Set([
  "completed",
  "awaiting_confirmation",
  "awaiting_approval",
  "approval_required",
  "failed",
  "blocked",
  "blocked_verification",
  "denied",
  "cancelled",
  "canceled",
]);
const SETUP_FAILED_STATUSES = new Set(["failed", "blocked", "blocked_verification", "preview_failed", "denied", "cancelled", "canceled"]);
const SETUP_PUBLISH_STATUSES = new Set(["pr_created", "setup_pr_created", "manual_merge_required"]);
const SETUP_VERIFYING_STATUSES = new Set(["merged", "merged_verifying", "verifying"]);

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

function articleSystemSetupString(run: VibeMarketingRunSummary | null | undefined, ...keys: string[]) {
  if (!run) return "";
  const setup = articleSystemSetupPayload(run);
  for (const key of keys) {
    const setupValue = setup[key];
    if (typeof setupValue === "string" && setupValue.trim()) return setupValue.trim();
    if (typeof setupValue === "number" && Number.isFinite(setupValue)) return String(setupValue);
  }
  return stringResultValue(run, ...keys);
}

function setupPreviewUrlForRun(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return "";
  return (
    run.livePreview?.previewUrl?.trim() ||
    run.previewUrl?.trim() ||
    articleSystemSetupString(
      run,
      "preview_url",
      "previewUrl",
      "live_preview_url",
      "livePreviewUrl",
      "fallback_preview_url",
      "fallbackPreviewUrl",
    )
  );
}

function setupPrUrlForRun(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return "";
  return (
    run.prUrl?.trim() ||
    articleSystemSetupString(
      run,
      "pr_url",
      "prUrl",
      "pull_request_url",
      "pullRequestUrl",
      "draft_pr_url",
      "draftPrUrl",
    )
  );
}

function normalizedStatus(value: string | null | undefined) {
  return String(value || "").trim().toLowerCase();
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

function hasConcreteArticleSurfaceHint(value: unknown) {
  if (typeof value === "string") return Boolean(value.trim());
  const hint = resultObject(value);
  return [
    "route",
    "route_path",
    "routePath",
    "path",
    "public_url",
    "publicUrl",
    "listing_url",
    "listingUrl",
    "article_surface_url",
    "articleSurfaceUrl",
    "url",
  ].some((key) => typeof hint[key] === "string" && Boolean((hint[key] as string).trim()));
}

function scanHasArticleSurfaceHint(run: VibeMarketingRunSummary | null | undefined) {
  if (!run) return false;
  return hasConcreteArticleSurfaceHint(resultValue(run, "article_surface_hint")) || hasConcreteArticleSurfaceHint(run.result?.["articleSurfaceHint"]);
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
  stepState,
}: {
  number: number;
  title: string;
  description?: string;
  children: ReactNode;
  stepState: ArticleSystemConnectionStepState;
}) {
  const [expanded, setExpanded] = useState(stepState.defaultExpanded);
  const resetKey = `${stepState.id}:${stepState.status}:${stepState.defaultExpanded ? "open" : "closed"}`;

  useEffect(() => {
    setExpanded(stepState.defaultExpanded);
  }, [resetKey, stepState.defaultExpanded]);

  const isLocked = stepState.status === "locked";
  const statusLabel = stepState.attentionLabel || {
    active: "Current",
    blocked: "Needs attention",
    complete: "Complete",
    locked: "Not ready yet",
  }[stepState.status];
  const numberTone = stepState.attention
    ? "bg-amber-500 text-white"
    : {
        active: "bg-violet-600 text-white",
        blocked: "bg-red-600 text-white",
        complete: "bg-emerald-600 text-white",
        locked: "bg-slate-200 text-slate-500",
      }[stepState.status];
  const statusTone = stepState.attention
    ? "bg-amber-50 text-amber-800 ring-amber-200"
    : {
        active: "bg-violet-50 text-violet-700 ring-violet-100",
        blocked: "bg-red-50 text-red-700 ring-red-100",
        complete: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        locked: "bg-slate-100 text-slate-500 ring-slate-200",
      }[stepState.status];

  return (
    <div className="relative pl-12">
      <div className="absolute left-4 top-10 bottom-[-1.25rem] w-px bg-slate-200 last:hidden" aria-hidden="true" />
      <span
        className={clsx(
          "absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-black shadow-sm",
          numberTone,
        )}
      >
        {number}
      </span>
      <section className={clsx("rounded-2xl border bg-white p-4 shadow-sm sm:p-5", isLocked ? "border-slate-200" : "border-slate-200")}>
        <button
          type="button"
          className="flex w-full items-start justify-between gap-4 text-left"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          <span>
            <span className={clsx("flex items-center gap-2 text-lg font-black", isLocked ? "text-slate-500" : "text-slate-950")}>
              <HelpCircle className={clsx("h-4 w-4", isLocked ? "text-slate-400" : "text-violet-600")} />
              {title}
            </span>
            {description ? <span className="mt-2 block text-sm font-semibold leading-6 text-slate-500">{description}</span> : null}
            {isLocked && stepState.unavailableReason ? (
              <span className="mt-2 block text-xs font-bold text-slate-500">{stepState.unavailableReason}</span>
            ) : null}
          </span>
          <span className="flex flex-shrink-0 items-center gap-2">
            <span className={clsx("hidden rounded-full px-2.5 py-1 text-xs font-black ring-1 sm:inline-flex", statusTone)}>{statusLabel}</span>
            <ChevronDown className={clsx("h-5 w-5 text-slate-400 transition", expanded && "rotate-180")} />
          </span>
        </button>
        {expanded ? (
          <fieldset
            disabled={stepState.disabled}
            aria-disabled={stepState.disabled}
            className={clsx("mt-4 min-w-0 border-0 p-0", stepState.disabled && "pointer-events-none opacity-55 grayscale-[0.15]")}
          >
            {children}
          </fieldset>
        ) : null}
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

function DisabledLocationPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex gap-4">
          <input type="radio" disabled className="mt-4 h-5 w-5 border-slate-300 text-violet-600" />
          <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <FileText className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-700">Detected articles/blogs route</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Scan results will appear here when they are ready.</p>
            <div className="mt-3 h-2 w-2/3 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex gap-4">
          <input type="radio" disabled className="mt-4 h-5 w-5 border-slate-300 text-violet-600" />
          <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <Plus className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-700">Create a new articles folder</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Available if the scan does not find a suitable public route.</p>
            <input
              disabled
              value="/articles"
              readOnly
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4">
        <p className="text-sm font-black text-slate-700">Or paste manually</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              disabled
              placeholder="https://example.com/articles or /articles"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-bold text-slate-500"
            />
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-500"
          >
            Check this location
          </button>
        </div>
      </div>
    </div>
  );
}

function articleSetupHintValue(articleSetupState: VibeMarketingArticleSetupState | null | undefined) {
  const hint = resultObject(articleSetupState?.articleSurfaceHint);
  for (const key of ["route_path", "routePath", "path", "public_url", "publicUrl", "url"]) {
    const value = hint[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
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
  articleSetupState,
  framed = true,
  showDenySetupAction = false,
}: ArticleSystemConnectionPanelProps) {
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
  const setupBlocked = Boolean(bootstrap.checks.scaffold?.setupBlocked);
  const requestedScanRunId = new URLSearchParams(location.search).get("scanRunId")?.trim() ?? "";
  const currentScanRunId = requestedScanRunId || scanRun?.runId || articleSetupState?.scanRunId || "";
  const scanRunForCurrentId = !requestedScanRunId || scanRun?.runId === requestedScanRunId ? scanRun : null;
  const [polledScanRun, setPolledScanRun] = useState<VibeMarketingRunSummary | null>(null);
  const effectiveScanRun = polledScanRun?.runId === currentScanRunId ? polledScanRun : scanRunForCurrentId;
  const scanRunning = Boolean(effectiveScanRun && SCAN_RUNNING_STATUSES.has(effectiveScanRun.status));
  const scanFailed = Boolean(effectiveScanRun && SCAN_FAILED_STATUSES.has(effectiveScanRun.status));
  const canonicalScanComplete = articleSetupState?.scanStatus === "completed" && !articleSetupState.scanStale;
  const scanStale = Boolean(effectiveScanRun?.stale || effectiveScanRun?.staleReason === "scan_queue_not_started" || articleSetupState?.scanStale);
  const scanFailureGuidance = effectiveScanRun && (scanFailed || scanStale) ? runFailureGuidance(effectiveScanRun) : null;
  const manualFallbackReady = Boolean(scanFailureGuidance);
  const savedSurfaceUrl = articleSetupState?.routePath || articleSetupHintValue(articleSetupState);
  const scanNeedsSetupApproval = isScanAwaitingSetupApproval(effectiveScanRun);
  const setupRunId = articleSetupState?.setupRunId || (effectiveScanRun ? setupRunIdForRun(effectiveScanRun) : "");
  const inventoryScan = isInventoryScan(effectiveScanRun);
  const setupTargetScan = isSetupTargetScan(effectiveScanRun);
  const effectiveSetupRun = setupTargetScan ? effectiveScanRun : null;
  const inventoryProgressRun = effectiveScanRun && inventoryScan && !setupTargetScan ? effectiveScanRun : null;
  const inventoryReady = Boolean(inventoryProgressRun?.status === "completed" || (canonicalScanComplete && !articleSetupState?.setupRunId));
  const setupTargetReady = Boolean(
    articleSetupState?.setupRunId ||
      articleSetupState?.routePath ||
      (effectiveScanRun && setupTargetScan && (scanNeedsSetupApproval || setupRunId)),
  );
  const persistedSetupReady = Boolean(articleSetupState?.setupRunId || articleSetupState?.routePath);
  // A previously-FAILED setup attempt (e.g. preview_failed) is already surfaced by the
  // scaffold status card with the real error + a retry action. It must NOT also be reported
  // as a stale "saved location / the scan needs attention", which wrongly tells the user to
  // re-scan — re-scanning can never fix a failed setup preview.
  const persistedSetupFailed = Boolean(
    articleSetupState?.error ||
      SETUP_FAILED_STATUSES.has(normalizedStatus(articleSetupState?.setupStatus)) ||
      SETUP_FAILED_STATUSES.has(normalizedStatus(articleSetupState?.setupRunStatus)),
  );
  const persistedSetupIsStale = Boolean(persistedSetupReady && !persistedSetupFailed && (scanFailed || scanStale));
  const scanStartPending = actionPending("start-scan");
  const retryScanPending = actionPending("retry-scan");
  const cancelScanPending = actionPending("cancel-scan");
  const resetArticleSetupPending = actionPending("reset-article-setup");
  const confirmSurfacePending = actionPending("confirm-article-surface");
  const createSurfacePending = actionPending("create-article-surface");
  const [selectedChoiceId, setSelectedChoiceId] = useState("");
  const [manualArticleRoute, setManualArticleRoute] = useState("");
  const [manualRouteError, setManualRouteError] = useState("");
  const [createNewPath, setCreateNewPath] = useState(articleSurfaceDefault || "/articles");
  const [changingSavedLocation, setChangingSavedLocation] = useState(false);
  const lastScanProgressSignatureRef = useRef("");
  const lastScanProgressAtRef = useRef(Date.now());
  const lastTerminalRevalidationRef = useRef("");
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
  const selectedFiles =
    selectedMode === "existing" && selectedCandidate
      ? candidateFiles(selectedCandidate)
      : selectedMode === "create"
        ? [createNewPath.trim() || "/articles"]
        : [manualArticleRoute.trim()].filter(Boolean);
  const saveIntent = selectedMode === "create" ? "create-article-surface" : "confirm-article-surface";
  const savePending = confirmSurfacePending || createSurfacePending;
  const scanLoading = Boolean(currentScanRunId && !effectiveScanRun);
  const displayedSurfaceUrl = selectedSurfaceUrl || savedSurfaceUrl;
  const showSavedSetup = setupTargetReady && !changingSavedLocation;
  const locationChooserReady = Boolean(inventoryReady || changingSavedLocation || manualFallbackReady);
  const scaffoldCheck = bootstrap.checks.scaffold;
  const scaffoldExplicitReady = Boolean(
    scaffoldCheck?.generationReady ||
      scaffoldCheck?.setupMerged ||
      scaffoldCheck?.published ||
      articleSetupState?.generationReady ||
      articleSetupState?.setupMerged ||
      articleSetupState?.published,
  );
  const setupStatus = normalizedStatus(
    articleSetupState?.setupRunStatus ||
      articleSetupState?.setupStatus ||
      articleSystemSetupString(effectiveSetupRun, "status", "setup_status", "setupStatus") ||
      (setupRunId ? effectiveSetupRun?.currentStep || effectiveSetupRun?.status : ""),
  );
  const setupMergeStatus = normalizedStatus(
    articleSetupState?.mergeStatus ||
      articleSystemSetupString(effectiveSetupRun, "merge_status", "mergeStatus", "checks_status", "checksStatus"),
  );
  const setupPreviewUrl =
    articleSetupState?.livePreview?.previewUrl?.trim() ||
    articleSetupState?.livePreviewUrl?.trim() ||
    articleSetupState?.previewUrl?.trim() ||
    setupPreviewUrlForRun(effectiveSetupRun);
  const setupPrUrl = articleSetupState?.prUrl?.trim() || setupPrUrlForRun(effectiveSetupRun);
  const scaffoldLegacyReady = Boolean(scaffoldReady && !setupBlocked && !scaffoldExplicitReady);
  const scaffoldFailed = Boolean(
    setupRunId &&
      (articleSetupState?.error ||
        SETUP_FAILED_STATUSES.has(setupStatus) ||
        SETUP_FAILED_STATUSES.has(normalizedStatus(effectiveSetupRun?.status))),
  );
  const scaffoldVerifying = Boolean(
    !scaffoldExplicitReady &&
      (setupMergeStatus === "merged" ||
        SETUP_VERIFYING_STATUSES.has(setupStatus) ||
        (setupBlocked && (scaffoldCheck?.rescanRunId || setupStatus === "completed"))),
  );
  const scaffoldPublishReady = Boolean(setupPrUrl || SETUP_PUBLISH_STATUSES.has(setupStatus));
  const scaffoldStatus: ArticleSystemScaffoldStatus = !setupTargetReady && !selectedSurfaceUrl
    ? "not_ready"
    : scaffoldExplicitReady
      ? "ready"
      : scaffoldFailed
        ? "failed"
        : scaffoldVerifying
          ? "verifying"
          : scaffoldPublishReady
            ? "publish_ready"
            : setupPreviewUrl
              ? "review_ready"
              : scaffoldLegacyReady
                ? "legacy_ready"
                : setupRunId
                  ? "building"
                  : "ready_to_build";
  const setupRunHref = setupRunId ? `/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}` : "";
  const stepStates = articleSystemConnectionStepStates({
    connected,
    currentScanRunId,
    scanLoading,
    scanRunning,
    scanFailed,
    scanStale,
    inventoryReady: locationChooserReady,
    setupTargetReady: showSavedSetup,
    persistedSetupIsStale: showSavedSetup && persistedSetupIsStale,
    selectedSurfaceUrl,
    scaffoldStatus,
    setupSurfaceUrl: displayedSurfaceUrl,
  });

  useEffect(() => {
    setSelectedChoiceId("");
    setManualArticleRoute("");
    setManualRouteError("");
    setCreateNewPath(articleSurfaceDefault || "/articles");
    setChangingSavedLocation(false);
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
    const signature = repoScanProgressRefreshKey(effectiveScanRun);
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
    if (!effectiveScanRun?.runId) return;
    const terminalStatus = scanStale ? "stale" : effectiveScanRun.status;
    if (!scanStale && !SCAN_TERMINAL_REVALIDATE_STATUSES.has(effectiveScanRun.status)) return;
    const key = [effectiveScanRun.runId, terminalStatus, effectiveScanRun.updatedAt ?? ""].join("|");
    if (lastTerminalRevalidationRef.current === key) return;
    lastTerminalRevalidationRef.current = key;
    revalidator.revalidate();
  }, [effectiveScanRun?.runId, effectiveScanRun?.status, effectiveScanRun?.updatedAt, revalidator, scanStale]);

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

  const scaffoldRouteLabel = displayedSurfaceUrl || "the selected route";
  const scaffoldStatusCopy: Record<ArticleSystemScaffoldStatus, { title: string; body: string; tone: "emerald" | "violet" | "amber" | "red" | "slate" }> = {
    not_ready: {
      title: "No articles route selected yet",
      body: "Choose an articles route before building the scaffold page.",
      tone: "slate",
    },
    ready_to_build: {
      title: "Articles route is ready for setup",
      body: `Next: build the articles scaffold preview for ${scaffoldRouteLabel}.`,
      tone: "violet",
    },
    building: {
      title: "Articles scaffold build started",
      body: "Open the setup build to watch progress and inspect the preview when it is ready.",
      tone: "violet",
    },
    review_ready: {
      title: "Articles setup preview is ready",
      body: "Review the setup preview and approve it before it's published.",
      tone: "violet",
    },
    publish_ready: {
      title: "Ready to publish",
      body: "Publish the articles setup so it goes live on your website.",
      tone: "amber",
    },
    verifying: {
      title: "Verifying published articles scaffold",
      body: "Your published setup is being verified before article generation unlocks.",
      tone: "emerald",
    },
    ready: {
      title: "Articles scaffold is live",
      body: `Articles scaffold is live at ${scaffoldRouteLabel} and ready for article generation.`,
      tone: "emerald",
    },
    legacy_ready: {
      title: "Articles scaffold check passed",
      body: `Scaffold check passed for ${scaffoldRouteLabel}. No publish record was found.`,
      tone: "emerald",
    },
    failed: {
      title: "Articles scaffold setup needs attention",
      body: articleSetupState?.error || "Open the setup build to review the failure and retry.",
      tone: "red",
    },
  };
  const scaffoldStatusContent = scaffoldStatusCopy[scaffoldStatus];
  const scaffoldIconTone = {
    emerald: "bg-emerald-100 text-emerald-700",
    violet: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-400",
  }[scaffoldStatusContent.tone];
  const scaffoldActionLabel = articleSystemScaffoldActionLabel(scaffoldStatus);
  const scaffoldActionHelp: Record<ArticleSystemScaffoldStatus, string> = {
    not_ready: "Choose an articles route in step 3.",
    ready_to_build: "Build the scaffold preview for review.",
    building: "Track build progress and open the preview when it is ready.",
    review_ready: "Inspect the preview and approve it when it looks right.",
    publish_ready: "Publish the articles setup from the setup run.",
    verifying: "Waiting for the published scaffold to verify.",
    ready: "The scaffold is ready. Continue to topic research.",
    legacy_ready: "The scaffold check has passed. Continue to topic research.",
    failed: "Open the setup build to review the failure.",
  };
  const scaffoldAction =
    scaffoldStatus === "ready_to_build" ? (
      selectedSurfaceUrl ? (
        <Form method="POST" className="w-full sm:w-auto">
          <input type="hidden" name="intent" value={saveIntent} />
          <input type="hidden" name="githubRepo" value={selectedRepo} />
          <input type="hidden" name="sourceScanRunId" value={effectiveScanRun?.runId ?? ""} />
          <input type="hidden" name="articleSurfaceUrl" value={selectedSurfaceUrl} />
          <button
            type="submit"
            disabled={savePending || !selectedSurfaceUrl}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50 sm:w-auto"
          >
            {savePending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {savePending ? "Starting setup..." : scaffoldActionLabel}
            {!savePending ? <ArrowRight className="h-4 w-4" /> : null}
          </button>
        </Form>
      ) : (
        <Form method="POST" className="w-full sm:w-auto">
          <input type="hidden" name="scanRunId" value={effectiveScanRun?.runId ?? currentScanRunId} />
          <button
            type="submit"
            name="intent"
            value="build-article-system-preview"
            disabled={isSubmitting || !currentScanRunId}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50 sm:w-auto"
          >
            {scaffoldActionLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        </Form>
      )
    ) : scaffoldStatus === "building" || scaffoldStatus === "review_ready" || scaffoldStatus === "publish_ready" || scaffoldStatus === "failed" ? (
      setupRunHref ? (
        <Link
          to={setupRunHref}
          className={clsx(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black shadow-sm transition sm:w-auto",
            scaffoldStatus === "failed"
              ? "border border-red-200 bg-white text-red-700 hover:bg-red-50"
              : "bg-violet-600 text-white hover:bg-violet-700",
          )}
        >
          {scaffoldActionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-3 text-sm font-black text-slate-500 sm:w-auto"
        >
          {scaffoldActionLabel}
        </button>
      )
    ) : scaffoldStatus === "verifying" ? (
      <button
        type="button"
        disabled
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white opacity-60 shadow-sm sm:w-auto"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        {scaffoldActionLabel}
      </button>
    ) : scaffoldStatus === "ready" || scaffoldStatus === "legacy_ready" ? (
      <Link
        to="/founder-tools/marketing/create?step=research"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
      >
        {scaffoldActionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    ) : (
      <button
        type="button"
        disabled
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-3 text-sm font-black text-slate-500 sm:w-auto"
      >
        {scaffoldActionLabel}
      </button>
    );

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

      {persistedSetupIsStale ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold leading-6 text-amber-900">
          Your last articles/blogs setup is saved, but the latest repository scan needs attention. Re-scan to refresh the choices, or change the saved
          location and rebuild the setup preview.
        </div>
      ) : null}

      <div className="mt-6 space-y-5">
        <FlowStep
          number={1}
          title="Connect GitHub & choose repository"
          description="Choose the repository that contains your website."
          stepState={stepStates.connect}
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

        <FlowStep
          number={2}
          title="Scanning repository"
          description="Looking for article pages and content locations"
          stepState={stepStates.scan}
        >
          {scanLoading ? (
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 text-sm font-semibold text-violet-800">
              Loading scan progress...
            </div>
          ) : inventoryProgressRun ? (
            <>
              <MarketingRunProgressCard run={inventoryProgressRun} />
              {scanRunning || scanFailed || scanStale ? (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to={`/founder-tools/marketing/runs/${encodeURIComponent(inventoryProgressRun.runId)}`}
                    className="inline-flex text-xs font-black text-violet-700 transition hover:text-violet-900"
                  >
                    View scan run
                  </Link>
                  <Form method="POST" className="flex flex-col gap-2 sm:flex-row">
                    <input type="hidden" name="scanRunId" value={inventoryProgressRun.runId} />
                    {inventoryProgressRun.retryAvailable || inventoryProgressRun.stale ? (
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
            </>
          ) : setupTargetReady ? (
            <div
              className={clsx(
                "rounded-2xl border p-4 text-sm font-semibold leading-6",
                persistedSetupIsStale ? "border-amber-200 bg-amber-50 text-amber-900" : "border-emerald-100 bg-emerald-50 text-emerald-800",
              )}
            >
              {persistedSetupIsStale
                ? "A previous articles/blogs location is saved, but the latest scan did not complete cleanly."
                : "Repository scan completed previously and an articles/blogs location is already saved."}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600">
              Repository scan progress will appear here after you start the read-only scan.
            </div>
          )}
        </FlowStep>

        <FlowStep
          number={3}
          title="Choose articles route"
          description="Pick the route we found, paste a path manually, or create a new articles directory."
          stepState={stepStates.chooseLocation}
        >
          {showSavedSetup && !inventoryReady ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-3">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-950">Articles/blogs location already selected</p>
                    {displayedSurfaceUrl ? (
                      <p className="mt-1 break-all text-sm font-semibold text-slate-600">Public route: {displayedSurfaceUrl}</p>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-amber-800">Saved location could not be resolved. Re-scan to refresh your choices.</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setChangingSavedLocation(true);
                      setSelectedChoiceId("");
                      setManualArticleRoute(displayedSurfaceUrl || "");
                      setManualRouteError("");
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Change location
                  </button>
                  <Form method="POST">
                    <input type="hidden" name="intent" value="start-scan" />
                    <input type="hidden" name="scanPurpose" value="inventory" />
                    <input type="hidden" name="articleSurfaceMode" value="not_sure" />
                    <input type="hidden" name="githubRepo" value={selectedRepo} />
                    <button
                      type="submit"
                      disabled={scanStartPending || scanRunning || !selectedRepo}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-black text-violet-700 shadow-sm transition hover:bg-violet-50 disabled:opacity-50"
                    >
                      {scanStartPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      {scanStartPending ? "Starting scan..." : "Re-scan repository"}
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ) : locationChooserReady ? (
            <div className="space-y-3">
              {manualFallbackReady && scanFailureGuidance ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
                  <p className="font-black">Scan issue: {scanFailureGuidance.reason}</p>
                  <p className="mt-1">Next step: {scanFailureGuidance.nextStep}</p>
                  <p className="mt-1">You can still paste the known public articles/blogs route below, or create a new articles directory.</p>
                </div>
              ) : null}
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

              {selectedSurfaceUrl ? (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>
                    Selected <span className="break-all font-black">{selectedSurfaceUrl}</span>. Continue to step 4 below to build and preview the
                    articles/blogs page.
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <DisabledLocationPreview />
          )}
        </FlowStep>

        <FlowStep
          number={4}
          title="Build and publish articles scaffold"
          description="Build the route scaffold, review the preview, and publish it before article generation."
          stepState={stepStates.buildSetup}
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex gap-3">
              <span className={clsx("flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl", scaffoldIconTone)}>
                {scaffoldStatus === "ready" || scaffoldStatus === "legacy_ready" ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : scaffoldStatus === "not_ready" ? (
                  <LockKeyhole className="h-6 w-6" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-950">{scaffoldStatusContent.title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{scaffoldStatusContent.body}</p>
                {displayedSurfaceUrl ? (
                  <p className="mt-1 break-all text-sm font-semibold text-slate-600">Public route: {displayedSurfaceUrl}</p>
                ) : null}
                {selectedFiles.length && selectedSurfaceUrl ? (
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
        </FlowStep>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-950">Next action</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{scaffoldActionHelp[scaffoldStatus]}</p>
          </div>
          <div className="mt-4 flex-shrink-0 sm:mt-0">{scaffoldAction}</div>
        </div>

        {setupTargetReady || scaffoldReady ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-red-900">Reset articles setup</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-red-800">
                  Clear the saved articles setup for this repository and start the setup flow again.
                </p>
              </div>
              <Form
                method="POST"
                onSubmit={(event) => {
                  if (typeof window !== "undefined" && !window.confirm("Reset the saved articles setup for this repository?")) {
                    event.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="githubRepo" value={selectedRepo} />
                <button
                  type="submit"
                  name="intent"
                  value="reset-article-setup"
                  disabled={resetArticleSetupPending || !selectedRepo}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-black text-red-700 shadow-sm transition hover:bg-red-100 disabled:opacity-50 sm:w-auto"
                >
                  {resetArticleSetupPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                  {resetArticleSetupPending ? "Resetting..." : "Reset articles setup"}
                </button>
              </Form>
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}
