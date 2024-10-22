// components/Chat.tsx
"use client";

import { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        const userMessage = input;
        setMessages((prev) => [...prev, { user: userMessage, bot: '' }]);
        
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            return [...prev.slice(0, -1), { user: lastMessage.user, bot: data.response }];
        });

        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p>User: {msg.user}</p>
                        <p>Bot: {msg.bot}</p>
                    </div>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;
