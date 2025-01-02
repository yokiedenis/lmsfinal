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




"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      // Send the price in the request body
      const response = await axios.post(`/api/courses/${courseId}/checkout`, { price });

      // Redirect to the payment URL
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