import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; liveSessionId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, liveSessionId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const liveSession = await db.liveSession.update({
      where: {
        id: liveSessionId,
        courseId: courseId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(liveSession);
  } catch (error) {
    console.log("[COURSE_SESSION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; liveSessionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const liveSession = await db.liveSession.findUnique({
        where: {
            id: params.liveSessionId,
            courseId: params.courseId,
        }
    });

    if (!liveSession) {
        return new NextResponse("Not Found", { status: 404 });
    }

    // You might have related records to delete here in the future, e.g., MuxData

    const deletedLiveSession = await db.liveSession.delete({
        where: {
            id: params.liveSessionId,
        }
    });

    return NextResponse.json(deletedLiveSession);

  } catch (error) {
    console.log("[SESSION_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}