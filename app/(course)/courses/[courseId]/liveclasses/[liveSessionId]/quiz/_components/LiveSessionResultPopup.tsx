// components/LiveSessionResultPopup.tsx
"use client";

import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface LiveSessionResultPopupProps {
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  onClose: () => void;
  onReattempt?: () => void;
  onProceed?: () => void;
  showRevisitMessage?: boolean;
  userName: string;
  courseName: string;
  completionDate: string;
  courseId?: string;
}

const LiveSessionResultPopup: React.FC<LiveSessionResultPopupProps> = ({
  score,
  totalQuestions,
  passingPercentage,
  onClose,
  onReattempt = () => {},
  onProceed = () => {},
  showRevisitMessage,
  userName,
  courseName,
  completionDate,
  courseId,
}) => {
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : "0";
  const passed = parseFloat(percentage) >= passingPercentage;
  const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

  const handleSaveScore = () => {
    console.log("[LIVE_SESSION_RESULT_POPUP] Saving score:", { score, totalQuestions, userName, courseId });
    toast.success("Your score has been saved successfully!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`relative rounded-2xl shadow-2xl p-8 max-w-lg w-full overflow-hidden ${
          passed
            ? "bg-gradient-to-br from-teal-50 via-white to-teal-100"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        {/* Decorative Elements */}
        {passed && (
          <>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal-300 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-teal-300 rounded-full opacity-30 animate-pulse delay-150"></div>
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ y: [-10, 10], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-5xl">🎉</span>
            </motion.div>
          </>
        )}

        {/* Header */}
        <h3
          className={`text-3xl font-extrabold text-center mb-6 tracking-tight ${
            passed ? "text-teal-700" : "text-gray-800"
          }`}
        >
          {passed ? "Well Done!" : "Live Session Results"}
        </h3>

        {/* Score Display */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">
            {userName}, you scored{" "}
            <span className={`font-bold ${passed ? "text-teal-600" : "text-amber-600"}`}>
              {score}
            </span>{" "}
            out of{" "}
            <span className="font-bold text-gray-800">{totalQuestions}</span>
          </p>
          <p className="text-5xl font-extrabold mt-4 tracking-tight">
            <span className={passed ? "text-teal-600" : "text-amber-600"}>{percentage}%</span>
          </p>
          <div className="mt-6 h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full ${passed ? "bg-teal-500" : "bg-amber-500"}`}
            />
          </div>
        </div>

        {/* Messages */}
        {passed && (
          <div className="mt-6 text-center bg-teal-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-teal-800">
              🌟 <strong>Great Job!</strong> Your performance in the live session quiz for{" "}
              <span className="font-semibold">{courseName}</span> is outstanding!
            </p>
          </div>
        )}
        {shouldShowRevisit && (
          <div className="mt-4 text-center bg-amber-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-amber-800">
              📚 <strong>Keep Learning!</strong> Review the live session materials to improve your score.
            </p>
          </div>
        )}

        {/* Completion Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Completed on: <span className="font-medium">{completionDate}</span>
          </p>
          <p>
            Course: <span className="font-medium">{courseName}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {!passed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReattempt}
              className="px-6 py-2 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Reattempt
            </motion.button>
          )}
          {passed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProceed}
              className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Proceed
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveScore}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Save Your Score
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveSessionResultPopup;