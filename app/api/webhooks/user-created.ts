import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Make sure Prisma is properly configured and imported
import { clerkClient } from '@clerk/clerk-sdk-node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;

      // Ensure we have a valid user ID
      const clerkUserId = data.id;
      if (!clerkUserId) {
        return res.status(400).json({ error: 'Invalid user data' });
      }

      // Retrieve the user data from Clerk
      const clerkUser = await clerkClient.users.getUser(clerkUserId);
      const clerkEmail = clerkUser.emailAddresses[0]?.emailAddress;

      if (!clerkEmail) {
        return res.status(400).json({ error: 'No email found for the user' });
      }

      // Create a new profile for the user in your database
      const newProfile = await prisma.profile.create({
        data: {
          userId: clerkUserId,
          name: clerkUser.firstName || 'New User',
          email: clerkEmail,
          role: 'STUDENT', // Default role
          imageUrl: clerkUser.imageUrl || '',
        },
      });

      res.status(201).json(newProfile);
    } catch (error) {
      console.error('Error creating profile from webhook:', error);
      res.status(500).json({ error: 'Error creating profile' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
