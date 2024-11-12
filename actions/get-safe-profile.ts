// actions/get-safe-profile.ts
import { db } from "@/lib/db";
import { SafeProfile } from "@/types";
import { getAuth } from "@clerk/nextjs/server"; // Correct import for server-side authentication
import { NextRequest } from "next/server"; // Import NextRequest for type handling
import { redirect } from "next/navigation";

// Change the function to accept req as parameter
export default async function getSafeProfile(userId: string) {
  try {
    // If userId is invalid, redirect
    if (!userId) {
      return null; // or you can throw an error
    }

    const currentProfile = await db.profile.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        imageUrl: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!currentProfile) {
      return null; // Return null if the profile does not exist
    }

    // Convert createdAt and updatedAt to ISO strings
    const safeProfile: SafeProfile = {
      ...currentProfile,
      createdAt: currentProfile.createdAt.toISOString(),
      updatedAt: currentProfile.updatedAt.toISOString(),
    };

    return safeProfile; // Return the safe profile
  } catch (error: any) {
    console.error("Error fetching safe profile:", error); // Log error for debugging
    return null; // Return null in case of an error
  }
}
