// // File: liveclasses/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser, useAuth } from "@clerk/nextjs";
// import Link from "next/link";
// import { ArrowLeft, Video } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface LiveSession {
//   id: string;
//   title: string;
//   description?: string;
//   startTime: string;
//   endTime: string;
//   meetingUrl?: string;
//   isPublished: boolean;
// }

// export default function LiveSessionsPage({
//   params,
// }: {
//   params: { courseId: string };
// }) {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const router = useRouter();
//   const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) {
//         setError("You must be logged in to access this page.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const token = await getToken();

//         // Check if user has purchased the course
//         const purchaseResponse = await fetch(
//           `/api/purchases/coursecheck?userId=${user.id}&courseId=${params.courseId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!purchaseResponse.ok) {
//           setIsEnrolled(false);
//           setError("You have not purchased this course.");
//           setLoading(false);
//           return;
//         }

//         const purchaseData = await purchaseResponse.json();
//         setIsEnrolled(purchaseData.length > 0);

//         if (!purchaseData.length) {
//           setError("You have not purchased this course.");
//           setLoading(false);
//           return;
//         }

//         // Fetch live sessions for the course
//         const sessionsResponse = await fetch(
//           `/api/courses/${params.courseId}/liveclasses`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!sessionsResponse.ok) {
//           throw new Error("Failed to fetch live sessions");
//         }

//         const sessionsData = await sessionsResponse.json();
//         setLiveSessions(sessionsData);
//       } catch (err) {
//         console.error("[FETCH_LIVE_SESSIONS]", err);
//         setError("An error occurred while loading live sessions.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id, getToken, params.courseId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   if (error || !isEnrolled) {
//     return (
//       <div className="min-h-screen bg-[#F5F7FA] p-6">
//         <div className="max-w-7xl mx-auto">
//           <Link
//             href={`/`}
//             className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//             Back to course
//           </Link>
//           <Alert variant="destructive" className="mt-6">
//             <AlertDescription>
//               {error || "You must purchase this course to access live sessions."}
//             </AlertDescription>
//           </Alert>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       <div className="max-w-7xl mx-auto">
//         <Link
//           href={`/courses/${params.courseId}`}
//           className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//           Back to course
//         </Link>
//         <Card className="bg-white rounded-xl shadow-sm mt-6">
//           <CardHeader className="p-4">
//             <CardTitle className="text-lg font-semibold text-[#1F2A44]">
//               Live Sessions
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 space-y-4">
//             {liveSessions.length > 0 ? (
//               liveSessions
//                 .filter((session) => session.isPublished)
//                 .map((session) => (
//                   <div
//                     key={session.id}
//                     className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
//                         <Video className="h-6 w-6" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-[#1F2A44]">
//                           {session.title}
//                         </p>
//                         <p className="text-xs text-[#6B7280]">
//                           {session.description || "No description available"}
//                         </p>
//                         <p className="text-xs text-[#6B7280]">
//                           {new Date(session.startTime).toLocaleString()} -{" "}
//                           {new Date(session.endTime).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       {session.meetingUrl ? (
//                         <a
//                           href={session.meetingUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                             Join
//                           </button>
//                         </a>
//                       ) : (
//                         <p className="text-xs text-[#6B7280]">
//                           Meeting URL not available
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))
//             ) : (
//               <p className="text-sm text-[#6B7280]">
//                 No live sessions available for this course.
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



// // File: app/courses/[courseId]/liveclasses/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser, useAuth } from "@clerk/nextjs";
// import Link from "next/link";
// import { ArrowLeft, Video } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface LiveSession {
//   id: string;
//   title: string;
//   description?: string;
//   startTime: string;
//   endTime: string;
//   meetingUrl?: string;
//   isPublished: boolean;
// }

// export default function LiveSessionsPage({
//   params,
// }: {
//   params: { courseId: string };
// }) {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const router = useRouter();
//   const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   console.log("LiveClasses Params:", params); // Debug log

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) {
//         setError("You must be logged in to access this page.");
//         setLoading(false);
//         return;
//       }

//       if (!params.courseId || params.courseId.includes(":courseId")) {
//         setError("Invalid course ID.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const token = await getToken();

//         const purchaseResponse = await fetch(
//           `/api/purchases/coursecheck?userId=${user.id}&courseId=${params.courseId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!purchaseResponse.ok) {
//           setIsEnrolled(false);
//           setError("You have not purchased this course.");
//           setLoading(false);
//           return;
//         }

//         const purchaseData = await purchaseResponse.json();
//         setIsEnrolled(purchaseData.length > 0);

//         if (!purchaseData.length) {
//           setError("You have not purchased this course.");
//           setLoading(false);
//           return;
//         }

//         const sessionsResponse = await fetch(
//           `/api/courses/${params.courseId}/live-sessions`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!sessionsResponse.ok) {
//           throw new Error("Failed to fetch live sessions");
//         }

//         const sessionsData = await sessionsResponse.json();
//         setLiveSessions(sessionsData);
//       } catch (err) {
//         console.error("[FETCH_LIVE_SESSIONS]", err);
//         setError("An error occurred while loading live sessions.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id, getToken, params.courseId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   if (error || !isEnrolled) {
//     return (
//       <div className="min-h-screen bg-[#F5F7FA] p-6">
//         <div className="max-w-7xl mx-auto">
//           <Link
//             href={`/courses/${params.courseId || ""}`}
//             className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//             Back to course
//           </Link>
//           <Alert variant="destructive" className="mt-6">
//             <AlertDescription>
//               {error || "You must purchase this course to access live sessions."}
//             </AlertDescription>
//           </Alert>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       <div className="max-w-7xl mx-auto">
//         <Link
//           href={`/courses/${params.courseId}`}
//           className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//           Back to course
//         </Link>
//         <Card className="bg-white rounded-xl shadow-sm mt-6">
//           <CardHeader className="p-4">
//             <CardTitle className="text-lg font-semibold text-[#1F2A44]">
//               Live Sessions
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 space-y-4">
//             {liveSessions.length > 0 ? (
//               liveSessions
//                 .filter((session) => session.isPublished)
//                 .map((session) => (
//                   <div
//                     key={session.id}
//                     className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
//                         <Video className="h-6 w-6" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-[#1F2A44]">
//                           {session.title}
//                         </p>
//                         <p className="text-xs text-[#6B7280]">
//                           {session.description || "No description available"}
//                         </p>
//                         <p className="text-xs text-[#6B7280]">
//                           {new Date(session.startTime).toLocaleString()} -{" "}
//                           {new Date(session.endTime).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       {session.meetingUrl ? (
//                         <a
//                           href={session.meetingUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                             Join
//                           </button>
//                         </a>
//                       ) : (
//                         <p className="text-xs text-[#6B7280]">
//                           Meeting URL not available
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))
//             ) : (
//               <p className="text-sm text-[#6B7280]">
//                 No live sessions available for this course.
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }










// // /app/(course)/courses/[courseId]/liveclasses/page.tsx

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getLiveSessions } from "@/actions/get-live-sessions";
// import { File, Clock, Video, Lock } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// // Helper function to format dates
// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// };

// // Component for a single Live Session Card
// const LiveSessionCard = ({ session, hasAccess }: { session: any, hasAccess: boolean }) => {
//   const now = new Date();
//   const startTime = new Date(session.startTime);
//   const endTime = new Date(session.endTime);

//   let status: "UPCOMING" | "LIVE" | "FINISHED" = "UPCOMING";
//   let statusColor: "default" | "destructive" | "secondary" = "default";

//   if (now >= startTime && now <= endTime) {
//     status = "LIVE";
//     statusColor = "destructive";
//   } else if (now > endTime) {
//     status = "FINISHED";
//     statusColor = "secondary";
//   }

//   const canJoin = hasAccess && status === "LIVE" && session.meetingUrl;

//   return (
//     <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{session.title}</h3>
//           <Badge variant={statusColor} className="text-sm">{status}</Badge>
//         </div>
//         <p className="text-slate-600 dark:text-slate-400 mb-4">{session.description}</p>
        
//         <div className="flex items-center text-sm text-slate-500 dark:text-slate-300 mb-4">
//           <Clock className="h-4 w-4 mr-2" />
//           <span>{formatDate(startTime)} - {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(endTime)}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           {hasAccess ? (
//             <Button asChild disabled={!canJoin}>
//               <Link href={canJoin ? session.meetingUrl! : "#"} target="_blank">
//                 <Video className="h-4 w-4 mr-2" />
//                 Join Live Session
//               </Link>
//             </Button>
//           ) : (
//             <div className="flex items-center text-yellow-600">
//               <Lock className="h-4 w-4 mr-2" />
//               <span>Purchase course to join</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Page Component
// const LiveClassesPage = async ({ params }: { params: { courseId?: string } }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   // Check if courseId is provided
//   if (!params.courseId) {
//     return (
//       <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Live Classes</h1>
//             <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
//               Please select a valid course to view live sessions.
//             </p>
//           </div>
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md flex items-center">
//             <Lock className="h-8 w-8 mr-4 text-yellow-600" />
//             <div>
//               <h2 className="text-xl font-bold">Invalid Course</h2>
//               <p>Please select a course from the courses page to view its live sessions.</p>
//               <Button asChild className="mt-4">
//                 <Link href="/courses">Go to Courses</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sessions = await getLiveSessions({
//     userId,
//     courseId: params.courseId,
//   });
  
//   // Check access from the first session (it's the same for all)
//   const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

//   return (
//     <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Live Classes</h1>
//           <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {!hasAccess && (
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md flex items-center">
//             <Lock className="h-8 w-8 mr-4 text-yellow-600" />
//             <div>
//               <h2 className="text-xl font-bold">Access Denied</h2>
//               <p>You must purchase this course to access the live classes. Please enroll in the course to join these exclusive sessions.</p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-md">
//             <File className="mx-auto h-12 w-12 text-slate-400" />
//             <h3 className="mt-4 text-lg font-medium text-slate-800 dark:text-white">No Live Sessions Scheduled</h3>
//             <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
//               There are currently no live sessions available for this course. Please check back later.
//             </p>
//           </div>
//         )}

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
//           {sessions.map((session) => (
//             <LiveSessionCard key={session.id} session={session} hasAccess={hasAccess} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveClassesPage;





// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getLiveSessions } from "@/actions/get-live-sessions";
// import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, Info } from "lucide-react"; // Added new icons
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Assuming you have shadcn/ui Card component
// import { Separator } from "@/components/ui/separator"; // Assuming you have shadcn/ui Separator component

// // Helper function to format dates
// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// };

// // Component for a single Live Session Card
// const LiveSessionCard = ({ session, hasAccess }: { session: any, hasAccess: boolean }) => {
//   const now = new Date();
//   const startTime = new Date(session.startTime);
//   const endTime = new Date(session.endTime);

//   let status: "UPCOMING" | "LIVE" | "FINISHED" = "UPCOMING";
//   let statusColor: "default" | "destructive" | "secondary" | "success" = "default"; // Added 'success' variant

//   if (now >= startTime && now <= endTime) {
//     status = "LIVE";
//     statusColor = "destructive";
//   } else if (now > endTime) {
//     status = "FINISHED";
//     statusColor = "secondary";
//   } else {
//     statusColor = "success"; // For Upcoming
//   }

//   const canJoin = hasAccess && status === "LIVE" && session.meetingUrl;
//   const numberOfQuizzes = session.liveclassquizzes ? session.liveclassquizzes.length : 0;
//   const hasAttachments = session.attachments && session.attachments.length > 0;

//   return (
//     <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
//       <CardHeader className="pb-4">
//         <div className="flex justify-between items-start mb-2">
//           <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
//             {session.title}
//           </CardTitle>
//           <Badge variant={statusColor} className="text-sm px-3 py-1 rounded-full animate-pulse-on-live">
//             {status}
//           </Badge>
//         </div>
//         <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
//           {session.description}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex-grow pt-4">
//         <div className="space-y-3 mb-4">
//           <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//             <CalendarCheck className="h-4 w-4 mr-2 text-blue-500" />
//             <span>Date: {formatDate(startTime).split(',')[0]}</span>
//           </div>
//           <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//             <Clock className="h-4 w-4 mr-2 text-purple-500" />
//             <span>Time: {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(startTime)} - {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(endTime)}</span>
//           </div>
//           {numberOfQuizzes > 0 && (
//             <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//               <Layers className="h-4 w-4 mr-2 text-green-500" />
//               <span>Quizzes: {numberOfQuizzes}</span>
//             </div>
//           )}
//         </div>

//         {hasAttachments && (
//           <>
//             <Separator className="my-4" />
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Resources</h4>
//               <ul className="space-y-2">
//                 {session.attachments.map((attachment: any) => (
//                   <li key={attachment.id} className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
//                     <Download className="h-4 w-4 mr-2" />
//                     <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="truncate">
//                       {attachment.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </CardContent>
//       <CardFooter className="pt-4 border-t border-slate-200 dark:border-slate-700">
//         <div className="flex justify-between items-center w-full">
//           {hasAccess ? (
//             <Button asChild disabled={!canJoin} className="w-full sm:w-auto">
//               <Link href={canJoin ? session.meetingUrl! : "#"} target="_blank">
//                 <Video className="h-4 w-4 mr-2" />
//                 {status === "LIVE" ? "Join Now" : "View Details"}
//               </Link>
//             </Button>
//           ) : (
//             <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
//               <Lock className="h-4 w-4 mr-2" />
//               <span>Purchase course to join</span>
//             </div>
//           )}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// // Main Page Component
// const LiveClassesPage = async ({ params }: { params: { courseId?: string } }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   // Check if courseId is provided
//   if (!params.courseId) {
//     return (
//       <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-10 text-center">
//             <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h1>
//             <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
//               Explore dynamic live classes and interactive learning experiences.
//             </p>
//           </div>
//           <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//             <Info className="h-12 w-12 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Course Not Selected</h2>
//               <p className="text-lg mb-6">
//                 It looks like you haven't selected a specific course. Please navigate to the courses page and choose a course to view its exclusive live sessions.
//               </p>
//               <Button asChild className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
//                 <Link href="/courses">Browse Courses</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sessions = await getLiveSessions({
//     userId,
//     courseId: params.courseId,
//   });

//   // Check access from the first session (it's the same for all)
//   const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

//   return (
//     <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10 text-center">
//           <h4 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h4>
//           <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {!hasAccess && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-500 text-red-800 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Lock className="h-12 w-12 text-red-600 dark:text-red-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
//               <p className="text-lg">
//                 You must purchase this course to unlock access to these exclusive live classes. Enroll now to join the community and enhance your learning journey!
//               </p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800">
//             <File className="mx-auto h-16 w-16 text-slate-400 mb-6" />
//             <h3 className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">No Live Sessions Scheduled</h3>
//             <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
//               We're excited to bring you more live content soon! There are currently no live sessions available for this course. Please check back later for updates.
//             </p>
//           </div>
//         )}

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
//           {sessions.map((session) => (
//             <LiveSessionCard key={session.id} session={session} hasAccess={hasAccess} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveClassesPage;













// app/courses/[courseId]/live-sessions.tsx
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getLiveSessions } from "@/actions/get-live-sessions";
// import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, Info } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// // Helper function to format dates
// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// };

// // Component for a single Live Session Card
// const LiveSessionCard = ({ session, hasAccess }: { session: any, hasAccess: boolean }) => {
//   const now = new Date();
//   const startTime = new Date(session.startTime);
//   const endTime = new Date(session.endTime);

//   let status: "UPCOMING" | "LIVE" | "FINISHED" = "UPCOMING";
//   let statusColor: "default" | "destructive" | "secondary" | "success" = "default";

//   if (now >= startTime && now <= endTime) {
//     status = "LIVE";
//     statusColor = "destructive";
//   } else if (now > endTime) {
//     status = "FINISHED";
//     statusColor = "secondary";
//   } else {
//     statusColor = "success";
//   }

//   const canJoin = hasAccess && status === "LIVE" && session.meetingUrl;
//   const numberOfQuizzes = session.liveclassquizzes ? session.liveclassquizzes.length : 0;
//   const hasAttachments = session.attachments && session.attachments.length > 0;

//   return (
//     <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
//       <CardHeader className="pb-4">
//         <div className="flex justify-between items-start mb-2">
//           <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
//             {session.title}
//           </CardTitle>
//           <Badge variant={statusColor} className="text-sm px-3 py-1 rounded-full animate-pulse-on-live">
//             {status}
//           </Badge>
//         </div>
//         <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
//           {session.description}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex-grow pt-4">
//         <div className="space-y-3 mb-4">
//           <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//             <CalendarCheck className="h-4 w-4 mr-2 text-blue-500" />
//             <span>Date: {formatDate(startTime).split(',')[0]}</span>
//           </div>
//           <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//             <Clock className="h-4 w-4 mr-2 text-purple-500" />
//             <span>
//               Time: {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(startTime)} -{" "}
//               {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(endTime)}
//             </span>
//           </div>
//           {numberOfQuizzes > 0 && (
//             <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//               <Layers className="h-4 w-4 mr-2 text-green-500" />
//               <span>Quizzes: {numberOfQuizzes}</span>
//             </div>
//           )}
//         </div>

//         {hasAttachments && (
//           <>
//             <Separator className="my-4" />
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Resources</h4>
//               <ul className="space-y-2">
//                 {session.attachments.map((attachment: any) => (
//                   <li key={attachment.id}  
//                   className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
//                     <Download className="h-4 w-4 mr-2" />
//                     <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="truncate">
//                       {attachment.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </CardContent>
//       <CardFooter className="pt-4 border-t border-slate-200 dark:border-slate-700">
//         <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
//           {hasAccess ? (
//             <Button asChild disabled={!canJoin} className="w-full sm:w-auto">
//               <Link href={canJoin ? session.meetingUrl! : "#"} target="_blank">
//                 <Video className="h-4 w-4 mr-2" />
//                 {status === "LIVE" ? "Join Now" : "View Details"}
//               </Link>
//             </Button>
//           ) : (
//             <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
//               <Lock className="h-4 w-4 mr-2" />
//               <span>Purchase course to join</span>
//             </div>
//           )}
//           {hasAccess && numberOfQuizzes > 0 && (
//             <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
//                <Link href={`/courses/${session.courseId}/liveclasses/${session.id}/quiz`}>
//                 <Layers className="h-4 w-4 mr-2" />
//                 Attempt Quiz
//               </Link>
//             </Button>

//           )}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// // Main Page Component
// const LiveClassesPage = async ({ params }: { params: { courseId?: string } }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   // Check if courseId is provided
//   if (!params.courseId) {
//     return (
//       <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-10 text-center">
//             <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h1>
//             <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
//               Explore dynamic live classes and interactive learning experiences.
//             </p>
//           </div>
//           <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//             <Info className="h-12 w-12 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Course Not Selected</h2>
//               <p className="text-lg mb-6">
//                 It looks like you haven't selected a specific course. Please navigate to the courses page and choose a course to view its exclusive live sessions.
//               </p>
//               <Button asChild className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
//                 <Link href="/courses">Browse Courses</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sessions = await getLiveSessions({
//     userId,
//     courseId: params.courseId,
//   });

//   // Check access from the first session (it's the same for all)
//   const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

//   return (
//     <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10 text-center">
//           <h4 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h4>
//           <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {!hasAccess && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-500 text-red-800 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Lock className="h-12 w-12 text-red-600 dark:text-red-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
//               <p className="text-lg">
//                 You must purchase this course to unlock access to these exclusive live classes. Enroll now to join the community and enhance your learning journey!
//               </p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800">
//             <File className="mx-auto h-16 w-16 text-slate-400 mb-6" />
//             <h3 className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">No Live Sessions Scheduled</h3>
//             <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
//               We're excited to bring you more live content soon! There are currently no live sessions available for this course. Please check back later for updates.
//             </p>
//           </div>
//         )}

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
//           {sessions.map((session) => (
//             <LiveSessionCard key={session.id} session={session} hasAccess={hasAccess} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveClassesPage;





// app/courses/[courseId]/live-sessions.tsx
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getLiveSessions } from "@/actions/get-live-sessions";
// import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, Info } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// // Helper function to format dates
// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// };

// // Component for a single Live Session Card
// const LiveSessionCard = ({ session, hasAccess }: { session: any, hasAccess: boolean }) => {
//   const now = new Date();
//   const startTime = new Date(session.startTime);
//   const endTime = new Date(session.endTime);

//   let status: "UPCOMING" | "LIVE" | "FINISHED" = "UPCOMING";
//   let statusColor: "default" | "destructive" | "secondary" | "success" = "default";

//   if (now >= startTime && now <= endTime) {
//     status = "LIVE";
//     statusColor = "destructive";
//   } else if (now > endTime) {
//     status = "FINISHED";
//     statusColor = "secondary";
//   } else {
//     statusColor = "success";
//   }

//   const canJoin = hasAccess && status === "LIVE" && session.meetingUrl;
//   const numberOfQuizzes = session.liveclassquizzes ? session.liveclassquizzes.length : 0;
//   const hasAttachments = session.attachments && session.attachments.length > 0;

//   return (
//     <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
//       <CardHeader className="pb-4">
//         <div className="flex justify-between items-start mb-2">
//           <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
//             {session.title}
//           </CardTitle>
//           <Badge variant={statusColor} className="text-sm px-3 py-1 rounded-full animate-pulse-on-live">
//             {status}
//           </Badge>
//         </div>
//         <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
//           {session.description}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex-grow pt-4">
//         <div className="space-y-3 mb-4">
//           <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//             <CalendarCheck className="h-4 w-4 mr-2 text-blue-500" />
//             <span>Date: {formatDate(startTime).split(',')[0]}</span>
//           </div>
//           <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//             <Clock className="h-4 w-4 mr-2 text-purple-500" />
//             <span>
//               Time: {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(startTime)} -{" "}
//               {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(endTime)}
//             </span>
//           </div>
//           {numberOfQuizzes > 0 && (
//             <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
//               <Layers className="h-4 w-4 mr-2 text-green-500" />
//               <span>Quizzes: {numberOfQuizzes}</span>
//             </div>
//           )}
//         </div>

//         {hasAttachments && (
//           <>
//             <Separator className="my-4" />
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Resources</h4>
//               <ul className="space-y-2">
//                 {session.attachments.map((attachment: any) => (
//                   <li key={attachment.id} className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
//                     <Download className="h-4 w-4 mr-2" />
//                     <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="truncate">
//                       {attachment.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </CardContent>
//       <CardFooter className="pt-4 border-t border-slate-200 dark:border-slate-700">
//         <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
//           {hasAccess ? (
//             <Button asChild disabled={!canJoin} className="w-full sm:w-auto">
//               <Link href={canJoin ? session.meetingUrl! : "#"} target="_blank">
//                 <Video className="h-4 w-4 mr-2" />
//                 {status === "LIVE" ? "Join Now" : "View Details"}
//               </Link>
//             </Button>
//           ) : (
//             <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
//               <Lock className="h-4 w-4 mr-2" />
//               <span>Purchase course to join</span>
//             </div>
//           )}
//           {hasAccess && numberOfQuizzes > 0 && (
//             <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
//               <Link href={`/courses/${session.courseId}/liveclasses/${session.id}/quiz`}>
//                 <Layers className="h-4 w-4 mr-2" />
//                 Attempt Quiz
//               </Link>
//             </Button>
//           )}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// // Main Page Component
// const LiveClassesPage = async ({ params }: { params: { courseId?: string } }) => {
//   const { userId } = auth();

//   if (!userId) {
//     console.log("[LIVECLASSES_PAGE] Redirecting to /: No userId");
//     return redirect("/");
//   }

//   console.log("[LIVECLASSES_PAGE] Rendering for userId: ${userId}, CourseId: ${params.courseId}");

//   if (!params.courseId) {
//     return (
//       <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-10 text-center">
//             <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h1>
//             <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
//               Explore dynamic live classes and interactive learning experiences.
//             </p>
//           </div>
//           <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
//             <Info className="h-12 w-12 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Course Not Selected</h2>
//               <p className="text-lg mb-6">
//                 It looks like you haven't selected a specific course. Please navigate to the courses page and choose a course to view its exclusive live sessions.
//               </p>
//               <Button asChild className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
//                 <Link href="/courses">Browse Courses</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sessions = await getLiveSessions({
//     userId,
//     courseId: params.courseId,
//   });

//   const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

//   return (
//     <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10 text-center">
//           <h4 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h4>
//           <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {!hasAccess && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-500 text-red-800 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Lock className="h-12 w-12 text-red-600 dark:text-red-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
//               <p className="text-lg">
//                 You must purchase this course to unlock access to these exclusive live classes. Enroll now to join the community and enhance your learning journey!
//               </p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800">
//             <File className="mx-auto h-16 w-16 text-slate-400 mb-6" />
//             <h3 className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">No Live Sessions Scheduled</h3>
//             <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
//               We're excited to bring you more live content soon! There are currently no live sessions available for this course. Please check back later for updates.
//             </p>
//           </div>
//         )}

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
//           {sessions.map((session) => (
//             <LiveSessionCard key={session.id} session={session} hasAccess={hasAccess} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveClassesPage;






import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLiveSessions } from "@/actions/get-live-sessions";
import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Helper function to format dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};

// Component for a single Live Session Card
const LiveSessionCard = ({ session, hasAccess }: { session: any, hasAccess: boolean }) => {
  const now = new Date();
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);

  let status: "UPCOMING" | "LIVE" | "FINISHED" = "UPCOMING";
  let statusColor: "default" | "destructive" | "secondary" | "success" = "default";

  if (now >= startTime && now <= endTime) {
    status = "LIVE";
    statusColor = "destructive";
  } else if (now > endTime) {
    status = "FINISHED";
    statusColor = "secondary";
  } else {
    statusColor = "success";
  }

  const canJoin = hasAccess && status === "LIVE" && session.meetingUrl;
  const numberOfQuizzes = session.liveclassquizzes ? session.liveclassquizzes.length : 0;
  const hasAttachments = session.attachments && session.attachments.length > 0;

  // Log session data for debugging
  console.log("[LIVE_SESSION_CARD] Session data:", {
    id: session.id,
    courseId: session.courseId,
    numberOfQuizzes,
    hasAccess,
    status,
  });

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {session.title}
          </CardTitle>
          <Badge variant={statusColor} className="text-sm px-3 py-1 rounded-full animate-pulse-on-live">
            {status}
          </Badge>
        </div>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
          {session.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
            <CalendarCheck className="h-4 w-4 mr-2 text-blue-500" />
            <span>Date: {formatDate(startTime).split(',')[0]}</span>
          </div>
          <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            <span>
              Time: {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(startTime)} -{" "}
              {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(endTime)}
            </span>
          </div>
          {numberOfQuizzes > 0 && (
            <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
              <Layers className="h-4 w-4 mr-2 text-green-500" />
              <span>Quizzes: {numberOfQuizzes}</span>
            </div>
          )}
        </div>

        {hasAttachments && (
          <>
            <Separator className="my-4" />
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                {session.attachments.map((attachment: any) => (
                  <li key={attachment.id} className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    <Download className="h-4 w-4 mr-2" />
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="truncate">
                      {attachment.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
          {hasAccess ? (
            <Button asChild disabled={!canJoin} className="w-full sm:w-auto">
              <Link href={canJoin ? session.meetingUrl! : "#"} target="_blank">
                <Video className="h-4 w-4 mr-2" />
                {status === "LIVE" ? "Join Now" : "View Details"}
              </Link>
            </Button>
          ) : (
            <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
              <Lock className="h-4 w-4 mr-2" />
              <span>Purchase course to join</span>
            </div>
          )}
          {hasAccess && numberOfQuizzes > 0 && (
            <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
              <Link href={`/courses/${session.courseId}/liveclasses/${session.id}/quiz`}>
                <Layers className="h-4 w-4 mr-2" />
                Attempt Quiz
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

// Main Page Component
const LiveClassesPage = async ({ params }: { params: { courseId?: string } }) => {
  const { userId } = auth();

  if (!userId) {
    console.log("[LIVECLASSES_PAGE] Redirecting to /: No userId");
    return redirect("/");
  }

  console.log(`[LIVECLASSES_PAGE] Rendering for userId: ${userId}, CourseId: ${params.courseId}`);

  if (!params.courseId) {
    return (
      <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
              Explore dynamic live classes and interactive learning experiences.
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <Info className="h-12 w-12 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-3xl font-bold mb-3">Course Not Selected</h2>
              <p className="text-lg mb-6">
                It looks like you haven't selected a specific course. Please navigate to the courses page and choose a course to view its exclusive live sessions.
              </p>
              <Button asChild className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sessions = await getLiveSessions({
    userId,
    courseId: params.courseId,
  });

  const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
            Join live sessions with instructors, ask questions, and learn with your peers.
          </p>
        </div>

        {!hasAccess && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
            <Lock className="h-12 w-12 text-red-500 dark:text-red-400 flex-shrink-0" />
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
              <p className="text-lg">
                You must purchase this course to access these exclusive live sessions. Enroll now to join the community and enhance your learning journey!
              </p>
            </div>
          </div>
        )}

        {hasAccess && sessions.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-gray-800">
            <File className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-200 mb-6" />
            <h3 className="mt-4 text-3xl font-bold text-slate-600 dark:text-white">No Live Sessions Available</h3>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              We're excited to bring you more live content soon! There are currently no live sessions available for this course.
            </p>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {sessions.map((session) => (
            <LiveSessionCard key={session.id} session={session} hasAccess={hasAccess} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveClassesPage;