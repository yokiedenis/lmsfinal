// // app/api/purchase/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const courseId = searchParams.get("courseId");
//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (!courseId) {
//     return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
//   }

//   try {
//     const purchase = await prisma.purchase.findFirst({
//       where: {
//         userId,
//         courseId: courseId as string,
//       },
//     });

//     return NextResponse.json({ hasPurchased: !!purchase }, { status: 200 });
//   } catch (error) {
//     console.error("Error checking purchase:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





// import { auth } from '@clerk/nextjs/server'; // Correct import
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';

// export async function GET(req: Request) {
//   try {
//     const { userId } = auth(); // Correct usage of auth()
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams.get('courseId'); // Get the courseId from query params

//     if (!userId || !courseId) {
//       return new NextResponse('Unauthorized or missing courseId', { status: 401 });
//     }

//     // Check for a successful transaction
//     const transaction = await db.transaction.findFirst({
//       where: {
//         userId,
//         courseId,
//         status: 'SUCCESS', // Ensure the transaction is successful
//       },
//     });

//     console.log('Transaction:', transaction); // Log the transaction

//     // Return the purchase status
//     return NextResponse.json({ hasPurchased: !!transaction });
//   } catch (error) {
//     console.error('[PURCHASE_STATUS_ERROR]', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }






import { getAuth } from '@clerk/nextjs/server'; // Use getAuth instead of auth
import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
import { db } from '@/lib/db';

export async function GET(req: NextRequest) { // Use NextRequest instead of Request
  try {
    // Use getAuth to retrieve userId from the request
    const { userId } = getAuth(req); // Pass the NextRequest object to getAuth()
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId'); // Get the courseId from query params

    if (!userId || !courseId) {
      return new NextResponse('Unauthorized or missing courseId', { status: 401 });
    }

    // Check for a successful transaction
    const transaction = await db.transaction.findFirst({
      where: {
        userId,
        courseId,
        status: 'SUCCESS', // Ensure the transaction is successful
      },
    });

    console.log('Transaction:', transaction); // Log the transaction

    // Return the purchase status
    return NextResponse.json({ hasPurchased: !!transaction });
  } catch (error) {
    console.error('[PURCHASE_STATUS_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}