// Default cadence — overridden per scenario via dt_hours / start_hour
// from the backend's public_metadata. Direct callers should prefer the
// scenario-aware helpers below when possible.
export const STEP_HOURS = 0.25;

/**
 * Convert a step index to wall-clock hour-of-day, given the scenario's
 * step duration and start hour. Both default to the legacy 15-min / 00:00
 * assumption so older call sites still work.
 */
export function hourFromStep(
  step: number,
  stepHours: number = STEP_HOURS,
  startHour: number = 0,
): number {
  const total = startHour + step * stepHours;
  return ((total % 24) + 24) % 24;
}

export function formatClock(hour: number): string {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour - Math.floor(hour)) * 60 + 1e-6) % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export interface CelestialPosition {
  x: number;
  y: number;
  isDay: boolean;
  /** 0 at horizon-rising, 0.5 at zenith, 1 at horizon-setting. */
  progress: number;
}

const ARC = {
  startX: 8,
  endX: 192,
  baseY: 86,
  peakY: 8,
};

export function celestialPosition(hour: number): CelestialPosition {
  let progress: number;
  let isDay: boolean;
  if (hour >= 6 && hour < 18) {
    progress = (hour - 6) / 12;
    isDay = true;
  } else if (hour < 6) {
    progress = (hour + 6) / 12;
    isDay = false;
  } else {
    progress = (hour - 18) / 12;
    isDay = false;
  }
  const t = Math.min(1, Math.max(0, progress));
  const x = ARC.startX + t * (ARC.endX - ARC.startX);
  const y =
    ARC.baseY * (1 - t) * (1 - t) +
    ARC.peakY * 2 * (1 - t) * t +
    ARC.baseY * t * t;
  return { x, y, isDay, progress: t };
}

export const ARC_PATH = `M ${ARC.startX} ${ARC.baseY} Q 100 ${ARC.peakY} ${ARC.endX} ${ARC.baseY}`;

export interface PhaseDescriptor {
  key: string;
  label: string;
  caption: string;
  isDay: boolean;
  isPeak: "demand" | "solar" | null;
  /** CSS gradient end-stops for the sky background. */
  gradient: [string, string];
  /** Tint colour for ink/text on top of the gradient. */
  ink: "light" | "dark";
}

export function describePhase(hour: number): PhaseDescriptor {
  if (hour >= 0 && hour < 5) {
    return {
      key: "deep-night",
      label: "Deep night",
      caption: "Off-peak — demand is low, batteries can charge cheaply",
      isDay: false,
      isPeak: null,
      gradient: ["#0b1029", "#1f1147"],
      ink: "light",
    };
  }
  if (hour < 6.5) {
    return {
      key: "dawn",
      label: "Dawn",
      caption: "Sun is rising, solar starts ramping",
      isDay: false,
      isPeak: null,
      gradient: ["#f97316", "#7c3aed"],
      ink: "light",
    };
  }
  if (hour < 9) {
    return {
      key: "morning-peak",
      label: "Morning peak",
      caption: "Households waking — demand surges before solar catches up",
      isDay: true,
      isPeak: "demand",
      gradient: ["#fb923c", "#fde68a"],
      ink: "dark",
    };
  }
  if (hour < 11) {
    return {
      key: "morning",
      label: "Late morning",
      caption: "Solar climbing fast, demand softening",
      isDay: true,
      isPeak: null,
      gradient: ["#bae6fd", "#7dd3fc"],
      ink: "dark",
    };
  }
  if (hour < 14.5) {
    return {
      key: "midday",
      label: "Midday — solar peak",
      caption: "Maximum solar output, ideal time to charge batteries",
      isDay: true,
      isPeak: "solar",
      gradient: ["#7dd3fc", "#38bdf8"],
      ink: "light",
    };
  }
  if (hour < 17) {
    return {
      key: "afternoon",
      label: "Afternoon",
      caption: "Solar declining, demand creeping back up",
      isDay: true,
      isPeak: null,
      gradient: ["#fde68a", "#fb923c"],
      ink: "dark",
    };
  }
  if (hour < 19) {
    return {
      key: "sunset",
      label: "Sunset",
      caption: "Solar gone, plant ramps up to cover transition",
      isDay: false,
      isPeak: null,
      gradient: ["#f97316", "#7c3aed"],
      ink: "light",
    };
  }
  if (hour < 22) {
    return {
      key: "evening-peak",
      label: "Evening peak",
      caption: "Highest demand of the day — grid prices spike",
      isDay: false,
      isPeak: "demand",
      gradient: ["#7c3aed", "#312e81"],
      ink: "light",
    };
  }
  return {
    key: "late-night",
    label: "Late night",
    caption: "Demand falling, grid winding down",
    isDay: false,
    isPeak: null,
    gradient: ["#312e81", "#0b1029"],
    ink: "light",
  };
}
