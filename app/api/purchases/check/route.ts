// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const { searchParams } = new URL(request.url);
//     const courseId = searchParams.get("courseId");

//     if (!courseId) {
//       return new NextResponse("Course ID is required", { status: 400 });
//     }

//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     return NextResponse.json({ hasPurchased: !!purchase });
//   } catch (error) {
//     console.error("[PURCHASE_CHECK_API]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }









import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    return NextResponse.json(!!purchase);
  } catch (error) {
    console.error("[COURSE_CHECK_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}