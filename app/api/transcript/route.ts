import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (!videoIdMatch) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const transcriptData = await YoutubeTranscript.fetchTranscript(videoIdMatch[1]);
    const transcriptText = transcriptData.map(entry => entry.text).join(' ');

    return NextResponse.json({ transcript: transcriptText });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 });
  }
}
