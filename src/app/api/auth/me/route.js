import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { getActivePaymentForUser, hasActivePayment } from "@/lib/payment-helpers";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded?.userId) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }
    const paymentActive = await hasActivePayment(user._id);
    const latestPayment = await getActivePaymentForUser(user._id);
    const paymentSummary = latestPayment
      ? {
          amount: latestPayment.amount,
          currency: latestPayment.currency,
          status: latestPayment.status,
          paidAt: latestPayment.paidAt,
        }
      : null;
    const userObj = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      teamSchoolName: user.teamSchoolName,
    };
    return NextResponse.json({
      success: true,
      user: userObj,
      paymentStatus: paymentActive ? "active" : "inactive",
      payment: paymentSummary,
    });
  } catch (err) {
    console.error("Auth me error:", err);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
