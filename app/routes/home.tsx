import { Suspense } from "react";
import { Await } from "react-router";
import CTA from "~/components/CTA";
import UpcomingEvents from "~/components/UpcomingEvents";
import Feature from "~/components/feature";
import FlagshipEvents from "~/components/flagshipevents";
import Hero from "~/components/hero";
import SubstackUpdates from "~/components/SubstackUpdates";
import Team from "~/components/team";
import Testimonials from "~/components/testimonials";
import { fetchSubstackPosts } from "~/lib/substack";
import { fetchEvents } from "~/lib/events";
import type { Route } from "./+types/home";

export async function loader({ context }: Route.LoaderArgs) {
  const eventsApiKey = context.cloudflare.env.PRIVATE_HUMANITIX_API_KEY;

  // Return promises WITHOUT awaiting - enables streaming
  // Fetch both APIs in parallel for better performance
  const eventsPromise = fetchEvents(eventsApiKey);
  const substackPostsPromise = fetchSubstackPosts();

  return {
    substackPosts: substackPostsPromise,
    events: eventsPromise,
  };
}

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

export default function Home({ loaderData }: Route.ComponentProps) {
  const { substackPosts, events } = loaderData;

  return (
    <main className="bg-white">
      {/* Hero section */}
      <Hero />
      {/* Logo Cloud */}
      <div id="logoCloud" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5 lg:max-w-none">
            {/* NAB Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/nab.png"
              alt="NAB"
            />
            {/* V2 */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/v2digital.png"
              alt="V2 Digital"
            />
            {/* AWS Startups Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/aws.png"
              alt="AWS Startups"
            />
            {/* Mantel Group Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/mantel.png"
              alt="Mantel Group"
            />
            {/* wilsonai Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/wilsonai.png"
              alt="wilsonai"
            />
            {/* Humyn.ai Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/humyn.png"
              alt="Humyn.ai"
            />
            {/* Cake Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/cake.png"
              alt="Cake"
            />
            {/* Dropshipzone Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/dropshipzone.png"
              alt="Dropshipzone"
            />
            {/* Microsoft Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/microsoft.png"
              alt="Microsoft"
            />
            {/* Sirius Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/sirius.png"
              alt="Sirius"
            />
            {/* Uom Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/uom.jpeg"
              alt="Uom"
            />
            {/* Squarepeg Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/squarepeg.png"
              alt="Squarepeg"
            />
            {/* AirTree Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/airtree.jpeg"
              alt="AirTree"
            />
            {/* Blackbird Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/blackbird.png"
              alt="Blackbird"
            />
            {/* Rampersand Logo */}
            <img
              className="h-8 w-auto object-contain mx-auto"
              src="sponsor_logos/rampersand.png"
              alt="Rampersand"
            />
          </div>
          <div className="mt-16 flex justify-center">
            <p className="relative rounded-full bg-gray-50 px-5 py-3 text-sm text-center leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
              <span className=" md:inline">
                Our events have been sponsored and supported by over 50 awesome
                organisations across Australia.{" "}
              </span>
              <a href="/sponsors" className="font-semibold text-teal-500">
                <span className="absolute inset-0" aria-hidden="true" />
                Become a sponsor <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>
      {/* Feature section */}
      <Feature />
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>
      {/* Events section */}
      <FlagshipEvents />
      {/* Upcoming Events section */}
      <Suspense fallback={<UpcomingEventsSkeleton />}>
        <Await resolve={events}>
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
        <Await resolve={substackPosts}>
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
