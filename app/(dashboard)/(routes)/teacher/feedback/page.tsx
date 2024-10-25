"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs"; // Import useAuth hook
import SupportQueryTable from "@/components/supportquerytable"; // Ensure this path is correct
import styles from "@/app/(dashboard)/(routes)/teacher/feedback/supportquerytable.module.css";
import { motion } from "framer-motion";

type SupportQuery = {
  id: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const FeedbackPage = () => {
  const { userId, isLoaded, isSignedIn } = useAuth(); // Use Clerk's useAuth hook
  const [data, setData] = useState<SupportQuery[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect if user is not authenticated
      window.location.href = "/";
    } else if (isLoaded && isSignedIn) {
      fetchSupportQueries();
    }
  }, [isLoaded, isSignedIn]);

  const fetchSupportQueries = async () => {
    setLoading(true); // Start loading
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/support-queries`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch support queries: " + response.statusText);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching support queries:", error);
      setErrorMessage("Failed to load support queries");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={`p-6 ${styles.container}`}>
      <h1 className="text-fuchsia-700 text-2xl font-semibold mb-4">Support Queries</h1>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.loading}
        >
          <div className={styles.spinner}></div>
        </motion.div>
      )}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-600"
        >
          {errorMessage}
        </motion.div>
      )}
      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <SupportQueryTable data={data} />
        ) : (
          <p>No support queries found.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;