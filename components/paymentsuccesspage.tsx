// components/PaymentSuccessPage.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Define the props explicitly
interface PaymentSuccessPageProps {
  courseId: string;
  chapterId: string;
}

const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ courseId, chapterId }) => {
  const router = useRouter();

  useEffect(() => {
    // Here you could fetch or handle any additional logic for showing success
  }, []);

  const handleBack = () => {
    router.push(`/courses/${courseId}/chapters/${chapterId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 mb-4">Thank you for your purchase!</p>
      <button onClick={handleBack} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Back to Course
      </button>
    </div>
  );
};

export default PaymentSuccessPage;