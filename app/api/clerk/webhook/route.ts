import { NextResponse } from "next/server";
import { syncClerkUsers } from "@/lib/sync-clerk-users"; // Import from the new location

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === "user.created") {
      await syncClerkUsers();
      console.log(`[WEBHOOK] Synced new user: ${data.id}`);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("[WEBHOOK] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}