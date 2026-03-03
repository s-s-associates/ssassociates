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
    const { searchParams } = new URL(req.url);
    const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
    await connectDB();
    const total = await EmailLog.countDocuments();
    const logs = await EmailLog.find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();
    const logsWithId = logs.map((l) => ({
      ...l,
      id: l._id?.toString(),
    }));
    return NextResponse.json({ logs: logsWithId, total });
  } catch (err) {
    console.error("Email logs GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load logs" },
      { status: 500 }
    );
  }
}
