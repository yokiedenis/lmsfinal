// app/api/quizzes/[courseId]/[chapterId]/route.ts

import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";  // Correct import for Prisma client

export async function GET(request: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { courseId, chapterId } = params;

  // Fetch the quiz data from your database using Prisma client
  const quiz = await prisma.chapterQuiz.findUnique({
    where: {
      // Use the correct composite unique constraint
      courseId_chapterId: {
        courseId,
        chapterId
      }
    },
    include: {
      questions: true  // Include the related questions
    }
  });

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return NextResponse.json({ questions: quiz.questions });
}