import { useState } from "react";
import { MEDHACK_SCHEDULE } from "~/data/medhack-frontiers";

function ScheduleCard({ day }: { day: (typeof MEDHACK_SCHEDULE)[number] }) {
  return (
    <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
      <h3 className="text-xl font-bold text-white uppercase text-center">
        {day.title}
      </h3>
      <p className="mt-1 text-sm font-bold uppercase text-white/50 text-center">
        {day.date}
      </p>
      <p className="mt-3 text-sm text-white/70">{day.summary}</p>

      {day.location && (
        <p className="mt-2 text-sm text-white/50">
          <span className="text-[#e2a9f1]">Location:</span> {day.location}
        </p>
      )}

      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {day.timeSlots.map((slot, i) => (
          <li key={i} className="py-3">
            <span className="block font-mono text-xs text-[#e2a9f1]">
              {slot.start}
              {slot.end ? ` – ${slot.end}` : ""}
            </span>
            <span className="block text-sm font-medium text-white">
              {slot.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MedhackSchedule() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="schedule" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">Schedule</h2>

      {/* Tab buttons — visible on mobile, hidden on lg */}
      <div className="flex gap-x-3 overflow-x-auto pb-4 mb-8 lg:hidden">
        {MEDHACK_SCHEDULE.map((day, idx) => (
          <button
            key={day.title}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={
              idx === activeTab
                ? "bg-[#783f8e] text-white rounded-full px-5 py-2.5 text-sm font-bold uppercase whitespace-nowrap"
                : "text-white/50 hover:text-white hover:bg-white/5 rounded-full px-5 py-2.5 text-sm font-bold uppercase whitespace-nowrap"
            }
          >
            {day.title}
          </button>
        ))}
      </div>

      {/* Mobile: show only active tab's content */}
      <div className="lg:hidden">
        <ScheduleCard day={MEDHACK_SCHEDULE[activeTab]} />
      </div>

      {/* Desktop: show all 4 schedule cards */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {MEDHACK_SCHEDULE.map((day) => (
          <ScheduleCard key={day.title} day={day} />
        ))}
      </div>
    </section>
  );
}
