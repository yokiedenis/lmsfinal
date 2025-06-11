// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId }, // Add userId header for auth
//         });
//         if (response.data && Object.keys(response.data).length > 0) {
//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.question, // Matches schema
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt,
//             })),
//             correctAnswer: q.correctAnswer,
//           }));
//           setQuiz(questions);
//         } else {
//           toast.error("No quiz found for this live session.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isLoaded && userId) {
//       fetchQuiz();
//     }
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });
//       setResult(response.data);
//       setIsResultPopupVisible(true);
//       const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//       if (scorePercentage < 60) {
//         setShowRevisitMessage(true);
//         setShowCongratsBanner(false);
//         setShowFireworks(false);
//       } else {
//         setShowCongratsBanner(true);
//         setShowFireworks(true);
//         setShowRevisitMessage(false);
//         setTimeout(() => setShowCongratsBanner(false), 15000);
//         setTimeout(() => setShowFireworks(false), 120000);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch results.");
//       console.error("Error fetching results:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return { questionId, answer: submittedAnswer || "" };
//       });
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }
//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );
//       if (response.data) {
//         fetchResults();
//       } else {
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       toast.error("Failed to submit quiz.");
//       console.error("Error submitting quiz:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   if (!isLoaded) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <div className="p-6">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//           score={result.score}
//           totalQuestions={result.totalQuestions}
//           passingPercentage={60}
//           showRevisitMessage={showRevisitMessage}
//           onClose={() => setIsResultPopupVisible(false)}
//           userName={user?.fullName || "Student"}
//           courseName="Unknown Course" // Update if course title is available
//           completionDate={new Date().toISOString().split("T")[0]}
//           courseId={courseId}
//         />
//       )}
//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <Loader2 className="animate-spin" />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {quiz.length === 0 ? (
//             <p>No questions available for this quiz.</p>
//           ) : (
//             quiz.map((question) => (
//               <div key={question.id} className="mb-4">
//                 <p className="font-semibold">{question.questionText}</p>
//                 <div>
//                   {question.options.map((option) => (
//                     <div key={option.id} className="mb-2">
//                       <input
//                         type="radio"
//                         name={question.id}
//                         id={option.id}
//                         value={option.id}
//                         checked={answers[question.id] === option.id}
//                         onChange={() => handleChange(question.id, option.id)}
//                       />
//                       <label htmlFor={option.id} className="ml-2">{option.text}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//           {quiz.length > 0 && (
//             <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
//               {isSubmitting ? "Submitting..." : "Submit Quiz"}
//             </Button>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };







// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [noQuizFound, setNoQuizFound] = useState(false);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         if (!liveSessionId) {
//           toast.error("Missing live session ID.");
//           setNoQuizFound(true);
//           return;
//         }
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId || "" },
//         });
//         if (response.data && response.data.id && response.data.questions) {
//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.question, // Matches schema
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt,
//             })),
//             correctAnswer: q.correctAnswer,
//           }));
//           setQuiz(questions);
//         } else {
//           setNoQuizFound(true);
//           toast.error("No quiz found for this live session.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//         setNoQuizFound(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isLoaded && userId && liveSessionId) {
//       fetchQuiz();
//     }
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });
//       setResult(response.data);
//       setIsResultPopupVisible(true);
//       const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//       if (scorePercentage < 60) {
//         setShowRevisitMessage(true);
//         setShowCongratsBanner(false);
//         setShowFireworks(false);
//       } else {
//         setShowCongratsBanner(true);
//         setShowFireworks(true);
//         setShowRevisitMessage(false);
//         setTimeout(() => setShowCongratsBanner(false), 15000);
//         setTimeout(() => setShowFireworks(false), 120000);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch results.");
//       console.error("Error fetching results:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return { questionId, answer: submittedAnswer || "" };
//       });
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }
//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );
//       if (response.data) {
//         fetchResults();
//       } else {
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       toast.error("Failed to submit quiz.");
//       console.error("Error submitting quiz:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   if (!isLoaded) {
//     return <div>Loading user data...</div>;
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );
//   }

//   if (noQuizFound) {
//     return <p className="text-center text-slate-600">No quiz available for this live session.</p>;
//   }

//   return (
//     <div className="p-6">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//           score={result.score}
//           totalQuestions={result.totalQuestions}
//           passingPercentage={60}
//           showRevisitMessage={showRevisitMessage}
//           onClose={() => setIsResultPopupVisible(false)}
//           userName={user?.fullName || "Student"}
//           courseName="Unknown Course" // Update if course title is available
//           completionDate={new Date().toISOString().split("T")[0]}
//           courseId={courseId}
//         />
//       )}
//       <form onSubmit={handleSubmit}>
//         {quiz.length === 0 ? (
//           <p className="text-center text-slate-600">No questions available for this quiz.</p>
//         ) : (
//           quiz.map((question) => (
//             <div key={question.id} className="mb-4">
//               <p className="font-semibold">{question.questionText}</p>
//               <div>
//                 {question.options.map((option) => (
//                   <div key={option.id} className="mb-2">
//                     <input
//                       type="radio"
//                       name={question.id}
//                       id={option.id}
//                       value={option.id}
//                       checked={answers[question.id] === option.id}
//                       onChange={() => handleChange(question.id, option.id)}
//                     />
//                     <label htmlFor={option.id} className="ml-2">{option.text}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//         {quiz.length > 0 && (
//           <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
//             {isSubmitting ? "Submitting..." : "Submit Quiz"}
//           </Button>
//         )}
//       </form>
//     </div>
//   );
// };













// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       if (!liveSessionId) {
//         console.error("Missing liveSessionId prop:", liveSessionId);
//         setErrorMessage("Invalid live session ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!userId) {
//         console.error("User not authenticated");
//         setErrorMessage("Please log in to access the quiz.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("Fetching quiz for:", { courseId, liveSessionId, userId });
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId },
//         });

//         console.log("API response:", response.data);

//         if (response.data && response.data.id && response.data.questions) {
//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.question, // Matches schema
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt,
//             })),
//             correctAnswer: q.correctAnswer,
//           }));
//           setQuiz(questions);
//         } else {
//           setErrorMessage(response.data.message || "No quiz found for this live session.");
//         }
//       } catch (error: any) {
//         console.error("Error fetching quiz:", error.response?.data || error.message);
//         setErrorMessage("Failed to load quiz. Please try again.");
//         toast.error("Failed to load quiz.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isLoaded && userId && liveSessionId) {
//       fetchQuiz();
//     } else {
//       console.log("Skipping fetch due to:", { isLoaded, userId, liveSessionId });
//       setIsLoading(false);
//       setErrorMessage("Unable to load quiz. Please ensure you are logged in.");
//     }
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });
//       setResult(response.data);
//       setIsResultPopupVisible(true);
//       const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//       if (scorePercentage < 60) {
//         setShowRevisitMessage(true);
//         setShowCongratsBanner(false);
//         setShowFireworks(false);
//       } else {
//         setShowCongratsBanner(true);
//         setShowFireworks(true);
//         setShowRevisitMessage(false);
//         setTimeout(() => setShowCongratsBanner(false), 15000);
//         setTimeout(() => setShowFireworks(false), 120000);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch results.");
//       console.error("Error fetching results:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return { questionId, answer: submittedAnswer || "" };
//       });
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }
//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );
//       if (response.data) {
//         fetchResults();
//       } else {
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       toast.error("Failed to submit quiz.");
//       console.error("Error submitting quiz:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   if (!isLoaded) {
//     return <div className="text-center text-slate-600">Loading user data...</div>;
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
//       </div>
//     );
//   }

//   if (errorMessage) {
//     return <p className="text-center text-red-600">{errorMessage}</p>;
//   }

//   return (
//     <div className="p-6">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//           score={result.score}
//           totalQuestions={result.totalQuestions}
//           passingPercentage={60}
//           showRevisitMessage={showRevisitMessage}
//           onClose={() => setIsResultPopupVisible(false)}
//           userName={user?.fullName || "Student"}
//           courseName="Unknown Course"
//           completionDate={new Date().toISOString().split("T")[0]}
//           courseId={courseId}
//         />
//       )}
//       <form onSubmit={handleSubmit}>
//         {quiz.length === 0 ? (
//           <p className="text-center text-slate-600">No questions available for this quiz.</p>
//         ) : (
//           quiz.map((question) => (
//             <div key={question.id} className="mb-4">
//               <p className="font-semibold">{question.questionText}</p>
//               <div>
//                 {question.options.map((option) => (
//                   <div key={option.id} className="mb-2">
//                     <input
//                       type="radio"
//                       name={question.id}
//                       id={option.id}
//                       value={option.id}
//                       checked={answers[question.id] === option.id}
//                       onChange={() => handleChange(question.id, option.id)}
//                     />
//                     <label htmlFor={option.id} className="ml-2">{option.text}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//         {quiz.length > 0 && (
//           <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
//             {isSubmitting ? "Submitting..." : "Submit Quiz"}
//           </Button>
//         )}
//       </form>
//     </div>
//   );
// };












// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       console.log("[QUIZ_FORM] Input parameters:", { courseId, liveSessionId, userId, isLoaded });

//       // Validate inputs
//       if (!courseId) {
//         console.error("[QUIZ_FORM] Missing courseId prop");
//         setErrorMessage("Invalid course ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!liveSessionId) {
//         console.error("[QUIZ_FORM] Missing liveSessionId prop");
//         setErrorMessage("Invalid live session ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!isLoaded) {
//         console.error("[QUIZ_FORM] User data not loaded");
//         setErrorMessage("User data is still loading. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       if (!userId) {
//         console.error("[QUIZ_FORM] User not authenticated");
//         setErrorMessage("Please log in to access the quiz.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("[QUIZ_FORM] Fetching quiz from API:", `/api/courses/${courseId}/livesessionquizzes/fetch`, { liveSessionId, userId });
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/fetch`, {
//           params: { liveSessionId },
          
//           headers: { "user-id": userId },
//         });

//         console.log("[QUIZ_FORM] API response:", response.status, response.data);

//         // Handle empty object response
//         if (Object.keys(response.data).length === 0) {
//           console.error("[QUIZ_FORM] Empty quiz data returned");
//           setErrorMessage("No quiz found for this live session.");
//           setIsLoading(false);
//           return;
//         }

//         // Validate response data
//         if (response.data && response.data.id && response.data.questions && Array.isArray(response.data.questions)) {
//           // Check if quiz is published
//           if (response.data.isPublished === false) {
//             console.warn("[QUIZ_FORM] Quiz is unpublished:", response.data);
//             setErrorMessage("This quiz is not yet available. Please contact your instructor.");
//             setIsLoading(false);
//             return;
//           }

//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.question,
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt,
//             })),
//             correctAnswer: q.correctAnswer,
//           }));
//           console.log("[QUIZ_FORM] Processed questions:", questions);
//           setQuiz(questions);
//         } else if (response.data.message) {
//           console.error("[QUIZ_FORM] API returned error message:", response.data.message);
//           setErrorMessage(response.data.message);
//         } else {
//           console.error("[QUIZ_FORM] Invalid quiz data structure");
//           setErrorMessage("Invalid quiz data received from server.");
//         }
//       } catch (error: any) {
//         console.error("[QUIZ_FORM] Error fetching quiz:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         const errorMsg =
//           error.response?.data?.message ||
//           (error.response?.status === 403
//             ? "This quiz is not yet available or you lack access. Please contact your instructor."
//             : "Failed to load quiz. Please try again.");
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     console.log("[QUIZ_FORM] Checking fetch conditions:", { isLoaded, userId, liveSessionId, courseId });
//     // Determine specific error message
//     let skipReason = "";
//     if (!isLoaded) skipReason = "User data not loaded";
//     else if (!userId) skipReason = "User not authenticated";
//     else if (!liveSessionId) skipReason = "Invalid live session ID";
//     else if (!courseId) skipReason = "Invalid course ID";

//     if (isLoaded && userId && liveSessionId && courseId) {
//       fetchQuiz();
//     } else {
//       console.error("[QUIZ_FORM] Fetch skipped due to:", skipReason);
//       setErrorMessage(`Unable to load quiz: ${skipReason}. Please ensure you are logged in and have access.`);
//       setIsLoading(false);
//     }
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for fetching results");
//         toast.error("User not authenticated.");
//         return;
//       }
//       console.log("[QUIZ_FORM] Fetching results from API:", `/api/courses/${courseId}/livesessionquizzes/results`);
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });

//       console.log("[QUIZ_FORM] Results API response:", response.data);
//       if (response.data && typeof response.data.score === "number" && typeof response.data.totalQuestions === "number") {
//         setResult(response.data);
//         setIsResultPopupVisible(true);
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         if (scorePercentage < 60) {
//           setShowRevisitMessage(true);
//           setShowCongratsBanner(false);
//           setShowFireworks(false);
//         } else {
//           setShowCongratsBanner(true);
//           setShowFireworks(true);
//           setShowRevisitMessage(false);
//           setTimeout(() => setShowCongratsBanner(false), 15000);
//           setTimeout(() => setShowFireworks(false), 120000);
//         }
//       } else {
//         console.error("[QUIZ_FORM] Invalid results data:", response.data);
//         toast.error("Invalid results data received.");
//       }
//     } catch (error) {
//       console.error("[QUIZ_FORM] Error fetching results:", error);
//       toast.error("Failed to fetch results.");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return { questionId, answer: submittedAnswer || "" };
//       });

//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for submission");
//         toast.error("User not authenticated.");
//         setIsSubmitting(false);
//         return;
//       }

//       console.log("[QUIZ_FORM] Submitting quiz:", { courseId, liveSessionId, answers: answersToSubmit });
//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );

//       console.log("[QUIZ_FORM] Submit API response:", response.data);
//       if (response.data) {
//         fetchResults();
//       } else {
//         console.error("[QUIZ_FORM] No data in submit response");
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       console.error("[QUIZ_FORM] Error submitting quiz:", error);
//       toast.error("Failed to submit quiz.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     console.log("[QUIZ_FORM] Answer selected:", { questionId, optionId });
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   if (!isLoaded) {
//     return <div className="text-center text-slate-600">Loading user data...</div>;
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
//       </div>
//     );
//   }

//   if (errorMessage) {
//     return <p className="text-center text-red-600">{errorMessage}</p>;
//   }

//   return (
//     <div className="p-6">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//           score={result.score}
//           totalQuestions={result.totalQuestions}
//           passingPercentage={60}
//           showRevisitMessage={showRevisitMessage}
//           onClose={() => setIsResultPopupVisible(false)}
//           userName={user?.fullName || "Student"}
//           courseName="Unknown Course"
//           completionDate={new Date().toISOString().split("T")[0]}
//           courseId={courseId}
//         />
//       )}
//       <form onSubmit={handleSubmit}>
//         {quiz.length === 0 ? (
//           <p className="text-center text-slate-600">No questions available for this quiz.</p>
//         ) : (
//           quiz.map((question) => (
//             <div key={question.id} className="mb-4">
//               <p className="font-semibold">{question.questionText}</p>
//               <div>
//                 {question.options.map((option) => (
//                   <div key={option.id} className="mb-2">
//                     <input
//                       type="radio"
//                       name={question.id}
//                       id={option.id}
//                       value={option.id}
//                       checked={answers[question.id] === option.id}
//                       onChange={() => handleChange(question.id, option.id)}
//                     />
//                     <label htmlFor={option.id} className="ml-2">{option.text}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//         {quiz.length > 0 && (
//           <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
//             {isSubmitting ? "Submitting..." : "Submit Quiz"}
//           </Button>
//         )}
//       </form>
//     </div>
//   );
// };






// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       console.log("[QUIZ_FORM] Input parameters:", { courseId, liveSessionId, userId, isLoaded });

//       // Validate inputs
//       if (!courseId) {
//         console.error("[QUIZ_FORM] Missing courseId prop");
//         setErrorMessage("Invalid course ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!liveSessionId) {
//         console.error("[QUIZ_FORM] Missing liveSessionId prop");
//         setErrorMessage("Invalid live session ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!isLoaded) {
//         console.error("[QUIZ_FORM] User data not loaded");
//         setErrorMessage("User data is still loading. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       if (!userId) {
//         console.error("[QUIZ_FORM] User not authenticated");
//         setErrorMessage("Please log in to access the quiz.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("[QUIZ_FORM] Fetching quiz from API:", `/api/courses/${courseId}/livesessionquizzes/fetch`, { liveSessionId, userId });
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/fetch`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId },
//         });

//         console.log("[QUIZ_FORM] API response:", response.status, response.data);

//         // Handle empty object or message response
//         if (response.data?.message || Object.keys(response.data).length === 0) {
//           console.warn("[QUIZ_FORM] No published quiz available:", response.data.message || "Empty quiz data returned");
//           setErrorMessage(response.data.message || "No quiz found for this live session. Please contact your instructor.");
//           setIsLoading(false);
//           return;
//         }

//         // Validate response data
//         if (response.data && response.data.id && response.data.questions && Array.isArray(response.data.questions)) {
//           // Check if quiz is published
//           if (response.data.isPublished === false) {
//             console.warn("[QUIZ_FORM] Quiz is unpublished:", response.data);
//             setErrorMessage("This quiz is not yet available. Please contact your instructor.");
//             setIsLoading(false);
//             return;
//           }

//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.text || "Question text unavailable", // Use q.text instead of q.question
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt || `Option ${optIndex + 1}`,
//             })),
//             correctAnswer: q.correctAnswer || "",
//           }));
//           console.log("[QUIZ_FORM] Processed questions:", questions);
//           setQuiz(questions);
//           setTotalQuestions(questions.length);
//         } else {
//           console.error("[QUIZ_FORM] Invalid quiz data structure");
//           setErrorMessage("Invalid quiz data received from server.");
//         }
//       } catch (error: any) {
//         console.error("[QUIZ_FORM] Error fetching quiz:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         const errorMsg =
//           error.response?.data?.message ||
//           (error.response?.status === 403
//             ? "This quiz is not yet available or you lack access. Please contact your instructor."
//             : "Failed to load quiz. Please try again.");
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     console.log("[QUIZ_FORM] Checking fetch conditions:", { isLoaded, userId, liveSessionId, courseId });
//     let skipReason = "";
//     if (!isLoaded) skipReason = "User data not loaded";
//     else if (!userId) skipReason = "User not authenticated";
//     else if (!liveSessionId) skipReason = "Invalid live session ID";
//     else if (!courseId) skipReason = "Invalid course ID";

//     if (isLoaded && userId && liveSessionId && courseId) {
//       fetchQuiz();
//     } else {
//       console.error("[QUIZ_FORM] Fetch skipped due to:", skipReason);
//       setErrorMessage(`Unable to load quiz: ${skipReason}. Please ensure you are logged in and have access.`);
//       setIsLoading(false);
//     }

//     const dateTimer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(dateTimer);
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsSubmitting(true);
//       handleSubmit(); // Automatically submit when time runs out
//     } else {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [timeLeft]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for fetching results");
//         toast.error("User not authenticated.");
//         return;
//       }
//       console.log("[QUIZ_FORM] Fetching results from API:", `/api/courses/${courseId}/livesessionquizzes/results`);
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });

//       console.log("[QUIZ_FORM] Results API response:", response.data);
//       if (response.data && typeof response.data.score === "number" && typeof response.data.totalQuestions === "number") {
//         setResult(response.data);
//         setIsResultPopupVisible(true);
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         if (scorePercentage < 60) {
//           setShowRevisitMessage(true);
//           setShowCongratsBanner(false);
//           setShowFireworks(false);
//         } else {
//           setShowCongratsBanner(true);
//           setShowFireworks(true);
//           setShowRevisitMessage(false);
//           setTimeout(() => setShowCongratsBanner(false), 15000);
//           setTimeout(() => setShowFireworks(false), 120000);
//         }
//       } else {
//         console.error("[QUIZ_FORM] Invalid results data:", response.data);
//         toast.error("Invalid results data received.");
//       }
//     } catch (error) {
//       console.error("[QUIZ_FORM] Error fetching results:", error);
//       toast.error("Failed to fetch results.");
//     }
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     if (startTime && currentDateTime) {
//       const endTime = new Date();
//       const timeDiff = endTime.getTime() - startTime.getTime();
//       const seconds = Math.floor(timeDiff / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
//     }

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return { questionId, answer: submittedAnswer || "" };
//       });

//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for submission");
//         toast.error("User not authenticated.");
//         setIsSubmitting(false);
//         return;
//       }

//       console.log("[QUIZ_FORM] Submitting quiz:", { courseId, liveSessionId, answers: answersToSubmit });
//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );

//       console.log("[QUIZ_FORM] Submit API response:", response.data);
//       if (response.data) {
//         fetchResults();
//       } else {
//         console.error("[QUIZ_FORM] No data in submit response");
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       console.error("[QUIZ_FORM] Error submitting quiz:", error);
//       toast.error("Failed to submit quiz.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     console.log("[QUIZ_FORM] Answer selected:", { questionId, optionId });
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleJumpToQuestion = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   const formatDateTime = (date: Date) => {
//     return date.toLocaleString("en-US", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const userName = user?.fullName || "Student";
//   const completionDate = currentDateTime ? formatDateTime(currentDateTime) : "N/A";
//   const courseName = "Live Session Quiz"; // Placeholder, as course name isn't fetched

//   if (!isLoaded) {
//     return <div className="text-center text-slate-600">Loading user data...</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">LIVE SESSION QUIZ</h1>
//           <h2 className="text-lg">
//             Believe in yourself. You are braver than you think, and smarter than you know✨
//           </h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && startTime ? formatDateTime(startTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">Finished</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime
//                   ? `${formatDateTime(currentDateTime)} (Time Taken: ${timeTaken})`
//                   : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">{timeTaken}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time Remaining</td>
//               <td className="p-2 text-sm text-gray-600">{formatTime(timeLeft)}</td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading || errorMessage ? (
//           <div className="flex justify-center items-center mt-8">
//             {isLoading ? (
//               <Loader2 className="animate-spin text-blue-500" />
//             ) : (
//               <p className="text-center text-red-600">{errorMessage}</p>
//             )}
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 ? (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText || "Question text unavailable"}</p>
//                   </div>
//                   <div className="mt-4 pl-4">
//                     {quiz[currentQuestionIndex].options.map((option) => (
//                       <div key={option.id} className="mb-2">
//                         <input
//                           type="radio"
//                           name={quiz[currentQuestionIndex].id}
//                           id={option.id}
//                           value={option.id}
//                           checked={answers[quiz[currentQuestionIndex].id] === option.id}
//                           onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
//                           className="cursor-pointer"
//                         />
//                         <label
//                           htmlFor={option.id}
//                           className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900"
//                         >
//                           {option.text || "Option unavailable"}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-between">
//                   <Button
//                     onClick={handlePrevious}
//                     disabled={currentQuestionIndex === 0}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     onClick={handleNext}
//                     disabled={currentQuestionIndex === quiz.length - 1}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Next
//                   </Button>
//                 </div>

//                 <Button
//                   type="submit"
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
//                   disabled={isSubmitting}
//                   className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             ) : (
//               <p className="text-center text-slate-600 mt-8">No questions available for this quiz.</p>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz!" />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             showRevisitMessage={showRevisitMessage}
//             onClose={() => setIsResultPopupVisible(false)}
//             userName={userName}
//             courseName={courseName}
//             completionDate={completionDate}
//             courseId={courseId}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz Navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id]
//                   ? "bg-blue-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-blue-300"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <p className="text-sm text-blue-600 mt-4">Show one page at a time</p>
//         <p className="text-sm text-blue-600 mt-2">Finish review</p>
//       </div>
//     </div>
//   );
// };







// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string; // Raw option value (e.g., "D")
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   // Map raw option values to display labels
//   const getOptionDisplayText = (optionText: string) => {
//     const displayMap: { [key: string]: string } = {
//       D: "D. testing quiz component",
//     };
//     return displayMap[optionText] || optionText;
//   };

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       console.log("[QUIZ_FORM] Input parameters:", { courseId, liveSessionId, userId, isLoaded });

//       if (!courseId) {
//         console.error("[QUIZ_FORM] Missing courseId prop");
//         setErrorMessage("Invalid course ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!liveSessionId) {
//         console.error("[QUIZ_FORM] Missing liveSessionId prop");
//         setErrorMessage("Invalid live session ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!isLoaded) {
//         console.error("[QUIZ_FORM] User data not loaded");
//         setErrorMessage("User data is still loading. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       if (!userId) {
//         console.error("[QUIZ_FORM] User not authenticated");
//         setErrorMessage("Please log in to access the quiz.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("[QUIZ_FORM] Fetching quiz from API:", `/api/courses/${courseId}/livesessionquizzes/fetch`, { liveSessionId, userId });
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/fetch`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId },
//         });

//         console.log("[QUIZ_FORM] API response:", response.status, response.data);

//         if (response.data?.message || Object.keys(response.data).length === 0) {
//           console.warn("[QUIZ_FORM] No published quiz available:", response.data.message || "Empty quiz data returned");
//           setErrorMessage(response.data.message || "No quiz found for this live session. Please contact your instructor.");
//           setIsLoading(false);
//           return;
//         }

//         if (response.data && response.data.id && response.data.questions && Array.isArray(response.data.questions)) {
//           if (response.data.isPublished === false) {
//             console.warn("[QUIZ_FORM] Quiz is unpublished:", response.data);
//             setErrorMessage("This quiz is not yet available. Please contact your instructor.");
//             setIsLoading(false);
//             return;
//           }

//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.text || "Question text unavailable",
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt,
//             })),
//             correctAnswer: q.correctAnswer || "",
//           }));
//           console.log("[QUIZ_FORM] Processed questions:", questions);
//           setQuiz(questions);
//           setTotalQuestions(questions.length);
//         } else {
//           console.error("[QUIZ_FORM] Invalid quiz data structure");
//           setErrorMessage("Invalid quiz data received from server.");
//         }
//       } catch (error: any) {
//         console.error("[QUIZ_FORM] Error fetching quiz:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         const errorMsg =
//           error.response?.data?.message ||
//           (error.response?.status === 403
//             ? "This quiz is not yet available or you lack access. Please contact your instructor."
//             : "Failed to load quiz. Please try again.");
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     console.log("[QUIZ_FORM] Checking fetch conditions:", { isLoaded, userId, liveSessionId, courseId });
//     let skipReason = "";
//     if (!isLoaded) skipReason = "User data not loaded";
//     else if (!userId) skipReason = "User not authenticated";
//     else if (!liveSessionId) skipReason = "Invalid live session ID";
//     else if (!courseId) skipReason = "Invalid course ID";

//     if (isLoaded && userId && liveSessionId && courseId) {
//       fetchQuiz();
//     } else {
//       console.error("[QUIZ_FORM] Fetch skipped due to:", skipReason);
//       setErrorMessage(`Unable to load quiz: ${skipReason}. Please ensure you are logged in and have access.`);
//       setIsLoading(false);
//     }

//     const dateTimer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(dateTimer);
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsSubmitting(true);
//       handleSubmit();
//     } else {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [timeLeft]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for fetching results");
//         toast.error("User not authenticated.");
//         return;
//       }
//       console.log("[QUIZ_FORM] Fetching results from API:", `/api/courses/${courseId}/livesessionquizzes/results`);
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });

//       console.log("[QUIZ_FORM] Results API response:", response.data);
//       if (response.data && typeof response.data.score === "number" && typeof response.data.totalQuestions === "number") {
//         setResult(response.data);
//         setIsResultPopupVisible(true);
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         if (scorePercentage < 60) {
//           setShowRevisitMessage(true);
//           setShowCongratsBanner(false);
//           setShowFireworks(false);
//         } else {
//           setShowCongratsBanner(true);
//           setShowFireworks(true);
//           setShowRevisitMessage(false);
//           setTimeout(() => setShowCongratsBanner(false), 15000);
//           setTimeout(() => setShowFireworks(false), 120000);
//         }
//       } else {
//         console.error("[QUIZ_FORM] Invalid results data:", response.data);
//         toast.error("Invalid results data received.");
//       }
//     } catch (error) {
//       console.error("[QUIZ_FORM] Error fetching results:", error);
//       toast.error("Failed to fetch results.");
//     }
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     if (startTime && currentDateTime) {
//       const endTime = new Date();
//       const timeDiff = endTime.getTime() - startTime.getTime();
//       const seconds = Math.floor(timeDiff / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
//     }

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const option = question?.options.find((opt) => opt.id === answerId);
//         return { questionId, answer: option?.text || "" };
//       });

//       console.log("[QUIZ_FORM] Submitting answers:", { courseId, liveSessionId, answers: answersToSubmit });

//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for submission");
//         toast.error("User not authenticated.");
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );

//       console.log("[QUIZ_FORM] Submit API response:", response.data);
//       if (response.data) {
//         fetchResults();
//       } else {
//         console.error("[QUIZ_FORM] No data in submit response");
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       console.error("[QUIZ_FORM] Error submitting quiz:", error);
//       toast.error("Failed to submit quiz.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     console.log("[QUIZ_FORM] Answer selected:", { questionId, optionId });
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleJumpToQuestion = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   const formatDateTime = (date: Date) => {
//     return date.toLocaleString("en-US", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const userName = user?.fullName || "Student";
//   const completionDate = currentDateTime ? formatDateTime(currentDateTime) : "N/A";
//   const courseName = "Live Session Quiz";

//   if (!isLoaded) {
//     return <div className="text-center text-slate-600">Loading user data...</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">LIVE SESSION QUIZ</h1>
//           <h2 className="text-lg">
//             Believe in yourself. You are braver than you think, and smarter than you know✨
//           </h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && startTime ? formatDateTime(startTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">Finished</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime
//                   ? `${formatDateTime(currentDateTime)} (Time Taken: ${timeTaken})`
//                   : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">{timeTaken}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time Remaining</td>
//               <td className="p-2 text-sm text-gray-600">{formatTime(timeLeft)}</td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading || errorMessage ? (
//           <div className="flex justify-center items-center mt-8">
//             {isLoading ? (
//               <Loader2 className="animate-spin text-blue-500" />
//             ) : (
//               <p className="text-center text-red-600">{errorMessage}</p>
//             )}
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 ? (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText || "Question text unavailable"}</p>
//                   </div>
//                   <div className="mt-4 pl-4">
//                     {quiz[currentQuestionIndex].options.map((option) => (
//                       <div key={option.id} className="mb-2">
//                         <input
//                           type="radio"
//                           name={quiz[currentQuestionIndex].id}
//                           id={option.id}
//                           value={option.id}
//                           checked={answers[quiz[currentQuestionIndex].id] === option.id}
//                           onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
//                           className="cursor-pointer"
//                         />
//                         <label
//                           htmlFor={option.id}
//                           className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900"
//                         >
//                           {getOptionDisplayText(option.text) || "Option unavailable"}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-between">
//                   <Button
//                     onClick={handlePrevious}
//                     disabled={currentQuestionIndex === 0}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     onClick={handleNext}
//                     disabled={currentQuestionIndex === quiz.length - 1}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Next
//                   </Button>
//                 </div>

//                 <Button
//                   type="submit"
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
//                   disabled={isSubmitting}
//                   className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             ) : (
//               <p className="text-center text-slate-600 mt-8">No questions available for this quiz.</p>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz!" />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             showRevisitMessage={showRevisitMessage}
//             onClose={() => setIsResultPopupVisible(false)}
//             userName={userName}
//             courseName={courseName}
//             completionDate={completionDate}
//             courseId={courseId}
//           />
//         )}
//       </div>

//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz Navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id]
//                   ? "bg-blue-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-blue-300"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <p className="text-sm text-blue-600 mt-4">Show one page at a time</p>
//         <p className="text-sm text-blue-600 mt-2">Finish review</p>
//       </div>
//     </div>
//   );
// };
















// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string; // Raw option value (e.g., "D")
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number; invalidAnswers?: string[] } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   // Map raw option values to display labels for UI only
//   const getOptionDisplayText = (optionText: string) => {
//     const displayMap: { [key: string]: string } = {
//       D: "D. testing quiz component",
//       A: "A. MongoDB, Express.js, React, Node.js",
//       B: "B. To differentiate between the network and host portions of an IP address",
//       C: "C. Security Question",
//     };
//     return displayMap[optionText] || optionText;
//   };

//   // Reverse map display text to raw values for submission
//   const getRawOptionValue = (displayText: string) => {
//     const reverseDisplayMap: { [key: string]: string } = {
//       "D. testing quiz component": "D",
//       "A. MongoDB, Express.js, React, Node.js": "A",
//       "B. To differentiate between the network and host portions of an IP address": "B",
//       "C. Security Question": "C",
//     };
//     return reverseDisplayMap[displayText.trim()] || displayText;
//   };

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       console.log("[QUIZ_FORM] Input parameters:", { courseId, liveSessionId, userId, isLoaded });

//       if (!courseId) {
//         console.error("[QUIZ_FORM] Missing courseId prop");
//         setErrorMessage("Invalid course ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!liveSessionId) {
//         console.error("[QUIZ_FORM] Missing liveSessionId prop");
//         setErrorMessage("Invalid live session ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!isLoaded) {
//         console.error("[QUIZ_FORM] User data not loaded");
//         setErrorMessage("User data is still loading. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       if (!userId) {
//         console.error("[QUIZ_FORM] User not authenticated");
//         setErrorMessage("Please log in to access the quiz.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("[QUIZ_FORM] Fetching quiz from API:", `/api/courses/${courseId}/livesessionquizzes/fetch`, { liveSessionId, userId });
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/fetch`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId },
//         });

//         console.log("[QUIZ_FORM] API response:", response.status, response.data);

//         if (response.data?.message || Object.keys(response.data).length === 0) {
//           console.warn("[QUIZ_FORM] No published quiz available:", response.data.message || "Empty quiz data returned");
//           setErrorMessage(response.data.message || "No quiz found for this live session. Please contact your instructor.");
//           setIsLoading(false);
//           return;
//         }

//         if (response.data && response.data.id && response.data.questions && Array.isArray(response.data.questions)) {
//           if (response.data.isPublished === false) {
//             console.warn("[QUIZ_FORM] Quiz is unpublished:", response.data);
//             setErrorMessage("This quiz is not yet available. Please contact your instructor.");
//             setIsLoading(false);
//             return;
//           }

//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.text || "Question text unavailable",
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt, // API returns display text (e.g., "D. testing quiz component")
//             })),
//             correctAnswer: q.correctAnswer || "",
//           }));
//           console.log("[QUIZ_FORM] Processed questions:", questions);
//           setQuiz(questions);
//           setTotalQuestions(questions.length);
//         } else {
//           console.error("[QUIZ_FORM] Invalid quiz data structure");
//           setErrorMessage("Invalid quiz data received from server.");
//         }
//       } catch (error: any) {
//         console.error("[QUIZ_FORM] Error fetching quiz:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         const errorMsg =
//           error.response?.data?.message ||
//           (error.response?.status === 403
//             ? "This quiz is not yet available or you lack access. Please contact your instructor."
//             : "Failed to load quiz. Please try again.");
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     console.log("[QUIZ_FORM] Checking fetch conditions:", { isLoaded, userId, liveSessionId, courseId });
//     let skipReason = "";
//     if (!isLoaded) skipReason = "User data not loaded";
//     else if (!userId) skipReason = "User not authenticated";
//     else if (!liveSessionId) skipReason = "Invalid live session ID";
//     else if (!courseId) skipReason = "Invalid course ID";

//     if (isLoaded && userId && liveSessionId && courseId) {
//       fetchQuiz();
//     } else {
//       console.error("[QUIZ_FORM] Fetch skipped due to:", skipReason);
//       setErrorMessage(`Unable to load quiz: ${skipReason}. Please ensure you are logged in and have access.`);
//       setIsLoading(false);
//     }

//     const dateTimer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(dateTimer);
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsSubmitting(true);
//       handleSubmit();
//     } else {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [timeLeft]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for fetching results");
//         toast.error("User not authenticated.");
//         return;
//       }
//       console.log("[QUIZ_FORM] Fetching results from API:", `/api/courses/${courseId}/livesessionquizzes/results`);
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });

//       console.log("[QUIZ_FORM] Results API response:", response.data);
//       if (response.data && typeof response.data.score === "number" && typeof response.data.totalQuestions === "number") {
//         setResult(response.data);
//         setIsResultPopupVisible(true);
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         if (scorePercentage < 60) {
//           setShowRevisitMessage(true);
//           setShowCongratsBanner(false);
//           setShowFireworks(false);
//         } else {
//           setShowCongratsBanner(true);
//           setShowFireworks(true);
//           setShowRevisitMessage(false);
//           setTimeout(() => setShowCongratsBanner(false), 15000);
//           setTimeout(() => setShowFireworks(false), 120000);
//         }
//         if (response.data.invalidAnswers?.length) {
//           console.warn("[QUIZ_FORM] Invalid answers detected:", response.data.invalidAnswers);
//           toast.error(`Some answers were invalid: ${response.data.invalidAnswers.join(", ")}`);
//         }
//       } else {
//         console.error("[QUIZ_FORM] Invalid results data:", response.data);
//         toast.error("Invalid results data received.");
//       }
//     } catch (error: any) {
//       console.error("[QUIZ_FORM] Error fetching results:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch results.");
//     }
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     if (startTime && currentDateTime) {
//       const endTime = new Date();
//       const timeDiff = endTime.getTime() - startTime.getTime();
//       const seconds = Math.floor(timeDiff / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
//     }

//     try {
//       // Map answers to submit raw option values (e.g., "D")
//       const answersToSubmit = Object.entries(answers).map(([questionId, optionId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const option = question?.options.find((opt) => opt.id === optionId);
//         const rawAnswer = option?.text ? getRawOptionValue(option.text) : "";
//         console.log("[QUIZ_SUBMIT] Mapping answer:", { questionId, optionId, option, rawAnswer });
//         return { questionId, answer: rawAnswer };
//       });

//       // Validate that all questions have answers
//       if (answersToSubmit.length !== quiz.length) {
//         console.warn("[QUIZ_FORM] Not all questions answered:", { answersToSubmit, totalQuestions: quiz.length });
//         toast.error("Please answer all questions before submitting.");
//         setIsSubmitting(false);
//         return;
//       }

//       console.log("[QUIZ_SUBMIT] Sending payload:", { courseId, liveSessionId, answers: answersToSubmit });

//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for submission");
//         toast.error("User not authenticated.");
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );

//       console.log("[QUIZ_FORM] Submit API response:", response.data);
//       if (response.data) {
//         await fetchResults();
//       } else {
//         console.error("[QUIZ_FORM] No data in submit response");
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error: any) {
//       console.error("[QUIZ_SUBMIT] Client-side error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || "Failed to submit quiz.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     console.log("[QUIZ_FORM] Answer selected:", { questionId, optionId });
//     setAnswers((prev) => {
//       const newAnswers = { ...prev, [questionId]: optionId };
//       console.log("[QUIZ_FORM] Updated answers:", newAnswers);
//       return newAnswers;
//     });
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleJumpToQuestion = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   const formatDateTime = (date: Date) => {
//     return date.toLocaleString("en-US", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const userName = user?.fullName || "Student";
//   const completionDate = currentDateTime ? formatDateTime(currentDateTime) : "N/A";
//   const courseName = "Live Session Quiz";

//   if (!isLoaded) {
//     return <div className="text-center text-slate-600">Loading user data...</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">LIVE SESSION QUIZ</h1>
//           <h2 className="text-lg">
//             Believe in yourself. You are braver than you think, and smarter than you know✨
//           </h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && startTime ? formatDateTime(startTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">{quizCompleted ? "Finished" : "In Progress"}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime
//                   ? `${formatDateTime(currentDateTime)} (Time Taken: ${timeTaken})`
//                   : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">{timeTaken}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time Remaining</td>
//               <td className="p-2 text-sm text-gray-600">{formatTime(timeLeft)}</td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading || errorMessage ? (
//           <div className="flex justify-center items-center mt-8">
//             {isLoading ? (
//               <Loader2 className="animate-spin text-blue-500" />
//             ) : (
//               <p className="text-center text-red-600">{errorMessage}</p>
//             )}
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 ? (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText || "Question text unavailable"}</p>
//                   </div>
//                   <div className="mt-4 pl-4">
//                     {quiz[currentQuestionIndex].options.map((option) => {
//                       console.log("[QUIZ_FORM] Option:", {
//                         id: option.id,
//                         text: option.text,
//                         display: getOptionDisplayText(option.text),
//                       });
//                       return (
//                         <div key={option.id} className="mb-2">
//                           <input
//                             type="radio"
//                             name={quiz[currentQuestionIndex].id}
//                             id={option.id}
//                             value={option.id}
//                             checked={answers[quiz[currentQuestionIndex].id] === option.id}
//                             onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
//                             className="cursor-pointer"
//                             disabled={quizCompleted}
//                           />
//                           <label
//                             htmlFor={option.id}
//                             className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900"
//                           >
//                             {getOptionDisplayText(option.text) || "Option unavailable"}
//                           </label>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-between">
//                   <Button
//                     onClick={handlePrevious}
//                     disabled={currentQuestionIndex === 0 || quizCompleted}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     onClick={handleNext}
//                     disabled={currentQuestionIndex === quiz.length - 1 || quizCompleted}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Next
//                   </Button>
//                 </div>

//                 {!quizCompleted && (
//                   <Button
//                     type="submit"
//                     onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
//                     disabled={isSubmitting}
//                     className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                   </Button>
//                 )}
//               </div>
//             ) : (
//               <p className="text-center text-slate-600 mt-8">No questions available for this quiz.</p>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz!" />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             showRevisitMessage={showRevisitMessage}
//             onClose={() => setIsResultPopupVisible(false)}
//             userName={userName}
//             courseName={courseName}
//             completionDate={completionDate}
//             courseId={courseId}
//           />
//         )}
//       </div>

//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz Navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               disabled={quizCompleted}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id]
//                   ? "bg-blue-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-blue-300"
//               } ${quizCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <p className="text-sm text-blue-600 mt-4">Show one page at a time</p>
//         <p className="text-sm text-blue-600 mt-2">Finish review</p>
//       </div>
//     </div>
//   );
// };












// components/LiveSessionQuizForm.tsx
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import LiveSessionResultPopup from "./LiveSessionResultPopup"; // Updated import
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string; // Raw option value (e.g., "D")
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface LiveSessionQuizFormProps {
//   courseId: string;
//   liveSessionId: string;
// }

// export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number; invalidAnswers?: string[] } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const { user, isLoaded } = useUser();
//   const userId = user?.id;

//   // Map raw option values to display labels for UI only
//   const getOptionDisplayText = (optionText: string) => {
//     const displayMap: { [key: string]: string } = {
//       D: "D. testing quiz component",
//       A: "A. MongoDB, Express.js, React, Node.js",
//       B: "B. To differentiate between the network and host portions of an IP address",
//       C: "C. Security Question",
//     };
//     return displayMap[optionText] || optionText;
//   };

//   // Reverse map display text to raw values for submission
//   const getRawOptionValue = (displayText: string) => {
//     const reverseDisplayMap: { [key: string]: string } = {
//       "D. testing quiz component": "D",
//       "A. MongoDB, Express.js, React, Node.js": "A",
//       "B. To differentiate between the network and host portions of an IP address": "B",
//       "C. Security Question": "C",
//     };
//     return reverseDisplayMap[displayText.trim()] || displayText;
//   };

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       console.log("[QUIZ_FORM] Input parameters:", { courseId, liveSessionId, userId, isLoaded });

//       if (!courseId) {
//         console.error("[QUIZ_FORM] Missing courseId prop");
//         setErrorMessage("Invalid course ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!liveSessionId) {
//         console.error("[QUIZ_FORM] Missing liveSessionId prop");
//         setErrorMessage("Invalid live session ID.");
//         setIsLoading(false);
//         return;
//       }

//       if (!isLoaded) {
//         console.error("[QUIZ_FORM] User data not loaded");
//         setErrorMessage("User data is still loading. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       if (!userId) {
//         console.error("[QUIZ_FORM] User not authenticated");
//         setErrorMessage("Please log in to access the quiz.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("[QUIZ_FORM] Fetching quiz from API:", `/api/courses/${courseId}/livesessionquizzes/fetch`, { liveSessionId, userId });
//         const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/fetch`, {
//           params: { liveSessionId },
//           headers: { "user-id": userId },
//         });

//         console.log("[QUIZ_FORM] API response:", response.status, response.data);

//         if (response.data?.message || Object.keys(response.data).length === 0) {
//           console.warn("[QUIZ_FORM] No published quiz available:", response.data.message || "Empty quiz data returned");
//           setErrorMessage(response.data.message || "No quiz found for this live session. Please contact your instructor.");
//           setIsLoading(false);
//           return;
//         }

//         if (response.data && response.data.id && response.data.questions && Array.isArray(response.data.questions)) {
//           if (response.data.isPublished === false) {
//             console.warn("[QUIZ_FORM] Quiz is unpublished:", response.data);
//             setErrorMessage("This quiz is not yet available. Please contact your instructor.");
//             setIsLoading(false);
//             return;
//           }

//           const questions = response.data.questions.map((q: any, index: number) => ({
//             id: `${response.data.id}-${index}`,
//             questionText: q.text || "Question text unavailable",
//             options: q.options.map((opt: string, optIndex: number) => ({
//               id: `${response.data.id}-${index}-${optIndex}`,
//               text: opt, // API returns display text (e.g., "D. testing quiz component")
//             })),
//             correctAnswer: q.correctAnswer || "",
//           }));
//           console.log("[QUIZ_FORM] Processed questions:", questions);
//           setQuiz(questions);
//           setTotalQuestions(questions.length);
//         } else {
//           console.error("[QUIZ_FORM] Invalid quiz data structure");
//           setErrorMessage("Invalid quiz data received from server.");
//         }
//       } catch (error: any) {
//         console.error("[QUIZ_FORM] Error fetching quiz:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         const errorMsg =
//           error.response?.data?.message ||
//           (error.response?.status === 403
//             ? "This quiz is not yet available or you lack access. Please contact your instructor."
//             : "Failed to load quiz. Please try again.");
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     console.log("[QUIZ_FORM] Checking fetch conditions:", { isLoaded, userId, liveSessionId, courseId });
//     let skipReason = "";
//     if (!isLoaded) skipReason = "User data not loaded";
//     else if (!userId) skipReason = "User not authenticated";
//     else if (!liveSessionId) skipReason = "Invalid live session ID";
//     else if (!courseId) skipReason = "Invalid course ID";

//     if (isLoaded && userId && liveSessionId && courseId) {
//       fetchQuiz();
//     } else {
//       console.error("[QUIZ_FORM] Fetch skipped due to:", skipReason);
//       setErrorMessage(`Unable to load quiz: ${skipReason}. Please ensure you are logged in and have access.`);
//       setIsLoading(false);
//     }

//     const dateTimer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(dateTimer);
//   }, [courseId, liveSessionId, isLoaded, userId]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsSubmitting(true);
//       handleSubmit();
//     } else {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [timeLeft]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for fetching results");
//         toast.error("User not authenticated.");
//         return;
//       }
//       console.log("[QUIZ_FORM] Fetching results from API:", `/api/courses/${courseId}/livesessionquizzes/results`);
//       const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
//         headers: { "user-id": userId },
//         params: { liveSessionId },
//       });

//       console.log("[QUIZ_FORM] Results API response:", response.data);
//       if (response.data && typeof response.data.score === "number" && typeof response.data.totalQuestions === "number") {
//         setResult(response.data);
//         setIsResultPopupVisible(true);
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         if (scorePercentage < 60) {
//           setShowRevisitMessage(true);
//           setShowCongratsBanner(false);
//           setShowFireworks(false);
//         } else {
//           setShowCongratsBanner(true);
//           setShowFireworks(true);
//           setShowRevisitMessage(false);
//           setTimeout(() => setShowCongratsBanner(false), 15000);
//           setTimeout(() => setShowFireworks(false), 120000);
//         }
//         if (response.data.invalidAnswers?.length) {
//           console.warn("[QUIZ_FORM] Invalid answers detected:", response.data.invalidAnswers);
//           toast.error(`Some answers were invalid: ${response.data.invalidAnswers.join(", ")}`);
//         }
//       } else {
//         console.error("[QUIZ_FORM] Invalid results data:", response.data);
//         toast.error("Invalid results data received.");
//       }
//     } catch (error: any) {
//       console.error("[QUIZ_FORM] Error fetching results:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch results.");
//     }
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     if (startTime && currentDateTime) {
//       const endTime = new Date();
//       const timeDiff = endTime.getTime() - startTime.getTime();
//       const seconds = Math.floor(timeDiff / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
//     }

//     try {
//       // Map answers to submit raw option values (e.g., "D")
//       const answersToSubmit = Object.entries(answers).map(([questionId, optionId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const option = question?.options.find((opt) => opt.id === optionId);
//         const rawAnswer = option?.text ? getRawOptionValue(option.text) : "";
//         console.log("[QUIZ_SUBMIT] Mapping answer:", { questionId, optionId, option, rawAnswer });
//         return { questionId, answer: rawAnswer };
//       });

//       // Validate that all questions have answers
//       if (answersToSubmit.length !== quiz.length) {
//         console.warn("[QUIZ_FORM] Not all questions answered:", { answersToSubmit, totalQuestions: quiz.length });
//         toast.error("Please answer all questions before submitting.");
//         setIsSubmitting(false);
//         return;
//       }

//       console.log("[QUIZ_SUBMIT] Sending payload:", { courseId, liveSessionId, answers: answersToSubmit });

//       if (!userId) {
//         console.error("[QUIZ_FORM] No userId for submission");
//         toast.error("User not authenticated.");
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/livesessionquizzes/submit`,
//         { answers: answersToSubmit, liveSessionId },
//         { headers: { "user-id": userId } }
//       );

//       console.log("[QUIZ_FORM] Submit API response:", response.data);
//       if (response.data) {
//         await fetchResults();
//       } else {
//         console.error("[QUIZ_FORM] No data in submit response");
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error: any) {
//       console.error("[QUIZ_SUBMIT] Client-side error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || "Failed to submit quiz.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     console.log("[QUIZ_FORM] Answer selected:", { questionId, optionId });
//     setAnswers((prev) => {
//       const newAnswers = { ...prev, [questionId]: optionId };
//       console.log("[QUIZ_FORM] Updated answers:", newAnswers);
//       return newAnswers;
//     });
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleJumpToQuestion = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   const formatDateTime = (date: Date) => {
//     return date.toLocaleString("en-US", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const userName = user?.fullName || "Student";
//   const completionDate = currentDateTime ? formatDateTime(currentDateTime) : "N/A";
//   const courseName = "Live Session Quiz";

//   if (!isLoaded) {
//     return <div className="text-center text-slate-600">Loading user data...</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">LIVE SESSION QUIZ</h1>
//           <h2 className="text-lg">
//             Believe in yourself. You are braver than you think, and smarter than you know✨
//           </h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && startTime ? formatDateTime(startTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">{quizCompleted ? "Finished" : "In Progress"}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime
//                   ? `${formatDateTime(currentDateTime)} (Time Taken: ${timeTaken})`
//                   : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">{timeTaken}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time Remaining</td>
//               <td className="p-2 text-sm text-gray-600">{formatTime(timeLeft)}</td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading || errorMessage ? (
//           <div className="flex justify-center items-center mt-8">
//             {isLoading ? (
//               <Loader2 className="animate-spin text-blue-500" />
//             ) : (
//               <p className="text-center text-red-600">{errorMessage}</p>
//             )}
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 ? (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText || "Question text unavailable"}</p>
//                   </div>
//                   <div className="mt-4 pl-4">
//                     {quiz[currentQuestionIndex].options.map((option) => {
//                       console.log("[QUIZ_FORM] Option:", {
//                         id: option.id,
//                         text: option.text,
//                         display: getOptionDisplayText(option.text),
//                       });
//                       return (
//                         <div key={option.id} className="mb-2">
//                           <input
//                             type="radio"
//                             name={quiz[currentQuestionIndex].id}
//                             id={option.id}
//                             value={option.id}
//                             checked={answers[quiz[currentQuestionIndex].id] === option.id}
//                             onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
//                             className="cursor-pointer"
//                             disabled={quizCompleted}
//                           />
//                           <label
//                             htmlFor={option.id}
//                             className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900"
//                           >
//                             {getOptionDisplayText(option.text) || "Option unavailable"}
//                           </label>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-between">
//                   <Button
//                     onClick={handlePrevious}
//                     disabled={currentQuestionIndex === 0 || quizCompleted}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     onClick={handleNext}
//                     disabled={currentQuestionIndex === quiz.length - 1 || quizCompleted}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Next
//                   </Button>
//                 </div>

//                 {!quizCompleted && (
//                   <Button
//                     type="submit"
//                     onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
//                     disabled={isSubmitting}
//                     className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                   </Button>
//                 )}
//               </div>
//             ) : (
//               <p className="text-center text-slate-600 mt-8">No questions available for this quiz.</p>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz!" />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <LiveSessionResultPopup // Updated component
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             showRevisitMessage={showRevisitMessage}
//             onClose={() => setIsResultPopupVisible(false)}
//             userName={userName}
//             courseName={courseName}
//             completionDate={completionDate}
//             courseId={courseId}
//           />
//         )}
//       </div>

//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz Navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               disabled={quizCompleted}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id]
//                   ? "bg-blue-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-blue-300"
//               } ${quizCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <p className="text-sm text-blue-600 mt-4">Show one page at a time</p>
//         <p className="text-sm text-blue-600 mt-2">Finish review</p>
//       </div>
//     </div>
//   );
// };











// components/LiveSessionQuizForm.tsx
// components/LiveSessionQuizForm.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import LiveSessionResultPopup from "./LiveSessionResultPopup";
import Confetti from "react-confetti";
import { Banner } from "@/components/banner";

interface QuizOption {
  id: string;
  text: string; // Raw option value (e.g., "D")
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctAnswer: string;
}

interface LiveSessionQuizFormProps {
  courseId: string;
  liveSessionId: string;
}

export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number; invalidAnswers?: string[] } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false); // Fixed setter name
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeTaken, setTimeTaken] = useState<string>("N/A");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { user, isLoaded } = useUser();
  const userId = user?.id;

  // Map raw option values to display labels for UI only
  const getOptionDisplayText = (optionText: string) => {
    const displayMap: { [key: string]: string } = {
      D: "D. testing quiz component",
      A: "A. MongoDB, Express.js, React, Node.js",
      B: "B. To differentiate between the network and host portions of an IP address",
      C: "C. Security Question",
    };
    return displayMap[optionText] || optionText;
  };

  // Reverse map display text to raw values for submission
  const getRawOptionValue = (displayText: string) => {
    const reverseDisplayMap: { [key: string]: string } = {
      "D. testing quiz component": "D",
      "A. MongoDB, Express.js, React, Node.js": "A",
      "B. To differentiate between the network and host portions of an IP address": "B",
      "C. Security Question": "C",
    };
    return reverseDisplayMap[displayText.trim()] || displayText;
  };

  const fetchQuiz = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    console.log("[QUIZ_FORM] Input parameters:", { courseId, liveSessionId, userId, isLoaded });

    if (!courseId) {
      console.error("[QUIZ_FORM] Missing courseId prop");
      setErrorMessage("Invalid course ID.");
      setIsLoading(false);
      return;
    }

    if (!liveSessionId) {
      console.error("[QUIZ_FORM] Missing liveSessionId prop");
      setErrorMessage("Invalid live session ID.");
      setIsLoading(false);
      return;
    }

    if (!isLoaded) {
      console.error("[QUIZ_FORM] User data not loaded");
      setErrorMessage("User data is still loading. Please try again.");
      setIsLoading(false);
      return;
    }

    if (!userId) {
      console.error("[QUIZ_FORM] User not authenticated");
      setErrorMessage("Please log in to access the quiz.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("[QUIZ_FORM] Fetching quiz from API:", `/api/courses/${courseId}/livesessionquizzes/fetch`, { liveSessionId, userId });
      const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/fetch`, {
        params: { liveSessionId },
        headers: { "user-id": userId },
      });

      console.log("[QUIZ_FORM] API response:", response.status, response.data);

      if (response.data?.message || Object.keys(response.data).length === 0) {
        console.warn("[QUIZ_FORM] No published quiz available:", response.data.message || "Empty quiz data returned");
        setErrorMessage(response.data.message || "No quiz found for this live session. Please contact your instructor.");
        setIsLoading(false);
        return;
      }

      if (response.data && response.data.id && response.data.questions && Array.isArray(response.data.questions)) {
        if (response.data.isPublished === false) {
          console.warn("[QUIZ_FORM] Quiz is unpublished:", response.data);
          setErrorMessage("This quiz is not yet available. Please contact your instructor.");
          setIsLoading(false);
          return;
        }

        const questions = response.data.questions.map((q: any, index: number) => ({
          id: `${response.data.id}-${index}`,
          questionText: q.text || "Question text unavailable",
          options: q.options.map((opt: string, optIndex: number) => ({
            id: `${response.data.id}-${index}-${optIndex}`,
            text: opt, // API returns display text (e.g., "D. testing quiz component")
          })),
          correctAnswer: q.correctAnswer || "",
        }));
        console.log("[QUIZ_FORM] Processed questions:", questions);
        setQuiz(questions);
        setTotalQuestions(questions.length);
      } else {
        console.error("[QUIZ_FORM] Invalid quiz data structure");
        setErrorMessage("Invalid quiz data received from server.");
      }
    } catch (error: any) {
      console.error("[QUIZ_FORM] Error fetching quiz:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMsg =
        error.response?.data?.message ||
        (error.response?.status === 403
          ? "This quiz is not yet available or you lack access. Please contact your instructor."
          : "Failed to load quiz. Please try again.");
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setStartTime(new Date());

    console.log("[QUIZ_FORM] Checking fetch conditions:", { isLoaded, userId, liveSessionId, courseId });
    let skipReason = "";
    if (!isLoaded) skipReason = "User data not loaded";
    else if (!userId) skipReason = "User not authenticated";
    else if (!liveSessionId) skipReason = "Invalid live session ID";
    else if (!courseId) skipReason = "Invalid course ID";

    if (isLoaded && userId && liveSessionId && courseId) {
      fetchQuiz();
    } else {
      console.error("[QUIZ_FORM] Fetch skipped due to:", skipReason);
      setErrorMessage(`Unable to load quiz. ${skipReason}: Please ensure you are logged in and have access.`);
      setIsLoading(false);
    }

    const dateTimer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(dateTimer);
  }, [courseId, liveSessionId, isLoaded, userId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsSubmitting(true);
      handleSubmit();
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const fetchResults = async () => {
    try {
      if (!userId) {
        console.error("[QUIZ_FORM] No userId for fetching results");
        toast.error("User not authenticated.");
        return;
      }
      console.log("[QUIZ_FORM] Fetching results from API:", `/api/courses/${courseId}/livesessionquizzes/results`);
      const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
        headers: { "user-id": userId },
        params: { liveSessionId },
      });

      console.log("[QUIZ_FORM] Results API response:", response.data);
      if (response.data && typeof response.data.score === "number" && typeof response.data.totalQuestions === "number") {
        setResult(response.data);
        setIsResultPopupVisible(true); // Fixed setter name
        const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
        if (scorePercentage < 60) {
          setShowRevisitMessage(true);
          setShowCongratsBanner(false);
          setShowFireworks(false);
        } else {
          setShowCongratsBanner(true);
          setShowFireworks(true);
          setShowRevisitMessage(false);
          setTimeout(() => setShowCongratsBanner(false), 15000);
          setTimeout(() => setShowFireworks(false), 120000);
        }
        if (response.data.invalidAnswers?.length) {
          console.warn("[QUIZ_FORM] Invalid answers detected:", response.data.invalidAnswers);
          toast.error(`Some answers were invalid: ${response.data.invalidAnswers.join(", ")}`);
        }
      } else {
        console.error("[QUIZ_FORM] Invalid results data:", response.data);
        toast.error("Invalid results data received.");
      }
    } catch (error: any) {
      console.error("[QUIZ_FORM] Error fetching results:", error);
      toast.error(error.response?.data?.message || "Failed to fetch results.");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setQuizCompleted(true);

    if (startTime && currentDateTime) {
      const endTime = new Date();
      const timeDiff = endTime.getTime() - startTime.getTime();
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
    }

    try {
      // Map answers to submit raw option values (e.g., "D")
      const answersToSubmit = Object.entries(answers).map(([questionId, optionId]) => {
        const question = quiz.find((q) => q.id === questionId);
        const option = question?.options.find((opt) => opt.id === optionId);
        const rawAnswer = option?.text ? getRawOptionValue(option.text) : "";
        console.log("[QUIZ_SUBMIT] Mapping answer:", { questionId, optionId, option, rawAnswer });
        return { questionId, answer: rawAnswer };
      });

      // Validate that all questions have answers
      if (answersToSubmit.length !== quiz.length) {
        console.warn("[QUIZ_FORM] Not all questions answered:", { answersToSubmit, totalQuestions: quiz.length });
        toast.error("Please answer all questions before submitting.");
        setIsSubmitting(false);
        return;
      }

      console.log("[QUIZ_SUBMIT] Sending payload:", { courseId, liveSessionId, answers: answersToSubmit });

      if (!userId) {
        console.error("[QUIZ_FORM] No userId for submission");
        toast.error("User not authenticated.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        `/api/courses/${courseId}/livesessionquizzes/submit`,
        { answers: answersToSubmit, liveSessionId },
        { headers: { "user-id": userId } }
      );

      console.log("[QUIZ_FORM] Submit API response:", response.data);
      if (response.data) {
        await fetchResults();
      } else {
        console.error("[QUIZ_FORM] No data in submit response");
        toast.error("Failed to submit quiz.");
      }
    } catch (error: any) {
      console.error("[QUIZ_SUBMIT] Client-side error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      toast.error(error.response?.data?.message || "Failed to submit quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReattempt = async () => {
    if (!userId) {
      console.error("[QUIZ_FORM] No userId for reattempt");
      toast.error("User not authenticated.");
      return;
    }

    console.log("[QUIZ_FORM] Initiating quiz reattempt:", { courseId, liveSessionId, userId });

    // Reset quiz state
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(900); // Reset to 15 minutes
    setQuizCompleted(false);
    setResult(null);
    setIsResultPopupVisible(false); // Fixed setter name
    setShowRevisitMessage(false);
    setShowCongratsBanner(false);
    setShowFireworks(false);
    setTimeTaken("N/A");
    setStartTime(new Date());

    try {
      // Refetch quiz to ensure fresh data
      await fetchQuiz();
      toast.success("Quiz reset successfully! Start your reattempt now.");
    } catch (error: any) {
      console.error("[QUIZ_FORM] Error during reattempt:", error);
      toast.error("Failed to reset quiz. Please try again.");
    }
  };

  const handleChange = (questionId: string, optionId: string) => {
    console.log("[QUIZ_FORM] Answer selected:", { questionId, optionId });
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: optionId };
      console.log("[QUIZ_FORM] Updated answers:", newAnswers);
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const userName = user?.fullName || "Student";
  const completionDate = currentDateTime ? formatDateTime(currentDateTime) : "N/A";
  const courseName = "Live Session Quiz";

  if (!isLoaded) {
    return <div className="text-center text-slate-600">Loading user data...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 bg-white">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold">LIVE SESSION QUIZ</h1>
          <h2 className="text-lg">
            Believe in yourself. You are braver than you think, and smarter than you know✨
          </h2>
        </div>

        <table className="w-full border-collapse mt-4">
          <tbody>
            <tr className="border-b">
              <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
              <td className="p-2 text-sm text-gray-800">
                {isMounted && startTime ? formatDateTime(startTime) : "-"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-sm font-semibold text-gray-600">State</td>
              <td className="p-2 text-sm text-gray-800">{quizCompleted ? "Finished" : "In Progress"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
              <td className="p-2 text-sm text-gray-800">
                {isMounted && quizCompleted && currentDateTime
                  ? `${formatDateTime(currentDateTime)} (Time Taken: ${timeTaken})`
                  : "-"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
              <td className="p-2 text-sm text-gray-800">{timeTaken}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-sm font-semibold text-gray-600">Time Remaining</td>
              <td className="p-2 text-sm text-gray-600">{formatTime(timeLeft)}</td>
            </tr>
            <tr>
              <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
              <td className="p-2 text-sm text-gray-800">
                {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>

        {isLoading || errorMessage ? (
          <div className="flex justify-center items-center mt-8">
            {isLoading ? (
              <Loader2 className="animate-spin text-blue-500" />
            ) : (
              <p className="text-center text-red-600">{errorMessage}</p>
            )}
          </div>
        ) : (
          <div>
            {quiz.length > 0 ? (
              <div>
                <div className="mt-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
                    <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
                    <p className="text-blue-800 mt-2">⬐ Flag question</p>
                    <p className="mt-4">{quiz[currentQuestionIndex].questionText || "Question text unavailable"}</p>
                  </div>
                  <div className="mt-4 pl-4">
                    {quiz[currentQuestionIndex].options.map((option) => {
                      console.log("[QUIZ_FORM] Option:", {
                        id: option.id,
                        text: option.text,
                        display: getOptionDisplayText(option.text),
                      });
                      return (
                        <div key={option.id} className="mb-2">
                          <input
                            type="radio"
                            name={quiz[currentQuestionIndex].id}
                            id={option.id}
                            value={option.id}
                            checked={answers[quiz[currentQuestionIndex].id] === option.id}
                            onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
                            className="cursor-pointer"
                            disabled={quizCompleted}
                          />
                          <label
                            htmlFor={option.id}
                            className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900"
                          >
                            {getOptionDisplayText(option.text) || "Option unavailable"}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0 || quizCompleted}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quiz.length - 1 || quizCompleted}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next
                  </Button>
                </div>

                {!quizCompleted && (
                  <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quiz"}
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-center text-slate-600 mt-8">No questions available for this quiz.</p>
            )}
          </div>
        )}

        {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz!" />}
        {showFireworks && <Confetti />}
        {isResultPopupVisible && result && (
          <LiveSessionResultPopup
            score={result.score}
            totalQuestions={totalQuestions}
            passingPercentage={60}
            showRevisitMessage={showRevisitMessage}
            onClose={() => setIsResultPopupVisible(false)} // Fixed setter name
            onReattempt={handleReattempt}
            userName={userName}
            courseName={courseName}
            completionDate={completionDate}
            courseId={courseId}
          />
        )}
      </div>

      <div className="w-64 bg-gray-200 p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz Navigation</h3>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <button
              key={i}
              onClick={() => handleJumpToQuestion(i)}
              disabled={quizCompleted}
              className={`w-10 h-10 rounded-full text-sm ${
                answers[quiz[i]?.id]
                  ? "bg-blue-500 text-white"
                  : currentQuestionIndex === i
                  ? "bg-blue-500 text-white"
                  : "bg-blue-300"
              } ${quizCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p className="text-sm text-blue-600 mt-4">Show one page at a time</p>
        <p className="text-sm text-blue-600 mt-2">Finish review</p>
      </div>
    </div>
  );
};