// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
// import { db } from "@/lib/db"; // Adjust the path as necessary

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { courseId } = req.query;
//   const session = await getSession({ req });

//   if (req.method === 'GET') {
//     if (!session || !session.user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const userId = session.user.id;

//     try {
//       const purchase = await db.transaction.findFirst({
//         where: {
//           userId,
//           courseId: courseId as string,
//         },
//       });

//       return res.status(200).json({ hasPurchased: !!purchase });
//     } catch (error) {
//       console.error('Database error:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }





import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from "@/lib/db"; // Adjust path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { courseId } = req.query;
  const session = await getSession({ req });

  console.log('Session Data:', session); // Ensure the session has user data

  if (req.method === 'GET') {
    if (!session || !session.user) {
      console.log('No session or user found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;
    console.log('Fetching purchase status for userId:', userId);

    try {
      // Check if there's a transaction for the user with this courseId
      const transaction = await db.transaction.findFirst({
        where: {
          userId,
          courseId: courseId as string,
          status: 'SUCCESS', // Ensure that you're checking for successful transactions
        },
      });

      console.log('Transaction:', transaction); // Log the transaction data

      return res.status(200).json({ hasPurchased: !!transaction });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


