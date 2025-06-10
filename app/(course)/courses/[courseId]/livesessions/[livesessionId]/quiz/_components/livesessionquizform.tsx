"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
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

interface LiveSessionQuizFormProps {
  courseId: string;
  liveSessionId: string;
}

export const LiveSessionQuizForm = ({ courseId, liveSessionId }: LiveSessionQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);

  const { user, isLoaded } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes`, {
          params: { liveSessionId },
          headers: { "user-id": userId }, // Add userId header for auth
        });
        if (response.data && Object.keys(response.data).length > 0) {
          const questions = response.data.questions.map((q: any, index: number) => ({
            id: `${response.data.id}-${index}`,
            questionText: q.question, // Matches schema
            options: q.options.map((opt: string, optIndex: number) => ({
              id: `${response.data.id}-${index}-${optIndex}`,
              text: opt,
            })),
            correctAnswer: q.correctAnswer,
          }));
          setQuiz(questions);
        } else {
          toast.error("No quiz found for this live session.");
        }
      } catch (error) {
        toast.error("Failed to load quiz.");
        console.error("Error fetching quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded && userId) {
      fetchQuiz();
    }
  }, [courseId, liveSessionId, isLoaded, userId]);

  const fetchResults = async () => {
    try {
      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }
      const response = await axios.get(`/api/courses/${courseId}/livesessionquizzes/results`, {
        headers: { "user-id": userId },
        params: { liveSessionId },
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
        setTimeout(() => setShowCongratsBanner(false), 15000);
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
    try {
      const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
        const question = quiz.find((q) => q.id === questionId);
        const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
        return { questionId, answer: submittedAnswer || "" };
      });
      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }
      const response = await axios.post(
        `/api/courses/${courseId}/livesessionquizzes/submit`,
        { answers: answersToSubmit, liveSessionId },
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
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-6">
      {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
      {showFireworks && <Confetti />}
      {isResultPopupVisible && result && (
        <ResultPopup
          score={result.score}
          totalQuestions={result.totalQuestions}
          passingPercentage={60}
          showRevisitMessage={showRevisitMessage}
          onClose={() => setIsResultPopupVisible(false)}
          userName={user?.fullName || "Student"}
          courseName="Unknown Course" // Update if course title is available
          completionDate={new Date().toISOString().split("T")[0]}
          courseId={courseId}
        />
      )}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {quiz.length === 0 ? (
            <p>No questions available for this quiz.</p>
          ) : (
            quiz.map((question) => (
              <div key={question.id} className="mb-4">
                <p className="font-semibold">{question.questionText}</p>
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
                      />
                      <label htmlFor={option.id} className="ml-2">{option.text}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          {quiz.length > 0 && (
            <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          )}
        </form>
      )}
    </div>
  );
};