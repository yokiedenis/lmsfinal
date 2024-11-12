import { redirectToSignIn, getAuth } from "@clerk/nextjs/server"; // Use the correct import for redirect
import { NextRequest } from "next/server"; // Import NextRequest for correct type handling
import { db } from "@/lib/db";

// Update the function to accept NextRequest instead of Request
export const currentProfile = async (req: NextRequest) => {
    // Use getAuth to retrieve the user ID from the request
    const { userId } = getAuth(req);

    // Check if user is authenticated
    if (!userId) {
        // Redirect to sign in if user is not authenticated
        return redirectToSignIn(); 
    }

    // Attempt to find the user's profile in the database using userId
    let profile = await db.profile.findUnique({
        where: {
            userId: userId, // Now `userId` is a unique field in the schema
        },
    });

    // If profile does not exist, create a new one
    if (!profile) {
        const email = req.headers.get("email"); // Example: adjust this based on your logic
        let firstName = req.headers.get("first-name") || ""; // Use let instead of const
        let lastName = req.headers.get("last-name") || ""; // Use let instead of const

        // If both first and last names are empty, set firstName from email
        if (!firstName && !lastName && email) {
            const emailParts = email.split("@");
            firstName = emailParts[0].trim(); // Use email as first name if both are empty
            lastName = ""; // Default last name to empty
        }
        
        profile = await db.profile.create({
            data: { 
                userId: userId,
                name: `${firstName} ${lastName}`,
                imageUrl: "", // Set default image or handle accordingly
                email: email || "", // Fallback to empty string if email is not provided
            },
        });
    }

    return profile; // Return the profile (existing or newly created)
};
