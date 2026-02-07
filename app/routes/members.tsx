import type { MetaFunction } from "react-router";
import { H1, H2, Body } from "~/components/ui/Typography";
import Team from "~/components/team";
import PreviousTeam from "~/components/previous-team";

export const meta: MetaFunction = () => [
    { title: "Meet the MLAI Volunteer Team | MLAI" },
    { name: "description", content: "Meet the passionate volunteers who drive MLAI forward, empowering Australia's AI and Machine Learning community. Current and previous team members." },
];

export default function Members() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate bg-gray-900 py-24">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <H1 className="text-white">Our Members</H1>
            <Body className="mt-6 text-gray-300">
              Meet the passionate volunteers who drive MLAI Aus forward, both past and present.
            </Body>
          </div>
        </div>
      </div>
      
      {/* Current Team Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <H2>Current Committee</H2>
            <Body className="mt-4">
              Our current leadership team working tirelessly to empower the Australian AI community.
            </Body>
          </div>
        </div>
        <Team />
      </div>
      
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>
      
      {/* Previous Team Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <H2>Co-founders & Past Committee</H2>
            <Body className="mt-4">
              Recognizing the co-founders and previous committee members who helped build MLAI Aus into what it is today.
            </Body>
          </div>
        </div>
        <PreviousTeam />
      </div>
    </main>
  );
}