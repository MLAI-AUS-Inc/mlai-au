import { NextRequest, NextResponse } from 'next/server';

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

    if (!response.ok) {
      console.error('Failed to fetch events:', data);
      return new NextResponse(JSON.stringify({ error: 'Failed to fetch events' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify(data), {
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
