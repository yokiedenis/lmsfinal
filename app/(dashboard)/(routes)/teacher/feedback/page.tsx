"use client"; // Ensure this is included for client-side rendering

import { useEffect, useState, KeyboardEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import styles from "@/app/(dashboard)/(routes)/teacher/feedback/supportquerytable.module.css";

type Message = {
    userId: string;
    userType: "student" | "teacher";
    content: string;
};

const FeedbackPage: React.FC = () => {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [response, setResponse] = useState("");
    const [notification, setNotification] = useState<string | null>(null);

    const fetchMessages = async () => {
        const response = await fetch("/api/messages/");
        const data: any[] = await response.json();

        // Validate messages to ensure they conform to the Message type
        const validMessages: Message[] = data
            .filter(msg =>
                typeof msg.userId === "string" &&
                (msg.userType === "student" || msg.userType === "teacher") &&
                typeof msg.content === "string"
            ) as Message[];

        // Store valid messages in localStorage and update state
        localStorage.setItem("messages", JSON.stringify(validMessages));
        setMessages(validMessages);
    };

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const storedMessages = localStorage.getItem("messages");
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
            fetchMessages();
            const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
            return () => clearInterval(interval);
        }
    }, [isLoaded, isSignedIn]);

    const handleSendResponse = async () => {
        if (response.trim() && typeof userId === 'string') {
            const newMessage: Message = {
                userId,
                userType: "teacher",
                content: response,
            };

            // Send the new message to the API
            await fetch("/api/messages/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage),
            });

            // Update local storage and state
            const updatedMessages = [...messages, newMessage];
            localStorage.setItem("messages", JSON.stringify(updatedMessages));
            setMessages(updatedMessages);
            setResponse(""); // Clear input
            setNotification("New message sent!"); // Notify user
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendResponse();
        }
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 4000); // Clear notification after 4 seconds
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className={styles.container}>
            <div className={styles.chatHeader}>Eduskill Teacher Feedback</div>
            <div className={styles.chatMessages}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            msg.userType === "student" ? styles.student : styles.teacher
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className={styles.responseInputContainer}>
                <input
                    type="text"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className={styles.responseInput}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSendResponse} className={styles.sendButton}>
                    Send
                </button>
            </div>
            {notification && (
                <div className={styles.notification}>
                    {/* {notification} */}
                </div>
            )}
        </div>
    );
};

export default FeedbackPage;
