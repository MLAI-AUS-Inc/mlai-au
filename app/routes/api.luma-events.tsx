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

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const response = await fetch(
      "https://api.lu.ma/search/get-results?query=",
      {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "en-AU",
          Cookie:
            "__stripe_mid=3e440fd9-5848-4255-a736-d13cb8110069d17965; luma.auth-session-key=usr-yJC7HmpW1yGZoDL.gz273wf7elzth3nfqtt2; luma.evt-e8FFFuNlCiukxLG.referred_by=o2RUTY; luma.evt-qmoh92gxrHhCYTd.referred_by=9MULGS; luma.did=ztpj78vl60480r6blfp8x8qfyfduam; luma.first-page=%2Fapify; _ga=GA1.1.1859547030.1754129239; _ga_62P18XN9NS=GS2.1.s1754129238$o1$g0$t1754129241$j57$l0$h1816125937; luma.native-referrer=https%3A%2F%2Flu.ma%2Fcalendar%2Fmanage%2Fcal-KPakbH2wTxQuyCj%3Fperiod%3Dpast%26e%3Dcalev-f2JoHiVCLiOhYao; __cf_bm=HYlzDGL7cE3AteqvI.34jcoC8XH_0jJ2bzxpSTzpfBs-1754174489-1.0.1.1-HCazM9MmOjAPlF371bUhxI66yGu16qAkZdtKmC_51HXTUJ4U3xyg1hsROUhzn00w3343ojW6q1DBBpRpWEFtUECvy5X9ZX6LDXh0sPMl4yY",
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
