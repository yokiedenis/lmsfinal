import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;
  const userId = request.headers.get("user-id"); // Assuming user-id is passed in headers

  try {
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Delete all existing attempts for this user and chapter to reset them
    await prisma.chapterQuizAttempt.deleteMany({
      where: {
        chapterQuizId: chapterId,
        studentId: userId,
      },
    });

    return NextResponse.json({ message: "Attempts reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting attempts:", error);
    return NextResponse.json(
      { error: "Failed to reset attempts" },
      { status: 500 }
    );
  }
}