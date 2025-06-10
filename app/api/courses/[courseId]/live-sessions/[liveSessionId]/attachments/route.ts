import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, liveSessionId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Also verify the session belongs to the course
    const liveSession = await db.liveSession.findUnique({
        where: {
            id: params.liveSessionId,
            courseId: params.courseId,
        }
    });

    if (!liveSession) {
        return new NextResponse("Session Not Found", { status: 404 });
    }

    const attachment = await db.attachment.create({
      data: {
        url: url,
        name: url.split("/").pop(),
        courseId: params.courseId, // Keep courseId for overall course resources
        liveSessionId: params.liveSessionId, // Link to the specific session
      }
    });

    return NextResponse.json(attachment);

  } catch (error) {
    console.log("SESSION_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}