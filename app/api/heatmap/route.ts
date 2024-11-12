// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const quizAttempts = await prisma.quizAttempt.findMany({
//       select: {
//         studentId: true,
//         createdAt: true,
//       },
//     });

//     const userProgress = await prisma.userProgress.findMany({
//       select: {
//         userId: true,
//         createdAt: true,
//         isCompleted: true,
//       },
//     });

//     res.status(200).json({ quizAttempts, userProgress });
//   } catch (error) {
//     console.error('Error fetching heatmap data:', error);
//     res.status(500).json({ message: 'Failed to load heatmap data' });
//   }
// }
