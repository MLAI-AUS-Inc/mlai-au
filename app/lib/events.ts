export interface Event {
  _id: string;
  name: string;
  startDate: string;
  bannerImage?: { url: string };
  eventLocation: {
    address: string;
  };
  slug: string;
  published: boolean;
}

export async function fetchEvents(apiKey: string): Promise<Event[]> {
  console.error("GETTING DATA")
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

    // Filter to only include published events
    const filteredEvents = (data as any).events?.filter(
      (event: any) => event.published === true,
    ) || [];

    console.log(
      `Filtered ${(data as any).events?.length || 0} events to ${filteredEvents.length} published events`,
    );

    return filteredEvents;
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return [];
  }
}
