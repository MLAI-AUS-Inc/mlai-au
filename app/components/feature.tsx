export default function Feature() {
  return (
    <section
      id="about"
      className="relative min-h-[auto] lg:min-h-screen w-full bg-[var(--brutalist-beige)] p-2 lg:p-3 flex"
    >
      {/* Main content container with thin border */}
      <div className="w-full lg:min-h-[calc(100vh-1.5rem)] border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 relative flex flex-col justify-between">

        {/* Top: "We Are" - Massive centered italic */}
        <div className="flex-none pt-2 sm:pt-4 lg:pt-8 mb-2 sm:mb-4 lg:mb-8">
          <h2
            className="text-[var(--brutalist-border)] italic text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 8vw, 10rem)', // Smaller min for mobile
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            We Are
          </h2>
        </div>

        {/* Divider 1 */}
        <div className="w-full h-px bg-[var(--brutalist-border)] opacity-30"></div>

        {/* Middle section - Vision text on left, MLAI on right (Swapped vertically on mobile) */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-4 sm:gap-6 lg:gap-16 py-4 sm:py-6 lg:py-8">
          {/* Vision Statement - Left/Center */}
          <div className="lg:w-1/2 text-center lg:text-left px-2 sm:px-4 lg:pl-12">
            <p
              className="text-[var(--brutalist-border)] leading-tight"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.9rem, 2.5vw, 2.25rem)', // Smaller min for mobile
                fontWeight: 400,
                maxWidth: '600px',
              }}
            >
              We help Australian founders bring their startup ideas to life and to use AI to make it easy. Let's get on it.
            </p>
          </div>

          {/* MLAI - Right side, massive ORANGE */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end pr-0 lg:pr-12">
            <h3
              className="text-[var(--brutalist-orange)] leading-[0.8] tracking-tight"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(4rem, 14vw, 22rem)', // Reduced min from 5rem to 4rem
                fontWeight: 700,
              }}
            >
              MLAI
            </h3>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="w-full h-px bg-[var(--brutalist-border)] opacity-30"></div>

        {/* Bottom section */}
        <div className="flex-none pt-2 sm:pt-4 lg:pt-8 pb-2">
          {/* (Machine Learning & Artificial Intelligence - Full width orange */}
          <p
            className="text-[var(--brutalist-orange)] leading-tight mb-2 sm:mb-4 lg:mb-8"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 'clamp(0.85rem, 3.5vw, 5rem)', // Smaller min for mobile
              fontWeight: 500,
            }}
          >
            (Machine learning & Artificial Intelligence)
          </p>

          {/* Navigation labels */}
          <div className="flex justify-between items-end text-[var(--brutalist-border)]">
            <span
              className="text-xs sm:text-sm lg:text-base font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hello / About us
            </span>
            <span
              className="text-xs sm:text-sm lg:text-base font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              01/07
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
