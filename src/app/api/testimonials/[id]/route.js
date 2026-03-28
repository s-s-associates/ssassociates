import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";
import {
  clampRating,
  normalizeTestimonialBody,
  validateRequiredTestimonialFields,
} from "../helpers";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Testimonial ID required" }, { status: 400 });
    }
    await connectDB();
    const testimonial = await Testimonial.findById(id).lean();
    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    console.error("Testimonial GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load testimonial" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Testimonial ID required" }, { status: 400 });
    }
    await connectDB();
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    const body = await req.json();
    const normalized = normalizeTestimonialBody(body);
    const validationError = validateRequiredTestimonialFields(normalized);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }
    testimonial.clientName = normalized.clientName;
    testimonial.content = normalized.content;
    if (body.role !== undefined) testimonial.role = normalized.role;
    if (body.companyName !== undefined) testimonial.companyName = normalized.companyName;
    if (body.imageUrl !== undefined) testimonial.imageUrl = normalized.imageUrl;
    if (body.rating !== undefined) testimonial.rating = clampRating(body.rating);
    await testimonial.save();
    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    console.error("Testimonial PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Testimonial ID required" }, { status: 400 });
    }
    await connectDB();
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    console.error("Testimonial DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
