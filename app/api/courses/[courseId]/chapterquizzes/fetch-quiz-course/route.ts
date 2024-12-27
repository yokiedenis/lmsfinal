import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Named export for GET request
export async function GET(req: NextApiRequest, { params }: { params: { courseId: string } }) {
  try {
    // Fetch ChapterQuizzes by courseId, including the _count field for questions
    const chapterQuizzes = await prisma.chapterQuiz.findMany({
      where: {
        courseId: params.courseId,
      },
      select: {
        id: true,         // Include the ID of the chapter quiz
        title: true,      // Include the title
        chapterId: true,  // Include the chapterId if needed
        _count: {
          select: { questions: true },  // Include the count of questions related to each chapter quiz
        },
      },
    });

    return new Response(JSON.stringify(chapterQuizzes), { status: 200 }); // Send chapter quizzes as response
  } catch (error) {
    console.error("Error fetching chapter quizzes:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching chapter quizzes" }),
      { status: 500 }
    );
  }
}
