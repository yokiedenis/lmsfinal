// // api/courses/[courseId]/live-sessions/route.ts
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
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

//     // Fetch live sessions for the course
//     const liveSessions = await db.liveSession.findMany({
//       where: {
//         courseId: params.courseId,
//       },
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         startTime: true,
//         endTime: true,
//         meetingUrl: true,
//         isPublished: true,
//       },
//       orderBy: {
//         position: "asc",
//       },
//     });

//     return NextResponse.json(liveSessions);
//   } catch (error) {
//     console.error("[LIVE_SESSIONS_API]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }





import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user has purchased the course
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId
        }
      }
    });

    if (!purchase) {
      return new NextResponse("You have not purchased this course", { status: 403 });
    }

    // Fetch published live sessions for the course
    const liveSessions = await db.liveSession.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true
      },
      orderBy: {
        position: "asc"
      },
      include: {
        attachments: true
      }
    });

    return NextResponse.json(liveSessions);
  } catch (error) {
    console.error("[LIVE_SESSIONS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}