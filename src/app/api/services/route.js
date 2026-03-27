import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { normalizeServiceBody, validateServiceBody } from "./helpers";

export async function GET(req) {
  try {
    await connectDB();
    const services = await Service.find({})
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
    const normalized = normalizeServiceBody(body);
    const validationError = validateServiceBody(normalized);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }
    const count = await Service.countDocuments({});
    const service = await Service.create({
      userId: user._id,
      ...normalized,
      order: count,
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
