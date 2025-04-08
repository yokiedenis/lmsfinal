"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion"; // For animations

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  const courseId = searchParams.get("courseId");
  const chapterId = searchParams.get("chapterId");
  const token = searchParams.get("token");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 mx-auto text-white" />
            </motion.div>
            <CardTitle className="mt-4 text-3xl font-bold">Payment Successful!</CardTitle>
            <CardDescription className="text-white/80">
              Your transaction has been completed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Transaction ID:</p>
              <p className="text-lg font-semibold text-gray-800">{token}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Course ID:</p>
              <p className="text-lg font-semibold text-gray-800">{courseId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Chapter ID:</p>
              <p className="text-lg font-semibold text-gray-800">{chapterId}</p>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => window.location.href = `/course/${courseId}/chapters/${chapterId}`}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Continue to Course
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}