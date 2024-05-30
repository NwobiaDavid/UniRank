// pages/api/leaderboard/route.ts

import { NextResponse } from 'next/server';
import connectToDB from '@/lib/connectMongo';
import userModal from '@/lib/models/user';

export async function GET(req: Request) {
  await connectToDB();

  try {
    const leaderboard = await userModal
      .find({})
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(20);          // Limit to top 100 users

    return NextResponse.json({ leaderboard: leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
