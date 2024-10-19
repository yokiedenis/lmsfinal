import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { courseId: string; quizId: string } }) {
  const { quizId } = params;
  console.log("Received quizId:", quizId);

  try {
    console.log("Fetching quiz with ID:", quizId);
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      console.error("Quiz not found:", quizId);
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return NextResponse.json({ message: "Failed to fetch quiz" }, { status: 500 });
  }
}