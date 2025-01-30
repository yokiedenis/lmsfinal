// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   try {
//     const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

//     return (
//       <div className="p-6 space-y-4">
//         <div className="grid grid-cols-1 gap-4">
//           <BannerCard
//             icon={InfoIcon}
//             label="Welcome to the Eduskill Student Dashboard"
//             description={`This is where you can see your progress and continue your courses. This is a LMS and as such, some courses are free, and Stripe is in test mode. To enroll in a course, enter dummy data in the Stripe form. Admin access is only limited to Edu skill team.`}
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InfoCard
//             icon={Clock}
//             label="In Progress"
//             numberOfItems={coursesInProgress.length}
//           />
//           <InfoCard
//             icon={CheckCircle}
//             label="Completed"
//             numberOfItems={completedCourses.length}
//             variant="success"
//           />
//         </div>
//         <CoursesList items={[...coursesInProgress, ...completedCourses]} />
//       </div>
//     );
//   } catch (error) {
//     console.error("[DASHBOARD_ERROR]:", error);
//     return redirect("/error");
//   }
// }



// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   const {
//     completedCourses,
//     coursesInProgress
//   } = await getDashboardCourses(userId);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="grid grid-cols-1 gap-4">
//         <BannerCard
//           icon={InfoIcon}
//           label="Welcome to the dashboard"
//           description={`This is where you can see your progress 
//             and continue your courses. This is a demonstration LMS and as such, all courses are free and Stripe is in test
//              mode. To enroll in a course, enter dummy data in the Stripe form.  `}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard
//           icon={Clock}
//           label="In Progress"
//           numberOfItems={coursesInProgress.length}
//         />
//         <InfoCard
//           icon={CheckCircle}
//           label="Completed"
//           numberOfItems={completedCourses.length}
//           variant="success"
//         />
//       </div>
//       <CoursesList
//         items={[...coursesInProgress, ...completedCourses]}
//       />
//     </div>
//   )
// }









// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   const {
//     completedCourses,
//     coursesInProgress
//   } = await getDashboardCourses(userId);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="grid grid-cols-1 gap-4">
//         <BannerCard
//           icon={InfoIcon}
//           label="Welcome to the dashboard"
//           description={`This is where you can see your progress 
//             and continue your courses. This is a demonstration LMS and as such, all courses are free and Stripe is in test
//              mode. To enroll in a course, enter dummy data in the Stripe form.`}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard
//           icon={Clock}
//           label="In Progress"
//           numberOfItems={coursesInProgress.length}
//         />
//         <InfoCard
//           icon={CheckCircle}
//           label="Completed"
//           numberOfItems={completedCourses.length}
//           variant="success"
//         />
//       </div>
//       <CoursesList
//         items={[...coursesInProgress, ...completedCourses]}
//       />
//       {/* Check if there are no courses to display */}
//       {coursesInProgress.length === 0 && completedCourses.length === 0 && (
//         <div className="text-center text-sm text-muted-foreground mt-10">
//           No courses available
//         </div>
//       )}
//     </div>
//   );
// }



import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CheckCircle, Clock, InfoIcon } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { BannerCard } from "./_components/banner-card";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
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
          label="Welcome to the dashboard"
          description={`Eduskill is a comprehensive online learning environment that
             caters to a broad spectrum of learners, from students aiming for academic
              excellence to professionals seeking to upskill or reskill. The platform is 
              accessible across multiple devices, ensuring that education is not confined by
               location or time. It supports learners from all over the world, offering
                courses and providing a rich, diverse curriculum.`}
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
    </div>
  )
}