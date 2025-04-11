// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if user has purchased the course
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId: params.courseId
//         }
//       },
//       include: {
//         course: true
//       }
//     });

//     if (!purchase) {
//       return new NextResponse("Course not purchased", { status: 403 });
//     }

//     // Check if course is completed (you might need to adjust this based on your completion logic)
//     const progress = await db.userProgress.findMany({
//       where: {
//         userId,
//         chapter: {
//           courseId: params.courseId
//         },
//         isCompleted: true
//       }
//     });

//     const courseChapters = await db.chapter.count({
//       where: {
//         courseId: params.courseId,
//         isPublished: true
//       }
//     });

//     const isCompleted = progress.length >= courseChapters;

//     if (!isCompleted) {
//       return new NextResponse("Course not completed", { status: 403 });
//     }

//     // Get quiz results if available
//     const quizResults = await db.quizResult.findFirst({
//       where: {
//         userId,
//         courseId: params.courseId
//       },
//       orderBy: {
//         createdAt: "desc"
//       }
//     });

//     return NextResponse.json({
//       courseName: purchase.course.title,
//       completionDate: purchase.course.createdAt.toISOString().split('T')[0],
//       score: quizResults ? Math.round((quizResults.score / quizResults.totalQuestions) * 100) : undefined
//     });

//   } catch (error) {
//     console.log("[CERTIFICATE_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }