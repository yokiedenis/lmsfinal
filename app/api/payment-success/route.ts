// import { NextRequest, NextResponse } from 'next/server';
// import { db } from "@/lib/db";

// // Hypothetical function to check payment status with DPO
// async function checkPaymentStatusWithDPO(token: string): Promise<boolean> {
//   // Implement this function based on DPO's API or callback system
//   // This is just a placeholder
//   return true; // or false based on actual status
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams.get('courseId');
//     const chapterId = searchParams.get('chapterId');

//     if (!courseId || !chapterId) {
//       return NextResponse.json({ error: "Missing courseId or chapterId" }, { status: 400 });
//     }

//     // Verify the transaction here
//     const transaction = await db.transaction.findFirst({
//       where: {
//         courseId: courseId,
//         createdAt: {
//           gte: new Date(Date.now() - 15 * 60 * 1000) // Transactions from last 15 minutes
//         }
//       }
//     });

//     if (!transaction) {
//       return NextResponse.json({ error: "No recent transaction found for this course" }, { status: 404 });
//     }

//     // Confirm with DPO that the payment was successful
//     const isPaymentConfirmed = await checkPaymentStatusWithDPO(transaction.dpoToken);
    
//     if (!isPaymentConfirmed) {
//       return NextResponse.json({ error: "Payment not confirmed" }, { status: 400 });
//     }

//     // Update transaction status
//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: {
//         status: 'PAID'
//       }
//     });

//     // Create or check if the purchase record exists
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: transaction.userId,
//           courseId: courseId
//         }
//       }
//     });

//     if (!existingPurchase) {
//       await db.purchase.create({
//         data: {
//           userId: transaction.userId,
//           courseId: courseId,
//           transactionId: transaction.id
//         }
//       });
//     }

//     // Generate the redirect URL
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//     const redirectUrl = `${baseUrl}/courses/${courseId}/chapters/${chapterId}`;

//     // Redirect to the chapter page
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Payment success error:', error);
//     return NextResponse.json({ error: "An error occurred while processing your payment" }, { status: 500 });
//   }
// }




// import { NextResponse } from 'next/server';
// import { db } from "@/lib/db";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get('TransactionToken');
//   const courseId = searchParams.get('courseId');

//   if (!token || !courseId) {
//     return NextResponse.json({ error: "Missing transaction token or course ID" }, { status: 400 });
//   }

//   try {
//     console.log('Received payment verification request:', { token, courseId });

//     const transaction = await db.transaction.findFirst({
//       where: {
//         dpoToken: token,
//         courseId: courseId
//       }
//     });

//     if (!transaction) {
//       console.warn('Transaction not found for token:', token);
//       return NextResponse.json({ error: "No transaction found for this token" }, { status: 404 });
//     }

//     if (transaction.status === 'SUCCESS') {
//       console.log('Transaction already marked as SUCCESS:', transaction.id);
//       return NextResponse.json({ success: true, message: "Payment already verified" });
//     }

//     // Update transaction status to SUCCESS
//     const updatedTransaction = await db.transaction.update({
//       where: { id: transaction.id },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated successfully:', updatedTransaction.id);

//     return NextResponse.json({ success: true, message: "Payment successfully verified" });

//   } catch (error) {
//     console.error('Error in payment verification:', error);
//     return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 });
//   }
// }




import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('TransactionToken');
  const courseId = searchParams.get('courseId');

  if (!token || !courseId) {
    return NextResponse.json({ error: "Missing transaction token or course ID" }, { status: 400 });
  }

  try {
    console.log('Received payment verification request:', { token, courseId });

    // Find the transaction using the DPO token
    const transaction = await db.transaction.findFirst({
      where: {
        dpoToken: token,
        courseId: courseId
      }
    });

    if (!transaction) {
      console.warn('Transaction not found for token:', token);
      return NextResponse.json({ error: "No transaction found for this token" }, { status: 404 });
    }

    if (transaction.status === 'SUCCESS') {
      console.log('Transaction already marked as SUCCESS:', transaction.id);
      return NextResponse.json({ success: true, message: "Payment already verified" });
    }

    // Update transaction status to SUCCESS
    const updatedTransaction = await db.transaction.update({
      where: { id: transaction.id },
      data: { status: 'SUCCESS' },
    });

    console.log('Transaction updated successfully:', updatedTransaction.id);

    // Optionally, you might want to update the user's access or something similar here

    return NextResponse.json({ 
      success: true, 
      message: "Payment successfully verified",
      redirectTo: `/courses/${courseId}` // Redirect user to course page or dashboard
    });

  } catch (error) {
    console.error('Error in payment verification:', error);
    return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}