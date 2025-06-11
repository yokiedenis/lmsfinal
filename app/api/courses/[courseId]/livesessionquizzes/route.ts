// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // Authenticate the user
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Parse the request body
//     const body = await req.json();
//     const { liveSessionId, title, questions, isPublished } = body;

//     // Validate required fields
//     if (!liveSessionId || !title || !questions) {
//       return new NextResponse("Missing required fields", { status: 400 });
//     }

//     // Verify the course exists and belongs to the user
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId, // Ensure the course belongs to the authenticated user
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found or unauthorized", { status: 404 });
//     }

//     // Verify the live session exists and belongs to the course
//     const liveSession = await db.liveSession.findUnique({
//       where: {
//         id: liveSessionId,
//         courseId: params.courseId, // Filter by courseId directly
//       },
//     });

//     if (!liveSession) {
//       return new NextResponse("Live session not found", { status: 404 });
//     }

//     // Create the quiz
//     const quiz = await db.liveClassQuiz.create({
//       data: {
//         liveSessionId,
//         title,
//         questions, // JSON array of questions
//         isPublished: isPublished ?? false,
//       },
//     });

//     return NextResponse.json(quiz, { status: 201 });
//   } catch (error) {
//     console.error("[LIVESESSION_QUIZZES_POST]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // Authenticate the user
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Get the liveSessionId from query parameters
//     const { searchParams } = new URL(req.url);
//     const liveSessionId = searchParams.get("liveSessionId");

//     if (!liveSessionId) {
//       return new NextResponse("Missing liveSessionId", { status: 400 });
//     }

//     // Verify the course exists and belongs to the user
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found or unauthorized", { status: 404 });
//     }

//     // Fetch quizzes for the live session
//     const quizzes = await db.liveClassQuiz.findMany({
//       where: {
//         liveSessionId,
//         liveSession: {
//           courseId: params.courseId,
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(quizzes);
//   } catch (error) {
//     console.error("[LIVESESSION_QUIZZES_GET]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }






import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    const { liveSessionId, title, questions, isPublished } = body;

    // Validate required fields
    if (!liveSessionId || !title || !questions) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verify the course exists and belongs to the user
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId, // Ensure the course belongs to the authenticated user
      },
    });

    if (!course) {
      return new NextResponse("Course not found or unauthorized", { status: 404 });
    }

    // Verify the live session exists and belongs to the course
    const liveSession = await db.liveSession.findUnique({
      where: {
        id: liveSessionId,
        courseId: params.courseId, // Filter by courseId directly
      },
    });

    if (!liveSession) {
      return new NextResponse("Live session not found", { status: 404 });
    }

    // Create the quiz
    const quiz = await db.liveClassQuiz.create({
      data: {
        liveSessionId,
        title,
        questions, // JSON array of questions
        isPublished: isPublished ?? true,
      },
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error("[LIVESESSION_QUIZZES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the liveSessionId from query parameters
    const { searchParams } = new URL(req.url);
    const liveSessionId = searchParams.get("liveSessionId");

    if (!liveSessionId) {
      return new NextResponse("Missing liveSessionId query parameter", { status: 400 });
    }

    // Verify the course exists
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Fetch the first quiz for the live session
    const quiz = await db.liveClassQuiz.findFirst({
      where: {
        liveSessionId,
        liveSession: {
          courseId: params.courseId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!quiz) {
      return NextResponse.json({}, { status: 200 }); // Return empty object instead of 404
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("[LIVESESSION_QUIZZES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}