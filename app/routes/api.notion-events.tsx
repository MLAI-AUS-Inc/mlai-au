import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
const NOTION_VERSION = "2022-06-28";

interface LumaEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  url: string;
  calendar_api_id?: string;
}

interface NotionEvent {
  id: string;
  properties: {
    "Event Name": {
      title: Array<{ text: { content: string } }>;
    };
    "Cover Image URL": {
      url: string;
    };
    Date: {
      date: { start: string; end?: string };
    };
    "Event Image": {
      files: Array<{ name: string; external: { url: string } }>;
    };
    "Event Link": {
      url: string;
    };
    "Event Type": {
      select: { name: string };
    };
    Location: {
      rich_text: Array<{ text: { content: string } }>;
    };
    "Registration Status": {
      select: { name: string };
    };
    Time: {
      rich_text: Array<{ text: { content: string } }>;
    };
    "Calendar API ID": {
      rich_text: Array<{ text: { content: string } }>;
    };
  };
}

// Helper function to find the Luma Events database
async function findLumaEventsDatabase(notionApiKey: string) {
  try {
    const searchResponse = await fetch("https://api.notion.com/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "Luma Events Database",
        filter: {
          value: "database",
          property: "object",
        },
      }),
    });

    if (searchResponse.ok) {
      const searchData = (await searchResponse.json()) as { results?: any[] };
      if (searchData.results && searchData.results.length > 0) {
        return searchData.results[0].id;
      }
    }
    return null;
  } catch (error) {
    console.error("Error finding database:", error);
    return null;
  }
}

// GET: Retrieve events from Notion database
export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const notionApiKey = context.cloudflare.env.NOTION_API_KEY;
    
    // Debug logging
    console.log("Available env keys:", Object.keys(context.cloudflare.env));
    console.log("Full env object:", JSON.stringify(context.cloudflare.env, null, 2));
    console.log("NOTION_API_KEY exists:", !!notionApiKey);
    console.log("NOTION_API_KEY length:", notionApiKey?.length || 0);
    console.log("NOTION_API_KEY first 10 chars:", notionApiKey?.substring(0, 10) || 'undefined');
    
    if (!notionApiKey) {
      console.log("API key not found");
      return Response.json({
        events: [],
        message: "NOTION_API_KEY environment variable is not set",
      });
    }

    const databaseId = await findLumaEventsDatabase(notionApiKey);

    if (!databaseId) {
      console.log("No database found, returning empty events array");
      return Response.json({
        events: [],
        message:
          "No Luma Events database found. Please create one first using the setup script.",
      });
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "Date",
              direction: "ascending",
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Notion API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as { results: NotionEvent[] };

    // Transform Notion data back to LumaEvent format
    let events: LumaEvent[] = data.results.map((page: NotionEvent) => {
      const eventName =
        page.properties["Event Name"]?.title?.[0]?.text?.content ||
        "Untitled Event";
      const startDate =
        page.properties["Date"]?.date?.start || new Date().toISOString();
      const endDate = page.properties["Date"]?.date?.end || startDate;
      const location =
        page.properties["Location"]?.rich_text?.[0]?.text?.content || "";
      const imageUrl =
        page.properties["Cover Image URL"]?.url ||
        page.properties["Event Image"]?.files?.[0]?.external?.url ||
        "/api/placeholder/400/300";
      const eventUrl = page.properties["Event Link"]?.url || "#";
      const time = page.properties["Time"]?.rich_text?.[0]?.text?.content || "";
      const eventType = page.properties["Event Type"]?.select?.name || "";

      return {
        id: page.id,
        name: eventName,
        description: `${eventType}${time ? ` • ${time}` : ""}`,
        startDate: startDate,
        endDate: endDate,
        location: location,
        image: imageUrl,
        url: eventUrl,
      };
    });

    // Sort events: upcoming events first (ascending), then past events (descending)
    const now = new Date();
    const upcomingEvents = events
      .filter((event) => new Date(event.startDate) >= now)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
    const pastEvents = events
      .filter((event) => new Date(event.startDate) < now)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );

    events = [...upcomingEvents, ...pastEvents];

    return Response.json({ events });
  } catch (error) {
    console.error("Error fetching from Notion:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch events from Notion",
        details: error instanceof Error ? error.message : "Unknown error",
        events: [],
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// POST: Save events to Notion database
export async function action({ request, context }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const notionApiKey = context.cloudflare.env.NOTION_API_KEY;
    
    // Debug logging
    console.log("POST - Available env keys:", Object.keys(context.cloudflare.env));
    console.log("POST - NOTION_API_KEY exists:", !!notionApiKey);
    console.log("POST - NOTION_API_KEY length:", notionApiKey?.length || 0);
    
    if (!notionApiKey) {
      return new Response(
        JSON.stringify({ error: "NOTION_API_KEY environment variable is not set" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { events }: { events: LumaEvent[] } = await request.json();

    if (!events || !Array.isArray(events)) {
      return new Response(
        JSON.stringify({ error: "Invalid events data provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Filter events to only include those with the specific calendar_api_id
    const targetCalendarApiId = "cal-KPakbH2wTxQuyCj";

    const filteredEvents = events.filter(
      (event) => event.calendar_api_id === targetCalendarApiId,
    );

    if (filteredEvents.length === 0) {
      return Response.json({
        message: `No events found with calendar_api_id: ${targetCalendarApiId}`,
        successful: 0,
        failed: 0,
        total: events.length,
      });
    }

    const databaseId = await findLumaEventsDatabase(notionApiKey);

    if (!databaseId) {
      return new Response(
        JSON.stringify({
          error:
            "Luma Events database not found. Please create one first using the setup script.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    let successful = 0;
    let failed = 0;

    // Process each event
    for (const event of filteredEvents) {
      try {
        // Create page in Notion database
        const createResponse = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parent: {
              database_id: databaseId,
            },
            properties: {
              "Event Name": {
                title: [
                  {
                    text: {
                      content: event.name,
                    },
                  },
                ],
              },
              "Cover Image URL": {
                url: event.image,
              },
              Date: {
                date: {
                  start: event.startDate,
                  end:
                    event.endDate !== event.startDate
                      ? event.endDate
                      : undefined,
                },
              },
              "Event Image": {
                files: event.image
                  ? [
                      {
                        name: "Event Cover",
                        external: {
                          url: event.image,
                        },
                      },
                    ]
                  : [],
              },
              "Event Link": {
                url: event.url,
              },
              "Event Type": {
                select: {
                  name: "AI Community",
                },
              },
              Location: {
                rich_text: [
                  {
                    text: {
                      content: event.location,
                    },
                  },
                ],
              },
              "Registration Status": {
                select: {
                  name:
                    new Date(event.startDate) < new Date()
                      ? "Past Event"
                      : "Open",
                },
              },
              Time: {
                rich_text: [
                  {
                    text: {
                      content:
                        new Date(event.startDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Australia/Melbourne",
                        }) + " AEST",
                    },
                  },
                ],
              },
              "Calendar API ID": {
                rich_text: [
                  {
                    text: {
                      content: event.calendar_api_id || "",
                    },
                  },
                ],
              },
            },
          }),
        });

        if (createResponse.ok) {
          successful++;
        } else {
          console.error(
            `Failed to create event "${event.name}":`,
            await createResponse.text(),
          );
          failed++;
        }
      } catch (eventError) {
        console.error(`Error processing event "${event.name}":`, eventError);
        failed++;
      }
    }

    return Response.json({
      message: `Import completed: ${successful} successful, ${failed} failed`,
      successful,
      failed,
      total: filteredEvents.length,
      totalProvided: events.length,
    });
  } catch (error) {
    console.error("Error saving to Notion:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to save events to Notion",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
