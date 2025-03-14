// app/(dashboard)/(routes)/recordings/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Select } from "@/components/sort";

interface Recording {
  id: string;
  title: string;
  description?: string;
  url: string;
  uploadedAt: Date;
  courseId: string | null; // Updated to allow null
}

export default function RecordingsPage() {
  const { user } = useUser();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"title" | "date" | "course">("date"); // Default sort by date

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch("/api/recordings", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recordings");
        }

        const data = await response.json();
        setRecordings(data);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);

  // Sorting function for recordings
  const sortRecordings = (recordings: Recording[]) => {
    return [...recordings].sort((a, b) => {
      switch (sortOrder) {
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case "course":
          // Handle null or undefined courseId by using an empty string as default
          const courseIdA = a.courseId || "";
          const courseIdB = b.courseId || "";
          return courseIdA.localeCompare(courseIdB);
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F7FA]">
        <p className="text-gray-600 text-lg">Loading recordings...</p>
      </div>
    );
  }

  if (!recordings.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F5F7FA] text-center">
        <Video className="w-16 h-16 text-[#34C759] mb-4" />
        <h2 className="text-2xl font-bold text-[#1F2A44]">No Recordings Available</h2>
        <p className="text-[#6B7280] mt-2">Check back later for new recordings!</p>
      </div>
    );
  }

  // Define options for the Select component
  const sortOptions: { value: "title" | "date" | "course"; label: string }[] = [
    { value: "date", label: "Sort by Date" },
    { value: "title", label: "Sort by Title" },
    { value: "course", label: "Sort by Course" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      {/* <h1 className="text-3xl font-bold text-[#1F2A44] mb-8 flex items-center">
        <Video className="w-8 h-8 mr-2 text-[#34C759]" />
        Recordings Library
      </h1> */}

      {/* Sorting Control */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 flex items-center justify-between transition-all duration-300 hover:shadow-xl">
          <label htmlFor="sort-recordings" className="text-sm font-medium text-[#1F2A44] mr-4">
            Sort by
          </label>
          <Select
            value={sortOrder}
            onChange={setSortOrder}
            options={sortOptions}
            id="sort-recordings"
            name="sort-recordings"
            onBlur={() => {}}
          />
        </div>
      </div>

      {/* Recordings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortRecordings(recordings).map((recording) => (
          <Card
            key={recording.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#E5E7EB]"
          >
            <CardHeader className="p-4 bg-gradient-to-r from-[#34C759]/10 to-[#E5E7EB] text-[#1F2A44]">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Video className="w-5 h-5 mr-2 text-[#34C759]" />
                {recording.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-[#6B7280] text-sm mb-4">
                {recording.description || "No description available"}
              </p>
              <p className="text-xs text-[#6B7280] mb-2">
                Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
              </p>
              <a
                href={recording.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#34C759] text-white rounded-lg hover:bg-[#2ea44f] transition-colors"
              >
                <Video className="w-4 h-4 mr-2" />
                Watch Now
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}