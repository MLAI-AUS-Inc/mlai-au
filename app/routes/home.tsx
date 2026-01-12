import { Suspense } from "react";
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

  return (
    <main className="bg-[var(--brutalist-beige)]">
      {/* Hero section */}
      <Hero />

      {/* ===== HELLO SECTION ===== */}
      {/* Starts at Logo Cloud (NAB sponsors), ends at Events */}
      <section id="hello">
        {/* Hello section divider - Orange */}
        <SectionDivider color="#ff3d00" />

        {/* Logo Cloud - Orange Background - Now with Shooter Game! */}
        <div className="bg-[var(--brutalist-beige)] p-2 lg:p-3">
          <div id="logoCloud" className="bg-[var(--brutalist-orange)] rounded-[2.5rem] py-12 lg:py-16 relative z-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* Logo Shooter Game */}
              <div className="min-h-[400px] md:min-h-[500px]">
                <LogoShooter />
              </div>

              <div className="mt-12 flex justify-center">
                <p className="text-sm text-center leading-6 text-white text-opacity-90">
                  <span className="md:inline">
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
