import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const serviceId = body.serviceId ?? body.id;
    const direction = body.direction === "up" || body.direction === "down" ? body.direction : null;
    if (!serviceId || !direction) {
      return NextResponse.json(
        { success: false, message: "serviceId and direction (up/down) are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const services = await Service.find({ userId: user._id })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const index = services.findIndex((s) => String(s._id) === String(serviceId));
    if (index === -1) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= services.length) {
      return NextResponse.json({ success: true, message: "Already at limit" });
    }
    const currentOrder = services[index].order;
    const swapOrder = services[swapIndex].order;
    await Service.updateOne(
      { _id: services[index]._id, userId: user._id },
      { $set: { order: swapOrder } }
    );
    await Service.updateOne(
      { _id: services[swapIndex]._id, userId: user._id },
      { $set: { order: currentOrder } }
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Services reorder error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to reorder" },
      { status: 500 }
    );
  }
}
