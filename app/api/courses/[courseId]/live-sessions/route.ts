import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    // Destructure the new date fields from the request body
    const { title, meetingUrl, startTime, endTime } = await req.json(); // Ensure meetingUrl is used

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Basic validation for dates
    if (!startTime || !endTime || !title || !meetingUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const lastSession = await db.liveSession.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastSession ? lastSession.position + 1 : 0;

    const liveSession = await db.liveSession.create({
      data: {
        title,
        meetingUrl,
        // Add the required date fields, converting them to Date objects
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        courseId: params.courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(liveSession);
  } catch (error) {
    console.log("[LIVE_SESSIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}