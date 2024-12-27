"use client"; // Ensure this is included for client-side rendering

import styles from "@/app/(dashboard)/(routes)/teacher/feedback/supportquerytable.module.css";
import React, { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
import { useUser  } from "@clerk/nextjs";

type Message = {
  userId: string;
  userType: "student" | "teacher";
  userName: string;
  content: string;
  timestamp: string;
  fileUrl?: string; // For file uploads
};

const ChatInterface: React.FC = () => {
  const { user } = useUser ();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetching messages on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    fetchMessages();  // Initial fetch

    const interval = setInterval(fetchMessages, 5000);  // Poll every 5 seconds
    return () => clearInterval(interval);  // Clean up interval on unmount
  }, []);

  // Function to fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data: Message[] = await response.json();
      setMessages(data);
      localStorage.setItem("messages", JSON.stringify(data)); // Cache messages in localStorage
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to handle sending a message
  const handleSend = async () => {
    if (input.trim() && user) {
      const newMessage: Message = {
        userId: user.id,
        userType: "student",
        userName: user.firstName || user.username || "Unknown User",
        content: input,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          localStorage.setItem("messages", JSON.stringify(updatedMessages)); // Cache updated messages
          return updatedMessages;
        });
        setInput("");
        setNotification("Message sent!");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string); // Set the preview image
      };
      reader.readAsDataURL(file);  // Create a preview of the image

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (data.fileUrl) {
          const newMessage: Message = {
            userId: user.id,
            userType: "student",
            userName: user.firstName || user.username || "Unknown User",
            content: "File uploaded",
            fileUrl: data.fileUrl, // Store the URL returned by the server
            timestamp: new Date().toISOString(),
          };

          // Save the message with the file URL to the database
          await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMessage),
          });

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            localStorage.setItem("messages", JSON.stringify(updatedMessages));
            return updatedMessages;
          });
          setPreviewImage(null); // Clear the preview
          setNotification("File uploaded successfully!");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setNotification("File upload failed!");
      }
    }
  };

  // Handle the 'Enter' key press for sending the message
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>Eduskill Teacher Support</div>
      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.messageContainer}>
            <div className={styles.messageHeader}>
              <strong>{message.userName}</strong>
              <span className={styles.timestamp}>
                {/* Ensure the timestamp is parsed and displayed correctly */}
                {new Date(message.timestamp).toString() !== "Invalid Date" ? 
                  new Date(message.timestamp).toLocaleString() : "Invalid Date"}
              </span>
            </div>
            <div
              className={`${styles.message} ${
                message.userType === "student" ? styles.student : styles.teacher
              }`}
            >
              {message.content}
              {message.fileUrl && (
                <div className={styles.imageContainer}>
                  <img
                    src={message.fileUrl} // Use the file URL received from the server
                    alt="Uploaded"
                    className={styles.uploadedImage}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {previewImage && (
          <div className={styles.previewContainer}>
            <strong>Preview:</strong>
            <img src={previewImage} alt="Preview" className={styles.previewImage} />
          </div>
        )}
      </div>
      <div className={styles.responseInputContainer}>
        <label htmlFor="file-upload" className={styles.fileUploadLabel}>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className={styles.hiddenFileInput}
          />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.responseInput}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Send
        </button>
      </div>

      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
};

export default ChatInterface;