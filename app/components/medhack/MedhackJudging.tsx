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
  return (
    <section id="judging" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">Judging Criteria</h2>

      <p className="text-white/70 mb-8">{MEDHACK_JUDGING_OVERVIEW}</p>

      <div>
        {MEDHACK_JUDGING_CRITERIA.map((criterion) => (
          <Disclosure key={criterion.name}>
            {({ open }) => (
              <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 mb-4">
                <DisclosureButton className="w-full flex justify-between items-center p-5 text-left">
                  <span className="text-lg font-semibold text-white">
                    {criterion.name}
                  </span>
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
