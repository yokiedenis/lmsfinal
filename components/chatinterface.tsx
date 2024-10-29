import React, { useEffect, useState, KeyboardEvent } from 'react';
import styles from '@/styles/ChatInterface.module.css';

type Message = {
    userId: string;
    userType: 'student' | 'teacher';
    content: string;
};

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [lastSentByUser, setLastSentByUser] = useState(false);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            if (response.ok) {
                const data: Message[] = await response.json();
                
                // Check if there are new messages
                if (data.length > messages.length && !lastSentByUser) {
                    setNotification("New message received!");
                }

                setMessages(data);
            } else {
                console.error("Failed to fetch messages:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 4000); // Clear notification after 4 seconds
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleSend = async () => {
        if (input.trim()) {
            setLoading(true);
            try {
                const newMessage: Message = {
                    userId: 'studentId', // Replace this with actual student ID
                    userType: 'student',
                    content: input
                };

                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMessage),
                });

                setInput('');
                setLastSentByUser(true);
                setNotification("Message sent!");
                fetchMessages(); // Optionally fetch new messages right after sending
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatHeader}><h2>Eduskill Student Support</h2></div>
            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${message.userType === 'student' ? styles.student : styles.teacher}`}
                    >
                        {message.content}
                    </div>
                ))}
                {loading && (
                    <div className={`${styles.message} ${styles.teacher}`}>
                        Waiting for feedback...
                    </div>
                )}
            </div>
            <div className={styles.responseInputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.responseInput}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend} className={styles.sendButton}>Send</button>
            </div>
            {notification && (
                <div className={styles.notification}>
                    {notification}
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
