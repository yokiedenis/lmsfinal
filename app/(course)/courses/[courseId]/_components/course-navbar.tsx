import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { SafeProfile } from "@/types";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
 // currentProfile?: SafeProfile | null;
  quizId: string;
};


export const CourseNavbar = ({
  course,
  progressCount,
 // currentProfile
   quizId,
}: CourseNavbarProps) => {
   

  return (

      <div className="p-4 border-b h-full flex items-center  shadow-sm">
        <CourseMobileSidebar
          course={course}
          progressCount={progressCount}
          quizId={quizId}
           
        />
        <NavbarRoutes   />      
      </div>

  )
}