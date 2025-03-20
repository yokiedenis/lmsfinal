// import { authMiddleware } from "@clerk/nextjs/server";
// import { isTeacher } from "@/lib/teacher";
// import { isSuperAdmin } from "@/lib/isSuperAdmin";  // Import the new function

// export default authMiddleware({
//   debug: false,
//   publicRoutes: [
//     "/api/webhook",
//     "/api/uploadthing",
//     "/",
//     "/search",
//     /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/, // Matches /api/courses/{courseId}/quizzes/{quizId}/get
//     /^\/api\/courses\/[^/]+\/chapterquizzes\/[^/]+\/get$/, // Matches /api/courses/{courseId}/chapterquizzes/{chapterQuizId}/get
//   ],
//   afterAuth: async (auth, req) => {
//     const { userId } = auth;

//     // Route accessible only by teachers and super admins
//     if (req.nextUrl.pathname.startsWith("/teacher/feedback")) {
//       if (!userId || (!isTeacher(userId) && !isSuperAdmin(userId))) {
//         // Redirect unauthorized users
//         return new Response(null, { status: 302, headers: { Location: "/" } });
//       }
//     }

//     // Route accessible only by super admins
//     if (req.nextUrl.pathname.startsWith("/admin")) {
//       if (!userId || !isSuperAdmin(userId)) {
//         // Redirect unauthorized users
//         return new Response(null, { status: 302, headers: { Location: "/" } });
//       }
//     }
//   },
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };



import { authMiddleware } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher";
import { isSuperAdmin } from "@/lib/isSuperAdmin";

export default authMiddleware({
  //debug: true, // Enable debug mode for more detailed logs
  publicRoutes: [
    "/api/webhook",
    "/api/uploadthing",
    "/",
    "/search",
    /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/,
    /^\/api\/courses\/[^/]+\/chapterquizzes\/[^/]+\/get$/,
  ],
  afterAuth: async (auth, req) => {
   // console.log("Incoming Request:", req); // Log the incoming request

    const { userId } = auth;

    if (req.nextUrl.pathname.startsWith("/teacher/feedback")) {
      if (!userId || (!isTeacher(userId) && !isSuperAdmin(userId))) {
        return new Response(null, { status: 302, headers: { Location: "/" } });
      }
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!userId || !isSuperAdmin(userId)) {
        return new Response(null, { status: 302, headers: { Location: "/" } });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};