import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/events";
import UpcomingEvents from "~/components/UpcomingEvents";
import EventsCalendar from "~/components/EventsCalendar";
import type { Event } from "~/lib/events";

interface LoaderData {
  events: Event[];
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    // Fast initial load - events will be fetched client-side
    events: [],
  };
}

export async function clientLoader({ context, serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();

  return {
    ...serverData,
  };
}

export default function EventsCalendarPage() {
  const loaderData = useLoaderData<LoaderData>();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  // Fetch events after component mounts
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.success) {
          const sortedEvents = data.data.sort((a: Event, b: Event) => {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          });
          setEvents(sortedEvents);
        } else {
          console.error('Failed to fetch events:', data.error);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upcoming Events Section */}
      <div className="bg-white">
        <UpcomingEvents events={events} loading={eventsLoading} />
      </div>

      {/* Calendar Section */}
      <EventsCalendar events={events} loading={eventsLoading} />
    </div>
  );
}
