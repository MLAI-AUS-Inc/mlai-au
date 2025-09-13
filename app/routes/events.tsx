import { useLoaderData } from "react-router";
import type { Route } from "./+types/events";
import UpcomingEvents from "~/components/UpcomingEvents";
import EventsCalendar from "~/components/EventsCalendar";
import { fetchEvents, type Event } from "~/lib/events";

interface LoaderData {
  events: Event[];
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    // Initial load with empty data - will be populated by clientLoader
    events: [],
  };
}

export async function clientLoader({ context, serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  const apiKey = context.cloudflare.env.PRIVATE_HUMANITIX_API_KEY;

  if (!apiKey) {
    console.error("PRIVATE_HUMANITIX_API_KEY environment variable is not set");
    return { events: [] };
  }

  const events = await fetchEvents(apiKey);

  return {
    ...serverData,
    events,
  };
}

export default function EventsCalendarPage() {
  const { events: loadedEvents } = useLoaderData<LoaderData>();

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
}
