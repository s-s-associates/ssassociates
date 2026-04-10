import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Partner from "@/models/Partner";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Partner ID required" }, { status: 400 });
    }
    await connectDB();
    const partner = await Partner.findById(id).lean();
    if (!partner) {
      return NextResponse.json({ success: false, message: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, partner });
  } catch (err) {
    console.error("Partner GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load partner" },
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
      return NextResponse.json({ success: false, message: "Partner ID required" }, { status: 400 });
    }
    await connectDB();
    const partner = await Partner.findById(id);
    if (!partner) {
      return NextResponse.json({ success: false, message: "Partner not found" }, { status: 404 });
    }
    const body = await req.json();
    if (body.imageUrl !== undefined) partner.imageUrl = body.imageUrl;
    if (body.title !== undefined) partner.title = (body.title || "").trim();
    if (body.description !== undefined) partner.description = (body.description || "").trim();
    if (body.url !== undefined) partner.url = (body.url || "").trim();
    await partner.save();
    return NextResponse.json({ success: true, partner });
  } catch (err) {
    console.error("Partner PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update partner" },
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
      return NextResponse.json({ success: false, message: "Partner ID required" }, { status: 400 });
    }
    await connectDB();
    const partner = await Partner.findByIdAndDelete(id);
    if (!partner) {
      return NextResponse.json({ success: false, message: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Partner deleted" });
  } catch (err) {
    console.error("Partner DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete partner" },
      { status: 500 }
    );
  }
}
