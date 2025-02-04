import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { URL } from '@/lib/models/url';
import { generateShortId } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { url, expiryDays, displayLanding } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const shortId = generateShortId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expiryDays || 7)); // Default 7 days

    const shortenedUrl = await URL.create({
      originalUrl: url,
      shortId,
      expiresAt,
      displayLanding
    });

    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`,
      expiresAt: shortenedUrl.expiresAt,
      displayLanding: shortenedUrl.displayLanding,
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json(
      { error: 'Error shortening URL' },
      { status: 500 }
    );
  }
}
