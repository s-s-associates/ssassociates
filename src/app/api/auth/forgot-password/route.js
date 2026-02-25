import { connectDB } from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { NextResponse } from "next/server";

const OTP_EXPIRY_MINUTES = 10;

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }
    const normalizedEmail = email.toLowerCase().trim();
    await connectDB();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found with this email" },
        { status: 400 }
      );
    }
    const otp = generateOtp();
    await Otp.deleteMany({ email: normalizedEmail, type: "reset" });
    await Otp.create({
      email: normalizedEmail,
      otp,
      type: "reset",
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    });
    await sendOtpEmail({ to: normalizedEmail, otp, type: "reset" });
    return NextResponse.json({
      success: true,
      message: "Reset code sent to your email",
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Request failed" },
      { status: 500 }
    );
  }
}
