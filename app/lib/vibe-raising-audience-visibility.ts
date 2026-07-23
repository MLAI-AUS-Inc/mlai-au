import type {
  VibeRaisingAudienceVisibility,
  VibeRaisingAudienceVisibilitySelection,
} from "~/types/vibe-raising";

export const DEFAULT_VIBE_RAISING_AUDIENCE_VISIBILITY: VibeRaisingAudienceVisibilitySelection = [
  "just_me",
];

function normalizeAudience(value: unknown): VibeRaisingAudienceVisibility | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (normalized === "just_me" || normalized === "private") return "just_me";
  if (normalized === "community") return "community";
  if (normalized === "investors" || normalized === "investor") return "investors";
  return null;
}

export function parseVibeRaisingAudienceVisibility(
  value: unknown,
): VibeRaisingAudienceVisibilitySelection | null {
  const rawValues = Array.isArray(value) ? value : [value];
  const normalized = rawValues
    .map(normalizeAudience)
    .filter((audience): audience is VibeRaisingAudienceVisibility => audience !== null);

  if (normalized.includes("just_me")) {
    return ["just_me"];
  }

  const selection: VibeRaisingAudienceVisibilitySelection = [];
  if (normalized.includes("community")) selection.push("community");
  if (normalized.includes("investors")) selection.push("investors");
  return selection.length > 0 ? selection : null;
}

export function normalizeVibeRaisingAudienceVisibility(
  value: unknown,
): VibeRaisingAudienceVisibilitySelection {
  return parseVibeRaisingAudienceVisibility(value) ?? [...DEFAULT_VIBE_RAISING_AUDIENCE_VISIBILITY];
}

export function toggleVibeRaisingAudienceVisibility(
  value: unknown,
  audience: VibeRaisingAudienceVisibility,
): VibeRaisingAudienceVisibilitySelection {
  const current = normalizeVibeRaisingAudienceVisibility(value);
  if (audience === "just_me") return ["just_me"];

  const publicAudiences = current.filter((item) => item !== "just_me");
  const next = publicAudiences.includes(audience)
    ? publicAudiences.filter((item) => item !== audience)
    : [...publicAudiences, audience];
  return normalizeVibeRaisingAudienceVisibility(next);
}
