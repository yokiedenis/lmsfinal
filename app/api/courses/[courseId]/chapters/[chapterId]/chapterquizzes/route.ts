import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { courseId, chapterId } = params;

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
          chapterOptions: true, // Fetch options
        },
      },
    },
  });

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  // Format the questions
  const formattedQuestions = quiz.questions.map((question) => ({
    id: question.id,
    question: question.questionText,
    options: question.chapterOptions.map((option) => ({
      id: option.id,
      text: option.text,
      isCorrect: option.isCorrect,
    })),
  }));

  return NextResponse.json({ questions: formattedQuestions });
}
