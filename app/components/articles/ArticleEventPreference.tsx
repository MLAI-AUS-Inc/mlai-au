import { useSearchParams } from "react-router";
import { EVENT_PREFERENCE_LABELS, EVENT_PREFERENCE_PARAM, parseEventPreference, withEventPreference, type EventPreference } from "~/lib/event-preference";

/** Author-owned article path; only an allowlisted format travels to the CTA. */
export function ArticleEventPreference({ articlePath, idPrefix = "article-event", description = "This sets the MLAI calendar preference only. It does not filter the providers above, join a club or reserve a place." }: { articlePath: string; idPrefix?: string; description?: string }) {
  const [params, setParams] = useSearchParams();
  const preference = parseEventPreference(params);
  const id = `${idPrefix}-preference`;
  return <section className="not-prose my-6 rounded-xl border border-gray-300 p-5 text-gray-950" aria-labelledby={`${id}-title`}>
    <h3 id={`${id}-title`} className="text-xl font-semibold">Carry your preference to MLAI events</h3>
    <p className="mt-2">{description}</p>
    <form action={articlePath} method="get" className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const selected = parseEventPreference(new URLSearchParams([[EVENT_PREFERENCE_PARAM, String(data.get(EVENT_PREFERENCE_PARAM) ?? "")]]));
      setParams(withEventPreference(new URLSearchParams(), selected), { preventScrollReset: true });
    }}>
      <div className="w-full min-w-0 sm:flex-1">
        <label htmlFor={id} className="mb-1 block font-semibold">Preferred MLAI event format</label>
        <select key={preference} id={id} name={EVENT_PREFERENCE_PARAM} defaultValue={preference} className="w-full rounded-lg border border-gray-400 bg-white p-3 text-base">
          {(Object.keys(EVENT_PREFERENCE_LABELS) as EventPreference[]).map(value => <option key={value} value={value}>{EVENT_PREFERENCE_LABELS[value]}</option>)}
        </select>
      </div>
      <button type="submit" className="w-full rounded-lg bg-[#4b1bd1] px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto">Apply preference</button>
    </form>
    <p role="status" className="mt-4 font-semibold">Applied to the event CTA: {EVENT_PREFERENCE_LABELS[preference]}.</p>
    <p className="mt-2">Select All formats and apply to clear it. Your selection is kept in this page's URL, not saved as a private shortlist.</p>
  </section>;
}
