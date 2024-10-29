import { db } from "@/lib/db";
import { Course, Purchase, QuizAttempt, UserProgress } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

// Group purchases by course to calculate the number of purchases per course
const groupPurchasesByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += 1; // Increment the count of purchases per course
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    // Fetch purchases related to the student's courses
    const purchases = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: true,
      },
    });

    // Calculate the purchase count per course
    const groupedPurchases = groupPurchasesByCourse(purchases);
    const data = Object.entries(groupedPurchases).map(([courseTitle, purchaseCount]) => ({
      name: courseTitle,
      purchaseCount: purchaseCount, // Use purchaseCount for chart data
    }));

    // Total courses purchased by the user
    const totalCourses = await db.course.count({
      where: { id: { in: purchases.map((purchase) => purchase.courseId) } },
    });

    // Calculate average quiz scores for the user
    const quizAttempts = await db.quizAttempt.findMany({
      where: { studentId: userId },
    });

    const quizScores = quizAttempts.length > 0 
      ? quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / quizAttempts.length 
      : 0;

    // Usage in the last 24 hours
    const usageInLast24Hours = await db.message.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        userId: userId,
      },
    });

    // Calculate student progress
    const userProgressRecords = await db.userProgress.findMany({
      where: { userId: userId },
      include: {
        chapter: true,
      },
    });

    const totalChapters = userProgressRecords.length;
    const completedChapters = userProgressRecords.filter(record => record.isCompleted).length;

    const studentProgress = totalChapters > 0 
      ? (completedChapters / totalChapters) * 100 
      : 0;

    // Generate mock daily usage data
    const dailyUsage = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      users: Math.floor(Math.random() * 100),
    }));

    return {
      data,
      totalCourses,
      quizScores,
      usageInLast24Hours,
      studentProgress,
      dailyUsage,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalCourses: 0,
      quizScores: 0,
      usageInLast24Hours: 0,
      studentProgress: 0,
      dailyUsage: [],
    };
  }
};
