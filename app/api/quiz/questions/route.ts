import connectToDB from "@/lib/connectMongo";
import questionModal from "@/lib/models/question";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDB();

  let questions;
  try {
    questions = await questionModal.find({});
    
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }

  // Shuffle questions
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  // Select 30 random questions
  const selectedQuestions = shuffledQuestions.slice(0, 30);

  // console.log(partners);
  return NextResponse.json(
    {
        questions: selectedQuestions,
    },
    { status: 200 },
  );
}

