// import { NextResponse, NextRequest } from "next/server"; 
// import prisma from "@/lib/prisma"; 
// import { z } from "zod"; 
// import { getAuth } from "@clerk/nextjs/server"; 

// // Zod schema for validating the answer submission
// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// // API route handler for submitting quiz answers
// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterQuizId: string } }) {
//   const { chapterQuizId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request); 

//   // Check if the user is authenticated
//   if (!userId) {
//     return NextResponse.json(
//       { message: "User not authenticated" },
      
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch the quiz questions and their correct answers
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuizId },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     // Calculate score
//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     // Create a mapping of correct answers for quick lookup
//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer])
//     );

//     // Iterate through answers to calculate the score
//     answers.forEach(answer => {
//       const submittedAnswer = answer.answer.split('.')[0].trim(); // Extract the letter and trim any whitespace
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       // Compare the submitted answer with the correct answer
//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Check if the user has already submitted the quiz before
//     const existingAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//     });

//     let quizAttempt;

//     if (existingAttempt) {
//       // If an attempt exists, update it
//       quizAttempt = await prisma.chapterQuizAttempt.update({
//         where: { id: existingAttempt.id },
//         data: {
//           score,
//           totalQuestions,
//           answers: JSON.stringify(answers), // Store the new answers
//         },
//       });
//     } else {
//       // If no previous attempt exists, create a new one
//       quizAttempt = await prisma.chapterQuizAttempt.create({
//         data: {
//           chapterQuizId,
//           studentId: userId,
//           score,
//           totalQuestions,
//           answers: JSON.stringify(answers),
//         },
//       });
//     }

//     // Return the results with status 201 (Created)
//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== 'string') {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch the quiz questions and their correct answers
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     // Calculate score
//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer])
//     );

//     answers.forEach(answer => {
//       const submittedAnswer = answer.answer.split('.')[0].trim();
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Find the ChapterQuiz for this chapter
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId: chapterId }
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create or update the quiz attempt
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id } // Connect to the existing ChapterQuiz
//         },
//         student: {
//           connect: { id: userId } // Connect to the existing User (student)
//         },
//         score,
//         totalQuestions,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== 'string') {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId,  // Assuming userId from Clerk matches your database ID format
//           name: "New User",  // You might want to fetch this from Clerk or default it
//           email: "user@example.com"  // Similarly, default or fetch from Clerk
//         }
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach(answer => {
//       const submittedAnswer = answer.answer.split('.')[0].trim();
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId: chapterId }
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id }
//         },
//         student: {
//           connect: { id: userId }
//         },
//         score,
//         totalQuestions,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getAuth } from "@clerk/nextjs/server";

const answerSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1, "Question ID is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one answer is required"),
});

export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
  const { chapterId } = params;

  // Parse the request body
  const body = await request.json();

  // Validate the request body against the schema
  const result = answerSchema.safeParse(body);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { answers } = result.data;

  // Get user authentication details from the request
  const { userId } = getAuth(request);

  // Check if the user is authenticated and use type guard
  if (!userId || typeof userId !== 'string') {
    return NextResponse.json(
      { message: "User not authenticated or user ID is invalid" },
      { status: 401 }
    );
  }

  try {
    // Check if user exists, if not, create the user
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.log(`User not found, creating user with ID: ${userId}`);
      user = await prisma.user.create({
        data: {
          id: userId,  // Assuming userId from Clerk matches your database ID format
          name: "New User",  // You might want to fetch this from Clerk or default it
          email: "user@example.com"  // Similarly, default or fetch from Clerk
        }
      });
    } else {
      console.log(`User found with ID: ${userId}`);
    }

    const quizQuestions = await prisma.chapterQuestion.findMany({
      where: { chapterQuiz: { chapterId } },
      select: { id: true, correctAnswer: true },
    });

    console.log("quizQuestions:", quizQuestions);
    console.log("submitted answers:", answers);

    let score = 0;
    const totalQuestions = quizQuestions.length;

    const correctAnswersMap = Object.fromEntries(
      quizQuestions.map(question => [question.id, question.correctAnswer.trim()])
    );

    answers.forEach(answer => {
      // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
      const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
      const submittedAnswer = submittedAnswerMatch ? submittedAnswerMatch[0].replace('.', '').trim() : '';
      
      const correctAnswer = correctAnswersMap[answer.questionId];

      console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

      if (correctAnswer && correctAnswer === submittedAnswer) {
        score++;
      }
    });

    const chapterQuiz = await prisma.chapterQuiz.findFirst({
      where: { chapterId: chapterId }
    });

    if (!chapterQuiz) {
      return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
    }

    const quizAttempt = await prisma.chapterQuizAttempt.create({
      data: {
        chapterQuiz: {
          connect: { id: chapterQuiz.id }
        },
        student: {
          connect: { id: userId }
        },
        score,
        totalQuestions,
        answers: JSON.stringify(answers),
      },
    });

    return NextResponse.json(
      {
        score,
        totalQuestions,
        attemptId: quizAttempt.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit answers:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}