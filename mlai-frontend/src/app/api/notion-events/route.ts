import { NextRequest, NextResponse } from 'next/server';

const NOTION_API_KEY = process.env.NOTION_API_KEY || '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';
const NOTION_VERSION = '2022-06-28';

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
        'Event Name': {
            title: Array<{ text: { content: string } }>;
        };
        'Cover Image URL': {
            url: string;
        };
        'Date': {
            date: { start: string; end?: string };
        };
        'Event Image': {
            files: Array<{ name: string; external: { url: string } }>;
        };
        'Event Link': {
            url: string;
        };
        'Event Type': {
            select: { name: string };
        };
        'Location': {
            rich_text: Array<{ text: { content: string } }>;
        };
        'Registration Status': {
            select: { name: string };
        };
        'Time': {
            rich_text: Array<{ text: { content: string } }>;
        };
        'Calendar API ID': {
            rich_text: Array<{ text: { content: string } }>;
        };
    };
}

// Helper function to find the Luma Events database
async function findLumaEventsDatabase() {
    try {
        const searchResponse = await fetch('https://api.notion.com/v1/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': NOTION_VERSION,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'Luma Events Database',
                filter: {
                    value: 'database',
                    property: 'object'
                }
            }),
        });

        if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.results && searchData.results.length > 0) {
                return searchData.results[0].id;
            }
        }
        return null;
    } catch (error) {
        console.error('Error finding database:', error);
        return null;
    }
}

// GET: Retrieve events from Notion database
export async function GET() {
    try {
        const databaseId = await findLumaEventsDatabase();
        
        if (!databaseId) {
            console.log('No database found, returning empty events array');
            return NextResponse.json({ 
                events: [],
                message: 'No Luma Events database found. Please create one first using the setup script.'
            });
        }

        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': NOTION_VERSION,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: 'Date',
                        direction: 'ascending'
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error(`Notion API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Transform Notion data back to LumaEvent format
        let events: LumaEvent[] = data.results.map((page: NotionEvent) => {
            const eventName = page.properties['Event Name']?.title?.[0]?.text?.content || 'Untitled Event';
            const startDate = page.properties['Date']?.date?.start || new Date().toISOString();
            const endDate = page.properties['Date']?.date?.end || startDate;
            const location = page.properties['Location']?.rich_text?.[0]?.text?.content || '';
            const imageUrl = page.properties['Cover Image URL']?.url || 
                           page.properties['Event Image']?.files?.[0]?.external?.url || 
                           '/api/placeholder/400/300';
            const eventUrl = page.properties['Event Link']?.url || '#';
            const time = page.properties['Time']?.rich_text?.[0]?.text?.content || '';
            const eventType = page.properties['Event Type']?.select?.name || '';

            return {
                id: page.id,
                name: eventName,
                description: `${eventType}${time ? ` • ${time}` : ''}`,
                startDate: startDate,
                endDate: endDate,
                location: location,
                image: imageUrl,
                url: eventUrl
            };
        });

        // Sort events: upcoming events first (ascending), then past events (descending)
        const now = new Date();
        const upcomingEvents = events.filter(event => new Date(event.startDate) >= now)
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        const pastEvents = events.filter(event => new Date(event.startDate) < now)
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        
        events = [...upcomingEvents, ...pastEvents];

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error fetching from Notion:', error);
        
        return NextResponse.json(
            { 
                error: 'Failed to fetch events from Notion',
                details: error instanceof Error ? error.message : 'Unknown error',
                events: []
            },
            { status: 500 }
        );
    }
}

// POST: Save events to Notion database
export async function POST(request: NextRequest) {
    try {
        const { events }: { events: LumaEvent[] } = await request.json();
        
        if (!events || !Array.isArray(events)) {
            return NextResponse.json(
                { error: 'Invalid events data provided' },
                { status: 400 }
            );
        }
        
        // Filter events to only include those with the specific calendar_api_id
        const targetCalendarApiId = 'cal-KPakbH2wTxQuyCj';
        
        const filteredEvents = events.filter(event => 
            event.calendar_api_id === targetCalendarApiId
        );
        
        if (filteredEvents.length === 0) {
            return NextResponse.json({
                message: `No events found with calendar_api_id: ${targetCalendarApiId}`,
                successful: 0,
                failed: 0,
                filtered_out: events.length,
                debug: {
                    received_calendar_ids: events.map(e => e.calendar_api_id),
                    target_calendar_id: targetCalendarApiId
                }
            });
        }

        const databaseId = await findLumaEventsDatabase();
        
        if (!databaseId) {
            return NextResponse.json(
                { 
                    error: 'No Luma Events database found',
                    message: 'Please create the database first using the setup script provided'
                },
                { status: 404 }
            );
        }

        // Get existing events to check for duplicates
        const existingEventsResponse = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': NOTION_VERSION,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        let existingUrls = new Set<string>();
        if (existingEventsResponse.ok) {
            const existingData = await existingEventsResponse.json();
            existingUrls = new Set(
                existingData.results.map((page: any) => 
                    page.properties['Event Link']?.url || ''
                ).filter((url: string) => url)
            );
        }

        // Filter out events that already exist (by URL)
        const newEvents = filteredEvents.filter(event => !existingUrls.has(event.url));

        if (newEvents.length === 0) {
            return NextResponse.json({
                message: 'No new events to import - all events already exist in the database',
                successful: 0,
                failed: 0,
                duplicates_skipped: filteredEvents.length,
                total_received: events.length
            });
        }

        // Helper function to determine event type based on name
        const getEventType = (name: string): string => {
            const lowerName = name.toLowerCase();
            if (lowerName.includes('co-working') || lowerName.includes('coworking')) return 'Co-working';
            if (lowerName.includes('conference') || lowerName.includes('summit')) return 'Conference';
            if (lowerName.includes('networking') || lowerName.includes('social')) return 'Networking';
            return 'AI Community';
        };

        // Helper function to determine registration status
        const getRegistrationStatus = (startDate: string): string => {
            const eventDate = new Date(startDate);
            const now = new Date();
            
            if (eventDate < now) return 'Past Event';
            return 'Open';
        };

        // Helper function to format time
        const formatEventTime = (startDate: string, endDate: string): string => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            const startTime = start.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            });
            
            const endTime = end.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            });
            
            return `${startTime} - ${endTime} AEST`;
        };

        // Save each new event to the database
        const savePromises = newEvents.map(async (event) => {
            try {
                const response = await fetch('https://api.notion.com/v1/pages', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${NOTION_API_KEY}`,
                        'Notion-Version': NOTION_VERSION,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        parent: { database_id: databaseId },
                        properties: {
                            'Event Name': {
                                title: [
                                    {
                                        text: {
                                            content: event.name
                                        }
                                    }
                                ]
                            },
                            'Cover Image URL': {
                                url: event.image
                            },
                            'Date': {
                                date: {
                                    start: event.startDate.split('T')[0], // Extract date part
                                    end: event.endDate !== event.startDate ? event.endDate.split('T')[0] : undefined
                                }
                            },
                            'Event Image': {
                                files: [
                                    {
                                        name: 'Event Cover',
                                        external: {
                                            url: event.image
                                        }
                                    }
                                ]
                            },
                            'Event Link': {
                                url: event.url
                            },
                            'Event Type': {
                                select: {
                                    name: getEventType(event.name)
                                }
                            },
                            'Location': {
                                rich_text: [
                                    {
                                        text: {
                                            content: event.location
                                        }
                                    }
                                ]
                            },
                            'Registration Status': {
                                select: {
                                    name: getRegistrationStatus(event.startDate)
                                }
                            },
                            'Time': {
                                rich_text: [
                                    {
                                        text: {
                                            content: formatEventTime(event.startDate, event.endDate)
                                        }
                                    }
                                ]
                            },
                            'Calendar API ID': {
                                rich_text: [
                                    {
                                        text: {
                                            content: event.calendar_api_id || ''
                                        }
                                    }
                                ]
                            }
                        }
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to save event "${event.name}": ${response.status} ${errorText}`);
                }

                return await response.json();
            } catch (error) {
                console.error(`Failed to save event "${event.name}":`, error);
                throw error;
            }
        });

        const results = await Promise.allSettled(savePromises);
        
        const successful = results.filter(result => result.status === 'fulfilled').length;
        const failed = results.filter(result => result.status === 'rejected');

        if (failed.length > 0) {
            console.error('Some events failed to save:', failed.map(f => f.status === 'rejected' ? f.reason?.message : 'Unknown'));
        }

        return NextResponse.json({
            message: `Successfully saved ${successful} out of ${newEvents.length} new events to Notion database`,
            successful,
            failed: failed.length,
            total_received: events.length,
            filtered_events: filteredEvents.length,
            new_events: newEvents.length,
            duplicates_skipped: filteredEvents.length - newEvents.length,
            filtered_out: events.length - filteredEvents.length,
            errors: failed.map(f => f.status === 'rejected' ? f.reason?.message : 'Unknown error')
        });

    } catch (error) {
        console.error('Error saving to Notion:', error);
        
        return NextResponse.json(
            { 
                error: 'Failed to save events to Notion',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}