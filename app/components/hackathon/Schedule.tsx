import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";

interface Event {
  title: string;
  date: string;
  dateTime: string;
  locations: {
    city: string;
    venue: string;
  }[];
  timeSlots: Array<{
    name: string;
    start: string;
    end: string;
  }>;
}

const events: Event[] = [
  {
    title: "Hack Day 1",
    date: "Sat, 29 Nov",
    dateTime: "2025-11-29",
    locations: [
      { city: "Melbourne", venue: "Stone & Chalk, 121 King St" },
    ],
    timeSlots: [
      { name: "TBC", start: "5:00 PM", end: "6:00 PM" },

    ],
  },
  {
    title: "Hack Day 2",
    date: "Sun, 30 Nov",
    dateTime: "2025-11-30",
    locations: [
      { city: "Melbourne", venue: "Stone & Chalk, 121 King St" },
    ],
    timeSlots: [
      { name: "TBC", start: "5:00 PM", end: "6:00 PM" },

    ],
  },
];

export function Schedule() {
  return (
    <section
      id="schedule"
      aria-label="Schedule"
      className="py-16 sm:py-24 bg-gray-900"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <H2 className="text-teal-200 font-display tracking-tight mb-4">
            What&apos;s happening when and where?
          </H2>
          <p className="text-gray-300">
            The hackathon consists of two main events, each happening in both Melbourne and Sydney.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, eventIndex) => (
            <div
              key={eventIndex}
              className="rounded-lg bg-gray-800/50 border border-gray-700 p-6"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-teal-200 mb-2">
                  {event.title}
                </h3>
                <time
                  dateTime={event.dateTime}
                  className="text-gray-300 font-mono"
                >
                  {event.date}
                </time>
              </div>

              <div className="mb-6 space-y-2">
                {event.locations.map((location, locIndex) => (
                  <div key={locIndex} className="text-sm text-gray-400">
                    <span className="font-semibold text-teal-300">
                      {location.city}:
                    </span>{" "}
                    {location.venue}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Timeline
                </h4>
                <ol className="space-y-2">
                  {event.timeSlots.map((slot, slotIndex) => (
                    <li
                      key={slotIndex}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="flex-shrink-0 w-16 text-right">
                        <div className="font-mono text-teal-300 text-xs">
                          {slot.start}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">
                          {slot.name}
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5">
                          until {slot.end}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
