import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server"; // Import User type for better type safety

export async function syncClerkUsers() {
  try {
    // Fetch all users from Clerk
    let allClerkUsers: User[] = [];
    let page = 1;
    let hasMore = true;

    // Paginate to handle large user lists and avoid rate limits
    while (hasMore) {
      const response = await clerkClient.users.getUserList({ limit: 100, offset: (page - 1) * 100 });
      const users = response.data; // Access the 'data' property to get the array of users
      allClerkUsers = allClerkUsers.concat(users);
      hasMore = users.length === 100; // Check the length of the 'data' array
      page++;
    }

    const clerkUserIds = new Set(allClerkUsers.map(user => user.id));

    // Fetch existing users from Prisma
    const prismaUsers = await db.user.findMany({
      select: { id: true }
    });
    const prismaUserIds = new Set(prismaUsers.map(user => user.id));

    // Find missing users (in Clerk but not in Prisma)
    const missingUserIds = Array.from(clerkUserIds).filter(id => !prismaUserIds.has(id));

    console.log(`[SYNC] Found ${missingUserIds.length} missing users in Prisma.`);

    // Create missing users in Prisma
    for (const userId of missingUserIds) {
      const clerkUser = allClerkUsers.find(user => user.id === userId);
      const email = clerkUser?.emailAddresses[0]?.emailAddress || '';
      const name = clerkUser?.fullName || `${clerkUser?.firstName || ''} ${clerkUser?.lastName || ''}`.trim() || 'Unknown User';

      await db.user.upsert({
        where: { id: userId },
        update: {
          name,
          email
        },
        create: {
          id: userId,
          name,
          email,
          points: 0,
          level: 1
          // Add other required fields as per your schema
        }
      });
      console.log(`[SYNC] Synced user ${userId} in Prisma.`);
    }

    console.log("[SYNC] User sync completed.");
    return missingUserIds.length;
  } catch (error) {
    console.error("[SYNC] Error syncing users:", error);
    throw error;
  }
}