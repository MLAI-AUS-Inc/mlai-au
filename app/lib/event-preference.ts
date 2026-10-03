/** Preference is not provider-confirmed format, admission or location. */
export type EventPreference = "all" | "melbourne" | "sydney" | "online";
export const EVENT_PREFERENCE_PARAM = "event_format";
export const EVENT_PREFERENCE_LABELS: Record<EventPreference, string> = {
  all: "All formats",
  melbourne: "Melbourne in person",
  sydney: "Sydney in person",
  online: "Online options",
};

export function parseEventPreference(params: URLSearchParams, fallback: EventPreference = "all"): EventPreference {
  const values = params.getAll(EVENT_PREFERENCE_PARAM);
  if (!values.length) return fallback;
  return values.length === 1 && (values[0] === "melbourne" || values[0] === "sydney" || values[0] === "online") ? values[0] : "all";
}

export function withEventPreference(params: URLSearchParams, preference: EventPreference): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete(EVENT_PREFERENCE_PARAM);
  if (preference === "melbourne" || preference === "sydney" || preference === "online") next.set(EVENT_PREFERENCE_PARAM, preference);
  return next;
}

export function eventCalendarHref(preference: EventPreference): string {
  const query = withEventPreference(new URLSearchParams(), preference).toString();
  return query ? `/events?${query}` : "/events";
}

export function isEventCalendarHref(value: string): boolean {
  return value === "/events" || value === eventCalendarHref("melbourne") || value === eventCalendarHref("sydney") || value === eventCalendarHref("online");
}
