import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 400 });
    }
    await connectDB();
    const found = await Admin.findById(id).select("-password").lean();
    if (!found) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, admin: found });
  } catch (err) {
    console.error("Admin GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load admin" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 400 });
    }
    await connectDB();
    const found = await Admin.findById(id);
    if (!found) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
    }
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").toLowerCase().trim();
    if (name) found.name = name;
    if (email) {
      const existing = await Admin.findOne({ email, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 });
      }
      found.email = email;
    }
    if (body.password !== undefined && body.password !== "") {
      const pwd = (body.password || "").trim();
      if (pwd.length < 6) {
        return NextResponse.json({ success: false, message: "Password must be at least 6 characters" }, { status: 400 });
      }
      found.password = await bcrypt.hash(pwd, 10);
    }
    await found.save();
    const out = await Admin.findById(id).select("-password").lean();
    return NextResponse.json({ success: true, admin: out });
  } catch (err) {
    console.error("Admin PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 400 });
    }
    await connectDB();
    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Admin deleted" });
  } catch (err) {
    console.error("Admin DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete admin" },
      { status: 500 }
    );
  }
}
