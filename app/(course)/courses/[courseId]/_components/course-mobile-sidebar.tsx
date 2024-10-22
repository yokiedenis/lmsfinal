// Import statements remain unchanged
import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  quizId: string; // Add quizId to the props interface
};

export const CourseMobileSidebar = ({ 
  course,
  progressCount,
  quizId, // Accept quizId as a prop
}: CourseMobileSidebarProps) => {
  
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          quizId={quizId} // Pass quizId to CourseSidebar
        />
      </SheetContent>
    </Sheet>
  )
}
