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

export async function GET() {
  try {
    // Fetch users with their profiles
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        userProgress: true,
        quizAttempts: true,
        chapterQuizAttempts: true,
      },
    });

    const leaderboardData = users.map((user) => {
      // Calculate points from quiz and chapter quiz attempts
      const totalQuizPoints = user.quizAttempts.reduce(
        (total, attempt) => total + attempt.score,
        0
      );

      const totalChapterQuizPoints = user.chapterQuizAttempts.reduce(
        (total, attempt) => total + attempt.score,
        0
      );

      // Points for completed courses
      const completedCourses = user.userProgress.filter(progress => progress.isCompleted);
      const coursePoints = completedCourses.length * 100; // 100 points per completed course

      const totalPoints = totalQuizPoints + totalChapterQuizPoints + coursePoints;

      // Determine level based on course completions
      const level = completedCourses.length; // Level is equal to number of courses completed

      // Use the name from the profile if it exists, otherwise fall back to the user's name
      const name = user.profile?.name || user.name;

      return {
        id: user.id,
        name,
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