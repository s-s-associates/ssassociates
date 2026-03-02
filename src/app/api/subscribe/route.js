import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email" }, { status: 400 });
    }
    await connectDB();
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({
        success: false,
        alreadySubscribed: true,
        message: "This email is already subscribed.",
      }, { status: 200 });
    }
    await Subscriber.create({ email });
    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({
        success: false,
        alreadySubscribed: true,
        message: "This email is already subscribed.",
      }, { status: 200 });
    }
    console.error("Subscribe POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
