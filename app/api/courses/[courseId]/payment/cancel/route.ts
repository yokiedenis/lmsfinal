import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const courseId = url.searchParams.get('courseId');
    const chapterId = url.searchParams.get('chapterId');

    if (!token || !courseId || !chapterId) {
      return NextResponse.redirect(`${baseURL}/payment-error?reason=missing_parameters`);
    }

    // Update transaction status to canceled
    await db.transaction.updateMany({
      where: { dpoToken: token, status: 'PENDING' },
      data: { status: 'CANCELED' }
    });

    return NextResponse.redirect(`${baseURL}/courses/${courseId}/chapters/${chapterId}?payment=canceled`);

  } catch (error) {
    console.error('Payment Cancel Error:', error);
    return NextResponse.redirect(`${baseURL}/payment-error?reason=server_error`);
  }
}