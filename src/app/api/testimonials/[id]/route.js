import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

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
    const testimonial = await Testimonial.findOne({ _id: id, userId: user._id }).lean();
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
    const testimonial = await Testimonial.findOne({ _id: id, userId: user._id });
    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    const body = await req.json();
    const clientName = (body.clientName || "").trim();
    const content = (body.content || "").trim();
    if (!clientName) {
      return NextResponse.json({ success: false, message: "Client name is required" }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ success: false, message: "Content/quote is required" }, { status: 400 });
    }
    testimonial.clientName = clientName;
    testimonial.content = content;
    if (body.role !== undefined) testimonial.role = (body.role || "").trim();
    if (body.imageUrl !== undefined) testimonial.imageUrl = (body.imageUrl || "").trim();
    if (typeof body.order === "number") testimonial.order = body.order;
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
    const testimonial = await Testimonial.findOneAndDelete({ _id: id, userId: user._id });
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
