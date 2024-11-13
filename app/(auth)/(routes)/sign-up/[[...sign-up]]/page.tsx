import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';

export default function Page() {
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUp) {
      console.error('SignUp is not available');
      return;
    }

    try {
      // Create the user in Clerk
      const signUpResponse = await signUp.create({
        emailAddress: e.currentTarget.email.value,
        // Add other user fields here if needed
      });

      // Extract the email from the response
      const email = signUpResponse.emailAddress;

      // Call the API to create the user in your database
      const response = await fetch('/api/auth/createUser ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('User  created:', user);
        // Optionally redirect or perform other actions
        router.push('/welcome'); // Redirect to a welcome page or dashboard
      } else {
        console.error('Failed to create user in database');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="relative h-full w-full">
      <img
        src="/sign11.jpeg" // The image is assumed to be in the public folder.
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <div className="p-8 bg-white bg-opacity-20 rounded-lg shadow-md backdrop-blur-md">
          <h1 style={{ color: 'gold', fontWeight: 'bold' }} className="text-gold-200 font-bold text-2xl mb-4 text-center">
            Eduskill LMS SignUp
          </h1>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mb-4 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Sign Up
            </button>
          </form>
          {!isLoaded && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}