import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Eye,
  Loader2,
  MousePointerClick,
  RefreshCw,
  Search,
} from "lucide-react";
import { clsx } from "clsx";

import {
  AI_REFERRAL_CAVEAT,
  getVibeMarketingAnalyticsStatus,
  getVibeMarketingAnalyticsSummary,
  getVibeMarketingArticleAnalytics,
  isVibeMarketingAnalyticsEndpointUnavailable,
  setVibeMarketingAnalyticsEnabled,
  verifyVibeMarketingAnalyticsGsc,
  vibeMarketingAnalyticsErrorMessage,
} from "~/lib/vibe-marketing-analytics";
import type {
  VibeMarketingAnalyticsSource,
  VibeMarketingAnalyticsStatus,
  VibeMarketingAnalyticsSummary,
  VibeMarketingAnalyticsTotals,
  VibeMarketingArticleAnalytics,
} from "~/lib/vibe-marketing-analytics";

type LoadingState = "loading" | "ready" | "unavailable" | "error";

function formatCount(value: number | null): string {
  return value === null ? "—" : new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value);
}

function rateAsPercent(value: number): number {
  return Math.abs(value) <= 1 ? value * 100 : value;
}

function formatRate(value: number | null): string {
  if (value === null) return "—";
  const percent = rateAsPercent(value);
  return `${new Intl.NumberFormat("en-AU", { maximumFractionDigits: percent < 10 ? 1 : 0 }).format(percent)}%`;
}

function formatPosition(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 }).format(value);
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function ratioLabel(value: number | null, visits: number | null): string | null {
  if (value === null || visits === null || visits <= 0) return null;
  return `${formatRate(value / visits)} of visits`;
}

function MetricCard({
  label,
  value,
  detail,
  tone = "slate",
}: {
  label: string;
  value: string;
  detail?: string | null;
  tone?: "slate" | "violet" | "emerald" | "blue";
}) {
  const toneClasses = {
    slate: "bg-slate-50 text-slate-950",
    violet: "bg-violet-50 text-violet-950",
    emerald: "bg-emerald-50 text-emerald-950",
    blue: "bg-blue-50 text-blue-950",
  } as const;
  return (
    <div className={clsx("min-w-0 rounded-xl px-4 py-3", toneClasses[tone])}>
      <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 truncate text-xl font-black">{value}</p>
      {detail ? <p className="mt-1 text-[11px] font-bold text-slate-500">{detail}</p> : null}
    </div>
  );
}

function TotalsGrid({ totals, compact = false }: { totals: VibeMarketingAnalyticsTotals; compact?: boolean }) {
  const cards = [
    { label: "Search impressions", value: formatCount(totals.searchImpressions), tone: "blue" as const },
    { label: "Search clicks", value: formatCount(totals.searchClicks), tone: "blue" as const },
    { label: "Search CTR", value: formatRate(totals.searchCtr), tone: "blue" as const },
    { label: "Avg. position", value: formatPosition(totals.averagePosition), tone: "blue" as const },
    { label: "Visits", value: formatCount(totals.visits), tone: "slate" as const },
    {
      label: "Engaged 30s",
      value: formatCount(totals.engaged30),
      detail: ratioLabel(totals.engaged30, totals.visits),
      tone: "violet" as const,
    },
    {
      label: "Scrolled 50%",
      value: formatCount(totals.scroll50),
      detail: ratioLabel(totals.scroll50, totals.visits),
      tone: "violet" as const,
    },
    {
      label: "Scrolled 90%",
      value: formatCount(totals.scroll90),
      detail: ratioLabel(totals.scroll90, totals.visits),
      tone: "violet" as const,
    },
    { label: "CTA impressions", value: formatCount(totals.ctaImpressions), tone: "emerald" as const },
    { label: "CTA clicks", value: formatCount(totals.ctaClicks), tone: "emerald" as const },
    { label: "CTA conversion", value: formatRate(totals.ctaConversionRate), tone: "emerald" as const },
  ];

  return (
    <div className={clsx("grid grid-cols-2 gap-2", compact ? "sm:grid-cols-4" : "") }>
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}

function TrafficSources({ sources }: { sources: VibeMarketingAnalyticsSource[] }) {
  const maxVisits = Math.max(1, ...sources.map((source) => source.visits));
  if (!sources.length) {
    return <p className="rounded-xl bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-500">No source data has arrived yet.</p>;
  }

  return (
    <div className="space-y-3">
      {sources.slice(0, 6).map((source) => (
        <div key={source.key}>
          <div className="flex items-center justify-between gap-3 text-xs font-bold">
            <span className="flex min-w-0 items-center gap-2 text-slate-700">
              <span className="truncate">{source.label}</span>
              {source.isAi ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-black text-violet-700">
                  <Bot className="h-3 w-3" /> AI
                </span>
              ) : null}
            </span>
            <span className="shrink-0 text-slate-500">
              {formatCount(source.visits)} visits{source.share !== null ? ` · ${formatRate(source.share)}` : ""}
              {source.ctaClicks > 0 ? ` · ${formatCount(source.ctaClicks)} CTA clicks` : ""}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={clsx("h-full rounded-full", source.isAi ? "bg-violet-500" : "bg-slate-700")}
              style={{ width: `${Math.max(4, (source.visits / maxVisits) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchQueries({ queries }: { queries: VibeMarketingArticleAnalytics["queries"] }) {
  if (!queries.length) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Top Google queries (best effort)</p>
      <div className="overflow-hidden rounded-lg border border-slate-100">
        {queries.slice(0, 10).map((query) => (
          <div key={query.query} className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 border-b border-slate-100 px-3 py-2 text-xs last:border-b-0">
            <span className="truncate font-bold text-slate-700">{query.query}</span>
            <span className="font-semibold text-slate-500">{formatCount(query.clicks)} clicks</span>
            <span className="font-semibold text-slate-500">{formatRate(query.ctr)} CTR</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FreshnessLine({ summary }: { summary: VibeMarketingAnalyticsSummary }) {
  const analyticsThrough = formatDate(summary.freshness.analyticsDataThrough);
  const searchThrough = formatDate(summary.freshness.searchDataThrough);
  const updatedAt = formatDate(summary.freshness.updatedAt);
  const parts = [
    analyticsThrough ? `On-page data through ${analyticsThrough}` : null,
    searchThrough ? `Search data through ${searchThrough}` : null,
    !analyticsThrough && !searchThrough && updatedAt ? `Updated ${updatedAt}` : null,
  ].filter(Boolean);

  return (
    <div
      className={clsx(
        "flex items-start gap-2 rounded-lg px-3 py-2 text-xs font-bold",
        summary.freshness.stale ? "bg-amber-50 text-amber-800" : "bg-slate-50 text-slate-500",
      )}
    >
      <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>
        {summary.freshness.message || parts.join(" · ") || "Waiting for the first analytics sync."}
        {searchThrough ? " Search Console data is finalized later than on-page events." : ""}
      </span>
    </div>
  );
}

function ArticleHeadlineMetrics({ totals }: { totals: VibeMarketingAnalyticsTotals }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
      <div className="rounded-lg bg-blue-50 px-2 py-2">
        <p className="text-[10px] font-black uppercase text-blue-700">Search clicks</p>
        <p className="mt-1 text-sm font-black text-slate-950">{formatCount(totals.searchClicks)}</p>
      </div>
      <div className="rounded-lg bg-violet-50 px-2 py-2">
        <p className="text-[10px] font-black uppercase text-violet-700">Visits</p>
        <p className="mt-1 text-sm font-black text-slate-950">{formatCount(totals.visits)}</p>
      </div>
      <div className="rounded-lg bg-emerald-50 px-2 py-2">
        <p className="text-[10px] font-black uppercase text-emerald-700">CTA rate</p>
        <p className="mt-1 text-sm font-black text-slate-950">{formatRate(totals.ctaConversionRate)}</p>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-5">
      <p className="text-sm font-black text-rose-800">Article performance is temporarily unavailable.</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-rose-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black text-rose-700 shadow-sm"
      >
        <RefreshCw className="h-3.5 w-3.5" /> Try again
      </button>
    </div>
  );
}

export default function VibeMarketingAnalyticsPerformance({ companyId }: { companyId?: string | null }) {
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [status, setStatus] = useState<VibeMarketingAnalyticsStatus | null>(null);
  const [summary, setSummary] = useState<VibeMarketingAnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<"enable" | "gsc" | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [articleDetails, setArticleDetails] = useState<Record<string, VibeMarketingArticleAnalytics>>({});
  const [articleLoadingId, setArticleLoadingId] = useState<string | null>(null);
  const [articleErrors, setArticleErrors] = useState<Record<string, string>>({});

  const options = useMemo(() => ({ companyId }), [companyId]);

  const load = useCallback(async () => {
    setLoadingState("loading");
    setError(null);
    try {
      const nextStatus = await getVibeMarketingAnalyticsStatus(options);
      setStatus(nextStatus);
      if (!nextStatus.available) {
        setSummary(null);
        setLoadingState("unavailable");
        return;
      }
      if (!nextStatus.enabled) {
        setSummary(null);
        setLoadingState("ready");
        return;
      }
      const nextSummary = await getVibeMarketingAnalyticsSummary("28d", options);
      setSummary(nextSummary);
      setLoadingState("ready");
    } catch (loadError) {
      if (isVibeMarketingAnalyticsEndpointUnavailable(loadError)) {
        setLoadingState("unavailable");
        setError(null);
        return;
      }
      setError(vibeMarketingAnalyticsErrorMessage(loadError));
      setLoadingState("error");
    }
  }, [options]);

  useEffect(() => {
    void load();
  }, [load]);

  const enableAnalytics = useCallback(
    async () => {
      setAction("enable");
      setActionMessage(null);
      try {
        await setVibeMarketingAnalyticsEnabled(true, options);
        await load();
      } catch (actionError) {
        setActionMessage(vibeMarketingAnalyticsErrorMessage(actionError, "Analytics could not be enabled."));
      } finally {
        setAction(null);
      }
    },
    [load, options],
  );

  const verifyGsc = useCallback(async () => {
    setAction("gsc");
    setActionMessage(null);
    try {
      const gsc = await verifyVibeMarketingAnalyticsGsc(options);
      setStatus((current) => (current ? { ...current, gsc } : current));
      setActionMessage(gsc.message || (gsc.connected ? "Search Console access verified." : "Search Console access is not available yet."));
    } catch (verifyError) {
      setActionMessage(vibeMarketingAnalyticsErrorMessage(verifyError, "Search Console access could not be verified."));
    } finally {
      setAction(null);
    }
  }, [options]);

  const toggleArticle = useCallback(
    async (articleId: string) => {
      if (expandedArticleId === articleId) {
        setExpandedArticleId(null);
        return;
      }
      setExpandedArticleId(articleId);
      if (articleDetails[articleId]) return;
      setArticleLoadingId(articleId);
      setArticleErrors((current) => {
        const next = { ...current };
        delete next[articleId];
        return next;
      });
      try {
        const detail = await getVibeMarketingArticleAnalytics(articleId, "90d", options);
        setArticleDetails((current) => ({ ...current, [articleId]: detail }));
      } catch (detailError) {
        setArticleErrors((current) => ({
          ...current,
          [articleId]: vibeMarketingAnalyticsErrorMessage(detailError, "The 90-day article detail could not be loaded."),
        }));
      } finally {
        setArticleLoadingId((current) => (current === articleId ? null : current));
      }
    },
    [articleDetails, expandedArticleId, options],
  );

  if (loadingState === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-5 text-sm font-bold text-slate-600">
        <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
        Checking analytics status…
      </div>
    );
  }

  if (loadingState === "unavailable") {
    return (
      <div className="rounded-xl bg-slate-50 px-4 py-5">
        <p className="text-sm font-black text-slate-950">Performance analytics is being prepared.</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          This dashboard will appear here as soon as analytics support is enabled for your Content Factory site. Your articles and the rest of this page still work normally.
        </p>
      </div>
    );
  }

  if (loadingState === "error") {
    return <ErrorState message={error || "The analytics service did not respond."} onRetry={() => void load()} />;
  }

  const statusName = status?.status.toLowerCase() || "";
  const provisioning = statusName === "provisioning" || statusName === "pending";
  const provisioningFailed = statusName === "error";
  if (!status?.enabled || provisioning || provisioningFailed) {
    return (
      <div className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-5">
        <p className="text-sm font-black text-violet-950">
          {provisioning
            ? "Analytics setup is in progress."
            : provisioningFailed
              ? "Analytics setup needs another attempt."
              : "Measure how your published articles perform."}
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-violet-800">
          {status?.message ||
            (provisioning
              ? "Provisioning can take a few minutes. Refresh to check again."
              : provisioningFailed
                ? "The analytics service could not finish provisioning. Retry after checking its configuration."
                : "Turn on anonymous article analytics to see search visibility, reading depth, and CTA clicks. No visitor profiles are shown here.")}
        </p>
        <button
          type="button"
          disabled={action !== null}
          onClick={() => (provisioning ? void load() : void enableAnalytics())}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-xs font-black text-white disabled:opacity-50"
        >
          {action === "enable" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : provisioning ? <RefreshCw className="h-3.5 w-3.5" /> : <Activity className="h-3.5 w-3.5" />}
          {provisioning
            ? "Check setup"
            : action === "enable"
              ? provisioningFailed
                ? "Retrying…"
                : "Enabling…"
              : provisioningFailed
                ? "Retry analytics setup"
                : "Enable article analytics"}
        </button>
        {actionMessage ? <p className="mt-3 text-xs font-bold text-rose-700">{actionMessage}</p> : null}
      </div>
    );
  }

  if (!summary) {
    return <ErrorState message="Analytics is enabled, but no summary was returned." onRetry={() => void load()} />;
  }

  const hasAnyData = Object.values(summary.totals).some((value) => value !== null && value > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-violet-700">Last 28 days</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Anonymous, aggregate results from Content Factory article pages only.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 hover:bg-slate-50"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      <FreshnessLine summary={summary} />

      {!status.collecting ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
          <p className="text-sm font-black text-amber-950">The article scaffold still needs its analytics update.</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-amber-800">
            {status.message ||
              "Analytics is provisioned, but visits will not be reported reliably until the existing Content Factory article scaffold is rebuilt and published."}
          </p>
        </div>
      ) : null}

      {!hasAnyData ? (
        <div className="rounded-xl bg-slate-50 px-4 py-5 text-sm font-semibold leading-6 text-slate-500">
          Analytics is enabled and waiting for the first published-article visit. Search Console figures can take two to three days to finalize.
        </div>
      ) : null}

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-black text-slate-950">Search, engagement, and calls to action</h3>
        </div>
        <TotalsGrid totals={summary.totals} />
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Eye className="h-4 w-4 text-violet-600" />
          <h3 className="text-sm font-black text-slate-950">Where article visits came from</h3>
        </div>
        <TrafficSources sources={summary.sources} />
        <p className="mt-4 rounded-lg border border-violet-100 bg-violet-50 px-3 py-3 text-xs font-semibold leading-5 text-violet-800">
          {AI_REFERRAL_CAVEAT}
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-950">Published article results</h3>
          </div>
          <span className="text-xs font-bold text-slate-400">{summary.articles.length} tracked</span>
        </div>
        {summary.articles.length ? (
          <div className="space-y-3">
            {summary.articles.map((article) => {
              const expanded = expandedArticleId === article.id;
              const detail = articleDetails[article.id];
              const detailError = articleErrors[article.id];
              return (
                <article key={article.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-black leading-5 text-slate-950">{article.title}</p>
                      {article.url ? (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block truncate text-xs font-bold text-violet-700 hover:underline"
                        >
                          {article.slug || article.url}
                        </a>
                      ) : article.slug ? (
                        <p className="mt-1 truncate text-xs font-bold text-slate-400">{article.slug}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => void toggleArticle(article.id)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] font-black text-slate-600 hover:bg-slate-100"
                    >
                      90 days
                      {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <ArticleHeadlineMetrics totals={article.totals} />
                  {expanded ? (
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      {articleLoadingId === article.id ? (
                        <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-600" /> Loading 90-day results…
                        </p>
                      ) : detailError ? (
                        <p className="text-xs font-bold text-rose-700">{detailError}</p>
                      ) : detail ? (
                        <div className="space-y-4">
                          <TotalsGrid totals={detail.totals} compact />
                          {detail.sources.length ? <TrafficSources sources={detail.sources} /> : null}
                          <SearchQueries queries={detail.queries} />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-500">
            No published article has reported performance data yet.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex items-start gap-3">
          <span className={clsx("mt-0.5", status.gsc.connected ? "text-emerald-600" : "text-slate-400")}>
            {status.gsc.connected ? <CheckCircle2 className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-950">
              {status.gsc.connected ? "Search Console connected" : "Check Search Console access"}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
              {status.gsc.property || status.gsc.message || "Verify that MLAI's service account can read this website's Search Console property."}
            </p>
          </div>
          <button
            type="button"
            disabled={action !== null}
            onClick={() => void verifyGsc()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-black text-slate-700 disabled:opacity-50"
          >
            {action === "gsc" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Verify
          </button>
        </div>
        {actionMessage ? <p className="mt-3 text-xs font-bold text-slate-600">{actionMessage}</p> : null}
      </div>

    </div>
  );
}
