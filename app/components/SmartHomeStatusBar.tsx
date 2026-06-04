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

type Chip = { icon: string; label: string; cls: string };

// Map the live weather condition the game publishes -> a glanceable chip, so heatwave /
// cold-snap days (which spike cooling / heating load and cut solar) are obvious at a glance
// and the player knows to re-tune their controller.
function weatherChip(condition?: string | null): Chip | null {
  if (!condition) return null;
  const c = condition.toLowerCase();
  if (c.includes("heat")) return { icon: "☀", label: "Heatwave", cls: "border-[#f0c9a6] bg-[#fce8d6] text-[#9a4a1a]" };
  if (c.includes("cold") || c.includes("snap")) return { icon: "❄", label: "Cold snap", cls: "border-[#bcd6e6] bg-[#e2eef6] text-[#1f5673]" };
  if (c.includes("cloud") || c.includes("overcast") || c.includes("rain"))
    return { icon: "☁", label: "Cloudy", cls: "border-[#d6d6d6] bg-[#edeef0] text-[#555]" };
  return { icon: "☀", label: "Mild", cls: "border-[#cfe0c2] bg-[#e6efd7] text-[#2f6f2c]" };
}

// Tariff-period chip: peak grid power is the expensive window to shift load away from.
function tariffChip(period?: string | null): Chip | null {
  if (!period) return null;
  const p = period.toLowerCase();
  if (p.includes("off")) return { icon: "▼", label: "Off-peak power", cls: "border-[#cfe0c2] bg-[#e6efd7] text-[#2f6f2c]" };
  if (p.includes("peak")) return { icon: "▲", label: "Peak power", cls: "border-[#eeb7b1] bg-[#fbe3e0] text-[#9f2f28]" };
  if (p.includes("shoulder")) return { icon: "◆", label: "Shoulder power", cls: "border-[#ecd9a6] bg-[#fcefcf] text-[#8a6d1a]" };
  return null;
}

function Pill({ chip }: { chip: Chip }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${chip.cls}`}>
      <span aria-hidden="true">{chip.icon}</span>
      {chip.label}
    </span>
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
  const weather = live ? weatherChip(state?.weather_condition) : null;
  const tariff = live ? tariffChip(state?.tariff_period) : null;

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

      {(weather || tariff) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8477]">Today</span>
          {weather && <Pill chip={weather} />}
          {tariff && <Pill chip={tariff} />}
        </div>
      )}

      {lowCash && (
        <p className="mt-2 text-xs font-bold text-[#9f2f28]">
          ⚠ Wallet low — cut peak-time grid use (shift load, store solar) or you'll fall behind.
        </p>
      )}
    </section>
  );
}
