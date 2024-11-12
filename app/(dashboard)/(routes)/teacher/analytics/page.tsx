import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-analytics';
import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';

// Define the interface for the analytics data structure
interface AnalyticsData {
    quizScores: number[]; // Change the type based on your needs
    data: { name: string; total: number }[];
    totalRevenue: number;
    totalSales: number;
}

const AnalyticsPage = async () => {
    const { userId } = auth();
    if (!userId) {
        return redirect('/');
    }

    // Fetch analytics data
    const {
        quizScores,
        data,
        totalRevenue,
        totalSales,
    }: AnalyticsData = await getAnalytics(userId);

    // Calculate the average quiz score
    const averageQuizScore = quizScores.length > 0
        ? quizScores.reduce((acc, score) => acc + score, 0) / quizScores.length
        : 0; // Default to 0 if no scores

    return (
        <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <DataCard 
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
                <DataCard 
                    label="Total Sales"
                    value={totalSales}
                    shouldFormat={false}
                />
            </div>
            <Chart data={data} />
            <DataCard 
                label="Average Quiz Score"
                value={averageQuizScore}
                shouldFormat={false}
            />
        </div>
    );
};

export default AnalyticsPage;
