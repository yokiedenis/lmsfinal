import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // Import OpenAI directly

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have this key in your .env.local
});

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const response = await openai.chat.completions.create({ // Use chat.completions.create for chat-based models
      model: 'gpt-3.5-turbo', // or 'gpt-4'
      messages: [{ role: 'user', content: message }], // Format for chat models
    });

    const botReply = response.choices[0].message?.content?.trim(); // Access the content correctly
    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'An error occurred while interacting with the chatbot.' }, { status: 500 });
  }
}
