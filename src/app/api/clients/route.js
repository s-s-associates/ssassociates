import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const clients = await Client.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, clients });
  } catch (err) {
    console.error("Clients GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load clients" },
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
    const title = (body.title || "").trim();
    const imageUrl = (body.imageUrl || "").trim();
    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }
    if (!imageUrl) {
      return NextResponse.json({ success: false, message: "Image is required" }, { status: 400 });
    }
    const client = await Client.create({
      userId: user._id,
      imageUrl,
      title,
      description: (body.description || "").trim(),
      url: (body.url || "").trim(),
    });
    return NextResponse.json({
      success: true,
      client: {
        _id: client._id,
        imageUrl: client.imageUrl,
        title: client.title,
        description: client.description,
        url: client.url,
        createdAt: client.createdAt,
      },
    });
  } catch (err) {
    console.error("Clients POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create client" },
      { status: 500 }
    );
  }
}
