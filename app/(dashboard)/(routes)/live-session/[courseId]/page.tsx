import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Video, Calendar, Clock, FileText } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LiveSessionPage = async ({
  params,
}: {
  params: { courseId: string };
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

  // Fetch live sessions for the course with attachments
  const liveSessions = await db.liveSession.findMany({
    where: {
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
    orderBy: {
      position: "asc", // Order by position instead of startTime to respect session ordering
    },
  });

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
              href="/search"
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to courses
            </Link>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Live Sessions for {course.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Join upcoming live classes or access related materials.
              </p>
            </div>
          </div>
        </div>

        {liveSessions.length === 0 ? (
          <Banner
            variant="success"
            label="No live sessions are currently scheduled for this course."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveSessions.map((session) => (
              <Card
                key={session.id}
                className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
              >
                <CardHeader className="bg-indigo-100 dark:bg-indigo-900">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-x-2">
                    <Video className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    {session.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(session.startTime).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(session.startTime).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {session.description || "No description available."}
                    </p>
                    <div className="flex justify-between items-center">
                      <Button
                        asChild
                        variant="default"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                        disabled={!session.meetingUrl}
                      >
                        <a
                          href={session.meetingUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Live Session
                        </a>
                      </Button>
                      {session.attachments.length > 0 && (
                        <Button
                          asChild
                          variant="outline"
                          className="text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        >
                          <Link
                            href={`/live-session/${params.courseId}/${session.id}/materials`}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Materials
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessionPage;