// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course;
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//   }[];
//   timeSpent: number; // In seconds
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};
  
//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += purchase.transaction?.amount || 0; 
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string) => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId
//         }
//       },
//       include: {
//         course: true,
//         transaction: true 
//       }
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true,
//             transaction: true
//           }
//         },
//         userProgress: true,
//       }
//     });

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;

//     const userDetails: UserDetails[] = await Promise.all(users.map(async (user) => {
//       // Calculate time spent from login to logout events
//       const userLogs = await db.logging.findMany({
//         where: {
//           userId: user.id,
//           url: { in: ["/login", "/logout"] } // Assuming login and logout are logged this way
//         },
//         orderBy: { createdAt: 'asc' }
//       });

//       let totalTimeSpent = 0;
//       let lastLogin: Date | null = null;

//       for (let i = 0; i < userLogs.length; i++) {
//         if (userLogs[i].url === "/login") {
//           lastLogin = userLogs[i].createdAt;
//         } else if (lastLogin && userLogs[i].url === "/logout") {
//           totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000; // Convert milliseconds to seconds
//           lastLogin = null; // Reset for next login
//         }
//       }

//       return {
//         name: user.name,
//         imageUrl: user.profile?.imageUrl || '',
//         coursesEnrolled: user.purchases.length,
//         lastLogin: user.profile?.updatedAt || new Date(),
//         dateOfEnrollment: user.profile?.createdAt || new Date(),
//         studentLevel: user.userProgress[0]?.level || 1,
//         certificatesEarned: user.profile?.certificatesEarned || 0,
//         enrolledCourses: user.purchases.map(purchase => ({
//           courseTitle: purchase.course.title,
//           amountPaid: purchase.transaction?.amount || 0
//         })),
//         timeSpent: totalTimeSpent
//       };
//     }));

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses, // New field added
//       userDetails,
//     }
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0, // Default value in case of error
//       userDetails: [],
//     }
//   }
// }





import { db } from "@/lib/db";
import { Course, Purchase, Profile, UserProgress, Transaction, Logging } from "@prisma/client";

type PurchaseWithCourseAndTransaction = Purchase & {
  course: Course;
  transaction: Transaction | null;
};

type UserDetails = {
  name: string;
  imageUrl: string;
  coursesEnrolled: number;
  lastLogin: Date;
  dateOfEnrollment: Date;
  studentLevel: number;
  certificatesEarned: number;
  enrolledCourses: {
    courseTitle: string;
    amountPaid: number;
  }[];
  timeSpent: number; // In seconds
};

// Define the return type for getAnalytics
type AnalyticsData = {
  data: { name: string; total: number }[];
  totalRevenue: number;
  totalSales: number;
  totalUsers: number;
  totalEnrolledCourses: number; // Add the new field to the type
  userDetails: UserDetails[];
};

const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.transaction?.amount || 0; 
  });

  return grouped;
};

// Explicitly type the return value of the function
export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
        transaction: true 
      }
    });

    const users = await db.user.findMany({
      include: {
        profile: true,
        purchases: {
          include: {
            course: true,
            transaction: true
          }
        },
        userProgress: true,
      }
    });

    const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;
    const totalUsers = users.length;

    // Calculate total enrolled courses (unique courseIds from purchases)
    const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
    const totalEnrolledCourses = uniqueCourseIds.size;

    const userDetails: UserDetails[] = await Promise.all(users.map(async (user) => {
      const userLogs = await db.logging.findMany({
        where: {
          userId: user.id,
          url: { in: ["/login", "/logout"] }
        },
        orderBy: { createdAt: 'asc' }
      });

      let totalTimeSpent = 0;
      let lastLogin: Date | null = null;

      for (let i = 0; i < userLogs.length; i++) {
        if (userLogs[i].url === "/login") {
          lastLogin = userLogs[i].createdAt;
        } else if (lastLogin && userLogs[i].url === "/logout") {
          totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
          lastLogin = null;
        }
      }

      return {
        name: user.name,
        imageUrl: user.profile?.imageUrl || '',
        coursesEnrolled: user.purchases.length,
        lastLogin: user.profile?.updatedAt || new Date(),
        dateOfEnrollment: user.profile?.createdAt || new Date(),
        studentLevel: user.userProgress[0]?.level || 1,
        certificatesEarned: user.profile?.certificatesEarned || 0,
        enrolledCourses: user.purchases.map(purchase => ({
          courseTitle: purchase.course.title,
          amountPaid: purchase.transaction?.amount || 0
        })),
        timeSpent: totalTimeSpent
      };
    }));

    return {
      data,
      totalRevenue,
      totalSales,
      totalUsers,
      totalEnrolledCourses, // Now properly declared and initialized
      userDetails,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      totalUsers: 0,
      totalEnrolledCourses: 0, // Default value in case of error
      userDetails: [],
    };
  }
};






























// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Chapter } from "@prisma/client";

// // Define types to closely match the data structure from your Prisma schema
// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course & {
//     chapters: Chapter[];
//   };
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//     progress: number;
//     thumbnail: string;
//   }[];
//   totalSpent: number;
// };

// // Function to group purchases by course
// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};
  
//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += purchase.transaction?.amount || 0; // Use transaction amount or 0 if not available
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string) => {
//   try {
//     // Query purchases including course and transaction details
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId
//         }
//       },
//       include: {
//         course: {
//           include: {
//             chapters: true
//           }
//         },
//         transaction: true
//       }
//     });

//     // Query users with their related data
//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true,
//             transaction: true
//           }
//         },
//         userProgress: {
//           include: {
//             chapter: true
//           }
//         }
//       }
//     });

//     // Group earnings by course
//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     // Calculate totals
//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;

//     // Generate user details
//     const userDetails: UserDetails[] = users.map(user => {
//       const enrolledCourses = user.purchases.map(purchase => {
//         // Cast to ensure we're dealing with the correct type structure
//         const courseWithChapters = purchase.course as PurchaseWithCourseAndTransaction["course"];
        
//         const totalChapters = courseWithChapters.chapters.length;
//         const completedChapters = user.userProgress.filter(progress => 
//           progress.chapter.courseId === purchase.course.id && 
//           progress.isCompleted
//         ).length;
        
//         return {
//           courseTitle: purchase.course.title,
//           amountPaid: purchase.transaction?.amount || 0,
//           progress: totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0,
//           thumbnail: purchase.course.imageUrl || '/course-placeholder.jpg'
//         };
//       });

//       return {
//         name: user.name,
//         imageUrl: user.profile?.imageUrl || '',
//         coursesEnrolled: user.purchases.length,
//         lastLogin: user.profile?.updatedAt || new Date(),
//         dateOfEnrollment: user.profile?.createdAt || new Date(),
//         studentLevel: user.userProgress[0]?.level || 1,
//         certificatesEarned: user.profile?.certificatesEarned || 0,
//         enrolledCourses,
//         totalSpent: user.purchases.reduce<number>((sum, purchase) => sum + (purchase.transaction?.amount || 0), 0)
//       };
//     });

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       userDetails,
//     }
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       userDetails: [],
//     }
//   }
// };