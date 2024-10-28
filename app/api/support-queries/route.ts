import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

// List of allowed origins
const allowedOrigins = [
  "https://eduskill-final.vercel.app",
  "https://eduskill-final-pa31mt5xt-hamzahs-projects-39dbf651.vercel.app"
];

// Function to determine if the origin is allowed
function isOriginAllowed(origin: string | null): boolean {
  return origin ? allowedOrigins.includes(origin) : false;
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    // Handle CORS preflight request
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": isOriginAllowed(origin) ? origin : "",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supportQueries = await prisma.supportQuery.findMany({
      where: { studentId: userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(supportQueries, {
      headers: {
        "Access-Control-Allow-Origin": isOriginAllowed(origin) ? origin : "",
      },
    });
  } catch (error) {
    console.error("Error fetching support queries:", error);
    return NextResponse.json(
      { error: "Failed to fetch support queries" },
      { status: 500, headers: { "Access-Control-Allow-Origin": isOriginAllowed(origin) ? origin : "" } }
    );
  }
}
