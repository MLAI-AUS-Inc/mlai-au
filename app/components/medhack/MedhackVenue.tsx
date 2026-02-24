import { MapPinIcon } from "@heroicons/react/24/outline";
import { MEDHACK_VENUE } from "~/data/medhack-frontiers";

export default function MedhackVenue() {
  return (
    <section id="venue" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">Venue</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hackathon venue — main card */}
        <div className="lg:col-span-2 rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-6 w-6 shrink-0 text-[#e2a9f1]" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                {MEDHACK_VENUE.hackathon.name}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.hackathon.address}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.hackathon.dates}
              </p>
              <p className="mt-3 text-sm text-white/50">
                {MEDHACK_VENUE.hackathon.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Team Formation */}
        <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-6 w-6 shrink-0 text-[#e2a9f1]" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                Team Formation
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.teamFormation.name}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.teamFormation.address}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.teamFormation.date}
              </p>
            </div>
          </div>
        </div>

        {/* Pitch Night */}
        <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-6 w-6 shrink-0 text-[#e2a9f1]" />
            <div>
              <h3 className="text-lg font-semibold text-white">Pitch Night</h3>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.pitchNight.name}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.pitchNight.address}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {MEDHACK_VENUE.pitchNight.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
