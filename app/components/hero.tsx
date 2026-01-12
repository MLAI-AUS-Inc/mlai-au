export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] lg:min-h-screen w-full bg-[var(--brutalist-beige)] p-2 lg:p-3 flex"
    >
      {/* Main content container with thin border */}
      <div className="w-full min-h-[calc(70vh-1rem)] lg:min-h-[calc(100vh-1.5rem)] border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 relative flex flex-col">
        {/* Top row - MLAI label and community text */}
        <div className="flex justify-between items-start gap-4">
          {/* Left: MLAI - massive like reference */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-normal text-[var(--brutalist-border)] tracking-tight">
            MLAI
          </h2>

          {/* Right: Community descriptor - larger */}
          <div className="text-right text-sm sm:text-lg lg:text-xl text-[var(--brutalist-border)] leading-tight">
            <p className="font-normal">Not-For-Profit,</p>
            <p className="font-normal">Volunteer</p>
            <p className="font-normal">Community</p>
          </div>
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
      </div>
    </section>
  );
}
