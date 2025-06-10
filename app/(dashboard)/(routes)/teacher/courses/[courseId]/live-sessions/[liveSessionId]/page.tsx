// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, File, LayoutDashboard, Video } from "lucide-react";

// import { db } from "@/lib/db";
// import { IconBadge } from "@/components/icon-badge";
// import { Banner } from "@/components/banner";

// import { LiveSessionTitleForm } from "./_components/live-session-title-form";
// import { LiveSessionDescriptionForm } from "./_components/live-session-description-form"; // Now this will work
// import { LiveSessionAccessForm } from "./_components/live-session-access-forms"; // Corrected import path
// import { LiveSessionActions } from "./_components/live-session-actions";
// import { LiveSessionAttachmentForm } from "./_components/live-session-attachment-form";

// const LiveSessionIdPage = async ({
//     params
// }: {
//     params: { courseId: string; liveSessionId: string }
// }) => {
//     const { userId } = auth();

//     if (!userId) {
//         return redirect("/");
//     }

//     // This query will now work correctly because of the schema fix
//     const liveSession = await db.liveSession.findUnique({
//         where: {
//             id: params.liveSessionId,
//             courseId: params.courseId,
//         },
//         include: {
//             attachments: {
//                 orderBy: {
//                     createdAt: "desc",
//                 }
//             }
//         },
//     });

//     if (!liveSession) {
//         return redirect("/")
//     }

//     const requiredFields = [
//         liveSession.title,
//         liveSession.meetingUrl,
//         liveSession.description, // Added description to required fields
//     ];

//     const totalFields = requiredFields.length;
//     const completedFields = requiredFields.filter(Boolean).length;
//     const isComplete = requiredFields.every(Boolean);

//     return (
//         <>
//             {!liveSession.isPublished && (
//                 <Banner
//                     variant="warning"
//                     label="This session is unpublished. It will not be visible in the course."
//                 />
//             )}
//             <div className="p-6">
//                 <div className="flex items-center justify-between">
//                     <div className="w-full">
//                         <Link
//                             href={`/teacher/courses/${params.courseId}`}
//                             className="flex items-center text-sm hover:opacity-75 transition mb-6"
//                         >
//                             <ArrowLeft className="h-4 w-4 mr-2" />
//                             Back to course setup
//                         </Link>
//                         <div className="flex items-center justify-between w-full">
//                             <div className="flex flex-col gap-y-2">
//                                 <h1 className="text-2xl font-medium">
//                                     Live Session Setup
//                                 </h1>
//                                 <span className="text-sm text-slate-700">
//                                     Complete all fields ({completedFields}/{totalFields})
//                                 </span>
//                             </div>
//                             <LiveSessionActions
//                                 disabled={!isComplete}
//                                 courseId={params.courseId}
//                                 sessionId={params.liveSessionId}
//                                 isPublished={liveSession.isPublished}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
//                     <div className="space-y-4">
//                         <div>
//                             <div className="flex items-center gap-x-2">
//                                 <IconBadge icon={LayoutDashboard} />
//                                 <h2 className="text-2xl">Customize your session</h2>
//                             </div>
//                             <LiveSessionTitleForm
//                                 initialData={liveSession}
//                                 courseId={params.courseId}
//                                 sessionId={params.liveSessionId}
//                             />
//                             {/* Adding the description form */}
//                             <LiveSessionDescriptionForm
//                                 initialData={liveSession}
//                                 courseId={params.courseId}
//                                 sessionId={params.liveSessionId}
//                             />
//                         </div>
//                         <div>
//                             <div className="flex items-center gap-x-2">
//                                 <IconBadge icon={Video} />
//                                 <h2 className="text-2xl">Access</h2>
//                             </div>
//                             <LiveSessionAccessForm
//                                 initialData={liveSession}
//                                 courseId={params.courseId}
//                                 sessionId={params.liveSessionId}
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <div className="flex items-center gap-x-2">
//                             <IconBadge icon={File} />
//                             <h2 className="text-2xl">
//                                 Session Resources & Assignments
//                             </h2>
//                         </div>
//                         {/* This component will now receive the correct 'initialData' prop */}
//                         <LiveSessionAttachmentForm
//                             initialData={liveSession}
//                             courseId={params.courseId}
//                             sessionId={params.liveSessionId}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default LiveSessionIdPage;





// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, File, LayoutDashboard, Video } from "lucide-react";

// import { db } from "@/lib/db";
// import { IconBadge } from "@/components/icon-badge";
// import { Banner } from "@/components/banner";

// import { LiveSessionTitleForm } from "./_components/live-session-title-form";
// import { LiveSessionDescriptionForm } from "./_components/live-session-description-form";
// import { LiveSessionAccessForm } from "./_components/live-session-access-forms";
// import { LiveSessionActions } from "./_components/live-session-actions";
// import { LiveSessionAttachmentForm } from "./_components/live-session-attachment-form";

// const LiveSessionIdPage = async ({
//   params
// }: {
//   params: { courseId: string; liveSessionId: string }
// }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const liveSession = await db.liveSession.findUnique({
//     where: {
//       id: params.liveSessionId,
//       courseId: params.courseId,
//     },
//     include: {
//       attachments: {
//         orderBy: {
//           createdAt: "desc",
//         }
//       }
//     },
//   });

//   if (!liveSession) {
//     return redirect("/");
//   }

//   const requiredFields = [
//     liveSession.title,
//     liveSession.meetingUrl,
//     liveSession.description,
//   ];

//   const totalFields = requiredFields.length;
//   const completedFields = requiredFields.filter(Boolean).length;
//   const isComplete = requiredFields.every(Boolean);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       {!liveSession.isPublished && (
//         <div className="rounded-lg shadow-md bg-yellow-50 border border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200 mx-6 mt-6">
//           <Banner
//             variant="warning"
//             label="This session is unpublished. It will not be visible in the course."
//           />
//         </div>
//       )}
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div className="w-full">
//             <Link
//               href={`/teacher/courses/${params.courseId}`}
//               className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 group"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//               Back to course setup
//             </Link>
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex flex-col gap-y-2">
//                 {/* <h4 className="text-3xl font-bold bg-blue-700 text-white-900 dark:text-white tracking-tight">
//                   Live Class Setup
//                 </h4> */}
//                 <span className="text-sm text-gray-600 dark:text-gray-300">
//                   Complete all fields ({completedFields}/{totalFields})
//                 </span>
//               </div>
//               <div className="transform hover:scale-105 transition-transform duration-200">
//                 <LiveSessionActions
//                   disabled={!isComplete}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                   isPublished={liveSession.isPublished}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
//           <div className="space-y-8">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center gap-x-3 mb-6">
//                 <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-full p-2">
//                   <IconBadge icon={LayoutDashboard} />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                   Customize Your Live Class
//                 </h2>
//               </div>
//               <div className="animate-fade-in">
//                 <LiveSessionTitleForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//               <div className="animate-fade-in delay-100">
//                 <LiveSessionDescriptionForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center gap-x-3 mb-6">
//                 <div className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-full p-2">
//                   <IconBadge icon={Video} />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                   Access Settings
//                 </h2>
//               </div>
//               <div className="animate-fade-in delay-200">
//                 <LiveSessionAccessForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//             <div className="flex items-center gap-x-3 mb-6">
//               <div className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-full p-2">
//                 <IconBadge icon={File} />
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                 Study Material Resources & Assignments
//               </h2>
//             </div>
//             <div className="animate-fade-in delay-300">
//               <LiveSessionAttachmentForm
//                 initialData={liveSession}
//                 courseId={params.courseId}
//                 sessionId={params.liveSessionId}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveSessionIdPage;










// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, File, LayoutDashboard, Video } from "lucide-react";

// import { db } from "@/lib/db";
// import { IconBadge } from "@/components/icon-badge";
// import { Banner } from "@/components/banner";

// import { LiveSessionTitleForm } from "./_components/live-session-title-form";
// import { LiveSessionDescriptionForm } from "./_components/live-session-description-form";
// import { LiveSessionAccessForm } from "./_components/live-session-access-forms";
// import { LiveSessionActions } from "./_components/live-session-actions";
// import { LiveSessionAttachmentForm } from "./_components/live-session-attachment-form";
// import { LiveSessionQuizForm } from "./_components/live-session-quiz-form"; // New component

// const LiveSessionIdPage = async ({
//   params
// }: {
//   params: { courseId: string; liveSessionId: string }
// }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const liveSession = await db.liveSession.findUnique({
//     where: {
//       id: params.liveSessionId,
//       courseId: params.courseId,
//     },
//     include: {
//       attachments: {
//         orderBy: {
//           createdAt: "desc",
//         }
//       },
//       liveclassquizzes: {
//         orderBy: {
//           createdAt: "desc",
//         }
//       }
//     },
//   });

//   if (!liveSession) {
//     return redirect("/");
//   }

//   const requiredFields = [
//     liveSession.title,
//     liveSession.meetingUrl,
//     liveSession.description,
//   ];

//   const totalFields = requiredFields.length;
//   const completedFields = requiredFields.filter(Boolean).length;
//   const isComplete = requiredFields.every(Boolean);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       {!liveSession.isPublished && (
//         <div className="rounded-lg shadow-md bg-yellow-50 border border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200 mx-6 mt-6">
//           <Banner
//             variant="warning"
//             label="This session is unpublished. It will not be visible in the course."
//           />
//         </div>
//       )}
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div className="w-full">
//             <Link
//               href={`/teacher/courses/${params.courseId}`}
//               className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 group"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//               Back to course setup
//             </Link>
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex flex-col gap-y-2">
//                 <span className="text-sm text-gray-600 dark:text-gray-300">
//                   Complete all fields ({completedFields}/{totalFields})
//                 </span>
//               </div>
//               <div className="transform hover:scale-105 transition-transform duration-200">
//                 <LiveSessionActions
//                   disabled={!isComplete}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                   isPublished={liveSession.isPublished}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
//           <div className="space-y-8">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center gap-x-3 mb-6">
//                 <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-full p-2">
//                   <IconBadge icon={LayoutDashboard} />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                   Customize Your Live Class
//                 </h2>
//               </div>
//               <div className="animate-fade-in">
//                 <LiveSessionTitleForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//               <div className="animate-fade-in delay-100">
//                 <LiveSessionDescriptionForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center gap-x-3 mb-6">
//                 <div className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-full p-2">
//                   <IconBadge icon={Video} />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                   Access Settings
//                 </h2>
//               </div>
//               <div className="animate-fade-in delay-200">
//                 <LiveSessionAccessForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="space-y-8">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center gap-x-3 mb-6">
//                 <div className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-full p-2">
//                   <IconBadge icon={File} />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                   Study Material Resources & Assignments
//                 </h2>
//               </div>
//               <div className="animate-fade-in delay-300">
//                 <LiveSessionAttachmentForm
//                   initialData={liveSession}
//                   courseId={params.courseId}
//                   sessionId={params.liveSessionId}
//                 />
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center gap-x-3 mb-6">
//                 <div className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-full p-2">
//                   <IconBadge icon={File} />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                   Quizzes
//                 </h2>
//               </div>
//               <div className="animate-fade-in delay-300">
//                 <LiveSessionQuizForm
//                   courseId={params.courseId}
//                   liveSessionId={params.liveSessionId}
//                   initialQuizzes={liveSession.liveclassquizzes}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveSessionIdPage;






import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, File, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { LiveSessionTitleForm } from "./_components/live-session-title-form";
import { LiveSessionDescriptionForm } from "./_components/live-session-description-form";
import { LiveSessionAccessForm } from "./_components/live-session-access-forms";
import { LiveSessionActions } from "./_components/live-session-actions";
import { LiveSessionAttachmentForm } from "./_components/live-session-attachment-form";
import { LiveSessionQuizForm } from "./_components/live-session-quiz-form";

const LiveSessionIdPage = async ({
  params
}: {
  params: { courseId: string; liveSessionId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const liveSession = await db.liveSession.findUnique({
    where: {
      id: params.liveSessionId,
      courseId: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        }
      },
      liveclassquizzes: {
        orderBy: {
          createdAt: "desc",
        }
      }
    },
  });

  if (!liveSession) {
    return redirect("/");
  }

  // Transform liveclassquizzes to match the Quiz type expected by LiveSessionQuizForm
  const quizzes = liveSession.liveclassquizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    courseId: params.courseId, // Add courseId from params
    liveSessionId: quiz.liveSessionId,
    isPublished: quiz.isPublished, // Include isPublished from Prisma model
    createdAt: quiz.createdAt,
    updatedAt: quiz.updatedAt,
    questions: quiz.questions as { text: string; options: string[]; correctAnswer: string }[], // Cast JSON to expected type
    _count: {
      questions: Array.isArray(quiz.questions) ? quiz.questions.length : 0,
    },
  }));

  const requiredFields = [
    liveSession.title,
    liveSession.meetingUrl,
    liveSession.description,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {!liveSession.isPublished && (
        <div className="rounded-lg shadow-md bg-yellow-50 border border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200 mx-6 mt-6">
          <Banner
            variant="warning"
            label="This session is unpublished. It will not be visible in the course."
          />
        </div>
      )}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col gap-y-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Complete all fields ({completedFields}/{totalFields})
                </span>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-200">
                <LiveSessionActions
                  disabled={!isComplete}
                  courseId={params.courseId}
                  sessionId={params.liveSessionId}
                  isPublished={liveSession.isPublished}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-full p-2">
                  <IconBadge icon={LayoutDashboard} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Customize Your Live Class
                </h2>
              </div>
              <div className="animate-fade-in">
                <LiveSessionTitleForm
                  initialData={liveSession}
                  courseId={params.courseId}
                  sessionId={params.liveSessionId}
                />
              </div>
              <div className="animate-fade-in delay-100">
                <LiveSessionDescriptionForm
                  initialData={liveSession}
                  courseId={params.courseId}
                  sessionId={params.liveSessionId}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-full p-2">
                  <IconBadge icon={Video} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Access Settings
                </h2>
              </div>
              <div className="animate-fade-in delay-200">
                <LiveSessionAccessForm
                  initialData={liveSession}
                  courseId={params.courseId}
                  sessionId={params.liveSessionId}
                />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-full p-2">
                  <IconBadge icon={File} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Study Material Resources & Assignments
                </h2>
              </div>
              <div className="animate-fade-in delay-300">
                <LiveSessionAttachmentForm
                  initialData={liveSession}
                  courseId={params.courseId}
                  sessionId={params.liveSessionId}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-full p-2">
                  <IconBadge icon={File} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Quizzes
                </h2>
              </div>
              <div className="animate-fade-in delay-300">
                <LiveSessionQuizForm
                  courseId={params.courseId}
                  liveSessionId={params.liveSessionId}
                  initialQuizzes={quizzes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionIdPage;






 