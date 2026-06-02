import { ValleyFrame } from "~/components/valley/ValleyFrame";
import {
  formatCurrency,
  formatMonth,
  useValleyState,
  verifiedStatus,
} from "~/lib/valley-state";

export const meta = () => [
  { title: "Valley — Founder profile" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function ValleyProfile() {
  const { state } = useValleyState();
  const { verified, publishedCount } = verifiedStatus(state);
  const sorted = [...state.published].sort((a, b) => (a.month < b.month ? 1 : -1));
  const latest = sorted[0];

  return (
    <ValleyFrame
      title="Profile"
      rightAction={
        <span className="rounded-full bg-[#ece5d4] px-2.5 py-1 text-[11px] font-semibold text-[#727171]">
          Investor view
        </span>
      }
    >
      {/* Hero */}
      <div className="rounded-2xl border border-[#e6dfd0] bg-white p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#008080] text-lg font-semibold text-white">
            {state.founder.company[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="truncate text-lg font-semibold text-[#0b0b0b]">
                {state.founder.company}
              </div>
              {verified ? (
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-[#008080] px-2 py-0.5 text-[10px] font-semibold text-white"
                  title="Verified founder"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Verified
                </span>
              ) : (
                <span className="rounded-full bg-[#ffc801]/30 px-2 py-0.5 text-[10px] font-semibold text-[#0b0b0b]">
                  {publishedCount}/3 updates
                </span>
              )}
            </div>
            <div className="text-xs text-[#727171]">{state.founder.domain}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Chip>{state.founder.stage}</Chip>
              <Chip>{state.founder.location}</Chip>
              <Chip>{state.founder.orgType}</Chip>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#0b0b0b]">
          {state.founder.whatYouDo}
        </p>
        <div className="mt-3 text-[11px] text-[#727171]">
          ABN {state.founder.abn} · {state.founder.bio}
        </div>
      </div>

      {/* Latest metrics */}
      {latest ? (
        <section className="mt-5">
          <SectionLabel
            right={
              <span className="text-[11px] text-[#727171]">{formatMonth(latest.month)}</span>
            }
          >
            Latest metrics
          </SectionLabel>
          <div className="grid grid-cols-3 gap-2">
            <Stat label="MRR" value={formatCurrency(latest.metrics.revenueMrr)} />
            <Stat label="Customers" value={String(latest.metrics.customers)} />
            <Stat label="Runway" value={`${latest.metrics.runwayMonths} mo`} />
          </div>
          <div className="mt-1 text-right text-[11px] text-[#727171]">
            ARR {formatCurrency(latest.metrics.revenueArr)}
          </div>
        </section>
      ) : null}

      {/* Updates timeline */}
      <section className="mt-6">
        <SectionLabel>Published updates</SectionLabel>
        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e6dfd0] p-5 text-sm text-[#727171]">
            No published updates yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {sorted.map((u) => (
              <li key={u.id} className="rounded-2xl border border-[#e6dfd0] bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-[#0b0b0b]">
                    {formatMonth(u.month)}
                  </div>
                  <span className="rounded-full bg-[#e0fffa] px-2 py-0.5 text-[10px] font-semibold text-[#006656]">
                    {u.source === "stripe"
                      ? "Live · Stripe"
                      : u.source === "ga"
                      ? "Live · GA"
                      : "Manual"}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-[#727171]">
                  <span>MRR {formatCurrency(u.metrics.revenueMrr)}</span>
                  <span>{u.metrics.customers} customers</span>
                  <span>{u.metrics.runwayMonths} mo runway</span>
                </div>
                {u.memo.highlights ? (
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[#0b0b0b]">
                    {u.memo.highlights}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </ValleyFrame>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#ece5d4] px-2 py-0.5 text-[10px] font-medium text-[#0b0b0b]">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e6dfd0] bg-white p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[#727171]">{label}</div>
      <div className="mt-1 text-base font-semibold tabular-nums text-[#0b0b0b]">{value}</div>
    </div>
  );
}

function SectionLabel({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#727171]">
        {children}
      </div>
      {right}
    </div>
  );
}
