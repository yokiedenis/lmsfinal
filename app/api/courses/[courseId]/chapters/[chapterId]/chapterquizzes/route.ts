import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;

  try {
    // Fetch the ChapterQuiz along with related questions and options
    const quiz = await prisma.chapterQuiz.findUnique({
      where: {
        courseId_chapterId: {
          courseId,
          chapterId,
        },
      },
      include: {
        questions: {
          include: {
            chapterOptions: {
              orderBy: {
                id: "asc", // Ensure options are ordered by ID
              },
            },
          },
        },
      },
    });

    // Check if the quiz exists
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Format the questions for the response
    const formattedQuestions = quiz.questions.map((question) => ({
      id: question.id,
      questionText: question.questionText, // Ensure this field is correctly populated in the database
      options: question.chapterOptions.map((option) => ({
        id: option.id,
        text: option.text,
        isCorrect: option.isCorrect,
      })),
    }));

    // Return the formatted questions
    return NextResponse.json({ questions: formattedQuestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz data" },
      { status: 500 }
    );
  }
}
