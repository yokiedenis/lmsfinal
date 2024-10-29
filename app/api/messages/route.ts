// app/api/messages/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const messages = await prisma.message.findMany(); // Fetch all messages from the database
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newMessage = await request.json();
        await prisma.message.create({ data: newMessage }); // Save new message to the database
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
}
