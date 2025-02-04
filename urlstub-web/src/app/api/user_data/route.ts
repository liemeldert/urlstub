import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { userData } from '@/lib/models/user_data';

export async function POST(req: NextRequest) {
  try {
    const { shortId, ip, user_agent, referer } = await req.json();
    
    if (!shortId) {
      return NextResponse.json(
        { error: 'shortId is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const userDataObj = await userData.create({
        shortId,
        ip,
        user_agent,
        referer
    });
    userDataObj.save();

    return NextResponse.json({
      ID: userDataObj._id
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json(
      { error: 'Error shortening URL' },
      { status: 500 }
    );
  }
}
