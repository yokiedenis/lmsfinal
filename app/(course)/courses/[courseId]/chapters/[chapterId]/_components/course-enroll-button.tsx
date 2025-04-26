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












// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";
// import toast from "react-hot-toast";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
//   chapterId: string; // Added chapterId to props
//   serviceType: number;
//   className?: string; // Added to fix TypeScript error
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   chapterId,
//   serviceType
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, { 
//         price: price,
//         serviceType: serviceType, 
//         serviceDate: new Date().toISOString().split('T')[0]
//       });

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
//       Unlock Full Certified Course {formatPrice(price)}
//     </Button>
//   );
// };




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








// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";
// import toast from "react-hot-toast";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
//   serviceType: number;
//   className?: string; // Added to fix TypeScript error
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

//       const response = await axios.post(`/api/courses/${courseId}/checkout`, { 
//         price: price,
//         serviceType: serviceType, 
//         serviceDate: new Date().toISOString().split('T')[0]
//       });

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
//       Unlock Full Certified Course {formatPrice(price)}
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
//       Unlock Full Certified Course {formatPrice(price)}
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
//   serviceType: number;
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

//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, { 
//         price: price, // Send the actual price here
//         serviceType: serviceType, // Use the prop value
//         serviceDate: new Date().toISOString().split('T')[0] // Current date
//       });

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
//       Unlock Full Certified Course {formatPrice(price)}
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
//   chapterId: string; // Added chapterId to props
//   serviceType: number;
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   chapterId, // Destructure chapterId
//   serviceType,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axios.post(
//         `/api/courses/${courseId}/chapters/${chapterId}/checkout`,
//         {
//           price,
//           serviceType,
//           serviceDate: new Date().toISOString().split("T")[0], // Current date
//         }
//       );

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
//       Unlock Full Certified Course {formatPrice(price)}
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
//   chapterId: string;
//   serviceType: number; // New: to specify which service type (3854 or 5525)
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   chapterId,
//   serviceType
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       // Prepare the data including the service type for DPO
//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, { 
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
//       Unlock Full Certified Course {formatPrice(price)}
//     </Button>
//   );
// };







"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  chapterId: string;
  serviceType: number;
}

export const CourseEnrollButton = ({
  price,
  courseId,
  chapterId,
  serviceType,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      console.log("Enrolling for courseId:", courseId, "Price:", price);

      if (!courseId) {
        throw new Error("Course ID is missing");
      }
      if (typeof price !== 'number' || price < 0) {
        throw new Error("Invalid price");
      }

      if (price > 0) {
        const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, {
          price,
          serviceType,
          serviceDate: new Date().toISOString().split('T')[0],
        });
        window.location.assign(response.data.url);
      } else {
        await axios.post(`/api/courses/${courseId}/enroll`, {});
        toast.success("You've successfully enrolled in this course");
        router.refresh();
      }
    } catch (error: unknown) {
      console.error('Enrollment error:', error);
      return new Response("Internal Error", { status: 500 });
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
      {price > 0 ? `Unlock Full Certified Course ${formatPrice(price)}` : "Enroll a Full Certified Course for Free"}
    </Button>
  );
};
















// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";
// import toast from "react-hot-toast";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
//   serviceType: number;
//   className?: string; // Added to fix TypeScript error
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

//       const response = await axios.post(`/api/courses/${courseId}/checkout`, { 
//         price: price,
//         serviceType: serviceType, 
//         serviceDate: new Date().toISOString().split('T')[0]
//       });

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
//       Unlock Full Certified Course {formatPrice(price)}
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
//   chapterId: string; // Add chapterId to the interface
//   serviceType: number;
//   className?: string; // Added to fix TypeScript error
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   chapterId, // Destructure chapterId
//   serviceType,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, {
//         price: price,
//         serviceType: serviceType,
//         serviceDate: new Date().toISOString().split("T")[0],
//         chapterId: chapterId, // Include chapterId in the request payload
//       });

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
//       Unlock Full Certified Course {formatPrice(price)}
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
//   chapterId: string;
//   serviceType: number;
//   className?: string;
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   chapterId,
//   serviceType,
//   className,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       console.log('Sending request with:', { price, courseId, chapterId, serviceType }); // Debug log

//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, {
//         price: price,
//         serviceType: serviceType,
//         serviceDate: new Date().toISOString().split("T")[0],
//         chapterId: chapterId, // Ensure chapterId is included in the payload
//       });

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
//       className={`w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed ${className}`}
//     >
//       Unlock Full Certified Course {formatPrice(price)}
//     </Button>
//   );
// };





// "use client";

// import axios, { AxiosError } from "axios";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/format";
// import toast from "react-hot-toast";
// import { useUser } from "@clerk/nextjs";

// interface CourseEnrollButtonProps {
//   price: number;
//   courseId: string;
//   chapterId: string;
//   serviceType: number;
//   className?: string;
// }

// export const CourseEnrollButton = ({
//   price,
//   courseId,
//   chapterId,
//   serviceType,
//   className,
// }: CourseEnrollButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { user, isLoaded, isSignedIn } = useUser();

//   useEffect(() => {
//     if (!isLoaded) {
//       console.log("Waiting for user data to load...");
//     } else if (isLoaded && !isSignedIn) {
//       console.log("User is not signed in.");
//     } else if (user) {
//       console.log("User data loaded:", user);
//     }
//   }, [isLoaded, isSignedIn, user]);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       if (!isLoaded) {
//         toast.error("Loading user data, please wait...");
//         return;
//       }

//       if (!isSignedIn || !user) {
//         toast.error("You must be logged in to enroll in a course");
//         return;
//       }

//       console.log("Current user object before extraction:", user);

//       let userId = user.id;

//       if (!userId) {
//         console.error("User ID is undefined. User object:", user);
//         throw new Error("Unable to retrieve user ID. Please check your Clerk configuration.");
//       }

//       console.log('Sending request with:', { price, courseId, chapterId, serviceType, userId });

//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/checkout`, {
//         price,
//         serviceType,
//         serviceDate: new Date().toISOString().split("T")[0],
//         chapterId,
//         userId,
//       });

//       console.log("Checkout response:", response.data);
//       window.location.assign(response.data.url);
//     } catch (error) {
//       let errorMessage = "Something went wrong";
//       if (error instanceof AxiosError) {
//         errorMessage = error.response?.data?.message || error.message || "Network error";
//         console.error("Axios Error:", error);
//       } else if (error instanceof Error) {
//         errorMessage = error.message;
//         console.error("Error:", error);
//       } else {
//         console.error("Unknown Error:", error);
//       }

//       if (errorMessage.includes("Unable to retrieve user ID")) {
//         toast.error("Authentication error. Please log in and try again.");
//       } else {
//         toast.error(errorMessage);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading || !isLoaded || !isSignedIn}
//       size="sm"
//       className={`w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed ${className}`}
//     >
//       Unlock Full Certified Course {formatPrice(price)}
//     </Button>
//   );
// };






































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