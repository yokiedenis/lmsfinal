import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  const { userId } = auth();
  console.log("Authenticated User ID:", userId);

  if (!userId) {
    return new NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Handle CORS preflight request
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://eduskill-final.vercel.app",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const supportQueries = await prisma.supportQuery.findMany({
      where: { studentId: userId },
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetched Support Queries:", supportQueries);
    return new NextResponse.json(supportQueries, {
      headers: {
        "Access-Control-Allow-Origin": "https://eduskill-final.vercel.app",
      },
    });
  } catch (error) {
    console.error("Error fetching support queries:", error);
    return new NextResponse.json(
      { error: "Failed to fetch support queries" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "https://eduskill-final.vercel.app" } }
    );
  }
}
