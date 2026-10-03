import { useSearchParams } from "react-router";
import { EVENT_PREFERENCE_LABELS, EVENT_PREFERENCE_PARAM, parseEventPreference, withEventPreference, type EventPreference } from "~/lib/event-preference";

/** Keep an article's applied preference visible without inferring ticket formats. */
export default function EventFormatPreference() {
  const [params, setParams] = useSearchParams();
  const preference = parseEventPreference(params);
  return <section aria-labelledby="event-preference-heading" className="mx-auto max-w-6xl px-4 pb-8 pt-24 text-gray-950 sm:px-6 lg:pt-8">
    <h1 id="event-preference-heading" className="mb-4 text-3xl font-bold">Find an MLAI event that fits</h1>
    <form method="get" action="/events" className="flex flex-wrap items-end gap-3" onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const selected = parseEventPreference(new URLSearchParams([[EVENT_PREFERENCE_PARAM, String(data.get(EVENT_PREFERENCE_PARAM) ?? "")]]));
      setParams(withEventPreference(new URLSearchParams(), selected), { preventScrollReset: true });
    }}>
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="calendar-format-preference" className="font-semibold">Your preferred event format</label>
        <select key={preference} id="calendar-format-preference" name={EVENT_PREFERENCE_PARAM} defaultValue={preference} className="max-w-full rounded-lg border border-gray-400 bg-white p-3 text-base">
          {(Object.keys(EVENT_PREFERENCE_LABELS) as EventPreference[]).map(value => <option key={value} value={value}>{EVENT_PREFERENCE_LABELS[value]}</option>)}
        </select>
      </div>
      <button type="submit" className="rounded-lg bg-[#4b1bd1] px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2">Apply preference</button>
    </form>
    <p role="status" className="mt-4 font-semibold">Selected: {EVENT_PREFERENCE_LABELS[preference]}.</p>
    <p className="mt-2">The full calendar below is not filtered by format. Keep your preference in mind and confirm location, online ticket choices, availability and admission on the organiser's page. A venue address does not rule out a separate online ticket.</p>
  </section>;
}
