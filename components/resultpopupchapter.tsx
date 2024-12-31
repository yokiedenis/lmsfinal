import React from "react";
import { useUser } from "@clerk/nextjs";

interface ResultPopupProps {
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  onClose: () => void;
  onReattempt: () => void;
  onProceed: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  score,
  totalQuestions,
  passingPercentage,
  onClose,
  onReattempt,
  onProceed,
}) => {
  const { user } = useUser(); // Get the user ID from Clerk
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : "0";
  const hasPassed = parseFloat(percentage) >= passingPercentage;

  // Function to call API and update points
  const updatePoints = async () => {
    if (hasPassed && user) {
      try {
        const response = await fetch('/api/updatePoints', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            score,
            totalQuestions,
            passingPercentage,
          }),
        });

        const data = await response.json();
        console.log('Points updated:', data.points);
      } catch (error) {
        console.error('Error updating points:', error);
      }
    }
  };

  // Update points when user proceeds to the next chapter
  const handleProceed = () => {
    updatePoints();
    onProceed();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
        <h3 className="font-semibold text-lg">Chapter Quiz Results</h3>
        <p className="mt-2">
          You scored {score} out of {totalQuestions} ({percentage}%)
        </p>
        <p
          className={`mt-2 font-semibold ${hasPassed ? "text-green-600" : "text-red-600"}`}
        >
          {hasPassed ? "Congratulations, you passed!" : "You failed. Please try again."}
        </p>
        <div className="mt-4 flex space-x-4">
          {!hasPassed && (
            <button
              onClick={onReattempt}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition-colors"
            >
              Reattempt Chapter Quiz
            </button>
          )}
          {hasPassed && (
            <button
              onClick={handleProceed} // Use the modified function
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Proceed to Next Chapter
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
