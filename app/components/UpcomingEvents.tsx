import { useState } from "react";
import { Container, Section } from "./ui/Container";
import { getEventUrl, type Event } from "~/lib/events";

export default function UpcomingEvents({ events: rawEvents }: { events: Event[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 3;

  // Events are already filtered to upcoming on the server to avoid hydration mismatch
  // Just sort here
  const events = rawEvents
    .slice() // Create a copy to avoid mutating props
    .sort((a: Event, b: Event) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  // Format date parts for the date box
  const formatDateParts = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  return (
    <Section id="upcoming-events" className="bg-[var(--brutalist-beige)]">
      <Container variant="wide" className="py-8 lg:py-12">
        {/* Section container with rounded corners */}
        <div className="bg-[var(--brutalist-beige)] rounded-[2rem] p-6 lg:p-10 border-4 border-[var(--brutalist-purple)] relative">
          {/* Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--brutalist-purple)] mb-8 lg:mb-10 font-display">
            Upcoming Events
          </h2>

          {/* Events List */}
          <div className="space-y-4 lg:space-y-6">
            {events.length === 0 ? (
              <p className="text-center text-gray-600 py-12">No upcoming events at this time</p>
            ) : (
              currentEvents.map((event) => {
                const dateParts = formatDateParts(event.startDate);
                return (
                  <div
                    key={event._id}
                    className="bg-[#F5EBD8] rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-2 border-transparent hover:border-[var(--brutalist-orange)]"
                  >
                    {/* Date Box */}
                    <div className="flex-shrink-0 bg-[var(--brutalist-orange)] rounded-xl px-4 py-3 text-center min-w-[80px] lg:min-w-[90px] self-start lg:self-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white leading-none">
                        {dateParts.day}
                      </div>
                      <div className="text-sm lg:text-base font-bold text-white uppercase tracking-wide">
                        {dateParts.month}
                      </div>
                      <div className="text-xs text-white/90 mt-1">
                        {dateParts.time}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg lg:text-xl font-bold text-[var(--brutalist-purple)] leading-tight mb-2 line-clamp-2">
                        {event.name}
                      </h3>
                      <div className="flex items-start gap-2 text-[var(--brutalist-purple)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 flex-shrink-0 text-[var(--brutalist-orange)] mt-0.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm lg:text-base line-clamp-1">
                          {event.eventLocation.address || "Location TBA"}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail - Shows below on mobile, inline on desktop */}
                    {event.bannerImage?.url && (
                      <div className="flex-shrink-0 w-full lg:w-32 h-24 lg:h-20 rounded-xl overflow-hidden order-last lg:order-none">
                        <img
                          src={event.bannerImage.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Register Button */}
                    <a
                      href={getEventUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 bg-[var(--brutalist-orange)] text-white font-bold px-6 py-3 rounded-xl text-center transition-all duration-200 hover:bg-[#E85D04] hover:scale-105 active:scale-95 self-start lg:self-center"
                    >
                      Register
                    </a>
                  </div>
                );
              })
            )}
          </div>

          {/* Navigation & Pagination */}
          {events.length > eventsPerPage && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full bg-[var(--brutalist-purple)] text-white flex items-center justify-center transition-all duration-200 hover:bg-[#5B1A94] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                aria-label="Previous events"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${currentPage === index
                        ? "bg-[var(--brutalist-purple)] scale-125"
                        : "bg-[var(--brutalist-purple)]/30 hover:bg-[var(--brutalist-purple)]/50"
                      }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full bg-[var(--brutalist-purple)] text-white flex items-center justify-center transition-all duration-200 hover:bg-[#5B1A94] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                aria-label="Next events"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
