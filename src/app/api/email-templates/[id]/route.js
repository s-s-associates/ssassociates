import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import EmailTemplate from "@/models/EmailTemplate";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const params = await context.params;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    await connectDB();
    const template = await EmailTemplate.findById(id).lean();
    if (!template) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(template);
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const params = await context.params;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }
    const body = await req.json();
    await connectDB();
    const template = await EmailTemplate.findByIdAndUpdate(
      id,
      {
        title: body.title !== undefined ? String(body.title).trim() : undefined,
        subject: body.subject !== undefined ? String(body.subject).trim() : undefined,
        description: body.description !== undefined ? String(body.description).trim() : undefined,
        body: body.body !== undefined ? String(body.body).trim() : (body.description !== undefined ? String(body.description).trim() : undefined),
        heading: body.heading !== undefined ? String(body.heading).trim() : undefined,
        ctaText: body.ctaText !== undefined ? String(body.ctaText).trim() : undefined,
        ctaUrl: body.ctaUrl !== undefined ? String(body.ctaUrl).trim() : undefined,
        category: body.category !== undefined ? String(body.category).trim() : undefined,
        categoryColor: body.categoryColor !== undefined ? String(body.categoryColor).trim() : undefined,
      },
      { new: true, runValidators: true }
    ).lean();
    if (!template) {
      return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 });
    }
    return NextResponse.json(template);
  } catch (err) {
    console.error("Email template PUT error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const params = await context.params;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    await connectDB();
    const deleted = await EmailTemplate.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
