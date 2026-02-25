"use client";

import { getAuth } from "@/lib/auth-storage";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";

export default function UserGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  const isPaymentPage = pathname === "/payment";

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const { token } = getAuth();
      if (!token) {
        if (!cancelled) {
          setChecking(false);
          router.replace("/login");
        }
        return;
      }
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.success) {
          setChecking(false);
          router.replace("/login");
          return;
        }
        if (data.paymentStatus === "active") {
          setAllowed(true);
          setChecking(false);
          return;
        }
        if (isPaymentPage) {
          setAllowed(true);
          setChecking(false);
          return;
        }
        if (!cancelled) {
          setChecking(false);
          await Swal.fire({
            icon: "warning",
            title: "Payment required",
            text: "Please complete your payment to access the dashboard.",
            confirmButtonColor: "#8A38F5",
            confirmButtonText: "Go to payment",
          });
          if (!cancelled) router.replace("/payment");
        }
      } catch {
        if (!cancelled) {
          setChecking(false);
          router.replace("/login");
        }
      }
    }
    check();
    return () => { cancelled = true; };
  }, [router, isPaymentPage]);

  if (checking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fafafa",
        }}
      >
        <BeatLoader color="#8A38F5" size={14} />
      </Box>
    );
  }
  if (!allowed) return null;
  return children;
}
