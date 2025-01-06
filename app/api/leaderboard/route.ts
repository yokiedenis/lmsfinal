// // app/api/leaderboard/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch all users and calculate points and levels
//     const users = await prisma.user.findMany({
//       include: {
//         profile: true,
//         userProgress: {
//           include: {
//             chapter: {
//               select: { courseId: true },
//             },
//           },
//         },
//       },
//     });

//     // Calculate total points and level for each user
//     const leaderboard = users.map((user) => {
//       const completedChapters = user.userProgress.filter((p) => p.isCompleted);
//       const totalPoints = completedChapters.reduce(
//         (sum, progress) => sum + progress.points,
//         0
//       );
//       const uniqueCourses = new Set(
//         completedChapters.map((p) => p.chapter.courseId)
//       );
//       const level = uniqueCourses.size;

//       return {
//         name: user.profile?.name || "Anonymous",
//         points: totalPoints,
//         level,
//       };
//     });

//     // Sort by points descending and return the data
//     leaderboard.sort((a, b) => b.points - a.points);

//     return NextResponse.json(leaderboard);
//   } catch (error) {
//     console.error("Error fetching leaderboard data:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch leaderboard data" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Named export for the GET method
export async function GET() {
  try {
    // Fetch user progress and quiz data
    const users = await prisma.user.findMany({
      include: {
        userProgress: true,
        quizAttempts: true,
        chapterQuizAttempts: true,
      },
    });

    const leaderboardData = users.map((user) => {
      const totalQuizPoints = user.quizAttempts.reduce(
        (total, attempt) => total + attempt.score,
        0
      );

      const totalChapterQuizPoints = user.chapterQuizAttempts.reduce(
        (total, attempt) => total + attempt.score,
        0
      );

      const totalPoints = totalQuizPoints + totalChapterQuizPoints;
      const level = Math.floor(totalPoints / 100) + 1; // Example: Level up every 100 points

      return {
        id: user.id,
        name: user.name,
        level,
        points: totalPoints,
      };
    });

    // Sort by points in descending order
    leaderboardData.sort((a, b) => b.points - a.points);

    return NextResponse.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
