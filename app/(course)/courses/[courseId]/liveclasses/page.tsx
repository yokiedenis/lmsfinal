 
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

//   // Log session data for debugging
//   console.log("[LIVE_SESSION_CARD] Session data:", {
//     id: session.id,
//     courseId: session.courseId,
//     numberOfQuizzes,
//     hasAccess,
//     status,
//   });

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

//   console.log(`[LIVECLASSES_PAGE] Rendering for userId: ${userId}, CourseId: ${params.courseId}`);

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
//           <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {!hasAccess && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Lock className="h-12 w-12 text-red-500 dark:text-red-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
//               <p className="text-lg">
//                 You must purchase this course to access these exclusive live sessions. Enroll now to join the community and enhance your learning journey!
//               </p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-gray-800">
//             <File className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-200 mb-6" />
//             <h3 className="mt-4 text-3xl font-bold text-slate-600 dark:text-white">No Live Sessions Available</h3>
//             <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
//               We're excited to bring you more live content soon! There are currently no live sessions available for this course.
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
// import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, Info, ExternalLink } from "lucide-react";
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
//   const hasGoogleFormQuiz = hasAccess && session.googleFormQuizUrl; // Check if Google Form quiz URL exists

//   // Log session data for debugging
//   console.log("[LIVE_SESSION_CARD] Session data:", {
//     id: session.id,
//     courseId: session.courseId,
//     numberOfQuizzes,
//     hasAccess,
//     status,
//     hasGoogleFormQuiz,
//   });

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
//           {hasGoogleFormQuiz && (
//             <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
//               <Link href={session.googleFormQuizUrl} target="_blank" rel="noopener noreferrer">
//                 <ExternalLink className="h-4 w-4 mr-2" />
//                 Take Google Forms Quiz
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

//   console.log(`[LIVECLASSES_PAGE] Rendering for userId: ${userId}, CourseId: ${params.courseId}`);

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
//           <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {!hasAccess && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Lock className="h-12 w-12 text-red-500 dark:text-red-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
//               <p className="text-lg">
//                 You must purchase this course to access these exclusive live sessions. Enroll now to join the community and enhance your learning journey!
//               </p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-gray-800">
//             <File className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-200 mb-6" />
//             <h3 className="mt-4 text-3xl font-bold text-slate-600 dark:text-white">No Live Sessions Available</h3>
//             <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
//               We're excited to bring you more live content soon! There are currently no live sessions available for this course.
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




// // app/courses/[courseId]/liveclasses/page.tsx
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getLiveSessions } from "@/actions/get-live-sessions";
// import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, Info, ExternalLink } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { db } from "@/lib/db";

// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// };

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
//   const hasGoogleFormQuiz = hasAccess && session.googleFormQuizUrl;

//   console.log("[LIVE_SESSION_CARD] Session data:", {
//     id: session.id,
//     courseId: session.courseId,
//     courseTitle: session.courseTitle,
//     numberOfQuizzes,
//     hasAccess,
//     status,
//     hasGoogleFormQuiz,
//   });

//   return (
//     <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
//       <CardHeader className="pb-4">
//         <div className="flex justify-between items-start mb-2">
//           <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
//             {session.title} ({session.courseTitle})
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
//           {hasGoogleFormQuiz && (
//             <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
//               <Link href={session.googleFormQuizUrl} target="_blank" rel="noopener noreferrer">
//                 <ExternalLink className="h-4 w-4 mr-2" />
//                 Take Google Forms Quiz
//               </Link>
//             </Button>
//           )}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// const LiveClassesPage = async ({ params }: { params: { courseId: string } }) => {
//   const { userId } = auth();

//   if (!userId) {
//     console.log("[LIVECLASSES_PAGE] Redirecting to /: No userId");
//     return redirect("/");
//   }

//   console.log(`[LIVECLASSES_PAGE] Rendering for userId: ${userId}, CourseId: ${params.courseId}`);

//   // Check if course exists
//   const course = await db.course.findUnique({
//     where: { id: params.courseId },
//   });

//   let sessions = [];
//   let courseNotFound = false;

//   if (!course) {
//     console.log(`[LIVECLASSES_PAGE] Course not found for ID: ${params.courseId}, fetching all purchased sessions`);
//     courseNotFound = true;
//     // Fetch sessions for all purchased courses
//     sessions = await getLiveSessions({ userId });
//   } else {
//     sessions = await getLiveSessions({ userId, courseId: params.courseId });
//   }

//   const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

//   return (
//     <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10 text-center">
//           <h4 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Live Sessions</h4>
//           <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
//             Join live sessions with instructors, ask questions, and learn with your peers.
//           </p>
//         </div>

//         {courseNotFound && (
//           <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Info className="h-12 w-12 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Course Not Found</h2>
//               <p className="text-lg mb-6">
//                 The requested course does not exist. Below are live sessions from other courses you have purchased.
//               </p>
//               <Button asChild className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white">
//                 <Link href="/courses">Browse Courses</Link>
//               </Button>
//             </div>
//           </div>
//         )}

//         {!hasAccess && !courseNotFound && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
//             <Lock className="h-12 w-12 text-red-500 dark:text-red-400 flex-shrink-0" />
//             <div className="text-center md:text-left flex-grow">
//               <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
//               <p className="text-lg">
//                 You must purchase this course to access these exclusive live sessions. Enroll now to join the community!
//               </p>
//             </div>
//           </div>
//         )}

//         {hasAccess && sessions.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-gray-800">
//             <File className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-200 mb-6" />
//             <h3 className="mt-4 text-3xl font-bold text-slate-600 dark:text-white">No Live Sessions Available</h3>
//             <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
//               We're excited to bring you more live content soon! No live sessions are available for your purchased courses.
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








// app/liveclasses/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLiveSessions } from "@/actions/get-live-sessions";
import { File, Clock, Video, Lock, Layers, Download, CalendarCheck, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};

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
  const hasGoogleFormQuiz = hasAccess && session.googleFormQuizUrl;

  console.log("[LIVE_SESSION_CARD] Session data:", {
    id: session.id,
    courseId: session.courseId,
    courseTitle: session.courseTitle,
    numberOfQuizzes,
    hasAccess,
    status,
    hasGoogleFormQuiz,
  });

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {session.title} ({session.courseTitle})
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
          {hasGoogleFormQuiz && (
            <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Link href={session.googleFormQuizUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Take Google Forms Quiz
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const LiveClassesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    console.log("[LIVECLASSES_PAGE] Redirecting to /: No userId");
    return redirect("/");
  }

  console.log(`[LIVECLASSES_PAGE] Rendering for userId: ${userId}`);

  const sessions = await getLiveSessions({ userId });

  const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
   <p className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight" style={{ backgroundColor: 'white' }}>Live Sessions</p>          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
            Join live sessions with instructors, ask questions, and learn with your peers.
          </p>
        </div>

        {!hasAccess && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
            <Lock className="h-12 w-12 text-red-500 dark:text-red-400 flex-shrink-0" />
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-3xl font-bold mb-3">Access Restricted</h2>
              <p className="text-lg">
                You haven't purchased any courses with live sessions. Enroll now to join the community!
              </p>
              <Button asChild className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:text-white">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        )}

        {hasAccess && sessions.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-gray-900">
            <File className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-200 mb-6" />
            <h3 className="mt-4 text-3xl font-bold text-gray-700 dark:text-white">No Live Sessions Available</h3>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              We're excited to bring you more live content soon! No live sessions are available for your purchased courses.
            </p>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {hasAccess &&
            sessions.map((session) => (
              <LiveSessionCard key={session.id} session={session} hasAccess={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LiveClassesPage;