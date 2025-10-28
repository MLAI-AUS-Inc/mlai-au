// Import manual events data statically
import manualEventsData from "~/data/manual-events.json";

export interface Event {
  _id: string;
  name: string;
  startDate: string;
  bannerImage?: { url: string };
  eventLocation: {
    address: string;
  };
  slug: string;
  published?: boolean;
  source?: 'humanitix' | 'manual';
  description?: string;
  externalUrl?: string;
}

interface ManualEvent {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  eventLocation: {
    address: string;
  };
  source: 'manual';
  externalUrl?: string;
  bannerImage?: string;
}

interface ManualEventsData {
  events: ManualEvent[];
}

async function fetchHumanitixEvents(apiKey: string): Promise<Event[]> {
  if (!apiKey) {
    console.error("API key not found");
    return [];
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
      return [];
    }

    // Filter to only include published events and add source
    const filteredEvents = (data as any).events?.filter(
      (event: any) => event.published === true,
    ).map((event: any) => ({
      ...event,
      source: 'humanitix' as const,
    })) || [];

    console.log(
      `Filtered ${(data as any).events?.length || 0} events to ${filteredEvents.length} published events`,
    );

    return filteredEvents;
  } catch (error: any) {
    console.error("Error fetching Humanitix events:", error);
    return [];
  }
}

async function fetchManualEvents(): Promise<Event[]> {
  try {
    // Convert manual events to Event interface
    const events: Event[] = manualEventsData.events.map((manualEvent) => ({
      _id: manualEvent.id,
      name: manualEvent.name,
      startDate: manualEvent.startDate,
      bannerImage: manualEvent.bannerImage ? { url: manualEvent.bannerImage } : undefined,
      eventLocation: manualEvent.eventLocation,
      slug: manualEvent.externalUrl || '#',
      published: true,
      source: 'manual' as const,
      description: manualEvent.description,
      externalUrl: manualEvent.externalUrl,
    }));

    console.log(`Loaded ${events.length} manual events`);
    return events;
  } catch (error: any) {
    console.error("Error fetching manual events:", error);
    return [];
  }
}

export async function fetchEvents(apiKey: string): Promise<Event[]> {
  try {
    // Fetch both Humanitix and manual events in parallel
    const [humanitixEvents, manualEvents] = await Promise.all([
      fetchHumanitixEvents(apiKey),
      fetchManualEvents(),
    ]);

    // Combine and sort by date
    const allEvents = [...humanitixEvents, ...manualEvents];
    
    console.log(`Combined ${humanitixEvents.length} Humanitix events and ${manualEvents.length} manual events`);
    
    return allEvents;
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return [];
  }
}