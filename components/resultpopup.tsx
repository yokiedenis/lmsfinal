// components/ResultPopup.tsx

import React from 'react';

interface ResultPopupProps {
  score: number;
  totalQuestions: number;
  onClose: () => void; // Function to close the popup
}

const ResultPopup: React.FC<ResultPopupProps> = ({ score, totalQuestions, onClose }) => {
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
        <h3 className="font-semibold text-lg">Results</h3>
        <p className="mt-2">
          You scored {score} out of {totalQuestions} ({percentage}%)
        </p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultPopup;
