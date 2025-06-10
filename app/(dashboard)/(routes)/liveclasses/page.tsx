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
//   attachments: {
//     id: string;
//     name: string;
//     url: string;
//   }[];
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

//         // Check enrollment
//         const enrollmentRes = await fetch(
//           `/api/purchases/coursecheck?userId=${user.id}&courseId=${params.courseId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!enrollmentRes.ok) {
//           throw new Error("Failed to check enrollment");
//         }

//         const isEnrolled = await enrollmentRes.json();
//         setIsEnrolled(isEnrolled);

//         if (!isEnrolled) {
//           setError("You must purchase this course to access live sessions.");
//           setLoading(false);
//           return;
//         }

//         // Fetch live sessions
//         const sessionsRes = await fetch(
//           `/api/courses/${params.courseId}/liveclasses`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!sessionsRes.ok) {
//           throw new Error("Failed to fetch live sessions");
//         }

//         const sessions = await sessionsRes.json();
//         setLiveSessions(sessions);
//       } catch (err) {
//         console.error("[LIVE_SESSIONS_ERROR]", err);
//         setError(err instanceof Error ? err.message : "An error occurred");
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
//             href={`/courses/${params.courseId}`}
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
//               liveSessions.map((session) => (
//                 <div
//                   key={session.id}
//                   className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
//                       <Video className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">
//                         {session.title}
//                       </p>
//                       <p className="text-xs text-[#6B7280]">
//                         {session.description || "No description available"}
//                       </p>
//                       <p className="text-xs text-[#6B7280]">
//                         {new Date(session.startTime).toLocaleString()} -{" "}
//                         {new Date(session.endTime).toLocaleString()}
//                       </p>
//                       {session.attachments.length > 0 && (
//                         <div className="mt-2">
//                           <p className="text-xs font-medium text-[#1F2A44]">
//                             Materials:
//                           </p>
//                           <div className="flex flex-wrap gap-2 mt-1">
//                             {session.attachments.map((attachment) => (
//                               <a
//                                 key={attachment.id}
//                                 href={attachment.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-xs text-indigo-600 hover:underline"
//                               >
//                                 {attachment.name}
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     {session.meetingUrl ? (
//                       <a
//                         href={session.meetingUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                           Join
//                         </button>
//                       </a>
//                     ) : (
//                       <p className="text-xs text-[#6B7280]">
//                         Meeting URL not available
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))
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







// "use client";

// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// export default function LiveClassesOverview() {
//   const { user } = useUser();

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#F5F7FA] p-6">
//         <Alert variant="destructive">
//           <AlertDescription>
//             You must be logged in to view live classes.
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       <div className="max-w-7xl mx-auto">
//         <Link
//           href="/"
//           className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//           Back to dashboard
//         </Link>
//         <div className="mt-6">
//           <h1 className="text-2xl font-bold text-[#1F2A44]">Live Classes</h1>
//           <p className="mt-2 text-gray-600">
//             Please select a course to view its live sessions.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }












import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLiveSessions } from "@/actions/get-live-sessions";
import { File, Clock, Video, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  let statusColor: "default" | "destructive" | "secondary" = "default";

  if (now >= startTime && now <= endTime) {
    status = "LIVE";
    statusColor = "destructive";
  } else if (now > endTime) {
    status = "FINISHED";
    statusColor = "secondary";
  }

  const canJoin = hasAccess && status === "LIVE" && session.meetingUrl;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{session.title}</h3>
          <Badge variant={statusColor} className="text-sm">{status}</Badge>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">{session.description}</p>
        
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-300 mb-4">
          <Clock className="h-4 w-4 mr-2" />
          <span>{formatDate(startTime)} - {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(endTime)}</span>
        </div>

        <div className="flex justify-between items-center">
            {hasAccess ? (
                <Button asChild disabled={!canJoin}>
                    <Link href={canJoin ? session.meetingUrl! : "#"} target="_blank">
                        <Video className="h-4 w-4 mr-2" />
                        Join Live Session
                    </Link>
                </Button>
            ) : (
                <div className="flex items-center text-yellow-600">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Purchase course to join</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};


// Main Page Component
const LiveClassesPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const sessions = await getLiveSessions({
    userId,
    courseId: params.courseId,
  });
  
  // Check access from the first session (it's the same for all)
  const hasAccess = sessions.length > 0 ? sessions[0].hasAccess : false;

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Live Classes</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                Join live sessions with instructors, ask questions, and learn with your peers.
            </p>
        </div>

        {!hasAccess && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md flex items-center">
                <Lock className="h-8 w-8 mr-4 text-yellow-600" />
                <div>
                    <h2 className="text-xl font-bold">Access Denied</h2>
                    <p>You must purchase this course to access the live classes. Please enroll in the course to join these exclusive sessions.</p>
                </div>
            </div>
        )}

        {hasAccess && sessions.length === 0 && (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <File className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-lg font-medium text-slate-800 dark:text-white">No Live Sessions Scheduled</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    There are currently no live sessions available for this course. Please check back later.
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