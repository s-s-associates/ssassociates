import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { resetToken, newPassword } = body;
    if (!resetToken || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Reset token and new password required" },
        { status: 400 }
      );
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    const decoded = verifyToken(resetToken);
    if (!decoded || decoded.purpose !== "reset" || !decoded.email) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset link" },
        { status: 400 }
      );
    }
    await connectDB();
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { email: decoded.email },
      { $set: { password: hashed } }
    );
    return NextResponse.json({
      success: true,
      message: "Password updated. You can log in now.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Reset failed" },
      { status: 500 }
    );
  }
}
