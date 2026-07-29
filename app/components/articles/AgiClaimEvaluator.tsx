import { useMemo, useState } from "react";

const CLAIM_CHECKS = [
  {
    id: "definition",
    title: "The definition is explicit",
    description:
      "The claimant states what AGI means and the threshold the system is said to cross.",
  },
  {
    id: "breadth",
    title: "Breadth is demonstrated",
    description:
      "Evidence covers materially different domains and tasks, not several variants of one prepared skill.",
  },
  {
    id: "baseline",
    title: "The comparison is defined",
    description:
      "The report names the human or system baseline, task population and success criteria.",
  },
  {
    id: "novelty",
    title: "Transfer is tested on unfamiliar work",
    description:
      "Held-out tasks test adaptation or skill acquisition, with preparation and training boundaries disclosed.",
  },
  {
    id: "reliability",
    title: "Reliability and failures are reported",
    description:
      "Repeated trials, variation, failure modes and stopping conditions are visible—not just the best run.",
  },
  {
    id: "independence",
    title: "Independent scrutiny exists",
    description:
      "External evaluators can inspect, reproduce or challenge the method and result.",
  },
  {
    id: "assistance",
    title: "Assistance and contamination are addressed",
    description:
      "Prompts, tools, human help, test exposure and possible benchmark leakage are documented.",
  },
  {
    id: "deployment",
    title: "Autonomy and deployment conditions are clear",
    description:
      "The claim identifies who sets goals, when humans intervene, and the system’s cost, latency and safety boundaries.",
  },
] as const;

type ClaimCheckId = (typeof CLAIM_CHECKS)[number]["id"];

function getResult(score: number) {
  if (score <= 2) {
    return {
      label: "Poorly specified",
      detail:
        "There is not enough information to assess the claim. Ask for a definition, test protocol and complete results.",
      colour: "bg-red-100 text-red-950",
    };
  }

  if (score <= 5) {
    return {
      label: "Assessable in part",
      detail:
        "Some useful evidence is present, but major gaps could still turn a capability result into an AGI headline.",
      colour: "bg-orange-100 text-orange-950",
    };
  }

  if (score <= 7) {
    return {
      label: "Substantive, still incomplete",
      detail:
        "The claim is comparatively well described. Resolve the unchecked evidence gaps before repeating it as fact.",
      colour: "bg-yellow-100 text-yellow-950",
    };
  }

  return {
    label: "Well specified—not proven",
    detail:
      "The claim is ready for serious scrutiny. A complete checklist improves assessability; it does not prove AGI or create scientific consensus.",
    colour: "bg-emerald-100 text-emerald-950",
  };
}

export default function AgiClaimEvaluator() {
  const [claim, setClaim] = useState("");
  const [checked, setChecked] = useState<Set<ClaimCheckId>>(new Set());

  const result = useMemo(() => getResult(checked.size), [checked.size]);

  const toggle = (id: ClaimCheckId) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      aria-labelledby="agi-claim-evaluator-heading"
      className="not-prose my-10 rounded-[30px] border-2 border-gray-950 bg-[#fefc22] p-5 shadow-[7px_7px_0_#111827] sm:p-8"
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
        MLAI evidence worksheet
      </p>
      <h2
        id="agi-claim-evaluator-heading"
        className="mt-2 text-3xl font-black tracking-tight text-gray-950"
      >
        Stress-test an AGI claim
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-800">
        Paste or summarise the claim for your own working notes, then check only
        what its published evidence supports. Nothing is submitted or saved.
      </p>

      <label className="mt-6 block text-sm font-black text-gray-900">
        Claim or source
        <textarea
          value={claim}
          onChange={(event) => setClaim(event.target.value)}
          rows={3}
          placeholder="Example: The vendor says Model X is AGI because it passed Benchmark Y."
          className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm leading-6 text-gray-950 outline-none placeholder:text-gray-500 focus:border-[#4b1bd1] focus:ring-4 focus:ring-purple-100"
        />
      </label>

      <fieldset className="mt-6">
        <legend className="text-sm font-black text-gray-950">
          Which evidence is actually disclosed?
        </legend>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {CLAIM_CHECKS.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <label
                key={item.id}
                className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
                  isChecked
                    ? "border-[#4b1bd1] bg-purple-50"
                    : "border-gray-300 bg-white hover:border-gray-500"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="mt-1 size-5 shrink-0 accent-[#4b1bd1]"
                />
                <span>
                  <span className="block text-sm font-black text-gray-950">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-gray-700">
                    {item.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div
        aria-live="polite"
        className={`mt-6 rounded-2xl p-5 ${result.colour}`}
      >
        <p className="m-0 text-xs font-black uppercase tracking-[0.16em]">
          Evidence score {checked.size} / {CLAIM_CHECKS.length}
        </p>
        <p className="mt-2 text-xl font-black">{result.label}</p>
        <p className="mt-2 text-sm leading-6">{result.detail}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          setClaim("");
          setChecked(new Set());
        }}
        className="mt-4 text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
      >
        Clear worksheet
      </button>
    </section>
  );
}
