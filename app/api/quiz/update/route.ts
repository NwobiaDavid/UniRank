import { NextResponse } from "next/server";
// import connectToDB from "../../../../../../lib/connectMongo";
import { getServerSession } from "next-auth";
// import userModal from "../../../../../../utlis/model/user";
import { redirect } from "next/dist/server/api-utils";
import userModal from "@/lib/models/user";
import connectToDB from "@/lib/connectMongo";

export async function PUT(request:Request) {
  if (request.method !== "PUT") {
    return NextResponse.json({ message: "invalid request" }, { status: 409 });
  }

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  await connectToDB();

  const { score, numtry } = await request.json();
  try {
    const dbUser = await userModal.findOne({ email: session?.user?.email });
    if (!dbUser) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 },
      );
    }

    dbUser.score = score;
    dbUser.numtry += numtry;

    await dbUser.save();
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "SUCCESSFULLY POSTED DATA",
    },
    { status: 201 },
  );
}
