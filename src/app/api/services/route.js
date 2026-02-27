import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const services = await Service.find({ userId: user._id })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, services });
  } catch (err) {
    console.error("Services GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load services" },
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
    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }
    const service = await Service.create({
      userId: user._id,
      title,
      description: (body.description || "").trim(),
      icon: (body.icon || "").trim(),
      order: typeof body.order === "number" ? body.order : 0,
    });
    return NextResponse.json({ success: true, service });
  } catch (err) {
    console.error("Services POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
