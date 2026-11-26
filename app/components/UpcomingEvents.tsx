import { useState } from "react";
import { getEventUrl, type Event } from "~/lib/events";
import { formatEventStart } from "~/lib/event-display";

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

  return (
    <section id="upcoming-events" className="mp-sec w-full">
      {/* The gig bill: purple stock, one ticket strip per event */}
      <div
        className="mp-bill mp-bill--spot mp-bill--a4 mp-gigs w-full relative"
        data-mp-ink="purple"
        data-mp-tape="duct"
      >
        {/* Header */}
        <h2 className="mp-title mp-gigs-title">Upcoming Events</h2>

        {/* Events List */}
        <div className="mp-gigs-list">
          {events.length === 0 ? (
            <p className="mp-gigs-empty">No upcoming events are currently available. The feed may be empty or unavailable.</p>
          ) : (
            currentEvents.map((event) => {
              const dateParts = formatEventStart(event.startDate, event.timezone);
              return (
                <div key={event._id} className="mp-gig group">
                  {/* Date Box */}
                  <div className="mp-gig-date">
                    <div className="mp-gig-day">{dateParts.day}</div>
                    <div className="mp-gig-month">{dateParts.month}</div>
                    <div className="mp-gig-time">{dateParts.time}</div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="mp-gig-name line-clamp-2">{event.name}</h3>
                    <div className="mp-gig-where">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="line-clamp-1">
                        {event.eventLocation.address || "Location TBA"}
                      </span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <a
                    href={getEventUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mp-btn mp-btn--go flex-shrink-0 self-stretch sm:self-center whitespace-nowrap"
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
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 lg:mt-12">
            {/* Previous Button - 44px touch target */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="mp-pager"
              aria-label="Previous events"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className="mp-dot"
                  aria-current={currentPage === index ? "true" : undefined}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button - 44px touch target */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="mp-pager"
              aria-label="Next events"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
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
    </section>
  );
}
