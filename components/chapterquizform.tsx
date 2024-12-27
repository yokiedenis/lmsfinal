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
}

interface StudentQuizFormProps {
  chapterQuizId: string;
  courseId: string;
}

export const StudentQuizForm = ({ chapterQuizId, courseId }: StudentQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/chapterquizzes/${chapterQuizId}`);
      console.log("Fetching quiz:", response.data); // Debug response
      if (response.data && response.data.questions) {
        setQuiz(response.data.questions);
      } else {
        toast.error("No questions found for this quiz.");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.error("Failed to load quiz.");
    }
  };
  
  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <form>
          {quiz.map((question) => (
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
                    <label htmlFor={option.id} className="ml-2">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button type="submit" className="w-full mt-6" variant="success">
            Submit Quiz
          </Button>
        </form>
      )}
    </div>
  );
};
