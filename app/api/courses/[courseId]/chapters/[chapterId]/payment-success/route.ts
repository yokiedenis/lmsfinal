import { NextResponse } from "next/server";
import axios from "axios";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DPO_API_URL = "https://secure.3gdirectpay.com/API/v6/";
const COMPANY_TOKEN = "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

interface DPOResponse {
  API3G: {
    Result: string;
    ResultExplanation: string;
    TransactionStatus?: string;
  };
}

const verifyPayment = async (token: string): Promise<boolean> => {
  const requestData = {
    CompanyToken: COMPANY_TOKEN,
    Request: "verifyToken",
    TransactionToken: token,
  };

  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
    suppressEmptyNode: true,
  });

  const xmlPayload = builder.build({ API3G: requestData });

  try {
    const response = await axios.post(DPO_API_URL, xmlPayload, {
      headers: {
        "Content-Type": "application/xml",
      },
      timeout: 5000,
    });

    const parser = new XMLParser();
    const parsedResponse: DPOResponse = parser.parse(response.data);

    return (
      parsedResponse.API3G.Result === "000" &&
      parsedResponse.API3G.TransactionStatus === "Completed"
    );
  } catch (error) {
    console.error("DPO API Verification Error:", error);
    throw new Error("Failed to verify payment token");
  }
};

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  console.log("Payment Success Request:", { token, courseId: params.courseId, chapterId: params.chapterId });

  if (!token) {
    return NextResponse.redirect(
      `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=missing_token`
    );
  }

  try {
    const isPaymentCompleted = await verifyPayment(token);
    if (!isPaymentCompleted) {
      return NextResponse.redirect(
        `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=payment_not_verified`
      );
    }

    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.redirect(
        `${baseURL}/login?redirect=/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`
      );
    }

    const transaction = await db.transaction.findUnique({
      where: { dpoToken: token },
      include: { purchases: true },
    });

    if (!transaction) {
      return NextResponse.redirect(
        `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=transaction_not_found`
      );
    }

    if (transaction.status === "COMPLETED" && transaction.purchases.length > 0) {
      return NextResponse.redirect(
        `${baseURL}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`
      );
    }

    await db.transaction.update({
      where: { id: transaction.id },
      data: { status: "COMPLETED" },
    });

    if (transaction.purchases.length === 0) {
      await db.purchase.create({
        data: {
          userId: user.id,
          courseId: params.courseId,
          transactionId: transaction.id,
        },
      });
    }

    return NextResponse.redirect(
      `${baseURL}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`
    );
  } catch (error) {
    console.error("Payment Verification Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      token,
      courseId: params.courseId,
      chapterId: params.chapterId,
    });
    return NextResponse.redirect(
      `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=server_error`
    );
  }
}