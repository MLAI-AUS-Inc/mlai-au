import { useLoaderData } from "react-router";
import type { Route } from "./+types/events";
import UpcomingEvents from "~/components/UpcomingEvents";
import EventsCalendar from "~/components/EventsCalendar";

interface Event {
  _id: string;
  name: string;
  startDate: string;
  bannerImage?: { url: string };
  eventLocation: {
    address: string;
  };
  slug: string;
}

interface LoaderData {
  events: Event[];
}

export async function loader({ context }: Route.LoaderArgs) {
  const apiKey = context.cloudflare.env.PRIVATE_HUMANITIX_API_KEY;

  if (!apiKey) {
    console.error("PRIVATE_HUMANITIX_API_KEY environment variable is not set");
    throw new Response("API key not found", { status: 500 });
  }

  const url = new URL("https://api.humanitix.com/v1/events");
  url.searchParams.append("page", "1");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch events:", data);
      return { events: [] };
    }

    // Filter to only include published events
    const filteredData = {
      ...(data as any),
      events:
        (data as any).events?.filter(
          (event: any) => event.published === true,
        ) || [],
    };

    console.log(
      `Filtered ${(data as any).events?.length || 0} events to ${filteredData.events.length} published events`,
    );

    return { events: filteredData.events };
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return { events: [] };
  }
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
