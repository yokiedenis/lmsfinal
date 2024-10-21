"use client";

import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";

interface StudentAIHelperProps {
  modules: string[];
  courses: string[];
}

const StudentAIHelper: React.FC<StudentAIHelperProps> = ({ modules, courses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: "1",
      message: "Hi there! How can I help you today?",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: "modules", label: "Tell me about the modules", trigger: "modules" },
        { value: "courses", label: "Tell me about the courses", trigger: "courses" },
        { value: "other", label: "Other questions", trigger: "other" },
      ],
    },
    {
      id: "modules",
      message: `Here are the available modules: ${modules.join(", ")}`,
      trigger: "2",
    },
    {
      id: "courses",
      message: `Here are the available courses: ${courses.join(", ")}`,
      trigger: "2",
    },
    {
      id: "other",
      message: "I'm sorry, I can't assist with that right now. Please ask about available modules or courses.",
      trigger: "2",
    },
  ];

  return (
    <div className={`fixed right-0 bottom-0 p-4 transition-transform ${isOpen ? "translate-y-0" : "translate-y-full"} duration-300`}>
      <span 
        className="cursor-pointer text-blue-500 font-bold underline" 
        onClick={() => setIsOpen(prev => !prev)} 
      >
        Open Eduskill AI Student Helper
      </span>
      {isOpen && (
        <div className="p-4 border bg-slate-100 rounded-md shadow-lg mt-2">
          <ChatBot steps={steps} />
        </div>
      )}
    </div>
  );
};

export default StudentAIHelper;
