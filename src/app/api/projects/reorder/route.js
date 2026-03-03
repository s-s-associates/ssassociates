import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const projectId = body.projectId ?? body.id;
    const direction = body.direction === "up" || body.direction === "down" ? body.direction : null;
    if (!projectId || !direction) {
      return NextResponse.json(
        { success: false, message: "projectId and direction (up/down) are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const projectList = await Project.find({ userId: user._id })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const index = projectList.findIndex((p) => String(p._id) === String(projectId));
    if (index === -1) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= projectList.length) {
      return NextResponse.json({ success: true, message: "Already at limit" });
    }
    // Swap in array then renumber so every project has unique order (fixes when many have order 0)
    const reordered = [...projectList];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(swapIndex, 0, moved);
    await Promise.all(
      reordered.map((p, i) =>
        Project.updateOne(
          { _id: p._id, userId: user._id },
          { $set: { order: i } }
        )
      )
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Projects reorder error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to reorder" },
      { status: 500 }
    );
  }
}
