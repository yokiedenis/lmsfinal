"use client"; // Marks this as a Client Component

import { useState } from "react";
import { LiveSessionQuizModal } from "./live-session-quiz-modal";
import { db } from "@/lib/db";

interface LiveSessionInteractiveProps {
  initialData: {
    id: string;
    courseId: string;
    title: string;
    startTime: Date;
    endTime: Date;
    description: string | null;
    meetingUrl: string | null;
    position: number;
    isPublished: boolean;
    attachments: {
      id: string;
      courseId: string;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      url: string;
      chapterId: string | null;
      liveSessionId: string | null;
    }[];
    createdAt: Date;
    updatedAt: Date;
    liveclassquizzes: {
      id: string;
      liveSessionId: string;
      title: string;
      questions: { question: string; options: string[]; correctAnswer: string }[];
      isPublished: boolean;
      createdAt: Date;
      updatedAt: Date;
    }[];
    liveclassattempts: {
      id: string;
      liveSessionId: string;
      studentId: string;
      score: number | null;
      timeTaken: Date | null;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
  courseId: string;
  sessionId: string;
}

const LiveSessionInteractive = ({ initialData, courseId, sessionId }: LiveSessionInteractiveProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveQuiz = async (data: { title: string; questions: { question: string; options: string[]; correctAnswer: string }[]; isPublished: boolean }) => {
    try {
      await db.liveClassQuiz.upsert({
        where: { id: initialData.liveclassquizzes[0]?.id || "" },
        create: {
          liveSessionId: sessionId,
          title: data.title,
          questions: data.questions,
          isPublished: data.isPublished,
        },
        update: {
          title: data.title,
          questions: data.questions,
          isPublished: data.isPublished,
        },
      });
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors duration-200"
      >
        Create New Quiz
      </button>
      <LiveSessionQuizModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseId={courseId}
        sessionId={sessionId}
        initialData={initialData.liveclassquizzes[0]}
        onSave={handleSaveQuiz}
      />
    </>
  );
};

export default LiveSessionInteractive;