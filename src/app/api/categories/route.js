import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const categories = await Category.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, categories });
  } catch (err) {
    console.error("Categories GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load categories" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const name = (body.name || "").trim();
    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    const category = await Category.create({
      userId: user._id,
      name,
    });
    return NextResponse.json({
      success: true,
      category: {
        _id: category._id,
        name: category.name,
        createdAt: category.createdAt,
      },
    });
  } catch (err) {
    console.error("Categories POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
