"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const chapterId = searchParams.get("chapterId");

  // Trigger confetti animation on mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4CAF50", "#2196F3", "#FF9800"],
    });
  }, []);

  const handleContinue = () => {
    if (courseId && chapterId) {
      router.push(`/courses/${courseId}/chapters/${chapterId}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-105">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-white mb-6">
          Congratulations! You’ve successfully unlocked your course. Start learning now and take the next step in your educational journey!
        </p>
        {courseId && chapterId ? (
          <div className="mb-6">
            <p className="text-white font-semibold">Course Access Granted</p>
            <p className="text-white">You can now access all chapters and resources.</p>
          </div>
        ) : (
          <p className="text-white mb-6">Redirecting to your dashboard...</p>
        )}
        <Button
          onClick={handleContinue}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Continue to Course
        </Button>
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}