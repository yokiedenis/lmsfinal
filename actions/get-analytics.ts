import { db } from "@/lib/db";
import { Course, Purchase, Quiz } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

// Define a type for quiz scores
type QuizScore = {
  score: number; // Assuming score is a number; adjust if needed
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!; // Accumulate revenue by course
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    // Fetch purchases associated with the user
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
      }
    });

    // Fetch quiz scores for the user (assuming a Quiz model exists)
    const quizScoresData = await db.quizResult.findMany({
      where: {
         studentId: userId, 
      }
    });
    
    // Extract scores from the fetched quiz scores
    const quizScores: number[] = quizScoresData.map((quiz: QuizScore) => quiz.score);

    // Group earnings by course title
    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    // Calculate total revenue and total sales
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      quizScores,      // Return quiz scores
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      quizScores: [], // Return an empty array for quiz scores on error
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}
