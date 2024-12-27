import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { courseId, chapterId } = params;
  const { title, questions } = await req.json();

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId,
        chapterId,
        questions: {
          create: questions.map((q: { questionText: string; options: string[]; correctAnswer: string }) => ({
            questionText: q.questionText,
            options: {
              create: q.options.map((optionText) => ({ text: optionText })),
            },
            correctAnswer: q.correctAnswer,
          })),
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
