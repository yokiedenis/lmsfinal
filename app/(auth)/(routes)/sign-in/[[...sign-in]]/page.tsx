import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="relative h-full w-full">
      <img
        src="/sign11.jpeg" // The image is assumed to be in the public folder.
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <div className="p-8 bg-white bg-opacity-20 rounded-lg shadow-md backdrop-blur-md">
        <h1  style={{ color: 'gold', fontWeight: 'bold' }} className="text-gold-200 font-bold text-2xl mb-4 text-center">Eduskill LMS Login</h1>
          <SignIn routing="hash" />
        </div>
      </div>
    </div>
  );
}
