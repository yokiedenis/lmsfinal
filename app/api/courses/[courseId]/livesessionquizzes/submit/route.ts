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








import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Define the expected structure of a quiz question
interface QuizQuestion {
  question: string; // Matches schema comment
  options: string[];
  correctAnswer: string;
}

// Type guard to validate a single question
function isQuizQuestion(obj: unknown): obj is QuizQuestion {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "question" in obj &&
    typeof (obj as any).question === "string" &&
    "options" in obj &&
    Array.isArray((obj as any).options) &&
    (obj as any).options.every((opt: unknown) => typeof opt === "string") &&
    "correctAnswer" in obj &&
    typeof (obj as any).correctAnswer === "string"
  );
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { answers, liveSessionId } = body;

    if (!liveSessionId || !Array.isArray(answers)) {
      return new NextResponse("Missing liveSessionId or answers", { status: 400 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const liveSession = await db.liveSession.findUnique({
      where: {
        id: liveSessionId,
        courseId: params.courseId,
      },
    });

    if (!liveSession) {
      return new NextResponse("Live session not found", { status: 404 });
    }

    const quiz = await db.liveClassQuiz.findFirst({
      where: {
        liveSessionId,
      },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    // Validate that questions is an array
    if (!Array.isArray(quiz.questions)) {
      return new NextResponse("Invalid quiz questions format", { status: 500 });
    }

    // Validate and filter questions
    const questions: QuizQuestion[] = (quiz.questions as unknown as any[]).filter(isQuizQuestion);
    if (questions.length !== quiz.questions.length) {
      console.error("Invalid questions detected:", quiz.questions);
      return new NextResponse("Invalid quiz questions format", { status: 500 });
    }

    // Calculate score
    let score = 0;
    const totalQuestions = questions.length;

    answers.forEach((answer: { questionId: string; answer: string }) => {
      const questionIndex = parseInt(answer.questionId.split("-")[1], 10);
      const question = questions[questionIndex];
      if (question && question.correctAnswer === answer.answer) {
        score += 1;
      }
    });

    // Save the attempt
    await db.liveClassAttempt.create({
      data: {
        liveSessionId,
        studentId: userId,
        score,
        timeTaken: new Date(),
        status: "Completed",
      },
    });

    return NextResponse.json({ score, totalQuestions }, { status: 201 });
  } catch (error) {
    console.error("[LIVESESSION_QUIZZES_SUBMIT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}