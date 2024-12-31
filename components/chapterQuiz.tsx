"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
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
  correctAnswer: string;
}

interface ChapterQuizPageProps {
  courseId: string;
  chapterId: string;
}

export const ChapterQuizPage = ({ courseId, chapterId }: ChapterQuizPageProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState<number>(0); // Tracks total questions

  const { userId } = useAuth();

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes`);
        if (response.data && response.data.questions) {
          setQuiz(response.data.questions);
          setTotalQuestions(response.data.questions.length);
        } else {
          toast.error("No questions found for this quiz.");
        }
      } catch (error) {
        toast.error("Failed to load quiz.");
        console.error("Error fetching quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [chapterId, courseId]);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTimerExpiration();
    }
  }, [timeLeft, quizCompleted]);

  const handleTimerExpiration = () => {
    const formEvent = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
    handleSubmit(formEvent);
  };

  const fetchResults = async () => {
    try {
      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
        headers: {
          "user-id": userId,
        },
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

        setTimeout(() => setShowCongratsBanner(false), 15000);
        setTimeout(() => setShowFireworks(false), 120000);
      }
    } catch (error) {
      toast.error("Failed to fetch results.");
      console.error("Error fetching results:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setQuizCompleted(true);

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

  const progressPercentage = (Object.keys(answers).length / quiz.length) * 100;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
      {showFireworks && <Confetti />}
      {isResultPopupVisible && result && (
        <ResultPopup
          score={result.score}
          totalQuestions={totalQuestions}
          passingPercentage={60}
          onClose={() => setIsResultPopupVisible(false)}
          onReattempt={() => setQuizCompleted(false)}
          onProceed={() => console.log("Proceed")}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <div
              className="h-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
            <div className="absolute top-0 left-0 right-0 text-center text-sm font-semibold text-blue-700">
              {Math.round(progressPercentage)}%
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className={`relative w-20 h-20 rounded-full border-8 ${timeLeft < 10 ? "border-red-500" : "border-blue-500"} flex items-center justify-center`}>
              <div className={`text-2xl font-extrabold ${timeLeft < 10 ? "text-red-500" : "text-blue-500"}`}>{timeLeft}</div>
            </div>
          </div>

          {quiz.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="font-bold text-xl text-blue-900 uppercase mb-2">{question.questionText}</p>
              <div>
                {question.options.map((option) => (
                  <div key={option.id} className="mb-2">
                    <input
                      type="radio"
                      name={question.id}
                      id={option.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => handleChange(question.id, option.id)}
                      className="cursor-pointer"
                    />
                    <label htmlFor={option.id} className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        </form>
      )}
    </div>
  );
};
