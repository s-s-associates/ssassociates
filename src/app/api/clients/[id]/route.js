import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Client ID required" }, { status: 400 });
    }
    await connectDB();
    const client = await Client.findById(id).lean();
    if (!client) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, client });
  } catch (err) {
    console.error("Client GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load client" },
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
      return NextResponse.json({ success: false, message: "Client ID required" }, { status: 400 });
    }
    await connectDB();
    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
    }
    const body = await req.json();
    if (body.imageUrl !== undefined) client.imageUrl = body.imageUrl;
    if (body.title !== undefined) client.title = (body.title || "").trim();
    if (body.description !== undefined) client.description = (body.description || "").trim();
    if (body.url !== undefined) client.url = (body.url || "").trim();
    await client.save();
    return NextResponse.json({ success: true, client });
  } catch (err) {
    console.error("Client PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update client" },
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
      return NextResponse.json({ success: false, message: "Client ID required" }, { status: 400 });
    }
    await connectDB();
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Client deleted" });
  } catch (err) {
    console.error("Client DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete client" },
      { status: 500 }
    );
  }
}
