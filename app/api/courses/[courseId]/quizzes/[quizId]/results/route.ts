import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Import your Prisma client instance

export async function GET(request: Request, { params }: { params: { courseId: string; quizId: string } }) {
  const { courseId, quizId } = params; // Extract courseId and quizId from parameters

  const studentId = request.headers.get("student-id"); // Get studentId from headers

  if (!studentId) {
    return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
  }

  try {
    // Fetch the quiz attempt results for the specific student
    const quizAttempt = await prisma.quizAttempt.findFirst({
      where: {
        quizId,
        studentId,
      },
      select: {
        score: true,
        totalQuestions: true,
      },
    });

    if (!quizAttempt) {
      return NextResponse.json({ message: "No results found for this student" }, { status: 404 });
    }

    return NextResponse.json(quizAttempt, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    return NextResponse.json({ message: "Failed to fetch quiz results" }, { status: 500 });
  }
}
