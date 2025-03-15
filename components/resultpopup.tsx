// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   showRevisitMessage: boolean; // New prop to show the revisit message
//   onClose: () => void; // Function to close the popup
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({ score, totalQuestions, showRevisitMessage, onClose }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         {showRevisitMessage && (
//           <p className="mt-2 text-yellow-600 font-semibold">
//             You may revisit the material to improve your score.
//           </p>
//         )}
//         <button 
//           onClick={onClose} 
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;







// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void; // Explicitly optional
//   onProceed?: () => void; // Explicitly optional
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {}, // Default empty function
//   onProceed = () => {}, // Default empty function
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         {!passed && (
//           <p className="mt-2 text-yellow-600 font-semibold">
//             You may revisit the material to improve your score.
//           </p>
//         )}
//         <div className="mt-4 flex justify-end space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-md"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <button
//               onClick={onProceed}
//               className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
//             >
//               Proceed
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;







// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean; // Added as optional
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         {shouldShowRevisit && (
//           <p className="mt-2 text-yellow-600 font-semibold">
//             You may revisit the material to improve your score.
//           </p>
//         )}
//         <div className="mt-4 flex justify-end space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-md"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <button
//               onClick={onProceed}
//               className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
//             >
//               Proceed
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;




import React from 'react';

interface ResultPopupProps {
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  onClose: () => void;
  onReattempt?: () => void;
  onProceed?: () => void;
  showRevisitMessage?: boolean; // Added as optional
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  score,
  totalQuestions,
  passingPercentage,
  onClose,
  onReattempt = () => {},
  onProceed = () => {},
  showRevisitMessage,
}) => {
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
  const passed = parseFloat(percentage) >= passingPercentage;
  const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
      <div
        className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
          passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
        } max-w-md w-full`}
      >
        {/* Decorative Elements for Passing */}
        {passed && (
          <>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl animate-bounce">🎉</span>
            </div>
          </>
        )}

        {/* Header */}
        <h3
          className={`text-2xl font-bold text-center mb-4 ${
            passed ? 'text-green-700' : 'text-gray-800'
          }`}
        >
          {passed ? 'Congratulations!' : 'Quiz Results'}
        </h3>

        {/* Score Display */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            You scored{' '}
            <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
              {score}
            </span>{' '}
            out of{' '}
            <span className="font-bold text-gray-800">{totalQuestions}</span>
          </p>
          <p className="text-3xl font-extrabold mt-2">
            <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
          </p>
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-out ${
                passed ? 'bg-green-500' : 'bg-orange-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Messages */}
        {passed && (
          <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
            🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
          </p>
        )}
        {shouldShowRevisit && (
          <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
            📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {!passed && (
            <button
              onClick={onReattempt}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Reattempt
            </button>
          )}
          {passed && (
            <button
              onClick={onProceed}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Proceed
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;