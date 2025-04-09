"use client";

import React, { useState } from "react";
import axios from "axios";
import { Message, ChatbotProps } from "../types/types";

const Chatbot: React.FC<ChatbotProps> = ({ apiKey, apiEndpoint }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: "user",
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage: Message = {
        id: Date.now() + 1,
        content:
          response.data.choices[0].message.content || "Sorry, I couldn’t process that.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      let errorMessage = "Sorry, there was an error. Please try again.";
      if (axios.isAxiosError(error)) {
        errorMessage += ` Details: ${error.response?.data?.error?.message || error.message}`;
      }
      const errorMsg: Message = {
        id: Date.now() + 2,
        content: errorMessage,
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 max-w-4xl mx-auto border border-gray-800">
      
      <div className="h-96 overflow-y-auto bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg transition-all duration-200 ${
              message.sender === "user"
                ? "bg-blue-900 text-right ml-auto max-w-[80%]"
                : "bg-gray-700 text-left mr-auto max-w-[80%]"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-400 text-center animate-pulse">Loading...</div>
        )}
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all duration-200 placeholder-gray-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;