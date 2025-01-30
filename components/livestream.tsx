"use client";
import React, { useEffect } from "react";
import { gapi } from "gapi-script"; // Import Google API library

const CLIENT_ID = "915771341470-ono7qnq54btjm3magu3l7g2k47omtb54.apps.googleusercontent.com"; // Replace with your Google API client ID
const API_KEY = "AIzaSyBgoomZM9dSdLq77IWHVhC9fUMer8X1QQo"; // Replace with your Google API key
const SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly";

const LiveStream: React.FC = () => {
  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== "undefined") {
      const initializeGoogleAPI = () => {
        gapi.load("client:auth2", () => {
          gapi.client
            .init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest",
              ],
              scope: SCOPES,
              redirectUri: "http://localhost:3000/oauth2callback", // Ensure this matches

            })
            .then(() => {
              const authInstance = gapi.auth2.getAuthInstance();
              if (!authInstance.isSignedIn.get()) {
                handleSignIn();
              } else {
                redirectToGoogleClassroom();
              }
            });
        });
      };

      const handleSignIn = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signIn().then(() => {
          redirectToGoogleClassroom();
        });
      };

      const redirectToGoogleClassroom = () => {
        window.location.href = "https://classroom.google.com/"; // Redirect to Google Classroom
      };

      initializeGoogleAPI();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#202124",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Redirecting to Google Classroom...</h2>
    </div>
  );
};

export default LiveStream;