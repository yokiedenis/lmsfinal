// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('userId');
//   const courseId = searchParams.get('courseId');

//   if (!userId || !courseId) {
//     return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
//   }

//   const submission = await prisma.projectSubmission.findFirst({
//     where: {
//       userId,
//       courseId,
//     },
//   });

//   return NextResponse.json({ submission });
// }