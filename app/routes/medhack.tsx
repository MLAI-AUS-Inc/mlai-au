import type { MetaFunction } from "react-router";
import MedhackTableOfContents from "~/components/medhack/MedhackTableOfContents";
import MedhackHero from "~/components/medhack/MedhackHero";
import MedhackAbout from "~/components/medhack/MedhackAbout";
import MedhackSubtopics from "~/components/medhack/MedhackSubtopics";
import MedhackVenue from "~/components/medhack/MedhackVenue";
import MedhackSchedule from "~/components/medhack/MedhackSchedule";
import MedhackJudging from "~/components/medhack/MedhackJudging";
import MedhackMentorSchedule from "~/components/medhack/MedhackMentorSchedule";
import MedhackCodeOfConduct from "~/components/medhack/MedhackCodeOfConduct";
import MedhackPolicies from "~/components/medhack/MedhackPolicies";
import MedhackContact from "~/components/medhack/MedhackContact";

export const meta: MetaFunction = () => {
  return [
    { title: "MedHack: Frontiers 2026 — Information Pack | MLAI" },
    {
      name: "description",
      content:
        "Everything you need to know about MedHack: Frontiers 2026. Schedule, subtopics, judging criteria, mentors, venue details, and policies for Australia's premier healthcare AI hackathon.",
    },
    { property: "og:title", content: "MedHack: Frontiers 2026 — Information Pack" },
    {
      property: "og:description",
      content:
        "Join clinicians, builders and optimists for one intense weekend of healthcare AI problem-solving. February 15 – March 4, 2026.",
    },
  ];
};

export default function MedhackInfoPack() {
  return (
    <div className="min-h-screen bg-[#110822]">
      {/* Mobile TOC */}
      <div className="lg:hidden px-4 pt-6">
        <MedhackTableOfContents />
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop TOC */}
        <div className="hidden lg:block">
          <MedhackTableOfContents />
        </div>

        {/* Main content */}
        <div className="space-y-12 min-w-0">
          <MedhackHero />
          <MedhackAbout />

          <section id="event" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">The Event</h2>
            <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8 space-y-4">
              <p className="text-lg font-semibold text-white/90">
                Clinicians, builders and optimists in the same room for one intense weekend of problem-solving. Prototype real solutions to real healthcare bottlenecks.
              </p>
              <p className="text-white/70 leading-relaxed">
                MedHack: Frontiers brings clinicians, builders and optimists into the same room for one intense weekend of problem-solving at the cutting edge of medical innovation. With professionals from medicine, data science, and AI development all under one roof, we&apos;re pushing the boundaries of what&apos;s possible in healthcare.
              </p>
              <p className="text-white/70 leading-relaxed">
                The goal is simple yet ambitious: leverage cutting-edge technology to solve pressing real-world healthcare challenges.
              </p>
              <p className="text-white/70 leading-relaxed">
                By working closely with doctors, nurses, pharmacists, and industry mentors, participants will create AI-driven solutions that tackle high-impact healthcare challenges. We encourage everyone to participate in both tracts&mdash;code your solution in the Small Tract and pitch your ideas in the Big Tract for the complete experience. Whether you&apos;re new to AI or a seasoned expert, this hackathon is your chance to contribute to the future of healthcare innovation.
              </p>
            </div>
          </section>

          <MedhackSubtopics />
          <MedhackVenue />
          <MedhackSchedule />

          <section id="how-it-works" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-6">
              <p className="text-white/70 leading-relaxed">
                MedHack: Frontiers has two tracts. We encourage all participants to take on both for the full experience&mdash;code a solution and pitch your ideas.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Small Tract (Coding)</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Perfect for those who want to dive into hands-on AI development. You&apos;ll receive continuous patient vitals data&mdash;such as heart rate, blood pressure, and oxygen saturation&mdash;from simulated patients. Your task? Build an AI model that can monitor these vitals in real-time and alert healthcare staff when something looks abnormal. Whether you&apos;re new to AI or experienced in data science, our workshops and mentors will support you.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Big Tract (Pitching)</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Ready to tackle real-world healthcare challenges? You&apos;ll get access to real, de-identified Electronic Medical Record (EMR) data and work closely with healthcare mentors. Through interviews and guided discussions, you&apos;ll identify critical bottlenecks in the healthcare system and develop an AI-driven solution. Your mission: understand the problem, build a compelling demo, and pitch your idea to expert judges.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Path to Success</h3>
                <ol className="space-y-3">
                  {[
                    "Interview mentors to understand pain points and gather feedback on your idea.",
                    "Identify & define the problem using a design thinking approach.",
                    "Ideate & prototype\u2014brainstorm broadly, then pick the most promising concept.",
                    "Test & iterate by gathering feedback from mentors and potential end-users.",
                    "Pitch your solution with a compelling story: the problem, who benefits, how it works, and why it\u2019s better.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/70">
                      <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#783f8e] text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <MedhackJudging />
          <MedhackMentorSchedule />
          <MedhackCodeOfConduct />
          <MedhackPolicies />
          <MedhackContact />
        </div>
      </div>
    </div>
  );
}
