import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/api/webhook",
    "/api/uploadthing",
    "/",
    // Use regular expressions to match any course and quiz IDs
    /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/, // This matches /api/courses/{courseId}/quizzes/{quizId}/get
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
