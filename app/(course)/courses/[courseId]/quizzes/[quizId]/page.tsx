// app/quiz/[quizId]/page.tsx
import {StudentQuizForm} from "@/components/studentquizform";

const QuizPage = ({ params }: { params: { courseId: string; quizId: string;  } }) => {
  console.log('Route Params:', params); // Log the params to check if quizId exists
  

  return (
    <StudentQuizForm
      courseId={params.courseId} // Pass courseId
      quizId={params.quizId}     // Pass quizId
      //studentId={params.studentId}   // Replace this with the actual student ID
      
    />
    
  );
};

export default QuizPage;
