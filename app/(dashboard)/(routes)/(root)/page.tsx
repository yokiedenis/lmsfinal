import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { CheckCircle, Clock, InfoIcon } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { BannerCard } from "./_components/banner-card";

import StudentHelper from '@/components/studenthelper'; 

import Chatbot from "@/components/chatbot";
//import ChatbotModal from '@/components/chatbot';

export default async function Dashboard() {

  const modules = ['Module 1', 'Module 2', 'Module 3']; // Replace with your actual modules
  const courses = ['Course 1', 'Course 2', 'Course 3']; // Replace with your actual courses
  

  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <BannerCard
            icon={InfoIcon}
            label="Welcome to the Dashboard"
            description={`This is where you can see your progress and continue your courses. This is a LMS and as such, some courses are free, and Stripe is in test mode. To enroll in a course, enter dummy data in the Stripe form.
               Admin access is only limited to Edu skill team`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />

      <StudentHelper/>
       
      
     
      

    </div>
  )
}
