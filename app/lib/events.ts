import { getCachedValue } from "~/lib/server-cache";

export interface Event {
  _id: string;
  name: string;
  startDate: string;
  endDate?: string;
  bannerImage?: { url: string };
  eventLocation: {
    address: string;
  };
  slug: string;
  published: boolean;
  source: "luma";
  /** External URL to the event page */
  url?: string;
  /** Used by legacy consumers; Luma-only fetching no longer needs deduplication. */
  normalizedName?: string;
}

export interface EventsConfig {
  lumaApiKey?: string;
}

interface LumaEventEntry {
  api_id: string;
  event: {
    api_id: string;
    name: string;
    start_at: string;
    end_at?: string;
    cover_url?: string;
    geo_address_json?: {
      full_address?: string;
      address?: string;
      city?: string;
      region?: string;
      country?: string;
    };
    slug?: string;
    visibility?: "public" | "members-only" | "private";
    url?: string;
  };
}

interface LumaListEventsResponse {
  entries: LumaEventEntry[];
  has_more?: boolean;
  next_cursor?: string;
}

const LUMA_EVENTS_CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_LUMA_PAGES = 10;

function normalizeEventName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function addressFromLumaEvent(event: LumaEventEntry["event"]): string {
  const geo = event.geo_address_json;
  if (!geo) return "";
  return geo.full_address || [geo.address, geo.city, geo.region, geo.country].filter(Boolean).join(", ");
}

function lumaEntryToEvent(entry: LumaEventEntry): Event {
  const event = entry.event;
  const slug = event.slug || event.api_id;

  return {
    _id: entry.api_id || event.api_id,
    name: event.name,
    startDate: event.start_at,
    endDate: event.end_at,
    bannerImage: event.cover_url ? { url: event.cover_url } : undefined,
    eventLocation: {
      address: addressFromLumaEvent(event),
    },
    slug,
    published: true,
    source: "luma",
    url: event.url,
    normalizedName: normalizeEventName(event.name),
  };
}

async function fetchLumaEvents(apiKey: string): Promise<Event[]> {
  const allEntries: LumaEventEntry[] = [];
  let cursor: string | undefined;
  let pageCount = 0;

  do {
    pageCount++;
    const url = new URL("https://public-api.luma.com/v1/calendar/list-events");
    url.searchParams.set("after", new Date().toISOString());

    if (cursor) {
      url.searchParams.set("pagination_cursor", cursor);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-luma-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Luma events request failed: ${response.status} ${response.statusText}${
          detail ? ` ${detail.slice(0, 240)}` : ""
        }`,
      );
    }

    const data = (await response.json()) as LumaListEventsResponse;
    allEntries.push(...(data.entries || []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor && pageCount < MAX_LUMA_PAGES);

  const now = Date.now();

  return allEntries
    .filter((entry) => entry.event.visibility === "public")
    .map(lumaEntryToEvent)
    .filter((event) => new Date(event.startDate).getTime() >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export async function fetchEvents(config: EventsConfig | string): Promise<Event[]> {
  const lumaApiKey = typeof config === "string" ? config : config.lumaApiKey;

  if (!lumaApiKey) {
    console.warn("Luma API key not provided - skipping events");
    return [];
  }

  return getCachedValue(
    "luma-events",
    LUMA_EVENTS_CACHE_TTL_MS,
    () => fetchLumaEvents(lumaApiKey),
    [],
    (error) => console.error("Failed to fetch Luma events", error),
  );
}

export function getEventUrl(event: Event): string {
  return event.url || `https://lu.ma/${event.slug}`;
}
