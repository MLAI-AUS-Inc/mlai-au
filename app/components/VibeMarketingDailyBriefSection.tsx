import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Newspaper, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

import {
  getVibeMarketingAnalyticsReport,
  getVibeMarketingAnalyticsReports,
  isVibeMarketingAnalyticsEndpointUnavailable,
  vibeMarketingAnalyticsErrorMessage,
} from "~/lib/vibe-marketing-analytics";
import type {
  VibeMarketingReportArticle,
  VibeMarketingReportDetail,
  VibeMarketingReportSummary,
} from "~/lib/vibe-marketing-analytics";

type LoadingState = "loading" | "ready" | "unavailable" | "error";

const CATEGORY_ORDER = [
  "top_performer",
  "high_interest",
  "needs_attention",
  "gathering_data",
] as const;

const CATEGORY_META: Record<string, { label: string; chip: string }> = {
  top_performer: { label: "Top performers", chip: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  high_interest: { label: "High-interest opportunities", chip: "bg-violet-50 text-violet-700 border-violet-200" },
  needs_attention: { label: "Needs attention", chip: "bg-amber-50 text-amber-700 border-amber-200" },
  gathering_data: { label: "Gathering data", chip: "bg-slate-50 text-slate-600 border-slate-200" },
};

function formatCount(value: number | null): string {
  return value === null
    ? "—"
    : new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value);
}

function formatRate(value: number | null): string {
  if (value === null) return "—";
  const percent = Math.abs(value) <= 1 ? value * 100 : value;
  return `${new Intl.NumberFormat("en-AU", {
    maximumFractionDigits: percent > 0 && percent < 10 ? 1 : 0,
  }).format(percent)}%`;
}

function formatDelta(value: number | null): string | null {
  if (value === null || value === 0) return null;
  return value > 0 ? `+${formatCount(value)}` : formatCount(value);
}

function formatReportDate(value: string | null): string {
  if (!value) return "Unknown date";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short" }).format(date);
}

function lastSeenStorageKey(companyId?: string | null): string {
  return `vm-daily-brief-last-seen:${companyId ?? "default"}`;
}

function readLastSeen(companyId?: string | null): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(lastSeenStorageKey(companyId)) ?? "";
  } catch {
    return "";
  }
}

function writeLastSeen(companyId: string | null | undefined, reportDate: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(lastSeenStorageKey(companyId), reportDate);
  } catch {
    // Private-mode storage failures only cost the badge.
  }
}

function HeadlineTile({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string | null;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
      <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-black text-slate-950">{value}</span>
        {delta ? (
          <span
            className={clsx(
              "text-xs font-bold",
              delta.startsWith("+") ? "text-emerald-600" : "text-rose-600",
            )}
          >
            {delta} vs prior
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ArticleRow({ article }: { article: VibeMarketingReportArticle }) {
  return (
    <div className="border-b border-slate-100 px-3 py-3 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="min-w-0 flex-1">
          {article.url ? (
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-slate-900 underline-offset-2 hover:underline"
            >
              {article.title}
            </a>
          ) : (
            <span className="text-sm font-bold text-slate-900">{article.title}</span>
          )}
        </div>
        <div className="flex shrink-0 gap-4 text-xs font-semibold text-slate-600">
          <span>{formatCount(article.visits)} visits</span>
          <span>{formatRate(article.engagedReaderRate)} engaged</span>
          <span>{formatRate(article.ctaConversionRate)} CTA conv.</span>
        </div>
      </div>
      {article.reasons.length > 0 ? (
        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
          {article.reasons.join(" ")}
        </p>
      ) : null}
    </div>
  );
}

function ReportBody({ report }: { report: VibeMarketingReportDetail }) {
  const headline = report.headline;
  const grouped = useMemo(() => {
    const groups = new Map<string, VibeMarketingReportArticle[]>();
    for (const article of report.articles) {
      const key = CATEGORY_META[article.category] ? article.category : "gathering_data";
      const bucket = groups.get(key) ?? [];
      bucket.push(article);
      groups.set(key, bucket);
    }
    return groups;
  }, [report.articles]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <HeadlineTile
          label="Human-like visits"
          value={formatCount(headline.humanVisits)}
          delta={formatDelta(headline.visitsDelta)}
        />
        <HeadlineTile label="Engaged readers" value={formatRate(headline.engagedReaderRate)} />
        <HeadlineTile
          label="CTA clickers"
          value={formatCount(headline.ctaClickers)}
          delta={formatDelta(headline.ctaClickersDelta)}
        />
        <HeadlineTile label="Conversion" value={formatRate(headline.ctaConversionRate)} />
      </div>

      {CATEGORY_ORDER.map((category) => {
        const articles = grouped.get(category);
        if (!articles?.length) return null;
        const meta = CATEGORY_META[category];
        return (
          <div key={category}>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={clsx(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold",
                  meta.chip,
                )}
              >
                {meta.label}
              </span>
              <span className="text-xs font-semibold text-slate-400">{articles.length}</span>
            </div>
            <div className="rounded-xl border border-slate-200">
              {articles.map((article) => (
                <ArticleRow key={article.id ?? article.title} article={article} />
              ))}
            </div>
          </div>
        );
      })}

      {report.notes.length > 0 ? (
        <div className="space-y-1">
          {report.notes.map((note) => (
            <p key={note} className="text-xs font-medium leading-5 text-slate-400">
              {note}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function VibeMarketingDailyBriefSection({
  companyId,
}: {
  companyId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [listState, setListState] = useState<LoadingState>("loading");
  const [listError, setListError] = useState<string>("");
  const [reports, setReports] = useState<VibeMarketingReportSummary[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailState, setDetailState] = useState<LoadingState>("loading");
  const [detail, setDetail] = useState<VibeMarketingReportDetail | null>(null);
  const [hasUnseen, setHasUnseen] = useState(false);

  const loadReports = useCallback(async () => {
    setListState("loading");
    setListError("");
    try {
      const rows = await getVibeMarketingAnalyticsReports({ companyId, limit: 14 });
      setReports(rows);
      setSelectedId((current) => current ?? rows[0]?.id ?? null);
      const latestDate = rows[0]?.reportDate ?? "";
      setHasUnseen(Boolean(latestDate) && latestDate > readLastSeen(companyId));
      setListState("ready");
    } catch (error) {
      if (isVibeMarketingAnalyticsEndpointUnavailable(error)) {
        setListState("unavailable");
        return;
      }
      setListError(vibeMarketingAnalyticsErrorMessage(error, "Unable to load daily briefs."));
      setListState("error");
    }
  }, [companyId]);

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  useEffect(() => {
    if (!open || selectedId === null) return;
    let cancelled = false;
    setDetailState("loading");
    getVibeMarketingAnalyticsReport(selectedId, { companyId })
      .then((body) => {
        if (cancelled) return;
        setDetail(body);
        setDetailState(body ? "ready" : "error");
      })
      .catch((error) => {
        if (cancelled) return;
        setDetailState(isVibeMarketingAnalyticsEndpointUnavailable(error) ? "unavailable" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [open, selectedId, companyId]);

  const toggleOpen = () => {
    setOpen((current) => {
      const next = !current;
      if (next && reports[0]?.reportDate) {
        writeLastSeen(companyId, reports[0].reportDate);
        setHasUnseen(false);
      }
      return next;
    });
  };

  // Hide the whole section until the backend ships the reports endpoint.
  if (listState === "unavailable") return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={toggleOpen}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span className="flex min-w-0 gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Newspaper className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="block text-lg font-black text-slate-950">Daily performance brief</span>
              {hasUnseen ? (
                <span className="inline-flex items-center rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-white">
                  New
                </span>
              ) : null}
            </span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">
              A morning snapshot of how every article attracted, engaged, and converted readers.
            </span>
          </span>
        </span>
        <span className="mt-1 shrink-0 text-slate-400" aria-hidden="true">
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {open ? (
        <div className="mt-6 border-t border-slate-100 pt-6">
          {listState === "loading" ? (
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-5 text-sm font-bold text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
              Loading daily briefs…
            </div>
          ) : listState === "error" ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-5">
              <p className="text-sm font-bold text-rose-700">{listError}</p>
              <button
                type="button"
                onClick={() => void loadReports()}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-black text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry
              </button>
            </div>
          ) : reports.length === 0 ? (
            <p className="rounded-xl bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-500">
              No briefs yet. Your first daily performance brief is generated the morning after
              analytics reporting is switched on.
            </p>
          ) : (
            <div className="space-y-5">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => setSelectedId(report.id)}
                    className={clsx(
                      "shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold",
                      report.id === selectedId
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                    )}
                  >
                    {formatReportDate(report.reportDate)}
                  </button>
                ))}
              </div>

              {detailState === "loading" ? (
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-5 text-sm font-bold text-slate-600">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  Loading brief…
                </div>
              ) : detailState === "ready" && detail ? (
                <ReportBody report={detail} />
              ) : (
                <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-4 text-sm font-bold text-rose-700">
                  Unable to load this brief. Pick another date or retry shortly.
                </p>
              )}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
