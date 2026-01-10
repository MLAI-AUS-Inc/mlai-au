import { Suspense } from "react";
import { Await } from "react-router";
import CTA from "~/components/CTA";
import UpcomingEvents from "~/components/UpcomingEvents";
import Feature from "~/components/feature";
import Hero from "~/components/hero";
import SubstackUpdates from "~/components/SubstackUpdates";
import Team from "~/components/team";
import Testimonials from "~/components/testimonials";

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
      {/* Logo Cloud - Orange Background */}
      <section className="bg-[var(--brutalist-beige)] p-2 lg:p-3">
        <div id="logoCloud" className="bg-[var(--brutalist-orange)] rounded-[2.5rem] py-12 lg:py-16 relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12 items-center justify-items-center opacity-100">
              {/* Row 1 */}
              <img
                className="max-h-12 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/nab.png"
                alt="NAB"
              />
              <img
                className="max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/v2digital.png"
                alt="V2 Digital"
              />
              <div className="flex items-center gap-4">
                <img
                  className="max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/aws.png"
                  alt="AWS Startups"
                />
                <img
                  className="max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/mantel.png"
                  alt="Mantel Group"
                />
              </div>

              {/* Row 2 */}
              <img
                className="max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/humyn.png"
                alt="Humyn.ai"
              />
              <img
                className="max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/cake.png"
                alt="Cake"
              />
              <img
                className="max-h-10 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/microsoft.png"
                alt="Microsoft"
              />

              {/* Row 3 */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Wilson A.I.</span>
                <img
                  className="max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/wilsonai.png"
                  alt="wilsonai"
                />
              </div>
              <img
                className="max-h-12 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/uom.jpeg"
                alt="University of Melbourne"
              />
              <img
                className="max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                src="sponsor_logos/squarepeg.png"
                alt="Squarepeg"
              />

              {/* Row 4 */}
              <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-12 items-center justify-items-center w-full mt-4">
                <img
                  className="max-h-12 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/airtree.jpeg"
                  alt="AirTree"
                />
                <img
                  className="max-h-8 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/blackbird.png"
                  alt="Blackbird"
                />
                <img
                  className="max-h-6 w-auto object-contain mix-blend-screen grayscale invert"
                  src="sponsor_logos/rampersand.png"
                  alt="Rampersand"
                />
              </div>
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
      </section>
      {/* Feature section */}
      <Feature />
      {/* Upcoming Events section */}
      <Suspense fallback={<UpcomingEventsSkeleton />}>
        <Await resolve={events} errorElement={<div className="py-8 text-center text-gray-600">Unable to load events</div>}>
          {(resolvedEvents) => <UpcomingEvents events={resolvedEvents} />}
        </Await>
      </Suspense>

      {/* Testimonials section */}
      <Testimonials />
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>
      {/* Substack Updates section */}
      <Suspense fallback={<SubstackUpdatesSkeleton />}>
        <Await resolve={substackPosts} errorElement={<div className="py-8 text-center text-gray-600">Unable to load updates</div>}>
          {(resolvedPosts) => <SubstackUpdates posts={resolvedPosts} />}
        </Await>
      </Suspense>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>
      {/* Team section */}
      <Team />
      {/* CTA section */}
      <CTA />
    </main>
  );
}
