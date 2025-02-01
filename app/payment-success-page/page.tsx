"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const courseId = searchParams.get("courseId");
  const chapterId = searchParams.get("chapterId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
        <p className="text-lg text-gray-700 mt-2">
          Your transaction was successful. You can now access your course.
        </p>

        {courseId && chapterId && (
          <button
            onClick={() => router.push(`/course/${courseId}/chapter/${chapterId}`)}
            className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Go to Course
          </button>
        )}
      </div>
    </div>
  );
}
