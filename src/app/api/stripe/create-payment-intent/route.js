import { getUserFromRequest } from "@/lib/get-user-from-request";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const AMOUNT_CENTS = 2900; // $29.00

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
    const paymentIntent = await stripe.paymentIntents.create({
      amount: AMOUNT_CENTS,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { userId: user._id.toString() },
    });
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("Create payment intent error:", err);
    const isConfig = err.message?.includes("STRIPE_SECRET_KEY");
    return NextResponse.json(
      {
        success: false,
        message: isConfig
          ? "Payment is not configured. Add STRIPE_SECRET_KEY to .env.local"
          : err.message || "Failed to create payment intent",
      },
      { status: isConfig ? 503 : 500 }
    );
  }
}
