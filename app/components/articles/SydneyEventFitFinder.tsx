import { useSearchParams } from "react-router";
import { useArticleReadMinute } from "./ArticleReadTime";
import { parseEventPreference, type EventPreference } from "~/lib/event-preference";
import { currentSydneySessions, SYDNEY_AI_TECH_EVENTS, SYDNEY_STATUS_LABELS, sydneyEventStatus, type SydneyAiTechEvent, type SydneyEventGoal } from "~/lib/sydney-ai-tech-events";

export const SYDNEY_GOAL_LABELS: Record<SydneyEventGoal, string> = { all: "Any relevant topic", build: "Build software or AI", research: "Discuss research", founders: "Meet founders", business: "Apply AI in business", careers: "Explore developer careers", data: "Work with data", web: "Build for the web" };
type Cost = "either" | "free" | "paid";
export function sydneyFinderChoices(params: URLSearchParams) {
  const one = (key: string) => params.getAll(key).length === 1 ? params.get(key) : null;
  const goal = one("event_goal"), cost = one("event_cost");
  return { goal: goal && Object.hasOwn(SYDNEY_GOAL_LABELS, goal) ? goal as SydneyEventGoal : "all" as const,
    cost: cost === "free" || cost === "paid" ? cost : "either" as Cost,
    preference: parseEventPreference(params, "sydney") };
}
export function selectSydneySessions({ now, goal = "all", preference = "sydney", cost = "either", events = SYDNEY_AI_TECH_EVENTS }: {
  now: number | null; goal?: SydneyEventGoal; preference?: EventPreference; cost?: Cost; events?: SydneyAiTechEvent[];
}) {
  return currentSydneySessions(now, events).filter(event =>
    (goal === "all" || event.goals.includes(goal)) &&
    (preference === "all" || (preference === "online" ? event.formats.includes("online") : event.formats.includes("in-person") && event.inPersonCity === (preference === "sydney" ? "Sydney" : "Melbourne"))) &&
    (cost === "either" || event.costCategory === cost)
  ).sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt) || a.id.localeCompare(b.id));
}
export default function SydneyEventFitFinder() {
  const now = useArticleReadMinute();
  const [params, setParams] = useSearchParams();
  const choices = sydneyFinderChoices(params);
  const matches = selectSydneySessions({ now, ...choices });
  return <section id="sydney-event-fit" aria-labelledby="sydney-event-fit-heading" className="not-prose my-10 min-w-0 rounded-2xl border-2 border-gray-950 bg-[#c7ff5e] p-5 text-gray-950 sm:p-8">
    <h2 id="sydney-event-fit-heading" className="text-3xl font-bold">Make a Sydney or online shortlist</h2>
    <p className="mt-3">Choose the participation you want. Matches satisfy every selected filter and are ordered by listed start, not quality or popularity. Past, overdue and uncertain-closing listings stay in the source directory below, not the current shortlist.</p>
    <form method="get" key={params.toString()} className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2" onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const next = new URLSearchParams(params);
      for (const key of ["event_goal", "event_format", "event_cost"]) next.set(key, String(data.get(key) ?? ""));
      setParams(next, { preventScrollReset: true });
    }}>
      <label className="flex min-w-0 flex-col gap-2 font-semibold">Main goal<select name="event_goal" defaultValue={choices.goal} className="min-w-0 w-full max-w-full rounded-lg border border-gray-500 bg-white p-3 text-base">{Object.entries(SYDNEY_GOAL_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="flex min-w-0 flex-col gap-2 font-semibold">Format<select name="event_format" defaultValue={choices.preference} className="min-w-0 w-full max-w-full rounded-lg border border-gray-500 bg-white p-3 text-base"><option value="sydney">Sydney in person</option><option value="online">Online options</option><option value="all">Either format</option>{choices.preference === "melbourne" && <option value="melbourne">Melbourne — use the Melbourne guide</option>}</select></label>
      <label className="flex min-w-0 flex-col gap-2 font-semibold">Cost preference<select name="event_cost" defaultValue={choices.cost} className="min-w-0 w-full max-w-full rounded-lg border border-gray-500 bg-white p-3 text-base"><option value="either">Any stated or unknown cost</option><option value="free">Explicitly free</option><option value="paid">Paid</option></select></label>
      <div className="flex flex-wrap items-end gap-3"><button type="submit" className="min-h-11 rounded-lg bg-gray-950 px-5 py-3 font-bold text-white">Apply shortlist</button><a href="?event_format=sydney" className="inline-flex min-h-11 items-center font-semibold underline">Reset shortlist</a></div>
    </form>
    <p className="mt-3 text-sm">These non-sensitive selections appear in the page URL and browser history. No RSVP is sent. The form works without JavaScript; with scripts enabled, date status also updates while this page stays open.</p>
    <p role="status" className="mt-5 font-bold">{matches.length} {matches.length === 1 ? "listed option matches" : "listed options match"} all filters. A match is not admission.</p>
    {matches.length ? <ul className="mt-4 grid gap-4 lg:grid-cols-2">{matches.map(event => <li key={event.id} data-sydney-match={event.id} className="min-w-0 rounded-xl border border-gray-300 bg-white p-5">
      <h3 className="text-xl font-bold">{event.name}</h3>
      <p className="mt-2 font-semibold">{SYDNEY_STATUS_LABELS[sydneyEventStatus(event, now)]}</p>
      <p className="mt-2">{event.schedule}</p><p className="mt-2">{event.readerFit}</p><p className="mt-2">{event.location}</p><p className="mt-2">{event.price}</p><p className="mt-2">{event.admission}</p>
      {event.uncertainty && <p className="mt-2 text-sm">{event.uncertainty}</p>}
      <a className="mt-3 inline-flex min-h-11 items-center font-bold text-purple-800 underline" href={event.sourceUrl}>Check organiser and admission<span className="sr-only">: {event.name}</span></a>
    </li>)}</ul> : <p className="mt-4 rounded-lg bg-white p-4">No recently checked option matches this selection. That does not mean none exists. Do not substitute a past seminar, an unknown price or a paid stream for a free online session. Review the organiser sources or change a filter.</p>}
    <p className="mt-4 text-sm">Latest organiser check: 29 October; refreshed event records are due for review 5 November 2026 at midnight Sydney time. Historical records retain their earlier check dates. Closing-time conflicts stop current-time matches at the earliest published finish. Date windows do not imply a session runs continuously.</p>
  </section>;
}
