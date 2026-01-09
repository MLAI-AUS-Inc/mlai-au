/**
 * Unified events library that fetches events from both Humanitix and Luma,
 * normalizes them to a common format, and deduplicates across platforms.
 */

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
  source: 'humanitix' | 'luma';
  /** Used for deduplication - normalized name for comparison */
  normalizedName?: string;
}

export interface EventsConfig {
  humanitixApiKey?: string;
  lumaApiKey?: string;
}

// ============================================================================
// Humanitix API
// ============================================================================

interface HumanitixEvent {
  _id: string;
  name: string;
  startDate: string;
  endDate?: string;
  bannerImage?: { url: string };
  eventLocation?: {
    address?: string;
  };
  slug: string;
  published: boolean;
}

async function fetchHumanitixEvents(apiKey: string): Promise<Event[]> {
  if (!apiKey) {
    console.warn("Humanitix API key not provided");
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
      console.error("Failed to fetch Humanitix events:", data);
      return [];
    }

    const events = (data as any).events || [];

    // Filter to only include published events and normalize to Event interface
    const normalizedEvents: Event[] = events
      .filter((event: HumanitixEvent) => event.published === true)
      .map((event: HumanitixEvent): Event => ({
        _id: event._id,
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        bannerImage: event.bannerImage,
        eventLocation: {
          address: event.eventLocation?.address || '',
        },
        slug: event.slug,
        published: true,
        source: 'humanitix',
        normalizedName: normalizeEventName(event.name),
      }));

    console.log(`Fetched ${normalizedEvents.length} published events from Humanitix`);
    return normalizedEvents;
  } catch (error: any) {
    console.error("Error fetching Humanitix events:", error);
    return [];
  }
}

// ============================================================================
// Luma API
// ============================================================================

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
    visibility?: 'public' | 'members-only' | 'private';
    url?: string;
  };
}

interface LumaListEventsResponse {
  entries: LumaEventEntry[];
  has_more?: boolean;
  next_cursor?: string;
}

async function fetchLumaEvents(apiKey: string): Promise<Event[]> {
  if (!apiKey) {
    console.warn("Luma API key not provided");
    return [];
  }

  const url = new URL("https://public-api.luma.com/v1/calendar/list-events");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-luma-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data: LumaListEventsResponse = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch Luma events:", data);
      return [];
    }

    const entries = data.entries || [];

    // Filter to only include public events and normalize to Event interface
    const normalizedEvents: Event[] = entries
      .filter((entry: LumaEventEntry) => entry.event.visibility === 'public')
      .map((entry: LumaEventEntry): Event => {
        const event = entry.event;

        // Build address from geo_address_json
        let address = '';
        if (event.geo_address_json) {
          const geo = event.geo_address_json;
          address = geo.full_address ||
            [geo.address, geo.city, geo.region, geo.country]
              .filter(Boolean)
              .join(', ') || '';
        }

        // Build the Luma event URL slug
        const slug = event.slug || event.api_id;

        return {
          _id: entry.api_id || event.api_id,
          name: event.name,
          startDate: event.start_at,
          endDate: event.end_at,
          bannerImage: event.cover_url ? { url: event.cover_url } : undefined,
          eventLocation: {
            address: address,
          },
          slug: slug,
          published: true,
          source: 'luma',
          normalizedName: normalizeEventName(event.name),
        };
      });

    console.log(`Fetched ${normalizedEvents.length} public events from Luma`);
    return normalizedEvents;
  } catch (error: any) {
    console.error("Error fetching Luma events:", error);
    return [];
  }
}

// ============================================================================
// Deduplication & Merging
// ============================================================================

/**
 * Normalize an event name for comparison purposes.
 * Removes special characters, extra spaces, and converts to lowercase.
 */
function normalizeEventName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')        // Collapse multiple spaces
    .trim();
}

/**
 * Check if two events are likely the same event based on name and date.
 * Uses fuzzy matching for names (checking if one contains the other or high similarity)
 * and requires dates to be within 24 hours of each other.
 */
function areEventsDuplicate(eventA: Event, eventB: Event): boolean {
  const nameA = eventA.normalizedName || normalizeEventName(eventA.name);
  const nameB = eventB.normalizedName || normalizeEventName(eventB.name);

  // Check name similarity
  const namesMatch =
    nameA === nameB ||
    nameA.includes(nameB) ||
    nameB.includes(nameA) ||
    calculateSimilarity(nameA, nameB) > 0.8;

  if (!namesMatch) {
    return false;
  }

  // Check if dates are within 24 hours of each other
  const dateA = new Date(eventA.startDate).getTime();
  const dateB = new Date(eventB.startDate).getTime();
  const hoursDiff = Math.abs(dateA - dateB) / (1000 * 60 * 60);

  return hoursDiff <= 24;
}

/**
 * Calculate similarity score between two strings using Sørensen–Dice coefficient.
 * Returns a value between 0 and 1.
 */
function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;

  const getBigrams = (str: string) => {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };

  const bigramsA = getBigrams(a);
  const bigramsB = getBigrams(b);

  let intersection = 0;
  for (const bigram of bigramsA) {
    if (bigramsB.has(bigram)) {
      intersection++;
    }
  }

  return (2 * intersection) / (bigramsA.size + bigramsB.size);
}

/**
 * Deduplicate events from Humanitix and Luma.
 * When duplicates are found, Luma is preferred as the source.
 */
function deduplicateEvents(humanitixEvents: Event[], lumaEvents: Event[]): Event[] {
  const result: Event[] = [];
  const usedHumanitixIndices = new Set<number>();

  // First, add all Luma events (preferred source)
  for (const lumaEvent of lumaEvents) {
    result.push(lumaEvent);

    // Mark matching Humanitix events as used
    humanitixEvents.forEach((hEvent, index) => {
      if (areEventsDuplicate(lumaEvent, hEvent)) {
        usedHumanitixIndices.add(index);
        console.log(`Deduplicated: "${hEvent.name}" (Humanitix) -> "${lumaEvent.name}" (Luma)`);
      }
    });
  }

  // Then add Humanitix events that weren't duplicates
  humanitixEvents.forEach((hEvent, index) => {
    if (!usedHumanitixIndices.has(index)) {
      result.push(hEvent);
    }
  });

  return result;
}

// ============================================================================
// Main Export Function
// ============================================================================

/**
 * Fetch events from both Humanitix and Luma, merge and deduplicate them.
 * 
 * @param config - Configuration object with API keys
 * @returns Array of unified events, sorted by start date
 */
export async function fetchEvents(config: EventsConfig | string): Promise<Event[]> {
  // Handle legacy single-argument API key (for backward compatibility)
  let humanitixApiKey: string | undefined;
  let lumaApiKey: string | undefined;

  if (typeof config === 'string') {
    humanitixApiKey = config;
  } else {
    humanitixApiKey = config.humanitixApiKey;
    lumaApiKey = config.lumaApiKey;
  }

  // Fetch from both sources in parallel
  const [humanitixEvents, lumaEvents] = await Promise.all([
    humanitixApiKey ? fetchHumanitixEvents(humanitixApiKey) : Promise.resolve([]),
    lumaApiKey ? fetchLumaEvents(lumaApiKey) : Promise.resolve([]),
  ]);

  // Deduplicate (prefer Luma)
  const allEvents = deduplicateEvents(humanitixEvents, lumaEvents);

  // Filter to only upcoming events (server-side to avoid hydration mismatch)
  // Using a fixed timestamp captured at request time ensures consistency
  const now = Date.now();
  const upcomingEvents = allEvents.filter((event) => {
    return new Date(event.startDate).getTime() >= now;
  });

  // Sort by start date
  const sortedEvents = upcomingEvents.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  console.log(
    `Total events: ${sortedEvents.length} upcoming ` +
    `(Humanitix: ${humanitixEvents.length - (humanitixEvents.length + lumaEvents.length - allEvents.length)}, ` +
    `Luma: ${lumaEvents.length}, ` +
    `Deduplicated: ${humanitixEvents.length + lumaEvents.length - allEvents.length})`
  );

  return sortedEvents;
}

/**
 * Helper to build the event URL based on source.
 */
export function getEventUrl(event: Event): string {
  if (event.source === 'luma') {
    return `https://lu.ma/${event.slug}`;
  }
  return `https://events.humanitix.com/${event.slug}`;
}