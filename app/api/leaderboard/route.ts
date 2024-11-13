import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'User  not authenticated' }, { status: 401 });
    }

    const leaderboard = await prisma.userProgress.findMany({
      where: {
        userId: userId,
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
        level: true,
        points: true,
      },
      orderBy: {
        points: 'desc',
      },
    });

    if (!leaderboard.length) {
      return NextResponse.json({ error: 'No leaderboard data found for this user' }, { status: 404 });
    }

    const leaderboardData = leaderboard.map((item, index) => ({
      rank: index + 1,
      name: item.user ? item.user.name : 'Unknown', // Handle null user
      level: item.level,
      points: item.points,
    }));

    console.log('Leaderboard Data:', leaderboardData);
    return NextResponse.json(leaderboardData);
  } catch (error: unknown) {
    console.error('Error fetching leaderboard:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch leaderboard data: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}