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




import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

// Hypothetical function to check payment status with DPO
async function checkPaymentStatusWithDPO(token: string): Promise<boolean> {
  // Implement this function based on DPO's API or callback system
  // This is just a placeholder
  return true; // or false based on actual status
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const chapterId = searchParams.get('chapterId');

    if (!courseId || !chapterId) {
      return NextResponse.json({ error: "Missing courseId or chapterId" }, { status: 400 });
    }

    // Verify the transaction here
    const transaction = await db.transaction.findFirst({
      where: {
        courseId: courseId,
        createdAt: {
          gte: new Date(Date.now() - 15 * 60 * 1000) // Transactions from last 15 minutes
        }
      }
    });

    if (!transaction) {
      return NextResponse.json({ error: "No recent transaction found for this course" }, { status: 404 });
    }

    // Confirm with DPO that the payment was successful
    const isPaymentConfirmed = await checkPaymentStatusWithDPO(transaction.dpoToken);
    
    if (!isPaymentConfirmed) {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 400 });
    }

    // Update transaction status
    await db.transaction.update({
      where: { id: transaction.id },
      data: {
        status: 'PAID'
      }
    });

    // Create or check if the purchase record exists
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: transaction.userId,
          courseId: courseId
        }
      }
    });

    if (!existingPurchase) {
      await db.purchase.create({
        data: {
          userId: transaction.userId,
          courseId: courseId,
          transactionId: transaction.id
        }
      });
    }

    // Generate the redirect URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/courses/${courseId}/chapters/${chapterId}`;

    // Redirect to the chapter page
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Payment success error:', error);
    return NextResponse.json({ error: "An error occurred while processing your payment" }, { status: 500 });
  }
}