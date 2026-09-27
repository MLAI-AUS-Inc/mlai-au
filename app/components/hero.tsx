import DonationModal from "~/components/DonationModal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] lg:min-h-screen w-full bg-[var(--brutalist-beige)] p-2 lg:p-3 flex"
    >
      {/* Main content container with thin border */}
      <div className="w-full min-h-[calc(70vh-1rem)] lg:min-h-[calc(100vh-1.5rem)] border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 relative flex flex-col">
        {/* Top row - Action chips */}
        <div className="relative z-10 grid grid-cols-1 items-start justify-items-center gap-3 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          {/* Log in - Top Left */}
          <a
            href="https://chat.mlai.au"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brutalist-mint)] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#00e6c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:gap-3 sm:px-6 sm:py-3 sm:text-base lg:justify-self-start"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m3-6 3 3m0 0-3 3m3-3H3" />
            </svg>
            Log in
          </a>

          <DonationModal />

          {/* See Events - Top Right */}
          <a
            href="https://luma.com/mlai_au"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:gap-3 sm:px-6 sm:py-3 sm:text-base lg:justify-self-end"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            See Events
          </a>
        </div>

        {/* Center content - The big number and subtitle - fills available space */}
        <div className="flex-1 flex flex-col items-center justify-center w-full py-4 lg:py-0">

          {/* Mobile Logo - Kangaroo in mint box - Only visible on mobile */}
          <a
            href="/"
            className="lg:hidden block w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[var(--brutalist-mint)] mb-4 sm:mb-6 overflow-visible relative"
          >
            <img
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[130%] w-auto object-contain"
              src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Roo_MLAI.png?alt=media&token=10e962dd-6636-4dcc-9b49-9de4c62ebc82"
              alt="MLAI Kangaroo logo"
              fetchPriority="high"
            />
          </a>

          {/* Massive "1000" number - Maximize size with Oswald font */}
          <h1
            className="text-[var(--brutalist-border)] leading-[0.75] sm:leading-[0.7] tracking-tight w-full text-center"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700, // Bold weight for Oswald
              fontSize: 'clamp(6rem, 28vw, 42rem)', // More conservative min for mobile
              transform: 'scaleY(1.1)', // Make it taller like the reference
            }}
          >
            1000
          </h1>

          {/* Subtitle - massive bold condensed */}
          <p
            className="text-[var(--brutalist-border)] tracking-[0.02em] sm:tracking-[0.05em] font-bold text-center w-full mt-2 sm:mt-4 lg:mt-12 px-2"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 'clamp(1.25rem, 6vw, 7rem)', // Smaller minimum for mobile
              textTransform: 'uppercase',
            }}
          >
            AUSTRALIAN STARTUPS
          </p>
        </div>

        {/* Bottom row - MLAI label and community text */}
        <div className="flex justify-between items-end gap-4 mt-4">
          {/* Left: MLAI */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-normal text-[var(--brutalist-border)] tracking-tight">
            MLAI
          </h2>

          {/* Right: Community descriptor */}
          <div className="text-right text-sm sm:text-lg lg:text-xl text-[var(--brutalist-border)] leading-tight">
            <p className="font-normal">Not-For-Profit,</p>
            <p className="font-normal">Volunteer</p>
            <p className="font-normal">Community</p>
          </div>
        </div>
      </div>
    </section>
  );
}
