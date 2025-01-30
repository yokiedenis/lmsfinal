// // pages/api/courses/[courseId]/quizzes/create-get.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma'; // Adjust import based on your setup

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { title, questions, chapter } = req.body;
//     console.log("Course ID:", req.query.courseId); // Log course ID

//     try {
//       const quiz = await prisma.chapterQuiz.create({
//         data: {
//           title,
//           courseId: req.query.courseId as string,
//           chapter,
//           questions: {
//             create: questions.map((question: any) => ({
//               questionText: question.text,
//               options: question.options,
//               correctAnswer: question.correctAnswer,
//             })),
//           },
//         },
//       });

//       res.status(201).json(quiz);
//     } catch (error) {
//       console.error("Error details:", error); // Log error details
//       res.status(500).json({ error: 'Failed to create quiz', details: error });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
