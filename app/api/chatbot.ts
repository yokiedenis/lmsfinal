// pages/api/chatbot.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const userMessage = req.body.message;
        
        // Integrate with your chosen chatbot service
        const botResponse = await getChatbotResponse(userMessage);
        
        res.status(200).json({ response: botResponse });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getChatbotResponse(message: string) {
    // Call your chatbot API here
    // Example: return await fetch('your-chatbot-api', { method: 'POST', body: JSON.stringify({ message }) });
    return "This is a mock response from the chatbot.";
}
