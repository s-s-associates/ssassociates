import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const testimonials = await Testimonial.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, testimonials });
  } catch (err) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load testimonials" },
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
    const clientName = (body.clientName || "").trim();
    const content = (body.content || "").trim();
    if (!clientName) {
      return NextResponse.json({ success: false, message: "Client name is required" }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ success: false, message: "Content/quote is required" }, { status: 400 });
    }
    const rating = Math.min(5, Math.max(0, Number(body.rating) || 0));
    const testimonial = await Testimonial.create({
      userId: user._id,
      clientName,
      role: (body.role || "").trim(),
      companyName: (body.companyName || "").trim(),
      content,
      imageUrl: (body.imageUrl || "").trim(),
      rating,
    });
    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    console.error("Testimonials POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
