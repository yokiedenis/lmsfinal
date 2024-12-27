"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuizButtonProps {
  courseId: string; // Receive courseId as a prop
  chapterId?: string; // Add chapterId as a prop
  quizId: string | null;
}

const QuizButton: React.FC<QuizButtonProps> = ({ courseId, quizId }) => {
  const router = useRouter();
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 1500); // Stops pulsing after 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
    router.push(`/courses/${courseId}/quizzes/${quizId}`); // Navigate to the quizzes page of this course
  };

  return (
    <button
      className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
                  hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
                  relative overflow-hidden group ${isPulsing ? 'animate-pulse' : ''}`}
      onClick={handleClick}
    >
      <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
      <span className="relative z-10">TAKE A QUIZ</span>
    </button>
  );
};

export default QuizButton;
