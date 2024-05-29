"use server"

import { useEffect } from 'react';
import connectToDB from './connectMongo';
import { redirect } from 'next/navigation';
import userModal from './models/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import goalModal from '../../utlis/model/goal';

export default async function useFetchDataInt() {

  const session = await getServerSession();
  // console.log(session);

  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

      await connectToDB();
      try {
        // const existingUser = await userModal.findOne({ email: session?.user?.email });
        // const userGoals = await goalModal.find({ userId: existingUser?._id})
        // if (existingUser && existingUser.interests && existingUser.interests.length > 0 && userGoals.length > 0) {
        //   return "goals"
        // } else if (existingUser && existingUser.interests && existingUser.interests.length > 0) {
        //   return "true";
        // }
        // else {
        //   return "false";
        // }
      } catch (error:any) {
        console.error("ERROR:", error?.message);
      }
}
