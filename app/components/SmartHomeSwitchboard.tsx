import { useState } from "react";
import {
  BatteryCharging,
  Car,
  Droplets,
  Lightbulb,
  RotateCcw,
  Rocket,
  Thermometer,
  Utensils,
  WashingMachine,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { wattClasses } from "~/lib/watt-theme";
import type { DeployFeedback } from "~/components/SmartHomeController";
import { SWITCH_DEVICES, SWITCH_GROUPS, type SwitchDevice, type Upcoming } from "~/lib/smart-home-progression";

/**
 * Stage 1 — the simplest controller: flip switches for the home's devices, then Deploy.
 * On Deploy the page posts { switches: {bathroom:false, ev:true, ...} } -> backend
 * SWITCH_DEVICE_COMMANDS -> the matching device command. This is the gentle on-ramp before
 * the full SENSE->THINK->ACT pipeline unlocks.
 */
const DEVICE_ICON: Record<string, LucideIcon> = {
  bathroom: Lightbulb,
  living: Lightbulb,
  kitchen: Lightbulb,
  bedroom: Lightbulb,
  child_bedroom: Lightbulb,
  office: Lightbulb,
  thermostat: Thermometer,
  hot_water: Droplets,
  ev: Car,
  battery: BatteryCharging,
  dishwasher: Utensils,
  washer: WashingMachine,
  dryer: Wind,
};

function DeviceSwitch({ device, isOn, onToggle }: { device: SwitchDevice; isOn: boolean; onToggle: () => void }) {
  const Icon = DEVICE_ICON[device.id] ?? Lightbulb;
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isOn}
      aria-label={`${device.label} ${isOn ? "on" : "off"}`}
      className={`flex items-center gap-3 rounded-[1rem] border-2 p-4 text-left transition ${
        isOn ? "border-[#cfe0c2] bg-[#eef4e3]" : "border-[#e8dfcf] bg-[#fffefa]"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
          isOn ? "bg-[#e6efd7] text-[#155420]" : "bg-[#f1ece0] text-[#8a8477]"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-[#121e16]">{device.label}</span>
        <span className="block truncate text-[11px] font-medium text-[#64705f]">{device.hint}</span>
      </span>
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${isOn ? "bg-[#2f6f2c]" : "bg-[#d8cfbd]"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${isOn ? "left-[1.4rem]" : "left-0.5"}`} />
      </span>
      <span className="w-7 shrink-0 text-right text-[11px] font-black uppercase" style={{ color: isOn ? "#155420" : "#8a8477" }}>
        {isOn ? "On" : "Off"}
      </span>
    </button>
  );
}

export function SmartHomeSwitchboard({
  onDeploy,
  isDeploying,
  feedback,
  upcoming,
}: {
  onDeploy: (switches: Record<string, boolean>) => void;
  isDeploying: boolean;
  feedback: DeployFeedback;
  upcoming: Upcoming[];
}) {
  // Each device starts at its natural default (lights tend to be left on; appliances idle).
  const initial = () => Object.fromEntries(SWITCH_DEVICES.map((d) => [d.id, d.defaultOn]));
  const [on, setOn] = useState<Record<string, boolean>>(initial);
  const toggle = (id: string) => setOn((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className={`${wattClasses.panel} p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#121e16]">Your Smart Home</h2>
          <p className="mt-1 text-sm font-medium text-[#64705f]">
            Flip any switch, then hit Deploy to control your house. Spotted a light left on? Turn it off.
          </p>
        </div>
        <span className="rounded-full border border-[#e8dfcf] bg-[#fffefa] px-3 py-1 text-xs font-black text-[#155420]">
          Getting started
        </span>
      </div>

      <div className="mt-5 space-y-5">
        {SWITCH_GROUPS.map((group) => {
          const devices = SWITCH_DEVICES.filter((d) => d.group === group);
          if (devices.length === 0) return null;
          return (
            <div key={group}>
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#64705f]">{group}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {devices.map((d) => (
                  <DeviceSwitch key={d.id} device={d} isOn={Boolean(on[d.id])} onToggle={() => toggle(d.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onDeploy(on)}
          disabled={isDeploying}
          className={`${wattClasses.buttonPrimary} gap-2 px-6 py-2.5 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <Rocket className="h-4 w-4" />
          {isDeploying ? "Deploying…" : "Deploy"}
        </button>
        <span className="text-xs font-semibold text-[#64705f]">Set your switches, then deploy them to the house.</span>
        {feedback && (
          <span className={`text-sm font-semibold ${feedback.ok ? "text-[#155420]" : "text-[#9f2f28]"}`}>{feedback.message}</span>
        )}
        <button
          type="button"
          onClick={() => setOn(initial())}
          className="ml-auto inline-flex items-center gap-1.5 rounded-[0.65rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-xs font-bold text-[#64705f] hover:bg-[#fbf6e9]"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {upcoming.length > 0 && (
        <div className="mt-5 rounded-[1.25rem] border border-dashed border-[#d8cfbd] bg-[#fbf6e9] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#64705f]">Unlocks ahead</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {upcoming.map((u) => (
              <span
                key={u.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e8dfcf] bg-[#fffefa] px-3 py-1 text-xs font-bold text-[#8a8477]"
              >
                🔒 {u.label} · day {u.day}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[11px] font-medium text-[#8a8477]">
            As the campaign rolls on you'll unlock a full automation pipeline — schedules, more devices, and an AI brain
            that runs the house for you.
          </p>
        </div>
      )}
    </section>
  );
}
