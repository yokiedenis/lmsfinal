// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // Authenticate the user
//     const { userId } = auth();
//     if (!userId) {
//       console.error("[LIVESESSION_QUIZZES_FETCH_GET] Unauthorized: No userId");
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Get the liveSessionId from query parameters
//     const { searchParams } = new URL(req.url);
//     const liveSessionId = searchParams.get("liveSessionId");

//     if (!liveSessionId) {
//       console.error("[LIVESESSION_QUIZZES_FETCH_GET] Missing liveSessionId query parameter");
//       return new NextResponse("Missing liveSessionId query parameter", { status: 400 });
//     }

//     // Validate courseId
//     if (!params.courseId) {
//       console.error("[LIVESESSION_QUIZZES_FETCH_GET] Missing courseId parameter");
//       return new NextResponse("Missing courseId parameter", { status: 400 });
//     }

//     // Verify the course exists
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//       },
//     });

//     if (!course) {
//       console.error("[LIVESESSION_QUIZZES_FETCH_GET] Course not found:", params.courseId);
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Verify the live session exists and belongs to the course
//     const liveSession = await db.liveSession.findUnique({
//       where: {
//         id: liveSessionId,
//         courseId: params.courseId,
//       },
//     });

//     if (!liveSession) {
//       console.error("[LIVESESSION_QUIZZES_FETCH_GET] Live session not found:", liveSessionId);
//       return new NextResponse("Live session not found", { status: 404 });
//     }

//     // Check if the user has access to the course (e.g., purchased or enrolled)
//     // Assuming a Purchase or Enrollment model exists; adjust based on your schema
//     const purchase = await db.purchase.findFirst({
//       where: {
//         userId,
//         courseId: params.courseId,
//       },
//     });

//     if (!purchase) {
//       console.error("[LIVESESSION_QUIZZES_FETCH_GET] User lacks access to course:", { userId, courseId: params.courseId });
//       return new NextResponse("You do not have access to this course", { status: 403 });
//     }

//     // Fetch the quiz for the live session, ensuring it is published
//     const quiz = await db.liveClassQuiz.findFirst({
//       where: {
//         liveSessionId,
//         liveSession: {
//           courseId: params.courseId,
//         },
//         isPublished: true, // Only return published quizzes
//       },
//       select: {
//         id: true,
//         title: true,
//         questions: true,
//         isPublished: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (!quiz) {
//       console.log("[LIVESESSION_QUIZZES_FETCH_GET] No published quiz found for liveSessionId:", liveSessionId);
//       return NextResponse.json({}, { status: 200 }); // Return empty object per existing API behavior
//     }

//     console.log("[LIVESESSION_QUIZZES_FETCH_GET] Quiz fetched successfully:", { quizId: quiz.id, liveSessionId });
//     return NextResponse.json(quiz, { status: 200 });
//   } catch (error) {
//     console.error("[LIVESESSION_QUIZZES_FETCH_GET] Internal Error:", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }









import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    const { courseId } = params;
    const { searchParams } = new URL(request.url);
    const liveSessionId = searchParams.get("liveSessionId");

    if (!liveSessionId) {
      return NextResponse.json(
        { message: "Missing liveSessionId parameter." },
        { status: 400 }
      );
    }

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

    // Transform options to raw values (if needed)
    const transformedQuestions = (quiz.questions as any[]).map((q) => ({
      text: q.text,
      options: ["A", "B", "C", "D"], // Replace with raw values
      correctAnswer: q.correctAnswer,
    }));

    console.log("[LIVESESSION_QUIZZES_FETCH_GET] Quiz fetched successfully:", {
      quizId: quiz.id,
      liveSessionId,
    });

    return NextResponse.json({
      id: quiz.id,
      questions: transformedQuestions,
      isPublished: quiz.isPublished,
    });
  } catch (error) {
    console.error("[LIVESESSION_QUIZZES_FETCH_GET] Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch quiz." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}