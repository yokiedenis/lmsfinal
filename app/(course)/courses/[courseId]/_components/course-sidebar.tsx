 

import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import QuizButton  from './quiz-button';
import Link from 'next/link';

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
  quizId, // Include quizId
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
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>

      {/* Quiz button */}
      {/* {allChaptersCompleted && (
        <div className="p-4">
          <button
            className="w-full bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600"
            onClick={handleClick }
          >
            Take Final Quiz
          </button>
        </div>
      )} */}


{allChaptersCompleted && (
  <div className="p-4">
        
        <QuizButton 
        courseId={course.id} 
        quizId={quizId}
        
        /> 
      
  
  </div>
)}

      {/* Display locked message if not all chapters are completed */}
      {!allChaptersCompleted && (
        <div className="p-4 bg-yellow-700 border-l-4 border-yellow-500 text-white rounded-lg">
    <span className="w-full text-center p-3">
            Complete all chapters to unlock the final quiz
          </span>
        </div>
      )}
    </div>
  );
};
