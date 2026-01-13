import { Suspense, useState } from "react";
import { Await } from "react-router";
import CTA from "~/components/CTA";
import SectionDivider from "~/components/SectionDivider";
import UpcomingEvents from "~/components/UpcomingEvents";
import Feature from "~/components/feature";
import Hero from "~/components/hero";
import SubstackUpdates from "~/components/SubstackUpdates";
import Team from "~/components/team";
import TetrisTestimonials from "~/components/TetrisTestimonials";
import { LogoShooter } from "~/components/logo-shooter";

function UpcomingEventsSkeleton() {
  return (
    <div className="bg-white py-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-12" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 bg-gray-200 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubstackUpdatesSkeleton() {
  return (
    <div className="bg-white py-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-12" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home({ events, substackPosts }: { events: Promise<any>, substackPosts: Promise<any> }) {
  // State for hover-to-activate Logo Shooter game
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <main className="bg-[var(--brutalist-beige)]">
      {/* Hero section */}
      <Hero />

      {/* ===== HELLO SECTION ===== */}
      {/* Starts at Logo Cloud (NAB sponsors), ends at Events */}
      <section id="hello">
        {/* Hello section divider - Orange */}
        <SectionDivider color="#ff3d00" />

        {/* Logo Cloud - Hover to Activate Shooter Game! */}
        <div className="bg-[var(--brutalist-beige)] p-2 lg:p-3">
          <div
            id="logoCloud"
            className={`rounded-2xl sm:rounded-[2.5rem] py-8 sm:py-12 lg:py-16 relative z-10 transition-all duration-500 overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[750px] ${
              isGameActive
                ? 'bg-black cursor-crosshair'
                : 'bg-[var(--brutalist-orange)] cursor-default'
            }`}
            onMouseEnter={() => setIsGameActive(true)}
            onMouseLeave={() => setIsGameActive(false)}
          >
            {/* Logo Shooter Game - Fade in when active - OUTSIDE max-w-7xl container */}
            {isGameActive && (
              <div className="absolute inset-0 z-20">
                <LogoShooter />
              </div>
            )}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
              {/* Static Logos - Fade out when game active */}
              <div className={`transition-opacity duration-500 ${
                isGameActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 md:gap-x-12 md:gap-y-12 items-center justify-items-center">
                {/* Row 1 */}
                <img
                  className="max-h-8 sm:max-h-10 lg:max-h-12 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/nab.png"
                  alt="NAB"
                />
                <img
                  className="max-h-7 sm:max-h-8 lg:max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/v2digital.png"
                  alt="V2 Digital"
                />
                <div className="flex items-center gap-2 sm:gap-4 col-span-2 sm:col-span-1">
                  <img
                    className="max-h-7 sm:max-h-8 lg:max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                    src="sponsor_logos/aws.png"
                    alt="AWS Startups"
                  />
                  <img
                    className="max-h-6 sm:max-h-7 lg:max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                    src="sponsor_logos/mantel.png"
                    alt="Mantel Group"
                  />
                </div>

                {/* Row 2 */}
                <img
                  className="max-h-7 sm:max-h-8 lg:max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/humyn.png"
                  alt="Humyn.ai"
                />
                <img
                  className="max-h-7 sm:max-h-8 lg:max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/cake.png"
                  alt="Cake"
                />
                <img
                  className="max-h-7 sm:max-h-8 lg:max-h-10 w-auto object-contain mix-blend-screen grayscale invert col-span-2 sm:col-span-1"
                  src="sponsor_logos/microsoft.png"
                  alt="Microsoft"
                />

                {/* Row 3 */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">Wilson A.I.</span>
                  <img
                    className="max-h-6 sm:max-h-7 lg:max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                    src="sponsor_logos/wilsonai.png"
                    alt="wilsonai"
                  />
                </div>
                <img
                  className="max-h-8 sm:max-h-10 lg:max-h-12 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/uom.jpeg"
                  alt="University of Melbourne"
                />
                <img
                  className="max-h-6 sm:max-h-7 lg:max-h-8 w-auto object-contain mix-blend-screen grayscale invert col-span-2 sm:col-span-1"
                  src="sponsor_logos/squarepeg.png"
                  alt="Squarepeg"
                />

                {/* Row 4 - Full width on all screens */}
                <div className="col-span-2 sm:col-span-3 grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 items-center justify-items-center w-full mt-2 sm:mt-4">
                  <img
                    className="max-h-8 sm:max-h-10 lg:max-h-12 w-auto object-contain mix-blend-screen grayscale invert"
                    src="sponsor_logos/airtree.jpeg"
                    alt="AirTree"
                  />
                  <img
                    className="max-h-6 sm:max-h-7 lg:max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                    src="sponsor_logos/blackbird.png"
                    alt="Blackbird"
                  />
                  <img
                    className="max-h-5 sm:max-h-6 w-auto object-contain mix-blend-screen grayscale invert"
                    src="sponsor_logos/rampersand.png"
                    alt="Rampersand"
                  />
                </div>
              </div>

              <div className="mt-8 sm:mt-12 flex justify-center px-2">
                <p className="text-xs sm:text-sm text-center leading-5 sm:leading-6 text-white text-opacity-90">
                  <span className="block sm:inline">
                    Our events have been sponsored and supported by over 50 awesome
                    organisations across Australia.{" "}
                  </span>
                  <a href="/sponsors" className="font-semibold text-white hover:text-opacity-80 transition-opacity whitespace-nowrap">
                    Become a sponsor <span aria-hidden="true">&rarr;</span>
                  </a>
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature/About section - "We Are MLAI" */}
        <Feature />
      </section>

      {/* ===== EVENTS SECTION ===== */}
      {/* Starts at "Upcoming Events", ends at Volunteer */}
      <section id="events">
        {/* Events section divider - Purple */}
        <SectionDivider color="#4b0db3" />

        {/* Upcoming Events */}
        <Suspense fallback={<UpcomingEventsSkeleton />}>
          <Await resolve={events} errorElement={<div className="py-8 text-center text-gray-600">Unable to load events</div>}>
            {(resolvedEvents) => <UpcomingEvents events={resolvedEvents} />}
          </Await>
        </Suspense>
      </section>

      {/* ===== VOLUNTEER SECTION ===== */}
      {/* Starts at "We are proud to have worked with amazing people", ends at Articles */}
      <section id="people">
        {/* Volunteer section divider - Blue */}
        <SectionDivider color="#3537dc" />

        {/* Testimonials */}
        <TetrisTestimonials />

        {/* Team section - moved here directly under testimonials */}
        <Team />
      </section>

      {/* ===== ARTICLES SECTION ===== */}
      {/* Starts at "weekly updates from MLAI Aus", ends at footer */}
      <section id="articles">
        {/* Articles section divider - Yellow */}
        <SectionDivider color="#fefc22" />

        {/* Substack Updates */}
        <Suspense fallback={<SubstackUpdatesSkeleton />}>
          <Await resolve={substackPosts} errorElement={<div className="py-8 text-center text-gray-600">Unable to load updates</div>}>
            {(resolvedPosts) => <SubstackUpdates posts={resolvedPosts} />}
          </Await>
        </Suspense>
      </section>

      {/* ===== SPONSOR SECTION (Placeholder) ===== */}
      {/* Hidden placeholder for future sponsor content */}
      <section id="sponsor" className="hidden" aria-hidden="true">
        {/* Placeholder for future sponsor section content */}
      </section>

      {/* ===== BOUNTIES SECTION (Placeholder) ===== */}
      {/* Hidden placeholder - bounties link goes to external Notion page */}
      <section id="bounties" className="hidden" aria-hidden="true">
        {/* Placeholder for future bounties section content */}
      </section>

      {/* CTA section */}
      <CTA />
    </main>
  );
}
