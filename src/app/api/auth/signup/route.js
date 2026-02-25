import { connectDB } from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";
import User from "@/models/User";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const OTP_EXPIRY_MINUTES = 10;

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, teamSchoolName } = body;
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectDB();
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      teamSchoolName: (teamSchoolName || "").trim(),
      isEmailVerified: false,
    });
    const otp = generateOtp();
    await Otp.deleteMany({ email: user.email, type: "signup" });
    await Otp.create({
      email: user.email,
      otp,
      type: "signup",
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    });
    await sendOtpEmail({ to: user.email, otp, type: "signup" });
    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email",
      email: user.email,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Signup failed" },
      { status: 500 }
    );
  }
}
