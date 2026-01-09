import { useState } from "react";
import { Button } from "./ui/Button";
import { Card, CardImage } from "./ui/Card";
import { Container, Section } from "./ui/Container";
import { getEventUrl, type Event } from "~/lib/events";

export default function UpcomingEvents({ events: rawEvents }: { events: Event[] }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Filter to only include upcoming events and sort by ascending date
  const events = rawEvents
    .filter((event: Event) => new Date(event.startDate) >= new Date())
    .sort((a: Event, b: Event) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const handleNext = () => {
    if (currentPage < Math.ceil(events.length / 4) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Section id="upcoming-events">
      <Container variant="narrow" className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Join us for upcoming events
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600" />
      </Container>
      <Container variant="wide" className="mt-16 relative">
        <div className="carousel bg-white relative overflow-hidden">
          <div
            className="carousel-inner relative w-full overflow-hidden"
            style={{ minHeight: "480px" }}
          >
            {events.length === 0 ? (
              <p className="text-center text-gray-900">No events available</p>
            ) : (
              <div
                className="relative flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(events.length / 4) }).map(
                  (_, pageIndex) => (
                    <div key={pageIndex} className="w-full flex-shrink-0">
                      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                        {events
                          .slice(pageIndex * 4, (pageIndex + 1) * 4)
                          .map((event, eventIndex) => (
                            <a
                              key={event._id}
                              href={getEventUrl(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block h-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                              style={{
                                transitionDelay: `${eventIndex * 50}ms`,
                              }}
                            >
                              <Card
                                variant="event"
                                as="article"
                                className="flex flex-col h-full min-h-[400px] overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
                              >
                                <div className="relative h-48 sm:h-56 lg:h-48 flex-shrink-0 overflow-hidden">
                                  <CardImage
                                    src={event.bannerImage?.url || ""}
                                    alt=""
                                    overlay={false}
                                    gradient={false}
                                    className="rounded-t-3xl transition-transform duration-300 hover:scale-110"
                                  />
                                </div>
                                <div className="flex flex-col flex-grow p-6 bg-gradient-to-b from-gray-800 to-gray-900">
                                  <time className="text-sm text-gray-300 block mb-3 transition-colors duration-300">
                                    {new Date(
                                      event.startDate,
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                    ,{" "}
                                    {new Date(
                                      event.startDate,
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </time>
                                  <h3 className="text-lg font-semibold leading-6 text-white mb-3 line-clamp-2 flex-grow transition-colors duration-300">
                                    {event.name}
                                  </h3>
                                  <div className="flex items-start text-sm leading-6 text-gray-300 mt-auto transition-colors duration-300">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                      />
                                    </svg>
                                    <span className="line-clamp-2">
                                      {event.eventLocation.address}
                                    </span>
                                  </div>
                                </div>
                              </Card>
                            </a>
                          ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
            <ol className="carousel-indicators flex justify-center hidden lg:flex mt-8">
              {Array.from({ length: Math.ceil(events.length / 4) }).map(
                (_, index) => (
                  <li className="inline-block mr-3" key={index}>
                    <button
                      onClick={() => setCurrentPage(index)}
                      className={`carousel-bullet cursor-pointer block text-4xl ${currentPage === index ? "text-gray-900" : "text-gray-400"} hover:text-gray-900`}
                    >
                      •
                    </button>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
        <Button
          onClick={handlePrev}
          variant="primary"
          size="sm"
          className="prev control w-12 h-12 -ml-6 absolute cursor-pointer text-3xl font-bold rounded-full bg-gray-900 text-white shadow-lg leading-tight text-center z-10 top-1/2 -translate-y-1/2 left-0 hidden lg:flex items-center justify-center hover:bg-gray-800"
        >
          ‹
        </Button>
        <Button
          onClick={handleNext}
          variant="primary"
          size="sm"
          className="next control w-12 h-12 -mr-6 absolute cursor-pointer text-3xl font-bold rounded-full bg-gray-900 text-white shadow-lg leading-tight text-center z-10 top-1/2 -translate-y-1/2 right-0 hidden lg:flex items-center justify-center hover:bg-gray-800"
        >
          ›
        </Button>
      </Container>
    </Section>
  );
}
