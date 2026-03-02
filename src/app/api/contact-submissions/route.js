import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import ContactSubmission from "@/models/ContactSubmission";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const submissions = await ContactSubmission.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, submissions });
  } catch (err) {
    console.error("Contact submissions GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load submissions" },
      { status: 500 }
    );
  }
}
