import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  console.log("Payment Cancel Request:", { courseId: params.courseId, chapterId: params.chapterId });

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(
        `${baseURL}/login?redirect=/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}`
      );
    }

    // Mark pending transactions as cancelled
    await db.transaction.updateMany({
      where: {
        userId,
        courseId: params.courseId,
        status: "PENDING",
      },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.redirect(
      `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=cancelled`
    );
  } catch (error) {
    console.error("[PAYMENT_CANCEL]", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      courseId: params.courseId,
      chapterId: params.chapterId,
    });
    return NextResponse.redirect(
      `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=server_error`
    );
  }
}