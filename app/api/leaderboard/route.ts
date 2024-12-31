import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Export named POST function to update points
export async function POST(req: NextRequest) {
  try {
    const { userId, score, totalQuestions, passingPercentage, chapterId } = await req.json();

    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const hasPassed = percentage >= passingPercentage;

    if (!hasPassed) {
      return NextResponse.json({ message: "You failed. No points added." }, { status: 400 });
    }

    // Calculate points based on quiz results (100 points for passing)
    const pointsEarned = 100;

    // Update user's progress in the database
    const updatedUserProgress = await prisma.userProgress.create({
      data: {
        userId,
        chapterId,
        score, // Store the score here
        isCompleted: true, // Mark as completed
        points: pointsEarned, // Store the points here
      },
    });

    // Now we need to calculate and update the user's total points and level
    const userProgress = await prisma.userProgress.findMany({
      where: { userId, isCompleted: true },
    });

    const updatedLevel = userProgress.length;
    const updatedPoints = updatedLevel * 100; // 100 points per completed course

    // Update user's points and level in the User model
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        points: updatedPoints,
        level: updatedLevel,
      },
    });

    return NextResponse.json({ message: "Points updated successfully", points: updatedPoints });
  } catch (error) {
    console.error('Error updating points:', error);
    return NextResponse.json({ message: 'An error occurred while updating points' }, { status: 500 });
  }
}
