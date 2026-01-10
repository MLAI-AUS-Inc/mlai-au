export default function Feature() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[var(--brutalist-beige)] p-2 lg:p-3 flex"
    >
      {/* Main content container with thin border */}
      <div className="w-full min-h-[calc(100vh-1.5rem)] border border-gray-400 rounded-[2.5rem] p-8 lg:p-12 relative flex flex-col justify-between">

        {/* Top: "We Are" - Massive centered italic */}
        <div className="flex-none pt-4 lg:pt-8 mb-8">
          <h2
            className="text-[var(--brutalist-border)] italic text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 12vw, 10rem)', // Slightly reduced scaling
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            We Are
          </h2>
        </div>

        {/* Divider 1 */}
        <div className="w-full h-px bg-[var(--brutalist-border)] opacity-30"></div>

        {/* Middle section - Vision text on left, MLAI on right */}
        {/* Changed lg:flex-row to xl:flex-row to stack on smaller desktops */}
        <div className="flex-1 flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-16 py-8">
          {/* Vision Statement - Left/Center */}
          <div className="xl:w-1/2 text-center xl:text-left pl-4 xl:pl-12">
            <p
              className="text-[var(--brutalist-border)] leading-tight"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.5rem, 2vw, 2.25rem)', // Adjusted scaling
                fontWeight: 400,
                maxWidth: '600px',
              }}
            >
              Our vision is to make Australia an amazing home for AI and machine learning entrepreneurs and to increase the economic complexity of Australia. Let's get on it.
            </p>
          </div>

          {/* MLAI - Right side, massive ORANGE */}
          <div className="xl:w-1/2 flex justify-center xl:justify-end pr-4 xl:pr-12">
            <h3
              className="text-[var(--brutalist-orange)] leading-[0.8] tracking-tight"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(8rem, 18vw, 22rem)', // Significantly reduced scaling factor (35vw -> 18vw) to fit in half-width
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
        <div className="flex-none pt-8">
          {/* (Machine Learning & Artificial Intelligence - Full width orange */}
          <p
            className="text-[var(--brutalist-orange)] leading-tight mb-8"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 500,
            }}
          >
            (Machine learning & Artificial Intelligence
          </p>

          {/* Navigation labels */}
          <div className="flex justify-between items-end text-[var(--brutalist-border)]">
            <span
              className="text-sm lg:text-base font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hello / About us
            </span>
            <span
              className="text-sm lg:text-base font-medium"
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
