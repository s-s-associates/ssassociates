import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Partner from "@/models/Partner";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const partners = await Partner.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, partners });
  } catch (err) {
    console.error("Partners GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load partners" },
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
    const imageUrl = (body.imageUrl || "").trim();
    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }
    if (!imageUrl) {
      return NextResponse.json({ success: false, message: "Image is required" }, { status: 400 });
    }
    const partner = await Partner.create({
      userId: user._id,
      imageUrl,
      title,
      description: (body.description || "").trim(),
      url: (body.url || "").trim(),
    });
    return NextResponse.json({
      success: true,
      partner: {
        _id: partner._id,
        imageUrl: partner.imageUrl,
        title: partner.title,
        description: partner.description,
        url: partner.url,
        createdAt: partner.createdAt,
      },
    });
  } catch (err) {
    console.error("Partners POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create partner" },
      { status: 500 }
    );
  }
}
