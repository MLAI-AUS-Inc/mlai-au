import { aiPilotText, type AiPilotInputs } from "./ai-pilot-economics";

export const PILOT_HANDOFF_MAX_AGE_MS = 30 * 60 * 1000;
export const PILOT_BRIEF_MAX_LENGTH = 4000;
export const PILOT_ARTICLE_SLUG = "featured/how-small-business-owners-can-get-started-with-ai-2026";
export const PILOT_HANDOFF_CTA_VERSION = "pilot-worksheet-handoff-v1";

export type StudioPilotHandoff = Readonly<{ createdAt: number; text: string }>;

// Volatile, same-tab SPA handoff only. Never put business notes in a URL,
// router history, analytics event, localStorage or sessionStorage.
let pending: StudioPilotHandoff | undefined;

export function createStudioPilotHandoff(inputs: AiPilotInputs, brief: string, now = Date.now()): StudioPilotHandoff {
  if (!Number.isFinite(now) || typeof brief !== "string" || brief.length > PILOT_BRIEF_MAX_LENGTH) {
    throw new RangeError("Invalid pilot handoff");
  }
  return Object.freeze({ createdAt: now, text: aiPilotText(inputs, brief) });
}

export function isCurrentStudioPilotHandoff(value: StudioPilotHandoff, now = Date.now()) {
  return Number.isFinite(now) && Number.isFinite(value.createdAt) && now >= value.createdAt
    && now - value.createdAt < PILOT_HANDOFF_MAX_AGE_MS;
}

export function stageStudioPilotHandoff(inputs: AiPilotInputs, brief: string, now = Date.now()) {
  // Module state on the server must never contain a reader's draft.
  if (typeof window === "undefined") return false;
  pending = undefined;
  pending = createStudioPilotHandoff(inputs, brief, now);
  return true;
}

export function takeStudioPilotHandoff(now = Date.now()): StudioPilotHandoff | undefined {
  if (typeof window === "undefined") return;
  const candidate = pending;
  pending = undefined;
  return candidate && isCurrentStudioPilotHandoff(candidate, now) ? candidate : undefined;
}

export function appendPilotNotes(existing: string, handoff: StudioPilotHandoff) {
  return [existing.trim(), "Pilot worksheet notes — assumptions to review, not agreed project requirements", handoff.text]
    .filter(Boolean).join("\n\n");
}
