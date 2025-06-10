import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, File, Download } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banner } from "@/components/banner";

const LiveSessionMaterialsPage = async ({
  params,
}: {
  params: { courseId: string; liveSessionId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Check if the user has purchased the course
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  if (!purchase) {
    return redirect("/search");
  }

  // Fetch live session with attachments
  const liveSession = await db.liveSession.findUnique({
    where: {
      id: params.liveSessionId,
      courseId: params.courseId,
      isPublished: true,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!liveSession) {
    return redirect(`/live-session/${params.courseId}`);
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="w-full">
            <Link
              href={`/live-session/${params.courseId}`}
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to live sessions
            </Link>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Materials for {liveSession.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Download study materials and assignments for this live session.
              </p>
            </div>
          </div>
        </div>

        {liveSession.attachments.length === 0 ? (
          <Banner
            variant="success"
            label="No materials are currently available for this live session."
          />
        ) : (
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Study Materials & Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveSession.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-x-3">
                      <File className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {attachment.name}
                      </span>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    >
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LiveSessionMaterialsPage;