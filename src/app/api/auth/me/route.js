import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded?.userId) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    await connectDB();
    const admin = await Admin.findById(decoded.userId).select("-password");
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 401 });
    }
    const userObj = {
      _id: admin._id,
      email: admin.email,
      name: admin.name,
    };
    return NextResponse.json({
      success: true,
      user: userObj,
    });
  } catch (err) {
    console.error("Auth me error:", err);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
