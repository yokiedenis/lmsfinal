import { db } from "@/lib/db";
import { Course, Purchase, Profile, UserProgress } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

type UserDetails = {
  name: string;
  imageUrl: string;
  coursesEnrolled: number;
  lastLogin: Date;
  dateOfEnrollment: Date;
  studentLevel: number;
  certificatesEarned: number;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
      }
    });

    const users = await db.user.findMany({
      include: {
        profile: true,
        purchases: true,
        userProgress: true,
      }
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;
    const totalUsers = users.length;

    const userDetails: UserDetails[] = users.map(user => ({
      name: user.name,
      imageUrl: user.profile?.imageUrl || '',
      coursesEnrolled: user.purchases.length,
      lastLogin: user.profile?.updatedAt || new Date(),
      dateOfEnrollment: user.profile?.createdAt || new Date(),
      studentLevel: user.userProgress[0]?.level || 1,
      certificatesEarned: user.profile?.certificatesEarned || 0,
    }));

    return {
      data,
      totalRevenue,
      totalSales,
      totalUsers,
      userDetails,
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      totalUsers: 0,
      userDetails: [],
    }
  }
}