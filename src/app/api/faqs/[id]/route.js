import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Faq from "@/models/Faq";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "FAQ ID required" }, { status: 400 });
    }
    await connectDB();
    const faq = await Faq.findById(id).lean();
    if (!faq) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, faq });
  } catch (err) {
    console.error("FAQ GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load FAQ" },
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
      return NextResponse.json({ success: false, message: "FAQ ID required" }, { status: 400 });
    }
    await connectDB();
    const faq = await Faq.findById(id);
    if (!faq) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }
    const body = await req.json();
    const question = (body.question || "").trim();
    const answer = (body.answer || "").trim();
    if (!question) {
      return NextResponse.json({ success: false, message: "Question is required" }, { status: 400 });
    }
    if (!answer) {
      return NextResponse.json({ success: false, message: "Answer is required" }, { status: 400 });
    }
    faq.question = question;
    faq.answer = answer;
    if (typeof body.order === "number") faq.order = body.order;
    await faq.save();
    return NextResponse.json({ success: true, faq });
  } catch (err) {
    console.error("FAQ PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update FAQ" },
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
      return NextResponse.json({ success: false, message: "FAQ ID required" }, { status: 400 });
    }
    await connectDB();
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (err) {
    console.error("FAQ DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
