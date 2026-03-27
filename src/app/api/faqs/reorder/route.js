import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Faq from "@/models/Faq";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const faqId = body.faqId ?? body.id;
    const direction = body.direction === "up" || body.direction === "down" ? body.direction : null;
    if (!faqId || !direction) {
      return NextResponse.json(
        { success: false, message: "faqId and direction (up/down) are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const faqs = await Faq.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const index = faqs.findIndex((f) => String(f._id) === String(faqId));
    if (index === -1) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= faqs.length) {
      return NextResponse.json({ success: true, message: "Already at limit" });
    }
    const currentOrder = faqs[index].order;
    const swapOrder = faqs[swapIndex].order;
    await Faq.updateOne({ _id: faqs[index]._id }, { $set: { order: swapOrder } });
    await Faq.updateOne({ _id: faqs[swapIndex]._id }, { $set: { order: currentOrder } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FAQs reorder error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to reorder" },
      { status: 500 }
    );
  }
}
