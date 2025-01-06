"use client";
import React, { useRef, useState, useEffect } from "react";
//import { db } from "../firebase";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import VideoPlayer from "./videoplayer";
import ChatLive from "./chatlive";
import { ScreenShare, Mic, MicOff, Video, VideoOff } from "lucide-react";

const LiveStream: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false); // State for hand raise

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

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setLocalStream(screenStream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      screenStream.getTracks()[0].onended = () => {
        alert("Screen sharing stopped");
        setLocalStream(null);
      };
    } catch (error) {
      console.error("Error sharing screen:", error);
      alert("Screen sharing failed. Please check your permissions.");
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.kind === "audio") {
          track.enabled = !isMuted;
        }
      });
      setIsMuted((prev) => !prev);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.enabled = !isVideoEnabled;
        }
      });
      setIsVideoEnabled((prev) => !prev);
    }
  };

  const raiseHand = () => {
    setIsHandRaised(true);
    setTimeout(() => setIsHandRaised(false), 3000); // Auto-hide after 3 seconds
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
        <div style={{ flex: 1, position: "relative" }}>
          <VideoPlayer ref={localVideoRef} isLocal={true} stream={localStream} />
        </div>

        {remoteStreams.map((stream, index) => (
          <div key={index} style={{ flex: 1, position: "relative" }}>
            <VideoPlayer isLocal={false} stream={stream} />
          </div>
        ))}
      </main>

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
        <button
          onClick={shareScreen}
          style={{
            backgroundColor: "purple",
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

        <button
          onClick={toggleMute}
          style={{
            backgroundColor: "purple",
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

        <button
          onClick={toggleVideo}
          style={{
            backgroundColor: "purple",
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

        <button
          onClick={raiseHand}
          style={{
            backgroundColor: "purple",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ✋ Raise Hand
        </button>
      </div>

      {isHandRaised && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            color: "#000",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            fontSize: "16px",
          }}
        >
          Someone is raising their hand! ✋
        </div>
      )}
    </div>
  );
};

export default LiveStream;
