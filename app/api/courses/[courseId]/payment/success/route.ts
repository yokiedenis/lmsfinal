// import { NextResponse } from 'next/server';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { verifyPayment } from '../checkout/route';

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const token = url.searchParams.get('token');
//     const courseId = url.searchParams.get('courseId');
//     const chapterId = url.searchParams.get('chapterId');

//     if (!token || !courseId || !chapterId) {
//       return NextResponse.redirect(`${baseURL}/payment-error?reason=missing_parameters`);
//     }

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return NextResponse.redirect(`${baseURL}/login?redirect=/payment-success`);
//     }

//     // Verify payment with DPO
//     const isPaymentCompleted = await verifyPayment(token);
//     if (!isPaymentCompleted) {
//       return NextResponse.redirect(`${baseURL}/payment-error?reason=payment_not_verified`);
//     }

//     // Check transaction status
//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//       include: { purchases: true }
//     });

//     if (!transaction) {
//       return NextResponse.redirect(`${baseURL}/payment-error?reason=transaction_not_found`);
//     }

//     // If already processed, redirect to success
//     if (transaction.status === 'COMPLETED' && transaction.purchases.length > 0) {
//       return NextResponse.redirect(`${baseURL}/courses/${courseId}/chapters/${chapterId}`);
//     }

//     // Update transaction status
//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { status: 'COMPLETED' }
//     });

//     // Create purchase record
//     await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: courseId,
//         transactionId: transaction.id
//       }
//     });

//     return NextResponse.redirect(`${baseURL}/courses/${courseId}/chapters/${chapterId}`);

//   } catch (error) {
//     console.error('Payment Success Error:', error);
//     return NextResponse.redirect(`${baseURL}/payment-error?reason=server_error`);
//   }
// }