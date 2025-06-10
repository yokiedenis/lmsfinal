// interface LiveSessionResultsProps {
//   liveSession: any;
//   courseId: string;
//   sessionId: string;
// }

// export const LiveSessionResults = ({ liveSession, courseId, sessionId }: LiveSessionResultsProps) => {
//   // Placeholder data
//   const results = liveSession.quizzes?.[0]?.results || [{ student: "Student A", score: 80 }];
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quiz Results</h3>
//       {results.map((result, index) => (
//         <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900 rounded-md">
//           <p>{result.student}: {result.score}%</p>
//         </div>
//       ))}
//     </div>
//   );
// };