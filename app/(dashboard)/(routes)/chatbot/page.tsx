"use client";

import React from "react";
import Chatbot from "@/components/chatbot";

const App: React.FC = () => {
  const apiKey = "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"; // Ensure this is correct and secure
  const apiEndpoint = "https://api.openai.com/v1/chat/completions";

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl"> {/* Increased width here */}
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Eduskill AI Chatbot
        </h1>
        <Chatbot apiKey={apiKey} apiEndpoint={apiEndpoint} />
      </div>
    </div>
  );
};

export default App;