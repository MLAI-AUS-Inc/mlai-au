import { MEDHACK_POLICIES } from "~/data/medhack-frontiers";

export default function MedhackPolicies() {
  return (
    <section id="policies" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-6">
        Policies & Information
      </h2>
      {MEDHACK_POLICIES.map((policy) => (
        <div
          key={policy.title}
          className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 mb-4"
        >
          <h3 className="text-lg font-semibold text-white">{policy.title}</h3>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">
            {policy.description}
          </p>
        </div>
      ))}
    </section>
  );
}
