"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const token = searchParams.get('token');
      const courseId = searchParams.get('courseId');
      const chapterId = searchParams.get('chapterId');

      if (token) {
        try {
          const response = await axios.post('/api/verify-payment', { token });
          if (response.data.success) {
            console.log('Payment verification successful');
            // Here you can update user course progress or send a confirmation
          } else {
            console.error('Payment verification failed');
            // Handle failed payment
          }
        } catch (error) {
          console.error('Error verifying payment', error);
        }
      } else {
        console.error('No token found in URL');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {/* Display success message and any further instructions */}
    </div>
  );
};

export default PaymentSuccessPage;