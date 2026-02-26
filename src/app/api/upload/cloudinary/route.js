import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { success: false, message: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env.local" },
        { status: 500 }
      );
    }
    const body = await req.json();
    const { image } = body;
    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { success: false, message: "image (base64 data URI) is required" },
        { status: 400 }
      );
    }
    const result = await cloudinary.uploader.upload(image, {
      folder: "ssassociates/projects",
      resource_type: "auto",
    });
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
