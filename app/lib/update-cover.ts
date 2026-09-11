import type { VibeRaisingUpdateCover } from "~/types/vibe-raising";

export const MAX_COVER_BYTES = 10 * 1024 * 1024;

export function coverFileError(file: Pick<File, "type" | "size">): string | null {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return "Choose a PNG, JPEG or WebP image.";
  if (!file.size || file.size > MAX_COVER_BYTES) return "Choose an image under 10 MB.";
  return null;
}

export function normalizeUpdateCover(raw: unknown): VibeRaisingUpdateCover | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  if (typeof value.url !== "string" || !/^https:\/\//i.test(value.url)) return null;
  return {
    url: value.url,
    assetToken: typeof value.assetToken === "string" ? value.assetToken : undefined,
    alt: typeof value.alt === "string" ? value.alt.slice(0, 240) : "",
    width: typeof value.width === "number" ? value.width : undefined,
    height: typeof value.height === "number" ? value.height : undefined,
    source: value.source === "generated" ? "generated" : "upload",
    model: typeof value.model === "string" ? value.model : null,
  };
}

export function parseUpdateCoverForm(value: FormDataEntryValue | null): VibeRaisingUpdateCover | null {
  if (!value || typeof value !== "string" || value === "null") return null;
  try { return normalizeUpdateCover(JSON.parse(value)); } catch { return null; }
}

export function coverUpdateText(parts: { summary: string; highlights: string; challenges: string; learnings: string; next30Days: string }): string {
  return Object.entries(parts).filter(([, value]) => value.trim()).map(([key, value]) => `${key}: ${value.trim()}`).join("\n\n").slice(0, 12000);
}
