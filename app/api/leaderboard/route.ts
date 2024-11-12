// app/api/leaderboard/route.ts

import { NextResponse } from 'next/server';  // Next.js 13+ API route handling
import prisma from '@/lib/prisma'; // Adjust the import based on your folder structure

interface LeaderboardEntry {
  name: string;
  email: string;
  totalScore: number;
  progressPercentage: number;
}

export async function GET() {
  try {
    const data = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        userProgress: {
          select: {
            points: true,
          },
        },
      },
    });

    const leaderboard = data.map((user) => {
      const totalScore = user.userProgress.reduce((sum, progress) => sum + progress.points, 0);
      const totalChapters = user.userProgress.length > 0 ? user.userProgress.length : 1;
      const progressPercentage = (totalScore / (totalChapters * 100)) * 100;

      return {
        name: user.name,
        email: user.email,
        totalScore,
        progressPercentage,
      };
    });

    const sortedLeaderboard = leaderboard.sort((a, b) => b.totalScore - a.totalScore);

    return NextResponse.json(sortedLeaderboard, { status: 200 });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ message: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
