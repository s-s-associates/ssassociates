import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import EmailTemplate from "@/models/EmailTemplate";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const templates = await EmailTemplate.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(templates);
  } catch (err) {
    console.error("Email templates GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load templates" },
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
    const body = await req.json();
    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }
    await connectDB();
    const template = await EmailTemplate.create({
      title,
      subject: (body.subject || "").trim(),
      description: (body.description || "").trim(),
      body: (body.body || body.description || "").trim(),
      heading: (body.heading || "").trim(),
      ctaText: (body.ctaText || "").trim(),
      ctaUrl: (body.ctaUrl || "").trim(),
      category: (body.category || "").trim(),
      categoryColor: (body.categoryColor || "").trim(),
    });
    return NextResponse.json(template);
  } catch (err) {
    console.error("Email template POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create template" },
      { status: 500 }
    );
  }
}
