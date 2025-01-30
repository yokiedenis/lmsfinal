import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-analytics';
import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';
import { UserDetails } from './_components/user-details';

const AnalyticsPage = async () => {
    const { userId } = await auth();
    if (!userId) {
        return redirect('/');
    }

    const {
        data,
        totalRevenue,
        totalSales,
        totalUsers,
        userDetails,
    } = await getAnalytics(userId);

    return (
        <div className='p-6'>
            <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
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
                <DataCard
                    label="Total Users"
                    value={totalUsers}
                    shouldFormat={false}
                />
            </div>
            <UserDetails userDetails={userDetails} />
            <Chart data={data} />
            
        </div>
    )
}

export default AnalyticsPage;