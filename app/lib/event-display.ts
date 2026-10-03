/** Event-zone formatting is deterministic across server and visitor timezones.
 * If the provider omits/invalidates its timezone, show labelled UTC, never an
 * inferred city timezone or the browser/server's implicit local timezone.
 */
function eventInstant(startDate: string) {
  // A date without an offset is interpreted in the runtime's local zone. It
  // cannot identify the instant of an event, even if a city/zone is supplied.
  if (typeof startDate !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/i.test(startDate)) return null;
  const [year, month, day] = startDate.slice(0, 10).split("-").map(Number);
  const civil = new Date(0);
  civil.setUTCFullYear(year, month - 1, day);
  if (civil.getUTCFullYear() !== year || civil.getUTCMonth() !== month - 1 || civil.getUTCDate() !== day) return null;
  const date = new Date(startDate);
  return Number.isFinite(date.getTime()) ? date : null;
}

function eventZone(providerTimeZone?: string) {
  let timeZone = typeof providerTimeZone === "string" ? providerTimeZone.trim() || "UTC" : "UTC";
  try {
    new Intl.DateTimeFormat("en-AU", { timeZone });
  } catch {
    timeZone = "UTC";
  }
  return timeZone;
}

/** Unknown instants sort last, retaining their input order without local parsing. */
export function compareEventStarts(first: string, second: string): number {
  const a = eventInstant(first)?.getTime();
  const b = eventInstant(second)?.getTime();
  if (a === undefined) return b === undefined ? 0 : 1;
  if (b === undefined) return -1;
  return a - b;
}

/** Civil date in the organiser's zone, not the visitor/server's calendar day. */
export function eventCalendarDate(startDate: string, providerTimeZone?: string) {
  const date = eventInstant(startDate);
  if (!date) return null;
  const timeZone = eventZone(providerTimeZone);
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  return { year: Number(part("year")), month: Number(part("month")) - 1,
    day: Number(part("day")), key: `${part("year")}-${part("month")}-${part("day")}`, timeZone };
}

export const CALENDAR_REFERENCE_ZONE = "Australia/Melbourne";
export const EVENT_DETAILS_LABEL = "View event details";
export const EVENT_AVAILABILITY_NOTE = "Check availability, any waitlist and registration requirements on the organiser’s page. A listing does not reserve a place.";

export function formatEventStart(startDate: string, providerTimeZone?: string) {
  const date = eventInstant(startDate);
  if (!date) return { date: "Date to be confirmed", fullDate: "Date to be confirmed", day: "?", month: "TBC", time: "Check organiser listing", timeZone: "UTC", valid: false };
  const timeZone = eventZone(providerTimeZone);
  return {
    valid: true,
    day: new Intl.DateTimeFormat("en-AU", { timeZone, day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("en-AU", { timeZone, month: "short" }).format(date).toUpperCase(),
    date: new Intl.DateTimeFormat("en-AU", {
      timeZone, weekday: "short", day: "numeric", month: "short",
    }).format(date),
    fullDate: new Intl.DateTimeFormat("en-AU", {
      timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-AU", {
      timeZone, hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short",
    }).format(date),
    timeZone,
  };
}
