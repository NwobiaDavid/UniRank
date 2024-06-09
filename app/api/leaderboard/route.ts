// pages/api/leaderboard/route.ts

import { NextResponse } from 'next/server';
import connectToDB from '@/lib/connectMongo';
import userModal from '@/lib/models/user';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  await connectToDB();

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  // let dbUser;
  // let userId;

  try {
    // Fetch top 100 users
    const topUsers = await userModal
      .find({})
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(100);          // Limit to top 100 users



    // Extract user's id from the request, assuming it's passed as a query parameter
    // const url = new URL(req.url);
    // const userId = url.searchParams.get('userId');

    // if (!userId) {
    //   return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    // }

    const dbUser = await userModal.findOne({ email: session?.user?.email });

    if (!dbUser) {
      return NextResponse.json({ message: "user not found." }, { status: 404 });
    }

    const userId = dbUser._id.toString();

    // Fetch the user's position
    const allUsers = await userModal.find({}).sort({ score: -1 });
    const userIndex = allUsers.findIndex(user => user._id.toString() === userId);
    const userPosition = userIndex >= 0 ? userIndex + 1 : null;  // Rank is 1-based

    return NextResponse.json({ leaderboard: topUsers, userPosition: userPosition, user: dbUser });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
