"use client";

import React, { useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Background Carousel */}
      <div className="absolute inset-0 h-full w-full">
        <div className="h-full w-full relative">
          <div className="absolute w-full h-full z-0">
            <div className="carousel-container">
              <div className="carousel-slide">
                <img
                  src="/pppp.jpg"
                  alt="Carousel Image 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="carousel-slide">
                <img
                  src="/ppp.jpg"
                  alt="Carousel Image 2"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="carousel-slide">
                <img
                  src="/ccc.jpg"
                  alt="Carousel Image 3"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="carousel-slide">
                <img
                  src="/ppp.jpg"
                  alt="Carousel Image 4"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Overlay */}
      {showMessage && (
        <div className="absolute top-10 left-10 z-20 bg-blue-500 text-white p-4 rounded shadow-lg">
          <p className="text-lg font-bold">
            To Sign Up You Must Be 18 and Above
          </p>
        </div>
      )}

      {/* Overlay for form */}
      <div className="absolute inset-0 z-10 flex justify-end items-center">
      <SignIn 
           routing="hash" 
           appearance={{
           elements: {
           headerTitle: {
        // This might not work directly due to Clerk's internal handling
        // But let's try to set the text content
           textContent: 'Sign-In '
          }
          }
             }} 
                  />
      </div>

      {/* Logo at the Bottom */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20">
       <img
            src="/lgg.png"
            alt="Logo"
            className="h-12 w-auto"
           />
               </div>

      {/* Carousel Styling */}
      <style jsx>{`
        .carousel-container {
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          animation: carouselAnimation 12s infinite;
        }

        .carousel-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .carousel-slide:nth-child(1) {
          animation: showImage 12s infinite 0s;
        }

        .carousel-slide:nth-child(2) {
          animation: showImage 12s infinite 3s;
        }

        .carousel-slide:nth-child(3) {
          animation: showImage 12s infinite 6s;
        }

        .carousel-slide:nth-child(4) {
          animation: showImage 12s infinite 9s;
        }

        @keyframes showImage {
          0%,
          100% {
            opacity: 0;
          }
          25%,
          75% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SignInPage;
