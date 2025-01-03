// app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all users and calculate points and levels
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        userProgress: {
          include: {
            chapter: {
              select: { courseId: true },
            },
          },
        },
      },
    });

    // Calculate total points and level for each user
    const leaderboard = users.map((user) => {
      const completedChapters = user.userProgress.filter((p) => p.isCompleted);
      const totalPoints = completedChapters.reduce(
        (sum, progress) => sum + progress.points,
        0
      );
      const uniqueCourses = new Set(
        completedChapters.map((p) => p.chapter.courseId)
      );
      const level = uniqueCourses.size;

      return {
        name: user.profile?.name || "Anonymous",
        points: totalPoints,
        level,
      };
    });

    // Sort by points descending and return the data
    leaderboard.sort((a, b) => b.points - a.points);

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
