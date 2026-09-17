import { useEffect, useMemo, useRef, useState } from "react";
import type { Route } from "./+types/vibe-raising-app.connect-data";
import { Link, redirect, useLoaderData, useLocation, useNavigate } from "react-router";
import { clsx } from "clsx";
import { Combobox } from "@headlessui/react";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  BuildingLibraryIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  LinkIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getEnv } from "~/lib/env.server";
import {
  bootstrapVibeRaisingStartupUpdate,
  connectVibeRaisingInputSource,
  connectVibeRaisingLuma,
  disconnectVibeRaisingGmail,
  getVibeRaisingBankFeedPreview,
  getVibeRaisingGmailPreview,
  getVibeRaisingGoogleAnalyticsProperties,
  getVibeRaisingInputSourcesStatus,
  getVibeRaisingLinearPreview,
  getVibeRaisingLumaEvents,
  listVibeRaisingManualDocuments,
  uploadVibeRaisingManualDocument,
  deleteVibeRaisingManualDocument,
  getVibeRaisingManualDocumentDownloadUrl,
  getVibeRaisingSlackChannels,
  getVibeRaisingSlackPreview,
  getVibeRaisingXeroPreview,
  requireVibeRaisingFounder,
  resolveActiveCompanyId,
  saveVibeRaisingGoogleAnalyticsPropertySelections,
  saveVibeRaisingLumaSelections,
  saveVibeRaisingSlackChannelSelections,
  syncVibeRaisingFinancialSources,
  syncVibeRaisingInputSources,
} from "~/lib/vibe-raising";
import type {
  VibeRaisingBankFeedPreview,
  VibeRaisingGmailPreview,
  VibeRaisingGoogleAnalyticsProperty,
  VibeRaisingGoogleAnalyticsPropertiesResponse,
  VibeRaisingLumaEventsResponse,
  VibeRaisingLumaMetricOption,
  VibeRaisingInputSourceKey,
  VibeRaisingInputSourceSummary,
  VibeRaisingLinearPreview,
  VibeRaisingManualDocument,
  VibeRaisingSlackChannel,
  VibeRaisingSlackChannelsResponse,
  VibeRaisingSlackPreview,
  VibeRaisingXeroPreview,
} from "~/types/vibe-raising";
import VibeRaisingWorkflowLayout from "~/components/VibeRaisingWorkflowLayout";
import ConnectorTile from "~/components/vibe-raising/ConnectorTile";
import { completeConnectorCatalogue, isConnectedConnector, readConnectorSelection, resolveConnectorSelection } from "~/lib/update-connectors";
import "~/styles/update-editor.css";
import "~/styles/update-gallery.css";
import "~/styles/update-connections.css";

const DEFAULT_NEXT = "/founder-tools/updates/create";
const DEFAULT_BACKEND_BASE_URL = "https://api.mlai.au";
const MANUAL_MATERIALS_STORAGE_KEY = "vibe_raising_manual_materials";
const FUNCTIONAL_SOURCES = new Set<VibeRaisingInputSourceKey>(["gmail", "google_analytics", "stripe", "xero", "bank_feed", "notion", "google_drive", "slack", "linear", "luma"]);
const OAUTH_CONNECTABLE_WHEN_STATUS_UNAVAILABLE = new Set<VibeRaisingInputSourceKey>(["stripe"]);
const SLACK_CHANNEL_PAGE_LIMIT = 100;
const GOOGLE_ANALYTICS_PROPERTY_PAGE_LIMIT = 200;
const EMPTY_SOURCES = completeConnectorCatalogue([]);

type ManualMaterialsState = {
  summary: string;
  manualDocumentIds: string[];
  documents: VibeRaisingManualDocument[];
};

type OAuthSourceKey = Exclude<VibeRaisingInputSourceKey, "gmail" | "manual_documents" | "luma">;

function isOAuthSourceKey(key: VibeRaisingInputSourceKey): key is OAuthSourceKey {
  return key !== "gmail" && key !== "manual_documents" && key !== "luma";
}

function readStoredManualMaterials(scope: string): ManualMaterialsState {
  if (typeof window === "undefined") return { summary: "", manualDocumentIds: [], documents: [] };
  try {
    const raw = window.sessionStorage.getItem(`${MANUAL_MATERIALS_STORAGE_KEY}:${scope}`);
    if (!raw) return { summary: "", manualDocumentIds: [], documents: [] };
    const parsed = JSON.parse(raw) as {
      sourceUrl?: unknown;
      summary?: unknown;
      manualDocumentIds?: unknown;
      documents?: unknown;
    };
    const documents = Array.isArray(parsed.documents)
      ? parsed.documents.filter((item): item is VibeRaisingManualDocument => Boolean(item && typeof item === "object" && "id" in item))
      : [];
    const manualDocumentIds = Array.isArray(parsed.manualDocumentIds)
      ? parsed.manualDocumentIds.map((item) => String(item || "").trim()).filter(Boolean)
      : documents.map((document) => document.id);

    return {
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      manualDocumentIds,
      documents: documents.filter((document) => manualDocumentIds.includes(document.id)),
    };
  } catch {
    return { summary: "", manualDocumentIds: [], documents: [] };
  }
}

function writeStoredManualMaterials(materials: ManualMaterialsState, scope: string) {
  if (typeof window === "undefined") return;
  const summary = materials.summary.trim();
  const manualDocumentIds = Array.from(new Set(materials.manualDocumentIds.map((item) => item.trim()).filter(Boolean)));
  const documents = materials.documents.filter((document) => manualDocumentIds.includes(document.id));
  if (manualDocumentIds.length === 0 && !summary) {
    window.sessionStorage.removeItem(`${MANUAL_MATERIALS_STORAGE_KEY}:${scope}`);
    return;
  }
  window.sessionStorage.setItem(`${MANUAL_MATERIALS_STORAGE_KEY}:${scope}`, JSON.stringify({ summary, manualDocumentIds, documents }));
}

const SOURCE_COPY: Record<VibeRaisingInputSourceKey, { description: string; mobileDescription: string; connectedUse: string }> = {
  gmail: {
    description: "Scan emails for key updates, customer feedback, and important threads.",
    mobileDescription: "Scan key emails and customer threads.",
    connectedUse: "Emails, customer threads",
  },
  google_analytics: {
    description: "Bring product traffic, acquisition, and engagement metrics into updates.",
    mobileDescription: "Bring traffic and engagement metrics.",
    connectedUse: "Traffic, acquisition, engagement",
  },
  stripe: {
    description: "Pull revenue, subscriptions, and financial metrics automatically.",
    mobileDescription: "Pull revenue and subscription metrics.",
    connectedUse: "Revenue, subscriptions",
  },
  xero: {
    description: "Use invoices and recurring revenue records from your accounting workspace.",
    mobileDescription: "Use invoices and recurring revenue data.",
    connectedUse: "Invoices, accounting",
  },
  bank_feed: {
    description: "Import transactions and cash flow data from your business accounts.",
    mobileDescription: "Import transactions and cash flow.",
    connectedUse: "Transactions, cash flow",
  },
  notion: {
    description: "Sync notes, docs, and internal updates from your workspace.",
    mobileDescription: "Sync notes, docs, and updates.",
    connectedUse: "Docs, notes, updates",
  },
  google_drive: {
    description: "Add files, reports, and presentations for deeper context.",
    mobileDescription: "Add files, reports, and decks.",
    connectedUse: "Files, reports, decks",
  },
  slack: {
    description: "Bring in important team updates and customer conversations.",
    mobileDescription: "Bring in team updates and conversations.",
    connectedUse: "Team updates, conversations",
  },
  linear: {
    description: "Pull project updates, active workstreams, and key tasks from Linear.",
    mobileDescription: "Pull project updates and key tasks.",
    connectedUse: "Projects, tasks, updates",
  },
  luma: {
    description: "Track events run and registrations from your own Luma calendar over time.",
    mobileDescription: "Track events run and registrations.",
    connectedUse: "Events run, registrations",
  },
  manual_documents: {
    description: "Use uploaded founder documents as deterministic context.",
    mobileDescription: "Use uploaded documents as context.",
    connectedUse: "Documents, summary",
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


  const url = new URL(request.url);
  return {
    user,
    next: sanitizeNext(url.searchParams.get("next")),
    backendBaseUrl: String(env.BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL),
  };
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
  const reportReconnectHref =
    preview?.needsReportReconnect && preview.canRequestReportScopes ? reconnectHref || undefined : undefined;

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
          {reportReconnectHref ? (
            <a
              href={reportReconnectHref}
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
              reportReconnectHref
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

function mergeGoogleAnalyticsPropertiesById(
  previous: Record<string, VibeRaisingGoogleAnalyticsProperty>,
  properties: VibeRaisingGoogleAnalyticsProperty[],
) {
  if (properties.length === 0) return previous;
  const next = { ...previous };
  properties.forEach((property) => {
    next[property.propertyId] = { ...next[property.propertyId], ...property };
  });
  return next;
}

function getSelectedGoogleAnalyticsPropertyIds(properties: VibeRaisingGoogleAnalyticsProperty[]) {
  return properties.filter((property) => property.selected).map((property) => property.propertyId);
}

function GoogleAnalyticsPreview({
  properties,
  accountLabel,
  loading,
  error,
  saving,
  selectedPropertyIds,
  nextCursor,
  loadingMore,
  onToggleProperty,
  onLoadMore,
  onSave,
}: {
  properties: VibeRaisingGoogleAnalyticsProperty[];
  accountLabel: string | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
  selectedPropertyIds: Set<string>;
  nextCursor: string | null;
  loadingMore: boolean;
  onToggleProperty: (propertyId: string) => void;
  onLoadMore: () => void;
  onSave: () => void;
}) {
  return (
    <section className="rounded-xl border border-[var(--vr-color-border)] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Google Analytics properties</h2>
          <p className="mt-2 text-sm text-slate-500">Choose which GA4 property feeds traffic and conversion metrics into this update.</p>
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

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Google account</p>
          <p className="mt-2 truncate text-sm font-black text-gray-950">{accountLabel || "Connected Google Analytics"}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Selected properties</p>
          <p className="mt-2 text-sm font-black text-gray-950">{selectedPropertyIds.size}</p>
        </div>
      </div>

      {properties.length > 0 ? (
        <div className="mt-5 rounded-lg border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-black text-gray-950">Properties</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{selectedPropertyIds.size} selected</p>
            </div>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--vr-color-primary)] px-3 py-2 text-xs font-extrabold text-white transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving" : "Save selection"}
            </button>
          </div>
          <ul className="divide-y divide-gray-100 px-2 py-2">
            {properties.map((property) => {
              const selected = selectedPropertyIds.has(property.propertyId);
              return (
                <li key={property.propertyId}>
                  <button
                    type="button"
                    onClick={() => onToggleProperty(property.propertyId)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-left font-semibold text-gray-800 transition hover:bg-[rgba(0,255,215,0.08)]"
                  >
                    <span
                      className={clsx(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                        selected ? "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white" : "border-gray-300 bg-white text-transparent",
                      )}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-black text-gray-950">{property.propertyDisplayName}</span>
                      <span className="mt-0.5 block truncate text-xs font-bold text-slate-500">
                        {[property.accountDisplayName, `Property ${property.propertyId}`].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {nextCursor ? (
            <div className="border-t border-gray-100 p-2">
              <button
                type="button"
                onClick={onLoadMore}
                disabled={loadingMore}
                className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-extrabold text-[var(--vr-color-primary)] transition hover:bg-[rgba(0,255,215,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ArrowPathIcon className={clsx("h-4 w-4", loadingMore && "animate-spin")} />
                {loadingMore ? "Loading properties" : "Load more properties"}
              </button>
            </div>
          ) : null}
        </div>
      ) : !loading ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          Google Analytics is connected, but no GA4 properties were found for this Google account.
        </div>
      ) : null}
    </section>
  );
}

function LumaPreview({
  accountLabel,
  loading,
  error,
  saving,
  selectedMetricKeys,
  availableMetrics,
  onToggleMetric,
  onSave,
}: {
  accountLabel: string | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
  selectedMetricKeys: Set<string>;
  availableMetrics: VibeRaisingLumaMetricOption[];
  onToggleMetric: (metricKey: string) => void;
  onSave: () => void;
}) {
  return (
    <section className="rounded-xl border border-[var(--vr-color-border)] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Luma metrics</h2>
          <p className="mt-2 text-sm text-slate-500">
            Events are matched automatically to the month you select when creating an update. Choose which metrics to track.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--vr-color-primary)]">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Loading
            </span>
          ) : null}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--vr-color-primary)] px-3 py-2 text-xs font-extrabold text-white transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving" : "Save metrics"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-lg bg-[rgba(255,200,1,0.16)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">{error}</div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Luma account</p>
          <p className="mt-2 truncate text-sm font-black text-gray-950">{accountLabel || "Connected Luma"}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Event window</p>
          <p className="mt-2 text-sm font-black text-gray-950">Selected update month</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Selected metrics</p>
          <p className="mt-2 text-sm font-black text-gray-950">{selectedMetricKeys.size}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-[rgba(0,255,215,0.08)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
        Only events in the selected calendar month contribute to that update&apos;s event totals. Nearby event history remains available as drafting context.
      </div>

      {availableMetrics.length > 0 ? (
        <div className="mt-5 rounded-lg border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-sm font-black text-gray-950">Metrics to track</p>
            <p className="mt-1 text-xs font-bold text-slate-500">These build up in your tracked metrics over time.</p>
          </div>
          <ul className="grid gap-1 px-2 py-2 sm:grid-cols-2">
            {availableMetrics.map((metric) => {
              const selected = selectedMetricKeys.has(metric.key);
              return (
                <li key={metric.key}>
                  <button
                    type="button"
                    onClick={() => onToggleMetric(metric.key)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-left font-semibold text-gray-800 transition hover:bg-[rgba(0,255,215,0.08)]"
                  >
                    <span
                      className={clsx(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                        selected ? "border-[var(--vr-color-primary)] bg-[var(--vr-color-primary)] text-white" : "border-gray-300 bg-white text-transparent",
                      )}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-black text-gray-950">{metric.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function LinearPreview({
  preview,
  loading,
  error,
  syncing,
  onSync,
}: {
  preview: VibeRaisingLinearPreview | null;
  loading: boolean;
  error: string | null;
  syncing: boolean;
  onSync: () => void;
}) {
  const recentProjects = preview?.selectedProjects ?? [];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-950">Linear activity</h2>
          <p className="mt-2 text-sm text-slate-500">
            Projects with project, update, or issue activity in the last 30 days are included automatically.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {loading ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-700">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Loading
            </span>
          ) : null}
          <button
            type="button"
            onClick={onSync}
            disabled={syncing}
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
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Active projects (30 days)</p>
          <p className="mt-2 text-sm font-black text-gray-950">{recentProjects.length}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cached issues</p>
          <p className="mt-2 text-sm font-black text-gray-950">{preview?.totalCachedIssues ?? 0}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-[rgba(0,255,215,0.08)] px-4 py-3 text-sm font-semibold text-[var(--vr-color-text)]">
        You do not need to choose projects. The 30-day activity window is refreshed before a monthly update is created.
      </div>

      {recentProjects.length > 0 ? (
        <div className="mt-5 rounded-lg border border-gray-100">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-sm font-black text-gray-950">Projects included automatically</p>
            <p className="mt-1 text-xs font-bold text-slate-500">{recentProjects.length} with recent activity</p>
          </div>
          <div className="flex flex-wrap gap-2 px-4 py-4">
            {recentProjects.map((project) => (
              <span
                key={project.projectId}
                className="inline-flex max-w-full rounded-full bg-gray-100 px-3 py-1.5 text-xs font-extrabold text-gray-800 ring-1 ring-gray-200"
              >
                <span className="truncate">{project.projectName}</span>
              </span>
            ))}
          </div>
        </div>
      ) : !loading ? (
        <div className="mt-5 rounded-lg bg-gray-50 px-4 py-4 text-sm font-semibold text-slate-500">
          No Linear projects have activity in the last 30 days, so none will be included right now.
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
    large ? "h-12 w-12 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl" : "h-10 w-10 rounded-xl",
  );
  const iconClassName = large ? "h-8 w-8 sm:h-11 sm:w-11" : "h-7 w-7";
  const officialLogoClassName = clsx("object-contain", large ? "h-9 w-9 sm:h-12 sm:w-12" : "h-7 w-7");

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

  if (sourceKey === "google_analytics") {
    return (
      <div className={badgeClassName}>
        <img src="/vibe-raising/logos/google-analytics.svg" alt="" className={officialLogoClassName} />
      </div>
    );
  }

  if (sourceKey === "linear") {
    return (
      <div className={clsx("flex shrink-0 items-center justify-center bg-gray-950 shadow-sm transition-all duration-300", large ? "h-12 w-12 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl" : "h-10 w-10 rounded-xl")}>
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
      <div className={clsx("flex shrink-0 items-center justify-center bg-[#635bff] font-black text-white shadow-sm transition-all duration-300", large ? "h-12 w-12 rounded-xl text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl" : "h-10 w-10 rounded-xl text-lg")}>
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

  if (sourceKey === "luma") {
    return (
      <div className={badgeClassName}>
        <img src="/vibe-raising/logos/luma.webp" alt="" className={officialLogoClassName} />
      </div>
    );
  }

  return (
    <div className={clsx("flex shrink-0 items-center justify-center rounded-full bg-[#13b5ea] font-black uppercase text-white shadow-sm transition-all duration-300", large ? "h-12 w-12 text-sm sm:h-16 sm:w-16 sm:text-base" : "h-10 w-10 text-xs")}>
      xero
    </div>
  );
}

function ManualMaterialsCard({ expanded, hasManualMaterials, summary, onToggle }: {
  expanded: boolean; hasManualMaterials: boolean; summary: string; onToggle: () => void;
}) {
  return <button type="button" className="connections-materials-toggle" onClick={onToggle}
    aria-expanded={expanded} aria-controls="manual-materials-panel">
    <DocumentTextIcon className="h-5 w-5" />
    <span><strong>Documents & extra context</strong><small>{hasManualMaterials ? summary : "Add a document or a few notes to help your draft."}</small></span>
    <span>{expanded ? "Close" : "Add context"}</span>
  </button>;
}

function deletionSummaryText(deleted: {
  gmailMessages: number;
  gmailThreads: number;
  gmailAttachments: number;
  gmailCursors: number;
  startupEvents: number;
  startupMetrics: number;
  monthlyDrafts: number;
}) {
  const rawCount = deleted.gmailMessages + deleted.gmailThreads + deleted.gmailAttachments + deleted.gmailCursors;
  const derivedCount = deleted.startupEvents + deleted.startupMetrics + deleted.monthlyDrafts;
  const parts = [];
  if (rawCount > 0) parts.push(`${rawCount} Gmail cache item${rawCount === 1 ? "" : "s"}`);
  if (derivedCount > 0) parts.push(`${derivedCount} generated update item${derivedCount === 1 ? "" : "s"}`);
  return parts.length > 0 ? parts.join(" and ") : "local Gmail access";
}

function sourceScanSummary(source: VibeRaisingInputSourceSummary) {
  switch (source.key) {
    case "gmail":
      return "recent emails, relevant threads, and attachments that match your drafting filters";
    case "google_analytics":
      return "traffic, acquisition, and engagement metrics relevant to this reporting period";
    case "slack":
      return "selected channels and messages you choose for update drafting";
    case "linear":
      return "selected projects, issues, and status updates relevant to this update";
    case "stripe":
      return "subscription and revenue metrics relevant to this reporting period";
    case "xero":
      return "invoices, revenue records, and accounting context for this update";
    case "bank_feed":
      return "transactions and cash-flow activity connected to this reporting period";
    case "notion":
      return "the pages and notes you choose to use as drafting context";
    case "google_drive":
      return "the files you choose to use as monthly-update context";
    default:
      return "the selected source data needed for this update";
  }
}

function GmailManagementModal({
  source,
  busyAction,
  onClose,
  onDisconnect,
}: {
  source: VibeRaisingInputSourceSummary;
  busyAction: "disconnect" | "delete" | null;
  onClose: () => void;
  onDisconnect: (deleteDerivedData: boolean) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const googlePermissionsUrl = source.googlePermissionsUrl || "https://myaccount.google.com/permissions";
  const busy = busyAction !== null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div className="flex min-w-0 items-center gap-4">
            <SourceLogo sourceKey="gmail" />
            <div className="min-w-0">
              <h2 className="text-lg font-black text-gray-950">Manage Gmail access</h2>
              <p className="mt-1 truncate text-sm font-medium text-slate-500">{source.accountLabel || "Connected Gmail account"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-gray-50 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close Gmail access management"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="rounded-xl border border-[rgba(0,255,215,0.24)] bg-[rgba(0,255,215,0.10)] p-4">
            <div className="flex gap-3">
              <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--vr-color-primary)]" />
              <p className="text-sm leading-6 text-slate-600">
                MLAI Vibe Raising uses Gmail only for the founder-requested monthly update workflow. Disconnecting removes MLAI's local Gmail token and cached Gmail source data.
              </p>
            </div>
          </div>

          <a
            href={googlePermissionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--vr-color-primary)] transition hover:text-[var(--vr-palette-black)]"
          >
            Revoke MLAI in Google Account permissions
            <LinkIcon className="h-4 w-4" />
          </a>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => onDisconnect(false)}
              disabled={busy}
              className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-4 py-4 text-left transition hover:bg-gray-50 disabled:opacity-60"
            >
              <span>
                <span className="block text-sm font-extrabold text-gray-950">Disconnect Gmail</span>
                <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">
                  Remove Gmail access and cached Gmail source data. Generated update drafts stay in your workspace.
                </span>
              </span>
              {busyAction === "disconnect" ? <ArrowPathIcon className="h-5 w-5 animate-spin text-slate-400" /> : <XMarkIcon className="h-5 w-5 text-slate-400" />}
            </button>

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <label className="flex gap-3 text-sm font-semibold leading-6 text-red-900">
                <input
                  type="checkbox"
                  checked={confirmDelete}
                  onChange={(event) => setConfirmDelete(event.target.checked)}
                  disabled={busy}
                  className="mt-1 h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                />
                Also delete Gmail-derived monthly update drafts, events, and metrics.
              </label>
              <button
                type="button"
                onClick={() => onDisconnect(true)}
                disabled={busy || !confirmDelete}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-200"
              >
                {busyAction === "delete" ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
                Disconnect and delete Gmail-derived data
              </button>
            </div>
          </div>

          <p className="text-xs font-medium leading-5 text-slate-500">
            You can request deletion support at hi@mlai.au if you cannot access this app.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConnectData() {
  const { backendBaseUrl, next, user } = useLoaderData<typeof loader>();
  const materialsScope = `${user.authUser.id}:${resolveActiveCompanyId(user)}`;
  const navigate = useNavigate();
  const location = useLocation();
  const [sources, setSources] = useState<VibeRaisingInputSourceSummary[]>(EMPTY_SOURCES);
  const [selectedSources, setSelectedSources] = useState<Set<VibeRaisingInputSourceKey>>(new Set());
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [syncingFinance, setSyncingFinance] = useState(false);
  const [syncingSlack, setSyncingSlack] = useState(false);
  const [busyProvider, setBusyProvider] = useState<VibeRaisingInputSourceKey | null>(null);
  const [pendingConnectSource, setPendingConnectSource] = useState<VibeRaisingInputSourceSummary | null>(null);
  const [showLumaModal, setShowLumaModal] = useState(false);
  const [lumaApiKeyValue, setLumaApiKeyValue] = useState("");
  const [lumaConnecting, setLumaConnecting] = useState(false);
  const [lumaError, setLumaError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [gmailManagementSource, setGmailManagementSource] = useState<VibeRaisingInputSourceSummary | null>(null);
  const [gmailDisconnectAction, setGmailDisconnectAction] = useState<"disconnect" | "delete" | null>(null);
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
  const [googleAnalyticsPropertiesById, setGoogleAnalyticsPropertiesById] = useState<Record<string, VibeRaisingGoogleAnalyticsProperty>>({});
  const [googleAnalyticsNextCursor, setGoogleAnalyticsNextCursor] = useState<string | null>(null);
  const [loadingGoogleAnalyticsProperties, setLoadingGoogleAnalyticsProperties] = useState(false);
  const [loadingMoreGoogleAnalyticsProperties, setLoadingMoreGoogleAnalyticsProperties] = useState(false);
  const [googleAnalyticsAccountLabel, setGoogleAnalyticsAccountLabel] = useState<string | null>(null);
  const [googleAnalyticsError, setGoogleAnalyticsError] = useState<string | null>(null);
  const [savingGoogleAnalyticsProperties, setSavingGoogleAnalyticsProperties] = useState(false);
  const [selectedGoogleAnalyticsPropertyIds, setSelectedGoogleAnalyticsPropertyIds] = useState<Set<string>>(new Set());
  const [loadingLumaEvents, setLoadingLumaEvents] = useState(false);
  const [lumaAccountLabel, setLumaAccountLabel] = useState<string | null>(null);
  const [lumaEventsError, setLumaEventsError] = useState<string | null>(null);
  const [savingLumaSelections, setSavingLumaSelections] = useState(false);
  const [selectedLumaMetricKeys, setSelectedLumaMetricKeys] = useState<Set<string>>(new Set());
  const [lumaAvailableMetrics, setLumaAvailableMetrics] = useState<VibeRaisingLumaMetricOption[]>([]);
  const [syncingLinear, setSyncingLinear] = useState(false);
  const [linearPreview, setLinearPreview] = useState<VibeRaisingLinearPreview | null>(null);
  const [loadingLinearPreview, setLoadingLinearPreview] = useState(false);
  const [linearError, setLinearError] = useState<string | null>(null);
  const [manualMaterials, setManualMaterials] = useState<ManualMaterialsState>(() => readStoredManualMaterials(materialsScope));
  const [manualDocuments, setManualDocuments] = useState<VibeRaisingManualDocument[]>(() => readStoredManualMaterials(materialsScope).documents);
  const [loadingManualDocuments, setLoadingManualDocuments] = useState(false);
  const [manualDocumentUploadStatus, setManualDocumentUploadStatus] = useState<"idle" | "creating_session" | "uploading" | "finalizing">("idle");
  const [manualDocumentError, setManualDocumentError] = useState<string | null>(null);
  const [manualMaterialsExpanded, setManualMaterialsExpanded] = useState(false);
  const manualDocumentInputRef = useRef<HTMLInputElement | null>(null);
  const defaultSelectionAppliedRef = useRef(false);
  const slackSelectionTouchedRef = useRef(false);
  const googleAnalyticsSelectionTouchedRef = useRef(false);
  const lumaMetricSelectionTouchedRef = useRef(false);
  const sourceByKey = useMemo(() => new Map(sources.map((source) => [source.key, source])), [sources]);
  const allConnectors = useMemo(() => completeConnectorCatalogue(sources), [sources]);
  const selectedSourceList = useMemo(
    () => allConnectors.filter((source) => isConnectedConnector(source) && selectedSources.has(source.key)),
    [selectedSources, allConnectors],
  );
  const slackChannels = useMemo(() => Object.values(slackChannelsById), [slackChannelsById]);
  const googleAnalyticsProperties = useMemo(() => Object.values(googleAnalyticsPropertiesById), [googleAnalyticsPropertiesById]);
  const selectedManualDocumentIds = useMemo(() => new Set(manualMaterials.manualDocumentIds), [manualMaterials.manualDocumentIds]);
  const hasManualMaterials = Boolean(manualMaterials.manualDocumentIds.length > 0 || manualMaterials.summary.trim());
  const manualMaterialsSummary = hasManualMaterials
    ? [
      manualMaterials.manualDocumentIds.length > 0 ? `${manualMaterials.manualDocumentIds.length} document${manualMaterials.manualDocumentIds.length === 1 ? "" : "s"} selected` : null,
      manualMaterials.summary.trim() ? "summary added" : null,
    ].filter((value): value is string => Boolean(value)).join(" and ")
    : "Upload document or add a short written summary when you want extra context in the draft.";
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
  const googleAnalyticsSource = sourceByKey.get("google_analytics");
  const shouldShowGoogleAnalyticsPreview =
    googleAnalyticsSource?.status === "connected" || googleAnalyticsSource?.status === "syncing" || googleAnalyticsSource?.status === "error";
  const lumaSource = sourceByKey.get("luma");
  const shouldShowLumaPreview =
    lumaSource?.status === "connected" || lumaSource?.status === "syncing" || lumaSource?.status === "error";

  const refreshStatuses = async () => {
    setLoadingStatus(true);
    setStatusMessage(null);
    try {
      const response = await getVibeRaisingInputSourcesStatus(backendBaseUrl);
      setSources(completeConnectorCatalogue(response.sources));
      if (!defaultSelectionAppliedRef.current) {
        defaultSelectionAppliedRef.current = true;
        setSelectedSources(new Set(resolveConnectorSelection(response.sources,
          readConnectorSelection(new URL(next, "http://mlai.local").search))));
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
    let cancelled = false;
    setLoadingManualDocuments(true);
    setManualDocumentError(null);
    listVibeRaisingManualDocuments(backendBaseUrl)
      .then((documents) => {
        if (cancelled) return;
        setManualDocuments(documents);
        setManualMaterials((previous) => {
          const selectedIds = new Set(previous.manualDocumentIds);
          const selectedDocuments = documents.filter((document) => selectedIds.has(document.id));
          const nextMaterials = {
            ...previous,
            manualDocumentIds: selectedDocuments.map((document) => document.id),
            documents: selectedDocuments,
          };
          writeStoredManualMaterials(nextMaterials, materialsScope);
          return nextMaterials;
        });
      })
      .catch((error) => {
        if (!cancelled) {
          setManualDocumentError(error instanceof Error ? error.message : "We couldn't load uploaded documents.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingManualDocuments(false);
      });
    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl]);

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
      setLinearPreview(null);
      setLinearError(null);
      setLoadingLinearPreview(false);
      return;
    }

    let cancelled = false;
    setLoadingLinearPreview(true);
    getVibeRaisingLinearPreview(backendBaseUrl)
      .then((preview) => {
        if (cancelled) return;
        setLinearPreview(preview);
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

  useEffect(() => {
    if (!shouldShowGoogleAnalyticsPreview) {
      setGoogleAnalyticsPropertiesById({});
      setGoogleAnalyticsNextCursor(null);
      setGoogleAnalyticsAccountLabel(null);
      setGoogleAnalyticsError(null);
      setLoadingGoogleAnalyticsProperties(false);
      setLoadingMoreGoogleAnalyticsProperties(false);
      setSelectedGoogleAnalyticsPropertyIds(new Set());
      googleAnalyticsSelectionTouchedRef.current = false;
      return;
    }

    let cancelled = false;
    googleAnalyticsSelectionTouchedRef.current = false;
    setGoogleAnalyticsPropertiesById({});
    setGoogleAnalyticsNextCursor(null);
    setSelectedGoogleAnalyticsPropertyIds(new Set());
    setLoadingGoogleAnalyticsProperties(true);
    setGoogleAnalyticsError(null);
    getVibeRaisingGoogleAnalyticsProperties(backendBaseUrl, { limit: GOOGLE_ANALYTICS_PROPERTY_PAGE_LIMIT })
      .then((payload: VibeRaisingGoogleAnalyticsPropertiesResponse) => {
        if (cancelled) return;
        setGoogleAnalyticsPropertiesById((previous) => mergeGoogleAnalyticsPropertiesById(previous, payload.properties));
        setGoogleAnalyticsNextCursor(payload.nextCursor ?? null);
        setGoogleAnalyticsAccountLabel(payload.accountLabel ?? null);
        const selectedPropertyIds = getSelectedGoogleAnalyticsPropertyIds(payload.properties);
        if (!googleAnalyticsSelectionTouchedRef.current && selectedPropertyIds.length > 0) {
          setSelectedGoogleAnalyticsPropertyIds((previous) => {
            const nextSelected = new Set(previous);
            selectedPropertyIds.forEach((propertyId) => nextSelected.add(propertyId));
            return nextSelected;
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setGoogleAnalyticsError(error instanceof Error ? error.message : "We couldn't load Google Analytics properties.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingGoogleAnalyticsProperties(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowGoogleAnalyticsPreview, googleAnalyticsSource?.status]);

  useEffect(() => {
    if (!shouldShowLumaPreview) {
      setLumaAccountLabel(null);
      setLumaEventsError(null);
      setLoadingLumaEvents(false);
      setSelectedLumaMetricKeys(new Set());
      setLumaAvailableMetrics([]);
      lumaMetricSelectionTouchedRef.current = false;
      return;
    }

    let cancelled = false;
    lumaMetricSelectionTouchedRef.current = false;
    setSelectedLumaMetricKeys(new Set());
    setLoadingLumaEvents(true);
    setLumaEventsError(null);
    getVibeRaisingLumaEvents(backendBaseUrl, { limit: 1 })
      .then((payload: VibeRaisingLumaEventsResponse) => {
        if (cancelled) return;
        setLumaAccountLabel(payload.accountLabel ?? null);
        setLumaAvailableMetrics(payload.availableMetrics);
        if (!lumaMetricSelectionTouchedRef.current) {
          setSelectedLumaMetricKeys(new Set(payload.selectedMetrics));
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setLumaEventsError(error instanceof Error ? error.message : "We couldn't load your Luma settings.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingLumaEvents(false);
      });

    return () => {
      cancelled = true;
    };
  }, [backendBaseUrl, shouldShowLumaPreview, lumaSource?.status, lumaSource?.lastSyncedAt]);

  const connectionReturnPath = (connectingKey?: VibeRaisingInputSourceKey) => {
    const target = new URL(next, "http://mlai.local");
    const keys = new Set(selectedSources);
    if (connectingKey) keys.add(connectingKey);
    target.searchParams.set("inputs", Array.from(keys).join(","));
    const params = new URLSearchParams(location.search);
    params.set("next", `${target.pathname}${target.search}`);
    return `${location.pathname}?${params}`;
  };
  const currentReturnPath = connectionReturnPath();

  const requestConnectSource = (source: VibeRaisingInputSourceSummary) => {
    if (!FUNCTIONAL_SOURCES.has(source.key)) return;
    if (source.status === "connected" || source.status === "syncing" || source.status === "coming_soon") return;
    if (source.status === "unavailable" && !OAUTH_CONNECTABLE_WHEN_STATUS_UNAVAILABLE.has(source.key)) return;
    if (source.key === "luma") {
      // Luma is linked by pasting an API key, not an OAuth redirect.
      setStatusMessage(null);
      setLumaApiKeyValue("");
      setLumaError(null);
      setShowLumaModal(true);
      return;
    }
    setPendingConnectSource(source);
  };

  const handleConnectLuma = async () => {
    const apiKey = lumaApiKeyValue.trim();
    if (!apiKey) {
      setLumaError("Enter your Luma API key.");
      return;
    }
    setLumaConnecting(true);
    setLumaError(null);
    try {
      await connectVibeRaisingLuma(backendBaseUrl, apiKey);
    } catch (error) {
      setLumaError(error instanceof Error ? error.message : "We couldn't connect Luma. Check the key and try again.");
      setLumaConnecting(false);
      return;
    }
    setShowLumaModal(false);
    setSelectedSources(previous => new Set([...previous, "luma"]));
    setLumaApiKeyValue("");
    setLumaConnecting(false);
    await refreshStatuses();
    setStatusMessage("Luma connected. Pulling in your events…");
    try {
      await syncVibeRaisingInputSources(backendBaseUrl, ["luma"]);
      await refreshStatuses();
      setStatusMessage("Luma events synced.");
    } catch {
      setStatusMessage("Luma connected, but we couldn't pull events yet. Try syncing again shortly.");
    }
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
        const bootstrap = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl, { next: connectionReturnPath(source.key) });
        if (bootstrap.googleConnected) {
          await refreshStatuses();
          setSelectedSources(previous => new Set([...previous, source.key]));
          setBusyProvider(null);
          return;
        }
        if (!bootstrap.oauthUrl) {
          throw new Error("Missing Google OAuth redirect URL.");
        }
        window.location.assign(bootstrap.oauthUrl);
        return;
      }

      if (!isOAuthSourceKey(source.key)) return;
      window.location.assign(connectVibeRaisingInputSource(backendBaseUrl, source.key, connectionReturnPath(source.key)));
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : `We couldn't connect ${source.label}.`);
      setBusyProvider(null);
    }
  };

  const showConfiguration = (key: string) => {
    const section = document.getElementById(`configuration-${key}`);
    if (section instanceof HTMLDetailsElement) {
      section.open = true;
      section.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  const handleToggle = (source: VibeRaisingInputSourceSummary) => {
    if (!FUNCTIONAL_SOURCES.has(source.key)) return;
    if (source.status !== "connected" && source.status !== "syncing") return;
    if (source.key === "slack" && selectedSlackChannelIds.size === 0 && !selectedSources.has("slack")) {
      setStatusMessage("Select at least one Slack channel before using Slack in this update.");
      showConfiguration("slack");
      return;
    }
    if (source.key === "google_analytics" && selectedGoogleAnalyticsPropertyIds.size === 0 && !selectedSources.has("google_analytics")) {
      setStatusMessage("Select at least one Google Analytics property before using Google Analytics in this update.");
      showConfiguration("google_analytics");
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

  const handleOpenGmailManagement = (source: VibeRaisingInputSourceSummary) => {
    if (source.key !== "gmail") return;
    setStatusMessage(null);
    setGmailManagementSource(source);
  };

  const handleDisconnectGmail = async (deleteDerivedData: boolean) => {
    setGmailDisconnectAction(deleteDerivedData ? "delete" : "disconnect");
    setStatusMessage(null);
    try {
      const response = await disconnectVibeRaisingGmail(backendBaseUrl, {
        deleteDerivedData,
        reason: "user_request",
      });
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        nextSelected.delete("gmail");
        return nextSelected;
      });
      setGmailPreview(null);
      setGmailPreviewError(null);
      setGmailManagementSource(null);
      await refreshStatuses();
      const warning = response.googleRevocation.warning ? ` ${response.googleRevocation.warning}` : "";
      if (response.status === "not_connected") {
        setStatusMessage("Gmail was already disconnected.");
      } else {
        setStatusMessage(`Gmail disconnected. Deleted ${deletionSummaryText(response.deleted)}.${warning}`);
      }
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't disconnect Gmail.");
    } finally {
      setGmailDisconnectAction(null);
    }
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
      if (xeroRun?.needsReportScopeConfiguration) {
        setStatusMessage("Xero invoices and payments synced. Report metrics are disabled until Profit and Loss and Balance Sheet report scopes are configured.");
      } else if (xeroRun?.needsReportReconnect) {
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

  const handleToggleGoogleAnalyticsProperty = (propertyId: string) => {
    googleAnalyticsSelectionTouchedRef.current = true;
    setSelectedGoogleAnalyticsPropertyIds((previous) => {
      const nextSelected = new Set(previous);
      if (nextSelected.has(propertyId)) {
        nextSelected.delete(propertyId);
      } else {
        nextSelected.add(propertyId);
      }
      return nextSelected;
    });
  };

  const handleLoadMoreGoogleAnalyticsProperties = async () => {
    if (!googleAnalyticsNextCursor || loadingMoreGoogleAnalyticsProperties) return;
    setLoadingMoreGoogleAnalyticsProperties(true);
    setGoogleAnalyticsError(null);
    try {
      const payload = await getVibeRaisingGoogleAnalyticsProperties(backendBaseUrl, {
        cursor: googleAnalyticsNextCursor,
        limit: GOOGLE_ANALYTICS_PROPERTY_PAGE_LIMIT,
      });
      setGoogleAnalyticsPropertiesById((previous) => mergeGoogleAnalyticsPropertiesById(previous, payload.properties));
      setGoogleAnalyticsNextCursor(payload.nextCursor ?? null);
      const selectedPropertyIds = getSelectedGoogleAnalyticsPropertyIds(payload.properties);
      if (!googleAnalyticsSelectionTouchedRef.current && selectedPropertyIds.length > 0) {
        setSelectedGoogleAnalyticsPropertyIds((previous) => {
          const nextSelected = new Set(previous);
          selectedPropertyIds.forEach((propertyId) => nextSelected.add(propertyId));
          return nextSelected;
        });
      }
    } catch (error) {
      setGoogleAnalyticsError(error instanceof Error ? error.message : "We couldn't load more Google Analytics properties.");
    } finally {
      setLoadingMoreGoogleAnalyticsProperties(false);
    }
  };

  const handleSaveGoogleAnalyticsProperties = async () => {
    setSavingGoogleAnalyticsProperties(true);
    setStatusMessage(null);
    try {
      const selectionResponse = await saveVibeRaisingGoogleAnalyticsPropertySelections(
        backendBaseUrl,
        Array.from(selectedGoogleAnalyticsPropertyIds),
      );
      setGoogleAnalyticsPropertiesById((previous) => mergeGoogleAnalyticsPropertiesById(previous, selectionResponse.properties));
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        if (selectedGoogleAnalyticsPropertyIds.size > 0) {
          nextSelected.add("google_analytics");
        } else {
          nextSelected.delete("google_analytics");
        }
        return nextSelected;
      });
      await refreshStatuses();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't save Google Analytics property selection.");
    } finally {
      setSavingGoogleAnalyticsProperties(false);
    }
  };

  const handleToggleLumaMetric = (metricKey: string) => {
    lumaMetricSelectionTouchedRef.current = true;
    setSelectedLumaMetricKeys((previous) => {
      const nextSelected = new Set(previous);
      if (nextSelected.has(metricKey)) {
        nextSelected.delete(metricKey);
      } else {
        nextSelected.add(metricKey);
      }
      return nextSelected;
    });
  };

  const handleSaveLumaSelections = async () => {
    setSavingLumaSelections(true);
    setStatusMessage(null);
    try {
      await saveVibeRaisingLumaSelections(
        backendBaseUrl,
        [],
        Array.from(selectedLumaMetricKeys),
      );
      setStatusMessage("Saved. Updating your Luma metrics…");
      try {
        await syncVibeRaisingInputSources(backendBaseUrl, ["luma"]);
      } catch {
        // Sync is best-effort; the metric preferences are already saved.
      }
      await refreshStatuses();
      setStatusMessage("Luma metrics updated.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "We couldn't save your Luma metrics.");
    } finally {
      setSavingLumaSelections(false);
    }
  };

  const handleSyncLinear = async () => {
    setSyncingLinear(true);
    setStatusMessage(null);
    try {
      setSelectedSources((previous) => {
        const nextSelected = new Set(previous);
        nextSelected.add("linear");
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

  const navigateToDraft = () => {
    writeStoredManualMaterials(manualMaterials, materialsScope);
    const target = new URL(next, "http://mlai.local");
    const draftSources = new Set(selectedSourceList.map(source => source.key));
    if (hasManualMaterials) {
      draftSources.add("manual_documents");
    }
    if (draftSources.size > 0) {
      target.searchParams.set("inputs", Array.from(draftSources).join(","));
    } else {
      target.searchParams.set("inputs", "");
    }
    navigate(`${target.pathname}${target.search}`);
  };

  const updateManualMaterials = (patch: Partial<ManualMaterialsState>) => {
    setManualMaterials((previous) => {
      const nextMaterials = { ...previous, ...patch };
      writeStoredManualMaterials(nextMaterials, materialsScope);
      return nextMaterials;
    });
  };

  const updateManualDocumentSelection = (document: VibeRaisingManualDocument, selected: boolean) => {
    setManualMaterials((previous) => {
      const idSet = new Set(previous.manualDocumentIds);
      if (selected) {
        idSet.add(document.id);
      } else {
        idSet.delete(document.id);
      }
      const documentsById = new Map([...manualDocuments, ...previous.documents, document].map((item) => [item.id, item]));
      const nextMaterials = {
        ...previous,
        manualDocumentIds: Array.from(idSet),
        documents: Array.from(idSet)
          .map((documentId) => documentsById.get(documentId))
          .filter((item): item is VibeRaisingManualDocument => Boolean(item)),
      };
      writeStoredManualMaterials(nextMaterials, materialsScope);
      return nextMaterials;
    });
  };

  const clearManualMaterials = () => {
    updateManualMaterials({ summary: "", manualDocumentIds: [], documents: [] });
  };

  const handleManualDocumentFile = async (file: File | null | undefined) => {
    if (!file) return;
    setManualDocumentError(null);
    try {
      const document = await uploadVibeRaisingManualDocument(
        backendBaseUrl,
        file,
        undefined,
        setManualDocumentUploadStatus,
      );
      setManualDocuments((previous) => [document, ...previous.filter((item) => item.id !== document.id)]);
      updateManualDocumentSelection(document, true);
    } catch (error) {
      setManualDocumentError(error instanceof Error ? error.message : "We couldn't upload that document.");
    } finally {
      setManualDocumentUploadStatus("idle");
      if (manualDocumentInputRef.current) {
        manualDocumentInputRef.current.value = "";
      }
    }
  };

  const handleDeleteManualDocument = async (document: VibeRaisingManualDocument) => {
    setManualDocumentError(null);
    try {
      await deleteVibeRaisingManualDocument(backendBaseUrl, document.id);
      setManualDocuments((previous) => previous.filter((item) => item.id !== document.id));
      updateManualDocumentSelection(document, false);
    } catch (error) {
      setManualDocumentError(error instanceof Error ? error.message : "We couldn't delete that document.");
    }
  };

  const handleOpenManualDocument = async (document: VibeRaisingManualDocument) => {
    setManualDocumentError(null);
    try {
      const response = await getVibeRaisingManualDocumentDownloadUrl(backendBaseUrl, document.id);
      window.open(response.downloadUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setManualDocumentError(error instanceof Error ? error.message : "We couldn't open that document.");
    }
  };

  return (
    <VibeRaisingWorkflowLayout variant="gallery" activeStep="connect">
    <div className="update-editor update-gallery connections-page">
      <header className="update-editor-header">
        <div>
          <button type="button" className="update-back" onClick={() => navigateToDraft()}>← Back to update</button>
          <h1>Connections</h1>
          <p className="connections-intro">Your tools. Your story. Choose what goes into your update.</p>
        </div>
        <button type="button" className="connections-refresh" disabled={loadingStatus} onClick={() => void refreshStatuses()}>
          <ArrowPathIcon className={`h-4 w-4 ${loadingStatus ? "motion-safe:animate-spin" : ""}`} />
          {loadingStatus ? "Checking…" : "Refresh"}
        </button>
      </header>
      {statusMessage && <p className="update-notice" role="status">{statusMessage}</p>}
      <section aria-labelledby="connections-heading">
        <div className="connections-section-heading">
          <h2 id="connections-heading">Your sources</h2>
          <span>{allConnectors.filter(isConnectedConnector).length} connected · {selectedSourceList.length} on</span>
        </div>
        <p className="connections-help">Turn a connected source on to include it. Turning it off keeps your account connected.</p>
        <div className="connections-grid">
          {allConnectors.map(source => <div key={source.key} id={`source-${source.key}`}>
            <ConnectorTile source={source} selected={selectedSources.has(source.key)} detailed
              disabled={loadingStatus} busy={busyProvider === source.key || (source.key === "luma" && lumaConnecting)}
              onToggle={handleToggle} onConnect={requestConnectSource} />
          </div>)}
        </div>
        <p className="connections-finance-note">Earning revenue? Stripe and Xero bring in financial figures that stay linked to their source and read-only.</p>
          <div className="connections-materials">
            <ManualMaterialsCard
              expanded={manualMaterialsExpanded}
              hasManualMaterials={hasManualMaterials}
            summary={manualMaterialsSummary}
            onToggle={() => setManualMaterialsExpanded((value) => !value)}
          />

          {manualMaterialsExpanded ? (
            <div
              id="manual-materials-panel"
              className="col-span-1 space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:col-span-2 lg:col-span-4 lg:p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-slate-500">
                  Upload document or add a short written summary for extra context.
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

              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div>
                <span className="mb-1.5 flex items-center gap-2 text-sm font-bold text-gray-700">
                    <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                    Documents
                </span>
                  <input
                    ref={manualDocumentInputRef}
                    type="file"
                    className="sr-only"
                    accept=".pdf,.docx,.pptx,.xlsx,.xlsm,.csv,.txt,.md,.html,.htm,.rtf,.odt"
                    onChange={(event) => void handleManualDocumentFile(event.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => manualDocumentInputRef.current?.click()}
                    onDragOver={(event) => {
                      event.preventDefault();
                      event.dataTransfer.dropEffect = "copy";
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      void handleManualDocumentFile(event.dataTransfer.files?.[0]);
                    }}
                    disabled={manualDocumentUploadStatus !== "idle"}
                    className="flex min-h-36 w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-[var(--vr-color-primary)] hover:bg-[rgba(0,255,215,0.08)] disabled:cursor-wait disabled:opacity-70"
                  >
                    <CloudArrowUpIcon className="h-8 w-8 text-[var(--vr-color-primary)]" />
                    <span className="mt-3 text-sm font-extrabold text-gray-900">
                      {manualDocumentUploadStatus === "idle" ? "Upload a document" : "Uploading document..."}
                    </span>
                    <span className="mt-1 text-xs font-medium text-slate-500">
                      PDF, DOCX, PPTX, XLSX, CSV, TXT, MD, HTML, RTF, or ODT up to 25 MB.
                    </span>
                  </button>
                  {manualDocumentError ? (
                    <p className="mt-2 text-sm font-semibold text-red-600">{manualDocumentError}</p>
                  ) : null}
                  <div className="mt-3 space-y-2">
                    {loadingManualDocuments ? (
                      <p className="text-sm font-semibold text-slate-500">Loading uploaded documents...</p>
                    ) : manualDocuments.length > 0 ? (
                      manualDocuments.map((document) => {
                        const selected = selectedManualDocumentIds.has(document.id);
                        return (
                          <div
                            key={document.id}
                            className={clsx(
                              "flex items-center justify-between gap-3 rounded-xl border px-3 py-2",
                              selected ? "border-[rgba(0,255,215,0.34)] bg-[rgba(0,255,215,0.08)]" : "border-gray-200 bg-white",
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => updateManualDocumentSelection(document, !selected)}
                              className="min-w-0 flex-1 text-left"
                            >
                              <p className="truncate text-sm font-extrabold text-gray-900">{document.originalFilename}</p>
                              <p className="mt-0.5 text-xs font-medium text-slate-500">
                                {document.extractionStatus === "processed" ? "Ready for AI context" : document.extractionStatus}
                              </p>
                            </button>
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                onClick={() => void handleOpenManualDocument(document)}
                                className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-bold text-gray-600 transition hover:bg-gray-50"
                              >
                                Open
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeleteManualDocument(document)}
                                className="rounded-lg border border-red-100 px-2 py-1 text-xs font-bold text-red-600 transition hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm font-semibold text-slate-500">No uploaded documents yet.</p>
                    )}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-gray-700">Short summary</span>
                  <textarea
                    value={manualMaterials.summary}
                    onChange={(event) => updateManualMaterials({ summary: event.target.value })}
                    rows={4}
                    placeholder="Topline context the community should read before the detailed sections..."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
                  />
                </label>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {shouldShowGoogleAnalyticsPreview ? (
        <details className="connections-detail" id="configuration-google_analytics"><summary>Google Analytics · Properties</summary><div className="connections-detail-body">
        <GoogleAnalyticsPreview
          properties={googleAnalyticsProperties}
          accountLabel={googleAnalyticsAccountLabel ?? googleAnalyticsSource?.accountLabel ?? null}
          loading={loadingGoogleAnalyticsProperties}
          error={googleAnalyticsError}
          saving={savingGoogleAnalyticsProperties}
          selectedPropertyIds={selectedGoogleAnalyticsPropertyIds}
          nextCursor={googleAnalyticsNextCursor}
          loadingMore={loadingMoreGoogleAnalyticsProperties}
          onToggleProperty={handleToggleGoogleAnalyticsProperty}
          onLoadMore={() => void handleLoadMoreGoogleAnalyticsProperties()}
          onSave={() => void handleSaveGoogleAnalyticsProperties()}
        />
        </div></details>
      ) : null}

      {shouldShowLumaPreview ? (
        <details className="connections-detail" id="configuration-luma"><summary>Luma · Event metrics</summary><div className="connections-detail-body">
        <LumaPreview
          accountLabel={lumaAccountLabel ?? lumaSource?.accountLabel ?? null}
          loading={loadingLumaEvents}
          error={lumaEventsError}
          saving={savingLumaSelections}
          selectedMetricKeys={selectedLumaMetricKeys}
          availableMetrics={lumaAvailableMetrics}
          onToggleMetric={handleToggleLumaMetric}
          onSave={() => void handleSaveLumaSelections()}
        />
        </div></details>
      ) : null}

      {shouldShowSlackPreview ? (
        <details className="connections-detail" id="configuration-slack"><summary>Slack · Channels & sync</summary><div className="connections-detail-body">
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
        </div></details>
      ) : null}

      {shouldShowLinearPreview ? (
        <details className="connections-detail" id="configuration-linear"><summary>Linear · Projects & sync</summary><div className="connections-detail-body">
        <LinearPreview
          preview={linearPreview}
          loading={loadingLinearPreview}
          error={linearError}
          syncing={syncingLinear}
          onSync={() => void handleSyncLinear()}
        />
        </div></details>
      ) : null}

      {shouldShowXeroPreview ? (
        <details className="connections-detail" id="configuration-xero"><summary>Xero · Financial data</summary><div className="connections-detail-body">
        <XeroPreview
          preview={xeroPreview}
          loading={loadingXeroPreview}
          error={xeroPreviewError}
          syncing={syncingFinance}
          onSync={() => void handleSyncFinance(["xero"])}
          reconnectHref={connectVibeRaisingInputSource(backendBaseUrl, "xero", currentReturnPath)}
        />
        </div></details>
      ) : null}

      {shouldShowBankFeedPreview ? (
        <details className="connections-detail" id="configuration-bank_feed"><summary>Bank Feed · Transactions</summary><div className="connections-detail-body">
        <BankFeedPreview
          preview={bankFeedPreview}
          loading={loadingBankFeedPreview}
          error={bankFeedPreviewError}
        />
        </div></details>
      ) : null}

      {shouldShowGmailPreview && <details className="connections-detail" id="configuration-gmail">
        <summary>Gmail · Account & data</summary><div className="connections-detail-body">
          <GmailPreview preview={gmailPreview} loading={loadingGmailPreview} error={gmailPreviewError} />
          {gmailSource && <button type="button" className="update-button secondary" onClick={() => handleOpenGmailManagement(gmailSource)}>Manage Gmail connection</button>}
        </div>
      </details>}
      <p className="connections-privacy"><LockClosedIcon className="h-4 w-4" /> Connected data stays private while you draft. <Link to="/privacy" target="_blank" rel="noreferrer">Privacy policy ↗</Link></p>
      <div className="update-actions">
        <span className="update-action-status">{selectedSourceList.length} source{selectedSourceList.length === 1 ? "" : "s"} on{hasManualMaterials ? " · Extra context added" : ""}</span>
        <button type="button" className="update-button" onClick={() => navigateToDraft()}>Return to update <ArrowRightIcon className="h-4 w-4" /></button>
      </div>

      {gmailManagementSource ? (
        <GmailManagementModal
          source={gmailManagementSource}
          busyAction={gmailDisconnectAction}
          onClose={() => {
            if (gmailDisconnectAction === null) setGmailManagementSource(null);
          }}
          onDisconnect={(deleteDerivedData) => void handleDisconnectGmail(deleteDerivedData)}
        />
      ) : null}

      {pendingConnectSource ? (
        <div className="connections-modal fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
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
                    We only use the authorized data needed for your monthly update workflow. Only you can see this connected data in your workspace until you publish an update.
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
                  {[
                    "Only founders and teammates with access to this workspace can see connected data.",
                    `For ${pendingConnectSource.label}, we only scan ${sourceScanSummary(pendingConnectSource)}.`,
                    "We store synced context, generated metrics, and draft materials in this workspace so you can keep editing.",
                    pendingConnectSource.key === "gmail"
                      ? "You can disconnect Gmail anytime, and this screen can also delete Gmail-derived drafts, events, and metrics."
                      : "You can disconnect this source anytime, and connectors with deletion support let you remove stored data from this screen.",
                  ].map((item) => (
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

      {showLumaModal ? (
        <div className="connections-modal fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-start gap-4">
                <SourceLogo sourceKey="luma" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--vr-color-primary)]">
                    Connect with an API key
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-gray-950">Connect Luma</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Paste your personal Luma API key. We use it to pull how many events you've run and total
                    registrations into your tracked metrics. The key is stored encrypted and only you can see this data.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!lumaConnecting) setShowLumaModal(false);
                  }}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-gray-50 hover:text-gray-700"
                  aria-label="Cancel Luma connection"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-6 py-5">
              <label htmlFor="luma-api-key" className="block text-sm font-extrabold text-gray-950">
                Luma API key
              </label>
              <input
                id="luma-api-key"
                type="password"
                autoComplete="off"
                value={lumaApiKeyValue}
                onChange={(event) => setLumaApiKeyValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !lumaConnecting) void handleConnectLuma();
                }}
                placeholder="secret-xxxxxxxxxxxxxxxxxxxx"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-950 shadow-sm outline-none focus:border-[var(--vr-color-primary)] focus:ring-2 focus:ring-[rgba(0,128,128,0.18)]"
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Find this in Luma under Settings → API. Use the calendar that hosts the events you run.
              </p>
              {lumaError ? (
                <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{lumaError}</p>
              ) : null}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!lumaConnecting) setShowLumaModal(false);
                }}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={lumaConnecting || !lumaApiKeyValue.trim()}
                onClick={() => void handleConnectLuma()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {lumaConnecting ? "Connecting…" : "Connect Luma"}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
    </VibeRaisingWorkflowLayout>
  );
}
