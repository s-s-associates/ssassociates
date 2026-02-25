import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import Payment from "@/models/Payment";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const AMOUNT_CENTS = 2900;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set in environment");
  return new Stripe(key);
}

export async function POST(req) {
  try {
    const stripe = getStripe();
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { paymentIntentId } = body;
    if (!paymentIntentId) {
      return NextResponse.json(
        { success: false, message: "paymentIntentId required" },
        { status: 400 }
      );
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.metadata?.userId !== user._id.toString()) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { success: false, message: "Payment not completed" },
        { status: 400 }
      );
    }
    await connectDB();
    const existing = await Payment.findOne({
      stripePaymentIntentId: paymentIntentId,
      userId: user._id,
    });
    if (existing && existing.status === "active") {
      return NextResponse.json({ success: true, message: "Already recorded" });
    }
    if (existing) {
      await Payment.updateOne(
        { _id: existing._id },
        { $set: { status: "active", paidAt: new Date() } }
      );
    } else {
      await Payment.create({
        userId: user._id,
        amount: AMOUNT_CENTS,
        currency: "usd",
        status: "active",
        stripePaymentIntentId: paymentIntentId,
        paidAt: new Date(),
      });
    }
    return NextResponse.json({
      success: true,
      message: "Payment recorded. You now have full access.",
    });
  } catch (err) {
    console.error("Confirm payment error:", err);
    const isConfig = err.message?.includes("STRIPE_SECRET_KEY");
    return NextResponse.json(
      {
        success: false,
        message: isConfig
          ? "Payment is not configured. Add STRIPE_SECRET_KEY to .env.local"
          : err.message || "Failed to confirm payment",
      },
      { status: isConfig ? 503 : 500 }
    );
  }
}
