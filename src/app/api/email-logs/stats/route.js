import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import EmailLog from "@/models/EmailLog";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const logs = await EmailLog.find({}).lean();
    const totalSent = logs.reduce((sum, l) => sum + (l.successCount || 0), 0);
    return NextResponse.json({
      totalSent,
      totalCampaigns: logs.length,
    });
  } catch (err) {
    console.error("Email stats GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load stats" },
      { status: 500 }
    );
  }
}
