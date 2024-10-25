import { authMiddleware } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher"; // Assume this checks if the user is a teacher

export default authMiddleware({
  debug: false,
  publicRoutes: [
    "/api/webhook",
    "/api/uploadthing",
    "/",
    "/search",
    // Use regular expressions to match any course and quiz IDs
    /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/, // Matches /api/courses/{courseId}/quizzes/{quizId}/get
  ],
  afterAuth: async (auth, req) => {
    const { userId } = auth;

    if (req.nextUrl.pathname.startsWith("/teacher/feedback")) {
      if (!userId || !(await isTeacher(userId))) {
        // Optional: Redirect unauthorized users to sign-in or a custom page
        return new Response(null, { status: 302, headers: { Location: "/" } });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
