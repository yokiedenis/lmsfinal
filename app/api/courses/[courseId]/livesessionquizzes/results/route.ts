// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const liveSessionId = searchParams.get("liveSessionId");

//     if (!liveSessionId) {
//       return new NextResponse("Missing liveSessionId", { status: 400 });
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

//     const attempt = await db.liveClassAttempt.findFirst({
//       where: {
//         liveSessionId,
//         studentId: userId,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (!attempt) {
//       return new NextResponse("No attempt found", { status: 404 });
//     }

//     return NextResponse.json({
//       score: attempt.score || 0,
//       totalQuestions: quiz.questions.length,
//     });
//   } catch (error) {
//     console.error("[LIVESESSION_QUIZZES_RESULTS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }







import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Define the expected structure of a quiz question (optional, for consistency)
interface QuizQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const liveSessionId = searchParams.get("liveSessionId");

    if (!liveSessionId) {
      return new NextResponse("Missing liveSessionId", { status: 400 });
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

    const attempt = await db.liveClassAttempt.findFirst({
      where: {
        liveSessionId,
        studentId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!attempt) {
      return new NextResponse("No attempt found", { status: 404 });
    }

    // Validate that questions is an array and not null
    if (quiz.questions === null || !Array.isArray(quiz.questions)) {
      return new NextResponse("Invalid quiz questions format", { status: 500 });
    }

    return NextResponse.json({
      score: attempt.score || 0,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    console.error("[LIVESESSION_QUIZZES_RESULTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}