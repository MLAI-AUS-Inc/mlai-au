import { Form, Link, useFetcher, useRevalidator } from "react-router";
import { clsx } from "clsx";
import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  ExternalLink,
  Eye,
  Info,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import ArticleSystemSurfaceSummary from "~/components/ArticleSystemSurfaceSummary";
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

const SCAN_RUNNING_STATUSES = new Set(["queued", "running"]);
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

function hasScanMissingArticleParts(run: VibeMarketingRunSummary | null | undefined, scaffoldReady: boolean) {
  if (!run || scaffoldReady || SCAN_RUNNING_STATUSES.has(run.status)) return false;
  const readiness = resultObject(resultValue(run, "article_system_readiness"));
  const readinessStatus = String(readiness.status ?? "").trim().toLowerCase();
  const scaffoldRequired = Boolean(resultValue(run, "scaffold_required") ?? readiness.scaffold_required);
  return (
    scaffoldRequired ||
    ["manual_blocked", "missing", "needs_setup", "approval_required", "blocked"].includes(readinessStatus) ||
    run.status === "completed"
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function TrustBullet({ children, tone = "violet" }: { children: string; tone?: "violet" | "blue" | "emerald" }) {
  const toneClass = {
    violet: "bg-violet-600 text-white",
    blue: "bg-blue-600 text-white",
    emerald: "bg-emerald-600 text-white",
  }[tone];
  return (
    <li className="flex gap-3 text-sm font-medium leading-6 text-slate-700">
      <span className={clsx("mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full", toneClass)}>
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function TrustCard({
  title,
  icon,
  tone,
  children,
}: {
  title: string;
  icon: ReactNode;
  tone: "violet" | "blue" | "emerald";
  children: ReactNode;
}) {
  const styles = {
    violet: {
      card: "border-violet-100 bg-violet-50/50",
      title: "text-violet-700",
      icon: "from-violet-700 to-violet-500 text-white",
    },
    blue: {
      card: "border-blue-100 bg-blue-50/50",
      title: "text-blue-700",
      icon: "from-blue-700 to-blue-500 text-white",
    },
    emerald: {
      card: "border-emerald-100 bg-emerald-50/60",
      title: "text-emerald-700",
      icon: "from-emerald-700 to-emerald-500 text-white",
    },
  }[tone];
  return (
    <section className={clsx("rounded-2xl border p-5 shadow-sm", styles.card)}>
      <div className="flex gap-4">
        <div className={clsx("flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-sm", styles.icon)}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className={clsx("text-base font-black", styles.title)}>{title}</h3>
          <ul className="mt-3 space-y-2">{children}</ul>
        </div>
      </div>
    </section>
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

function PermissionPill({
  children,
  tone = "emerald",
  icon,
}: {
  children: ReactNode;
  tone?: "emerald" | "violet" | "slate";
  icon: ReactNode;
}) {
  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    violet: "bg-violet-50 text-violet-700 ring-violet-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
  }[tone];
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1", toneClass)}>
      {icon}
      {children}
    </span>
  );
}

export default function ArticleSystemConnectionPanel({
  bootstrap,
  githubRepos,
  isSubmitting,
  isActionPending,
  repoSelection,
  onRepoSelectionChange,
  articleSurfaceDefault = "",
  articleSurfacePlaceholder = "https://www.mlai.au/articles or /articles",
  connectionError,
  scanRun,
  framed = true,
  showDenySetupAction = false,
  autoStartInventoryScan = false,
}: ArticleSystemConnectionPanelProps) {
  const inventoryFetcher = useFetcher();
  const revalidator = useRevalidator();
  const actionPending = isActionPending ?? (() => isSubmitting);
  const connected = isGithubConnected(githubRepos, bootstrap);
  void showDenySetupAction;
  const repos = repoNames(githubRepos);
  const selectedRepo = selectedRepoName({ bootstrap, githubRepos, repos, repoSelection });
  const repoUrl = selectedRepo.includes("/") ? `https://github.com/${selectedRepo}` : "";
  const locationPlaceholder = connected ? articleSurfacePlaceholder : "e.g. /content/articles";
  const statusLabel = bootstrap.checks.scaffold?.passed ? "Ready" : connected ? "Connected" : "Ready";
  const connectionLabel = githubConnectionState(githubRepos, bootstrap).replace(/_/g, " ") || (connected ? "connected" : "not connected");
  const scaffoldReady = Boolean(bootstrap.checks.scaffold?.passed);
  const scanRunning = Boolean(scanRun && SCAN_RUNNING_STATUSES.has(scanRun.status));
  const scanFailed = Boolean(scanRun && SCAN_FAILED_STATUSES.has(scanRun.status));
  const scanStale = Boolean(scanRun?.stale || scanRun?.staleReason === "scan_queue_not_started");
  const scanNeedsSetupApproval = isScanAwaitingSetupApproval(scanRun);
  const scanMissingArticleParts = hasScanMissingArticleParts(scanRun, scaffoldReady);
  const setupRunId = scanRun ? setupRunIdForRun(scanRun) : "";
  const inventoryScan = isInventoryScan(scanRun);
  const setupTargetScan = isSetupTargetScan(scanRun);
  const inventoryReady = Boolean(scanRun && inventoryScan && scanRun.status === "completed");
  const setupTargetReady = Boolean(scanRun && setupTargetScan && (scanNeedsSetupApproval || setupRunId));
  const previewShouldStartOpen = Boolean(inventoryReady || setupTargetReady || scanFailed || scanStale || scanMissingArticleParts);
  const [articlePreviewOpen, setArticlePreviewOpen] = useState(previewShouldStartOpen);
  const [selectedArticleRoute, setSelectedArticleRoute] = useState("");
  const [manualArticleRoute, setManualArticleRoute] = useState("");
  const [githubAuthWaiting, setGithubAuthWaiting] = useState(() =>
    typeof window !== "undefined" && window.sessionStorage.getItem("vibe-marketing:github-auth-open") === "true",
  );
  const hasExistingSurfaceChoice = Boolean(selectedArticleRoute || manualArticleRoute.trim());
  const showScanProgress = Boolean(scanRun && (scanRunning || scanFailed || scanStale));
  const scanStartPending = actionPending("start-scan") || inventoryFetcher.state !== "idle";
  const retryScanPending = actionPending("retry-scan");
  const cancelScanPending = actionPending("cancel-scan");
  const confirmSurfacePending = actionPending("confirm-article-surface");
  const createSurfacePending = actionPending("create-article-surface");
  const continueBlocked = Boolean(scanRun && (scanRunning || scanFailed || scanStale) && !setupTargetReady);
  const canContinue = connected && (scaffoldReady || setupTargetReady) && !continueBlocked;
  const continueHelp = setupTargetReady
    ? "Route intent saved. Continue to generate and review the article system setup."
    : !scaffoldReady
      ? "Scan the repository, then choose where articles should live."
      : continueBlocked
        ? "Resolve the current scan state before continuing."
        : "Article system confirmed. You can continue to topic research.";

  useEffect(() => {
    setArticlePreviewOpen(previewShouldStartOpen);
  }, [previewShouldStartOpen, scanRun?.runId, scanRun?.status]);

  useEffect(() => {
    setSelectedArticleRoute("");
    setManualArticleRoute("");
  }, [scanRun?.runId]);

  useEffect(() => {
    if (!autoStartInventoryScan || !connected || !selectedRepo || scanRun || inventoryFetcher.state !== "idle") return;
    const key = `vibe-marketing:auto-inventory-scan:${bootstrap.organization.id ?? "org"}:${selectedRepo}`;
    if (typeof window !== "undefined" && window.sessionStorage.getItem(key) === "started") return;
    if (typeof window !== "undefined") window.sessionStorage.setItem(key, "started");
    const formData = new FormData();
    formData.set("intent", "start-scan");
    formData.set("scanPurpose", "inventory");
    formData.set("articleSurfaceMode", "not_sure");
    formData.set("githubRepo", selectedRepo);
    void inventoryFetcher.submit(formData, { method: "POST" });
  }, [autoStartInventoryScan, bootstrap.organization.id, connected, inventoryFetcher, scanRun, selectedRepo]);

  useEffect(() => {
    if (connected || typeof window === "undefined") return;
    const maybeRevalidate = () => {
      if (window.sessionStorage.getItem("vibe-marketing:github-auth-open") === "true") {
        revalidator.revalidate();
      }
    };
    window.addEventListener("focus", maybeRevalidate);
    document.addEventListener("visibilitychange", maybeRevalidate);
    const timer = window.setInterval(maybeRevalidate, 5000);
    return () => {
      window.removeEventListener("focus", maybeRevalidate);
      document.removeEventListener("visibilitychange", maybeRevalidate);
      window.clearInterval(timer);
    };
  }, [connected, revalidator]);

  useEffect(() => {
    if (connected && typeof window !== "undefined") {
      window.sessionStorage.removeItem("vibe-marketing:github-auth-open");
      setGithubAuthWaiting(false);
    }
  }, [connected]);

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

  return (
    <section className={clsx(framed && "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Connect GitHub & set your articles location
          </h2>
          <p className="mt-3 max-w-5xl text-base font-medium leading-7 text-slate-600">
            We connect to your repository so our AI agent can help you create content.
            <br className="hidden sm:block" />
            <span className="font-black text-slate-800"> You&apos;re always in control.</span> The AI will never publish or make changes unless you{" "}
            <span className="font-black text-violet-700">specifically</span> approve them.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 ring-1 ring-emerald-100">
          {statusLabel}
          <CheckCircle2 className="h-4 w-4" />
        </span>
      </div>

      {!connected ? (
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          <TrustCard title="You're always in control" tone="violet" icon={<ShieldCheck className="h-8 w-8" />}>
            <TrustBullet tone="violet">We will never publish or make any changes unless you specifically approve.</TrustBullet>
            <TrustBullet tone="violet">Every change is shown to you first for review.</TrustBullet>
            <TrustBullet tone="violet">You decide what goes live.</TrustBullet>
          </TrustCard>
          <TrustCard title="Only your articles, never your code" tone="blue" icon={<Code2 className="h-8 w-8" />}>
            <TrustBullet tone="blue">We only write to your articles/blogs location.</TrustBullet>
            <TrustBullet tone="blue">We will never delete or change code or files in any other part of your app or website.</TrustBullet>
            <TrustBullet tone="blue">Your app, settings and configuration stay untouched.</TrustBullet>
          </TrustCard>
          <TrustCard title="Secure & transparent" tone="emerald" icon={<LockKeyhole className="h-8 w-8" />}>
            <TrustBullet tone="emerald">Connected via GitHub with granular permissions.</TrustBullet>
            <TrustBullet tone="emerald">Your code and content stays yours.</TrustBullet>
            <TrustBullet tone="emerald">You can disconnect at any time.</TrustBullet>
          </TrustCard>
        </div>
      ) : null}

      {!connected ? (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-950">
            <GitHubMark className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-black text-slate-950">Connect your GitHub repository</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            This gives the AI agent permission to create and update content in your articles location only.
          </p>
          <Form method="POST" target="_blank" rel="noopener noreferrer" reloadDocument className="mt-5">
            <input type="hidden" name="intent" value="connect-github" />
            <button
              type="submit"
              onClick={markGithubAuthOpen}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-black disabled:opacity-50"
            >
              <GitHubMark className="h-5 w-5" />
              {githubAuthWaiting ? "Open GitHub again" : "Connect GitHub"}
            </button>
          </Form>
          {githubAuthWaiting ? (
            <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-left text-sm font-semibold text-violet-800">
              GitHub opened in a new tab. Finish authorising there, then return here; this page will refresh when the connection is ready.
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <SmallProof icon={<LockKeyhole className="h-4 w-4" />} label="Secure OAuth" />
            <SmallProof icon={<ShieldCheck className="h-4 w-4" />} label="Granular permissions" />
            <SmallProof icon={<Eye className="h-4 w-4" />} label="You're in control" />
          </div>
          <div className="mx-auto mt-5 flex max-w-3xl items-start gap-3 rounded-xl bg-violet-50 px-4 py-3 text-left text-sm font-semibold leading-5 text-slate-700">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>
              We only request access to what we need. You can review and revoke access at any time.
              <span className="ml-1 inline-flex items-center gap-1 font-black text-violet-700">
                Learn more about our permissions <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
          {connectionError ? (
            <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700">
              {connectionError}
            </div>
          ) : null}
        </section>
      ) : (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-950">
                <GitHubMark className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">GitHub connection</h3>
                <p className="mt-2 text-sm font-black text-slate-700">
                  Connected to {selectedRepo || "your selected repository"}
                  {repoUrl ? (
                    <a href={repoUrl} target="_blank" rel="noreferrer" className="ml-2 inline-flex text-slate-500 transition hover:text-violet-700">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <PermissionPill icon={<CheckCircle2 className="h-3.5 w-3.5" />}>Connected</PermissionPill>
                  <PermissionPill tone="emerald" icon={<ShieldCheck className="h-3.5 w-3.5" />}>Write access limited</PermissionPill>
                  <PermissionPill tone="slate" icon={<Info className="h-3.5 w-3.5" />}>{connectionLabel}</PermissionPill>
                </div>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-500">
                  We have write access to create and update content in your articles location only.
                  <span className="block font-black text-slate-700">We will never delete or change any other files.</span>
                </p>
              </div>
            </div>
            <Form method="POST" target="_blank" rel="noopener noreferrer" reloadDocument className="flex flex-col items-start gap-2 lg:items-end">
              <input type="hidden" name="intent" value="connect-github" />
              <input type="hidden" name="forceReconnect" value="true" />
              <button
                type="submit"
                onClick={markGithubAuthOpen}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 disabled:opacity-50"
              >
                <GitHubMark className="h-5 w-5" />
                {githubAuthWaiting ? "Open GitHub again" : "Manage GitHub access"}
              </button>
              <p className="max-w-48 text-left text-xs font-semibold leading-5 text-slate-500 lg:text-right">
                {githubAuthWaiting ? "Waiting for the GitHub tab to finish authorising." : "Use this if the repo you need is not listed."}
              </p>
            </Form>
          </div>
        </section>
      )}

      {connected ? (
        <Form method="POST" className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <input type="hidden" name="intent" value="start-scan" />
          <input type="hidden" name="scanPurpose" value="inventory" />
          <input type="hidden" name="articleSurfaceMode" value="not_sure" />
          <div className="grid gap-4 lg:grid-cols-[minmax(220px,420px)_1fr]">
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
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-sm font-black text-slate-800">Read-only inventory scan</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                We will find likely article/blog pages and ask you to choose one. No setup files or pull requests are created from this scan.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={scanStartPending || scanRunning || (repos.length > 0 && !selectedRepo)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-black text-violet-700 shadow-sm transition hover:bg-violet-50 disabled:opacity-50"
            >
              {scanStartPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {scanStartPending ? "Starting scan..." : "Scan repository"}
            </button>
          </div>
        </Form>
      ) : null}

      {showScanProgress && scanRun ? (
        <div className="mt-5 space-y-4">
          <MarketingRunProgressCard run={scanRun} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {scanRun.stale
                  ? "This scan did not start on the worker queue. Retry it, or cancel and start with new details."
                  : scanFailed
                    ? "The scan needs attention. Retry it, or cancel and start again with a different repo."
                    : "Scanning is read-only. No files are changed."}
              </p>
              <Link
                to={`/founder-tools/marketing/runs/${encodeURIComponent(scanRun.runId)}`}
                className="mt-2 inline-flex text-xs font-black text-violet-700 transition hover:text-violet-900"
              >
                View scan run
              </Link>
            </div>
            <Form method="POST" className="flex flex-col gap-2 sm:flex-row">
              <input type="hidden" name="scanRunId" value={scanRun.runId} />
              {scanRun.retryAvailable || scanRun.stale ? (
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
        </div>
      ) : null}

      {scanRun && (inventoryReady || setupTargetReady || scanFailed || scanStale) ? (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setArticlePreviewOpen((open) => !open)}
            className="flex w-full flex-col gap-3 p-4 text-left sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-black text-slate-950">
                {setupTargetReady ? "Article system target saved" : "Choose article location"}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {setupTargetReady
                  ? "Continue to the generate step to build and review the article system preview."
                  : scanFailed || scanStale
                    ? "The scan could not confidently confirm a route. Try again, or paste a route after a successful scan."
                    : "Pick a detected route from the scan, paste the correct URL, or create a new articles directory."}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-violet-700">
              {articlePreviewOpen ? "Hide" : "Show"}
              <ChevronDown className={clsx("h-4 w-4 transition", articlePreviewOpen && "rotate-180")} />
            </span>
          </button>
          {articlePreviewOpen ? (
            <div className="space-y-4 border-t border-slate-100 p-4">
              {setupTargetReady ? (
                <>
                  <ArticleSystemSurfaceSummary run={scanRun} />
                  <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
                    <p className="text-sm font-black text-violet-950">Ready to generate the articles page setup.</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-violet-800">
                      The setup target is saved. The next step will create the setup branch, build the Cloudflare preview, and open the visual inspector.
                    </p>
                  </div>
                </>
              ) : inventoryReady ? (
                <>
                  <Form method="POST" className="space-y-4">
                    <input type="hidden" name="intent" value="confirm-article-surface" />
                    <input type="hidden" name="githubRepo" value={selectedRepo} />
                    <input type="hidden" name="sourceScanRunId" value={scanRun.runId} />
                    <ArticleSystemSurfaceSummary
                      run={scanRun}
                      selectable
                      fieldName="articleSurfaceUrl"
                      selectionValue={selectedArticleRoute}
                      manualValue={manualArticleRoute}
                      onSelectionValueChange={setSelectedArticleRoute}
                      onManualValueChange={setManualArticleRoute}
                    />
                    <button
                      type="submit"
                      disabled={confirmSurfacePending || createSurfacePending || !hasExistingSurfaceChoice}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {confirmSurfacePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      {confirmSurfacePending ? "Saving route..." : "Continue to generate article system"}
                    </button>
                  </Form>
                  <Form method="POST" className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <input type="hidden" name="intent" value="create-article-surface" />
                    <input type="hidden" name="githubRepo" value={selectedRepo} />
                    <input type="hidden" name="sourceScanRunId" value={scanRun.runId} />
                    <label className="block">
                      <span className="text-sm font-black text-slate-900">None of these. Create a new articles directory.</span>
                      <input
                        name="articleSurfaceUrl"
                        defaultValue={articleSurfaceDefault || "/articles"}
                        placeholder={locationPlaceholder}
                        className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={confirmSurfacePending || createSurfacePending}
                      className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-black text-violet-700 shadow-sm transition hover:bg-violet-50 disabled:opacity-50"
                    >
                      {createSurfacePending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {createSurfacePending ? "Creating route..." : "Create and continue"}
                    </button>
                  </Form>
                </>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-black text-amber-950">We could not confidently match an articles page.</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-amber-800">
                    Retry the scan, manage GitHub access if the repo is wrong, or start a new scan after choosing the correct repository.
                  </p>
                  <div className="mt-3">
                    <ArticleSystemSurfaceSummary run={scanRun} />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>
      ) : null}

      {connected ? (
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-500">{continueHelp}</p>
          {canContinue ? (
            <Link
              to={setupTargetReady ? "/founder-tools/marketing/create?step=writeCheck" : "/founder-tools/marketing/create?step=research"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-700"
            >
              {setupTargetReady ? "Continue to generate article system" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white opacity-45 shadow-sm"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
}
