import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { courseId, attachId } = req.query;

  if (req.method === 'GET') {
    try {
      const attachment = await db.attachment.findUnique({
        where: {
          id: attachId as string,
          courseId: courseId as string,
        },
      });

      if (attachment) {
        return res.status(200).json(attachment);
      } else {
        return res.status(404).json({ error: 'Attachment not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
