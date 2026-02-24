import { MEDHACK_SUBTOPICS } from "~/data/medhack-frontiers";

export default function MedhackSubtopics() {
  return (
    <section id="subtopics" className="scroll-mt-24 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Subtopics & Challenges
        </h2>
        <p className="mt-2 text-sm text-white/50">
          5 pitching challenges + 1 coding challenge
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEDHACK_SUBTOPICS.map((subtopic) => (
          <div
            key={subtopic.name}
            className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6"
          >
            <span
              className={`inline-block text-xs font-bold uppercase px-2 py-1 rounded-full ${
                subtopic.type === "pitching"
                  ? "bg-[#783f8e]/30 text-[#e2a9f1]"
                  : "bg-[#e2a9f1]/20 text-[#e2a9f1]"
              }`}
            >
              {subtopic.type}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {subtopic.name}
            </h3>
            <p className="mt-2 text-sm text-white/70">{subtopic.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
