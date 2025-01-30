 
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
//       case 'timeSpent': 
//         // Assuming you want to keep the display of time spent as it is
//         return <p>Time Spent: {analytics.timeSpent} hours</p>;
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