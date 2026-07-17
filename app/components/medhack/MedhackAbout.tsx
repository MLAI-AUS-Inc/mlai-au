import { MEDHACK_ABOUT } from "~/data/medhack-frontiers";
import { HEALTHHACK_BRAND } from "~/lib/healthhack-brand";

const orgs = [
  { name: "MLAI", description: MEDHACK_ABOUT.mlai },
  {
    name: "UNSW No Code Society",
    description: MEDHACK_ABOUT.ncs,
    logo: HEALTHHACK_BRAND.assets.ncs,
  },
];

export default function MedhackAbout() {
  return (
    <section id="about" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">
        Meet{" "}
        <span className="text-[#e2a9f1]">MLAI</span> &{" "}
        <span className="text-[#e2a9f1]">UNSW No Code Society</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orgs.map((org) => (
          <div
            key={org.name}
            className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8"
          >
            {org.logo ? (
              <div className="mb-5 inline-flex rounded-xl bg-[#0d061c] p-3">
                <img src={org.logo} alt="" className="h-16 w-auto object-contain" />
              </div>
            ) : null}
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
