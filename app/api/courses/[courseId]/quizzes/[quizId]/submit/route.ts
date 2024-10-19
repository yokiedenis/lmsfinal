import { NextResponse, NextRequest } from "next/server"; // Import NextRequest
import prisma from "@/lib/prisma"; // Import your Prisma client instance
import { z } from "zod"; // Import Zod for validation
import { getAuth } from "@clerk/nextjs/server"; // Import Clerk's getAuth function

// Zod schema for validating the answer submission
const answerSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1, "Question ID is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one answer is required"),
});

// API route handler for submitting quiz answers
export async function POST(request: NextRequest, { params }: { params: { courseId: string; quizId: string } }) {
  const { quizId } = params; // Extract quizId from parameters

  // Parse the request body
  const body = await request.json();

  // Validate the request body against the schema
  const result = answerSchema.safeParse(body);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors); // Log validation errors
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { answers } = result.data; // Destructure validated data

  // Get user authentication details from the request
  const { userId } = getAuth(request); // Get the authenticated user ID

  // Check if the user is authenticated
  if (!userId) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Fetch the quiz questions and their correct answers
    const quizQuestions = await prisma.question.findMany({
      where: { quizId },
      select: { id: true, correctAnswer: true },
    });

    // Calculate score
    let score = 0;
    const totalQuestions = quizQuestions.length;

    // Iterate through answers to calculate the score
    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score++;
      }
    });

    // Save the quiz attempt with the userId included
    const quizAttempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        studentId: userId, // Use the authenticated user's ID
        score,
        totalQuestions,
        answers: JSON.stringify(answers), // Save answers as JSON string
      },
    });

    // Return the results with status 201 (Created)
    return NextResponse.json(
      {
        score,
        totalQuestions,
        attemptId: quizAttempt.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit answers:", error);

    // Type assertion to handle the unknown error type
    const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
