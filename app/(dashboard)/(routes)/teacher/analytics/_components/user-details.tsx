// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from 'next/image';
// import { Book, Calendar, User, Award, LogIn, Clock } from 'lucide-react';

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
//     }[];
//     timeSpent: number;
//   }[];
// }

// export const UserDetails = ({ userDetails }: UserDetailsProps) => {
//   const formatTime = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

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
//                 src={user.imageUrl || '/avv.webp'}
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
//                   <p className="text-sm text-white flex items-center">
//                     <Clock className="w-4 h-4 mr-2 text-white " />
//                     Time Spent: {formatTime(user.timeSpent)}
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
//                 </div>
//               </div>
//               {/* Add the list of enrolled courses */}
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-white mb-2">Enrolled Courses</h3>
//                 <ul className="list-disc list-inside text-sm text-white">
//                   {user.enrolledCourses.map((course, courseIndex) => (
//                     <li key={courseIndex} className="flex justify-between items-center">
//                       <span>{course.courseTitle}</span>
//                       <span className="text-xs text-gray-300"> - Paid: {course.amountPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
















// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { format } from "date-fns";
// import { formatTime, formatCurrency, cn } from "@/lib/utils";

// interface EnrolledCourse {
//   courseTitle: string;
//   amountPaid: number;
//   progress: number;
// }

// interface UserDetails {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: EnrolledCourse[];
//   timeSpent: number;
//   totalSpent: number;
// }

// interface UserDetailsProps {
//   userDetails: UserDetails[];
//   className?:String;
// }

// export const UserDetails = ({ userDetails, className }: UserDetailsProps) => {
//   // Custom progress bar with indicator color
//   const CustomProgress = ({ value, className }: { value: number; className?: string }) => {
//     return (
//       <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
//         <div
//           className={cn(
//             "h-full rounded-full",
//             value === 100 ? "bg-green-500" : "bg-blue-500"
//           )}
//           style={{ width: `${value}%` }}
//         />
//       </div>
//     );
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-md font-medium text-blue-600">User Details</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>User</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Enrollment Date</TableHead>
//               <TableHead>Last Login</TableHead>
//               <TableHead>Time Spent</TableHead>
//               <TableHead>Level</TableHead>
//               <TableHead>Certificates</TableHead>
//               <TableHead>Total Spent</TableHead>
//               <TableHead>Courses</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {userDetails.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-8 w-8">
//                       {user.imageUrl ? (
//                         <AvatarImage src={user.imageUrl} alt={user.name} />
//                       ) : (
//                         <AvatarFallback>
//                           {user.name.charAt(0).toUpperCase()}
//                         </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <span>{user.name}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   {format(new Date(user.dateOfEnrollment), "MMM d, yyyy")}
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(user.lastLogin), "MMM d, yyyy h:mm a")}
//                 </TableCell>
//                 <TableCell>{formatTime(user.timeSpent)}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline">Level {user.studentLevel}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="secondary">
//                     {user.certificatesEarned} Certificates
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
//                 <TableCell>
//                   <div className="space-y-2">
//                     {user.enrolledCourses.map((course) => (
//                       <div key={course.courseTitle} className="text-sm">
//                         <div className="flex justify-between mb-1">
//                           <span className="truncate max-w-[180px]">
//                             {course.courseTitle}
//                           </span>
//                           <span className="text-muted-foreground">
//                             {formatCurrency(course.amountPaid)}
//                           </span>
//                         </div>
//                         <CustomProgress value={course.progress} />
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };
















// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { format } from "date-fns";
// import { formatTime, formatCurrency, cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect, useMemo } from "react";
// import * as XLSX from "xlsx"; // Import the xlsx library

// interface EnrolledCourse {
//   courseTitle: string;
//   amountPaid: number;
//   progress: number;
// }

// interface UserDetails {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: EnrolledCourse[];
//   timeSpent: number;
//   totalSpent: number;
// }

// interface UserDetailsProps {
//   userDetails: UserDetails[];
//   className?: string;
// }

// const ITEMS_PER_PAGE = 5; // Define how many items per page for pagination

// export const UserDetails = ({ userDetails, className }: UserDetailsProps) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Memoize filtered users to avoid re-calculating on every render if searchQuery or userDetails haven't changed
//   const filteredUsers = useMemo(() => {
//     if (!userDetails) return []; // Handle case where userDetails might be undefined initially

//     if (searchQuery === "") {
//       return userDetails;
//     } else {
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       return userDetails.filter(
//         (user) =>
//           user.name.toLowerCase().includes(lowerCaseQuery) ||
//           user.email.toLowerCase().includes(lowerCaseQuery) ||
//           user.enrolledCourses.some((course) =>
//             course.courseTitle.toLowerCase().includes(lowerCaseQuery)
//           )
//       );
//     }
//   }, [searchQuery, userDetails]);

//   // Reset page to 1 when search query changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

//   // Calculate the users to display on the current page
//   const displayedUsers = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     return filteredUsers.slice(startIndex, endIndex);
//   }, [currentPage, filteredUsers]);

//   const handleDownloadExcel = () => {
//     const dataToExport = filteredUsers.map((user) => ({
//       ID: user.id,
//       Name: user.name,
//       Email: user.email,
//       "Courses Enrolled": user.coursesEnrolled,
//       "Last Login": format(new Date(user.lastLogin), "MMM d, yyyy h:mm a"),
//       "Enrollment Date": format(new Date(user.dateOfEnrollment), "MMM d, yyyy"),
//       "Student Level": user.studentLevel,
//       "Certificates Earned": user.certificatesEarned,
//       "Time Spent": formatTime(user.timeSpent),
//       "Total Spent": formatCurrency(user.totalSpent),
//       "Enrolled Courses": user.enrolledCourses
//         .map(
//           (course) =>
//             `${course.courseTitle} (${formatCurrency(course.amountPaid)}, ${
//               course.progress
//             }%)`
//         )
//         .join("; "), // Join multiple courses into a single string
//     }));

//     const ws = XLSX.utils.json_to_sheet(dataToExport);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "User Details");
//     XLSX.writeFile(wb, "user_details.xlsx");
//   };

//   const goToPage = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Custom progress bar with indicator color
//   const CustomProgress = ({
//     value,
//     className,
//   }: {
//     value: number;
//     className?: string;
//   }) => {
//     return (
//       <div
//         className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
//       >
//         <div
//           className={cn(
//             "h-full rounded-full",
//             value === 100 ? "bg-green-500" : "bg-blue-500"
//           )}
//           style={{ width: `${value}%` }}
//         />
//       </div>
//     );
//   };

//   const getPaginationButtons = () => {
//     const buttons = [];
//     const maxButtons = 5; // Maximum number of page buttons to show (e.g., 1, 2, 3, ..., 6)

//     if (totalPages <= maxButtons) {
//       for (let i = 1; i <= totalPages; i++) {
//         buttons.push(i);
//       }
//     } else {
//       // Logic for showing ellipsis
//       if (currentPage <= Math.floor(maxButtons / 2)) {
//         // First few pages
//         for (let i = 1; i <= maxButtons - 2; i++) {
//           buttons.push(i);
//         }
//         buttons.push("...");
//         buttons.push(totalPages);
//       } else if (currentPage > totalPages - Math.floor(maxButtons / 2)) {
//         // Last few pages
//         buttons.push(1);
//         buttons.push("...");
//         for (let i = totalPages - (maxButtons - 3); i <= totalPages; i++) {
//           buttons.push(i);
//         }
//       } else {
//         // Middle pages
//         buttons.push(1);
//         buttons.push("...");
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           buttons.push(i);
//         }
//         buttons.push("...");
//         buttons.push(totalPages);
//       }
//     }
//     return buttons;
//   };

//   return (
//     <Card className={className}>
//       <CardHeader>
//         <CardTitle className="text-md font-medium text-blue-600">
//           User Details
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-center mb-4">
//           <Button
//             onClick={handleDownloadExcel}
//             className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
//           >
//             Download Excel
//           </Button>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-600">Search:</span>
//             <Input
//               type="text"
//               placeholder=""
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//         <Table>
//           <TableHeader className="bg-gray-100">
//             <TableRow>
//               <TableHead className="font-semibold text-blue-700">User</TableHead>
//               <TableHead className="font-semibold text-blue-700">Email</TableHead>
//               <TableHead className="font-semibold text-blue-700">Enrollment Date</TableHead>
//               <TableHead className="font-semibold text-blue-700">Last Login</TableHead>
//               <TableHead className="font-semibold text-blue-700">Time Spent</TableHead>
//               <TableHead className="font-semibold text-blue-700">Level</TableHead>
//               <TableHead className="font-semibold text-blue-700">Certificates</TableHead>
//               <TableHead className="font-semibold text-blue-700">Total Spent</TableHead>
//               <TableHead className="font-semibold text-blue-700">Courses</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {displayedUsers.map((user) => (
//               <TableRow key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-8 w-8">
//                       {user.imageUrl ? (
//                         <AvatarImage src={user.imageUrl} alt={user.name} />
//                       ) : (
//                         <AvatarFallback>
//                           {user.name.charAt(0).toUpperCase()}
//                         </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <span className="text-sm font-medium text-gray-800">{user.name}</span>
//                   </div>

//                 </TableCell>
//                 <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
//                 <TableCell className="text-sm text-gray-600">
//                   {format(new Date(user.dateOfEnrollment), "MMM d, yyyy")}
//                 </TableCell>
//                 <TableCell className="text-sm text-gray-600">
//                   {format(new Date(user.lastLogin), "MMM d, yyyy h:mm a")}
//                 </TableCell>
//                 <TableCell className="text-sm text-gray-600">{formatTime(user.timeSpent)}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">Level {user.studentLevel}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="secondary" className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
//                     {user.certificatesEarned} Certificates
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-sm font-medium text-gray-800">{formatCurrency(user.totalSpent)}</TableCell>
//                 <TableCell>
//                   <div className="space-y-2">
//                     {user.enrolledCourses.map((course) => (
//                       <div key={course.courseTitle} className="text-sm">
//                         <div className="flex justify-between mb-1">
//                           <span className="truncate max-w-[180px] font-medium text-gray-700">
//                             {course.courseTitle}
//                           </span>
//                           <span className="text-muted-foreground text-gray-500 text-xs">
//                             {formatCurrency(course.amountPaid)}
//                           </span>
//                         </div>
//                         <CustomProgress value={course.progress} />
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {displayedUsers.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={9} className="text-center py-4 text-gray-500">
//                   {searchQuery ? "No users found matching your search." : "No user data available."}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         <div className="flex justify-between items-center mt-4 text-sm text-blue-600">
//             <span>Showing {displayedUsers.length} of {filteredUsers.length} entries</span>
//             <div className="flex space-x-1">
//                 <button
//                     onClick={prevPage}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 border border-gray-300 rounded-md text-blue-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     Previous
//                 </button>
//                 {getPaginationButtons().map((page, index) => (
//                     <button
//                         key={index}
//                         onClick={() => typeof page === 'number' && goToPage(page)}
//                         disabled={page === '...' || currentPage === page}
//                         className={cn(
//                             "px-3 py-1 border border-gray-300 rounded-md",
//                             currentPage === page ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-gray-100",
//                             page === '...' && "cursor-default border-transparent hover:bg-transparent"
//                         )}
//                     >
//                         {page}
//                     </button>
//                 ))}
//                 <button
//                     onClick={nextPage}
//                     disabled={currentPage === totalPages || totalPages === 0}
//                     className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };














// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { format } from "date-fns";
// import { formatTime, formatCurrency, cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect, useMemo } from "react";
// import * as XLSX from "xlsx";

// interface EnrolledCourse {
//   courseTitle: string;
//   amountPaid: number;
//   progress: number;
// }

// interface UserDetails {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: EnrolledCourse[];
//   timeSpent: number; // In minutes
//   totalSpent: number;
// }

// interface UserDetailsProps {
//   userDetails: UserDetails[];
//   className?: string;
// }

// const ITEMS_PER_PAGE = 5;

// export const UserDetails = ({ userDetails, className }: UserDetailsProps) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredUsers = useMemo(() => {
//     if (!userDetails) return [];

//     if (searchQuery === "") {
//       return userDetails;
//     } else {
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       return userDetails.filter(
//         (user) =>
//           user.name.toLowerCase().includes(lowerCaseQuery) ||
//           user.email.toLowerCase().includes(lowerCaseQuery) ||
//           user.enrolledCourses.some((course) =>
//             course.courseTitle.toLowerCase().includes(lowerCaseQuery)
//           )
//       );
//     }
//   }, [searchQuery, userDetails]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

//   const displayedUsers = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     return filteredUsers.slice(startIndex, endIndex);
//   }, [currentPage, filteredUsers]);

//   const handleDownloadExcel = () => {
//     const dataToExport = filteredUsers.map((user) => ({
//       ID: user.id,
//       Name: user.name,
//       Email: user.email,
//       "Courses Enrolled": user.coursesEnrolled,
//       "Last Login": format(new Date(user.lastLogin), "MMM d, yyyy h:mm a"),
//       "Enrollment Date": format(new Date(user.dateOfEnrollment), "MMM d, yyyy"),
//       "Student Level": user.studentLevel,
//       "Certificates Earned": user.certificatesEarned,
//       "Time Spent": formatTime(user.timeSpent * 60), // Convert minutes to seconds for formatTime
//       "Total Spent": formatCurrency(user.totalSpent),
//       "Enrolled Courses": user.enrolledCourses
//         .map((course) => course.courseTitle) // Only export course titles
//         .join("; "),
//     }));

//     const ws = XLSX.utils.json_to_sheet(dataToExport);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "User Details");
//     XLSX.writeFile(wb, "user_details.xlsx");
//   };

//   const goToPage = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const getPaginationButtons = () => {
//     const buttons = [];
//     const maxButtons = 5;

//     if (totalPages <= maxButtons) {
//       for (let i = 1; i <= totalPages; i++) {
//         buttons.push(i);
//       }
//     } else {
//       if (currentPage <= Math.floor(maxButtons / 2)) {
//         for (let i = 1; i <= maxButtons - 2; i++) {
//           buttons.push(i);
//         }
//         buttons.push("...");
//         buttons.push(totalPages);
//       } else if (currentPage > totalPages - Math.floor(maxButtons / 2)) {
//         buttons.push(1);
//         buttons.push("...");
//         for (let i = totalPages - (maxButtons - 3); i <= totalPages; i++) {
//           buttons.push(i);
//         }
//       } else {
//         buttons.push(1);
//         buttons.push("...");
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           buttons.push(i);
//         }
//         buttons.push("...");
//         buttons.push(totalPages);
//       }
//     }
//     return buttons;
//   };

//   return (
//     <Card className={className}>
//       <CardHeader>
//         <CardTitle className="text-md font-medium text-blue-600">
//           User Details
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-center mb-4">
//           <Button
//             onClick={handleDownloadExcel}
//             className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
//           >
//             Download Excel
//           </Button>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-600">Search:</span>
//             <Input
//               type="text"
//               placeholder=""
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//         <Table>
//           <TableHeader className="bg-gray-100">
//             <TableRow>
//               <TableHead className="font-semibold text-blue-700">User</TableHead>
//               <TableHead className="font-semibold text-blue-700">Email</TableHead>
//               <TableHead className="font-semibold text-blue-700">Enrollment Date</TableHead>
//               <TableHead className="font-semibold text-blue-700">Last Login</TableHead>
//               <TableHead className="font-semibold text-blue-700">Time Spent</TableHead>
//               <TableHead className="font-semibold text-blue-700">Level</TableHead>
//               <TableHead className="font-semibold text-blue-700">Certificates</TableHead>
//               <TableHead className="font-semibold text-blue-700">Total Spent</TableHead>
//               <TableHead className="font-semibold text-blue-700">Courses</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {displayedUsers.map((user) => (
//               <TableRow key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-8 w-8">
//                       {user.imageUrl ? (
//                         <AvatarImage src={user.imageUrl} alt={user.name} />
//                       ) : (
//                         <AvatarFallback>
//                           {user.name.charAt(0).toUpperCase()}
//                         </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <span className="text-sm font-medium text-gray-800">{user.name}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
//                 <TableCell className="text-sm text-gray-600">
//                   {format(new Date(user.dateOfEnrollment), "MMM d, yyyy")}
//                 </TableCell>
//                 <TableCell className="text-sm text-gray-600">
//                   {format(new Date(user.lastLogin), "MMM d, yyyy h:mm a")}
//                 </TableCell>
//                 <TableCell className="text-sm text-gray-600">
//                   {formatTime(user.timeSpent * 60)} {/* Convert minutes to seconds */}
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
//                     Level {user.studentLevel}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="secondary" className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
//                     {user.certificatesEarned} Certificates
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-sm font-medium text-gray-800">
//                   {formatCurrency(user.totalSpent)}
//                 </TableCell>
//                 <TableCell>
//                   <div className="space-y-2">
//                     {user.enrolledCourses.map((course) => (
//                       <div key={course.courseTitle} className="text-sm">
//                         <span className="font-medium text-gray-700">
//                           {course.courseTitle}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {displayedUsers.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={9} className="text-center py-4 text-gray-500">
//                   {searchQuery ? "No users found matching your search." : "No user data available."}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         <div className="flex justify-between items-center mt-4 text-sm text-blue-600">
//           <span>Showing {displayedUsers.length} of {filteredUsers.length} entries</span>
//           <div className="flex space-x-1">
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-gray-300 rounded-md text-blue-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             {getPaginationButtons().map((page, index) => (
//               <button
//                 key={index}
//                 onClick={() => typeof page === 'number' && goToPage(page)}
//                 disabled={page === '...' || currentPage === page}
//                 className={cn(
//                   "px-3 py-1 border border-gray-300 rounded-md",
//                   currentPage === page ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-gray-100",
//                   page === '...' && "cursor-default border-transparent hover:bg-transparent"
//                 )}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               onClick={nextPage}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };










"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { formatTime, formatCurrency, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";

interface EnrolledCourse {
  courseTitle: string;
  amountPaid: number;
  progress: number;
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  coursesEnrolled: number;
  lastLogin: Date;
  dateOfEnrollment: Date;
  studentLevel: number;
  certificatesEarned: number;
  enrolledCourses: EnrolledCourse[];
  timeSpent: number; // In minutes
  totalSpent: number;
}

interface UserDetailsProps {
  userDetails: UserDetails[];
  className?: string;
}

const ITEMS_PER_PAGE = 5;

export const UserDetails = ({ userDetails, className }: UserDetailsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    if (!userDetails) return [];

    if (searchQuery === "") {
      return userDetails;
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return userDetails.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          user.enrolledCourses.some((course) =>
            course.courseTitle.toLowerCase().includes(lowerCaseQuery)
          )
      );
    }
  }, [searchQuery, userDetails]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const displayedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [currentPage, filteredUsers]);

  const handleDownloadExcel = () => {
    const dataToExport = filteredUsers.map((user) => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      "Courses Enrolled": user.coursesEnrolled,
      "Last Login": format(new Date(user.lastLogin), "MMM d, yyyy h:mm a"),
      "Enrollment Date": format(new Date(user.dateOfEnrollment), "MMM d, yyyy"),
      "Student Level": user.studentLevel,
      "Certificates Earned": user.certificatesEarned,
      "Time Spent": formatTime(user.timeSpent * 60), // Convert minutes to seconds
      "Total Spent": formatCurrency(user.totalSpent),
      "Enrolled Courses": user.coursesEnrolled, // Export course count
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User Details");
    XLSX.writeFile(wb, "user_details.xlsx");
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= Math.floor(maxButtons / 2)) {
        for (let i = 1; i <= maxButtons - 2; i++) {
          buttons.push(i);
        }
        buttons.push("...");
        buttons.push(totalPages);
      } else if (currentPage > totalPages - Math.floor(maxButtons / 2)) {
        buttons.push(1);
        buttons.push("...");
        for (let i = totalPages - (maxButtons - 3); i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        buttons.push(1);
        buttons.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(i);
        }
        buttons.push("...");
        buttons.push(totalPages);
      }
    }
    return buttons;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-md font-medium text-blue-600">
          User Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={handleDownloadExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Download Excel
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Search:</span>
            <Input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-semibold text-blue-700">User</TableHead>
              <TableHead className="font-semibold text-blue-700">Email</TableHead>
              <TableHead className="font-semibold text-blue-700">Enrollment Date</TableHead>
              <TableHead className="font-semibold text-blue-700">Last Login</TableHead>
              <TableHead className="font-semibold text-blue-700">Time Spent</TableHead>
              <TableHead className="font-semibold text-blue-700">Level</TableHead>
              <TableHead className="font-semibold text-blue-700">Certificates</TableHead>
              <TableHead className="font-semibold text-blue-700">Total Spent</TableHead>
              <TableHead className="font-semibold text-blue-700">Courses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {user.imageUrl ? (
                        <AvatarImage src={user.imageUrl} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium text-gray-800">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {format(new Date(user.dateOfEnrollment), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {format(new Date(user.lastLogin), "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {formatTime(user.timeSpent * 60)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                    Level {user.studentLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    {user.certificatesEarned} Certificates
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-800">
                  {formatCurrency(user.totalSpent)}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-gray-700">
                    {user.coursesEnrolled}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {displayedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                  {searchQuery ? "No users found matching your search." : "No user data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4 text-sm text-blue-600">
          <span>Showing {displayedUsers.length} of {filteredUsers.length} entries</span>
          <div className="flex space-x-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-blue-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {getPaginationButtons().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && goToPage(page)}
                disabled={page === '...' || currentPage === page}
                className={cn(
                  "px-3 py-1 border border-gray-300 rounded-md",
                  currentPage === page ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-gray-100",
                  page === '...' && "cursor-default border-transparent hover:bg-transparent"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
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