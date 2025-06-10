import { LiveSessionQuizForm } from "./_components/livesessionquizform";

const LiveSessionQuizPage = ({ params }: { params: { courseId: string; liveSessionId: string } }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Live Session Quiz</h1>
      <LiveSessionQuizForm
        courseId={params.courseId}     // Pass courseId
        liveSessionId={params.liveSessionId} // Pass liveSessionId
      />
    </div>
  );
};

export default LiveSessionQuizPage;