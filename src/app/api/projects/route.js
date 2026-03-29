import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import { normalizeProjectChallengesSolutions, toStringArray } from "@/lib/project-challenges-solutions";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const normalized = projects.map((p) => normalizeProjectChallengesSolutions(p));
    return NextResponse.json({ success: true, projects: normalized });
  } catch (err) {
    console.error("Projects GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load projects" },
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
    const count = await Project.countDocuments({});
    const project = await Project.create({
      userId: user._id,
      ...body,
      challengesFaced: toStringArray(body.challengesFaced),
      solutionsImplemented: toStringArray(body.solutionsImplemented),
      order: typeof body.order === "number" ? body.order : count,
    });
    return NextResponse.json({
      success: true,
      project: {
        _id: project._id,
        title: project.title,
        status: project.status,
        category: project.category,
        createdAt: project.createdAt,
      },
    });
  } catch (err) {
    console.error("Projects POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
