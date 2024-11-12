import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, MemberRole } from "@prisma/client";

const prisma = new PrismaClient();

// POST request - Create or Update Profile
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // id represents the user's ID
  const { name, email, imageUrl, role } = await req.json();

  try {
    // Check if profile exists for the user
    const existingProfile = await prisma.profile.findFirst({
      where: { userId: id },
    });

    let profile;

    if (existingProfile) {
      // Update profile if it already exists
      const updatedData: any = {
        role: role ?? existingProfile.role,
        name: name ?? existingProfile.name,
        email: email ?? existingProfile.email,
        imageUrl: imageUrl ?? existingProfile.imageUrl,
        updatedAt: new Date(),
      };

      profile = await prisma.profile.update({
        where: { id: existingProfile.id }, // Use the profile's primary key (id) for updating
        data: updatedData,
      });
    } else {
      // If no profile exists, create it
      profile = await prisma.profile.create({
        data: {
          userId: id,
          name: name || "", // Default to empty string if no name provided
          email: email || "", // Default to empty string if no email provided
          imageUrl: imageUrl || "", // Default to empty string if no image URL provided
          role: role || MemberRole.STUDENT, // Default to STUDENT if no role provided
        },
      });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error handling profile:", error);
    return NextResponse.json({ message: "Error saving profile data" }, { status: 500 });
  }
}

// PATCH request - Update Profile
// PATCH request - Update Profile
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // This is the profile ID
  const { name, email, imageUrl, role } = await req.json();

  try {
    // Find the existing profile by profile id
    const existingProfile = await prisma.profile.findUnique({
      where: { id }, // Search by the profile's `id` field
    });

    if (existingProfile) {
      // Update the profile if it exists
      const updatedData: any = {
        role: role ?? existingProfile.role,
        name: name ?? existingProfile.name,
        email: email ?? existingProfile.email,
        imageUrl: imageUrl ?? existingProfile.imageUrl,
        updatedAt: new Date(),
      };

      const updatedProfile = await prisma.profile.update({
        where: { id }, // Use the profile's `id` for updating
        data: updatedData,
      });

      return NextResponse.json(updatedProfile, { status: 200 });
    } else {
      // Return 404 if no profile is found with the given `id`
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}


