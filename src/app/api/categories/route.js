import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Category from "@/models/Category";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { normalizeSubCategories } from "./helpers";

export async function GET(req) {
  try {
    await connectDB();
    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .lean();
    const projectMatch = { category: { $exists: true, $ne: "" } };
    const projectCounts = await Project.aggregate([
      { $match: projectMatch },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const countByCategoryName = Object.fromEntries(
      projectCounts.map((p) => [String(p._id).trim(), p.count])
    );
    const categoriesWithCount = categories.map((c) => ({
      ...c,
      projectCount: countByCategoryName[c.name?.trim()] ?? 0,
    }));
    return NextResponse.json({ success: true, categories: categoriesWithCount });
  } catch (err) {
    console.error("Categories GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load categories" },
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
    const name = (body.name || "").trim();
    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    const subCategories = normalizeSubCategories(body.subCategories);
    const category = await Category.create({
      userId: user._id,
      name,
      subCategories,
    });
    const doc = category.toObject();
    return NextResponse.json({
      success: true,
      category: {
        _id: doc._id,
        name: doc.name,
        subCategories: doc.subCategories || [],
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
    });
  } catch (err) {
    console.error("Categories POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
