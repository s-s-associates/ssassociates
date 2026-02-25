import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { hasActivePayment } from "@/lib/payment-helpers";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
    if (!user.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your email first" },
        { status: 401 }
      );
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = signToken({ userId: user._id.toString(), email: user.email });
    const paymentActive = await hasActivePayment(user._id);
    const userObj = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      teamSchoolName: user.teamSchoolName,
    };
    return NextResponse.json({
      success: true,
      token,
      user: userObj,
      paymentStatus: paymentActive ? "active" : "inactive",
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Login failed" },
      { status: 500 }
    );
  }
}
