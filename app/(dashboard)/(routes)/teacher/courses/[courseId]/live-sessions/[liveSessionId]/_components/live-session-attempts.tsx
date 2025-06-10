// interface LiveSessionAttemptsProps {
//   liveSession: any;
//   courseId: string;
//   sessionId: string;
// }

// export const LiveSessionAttempts = ({ liveSession, courseId, sessionId }: LiveSessionAttemptsProps) => {
//   // Placeholder data
//   const attempts = liveSession.attempts || [{ student: "Student A", time: "2025-06-07 12:00", status: "Completed" }];
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attempt History</h3>
//       {attempts.map((attempt, index) => (
//         <div key={index} className="p-2 bg-red-50 dark:bg-red-900 rounded-md">
//           <p>{attempt.student} - {attempt.time} - {attempt.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };