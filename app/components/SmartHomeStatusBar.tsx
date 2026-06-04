import type { SmartHomeState } from "~/lib/generic-hackathon";
import { wattClasses } from "~/lib/watt-theme";

// Display target only; the real campaign length is a Unity constant (CAMPAIGN_LENGTH_DAYS).
// ~6.5h event (12:00–18:30) at the default ~11.7 min/day ≈ 33 days.
const CAMPAIGN_DAYS = 33;

function round(value: number, dp = 0) {
  const f = 10 ** dp;
  return Math.round(value * f) / f;
}

function Stat({
  label,
  value,
  hero = false,
  accent = "#121e16",
  icon,
}: {
  label: string;
  value: string;
  hero?: boolean;
  accent?: string;
  icon?: string;
}) {
  return (
    <div className="rounded-[0.8rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2">
      <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8477]">{label}</div>
      <div
        className={`flex items-baseline gap-1 font-black ${hero ? "text-2xl" : "text-base"}`}
        style={{ color: accent }}
      >
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <span>{value}</span>
      </div>
    </div>
  );
}

// House mood -> a quick face, echoing the mood meter we removed from the in-house HUD.
function moodFace(mood: number): string {
  if (mood >= 67) return "🙂";
  if (mood >= 34) return "😐";
  return "🙁";
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
  const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
  // Live house telemetry, published by the Unity sim each tick (score/current in RTDB) and forwarded
  // by the backend state endpoint. This panel is now the primary HUD: the wooden stat bar + day/night
  // wheel were removed from the streamed game, so energy / carbon / money / mood are shown here.
  const energy = num(state?.energy_kwh);
  const carbon = num(state?.carbon);
  const money = num(state?.wallet);
  const mood = num(state?.comfort);
  const day = num(state?.day);
  const score = num(state?.score);
  const dash = "—";

  const time = live && state?.game_time ? state.game_time : null;
  const timeChip: Chip | null = time
    ? { icon: "◷", label: time, cls: "border-[#e8dfcf] bg-[#fffefa] text-[#354031]" }
    : null;
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

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Energy" icon="⚡" accent="#5f7a1f" value={energy !== null ? `${round(energy, 1)} kWh` : dash} />
        <Stat label="Carbon" icon="🌍" accent="#6b6f6a" value={carbon !== null ? `${round(carbon, 1)} kg` : dash} />
        <Stat label="Money" accent="#9a7b1a" value={money !== null ? `$${round(money).toLocaleString()}` : dash} />
        <Stat
          label="Mood"
          icon={mood !== null ? moodFace(mood) : undefined}
          accent="#2f6f2c"
          value={mood !== null ? `${round(mood)}%` : dash}
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <Stat label="Day" value={day !== null ? `${day} / ${CAMPAIGN_DAYS}` : dash} />
        <Stat label="Score" value={score !== null ? `${round(score)}` : dash} hero />
      </div>

      {(timeChip || weather || tariff) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8477]">Today</span>
          {timeChip && <Pill chip={timeChip} />}
          {weather && <Pill chip={weather} />}
          {tariff && <Pill chip={tariff} />}
        </div>
      )}

      <p className="mt-2 text-xs font-medium text-[#6f6a5d]">
        Energy, carbon and comfort drive your Score. Money is managed in the house — let it run low
        and the family starts selling things off.
      </p>
    </section>
  );
}
