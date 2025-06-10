// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { isTeacher } from "@/lib/teacher";
// import { isSuperAdmin } from "@/lib/isSuperAdmin";
// import SidebarRoutesClient from "./sidebar-routes-client";

// interface SidebarRoutesServerProps {
//   courseId?: string;
// }

// export async function SidebarRoutesServer({ courseId }: SidebarRoutesServerProps) {
//   const { userId } = auth();

//   // Check if the user has purchased the course
//   let hasPurchased = false;
//   if (courseId && userId && !isTeacher(userId) && !isSuperAdmin(userId)) {
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });
//     hasPurchased = !!purchase;
//   }

//   // Pass user role and purchase status to the Client Component
//   const isSuperAdminUser = userId && isSuperAdmin(userId);
//   const isTeacherUser = userId && isTeacher(userId);

//   return (
//     <SidebarRoutesClient
//       courseId={courseId}
//       isSuperAdmin={isSuperAdminUser}
//       isTeacher={isTeacherUser}
//       hasPurchased={hasPurchased}
//     />
//   );
// }