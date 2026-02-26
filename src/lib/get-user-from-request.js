import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Admin from "@/models/Admin";

export async function getUserFromRequest(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded?.userId) return null;
  await connectDB();
  const admin = await Admin.findById(decoded.userId).select("-password");
  return admin;
}
