import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    await connectDB();
    const admins = await Admin.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, admins });
  } catch (err) {
    console.error("Admins GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load admins" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").toLowerCase().trim();
    const password = (body.password || "").trim();
    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters" }, { status: 400 });
    }
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashed });
    return NextResponse.json({
      success: true,
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (err) {
    console.error("Admins POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create admin" },
      { status: 500 }
    );
  }
}
