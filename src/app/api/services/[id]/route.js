import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { normalizeServiceBody, validateServiceBody } from "../helpers";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Service ID required" }, { status: 400 });
    }
    await connectDB();
    const service = await Service.findById(id).lean();
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, service });
  } catch (err) {
    console.error("Service GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load service" },
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
      return NextResponse.json({ success: false, message: "Service ID required" }, { status: 400 });
    }
    await connectDB();
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    const body = await req.json();
    const normalized = normalizeServiceBody(body);
    const validationError = validateServiceBody(normalized);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }
    service.title = normalized.title;
    service.description = normalized.description;
    service.imageUrl = normalized.imageUrl;
    service.whatYouGet = normalized.whatYouGet;
    service.extraBenefits = normalized.extraBenefits;
    service.conclusion = normalized.conclusion;
    service.subServices = normalized.subServices;
    service.markModified("subServices");
    if (typeof body.order === "number") service.order = body.order;
    await service.save();
    return NextResponse.json({ success: true, service });
  } catch (err) {
    console.error("Service PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update service" },
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
      return NextResponse.json({ success: false, message: "Service ID required" }, { status: 400 });
    }
    await connectDB();
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (err) {
    console.error("Service DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
