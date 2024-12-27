import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import QuizButton from "./quiz-button";
import ChapterQuizButton from "./chapter-quiz-button";
import Link from "next/link";
import { motion } from "framer-motion";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  quizId: string;
}

export const CourseSidebar = async ({
  course,
  progressCount,
  quizId,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  // Check if all chapters are completed
  const allChaptersCompleted = course.chapters.every(
    (chapter) => !!chapter.userProgress?.[0]?.isCompleted
  );

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1
          className="font-semibold"
          style={{
            color: "gold",
            backgroundColor: "#6A0DAD",
            padding: "10px 8px",
            borderRadius: "4px",
            fontSize: "16px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>{course.title}</div>
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <div key={chapter.id}>
            <CourseSidebarItem
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />

            {/* Chapter Quiz Button */}
            {!!chapter.userProgress?.[0]?.isCompleted && (
              <div className="p-4">
                {/* Ensure quizId is passed with a valid value */}
                <ChapterQuizButton
                  courseId={course.id}
                  chapterId={chapter.id}
                />

              </div>
            )}
          </div>
        ))}
      </div>

      {allChaptersCompleted && (
        <div className="p-4">
          <QuizButton courseId={course.id} quizId={quizId} />
        </div>
      )}

      {!allChaptersCompleted && (
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
          <span className="w-full text-center">
            <h2 className="text-3xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
            <p className="text-lg">Complete all chapters to gain access.</p>
          </span>
        </div>
      )}
    </div>
  );
};

