// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses, // Destructure the new field
//         userDetails,
//     } = await getAnalytics(userId);

//     return (
//         <div className='p-6'>
//             <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                 />

//                 <DataCard
//                     label="Total Enrolled Courses"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                 />

//             </div>
//             <UserDetails userDetails={userDetails} />
//             <Chart data={data} />
            
//         </div>
//     )
// }

// export default AnalyticsPage;





// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                 />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2 space-y-6">
//                     <RevenueTrend data={revenueTrendData} />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <Chart data={data} title="Course Earnings" />
//                         <TopCourses data={topCourses} />
//                     </div>
//                 </div>
//                 <div className="space-y-6">
//                     <ProgressDistribution data={courseProgressData} />
//                     <RecentActivity data={recentActivity} />
//                 </div>
//             </div>

//             <UserDetails userDetails={userDetails} />
//         </div>
//     )
// }

// export default AnalyticsPage;


// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-8 space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-green-500 to-green-600 text-white"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-pink-500 to-pink-600 text-white"
//                 />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 space-y-8">
//                     <RevenueTrend data={revenueTrendData} className="bg-white rounded-lg shadow-lg p-6" />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <Chart data={data} title="Course Earnings" className="bg-white rounded-lg shadow-lg p-6" />
//                         <TopCourses data={topCourses} className="bg-white rounded-lg shadow-lg p-6" />
//                     </div>
//                 </div>
//                 <div className="space-y-8">
//                     <ProgressDistribution data={courseProgressData} className="bg-white rounded-lg shadow-lg p-6" />
//                     <RecentActivity data={recentActivity} className="bg-white rounded-lg shadow-lg p-6" />
//                 </div>
//             </div>

//             <UserDetails userDetails={userDetails} className="bg-white rounded-lg shadow-lg p-6" />
//         </div>
//     )
// }

// export default AnalyticsPage;



// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-8 space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-green-500 to-green-600 text-white"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-pink-500 to-pink-600 text-white"
//                 />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 space-y-8">
//                     <RevenueTrend data={revenueTrendData} className="bg-white rounded-lg shadow-lg p-6" />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <Chart data={data} title="Course Earnings" className="bg-white rounded-lg shadow-lg p-6" />
//                         <TopCourses data={topCourses} className="bg-white rounded-lg shadow-lg p-6" />
//                     </div>
//                 </div>
//                 <div className="space-y-8">
//                     <ProgressDistribution data={courseProgressData} className="bg-white rounded-lg shadow-lg p-6" />
//                     <RecentActivity data={recentActivity} className="bg-white rounded-lg shadow-lg p-6" />
//                 </div>
//             </div>

//             <UserDetails userDetails={userDetails} className="bg-white rounded-lg shadow-lg p-6" />
//         </div>
//     )
// }

// export default AnalyticsPage;










// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
//             {/* Enhanced Data Cards Section */}
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//             </div>

//             {/* Main Content Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Left Column - Larger Charts */}
//                 <div className="lg:col-span-2 space-y-8">
//                     <RevenueTrend data={revenueTrendData} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <Chart data={data} title="Course Earnings" className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                         <TopCourses data={topCourses} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                     </div>
//                 </div>

//                 {/* Right Column - Smaller Cards */}
//                 <div className="space-y-8">
//                     <ProgressDistribution data={courseProgressData} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                     <RecentActivity data={recentActivity} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                 </div>
//             </div>

//             {/* User Details Section */}
//             <UserDetails userDetails={userDetails} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//         </div>
//     )
// }

// export default AnalyticsPage;








// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
//             {/* Enhanced Data Cards Section */}
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//             </div>

//             {/* Main Content Grid - Adjusted for horizontal alignment and scrolling */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
//                 {/* Left Column: Revenue Trend and Bottom Charts */}
//                 <div className="lg:col-span-2 flex flex-col space-y-8">
//                     {/* Revenue Trend: Adjusted flex-grow and min-h to balance with the right column */}
//                     <RevenueTrend
//                         data={revenueTrendData}
//                         className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-[250px] md:h-[300px] lg:h-auto lg:min-h-[350px] lg:flex-grow-[0.5] xl:min-h-[400px]" // Adjusted min-h and flex-grow
//                     />

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow-[0.5]"> {/* This will take the remaining vertical space */}
//                         {/* Ensure these also have consistent height with each other and align */}
//                         <Chart data={data} title="Course Earnings" className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                         <TopCourses data={topCourses} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                     </div>
//                 </div>

//                 {/* Right Column: Progress Distribution & Recent Activity */}
//                 <div className="flex flex-col space-y-8">
//                     {/* Progress Distribution: This needs to flex-grow to fill the space above RecentActivity */}
//                     {/* Make ProgressDistribution take up more vertical space to align with Revenue Trend */}
//                     <ProgressDistribution data={courseProgressData} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-grow-[0.5]" /> {/* Adjusted flex-grow */}

//                     {/* Recent Activity: Adjusted height to align with Course Earnings/Top Courses, with both scrollbars */}
//                     <RecentActivity
//                         data={recentActivity}
//                         // Set a calculated height that aligns with the Chart/TopCourses cards below the Revenue Trend
//                         // The 'flex-grow' on ProgressDistribution should make it fill the space above RecentActivity
//                         // You might need to fine-tune the height here based on actual content and desired visual balance.
//                         // A value like 'h-[calc(50%-16px)]' or similar could be used if you know the exact proportions.
//                         // For now, let's make it explicitly grow to fill the remaining space in its column.
//                         className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-grow overflow-auto"
//                     />
//                 </div>
//             </div>

//             {/* User Details Section */}
//             <UserDetails userDetails={userDetails} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//         </div>
//     )
// }

// export default AnalyticsPage;





// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
//             {/* Enhanced Data Cards Section */}
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                     className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
//                 />
//             </div>

//             {/* Main Content Grid - Adjusted for horizontal alignment and stretching */}
//             {/* items-stretch ensures columns stretch to equal height */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
//                 {/* Left Column: Revenue Trend and Bottom Charts */}
//                 <div className="lg:col-span-2 flex flex-col space-y-8">
//                     {/* Revenue Trend: Removed explicit height and flex-grow. Let its content dictate initial height. */}
//                     {/* It will still be part of the flex column. */}
//                     <RevenueTrend
//                         data={revenueTrendData}
//                         className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-grow" // Set to flex-grow
//                     />
//                     <br></br>

//                     {/* Chart and TopCourses: Will share the remaining space in this column, aligning their top
//                         with RecentActivity if the column heights align overall. */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow"> {/* This will take the remaining vertical space */}
//                         <Chart data={data} title="Course Earnings" className="bg-white rounded-xl shadow-lg p-6 border  border-gray-100" />
//                         <TopCourses data={topCourses} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//                     </div>
//                 </div>

//                 {/* Right Column: Progress Distribution & Recent Activity */}
//                 <div className="flex flex-col space-y-8">
//                     {/* Progress Distribution: Must have the same height as RevenueTrend for alignment. */}
//                     {/* Setting it to flex-grow will make it expand to match the height of RevenueTrend if RevenueTrend also flex-grows */}
//                     <ProgressDistribution data={courseProgressData} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-grow" />

//                     {/* Recent Activity: Its height will be determined by the remaining space in the column.
//                         It will align its top with the Chart/TopCourses grid's top. */}
//                     <RecentActivity
//                         data={recentActivity}
//                         className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-auto flex-grow" // flex-grow to share remaining space
//                     />
//                 </div>
//             </div>

//             {/* User Details Section */}
//             <UserDetails userDetails={userDetails} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
//         </div>
//     )
// }

// export default AnalyticsPage;









import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-analytics';
import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';
import { UserDetails } from './_components/user-details';
import { ProgressDistribution } from './_components/progress-distribution';
import { RecentActivity } from './_components/recent-activity';
import { RevenueTrend } from './_components/revenue-trend';
import { TopCourses } from './_components/top-courses';

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
    totalEnrolledCourses,
    userDetails,
    recentActivity,
    courseProgressData,
    revenueTrendData,
    topCourses
  } = await getAnalytics(userId);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Enhanced Data Cards Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
          icon="dollar"
          trend="up"
          trendValue="12%"
          description="From last month"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
          shouldFormat={false}
          icon="cart"
          trend="up"
          trendValue="8%"
          description="From last month"
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
        />
        <DataCard
          label="Total Users"
          value={totalUsers}
          shouldFormat={false}
          icon="users"
          trend="up"
          trendValue="15%"
          description="From last month"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
        />
        <DataCard
          label="Courses Enrolled"
          value={totalEnrolledCourses}
          shouldFormat={false}
          icon="book"
          trend="up"
          trendValue="22%"
          description="From last month"
          className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      {/* Main Content Grid - Adjusted for horizontal alignment and stretching */}
      {/* items-stretch ensures columns stretch to equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Left Column: Revenue Trend and Bottom Charts */}
        <div className="lg:col-span-2 flex flex-col space-y-8">
          {/* Revenue Trend: Removed explicit height and flex-grow. Let its content dictate initial height. */}
          <RevenueTrend
            data={revenueTrendData}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-grow"
          />
          <br />

          {/* Chart and TopCourses: Will share the remaining space in this column, aligning their top
              with RecentActivity if the column heights align overall. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            <Chart data={data} title="Course Earnings" className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
            <TopCourses data={topCourses} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
          </div>
        </div>

        {/* Right Column: Progress Distribution & Recent Activity */}
        <div className="flex flex-col space-y-8">
          {/* Progress Distribution: Must have the same height as RevenueTrend for alignment. */}
          <ProgressDistribution data={courseProgressData} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-grow" />

          {/* Recent Activity: Its height will be determined by the remaining space in the column. */}
          <RecentActivity
            data={recentActivity}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-auto flex-grow"
          />
        </div>
      </div>

      {/* User Details Section */}
      <UserDetails userDetails={userDetails} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" />
    </div>
  );
};

export default AnalyticsPage;