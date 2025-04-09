import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { token, courseId } = await req.json();
  const { userId } = getAuth(req);

  if (!userId || !token || !courseId) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    // Update the transaction to completed
    await db.transaction.updateMany({
      where: { id:token }, // Ensure token exists in the Transaction model
      data: { status: "COMPLETED" },
    });

    // Create purchase with transactionId
    await db.purchase.create({
      data: {
        userId,
        courseId,
        transactionId: token,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to confirm payment." }, { status: 500 });
  }
}
