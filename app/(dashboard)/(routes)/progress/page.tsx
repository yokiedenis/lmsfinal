"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import { getProgress } from "@/actions/get-progress";

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  points: number;
}

export default function ProgressPage() {
  const { user } = useUser();
  const [progressData, setProgressData] = useState<{
    completionPercentage: number;
    totalChapters: number;
    completedChapters: number;
  } | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const courseId = "some-course-id";
        const progressResponse = await fetch(`/api/progress?courseId=${courseId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!progressResponse.ok) {
          throw new Error("Failed to fetch progress data");
        }

        const progressData = await progressResponse.json();
        setProgressData(progressData);

        const leaderboardResponse = await fetch("/api/leaderboard", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!leaderboardResponse.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }

        const leaderboard = await leaderboardResponse.json();
        setLeaderboardData(leaderboard);
      }
      setLoading(false);
    };

    fetchData().catch((error) => {
      console.error("[FETCH_PROGRESS]", error);
      setLoading(false);
    });
  }, [user?.id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

  if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

  const achievements = ["Top Learner", "Course Master"];

  // Mock data for additional sections (replace with API calls if needed)
  const totalCourses = 5;
  const coursesCompleted = 1;
  const hoursSpent = 112;
  const liveClassesAttended = 70;
  const quizzesPracticed = 20;
  const assignmentsDone = 10;

  const upcomingClasses = [
    { title: "Newtonian Mechanics - Class 5", subject: "Physics", date: "15th Oct, 2024", time: "12:00PM", timeLeft: "2 min left", instructor: "Rayek Ahmed" },
    { title: "Polymer - Class 3", subject: "Chemistry", date: "15th Oct, 2024", time: "12:00PM", timeLeft: "4 hr left", instructor: "Khyl Khan" },
  ];

  const courses = [
    { name: "Data science", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
    { name: "Machine Learning", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
    { name: "Augmentative Reality", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 70, status: "In progress" },
    { name: "Product Design ", chapters: "5 chapter", lectures: "30 lecture", progress: 30, score: 80, status: "In progress" },
    { name: "Product Management", chapters: "5 chapter", lectures: "30 lecture", progress: 100, score: 90, status: "Completed" },
  ];

  const assignments = [
    { title: "Advanced problem solving math", subject: "Higher math 1", type: "Problem assignment 5", dueDate: "15th Oct, 2024", dueTime: "12:00PM" },
  ];

  const pendingQuizzes = [
    { title: "Vector addition", subject: "Math", time: 15 },
    { title: "Vector division", subject: "Math", time: 15 },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      {/* Header */}
      {/* <h1 className="text-2xl font-bold text-[#1F2A44] mb-6">Home page</h1> */}

      {/* Notification Banner */}
      <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
        <p className="text-sm">
          Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
        </p>
        <button className="text-[#6B7280] hover:text-[#1F2A44]">&times;</button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Overall Performance */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#34C759"
                  strokeWidth="10"
                  strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
          </CardContent>
        </Card>

        {/* Total Enroll Courses */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#34C759"
                  strokeWidth="10"
                  strokeDasharray="283 283"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
          </CardContent>
        </Card>

        {/* Live Class Attended */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#A5B4FC"
                  strokeWidth="10"
                  strokeDasharray={`${liveClassesAttended * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}h</p>
          </CardContent>
        </Card>

        {/* Quizzes Practiced */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#FECACA"
                  strokeWidth="10"
                  strokeDasharray={`${(quizzesPracticed / 30) * 283} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}/30</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}/15</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section: Upcoming Classes and Total Courses */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upcoming Classes */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming classes</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src="/placeholder-class-image.jpg" alt="Class" className="w-12 h-12 rounded-lg" />
                    <div>
                      <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
                      <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
                      <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
                    <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
                    <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Total Courses */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="p-3 flex items-center space-x-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          course.name.startsWith("Physics") ? "bg-[#F97316]" : course.name.startsWith("Chemistry") ? "bg-[#3B82F6]" : "bg-[#22C55E]"
                        }`}>
                          {course.name.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-[#1F2A44]">{course.name}</p>
                          <p className="text-xs text-[#6B7280]">{course.chapters}, {course.lectures}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
                          <div
                            className="bg-[#34C759] h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">{course.progress}%</p>
                      </td>
                      <td className="p-3 text-sm text-[#1F2A44]">{course.score}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === "Completed" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-1 ${
                            course.status === "Completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"
                          }`}></span>
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Assignment, Pending Quizzes, and Leaderboard */}
        <div className="space-y-6">
          {/* Assignment */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Assignment</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm font-medium text-[#1F2A44]">{assignment.title}</p>
                  <p className="text-xs text-[#6B7280]">{assignment.subject} • {assignment.type}</p>
                  <p className="text-xs text-[#EF4444] mt-1">Submit before: {assignment.dueDate}, {assignment.dueTime}</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="px-4 py-1 bg-[#E5E7EB] text-[#1F2A44] text-sm rounded-lg hover:bg-[#D1D5DB] transition-colors">
                      View
                    </button>
                    <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
                      Upload
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Quizzes */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4 flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Pending quizzes</CardTitle>
              <a href="#" className="text-sm text-[#34C759] hover:underline">See all</a>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {pendingQuizzes.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1F2A44]">{quiz.title}</p>
                    <p className="text-xs text-[#6B7280]">{quiz.subject} • {quiz.time} min</p>
                  </div>
                  <button className="px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
                    Start
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Class Performance Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="p-3 text-sm font-medium text-[#6B7280]">Rank</th>
                      <th className="p-3 text-sm font-medium text-[#6B7280]">Name</th>
                      <th className="p-3 text-sm font-medium text-[#6B7280]">Level</th>
                      <th className="p-3 text-sm font-medium text-[#6B7280]">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user, index) => (
                      <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                        <td className="p-3 text-sm text-[#1F2A44] font-medium">{index + 1}</td>
                        <td className="p-3 text-sm text-[#1F2A44]">{user.name}</td>
                        <td className="p-3 text-sm text-[#1F2A44]">{user.level}</td>
                        <td className="p-3 text-sm text-[#1F2A44]">{user.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}