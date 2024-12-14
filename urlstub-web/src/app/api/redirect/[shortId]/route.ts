  import { connectDB } from '@/lib/mongodb';
import { URL } from '@/lib/models/url';

export async function GET(request: Request,
  { params }: { params: Promise<{ shortId: string }> }) {

  const { shortId } = await   params
  if (!shortId || typeof shortId !== 'string') {
    return new Response('Invalid shortId', {
      status: 400,
    })
  }

  try {
    await connectDB();
    console.log(`Searching for URL with shortId: ${shortId}`);
    const url = await URL.findOne({
      shortId,
    });

    if (!url) {
      console.error(`URL not found for shortId: ${shortId}`);
      return new Response('URL not found', {
        status: 404,
      })
    }

    console.log(`Found URL: ${url.originalUrl} for shortId: ${shortId}`);
    console.log(url);
    return Response.json(url);
  } catch (error) {
    console.error('Error redirecting:', error);
    return new Response('Internal server error', {
      status: 500,
    })
  }
}