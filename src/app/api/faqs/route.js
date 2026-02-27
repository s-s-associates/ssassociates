import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Faq from "@/models/Faq";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const faqs = await Faq.find({ userId: user._id })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, faqs });
  } catch (err) {
    console.error("Faqs GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load FAQs" },
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
    const question = (body.question || "").trim();
    const answer = (body.answer || "").trim();
    if (!question) {
      return NextResponse.json({ success: false, message: "Question is required" }, { status: 400 });
    }
    if (!answer) {
      return NextResponse.json({ success: false, message: "Answer is required" }, { status: 400 });
    }
    const faq = await Faq.create({
      userId: user._id,
      question,
      answer,
      order: typeof body.order === "number" ? body.order : 0,
    });
    return NextResponse.json({ success: true, faq });
  } catch (err) {
    console.error("Faqs POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
