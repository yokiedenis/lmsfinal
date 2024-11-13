import { NextRequest, NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Export named GET function for API route
export async function GET(req: NextRequest) {
  try {
    // Fetch all users from the User model
    const users = await prisma.user.findMany({
      orderBy: {
        points: 'desc', // Sort by points if necessary
      },
      include: {
        userProgress: {
          where: { isCompleted: true }, // Fetch completed courses only
        },
      },
    });

    // Add level and points based on completed courses
    const usersWithPoints = users.map((user) => {
      const completedCourses = user.userProgress.length;
      const level = completedCourses >= 1 ? completedCourses : 1; // Minimum level 1

      // Calculate points: 100 points for each completed course
      const points = completedCourses * 100;

      return { ...user, level, points };
    });

    // Respond with the users data
    return NextResponse.json(usersWithPoints);  // Use NextResponse.json for response

  } catch (error) {
    console.error('Error fetching users data:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching users data' },
      { status: 500 }
    ); // Use status and response correctly with NextResponse
  }
}
