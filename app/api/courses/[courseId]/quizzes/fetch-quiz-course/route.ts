import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Named export for GET request
export async function GET(req: NextApiRequest, { params }: { params: { courseId: string } }) {
  try {
    // Fetch quizzes by courseId, including the _count field for questions
    const quizzes = await prisma.quiz.findMany({
      where: {
        courseId: params.courseId,
      },
      select: {
        id: true,         // Include the ID of the quiz
        title: true,      // Include the title
        _count: {
          select: { questions: true },  // Include the count of questions related to each quiz
        },
        chapterId: true,  // Include the chapterId if needed
      },
    });

    return new Response(JSON.stringify(quizzes), { status: 200 }); // Send quizzes as response
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching quizzes" }),
      { status: 500 }
    );
  }
}
