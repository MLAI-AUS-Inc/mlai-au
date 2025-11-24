import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { Container } from "./Container";
import { LinkedInIcon } from "./LinkedInIcon";

interface Speaker {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

interface Day {
  name: string;
  date: string;
  dateTime: string;
  speakers: Speaker[];
}

const days: Day[] = [
  {
    name: "eSafety Day 1",
    date: "Nov 29",
    dateTime: "2025-11-29",
    speakers: [
      {
        name: "Macken Murphy",
        role: "Scientist & Behavioural Researcher (PhD, University of Melbourne)",
        image: "/hackathon/avatars/macken.jpg",
      },
      {
        name: "David Gilmore",
        role: "Cybersecurity Analyst & AI Researcher",
        image: "/hackathon/avatars/david.jpeg",
        linkedin: "https://www.linkedin.com/in/david-gilmore-australia/",
      },
      {
        name: "Campbell Wilson",
        role: "Online Safety Expert",
        image: "/hackathon/avatars/campbell.jpeg",
        linkedin: "https://www.linkedin.com/in/campbellcwilson/",
      },
      {
        name: "Sarah Davis-Gilmore",
        role: "Safety & Connection Advocate",
        image: "/hackathon/avatars/sarah.jpeg",
        linkedin: "https://www.linkedin.com/in/sarah-davis-gilmore",
      },
      {
        name: "Graham McCorkill",
        role: "Speaker",
        image: "/hackathon/avatars/graham.jpeg",
        linkedin: "https://www.linkedin.com/in/graham-mccorkill/",
      },
      {
        name: "Manan Jaiswal",
        role: "Lyra",
        image: "/hackathon/avatars/manan.jpeg",
        linkedin: "https://www.linkedin.com/in/manan-jaiswal/",
      },
    ],
  },
  {
    name: "eSafety Day 2",
    date: "Nov 30",
    dateTime: "2025-11-30",
    speakers: [
      {
        name: "Maria Nguyen",
        role: "eSafety Commissioner's Office",
        image: "/hackathon/avatars/maria.png",
        linkedin: "https://www.linkedin.com/in/mariaptnguyen/",
      },
      {
        name: "Ellen O'Brien",
        role: "eSafety Commissioner's Office",
        image: "/hackathon/avatars/ellen.jpeg",
        linkedin: "https://www.linkedin.com/in/ellen-o-brien-07b9b239/",
      },
      {
        name: "Alan Agon",
        role: "Founder, Paxmod",
        image: "/hackathon/avatars/alan.jpeg",
        linkedin: "https://www.linkedin.com/in/alanagon/",
      },
      {
        name: "Scotty Alan",
        role: "The Product Bus",
        image: "/hackathon/avatars/scotty.jpeg",
        linkedin: "https://www.linkedin.com/in/thescottyallen/",
      },
      {
        name: "Christine de Kock",
        role: "Lecturer & NLP Researcher, University of Melbourne",
        image: "/hackathon/avatars/christine.jpeg",
        linkedin: "https://www.linkedin.com/in/christine-de-kock/",
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
                    <p className="text-sm text-gray-400 mb-3">
                      {speaker.role}
                    </p>
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-teal-300 hover:text-teal-200 transition-colors"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
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
