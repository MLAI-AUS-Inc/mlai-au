import { useMemo, useState } from "react";

const FIT_CRITERIA = [
  {
    id: "outcome",
    label: "The program targets our next company constraint",
    help: "Name the decision or outcome you need in the next 8–16 weeks—not “more exposure”.",
  },
  {
    id: "eligibility",
    label: "We satisfy every published eligibility requirement",
    help: "Check geography, stage, affiliation, sector, company status, traction and founder attendance.",
  },
  {
    id: "terms",
    label: "We understand the complete economic terms",
    help: "Investment, valuation or SAFE mechanics, equity, fees, future rights, credits and conditions are written down.",
  },
  {
    id: "capacity",
    label: "The time and location commitment is realistic",
    help: "Include travel, preparation, customer disruption and the work expected between sessions.",
  },
  {
    id: "access",
    label: "Named people or partners match the constraint",
    help: "Confirm relevant operators, customers, technical experts or investors—not only a large network headline.",
  },
  {
    id: "alumni",
    label: "At least two relevant alumni have shared first-hand evidence",
    help: "Ask what was promised, delivered, missing and worth the opportunity cost.",
  },
  {
    id: "alternatives",
    label: "We compared the program with a specific alternative",
    help: "For example: customer work, a grant, paid advice, community, incubator or raising directly.",
  },
  {
    id: "decision",
    label: "We set an accept/decline rule before applying",
    help: "Name the maximum dilution, time cost and conditions under which you would walk away.",
  },
] as const;

type FitCriterionId = (typeof FIT_CRITERIA)[number]["id"];
type FitValue = 0 | 1 | 2;

function getFitResult(score: number) {
  if (score <= 5) {
    return {
      label: "Do not apply yet",
      detail:
        "The application is likely to consume founder time before the program, terms or desired outcome are clear.",
      style: "bg-red-100 text-red-950",
    };
  }
  if (score <= 11) {
    return {
      label: "Verify before applying",
      detail:
        "There may be a fit, but the unknowns could change the decision. Resolve them with the program and alumni.",
      style: "bg-orange-100 text-orange-950",
    };
  }
  return {
    label: "Strong shortlist candidate",
    detail:
      "The program is sufficiently understood to compare seriously. Recheck the offer documents before accepting.",
    style: "bg-emerald-100 text-emerald-950",
  };
}

export default function AcceleratorFitScorecard() {
  const [programName, setProgramName] = useState("");
  const [scores, setScores] = useState<Record<FitCriterionId, FitValue>>(() =>
    Object.fromEntries(FIT_CRITERIA.map((criterion) => [criterion.id, 0])) as Record<
      FitCriterionId,
      FitValue
    >,
  );

  const total = useMemo(
    () => Object.values(scores).reduce<number>((sum, value) => sum + value, 0),
    [scores],
  );
  const result = getFitResult(total);

  return (
    <section
      aria-labelledby="accelerator-fit-heading"
      className="not-prose my-10 rounded-[30px] border-2 border-gray-950 bg-[#fefc22] p-5 shadow-[7px_7px_0_#111827] sm:p-8"
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
        MLAI founder worksheet
      </p>
      <h2
        id="accelerator-fit-heading"
        className="mt-2 text-3xl font-black tracking-tight text-gray-950"
      >
        Score program fit before writing the application
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-800">
        Score the published evidence and what you have verified—not what you
        hope the program will provide. This worksheet is not submitted or saved.
      </p>

      <label className="mt-6 block text-sm font-black text-gray-950">
        Program being assessed
        <input
          value={programName}
          onChange={(event) => setProgramName(event.target.value)}
          placeholder="Example: CSIRO ON Accelerate"
          className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm text-gray-950 outline-none placeholder:text-gray-500 focus:border-[#4b1bd1] focus:ring-4 focus:ring-purple-100"
        />
      </label>

      <fieldset className="mt-6">
        <legend className="text-sm font-black text-gray-950">
          Evidence score: unknown 0, partly verified 1, verified 2
        </legend>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {FIT_CRITERIA.map((criterion) => (
            <label
              key={criterion.id}
              className="rounded-2xl border border-gray-300 bg-white p-4"
            >
              <span className="block text-sm font-black text-gray-950">
                {criterion.label}
              </span>
              <span className="mt-1 block min-h-10 text-xs leading-5 text-gray-700">
                {criterion.help}
              </span>
              <select
                value={scores[criterion.id]}
                onChange={(event) =>
                  setScores((current) => ({
                    ...current,
                    [criterion.id]: Number(event.target.value) as FitValue,
                  }))
                }
                className="mt-3 w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm font-black text-gray-950 outline-none focus:border-[#4b1bd1] focus:ring-4 focus:ring-purple-100"
                aria-label={`${criterion.label} score`}
              >
                <option value={0}>0 — Unknown</option>
                <option value={1}>1 — Partly verified</option>
                <option value={2}>2 — Verified</option>
              </select>
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className={`mt-6 rounded-2xl p-5 ${result.style}`}>
        <p className="m-0 text-xs font-black uppercase tracking-[0.16em]">
          {programName.trim() || "Program"}: {total} / 16
        </p>
        <p className="mt-2 text-xl font-black">{result.label}</p>
        <p className="mt-2 text-sm leading-6">{result.detail}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          setProgramName("");
          setScores(
            Object.fromEntries(
              FIT_CRITERIA.map((criterion) => [criterion.id, 0]),
            ) as Record<FitCriterionId, FitValue>,
          );
        }}
        className="mt-4 text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
      >
        Clear scorecard
      </button>
    </section>
  );
}
