"use client";

import { useState } from "react";

interface LiveSessionQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  sessionId: string;
  initialData?: {
    id?: string;
    title: string;
    questions: { question: string; options: string[]; correctAnswer: string }[];
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  onSave: (data: { title: string; questions: { question: string; options: string[]; correctAnswer: string }[]; isPublished: boolean }) => Promise<void>;
}

export const LiveSessionQuizModal = ({ isOpen, onClose, courseId, sessionId, initialData, onSave }: LiveSessionQuizModalProps) => {
  const [quizTitle, setQuizTitle] = useState(initialData?.title || "");
  const [questions, setQuestions] = useState(initialData?.questions || [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleSave = async () => {
    await onSave({ title: quizTitle, questions, isPublished });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {initialData?.id ? "Edit Quiz" : "Create New Quiz"}
        </h2>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Quiz Title"
        />
        {questions.map((q, index) => (
          <div key={index} className="mt-4 space-y-2 border border-gray-200 rounded-md p-4 bg-gray-50 dark:bg-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Question {index + 1}</h3>
            <textarea
              value={q.question}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].question = e.target.value;
                setQuestions(newQuestions);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter the quiz question"
            />
            {q.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={option}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].options[optIndex] = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={`Option ${optIndex + 1}`}
              />
            ))}
            <input
              type="text"
              value={q.correctAnswer}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].correctAnswer = e.target.value;
                setQuestions(newQuestions);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter the correct answer"
            />
          </div>
        ))}
        <button
          onClick={handleAddQuestion}
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Add Question
        </button>
        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="mr-2"
            />
            Publish Quiz
          </label>
          <div className="space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-200"
            >
              Save Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};