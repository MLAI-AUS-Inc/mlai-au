import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  MEDHACK_JUDGING_OVERVIEW,
  MEDHACK_JUDGING_CRITERIA,
} from "~/data/medhack-frontiers";

export default function MedhackJudging() {
  const totalScore = MEDHACK_JUDGING_CRITERIA.reduce((sum, c) => sum + c.maxScore, 0);

  return (
    <section id="judging" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">Judging Criteria</h2>

      <p className="text-white/70 mb-8">{MEDHACK_JUDGING_OVERVIEW}</p>

      {/* Scoring breakdown table */}
      <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Scoring Breakdown</h3>
        <p className="text-sm text-white/60 mb-4">
          Not all criteria are weighted equally. The table below shows the maximum points for each category.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2a9f1]/20">
                <th className="text-left py-2 pr-4 text-white/70 font-medium">Category</th>
                <th className="text-right py-2 pl-4 text-white/70 font-medium">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {MEDHACK_JUDGING_CRITERIA.map((c) => (
                <tr key={c.name} className="border-b border-[#e2a9f1]/10">
                  <td className="py-2.5 pr-4 text-white/80">{c.name}</td>
                  <td className="py-2.5 pl-4 text-right text-[#e2a9f1] font-semibold">/{c.maxScore}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2.5 pr-4 text-white font-bold">Total</td>
                <td className="py-2.5 pl-4 text-right text-[#e2a9f1] font-bold">/{totalScore}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-white/50">
          Scores between semifinal judges are normalised to ensure fairness across judging panels.
        </p>
      </div>

      <div>
        {MEDHACK_JUDGING_CRITERIA.map((criterion) => (
          <Disclosure key={criterion.name}>
            {({ open }) => (
              <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 mb-4">
                <DisclosureButton className="w-full flex justify-between items-center p-5 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">
                      {criterion.name}
                    </span>
                    <span className="text-sm text-[#e2a9f1]/70 font-medium">/{criterion.maxScore}</span>
                  </div>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white/50 ui-open:rotate-180 transition-transform duration-200"
                  />
                </DisclosureButton>

                <DisclosurePanel className="px-5 pb-5">
                  <p className="text-white/70 mb-4">{criterion.description}</p>

                  <p className="text-sm font-semibold text-white/80 mb-2">
                    Key Questions
                  </p>
                  <ul className="list-disc list-inside space-y-1 mb-6">
                    {criterion.questions.map((question) => (
                      <li key={question} className="text-sm text-white/60">
                        {question}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm font-semibold text-white/80 mb-2">
                    Scoring Rubric
                  </p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[80px_1fr] gap-2">
                      <span className="text-sm font-medium text-green-400">
                        High
                      </span>
                      <span className="text-white/60 text-sm">
                        {criterion.high}
                      </span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-2">
                      <span className="text-sm font-medium text-yellow-400">
                        Medium
                      </span>
                      <span className="text-white/60 text-sm">
                        {criterion.medium}
                      </span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-2">
                      <span className="text-sm font-medium text-red-400">
                        Low
                      </span>
                      <span className="text-white/60 text-sm">
                        {criterion.low}
                      </span>
                    </div>
                  </div>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
