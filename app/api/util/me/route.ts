// import connectToDB from "../../../../../utlis/connectMongo";
import { NextResponse } from "next/server";
// import productModal from "../../../../../utlis/model/product";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
// import userModal from "../../../../../utlis/model/user";
// import goalModal from "../../../../../utlis/model/goal";
import { debug } from "console";
import userModal from "@/lib/models/user";
import connectToDB from "@/lib/connectMongo";

export async function GET(request: Request){


  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  let dbUser;
  let myGoals;

  try {
    
    // Connect to the MongoDB database
    await connectToDB();


    // Find the product by ID
    dbUser = await userModal.findOne({ email: session?.user?.email });

    // Check if the product exists
    if (!dbUser) {
      return NextResponse.json({ message: "user not found." }, { status: 404 });
    }

    // myGoals = await goalModal.find({userId: dbUser._id})


    // return NextResponse.json({ message: "Product updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }

  return NextResponse.json(
    {
    //  myGoals: myGoals,
     user: dbUser
    },
    { status: 200 },
  );
}
