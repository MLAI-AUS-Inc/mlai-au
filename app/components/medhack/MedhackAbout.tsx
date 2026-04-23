import { MEDHACK_ABOUT } from "~/data/medhack-frontiers";

const orgs = [
  { name: "MLAI", description: MEDHACK_ABOUT.mlai },
  { name: "MYMI", description: MEDHACK_ABOUT.mymi },
];

export default function MedhackAbout() {
  return (
    <section id="about" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">
        Who Are{" "}
        <span className="text-[#e2a9f1]">MLAI</span> &{" "}
        <span className="text-[#e2a9f1]">MYMI</span>?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orgs.map((org) => (
          <div
            key={org.name}
            className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-white">{org.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {org.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
