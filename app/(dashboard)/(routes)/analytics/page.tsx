import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-student-analytics';
import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';
import { DailyUsageChart } from '@/components/DailyUsageChart';
import { getStudentsPerformance } from "@/actions/get-students-performance";
import { StudentPerformanceChart } from "./_components/studentperformancechart";
import { FcHeatMap } from 'react-icons/fc';
//import Heatmap from "@/components/heatmap"


const AnalyticsPage = async () => {
    
    const studentPerformanceData = await getStudentsPerformance();


    const { userId } = auth();
    if (!userId) {
        return redirect('/');
    }

    const {
        quizScores,
        totalCourses,
        usageInLast24Hours,
        studentProgress, // Assuming this is a number now
        data,
        dailyUsage, // Now recognized
    } = await getAnalytics(userId);

    return (
        <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <DataCard 
                    label="Total Courses"
                    value={totalCourses}
                    shouldFormat={false}
                />
                <DataCard 
                    label="Average Quiz Score"
                    value={quizScores}
                    shouldFormat={false}
                />
                <DataCard 
                    label="Usage in Last 24 Hours"
                    value={usageInLast24Hours}
                    shouldFormat={false}
                />
                <DataCard 
                    label="Student Progress"
                    value={studentProgress} // Pass numeric value directly
                    shouldFormat={false} // Ensure it formats correctly based on your requirements
                />
            </div>
            <Chart data={data} />
             

            {/* <DailyUsageChart data={dailyUsage} /> Use dailyUsage here */}

            <StudentPerformanceChart data={studentPerformanceData} />


        </div>
    );
}

export default AnalyticsPage;
