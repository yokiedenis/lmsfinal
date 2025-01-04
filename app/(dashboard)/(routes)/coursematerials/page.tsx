// "use client";

// import { AttachmentForm } from "../teacher/courses/[courseId]/_components/attachment-form";
// import { Course, Attachment } from "@prisma/client";

// // Define the props interface for CourseMaterials
// interface CourseMaterialsProps {
//   course: Course & { attachments: Attachment[] };
// }

// // Define the functional component that accepts CourseMaterialsProps
// const CourseMaterials = ({ course }: CourseMaterialsProps) => {
//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <header className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
//         <p className="text-lg text-gray-600 mt-2">
//           Browse and manage materials for this course
//         </p>
//       </header>

//       {/* Materials Section */}
//       <section className="bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">
//           Course Materials
//         </h2>

//         {/* Attachment Form */}
//         <AttachmentForm initialData={course} courseId={course.id} />
//       </section>

//       {/* Footer Section */}
//       <footer className="mt-12 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} Eduskill LMS. All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// // Default export of the component
// export default CourseMaterials;

