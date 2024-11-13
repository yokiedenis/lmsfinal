// pages/api/auth/createUser .ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust the import path as necessary
import  Clerk  from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body; // Get email from request body

    try {
      // Extract username from email
      const username = email.split('@')[0]; // Extracting username

      // Store user information in your database
      const user = await prisma.user.create({
        data: {
          email: email,
          name: username, // Store the extracted username
        },
      });

      res.status(201).json(user); // Return the created user
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'User  creation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}