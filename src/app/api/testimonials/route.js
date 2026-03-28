import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";
import {
  normalizeTestimonialBody,
  validateRequiredTestimonialFields,
} from "./helpers";

export async function GET(req) {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({})
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
    const normalized = normalizeTestimonialBody(body);
    const validationError = validateRequiredTestimonialFields(normalized);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }
    const testimonial = await Testimonial.create({
      userId: user._id,
      clientName: normalized.clientName,
      role: normalized.role,
      companyName: normalized.companyName,
      content: normalized.content,
      imageUrl: normalized.imageUrl,
      rating: normalized.rating,
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
