import { NextResponse } from "next/server";
import connectToDB from "../../../../../../utlis/connectMongo";
import { getServerSession } from "next-auth";
import userModal from "../../../../../../utlis/model/user";
import { redirect } from "next/dist/server/api-utils";

export async function PUT(request:Request) {
  if (request.method !== "PUT") {
    return NextResponse.json({ message: "invalid request" }, { status: 409 });
  }

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  await connectToDB();

  const { university } = await request.json();
  try {
    const dbUser = await userModal.findOne({ email: session?.user?.email });
    if (!dbUser) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 },
      );
    }

    dbUser.university = university;
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
