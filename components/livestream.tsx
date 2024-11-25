"use client";
import React, { useRef, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc, onSnapshot, DocumentData } from "firebase/firestore";
import VideoPlayer from "./videoplayer";
import ChatLive from "./chatlive"; // Import your chat component

// Define the participant type explicitly
type Participant = {
  name: string;
  id: string;
};

const LiveStream: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]); // Store remote streams for all participants
  const [participants, setParticipants] = useState<Participant[]>([]); // Store participant names and IDs
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // State to toggle chat visibility

  // Listen for participant updates from Firestore
  useEffect(() => {
    const participantsRef = collection(db, "participants");

    const unsubscribe = onSnapshot(participantsRef, (snapshot) => {
      const participantList: Participant[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // or any unique identifier for participants
          name: data.name, // Assuming each document has a 'name' field
        };
      });
      setParticipants(participantList); // Now correctly typed
    });

    return () => unsubscribe();
  }, []);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);

      const pc = new RTCPeerConnection();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const callDoc = doc(collection(db, "calls"));
      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, async (snapshot) => {
        const data = snapshot.data();
        if (data?.answers) {
          // Handle multiple participants
          data.answers.forEach(async (answer: RTCSessionDescriptionInit) => {
            const remoteDesc = new RTCSessionDescription(answer);
            await pc.setRemoteDescription(remoteDesc);
          });
        }
      });

      pc.ontrack = (event) => {
        // Add new participant's stream to state
        setRemoteStreams((prevStreams) => [...prevStreams, event.streams[0]]);
      };
    } catch (error) {
      console.error("Error starting stream:", error);
    }
  };

  const toggleFullScreen = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      setLocalStream(screenStream);

      const pc = new RTCPeerConnection();
      screenStream.getTracks().forEach((track) => pc.addTrack(track, screenStream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const callDoc = doc(collection(db, "calls"));
      await setDoc(callDoc, { offer });

      pc.ontrack = (event) => {
        setRemoteStreams((prevStreams) => [...prevStreams, event.streams[0]]);
      };
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };

  const toggleWhiteboard = () => {
    setIsWhiteboardOpen((prev) => !prev);
  };

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev); // Toggle chat visibility
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#202124",
        color: "#fff",
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
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
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
          <button
            onClick={() => toggleFullScreen(localVideoRef)}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              backgroundColor: "#1a73e8",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Full Screen
          </button>
        </div>

        {/* Remote Streams */}
        {remoteStreams.map((stream, index) => (
          <div key={index} style={{ flex: 1, position: "relative" }}>
            <VideoPlayer isLocal={false} stream={stream} />
            <button
              onClick={() => toggleFullScreen({ current: null })}
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "#1a73e8",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Full Screen
            </button>
          </div>
        ))}
      </main>

      {/* Participant List */}
      <section
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "purple",
          color: "#fff",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>Participants</h4>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {participants.map((participant, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {participant.name}
            </li>
          ))}
        </ul>
      </section>

      <footer
        style={{
          padding: "10px 20px",
          backgroundColor: "#1c1c1e",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={startStreaming}
          style={{
            padding: "10px 20px",
            backgroundColor: "#34a853",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Start Streaming
        </button>
        <button
          onClick={startScreenShare}
          style={{
            padding: "10px 20px",
            backgroundColor: "#fbbc05",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Share Screen
        </button>
        <button
          onClick={toggleWhiteboard}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {isWhiteboardOpen ? "Close Whiteboard" : "Open Whiteboard"}
        </button>
        {/* Button for toggling chat visibility */}
        <button
          onClick={toggleChat}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          💬
        </button>
        {/* Conditionally render chat component */}
        {isChatVisible && <ChatLive />}
      </footer>
    </div>
  );
};

export default LiveStream;
