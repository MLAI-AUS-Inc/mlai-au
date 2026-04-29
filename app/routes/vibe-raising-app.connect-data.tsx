import { useEffect, useMemo, useRef, useState } from "react";
import type { Route } from "./+types/vibe-raising-app.connect-data";
import { redirect, useLoaderData, useLocation, useNavigate } from "react-router";
import { clsx } from "clsx";
import { Combobox } from "@headlessui/react";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  BuildingLibraryIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  FolderIcon,
  LinkIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getEnv } from "~/lib/env.server";
import {
  bootstrapVibeRaisingStartupUpdate,
  connectVibeRaisingInputSource,
  getVibeRaisingBankFeedPreview,
  getVibeRaisingGmailPreview,
  getVibeRaisingInputSourcesStatus,
  getVibeRaisingLinearPreview,
  getVibeRaisingLinearProjects,
  getVibeRaisingSlackChannels,
  getVibeRaisingSlackPreview,
  getVibeRaisingXeroPreview,
  requireVibeRaisingFounder,
  saveVibeRaisingLinearProjectSelections,
  saveVibeRaisingSlackChannelSelections,
  syncVibeRaisingFinancialSources,
  syncVibeRaisingInputSources,
} from "~/lib/vibe-raising";
import type {
  VibeRaisingBankFeedPreview,
  VibeRaisingGmailPreview,
  VibeRaisingInputSourceKey,
  VibeRaisingInputSourceStatus,
  VibeRaisingInputSourceSummary,
  VibeRaisingLinearPreview,
  VibeRaisingLinearProject,
  VibeRaisingLinearProjectsResponse,
  VibeRaisingSlackChannel,
  VibeRaisingSlackChannelsResponse,
  VibeRaisingSlackPreview,
  VibeRaisingXeroPreview,
} from "~/types/vibe-raising";
import MonthlyUpdateStepper, { type MonthlyUpdateStepKey } from "~/components/MonthlyUpdateStepper";
import VibeRaisingStickyStepBar from "~/components/VibeRaisingStickyStepBar";

const DEFAULT_NEXT = "/founder-tools/updates/create";
const DEFAULT_BACKEND_BASE_URL = "https://api.mlai.au";
const MANUAL_MATERIALS_STORAGE_KEY = "vibe_raising_manual_materials";
const FUNCTIONAL_SOURCES = new Set<VibeRaisingInputSourceKey>(["gmail", "stripe", "xero", "bank_feed", "notion", "google_drive", "slack", "linear"]);
const OAUTH_CONNECTABLE_WHEN_STATUS_UNAVAILABLE = new Set<VibeRaisingInputSourceKey>(["stripe"]);
const POPULAR_SOURCE_KEYS: VibeRaisingInputSourceKey[] = [
  "gmail",
  "slack",
  "linear",
  "stripe",
  "bank_feed",
  "notion",
  "google_drive",
  "xero",
];
const EXTRA_SOURCE_KEYS: VibeRaisingInputSourceKey[] = [];
const SLACK_CHANNEL_PAGE_LIMIT = 100;
const LINEAR_PROJECT_PAGE_LIMIT = 100;

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
  {
    key: "linear",
    label: "Linear",
    capabilities: ["context"],
    selected: false,
    status: "not_connected",
  },
];

type ManualMaterialsState = {
  sourceUrl: string;
  summary: string;
};

function readStoredManualMaterials(): ManualMaterialsState {
  if (typeof window === "undefined") return { sourceUrl: "", summary: "" };
  try {
    const raw = window.localStorage.getItem(MANUAL_MATERIALS_STORAGE_KEY);
    if (!raw) return { sourceUrl: "", summary: "" };
    const parsed = JSON.parse(raw) as { sourceUrl?: unknown; summary?: unknown };
    return {
      sourceUrl: typeof parsed.sourceUrl === "string" ? parsed.sourceUrl : "",
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
    };
  } catch {
    return { sourceUrl: "", summary: "" };
  }
}

function writeStoredManualMaterials(materials: ManualMaterialsState) {
  if (typeof window === "undefined") return;
  const sourceUrl = materials.sourceUrl.trim();
  const summary = materials.summary.trim();
  if (!sourceUrl && !summary) {
    window.localStorage.removeItem(MANUAL_MATERIALS_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(MANUAL_MATERIALS_STORAGE_KEY, JSON.stringify({ sourceUrl, summary }));
}

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
  linear: {
    description: "Pull project updates, active workstreams, and key tasks from Linear.",
    connectedUse: "Projects, tasks, updates",
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

  if (!candidate.startsWith("/founder-tools/updates/create")) {
    return DEFAULT_NEXT;
  }
  return candidate;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { appUser: user } = await requireVibeRaisingFounder(env, request);

  if (!user.companyRegistered) {
    throw redirect("/founder-tools/company-setup");
  }

  const url = new URL(request.url);
  return {
    user,
    next: sanitizeNext(url.searchParams.get("next")),
    backendBaseUrl: String(env.BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL),
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
      return "bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] ring-[rgba(0,255,215,0.26)]";
    case "syncing":
      return "bg-[rgba(76,110,245,0.10)] text-[var(--vr-palette-blue)] ring-[rgba(76,110,245,0.22)]";
    case "error":
      return "bg-[rgba(255,200,1,0.16)] text-[var(--vr-color-text)] ring-[rgba(255,200,1,0.32)]";
    case "coming_soon":
      return "bg-gray-100 text-gray-500 ring-gray-200";
    case "unavailable":
      return "bg-gray-100 text-gray-500 ring-gray-200";
    default:
      return "bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] ring-[rgba(0,255,215,0.26)]";
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

function formatMoney(value?: string | null, currency?: string | null) {
  if (!value) return "Balance unavailable";
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: currency || "AUD",
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return currency ? `${value} ${currency}` : value;
  }
}

function formatShortDate(value?: string | null) {
  if (!value) return "Date unavailable";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short" }).format(parsed);
}

function BankFeedPreview({
  preview,
  loading,
  error,
}: {
  preview: VibeRaisingBankFeedPreview | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="rounded-xl border border-[var(--vr-color-border)] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Bank feed preview</h2>
          <p className="mt-2 text-sm text-[var(--vr-color-text-sub)]">Recent account and transaction context available for this update.</p>
        </div>
        {loading ? (
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--vr-color-primary)]">
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
            Loading
          </span>
        ) : null}
      </div>

      {error ? (
        <div className="mt-5 rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">{error}</div>
      ) : null}

      {!loading && !error && preview && preview.accounts.length === 0 && preview.transactions.length === 0 ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          Bank Feed is connected. Run a sync after completing Basiq consent to load accounts and transactions.
        </div>
      ) : null}

      {preview && preview.accounts.length > 0 ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {preview.accounts.slice(0, 4).map((account) => (
            <div key={`${account.externalAccountId}-${account.id}`} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-extrabold text-gray-950">{account.accountLabel}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{account.institutionName || account.accountType || "Bank account"}</p>
              <p className="mt-3 text-sm font-black text-gray-900">{formatMoney(account.balance, account.currency)}</p>
            </div>
          ))}
        </div>
      ) : null}

      {preview && preview.transactions.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-100">
          <div className="divide-y divide-gray-100">
            {preview.transactions.slice(0, 5).map((transaction) => (
              <div key={`${transaction.externalAccountId}-${transaction.externalTransactionId}`} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="text-sm font-bold text-gray-950">{transaction.merchantName || transaction.description || "Bank transaction"}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{transaction.accountLabel || transaction.category || transaction.direction || "Transaction"}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{formatShortDate(transaction.transactionDate || transaction.postedAt)}</span>
                <span className={clsx("text-sm font-black", transaction.direction === "debit" ? "text-slate-600" : "text-emerald-700")}>
                  {formatMoney(transaction.amount, transaction.currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function XeroPreview({
  preview,
  loading,
  error,
  syncing,
  onSync,
  reconnectHref,
}: {
  preview: VibeRaisingXeroPreview | null;
  loading: boolean;
  error: string | null;
  syncing: boolean;
  onSync: () => void;
  reconnectHref?: string | null;
}) {
  const previewMetrics = preview
    ? [
        { label: "P&L revenue", value: preview.revenue },
        { label: "Revenue growth", value: preview.revenueGrowthRate },
        { label: "Burn rate", value: preview.burnRate },
        { label: "Runway", value: preview.runway },
        { label: "Monthly costs", value: preview.monthlyCosts },
        { label: "Operating expenses", value: preview.operatingExpenses },
        { label: "Cost of sales", value: preview.costOfSales },
        { label: "Invoice revenue", value: preview.invoiceRevenue },
        { label: "Invoice count", value: preview.invoiceCount },
        { label: "Customers", value: preview.customerCount },
        { label: "Recurring invoices", value: preview.recurringInvoiceCount },
      ].filter((item) => item.value && item.value !== "0")
    : [];

  return (
    <section className="rounded-xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Xero revenue preview</h2>
          <p className="mt-2 text-sm text-slate-500">
            Accounting revenue context from recurring invoices, sales invoices, and payments.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {loading ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Loading
            </span>
          ) : null}
          {preview?.needsReportReconnect && reconnectHref ? (
            <a
              href={reconnectHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--vr-palette-blue)] px-3 py-2 text-xs font-extrabold text-white transition hover:bg-[var(--vr-palette-black)]"
            >
              <LinkIcon className="h-4 w-4" />
              Reconnect Xero
            </a>
          ) : null}
          <button
            type="button"
            onClick={onSync}
            disabled={syncing}
            className={clsx(
              "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-extrabold transition disabled:cursor-not-allowed disabled:opacity-60",
              preview?.needsReportReconnect
                ? "border-gray-200 text-slate-600 hover:bg-gray-50"
                : "border-[rgba(76,110,245,0.24)] text-[var(--vr-palette-blue)] hover:bg-[rgba(76,110,245,0.10)]",
            )}
          >
            <ArrowPathIcon className={clsx("h-4 w-4", syncing && "animate-spin")} />
            {syncing ? "Syncing" : "Sync Xero"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">{error}</div>
      ) : null}

      {preview ? (
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Tenant</p>
            <p className="mt-2 text-sm font-black text-gray-950">{preview.tenantLabel || preview.tenantId || "Xero tenant"}</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recurring MRR</p>
            <p className="mt-2 text-sm font-black text-gray-950">
              {formatMoney(preview.monthlyRecurringRevenue, preview.currencies[0] || "AUD")}
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cash collected</p>
            <p className="mt-2 text-sm font-black text-gray-950">
              {formatMoney(preview.cashCollected, preview.currencies[0] || "AUD")}
            </p>
          </div>
        </div>
      ) : null}

      {previewMetrics.length ? (
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          {previewMetrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
              <p className="mt-2 text-sm font-black text-gray-950">{metric.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {!loading && !error && preview && preview.recurringInvoices.length === 0 && preview.recentInvoices.length === 0 ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          Xero is connected. Sync to load invoices and payments.
        </div>
      ) : null}

      {preview?.warnings.length ? (
        <div className="mt-5 space-y-2">
          {preview.warnings.map((warning) => (
            <p key={warning} className="rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-xs font-semibold text-[var(--vr-color-text)]">
              {warning}
            </p>
          ))}
        </div>
      ) : null}

      {preview && (preview.recurringInvoices.length > 0 || preview.recentInvoices.length > 0) ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-gray-100">
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-black text-gray-950">Recurring invoices</p>
            </div>
            <div className="divide-y divide-gray-100">
              {(preview.recurringInvoices.length ? preview.recurringInvoices : []).slice(0, 3).map((invoice) => (
                <div key={invoice.externalRecordId} className="px-4 py-3">
                  <p className="text-sm font-bold text-gray-950">{invoice.contactName || invoice.description || "Repeating invoice"}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{invoice.status || "Authorised"}</p>
                  <p className="mt-2 text-sm font-black text-gray-900">{formatMoney(invoice.amount, invoice.currency)}</p>
                </div>
              ))}
              {preview.recurringInvoices.length === 0 ? (
                <div className="px-4 py-4 text-sm font-semibold text-slate-500">No active repeating invoices synced yet.</div>
              ) : null}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-100">
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-black text-gray-950">Recent sales invoices</p>
            </div>
            <div className="divide-y divide-gray-100">
              {preview.recentInvoices.slice(0, 3).map((invoice) => (
                <div key={invoice.externalRecordId} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-sm font-bold text-gray-950">{invoice.invoiceNumber || invoice.description || "Sales invoice"}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{invoice.contactName || invoice.status || "Invoice"}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs font-semibold text-slate-500">{formatShortDate(invoice.transactionDate || invoice.postedAt)}</p>
                    <p className="mt-1 text-sm font-black text-gray-900">{formatMoney(invoice.amount, invoice.currency)}</p>
                  </div>
                </div>
              ))}
              {preview.recentInvoices.length === 0 ? (
                <div className="px-4 py-4 text-sm font-semibold text-slate-500">No recent sales invoices synced yet.</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GmailPreview({
  preview,
  loading,
  error,
}: {
  preview: VibeRaisingGmailPreview | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="rounded-xl border border-[var(--vr-color-border)] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Gmail preview</h2>
          <p className="mt-2 text-sm text-slate-500">
            Recent email context available for this update.
          </p>
        </div>
        {loading ? (
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--vr-color-primary)]">
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
            Loading
          </span>
        ) : null}
      </div>

      {error ? (
        <div className="mt-5 rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">{error}</div>
      ) : null}

      {preview ? (
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Account</p>
            <p className="mt-2 truncate text-sm font-black text-gray-950">{preview.accountLabel || "Connected Gmail"}</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cached messages</p>
            <p className="mt-2 text-sm font-black text-gray-950">{preview.totalCachedMessages}</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Last sync</p>
            <p className="mt-2 text-sm font-black text-gray-950">{formatShortDate(preview.lastSyncedAt)}</p>
          </div>
        </div>
      ) : null}

      {preview?.warnings.length ? (
        <div className="mt-5 space-y-2">
          {preview.warnings.map((warning) => (
            <p key={warning} className="rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-xs font-semibold text-[var(--vr-color-text)]">
              {warning}
            </p>
          ))}
        </div>
      ) : null}

      {!loading && !error && preview && preview.messages.length === 0 ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          Gmail is connected. Continue to draft to scan recent emails.
        </div>
      ) : null}

      {preview?.messages.length ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-sm font-black text-gray-950">Recent messages</p>
          </div>
          <div className="divide-y divide-gray-100">
            {preview.messages.slice(0, 5).map((message) => (
              <div key={message.gmailMessageId} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto] md:items-start">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-950">{message.subject}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-slate-500">{message.fromAddress || "Unknown sender"}</p>
                  {message.snippet ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{message.snippet}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <span className="text-xs font-semibold text-slate-500">{formatShortDate(message.date || message.internalDate)}</span>
                  {message.relevanceLabel ? (
                    <span className="rounded-full bg-[rgba(0,255,215,0.12)] px-2 py-1 text-xs font-bold capitalize text-[var(--vr-color-primary)]">{message.relevanceLabel.replace(/_/g, " ")}</span>
                  ) : null}
                  {message.hasAttachments ? (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-slate-600">Attachment</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function mergeSlackChannelsById(
  previous: Record<string, VibeRaisingSlackChannel>,
  channels: VibeRaisingSlackChannel[],
) {
  if (channels.length === 0) return previous;
  const next = { ...previous };
  channels.forEach((channel) => {
    next[channel.channelId] = { ...next[channel.channelId], ...channel };
  });
  return next;
}

function getSelectedSlackChannelIds(channels: VibeRaisingSlackChannel[]) {
  return channels.filter((channel) => channel.selected).map((channel) => channel.channelId);
}

function SlackPreview({
  channels,
  preview,
  loadingChannels,
  loadingPreview,
  error,
  saving,
  syncing,
  selectedChannelIds,
  nextCursor,
  loadingMoreChannels,
  onToggleChannel,
  onLoadMoreChannels,
  onSaveChannels,
  onSync,
}: {
  channels: VibeRaisingSlackChannel[];
  preview: VibeRaisingSlackPreview | null;
  loadingChannels: boolean;
  loadingPreview: boolean;
  error: string | null;
  saving: boolean;
  syncing: boolean;
  selectedChannelIds: Set<string>;
  nextCursor: string | null;
  loadingMoreChannels: boolean;
  onToggleChannel: (channelId: string) => void;
  onLoadMoreChannels: () => void;
  onSaveChannels: () => void;
  onSync: () => void;
}) {
  const [channelQuery, setChannelQuery] = useState("");
  const channelsById = useMemo(() => new Map(channels.map((channel) => [channel.channelId, channel])), [channels]);
  const selectedChannels = useMemo(
    () =>
      Array.from(selectedChannelIds).map((channelId) => {
        const channel = channelsById.get(channelId);
        if (channel) return channel;
        return {
          channelId,
          channelName: channelId,
          name: channelId,
          isPrivate: false,
          selected: true,
        } satisfies VibeRaisingSlackChannel;
      }),
    [channelsById, selectedChannelIds],
  );
  const filteredChannels = useMemo(() => {
    const normalizedQuery = channelQuery.trim().toLowerCase();
    if (!normalizedQuery) return channels;
    return channels.filter((channel) =>
      [channel.channelName, channel.name, channel.channelId]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery)),
    );
  }, [channelQuery, channels]);

  const handleComboboxChange = (channel: VibeRaisingSlackChannel | null) => {
    if (!channel) return;
    onToggleChannel(channel.channelId);
    setChannelQuery("");
  };

  return (
    <section className="rounded-xl border border-[var(--vr-color-border)] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Slack preview</h2>
          <p className="mt-2 text-sm text-slate-500">Selected channel context available for this update.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {loadingChannels || loadingPreview ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--vr-color-primary)]">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Loading
            </span>
          ) : null}
          <button
            type="button"
            onClick={onSync}
            disabled={syncing || selectedChannelIds.size === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(0,255,215,0.26)] px-3 py-2 text-xs font-extrabold text-[var(--vr-color-primary)] transition hover:bg-[rgba(0,255,215,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowPathIcon className={clsx("h-4 w-4", syncing && "animate-spin")} />
            {syncing ? "Syncing" : "Sync Slack"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">{error}</div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Workspace</p>
          <p className="mt-2 truncate text-sm font-black text-gray-950">{preview?.accountLabel || "Connected Slack"}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Selected channels</p>
          <p className="mt-2 text-sm font-black text-gray-950">{selectedChannelIds.size}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cached messages</p>
          <p className="mt-2 text-sm font-black text-gray-950">{preview?.totalCachedMessages ?? 0}</p>
        </div>
      </div>

      {channels.length > 0 ? (
        <div className="mt-5 rounded-lg border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-black text-gray-950">Channels</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{selectedChannelIds.size} selected</p>
            </div>
            <button
              type="button"
              onClick={onSaveChannels}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--vr-color-primary)] px-3 py-2 text-xs font-extrabold text-white transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving" : "Save selection"}
            </button>
          </div>
          <div className="px-4 py-4">
            {selectedChannels.length > 0 ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedChannels.map((channel) => (
                  <span
                    key={channel.channelId}
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[rgba(0,255,215,0.12)] px-3 py-1.5 text-xs font-extrabold text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]"
                  >
                    {channel.isPrivate ? <LockClosedIcon className="h-3.5 w-3.5 shrink-0 text-[var(--vr-color-primary)]" /> : null}
                    <span className="truncate">#{channel.channelName}</span>
                    <button
                      type="button"
                      onClick={() => onToggleChannel(channel.channelId)}
                      className="rounded-full p-0.5 text-[var(--vr-color-primary)] transition hover:bg-[rgba(0,255,215,0.18)] hover:text-[var(--vr-palette-black)]"
                      aria-label={`Remove #${channel.channelName}`}
                    >
                      <XMarkIcon className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}

            <Combobox value={null} onChange={handleComboboxChange}>
              <div className="relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Combobox.Input
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-9 pr-10 text-sm font-semibold text-gray-950 placeholder:text-slate-400 focus:border-[var(--vr-color-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,128,128,0.10)]"
                    displayValue={() => channelQuery}
                    onChange={(event) => setChannelQuery(event.target.value)}
                    placeholder="Search and select Slack channels"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600">
                    <ChevronDownIcon className="h-4 w-4" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
                  {filteredChannels.length > 0 ? (
                    filteredChannels.map((channel) => {
                      const selected = selectedChannelIds.has(channel.channelId);
                      return (
                        <Combobox.Option
                          key={channel.channelId}
                          value={channel}
                          className={({ active }) =>
                            clsx(
                              "relative flex cursor-pointer select-none items-center gap-3 px-4 py-3 font-semibold",
                              active ? "bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-text)]" : "text-gray-800",
                            )
                          }
                        >
                          <span
                            className={clsx(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                              selected ? "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white" : "border-gray-300 bg-white text-transparent",
                            )}
                          >
                            <CheckIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">#{channel.channelName}</span>
                          {channel.isPrivate ? <LockClosedIcon className="h-4 w-4 shrink-0 text-slate-400" /> : null}
                        </Combobox.Option>
                      );
                    })
                  ) : (
                    <div className="px-4 py-4 text-sm font-semibold text-slate-500">No loaded channels match this search.</div>
                  )}
                  {nextCursor ? (
                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={onLoadMoreChannels}
                        disabled={loadingMoreChannels}
                        className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-extrabold text-[var(--vr-color-primary)] transition hover:bg-[rgba(0,255,215,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <ArrowPathIcon className={clsx("h-4 w-4", loadingMoreChannels && "animate-spin")} />
                        {loadingMoreChannels ? "Loading channels" : "Load more channels"}
                      </button>
                    </div>
                  ) : null}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        </div>
      ) : !loadingChannels ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          Slack is connected. Open the channel picker again after the workspace channel list is available.
        </div>
      ) : null}

      {preview?.warnings.length ? (
        <div className="mt-5 space-y-2">
          {preview.warnings.map((warning) => (
            <p key={warning} className="rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-xs font-semibold text-[var(--vr-color-text)]">
              {warning}
            </p>
          ))}
        </div>
      ) : null}

      {preview?.messages.length ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-sm font-black text-gray-950">Recent Slack messages</p>
          </div>
          <div className="divide-y divide-gray-100">
            {preview.messages.slice(0, 5).map((message) => (
              <div key={`${message.channelId}-${message.messageTs}`} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto] md:items-start">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-950">#{message.channelName || message.channelId}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-slate-500">{message.authorLabel || "Slack user"}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{message.text}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{formatShortDate(message.postedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function mergeLinearProjectsById(
  previous: Record<string, VibeRaisingLinearProject>,
  projects: VibeRaisingLinearProject[],
) {
  if (projects.length === 0) return previous;
  const next = { ...previous };
  projects.forEach((project) => {
    next[project.projectId] = { ...next[project.projectId], ...project };
  });
  return next;
}

function getSelectedLinearProjectIds(projects: VibeRaisingLinearProject[]) {
  return projects.filter((project) => project.selected).map((project) => project.projectId);
}

function LinearPreview({
  projects,
  preview,
  loadingProjects,
  loadingPreview,
  error,
  saving,
  syncing,
  selectedProjectIds,
  nextCursor,
  loadingMoreProjects,
  onToggleProject,
  onLoadMoreProjects,
  onSaveProjects,
  onSync,
}: {
  projects: VibeRaisingLinearProject[];
  preview: VibeRaisingLinearPreview | null;
  loadingProjects: boolean;
  loadingPreview: boolean;
  error: string | null;
  saving: boolean;
  syncing: boolean;
  selectedProjectIds: Set<string>;
  nextCursor: string | null;
  loadingMoreProjects: boolean;
  onToggleProject: (projectId: string) => void;
  onLoadMoreProjects: () => void;
  onSaveProjects: () => void;
  onSync: () => void;
}) {
  const [projectQuery, setProjectQuery] = useState("");
  const projectsById = useMemo(() => new Map(projects.map((project) => [project.projectId, project])), [projects]);
  const selectedProjects = useMemo(
    () =>
      Array.from(selectedProjectIds).map((projectId) => {
        const project = projectsById.get(projectId);
        if (project) return project;
        return {
          projectId,
          linearProjectId: projectId,
          projectName: projectId,
          name: projectId,
          selected: true,
        } satisfies VibeRaisingLinearProject;
      }),
    [projectsById, selectedProjectIds],
  );
  const filteredProjects = useMemo(() => {
    const normalizedQuery = projectQuery.trim().toLowerCase();
    if (!normalizedQuery) return projects;
    return projects.filter((project) =>
      [project.projectName, project.name, project.projectId, project.status, project.health]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery)),
    );
  }, [projectQuery, projects]);

  const handleComboboxChange = (project: VibeRaisingLinearProject | null) => {
    if (!project) return;
    onToggleProject(project.projectId);
    setProjectQuery("");
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Linear preview</h2>
          <p className="mt-2 text-sm text-slate-500">Selected project context available for this update.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {loadingProjects || loadingPreview ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-700">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Loading
            </span>
          ) : null}
          <button
            type="button"
            onClick={onSync}
            disabled={syncing || selectedProjectIds.size === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-extrabold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowPathIcon className={clsx("h-4 w-4", syncing && "animate-spin")} />
            {syncing ? "Syncing" : "Sync Linear"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">{error}</div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Workspace</p>
          <p className="mt-2 truncate text-sm font-black text-gray-950">{preview?.accountLabel || "Connected Linear"}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Selected projects</p>
          <p className="mt-2 text-sm font-black text-gray-950">{selectedProjectIds.size}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cached issues</p>
          <p className="mt-2 text-sm font-black text-gray-950">{preview?.totalCachedIssues ?? 0}</p>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="mt-5 rounded-lg border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-black text-gray-950">Projects</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{selectedProjectIds.size} selected</p>
            </div>
            <button
              type="button"
              onClick={onSaveProjects}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-3 py-2 text-xs font-extrabold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving" : "Save selection"}
            </button>
          </div>
          <div className="px-4 py-4">
            {selectedProjects.length > 0 ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedProjects.map((project) => (
                  <span
                    key={project.projectId}
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-extrabold text-gray-800 ring-1 ring-gray-200"
                  >
                    <span className="truncate">{project.projectName}</span>
                    <button
                      type="button"
                      onClick={() => onToggleProject(project.projectId)}
                      className="rounded-full p-0.5 text-gray-600 transition hover:bg-gray-200 hover:text-gray-950"
                      aria-label={`Remove ${project.projectName}`}
                    >
                      <XMarkIcon className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}

            <Combobox value={null} onChange={handleComboboxChange}>
              <div className="relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Combobox.Input
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-9 pr-10 text-sm font-semibold text-gray-950 placeholder:text-slate-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-100"
                    displayValue={() => projectQuery}
                    onChange={(event) => setProjectQuery(event.target.value)}
                    placeholder="Search and select Linear projects"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600">
                    <ChevronDownIcon className="h-4 w-4" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => {
                      const selected = selectedProjectIds.has(project.projectId);
                      return (
                        <Combobox.Option
                          key={project.projectId}
                          value={project}
                          className={({ active }) =>
                            clsx(
                              "relative flex cursor-pointer select-none items-center gap-3 px-4 py-3 font-semibold",
                              active ? "bg-gray-50 text-gray-950" : "text-gray-800",
                            )
                          }
                        >
                          <span
                            className={clsx(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                              selected ? "border-gray-950 bg-gray-950 text-white" : "border-gray-300 bg-white text-transparent",
                            )}
                          >
                            <CheckIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{project.projectName}</span>
                          {project.health ? <span className="shrink-0 text-xs font-bold text-slate-400">{project.health}</span> : null}
                        </Combobox.Option>
                      );
                    })
                  ) : (
                    <div className="px-4 py-4 text-sm font-semibold text-slate-500">No loaded projects match this search.</div>
                  )}
                  {nextCursor ? (
                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={onLoadMoreProjects}
                        disabled={loadingMoreProjects}
                        className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-extrabold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <ArrowPathIcon className={clsx("h-4 w-4", loadingMoreProjects && "animate-spin")} />
                        {loadingMoreProjects ? "Loading projects" : "Load more projects"}
                      </button>
                    </div>
                  ) : null}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        </div>
      ) : !loadingProjects ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          Linear is connected. Open the project picker again after the workspace project list is available.
        </div>
      ) : null}

      {preview?.warnings.length ? (
        <div className="mt-5 space-y-2">
          {preview.warnings.map((warning) => (
            <p key={warning} className="rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-xs font-semibold text-[var(--vr-color-text)]">
              {warning}
            </p>
          ))}
        </div>
      ) : null}

      {preview?.projects.length ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {preview.projects.slice(0, 4).map((project) => (
            <div key={project.projectId} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="truncate text-sm font-black text-gray-950">{project.name}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{project.statusName || project.statusType || "Project"}</p>
              <p className="mt-3 text-xs font-bold text-slate-500">
                {project.issueCount} issue{project.issueCount === 1 ? "" : "s"} - {project.updateCount} update{project.updateCount === 1 ? "" : "s"}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {preview?.projectUpdates.length ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-sm font-black text-gray-950">Latest project updates</p>
          </div>
          <div className="divide-y divide-gray-100">
            {preview.projectUpdates.slice(0, 5).map((update) => (
              <div key={update.id} className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-gray-950">{update.projectName || "Linear project"}</p>
                  <span className="text-xs font-semibold text-slate-500">{formatShortDate(update.updatedAt)}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{update.body || "Project update"}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {preview?.issues.length ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-sm font-black text-gray-950">Key issues</p>
          </div>
          <div className="divide-y divide-gray-100">
            {preview.issues.slice(0, 5).map((issue) => (
              <div key={issue.id} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto] md:items-start">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-950">{issue.identifier ? `${issue.identifier} - ` : ""}{issue.title}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-slate-500">{issue.projectName || issue.stateName || "Linear issue"}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{formatShortDate(issue.updatedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function SourceLogo({ sourceKey, large = false }: { sourceKey: VibeRaisingInputSourceKey; large?: boolean }) {
  const badgeClassName = clsx(
    "flex shrink-0 items-center justify-center bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300",
    large ? "h-16 w-16 rounded-2xl" : "h-10 w-10 rounded-xl",
  );
  const iconClassName = large ? "h-11 w-11" : "h-7 w-7";
  const officialLogoClassName = clsx("object-contain", large ? "h-12 w-12" : "h-7 w-7");

  if (sourceKey === "gmail") {
    return (
      <div className={badgeClassName}>
        <img src="/vibe-raising/logos/gmail.svg" alt="" className={officialLogoClassName} />
      </div>
    );
  }

  if (sourceKey === "slack") {
    return (
      <div className={badgeClassName}>
        <img src="/vibe-raising/logos/slack.png" alt="" className={officialLogoClassName} />
      </div>
    );
  }

  if (sourceKey === "linear") {
    return (
      <div className={clsx("flex shrink-0 items-center justify-center bg-gray-950 shadow-sm transition-all duration-300", large ? "h-16 w-16 rounded-2xl" : "h-10 w-10 rounded-xl")}>
        <svg viewBox="0 0 36 36" className={iconClassName} aria-hidden>
          <path d="M8 25l17-17" stroke="white" strokeLinecap="round" strokeWidth="3" />
          <path d="M14 28l14-14" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.85" />
          <path d="M8 17l9-9" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.7" />
          <path d="M22 28l6-6" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.55" />
        </svg>
      </div>
    );
  }

  if (sourceKey === "stripe") {
    return (
      <div className={clsx("flex shrink-0 items-center justify-center bg-[#635bff] font-black text-white shadow-sm transition-all duration-300", large ? "h-16 w-16 rounded-2xl text-3xl" : "h-10 w-10 rounded-xl text-lg")}>
        S
      </div>
    );
  }

  if (sourceKey === "bank_feed") {
    return (
      <div className={badgeClassName}>
        <BuildingLibraryIcon className={clsx("text-[var(--vr-color-primary)]", large ? "h-9 w-9" : "h-6 w-6")} />
      </div>
    );
  }

  if (sourceKey === "notion") {
    return (
      <div className={badgeClassName}>
        <img src="/vibe-raising/logos/notion.png" alt="" className={clsx(officialLogoClassName, "rounded-xl")} />
      </div>
    );
  }

  if (sourceKey === "google_drive") {
    return (
      <div className={badgeClassName}>
        <svg viewBox="0 0 36 32" className={iconClassName} aria-hidden>
          <path d="M13 2h10l11 19H24z" fill="#34a853" />
          <path d="M13 2L2 21l5 9 11-19z" fill="#fbbc05" />
          <path d="M7 30h22l5-9H12z" fill="#4285f4" />
          <path d="M13 2l5 9h10l-5-9z" fill="#188038" opacity="0.55" />
        </svg>
      </div>
    );
  }

  return (
    <div className={clsx("flex shrink-0 items-center justify-center rounded-full bg-[#13b5ea] font-black uppercase text-white shadow-sm transition-all duration-300", large ? "h-16 w-16 text-base" : "h-10 w-10 text-xs")}>
      xero
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
  const canConnectWhenUnavailable =
    source.status === "unavailable" && OAUTH_CONNECTABLE_WHEN_STATUS_UNAVAILABLE.has(source.key);
  const canConnect =
    FUNCTIONAL_SOURCES.has(source.key) &&
    source.status !== "connected" &&
    source.status !== "syncing" &&
    (source.status !== "unavailable" || canConnectWhenUnavailable);
  const disabled = source.status === "coming_soon" || (source.status === "unavailable" && !canConnectWhenUnavailable);
  const isConnected = source.status === "connected" || source.status === "syncing";
  const displayedStatus = canConnectWhenUnavailable ? "not_connected" : source.status;
  const displayedStatusLabel = canConnectWhenUnavailable ? "Ready to connect" : statusLabel(source.status);
  const connectClassName = clsx(
    "block w-full rounded-lg px-3 py-2 text-center text-xs font-extrabold transition",
    disabled || !canConnect
      ? "cursor-not-allowed bg-gray-100 text-gray-400"
      : "bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.18)]",
  );

  return (
    <div className={clsx(
      "group/source-card relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md focus-visible:ring-2 focus-visible:ring-[rgba(0,128,128,0.20)]",
      isConnected
        ? "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white ring-1 ring-[rgba(0,128,128,0.24)]"
        : selected
          ? "border-[rgba(0,255,215,0.42)] bg-white ring-1 ring-[rgba(0,128,128,0.12)]"
          : "border-gray-200 bg-white",
    )} tabIndex={0}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-300 ease-out group-hover/source-card:left-4 group-hover/source-card:top-4 group-hover/source-card:translate-x-0 group-hover/source-card:translate-y-0 group-hover/source-card:items-start group-hover/source-card:gap-2 group-focus-within/source-card:left-4 group-focus-within/source-card:top-4 group-focus-within/source-card:translate-x-0 group-focus-within/source-card:translate-y-0 group-focus-within/source-card:items-start group-focus-within/source-card:gap-2">
        <SourceLogo sourceKey={source.key} large />
        <h3 className={clsx(
          "text-center text-base font-black transition-all duration-300 group-hover/source-card:text-left group-hover/source-card:text-sm group-focus-within/source-card:text-left group-focus-within/source-card:text-sm",
          isConnected ? "text-white" : "text-gray-950",
        )}>
          {source.label}
        </h3>
      </div>

      <span className={clsx(
        "absolute right-4 top-4 inline-flex max-w-[112px] items-center truncate rounded-full px-2 py-0.5 text-[10px] font-bold opacity-0 ring-1 transition-opacity duration-200 group-hover/source-card:opacity-100 group-focus-within/source-card:opacity-100",
        isConnected ? "bg-white text-[var(--vr-color-primary)] ring-white/60" : statusClassName(displayedStatus),
      )}>
        {displayedStatusLabel}
      </span>

      <div className="pointer-events-none flex flex-1 flex-col pt-24 opacity-0 transition-all duration-200 group-hover/source-card:pointer-events-auto group-hover/source-card:opacity-100 group-focus-within/source-card:pointer-events-auto group-focus-within/source-card:opacity-100">
        <p className={clsx("mt-2 line-clamp-2 min-h-10 text-xs leading-5", isConnected ? "text-white/80" : "text-slate-500")}>
          {SOURCE_COPY[source.key].description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {source.capabilities.map((capability) => (
            <span
              key={capability}
              className={clsx(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                isConnected ? "bg-white/[0.14] text-white ring-1 ring-white/20" : "bg-gray-50 text-slate-500",
              )}
            >
              {capabilityLabel(capability)}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          {selectable ? (
            <button
              type="button"
              onClick={() => onToggle(source)}
              className={clsx(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-extrabold transition",
                isConnected && selected
                  ? "bg-white text-[var(--vr-color-primary)] hover:bg-white/90"
                : isConnected
                    ? "bg-white/[0.14] text-white ring-1 ring-white/[0.24] hover:bg-white/[0.20]"
                    : selected
                      ? "bg-[var(--vr-color-primary)] text-white"
                      : "bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.18)]",
              )}
            >
              <span>{selected ? "Using in this update" : "Use in this update"}</span>
              <CheckCircleIcon className={clsx("h-5 w-5", isConnected && selected ? "text-[var(--vr-color-primary)]" : selected || isConnected ? "text-white" : "text-[var(--vr-palette-teal-soft)]")} />
            </button>
          ) : (
            <button
              type="button"
              disabled={disabled || busy || !canConnect}
              onClick={() => onConnect(source)}
              className={connectClassName}
            >
              {busy ? "Connecting..." : canConnect ? "Connect" : statusLabel(source.status)}
            </button>
          )}

          {source.warning && source.status !== "coming_soon" ? (
            <p className={clsx("mt-2 line-clamp-2 text-[11px] font-medium leading-4", isConnected ? "text-white/80" : "text-[var(--vr-color-text)]")}>{source.warning}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ManualMaterialsCard({
  expanded,
  hasManualMaterials,
  summary,
  onToggle,
}: {
  expanded: boolean;
  hasManualMaterials: boolean;
  summary: string;
  onToggle: () => void;
}) {
  const cardCaption = "Add a source link or a short written summary for context outside your connected tools.";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls="manual-materials-panel"
      className={clsx(
        "group/source-card relative flex min-h-[220px] w-full flex-col overflow-hidden rounded-2xl border p-4 text-left shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md focus-visible:ring-2 focus-visible:ring-[rgba(0,128,128,0.20)]",
        expanded || hasManualMaterials
          ? "border-[rgba(0,255,215,0.42)] bg-white ring-1 ring-[rgba(0,128,128,0.12)]"
          : "border-gray-200 bg-white",
      )}
    >
      <div
        className={clsx(
          "pointer-events-none absolute z-10 flex flex-col items-center gap-3 transition-all duration-300 ease-out",
          expanded
            ? "left-4 top-4 translate-x-0 translate-y-0 items-start gap-2"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/source-card:left-4 group-hover/source-card:top-4 group-hover/source-card:translate-x-0 group-hover/source-card:translate-y-0 group-hover/source-card:items-start group-hover/source-card:gap-2 group-focus-within/source-card:left-4 group-focus-within/source-card:top-4 group-focus-within/source-card:translate-x-0 group-focus-within/source-card:translate-y-0 group-focus-within/source-card:items-start group-focus-within/source-card:gap-2",
        )}
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] shadow-sm ring-1 ring-[rgba(0,255,215,0.24)]">
          <LinkIcon className="h-8 w-8" />
        </div>
        <h3
          className={clsx(
            "text-center text-base font-black text-gray-950 transition-all duration-300",
            expanded
              ? "text-left text-sm"
              : "group-hover/source-card:text-left group-hover/source-card:text-sm group-focus-within/source-card:text-left group-focus-within/source-card:text-sm",
          )}
        >
          Manual input
        </h3>
      </div>

      <span
        className={clsx(
          "absolute right-4 top-4 inline-flex max-w-[112px] items-center truncate rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 transition-opacity duration-200",
          hasManualMaterials
            ? "bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)] ring-[rgba(0,255,215,0.26)]"
            : "bg-gray-100 text-slate-500 ring-gray-200",
          expanded ? "opacity-100" : "opacity-0 group-hover/source-card:opacity-100 group-focus-within/source-card:opacity-100",
        )}
      >
        {hasManualMaterials ? "Added" : "Optional"}
      </span>

      <div
        className={clsx(
          "pointer-events-none flex flex-1 flex-col pt-24 transition-all duration-200",
          expanded
            ? "pointer-events-auto opacity-100"
            : "opacity-0 group-hover/source-card:pointer-events-auto group-hover/source-card:opacity-100 group-focus-within/source-card:pointer-events-auto group-focus-within/source-card:opacity-100",
        )}
      >
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {cardCaption}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {["Link", "Summary"].map((item) => (
            <span
              key={item}
              className="rounded-full bg-gray-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-500"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex w-full items-center justify-center rounded-lg bg-[rgba(0,255,215,0.12)] px-3 py-2 text-xs font-extrabold text-[var(--vr-color-primary)]">
            <span>{expanded ? "Hide form" : "Open form"}</span>
          </div>

          {hasManualMaterials ? (
            <p className="mt-2 text-[11px] font-medium leading-4 text-[var(--vr-color-text)]">
              {summary}
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
}

export default function ConnectData() {
  const { backendBaseUrl, next } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const location = useLocation();
  const [sources, setSources] = useState<VibeRaisingInputSourceSummary[]>(EMPTY_SOURCES);
  const [selectedSources, setSelectedSources] = useState<Set<VibeRaisingInputSourceKey>>(new Set());
  const [showAllSources, setShowAllSources] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [syncingFinance, setSyncingFinance] = useState(false);
  const [syncingSlack, setSyncingSlack] = useState(false);
  const [busyProvider, setBusyProvider] = useState<VibeRaisingInputSourceKey | null>(null);
  const [pendingConnectSource, setPendingConnectSource] = useState<VibeRaisingInputSourceSummary | null>(null);
  const [showNoSourcesModal, setShowNoSourcesModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [bankFeedPreview, setBankFeedPreview] = useState<VibeRaisingBankFeedPreview | null>(null);
  const [loadingBankFeedPreview, setLoadingBankFeedPreview] = useState(false);
  const [bankFeedPreviewError, setBankFeedPreviewError] = useState<string | null>(null);
  const [gmailPreview, setGmailPreview] = useState<VibeRaisingGmailPreview | null>(null);
  const [loadingGmailPreview, setLoadingGmailPreview] = useState(false);
  const [gmailPreviewError, setGmailPreviewError] = useState<string | null>(null);
  const [xeroPreview, setXeroPreview] = useState<VibeRaisingXeroPreview | null>(null);
  const [loadingXeroPreview, setLoadingXeroPreview] = useState(false);
  const [xeroPreviewError, setXeroPreviewError] = useState<string | null>(null);
  const [slackChannelsById, setSlackChannelsById] = useState<Record<string, VibeRaisingSlackChannel>>({});
  const [slackChannelsNextCursor, setSlackChannelsNextCursor] = useState<string | null>(null);
  const [loadingSlackChannels, setLoadingSlackChannels] = useState(false);
  const [loadingMoreSlackChannels, setLoadingMoreSlackChannels] = useState(false);
  const [slackPreview, setSlackPreview] = useState<VibeRaisingSlackPreview | null>(null);
  const [loadingSlackPreview, setLoadingSlackPreview] = useState(false);
  const [slackError, setSlackError] = useState<string | null>(null);
  const [savingSlackChannels, setSavingSlackChannels] = useState(false);
  const [selectedSlackChannelIds, setSelectedSlackChannelIds] = useState<Set<string>>(new Set());
  const [syncingLinear, setSyncingLinear] = useState(false);
  const [linearProjectsById, setLinearProjectsById] = useState<Record<string, VibeRaisingLinearProject>>({});
  const [linearProjectsNextCursor, setLinearProjectsNextCursor] = useState<string | null>(null);
  const [loadingLinearProjects, setLoadingLinearProjects] = useState(false);
  const [loadingMoreLinearProjects, setLoadingMoreLinearProjects] = useState(false);
  const [linearPreview, setLinearPreview] = useState<VibeRaisingLinearPreview | null>(null);
  const [loadingLinearPreview, setLoadingLinearPreview] = useState(false);
  const [linearError, setLinearError] = useState<string | null>(null);
  const [savingLinearProjects, setSavingLinearProjects] = useState(false);
  const [selectedLinearProjectIds, setSelectedLinearProjectIds] = useState<Set<string>>(new Set());
  const [manualMaterials, setManualMaterials] = useState<ManualMaterialsState>(() => readStoredManualMaterials());
  const [manualMaterialsExpanded, setManualMaterialsExpanded] = useState(false);
  const defaultSelectionAppliedRef = useRef(false);
  const slackSelectionTouchedRef = useRef(false);
  const linearSelectionTouchedRef = useRef(false);

  const sourceByKey = useMemo(() => new Map(sources.map((source) => [source.key, source])), [sources]);
  const orderedVisibleSources = useMemo(() => {
    const keys = showAllSources ? [...POPULAR_SOURCE_KEYS, ...EXTRA_SOURCE_KEYS] : POPULAR_SOURCE_KEYS;
    return keys.map((key) => sourceByKey.get(key)).filter((source): source is VibeRaisingInputSourceSummary => Boolean(source));
  }, [showAllSources, sourceByKey]);
  const selectedSourceList = useMemo(
    () => sources.filter((source) => selectedSources.has(source.key)),
    [selectedSources, sources],
  );
  const slackChannels = useMemo(() => Object.values(slackChannelsById), [slackChannelsById]);
  const linearProjects = useMemo(() => Object.values(linearProjectsById), [linearProjectsById]);
  const hasManualMaterials = Boolean(manualMaterials.sourceUrl.trim() || manualMaterials.summary.trim());
  const manualMaterialsSummary = hasManualMaterials
    ? [
      manualMaterials.sourceUrl.trim() ? "URL added" : null,
      manualMaterials.summary.trim() ? "summary added" : null,
    ].filter((value): value is string => Boolean(value)).join(" and ")
    : "Add a source link or a short written summary when you want extra context in the draft.";
  const gmailSource = sourceByKey.get("gmail");
  const shouldShowGmailPreview = gmailSource?.status === "connected" || gmailSource?.status === "syncing" || gmailSource?.status === "error";
  const bankFeedSource = sourceByKey.get("bank_feed");
  const shouldShowBankFeedPreview = bankFeedSource?.status === "connected" || bankFeedSource?.status === "syncing" || bankFeedSource?.status === "error";
  const xeroSource = sourceByKey.get("xero");
  const shouldShowXeroPreview = xeroSource?.status === "connected" || xeroSource?.status === "syncing" || xeroSource?.status === "error";
  const slackSource = sourceByKey.get("slack");
  const shouldShowSlackPreview = slackSource?.status === "connected" || slackSource?.status === "syncing" || slackSource?.status === "error";
  const linearSource = sourceByKey.get("linear");
  const shouldShowLinearPreview = linearSource?.status === "connected" || linearSource?.status === "syncing" || linearSource?.status === "error";

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
            .filter((source) => FUNCTIONAL_SOURCES.has(source.key) && source.selected && (source.status === "connected" || source.status === "syncing"))
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

  useEffect(() => {
    if (hasManualMaterials) {
      setManualMaterialsExpanded(true);
    }
  }, [hasManualMaterials]);

  useEffect(() => {
    if (!shouldShowGmailPreview) {
      setGmailPreview(null);
      setGmailPreviewError(null);
      setLoadingGmailPreview(false);
      return;
    }

    let cancelled = false;
    setLoadingGmailPreview(true);
    setGmailPreviewError(null);
    getVibeRaisingGmailPreview(backendBaseUrl)
      .then((preview) => {
        if (!cancelled) setGmailPreview(preview);
      })
      .catch((error) => {
        if (!cancelled) {
          setGmailPreviewError(error instanceof Error ? error.message : "We couldn't load Gmail preview.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingGmailPreview(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowGmailPreview, gmailSource?.lastSyncedAt, gmailSource?.status]);

  useEffect(() => {
    if (!shouldShowBankFeedPreview) {
      setBankFeedPreview(null);
      setBankFeedPreviewError(null);
      setLoadingBankFeedPreview(false);
      return;
    }

    let cancelled = false;
    setLoadingBankFeedPreview(true);
    setBankFeedPreviewError(null);
    getVibeRaisingBankFeedPreview(backendBaseUrl)
      .then((preview) => {
        if (!cancelled) setBankFeedPreview(preview);
      })
      .catch((error) => {
        if (!cancelled) {
          setBankFeedPreviewError(error instanceof Error ? error.message : "We couldn't load Bank Feed preview.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingBankFeedPreview(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowBankFeedPreview, bankFeedSource?.lastSyncedAt, bankFeedSource?.status]);

  useEffect(() => {
    if (!shouldShowXeroPreview) {
      setXeroPreview(null);
      setXeroPreviewError(null);
      setLoadingXeroPreview(false);
      return;
    }

    let cancelled = false;
    setLoadingXeroPreview(true);
    setXeroPreviewError(null);
    getVibeRaisingXeroPreview(backendBaseUrl)
      .then((preview) => {
        if (!cancelled) setXeroPreview(preview);
      })
      .catch((error) => {
        if (!cancelled) {
          setXeroPreviewError(error instanceof Error ? error.message : "We couldn't load Xero preview.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingXeroPreview(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowXeroPreview, xeroSource?.lastSyncedAt, xeroSource?.status]);

  useEffect(() => {
    if (!shouldShowSlackPreview) {
      setSlackChannelsById({});
      setSlackChannelsNextCursor(null);
      setSlackPreview(null);
      setSlackError(null);
      setLoadingSlackChannels(false);
      setLoadingMoreSlackChannels(false);
      setLoadingSlackPreview(false);
      setSelectedSlackChannelIds(new Set());
      slackSelectionTouchedRef.current = false;
      return;
    }

    let cancelled = false;
    slackSelectionTouchedRef.current = false;
    setSlackChannelsById({});
    setSlackChannelsNextCursor(null);
    setSelectedSlackChannelIds(new Set());
    setLoadingSlackChannels(true);
    setSlackError(null);
    getVibeRaisingSlackChannels(backendBaseUrl, { limit: SLACK_CHANNEL_PAGE_LIMIT })
      .then((payload: VibeRaisingSlackChannelsResponse) => {
        if (cancelled) return;
        setSlackChannelsById((previous) => mergeSlackChannelsById(previous, payload.channels));
        setSlackChannelsNextCursor(payload.nextCursor ?? null);
        const selectedChannelIds = getSelectedSlackChannelIds(payload.channels);
        if (!slackSelectionTouchedRef.current && selectedChannelIds.length > 0) {
          setSelectedSlackChannelIds((previous) => {
            const nextSelected = new Set(previous);
            selectedChannelIds.forEach((channelId) => nextSelected.add(channelId));
            return nextSelected;
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setSlackError(error instanceof Error ? error.message : "We couldn't load Slack channels.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingSlackChannels(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowSlackPreview, slackSource?.status]);

  useEffect(() => {
    if (!shouldShowSlackPreview) {
      setSlackPreview(null);
      setLoadingSlackPreview(false);
      return;
    }

    let cancelled = false;
    setLoadingSlackPreview(true);
    getVibeRaisingSlackPreview(backendBaseUrl)
      .then((preview) => {
        if (cancelled) return;
        setSlackPreview(preview);
        setSlackChannelsById((previous) => mergeSlackChannelsById(previous, preview.selectedChannels));
        if (!slackSelectionTouchedRef.current && preview.selectedChannels.length > 0) {
          setSelectedSlackChannelIds((previous) => {
            const nextSelected = new Set(previous);
            preview.selectedChannels.forEach((channel) => nextSelected.add(channel.channelId));
            return nextSelected;
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setSlackError(error instanceof Error ? error.message : "We couldn't load Slack preview.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingSlackPreview(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowSlackPreview, slackSource?.lastSyncedAt, slackSource?.status]);

  useEffect(() => {
    if (!shouldShowLinearPreview) {
      setLinearProjectsById({});
      setLinearProjectsNextCursor(null);
      setLinearPreview(null);
      setLinearError(null);
      setLoadingLinearProjects(false);
      setLoadingMoreLinearProjects(false);
      setLoadingLinearPreview(false);
      setSelectedLinearProjectIds(new Set());
      linearSelectionTouchedRef.current = false;
      return;
    }

    let cancelled = false;
    linearSelectionTouchedRef.current = false;
    setLinearProjectsById({});
    setLinearProjectsNextCursor(null);
    setSelectedLinearProjectIds(new Set());
    setLoadingLinearProjects(true);
    setLinearError(null);
    getVibeRaisingLinearProjects(backendBaseUrl, { limit: LINEAR_PROJECT_PAGE_LIMIT })
      .then((payload: VibeRaisingLinearProjectsResponse) => {
        if (cancelled) return;
        setLinearProjectsById((previous) => mergeLinearProjectsById(previous, payload.projects));
        setLinearProjectsNextCursor(payload.nextCursor ?? null);
        const selectedProjectIds = getSelectedLinearProjectIds(payload.projects);
        if (!linearSelectionTouchedRef.current && selectedProjectIds.length > 0) {
          setSelectedLinearProjectIds((previous) => {
            const nextSelected = new Set(previous);
            selectedProjectIds.forEach((projectId) => nextSelected.add(projectId));
            return nextSelected;
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setLinearError(error instanceof Error ? error.message : "We couldn't load Linear projects.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingLinearProjects(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowLinearPreview, linearSource?.status]);

  useEffect(() => {
    if (!shouldShowLinearPreview) {
      setLinearPreview(null);
      setLoadingLinearPreview(false);
      return;
    }

    let cancelled = false;
    setLoadingLinearPreview(true);
    getVibeRaisingLinearPreview(backendBaseUrl)
      .then((preview) => {
        if (cancelled) return;
        setLinearPreview(preview);
        setLinearProjectsById((previous) => mergeLinearProjectsById(previous, preview.selectedProjects));
        if (!linearSelectionTouchedRef.current && preview.selectedProjects.length > 0) {
          setSelectedLinearProjectIds((previous) => {
            const nextSelected = new Set(previous);
            preview.selectedProjects.forEach((project) => nextSelected.add(project.projectId));
            return nextSelected;
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setLinearError(error instanceof Error ? error.message : "We couldn't load Linear preview.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingLinearPreview(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowLinearPreview, linearSource?.lastSyncedAt, linearSource?.status]);

  const currentReturnPath = `${location.pathname}${location.search || ""}`;

  const requestConnectSource = (source: VibeRaisingInputSourceSummary) => {
    if (!FUNCTIONAL_SOURCES.has(source.key)) return;
    if (source.status === "connected" || source.status === "syncing" || source.status === "coming_soon") return;
    if (source.status === "unavailable" && !OAUTH_CONNECTABLE_WHEN_STATUS_UNAVAILABLE.has(source.key)) return;
    setPendingConnectSource(source);
  };

  const confirmConnectSource = () => {
    if (!pendingConnectSource) return;
    const source = pendingConnectSource;
    setPendingConnectSource(null);
    void handleConnect(source);
  };

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

      window.location.assign(connectVibeRaisingInputSource(backendBaseUrl, source.key, currentReturnPath));
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : `We couldn't connect ${source.label}.`);
      setBusyProvider(null);
    }
  };

  const handleToggle = (source: VibeRaisingInputSourceSummary) => {
    if (!FUNCTIONAL_SOURCES.has(source.key)) return;
    if (source.status !== "connected" && source.status !== "syncing") return;
    if (source.key === "slack" && selectedSlackChannelIds.size === 0 && !selectedSources.has("slack")) {
      setStatusMessage("Select at least one Slack channel before using Slack in this update.");
      return;
    }
    if (source.key === "linear" && selectedLinearProjectIds.size === 0 && !selectedSources.has("linear")) {
      setStatusMessage("Select at least one Linear project before using Linear in this update.");
      return;
    }

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

  const handleSyncFinance = async (providers?: Array<Extract<VibeRaisingInputSourceKey, "stripe" | "xero" | "bank_feed">>) => {
    setSyncingFinance(true);
    setStatusMessage(null);
    try {
      const response = await syncVibeRaisingFinancialSources(backendBaseUrl, providers);
      await refreshStatuses();
      if (!providers?.length || providers.includes("xero")) {
        setLoadingXeroPreview(true);
        setXeroPreviewError(null);
        try {
          setXeroPreview(await getVibeRaisingXeroPreview(backendBaseUrl));
        } catch (previewError) {
          setXeroPreviewError(previewError instanceof Error ? previewError.message : "We couldn't load Xero preview.");
        } finally {
          setLoadingXeroPreview(false);
        }
      }
      const xeroRun = response.syncRuns.find((run) => run.provider === "xero");
      if (xeroRun?.needsReportReconnect) {
        setStatusMessage("Xero invoices and payments synced. Reconnect Xero to allow Profit and Loss and Balance Sheet report metrics.");
      } else if (xeroRun?.metricWarnings.length) {
        setStatusMessage(xeroRun.metricWarnings[0]);
      } else if (xeroRun?.status === "synced") {
        setStatusMessage(
          xeroRun.metricsPublishedCount && xeroRun.metricsPublishedCount > 0
            ? "Xero synced, including Profit and Loss and Balance Sheet metrics."
            : "Xero synced.",
        );
      } else if (response.status === "synced") {
        setStatusMessage("Financial sources synced.");
      }
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't start the financial sync.");
    } finally {
      setSyncingFinance(false);
    }
  };

  const handleToggleSlackChannel = (channelId: string) => {
    slackSelectionTouchedRef.current = true;
    setSelectedSlackChannelIds((previous) => {
      const nextSelected = new Set(previous);
      if (nextSelected.has(channelId)) {
        nextSelected.delete(channelId);
      } else {
        nextSelected.add(channelId);
      }
      return nextSelected;
    });
  };

  const handleLoadMoreSlackChannels = async () => {
    if (!slackChannelsNextCursor || loadingMoreSlackChannels) return;
    setLoadingMoreSlackChannels(true);
    setSlackError(null);
    try {
      const payload = await getVibeRaisingSlackChannels(backendBaseUrl, {
        cursor: slackChannelsNextCursor,
        limit: SLACK_CHANNEL_PAGE_LIMIT,
      });
      setSlackChannelsById((previous) => mergeSlackChannelsById(previous, payload.channels));
      setSlackChannelsNextCursor(payload.nextCursor ?? null);
      const selectedChannelIds = getSelectedSlackChannelIds(payload.channels);
      if (!slackSelectionTouchedRef.current && selectedChannelIds.length > 0) {
        setSelectedSlackChannelIds((previous) => {
          const nextSelected = new Set(previous);
          selectedChannelIds.forEach((channelId) => nextSelected.add(channelId));
          return nextSelected;
        });
      }
    } catch (error) {
      setSlackError(error instanceof Error ? error.message : "We couldn't load more Slack channels.");
    } finally {
      setLoadingMoreSlackChannels(false);
    }
  };

  const handleSaveSlackChannels = async () => {
    setSavingSlackChannels(true);
    setStatusMessage(null);
    try {
      const selectionResponse = await saveVibeRaisingSlackChannelSelections(backendBaseUrl, Array.from(selectedSlackChannelIds));
      setSlackChannelsById((previous) => mergeSlackChannelsById(previous, selectionResponse.channels));
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        if (selectedSlackChannelIds.size > 0) {
          nextSelected.add("slack");
        } else {
          nextSelected.delete("slack");
        }
        return nextSelected;
      });
      await Promise.all([
        refreshStatuses(),
        getVibeRaisingSlackPreview(backendBaseUrl).then(setSlackPreview),
      ]);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't save Slack channel selection.");
    } finally {
      setSavingSlackChannels(false);
    }
  };

  const handleSyncSlack = async () => {
    setSyncingSlack(true);
    setStatusMessage(null);
    try {
      const selectionResponse = await saveVibeRaisingSlackChannelSelections(backendBaseUrl, Array.from(selectedSlackChannelIds));
      setSlackChannelsById((previous) => mergeSlackChannelsById(previous, selectionResponse.channels));
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        if (selectedSlackChannelIds.size > 0) nextSelected.add("slack");
        return nextSelected;
      });
      await syncVibeRaisingInputSources(backendBaseUrl, ["slack"]);
      await Promise.all([
        refreshStatuses(),
        getVibeRaisingSlackPreview(backendBaseUrl).then(setSlackPreview),
      ]);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't sync Slack.");
    } finally {
      setSyncingSlack(false);
    }
  };

  const handleToggleLinearProject = (projectId: string) => {
    linearSelectionTouchedRef.current = true;
    setSelectedLinearProjectIds((previous) => {
      const nextSelected = new Set(previous);
      if (nextSelected.has(projectId)) {
        nextSelected.delete(projectId);
      } else {
        nextSelected.add(projectId);
      }
      return nextSelected;
    });
  };

  const handleLoadMoreLinearProjects = async () => {
    if (!linearProjectsNextCursor || loadingMoreLinearProjects) return;
    setLoadingMoreLinearProjects(true);
    setLinearError(null);
    try {
      const payload = await getVibeRaisingLinearProjects(backendBaseUrl, {
        cursor: linearProjectsNextCursor,
        limit: LINEAR_PROJECT_PAGE_LIMIT,
      });
      setLinearProjectsById((previous) => mergeLinearProjectsById(previous, payload.projects));
      setLinearProjectsNextCursor(payload.nextCursor ?? null);
      const selectedProjectIds = getSelectedLinearProjectIds(payload.projects);
      if (!linearSelectionTouchedRef.current && selectedProjectIds.length > 0) {
        setSelectedLinearProjectIds((previous) => {
          const nextSelected = new Set(previous);
          selectedProjectIds.forEach((projectId) => nextSelected.add(projectId));
          return nextSelected;
        });
      }
    } catch (error) {
      setLinearError(error instanceof Error ? error.message : "We couldn't load more Linear projects.");
    } finally {
      setLoadingMoreLinearProjects(false);
    }
  };

  const handleSaveLinearProjects = async () => {
    setSavingLinearProjects(true);
    setStatusMessage(null);
    try {
      const selectionResponse = await saveVibeRaisingLinearProjectSelections(backendBaseUrl, Array.from(selectedLinearProjectIds));
      setLinearProjectsById((previous) => mergeLinearProjectsById(previous, selectionResponse.projects));
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        if (selectedLinearProjectIds.size > 0) {
          nextSelected.add("linear");
        } else {
          nextSelected.delete("linear");
        }
        return nextSelected;
      });
      await Promise.all([
        refreshStatuses(),
        getVibeRaisingLinearPreview(backendBaseUrl).then(setLinearPreview),
      ]);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't save Linear project selection.");
    } finally {
      setSavingLinearProjects(false);
    }
  };

  const handleSyncLinear = async () => {
    setSyncingLinear(true);
    setStatusMessage(null);
    try {
      const selectionResponse = await saveVibeRaisingLinearProjectSelections(backendBaseUrl, Array.from(selectedLinearProjectIds));
      setLinearProjectsById((previous) => mergeLinearProjectsById(previous, selectionResponse.projects));
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        if (selectedLinearProjectIds.size > 0) nextSelected.add("linear");
        return nextSelected;
      });
      await syncVibeRaisingInputSources(backendBaseUrl, ["linear"]);
      await Promise.all([
        refreshStatuses(),
        getVibeRaisingLinearPreview(backendBaseUrl).then(setLinearPreview),
      ]);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't sync Linear.");
    } finally {
      setSyncingLinear(false);
    }
  };

  const navigateToDraft = (includeInputs: boolean) => {
    if (
      includeInputs &&
      selectedSources.has("linear") &&
      selectedLinearProjectIds.size === 0 &&
      !(sourceByKey.get("linear")?.selectedProjectCount ?? 0)
    ) {
      setStatusMessage("Select at least one Linear project before using Linear in this update.");
      return;
    }
    writeStoredManualMaterials(manualMaterials);
    const target = new URL(next, "http://mlai.local");
    if (includeInputs && selectedSources.size > 0) {
      target.searchParams.set("inputs", Array.from(selectedSources).join(","));
    } else {
      target.searchParams.delete("inputs");
    }
    navigate(`${target.pathname}${target.search}`);
  };

  const handleManualMaterialsContinue = () => {
    if (selectedSourceList.length === 0) {
      setShowNoSourcesModal(true);
      return;
    }
    navigateToDraft(true);
  };

  const continueWithoutSources = () => {
    setShowNoSourcesModal(false);
    navigateToDraft(true);
  };

  const updateManualMaterials = (patch: Partial<ManualMaterialsState>) => {
    setManualMaterials((previous) => {
      const nextMaterials = { ...previous, ...patch };
      writeStoredManualMaterials(nextMaterials);
      return nextMaterials;
    });
  };

  const clearManualMaterials = () => {
    updateManualMaterials({ sourceUrl: "", summary: "" });
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

  const stickyStatusTitle = selectedSourceList.length > 0
    ? `${selectedSourceList.length} external source${selectedSourceList.length === 1 ? "" : "s"} selected`
    : hasManualMaterials
      ? "Manual materials added"
      : "No external sources selected";
  const stickyStatusDetail = selectedSourceList.length > 0
    ? selectedSourceList.map((source) => source.label).join(", ")
    : hasManualMaterials
      ? "Your URL or summary will be included in the draft."
      : "Continue with manual input only, or connect a source first.";
  const stickyStatusIcon = selectedSourceList.length > 0 ? (
    <div className="flex -space-x-2">
      {selectedSourceList.slice(0, 3).map((source) => (
        <div key={source.key} className="rounded-xl ring-2 ring-white">
          <SourceLogo sourceKey={source.key} />
        </div>
      ))}
    </div>
  ) : (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] ring-1 ring-[rgba(0,255,215,0.26)]">
      <FolderIcon className="h-5 w-5" />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-32">
      <div className="space-y-4">
        <MonthlyUpdateStepper
          activeStep="connect"
          enabledSteps={["connect", "draft"]}
          onStepClick={handleStepperClick}
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
                Connect your tools below. Our AI securely pulls in the most relevant data and turns it into your monthly update.
              </p>
            </div>
          </div>
        </div>
      </div>

      {statusMessage ? (
        <div className="rounded-xl border border-[rgba(255,200,1,0.42)] bg-[rgba(255,200,1,0.14)] px-5 py-4 text-sm font-semibold text-[var(--vr-color-text)]">
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
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--vr-color-primary)]">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Checking status
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {orderedVisibleSources.map((source) => (
            <ConnectorCard
              key={source.key}
              source={source}
              selected={selectedSources.has(source.key)}
              busy={busyProvider === source.key}
              onConnect={requestConnectSource}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {EXTRA_SOURCE_KEYS.length > 0 ? (
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
        ) : null}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ManualMaterialsCard
            expanded={manualMaterialsExpanded}
            hasManualMaterials={hasManualMaterials}
            summary={manualMaterialsSummary}
            onToggle={() => setManualMaterialsExpanded((value) => !value)}
          />

          {manualMaterialsExpanded ? (
            <div
              id="manual-materials-panel"
              className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-3"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-slate-500">
                  Add a source URL or a short written summary for extra context.
                </p>
                {hasManualMaterials ? (
                  <button
                    type="button"
                    onClick={clearManualMaterials}
                    className="inline-flex w-fit items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-xs font-extrabold text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
                  >
                    Clear materials
                  </button>
                ) : null}
              </div>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-sm font-bold text-gray-700">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                  Source URL
                </span>
                <input
                  type="url"
                  value={manualMaterials.sourceUrl}
                  onChange={(event) => updateManualMaterials({ sourceUrl: event.target.value })}
                  placeholder="https://docs.google.com/document/..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-gray-700">Short summary</span>
                <textarea
                  value={manualMaterials.summary}
                  onChange={(event) => updateManualMaterials({ summary: event.target.value })}
                  rows={4}
                  placeholder="Topline context investors should read before the detailed sections..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
                />
              </label>
            </div>
          ) : null}
        </div>
      </section>

      {shouldShowSlackPreview ? (
        <SlackPreview
          channels={slackChannels}
          preview={slackPreview}
          loadingChannels={loadingSlackChannels}
          loadingPreview={loadingSlackPreview}
          error={slackError}
          saving={savingSlackChannels}
          syncing={syncingSlack}
          selectedChannelIds={selectedSlackChannelIds}
          nextCursor={slackChannelsNextCursor}
          loadingMoreChannels={loadingMoreSlackChannels}
          onToggleChannel={handleToggleSlackChannel}
          onLoadMoreChannels={() => void handleLoadMoreSlackChannels()}
          onSaveChannels={() => void handleSaveSlackChannels()}
          onSync={() => void handleSyncSlack()}
        />
      ) : null}

      {shouldShowLinearPreview ? (
        <LinearPreview
          projects={linearProjects}
          preview={linearPreview}
          loadingProjects={loadingLinearProjects}
          loadingPreview={loadingLinearPreview}
          error={linearError}
          saving={savingLinearProjects}
          syncing={syncingLinear}
          selectedProjectIds={selectedLinearProjectIds}
          nextCursor={linearProjectsNextCursor}
          loadingMoreProjects={loadingMoreLinearProjects}
          onToggleProject={handleToggleLinearProject}
          onLoadMoreProjects={() => void handleLoadMoreLinearProjects()}
          onSaveProjects={() => void handleSaveLinearProjects()}
          onSync={() => void handleSyncLinear()}
        />
      ) : null}

      {shouldShowXeroPreview ? (
        <XeroPreview
          preview={xeroPreview}
          loading={loadingXeroPreview}
          error={xeroPreviewError}
          syncing={syncingFinance}
          onSync={() => void handleSyncFinance(["xero"])}
          reconnectHref={connectVibeRaisingInputSource(backendBaseUrl, "xero", currentReturnPath)}
        />
      ) : null}

      {shouldShowBankFeedPreview ? (
        <BankFeedPreview
          preview={bankFeedPreview}
          loading={loadingBankFeedPreview}
          error={bankFeedPreviewError}
        />
      ) : null}

      <VibeRaisingStickyStepBar
        statusIcon={stickyStatusIcon}
        statusTitle={stickyStatusTitle}
        statusDetail={stickyStatusDetail}
        onBack={() => navigate("/founder-tools/companies")}
        primaryLabel="Continue to draft"
        onPrimary={handleManualMaterialsContinue}
      />

      {showNoSourcesModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
            <div className="px-6 pb-5 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--vr-palette-mint)] text-[var(--vr-palette-black)]">
                  <FolderIcon className="h-6 w-6" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowNoSourcesModal(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-gray-50 hover:text-gray-700"
                  aria-label="Close manual-only notice"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <h2 className="mt-5 text-2xl font-black text-gray-950">No source connected</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                You have not connected an external source yet. If you continue, you will draft this update from manual input only.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowNoSourcesModal(false)}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-gray-50"
              >
                Go back
              </button>
              <button
                type="button"
                onClick={continueWithoutSources}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-palette-mint)] px-5 py-3 text-sm font-extrabold text-[var(--vr-palette-black)] shadow-sm transition hover:bg-[var(--vr-color-primary)] hover:text-white"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {pendingConnectSource ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-start gap-4">
                <SourceLogo sourceKey={pendingConnectSource.key} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]">
                    Before you connect
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-gray-950">
                    Connect {pendingConnectSource.label}?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    We will only use authorized data to help draft your monthly investor update.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingConnectSource(null)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-gray-50 hover:text-gray-700"
                  aria-label="Cancel connection"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-5 md:grid-cols-2">
              <section className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--vr-color-primary)] shadow-sm">
                    <ShieldCheckIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-gray-950">What we pull in</h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                  {["Revenue and financial metrics", "Key milestones and updates", "Team and operational highlights", "Challenges and risks", "Upcoming asks and needs"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-[var(--vr-color-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--vr-color-primary)] shadow-sm">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-gray-950">Privacy and security</h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                  {["Read-only access where supported", "You control what is connected", "We only scan the filtered data needed for your draft"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-[var(--vr-color-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingConnectSource(null)}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmConnectSource}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[var(--vr-palette-black)]"
              >
                Connect {pendingConnectSource.label}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
