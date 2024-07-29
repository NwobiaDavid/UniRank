import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getServerSession } from "next-auth";
import connectToDB from "@/lib/connectMongo";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NEXT_MYEMAIL,
    pass: process.env.NEXT_PASSWORD,
  },
});


const sendEmail = async (email: string, university: string, reason: string) => {
  const mailOptions = {
    from: process.env.NEXT_MYEMAIL,
    to: process.env.NEXT_MYEMAIL,
    subject: "New University Request",
    text: `Email: ${email}\nUniversity: ${university}\nReason: ${reason}`,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "Invalid request" }, { status: 409 });
  }

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  await connectToDB();

  try {
    const { email, university, reason } = await request.json();

    if (!email || !university || !reason) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await sendEmail(email, university, reason);

    return NextResponse.json({ message: "Your request has been submitted" }, { status: 201 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
