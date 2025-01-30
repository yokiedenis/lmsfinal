// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-student-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { DailyUsageChart } from '@/components/DailyUsageChart';
// import { getStudentsPerformance } from "@/actions/get-students-performance";
// import { StudentPerformanceChart } from "./_components/studentperformancechart";
// import { FcHeatMap } from 'react-icons/fc';
// //import Heatmap from "@/components/heatmap"


// const AnalyticsPage = async () => {
    
//     const studentPerformanceData = await getStudentsPerformance();


//     const { userId } = auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         quizScores,
//         totalCourses,
//         usageInLast24Hours,
//         studentProgress, // Assuming this is a number now
//         data,
//         dailyUsage, // Now recognized
//     } = await getAnalytics(userId);

//     return (
//         <div className='p-6'>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
//                 <DataCard 
//                     label="Total Courses"
//                     value={totalCourses}
//                     shouldFormat={false}
//                 />
//                 <DataCard 
//                     label="Average Quiz Score"
//                     value={quizScores}
//                     shouldFormat={false}
//                 />
//                 <DataCard 
//                     label="Usage in Last 24 Hours"
//                     value={usageInLast24Hours}
//                     shouldFormat={false}
//                 />
//                 <DataCard 
//                     label="Student Progress"
//                     value={studentProgress} // Pass numeric value directly
//                     shouldFormat={false} // Ensure it formats correctly based on your requirements
//                 />
//             </div>
//             <Chart data={data} />
             

//             {/* <DailyUsageChart data={dailyUsage} /> Use dailyUsage here */}

//             <StudentPerformanceChart data={studentPerformanceData} />


//         </div>
//     );
// }

// export default AnalyticsPage;



// StudentAnalytics.tsx


// "use client";
// import React, { useState, useEffect } from 'react';
// import { getStudentAnalytics } from '@/actions/studentAnalyticsService';

// interface StudentAnalyticsProps {
//   studentId: string;
// }

// const StudentAnalytics: React.FC<StudentAnalyticsProps> = ({ studentId }) => {
//   const [analytics, setAnalytics] = useState<any>(null);
//   const [selectedOption, setSelectedOption] = useState('timeSpent');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const studentData = await getStudentAnalytics(studentId);
//         setAnalytics(studentData);
//       } catch (error) {
//         console.error('Failed to fetch student analytics:', error);
//       }
//     }
//     fetchData();
//   }, [studentId]);

//   if (!analytics) {
//     return <div>Loading...</div>;
//   }

//   const options = [
//     'timeSpent', 'coursesEnrolled', 'lastLogin', 'enrollmentDates', 'amountPaid', 'currentChapters', 'certificatesEarned', 'studentLevel'
//   ];

//   const displayData = () => {
//     switch(selectedOption) {
//       case 'timeSpent': return <p>Time Spent: {analytics.timeSpent} hours</p>;
//       case 'coursesEnrolled': return <p>Courses Enrolled: {analytics.coursesEnrolled}</p>;
//       case 'lastLogin': return <p>Last Login: {new Date(analytics.lastLogin).toLocaleString()}</p>;
//       case 'enrollmentDates': 
//         return (
//           <ul>
//             {analytics.enrollmentDates.map((enrollment: any) => (
//               <li key={enrollment.courseTitle}>{enrollment.courseTitle} - {new Date(enrollment.date).toLocaleDateString()}</li>
//             ))}
//           </ul>
//         );
//       case 'amountPaid': return <p>Total Amount Paid: ${analytics.amountPaid.toFixed(2)}</p>;
//       case 'currentChapters':
//         return (
//           <ul>
//             {analytics.currentChapters.map((chapter: any) => (
//               <li key={chapter.courseId}>{chapter.courseTitle} - Current Chapter: {chapter.chapterTitle}</li>
//             ))}
//           </ul>
//         );
//       case 'certificatesEarned': return <p>Certificates Earned: {analytics.certificatesEarned}</p>;
//       case 'studentLevel': return <p>Student Level: {analytics.studentLevel}</p>;
//       default: return <p>No data selected</p>;
//     }
//   };

//   return (
//     <div>
//       <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
//         {options.map(option => (
//           <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1')}</option>
//         ))}
//       </select>
//       <div>
//         {displayData()}
//       </div>
//     </div>
//   );
// };

// export default StudentAnalytics;




"use client";
import React, { useState, useEffect } from 'react';
import { getStudentAnalytics } from '@/actions/studentAnalyticsService';

interface StudentAnalyticsProps {
  studentId: string;
}

const StudentAnalytics: React.FC<StudentAnalyticsProps> = ({ studentId }) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState('timeSpent');

  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await getStudentAnalytics(studentId);
        setAnalytics(studentData);
      } catch (error) {
        console.error('Failed to fetch student analytics:', error);
      }
    }
    fetchData();
  }, [studentId]);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  const options = [
    'timeSpent', 'coursesEnrolled', 'lastLogin', 'enrollmentDates', 'amountPaid', 'currentChapters', 'certificatesEarned', 'studentLevel'
  ];

  const displayData = () => {
    switch(selectedOption) {
      case 'timeSpent': 
        // Assuming you want to keep the display of time spent as it is
        return <p>Time Spent: {analytics.timeSpent} hours</p>;
      case 'coursesEnrolled': return <p>Courses Enrolled: {analytics.coursesEnrolled}</p>;
      case 'lastLogin': return <p>Last Login: {new Date(analytics.lastLogin).toLocaleString()}</p>;
      case 'enrollmentDates': 
        return (
          <ul>
            {analytics.enrollmentDates.map((enrollment: any) => (
              <li key={enrollment.courseTitle}>{enrollment.courseTitle} - {new Date(enrollment.date).toLocaleDateString()}</li>
            ))}
          </ul>
        );
      case 'amountPaid': return <p>Total Amount Paid: ${analytics.amountPaid.toFixed(2)}</p>;
      case 'currentChapters':
        return (
          <ul>
            {analytics.currentChapters.map((chapter: any) => (
              <li key={chapter.courseId}>{chapter.courseTitle} - Current Chapter: {chapter.chapterTitle}</li>
            ))}
          </ul>
        );
      case 'certificatesEarned': return <p>Certificates Earned: {analytics.certificatesEarned}</p>;
      case 'studentLevel': return <p>Student Level: {analytics.studentLevel}</p>;
      default: return <p>No data selected</p>;
    }
  };

  return (
    <div>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        {options.map(option => (
          <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1')}</option>
        ))}
      </select>
      <div>
        {displayData()}
      </div>
    </div>
  );
};

export default StudentAnalytics;