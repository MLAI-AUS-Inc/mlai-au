import { getUpdatePeriod, sortStartupUpdates } from "./startup-updates-presentation";
import type { VibeRaisingMonthlyUpdate } from "~/types/vibe-raising";

function midnight(date: string, timeZone: string): number {
    const target = Date.parse(`${date}T00:00:00Z`);
    let instant = target;
    const formatter = new Intl.DateTimeFormat("en-GB", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
    for (let attempt = 0; attempt < 3; attempt++) {
        const parts = Object.fromEntries(formatter.formatToParts(instant).map(part => [part.type, part.value]));
        const wallTime = Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
        instant += target - wallTime;
    }
    return instant;
}

/** A preview of the server's range. The server freezes the exact cutoff when AI starts. */
export function defaultUpdateSourceWindow(updates: VibeRaisingMonthlyUpdate[], updateDate: string, timeZone: string, updateId?: string | null, now = Date.now()) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(updateDate) || !Number.isFinite(Date.parse(updateDate))) return null;
    const nextDate = new Date(Date.parse(`${updateDate}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);
    const end = Math.min(midnight(nextDate, timeZone), now);
    let start = midnight(`${updateDate.slice(0, 7)}-01`, timeZone);
    let previous = false;
    for (const update of sortStartupUpdates(updates)) {
        const date = getUpdatePeriod(update).date;
        const cutoff = Date.parse(update.narrativePeriod?.end || "");
        if (String(update.id) !== String(updateId) && date && date <= updateDate && Number.isFinite(cutoff) && cutoff < end) {
            start = cutoff;
            previous = true;
            break;
        }
    }
    return { start: new Date(start).toISOString(), end: new Date(end).toISOString(), previous };
}

export function toLocalDateTime(value: string): string {
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "";
}

export function fromLocalDateTime(value: string): string {
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? date.toISOString() : "";
}
