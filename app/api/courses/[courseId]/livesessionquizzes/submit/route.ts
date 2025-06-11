// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { auth } from "@clerk/nextjs/server";
// import { z } from "zod";

// const prisma = new PrismaClient();

// const AnswerSchema = z.object({
//   questionId: z.string(),
//   answer: z.string(),
// });

// const SubmitSchema = z.object({
//   answers: z.array(AnswerSchema),
//   liveSessionId: z.string(),
// });

// export async function POST(
//   request: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // Authenticate user with Clerk
//     const { userId } = auth();
//     if (!userId) {
//       return NextResponse.json(
//         { message: "Unauthorized: Please log in." },
//         { status: 401 }
//       );
//     }

//     const { courseId } = params;

//     // Parse and validate request body
//     const body = await request.json();
//     console.log("[QUIZ_SUBMIT] Request body:", body);
//     const { answers, liveSessionId } = SubmitSchema.parse(body);

//     // Verify course and live session exist
//     const liveSession = await prisma.liveSession.findUnique({
//       where: { id: liveSessionId, courseId },
//       include: { liveclassquizzes: { where: { isPublished: true } } },
//     });

//     if (!liveSession) {
//       return NextResponse.json(
//         { message: "Live session not found." },
//         { status: 404 }
//       );
//     }

//     const quiz = liveSession.liveclassquizzes[0];
//     if (!quiz) {
//       return NextResponse.json(
//         { message: "No published quiz found for this live session." },
//         { status: 404 }
//       );
//     }

//     // Parse quiz questions
//     const questions = quiz.questions as {
//       text: string;
//       options: string[];
//       correctAnswer: string;
//     }[];
//     console.log("[QUIZ_SUBMIT] Quiz questions:", questions);

//     if (!Array.isArray(questions) || questions.length === 0) {
//       return NextResponse.json(
//         { message: "Invalid quiz data: No questions found." },
//         { status: 400 }
//       );
//     }

//     // Validate answers
//     const invalidAnswers: string[] = [];
//     let score = 0;

//     answers.forEach((answer) => {
//       const questionIndex = parseInt(answer.questionId.split("-")[1], 10);
//       const question = questions[questionIndex];
//       console.log("[QUIZ_SUBMIT] Processing answer:", { answer, questionIndex, question });

//       if (!question) {
//         invalidAnswers.push(answer.questionId);
//         return;
//       }

//       if (answer.answer === question.correctAnswer) {
//         score += 1;
//       }
//     });

//     if (invalidAnswers.length > 0) {
//       console.log("[QUIZ_SUBMIT] Invalid answers:", invalidAnswers);
//       return NextResponse.json(
//         {
//           message: "Some answers were invalid.",
//           invalidAnswers,
//         },
//         { status: 400 }
//       );
//     }

//     // Check for existing attempt and update or create
//     const existingAttempt = await prisma.liveClassAttempt.findFirst({
//       where: { liveSessionId, studentId: userId },
//     });

//     if (existingAttempt) {
//       await prisma.liveClassAttempt.update({
//         where: { id: existingAttempt.id },
//         data: { score, timeTaken: new Date(), status: "Completed" },
//       });
//     } else {
//       await prisma.liveClassAttempt.create({
//         data: {
//           liveSessionId,
//           studentId: userId,
//           score,
//           timeTaken: new Date(),
//           status: "Completed",
//         },
//       });
//     }

//     console.log("[QUIZ_SUBMIT] Submission result:", { score, totalQuestions: questions.length });
//     return NextResponse.json({
//       score,
//       totalQuestions: questions.length,
//       invalidAnswers,
//     });
//   } catch (error) {
//     console.error("[QUIZ_SUBMIT] Error:", error);

//     if (error instanceof z.ZodError) {
//       console.log("[QUIZ_SUBMIT] Zod errors:", error.errors);
//       return NextResponse.json(
//         { message: "Invalid request data.", errors: error.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Failed to submit quiz. Please try again." },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }







import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const prisma = new PrismaClient();

const AnswerSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
});

const SubmitSchema = z.object({
  answers: z.array(AnswerSchema),
  liveSessionId: z.string(),
});

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Authenticate user with Clerk
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    const { courseId } = params;

    // Parse and validate request body
    const body = await request.json();
    console.log("[QUIZ_SUBMIT] Request body:", body);
    const { answers, liveSessionId } = SubmitSchema.parse(body);

    // Verify course and live session exist
    const liveSession = await prisma.liveSession.findUnique({
      where: { id: liveSessionId, courseId },
      include: { liveclassquizzes: { where: { isPublished: true } } },
    });

    if (!liveSession) {
      return NextResponse.json(
        { message: "Live session not found." },
        { status: 404 }
      );
    }

    const quiz = liveSession.liveclassquizzes[0];
    if (!quiz) {
      return NextResponse.json(
        { message: "No published quiz found for this live session." },
        { status: 404 }
      );
    }

    // Parse quiz questions
    const questions = quiz.questions as {
      text: string;
      options: string[];
      correctAnswer: string;
    }[];
    console.log("[QUIZ_SUBMIT] Quiz questions:", questions);

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { message: "Invalid quiz data: No questions found." },
        { status: 400 }
      );
    }

    // Validate answers
    const invalidAnswers: string[] = [];
    let score = 0;

    answers.forEach((answer) => {
      // Extract questionIndex from questionId (e.g., 'a587010b-1ee9-46ad-a019-6e79a6617c43-0')
      const parts = answer.questionId.split("-");
      console.log("[QUIZ_SUBMIT] Parsing questionId:", { questionId: answer.questionId, parts });
      const questionIndex = parseInt(parts[parts.length - 1], 10); // Get the last part as index
      const question = questions[questionIndex];
      console.log("[QUIZ_SUBMIT] Processing answer:", { answer, questionIndex, question });

      if (!question) {
        invalidAnswers.push(answer.questionId);
        return;
      }

      // Compare raw answer value
      if (answer.answer === question.correctAnswer) {
        score += 1;
      }
    });

    if (invalidAnswers.length > 0) {
      console.log("[QUIZ_SUBMIT] Invalid answers:", invalidAnswers);
      return NextResponse.json(
        {
          message: "Some answers were invalid.",
          invalidAnswers,
        },
        { status: 400 }
      );
    }

    // Check for existing attempt and update or create
    const existingAttempt = await prisma.liveClassAttempt.findFirst({
      where: { liveSessionId, studentId: userId },
    });

    if (existingAttempt) {
      await prisma.liveClassAttempt.update({
        where: { id: existingAttempt.id },
        data: { score, timeTaken: new Date(), status: "Completed" },
      });
    } else {
      await prisma.liveClassAttempt.create({
        data: {
          liveSessionId,
          studentId: userId,
          score,
          timeTaken: new Date(),
          status: "Completed",
        },
      });
    }

    console.log("[QUIZ_SUBMIT] Submission result:", { score, totalQuestions: questions.length });
    return NextResponse.json({
      score,
      totalQuestions: questions.length,
      invalidAnswers,
    });
  } catch (error) {
    console.error("[QUIZ_SUBMIT] Error:", error);

    if (error instanceof z.ZodError) {
      console.log("[QUIZ_SUBMIT] Zod errors:", error.errors);
      return NextResponse.json(
        { message: "Invalid request data.", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to submit quiz. Please try again." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}