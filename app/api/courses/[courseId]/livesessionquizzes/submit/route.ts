// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const body = await req.json();
//     const { answers, liveSessionId } = body;

//     if (!liveSessionId || !Array.isArray(answers)) {
//       return new NextResponse("Missing liveSessionId or answers", { status: 400 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const liveSession = await db.liveSession.findUnique({
//       where: {
//         id: liveSessionId,
//         courseId: params.courseId,
//       },
//     });

//     if (!liveSession) {
//       return new NextResponse("Live session not found", { status: 404 });
//     }

//     const quiz = await db.liveClassQuiz.findFirst({
//       where: {
//         liveSessionId,
//       },
//     });

//     if (!quiz) {
//       return new NextResponse("Quiz not found", { status: 404 });
//     }

//     // Calculate score
//     let score = 0;
//     const totalQuestions = quiz.questions.length;

//     answers.forEach((answer: { questionId: string; answer: string }) => {
//       const questionIndex = parseInt(answer.questionId.split("-")[1], 10);
//       const question = quiz.questions[questionIndex];
//       if (question && question.correctAnswer === answer.answer) {
//         score += 1;
//       }
//     });

//     // Save the attempt
//     await db.liveClassAttempt.create({
//       data: {
//         liveSessionId,
//         studentId: userId,
//         score,
//         timeTaken: new Date(),
//         status: "Completed",
//       },
//     });

//     return NextResponse.json({ score, totalQuestions }, { status: 201 });
//   } catch (error) {
//     console.error("[LIVESESSION_QUIZZES_SUBMIT]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }








// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// // Define the expected structure of a quiz question
// interface QuizQuestion {
//   text: string; // Updated to match database schema
//   options: string[];
//   correctAnswer: string;
// }

// // Type guard to validate a single question
// function isQuizQuestion(obj: unknown): obj is QuizQuestion {
//   return (
//     typeof obj === "object" &&
//     obj !== null &&
//     "text" in obj &&
//     typeof (obj as any).text === "string" &&
//     "options" in obj &&
//     Array.isArray((obj as any).options) &&
//     (obj as any).options.every((opt: unknown) => typeof opt === "string") &&
//     "correctAnswer" in obj &&
//     typeof (obj as any).correctAnswer === "string"
//   );
// }

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const body = await req.json();
//     const { answers, liveSessionId } = body;

//     console.log("[SUBMIT_API] Request body:", { liveSessionId, answers });

//     if (!liveSessionId || !Array.isArray(answers)) {
//       return new NextResponse("Missing liveSessionId or answers", { status: 400 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId },
//     });
//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const liveSession = await db.liveSession.findUnique({
//       where: { id: liveSessionId, courseId: params.courseId },
//     });
//     if (!liveSession) {
//       return new NextResponse("Live session not found", { status: 404 });
//     }

//     const quiz = await db.liveClassQuiz.findFirst({
//       where: { liveSessionId },
//     });
//     if (!quiz) {
//       return new NextResponse("Quiz not found", { status: 404 });
//     }

//     console.log("[SUBMIT_API] Quiz data:", { quizId: quiz.id, questions: quiz.questions });

//     // Validate that questions is an array
//     if (!Array.isArray(quiz.questions)) {
//       console.error("[SUBMIT_API] Invalid questions format:", quiz.questions);
//       return new NextResponse("Invalid quiz questions format", { status: 500 });
//     }

//     // Validate and filter questions
//     const questions: QuizQuestion[] = (quiz.questions as unknown as any[]).filter(isQuizQuestion);
//     if (questions.length !== quiz.questions.length) {
//       console.error("[SUBMIT_API] Invalid questions detected:", quiz.questions);
//       return new NextResponse("Invalid quiz questions format", { status: 500 });
//     }

//     // Calculate score
//     let score = 0;
//     const totalQuestions = questions.length;

//     answers.forEach((answer: { questionId: string; answer: string }, index: number) => {
//       console.log("[SUBMIT_API] Processing answer:", { index, questionId: answer.questionId, answer: answer.answer });
//       const parts = answer.questionId.split("-");
//       if (parts.length < 2) {
//         console.warn("[SUBMIT_API] Invalid questionId format:", answer.questionId);
//         return;
//       }
//       const questionIndex = parseInt(parts[1], 10);
//       if (isNaN(questionIndex) || questionIndex < 0 || questionIndex >= questions.length) {
//         console.warn("[SUBMIT_API] Invalid question index:", { questionId: answer.questionId, questionIndex });
//         return;
//       }
//       const question = questions[questionIndex];
//       if (question && question.correctAnswer === answer.answer) {
//         score += 1;
//       }
//     });

//     // Save the attempt
//     await db.liveClassAttempt.create({
//       data: {
//         liveSessionId,
//         studentId: userId,
//         score,
//         timeTaken: new Date(),
//         status: "Completed",
//       },
//     });

//     console.log("[SUBMIT_API] Submission successful:", { score, totalQuestions });

//     return NextResponse.json({ score, totalQuestions }, { status: 201 });
//   } catch (error) {
//     console.error("[LIVESESSION_QUIZZES_SUBMIT]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }








import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getAuth } from "@clerk/nextjs/server";
import { JsonValue } from "@prisma/client/runtime/library";

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
  liveSessionId: z.string().min(1, "Live session ID is required"),
});

// Define the expected structure of a quiz question
interface QuizQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
}

// Type guard to validate a single question
function isQuizQuestion(obj: unknown): obj is QuizQuestion {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "text" in obj &&
    typeof (obj as any).text === "string" &&
    "options" in obj &&
    Array.isArray((obj as any).options) &&
    (obj as any).options.every((opt: unknown) => typeof opt === "string") &&
    "correctAnswer" in obj &&
    typeof (obj as any).correctAnswer === "string"
  );
}

// API route handler for submitting quiz answers
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;

  // Parse and validate the request body
  const body = await request.json();
  const result = answerSchema.safeParse(body);

  if (!result.success) {
    console.error("[SUBMIT_API] Validation errors:", result.error.errors);
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { answers, liveSessionId } = result.data;

  // Get user authentication details
  const { userId } = getAuth(request);

  // Check if the user is authenticated
  if (!userId) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  try {
    // Validate course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Validate live session exists and belongs to the course
    const liveSession = await prisma.liveSession.findUnique({
      where: { id: liveSessionId, courseId },
    });
    if (!liveSession) {
      return NextResponse.json({ message: "Live session not found" }, { status: 404 });
    }

    // Fetch the quiz by liveSessionId
    const quiz = await prisma.liveClassQuiz.findFirst({
      where: { liveSessionId },
    });
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    console.log("[SUBMIT_API] Quiz data:", { quizId: quiz.id, questions: quiz.questions });

    // Validate questions is an array
    if (!Array.isArray(quiz.questions)) {
      console.error("[SUBMIT_API] Invalid questions format:", quiz.questions);
      return NextResponse.json({ message: "Invalid quiz questions format" }, { status: 400 });
    }

    // Validate and filter questions
    const questions: QuizQuestion[] = quiz.questions.filter(isQuizQuestion) as unknown as QuizQuestion[];
    if (questions.length !== quiz.questions.length) {
      console.error("[SUBMIT_API] Invalid questions detected:", quiz.questions);
      return NextResponse.json({ message: "Invalid quiz questions format" }, { status: 500 });
    }

    // Calculate score
    let score = 0;
    const totalQuestions = questions.length;

    answers.forEach((answer: { questionId: string; answer: string }, index: number) => {
      console.log("[SUBMIT_API] Processing answer:", { index, questionId: answer.questionId, answer: answer.answer });
      const parts = answer.questionId.split("-");
      if (parts.length !== 2) {
        console.warn("[SUBMIT_API] Invalid question ID format:", answer.questionId);
        return;
      }
      const questionIndex = parseInt(parts[1], 10);
      if (isNaN(questionIndex) || questionIndex < 0 || questionIndex >= totalQuestions) {
        console.error("[SUBMIT_API] Invalid question index:", { questionId: answer.questionId, questionIndex });
        return;
      }
      const question = questions[questionIndex];
      console.log("[SUBMIT_API] Comparing:", { correctAnswer: question.correctAnswer, submittedAnswer: answer.answer });
      if (question && question.correctAnswer === answer.answer) {
        score += 1;
      }
    });

    // Save attempt
    const quizAttempt = await prisma.liveClassAttempt.create({
      data: {
        liveSessionId,
        studentId: userId,
        score,
        timeTaken: new Date(),
        status: "Completed",
      },
    });

    console.log("[SUBMIT_API] Submission successful:", { score, totalQuestions });

    // Return the results
    return NextResponse.json(
      {
        score,
        totalQuestions,
        attemptId: quizAttempt.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SUBMIT_API] Failed to submit answers:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to submit answers";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}