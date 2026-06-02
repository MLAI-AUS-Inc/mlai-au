import { useNavigate } from "react-router";
import { ValleyFrame } from "~/components/valley/ValleyFrame";
import {
  formatCurrency,
  formatMonth,
  useValleyState,
  type ValleyUpdate,
} from "~/lib/valley-state";

export const meta = () => [
  { title: "Valley — Review update" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function ValleyReview() {
  const navigate = useNavigate();
  const { state, update } = useValleyState();
  const draft = state.drafts;

  if (!draft) {
    return (
      <ValleyFrame title="Review" back={{ href: "/valley" }} hideNav>
        <div className="rounded-2xl border border-dashed border-[#e6dfd0] p-6 text-center text-sm text-[#727171]">
          No draft yet — start a new update first.
        </div>
      </ValleyFrame>
    );
  }

  function publish() {
    if (!draft) return;
    const newUpdate: ValleyUpdate = {
      id: `u-${Date.now()}`,
      month: draft.month,
      metrics: draft.metrics,
      memo: draft.memo,
      publishedAt: new Date().toISOString(),
      source: state.connectedSources.includes("stripe")
        ? "stripe"
        : state.connectedSources.includes("google-analytics")
        ? "ga"
        : "manual",
    };
    update((s) => ({
      ...s,
      drafts: null,
      published: [...s.published.filter((p) => p.month !== newUpdate.month), newUpdate],
    }));
    navigate("/valley/update/published");
  }

  return (
    <ValleyFrame
      title="Review"
      back={{ href: "/valley/update/new" }}
      hideNav
      rightAction={
        <span className="rounded-full bg-[#ffc801]/30 px-2.5 py-1 text-[11px] font-semibold text-[#0b0b0b]">
          Investor preview
        </span>
      }
    >
      {/* Header card — what an investor sees */}
      <div className="rounded-2xl border border-[#0b0b0b] bg-[#0b0b0b] p-5 text-[#f9f7f2]">
        <div className="flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#9ccfcc]">
            Monthly update
          </div>
          <div className="text-[11px] text-[#9ccfcc]">{formatMonth(draft.month)}</div>
        </div>
        <div className="mt-2 text-xl font-semibold">
          {state.founder.company}
        </div>
        <div className="text-sm text-[#d7d5d3]">
          {state.founder.name} · {state.founder.stage} · {state.founder.location}
        </div>
        <div className="mt-3 rounded-xl bg-[#1a1a1a] px-3 py-2 text-sm text-[#d7d5d3]">
          {state.founder.whatYouDo}
        </div>
      </div>

      {/* Metrics row */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <MiniMetric
          label="MRR"
          value={formatCurrency(draft.metrics.revenueMrr)}
          tone={state.connectedSources.includes("stripe") ? "live" : "manual"}
        />
        <MiniMetric
          label="Customers"
          value={String(draft.metrics.customers)}
          tone={state.connectedSources.includes("google-analytics") ? "live" : "manual"}
        />
        <MiniMetric label="Runway" value={`${draft.metrics.runwayMonths} mo`} tone="manual" />
      </div>
      <div className="mt-2 text-right text-[11px] text-[#727171]">
        ARR {formatCurrency(draft.metrics.revenueArr)}
      </div>

      {/* Memo */}
      <div className="mt-5 space-y-4">
        <MemoBlock title="Key highlights" value={draft.memo.highlights} />
        <MemoBlock title="Challenges" value={draft.memo.challenges} />
        <MemoBlock title="Ask from investors" value={draft.memo.ask} highlight />
      </div>

      <div className="mt-4 rounded-2xl bg-[#e0fffa] p-3 text-xs text-[#006656]">
        After publishing, this update is added to {state.founder.company}'s verified profile and
        shared with investors who match {state.founder.stage}.
      </div>

      <div className="sticky bottom-4 mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => navigate("/valley/update/new")}
          className="flex-1 rounded-full border border-[#0b0b0b] bg-white py-3 text-sm font-semibold text-[#0b0b0b]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={publish}
          className="flex-1 rounded-full bg-[#008080] py-3 text-sm font-semibold text-white"
        >
          Publish update
        </button>
      </div>
    </ValleyFrame>
  );
}

function MiniMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "live" | "manual";
}) {
  return (
    <div className="rounded-2xl border border-[#e6dfd0] bg-white p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[#727171]">{label}</div>
      <div className="mt-1 text-base font-semibold tabular-nums text-[#0b0b0b]">{value}</div>
      <div
        className="mt-2 text-[10px] font-semibold"
        style={{ color: tone === "live" ? "#006656" : "#727171" }}
      >
        {tone === "live" ? "● Live" : "○ Manual"}
      </div>
    </div>
  );
}

function MemoBlock({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        background: highlight ? "#fff8e1" : "white",
        borderColor: highlight ? "#ffc801" : "#e6dfd0",
      }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#727171]">
        {title}
      </div>
      <div className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[#0b0b0b]">
        {value || <span className="text-[#9ca29a]">(empty)</span>}
      </div>
    </div>
  );
}
