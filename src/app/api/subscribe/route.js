import { subscribeWithNotifications } from "@/lib/subscriber-signup";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await subscribeWithNotifications(body?.email);

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: result.message,
        subscriber: result.subscriber,
      });
    }

    const status = result.status ?? (result.alreadySubscribed ? 200 : 400);
    return NextResponse.json(
      {
        success: false,
        ...(result.alreadySubscribed ? { alreadySubscribed: true } : {}),
        message: result.message,
      },
      { status }
    );
  } catch (err) {
    console.error("Subscribe POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
