// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0); // Tracks total questions

//   const { userId } = useAuth();

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//           setTotalQuestions(response.data.questions.length);
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [chapterId, courseId]);

//   useEffect(() => {
//     if (timeLeft > 0 && !quizCompleted) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0) {
//       handleTimerExpiration();
//     }
//   }, [timeLeft, quizCompleted]);

//   const handleTimerExpiration = () => {
//     const formEvent = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
//     handleSubmit(formEvent);
//   };

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: {
//           "user-id": userId,
//         },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   const progressPercentage = (Object.keys(answers).length / quiz.length) * 100;

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//           score={result.score}
//           totalQuestions={totalQuestions}
//           passingPercentage={60}
//           onClose={() => setIsResultPopupVisible(false)}
//           onReattempt={() => setQuizCompleted(false)}
//           onProceed={() => console.log("Proceed")}
//         />
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <Loader2 className="animate-spin text-blue-500" />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className="relative mb-4">
//             <div
//               className="h-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out"
//               style={{ width: `${progressPercentage}%` }}
//             />
//             <div className="absolute top-0 left-0 right-0 text-center text-sm font-semibold text-blue-700">
//               {Math.round(progressPercentage)}%
//             </div>
//           </div>

//           <div className="flex justify-center mb-4">
//             <div className={`relative w-20 h-20 rounded-full border-8 ${timeLeft < 10 ? "border-red-500" : "border-blue-500"} flex items-center justify-center`}>
//               <div className={`text-2xl font-extrabold ${timeLeft < 10 ? "text-red-500" : "text-blue-500"}`}>{timeLeft}</div>
//             </div>
//           </div>

//           {quiz.map((question) => (
//             <div key={question.id} className="mb-6">
//               <p className="font-bold text-xl text-blue-900 uppercase mb-2">{question.questionText}</p>
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
//                       className="cursor-pointer"
//                     />
//                     <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <Button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
//             {isSubmitting ? "Submitting..." : "Submit Quiz"}
//           </Button>
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
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);

//   const { userId } = useAuth();

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//           setTotalQuestions(response.data.questions.length);
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [chapterId, courseId]);

//   useEffect(() => {
//     if (timeLeft > 0 && !quizCompleted) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0) {
//       handleTimerExpiration();
//     }
//   }, [timeLeft, quizCompleted]);

//   const handleTimerExpiration = () => {
//     const formEvent = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
//     handleSubmit(formEvent);
//   };

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: {
//           "user-id": userId,
//         },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   const progressPercentage = (Object.keys(answers).length / quiz.length) * 100;

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//           score={result.score}
//           totalQuestions={totalQuestions}
//           passingPercentage={60}
//           onClose={() => setIsResultPopupVisible(false)}
//           onReattempt={() => setQuizCompleted(false)}
//           onProceed={() => console.log("Proceed")}
//         />
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <Loader2 className="animate-spin text-blue-500" />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className="relative mb-4">
//             <div
//               className="h-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out"
//               style={{ width: `${progressPercentage}%` }}
//             />
//             <div className="absolute top-0 left-0 right-0 text-center text-sm font-semibold text-blue-700">
//               {Math.round(progressPercentage)}%
//             </div>
//           </div>

//           <div className="flex justify-center mb-4">
//             <div className={`relative w-20 h-20 rounded-full border-8 ${timeLeft < 10 ? "border-red-500" : "border-blue-500"} flex items-center justify-center`}>
//               <div className={`text-2xl font-extrabold ${timeLeft < 10 ? "text-red-500" : "text-blue-500"}`}>{timeLeft}</div>
//             </div>
//           </div>

//           {quiz.map((question) => (
//             <div key={question.id} className="mb-6">
//               <p className="font-bold text-xl text-blue-900 uppercase mb-2">{question.questionText}</p>
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
//                       className="cursor-pointer"
//                     />
//                     <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <Button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
//             {isSubmitting ? "Submitting..." : "Submit Quiz"}
//           </Button>
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
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null); // Initialize as null
//   const [isMounted, setIsMounted] = useState(false); // Track if component is mounted on client

//   const { userId } = useAuth();

//   useEffect(() => {
//     setIsMounted(true); // Set to true after component mounts on client

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//           setTotalQuestions(response.data.questions.length);
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();

//     // Update current date and time every second
//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: {
//           "user-id": userId,
//         },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">QUIZ</h1>
//           <h2 className="text-lg">Assignment-2-Power Bi</h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && currentDateTime ? formatDateTime(currentDateTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">Finished</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime ? formatDateTime(currentDateTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">N/A</td> {/* Time taken logic not included for simplicity */}
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">N/A</td> {/* Grade will be updated after submission */}
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => setQuizCompleted(false)}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${currentQuestionIndex === i ? "bg-blue-500 text-white" : "bg-gray-300"}`}
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
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [quizTitle, setQuizTitle] = useState<string>(""); // New state for quiz title
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);

//   const { userId } = useAuth();

//   useEffect(() => {
//     setIsMounted(true);

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//           setTotalQuestions(response.data.questions.length);
//           // Assuming the quiz title is part of the response data, e.g., response.data.title
//           setQuizTitle(response.data.title || "Untitled Quiz"); // Fallback to "Untitled Quiz" if no title
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: {
//           "user-id": userId,
//         },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1> {/* Dynamic quiz title */}
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && currentDateTime ? formatDateTime(currentDateTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">Finished</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime ? formatDateTime(currentDateTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">N/A</td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">N/A</td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => setQuizCompleted(false)}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${currentQuestionIndex === i ? "bg-blue-500 text-white" : "bg-gray-300"}`}
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
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [quizTitle, setQuizTitle] = useState<string>("");
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null); // New state for start time
//   const [timeTaken, setTimeTaken] = useState<string>("N/A"); // New state for time taken

//   const { userId } = useAuth();

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date()); // Set start time when component mounts

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//           setTotalQuestions(response.data.questions.length);
//           setQuizTitle(response.data.title || "Untitled Quiz");
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: {
//           "user-id": userId,
//         },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     // Calculate time taken
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
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1>
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
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
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => setQuizCompleted(false)}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id] // Check if an answer is selected for this question
//                   ? "bg-green-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300"
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
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [quizTitle, setQuizTitle] = useState<string>("");
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [attempts, setAttempts] = useState(0); // Track number of attempts
//   const [maxAttempts, setMaxAttempts] = useState(3); // Maximum attempts allowed

//   const { userId } = useAuth();

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuizAndAttempts = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch quiz data
//         const quizResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (quizResponse.data && quizResponse.data.questions) {
//           setQuiz(quizResponse.data.questions);
//           setTotalQuestions(quizResponse.data.questions.length);
//           setQuizTitle(quizResponse.data.title || "Untitled Quiz");
//         } else {
//           toast.error("No questions found for this quiz.");
//         }

//         // Fetch existing attempts for the user and chapter
//         if (userId) {
//           const attemptsResponse = await axios.get(
//             `/api/courses/${courseId}/chapterquizzes/attempts`,
//             { headers: { "user-id": userId } }
//           );
//           setAttempts(attemptsResponse.data.attempts || 0);
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz or attempts.");
//         console.error("Error fetching quiz or attempts:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuizAndAttempts();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: { "user-id": userId },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (attempts >= maxAttempts) {
//       setShowRevisitMessage(true); // Show the revisit message if attempts are exhausted
//       return;
//     }

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
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
//         { headers: { "user-id": userId } }
//       );

//       if (response.data) {
//         setAttempts((prev) => prev + 1); // Increment attempts after submission
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   const handleRewatchVideo = () => {
//     // Logic to redirect to the video (replace with actual URL or navigation logic)
//     window.location.href = `/courses/${courseId}/chapters/${chapterId}/`; // Example URL
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1>
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
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
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Attempts Remaining</td>
//               <td className="p-2 text-sm text-gray-800">{maxAttempts - attempts} of {maxAttempts}</td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : attempts >= maxAttempts && showRevisitMessage ? (
//           <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg border border-blue-200">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
//               You've Exhausted Your Attempts
//             </h2>
//             <p className="text-gray-700 mb-6 text-center">
//               It seems you've used all 3 attempts for this quiz. Please rewatch the chapter video to refresh your knowledge before attempting again.
//             </p>
//             <div className="flex justify-center">
//               <Button
//                 onClick={handleRewatchVideo}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
//               >
//                 Rewatch Chapter Video
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => {
//               setQuizCompleted(false);
//               setAnswers({}); // Reset answers for reattempt
//             }}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id] // Check if an answer is selected for this question
//                   ? "bg-green-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300"
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
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [quizTitle, setQuizTitle] = useState<string>("");
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [attempts, setAttempts] = useState(0); // Track number of attempts
//   const [maxAttempts, setMaxAttempts] = useState(3); // Maximum attempts allowed
//   const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to store the Google Drive video URL

//   const { userId } = useAuth();

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuizAndAttempts = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch quiz data
//         const quizResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (quizResponse.data && quizResponse.data.questions) {
//           setQuiz(quizResponse.data.questions);
//           setTotalQuestions(quizResponse.data.questions.length);
//           setQuizTitle(quizResponse.data.title || "Untitled Quiz");
//         } else {
//           toast.error("No questions found for this quiz.");
//         }

//         // Fetch existing attempts for the user and chapter
//         if (userId) {
//           const attemptsResponse = await axios.get(
//             `/api/courses/${courseId}/chapterquizzes/attempts`,
//             { headers: { "user-id": userId } }
//           );
//           setAttempts(attemptsResponse.data.attempts || 0);
//         }

//         // Fetch the chapter video URL (Google Drive URL from googleDriveUrl field)
//         const videoResponse = await axios.get(
//           `/api/courses/${courseId}/chapters/${chapterId}/video`,
//           { headers: { "user-id": userId } }
//         );
//         setVideoUrl(videoResponse.data.googleDriveUrl || null); // Updated to use googleDriveUrl from the response
//       } catch (error) {
//         toast.error("Failed to load quiz, attempts, or video URL.");
//         console.error("Error fetching quiz, attempts, or video:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuizAndAttempts();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: { "user-id": userId },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (attempts >= maxAttempts) {
//       setShowRevisitMessage(true); // Show the revisit message if attempts are exhausted
//       return;
//     }

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
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
//         { headers: { "user-id": userId } }
//       );

//       if (response.data) {
//         setAttempts((prev) => prev + 1); // Increment attempts after submission
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   const handleRewatchVideo = async () => {
//     if (!videoUrl) {
//       try {
//         // Fetch the video URL if not already fetched (optional fallback)
//         const response = await axios.get(
//           `/api/courses/${courseId}/chapters/${chapterId}/video`,
//           { headers: { "user-id": userId } }
//         );
//         const fetchedVideoUrl = response.data.googleDriveUrl; // Updated to use googleDriveUrl
//         if (fetchedVideoUrl) {
//           window.location.href = fetchedVideoUrl; // Direct to the Google Drive video URL
//         } else {
//           toast.error("Video URL not found for this chapter.");
//         }
//       } catch (error) {
//         toast.error("Failed to fetch video URL.");
//         console.error("Error fetching video URL:", error);
//       }
//     } else {
//       window.location.href = videoUrl; // Direct to the already fetched Google Drive video URL
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1>
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
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
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Attempts Remaining</td>
//               <td className="p-2 text-sm text-gray-800">{maxAttempts - attempts} of {maxAttempts}</td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : attempts >= maxAttempts && showRevisitMessage ? (
//           <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg border border-blue-200">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
//               You've Exhausted Your Attempts
//             </h2>
//             <p className="text-gray-700 mb-6 text-center">
//               It seems you've used all 3 attempts for this quiz. Please rewatch the chapter video to refresh your knowledge before attempting again.
//             </p>
//             <div className="flex justify-center">
//               <Button
//                 onClick={handleRewatchVideo}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
//               >
//                 Rewatch Chapter Video
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => {
//               setQuizCompleted(false);
//               setAnswers({}); // Reset answers for reattempt
//             }}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id] // Check if an answer is selected for this question
//                   ? "bg-green-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300"
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
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation"; // Import useRouter for internal navigation
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [quizTitle, setQuizTitle] = useState<string>("");
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [attempts, setAttempts] = useState(0); // Track number of attempts
//   const [maxAttempts, setMaxAttempts] = useState(3); // Maximum attempts allowed
//   const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to store the Google Drive video URL

//   const { userId } = useAuth();
//   const router = useRouter(); // Initialize useRouter for internal navigation

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuizAndAttempts = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch quiz data
//         const quizResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (quizResponse.data && quizResponse.data.questions) {
//           setQuiz(quizResponse.data.questions);
//           setTotalQuestions(quizResponse.data.questions.length);
//           setQuizTitle(quizResponse.data.title || "Untitled Quiz");
//         } else {
//           toast.error("No questions found for this quiz.");
//         }

//         // Fetch existing attempts for the user and chapter
//         if (userId) {
//           const attemptsResponse = await axios.get(
//             `/api/courses/${courseId}/chapterquizzes/attempts`,
//             { headers: { "user-id": userId } }
//           );
//           setAttempts(attemptsResponse.data.attempts || 0);
//         }

//         // Fetch the chapter video URL (Google Drive URL from googleDriveUrl field)
//         const videoResponse = await axios.get(
//           `/api/courses/${courseId}/chapters/${chapterId}/video`,
//           { headers: { "user-id": userId } }
//         );
//         setVideoUrl(videoResponse.data.googleDriveUrl || null); // Updated to use googleDriveUrl from the response
//       } catch (error) {
//         toast.error("Failed to load quiz, attempts, or video URL.");
//         console.error("Error fetching quiz, attempts, or video:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuizAndAttempts();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: { "user-id": userId },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (attempts >= maxAttempts) {
//       setShowRevisitMessage(true); // Show the revisit message if attempts are exhausted
//       return;
//     }

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
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
//         { headers: { "user-id": userId } }
//       );

//       if (response.data) {
//         setAttempts((prev) => prev + 1); // Increment attempts after submission
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   const handleRewatchVideo = async () => {
//     // Use Next.js router for internal navigation within the app
//     router.push(`/courses/${courseId}/chapters/${chapterId}`); // Redirect to the ChapterIdPage route
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1>
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
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
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Attempts Remaining</td>
//               <td className="p-2 text-sm text-gray-800">{maxAttempts - attempts} of {maxAttempts}</td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : attempts >= maxAttempts && showRevisitMessage ? (
//           <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg border border-blue-200">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
//               You've Exhausted Your Attempts
//             </h2>
//             <p className="text-gray-700 mb-6 text-center">
//               It seems you've used all 3 attempts for this quiz. Please rewatch the chapter video to refresh your knowledge before attempting again.
//             </p>
//             <div className="flex justify-center">
//               <Button
//                 onClick={handleRewatchVideo}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
//               >
//                 Rewatch Chapter Video
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => {
//               setQuizCompleted(false);
//               setAnswers({}); // Reset answers for reattempt
//             }}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id] // Check if an answer is selected for this question
//                   ? "bg-green-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300"
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
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation"; // Import useRouter for internal navigation
// import ResultPopup from "@/components/resultpopupchapter";
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
// }

// interface ChapterQuizPageProps {
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [quizTitle, setQuizTitle] = useState<string>("");
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [attempts, setAttempts] = useState(0); // Track number of attempts
//   const [maxAttempts, setMaxAttempts] = useState(3); // Maximum attempts allowed
//   const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to store the Google Drive video URL

//   const { userId } = useAuth();
//   const router = useRouter(); // Initialize useRouter for internal navigation

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuizAndAttempts = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch quiz data
//         const quizResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
//         if (quizResponse.data && quizResponse.data.questions) {
//           setQuiz(quizResponse.data.questions);
//           setTotalQuestions(quizResponse.data.questions.length);
//           setQuizTitle(quizResponse.data.title || "Untitled Quiz");
//         } else {
//           toast.error("No questions found for this quiz.");
//         }

//         // Fetch existing attempts for the user and chapter
//         if (userId) {
//           const attemptsResponse = await axios.get(
//             `/api/courses/${courseId}/chapterquizzes/attempts`,
//             { headers: { "user-id": userId } }
//           );
//           setAttempts(attemptsResponse.data.attempts || 0);
//         }

//         // Fetch the chapter video URL (Google Drive URL from googleDriveUrl field)
//         const videoResponse = await axios.get(
//           `/api/courses/${courseId}/chapters/${chapterId}/video`,
//           { headers: { "user-id": userId } }
//         );
//         setVideoUrl(videoResponse.data.googleDriveUrl || null); // Updated to use googleDriveUrl from the response
//       } catch (error) {
//         toast.error("Failed to load quiz, attempts, or video URL.");
//         console.error("Error fetching quiz, attempts, or video:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuizAndAttempts();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [chapterId, courseId, userId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//         headers: { "user-id": userId },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / totalQuestions) * 100;

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (attempts >= maxAttempts) {
//       setShowRevisitMessage(true); // Show the revisit message if attempts are exhausted
//       return;
//     }

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
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
//         { answers: answersToSubmit },
//         { headers: { "user-id": userId } }
//       );

//       if (response.data) {
//         setAttempts((prev) => prev + 1); // Increment attempts after submission
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
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
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

//   const handleRewatchVideo = async () => {
//     // Reset attempts when navigating to rewatch the video
//     try {
//       if (userId) {
//         await axios.post(
//           `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/reset-attempts`,
//           {},
//           { headers: { "user-id": userId } }
//         );
//         toast.success("Attempts reset. You can now retake the quiz.");
//       }
//     } catch (error) {
//       toast.error("Failed to reset attempts.");
//       console.error("Error resetting attempts:", error);
//     }

//     // Use Next.js router for internal navigation within the app
//     router.push(`/courses/${courseId}/chapters/${chapterId}`); // Redirect to the ChapterIdPage route
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1>
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
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
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Attempts Remaining</td>
//               <td className="p-2 text-sm text-gray-800">{maxAttempts - attempts} of {maxAttempts}</td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : attempts >= maxAttempts && showRevisitMessage ? (
//           <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg border border-blue-200">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
//               You've Exhausted Your Attempts
//             </h2>
//             <p className="text-gray-700 mb-6 text-center">
//               It seems you've used all 3 attempts for this quiz. Please rewatch the chapter video to refresh your knowledge before attempting again.
//             </p>
//             <div className="flex justify-center">
//               <Button
//                 onClick={handleRewatchVideo}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
//               >
//                 Rewatch Chapter Video
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
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
//                         <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
//                           {option.text}
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
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             onClose={() => setIsResultPopupVisible(false)}
//             onReattempt={() => {
//               setQuizCompleted(false);
//               setAnswers({}); // Reset answers for reattempt
//             }}
//             onProceed={() => console.log("Proceed")}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id] // Check if an answer is selected for this question
//                   ? "bg-green-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300"
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








"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter for internal navigation
import ResultPopup from "@/components/resultpopupchapter";
import Confetti from "react-confetti";
import { Banner } from "@/components/banner";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
}

interface ChapterQuizPageProps {
  courseId: string;
  chapterId: string;
}

export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeTaken, setTimeTaken] = useState<string>("N/A");
  const [attempts, setAttempts] = useState(0); // Track number of attempts
  const [maxAttempts, setMaxAttempts] = useState(3); // Maximum attempts allowed
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to store the Google Drive video URL
  const [nextChapterId, setNextChapterId] = useState<string | null>(null); // State to store the next chapter ID

  const { userId } = useAuth();
  const router = useRouter(); // Initialize useRouter for internal navigation

  useEffect(() => {
    setIsMounted(true);
    setStartTime(new Date());

    const fetchQuizAndAttempts = async () => {
      setIsLoading(true);
      try {
        // Fetch quiz data
        const quizResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
        if (quizResponse.data && quizResponse.data.questions) {
          setQuiz(quizResponse.data.questions);
          setTotalQuestions(quizResponse.data.questions.length);
          setQuizTitle(quizResponse.data.title || "Untitled Quiz");
        } else {
          toast.error("No questions found for this quiz.");
        }

        // Fetch existing attempts for the user and course (updated path)
        if (userId) {
          const attemptsResponse = await axios.get(
            `/api/courses/${courseId}/chapterquizzes/attempts`, // Updated to match your endpoint path
            { headers: { "user-id": userId } }
          );
          setAttempts(attemptsResponse.data.attempts || 0);
        }

        // Fetch the chapter video URL (Google Drive URL from googleDriveUrl field)
        const videoResponse = await axios.get(
          `/api/courses/${courseId}/chapters/${chapterId}/video`,
          { headers: { "user-id": userId } }
        );
        setVideoUrl(videoResponse.data.googleDriveUrl || null); // Updated to use googleDriveUrl from the response

        // Fetch the next chapter ID (if it exists)
        const nextChapterResponse = await axios.get(
          `/api/courses/${courseId}/chapters/${chapterId}/next`,
          { headers: { "user-id": userId } }
        );
        setNextChapterId(nextChapterResponse.data.nextChapterId || null);
      } catch (error) {
        toast.error("Failed to load quiz, attempts, video URL, or next chapter.");
        console.error("Error fetching quiz, attempts, video, or next chapter:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizAndAttempts();

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [chapterId, courseId, userId]);

  const fetchResults = async () => {
    try {
      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
        headers: { "user-id": userId },
      });

      setResult(response.data);
      setIsResultPopupVisible(true);

      const scorePercentage = (response.data.score / totalQuestions) * 100;

      if (scorePercentage < 60) {
        setShowRevisitMessage(true);
        setShowCongratsBanner(false);
        setShowFireworks(false);
      } else {
        setShowCongratsBanner(true);
        setShowFireworks(true);
        setShowRevisitMessage(false);
      }
    } catch (error) {
      toast.error("Failed to fetch results.");
      console.error("Error fetching results:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attempts >= maxAttempts) {
      setShowRevisitMessage(true); // Show the revisit message if attempts are exhausted
      return;
    }

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
      const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
        const question = quiz.find((q) => q.id === questionId);
        const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
        return {
          questionId,
          answer: submittedAnswer || "",
        };
      });

      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/submit`,
        { answers: answersToSubmit },
        { headers: { "user-id": userId } }
      );

      if (response.data) {
        setAttempts((prev) => prev + 1); // Increment attempts after submission
        fetchResults();
      } else {
        toast.error("Failed to submit quiz.");
      }
    } catch (error) {
      toast.error("Failed to submit quiz.");
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
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

  const handleRewatchVideo = async () => {
    // Reset attempts when navigating to rewatch the video
    try {
      if (userId) {
        await axios.post(
          `/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/reset-attempts`,
          {},
          { headers: { "user-id": userId } }
        );
        toast.success("Attempts reset. You can now retake the quiz.");
      }
    } catch (error) {
      toast.error("Failed to reset attempts.");
      console.error("Error resetting attempts:", error);
    }

    // Use Next.js router for internal navigation within the app
    router.push(`/courses/${courseId}/chapters/${chapterId}`); // Redirect to the ChapterIdPage route
  };

  const handleProceedToNextChapter = async () => {
    if (nextChapterId) {
      try {
        // Unlock the next chapter (e.g., update its status or remove lock in the backend)
        await axios.put(
          `/api/courses/${courseId}/chapters/${nextChapterId}/unlock`,
          {},
          { headers: { "user-id": userId } }
        );
        toast.success("Next chapter unlocked and redirecting...");
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`); // Redirect to the next chapter
      } catch (error) {
        toast.error("Failed to unlock or navigate to the next chapter.");
        console.error("Error unlocking or navigating to next chapter:", error);
      }
    } else {
      toast("No next chapter available."); // Use toast with type: 'info' instead of toast.info
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Quiz Area */}
      <div className="flex-1 p-6 bg-white">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold">Chapter Quiz</h1>
          <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
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
              <td className="p-2 text-sm text-gray-800">Finished</td>
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
            <tr>
              <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
              <td className="p-2 text-sm text-gray-800">
                {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="p-2 text-sm font-semibold text-gray-600">Attempts Remaining</td>
              <td className="p-2 text-sm text-gray-800">{maxAttempts - attempts} of {maxAttempts}</td>
            </tr>
          </tbody>
        </table>

        {isLoading ? (
          <div className="flex justify-center items-center mt-8">
            <Loader2 className="animate-spin text-blue-500" />
          </div>
        ) : attempts >= maxAttempts && showRevisitMessage ? (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              You've Exhausted Your Attempts
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              It seems you've used all 3 attempts for this quiz. Please rewatch the chapter video to refresh your knowledge before attempting again.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={handleRewatchVideo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Rewatch Chapter Video
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {quiz.length > 0 && (
              <div>
                <div className="mt-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
                    <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
                    <p className="text-blue-800 mt-2">⬐ Flag question</p>
                    <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
                  </div>
                  <div className="mt-4 pl-4">
                    {quiz[currentQuestionIndex].options.map((option) => (
                      <div key={option.id} className="mb-2">
                        <input
                          type="radio"
                          name={quiz[currentQuestionIndex].id}
                          id={option.id}
                          value={option.id}
                          checked={answers[quiz[currentQuestionIndex].id] === option.id}
                          onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
                          className="cursor-pointer"
                        />
                        <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quiz.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next
                  </Button>
                </div>

                <Button
                  type="submit"
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              </div>
            )}
          </div>
        )}

        {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
        {showFireworks && <Confetti />}
        {isResultPopupVisible && result && (
          <ResultPopup
            score={result.score}
            totalQuestions={totalQuestions}
            passingPercentage={60}
            onClose={() => setIsResultPopupVisible(false)}
            onReattempt={() => {
              setQuizCompleted(false);
              setAnswers({}); // Reset answers for reattempt
            }}
            onProceed={handleProceedToNextChapter} // Updated to use the new handler
          />
        )}
      </div>

      {/* Quiz Navigation Panel */}
      <div className="w-64 bg-gray-200 p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <button
              key={i}
              onClick={() => handleJumpToQuestion(i)}
              className={`w-10 h-10 rounded-full text-sm ${
                answers[quiz[i]?.id] // Check if an answer is selected for this question
                  ? "bg-green-500 text-white"
                  : currentQuestionIndex === i
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
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