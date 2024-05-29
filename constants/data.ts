import connectToDB from "@/lib/connectMongo";
import questionModal from "@/lib/models/question";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    correctOptionIndex: 0,
  },
  {
    question: "Which number is the largest?",
    options: ["5", "15", "25", "35"],
    correctOptionIndex: 3,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    correctOptionIndex: 0,
  },
  // ... more questions up to 100
];

export async function insertQuestions() {
  await connectToDB();

  try {
    await questionModal.insertMany(questions);
    console.log("Questions inserted successfully");
  } catch (error) {
    console.log("ERROR" + error);
  }
}

insertQuestions();
