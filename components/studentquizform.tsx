"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import ResultPopup from "@/components/resultpopup";
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

interface StudentQuizFormProps {
  quizId: string;
  courseId: string;
  chapterId: string;
}

export const StudentQuizForm = ({ quizId, courseId, chapterId }: StudentQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const { userId } = useAuth();

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}`);
        if (response.data && response.data.questions) {
          setQuiz(response.data.questions);
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
  }, [quizId, courseId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsSubmitting(true);
      handleSubmit();  // Automatically submit when time runs out
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
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/results`, {
        headers: {
          "user-id": userId,
        },
      });

      setResult(response.data);
      setIsResultPopupVisible(true);

      const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;

      if (scorePercentage < 60) {
        setShowRevisitMessage(true);
        setShowCongratsBanner(false);
        setShowFireworks(false);
      } else {
        setShowCongratsBanner(true);
        setShowFireworks(true);
        setShowRevisitMessage(false);

        setTimeout(() => {
          setShowCongratsBanner(false);
        }, 15000);

        setTimeout(() => setShowFireworks(false), 120000);
      }
    } catch (error) {
      toast.error("Failed to fetch results.");
      console.error("Error fetching results:", error);
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

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
        `/api/courses/${courseId}/quizzes/${quizId}/submit`,
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-lg">
      {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
      {showFireworks && <Confetti />}
      {isResultPopupVisible && result && (
        <ResultPopup
          score={result.score}
          totalQuestions={result.totalQuestions}
          passingPercentage={60}  
          showRevisitMessage={showRevisitMessage}
          onClose={() => setIsResultPopupVisible(false)}
        />
      )}

      <div className="timer flex justify-center items-center py-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse opacity-50"></div>
          <div className="text-4xl font-bold text-blue-600">{formatTime(timeLeft)}</div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {quiz.map((question, index) => (
            <div key={question.id} className="mb-4">
              <p className="font-semibold text-lg text-blue-800 uppercase">{`${index + 1}. ${question.questionText}`}</p>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    className={`mb-2 p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                      answers[question.id] === option.id
                        ? "bg-blue-600 text-white"
                        : "bg-blue-200 hover:bg-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      id={option.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => handleChange(question.id, option.id)}
                      className="mr-2"
                    />
                    <label htmlFor={option.id} className="text-blue-800">{option.text}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700">
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        </form>
      )}
    </div>
  );
};
