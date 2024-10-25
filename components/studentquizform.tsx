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
}

export const StudentQuizForm = ({ quizId, courseId }: StudentQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);

  // Timer state
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const { userId } = useAuth();

  useEffect(() => {
    // Start timer on component load
    const timerInterval = setInterval(() => {
      if (isTimerRunning) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  // Timer display formatter
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

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

  const handleAnswerChange = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsTimerRunning(false); // Stop the timer on submit

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
        await fetchResults();
        toast.success("Quiz submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit quiz.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setIsResultPopupVisible(false);
  };

  const handleRetryQuiz = async () => {
    setAnswers({});
    setResult(null);
    setIsResultPopupVisible(false);
    setShowRevisitMessage(false);
    setShowCongratsBanner(false);
    setShowFireworks(false);
    setTimer(0); // Reset timer
    setIsTimerRunning(true);

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
    }
  };

  if (isLoading) {
    return <Loader2 className="animate-spin h-8 w-8" />;
  }

  return (
    <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-lg">
      <div className="timer text-center text-xl font-bold text-blue-600 mb-4 animate-pulse">
        Time Elapsed: {formatTime(timer)}
      </div>

      <h2 className="font-bold text-lg mb-4">Attempt Quiz</h2>

      {showCongratsBanner && (
        <div className="congrats-banner bg-green-100 text-green-700 p-2 rounded-md shadow-md mb-4">
          CONGRATULATIONS!
        </div>
      )}

      {showRevisitMessage && (
        <div>
          <Banner
            variant="warning"
            label="You might want to revisit the course materials/videos before trying again"
          />
          <Button onClick={handleRetryQuiz} className="mt-2">
            Repeat Quiz
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {quiz.length > 0 ? (
          quiz.map((question) => (
            <div key={question.id} className="border p-4 bg-white rounded-md shadow-sm space-y-2">
              <h3 className="font-semibold text-lg">{question.questionText}</h3>
              {question.options.map((option) => (
                <label key={option.id} className="flex items-center border p-2 rounded-md transition hover:bg-gray-100">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => handleAnswerChange(question.id, option.id)}
                    required
                    className="mr-2"
                  />
                  <span className="text-md">{option.text}</span>
                </label>
              ))}
            </div>
          ))
        ) : (
          <p>No quiz questions available.</p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
          {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Submit Answers"}
        </Button>
      </form>

      {isResultPopupVisible && (
        <ResultPopup
          score={result?.score || 0}
          totalQuestions={result?.totalQuestions || 0}
          onClose={handleClosePopup}
          // courseId={courseId}
          // quizId={quizId}
        />
      )}

      {showFireworks && <Confetti />}
    </div>
  );
};
