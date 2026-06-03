import type { SmartHomeState } from "~/lib/generic-hackathon";
import { wattClasses } from "~/lib/watt-theme";

// Display target only; the real campaign length is a Unity constant (CAMPAIGN_LENGTH_DAYS).
// ~6.5h event (12:00–18:30) at the default ~11.7 min/day ≈ 33 days.
const CAMPAIGN_DAYS = 33;

const LOW_CASH = 45;

function round(value: number, dp = 0) {
  const f = 10 ** dp;
  return Math.round(value * f) / f;
}

function Stat({ label, value, warn = false }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-[0.8rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2">
      <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8477]">{label}</div>
      <div className={`text-base font-black ${warn ? "text-[#9f2f28]" : "text-[#121e16]"}`}>{value}</div>
    </div>
  );
}

export function SmartHomeStatusBar({ state }: { state?: SmartHomeState }) {
  const live = state?.live ?? false;
  const day = typeof state?.day === "number" ? state.day : null;
  const wallet = typeof state?.wallet === "number" ? state.wallet : null;
  const cost = typeof state?.cost === "number" ? state.cost : null;
  const comfort = typeof state?.comfort === "number" ? state.comfort : null;
  const energy = typeof state?.energy_kwh === "number" ? state.energy_kwh : null;
  const lowCash = wallet !== null && wallet < LOW_CASH;

  return (
    <section className={`${wattClasses.panel} p-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={wattClasses.eyebrow}>Smart Home · Beginner</p>
          <p className="mt-0.5 text-sm font-bold text-[#354031]">
            Goal: run the smartest, cheapest, happiest home — survive the campaign, then beat your record.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#e8dfcf] bg-[#fffefa] px-2.5 py-1 text-xs font-bold">
          <span className={`h-2.5 w-2.5 rounded-full ${live ? "bg-[#2f6f2c]" : "bg-[#c9b98f]"}`} />
          <span className={live ? "text-[#155420]" : "text-[#8a8477]"}>{live ? "Live" : "Offline"}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <Stat label="Day" value={day !== null ? `${day} / ${CAMPAIGN_DAYS}` : "—"} />
        <Stat label="Wallet" value={wallet !== null ? `$${round(wallet, 2)}` : "—"} warn={lowCash} />
        <Stat label="Cost / day" value={cost !== null ? `$${round(cost, 2)}` : "—"} />
        <Stat label="Comfort" value={comfort !== null ? `${round(comfort)}%` : "—"} />
        <Stat label="Energy" value={energy !== null ? `${round(energy, 1)} kWh` : "—"} />
      </div>

      {lowCash && (
        <p className="mt-2 text-xs font-bold text-[#9f2f28]">
          ⚠ Wallet low — cut peak-time grid use (shift load, store solar) or you'll fall behind.
        </p>
      )}
    </section>
  );
}
