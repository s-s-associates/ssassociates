import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const subscribers = await Subscriber.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, subscribers });
  } catch (err) {
    console.error("Subscribers GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load subscribers" },
      { status: 500 }
    );
  }
}
