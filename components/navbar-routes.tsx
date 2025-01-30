"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, Book } from "lucide-react"; // Added Book icon for Course Materials
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher as checkIfTeacher } from "@/lib/teacher"; // Renamed import
import { useState, useEffect } from "react"; // Add useState and useEffect

interface NavbarRoutesProps {}

export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapters");
  const isSearchPage = pathname === "/search";

  // Quotes for AI and LMS systems
  const quotes = [
   
    "Tech is revolutionizing education",
   
  ];

  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => {
        const currentIndex = quotes.indexOf(prevQuote);
        return quotes[(currentIndex + 1) % quotes.length];
      });
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  // Condition to render the quote only on the Dashboard and other specific pages
  const showQuote = pathname === "/"; // Add more pages if necessary

  // Extract chapterId if it exists in the pathname
  const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/); // Assuming chapterId is numeric
  const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-4 items-center ml-auto">
        {/* Animated Quote */}
        {showQuote && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              fontSize: "15px",
            }}
          >
            <span className="center animated-text">{currentQuote}</span>
          </div>
        )}

        {/* Notifications */}
        <Link href="/notifications">
          <div className="flex items-center gap-2 cursor-pointer">
            <Bell className="h-5 w-5 text-blue-500" /> {/* Notification Icon */}
            <span className="hidden md:block text-sm text-custom-yellow">
              Notifications
            </span>
          </div>
        </Link>

        {/* Course Materials icon only for chapter pages */}
        {chapterId && (
          <Link href="/coursematerials">
            <div className="flex items-center gap-2 cursor-pointer">
              <Book className="h-5 w-5 text-green-500" /> {/* Course Materials Icon */}
              <span className="hidden md:block text-sm text-green-500">
                Materials
              </span>
            </div>
          </Link>
        )}

        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              DashBoard
            </Button>
          </Link>
        ) : checkIfTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="success">
              Admin Mode
            </Button>
          </Link>
        ) : null}

        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </>
  );
};





// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book } from "lucide-react"; // Added Book icon for Course Materials
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher"; // Renamed import
// import { useState, useEffect } from "react"; // Add useState and useEffect
// import { getProgress } from "@/actions/get-progress"; // Import the getProgress function

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
//     "Tech is revolutionizing education",
//   ];

//   const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);
//   const [progress, setProgress] = useState<number | null>(null);

//   useEffect(() => {
//     const quoteInterval = setInterval(() => {
//       setCurrentQuote((prevQuote) => {
//         const currentIndex = quotes.indexOf(prevQuote);
//         return quotes[(currentIndex + 1) % quotes.length];
//       });
//     }, 5000); // Change quote every 5 seconds

//     return () => clearInterval(quoteInterval);
//   }, []);

//   // Fetch progress when userId or pathname changes
//   useEffect(() => {
//     const fetchProgress = async () => {
//       if (userId && pathname?.includes("/chapters")) {
//         const chapterIdMatch = pathname.match(/\/chapters\/(\d+)/);
//         const courseId = chapterIdMatch ? chapterIdMatch[1] : null;
//         if (courseId) {
//           const progressPercentage = await getProgress(userId, courseId);
//           setProgress(progressPercentage);
//         }
//       }
//     };

//     fetchProgress();
//   }, [userId, pathname]);

//   // Condition to render the quote only on the Dashboard and other specific pages
//   const showQuote = pathname === "/"; // Add more pages if necessary

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/); // Assuming chapterId is numeric
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {/* Animated Quote */}
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//             }}
//           >
//             <span className="center animated-text">{currentQuote}</span>
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" /> {/* Notification Icon */}
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" /> {/* Course Materials Icon */}
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div>
//           </Link>
//         )}

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               Exit
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <Link href="/teacher/courses">
//             <Button size="sm" variant="success">
//               Admin Mode
//             </Button>
//           </Link>
//         ) : null}

//         {/* Custom UserButton with Progress */}
//         <div className="relative">
//           <UserButton afterSignOutUrl="/sign-in" />
//           {progress !== null && (
//             <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-full shadow-lg">
//               {Math.round(progress)}%
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };





