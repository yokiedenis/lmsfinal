"use client";

import { Layout, Compass, List, BarChart, Users, CircleHelp, MessageCircle, Trophy, Video } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { isTeacher } from "@/lib/teacher";  // Assuming roles.js or similar file
import { isSuperAdmin } from "@/lib/isSuperAdmin";

const studentRoutes = [
    { icon: Layout, label: "Dashboard", href: "/" },
    { icon: Compass, label: "Browse", href: "/search" },
    { icon: CircleHelp, label: "Student Helper", href: "/help" },
    { icon: BarChart, label: "Student Analytics", href: "/analytics" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: Video, label: "Class Live Stream", href: "/livestream" },
];

const teacherRoutes = [
    { icon: List, label: "Courses", href: "/teacher/courses" },
    { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
    { icon: MessageCircle, label: "Student Feedback", href: "/teacher/feedback" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: Video, label: "Class Live Stream", href: "/livestream" },
];

const superAdminRoutes = [
    ...teacherRoutes,
    { icon: Users, label: "Manage Users", href: "/teacher/users" },
    // { icon: Trophy, label: "Student Leaderboard", href: "/leaderboard" },
];

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const { user } = useUser();

    // Determine user role
    const userId = user?.id;
    const isSuperAdminUser = userId && isSuperAdmin(userId);
    const isTeacherUser = userId && isTeacher(userId);

    // Determine which routes to show based on user role
    let routes = studentRoutes;
    if (isSuperAdminUser) {
        routes = superAdminRoutes;
    } else if (isTeacherUser) {
        routes = teacherRoutes;
    }

    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};
