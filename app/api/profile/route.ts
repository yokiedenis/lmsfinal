import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you have this set up to import your Prisma client

// GET method to fetch a user's profile
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST method to create or update a user's profile
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      userId, 
      name, 
      dob, 
      occupation, 
      bio, 
      imageUrl, 
      email, 
      role, 
      gender, 
      country, 
      contactNo, 
      address, 
      highestQualification, 
      employeeStatus, 
      industry, 
      paymentOption 
    } = body;

    if (!userId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (profile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId },
        data: {
          name,
          dob: dob ? new Date(dob) : undefined,
          occupation,
          bio,
          imageUrl,
          email,
          role,
          gender,
          country,
          contactNo,
          address,
          highestQualification,
          employeeStatus,
          industry,
          paymentOption,
        },
      });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          userId,
          name,
          dob: new Date(dob),
          occupation,
          bio,
          imageUrl,
          email,
          role,
          gender,
          country,
          contactNo,
          address,
          highestQualification,
          employeeStatus,
          industry,
          paymentOption,
        },
      });
    }

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT method (optional) if you want to separate update from create
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { 
      name, 
      dob, 
      occupation, 
      bio, 
      imageUrl, 
      email, 
      role, 
      gender, 
      country, 
      contactNo, 
      address, 
      highestQualification, 
      employeeStatus, 
      industry, 
      paymentOption 
    } = body;

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        name,
        dob: dob ? new Date(dob) : undefined,
        occupation,
        bio,
        imageUrl,
        email,
        role,
        gender,
        country,
        contactNo,
        address,
        highestQualification,
        employeeStatus,
        industry,
        paymentOption,
      },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE method to remove a user's profile
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await prisma.profile.delete({
      where: { userId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}