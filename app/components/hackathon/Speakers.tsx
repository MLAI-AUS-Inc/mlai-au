import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { Container } from "./Container";

const days = [
  {
    name: "Hack Day 1",
    date: "Nov 29",
    dateTime: "2025-11-29",
    speakers: [
      {
        name: "David Gilmore",
        role: "Cybersecurity Analyst & AI Researcher",
        image: "/hackathon/avatars/david.jpeg",
      },
      {
        name: "Alan Agon",
        role: "Founder, Paxmod",
        image: "/hackathon/avatars/alan.jpeg",
      },
      {
        name: "Macken Murphy",
        role: "Scientist & Behavioural Researcher (PhD, University of Melbourne)",
        image: "/hackathon/avatars/macken.jpg",
      },
      {
        name: "Manan Jaiswal",
        role: "Lyra",
        image: "/hackathon/avatars/manan.jpeg",
      },


    ],
  },

  {
    name: "Hack Day 2",
    date: "Nov 30",
    dateTime: "2025-11-30",
    speakers: [
      {
        name: "Chistine De Kock",
        role: "Lecturer & NLP Researcher, University of Melbourne",
        image: "/hackathon/avatars/christine.jpeg",
      },
      {
        name: "Rocky (TBC)",
        role: "",
        image: "/hackathon/avatars/.png",
      },
      {
        name: "David's Wife (TBC)",
        role: "",
        image: "/hackathon/avatars/.png",
      },

    ],
  },
];

export function Speakers() {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-16 sm:py-24 bg-gray-900"
    >
      <Container>
        <div className="mx-auto max-w-2xl mb-12">
          <h2
            id="speakers-title"
            className="font-display text-3xl font-medium tracking-tight text-teal-200 sm:text-4xl mb-4"
          >
            Speakers
          </h2>
          <p className="text-lg text-gray-300">
            We’re thrilled to welcome some of Australia’s leading thinkers and builders in AI, safety, and digital communities as speakers and mentors for this event.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="grid grid-cols-1 gap-8 lg:grid-cols-4"
          vertical={tabOrientation === "vertical"}
        >
          <Tab.List className="flex flex-col gap-4 lg:gap-6">
            {({ selectedIndex }) => (
              <>
                {days.map((day, dayIndex) => (
                  <Tab
                    key={day.dateTime}
                    className="ui-not-focus-visible:outline-none text-left"
                  >
                    <div
                      className={clsx(
                        "p-4 rounded-lg border transition-colors",
                        dayIndex === selectedIndex
                          ? "border-teal-500 bg-gray-800"
                          : "border-gray-700 hover:border-gray-600",
                      )}
                    >
                      <div className="font-mono text-sm text-gray-400 mb-1">
                        {day.name}
                      </div>
                      <time
                        dateTime={day.dateTime}
                        className="text-xl font-semibold text-teal-200"
                      >
                        {day.date}
                      </time>
                    </div>
                  </Tab>
                ))}
              </>
            )}
          </Tab.List>
          <Tab.Panels className="lg:col-span-3">
            {days.map((day) => (
              <Tab.Panel
                key={day.dateTime}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ui-not-focus-visible:outline-none"
                unmount={false}
              >
                {day.speakers.map((speaker, speakerIndex) => (
                  <div key={speakerIndex} className="text-center">
                    <div className="mb-4">
                      <img
                        className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-teal-500/50"
                        src={speaker.image}
                        alt={speaker.name}
                      />
                    </div>
                    <h3 className="font-semibold text-white mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {speaker.role}
                    </p>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </section>
  );
}
