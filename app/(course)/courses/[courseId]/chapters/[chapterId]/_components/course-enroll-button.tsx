// "use client";

// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axios.post(`/api/courses/${courseId}/checkout`)

//       window.location.assign(response.data.url);
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       size="sm"
//       className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//     >
//       Enroll for {formatPrice(price)}
//     </Button>
//   )
// }




// "use client";

// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       // Send the price in the request body
//       const response = await axios.post(`/api/courses/${courseId}/checkout`, { price });

//       // Redirect to the payment URL
//       window.location.assign(response.data.url);
//     } catch (error) {
//       console.error("DPO_PAY_ERROR", error);
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       size="sm"
//       className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//     >
//       Enroll for {formatPrice(price)}
//     </Button>
//   );
// };



// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";
// import toast from "react-hot-toast";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
//   serviceType: number; // New: to specify which service type (3854 or 5525)
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   serviceType
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       // Prepare the data including the service type for DPO
//       const response = await axios.post(`/api/courses/${courseId}/checkout`, { 
//         price: 0, // or whatever price
//         serviceType: 3854, 
//         serviceDate: '2023-12-31' // Example; you'd get this from user input
//       });

//       // Redirect to the payment URL returned from your server after creating the token
//       window.location.assign(response.data.url);
//     } catch (error) {
//       console.error("DPO_PAY_ERROR", error);
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       size="sm"
//       className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//     >
//       Enroll for {formatPrice(price)}
//     </Button>
//   );
// };














"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  serviceType: number;
  className?: string; // Added to fix TypeScript error
}

export const CourseEnrollButton = ({
  price,
  courseId,
  serviceType
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`, { 
        price: price,
        serviceType: serviceType, 
        serviceDate: new Date().toISOString().split('T')[0]
      });

      window.location.assign(response.data.url);
    } catch (error) {
      console.error("DPO_PAY_ERROR", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};





































































// 'use client';

// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const companyToken = "145042FD-E11A-46D5-ABB9-CB9925B58055"; // Your Company ID
//   const serviceType = "73713-Online Classes"; // Your Service Type

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       // Step 1: Create a transaction token
//       const createTokenResponse = await axios.post('/api/dpo/createToken', {
//         amount: price,
//         currency: "USD", // Adjust currency if needed
//         companyToken: companyToken,
//         serviceType: serviceType,
//         redirectUrl: `${window.location.origin}/success`, // URL to redirect after payment
//         cancelUrl: `${window.location.origin}/cancel`, // URL to redirect if payment is canceled
//       });

//       if (createTokenResponse.data.Result !== "000") {
//         throw new Error(createTokenResponse.data.ResultExplanation || "Failed to create transaction token");
//       }

//       const transactionToken = createTokenResponse.data.TransToken;

//       // Step 2: Redirect to DPO payment page
//       window.location.assign(`https://secure.3gdirectpay.com/pay.asp?ID=${transactionToken}`);
//     } catch (error) {
//       console.error("DPO_PAY_ERROR", error);
//       toast.error("Something went wrong with the payment");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       size="sm"
//       className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//     >
//       Enroll for {formatPrice(price)}
//     </Button>
//   );
// };