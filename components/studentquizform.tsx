"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  // Dummy function to simulate getting the actual student ID
  const getActualStudentId = () => {
    // Replace this with your actual logic to retrieve the student's ID
    const student = { id: "actualStudentId" }; // Replace with real data from your authentication context
    return student?.id;
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
        console.error("Error fetching quiz:", error); // Log detailed error
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
      const studentId = getActualStudentId(); // Get the actual student ID

      const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/results`, {
        headers: {
          "student-id": studentId, // Send the actual student ID in the headers
        },
      });

      setResult(response.data);
    } catch (error) {
      toast.error("Failed to fetch results.");
      console.error("Error fetching results:", error); // Log detailed error
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const answersToSubmit = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      const studentId = getActualStudentId(); // Get the actual student ID

      // Debugging: Log the data being submitted
      console.log("Submitting answers with student ID:", studentId);
      console.log("Answers to submit:", answersToSubmit);

      const response = await axios.post(`/api/courses/${courseId}/quizzes/${quizId}/submit`, {
        answers: answersToSubmit,
      }, {
        headers: {
          "student-id": studentId, // Include the actual student ID in the submission headers
        },
      });

      if (response.data) {
        await fetchResults();
        toast.success("Quiz submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit quiz.");
      if (axios.isAxiosError(error) && error.response) {
        console.error("Submission error:", error.response.data); // Log detailed error
      } else {
        console.error("Submission error:", error); // Log the unknown error
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader2 className="animate-spin h-8 w-8" />;
  }

  return (
    <div className="mt-6 p-4 border bg-slate-100 rounded-md">
      <h2 className="font-bold text-lg">Attempt Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {quiz.length > 0 ? (
          quiz.map((question) => (
            <div key={question.id} className="space-y-2">
              <h3 className="font-semibold">{question.questionText}</h3>
              {question.options.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => handleAnswerChange(question.id, option.id)}
                    required
                  />
                  <span className="ml-2">{option.text}</span>
                </label>
              ))}
            </div>
          ))
        ) : (
          <p>No quiz questions available.</p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Submit Answers"}
        </Button>
      </form>

      {result && (
        <div className="mt-4">
          <h3 className="font-semibold">Results</h3>
          <p>
            You scored {result.score} out of {result.total}!
          </p>
        </div>
      )}
    </div>
  );
};
