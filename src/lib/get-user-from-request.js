import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";

export async function getUserFromRequest(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded?.userId) return null;
  await connectDB();
  const user = await User.findById(decoded.userId).select("-password");
  return user;
}
