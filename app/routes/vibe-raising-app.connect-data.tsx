import { useEffect, useMemo, useRef, useState } from "react";
import type { Route } from "./+types/vibe-raising-app.connect-data";
import { redirect, useLoaderData, useLocation, useNavigate } from "react-router";
import { clsx } from "clsx";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  FolderIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { getEnv } from "~/lib/env.server";
import {
  bootstrapVibeRaisingStartupUpdate,
  connectVibeRaisingInputSource,
  getVibeRaisingInputSourcesStatus,
  requireVibeRaisingFounder,
  syncVibeRaisingFinancialSources,
} from "~/lib/vibe-raising";
import type {
  VibeRaisingInputSourceKey,
  VibeRaisingInputSourceStatus,
  VibeRaisingInputSourceSummary,
} from "~/types/vibe-raising";
import MonthlyUpdateStepper, { type MonthlyUpdateStepKey } from "~/components/MonthlyUpdateStepper";

const DEFAULT_NEXT = "/vibe-raising/create-update";
const FUNCTIONAL_SOURCES = new Set<VibeRaisingInputSourceKey>(["gmail", "stripe", "xero", "bank_feed", "notion", "google_drive", "slack"]);
const POPULAR_SOURCE_KEYS: VibeRaisingInputSourceKey[] = [
  "gmail",
  "stripe",
  "bank_feed",
  "notion",
  "google_drive",
  "xero",
];
const EXTRA_SOURCE_KEYS: VibeRaisingInputSourceKey[] = ["slack"];

const EMPTY_SOURCES: VibeRaisingInputSourceSummary[] = [
  {
    key: "gmail",
    label: "Gmail",
    capabilities: ["context"],
    selected: false,
    status: "not_connected",
  },
  {
    key: "stripe",
    label: "Stripe",
    capabilities: ["metrics"],
    selected: false,
    status: "not_connected",
  },
  {
    key: "xero",
    label: "Xero",
    capabilities: ["metrics"],
    selected: false,
    status: "not_connected",
  },
  {
    key: "bank_feed",
    label: "Bank Feed",
    capabilities: ["cash_validation"],
    selected: false,
    status: "not_connected",
  },
  {
    key: "notion",
    label: "Notion",
    capabilities: ["docs", "context"],
    selected: false,
    status: "not_connected",
  },
  {
    key: "google_drive",
    label: "Google Drive",
    capabilities: ["docs", "context"],
    selected: false,
    status: "not_connected",
  },
  {
    key: "slack",
    label: "Slack",
    capabilities: ["context"],
    selected: false,
    status: "not_connected",
  },
];

const SOURCE_COPY: Record<VibeRaisingInputSourceKey, { description: string; connectedUse: string }> = {
  gmail: {
    description: "Scan emails for key updates, investor feedback, and important threads.",
    connectedUse: "Emails, investor threads",
  },
  stripe: {
    description: "Pull revenue, subscriptions, and financial metrics automatically.",
    connectedUse: "Revenue, subscriptions",
  },
  xero: {
    description: "Use invoices and recurring revenue records from your accounting workspace.",
    connectedUse: "Invoices, accounting",
  },
  bank_feed: {
    description: "Import transactions and cash flow data from your business accounts.",
    connectedUse: "Transactions, cash flow",
  },
  notion: {
    description: "Sync notes, docs, and internal updates from your workspace.",
    connectedUse: "Docs, notes, updates",
  },
  google_drive: {
    description: "Add files, reports, and presentations for deeper context.",
    connectedUse: "Files, reports, decks",
  },
  slack: {
    description: "Bring in important team updates and customer conversations.",
    connectedUse: "Team updates, conversations",
  },
};

function sanitizeNext(value: string | null) {
  if (!value) return DEFAULT_NEXT;
  let candidate = value.trim();
  if (!candidate) return DEFAULT_NEXT;

  try {
    if (/^https?:\/\//i.test(candidate)) {
      const parsed = new URL(candidate);
      candidate = `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return DEFAULT_NEXT;
  }

  if (!candidate.startsWith("/vibe-raising/create-update")) {
    return DEFAULT_NEXT;
  }
  return candidate;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { appUser: user } = await requireVibeRaisingFounder(env, request);

  if (!user.companyRegistered) {
    throw redirect("/vibe-raising/company-setup");
  }

  const url = new URL(request.url);
  return {
    user,
    next: sanitizeNext(url.searchParams.get("next")),
    backendBaseUrl: String(env.BACKEND_BASE_URL || "http://localhost:8000"),
  };
}

function statusLabel(status: VibeRaisingInputSourceStatus) {
  switch (status) {
    case "connected":
      return "Connected";
    case "syncing":
      return "Syncing";
    case "error":
      return "Needs attention";
    case "coming_soon":
      return "Coming soon";
    case "unavailable":
      return "Not available yet";
    default:
      return "Not connected";
  }
}

function statusClassName(status: VibeRaisingInputSourceStatus) {
  switch (status) {
    case "connected":
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    case "syncing":
      return "bg-blue-50 text-blue-700 ring-blue-100";
    case "error":
      return "bg-amber-50 text-amber-700 ring-amber-100";
    case "coming_soon":
      return "bg-gray-100 text-gray-500 ring-gray-200";
    case "unavailable":
      return "bg-gray-100 text-gray-500 ring-gray-200";
    default:
      return "bg-violet-50 text-violet-700 ring-violet-100";
  }
}

function capabilityLabel(capability: VibeRaisingInputSourceSummary["capabilities"][number]) {
  switch (capability) {
    case "metrics":
      return "Metrics";
    case "cash_validation":
      return "Cash validation";
    case "docs":
      return "Docs";
    default:
      return "Context";
  }
}

function SourceLogo({ sourceKey }: { sourceKey: VibeRaisingInputSourceKey }) {
  if (sourceKey === "gmail") {
    return (
      <div className="relative h-9 w-9 rounded-lg bg-white">
        <span className="absolute left-1 top-2 h-5 w-1.5 rotate-[-35deg] rounded-full bg-red-500" />
        <span className="absolute left-[14px] top-2 h-5 w-1.5 rotate-[35deg] rounded-full bg-yellow-400" />
        <span className="absolute right-1 top-2 h-5 w-1.5 rotate-[35deg] rounded-full bg-emerald-500" />
        <span className="absolute bottom-2 left-1 h-1.5 w-7 rounded-full bg-blue-500" />
      </div>
    );
  }

  if (sourceKey === "stripe") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#635bff] text-[10px] font-extrabold lowercase text-white">
        stripe
      </div>
    );
  }

  if (sourceKey === "xero") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#13b5ea] text-sm font-extrabold text-white">
        xe
      </div>
    );
  }

  if (sourceKey === "bank_feed") {
    return <BuildingLibraryIcon className="h-9 w-9 text-violet-600" />;
  }

  if (sourceKey === "notion") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-black bg-white text-xl font-black text-black">
        N
      </div>
    );
  }

  if (sourceKey === "google_drive") {
    return (
      <div className="relative h-9 w-9">
        <span className="absolute left-3 top-0 h-8 w-3 rotate-[30deg] rounded-sm bg-emerald-500" />
        <span className="absolute left-1 top-4 h-3 w-8 rounded-sm bg-blue-500" />
        <span className="absolute right-1 top-4 h-3 w-8 rotate-[-60deg] rounded-sm bg-yellow-400" />
      </div>
    );
  }

  return (
    <div className="grid h-9 w-9 grid-cols-2 gap-1">
      <span className="rounded-full bg-[#36c5f0]" />
      <span className="rounded-full bg-[#2eb67d]" />
      <span className="rounded-full bg-[#ecb22e]" />
      <span className="rounded-full bg-[#e01e5a]" />
    </div>
  );
}

function ConnectorCard({
  source,
  selected,
  busy,
  onConnect,
  onToggle,
}: {
  source: VibeRaisingInputSourceSummary;
  selected: boolean;
  busy: boolean;
  onConnect: (source: VibeRaisingInputSourceSummary) => void;
  onToggle: (source: VibeRaisingInputSourceSummary) => void;
}) {
  const selectable = FUNCTIONAL_SOURCES.has(source.key) && (source.status === "connected" || source.status === "syncing");
  const canConnect = FUNCTIONAL_SOURCES.has(source.key) && source.status !== "connected" && source.status !== "syncing" && source.status !== "unavailable";
  const disabled = source.status === "coming_soon" || source.status === "unavailable";

  return (
    <div className="flex min-h-[240px] flex-col rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <SourceLogo sourceKey={source.key} />
        <span className={clsx("inline-flex items-center rounded-full px-2 py-1 text-[11px] font-bold ring-1", statusClassName(source.status))}>
          {statusLabel(source.status)}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-bold text-gray-950">{source.label}</h3>
        <p className="mt-4 min-h-[48px] text-sm leading-6 text-slate-500">{SOURCE_COPY[source.key].description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {source.capabilities.map((capability) => (
          <span key={capability} className="rounded-full bg-gray-50 px-2 py-1 text-[11px] font-bold text-slate-500">
            {capabilityLabel(capability)}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {selectable ? (
          <button
            type="button"
            onClick={() => onToggle(source)}
            className={clsx(
              "flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-extrabold transition",
              selected ? "bg-violet-600 text-white" : "bg-violet-50 text-violet-700 hover:bg-violet-100",
            )}
          >
            <span>{selected ? "Using in this update" : "Use in this update"}</span>
            <CheckCircleIcon className={clsx("h-5 w-5", selected ? "text-white" : "text-violet-300")} />
          </button>
        ) : (
          <button
            type="button"
            disabled={disabled || busy || !canConnect}
            onClick={() => onConnect(source)}
            className={clsx(
              "w-full rounded-lg px-4 py-3 text-sm font-extrabold transition",
              disabled || !canConnect
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-violet-50 text-violet-700 hover:bg-violet-100",
            )}
          >
            {busy ? "Connecting..." : disabled ? statusLabel(source.status) : "Connect"}
          </button>
        )}

        {source.warning && source.status !== "coming_soon" ? (
          <p className="mt-3 text-xs font-medium leading-5 text-amber-700">{source.warning}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function ConnectData() {
  const { backendBaseUrl, next, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const location = useLocation();
  const [sources, setSources] = useState<VibeRaisingInputSourceSummary[]>(EMPTY_SOURCES);
  const [selectedSources, setSelectedSources] = useState<Set<VibeRaisingInputSourceKey>>(new Set());
  const [showAllSources, setShowAllSources] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [syncingFinance, setSyncingFinance] = useState(false);
  const [busyProvider, setBusyProvider] = useState<VibeRaisingInputSourceKey | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const defaultSelectionAppliedRef = useRef(false);

  const sourceByKey = useMemo(() => new Map(sources.map((source) => [source.key, source])), [sources]);
  const orderedVisibleSources = useMemo(() => {
    const keys = showAllSources ? [...POPULAR_SOURCE_KEYS, ...EXTRA_SOURCE_KEYS] : POPULAR_SOURCE_KEYS;
    return keys.map((key) => sourceByKey.get(key)).filter((source): source is VibeRaisingInputSourceSummary => Boolean(source));
  }, [showAllSources, sourceByKey]);
  const connectedSources = useMemo(
    () => sources.filter((source) => FUNCTIONAL_SOURCES.has(source.key) && (source.status === "connected" || source.status === "syncing")),
    [sources],
  );
  const selectedSourceList = useMemo(
    () => sources.filter((source) => selectedSources.has(source.key)),
    [selectedSources, sources],
  );
  const hasConnectedFinance = connectedSources.some((source) => source.key === "stripe" || source.key === "xero" || source.key === "bank_feed");

  const refreshStatuses = async () => {
    setLoadingStatus(true);
    setStatusMessage(null);
    try {
      const response = await getVibeRaisingInputSourcesStatus(backendBaseUrl);
      setSources(response.sources);
      if (!defaultSelectionAppliedRef.current) {
        defaultSelectionAppliedRef.current = true;
        setSelectedSources(new Set(
          response.sources
            .filter((source) => FUNCTIONAL_SOURCES.has(source.key) && (source.status === "connected" || source.status === "syncing"))
            .map((source) => source.key),
        ));
      }
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't load connector status.");
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    void refreshStatuses();
  }, [backendBaseUrl]);

  const currentReturnPath = `${location.pathname}${location.search || ""}`;

  const handleConnect = async (source: VibeRaisingInputSourceSummary) => {
    if (!FUNCTIONAL_SOURCES.has(source.key)) return;
    setBusyProvider(source.key);
    setStatusMessage(null);

    try {
      if (source.key === "gmail") {
        const bootstrap = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl, { next: currentReturnPath });
        if (bootstrap.googleConnected) {
          await refreshStatuses();
          return;
        }
        if (!bootstrap.oauthUrl) {
          throw new Error("Missing Google OAuth redirect URL.");
        }
        window.location.assign(bootstrap.oauthUrl);
        return;
      }

      window.location.assign(connectVibeRaisingInputSource(backendBaseUrl, source.key, next));
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : `We couldn't connect ${source.label}.`);
      setBusyProvider(null);
    }
  };

  const handleToggle = (source: VibeRaisingInputSourceSummary) => {
    if (!FUNCTIONAL_SOURCES.has(source.key)) return;
    if (source.status !== "connected" && source.status !== "syncing") return;

    setSelectedSources((previous) => {
      const nextSelected = new Set(previous);
      if (nextSelected.has(source.key)) {
        nextSelected.delete(source.key);
      } else {
        nextSelected.add(source.key);
      }
      return nextSelected;
    });
  };

  const handleSyncFinance = async () => {
    setSyncingFinance(true);
    setStatusMessage(null);
    try {
      await syncVibeRaisingFinancialSources(backendBaseUrl);
      await refreshStatuses();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't start the financial sync.");
    } finally {
      setSyncingFinance(false);
    }
  };

  const navigateBackToUpdates = () => {
    navigate("/vibe-raising");
  };

  const navigateToDraft = (includeInputs: boolean) => {
    const target = new URL(next, "http://mlai.local");
    if (includeInputs && selectedSources.size > 0) {
      target.searchParams.set("inputs", Array.from(selectedSources).join(","));
    } else {
      target.searchParams.delete("inputs");
    }
    navigate(`${target.pathname}${target.search}`);
  };

  const handleStepperClick = (step: MonthlyUpdateStepKey) => {
    if (step === "connect") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === "draft") {
      navigateToDraft(true);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-16">
      <MonthlyUpdateStepper
        activeStep="connect"
        enabledSteps={["connect", "draft"]}
        onStepClick={handleStepperClick}
        className="mt-8"
      />

      <div className="grid gap-6 pt-8 lg:grid-cols-[1fr_430px] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-violet-600">Vibe Raising</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">Connect your data</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
            Add data sources to give your AI agent the full context it needs to create your monthly investor update.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigateToDraft(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-black"
            >
              Continue to draft
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={navigateBackToUpdates}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-6">
          <div className="flex gap-5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-violet-700">How it works</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Connect your tools below. Our AI securely pulls in the most relevant data and turns it into your monthly update.
              </p>
            </div>
          </div>
        </div>
      </div>

      {statusMessage ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800">
          {statusMessage}
        </div>
      ) : null}

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-gray-950">Popular sources</h2>
            <p className="mt-3 text-sm text-slate-500">Quickly connect the most common tools startups use.</p>
          </div>
          {loadingStatus ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-600">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Checking status
            </span>
          ) : null}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orderedVisibleSources.map((source) => (
            <ConnectorCard
              key={source.key}
              source={source}
              selected={selectedSources.has(source.key)}
              busy={busyProvider === source.key}
              onConnect={handleConnect}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllSources((value) => !value)}
            className="inline-flex min-w-56 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
          >
            {showAllSources ? "Show fewer sources" : "View all sources"}
            <ChevronDownIcon className={clsx("h-4 w-4 text-slate-400 transition", showAllSources && "rotate-180")} />
          </button>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-gray-950">Connected sources</h2>
            <p className="mt-3 text-sm text-slate-500">Manage the data connections available for this update.</p>
          </div>
          {hasConnectedFinance ? (
            <button
              type="button"
              onClick={handleSyncFinance}
              disabled={syncingFinance}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-extrabold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
            >
              <ArrowPathIcon className={clsx("h-4 w-4", syncingFinance && "animate-spin")} />
              Sync financials
            </button>
          ) : null}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {connectedSources.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {connectedSources.map((source) => (
                <div key={source.key} className="grid gap-4 px-6 py-5 md:grid-cols-[1.2fr_0.8fr_1.2fr_auto] md:items-center">
                  <div className="flex items-center gap-4">
                    <SourceLogo sourceKey={source.key} />
                    <div>
                      <p className="text-sm font-extrabold text-gray-950">{source.label}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {source.accountLabel || (source.key === "gmail" ? user.email : user.companyName)}
                      </p>
                    </div>
                  </div>
                  <span className={clsx("inline-flex w-fit items-center gap-2 rounded-full px-2 py-1 text-xs font-bold ring-1", statusClassName(source.status))}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {statusLabel(source.status)}
                  </span>
                  <p className="text-sm text-slate-500">{SOURCE_COPY[source.key].connectedUse}</p>
                  <button
                    type="button"
                    onClick={() => handleToggle(source)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-gray-50 hover:text-slate-700"
                    aria-label={`Toggle ${source.label}`}
                    title={selectedSources.has(source.key) ? "Remove from this update" : "Use in this update"}
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => navigateToDraft(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-extrabold text-gray-900 transition hover:bg-gray-50"
                >
                  Continue to draft with {selectedSourceList.length || "no"} selected source{selectedSourceList.length === 1 ? "" : "s"}
                  <ArrowRightIcon className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-sm font-bold text-gray-950">No active connections yet</p>
              <p className="mt-2 text-sm text-slate-500">Connect a source to make it available for this update.</p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl bg-black p-8 text-white sm:p-10">
        <h2 className="text-2xl font-black">Your data, transformed</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/72">
          Your connected data is securely processed to generate your monthly investor update.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            { title: "1. Connect", body: "Add your data sources in a few clicks.", icon: EnvelopeIcon },
            { title: "2. Process", body: "Our AI extracts key signals, metrics, wins, and asks.", icon: ArrowPathIcon },
            { title: "3. Generate", body: "Get a clear, investor-ready monthly update.", icon: SparklesIcon },
          ].map((step, index) => (
            <div key={step.title} className="flex items-center gap-5">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-violet-300">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{step.body}</p>
              </div>
              {index < 2 ? <ArrowRightIcon className="ml-auto hidden h-5 w-5 text-white/35 xl:block" /> : null}
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-950">What we pull in</h2>
          <ul className="mt-6 space-y-4 text-sm font-semibold text-slate-600">
            {["Revenue and financial metrics", "Key milestones and updates", "Team and operational highlights", "Challenges and risks", "Upcoming asks and needs"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircleIcon className="h-5 w-5 text-slate-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-lg bg-violet-50 px-4 py-4 text-sm font-bold text-violet-700">
            <ShieldCheckIcon className="h-5 w-5" />
            We only access the data you authorize and never share it.
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-950">Privacy and security</h2>
          <ul className="mt-6 space-y-4 text-sm font-semibold text-slate-600">
            {["Bank-level encryption", "Read-only access", "You're in control"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircleIcon className="h-5 w-5 text-slate-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-lg bg-violet-50 px-4 py-4 text-sm font-bold text-violet-700">
            <LockClosedIcon className="h-5 w-5" />
            Your data is safe and secure with us.
          </div>
        </section>
      </div>

      <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon className="h-5 w-5 text-violet-600" />
          <p className="text-sm font-bold text-gray-950">
            {selectedSourceList.length > 0
              ? `${selectedSourceList.length} source${selectedSourceList.length === 1 ? "" : "s"} selected`
              : "No external sources selected"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={navigateBackToUpdates}
            className="rounded-xl px-4 py-2.5 text-sm font-extrabold text-gray-500 transition hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => navigateToDraft(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-violet-700"
          >
            Continue to draft
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
