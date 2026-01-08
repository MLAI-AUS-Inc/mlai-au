import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import type { Route } from "./+types/events";
import UpcomingEvents from "~/components/UpcomingEvents";
import EventsCalendar from "~/components/EventsCalendar";
import { fetchEvents, type Event } from "~/lib/events";
import { getEnv } from "~/lib/env.server";

interface LoaderData {
  events: Promise<Event[]>;
}

export async function loader({ context }: Route.LoaderArgs) {
  const apiKey = (getEnv(context) as unknown as Record<string, any>).PRIVATE_HUMANITIX_API_KEY;

  if (!apiKey) {
    console.error("PRIVATE_HUMANITIX_API_KEY environment variable is not set");
    return { events: Promise.resolve([]) };
  }

  // Return promise WITHOUT awaiting - this enables streaming
  const eventsPromise = fetchEvents(apiKey);

  return {
    events: eventsPromise,
  };
}

function EventsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white py-16">
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
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function EventsError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h3 className="text-red-900 font-semibold mb-2">
          Unable to load events
        </h3>
        <p className="text-red-700 text-sm mb-4">
          We're having trouble fetching events from Humanitix. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default function EventsCalendarPage() {
  const { events: eventsPromise } = useLoaderData<LoaderData>();

  return (
    <Suspense fallback={<EventsSkeleton />}>
      <Await
        resolve={eventsPromise}
        errorElement={<EventsError />}
      >
        {(loadedEvents) => {
          const events = loadedEvents.sort((a: Event, b: Event) => {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          });

          return (
            <div className="min-h-screen bg-gray-50">
              {/* Upcoming Events Section */}
              <div className="bg-white">
                <UpcomingEvents events={events} />
              </div>

              {/* Calendar Section */}
              <EventsCalendar events={events} />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
