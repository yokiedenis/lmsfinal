// // app/api/user-progress/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");

//   if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

//   try {
//     const progress = await prisma.userProgress.findMany({
//       where: { userId },
//       select: { chapterId: true, isCompleted: true, courseId: true },
//     });
//     return NextResponse.json(progress, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user progress:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }




// app/api/user-progress/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { userId: authUserId } = auth(); // Get authenticated user ID from Clerk
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Validate userId and ensure it matches the authenticated user
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  if (!authUserId || authUserId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      select: {
        chapterId: true,
        courseId: true,
        isCompleted: true,
        score: true,
        level: true,
        points: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(progress, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user progress:", error);
    if (error.message.includes("expected_type")) {
      return NextResponse.json(
        { error: "Database schema error: courseId cannot be null" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}