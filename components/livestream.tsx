"use client";
import React, { useRef, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import VideoPlayer from "./videoplayer";
import ChatLive from "./chatlive";
import { ScreenShare, Mic, MicOff, Video, VideoOff } from "lucide-react"; // Add Video and VideoOff icons

const LiveStream: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const chatRef = useRef<HTMLDivElement | null>(null); // Explicitly type as HTMLDivElement or null
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // State to track mute status
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); // State to track video status

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatRef.current &&
      !chatRef.current.contains(event.target as Node) &&
      isChatVisible
    ) {
      setIsChatVisible(false);
    }
  };

  // Screen Share Logic
  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setLocalStream(screenStream);

      // Attach screen stream to the local video player
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      // Stop sharing event
      screenStream.getTracks()[0].onended = () => {
        alert("Screen sharing stopped");
        setLocalStream(null);
      };
    } catch (error) {
      console.error("Error sharing screen:", error);
      alert("Screen sharing failed. Please check your permissions.");
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.kind === "audio") {
          track.enabled = !isMuted; // Toggle audio track
        }
      });
      setIsMuted((prev) => !prev);
    }
  };

  // Toggle video on/off
  const toggleVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.enabled = !isVideoEnabled; // Toggle video track
        }
      });
      setIsVideoEnabled((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatVisible]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#202124",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#1c1c1e",
        }}
      >
        <span className="center animated-text">Eduskill Live Class Stream</span>
      </header>

      <main
        style={{
          display: "flex",
          flexGrow: 1,
          padding: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* Local Stream */}
        <div style={{ flex: 1, position: "relative" }}>
          <VideoPlayer ref={localVideoRef} isLocal={true} stream={localStream} />
        </div>

        {/* Remote Streams */}
        {remoteStreams.map((stream, index) => (
          <div key={index} style={{ flex: 1, position: "relative" }}>
            <VideoPlayer isLocal={false} stream={stream} />
          </div>
        ))}
      </main>

      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          padding: "15px",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        💬
      </button>

      {/* Chat Component */}
      <div
        ref={chatRef}
        style={{
          position: "fixed",
          top: 0,
          right: isChatVisible ? "0" : "-400px",
          width: "400px",
          height: "100%",
          backgroundColor: "#333",
          color: "#000",
          transition: "right 0.3s ease-in-out",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {isChatVisible && <ChatLive />}
      </div>

      {/* Buttons Container */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {/* Share Screen Button */}
        <button
          onClick={shareScreen}
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          title="Share Screen"
        >
          <ScreenShare size={24} />
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        {/* Video On/Off Button */}
        <button
          onClick={toggleVideo}
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          title={isVideoEnabled ? "Turn Off Camera" : "Turn On Camera"}
        >
          {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
      </div>
    </div>
  );
};

export default LiveStream;
