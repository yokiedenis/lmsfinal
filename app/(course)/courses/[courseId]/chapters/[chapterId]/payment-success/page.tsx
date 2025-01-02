"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const PaymentSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Here you can verify the token to check if the payment was successful
    const verifyPayment = async () => {
      const token = router.query.token; // Assuming the token is passed as a query parameter
      if (token) {
        try {
          const response = await axios.post('/api/verify-payment', { token });
          if (response.data.success) {
            // Handle successful payment
            // You can update user course progress or send a confirmation
          } else {
            // Handle failed payment
            console.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Error verifying payment', error);
        }
      }
    };

    verifyPayment();
  }, [router.query.token]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {/* Display success message and any further instructions */}
    </div>
  );
};

export default PaymentSuccessPage;
