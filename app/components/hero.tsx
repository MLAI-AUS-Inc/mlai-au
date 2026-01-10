export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[var(--brutalist-beige)] p-2 lg:p-3 flex"
    >
      {/* Main content container with thin border */}
      <div className="w-full min-h-[calc(100vh-1.5rem)] border border-gray-400 rounded-[2.5rem] p-8 lg:p-12 relative flex flex-col">
        {/* Top row - MLAI label and community text */}
        <div className="flex justify-between items-start">
          {/* Left: MLAI - massive like reference */}
          <h2 className="text-3xl lg:text-4xl font-normal text-[var(--brutalist-border)] tracking-tight">
            MLAI
          </h2>

          {/* Right: Community descriptor - larger */}
          <div className="text-right text-lg lg:text-xl text-[var(--brutalist-border)] leading-tight">
            <p className="font-normal">Not-For-Profit,</p>
            <p className="font-normal">Volunteer</p>
            <p className="font-normal">Community</p>
          </div>
        </div>

        {/* Center content - The big number and subtitle - fills available space */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-8 w-full">
          {/* Massive "1000" number - Maximize size with Oswald font */}
          <h1
            className="text-[var(--brutalist-border)] leading-[0.7] tracking-tight w-full text-center"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700, // Bold weight for Oswald
              fontSize: 'clamp(14rem, 48vw, 42rem)', // Massive sizing to fill screen
              transform: 'scaleY(1.1)', // Make it taller like the reference
            }}
          >
            1000
          </h1>

          {/* Subtitle - massive bold condensed */}
          <p
            className="text-[var(--brutalist-border)] tracking-[0.05em] font-bold text-center w-full mt-4 lg:mt-24"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
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
