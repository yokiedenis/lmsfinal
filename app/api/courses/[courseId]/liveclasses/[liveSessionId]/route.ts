// // app/api/courses/[courseId]/liveclasses/[liveSessionId].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId } = auth();
//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   const { courseId, liveSessionId } = req.query;
//   const { googleFormQuizUrl } = req.body;

//   if (req.method === "PATCH") {
//     try {
//       const liveSession = await db.liveSession.update({
//         where: { id: liveSessionId as string, courseId: courseId as string },
//         data: { googleFormQuizUrl },
//       });
//       return res.status(200).json(liveSession);
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to update Google Forms quiz URL" });
//     }
//   }

//   return res.status(405).json({ error: "Method not allowed" });
// }







// app/api/courses/[courseId]/liveclasses/[liveSessionId]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; liveSessionId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, liveSessionId } = params;
    const { googleFormQuizUrl } = await req.json();

    if (!courseId || !liveSessionId) {
      return NextResponse.json({ error: "Missing courseId or liveSessionId" }, { status: 400 });
    }

    const liveSession = await db.liveSession.update({
      where: { id: liveSessionId, courseId },
      data: { googleFormQuizUrl },
    });

    return NextResponse.json(liveSession, { status: 200 });
  } catch (error) {
    console.error("[PATCH_LIVE_SESSION_ERROR]", error);
    return NextResponse.json({ error: "Failed to update Google Forms quiz URL" }, { status: 500 });
  }
}