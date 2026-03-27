import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Category from "@/models/Category";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Category ID required" }, { status: 400 });
    }
    await connectDB();
    const category = await Category.findById(id).lean();
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, category });
  } catch (err) {
    console.error("Category GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load category" },
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
      return NextResponse.json({ success: false, message: "Category ID required" }, { status: 400 });
    }
    await connectDB();
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    const body = await req.json();
    const name = (body.name || "").trim();
    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    category.name = name;
    await category.save();
    return NextResponse.json({ success: true, category });
  } catch (err) {
    console.error("Category PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update category" },
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
      return NextResponse.json({ success: false, message: "Category ID required" }, { status: 400 });
    }
    await connectDB();
    const category = await Category.findById(id).lean();
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    const projectCount = await Project.countDocuments({
      category: category.name?.trim() || "",
    });
    if (projectCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `This category is used in ${projectCount} project(s). Remove it from those projects first, then you can delete the category.`,
          projectCount,
        },
        { status: 400 }
      );
    }
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (err) {
    console.error("Category DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
