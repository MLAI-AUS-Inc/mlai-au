export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] lg:min-h-screen w-full bg-[var(--brutalist-beige)] p-2 lg:p-3 flex"
    >
      {/* Main content container with thin border */}
      <div className="w-full min-h-[calc(70vh-1rem)] lg:min-h-[calc(100vh-1.5rem)] border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 relative flex flex-col">
        {/* Top row - Action chips */}
        <div className="flex justify-between items-start gap-4">
          {/* Join Slack - Top Left */}
          <a
            href="https://join.slack.com/t/mlai-aus/shared_invite/zt-36v55lk77-LbIvbAPH~9E83zEgXlXRSg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#4A154B] text-white text-sm sm:text-base font-medium rounded-full hover:bg-[#611f69] transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
            </svg>
            Join Slack
          </a>

          {/* See Events - Top Right */}
          <a
            href="https://luma.com/mlai_au"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
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
