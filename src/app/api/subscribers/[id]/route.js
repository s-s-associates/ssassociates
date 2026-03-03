import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const params = await context.params;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }
    await connectDB();
    const deleted = await Subscriber.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Subscriber not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscriber DELETE error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
