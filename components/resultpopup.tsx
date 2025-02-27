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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
        <h3 className="font-semibold text-lg">Results</h3>
        <p className="mt-2">
          You scored {score} out of {totalQuestions} ({percentage}%)
        </p>
        {shouldShowRevisit && (
          <p className="mt-2 text-yellow-600 font-semibold">
            You may revisit the material to improve your score.
          </p>
        )}
        <div className="mt-4 flex justify-end space-x-4">
          {!passed && (
            <button
              onClick={onReattempt}
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-md"
            >
              Reattempt
            </button>
          )}
          {passed && (
            <button
              onClick={onProceed}
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
            >
              Proceed
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;