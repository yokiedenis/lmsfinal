import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { chapterQuizId: string } }) {
    const { chapterQuizId } = params;

    try {
        const body = await req.json();
        const { title } = body;

        // Validate required fields
        if (!title) {
            return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
        }

        // Update the ChapterQuiz in the database
        const updatedChapterQuiz = await prisma.chapterQuiz.update({
            where: { id: chapterQuizId },
            data: { title },
        });

        return NextResponse.json({ message: 'Chapter Quiz updated successfully.', quiz: updatedChapterQuiz });
    } catch (error) {
        console.error('Error updating Chapter Quiz:', error);
        return NextResponse.json({ error: 'An error occurred while updating the Chapter Quiz.' }, { status: 500 });
    }
}
