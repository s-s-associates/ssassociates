import { connectDB } from "@/lib/db";
import ContactSubmission from "@/models/ContactSubmission";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();
    if (!fullName) {
      return NextResponse.json({ success: false, message: "Full name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
    }
    await connectDB();
    await ContactSubmission.create({
      fullName,
      email,
      companyName: (body.companyName || "").trim(),
      phone,
      address: (body.address || "").trim(),
      message,
    });
    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
