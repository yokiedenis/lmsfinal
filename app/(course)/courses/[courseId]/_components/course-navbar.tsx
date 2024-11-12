// CourseNavbar.tsx

import { Chapter, Course, UserProgress } from "@prisma/client";
import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
//import { SafeProfile } from "@/types";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  // currentProfile?: SafeProfile | null; // Optional currentProfile prop
  quizId: string;
}

export const CourseNavbar = ({
  course,
  progressCount,
  quizId,
 // currentProfile,
}: CourseNavbarProps) => {
 // console.log("CourseNavbar currentProfile", currentProfile);

  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        quizId={quizId}
      />
      <NavbarRoutes  /> {/* Pass currentProfile here */}
    </div>
  );
};
