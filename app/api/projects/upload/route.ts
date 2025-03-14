// // app/api/projects/upload/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function POST(request: NextRequest) {
//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;
//     const submittedUserId = formData.get("userId") as string;
//     const courseId = formData.get("courseId") as string;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }
//     if (!submittedUserId || !courseId) {
//       return NextResponse.json({ error: "Missing userId or courseId" }, { status: 400 });
//     }
//     if (submittedUserId !== userId) {
//       return NextResponse.json({ error: "Unauthorized: userId mismatch" }, { status: 403 });
//     }

//     // Verify the user has purchased the course
//     const purchase = await prisma.purchase.findFirst({
//       where: {
//         userId: userId,
//         courseId: courseId,
//       },
//     });

//     if (!purchase) {
//       return NextResponse.json({ error: "Course not purchased" }, { status: 403 });
//     }

//     // Save the file locally (for simplicity; use cloud storage in production)
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(process.cwd(), "public/uploads", fileName);
//     await writeFile(filePath, buffer);

//     // Construct the file URL
//     const fileUrl = `/uploads/${fileName}`;

//     // Save submission to the ProjectSubmission model
//     const submission = await prisma.projectSubmission.create({
//       data: {
//         userId: userId,
//         courseId: courseId,
//         fileName: file.name,
//         fileUrl: fileUrl,
//       },
//     });

//     console.log("Saved to ProjectSubmission:", submission);
//     return NextResponse.json({ message: "File uploaded successfully", submission }, { status: 201 });
//   } catch (error) {
//     console.error("Error uploading project:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false, // Required for multipart/form-data
//   },
// };







// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/prisma"; // Your Prisma client
// import { uploadFileToStorage } from "@/lib/storage"; // Your storage service

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get('file') as File;
//   const userId = formData.get('userId') as string;
//   const courseId = formData.get('courseId') as string;

//   // Upload file to storage (e.g., AWS S3, Cloudinary)
//   const fileUrl = await uploadFileToStorage(file);

//   const submission = await prisma.projectSubmission.create({
//     data: {
//       userId,
//       courseId,
//       fileUrl,
//     },
//   });

//   return NextResponse.json({ submissionId: submission.id }, { status: 201 });
// }