import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Handle PATCH request to update the member's role
export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // Get userId from query params
  const { role } = req.body;    // Get the new role from the request body

  try {
    const updatedUsers = await prisma.profile.updateMany({
      where: { userId: String(userId) }, // No need for a unique field with updateMany
      data: {
        role: role,
      },
    });

    if (updatedUsers.count === 0) {
      return res.status(404).json({ error: "Profile not found" }); // Handle case if no profile is found
    }

    return res.status(200).json({ message: "Role updated successfully" }); // Return success message
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ error: "Unable to update role" });
  }
}
