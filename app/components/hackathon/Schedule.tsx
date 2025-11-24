import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";
import clsx from "clsx";

interface Event {
  title: string;
  date: string;
  dateTime: string;
  summary: string;
  locations: {
    city: string;
    venue: string;
  }[];
  timeSlots: Array<{
    name: string;
    start: string;
    end?: string;
  }>;
}

const events: Event[] = [
  {
    title: "eSafety Day 1",
    date: "Saturday Nov 29",
    dateTime: "2025-11-29",
    summary: "The first day of the hackathon focused on eSafety challenges.",
    locations: [
      { city: "Melbourne", venue: "Stone & Chalk, 121 King St" },
    ],
    timeSlots: [
      { name: "Registration opens", start: "10:00 am" },
      { name: "Opening Ceremony", start: "10:30 am" },
      { name: "Hacking begins!", start: "11:30 am" },
      { name: "Macken Murphy - The Manosphere & Incel Ideology", start: "12:00 pm" },
      { name: "Lunch", start: "1:00 pm" },
      { name: "David Gilmore - Incel Radicalisation (Lived Experiences)", start: "2:00 pm" },
      { name: "Campbell Wilson - Countering online child exploitation", start: "4:00 pm" },
      { name: "Afternoon Snack", start: "5:00 pm" },
      { name: "Sarah Davis-Gilmore - Lived Experience, Safety, and Connection Online", start: "6:00 pm" },
      { name: "Dinner", start: "7:30 pm" },
      { name: "Wrap up", start: "8:30 pm" },
      { name: "Day 1 ends", start: "9:00 pm" },
    ],
  },
  {
    title: "eSafety Day 2",
    date: "Sunday Nov 30",
    dateTime: "2025-11-30",
    summary: "The second day continues with more hacking and eSafety talks.",
    locations: [
      { city: "Melbourne", venue: "Stone & Chalk, 121 King St" },
    ],
    timeSlots: [
      { name: "Doors open", start: "10:00 am" },
      { name: "Morning Tea", start: "10:00 am" },
      { name: "Maria & Ellen (eSafety) - All About eSafety", start: "12:00 pm" },
      { name: "Lunch", start: "1:00 pm" },
      { name: "Alan Agon (PaxMod) - Gaming Lounge Moderation", start: "2:00 pm" },
      { name: "Scotty (The Product Bus) - TBA", start: "4:00 pm" },
      { name: "Afternoon Snacks", start: "5:00 pm" },
      { name: "Dinner", start: "7:30 pm" },
      { name: "Wrap up", start: "8:30 pm" },
      { name: "Day 2 ends - [Optional] Teams can continue hacking through the week", start: "9:00 pm" },
    ],
  },
  {
    title: "Submission Deadline",
    date: "Friday Dec 5",
    dateTime: "2025-12-05",
    summary: "Final deadline for all hackathon project submissions.",
    locations: [],
    timeSlots: [
      { name: "Friday: Final submissions due", start: "11:59 pm" },
      { name: "Finalists announced Sunday 7th December", start: "Sunday" },
    ],
  },
  {
    title: "Pitch Day",
    date: "Thursday Dec 11",
    dateTime: "2025-12-11",
    summary: "The grand finale where finalists pitch their solutions.",
    locations: [
      { city: "Melbourne", venue: "Stone & Chalk, 121 King St" },
    ],
    timeSlots: [
      { name: "Doors Open", start: "3:00 pm" },
      { name: "Event opening", start: "3:10 pm" },
      { name: "Pitches begin", start: "3:30 pm" },
      { name: "Break & refreshments", start: "4:15 pm" },
      { name: "Pitches continue", start: "4:30 pm" },
      { name: "Startup Programs Presentation / Judges deliberate", start: "5:15 pm" },
      { name: "Feedback", start: "5:20 pm" },
      { name: "Winners announced", start: "5:30 pm" },
      { name: "Networking & Drinks", start: "5:30 pm" },
      { name: "Pitch day ends", start: "6:30 pm" },
    ],
  },
];

function ScheduleTab({ event }: { event: Event }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-8">
        <h3 className="text-2xl font-bold tracking-tight text-teal-200 mb-2">
          {event.title}
        </h3>
        <time
          dateTime={event.dateTime}
          className="text-lg text-gray-300 font-medium block mb-2"
        >
          {event.date}
        </time>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          {event.summary}
        </p>

        {event.locations.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-400 text-sm">
            {event.locations.map((location, locIndex) => (
              <div key={locIndex}>
                <span className="font-semibold text-teal-300">
                  {location.city}:
                </span>{" "}
                {location.venue}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full divide-y divide-gray-800 border-y border-gray-800">
        {event.timeSlots.map((slot, slotIndex) => (
          <div
            key={slotIndex}
            className="py-6 flex flex-col items-center text-center"
          >
            <div className="font-mono text-teal-300 text-xs mb-1">
              {slot.start} {slot.end && `- ${slot.end}`}
            </div>
            <div className="text-base font-semibold text-white max-w-sm">
              {slot.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Schedule() {
  return (
    <section
      id="schedule"
      aria-label="Schedule"
      className="py-20 sm:py-32 bg-gray-900"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <H2 className="text-teal-200 font-display tracking-tight mb-4">
            What&apos;s happening when and where?
          </H2>
          <p className="text-gray-300 text-lg">
            The hackathon consists of two main events, each happening in both Melbourne and Sydney.
          </p>
        </div>

        {/* Mobile View (< lg) */}
        <div className="lg:hidden">
          <TabGroup>
            <TabList className="flex gap-x-4 overflow-x-auto pb-4 mb-8 snap-x">
              {events.map((event, eventIndex) => (
                <Tab
                  key={eventIndex}
                  className={({ selected }) =>
                    clsx(
                      "flex-none snap-start px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none",
                      selected
                        ? "bg-teal-500/10 text-teal-300 ring-1 ring-inset ring-teal-500/20"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    )
                  }
                >
                  {event.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {events.map((event, eventIndex) => (
                <TabPanel key={eventIndex} className="focus:outline-none">
                  <ScheduleTab event={event} />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>

        {/* Desktop View (>= lg) */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-8">
          {events.map((event, eventIndex) => (
            <section key={eventIndex}>
              <div className="mb-10 text-center">
                <h3 className="text-xl font-bold tracking-tight text-teal-200 mb-2">
                  {event.title}
                </h3>
                <time
                  dateTime={event.dateTime}
                  className="text-base text-gray-300 font-medium block mb-2"
                >
                  {event.date}
                </time>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {event.summary}
                </p>
              </div>

              <div className="divide-y divide-gray-800 border-y border-gray-800 bg-gray-800/20 rounded-xl px-4 py-6">
                {event.timeSlots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="py-4 flex flex-col items-center text-center first:pt-0 last:pb-0"
                  >
                    <div className="font-mono text-teal-300 text-xs mb-1">
                      {slot.start} {slot.end && `- ${slot.end}`}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {slot.name}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
