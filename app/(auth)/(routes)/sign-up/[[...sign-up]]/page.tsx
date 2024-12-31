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
    <div className="relative h-screen w-full">
      {/* Background Carousel */}
      <div className="absolute inset-0 h-full w-full">
        <div className="h-full w-full relative">
          <div className="absolute w-full h-full z-0">
            <div className="carousel-container">
              {/* Add a few images to the carousel */}
              <div className="carousel-slide">
                <img
                  src="/pure4.jpg" // Image 1
                  alt="Carousel Image 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="carousel-slide">
                <img
                  src="/pure2.jpg" // Image 2
                  alt="Carousel Image 2"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="carousel-slide">
                <img
                  src="/pure4.jpg" // Image 3
                  alt="Carousel Image 3"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="carousel-slide">
                <img
                  src="/pure1.jpg" // Image 4
                  alt="Carousel Image 4"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for form */}
      <div className="absolute inset-0 z-10 flex justify-end items-center">
        <SignUp />
      </div>

      {/* Carousel Styling */}
      <style jsx>{`
        .carousel-container {
          display: flex;
          width: 100%; /* Ensure the total width is the same as the container */
          height: 100%;
          position: relative;
          animation: carouselAnimation 12s infinite; /* Adjusted for 12 seconds total, for 4 images with 3 seconds each */
        }

        .carousel-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0; /* Hide all images initially */
          transition: opacity 1s ease-in-out;
        }

        .carousel-slide:nth-child(1) {
          animation: showImage 12s infinite 0s; /* First image shows for 3 seconds */
        }
        
        .carousel-slide:nth-child(2) {
          animation: showImage 12s infinite 3s; /* Second image shows for 3 seconds */
        }

        .carousel-slide:nth-child(3) {
          animation: showImage 12s infinite 6s; /* Third image shows for 3 seconds */
        }

        .carousel-slide:nth-child(4) {
          animation: showImage 12s infinite 9s; /* Fourth image shows for 3 seconds */
        }

        @keyframes showImage {
          0%, 100% {
            opacity: 0; /* Hide image at the start and end of the cycle */
          }
          25%, 75% {
            opacity: 1; /* Show image during the middle of its cycle */
          }
        }
      `}</style>
    </div>
  );
}




// "use client";

// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/firebase';

// export default function SignUpPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('Account created successfully!');
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="relative h-screen w-full">
//       <div className="absolute inset-0 h-full w-full">
//         {/* Background Carousel */}
//         {/* Add your carousel code here */}
//       </div>

//       <div className="absolute inset-0 z-10 flex justify-center items-center">
//         <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
//           <h1 className="text-xl font-bold mb-4">Sign Up</h1>
//           {error && <p className="text-red-500">{error}</p>}
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="block w-full p-2 mb-4 border rounded"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="block w-full p-2 mb-4 border rounded"
//             required
//           />
//           <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
