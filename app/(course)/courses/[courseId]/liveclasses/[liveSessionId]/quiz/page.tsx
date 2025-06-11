// import { LiveSessionQuizForm } from "./_components/livesessionquizform";

// const LiveSessionQuizPage = ({ params }: { params: { courseId: string; liveSessionId: string } }) => {
//   return (
//     <div>
//       <h1 className="text-xl font-bold">Live Session Quiz</h1>
//       <LiveSessionQuizForm
//         courseId={params.courseId}     // Pass courseId
//         liveSessionId={params.liveSessionId} // Pass liveSessionId
//       />
//     </div>
//   );
// };

// export default LiveSessionQuizPage;





import { LiveSessionQuizForm } from "./_components/livesessionquizform";

const LiveSessionQuizPage = ({ params }: { params: { courseId: string; liveSessionId: string } }) => {
  // Log params for debugging
  console.log("[QUIZ_PAGE] Params:", { courseId: params.courseId, liveSessionId: params.liveSessionId });

  return (
    <div className="p-6">
      {/* <h1 className="text-xl font-bold">Live Session Quiz</h1> */}
      <LiveSessionQuizForm
        courseId={params.courseId}
        liveSessionId={params.liveSessionId}
      />
    </div>
  );
};

export default LiveSessionQuizPage;