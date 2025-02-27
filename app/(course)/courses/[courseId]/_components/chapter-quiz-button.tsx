// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
// }

// const ChapterQuizButton = ({ courseId, chapterId }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//     >
//       Start Chapter Quiz
//     </button>
//   );
// };

// export default ChapterQuizButton;





// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean; // New prop to indicate if the quiz is passed
//   hideOnPass?: boolean; // New optional prop to control hiding when quiz is passed
// }

// const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   // Hide the button if hideOnPass is true and the quiz is passed
//   if (hideOnPass && isQuizPassed) {
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//     >
//       {isQuizPassed ? "Quiz Passed" : "Start Chapter Quiz"}
//     </button>
//   );
// };

// export default ChapterQuizButton;





// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean; // New prop to indicate if the quiz is passed
//   hideOnPass?: boolean; // New optional prop to control hiding when quiz is passed
// }

// const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   // Hide the button if hideOnPass is true and the quiz is passed
//   if (hideOnPass && isQuizPassed) {
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//       disabled={isQuizPassed} // Disable the button when quiz is passed to prevent navigation
//     >
//       {isQuizPassed ? "Quiz Passed" : "Start Chapter Quiz"}
//     </button>
//   );
// };

// export default ChapterQuizButton;




"use client";

import { useRouter } from "next/navigation"; // Updated import
import { useEffect, useState } from "react";

interface ChapterQuizButtonProps {
  courseId: string;
  chapterId: string;
  isQuizPassed?: boolean; // New prop to indicate if the quiz is passed
  hideOnPass?: boolean; // New optional prop to control hiding when quiz is passed
}

const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set isClient to true once the component is mounted on the client
  }, []);

  const handleQuizNavigation = () => {
    if (isClient) {
      // Only use the router on the client-side
      router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
    }
  };

  if (!isClient) {
    // Return null if not on the client-side (SSR phase)
    return null;
  }

  // Hide the button if hideOnPass is true and the quiz is passed
  if (hideOnPass && isQuizPassed) {
    return null;
  }

  return (
    <button
      onClick={handleQuizNavigation}
      className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
      disabled={isQuizPassed} // Disable the button when quiz is passed to prevent navigation
    >
      {isQuizPassed ? "Quiz Passed" : "Start Chapter Quiz"}
    </button>
  );
};

export default ChapterQuizButton;