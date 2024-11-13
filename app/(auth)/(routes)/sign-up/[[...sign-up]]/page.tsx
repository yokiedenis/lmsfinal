"use client";
import { SignUp, useSignUp } from '@clerk/nextjs'
import { useEffect } from 'react';

export default function Page() {
  const  isSignedUp  = useSignUp();

  useEffect(() => {
    if (isSignedUp) {
      fetch('/api/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are sent with the request

      });
    }
  }, [isSignedUp]);



  return (
    <div className="relative h-full w-full">
      <img
        src="/sign11.jpeg" // The image is assumed to be in the public folder.
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <div className="p-8 bg-white bg-opacity-20 rounded-lg shadow-md backdrop-blur-md">
        <h1  style={{ color: 'gold', fontWeight: 'bold' }} className="text-gold-200 font-bold text-2xl mb-4 text-center">Eduskill LMS SignUp</h1>
        <SignUp />
        </div>
      </div>
    </div>
  );
}
