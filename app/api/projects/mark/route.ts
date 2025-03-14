// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/prisma";

// export async function POST(req: Request) {
//   const { submissionId, marks } = await req.json();
  
//   // Add admin authentication check here
//   // e.g., verifyAdmin(req)

//   const updatedSubmission = await prisma.projectSubmission.update({
//     where: { id: submissionId },
//     data: {
//       marks,
//       isMarked: true,
//     },
//   });

//   return NextResponse.json(updatedSubmission);
// }