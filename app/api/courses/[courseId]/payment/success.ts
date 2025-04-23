// pages/api/payment/success.ts
import { NextApiRequest, NextApiResponse } from 'next';
import  verifyToken  from '@/lib/payment';  // Assuming you have this function
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, courseId, chapterId } = req.query;

  if (!token || !courseId || !chapterId) {
    return res.status(400).json({ success: false, error: 'Missing parameters' });
  }

  try {
    // Verify token via the payment gateway
    const isVerified = await verifyToken(token as string);
    
    if (!isVerified) {
      return res.status(400).json({ success: false, error: 'Payment verification failed' });
    }

    // Check if course exists
    const course = await db.course.findUnique({
      where: { id: courseId as string },
    });

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    // Create transaction and purchase records
    const transaction = await db.transaction.create({
      data: {
        userId: "userIdHere",  // Use the logged-in user's ID
        courseId: courseId as string,
        amount: course.price!,
        dpoToken: token as string,
        status: 'COMPLETED',
      },
    });

    const purchase = await db.purchase.create({
      data: {
        userId: "userIdHere",  // Use the logged-in user's ID
        courseId: courseId as string,
        transactionId: transaction.id,
      },
    });

    // Return success
    return res.status(200).json({ success: true, transaction, purchase });

  } catch (error) {
    console.error('Payment verification or database error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
