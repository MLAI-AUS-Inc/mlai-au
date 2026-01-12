import { useState } from "react";
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
    <section id="upcoming-events" className="w-full bg-[var(--brutalist-beige)] p-2 lg:p-3">
      {/* Full width container with rounded corners - Purple Background */}
      <div className="w-full bg-[var(--brutalist-purple)] rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-12 relative overflow-hidden">
        {/* Header */}
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-8 lg:mb-12 font-display tracking-tight">
          Upcoming Events
        </h2>

        {/* Events List */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {events.length === 0 ? (
            <p className="text-center text-white/80 py-8 sm:py-12 text-base sm:text-lg">No upcoming events at this time</p>
          ) : (
            currentEvents.map((event) => {
              const dateParts = formatDateParts(event.startDate);
              return (
                <div
                  key={event._id}
                  className="group bg-transparent border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6 transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:shadow-lg"
                >
                  {/* Date Box */}
                  <div className="flex-shrink-0 bg-[var(--brutalist-orange)] rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-center min-w-[70px] sm:min-w-[80px] lg:min-w-[95px] self-start sm:self-center shadow-md transform transition-transform group-hover:scale-105">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-none font-display">
                      {dateParts.day}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-white uppercase tracking-wide">
                      {dateParts.month}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/90 mt-0.5 sm:mt-1 font-medium">
                      {dateParts.time}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white leading-tight mb-1 sm:mb-2 line-clamp-2 group-hover:text-[var(--brutalist-orange)] transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-start gap-1.5 sm:gap-2 text-white/80">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-[var(--brutalist-orange)] mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm lg:text-lg line-clamp-1 font-medium">
                        {event.eventLocation.address || "Location TBA"}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail - Hidden on very small screens, shows on sm+ */}
                  {event.bannerImage?.url && (
                    <div className="hidden sm:block flex-shrink-0 w-32 lg:w-40 h-20 lg:h-24 rounded-lg lg:rounded-xl overflow-hidden order-last lg:order-none border border-white/10 shadow-sm group-hover:shadow-md transition-shadow">
                      <img
                        src={event.bannerImage.url}
                        alt=""
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Register Button */}
                  <a
                    href={getEventUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 bg-[var(--brutalist-orange)] text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-center text-sm sm:text-base transition-all duration-200 hover:bg-[#E85D04] hover:scale-105 active:scale-95 self-stretch sm:self-center shadow-md whitespace-nowrap min-h-[44px] flex items-center justify-center"
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
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-12">
            {/* Previous Button - 44px touch target */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 text-white flex items-center justify-center transition-all duration-200 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
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

            {/* Pagination Dots - Larger on mobile for touch */}
            <div className="flex items-center gap-2 sm:gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${currentPage === index
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button - 44px touch target */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 text-white flex items-center justify-center transition-all duration-200 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
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
    </section>
  );
}
