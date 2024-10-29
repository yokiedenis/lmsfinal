import { db } from "@/lib/db";

export const getStudentsPerformance = async () => {
  try {
    // Fetch all quiz attempts with student and score data
    const quizAttempts = await db.quizAttempt.findMany({
      include: {
        student: {
          select: {
            name: true, // Only include the student's name
          },
        },
      },
    });

    // Group scores by student
    const scoresByStudent: { [studentId: string]: { name: string; totalScore: number; attempts: number } } = {};

    quizAttempts.forEach((attempt) => {
      const studentId = attempt.studentId;
      const studentName = attempt.student?.name || "Unknown"; // Optional chaining in case of null

      if (!scoresByStudent[studentId]) {
        scoresByStudent[studentId] = {
          name: studentName,
          totalScore: 0,
          attempts: 0,
        };
      }

      scoresByStudent[studentId].totalScore += attempt.score;
      scoresByStudent[studentId].attempts += 1;
    });

    // Calculate average score for each student
    const studentScores = Object.entries(scoresByStudent).map(([_, { name, totalScore, attempts }]) => ({
      name,
      avgScore: totalScore / attempts,
    }));

    return studentScores;
  } catch (error) {
    console.log("[GET_STUDENTS_PERFORMANCE]", error);
    return [];
  }
};
