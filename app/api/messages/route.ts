import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path to your Prisma client

// Define the GET method to fetch messages
export async function GET() {
    try {
        // Fetch messages from your database
        const messages = await prisma.message.findMany(); 
        return NextResponse.json(messages); // Return the messages as JSON
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
    }
}

// Define the POST method to create a new message
export async function POST(request: Request) {
    try {
        // Parse the incoming JSON body
        const { userName, content } = await request.json(); 

        // Validate input
        if (!userName || !content) {
            return NextResponse.json(
                { error: 'Both userName and content are required' },
                { status: 400 }
            );
        }

        // Create a new message in the database
        const newMessage = await prisma.message.create({
            data: {
                userName,
                content,
                userId: 'defaultUserId', // Adjust based on your user management
                userType: 'defaultUserType' // Adjust based on your user management
            },
        });

        return NextResponse.json(newMessage, { status: 201 }); // Return the created message
    } catch (error) {
        console.error('Error saving message:', error);
        return NextResponse.json(
            { error: 'Failed to save message' },
            { status: 500 }
        );
    }
}
