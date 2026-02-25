import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, otp, type = "signup" } = body;
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP required" },
        { status: 400 }
      );
    }
    await connectDB();
    const record = await Otp.findOne({
      email: email.toLowerCase().trim(),
      otp: String(otp).trim(),
      type,
    });
    if (!record) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }
    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ _id: record._id });
      return NextResponse.json(
        { success: false, message: "OTP has expired" },
        { status: 400 }
      );
    }
    if (type === "signup") {
      await User.updateOne(
        { email: record.email },
        { $set: { isEmailVerified: true } }
      );
      await Otp.deleteOne({ _id: record._id });
      const user = await User.findOne({ email: record.email }).select("-password");
      const token = signToken({ userId: user._id.toString(), email: user.email });
      return NextResponse.json({
        success: true,
        message: "Email verified",
        token,
        user: { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      });
    }
    if (type === "reset") {
      await Otp.deleteOne({ _id: record._id });
      const resetToken = signToken(
        { email: record.email, purpose: "reset" },
        "15m"
      );
      return NextResponse.json({
        success: true,
        message: "OTP verified. You can set a new password.",
        resetToken,
        email: record.email,
      });
    }
    return NextResponse.json(
      { success: false, message: "Invalid type" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Verification failed" },
      { status: 500 }
    );
  }
}
