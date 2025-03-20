// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@clerk/nextjs";
// import { getProgress } from "@/actions/get-progress";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user?.id) {
//         const courseId = "some-course-id";
//         const progressResponse = await fetch(`/api/progress?courseId=${courseId}`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!progressResponse.ok) {
//           throw new Error("Failed to fetch progress data");
//         }

//         const progressData = await progressResponse.json();
//         setProgressData(progressData);

//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!leaderboardResponse.ok) {
//           throw new Error("Failed to fetch leaderboard data");
//         }

//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       }
//       setLoading(false);
//     };

//     fetchData().catch((error) => {
//       console.error("[FETCH_PROGRESS]", error);
//       setLoading(false);
//     });
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   // Mock data for additional sections (replace with API calls if needed)
//   const totalCourses = 5;
//   const coursesCompleted = 1;
//   const hoursSpent = 112;
//   const liveClassesAttended = 70;
//   const quizzesPracticed = 20;
//   const assignmentsDone = 10;

//   const upcomingClasses = [
//     { title: "Newtonian Mechanics - Class 5", subject: "Physics", date: "15th Oct, 2024", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "Polymer - Class 3", subject: "Chemistry", date: "15th Oct, 2024", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   const courses = [
//     { name: "Data science", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Machine Learning", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Augmentative Reality", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 70, status: "In progress" },
//     { name: "Product Design ", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Product Management", chapters: "5 chapter", lectures: "30 lecture", progress: 100, score: 90, status: "Completed" },
//   ];

//   const assignments = [
//     { title: "Advanced problem solving math", subject: "Higher math 1", type: "Problem assignment 5", dueDate: "15th Oct, 2024", dueTime: "12:00PM" },
//   ];

//   const pendingQuizzes = [
//     { title: "Vector addition", subject: "Math", time: 15 },
//     { title: "Vector division", subject: "Math", time: 15 },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Header */}
//       {/* <h1 className="text-2xl font-bold text-[#1F2A44] mb-6">Home page</h1> */}

//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">&times;</button>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / 30) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}/30</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}/15</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/placeholder-class-image.jpg" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course, index) => (
//                     <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                       <td className="p-3 flex items-center space-x-2">
//                         <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                           course.name.startsWith("Physics") ? "bg-[#F97316]" : course.name.startsWith("Chemistry") ? "bg-[#3B82F6]" : "bg-[#22C55E]"
//                         }`}>
//                           {course.name.charAt(0)}
//                         </span>
//                         <div>
//                           <p className="text-sm font-medium text-[#1F2A44]">{course.name}</p>
//                           <p className="text-xs text-[#6B7280]">{course.chapters}, {course.lectures}</p>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
//                           <div
//                             className="bg-[#34C759] h-2 rounded-full"
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                         <p className="text-xs text-[#6B7280] mt-1">{course.progress}%</p>
//                       </td>
//                       <td className="p-3 text-sm text-[#1F2A44]">{course.score}</td>
//                       <td className="p-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           course.status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
//                         }`}>
//                           <span className={`w-2 h-2 rounded-full mr-1 ${
//                             course.status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
//                           }`}></span>
//                           {course.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
//         <div className="space-y-6">
//           {/* Assignment */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {assignments.map((assignment, index) => (
//                 <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
//                   <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
//                   <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
//                   <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
//                   <div className="flex space-x-2 mt-2">
//                     <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
//                       View
//                     </button>
//                     <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Pending Quizzes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4 flex justify-between items-center">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
//               <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {pendingQuizzes.map((quiz, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
//                     <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
//                   </div>
//                   <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                     Start
//                   </button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Leaderboard */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b border-[#E5E7EB]">
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((user, index) => (
//                       <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                         <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@clerk/nextjs";
// import { getProgress } from "@/actions/get-progress";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user?.id) {
//         const courseId = "some-course-id";
//         const progressResponse = await fetch(`/api/progress?courseId=${courseId}&userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!progressResponse.ok) {
//           throw new Error("Failed to fetch progress data");
//         }

//         const progressData = await progressResponse.json();
//         setProgressData(progressData);

//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!leaderboardResponse.ok) {
//           throw new Error("Failed to fetch leaderboard data");
//         }

//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       }
//       setLoading(false);
//     };

//     fetchData().catch((error) => {
//       console.error("[FETCH_PROGRESS]", error);
//       setLoading(false);
//     });
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   // Fetch additional data from the database
//   const totalCourses = 5; // Replace with actual data fetch
//   const coursesCompleted = 1; // Replace with actual data fetch
//   const hoursSpent = 112; // Replace with actual data fetch
//   const liveClassesAttended = 70; // Replace with actual data fetch
//   const quizzesPracticed = 20; // Replace with actual data fetch
//   const assignmentsDone = 10; // Replace with actual data fetch

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Phython", date: "15th Oct, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "AI", subject: "class 2", date: "16th Oct, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   const courses = [
//     { name: "Data science", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Machine Learning", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Augmentative Reality", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 70, status: "In progress" },
//     { name: "Product Design ", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Product Management", chapters: "5 chapter", lectures: "30 lecture", progress: 100, score: 90, status: "Completed" },
//   ];

//   const assignments = [
//     { title: "Advanced problem solving math", subject: "Higher math 1", type: "Problem assignment 5", dueDate: "15th Oct, 2024", dueTime: "12:00PM" },
//   ];

//   const pendingQuizzes = [
//     { title: "Vector addition", subject: "Math", time: 15 },
//     { title: "Vector division", subject: "Math", time: 15 },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">&times;</button>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / 30) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}/30</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}/15</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/placeholder-class-image.jpg" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course, index) => (
//                     <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                       <td className="p-3 flex items-center space-x-2">
//                         <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                           course.name.startsWith("Physics") ? "bg-[#F97316]" : course.name.startsWith("Chemistry") ? "bg-[#3B82F6]" : "bg-[#22C55E]"
//                         }`}>
//                           {course.name.charAt(0)}
//                         </span>
//                         <div>
//                           <p className="text-sm font-medium text-[#1F2A44]">{course.name}</p>
//                           <p className="text-xs text-[#6B7280]">{course.chapters}, {course.lectures}</p>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
//                           <div
//                             className="bg-[#34C759] h-2 rounded-full"
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                         <p className="text-xs text-[#6B7280] mt-1">{course.progress}%</p>
//                       </td>
//                       <td className="p-3 text-sm text-[#1F2A44]">{course.score}</td>
//                       <td className="p-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           course.status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
//                         }`}>
//                           <span className={`w-2 h-2 rounded-full mr-1 ${
//                             course.status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
//                           }`}></span>
//                           {course.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
//         <div className="space-y-6">
//           {/* Assignment */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {assignments.map((assignment, index) => (
//                 <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
//                   <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
//                   <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
//                   <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
//                   <div className="flex space-x-2 mt-2">
//                     <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
//                       View
//                     </button>
//                     <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Pending Quizzes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4 flex justify-between items-center">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
//               <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {pendingQuizzes.map((quiz, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
//                     <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
//                   </div>
//                   <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                     Start
//                   </button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Leaderboard */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b border-[#E5E7EB]">
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((user, index) => (
//                       <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                         <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }









// // app/progress/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false); // State for alert

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);

//         // Check if the user has enrolled in any courses
//         const purchaseResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!purchaseResponse.ok) {
//           throw new Error("Failed to fetch purchase data");
//         }

//         const purchases = await purchaseResponse.json();

//         if (purchases.length === 0) {
//           // No courses enrolled
//           setProgressData({
//             completionPercentage: 0,
//             totalChapters: 0,
//             completedChapters: 0,
//           });
//           setNoCoursesAlert(true);
//           // Hide alert after 3 seconds
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         } else {
//           // Fetch ChapterQuizResult for the signed-in user (existing logic)
//           const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           if (!quizResultsResponse.ok) {
//             throw new Error("Failed to fetch quiz results");
//           }

//           const quizResults = await quizResultsResponse.json();
          
//           // Calculate overall performance from quiz results
//           let completionPercentage = 0;
//           if (quizResults.length > 0) {
//             const totalScore = quizResults.reduce(
//               (sum: number, result: { score: number; total: number }) => 
//                 sum + (result.score / result.total) * 100, 
//               0
//             );
//             completionPercentage = Math.round(totalScore / quizResults.length);
//           }

//           const totalChapters = 10; // Placeholder; fetch from your course data if available
//           const completedChapters = Math.round((completionPercentage / 100) * totalChapters);

//           setProgressData({
//             completionPercentage,
//             totalChapters,
//             completedChapters,
//           });
//         }

//         // Fetch leaderboard data (unchanged)
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!leaderboardResponse.ok) {
//           throw new Error("Failed to fetch leaderboard data");
//         }

//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({
//           completionPercentage: 0,
//           totalChapters: 0,
//           completedChapters: 0,
//         }); // Default to 0 on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   // Static data (unchanged)
//   const totalCourses = 5;
//   const coursesCompleted = 1;
//   const hoursSpent = 112;
//   const liveClassesAttended = 70;
//   const quizzesPracticed = 20;
//   const assignmentsDone = 10;

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Python", date: "15th Oct, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "AI", subject: "Class 2", date: "16th Oct, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   const courses = [
//     { name: "Data Science", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Machine Learning", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Augmentative Reality", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 70, status: "In progress" },
//     { name: "Product Design", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Product Management", chapters: "5 chapter", lectures: "30 lecture", progress: 100, score: 90, status: "Completed" },
//   ];

//   const assignments = [
//     { title: "Advanced problem solving math", subject: "Higher math 1", type: "Problem assignment 5", dueDate: "15th Oct, 2024", dueTime: "12:00PM" },
//   ];

//   const pendingQuizzes = [
//     { title: "Vector addition", subject: "Math", time: 15 },
//     { title: "Vector division", subject: "Math", time: 15 },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / 30) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}/30</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}/15</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/placeholder-class-image.jpg" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course, index) => (
//                     <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                       <td className="p-3 flex items-center space-x-2">
//                         <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                           course.name.startsWith("Physics") ? "bg-[#F97316]" : course.name.startsWith("Chemistry") ? "bg-[#3B82F6]" : "bg-[#22C55E]"
//                         }`}>
//                           {course.name.charAt(0)}
//                         </span>
//                         <div>
//                           <p className="text-sm font-medium text-[#1F2A44]">{course.name}</p>
//                           <p className="text-xs text-[#6B7280]">{course.chapters}, {course.lectures}</p>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
//                           <div
//                             className="bg-[#34C759] h-2 rounded-full"
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                         <p className="text-xs text-[#6B7280] mt-1">{course.progress}%</p>
//                       </td>
//                       <td className="p-3 text-sm text-[#1F2A44]">{course.score}</td>
//                       <td className="p-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           course.status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
//                         }`}>
//                           <span className={`w-2 h-2 rounded-full mr-1 ${
//                             course.status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
//                           }`}></span>
//                           {course.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
//         <div className="space-y-6">
//           {/* Assignment */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {assignments.map((assignment, index) => (
//                 <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
//                   <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
//                   <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
//                   <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
//                   <div className="flex space-x-2 mt-2">
//                     <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
//                       View
//                     </button>
//                     <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Pending Quizzes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4 flex justify-between items-center">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
//               <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {pendingQuizzes.map((quiz, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
//                     <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
//                   </div>
//                   <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                     Start
//                   </button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Leaderboard */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b border-[#E5E7EB]">
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((user, index) => (
//                       <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                         <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Tailwind CSS for fade-out animation */}
//       <style jsx>{`
//         .animate-fade-out {
//           animation: fadeOut 3s ease-in-out forwards;
//         }
//         @keyframes fadeOut {
//           0% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { opacity: 0; display: none; }
//         }
//       `}</style>
//     </div>
//   );
// }









// app/progress/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   // New state for stats
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState(0);
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);

//         // Check enrollment status
//         const purchaseResponse = await fetch(`/api/purchases?userId=${user.id}`, {
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!purchaseResponse.ok) throw new Error("Failed to fetch purchase data");
//         const purchases = await purchaseResponse.json();

//         if (purchases.length === 0) {
//           setProgressData({
//             completionPercentage: 0,
//             totalChapters: 0,
//             completedChapters: 0,
//           });
//           setTotalCourses(0);
//           setCoursesCompleted(0);
//           setLiveClassesAttended(0);
//           setHoursSpent(0);
//           setQuizzesPracticed(0);
//           setAssignmentsDone(0);
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         } else {
//           // Fetch Total Courses Enrolled
//           setTotalCourses(purchases.length);

//           // Fetch Courses Completed (via UserProgress)
//           const userProgressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!userProgressResponse.ok) throw new Error("Failed to fetch user progress");
//           const userProgress = await userProgressResponse.json();
//           const completedChapters = userProgress.filter((p: any) => p.isCompleted).length;

//           // Fetch total chapters across all enrolled courses
//           const courseIds = purchases.map((p: any) => p.courseId);
//           const chaptersResponse = await fetch(`/api/chapters?courseIds=${courseIds.join(",")}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!chaptersResponse.ok) throw new Error("Failed to fetch chapters");
//           const totalChapters = (await chaptersResponse.json()).length;
//           setCoursesCompleted(
//             courseIds.filter((courseId: string) => {
//               const courseChapters = userProgress.filter((p: any) => p.courseId === courseId);
//               return courseChapters.length > 0 && courseChapters.every((c: any) => c.isCompleted);
//             }).length
//           );

//           // Fetch Quiz Results for Overall Performance
//           const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!quizResultsResponse.ok) throw new Error("Failed to fetch quiz results");
//           const quizResults = await quizResultsResponse.json();
//           let completionPercentage = 0;
//           if (quizResults.length > 0) {
//             const totalScore = quizResults.reduce(
//               (sum: number, result: { score: number; total: number }) =>
//                 sum + (result.score / result.total) * 100,
//               0
//             );
//             completionPercentage = Math.round(totalScore / quizResults.length);
//           }
//           setProgressData({
//             completionPercentage,
//             totalChapters,
//             completedChapters,
//           });

//           // Fetch Live Classes Attended and Hours Spent
//           const recordingsResponse = await fetch(`/api/recordingsprogress?courseIds=${courseIds.join(",")}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!recordingsResponse.ok) throw new Error("Failed to fetch recordings");
//           const recordings = await recordingsResponse.json();
//           const totalRecordings = recordings.length;
//           const watchedRecordings = userProgress.filter((p: any) =>
//             recordings.some((r: any) => r.chapterId === p.chapterId && p.isCompleted)
//           ).length;
//           setLiveClassesAttended(totalRecordings > 0 ? Math.round((watchedRecordings / totalRecordings) * 100) : 0);
//           setHoursSpent(
//             recordings
//               .filter((r: any) => userProgress.some((p: any) => p.chapterId === r.chapterId && p.isCompleted))
//               .reduce((sum: number, r: any) => sum + (r.duration || 0) / 60, 0)
//           );

//           // Fetch Quizzes Practiced
//           const quizAttemptsResponse = await fetch(`/api/chapter-quiz-attempts?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!quizAttemptsResponse.ok) throw new Error("Failed to fetch quiz attempts");
//           const quizAttempts = await quizAttemptsResponse.json();
//           setQuizzesPracticed(quizAttempts.length);

//           // Fetch Assignments Done
//           const submissionsResponse = await fetch(`/api/project-submissions?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!submissionsResponse.ok) throw new Error("Failed to fetch project submissions");
//           const submissions = await submissionsResponse.json();
//           setAssignmentsDone(submissions.length);
//         }

//         // Fetch Leaderboard
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent(0);
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Python", date: "15th June, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "Machine Learning And AI", subject: "Class 2", date: "16th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   const courses = [
//     { name: "Data Science", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Machine Learning", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Augmentative Reality", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 70, status: "In progress" },
//     { name: "Product Design", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Product Management", chapters: "5 chapter", lectures: "30 lecture", progress: 100, score: 90, status: "Completed" },
//   ];

//   const assignments = [
//     { title: "Advanced problem solving math", subject: "Higher math 1", type: "Problem assignment 5", dueDate: "15th Oct, 2024", dueTime: "12:00PM" },
//   ];

//   const pendingQuizzes = [
//     { title: "Vector addition", subject: "Math", time: 15 },
//     { title: "Vector division", subject: "Math", time: 15 },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent.toFixed(1)}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course, index) => (
//                     <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                       <td className="p-3 flex items-center space-x-2">
//                         <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                           course.name.startsWith("Physics") ? "bg-[#F97316]" : course.name.startsWith("Chemistry") ? "bg-[#3B82F6]" : "bg-[#22C55E]"
//                         }`}>
//                           {course.name.charAt(0)}
//                         </span>
//                         <div>
//                           <p className="text-sm font-medium text-[#1F2A44]">{course.name}</p>
//                           <p className="text-xs text-[#6B7280]">{course.chapters}, {course.lectures}</p>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
//                           <div
//                             className="bg-[#34C759] h-2 rounded-full"
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                         <p className="text-xs text-[#6B7280] mt-1">{course.progress}%</p>
//                       </td>
//                       <td className="p-3 text-sm text-[#1F2A44]">{course.score}</td>
//                       <td className="p-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           course.status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
//                         }`}>
//                           <span className={`w-2 h-2 rounded-full mr-1 ${
//                             course.status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
//                           }`}></span>
//                           {course.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
//         <div className="space-y-6">
//           {/* Assignment */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {assignments.map((assignment, index) => (
//                 <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
//                   <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
//                   <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
//                   <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
//                   <div className="flex space-x-2 mt-2">
//                     <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
//                       View
//                     </button>
//                     <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Pending Quizzes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4 flex justify-between items-center">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
//               <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {pendingQuizzes.map((quiz, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
//                     <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
//                   </div>
//                   <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                     Start
//                   </button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Leaderboard */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b border-[#E5E7EB]">
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((user, index) => (
//                       <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                         <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Tailwind CSS for fade-out animation */}
//       <style jsx>{`
//         .animate-fade-out {
//           animation: fadeOut 3s ease-in-out forwards;
//         }
//         @keyframes fadeOut {
//           0% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { opacity: 0; display: none; }
//         }
//       `}</style>
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState(0);
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);
//   const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
//   const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
//   const [isEnrolled, setIsEnrolled] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);

//         // Check enrollment status
//         const purchaseResponse = await fetch(`/api/purchases?userId=${user.id}`, {
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!purchaseResponse.ok) throw new Error("Failed to fetch purchase data");
//         const purchases = await purchaseResponse.json();

//         if (purchases.length === 0) {
//           setProgressData({
//             completionPercentage: 0,
//             totalChapters: 0,
//             completedChapters: 0,
//           });
//           setTotalCourses(0);
//           setCoursesCompleted(0);
//           setLiveClassesAttended(0);
//           setHoursSpent(0);
//           setQuizzesPracticed(0);
//           setAssignmentsDone(0);
//           setQuizAssignments([]);
//           setPendingQuizzesData([]);
//           setIsEnrolled(false);
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         } else {
//           setIsEnrolled(true);
//           setTotalCourses(purchases.length);

//           // Fetch Courses Completed (via UserProgress)
//           const userProgressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!userProgressResponse.ok) throw new Error("Failed to fetch user progress");
//           const userProgress = await userProgressResponse.json();
//           const completedChapters = userProgress.filter((p: any) => p.isCompleted).length;

//           // Fetch total chapters across all enrolled courses
//           const courseIds = purchases.map((p: any) => p.courseId);
//           const chaptersResponse = await fetch(`/api/chapters?courseIds=${courseIds.join(",")}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!chaptersResponse.ok) throw new Error("Failed to fetch chapters");
//           const totalChapters = (await chaptersResponse.json()).length;
//           setCoursesCompleted(
//             courseIds.filter((courseId: string) => {
//               const courseChapters = userProgress.filter((p: any) => p.courseId === courseId);
//               return courseChapters.length > 0 && courseChapters.every((c: any) => c.isCompleted);
//             }).length
//           );

//           // Fetch Quiz Results for Overall Performance
//           const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!quizResultsResponse.ok) throw new Error("Failed to fetch quiz results");
//           const quizResults = await quizResultsResponse.json();
//           let completionPercentage = 0;
//           if (quizResults.length > 0) {
//             const totalScore = quizResults.reduce(
//               (sum: number, result: { score: number; total: number }) =>
//                 sum + (result.score / result.total) * 100,
//               0
//             );
//             completionPercentage = Math.round(totalScore / quizResults.length);
//           }
//           setProgressData({
//             completionPercentage,
//             totalChapters,
//             completedChapters,
//           });

//           // Fetch Live Classes Attended and Hours Spent
//           const recordingsResponse = await fetch(`/api/recordings?courseIds=${courseIds.join(",")}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!recordingsResponse.ok) throw new Error("Failed to fetch recordings");
//           const recordings = await recordingsResponse.json();
//           const totalRecordings = recordings.length;
//           const watchedRecordings = userProgress.filter((p: any) =>
//             recordings.some((r: any) => r.chapterId === p.chapterId && p.isCompleted)
//           ).length;
//           setLiveClassesAttended(totalRecordings > 0 ? Math.round((watchedRecordings / totalRecordings) * 100) : 0);
//           setHoursSpent(
//             recordings
//               .filter((r: any) => userProgress.some((p: any) => p.chapterId === r.chapterId && p.isCompleted))
//               .reduce((sum: number, r: any) => sum + (r.duration || 0) / 60, 0)
//           );

//           // Fetch Quizzes Practiced
//           const quizAttemptsResponse = await fetch(`/api/chapter-quiz-attempts?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!quizAttemptsResponse.ok) throw new Error("Failed to fetch quiz attempts");
//           const quizAttempts = await quizAttemptsResponse.json();
//           setQuizzesPracticed(quizAttempts.length);

//           // Fetch Assignments Done
//           const submissionsResponse = await fetch(`/api/project-submissions?userId=${user.id}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!submissionsResponse.ok) throw new Error("Failed to fetch project submissions");
//           const submissions = await submissionsResponse.json();
//           setAssignmentsDone(submissions.length);

//           // Fetch Quizzes for Assignment Section
//           const quizzesResponse = await fetch(`/api/chapter-quizzes?courseIds=${courseIds.join(",")}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!quizzesResponse.ok) throw new Error("Failed to fetch quizzes");
//           const quizzes = await quizzesResponse.json();
//           setQuizAssignments(
//             quizzes.map((quiz: any) => ({
//               title: quiz.title,
//               subject: quiz.course?.title || "Unknown Course",
//               type: `Quiz - Chapter ${quiz.chapter?.position || "N/A"}`,
//               dueDate: new Date(quiz.createdAt).toLocaleDateString("en-US", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               }),
//               dueTime: new Date(quiz.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
//             }))
//           );

//           // Fetch Pending Quizzes (quizzes not yet attempted)
//           const pendingQuizzesResponse = await fetch(`/api/chapter-quizzes/pending?userId=${user.id}&courseIds=${courseIds.join(",")}`, {
//             headers: { "Content-Type": "application/json" },
//           });
//           if (!pendingQuizzesResponse.ok) throw new Error("Failed to fetch pending quizzes");
//           const pendingQuizzes = await pendingQuizzesResponse.json();
//           setPendingQuizzesData(
//             pendingQuizzes.map((quiz: any) => ({
//               title: quiz.title,
//               subject: quiz.course?.title || "Unknown Course",
//               time: quiz.duration || 15, // Default to 15 min if no duration field
//             }))
//           );
//         }

//         // Fetch Leaderboard (all users)
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent(0);
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//         setQuizAssignments([]);
//         setPendingQuizzesData([]);
//         setIsEnrolled(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Python", date: "15th June, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "Machine Learning And AI", subject: "Class 2", date: "16th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   const courses = [
//     { name: "Data Science", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Machine Learning", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Augmentative Reality", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 70, status: "In progress" },
//     { name: "Product Design", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
//     { name: "Product Management", chapters: "5 chapter", lectures: "30 lecture", progress: 100, score: 90, status: "Completed" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent.toFixed(1)}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course, index) => (
//                     <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                       <td className="p-3 flex items-center space-x-2">
//                         <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                           course.name.startsWith("Physics") ? "bg-[#F97316]" : course.name.startsWith("Chemistry") ? "bg-[#3B82F6]" : "bg-[#22C55E]"
//                         }`}>
//                           {course.name.charAt(0)}
//                         </span>
//                         <div>
//                           <p className="text-sm font-medium text-[#1F2A44]">{course.name}</p>
//                           <p className="text-xs text-[#6B7280]">{course.chapters}, {course.lectures}</p>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
//                           <div
//                             className="bg-[#34C759] h-2 rounded-full"
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                         <p className="text-xs text-[#6B7280] mt-1">{course.progress}%</p>
//                       </td>
//                       <td className="p-3 text-sm text-[#1F2A44]">{course.score}</td>
//                       <td className="p-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           course.status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
//                         }`}>
//                           <span className={`w-2 h-2 rounded-full mr-1 ${
//                             course.status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
//                           }`}></span>
//                           {course.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
//         <div className="space-y-6">
//           {/* Assignment (now showing quizzes) */}
//           {isEnrolled && (
//             <Card className="bg-white rounded-xl shadow-sm">
//               <CardHeader className="p-4">
//                 <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 {quizAssignments.map((assignment, index) => (
//                   <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
//                     <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
//                     <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
//                     <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
//                     <div className="flex space-x-2 mt-2">
//                       <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
//                         View
//                       </button>
//                       <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                         Upload
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Pending Quizzes */}
//           {isEnrolled && (
//             <Card className="bg-white rounded-xl shadow-sm">
//               <CardHeader className="p-4 flex justify-between items-center">
//                 <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
//                 <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
//               </CardHeader>
//               <CardContent className="p-4 space-y-4">
//                 {pendingQuizzesData.map((quiz, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
//                       <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
//                     </div>
//                     <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Start
//                     </button>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Leaderboard */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b border-[#E5E7EB]">
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((user, index) => (
//                       <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                         <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Tailwind CSS for fade-out animation */}
//       <style jsx>{`
//         .animate-fade-out {
//           animation: fadeOut 3s ease-in-out forwards;
//         }
//         @keyframes fadeOut {
//           0% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { opacity: 0; display: none; }
//         }
//       `}</style>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState(0);
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);
//   const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
//   const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [purchases, setPurchases] = useState<any[]>([]); // Added to store purchases data
//   const [userProgress, setUserProgress] = useState<any[]>([]); // Added to store user progress
//   const [quizResults, setQuizResults] = useState<any[]>([]); // Added to store quiz results

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);

//         const token = await getToken();

//         const purchaseResponse = await fetch(`/api/purchases?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!purchaseResponse.ok) throw new Error("Failed to fetch purchase data");
//         const purchasesData = await purchaseResponse.json();
//         setPurchases(purchasesData);

//         if (purchasesData.length === 0) {
//           setProgressData({
//             completionPercentage: 0,
//             totalChapters: 0,
//             completedChapters: 0,
//           });
//           setTotalCourses(0);
//           setCoursesCompleted(0);
//           setLiveClassesAttended(0);
//           setHoursSpent(0);
//           setQuizzesPracticed(0);
//           setAssignmentsDone(0);
//           setQuizAssignments([]);
//           setPendingQuizzesData([]);
//           setIsEnrolled(false);
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         } else {
//           setIsEnrolled(true);
//           setTotalCourses(purchasesData.length);

//           const courseIds = purchasesData.map((p: any) => p.courseId);

//           const userProgressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!userProgressResponse.ok) throw new Error("Failed to fetch user progress");
//           const userProgressData = await userProgressResponse.json();
//           setUserProgress(userProgressData);
//           const completedChapters = userProgressData.filter((p: any) => p.isCompleted).length;

//           const chaptersResponse = await fetch(`/api/chapters?courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!chaptersResponse.ok) throw new Error("Failed to fetch chapters");
//           const totalChapters = (await chaptersResponse.json()).length;
//           setCoursesCompleted(
//             courseIds.filter((courseId: string) => {
//               const courseChapters = userProgressData.filter((p: any) => p.courseId === courseId);
//               return courseChapters.length > 0 && courseChapters.every((c: any) => c.isCompleted);
//             }).length
//           );

//           const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!quizResultsResponse.ok) throw new Error("Failed to fetch quiz results");
//           const quizResultsData = await quizResultsResponse.json();
//           setQuizResults(quizResultsData);
//           let completionPercentage = 0;
//           if (quizResultsData.length > 0) {
//             const totalScore = quizResultsData.reduce(
//               (sum: number, result: { score: number; total: number }) =>
//                 sum + (result.score / result.total) * 100,
//               0
//             );
//             completionPercentage = Math.round(totalScore / quizResultsData.length);
//           }
//           setProgressData({
//             completionPercentage,
//             totalChapters,
//             completedChapters,
//           });

//           const recordingsResponse = await fetch(`/api/recordings?courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!recordingsResponse.ok) throw new Error("Failed to fetch recordings");
//           const recordings = await recordingsResponse.json();
//           const totalRecordings = recordings.length;
//           const watchedRecordings = userProgressData.filter((p: any) =>
//             recordings.some((r: any) => r.chapterId === p.chapterId && p.isCompleted)
//           ).length;
//           setLiveClassesAttended(totalRecordings > 0 ? Math.round((watchedRecordings / totalRecordings) * 100) : 0);
//           setHoursSpent(
//             recordings
//               .filter((r: any) => userProgressData.some((p: any) => p.chapterId === r.chapterId && p.isCompleted))
//               .reduce((sum: number, r: any) => sum + (r.duration || 0) / 60, 0)
//           );

//           const quizAttemptsResponse = await fetch(`/api/chapter-quiz-attempts?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!quizAttemptsResponse.ok) throw new Error("Failed to fetch quiz attempts");
//           const quizAttempts = await quizAttemptsResponse.json();
//           setQuizzesPracticed(quizAttempts.length);

//           const submissionsResponse = await fetch(`/api/project-submissions?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!submissionsResponse.ok) throw new Error("Failed to fetch project submissions");
//           const submissions = await submissionsResponse.json();
//           setAssignmentsDone(submissions.length);

//           const quizzesResponse = await fetch(`/api/chapter-quizzes?courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!quizzesResponse.ok) throw new Error("Failed to fetch quizzes");
//           const quizzes = await quizzesResponse.json();
//           setQuizAssignments(
//             quizzes.map((quiz: any) => ({
//               title: quiz.title,
//               subject: quiz.course?.title || "Unknown Course",
//               type: `Quiz - Chapter ${quiz.chapter?.position || "N/A"}`,
//               dueDate: new Date(quiz.createdAt).toLocaleDateString("en-US", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               }),
//               dueTime: new Date(quiz.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
//             }))
//           );

//           const pendingQuizzesResponse = await fetch(`/api/chapter-quizzes/pending?userId=${user.id}&courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!pendingQuizzesResponse.ok) throw new Error("Failed to fetch pending quizzes");
//           const pendingQuizzes = await pendingQuizzesResponse.json();
//           setPendingQuizzesData(
//             pendingQuizzes.map((quiz: any) => ({
//               title: quiz.title,
//               subject: quiz.course?.title || "Unknown Course",
//               time: quiz.duration || 15,
//             }))
//           );
//         }

//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent(0);
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//         setQuizAssignments([]);
//         setPendingQuizzesData([]);
//         setIsEnrolled(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Python", date: "15th June, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "Machine Learning And AI", subject: "Class 2", date: "16th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent.toFixed(1)}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses - Updated Section */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isEnrolled && totalCourses > 0 ? (
//                     purchases.map((purchase, index) => {
//                       const courseProgress = userProgress.filter(p => p.courseId === purchase.courseId);
//                       const completedChapters = courseProgress.filter(p => p.isCompleted).length;
//                       const totalChaptersForCourse = progressData?.totalChapters || 0; // Note: Ideally fetch per course
//                       const progressPercentage = totalChaptersForCourse > 0 ? Math.round((completedChapters / totalChaptersForCourse) * 100) : 0;
//                       const status = courseProgress.length > 0 && courseProgress.every(p => p.isCompleted) ? "Completed" : "In progress";
//                       const courseQuizResults = quizResults.filter(q => q.courseId === purchase.courseId);
//                       const overallScore = courseQuizResults.length > 0 
//                         ? Math.round(courseQuizResults.reduce((sum, q) => sum + (q.score / q.total * 100), 0) / courseQuizResults.length)
//                         : 0;

//                       return (
//                         <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                           <td className="p-3 flex items-center space-x-2">
//                             <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                               purchase.course?.title?.startsWith("Physics") ? "bg-[#F97316]" 
//                               : purchase.course?.title?.startsWith("Chemistry") ? "bg-[#3B82F6]" 
//                               : "bg-[#22C55E]"
//                             }`}>
//                               {purchase.course?.title?.charAt(0) || "C"}
//                             </span>
//                             <div>
//                               <p className="text-sm font-medium text-[#1F2A44]">{purchase.course?.title || "Unknown Course"}</p>
//                               <p className="text-xs text-[#6B7280]">{completedChapters} chapters completed</p>
//                             </div>
//                           </td>
//                           <td className="p-3">
//                             <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
//                               <div
//                                 className="bg-[#34C759] h-2 rounded-full"
//                                 style={{ width: `${progressPercentage}%` }}
//                               ></div>
//                             </div>
//                             <p className="text-xs text-[#6B7280] mt-1">{progressPercentage}%</p>
//                           </td>
//                           <td className="p-3 text-sm text-[#1F2A44]">{overallScore}</td>
//                           <td className="p-3">
//                             <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                               status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
//                             }`}>
//                               <span className={`w-2 h-2 rounded-full mr-1 ${
//                                 status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
//                               }`}></span>
//                               {status}
//                             </span>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="p-3 text-center text-sm text-[#6B7280]">
//                         Not enrolled yet in any course
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
//         <div className="space-y-6">
//           {/* Assignment (now showing quizzes) */}
//           {isEnrolled && (
//             <Card className="bg-white rounded-xl shadow-sm">
//               <CardHeader className="p-4">
//                 <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 {quizAssignments.map((assignment, index) => (
//                   <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
//                     <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
//                     <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
//                     <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
//                     <div className="flex space-x-2 mt-2">
//                       <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
//                         View
//                       </button>
//                       <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                         Upload
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Pending Quizzes */}
//           {isEnrolled && (
//             <Card className="bg-white rounded-xl shadow-sm">
//               <CardHeader className="p-4 flex justify-between items-center">
//                 <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
//                 <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
//               </CardHeader>
//               <CardContent className="p-4 space-y-4">
//                 {pendingQuizzesData.map((quiz, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
//                       <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
//                     </div>
//                     <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Start
//                     </button>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Leaderboard */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="border-b border-[#E5E7EB]">
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
//                       <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((user, index) => (
//                       <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                         <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
//                         <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Tailwind CSS for fade-out animation */}
//       <style jsx>{`
//         .animate-fade-out {
//           animation: fadeOut 3s ease-in-out forwards;
//         }
//         @keyframes fadeOut {
//           0% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { opacity: 0; display: none; }
//         }
//       `}</style>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState(0);
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);
//   const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
//   const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [purchases, setPurchases] = useState<any[]>([]);
//   const [userProgress, setUserProgress] = useState<any[]>([]);
//   const [quizResults, setQuizResults] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);

//         const token = await getToken();

//         // Fetch purchases
//         const purchaseResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!purchaseResponse.ok) throw new Error("Failed to fetch purchase data");
//         const purchasesData = await purchaseResponse.json();
//         setPurchases(purchasesData);

//         if (purchasesData.length === 0) {
//           setProgressData({
//             completionPercentage: 0,
//             totalChapters: 0,
//             completedChapters: 0,
//           });
//           setTotalCourses(0);
//           setCoursesCompleted(0);
//           setLiveClassesAttended(0);
//           setHoursSpent(0);
//           setQuizzesPracticed(0);
//           setAssignmentsDone(0);
//           setQuizAssignments([]);
//           setPendingQuizzesData([]);
//           setIsEnrolled(false);
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         } else {
//           setIsEnrolled(true);
//           setTotalCourses(purchasesData.length);

//           const courseIds = purchasesData.map((p: any) => p.courseId);

//           // Fetch user progress
//           const userProgressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!userProgressResponse.ok) throw new Error("Failed to fetch user progress");
//           const userProgressData = await userProgressResponse.json();
//           setUserProgress(userProgressData);
//           const completedChapters = userProgressData.filter((p: any) => p.isCompleted).length;

//           // Fetch chapters
//           const chaptersResponse = await fetch(`/api/chapters?courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!chaptersResponse.ok) throw new Error("Failed to fetch chapters");
//           const totalChapters = (await chaptersResponse.json()).length;

//           // Calculate courses completed
//           const coursesCompletedCount = courseIds.filter((courseId: string) => {
//             const courseChapters = userProgressData.filter((p: any) => p.courseId === courseId);
//             return courseChapters.length > 0 && courseChapters.every((c: any) => c.isCompleted);
//           }).length;
//           setCoursesCompleted(coursesCompletedCount);

//           // Fetch quiz results
//           const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!quizResultsResponse.ok) throw new Error("Failed to fetch quiz results");
//           const quizResultsData = await quizResultsResponse.json();
//           setQuizResults(quizResultsData);

//           // Calculate completion percentage
//           let completionPercentage = 0;
//           if (quizResultsData.length > 0) {
//             const totalScore = quizResultsData.reduce(
//               (sum: number, result: { score: number; total: number }) =>
//                 sum + (result.score / result.total) * 100,
//               0
//             );
//             completionPercentage = Math.round(totalScore / quizResultsData.length);
//           }
//           setProgressData({
//             completionPercentage,
//             totalChapters,
//             completedChapters,
//           });

//           // Fetch recordings
//           const recordingsResponse = await fetch(`/api/recordings?courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!recordingsResponse.ok) throw new Error("Failed to fetch recordings");
//           const recordings = await recordingsResponse.json();
//           const totalRecordings = recordings.length;
//           const watchedRecordings = userProgressData.filter((p: any) =>
//             recordings.some((r: any) => r.chapterId === p.chapterId && p.isCompleted)
//           ).length;
//           setLiveClassesAttended(totalRecordings > 0 ? Math.round((watchedRecordings / totalRecordings) * 100) : 0);
//           setHoursSpent(
//             recordings
//               .filter((r: any) => userProgressData.some((p: any) => p.chapterId === r.chapterId && p.isCompleted))
//               .reduce((sum: number, r: any) => sum + (r.duration || 0) / 60, 0)
//           );

//           // Fetch quiz attempts
//           const quizAttemptsResponse = await fetch(`/api/chapter-quiz-attempts?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!quizAttemptsResponse.ok) throw new Error("Failed to fetch quiz attempts");
//           const quizAttempts = await quizAttemptsResponse.json();
//           setQuizzesPracticed(quizAttempts.length);

//           // Fetch project submissions
//           const submissionsResponse = await fetch(`/api/project-submissions?userId=${user.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!submissionsResponse.ok) throw new Error("Failed to fetch project submissions");
//           const submissions = await submissionsResponse.json();
//           setAssignmentsDone(submissions.length);

//           // Fetch quizzes
//           const quizzesResponse = await fetch(`/api/chapter-quizzes?courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!quizzesResponse.ok) throw new Error("Failed to fetch quizzes");
//           const quizzes = await quizzesResponse.json();
//           setQuizAssignments(
//             quizzes.map((quiz: any) => ({
//               title: quiz.title,
//               subject: quiz.course?.title || "Unknown Course",
//               type: `Quiz - Chapter ${quiz.chapter?.position || "N/A"}`,
//               dueDate: new Date(quiz.createdAt).toLocaleDateString("en-US", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               }),
//               dueTime: new Date(quiz.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
//             }))
//           );

//           // Fetch pending quizzes
//           const pendingQuizzesResponse = await fetch(`/api/chapter-quizzes/pending?userId=${user.id}&courseIds=${courseIds.join(",")}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (!pendingQuizzesResponse.ok) throw new Error("Failed to fetch pending quizzes");
//           const pendingQuizzes = await pendingQuizzesResponse.json();
//           setPendingQuizzesData(
//             pendingQuizzes.map((quiz: any) => ({
//               title: quiz.title,
//               subject: quiz.course?.title || "Unknown Course",
//               time: quiz.duration || 15,
//             }))
//           );
//         }

//         // Fetch leaderboard data
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);
//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent(0);
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//         setQuizAssignments([]);
//         setPendingQuizzesData([]);
//         setIsEnrolled(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id, purchases]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Python", date: "15th June, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
//     { title: "Machine Learning And AI", subject: "Class 2", date: "16th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent.toFixed(1)}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses - Updated Section */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isEnrolled && totalCourses > 0 ? (
//                     purchases.map((purchase, index) => {
//                       const courseProgress = userProgress.filter((p) => p.courseId === purchase.courseId);
//                       const completedChapters = courseProgress.filter((p) => p.isCompleted).length;
//                       // Note: totalChaptersForCourse should ideally be fetched per course; here it's approximated
//                       const totalChaptersForCourse = progressData?.totalChapters || 0;
//                       const progressPercentage =
//                         totalChaptersForCourse > 0
//                           ? Math.round((completedChapters / totalChaptersForCourse) * 100)
//                           : 0;
//                       const status =
//                         courseProgress.length > 0 && courseProgress.every((p) => p.isCompleted)
//                           ? "Completed"
//                           : "In progress";
//                       const courseQuizResults = quizResults.filter((q) => q.courseId === purchase.courseId);
//                       const overallScore =
//                         courseQuizResults.length > 0
//                           ? Math.round(
//                               courseQuizResults.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) /
//                                 courseQuizResults.length
//                             )
//                           : 0;

//                       return (
//                         <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                           <td className="p-3 flex items-center space-x-2">
//                             <span
//                               className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                                 purchase.course?.title?.startsWith("Physics")
//                                   ? "bg-[#F97316]"
//                                   : purchase.course?.title?.startsWith("Chemistry")
//                                   ? "bg-[#3B82F6]"
//                                   : "bg-[#22C55E]"
//                               }`}
//                             >
//                               {purchase.course?.title?.charAt(0) || "C"}
//                             </span>
//                             <span className="text-sm text-[#1F2A44]">{purchase.course?.title || "Unknown Course"}</span>
//                           </td>
//                           <td className="p-3">
//                             <Progress value={progressPercentage} className="w-[60%]" />
//                             <span className="ml-2 text-sm text-[#6B7280]">{progressPercentage}%</span>
//                           </td>
//                           <td className="p-3 text-sm text-[#1F2A44]">{overallScore}%</td>
//                           <td className="p-3">
//                             <Badge
//                               variant={status === "Completed" ? "default" : "secondary"}
//                               className={
//                                 status === "Completed"
//                                   ? "bg-[#34C759] text-white"
//                                   : "bg-[#E5E7EB] text-[#6B7280]"
//                               }
//                             >
//                               {status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="p-3 text-center text-[#6B7280]">
//                         No courses enrolled yet.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Leaderboard */}
//         <div className="lg:col-span-1">
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {leaderboardData.length > 0 ? (
//                 leaderboardData.map((leader, index) => (
//                   <div
//                     key={leader.id}
//                     className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-b-0"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <span className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs">
//                         {index + 1}
//                       </span>
//                       <span className="text-sm text-[#1F2A44]">{leader.name}</span>
//                     </div>
//                     <span className="text-sm text-[#6B7280]">{leader.points} pts</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-[#6B7280]">No leaderboard data available.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUser, useAuth } from "@clerk/nextjs";

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  points: number;
}

export default function ProgressPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [progressData, setProgressData] = useState<{
    completionPercentage: number;
    totalChapters: number;
    completedChapters: number;
  } | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [noCoursesAlert, setNoCoursesAlert] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const [liveClassesAttended, setLiveClassesAttended] = useState(0);
  const [hoursSpent, setHoursSpent] = useState(0);
  const [quizzesPracticed, setQuizzesPracticed] = useState(0);
  const [assignmentsDone, setAssignmentsDone] = useState(0);
  const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
  const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        const token = await getToken();

        // Fetch purchases
        const purchaseResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!purchaseResponse.ok) throw new Error("Failed to fetch purchase data");
        const purchasesData = await purchaseResponse.json();
        setPurchases(purchasesData);

        if (purchasesData.length === 0) {
          setProgressData({
            completionPercentage: 0,
            totalChapters: 0,
            completedChapters: 0,
          });
          setTotalCourses(0);
          setCoursesCompleted(0);
          setLiveClassesAttended(0);
          setHoursSpent(0);
          setQuizzesPracticed(0);
          setAssignmentsDone(0);
          setQuizAssignments([]);
          setPendingQuizzesData([]);
          setIsEnrolled(false);
          setNoCoursesAlert(true);
          setTimeout(() => setNoCoursesAlert(false), 3000);
        } else {
          setIsEnrolled(true);
          setTotalCourses(purchasesData.length);

          const courseIds = purchasesData.map((p: any) => p.courseId);

          // Fetch user progress
          const userProgressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!userProgressResponse.ok) throw new Error("Failed to fetch user progress");
          const userProgressData = await userProgressResponse.json();
          setUserProgress(userProgressData);
          const completedChapters = userProgressData.filter((p: any) => p.isCompleted).length;

          // Fetch chapters
          const chaptersResponse = await fetch(`/api/chapters?courseIds=${courseIds.join(",")}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!chaptersResponse.ok) throw new Error("Failed to fetch chapters");
          const totalChapters = (await chaptersResponse.json()).length;

          // Calculate courses completed
          const coursesCompletedCount = courseIds.filter((courseId: string) => {
            const courseChapters = userProgressData.filter((p: any) => p.courseId === courseId);
            return courseChapters.length > 0 && courseChapters.every((c: any) => c.isCompleted);
          }).length;
          setCoursesCompleted(coursesCompletedCount);

          // Fetch quiz results
          const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!quizResultsResponse.ok) throw new Error("Failed to fetch quiz results");
          const quizResultsData = await quizResultsResponse.json();
          setQuizResults(quizResultsData);

          // Calculate completion percentage
          let completionPercentage = 0;
          if (quizResultsData.length > 0) {
            const totalScore = quizResultsData.reduce(
              (sum: number, result: { score: number; total: number }) =>
                sum + (result.score / result.total) * 100,
              0
            );
            completionPercentage = Math.round(totalScore / quizResultsData.length);
          }
          setProgressData({
            completionPercentage,
            totalChapters,
            completedChapters,
          });

          // Fetch recordings
          const recordingsResponse = await fetch(`/api/recordings?courseIds=${courseIds.join(",")}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!recordingsResponse.ok) throw new Error("Failed to fetch recordings");
          const recordings = await recordingsResponse.json();
          const totalRecordings = recordings.length;
          const watchedRecordings = userProgressData.filter((p: any) =>
            recordings.some((r: any) => r.chapterId === p.chapterId && p.isCompleted)
          ).length;
          setLiveClassesAttended(totalRecordings > 0 ? Math.round((watchedRecordings / totalRecordings) * 100) : 0);
          setHoursSpent(
            recordings
              .filter((r: any) => userProgressData.some((p: any) => p.chapterId === r.chapterId && p.isCompleted))
              .reduce((sum: number, r: any) => sum + (r.duration || 0) / 60, 0)
          );

          // Fetch quiz attempts
          const quizAttemptsResponse = await fetch(`/api/chapter-quiz-attempts?userId=${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!quizAttemptsResponse.ok) throw new Error("Failed to fetch quiz attempts");
          const quizAttempts = await quizAttemptsResponse.json();
          setQuizzesPracticed(quizAttempts.length);

          // Fetch project submissions
          const submissionsResponse = await fetch(`/api/project-submissions?userId=${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!submissionsResponse.ok) throw new Error("Failed to fetch project submissions");
          const submissions = await submissionsResponse.json();
          setAssignmentsDone(submissions.length);

          // Fetch quizzes
          const quizzesResponse = await fetch(`/api/chapter-quizzes?courseIds=${courseIds.join(",")}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!quizzesResponse.ok) throw new Error("Failed to fetch quizzes");
          const quizzes = await quizzesResponse.json();
          setQuizAssignments(
            quizzes.map((quiz: any) => ({
              title: quiz.title,
              subject: quiz.course?.title || "Unknown Course",
              type: `Quiz - Chapter ${quiz.chapter?.position || "N/A"}`,
              dueDate: new Date(quiz.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              dueTime: new Date(quiz.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            }))
          );

          // Fetch pending quizzes
          const pendingQuizzesResponse = await fetch(`/api/chapter-quizzes/pending?userId=${user.id}&courseIds=${courseIds.join(",")}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!pendingQuizzesResponse.ok) throw new Error("Failed to fetch pending quizzes");
          const pendingQuizzes = await pendingQuizzesResponse.json();
          setPendingQuizzesData(
            pendingQuizzes.map((quiz: any) => ({
              title: quiz.title,
              subject: quiz.course?.title || "Unknown Course",
              time: quiz.duration || 15,
            }))
          );
        }

        // Fetch leaderboard data
        const leaderboardResponse = await fetch("/api/leaderboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
        const leaderboard = await leaderboardResponse.json();
        setLeaderboardData(leaderboard);
      } catch (error) {
        console.error("[FETCH_PROGRESS]", error);
        setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
        setTotalCourses(0);
        setCoursesCompleted(0);
        setLiveClassesAttended(0);
        setHoursSpent(0);
        setQuizzesPracticed(0);
        setAssignmentsDone(0);
        setQuizAssignments([]);
        setPendingQuizzesData([]);
        setIsEnrolled(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]); // Removed 'purchases' from dependency array to prevent refresh loop

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

  if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

  const achievements = ["Top Learner", "Course Master"];

  const upcomingClasses = [
    { title: "Data Analytics - Class 5", subject: "Python", date: "15th June, 2025", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
    { title: "Machine Learning And AI", subject: "Class 2", date: "16th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      {/* Notification Banner */}
      <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
        <p className="text-sm">
          Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
        </p>
        <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
      </div>

      {/* Alert for No Courses Enrolled */}
      {noCoursesAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
          <p className="text-sm">No courses enrolled yet!</p>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Overall Performance */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#34C759"
                  strokeWidth="10"
                  strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
          </CardContent>
        </Card>

        {/* Total Enroll Courses */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#34C759"
                  strokeWidth="10"
                  strokeDasharray="283 283"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
          </CardContent>
        </Card>

        {/* Live Class Attended */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#A5B4FC"
                  strokeWidth="10"
                  strokeDasharray={`${liveClassesAttended * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent.toFixed(1)}h</p>
          </CardContent>
        </Card>

        {/* Quizzes Practiced */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#FECACA"
                  strokeWidth="10"
                  strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section: Upcoming Classes and Total Courses */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upcoming Classes */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
                    <div>
                      <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
                      <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
                      <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
                    <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
                    <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Total Courses - Updated Section */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isEnrolled && totalCourses > 0 ? (
                    purchases.map((purchase, index) => {
                      const courseProgress = userProgress.filter((p) => p.courseId === purchase.courseId);
                      const completedChapters = courseProgress.filter((p) => p.isCompleted).length;
                      // Note: totalChaptersForCourse should ideally be fetched per course; here it's approximated
                      const totalChaptersForCourse = progressData?.totalChapters || 0;
                      const progressPercentage =
                        totalChaptersForCourse > 0
                          ? Math.round((completedChapters / totalChaptersForCourse) * 100)
                          : 0;
                      const status =
                        courseProgress.length > 0 && courseProgress.every((p) => p.isCompleted)
                          ? "Completed"
                          : "In progress";
                      const courseQuizResults = quizResults.filter((q) => q.courseId === purchase.courseId);
                      const overallScore =
                        courseQuizResults.length > 0
                          ? Math.round(
                              courseQuizResults.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) /
                                courseQuizResults.length
                            )
                          : 0;

                      return (
                        <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="p-3 flex items-center space-x-2">
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                purchase.course?.title?.startsWith("Physics")
                                  ? "bg-[#F97316]"
                                  : purchase.course?.title?.startsWith("Chemistry")
                                  ? "bg-[#3B82F6]"
                                  : "bg-[#22C55E]"
                              }`}
                            >
                              {purchase.course?.title?.charAt(0) || "C"}
                            </span>
                            <span className="text-sm text-[#1F2A44]">{purchase.course?.title || "Unknown Course"}</span>
                          </td>
                          <td className="p-3">
                            <Progress value={progressPercentage} className="w-[60%]" />
                            <span className="ml-2 text-sm text-[#6B7280]">{progressPercentage}%</span>
                          </td>
                          <td className="p-3 text-sm text-[#1F2A44]">{overallScore}%</td>
                          <td className="p-3">
                            <Badge
                              variant={status === "Completed" ? "default" : "secondary"}
                              className={
                                status === "Completed"
                                  ? "bg-[#34C759] text-white"
                                  : "bg-[#E5E7EB] text-[#6B7280]"
                              }
                            >
                              {status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-[#6B7280]">
                        No courses enrolled yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {leaderboardData.length > 0 ? (
                leaderboardData.map((leader, index) => (
                  <div
                    key={leader.id}
                    className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#1F2A44]">{leader.name}</span>
                    </div>
                    <span className="text-sm text-[#6B7280]">{leader.points} pts</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#6B7280]">No leaderboard data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}