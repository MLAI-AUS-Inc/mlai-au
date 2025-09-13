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
  return {
    // Initial load with empty data - will be populated by clientLoader
    substackPosts: [],
    events: [],
  };
}

export async function clientLoader({ context, serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  const eventsApiKey = context.cloudflare.env.PRIVATE_HUMANITIX_API_KEY;

  // Fetch both APIs in parallel for better performance
  const [events, substackPosts] = await Promise.all([
    fetchEvents(eventsApiKey),
    fetchSubstackPosts(),
  ]);

  return {
    ...serverData,
    substackPosts,
    events,
  };
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
      <UpcomingEvents events={events} />

      {/* Testimonials section */}
      <Testimonials />
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-2/3 m-auto border-t border-gray-300" />
        </div>
      </div>
      {/* Substack Updates section */}
      <SubstackUpdates posts={substackPosts} />
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
