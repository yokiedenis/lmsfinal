import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust the import based on your folder structure

interface LeaderboardEntry {
  name: string;
  email: string;
  totalScore: number;
  progressPercentage: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderboardEntry[] | { message: string }>
) {
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

    res.status(200).json(sortedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard data' });
  }
}
