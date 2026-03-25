import { MEDHACK_CODE_OF_CONDUCT } from "~/data/medhack-frontiers";

export default function MedhackCodeOfConduct() {
  return (
    <section id="code-of-conduct" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-2">
        Code of Ethical Conduct
      </h2>
      <p className="text-white/70 mb-8">
        All participants must adhere to the following code of conduct.
      </p>

      <ol className="list-none p-0 m-0">
        {MEDHACK_CODE_OF_CONDUCT.map((rule, index) => (
          <li
            key={rule.title}
            className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 mb-4"
          >
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#783f8e] text-white text-sm font-bold mr-3 shrink-0">
                {index + 1}
              </span>
              <div>
                <span className="text-lg font-semibold text-white">
                  {rule.title}
                </span>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
