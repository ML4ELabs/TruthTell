import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const serpApiKey = process.env.SERP_API_KEY;
    const serpApiUrl = `https://serpapi.com/search?engine=google&q=${encodeURIComponent(query)}&api_key=${serpApiKey}`;

    const response = await fetch(serpApiUrl);
    const data = await response.json();
    // modi lost election in center he is removed from power
    return NextResponse.json(data["organic_results"][0]["snippet"]);
  } catch (error) {
    console.error('Error fetching data from SerpApi:', error);
    return NextResponse.json({ error: 'Error fetching data from SerpApi' }, { status: 500 });
  }
}
