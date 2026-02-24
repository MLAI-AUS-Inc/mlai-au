import { useState } from "react";
import {
  MEDHACK_MENTOR_SCHEDULE_DAY1,
  MEDHACK_MENTOR_SCHEDULE_DAY2,
} from "~/data/medhack-frontiers";
import type { MedhackMentorScheduleDay } from "~/data/medhack-frontiers";

const schedules: MedhackMentorScheduleDay[] = [
  MEDHACK_MENTOR_SCHEDULE_DAY1,
  MEDHACK_MENTOR_SCHEDULE_DAY2,
];

export default function MedhackMentorSchedule() {
  const [activeTab, setActiveTab] = useState(0);
  const activeSchedule = schedules[activeTab];

  return (
    <section id="mentor-schedules" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-6">Mentor Schedules</h2>

      <div className="flex gap-2 mb-8">
        {schedules.map((schedule, index) => (
          <button
            key={schedule.date}
            onClick={() => setActiveTab(index)}
            className={
              activeTab === index
                ? "bg-[#783f8e] text-white rounded-full px-5 py-2.5 text-sm font-bold"
                : "text-white/50 hover:text-white rounded-full px-5 py-2.5 text-sm font-bold"
            }
          >
            {schedule.title}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#783f8e]/20">
            <tr>
              <th className="sticky left-0 bg-[#1a0e2e] z-10 text-xs font-bold uppercase text-white/70 px-3 py-3 text-left">
                Mentor
              </th>
              {activeSchedule.timeBlocks.map((time) => (
                <th
                  key={time}
                  className="text-xs font-bold uppercase text-white/70 px-3 py-3 text-center"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activeSchedule.mentors.map((mentor) => (
              <tr key={mentor.name}>
                <td className="font-medium text-sm text-white sticky left-0 bg-[#1a0e2e] z-10 px-3 py-2 whitespace-nowrap">
                  {mentor.name}
                </td>
                {mentor.available.map((isAvailable, i) => (
                  <td key={i} className="text-center px-3 py-2">
                    {isAvailable ? (
                      <span className="text-green-400 text-lg">&#10003;</span>
                    ) : (
                      <span className="text-white/20">&mdash;</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
