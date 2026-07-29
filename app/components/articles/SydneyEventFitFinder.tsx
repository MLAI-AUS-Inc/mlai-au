import { useMemo, useState } from "react";

import {
  SYDNEY_AI_TECH_EVENTS,
  type SydneyAiTechEvent,
  type SydneyEventFormat,
  type SydneyEventGoal,
} from "~/lib/sydney-ai-tech-events";

type FormatPreference = SydneyEventFormat | "either";
type CostPreference = "free" | "paid" | "either";

const GOAL_LABELS: Record<SydneyEventGoal, string> = {
  build: "Build software or AI",
  research: "Discuss research",
  founders: "Meet founders",
  business: "Apply AI in business",
  careers: "Grow my career",
  data: "Work with data",
  web: "Build for the web",
};

export function rankSydneyEvents({
  events = SYDNEY_AI_TECH_EVENTS,
  goal,
  format,
  cost,
}: {
  events?: SydneyAiTechEvent[];
  goal: SydneyEventGoal;
  format: FormatPreference;
  cost: CostPreference;
}) {
  return events
    .map((event) => {
      let score = 0;
      const reasons: string[] = [];

      if (event.goals.includes(goal)) {
        score += 5;
        reasons.push(`Matches: ${GOAL_LABELS[goal]}`);
      }

      if (format === "either" || event.formats.includes(format)) {
        score += format === "either" ? 1 : 3;
        reasons.push(
          format === "either"
            ? `Format: ${event.formats.join(" + ")}`
            : `Offers ${format}`,
        );
      }

      if (
        cost === "either" ||
        event.costCategory === cost ||
        event.costCategory === "mixed"
      ) {
        score += cost === "either" ? 1 : 2;
        reasons.push(
          cost === "either" ? event.cost : `Cost preference: ${event.cost}`,
        );
      }

      if (event.activityStatus === "upcoming") {
        score += 3;
        reasons.push("Future date verified");
      }

      return { event, score, reasons };
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        Number(right.event.activityStatus === "upcoming") -
          Number(left.event.activityStatus === "upcoming") ||
        left.event.name.localeCompare(right.event.name),
    );
}

export default function SydneyEventFitFinder() {
  const [goal, setGoal] = useState<SydneyEventGoal>("build");
  const [format, setFormat] = useState<FormatPreference>("either");
  const [cost, setCost] = useState<CostPreference>("either");

  const matches = useMemo(
    () => rankSydneyEvents({ goal, format, cost }).slice(0, 3),
    [cost, format, goal],
  );

  return (
    <section
      aria-labelledby="sydney-event-fit-heading"
      className="not-prose my-10 rounded-[30px] border-2 border-gray-950 bg-[#c7ff5e] p-5 shadow-[7px_7px_0_#111827] sm:p-8"
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
        MLAI event-fit worksheet
      </p>
      <h2
        id="sydney-event-fit-heading"
        className="mt-2 text-3xl font-black tracking-tight text-gray-950"
      >
        Find three groups worth checking
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-800">
        Choose what you need from the room. The ranking runs in your browser
        and does not submit or save your choices. A high match is a prompt to
        inspect the organiser page, not an endorsement.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm font-black text-gray-900">
          Main goal
          <select
            value={goal}
            onChange={(event) =>
              setGoal(event.currentTarget.value as SydneyEventGoal)
            }
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          >
            {Object.entries(GOAL_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-black text-gray-900">
          Format
          <select
            value={format}
            onChange={(event) =>
              setFormat(event.currentTarget.value as FormatPreference)
            }
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          >
            <option value="either">Either</option>
            <option value="in-person">In person</option>
            <option value="online">Online</option>
          </select>
        </label>

        <label className="text-sm font-black text-gray-900">
          Cost preference
          <select
            value={cost}
            onChange={(event) =>
              setCost(event.currentTarget.value as CostPreference)
            }
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          >
            <option value="either">Either</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </label>
      </div>

      <div aria-live="polite" className="mt-6 grid gap-4 lg:grid-cols-3">
        {matches.map(({ event, reasons }, index) => (
          <article
            key={event.name}
            className="flex h-full flex-col rounded-2xl border border-gray-300 bg-white p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#4b1bd1]">
              Match {index + 1} · {event.activityStatus === "upcoming"
                ? "future date verified"
                : "check next date"}
            </p>
            <h3 className="mt-2 text-xl font-black text-gray-950">
              {event.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              {event.nextOrLatestActivity}
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-700">
              {reasons.slice(0, 3).map((reason) => (
                <li key={reason}>✓ {reason}</li>
              ))}
            </ul>
            <a
              href={event.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-5 text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
            >
              Check the organiser page
            </a>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-gray-950 p-5 text-sm leading-6 text-gray-200">
        <p className="font-black text-white">Before you RSVP</p>
        <ol className="mt-2 grid gap-2 md:grid-cols-2">
          <li>1. Recheck the date and cancellation notices.</li>
          <li>2. Confirm price, venue and online link.</li>
          <li>3. Ask the organiser about access needs.</li>
          <li>4. Prepare one question and a 20-second introduction.</li>
          <li>5. Decide whom you will follow up with the next day.</li>
          <li>6. Contribute to the room before making a pitch.</li>
        </ol>
      </div>

      <button
        type="button"
        onClick={() => {
          setGoal("build");
          setFormat("either");
          setCost("either");
        }}
        className="mt-5 text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
      >
        Reset worksheet
      </button>
    </section>
  );
}
