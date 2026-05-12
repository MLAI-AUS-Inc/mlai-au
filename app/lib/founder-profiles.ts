import type { VibeRaisingFounderProfile } from "~/types/vibe-raising";

export function parseFounderProfilesFormValue(value: FormDataEntryValue | null): VibeRaisingFounderProfile[] {
  const rawValue = String(value ?? "").trim();

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map((entry) => {
        const name = typeof entry?.name === "string" ? entry.name.trim() : "";
        const linkedinUrl = typeof entry?.linkedinUrl === "string" ? entry.linkedinUrl.trim() : "";

        if (!name && !linkedinUrl) {
          return null;
        }

        return linkedinUrl ? { name, linkedinUrl } : { name };
      })
      .filter((entry): entry is VibeRaisingFounderProfile => Boolean(entry));
  } catch {
    return [];
  }
}
