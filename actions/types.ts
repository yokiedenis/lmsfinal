// types.ts (or any relevant file)
export interface AnalyticsData {
    data: { name: string; total: number; }[];
    totalCourses: number;
    quizScores: number;
    usageInLast24Hours: number;
    studentProgress: number;
    dailyUsage: { hour: string; users: number; }[]; // Define the structure for dailyUsage
}
