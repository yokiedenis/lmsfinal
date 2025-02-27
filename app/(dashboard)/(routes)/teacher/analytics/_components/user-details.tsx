import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Book, Calendar, User, Award, LogIn, Clock } from 'lucide-react';

interface UserDetailsProps {
  userDetails: {
    name: string;
    imageUrl: string;
    coursesEnrolled: number;
    lastLogin: Date;
    dateOfEnrollment: Date;
    studentLevel: number;
    certificatesEarned: number;
    enrolledCourses: {
      courseTitle: string;
      amountPaid: number;
    }[];
    timeSpent: number;
  }[];
}

export const UserDetails = ({ userDetails }: UserDetailsProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mt-6 shadow-lg border border-gray-700 bg-[#1e3a8a]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {userDetails.map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-6 p-4 hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <Image
                src={user.imageUrl || '/avv.webp'}
                alt={user.name}
                width={60}
                height={60}
                className="rounded-full border-2 border-gray-600"
              />
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <p className="font-bold text-white flex items-center">
                    <User className="w-4 h-4 mr-2 text-white " />
                    {user.name}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Book className="w-4 h-4 mr-2 text-white " />
                    Courses Enrolled: {user.coursesEnrolled}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-white " />
                    Certificates Earned: {user.certificatesEarned}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-white " />
                    Time Spent: {formatTime(user.timeSpent)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white flex items-center">
                    <LogIn className="w-4 h-4 mr-2 text-white " />
                    Last Login: {user.lastLogin.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-white " />
                    Date of Enrollment: {user.dateOfEnrollment.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <User className="w-4 h-4 mr-2 text-white " />
                    Student Level: {user.studentLevel}
                  </p>
                </div>
              </div>
              {/* Add the list of enrolled courses */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white mb-2">Enrolled Courses</h3>
                <ul className="list-disc list-inside text-sm text-white">
                  {user.enrolledCourses.map((course, courseIndex) => (
                    <li key={courseIndex} className="flex justify-between items-center">
                      <span>{course.courseTitle}</span>
                      <span className="text-xs text-gray-300"> - Paid: {course.amountPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from 'next/image';
// import { Book, Calendar, User, Award, LogIn, Clock } from 'lucide-react';
// import { useState, useEffect } from 'react';

// interface UserDetailsProps {
//   userDetails: {
//     name: string;
//     imageUrl: string;
//     coursesEnrolled: number;
//     lastLogin: Date;
//     dateOfEnrollment: Date;
//     studentLevel: number;
//     certificatesEarned: number;
//     enrolledCourses: {
//       courseTitle: string;
//       amountPaid: number;
//       progress: number;
//       thumbnail: string;
//     }[];
//     totalSpent: number;
//   }[];
// }

// export const UserDetails = ({ userDetails }: UserDetailsProps) => {
//   const [timeSpent, setTimeSpent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeSpent(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <Card className="mt-6 shadow-lg border border-gray-700 bg-[#1e3a8a]">
//       <CardHeader>
//         <CardTitle className="text-xl font-bold text-white">User Details</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           {userDetails.map((user, index) => (
//             <div key={index}>
//               <div className="flex items-center space-x-6 p-4 hover:bg-gray-700 rounded-lg transition-all duration-200">
//                 <Image
//                   src={user.imageUrl || '/avv.webp'}
//                   alt={user.name}
//                   width={60}
//                   height={60}
//                   className="rounded-full border-2 border-gray-600"
//                 />
//                 <div className="grid grid-cols-2 gap-4 flex-1">
//                   <div className="space-y-2">
//                     <p className="font-bold text-white flex items-center">
//                       <User className="w-4 h-4 mr-2 text-white " />
//                       {user.name}
//                     </p>
//                     <p className="text-sm text-white flex items-center">
//                       <Book className="w-4 h-4 mr-2 text-white " />
//                       Courses Enrolled: {user.coursesEnrolled}
//                     </p>
//                     <p className="text-sm text-white flex items-center">
//                       <Award className="w-4 h-4 mr-2 text-white " />
//                       Certificates Earned: {user.certificatesEarned}
//                     </p>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-sm text-white flex items-center">
//                       <LogIn className="w-4 h-4 mr-2 text-white " />
//                       Last Login: {user.lastLogin.toLocaleDateString()}
//                     </p>
//                     <p className="text-sm text-white flex items-center">
//                       <Calendar className="w-4 h-4 mr-2 text-white " />
//                       Date of Enrollment: {user.dateOfEnrollment.toLocaleDateString()}
//                     </p>
//                     <p className="text-sm text-white flex items-center">
//                       <User className="w-4 h-4 mr-2 text-white " />
//                       Student Level: {user.studentLevel}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               {/* New course progress section */}
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-white mb-2">Course Progress</h3>
//                 <div className="space-y-4">
//                   {user.enrolledCourses.map((course, cIndex) => (
//                     <div key={cIndex} className="bg-gray-800 p-4 rounded-lg">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-4">
//                           <Image
//                             src={course.thumbnail}
//                             alt={course.courseTitle}
//                             width={48}
//                             height={48}
//                             className="rounded-md"
//                           />
//                           <span className="text-white">{course.courseTitle}</span>
//                         </div>
//                         <span className="text-sm text-purple-300">
//                           {course.amountPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-4">
//                         <div className="flex-1 bg-gray-700 rounded-full h-2">
//                           <div 
//                             className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
//                             style={{ width: `${course.progress}%` }}
//                           />
//                         </div>
//                         <span className="text-sm text-white w-20 text-right">
//                           {course.progress}%
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div className="bg-gray-800 p-4 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <Clock className="w-5 h-5 text-purple-400" />
//                       <span className="text-white">Total Time Spent</span>
//                     </div>
//                     <div className="text-2xl font-bold text-purple-400 mt-2">
//                       {Math.floor(timeSpent / 3600)}h {(timeSpent % 3600) / 60}m
//                     </div>
//                   </div>
//                   <div className="bg-gray-800 p-4 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <Award className="w-5 h-5 text-blue-400" />
//                       <span className="text-white">Total Investment</span>
//                     </div>
//                     <div className="text-2xl font-bold text-blue-400 mt-2">
//                       {user.totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };



































// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from 'next/image';
// import { Book, Calendar, User, Award, LogIn, Clock } from 'lucide-react'; // Import icons, including Clock
// import { useState, useEffect } from 'react';

// interface UserDetailsProps {
//   userDetails: {
//     name: string;
//     imageUrl: string;
//     coursesEnrolled: number;
//     lastLogin: Date;
//     dateOfEnrollment: Date;
//     studentLevel: number;
//     certificatesEarned: number;
//   }[];
// }

// export const UserDetails = ({ userDetails }: UserDetailsProps) => {
//   const [timeSpent, setTimeSpent] = useState(0);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     const start = Date.now();

//     timer = setInterval(() => {
//       setTimeSpent(Math.floor((Date.now() - start) / 1000)); // Time in seconds
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <Card className="mt-6 shadow-lg border border-gray-700 bg-[#1e3a8a]"> 
//       <CardHeader>
//         <CardTitle className="text-xl font-bold text-white">User Details</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           {userDetails.map((user, index) => (
//             <div
//               key={index}
//               className="flex items-center space-x-6 p-4 hover:bg-gray-700 rounded-lg transition-all duration-200"
//             >
//               <Image
//                 src={user.imageUrl || '/avv.webp'} // Using OR operator to provide a fallback
//                 alt={user.name}
//                 width={60}
//                 height={60}
//                 className="rounded-full border-2 border-gray-600"
//               />
//               <div className="grid grid-cols-2 gap-4 flex-1">
//                 <div className="space-y-2">
//                   <p className="font-bold text-white flex items-center">
//                     <User className="w-4 h-4 mr-2 text-white " />
//                     {user.name}
//                   </p>
//                   <p className="text-sm text-white flex items-center">
//                     <Book className="w-4 h-4 mr-2 text-white " />
//                     Courses Enrolled: {user.coursesEnrolled}
//                   </p>
//                   <p className="text-sm text-white flex items-center">
//                     <Award className="w-4 h-4 mr-2 text-white " />
//                     Certificates Earned: {user.certificatesEarned}
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-sm text-white flex items-center">
//                     <LogIn className="w-4 h-4 mr-2 text-white " />
//                     Last Login: {user.lastLogin.toLocaleDateString()}
//                   </p>
//                   <p className="text-sm text-white flex items-center">
//                     <Calendar className="w-4 h-4 mr-2 text-white " />
//                     Date of Enrollment: {user.dateOfEnrollment.toLocaleDateString()}
//                   </p>
//                   <p className="text-sm text-white flex items-center">
//                     <User className="w-4 h-4 mr-2 text-white " />
//                     Student Level: {user.studentLevel}
//                   </p>
//                   <p className="text-sm text-white flex items-center">
//                     <Clock className="w-4 h-4 mr-2 text-white " />
//                     Time Spent: {timeSpent} seconds
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };