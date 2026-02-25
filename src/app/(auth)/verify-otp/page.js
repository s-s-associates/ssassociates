import VerifyOTP from "@/components/website/auth/VerifyOTP";
import React, { Suspense } from "react";

function VerifyOTPFallback() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      Loading…
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<VerifyOTPFallback />}>
      <VerifyOTP />
    </Suspense>
  );
}
