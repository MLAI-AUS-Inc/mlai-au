import { Link } from "react-router";
import { ValleyFrame } from "~/components/valley/ValleyFrame";
import {
  formatCurrency,
  formatMonth,
  nextMonth,
  resetValleyState,
  useValleyState,
  verifiedStatus,
  type DataSource,
} from "~/lib/valley-state";

export const meta = () => [
  { title: "Valley — Founder workspace" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function ValleyDashboard() {
  const { state, update, hydrated } = useValleyState();
  const { publishedCount, hasSource, verified } = verifiedStatus(state);
  const upcomingMonth = nextMonth(state);

  return (
    <ValleyFrame
      title="Valley"
      rightAction={
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset Valley demo data?")) resetValleyState();
          }}
          className="rounded-full border border-[#e6dfd0] px-3 py-1 text-[11px] font-medium text-[#727171] hover:bg-[#ece5d4]"
        >
          Reset demo
        </button>
      }
    >
      {/* Founder greeting */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b0b0b] text-[#f9f7f2] text-base font-semibold">
          {state.founder.name
            .split(" ")
            .map((s) => s[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.14em] text-[#727171]">Good morning</div>
          <div className="truncate text-lg font-semibold text-[#0b0b0b]">
            {state.founder.name.split(" ")[0]} · {state.founder.company}
          </div>
        </div>
      </div>

      {/* Verification card */}
      <section className="mt-5 rounded-2xl border border-[#e6dfd0] bg-white p-5 shadow-[0_1px_0_rgba(11,11,11,0.04)]">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#727171]">
            Verified founder
          </div>
          {verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#008080] px-2.5 py-1 text-[11px] font-semibold text-white">
              <CheckIcon /> Verified
            </span>
          ) : (
            <span className="rounded-full bg-[#ffc801]/30 px-2.5 py-1 text-[11px] font-semibold text-[#0b0b0b]">
              In progress
            </span>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-3xl font-semibold tabular-nums text-[#0b0b0b]">
            {Math.min(publishedCount, 3)}<span className="text-[#9ccfcc]">/3</span>
          </div>
          <div className="text-sm text-[#727171]">monthly updates published</div>
        </div>
        <ProgressBar value={Math.min(publishedCount, 3)} max={3} />
        <ul className="mt-4 space-y-2 text-sm">
          <Checklist
            done={Boolean(state.founder.abn)}
            label="Company setup (ABN + core fields)"
          />
          <Checklist done={hasSource} label="At least 1 live data source connected" />
          <Checklist done={publishedCount >= 3} label="3 monthly updates published" />
        </ul>
        {verified ? (
          <div className="mt-4 rounded-xl bg-[#e0fffa] px-3 py-2 text-sm text-[#006656]">
            Your profile is live in the investor directory.
          </div>
        ) : null}
      </section>

      {/* Data sources */}
      <section className="mt-5">
        <SectionLabel>Data sources</SectionLabel>
        {hydrated ? (
          <div className="grid grid-cols-2 gap-3">
            <SourceTile
              id="stripe"
              connected={state.connectedSources.includes("stripe")}
              onToggle={(id, on) =>
                update((s) => ({
                  ...s,
                  connectedSources: on
                    ? Array.from(new Set([...s.connectedSources, id]))
                    : s.connectedSources.filter((x) => x !== id),
                }))
              }
              label="Stripe"
              hint="Revenue · MRR/ARR"
              color="#635bff"
            />
            <SourceTile
              id="google-analytics"
              connected={state.connectedSources.includes("google-analytics")}
              onToggle={(id, on) =>
                update((s) => ({
                  ...s,
                  connectedSources: on
                    ? Array.from(new Set([...s.connectedSources, id]))
                    : s.connectedSources.filter((x) => x !== id),
                }))
              }
              label="Google Analytics"
              hint="Users · Traffic"
              color="#ed5f00"
            />
          </div>
        ) : (
          <div className="h-[88px]" />
        )}
      </section>

      {/* Monthly update CTA */}
      <section className="mt-5 overflow-hidden rounded-2xl bg-[#0b0b0b] text-[#f9f7f2]">
        <div className="p-5">
          <div className="text-xs uppercase tracking-[0.16em] text-[#9ccfcc]">This month</div>
          <div className="mt-1 text-lg font-semibold">
            Draft your {formatMonth(upcomingMonth)} update
          </div>
          <p className="mt-2 text-sm text-[#d7d5d3]">
            {hasSource
              ? "We've pulled fresh numbers from your connected sources — review and add your memo."
              : "Connect Stripe or Google Analytics first, or enter numbers manually."}
          </p>
          <Link
            to="/valley/update/new"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00ffd7] px-4 py-2 text-sm font-semibold text-[#0b0b0b]"
          >
            Start update
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
      </section>

      {/* Past updates */}
      <section className="mt-6">
        <SectionLabel>Past updates</SectionLabel>
        {state.published.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e6dfd0] p-5 text-sm text-[#727171]">
            Nothing published yet — your first one starts your verification streak.
          </div>
        ) : (
          <ul className="space-y-3">
            {[...state.published]
              .sort((a, b) => (a.month < b.month ? 1 : -1))
              .map((u) => (
                <li
                  key={u.id}
                  className="flex items-center justify-between rounded-2xl border border-[#e6dfd0] bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#0b0b0b]">{formatMonth(u.month)}</div>
                    <div className="truncate text-xs text-[#727171]">
                      {formatCurrency(u.metrics.revenueMrr)} MRR · {u.metrics.customers} customers
                    </div>
                  </div>
                  <span className="rounded-full bg-[#e0fffa] px-2 py-0.5 text-[11px] font-semibold text-[#006656]">
                    Published
                  </span>
                </li>
              ))}
          </ul>
        )}
      </section>

      <div className="mt-6 text-center text-xs text-[#727171]">
        <Link to="/valley/profile" className="underline underline-offset-2">
          Preview investor-facing profile
        </Link>
      </div>
    </ValleyFrame>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#727171]">
      {children}
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#ece5d4]">
      <div
        className="h-full rounded-full bg-[#008080] transition-all"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}

function Checklist({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full"
        style={{ background: done ? "#008080" : "#ece5d4", color: done ? "white" : "#727171" }}
      >
        {done ? <CheckIcon small /> : <span className="text-[11px]">·</span>}
      </span>
      <span className={done ? "text-[#0b0b0b]" : "text-[#727171]"}>{label}</span>
    </li>
  );
}

function SourceTile({
  id,
  connected,
  onToggle,
  label,
  hint,
  color,
}: {
  id: DataSource;
  connected: boolean;
  onToggle: (id: DataSource, on: boolean) => void;
  label: string;
  hint: string;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id, !connected)}
      className="flex flex-col items-start gap-2 rounded-2xl border bg-white p-4 text-left transition"
      style={{
        borderColor: connected ? "#008080" : "#e6dfd0",
        boxShadow: connected ? "0 0 0 3px rgba(0,128,128,0.12)" : "none",
      }}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: color }}>
        <span className="text-sm font-bold text-white">{label[0]}</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-[#0b0b0b]">{label}</div>
        <div className="text-[11px] text-[#727171]">{hint}</div>
      </div>
      <div
        className="mt-auto text-[11px] font-semibold"
        style={{ color: connected ? "#008080" : "#727171" }}
      >
        {connected ? "Connected — tap to disconnect" : "Tap to connect"}
      </div>
    </button>
  );
}

function CheckIcon({ small }: { small?: boolean } = {}) {
  const s = small ? 11 : 13;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
