import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Project ID required" }, { status: 400 });
    }
    await connectDB();
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error("Project GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load project" },
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
      return NextResponse.json({ success: false, message: "Project ID required" }, { status: 400 });
    }
    await connectDB();
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    const body = await req.json();
    const allowed = [
      "bannerUrl", "title", "tagline", "location", "status", "year", "ctaType", "ctaLink",
      "description", "clientName", "category", "projectArea", "projectAreaUnit", "budget", "durationStart", "durationEnd",
      "structureType", "floors", "materialsUsed", "foundationType", "safetyStandards", "sustainabilityFeatures", "certifications",
      "imageGallery", "videoUrl",
      "challengesFaced", "solutionsImplemented", "uniqueApproach",
    ];
    allowed.forEach((key) => {
      if (body[key] !== undefined) project[key] = body[key];
    });
    await project.save();
    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error("Project PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update project" },
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
      return NextResponse.json({ success: false, message: "Project ID required" }, { status: 400 });
    }
    await connectDB();
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (err) {
    console.error("Project DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
