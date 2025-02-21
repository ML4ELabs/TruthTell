"use server";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
console.log("Request body:", body);

const text = body.text?.value || body.text; // Extract `value` directly
console.log("Extracted text:", text);

  if (!text) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  try {
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const openAiApiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(openAiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: "You are a fact-checking assistant. Respond with 'True', 'False', or 'Neutral'.",
          },
          {
            role: 'user',
            content: text,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Hi m here");
    console.log(data);
    console.log(data?.choices?.[0]?.message?.content);
    return NextResponse.json(data?.choices?.[0]?.message?.content ?? "No content available");
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    return NextResponse.json({ error: 'Error fetching data from OpenAI' }, { status: 500 });
  }
}
