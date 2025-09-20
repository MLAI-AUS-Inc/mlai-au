import { fetchEvents } from "~/lib/events";

export async function loader({ context }: any) {
  const eventsApiKey = context.cloudflare.env.PRIVATE_HUMANITIX_API_KEY;

  // Check if API key exists
  if (!eventsApiKey) {
    console.error("Missing PRIVATE_HUMANITIX_API_KEY environment variable");
    return Response.json({
      success: false,
      error: "Server configuration error"
    }, { status: 500 });
  }

  try {
    const events = await fetchEvents(eventsApiKey);

    return Response.json({
      success: true,
      data: events,
      count: events.length
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Error in events API route:", error);

    return Response.json({
      success: false,
      error: "Failed to fetch events",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
