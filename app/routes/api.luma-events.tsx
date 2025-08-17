import { type LoaderFunctionArgs } from "react-router";

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

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    const lumaAuthCookie = context.cloudflare.env.LUMA_AUTH_COOKIE;
    
    if (!lumaAuthCookie) {
      throw new Error("LUMA_AUTH_COOKIE environment variable is not set");
    }

    const response = await fetch(
      "https://api.lu.ma/search/get-results?query=",
      {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "en-AU",
          Cookie: lumaAuthCookie,
          Origin: "https://lu.ma",
          Referer: "https://lu.ma/",
          "Sec-Ch-Ua":
            '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"macOS"',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
          "X-Luma-Client-Type": "luma-web",
          "X-Luma-Client-Version": "0d7c5e4d4852bf1e66c6d97ce06050b9ddbf1b9d",
          "X-Luma-Web-Url":
            "https://lu.ma/calendar/manage/cal-KPakbH2wTxQuyCj?period=past",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Luma API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as { events?: any[] };

    // Transform the Luma events to include the calendar_api_id and format for our system
    const transformedEvents: LumaEvent[] =
      data.events?.map((item: any) => ({
        id: item.event.api_id,
        name: item.event.name,
        description: "", // Will be filled from event details if needed
        startDate: item.event.start_at,
        endDate: item.event.end_at,
        location:
          item.event.geo_address_info?.full_address ||
          item.event.geo_address_info?.city_state ||
          "",
        image: item.event.cover_url || "",
        url: `https://lu.ma/${item.event.url}`,
        calendar_api_id: item.event.calendar_api_id,
      })) || [];

    return Response.json({
      events: transformedEvents,
    });
  } catch (error) {
    console.error("Error fetching from Luma API:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch events from Luma",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
