import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Import your Prisma client instance
import { z } from "zod"; // Import Zod for validation

// Zod schema for validating the quiz creation request
const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        options: z.array(z.string()).min(4, "At least four options are required"),
        correctAnswer: z.string().min(1, "Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

// API route handler for quizzes
export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  const { courseId } = params; // Extract courseId from parameters

  // Parse the request body
  const body = await request.json();

  // Validate the request body against the schema
  const result = quizSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { title, questions } = result.data; // Destructure validated data

  try {
    // Create a new quiz in the database
    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId, // Associate the quiz with the specified course
        questions: {
          create: questions.map((question) => ({
            questionText: question.text, // Map question text
            correctAnswer: question.correctAnswer, // Map correct answer
            options: { // Now using the new Option model structure
              create: question.options.map((option) => ({
                text: option, // Map each option text
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(quiz, { status: 201 }); // Return the created quiz
  } catch (error) {
    console.error("Failed to create quiz:", error); // Log the error
    return NextResponse.json(
      { message: "Failed to create quiz" },
      { status: 500 }
    ); // Return an error response
  }
}
