import { VIBE_RAISING_MONTH_OPTIONS } from "../components/VibeRaisingDateTabs";

export type VibeRaisingDraftReturnState = {
  cadence: "monthly" | "weekly";
  month: string;
  year: number;
  weekStart?: string;
};

const DRAFT_RETURN_PARAMS = ["step", "cadence", "month", "year", "weekStart"] as const;

// Carry only navigation state through the existing connection/OAuth `next` URL.
export function buildVibeRaisingDraftReturnPath(
  pathname: string,
  search: string,
  state: VibeRaisingDraftReturnState | null,
  inputSources: readonly string[],
) {
  const params = new URLSearchParams(search);
  DRAFT_RETURN_PARAMS.forEach((key) => params.delete(key));
  if (state) {
    params.set("step", "template");
    params.set("cadence", state.cadence);
    params.set("month", state.month);
    params.set("year", String(state.year));
    if (state.cadence === "weekly" && state.weekStart) {
      params.set("weekStart", state.weekStart);
    }
  }
  if (inputSources.length > 0) {
    params.set("inputs", inputSources.join(","));
  } else {
    params.delete("inputs");
  }
  const query = params.toString();
  return `${pathname}${query ? `?${query}` : ""}`;
}

export function readVibeRaisingDraftReturnState(search: string): VibeRaisingDraftReturnState | null {
  const params = new URLSearchParams(search);
  if (params.get("step") !== "template") return null;
  const cadence = params.get("cadence");
  const month = params.get("month") || "";
  const year = Number(params.get("year"));
  if (
    (cadence !== "monthly" && cadence !== "weekly") ||
    !VIBE_RAISING_MONTH_OPTIONS.some((option) => option.name === month) ||
    !Number.isInteger(year) || year < 2025 || year > 9999
  ) return null;

  if (cadence === "monthly") return { cadence, month, year };

  const weekStart = params.get("weekStart") || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(weekStart)) return null;
  const start = new Date(`${weekStart}T00:00:00Z`);
  if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0, 10) !== weekStart || start.getUTCDay() !== 1) {
    return null;
  }
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  if (VIBE_RAISING_MONTH_OPTIONS[end.getUTCMonth()]?.name !== month || end.getUTCFullYear() !== year) {
    return null;
  }
  return { cadence, month, year, weekStart };
}
