"use server"


import { useEffect } from 'react';
import connectToDB from './connectMongo';
import { redirect } from 'next/navigation';
import userModal from './models/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export default async function useFetchData() {

  const session = await getServerSession();
  
  // console.log(session);

  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }
  // console.log("session here==> "+ session)

      await connectToDB();
      // return session
      try {
        const existingUser = await userModal.findOne({ email: session?.user?.email });
        console.log("user ---> "+JSON.stringify(existingUser));
        if (existingUser.university ) {
          return "true";
        } else {
            return "false";
        }
      } catch (error:any) {
        console.error("ERROR:", error?.message);
      }
}
