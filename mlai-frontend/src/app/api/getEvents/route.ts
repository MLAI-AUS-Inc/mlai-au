import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const apiKey = process.env.PUBLIC_HUMANITIX_API_KEY;

  if (!apiKey) {
    console.error('API key not found');
    return new NextResponse(JSON.stringify({ error: 'API key not found' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL('https://api.humanitix.com/v1/events');
  url.searchParams.append('page', '1'); // Add the page parameter here

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    // console.log('Response:', data);
    
    // Save response to file
    // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    // const filename = `humanitix-response-${timestamp}.txt`;
    // const filepath = join(process.cwd(), filename);
    
    // try {
    //   writeFileSync(filepath, JSON.stringify(data, null, 2));
    //   console.log(`Response saved to: ${filepath}`);
    // } catch (error) {
    //   console.error('Error saving response to file:', error);
    // }

    if (!response.ok) {
      console.error('Failed to fetch events:', data);
      return new NextResponse(JSON.stringify({ error: 'Failed to fetch events' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Filter to only include published events
    const filteredData = {
      ...data,
      events: data.events?.filter((event: any) => event.published === true) || []
    };
    
    console.log(`Filtered ${data.events?.length || 0} events to ${filteredData.events.length} published events`);

    return new NextResponse(JSON.stringify(filteredData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching events', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
