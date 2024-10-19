"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface QuizButtonProps {
  courseId: string; // Receive courseId as a prop
  quizId: string;
}

const QuizButton: React.FC<QuizButtonProps> = ({ courseId, quizId }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);

    router.push(`/courses/${courseId}/quizzes/${quizId}`); // Navigate to the quizzes page of this course
  };

  return (
    <button className="p-4 bg-blue-500 text-white rounded" onClick={handleClick}>
      TAKE A Quiz
    </button>
  );
};

export default QuizButton;
