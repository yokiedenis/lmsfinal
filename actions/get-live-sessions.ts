// // actions/get-live-sessions.ts

// import { db } from "@/lib/db";
// import { LiveSession } from "@prisma/client";

// interface GetLiveSessionsProps {
//   userId: string;
//   courseId: string;
// }

// // Interface to add purchase status to each session
// export type LiveSessionWithPurchaseStatus = LiveSession & {
//   hasAccess: boolean;
// };

// export const getLiveSessions = async ({
//   userId,
//   courseId,
// }: GetLiveSessionsProps): Promise<LiveSessionWithPurchaseStatus[]> => {
//   try {
//     // 1. Check if the user has purchased the course
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     const hasAccess = !!purchase;

//     // 2. If the user has not purchased, return an empty array
//     if (!hasAccess) {
//       // You can return an array where hasAccess is false to handle on the client
//       const liveSessions = await db.liveSession.findMany({
//           where: {
//               courseId: courseId,
//               isPublished: true,
//           },
//           orderBy: {
//               position: "asc",
//           },
//       });
//       return liveSessions.map(session => ({ ...session, hasAccess: false }));
//     }

//     // 3. If purchased, fetch all published live sessions for the course
//     const liveSessions = await db.liveSession.findMany({
//       where: {
//         courseId: courseId,
//         isPublished: true,
//       },
//       orderBy: {
//         position: "asc",
//       },
//     });

//     // 4. Return sessions with access status
//     return liveSessions.map(session => ({ ...session, hasAccess: true }));

//   } catch (error) {
//     console.error("[GET_LIVE_SESSIONS_ACTION_ERROR]", error);
//     return [];
//   }
// };





// // actions/get-live-sessions.ts
// import { db } from "@/lib/db";
// import { LiveSession } from "@prisma/client";

// interface GetLiveSessionsProps {
//   userId: string;
//   courseId: string;
// }

// export type LiveSessionWithPurchaseStatus = LiveSession & {
//   hasAccess: boolean;
// };

// export const getLiveSessions = async ({
//   userId,
//   courseId,
// }: GetLiveSessionsProps): Promise<LiveSessionWithPurchaseStatus[]> => {
//   try {
//     // Validate courseId
//     if (!courseId) {
//       console.error("[GET_LIVE_SESSIONS_ACTION_ERROR] courseId is missing");
//       return [];
//     }

//     // 1. Check if the user has purchased the course
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     const hasAccess = !!purchase;

//     // 2. Fetch all published live sessions for the course
//     const liveSessions = await db.liveSession.findMany({
//       where: {
//         courseId: courseId,
//         isPublished: true,
//       },
//       orderBy: {
//         position: "asc",
//       },
//     });

//     // 3. Return sessions with access status
//     return liveSessions.map((session) => ({ ...session, hasAccess }));

//   } catch (error) {
//     console.error("[GET_LIVE_SESSIONS_ACTION_ERROR]", error);
//     return [];
//   }
// };







// actions/get-live-sessions.ts
import { db } from "@/lib/db";
import { LiveSession } from "@prisma/client";

interface GetLiveSessionsProps {
  userId: string;
  courseId: string;
}

export type LiveSessionWithPurchaseStatus = LiveSession & {
  hasAccess: boolean;
  attachments: { id: string; name: string; url: string }[];
  liveclassquizzes: { id: string }[];
};

export const getLiveSessions = async ({
  userId,
  courseId,
}: GetLiveSessionsProps): Promise<LiveSessionWithPurchaseStatus[]> => {
  try {
    // Validate courseId
    if (!courseId) {
      console.error("[GET_LIVE_SESSIONS_ACTION_ERROR] courseId is missing");
      return [];
    }

    // 1. Check if the user has purchased the course
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const hasAccess = !!purchase;

    // 2. Fetch all published live sessions for the course with attachments and quizzes
    const liveSessions = await db.liveSession.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      include: {
        attachments: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        liveclassquizzes: {
          select: {
            id: true, // We only need the ID to count quizzes
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    // 3. Return sessions with access status
    return liveSessions.map((session) => ({
      ...session,
      hasAccess,
    }));

  } catch (error) {
    console.error("[GET_LIVE_SESSIONS_ACTION_ERROR]", error);
    return [];
  }
};