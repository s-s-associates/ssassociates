import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import Admin from "@/models/Admin";
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
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = signToken({ userId: admin._id.toString(), email: admin.email });
    const userObj = {
      _id: admin._id,
      email: admin.email,
      name: admin.name,
    };
    return NextResponse.json({
      success: true,
      token,
      user: userObj,
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Login failed" },
      { status: 500 }
    );
  }
}
