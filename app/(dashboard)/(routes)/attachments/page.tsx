// app/(dashboard)/(routes)/attachments/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Select } from "@/components/sort";

interface CourseAttachment {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  courseId: string;
  Course: { title: string };
}

interface ChapterAttachment {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  chapterId: string;
  Chapter: { title: string };
}

interface AttachmentsResponse {
  success: boolean;
  courseAttachments: CourseAttachment[];
  chapterAttachments: ChapterAttachment[];
}

export default function AttachmentsPage() {
  const { user } = useUser();
  const [courseAttachments, setCourseAttachments] = useState<CourseAttachment[]>([]);
  const [chapterAttachments, setChapterAttachments] = useState<ChapterAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"name" | "date" | "course">("date"); // Default sort by date

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await fetch("/api/attachments", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch attachments");
        }

        const data: AttachmentsResponse = await response.json();
        if (data.success) {
          setCourseAttachments(data.courseAttachments);
          setChapterAttachments(data.chapterAttachments);
        }
      } catch (error) {
        console.error("Error fetching attachments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttachments();
  }, []);

  // Sorting function for course attachments
  const sortCourseAttachments = (attachments: CourseAttachment[]) => {
    return [...attachments].sort((a, b) => {
      switch (sortOrder) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "course":
          return a.Course.title.localeCompare(b.Course.title);
        default:
          return 0;
      }
    });
  };

  // Sorting function for chapter attachments
  const sortChapterAttachments = (attachments: ChapterAttachment[]) => {
    return [...attachments].sort((a, b) => {
      switch (sortOrder) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "course":
          return a.Chapter.title.localeCompare(b.Chapter.title);
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F7FA]">
        <p className="text-gray-600 text-lg">Loading attachments...</p>
      </div>
    );
  }

  if (!courseAttachments.length && !chapterAttachments.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F5F7FA] text-center">
        <FileText className="w-16 h-16 text-[#34C759] mb-4" />
        <h2 className="text-2xl font-bold text-[#1F2A44]">No Attachments Available</h2>
        <p className="text-[#6B7280] mt-2">Check back later for new materials!</p>
      </div>
    );
  }

  // Define options for the Select component
  const sortOptions: { value: "name" | "date" | "course"; label: string }[] = [
    { value: "date", label: "Sort by Date" },
    { value: "name", label: "Sort by Name" },
    { value: "course", label: "Sort by Course/Chapter" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      {/* <h1 className="text-3xl font-bold text-[#1F2A44] mb-8 flex items-center">
        <FileText className="w-8 h-8 mr-2 text-[#34C759]" />
        Attachments Library
      </h1> */}

      {/* Sorting Control */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 flex items-center justify-between transition-all duration-300 hover:shadow-xl">
          <label htmlFor="sort-attachments" className="text-sm font-medium text-[#1F2A44] mr-4">
            Sort by
          </label>
          <Select
            value={sortOrder}
            onChange={setSortOrder}
            options={sortOptions}
            id="sort-attachments"
            name="sort-attachments"
            onBlur={() => {}}
          />
        </div>
      </div>

      {/* Course Attachments Section */}
      {courseAttachments.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1F2A44] mb-4">Course Attachments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortCourseAttachments(courseAttachments).map((attachment) => (
              <Card
                key={attachment.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#E5E7EB]"
              >
                <CardHeader className="p-4 bg-gradient-to-r from-[#34C759]/10 to-[#E5E7EB] text-[#1F2A44]">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#34C759]" />
                    {attachment.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-[#6B7280] text-sm mb-2">
                    Course: {attachment.Course.title}
                  </p>
                  <p className="text-xs text-[#6B7280] mb-4">
                    Uploaded: {new Date(attachment.createdAt).toLocaleDateString()}
                  </p>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#34C759] text-white rounded-lg hover:bg-[#2ea44f] transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Chapter Attachments Section */}
      {chapterAttachments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-[#1F2A44] mb-4">Chapter Attachments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortChapterAttachments(chapterAttachments).map((attachment) => (
              <Card
                key={attachment.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#E5E7EB]"
              >
                <CardHeader className="p-4 bg-gradient-to-r from-[#3B82F6]/10 to-[#E5E7EB] text-[#1F2A44]">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#3B82F6]" />
                    {attachment.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-[#6B7280] text-sm mb-2">
                    Chapter: {attachment.Chapter.title}
                  </p>
                  <p className="text-xs text-[#6B7280] mb-4">
                    Uploaded: {new Date(attachment.createdAt).toLocaleDateString()}
                  </p>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}