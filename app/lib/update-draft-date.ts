export const MIN_UPDATE_DATE = "2025-01-01";

/** Validate against the reporting timezone's date supplied by the loader. */
export function getUpdateDraftDateError(updateDate: string, today: string): string | null {
    if (!updateDate) return "Choose an update date before creating an AI draft.";

    const parsed = new Date(`${updateDate}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(updateDate) ||
        !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== updateDate) {
        return "Choose a valid update date before creating an AI draft.";
    }
    if (updateDate < MIN_UPDATE_DATE) return "Choose an update date on or after 1 January 2025.";
    if (updateDate > today) return "Choose today or an earlier update date.";
    return null;
}
